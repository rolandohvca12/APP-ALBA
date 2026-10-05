from __future__ import annotations

import argparse
import importlib.metadata
import inspect
import json
import re
from pathlib import Path


VARIANT_COMMANDS = (
    "algorithm",
    "analysis",
    "beamIntegration",
    "constraints",
    "element",
    "frictionModel",
    "geomTransf",
    "hystereticBackbone",
    "integrator",
    "mesh",
    "nDMaterial",
    "numberer",
    "pattern",
    "recorder",
    "section",
    "system",
    "test",
    "timeSeries",
    "uniaxialMaterial",
)

PYTHON_ONLY = {"pyversion"}


def fixed_vector_overloads(command: str, first_name: str, value_name: str, value_type: str, maximum: int = 6) -> list[str]:
    overloads: list[str] = []
    for count in range(1, maximum + 1):
        values = ", ".join(f"{value_name}{index}: {value_type}" for index in range(1, count + 1))
        overloads.append(f"  {command}({first_name}: number, {values}): this;")
    array_value_type = f"({value_type})" if " | " in value_type else value_type
    overloads.append(f"  {command}({first_name}: number, {value_name}s: readonly {array_value_type}[]): this;")
    return overloads


def node_overloads() -> list[str]:
    overloads: list[str] = []
    option_specs = [
        ("ndfFlag", "'-ndf'", "ndf", "number"),
        ("massFlag", "'-mass'", "mass", "readonly number[]"),
        ("dispFlag", "'-disp'", "displacement", "readonly number[]"),
        ("velFlag", "'-vel'", "velocity", "readonly number[]"),
        ("accelFlag", "'-accel'", "acceleration", "readonly number[]"),
    ]
    for dimensions in range(1, 4):
        coordinates = ", ".join(f"{'xyz'[index]}: number" for index in range(dimensions))
        prefix = f"  node(nodeTag: number, {coordinates}"
        overloads.append(prefix + "): this;")
        for mask in range(1, 1 << len(option_specs)):
            options: list[str] = []
            for index, (flag_name, flag_type, value_name, value_type) in enumerate(option_specs):
                if mask & (1 << index):
                    options.extend((f"{flag_name}: {flag_type}", f"{value_name}: {value_type}"))
            overloads.append(prefix + ", " + ", ".join(options) + "): this;")
    return overloads


def recorder_node_overloads(recorder_type: str) -> list[str]:
    overloads: list[str] = []
    destinations = [
        "destinationFlag: '-file' | '-xml' | '-binary', path: string",
        "destinationFlag: '-tcp', host: string, port: number",
    ]
    selections = [
        "selectionFlag: '-node', nodeTags: readonly number[]",
        "selectionFlag: '-nodeRange', startNode: number, endNode: number",
        "selectionFlag: '-region', regionTag: number",
    ]
    for destination in destinations:
        for selection in selections:
            prefix = f"  recorder(type: '{recorder_type}', {destination}"
            suffix = f", {selection}, dofFlag: '-dof', dofs: readonly number[]"
            overloads.append(prefix + suffix + ", responseType: Exclude<RecorderNodeResponseType, 'eigen'>): this;")
            overloads.append(prefix + ", commonOptions: RecorderCommonArguments" + suffix + ", responseType: Exclude<RecorderNodeResponseType, 'eigen'>): this;")
            overloads.append(prefix + suffix + ", responseType: 'eigen', mode: number): this;")
            overloads.append(prefix + ", commonOptions: RecorderCommonArguments" + suffix + ", responseType: 'eigen', mode: number): this;")
    return overloads


def recorder_element_overloads(recorder_type: str) -> list[str]:
    overloads: list[str] = []
    destinations = [
        "destinationFlag: '-file' | '-xml' | '-binary', path: string",
        "destinationFlag: '-tcp', host: string, port: number",
    ]
    selections = [
        "selectionFlag: '-ele', elementTags: readonly number[]",
        "selectionFlag: '-eleRange', startElement: number, endElement: number",
        "selectionFlag: '-region', regionTag: number",
    ]
    for destination in destinations:
        for selection in selections:
            prefix = f"  recorder(type: '{recorder_type}', {destination}"
            suffix = f", {selection}, response: readonly OpenSeesPyArgument[]): this;"
            overloads.append(prefix + suffix)
            overloads.append(prefix + ", commonOptions: RecorderCommonArguments" + suffix)
    return overloads

