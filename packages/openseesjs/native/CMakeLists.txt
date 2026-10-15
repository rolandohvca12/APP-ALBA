cmake_minimum_required(VERSION 3.20)
project(openseesjs_native LANGUAGES C CXX Fortran)

if(NOT OPEN_SEES_SOURCE_DIR)
  message(FATAL_ERROR "OPEN_SEES_SOURCE_DIR must point to the OpenSees source tree")
endif()
if(NOT NODE_INCLUDE_DIR OR NOT EXISTS "${NODE_INCLUDE_DIR}/node_api.h")
  message(FATAL_ERROR "NODE_INCLUDE_DIR must contain node_api.h")
endif()

set(CMAKE_POSITION_INDEPENDENT_CODE ON)
set(CMAKE_BUILD_RPATH_USE_ORIGIN ON)
set(CMAKE_INSTALL_RPATH "$ORIGIN")
set(CMAKE_INSTALL_RPATH_USE_LINK_PATH OFF)
set(OPS_FINAL_TARGET OpenSeesLIB CACHE STRING "OpenSees target" FORCE)
set(OPS_Use_Graphics_Option None CACHE STRING "Disable GUI renderers" FORCE)

add_subdirectory("${OPEN_SEES_SOURCE_DIR}" opensees EXCLUDE_FROM_ALL)

add_library(opensees_node MODULE
  src/opensees_node.cpp
  "${OPEN_SEES_SOURCE_DIR}/SRC/tcl/commands.cpp"
  "${OPEN_SEES_SOURCE_DIR}/SRC/actor/objectBroker/FEM_ObjectBrokerAllClasses.cpp"
)

target_compile_features(opensees_node PRIVATE cxx_std_17)
target_compile_definitions(opensees_node PRIVATE
  NAPI_VERSION=8
  NODE_GYP_MODULE_NAME=opensees
)
target_include_directories(opensees_node PRIVATE
  "${NODE_INCLUDE_DIR}"
  "${OPEN_SEES_SOURCE_DIR}/SRC"
  "${OPEN_SEES_SOURCE_DIR}/SRC/tcl"
)
target_link_libraries(opensees_node PRIVATE
  OPS_InterpTcl
  coordTransformation
  OpenSeesLIB
  OPS_Reliability
  OPS_ReliabilityTcl
  OPS_Numerics
  OPS_Recorder
  ${CMAKE_DL_LIBS}
  HDF5::HDF5
  tcl::tcl
  ZLIB::ZLIB
  Eigen3::Eigen
)

if(UNIX AND NOT APPLE)
  target_link_options(opensees_node PRIVATE "LINKER:-z,origin")
endif()

set_target_properties(opensees_node PROPERTIES
  PREFIX ""
  SUFFIX ".node"
  OUTPUT_NAME "opensees"
)
