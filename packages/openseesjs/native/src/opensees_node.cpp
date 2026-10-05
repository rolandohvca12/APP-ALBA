#include <node_api.h>
#include <tcl.h>

#include <cmath>
#include <cstdlib>
#include <limits>
#include <string>
#include <unordered_map>
#include <vector>

int OpenSeesAppInit(Tcl_Interp* interpreter);

// The upstream MSVC solution ships these optional Fortran models as Intel-only
// objects. They are rejected in invoke() until portable builds are available.
extern "C" int STEEL(...) { return -1; }
extern "C" int STEELDR(...) { return -1; }
extern "C" void SDMUC(...) {}
extern "C" void SDM2D(...) {}
extern "C" void SDM3D(...) {}
extern "C" void PML_2D(...) {}
extern "C" void PML_3D(...) {}
extern "C" void PSUMAT(...) {}

namespace {

struct Session {
  Tcl_Interp* interpreter = nullptr;
  bool closed = false;
  std::vector<std::string> pendingPattern;
  std::vector<std::vector<std::string>> pendingPatternCommands;
  std::unordered_map<std::string, Tcl_CmdInfo> commandCache;
};

Session* activeSession = nullptr;

struct CommandDispatchResult {
  bool handled = false;
  int status = TCL_ERROR;
};

void check(napi_env env, napi_status status, const char* message) {
  if (status == napi_ok) return;
  napi_throw_error(env, nullptr, message);
}

CommandDispatchResult dispatchRegisteredCommand(
    Session* session,
    const std::string& command,
    const std::vector<Tcl_Obj*>& objects) {
  auto cached = session->commandCache.find(command);
  if (cached == session->commandCache.end()) {
    Tcl_CmdInfo info{};
    if (Tcl_GetCommandInfo(session->interpreter, command.c_str(), &info) == 0) return {};
    cached = session->commandCache.emplace(command, info).first;
  }

  Tcl_CmdInfo& info = cached->second;
  Tcl_ResetResult(session->interpreter);
  if (info.isNativeObjectProc != 0 && info.objProc != nullptr) {
    return {
      true,
      info.objProc(
        info.objClientData,
        session->interpreter,
        static_cast<int>(objects.size()),
        objects.data())
    };
  }
  if (info.proc != nullptr) {
    std::vector<const char*> arguments;
    arguments.reserve(objects.size());
    for (Tcl_Obj* object : objects) arguments.push_back(Tcl_GetString(object));
    return {
      true,
      info.proc(
        info.clientData,
        session->interpreter,
        static_cast<int>(arguments.size()),
        arguments.data())
    };
  }
  return {};
}

bool flushPattern(Session* session, std::string& error) {
  if (session->pendingPattern.empty()) return true;
  Tcl_DString script;
  Tcl_DStringInit(&script);
  for (const std::string& word : session->pendingPattern) {
    Tcl_DStringAppendElement(&script, word.c_str());
  }
  Tcl_DStringAppend(&script, " {\n", -1);
  for (const auto& command : session->pendingPatternCommands) {
    for (const std::string& word : command) Tcl_DStringAppendElement(&script, word.c_str());
    Tcl_DStringAppend(&script, "\n", 1);
  }
  Tcl_DStringAppend(&script, "}", 1);
  const int status = Tcl_EvalEx(session->interpreter, Tcl_DStringValue(&script), Tcl_DStringLength(&script), TCL_EVAL_DIRECT);
  Tcl_DStringFree(&script);
  session->pendingPattern.clear();
  session->pendingPatternCommands.clear();
  if (status == TCL_OK) return true;
  error = Tcl_GetStringResult(session->interpreter);
  return false;
}

int executeObjects(
    Session* session,
    const std::string& command,
    const std::vector<Tcl_Obj*>& objects,
    std::string& error) {
  const bool patternCommand = command == "pattern";
  const bool patternBodyCommand = command == "load" || command == "eleLoad" || command == "sp" ||
    command == "imposedMotion" || command == "groundMotion";
  if (patternCommand || (patternBodyCommand && !session->pendingPattern.empty())) {
    std::vector<std::string> words;
    words.reserve(objects.size());
    for (Tcl_Obj* object : objects) words.emplace_back(Tcl_GetString(object));
    if (patternCommand) {
      if (!flushPattern(session, error)) return TCL_ERROR;
      session->pendingPattern = std::move(words);
    } else {
      session->pendingPatternCommands.push_back(std::move(words));
    }
    return TCL_OK;
  }
  if (!flushPattern(session, error)) return TCL_ERROR;

  const CommandDispatchResult dispatch = dispatchRegisteredCommand(session, command, objects);
  const int status = dispatch.handled
    ? dispatch.status
    : Tcl_EvalObjv(session->interpreter, static_cast<int>(objects.size()), objects.data(), TCL_EVAL_DIRECT);
  if (status != TCL_OK) error = Tcl_GetStringResult(session->interpreter);
  return status;
}

std::string utf8(napi_env env, napi_value value) {
  size_t length = 0;
  check(env, napi_get_value_string_utf8(env, value, nullptr, 0, &length), "Unable to read string length.");
  std::string result(length, '\0');
  check(env, napi_get_value_string_utf8(env, value, result.data(), length + 1, &length), "Unable to read string.");
  return result;
}

napi_value jsString(napi_env env, const char* value, int length = NAPI_AUTO_LENGTH) {
  napi_value result;
  check(env, napi_create_string_utf8(env, value, length < 0 ? NAPI_AUTO_LENGTH : static_cast<size_t>(length), &result),
        "Unable to create JavaScript string.");
  return result;
}

napi_value tclValue(napi_env env, Tcl_Obj* object, bool forceArray = false) {
  Tcl_WideInt integer = 0;
  if (!forceArray && Tcl_GetWideIntFromObj(nullptr, object, &integer) == TCL_OK) {
    napi_value result;
    check(env, napi_create_int64(env, static_cast<int64_t>(integer), &result), "Unable to create integer result.");
    return result;
  }

  double number = 0.0;
  if (!forceArray && Tcl_GetDoubleFromObj(nullptr, object, &number) == TCL_OK && std::isfinite(number)) {
    napi_value result;
    check(env, napi_create_double(env, number == 0.0 ? 0.0 : number, &result), "Unable to create numeric result.");
    return result;
  }

  int itemCount = 0;
  Tcl_Obj** items = nullptr;
  if (Tcl_ListObjGetElements(nullptr, object, &itemCount, &items) == TCL_OK && (forceArray || itemCount > 1)) {
    napi_value result;
    check(env, napi_create_array_with_length(env, static_cast<size_t>(itemCount), &result),
          "Unable to create array result.");
    for (int index = 0; index < itemCount; ++index) {
      check(env, napi_set_element(env, result, static_cast<uint32_t>(index), tclValue(env, items[index])),
            "Unable to set array result.");
    }
    return result;
  }

  int length = 0;
  const char* text = Tcl_GetStringFromObj(object, &length);
  if (length == 0) {
    napi_value result;
    check(env, napi_get_null(env, &result), "Unable to create null result.");
    return result;
  }
  return jsString(env, text, length);
}

Tcl_Obj* tclArgument(napi_env env, napi_value value) {
  napi_valuetype type;
  check(env, napi_typeof(env, value, &type), "Unable to inspect command argument.");

  switch (type) {
    case napi_string: {
      const std::string stringValue = utf8(env, value);
      return Tcl_NewStringObj(stringValue.data(), static_cast<int>(stringValue.size()));
    }
    case napi_number: {
      double number = 0.0;
      check(env, napi_get_value_double(env, value, &number), "Unable to read numeric command argument.");
      if (std::isfinite(number) && std::trunc(number) == number &&
          number >= static_cast<double>(std::numeric_limits<int64_t>::min()) &&
          number <= static_cast<double>(std::numeric_limits<int64_t>::max())) {
        return Tcl_NewWideIntObj(static_cast<Tcl_WideInt>(number));
      }
      return Tcl_NewDoubleObj(number);
    }
    case napi_boolean: {
      bool boolean = false;
      check(env, napi_get_value_bool(env, value, &boolean), "Unable to read boolean command argument.");
      return Tcl_NewBooleanObj(boolean ? 1 : 0);
    }
    case napi_null:
      return Tcl_NewStringObj("", 0);
    default:
      napi_throw_type_error(env, nullptr, "Native OpenSees arguments must be string, number, boolean, or null.");
      return nullptr;
  }
}

Session* unwrapSession(napi_env env, napi_value receiver) {
  Session* session = nullptr;
  check(env, napi_unwrap(env, receiver, reinterpret_cast<void**>(&session)), "Invalid OpenSees native session.");
  if (session == nullptr || session->closed || session->interpreter == nullptr) {
    napi_throw_error(env, nullptr, "The OpenSees native session is closed.");
    return nullptr;
  }
  return session;
}

void closeSession(Session* session) {
  if (session == nullptr || session->closed) return;
  session->closed = true;
  if (session->interpreter != nullptr) {
    std::string ignored;
    flushPattern(session, ignored);
    Tcl_EvalEx(session->interpreter, "wipe", -1, TCL_EVAL_DIRECT);
    Tcl_DeleteInterp(session->interpreter);
    session->interpreter = nullptr;
  }
  if (activeSession == session) activeSession = nullptr;
}

void finalizeSession(napi_env, void* data, void*) {
  auto* session = static_cast<Session*>(data);
  closeSession(session);
  delete session;
}

static napi_value evaluate(
    napi_env env,
    Session* session,
    const std::string& command,
    napi_value arguments,
    napi_value successValue = nullptr) {
  bool isArray = false;
  check(env, napi_is_array(env, arguments, &isArray), "Unable to inspect command arguments.");
  if (!isArray) {
    napi_throw_type_error(env, nullptr, "OpenSees command arguments must be an array.");
    return nullptr;
  }

  uint32_t argumentCount = 0;
  check(env, napi_get_array_length(env, arguments, &argumentCount), "Unable to read command arguments.");

  std::vector<Tcl_Obj*> objects;
  objects.reserve(static_cast<size_t>(argumentCount) + 1);
  if (argumentCount > 0 && (command == "uniaxialMaterial" || command == "nDMaterial" || command == "element")) {
    napi_value firstArgument;
    check(env, napi_get_element(env, arguments, 0, &firstArgument), "Unable to inspect model type.");
    napi_valuetype firstType;
    check(env, napi_typeof(env, firstArgument, &firstType), "Unable to inspect model type.");
    if (firstType == napi_string) {
      const std::string modelType = utf8(env, firstArgument);
      const bool unavailable =
        (command == "uniaxialMaterial" && (modelType == "Dodd_Restrepo" || modelType == "DoddRestrepo" || modelType == "DoddRestr")) ||
        (command == "nDMaterial" && modelType.find("StressDensity") != std::string::npos) ||
        (command == "element" && (modelType == "PML" || modelType.rfind("PML", 0) == 0));
      if (unavailable) {
        napi_throw_error(env, nullptr, (modelType + " is not available in the portable native backend.").c_str());
        return nullptr;
      }
    }
  }
  objects.push_back(Tcl_NewStringObj(command.data(), static_cast<int>(command.size())));
  for (uint32_t index = 0; index < argumentCount; ++index) {
    napi_value argument;
    check(env, napi_get_element(env, arguments, index, &argument), "Unable to read command argument.");
    Tcl_Obj* converted = tclArgument(env, argument);
    if (converted == nullptr) return nullptr;
    objects.push_back(converted);
  }
  for (Tcl_Obj* object : objects) Tcl_IncrRefCount(object);
  const auto releaseObjects = [&objects]() {
    for (Tcl_Obj* object : objects) Tcl_DecrRefCount(object);
  };

  const bool deferredPatternCommand = command == "pattern" ||
    ((command == "load" || command == "eleLoad" || command == "sp" ||
      command == "imposedMotion" || command == "groundMotion") && !session->pendingPattern.empty());
  std::string commandError;
  const int status = executeObjects(session, command, objects, commandError);
  releaseObjects();

  Tcl_Obj* result = Tcl_GetObjResult(session->interpreter);
  if (status != TCL_OK) {
    napi_throw_error(env, nullptr, commandError.c_str());
    return nullptr;
  }

  if (successValue != nullptr) return successValue;
  if (deferredPatternCommand) {
    napi_value deferredResult;
    check(env, napi_get_null(env, &deferredResult), "Unable to create pattern result.");
    return deferredResult;
  }

  const bool collectionQuery = command == "getNodeTags" || command == "getEleTags" ||
    command == "getParamTags" || command == "getFixedNodes" || command == "getPatterns" ||
    command == "eigen" || command == "eleResponse" ||
    ((command == "nodeCoord" || command == "nodeDisp" || command == "nodeVel" ||
      command == "nodeAccel" || command == "nodeReaction" || command == "eleForce") && argumentCount == 1);
  return tclValue(env, result, collectionQuery);
}

napi_value invoke(napi_env env, napi_callback_info info) {
  size_t argc = 2;
  napi_value argv[2];
  napi_value receiver;
  check(env, napi_get_cb_info(env, info, &argc, argv, &receiver, nullptr), "Unable to read invoke arguments.");
  if (argc != 2) {
    napi_throw_type_error(env, nullptr, "invoke(command, args) requires two arguments.");
    return nullptr;
  }
  Session* session = unwrapSession(env, receiver);
  if (session == nullptr) return nullptr;
  return evaluate(env, session, utf8(env, argv[0]), argv[1]);
}

napi_value invokeManyImpl(napi_env env, napi_callback_info info, bool collectResults) {
  size_t argc = 2;
  napi_value argv[2];
  napi_value receiver;
  check(env, napi_get_cb_info(env, info, &argc, argv, &receiver, nullptr), "Unable to read invokeMany arguments.");
  if (argc != 2) {
    napi_throw_type_error(env, nullptr, "invokeMany(command, argumentRows) requires two arguments.");
    return nullptr;
  }
  Session* session = unwrapSession(env, receiver);
  if (session == nullptr) return nullptr;

  bool isArray = false;
  check(env, napi_is_array(env, argv[1], &isArray), "Unable to inspect command argument rows.");
  if (!isArray) {
    napi_throw_type_error(env, nullptr, "invokeMany(command, argumentRows) expects an array of arrays.");
    return nullptr;
  }
  const std::string command = utf8(env, argv[0]);
  uint32_t rowCount = 0;
  check(env, napi_get_array_length(env, argv[1], &rowCount), "Unable to read command argument rows.");
  napi_value results;
  if (collectResults) {
    check(env, napi_create_array_with_length(env, rowCount, &results), "Unable to create bulk command results.");
  } else {
    check(env, napi_get_undefined(env, &results), "Unable to create bulk command result.");
  }
  for (uint32_t index = 0; index < rowCount; ++index) {
    napi_value row;
    check(env, napi_get_element(env, argv[1], index, &row), "Unable to read command argument row.");
    napi_value result = evaluate(env, session, command, row, collectResults ? nullptr : results);
    if (result == nullptr) return nullptr;
    if (collectResults) {
      check(env, napi_set_element(env, results, index, result), "Unable to set bulk command result.");
    }
  }
  return results;
}

napi_value invokeMany(napi_env env, napi_callback_info info) {
  return invokeManyImpl(env, info, true);
}

napi_value invokeManyVoid(napi_env env, napi_callback_info info) {
  return invokeManyImpl(env, info, false);
}

struct TypedArrayView {
  napi_typedarray_type type{};
  size_t length = 0;
  void* data = nullptr;
};

bool typedArrayView(napi_env env, napi_value value, TypedArrayView& view) {
  bool isTypedArray = false;
  check(env, napi_is_typedarray(env, value, &isTypedArray), "Unable to inspect packed data.");
  if (!isTypedArray) return false;
  napi_value arrayBuffer;
  size_t byteOffset = 0;
  check(env, napi_get_typedarray_info(
    env, value, &view.type, &view.length, &view.data, &arrayBuffer, &byteOffset),
    "Unable to read packed data.");
  return true;
}

bool readWidth(napi_env env, napi_value value, uint32_t& width) {
  check(env, napi_get_value_uint32(env, value, &width), "Unable to read packed row width.");
  return width > 0;
}

Tcl_Obj* packedNumber(const TypedArrayView& values, size_t index) {
  if (values.type == napi_int32_array) {
    return Tcl_NewWideIntObj(static_cast<Tcl_WideInt>(static_cast<int32_t*>(values.data)[index]));
  }
  return Tcl_NewDoubleObj(static_cast<double*>(values.data)[index]);
}

napi_value invokePacked(napi_env env, napi_callback_info info) {
  size_t argc = 4;
  napi_value argv[4];
  napi_value receiver;
  check(env, napi_get_cb_info(env, info, &argc, argv, &receiver, nullptr), "Unable to read invokePacked arguments.");
  if (argc != 4) {
    napi_throw_type_error(env, nullptr, "invokePacked(command, tags, values, width) requires four arguments.");
    return nullptr;
  }
  Session* session = unwrapSession(env, receiver);
  if (session == nullptr) return nullptr;

  const std::string command = utf8(env, argv[0]);
  if (command != "node" && command != "mass" && command != "fix" && command != "load") {
    napi_throw_type_error(env, nullptr, "invokePacked supports node, mass, fix, and load commands.");
    return nullptr;
  }
  TypedArrayView tags;
  TypedArrayView values;
  uint32_t width = 0;
  if (!typedArrayView(env, argv[1], tags) || tags.type != napi_int32_array) {
    napi_throw_type_error(env, nullptr, "Packed tags must be an Int32Array.");
    return nullptr;
  }
  if (!typedArrayView(env, argv[2], values) ||
      (values.type != napi_float64_array && values.type != napi_int32_array)) {
    napi_throw_type_error(env, nullptr, "Packed values must be a Float64Array or Int32Array.");
    return nullptr;
  }
  if (!readWidth(env, argv[3], width) || values.length != tags.length * static_cast<size_t>(width)) {
    napi_throw_range_error(env, nullptr, "Packed values length must equal tags.length * width.");
    return nullptr;
  }

  Tcl_Obj* commandObject = Tcl_NewStringObj(command.data(), static_cast<int>(command.size()));
  Tcl_IncrRefCount(commandObject);
  for (size_t row = 0; row < tags.length; ++row) {
    std::vector<Tcl_Obj*> objects;
    objects.reserve(static_cast<size_t>(width) + 2);
    objects.push_back(commandObject);
    objects.push_back(Tcl_NewWideIntObj(static_cast<Tcl_WideInt>(static_cast<int32_t*>(tags.data)[row])));
    for (uint32_t column = 0; column < width; ++column) {
      objects.push_back(packedNumber(values, row * width + column));
    }
    for (size_t index = 1; index < objects.size(); ++index) Tcl_IncrRefCount(objects[index]);
    std::string error;
    const int status = executeObjects(session, command, objects, error);
    for (size_t index = 1; index < objects.size(); ++index) Tcl_DecrRefCount(objects[index]);
    if (status != TCL_OK) {
      Tcl_DecrRefCount(commandObject);
      const std::string detail = error + " at packed row " + std::to_string(row);
      napi_throw_error(env, nullptr, detail.c_str());
      return nullptr;
    }
  }
  Tcl_DecrRefCount(commandObject);
  napi_value result;
  check(env, napi_get_undefined(env, &result), "Unable to create packed command result.");
  return result;
}

napi_value queryPacked(napi_env env, napi_callback_info info) {
  size_t argc = 4;
  napi_value argv[4];
  napi_value receiver;
  check(env, napi_get_cb_info(env, info, &argc, argv, &receiver, nullptr), "Unable to read queryPacked arguments.");
  if (argc != 4) {
    napi_throw_type_error(env, nullptr, "queryPacked(command, tags, width, args) requires four arguments.");
    return nullptr;
  }
  Session* session = unwrapSession(env, receiver);
  if (session == nullptr) return nullptr;

  const std::string command = utf8(env, argv[0]);
  const bool supported = command == "nodeCoord" || command == "nodeDisp" || command == "nodeVel" ||
    command == "nodeAccel" || command == "nodeReaction" || command == "eleForce" || command == "eleResponse";
  if (!supported) {
    napi_throw_type_error(env, nullptr, "Unsupported packed query command.");
    return nullptr;
  }
  TypedArrayView tags;
  uint32_t width = 0;
  bool argsIsArray = false;
  if (!typedArrayView(env, argv[1], tags) || tags.type != napi_int32_array) {
    napi_throw_type_error(env, nullptr, "Packed query tags must be an Int32Array.");
    return nullptr;
  }
  if (!readWidth(env, argv[2], width)) {
    napi_throw_range_error(env, nullptr, "Packed query width must be greater than zero.");
    return nullptr;
  }
  check(env, napi_is_array(env, argv[3], &argsIsArray), "Unable to inspect packed query arguments.");
  if (!argsIsArray) {
    napi_throw_type_error(env, nullptr, "Packed query arguments must be an array.");
    return nullptr;
  }

  uint32_t trailingCount = 0;
  check(env, napi_get_array_length(env, argv[3], &trailingCount), "Unable to read packed query arguments.");
  std::vector<Tcl_Obj*> sharedObjects;
  sharedObjects.reserve(static_cast<size_t>(trailingCount) + 1);
  sharedObjects.push_back(Tcl_NewStringObj(command.data(), static_cast<int>(command.size())));
  for (uint32_t index = 0; index < trailingCount; ++index) {
    napi_value argument;
    check(env, napi_get_element(env, argv[3], index, &argument), "Unable to read packed query argument.");
    Tcl_Obj* converted = tclArgument(env, argument);
    if (converted == nullptr) return nullptr;
    sharedObjects.push_back(converted);
  }
  for (Tcl_Obj* object : sharedObjects) Tcl_IncrRefCount(object);

  const size_t resultLength = tags.length * static_cast<size_t>(width);
  void* resultData = nullptr;
  napi_value arrayBuffer;
  check(env, napi_create_arraybuffer(env, resultLength * sizeof(double), &resultData, &arrayBuffer),
        "Unable to allocate packed query result.");
  auto* output = static_cast<double*>(resultData);

  for (size_t row = 0; row < tags.length; ++row) {
    Tcl_Obj* tag = Tcl_NewWideIntObj(static_cast<Tcl_WideInt>(static_cast<int32_t*>(tags.data)[row]));
    Tcl_IncrRefCount(tag);
    std::vector<Tcl_Obj*> objects;
    objects.reserve(sharedObjects.size() + 1);
    objects.push_back(sharedObjects[0]);
    objects.push_back(tag);
    objects.insert(objects.end(), sharedObjects.begin() + 1, sharedObjects.end());
    std::string error;
    const int status = executeObjects(session, command, objects, error);
    Tcl_DecrRefCount(tag);
    if (status != TCL_OK) {
      for (Tcl_Obj* object : sharedObjects) Tcl_DecrRefCount(object);
      const std::string detail = error + " at packed row " + std::to_string(row);
      napi_throw_error(env, nullptr, detail.c_str());
      return nullptr;
    }

    Tcl_Obj* result = Tcl_GetObjResult(session->interpreter);
    if (width == 1) {
      if (Tcl_GetDoubleFromObj(session->interpreter, result, &output[row]) != TCL_OK) {
        for (Tcl_Obj* object : sharedObjects) Tcl_DecrRefCount(object);
        napi_throw_type_error(env, nullptr, "Packed query returned a non-numeric scalar.");
        return nullptr;
      }
      if (output[row] == 0.0) output[row] = 0.0;
      continue;
    }
    int itemCount = 0;
    Tcl_Obj** items = nullptr;
    if (Tcl_ListObjGetElements(session->interpreter, result, &itemCount, &items) != TCL_OK ||
        itemCount != static_cast<int>(width)) {
      for (Tcl_Obj* object : sharedObjects) Tcl_DecrRefCount(object);
      napi_throw_range_error(env, nullptr, "Packed query result width does not match the requested width.");
      return nullptr;
    }
    for (uint32_t column = 0; column < width; ++column) {
      if (Tcl_GetDoubleFromObj(session->interpreter, items[column], &output[row * width + column]) != TCL_OK) {
        for (Tcl_Obj* object : sharedObjects) Tcl_DecrRefCount(object);
        napi_throw_type_error(env, nullptr, "Packed query returned a non-numeric value.");
        return nullptr;
      }
      if (output[row * width + column] == 0.0) output[row * width + column] = 0.0;
    }
  }
  for (Tcl_Obj* object : sharedObjects) Tcl_DecrRefCount(object);

  napi_value result;
  check(env, napi_create_typedarray(env, napi_float64_array, resultLength, arrayBuffer, 0, &result),
        "Unable to create packed query Float64Array.");
  return result;
}

napi_value close(napi_env env, napi_callback_info info) {
  size_t argc = 0;
  napi_value receiver;
  check(env, napi_get_cb_info(env, info, &argc, nullptr, &receiver, nullptr), "Unable to close native session.");
  Session* session = nullptr;
  check(env, napi_unwrap(env, receiver, reinterpret_cast<void**>(&session)), "Invalid OpenSees native session.");
  closeSession(session);
  napi_value result;
  check(env, napi_get_undefined(env, &result), "Unable to create close result.");
  return result;
}

napi_value createSession(napi_env env, napi_callback_info) {
  if (activeSession != nullptr && !activeSession->closed) {
    napi_throw_error(env, nullptr, "OpenSees currently allows one native session per Node.js process.");
    return nullptr;
  }

  auto* session = new Session();
  session->interpreter = Tcl_CreateInterp();
  if (session->interpreter == nullptr) {
    delete session;
    napi_throw_error(env, nullptr, "Unable to create the embedded Tcl interpreter.");
    return nullptr;
  }

  if (OpenSeesAppInit(session->interpreter) < 0) {
    const std::string message = Tcl_GetStringResult(session->interpreter);
    Tcl_DeleteInterp(session->interpreter);
    delete session;
    napi_throw_error(env, nullptr, message.empty() ? "Unable to initialize OpenSees." : message.c_str());
    return nullptr;
  }

  activeSession = session;
  napi_value result;
  check(env, napi_create_object(env, &result), "Unable to create native session object.");
  check(env, napi_wrap(env, result, session, finalizeSession, nullptr, nullptr), "Unable to wrap native session.");

  napi_value invokeFunction;
  napi_value invokeManyFunction;
  napi_value invokeManyVoidFunction;
  napi_value invokePackedFunction;
  napi_value queryPackedFunction;
  napi_value closeFunction;
  check(env, napi_create_function(env, "invoke", NAPI_AUTO_LENGTH, invoke, nullptr, &invokeFunction), "Unable to create invoke().");
  check(env, napi_create_function(env, "invokeMany", NAPI_AUTO_LENGTH, invokeMany, nullptr, &invokeManyFunction), "Unable to create invokeMany().");
  check(env, napi_create_function(env, "invokeManyVoid", NAPI_AUTO_LENGTH, invokeManyVoid, nullptr, &invokeManyVoidFunction), "Unable to create invokeManyVoid().");
  check(env, napi_create_function(env, "invokePacked", NAPI_AUTO_LENGTH, invokePacked, nullptr, &invokePackedFunction), "Unable to create invokePacked().");
  check(env, napi_create_function(env, "queryPacked", NAPI_AUTO_LENGTH, queryPacked, nullptr, &queryPackedFunction), "Unable to create queryPacked().");
  check(env, napi_create_function(env, "close", NAPI_AUTO_LENGTH, close, nullptr, &closeFunction), "Unable to create close().");
  check(env, napi_set_named_property(env, result, "invoke", invokeFunction), "Unable to export invoke().");
  check(env, napi_set_named_property(env, result, "invokeMany", invokeManyFunction), "Unable to export invokeMany().");
  check(env, napi_set_named_property(env, result, "invokeManyVoid", invokeManyVoidFunction), "Unable to export invokeManyVoid().");
  check(env, napi_set_named_property(env, result, "invokePacked", invokePackedFunction), "Unable to export invokePacked().");
  check(env, napi_set_named_property(env, result, "queryPacked", queryPackedFunction), "Unable to export queryPacked().");
  check(env, napi_set_named_property(env, result, "close", closeFunction), "Unable to export close().");
  return result;
}

napi_value initialize(napi_env env, napi_value exports) {
  napi_value createSessionFunction;
  check(env, napi_create_function(env, "createSession", NAPI_AUTO_LENGTH, createSession, nullptr, &createSessionFunction),
        "Unable to create createSession().");
  check(env, napi_set_named_property(env, exports, "createSession", createSessionFunction), "Unable to export createSession().");
  check(env, napi_set_named_property(env, exports, "version", jsString(env, "OpenSees native (direct registered-command dispatcher)")),
        "Unable to export native version.");
  return exports;
}

}  // namespace

NAPI_MODULE(NODE_GYP_MODULE_NAME, initialize)