SPECIAL_OVERLOADS = {
    "analysis": [
        "  analysis(analysisType: 'Static'): this;",
        "  analysis(analysisType: 'Transient'): this;",
        "  analysis(analysisType: 'Transient', numSublevelsFlag: '-numSublevels', numSublevels: number, numSubStepsFlag: '-numSubSteps', numSubSteps: number): this;",
        "  analysis(analysisType: 'VariableTransient'): this;",
        "  analysis(analysisType: 'PFEM', dtmax: number, dtmin: number, gravity: number, ratio?: number): this;",
    ],
    "build": [
        "  build(): this;",
    ],
    "eleLoad": [
        "  eleLoad(selectionFlag: '-ele', elementTags: readonly number[], typeFlag: '-type', loadType: '-beamUniform', loadValues: BeamUniformLoad): this;",
        "  eleLoad(selectionFlag: '-range', elementRange: readonly [firstElement: number, lastElement: number], typeFlag: '-type', loadType: '-beamUniform', ...loadValues: BeamUniformLoad): this;",
        "  eleLoad(selectionFlag: '-ele', elementTags: readonly number[], typeFlag: '-type', loadType: '-beamPoint', loadValues: BeamPointLoad): this;",
        "  eleLoad(selectionFlag: '-range', elementRange: readonly [firstElement: number, lastElement: number], typeFlag: '-type', loadType: '-beamPoint', ...loadValues: BeamPointLoad): this;",
        "  eleLoad(selectionFlag: '-ele' | '-range', elements: readonly number[], typeFlag: '-type', loadType: '-beamThermal', ...thermalValues: number[]): this;",
    ],
    "equalDOF": [
        "  equalDOF(retainedNode: number, constrainedNode: number, dofs: readonly number[]): this;",
    ],
    "eigen": [
        "  eigen(numEigenvalues: number): this;",
        "  eigen(solver: string, numEigenvalues: number): this;",
    ],
    "fix": fixed_vector_overloads("fix", "nodeTag", "constraint", "0 | 1"),
    "load": fixed_vector_overloads("load", "nodeTag", "loadValue", "number"),
    "mass": fixed_vector_overloads("mass", "nodeTag", "massValue", "number"),
    "modalProperties": [
        "  modalProperties(): this;",
        "  modalProperties(printFlag: '-print'): this;",
        "  modalProperties(fileFlag: '-file', reportFileName: string): this;",
        "  modalProperties(unormFlag: '-unorm'): this;",
        "  modalProperties(fileFlag: '-file', reportFileName: string, unormFlag: '-unorm'): this;",
        "  modalProperties(printFlag: '-print', fileFlag: '-file', reportFileName: string, unormFlag?: '-unorm'): this;",
        "  modalProperties(returnFlag: '-return'): this;",
    ],
    "reactions": [
        "  reactions(): this;",
        "  reactions(dynamicFlag: '-dynamic'): this;",
        "  reactions(rayleighFlag: '-rayleigh'): this;",
        "  reactions(dynamicFlag: '-dynamic', rayleighFlag: '-rayleigh'): this;",
    ],
    "printA": [
        "  printA(): this;",
        "  printA(fileFlag: '-file', filename: string): this;",
        "  printA(retFlag: '-ret'): this;",
        "  printA(fileFlag: '-file', filename: string, retFlag: '-ret'): this;",
        "  printA(precisionFlag: '-precision', digits: number): this;",
        "  printA(sparseFlag: '-sparse', baseIndex?: 0 | 1): this;",
    ],
    "printB": [
        "  printB(): this;",
        "  printB(fileFlag: '-file', filename: string): this;",
        "  printB(retFlag: '-ret'): this;",
        "  printB(fileFlag: '-file', filename: string, retFlag: '-ret'): this;",
    ],
    "responseSpectrumAnalysis": [
        "  responseSpectrumAnalysis(timeSeriesTag: number, direction: number): this;",
        "  responseSpectrumAnalysis(timeSeriesTag: number, direction: number, scaleFlag: '-scale', scale: number): this;",
        "  responseSpectrumAnalysis(timeSeriesTag: number, direction: number, modeFlag: '-mode', mode: number): this;",
        "  responseSpectrumAnalysis(timeSeriesTag: number, direction: number, scaleFlag: '-scale', scale: number, modeFlag: '-mode', mode: number): this;",
        "  responseSpectrumAnalysis(direction: number, periodsFlag: '-Tn', periods: readonly number[], accelerationsFlag: '-Sa', accelerations: readonly number[], ...flags: OpenSeesPyArgument[]): this;",
    ],
    "model": [
        "  model(builder: OpenSeesModelBuilderType, ndmFlag: '-ndm', ndm: 1 | 2 | 3): this;",
        "  model(builder: OpenSeesModelBuilderType, ndmFlag: '-ndm', ndm: 1 | 2 | 3, ndfFlag: '-ndf', ndf: number): this;",
    ],
    "node": node_overloads(),
    "rigidDiaphragm": [
        "  rigidDiaphragm(perpDirn: number, retainedNode: number, constrainedNodes: readonly number[]): this;",
    ],
    "rigidLink": [
        " rigidLink(type: 'bar' | 'beam', rNodeTag: number, cNodeTag: number): this;"
    ]
}

SPECIAL_VARIANT_OVERLOADS = {
    "uniaxialMaterial": {
        "Steel01": [
            "  uniaxialMaterial(type: 'Steel01', matTag: number, Fy: number, E0: number, b: number): this;",
            "  uniaxialMaterial(type: 'Steel01', matTag: number, Fy: number, E0: number, b: number, a1: number, a2: number, a3: number, a4: number): this;",
        ],
        "Steel01Thermal": [
            "  uniaxialMaterial(type: 'Steel01Thermal', matTag: number, Fy: number, E0: number, b: number): this;",
            "  uniaxialMaterial(type: 'Steel01Thermal', matTag: number, Fy: number, E0: number, b: number, a1: number, a2: number, a3: number, a4: number): this;",
        ],
        "Steel02": [
            "  uniaxialMaterial(type: 'Steel02', matTag: number, Fy: number, E0: number, b: number, R0: number, cR1: number, cR2: number, a1?: number, a2?: number, a3?: number, a4?: number, sigInit?: number): this;",
        ],
    },
    "geomTransf": {
        variant: [
            f"  geomTransf(type: '{variant}', transfTag: number): this;",
            f"  geomTransf(type: '{variant}', transfTag: number, jntOffsetFlag: '-jntOffset', jntOffset: readonly [number, number, number, number]): this;",
            f"  geomTransf(type: '{variant}', transfTag: number, vecxz: readonly [number, number, number]): this;",
            f"  geomTransf(type: '{variant}', transfTag: number, vecxz: readonly [number, number, number], jntOffsetFlag: '-jntOffset', jntOffset: readonly [number, number, number, number, number, number]): this;",
        ]
        for variant in ("Linear", "PDelta", "Corotational")
    },
    "timeSeries": {
        "Constant": [
            "  timeSeries(type: 'Constant', tag: number): this;",
            "  timeSeries(type: 'Constant', tag: number, factorFlag: '-factor', factor: number): this;",
        ],
        "Linear": [
            "  timeSeries(type: 'Linear', tag: number): this;",
            "  timeSeries(type: 'Linear', tag: number, factorFlag: '-factor', factor: number): this;",
        ],
        "Path": ["  timeSeries(type: 'Path', tag: number, ...flags: OpenSeesPyArgument[]): this;"],
        "Pulse": ["  timeSeries(type: 'Pulse', tag: number, tStart: number, tEnd: number, period: number, ...flags: OpenSeesPyArgument[]): this;"],
        "Rectangular": ["  timeSeries(type: 'Rectangular', tag: number, tStart: number, tEnd: number, ...flags: OpenSeesPyArgument[]): this;"],
        "Triangle": ["  timeSeries(type: 'Triangle', tag: number, tStart: number, tEnd: number, period: number, ...flags: OpenSeesPyArgument[]): this;"],
        "Trig": ["  timeSeries(type: 'Trig', tag: number, tStart: number, tEnd: number, period: number, ...flags: OpenSeesPyArgument[]): this;"],
    },
    "pattern": {
        "Plain": [
            "  pattern(type: 'Plain', patternTag: number, tsTag: number): this;",
            "  pattern(type: 'Plain', patternTag: number, tsTag: number, factFlag: '-fact', fact: number): this;",
        ],
        "MultipleSupport": ["  pattern(type: 'MultipleSupport', patternTag: number): this;"],
        "UniformExcitation": ["  pattern(type: 'UniformExcitation', patternTag: number, direction: number, ...flags: OpenSeesPyArgument[]): this;"],
    },
    "recorder": {
        "Node": recorder_node_overloads("Node"),
        "EnvelopeNode": recorder_node_overloads("EnvelopeNode"),
        "Element": recorder_element_overloads("Element"),
        "EnvelopeElement": recorder_element_overloads("EnvelopeElement"),
    },
    "element": {
        "Truss": [
            "  element(type: 'Truss', eleTag: number, iNode: number, jNode: number, area: number, matTag: number, ...options: OpenSeesPyArgument[]): this;",
            "  element(type: 'truss', eleTag: number, iNode: number, jNode: number, area: number, matTag: number, ...options: OpenSeesPyArgument[]): this;",
        ],
        "corotTruss": [
            "  element(type: 'corotTruss', eleTag: number, iNode: number, jNode: number, area: number, matTag: number, ...options: OpenSeesPyArgument[]): this;",
        ],
        "dispBeamColumn": [
            "  element(type: 'dispBeamColumn', eleTag: number, iNode: number, jNode: number, transfTag: number, integrationTag: number, ...options: OpenSeesPyArgument[]): this;",
        ],
        "elasticBeamColumn": [
            "  element(type: 'elasticBeamColumn', eleTag: number, iNode: number, jNode: number, area: number, elasticModulus: number, iz: number, transfTag: number, ...options: ElasticBeamColumn2DOptions): this;",
            "  element(type: 'elasticBeamColumn', eleTag: number, iNode: number, jNode: number, sectionTag: number, transfTag: number, ...options: ElasticBeamColumn2DOptions): this;",
            "  element(type: 'elasticBeamColumn', eleTag: number, iNode: number, jNode: number, area: number, elasticModulus: number, shearModulus: number, torsionalConstant: number, iy: number, iz: number, transfTag: number, ...options: ElasticBeamColumn3DOptions): this;",
            "  element(type: 'elasticBeamColumn', eleTag: number, iNode: number, jNode: number, sectionTag: number, transfTag: number, ...options: ElasticBeamColumn3DOptions): this;",
        ],
        "forceBeamColumn": [
            "  element(type: 'forceBeamColumn', eleTag: number, iNode: number, jNode: number, transfTag: number, integrationTag: number, ...options: OpenSeesPyArgument[]): this;",
        ],
        "zeroLength": [
            "  element(type: 'zeroLength', eleTag: number, iNode: number, jNode: number, matFlag: '-mat', matTags: readonly number[], dirFlag: '-dir', directions: readonly number[], options?: readonly OpenSeesPyArgument[]): this;",
        ],
    },
}

SPECIAL_TYPE_DECLARATIONS = [
    "export type NodeFlag = '-ndf' | '-mass' | '-disp' | '-vel' | '-accel';",
    "export type NodeFlagToken = NodeFlag | number | readonly number[];",
    "export type NodeFlagSequence = NodeFlagToken[];",
    "export type BeamUniformLoad =",
    "  | readonly [wy: number]",
    "  | readonly [wy: number, wx: number]",
    "  | readonly [wy: number, wz: number, wx: number]",
    "  | readonly [wya: number, wxa: number, aOverL: number, bOverL: number, wyb: number, wxb: number]",
    "  | readonly [wya: number, wza: number, wxa: number, aOverL: number, bOverL: number, wyb: number, wzb: number, wxb: number];",
    "export type BeamPointLoad =",
    "  | readonly [py: number, xOverL: number]",
    "  | readonly [py: number, xOverL: number, px: number]",
    "  | readonly [py: number, pz: number, xOverL: number]",
    "  | readonly [py: number, pz: number, xOverL: number, px: number];",
    "export type RecorderDestinationArguments = ['-file' | '-xml' | '-binary', path: string] | ['-tcp', host: string, port: number];",
    "export type RecorderCommonFlagArguments = ['-precision', digits: number] | ['-timeSeries', tag: number] | ['-time'] | ['-dT', interval: number] | ['-closeOnWrite'];",
    "export type RecorderCommonArguments = readonly RecorderCommonFlagArguments[];",
    "export type RecorderNodeSelectionArguments = ['-node', tags: readonly number[]] | ['-nodeRange', start: number, end: number] | ['-region', tag: number];",
    "export type RecorderElementSelectionArguments = ['-ele', tags: readonly number[]] | ['-eleRange', start: number, end: number] | ['-region', tag: number];",
    "export type RecorderNodeResponseType = 'disp' | 'vel' | 'accel' | 'incrDisp' | 'reaction' | 'rayleighForces' | 'eigen';",
    "export type RecorderNodeArguments = readonly OpenSeesPyArgument[];",
    "export type RecorderElementArguments = readonly OpenSeesPyArgument[];",
    "",
    "export type ElasticBeamMassOptions =",
    "  | []",
    "  | [massFlag: '-mass', massDensity: number]",
    "  | [consistentMassFlag: '-cMass']",
    "  | [massFlag: '-mass', massDensity: number, consistentMassFlag: '-cMass'];",
    "",
    "export type ElasticBeamColumn2DReleaseOptions =",
    "  | []",
    "  | [releaseFlag: '-release', releaseCode: 0 | 1 | 2 | 3];",
    "",
    "export type ElasticBeamColumn3DReleaseOptions =",
    "  | []",
    "  | [releaseZFlag: '-releasez', releaseZCode: 0 | 1 | 2 | 3]",
    "  | [releaseYFlag: '-releasey', releaseYCode: 0 | 1 | 2 | 3]",
    "  | [releaseZFlag: '-releasez', releaseZCode: 0 | 1 | 2 | 3, releaseYFlag: '-releasey', releaseYCode: 0 | 1 | 2 | 3];",
    "",
    "export type ElasticBeamColumn2DOptions =",
    "  | ElasticBeamMassOptions",
    "  | ElasticBeamColumn2DReleaseOptions",
    "  | [massFlag: '-mass', massDensity: number, releaseFlag: '-release', releaseCode: 0 | 1 | 2 | 3]",
    "  | [consistentMassFlag: '-cMass', releaseFlag: '-release', releaseCode: 0 | 1 | 2 | 3]",
    "  | [massFlag: '-mass', massDensity: number, consistentMassFlag: '-cMass', releaseFlag: '-release', releaseCode: 0 | 1 | 2 | 3];",
    "",
    "export type ElasticBeamColumn3DOptions =",
    "  | ElasticBeamMassOptions",
    "  | ElasticBeamColumn3DReleaseOptions",
    "  | [massFlag: '-mass', massDensity: number, releaseZFlag: '-releasez', releaseZCode: 0 | 1 | 2 | 3]",
    "  | [massFlag: '-mass', massDensity: number, releaseYFlag: '-releasey', releaseYCode: 0 | 1 | 2 | 3]",
    "  | [massFlag: '-mass', massDensity: number, releaseZFlag: '-releasez', releaseZCode: 0 | 1 | 2 | 3, releaseYFlag: '-releasey', releaseYCode: 0 | 1 | 2 | 3]",
    "  | [consistentMassFlag: '-cMass', releaseZFlag: '-releasez', releaseZCode: 0 | 1 | 2 | 3]",
    "  | [consistentMassFlag: '-cMass', releaseYFlag: '-releasey', releaseYCode: 0 | 1 | 2 | 3]",
    "  | [consistentMassFlag: '-cMass', releaseZFlag: '-releasez', releaseZCode: 0 | 1 | 2 | 3, releaseYFlag: '-releasey', releaseYCode: 0 | 1 | 2 | 3]",
    "  | [massFlag: '-mass', massDensity: number, consistentMassFlag: '-cMass', releaseZFlag: '-releasez', releaseZCode: 0 | 1 | 2 | 3]",
    "  | [massFlag: '-mass', massDensity: number, consistentMassFlag: '-cMass', releaseYFlag: '-releasey', releaseYCode: 0 | 1 | 2 | 3]",
    "  | [massFlag: '-mass', massDensity: number, consistentMassFlag: '-cMass', releaseZFlag: '-releasez', releaseZCode: 0 | 1 | 2 | 3, releaseYFlag: '-releasey', releaseYCode: 0 | 1 | 2 | 3];",
]


def exported_commands() -> list[str]:
    import openseespy.opensees as ops

    return sorted(
        name
        for name in dir(ops)
        if not name.startswith("_")
        and name != "OpenSeesError"
        and callable(getattr(ops, name))
        and not inspect.isclass(getattr(ops, name))
    )


def documented_signatures(docs: Path, commands: set[str]) -> dict[str, list[dict[str, str]]]:
    result: dict[str, list[dict[str, str]]] = {name: [] for name in commands}
    directive = re.compile(r"^\.\. function::\s*(.*)$")

    for path in docs.rglob("*.rst"):
        source_text = path.read_text(encoding="utf-8", errors="ignore")
        lines = source_text.splitlines()
        parameter_types = {
            name: kind
            for name, kind in re.findall(
                r"``([^`]+)``\s+\|(float|int|integer|str|bool|listi|listf|lists|list)\|",
                source_text,
            )
        }
        index = 0
        while index < len(lines):
            match = directive.match(lines[index])
            if not match:
                index += 1
                continue

            signature = match.group(1).strip()
            index += 1
            while not has_balanced_call(signature) and index < len(lines) and lines[index].startswith((" ", "\t")):
                continuation = lines[index].strip()
                if continuation:
                    signature += " " + continuation
                index += 1

            signature = trim_call(re.sub(r"\s+", " ", signature))
            name_match = re.match(r"(?:[A-Za-z_]\w*\.)*([A-Za-z_]\w*)\s*\(", signature)
            if not name_match:
                continue
            name = name_match.group(1)
            if name in result:
                entry = {
                    "signature": signature,
                    "source": path.name,
                    "parameterTypes": parameter_types,
                }
                if entry not in result[name]:
                    result[name].append(entry)

    return result


def has_balanced_call(value: str) -> bool:
    return trim_call(value) != value or (value.rstrip().endswith(")") and value.count("(") == value.count(")"))


def trim_call(value: str) -> str:
    start = value.find("(")
    if start < 0:
        return value
    depth = 0
    quote: str | None = None
    escaped = False
    for index in range(start, len(value)):
        char = value[index]
        if escaped:
            escaped = False
            continue
        if char == "\\":
            escaped = True
            continue
        if quote:
            if char == quote:
                quote = None
            continue
        if char in "'\"":
            quote = char
        elif char == "(":
            depth += 1
        elif char == ")":
            depth -= 1
            if depth == 0:
                return value[: index + 1]
    return value


def literal_variants(entries: list[dict[str, str]], command: str) -> list[str]:
    pattern = re.compile(rf"^{re.escape(command)}\s*\(\s*['\"]([^'\"]+)['\"]")
    variants = set()
    for entry in entries:
        match = pattern.match(entry["signature"])
        if match:
            variants.add(match.group(1))
    return sorted(variants, key=str.casefold)


def ts_string(value: str) -> str:
    return json.dumps(value, ensure_ascii=True)


def split_arguments(value: str) -> list[str]:
    result: list[str] = []
    current: list[str] = []
    stack: list[str] = []
    quote: str | None = None
    escaped = False
    pairs = {")": "(", "]": "[", "}": "{", ">": "<"}

    for char in value:
        if escaped:
            current.append(char)
            escaped = False
            continue
        if char == "\\":
            current.append(char)
            escaped = True
            continue
        if quote:
            current.append(char)
            if char == quote:
                quote = None
            continue
        if char in "'\"":
            quote = char
            current.append(char)
        elif char in "([{<":
            stack.append(char)
            current.append(char)
        elif char in ")]}>" and stack and stack[-1] == pairs[char]:
            stack.pop()
            current.append(char)
        elif char == "," and not stack:
            token = "".join(current).strip()
            if token:
                result.append(token)
            current = []
        else:
            current.append(char)

    token = "".join(current).strip()
    if token:
        result.append(token)
    return result


def signature_arguments(signature: str) -> list[str]:
    start = signature.find("(")
    end = signature.rfind(")")
    if start < 0 or end <= start:
        return []
    return split_arguments(signature[start + 1 : end])


def safe_parameter_name(value: str, used: set[str], fallback: str) -> str:
    name = re.sub(r"[^A-Za-z0-9_$]", "_", value.strip())
    name = re.sub(r"_+", "_", name).strip("_") or fallback
    if name[0].isdigit():
        name = "arg_" + name
    if name in {
        "await", "break", "case", "catch", "class", "const", "continue", "debugger",
        "default", "delete", "do", "else", "enum", "export", "extends", "false",
        "finally", "for", "function", "if", "implements", "import", "in", "instanceof",
        "interface", "let", "new", "null", "package", "private", "protected", "public",
        "return", "static", "super", "switch", "this", "throw", "true", "try", "typeof",
        "var", "void", "while", "with", "yield",
    }:
        name = "_" + name
    base = name
    suffix = 2
    while name in used:
        name = f"{base}{suffix}"
        suffix += 1
    used.add(name)
    return name


def infer_ts_type(name: str, default: str | None, documented: dict[str, str], variadic: bool) -> str:
    kind = documented.get(name)
    if kind in {"int", "integer", "float"}:
        return "number"
    if kind == "str":
        return "string"
    if kind == "bool":
        return "boolean"
    if kind in {"listi", "listf"}:
        return "number" if variadic else "readonly number[]"
    if kind == "lists":
        return "string" if variadic else "readonly string[]"
    if kind == "list":
        return "OpenSeesPyArgument" if variadic else "readonly OpenSeesPyArgument[]"

    if default:
        normalized = default.strip()
        if normalized in {"True", "False", "true", "false"}:
            return "boolean"
        if (normalized.startswith("'") and normalized.endswith("'")) or (
            normalized.startswith('"') and normalized.endswith('"')
        ):
            return "string"
        if normalized == "None":
            return "OpenSeesPyArgument"

    lower = name.lower()
    if any(part in lower for part in ("filename", "filepath", "response", "type", "solver", "algorithm", "code", "unit")):
        return "string"
    if lower in {"file", "damage", "option", "scheme", "method"}:
        return "string"
    return "number"


def expand_optional_group(token: str) -> list[tuple[str, bool]]:
    token = token.strip()
    if token.startswith("<") and token.endswith(">"):
        return [(item, True) for item in split_arguments(token[1:-1])]
    return [(token, False)]


def render_overload(
    command: str,
    entry: dict[str, object],
    *,
    array_mid_variadic: bool = True,
) -> str | None:
    documented = entry.get("parameterTypes", {})
    if not isinstance(documented, dict):
        documented = {}
    expanded: list[tuple[str, bool]] = []
    for token in signature_arguments(str(entry["signature"])):
        expanded.extend(expand_optional_group(token))

    parameters: list[dict[str, object]] = []
    used: set[str] = set()
    for index, (token, group_optional) in enumerate(expanded):
        token = token.strip()
        if not token:
            continue
        variadic = token.startswith("*")
        if variadic:
            token = token.lstrip("*").strip()

        default: str | None = None
        if "=" in token:
            token, default = token.split("=", 1)
            token = token.strip()
            default = default.strip()

        literal_match = re.fullmatch(r"(['\"])(.*)\1", token)
        if literal_match:
            literal = literal_match.group(2)
            name = safe_parameter_name("type" if index == 0 else literal, used, f"arg{index + 1}")
            parameters.append({"name": name, "type": ts_string(literal), "optional": group_optional})
            continue

        name = safe_parameter_name(token, used, f"arg{index + 1}")
        ts_type = infer_ts_type(token, default, documented, variadic)
        optional = group_optional or default is not None or (variadic and index == len(expanded) - 1)

        if variadic:
            array_type = infer_ts_type(token, default, documented, False)
            if not array_type.startswith("readonly "):
                array_type = f"readonly {array_type}[]"
            parameters.append({"name": name, "type": array_type, "optional": optional})
            continue
        parameters.append({"name": name, "type": ts_type, "optional": optional})

    if not parameters and signature_arguments(str(entry["signature"])):
        return None

    last_required = max(
        (index for index, item in enumerate(parameters) if not item.get("optional") and not item.get("rest")),
        default=-1,
    )
    rendered: list[str] = []
    for index, item in enumerate(parameters):
        name = str(item["name"])
        ts_type = str(item["type"])
        if item.get("optional") and index > last_required:
            rendered.append(f"{name}?: {ts_type}")
        elif item.get("optional"):
            rendered.append(f"{name}: {ts_type} | undefined")
        else:
            rendered.append(f"{name}: {ts_type}")
    return f"  {command}({', '.join(rendered)}): this;"


def without_rest_parameters(overload: str) -> str:
    """Convert curated variadic parameters to one explicit named array parameter."""
    overload = re.sub(
        r"\.\.\.([A-Za-z_$][\w$]*):\s*\[([^,\]]+),\s*\.\.\.\2\[\]\]",
        lambda match: f"{match.group(1)}?: readonly {match.group(2).strip()}[]",
        overload,
    )
    overload = re.sub(
        r"\.\.\.([A-Za-z_$][\w$]*):\s*([A-Za-z_$][\w$<> |'\"]*)\[\]",
        lambda match: f"{match.group(1)}?: readonly {match.group(2).strip()}[]",
        overload,
    )
    overload = re.sub(
        r"\.\.\.([A-Za-z_$][\w$]*):\s*([A-Za-z_$][\w$]*)",
        lambda match: f"{match.group(1)}?: {match.group(2)}",
        overload,
    )
    return overload


def command_overloads(name: str, entries: object, variants: object) -> list[str]:
    overloads: list[str] = []
    if not isinstance(entries, list):
        entries = []

    selected_entries = entries
    if isinstance(variants, list) and variants:
        special_variants = SPECIAL_VARIANT_OVERLOADS.get(name, {})
        selected_entries = [
            entry
            for entry in entries
            if re.match(
                rf"^{re.escape(name)}\s*\(\s*['\"]",
                str(entry.get("signature", "")),
            )
            and not any(
                re.match(
                    rf"^{re.escape(name)}\s*\(\s*['\"]{re.escape(variant)}['\"]",
                    str(entry.get("signature", "")),
                )
                for variant in special_variants
            )
        ]

    sorted_entries = sorted(
        selected_entries,
        key=lambda entry: not bool(re.match(
            rf"^{re.escape(name)}\s*\(\s*['\"]",
            str(entry.get("signature", "")),
        )),
    )
    for entry in sorted_entries:
        overload = render_overload(name, entry)
        if overload:
            overload = without_rest_parameters(overload)
        if overload and overload not in overloads:
            overloads.append(overload)
    for special in SPECIAL_VARIANT_OVERLOADS.get(name, {}).values():
        for overload in special:
            overload = without_rest_parameters(overload)
            if overload not in overloads:
                overloads.append(overload)
    return overloads


def overload_variant_tuple(command: str, overload: str) -> tuple[str, str] | None:
    prefix = f"  {command}("
    suffix = "): this;"
    if not overload.startswith(prefix) or not overload.endswith(suffix):
        return None
    parameters = split_arguments(overload[len(prefix) : -len(suffix)])
    if not parameters:
        return None
    literal = re.match(r"^[A-Za-z_$][\w$]*:\s*(['\"])(.*?)\1$", parameters[0])
    if not literal:
        return None
    variant = literal.group(2)
    remaining = parameters[1:]
    tuple_type = "[" + ", ".join(remaining) + "]"
    return variant, tuple_type


def resolved_overloads(command: str, entries: object, variants: object) -> list[str]:
    special = SPECIAL_OVERLOADS.get(command)
    if special:
        return [without_rest_parameters(overload) for overload in special]
    return command_overloads(command, entries, variants)


def resolved_variant_values(command: str, entries: object, stored: object) -> list[str]:
    values = list(stored) if isinstance(stored, list) else []
    if isinstance(entries, list):
        values.extend(literal_variants(entries, command))
    for overload in resolved_overloads(command, entries, values):
        parsed = overload_variant_tuple(command, overload)
        if parsed:
            values.append(parsed[0])
    return list(dict.fromkeys(values))


def argument_map_name(command: str) -> str:
    return command[0].upper() + command[1:] + "Arguments"


def variant_command_interface(command: str, overloads: list[str], variants: list[str]) -> list[str]:
    interface_name = command[0].upper() + command[1:] + "Command"
    lines = [
        f"/** Callable Tcl-compatible {command} dispatcher with discoverable per-variant methods. */",
        f"export interface {interface_name}<TReturn> {{",
    ]
    variant_methods: list[str] = []
    rendered_variants: set[str] = set()
    for overload in overloads:
        prefix = f"  {command}("
        suffix = "): this;"
        if not overload.startswith(prefix) or not overload.endswith(suffix):
            continue
        parameters = split_arguments(overload[len(prefix) : -len(suffix)])
        if not parameters:
            continue
        literal = re.match(r"^[A-Za-z_$][\w$]*:\s*(['\"])(.*?)\1$", parameters[0])
        if not literal:
            continue
        variant = literal.group(2)
        rendered_variants.add(variant)
        remaining = ", ".join(parameters[1:])
        lines.append(f"  ({', '.join(parameters)}): TReturn;")
        method = f"  {ts_string(variant)}({remaining}): TReturn;"
        if method not in variant_methods:
            variant_methods.append(method)
    for variant in variants:
        if variant not in rendered_variants:
            variant_methods.append(
                f"  {ts_string(variant)}(args?: readonly OpenSeesPyArgument[]): TReturn;"
            )
    lines.extend(variant_methods)
    lines.extend(["}", ""])
    return lines


def generate_types(metadata: dict[str, object]) -> str:
    commands = metadata["commands"]
    assert isinstance(commands, list)
    variants = metadata["variants"]
    assert isinstance(variants, dict)

    lines = [
        "// Generated by tools/generate-openseespy-api.py. Do not edit manually.",
        f"// OpenSeesPy {metadata['openseesPyVersion']} public callable inventory.",
        "import type { OpenSeesModelBuilderType, OpenSeesPyArgument } from '../types.js';",
        "",
        "export const OPEN_SEES_PY_VERSION = " + ts_string(str(metadata["openseesPyVersion"])) + " as const;",
        "export const OPEN_SEES_PY_COMMANDS = [",
    ]
    lines.extend(f"  {ts_string(str(command['name']))}," for command in commands)
    lines.extend([
        "] as const;",
        "",
        "export type OpenSeesPyCommandName = typeof OPEN_SEES_PY_COMMANDS[number];",
        "",
    ])

    available_variant_commands: list[str] = []
    for command in VARIANT_COMMANDS:
        command_metadata = next(
            (item for item in commands if str(item["name"]) == command),
            None,
        )
        if command_metadata is None:
            continue
        entries = command_metadata.get("signatures", [])
        values = resolved_variant_values(command, entries, variants.get(command, []))
        if values:
            available_variant_commands.append(command)

    lines.append("export const OPEN_SEES_VARIANT_COMMANDS = [")
    lines.extend(f"  {ts_string(command)}," for command in available_variant_commands)
    lines.extend([
        "] as const;",
        "",
        "export type OpenSeesVariantCommandName = typeof OPEN_SEES_VARIANT_COMMANDS[number];",
        "",
    ])

    for command in VARIANT_COMMANDS:
        command_metadata = next(
            (item for item in commands if str(item["name"]) == command),
            None,
        )
        entries = command_metadata.get("signatures", []) if command_metadata else []
        values = resolved_variant_values(command, entries, variants.get(command, []))
        if not values:
            continue
        type_name = command[0].upper() + command[1:] + "Type"
        union = " | ".join(ts_string(str(value)) for value in values)
        lines.append(f"export type {type_name} = {union};")
    lines.extend(["", *SPECIAL_TYPE_DECLARATIONS, ""])

    argument_maps: dict[str, str] = {}
    for command in commands:
        name = str(command["name"])
        entries = command.get("signatures", [])
        values = resolved_variant_values(name, entries, variants.get(name, []))
        if name not in VARIANT_COMMANDS or not isinstance(values, list) or not values:
            continue
        overloads = resolved_overloads(name, command.get("signatures", []), values)
        grouped: dict[str, list[str]] = {}
        for overload in overloads:
            parsed = overload_variant_tuple(name, overload)
            if not parsed:
                continue
            variant, tuple_type = parsed
            grouped.setdefault(variant, [])
            if tuple_type not in grouped[variant]:
                grouped[variant].append(tuple_type)

        all_values = list(dict.fromkeys([*(str(value) for value in values), *grouped.keys()]))
        map_name = argument_map_name(name)
        argument_maps[name] = map_name
        lines.append(f"export interface {map_name} {{")
        for value in all_values:
            tuples = grouped.get(value) or ["[args?: readonly OpenSeesPyArgument[]]"]
            lines.append(f"  {ts_string(value)}: {' | '.join(tuples)};")
        lines.extend(["}", ""])

    for command in commands:
        name = str(command["name"])
        if name not in available_variant_commands:
            continue
        entries = command.get("signatures", [])
        values = resolved_variant_values(name, entries, variants.get(name, []))
        lines.extend(variant_command_interface(
            name,
            resolved_overloads(name, entries, values),
            values,
        ))

    lines.append("export interface OpenSeesPyCommandMethods {")

    for command in commands:
        name = str(command["name"])
        entries = command.get("signatures", [])
        signatures = [str(entry.get("signature", "")) for entry in entries if isinstance(entry, dict)]
        available = [signature for signature in signatures if signature]
        summary = " | ".join(available[:3]) or f"{name}(...)"
        if len(available) > 3:
            summary += f" | ... ({len(available)} documented forms)"
        lines.append(f"  /** OpenSeesPy: {summary.replace('*/', '* /')} */")
        if name in available_variant_commands:
            interface_name = name[0].upper() + name[1:] + "Command"
            lines.append(f"  readonly {name}: {interface_name}<this>;")
            continue
        if name in SPECIAL_OVERLOADS:
            lines.extend(without_rest_parameters(overload) for overload in SPECIAL_OVERLOADS[name])
            continue

        if name in argument_maps:
            overloads = command_overloads(name, entries, variants.get(name, []))
            lines.extend(overloads)
            if not overloads:
                lines.append(f"  {name}(type: {name[0].upper() + name[1:]}Type, args?: readonly OpenSeesPyArgument[]): this;")
            continue

        overloads = command_overloads(name, entries, variants.get(name, []))
        lines.extend(overloads)
        if not overloads:
            lines.append(f"  {name}(args?: readonly OpenSeesPyArgument[]): this;")

    lines.extend(["}", ""])
    return "\n".join(lines)


def generate_reference(metadata: dict[str, object]) -> str:
    commands = metadata["commands"]
    assert isinstance(commands, list)
    variants = metadata.get("variants", {})
    assert isinstance(variants, dict)
    lines = [
        "# OpenSeesJS API reference",
        "",
        f"Generated from the OpenSeesPy `{metadata['openseesPyVersion']}` command inventory.",
        "The TypeScript signatures below are the public command overloads used by `ops`.",
        "Typed variants are also discoverable as `ops.<command>.<type>(...)` methods.",
        "Queries that return values directly are listed first.",
        "",
        "## Native queries",
        "",
        "`analyze`, `getTime`, `getLoadFactor`, `getNodeTags`, `getEleTags`, `nodeCoord`, ",
        "`nodeDisp`, `nodeVel`, `nodeAccel`, `nodeReaction`, `eleResponse`, `eleForce`, ",
        "`eigen`, `nodeEigenvector`, `modalProperties`, `modalResults`, `version`, ",
        "`nodeDisplacements`, `nodeReactions`, `elementForces`, `elementLocalForces2D`.",
        "",
        "## Commands",
        "",
    ]
    for command in commands:
        name = str(command["name"])
        entries = command.get("signatures", [])
        reference = [str(entry.get("signature", "")) for entry in entries if isinstance(entry, dict)]
        overloads = (
            [without_rest_parameters(overload) for overload in SPECIAL_OVERLOADS[name]]
            if name in SPECIAL_OVERLOADS
            else command_overloads(name, entries, variants.get(name, []))
        )
        lines.extend([f"### `{name}`", ""])
        if reference:
            lines.append("OpenSees: " + "; ".join(f"`{value}`" for value in reference))
            lines.append("")
        lines.append("```ts")
        lines.extend(overload.strip() for overload in overloads)
        if not overloads:
            lines.append(f"{name}(args?: readonly OpenSeesPyArgument[]): this;")
        lines.extend(["```", ""])
    return "\n".join(lines)


def generate_coverage(metadata: dict[str, object]) -> str:
    commands = metadata["commands"]
    assert isinstance(commands, list)
    variants = metadata.get("variants", {})
    assert isinstance(variants, dict)
    lines = [
        "# OpenSeesPy API coverage",
        "",
        f"Reference: OpenSeesPy `{metadata['openseesPyVersion']}`.",
        "",
        "`Generated` means the TypeScript method exists in the native `ops` API and invokes OpenSees in-process.",
        "Commands preserve the OpenSees Tcl-style positional arguments and flags without generating `.tcl` files.",
        "",
        "| OpenSeesPy API | Argument inference | Native mapping | Inventory test |",
        "|---|---:|---:|---:|",
    ]
    for command in commands:
        name = str(command["name"])
        if name in PYTHON_ONLY:
            mapping = "unsupported: Python binding only"
        elif name in {"pattern", "section", "fiber", "patch", "layer", "printModel"}:
            mapping = "translated"
        else:
            mapping = "direct"
        signatures = command.get("signatures", [])
        signature_count = len(signatures) if isinstance(signatures, list) else 0
        overloads = SPECIAL_OVERLOADS.get(name) or command_overloads(
            name,
            signatures,
            variants.get(name, []),
        )
        generic_count = sum("OpenSeesPyArgument" in overload for overload in overloads)
        if not overloads:
            inference = "generic fallback"
        elif generic_count == 0:
            inference = f"exact ({signature_count or 'curated'})"
        elif generic_count < len(overloads):
            inference = f"mixed ({len(overloads) - generic_count}/{len(overloads)} exact)"
        else:
            inference = "documented, variable arguments"
        lines.append(f"| `{name}` | {inference} | {mapping} | yes |")
    lines.append("")
    return "\n".join(lines)


def main() -> None:
    parser = argparse.ArgumentParser()
    parser.add_argument("--docs", type=Path)
    parser.add_argument("--root", type=Path, default=Path(__file__).resolve().parents[1])
    args = parser.parse_args()

    metadata_dir = args.root / "metadata"
    generated_dir = args.root / "src" / "openseespy" / "generated"
    metadata_dir.mkdir(parents=True, exist_ok=True)
    generated_dir.mkdir(parents=True, exist_ok=True)

    metadata_path = metadata_dir / "openseespy-api.json"
    if args.docs:
        if metadata_path.exists():
            previous_metadata = json.loads(metadata_path.read_text(encoding="utf-8"))
            commands = [str(command["name"]) for command in previous_metadata["commands"]]
            version = str(previous_metadata["openseesPyVersion"])
        else:
            commands = exported_commands()
            version = importlib.metadata.version("openseespy")
        signatures = documented_signatures(args.docs, set(commands))
        variants = {
            command: literal_variants(signatures[command], command)
            for command in VARIANT_COMMANDS
        }
        metadata = {
            "openseesPyVersion": version,
            "commands": [
                {
                    "name": name,
                    "signatures": signatures[name],
                    "documented": bool(signatures[name]),
                }
                for name in commands
            ],
            "variants": variants,
        }
    else:
        if not metadata_path.exists():
            parser.error("--docs is required when metadata/openseespy-api.json does not exist")
        metadata = json.loads(metadata_path.read_text(encoding="utf-8"))

    metadata_path.write_text(
        json.dumps(metadata, indent=2, ensure_ascii=True) + "\n",
        encoding="utf-8",
    )
    (generated_dir / "OpenSeesPyApi.generated.ts").write_text(
        generate_types(metadata),
        encoding="utf-8",
    )
    generated_source = (generated_dir / "OpenSeesPyApi.generated.ts").read_text(encoding="utf-8")
    public_rest = re.findall(r"\.\.\.[A-Za-z_$][\w$]*\s*:", generated_source)
    if public_rest:
        raise RuntimeError(f"Generated API still contains rest parameters: {sorted(set(public_rest))}")
    (args.root / "API_COVERAGE.md").write_text(generate_coverage(metadata), encoding="utf-8")
    (args.root / "API_REFERENCE.md").write_text(generate_reference(metadata), encoding="utf-8")


if __name__ == "__main__":
    main()
