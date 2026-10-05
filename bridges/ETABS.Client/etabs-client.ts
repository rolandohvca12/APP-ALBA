// Generated from ETABSv1 metadata. Do not edit manually.
// Source: C:\Program Files\Computers and Structures\ETABS 22\ETABSv1.dll

export interface EtabsRpcMessage {
  id?: string;
  protocolVersion?: 1;
  api: string;
  method: string;
  parameters?: Record<string, unknown>;
}

export interface EtabsTransport {
  request<T>(message: EtabsRpcMessage): Promise<T>;
}

export enum e2DFrameType {
  PortalFrame = "PortalFrame",
  ConcentricBraced = "ConcentricBraced",
  EccentricBraced = "EccentricBraced",
}

export enum e3DFrameType {
  OpenFrame = "OpenFrame",
  PerimeterFrame = "PerimeterFrame",
  BeamSlab = "BeamSlab",
  FlatPlate = "FlatPlate",
}

export enum eAreaDesignOrientation {
  Wall = "Wall",
  Floor = "Floor",
  Ramp_DO_NOT_USE = "Ramp_DO_NOT_USE",
  Null_ = "Null",
  Other = "Other",
}

export enum eBridgeCodeAASHTO {
  AASHTO_STD_2002 = "AASHTO_STD_2002",
  AASHTO_LRFD_2007 = "AASHTO_LRFD_2007",
  AASHTO_LRFD_2012 = "AASHTO_LRFD_2012",
  AASHTO_LRFD_2014 = "AASHTO_LRFD_2014",
  AASHTO_LRFD_2017 = "AASHTO_LRFD_2017",
  AASHTO_LRFD_2020 = "AASHTO_LRFD_2020",
}

export enum eBridgeCodeInterims {
  NoInterims = "NoInterims",
  Interim_2011 = "Interim_2011",
  Interim_2012 = "Interim_2012",
  Interim_2013 = "Interim_2013",
  Interim_2014 = "Interim_2014",
  Interim_2015 = "Interim_2015",
}

export enum eBridgeObjectBentPart {
  CapBeam = "CapBeam",
  Column = "Column",
  Bearing = "Bearing",
  Wall = "Wall",
}

export enum eBridgeObjectFoundationPart {
  Footing = "Footing",
  PileCap = "PileCap",
  Pile = "Pile",
  FoundationSpring = "FoundationSpring",
}

export enum eBridgeObjectType {
  General = "General",
  Segmental = "Segmental",
}

export enum eBridgeObjectUserPointType {
  General = "General",
  SegmentalTendon = "SegmentalTendon",
}

export enum eBridgeResponseDesignRating {
  S11_Longitudinal_Top_Left = "S11_Longitudinal_Top_Left",
  S11_Longitudinal_Top_Center = "S11_Longitudinal_Top_Center",
  S11_Longitudinal_Top_Right = "S11_Longitudinal_Top_Right",
  S11_Longitudinal_Top_Envelope = "S11_Longitudinal_Top_Envelope",
  S11_Longitudinal_Slab_Top_Left = "S11_Longitudinal_Slab_Top_Left",
  S11_Longitudinal_Slab_Top_Center = "S11_Longitudinal_Slab_Top_Center",
  S11_Longitudinal_Slab_Top_Beam_Center = "S11_Longitudinal_Slab_Top_Beam_Center",
  S11_Longitudinal_Slab_Top_Right = "S11_Longitudinal_Slab_Top_Right",
  S11_Longitudinal_Slab_Top_Envelope = "S11_Longitudinal_Slab_Top_Envelope",
  S11_Longitudinal_Beam_Top_Left = "S11_Longitudinal_Beam_Top_Left",
  S11_Longitudinal_Beam_Top_Center = "S11_Longitudinal_Beam_Top_Center",
  S11_Longitudinal_Beam_Top_Right = "S11_Longitudinal_Beam_Top_Right",
  S11_Longitudinal_Beam_Top_Envelope = "S11_Longitudinal_Beam_Top_Envelope",
  S11_Longitudinal_Bot_Left = "S11_Longitudinal_Bot_Left",
  S11_Longitudinal_Bot_Left_Corner = "S11_Longitudinal_Bot_Left_Corner",
  S11_Longitudinal_Bot_Center = "S11_Longitudinal_Bot_Center",
  S11_Longitudinal_Bot_Right = "S11_Longitudinal_Bot_Right",
  S11_Longitudinal_Bot_Right_Corner = "S11_Longitudinal_Bot_Right_Corner",
  S11_Longitudinal_Bot_Envelope = "S11_Longitudinal_Bot_Envelope",
  S11_Longitudinal_Girder_Bot_Left = "S11_Longitudinal_Girder_Bot_Left",
  S11_Longitudinal_Girder_Bot_Right = "S11_Longitudinal_Girder_Bot_Right",
  S11_Longitudinal_Girder_Bot_Envelope = "S11_Longitudinal_Girder_Bot_Envelope",
  S11_Longitudinal_Slab_Bot_Left = "S11_Longitudinal_Slab_Bot_Left",
  S11_Longitudinal_Slab_Bot_Beam_Left = "S11_Longitudinal_Slab_Bot_Beam_Left",
  S11_Longitudinal_Slab_Bot_Beam_Center = "S11_Longitudinal_Slab_Bot_Beam_Center",
  S11_Longitudinal_Slab_Bot_Beam_Right = "S11_Longitudinal_Slab_Bot_Beam_Right",
  S11_Longitudinal_Slab_Bot_Center = "S11_Longitudinal_Slab_Bot_Center",
  S11_Longitudinal_Slab_Bot_Right = "S11_Longitudinal_Slab_Bot_Right",
  S11_Longitudinal_Slab_Bot_Envelope = "S11_Longitudinal_Slab_Bot_Envelope",
  S11_Longitudinal_Beam_Bot_Left = "S11_Longitudinal_Beam_Bot_Left",
  S11_Longitudinal_Beam_Bot_Right = "S11_Longitudinal_Beam_Bot_Right",
  S11_Longitudinal_Beam_Bot_Envelope = "S11_Longitudinal_Beam_Bot_Envelope",
  Design_Shear_Demand_Concrete_Shear_Capacity_Ratio = "Design_Shear_Demand_Concrete_Shear_Capacity_Ratio",
  Design_Shear_Controlling_Shear_DC_Ratio = "Design_Shear_Controlling_Shear_DC_Ratio",
  Design_Shear_Controlling_Torsion_DC_Ratio = "Design_Shear_Controlling_Torsion_DC_Ratio",
  Design_Shear_Required_Extra_Shear_Rebar_Area_PerL = "Design_Shear_Required_Extra_Shear_Rebar_Area_PerL",
  Design_Shear_Required_Extra_Longit_Rebar_Area = "Design_Shear_Required_Extra_Longit_Rebar_Area",
  Design_Shear_Required_Extra_Longit_Rebar_Area_For_Torsion = "Design_Shear_Required_Extra_Longit_Rebar_Area_For_Torsion",
  Design_Shear_Required_Extra_Longit_Rebar_Area_Bot_Slab = "Design_Shear_Required_Extra_Longit_Rebar_Area_Bot_Slab",
  S11_Longitudinal_Beam_Bot_Center = "S11_Longitudinal_Beam_Bot_Center",
  Design_Shear_Required_Extra_Longit_Rebar_Area_Top_Slab = "Design_Shear_Required_Extra_Longit_Rebar_Area_Top_Slab",
  Design_Shear_Required_Extra_Longit_Rebar_Area_Slab = "Design_Shear_Required_Extra_Longit_Rebar_Area_Slab",
  Design_Shear_Required_Extra_Longit_Rebar_Area_Beam = "Design_Shear_Required_Extra_Longit_Rebar_Area_Beam",
  Design_Shear_Controlling_DC_Ratio = "Design_Shear_Controlling_DC_Ratio",
  Design_Shear_Rebar_Area_PerL = "Design_Shear_Rebar_Area_PerL",
  Design_Shear_Longit_Rebar_Area = "Design_Shear_Longit_Rebar_Area",
  Design_Shear_Longit_Rebar_Area_Bot_Slab = "Design_Shear_Longit_Rebar_Area_Bot_Slab",
  Design_Shear_Longit_Rebar_Area_Top_Slab = "Design_Shear_Longit_Rebar_Area_Top_Slab",
  Design_Shear_Longit_Rebar_Area_Bot_Flange = "Design_Shear_Longit_Rebar_Area_Bot_Flange",
  Design_Shear_Longit_Rebar_Area_Slab = "Design_Shear_Longit_Rebar_Area_Slab",
  Design_Shear_Longit_Rebar_Area_Beam = "Design_Shear_Longit_Rebar_Area_Beam",
  Design_Shear_Longit_Torsional_Rebar_Area_PerL = "Design_Shear_Longit_Torsional_Rebar_Area_PerL",
  Design_Shear_Torsion_Rebar_Area_PerL = "Design_Shear_Torsion_Rebar_Area_PerL",
  Design_Shear_Torsion_Plus_Shear_Rebar_Area_PerL = "Design_Shear_Torsion_Plus_Shear_Rebar_Area_PerL",
  Design_Crack_Top_Crack_Width = "Design_Crack_Top_Crack_Width",
  Design_Crack_Bot_Crack_Width = "Design_Crack_Bot_Crack_Width",
  Design_Crack_Top_Bot_Crack_Widths = "Design_Crack_Top_Bot_Crack_Widths",
  Design_Principal_Stress_Envelope = "Design_Principal_Stress_Envelope",
  Design_Principal_Stress_Web_Top = "Design_Principal_Stress_Web_Top",
  Design_Principal_Stress_Web_Bot = "Design_Principal_Stress_Web_Bot",
  Design_Principal_Stress_Beam_Web_Top = "Design_Principal_Stress_Beam_Web_Top",
  Design_Principal_Stress_Beam_Web_Bot = "Design_Principal_Stress_Beam_Web_Bot",
  Design_Principal_Stress_Neutral_Axis = "Design_Principal_Stress_Neutral_Axis",
  Design_Tendon_Stress_Controlling_DC_Ratio = "Design_Tendon_Stress_Controlling_DC_Ratio",
  Design_Flexure_Moment_About_Horizontal_Axis_M3 = "Design_Flexure_Moment_About_Horizontal_Axis_M3",
  Design_Strength_DC_Ratio_Positive_Moment = "Design_Strength_DC_Ratio_Positive_Moment",
  Design_Strength_DC_Ratio_Negative_Moment = "Design_Strength_DC_Ratio_Negative_Moment",
  Design_Strength_DC_Ratio_Shear = "Design_Strength_DC_Ratio_Shear",
  Design_Strength_DC_Ratio_Net_Section_Fracture_Pos = "Design_Strength_DC_Ratio_Net_Section_Fracture_Pos",
  Design_Strength_DC_Ratio_Net_Section_Fracture_Neg = "Design_Strength_DC_Ratio_Net_Section_Fracture_Neg",
  Design_Strength_DC_Ratio_FlexureShearInteract_Pos = "Design_Strength_DC_Ratio_FlexureShearInteract_Pos",
  Design_Strength_DC_Ratio_FlexureShearInteract_Neg = "Design_Strength_DC_Ratio_FlexureShearInteract_Neg",
  Design_Strength_Total_Nominal_Shear_Force_6_10_10_4_2 = "Design_Strength_Total_Nominal_Shear_Force_6_10_10_4_2",
  Design_Fatigue_Top_Flange_Tensile_Stress_Range_Without_FLB = "Design_Fatigue_Top_Flange_Tensile_Stress_Range_Without_FLB",
  Design_Fatigue_Bot_Flange_Tensile_Stress_Range_Without_FLB = "Design_Fatigue_Bot_Flange_Tensile_Stress_Range_Without_FLB",
  Design_Fatigue_Bot_Flange_Lateral_Bending_Stress_Range = "Design_Fatigue_Bot_Flange_Lateral_Bending_Stress_Range",
  Design_Fatigue_DC_Ratio_Web_Shear = "Design_Fatigue_DC_Ratio_Web_Shear",
  Rating_Shear = "Rating_Shear",
  Rating_Shear_Factored_Shear_Resistance = "Rating_Shear_Factored_Shear_Resistance",
  Rating_Shear_Factored_Shear_Resistance_UVr = "Rating_Shear_Factored_Shear_Resistance_UVr",
  Rating_Shear_Live_load_Capacity_Factor_F = "Rating_Shear_Live_load_Capacity_Factor_F",
  Rating_Flexure = "Rating_Flexure",
  Rating_Flexure_Factored_Moment_Resistance = "Rating_Flexure_Factored_Moment_Resistance",
  Rating_Flexure_Factored_Moment_Resistance_UMr = "Rating_Flexure_Factored_Moment_Resistance_UMr",
  Rating_Flexure_Live_load_Capacity_Factor_F = "Rating_Flexure_Live_load_Capacity_Factor_F",
  Rating_Strength_Shear_Rating = "Rating_Strength_Shear_Rating",
  Rating_Strength_Flexure_Rating = "Rating_Strength_Flexure_Rating",
  Rating_Strength_Live_load_Capacity_Factor_F_Moment_M3 = "Rating_Strength_Live_load_Capacity_Factor_F_Moment_M3",
  Rating_Strength_Live_load_Capacity_Factor_F_Shear_V2 = "Rating_Strength_Live_load_Capacity_Factor_F_Shear_V2",
  Rating_Service_Flexure_Rating = "Rating_Service_Flexure_Rating",
  Rating_MinRebar_Min_Of_Abs_1_2Mcr_And_Abs_1_33Mu_For_Pos = "Rating_MinRebar_Min_Of_Abs_1_2Mcr_And_Abs_1_33Mu_For_Pos",
  Rating_MinRebar_Min_Of_Abs_1_2Mcr_And_Abs_1_33Mu_For_Neg = "Rating_MinRebar_Min_Of_Abs_1_2Mcr_And_Abs_1_33Mu_For_Neg",
  Rating_MinRebar_Flexure_Rating = "Rating_MinRebar_Flexure_Rating",
  Rating_Service = "Rating_Service",
}

export enum eBridgeResponseDisplDOF {
  Vertical_Displacement = "Vertical_Displacement",
  Transverse_Displacement = "Transverse_Displacement",
  Longitudinal_Displacement = "Longitudinal_Displacement",
  Longitudinal_Rotation = "Longitudinal_Rotation",
  Avg_Longitudinal_Rotation = "Avg_Longitudinal_Rotation",
}

export enum eBridgeResponseDisplLoc {
  Web_Top = "Web_Top",
  Web_Bottom = "Web_Bottom",
  Web = "Web",
  Left_Web_Top = "Left_Web_Top",
  Left_Web_Bottom = "Left_Web_Bottom",
  Left_Web = "Left_Web",
  Right_Web_Top = "Right_Web_Top",
  Right_Web_Bottom = "Right_Web_Bottom",
  Right_Web = "Right_Web",
  Slab_Center = "Slab_Center",
}

export enum eBridgeResponseForce {
  Axial_Force_P = "Axial_Force_P",
  Shear_Vertical_V2 = "Shear_Vertical_V2",
  Shear_Horizontal_V3 = "Shear_Horizontal_V3",
  Torsion_T = "Torsion_T",
  Moment_About_Vertical_Axis_M2 = "Moment_About_Vertical_Axis_M2",
  Moment_About_Horizontal_Axis_M3 = "Moment_About_Horizontal_Axis_M3",
}

export enum eBridgeResponsePart {
  Entire_Bridge_Section = "Entire_Bridge_Section",
  Girder = "Girder",
  Beam = "Beam",
  Web = "Web",
  Slab = "Slab",
  All_Girders = "All_Girders",
  All_Beams = "All_Beams",
  All_Webs = "All_Webs",
  All_Slabs = "All_Slabs",
  Entire_Section_Plus_All_Girders = "Entire_Section_Plus_All_Girders",
}

export enum eBridgeResponseStress {
  S11_Longitudinal_Top_Left = "S11_Longitudinal_Top_Left",
  S11_Longitudinal_Top_Center = "S11_Longitudinal_Top_Center",
  S11_Longitudinal_Top_Right = "S11_Longitudinal_Top_Right",
  S11_Longitudinal_Top_Beam_Center = "S11_Longitudinal_Top_Beam_Center",
  S11_Longitudinal_Top_Envelope = "S11_Longitudinal_Top_Envelope",
  S11_Longitudinal_Top_ULeft_Left = "S11_Longitudinal_Top_ULeft_Left",
  S11_Longitudinal_Top_ULeft_Center = "S11_Longitudinal_Top_ULeft_Center",
  S11_Longitudinal_Top_ULeft_Right = "S11_Longitudinal_Top_ULeft_Right",
  S11_Longitudinal_Top_ULeft_Envelope = "S11_Longitudinal_Top_ULeft_Envelope",
  S11_Longitudinal_Top_URight_Left = "S11_Longitudinal_Top_URight_Left",
  S11_Longitudinal_Top_URight_Center = "S11_Longitudinal_Top_URight_Center",
  S11_Longitudinal_Top_URight_Right = "S11_Longitudinal_Top_URight_Right",
  S11_Longitudinal_Top_URight_Envelope = "S11_Longitudinal_Top_URight_Envelope",
  S11_Longitudinal_Bot_Left = "S11_Longitudinal_Bot_Left",
  S11_Longitudinal_Bot_Center = "S11_Longitudinal_Bot_Center",
  S11_Longitudinal_Bot_Right = "S11_Longitudinal_Bot_Right",
  S11_Longitudinal_Bot_Beam_Left = "S11_Longitudinal_Bot_Beam_Left",
  S11_Longitudinal_Bot_Beam_Right = "S11_Longitudinal_Bot_Beam_Right",
  S11_Longitudinal_Bot_Envelope = "S11_Longitudinal_Bot_Envelope",
  S11_Longitudinal_Top_Bot_Left = "S11_Longitudinal_Top_Bot_Left",
  S11_Longitudinal_Top_Bot_Center = "S11_Longitudinal_Top_Bot_Center",
  S11_Longitudinal_Top_Bot_Right = "S11_Longitudinal_Top_Bot_Right",
  S11_Lateral_Bending_Top = "S11_Lateral_Bending_Top",
  S11_Lateral_Bending_Top_ULeft = "S11_Lateral_Bending_Top_ULeft",
  S11_Lateral_Bending_Top_URight = "S11_Lateral_Bending_Top_URight",
  S11_Lateral_Bending_Bot = "S11_Lateral_Bending_Bot",
}

export enum eBridgeSegmentConstructionMethod {
  Precast = "Precast",
  CastInPlace = "CastInPlace",
}

export enum eBridgeSegmentType {
  Rigid = "Rigid",
  PierTable = "PierTable",
  Segment = "Segment",
  Closure = "Closure",
}

export enum eBridgeTendonCategory {
  General = "General",
  Cantilever = "Cantilever",
  BottomSpan = "BottomSpan",
  TopSpan = "TopSpan",
  Continuity = "Continuity",
}

export enum eCNameType {
  LoadCase = "LoadCase",
  LoadCombo = "LoadCombo",
}

export enum eConstraintAxis {
  X = "X",
  Y = "Y",
  Z = "Z",
  AutoAxis = "AutoAxis",
}

export enum eConstraintType {
  Body = "Body",
  Diaphragm = "Diaphragm",
  Plate = "Plate",
  Rod = "Rod",
  Beam = "Beam",
  Equal = "Equal",
  Local = "Local",
  Weld = "Weld",
  Line = "Line",
}

export enum eDeckType {
  Filled = "Filled",
  Unfilled = "Unfilled",
  SolidSlab = "SolidSlab",
}

export enum eDesignActionType {
  NonComposite = "NonComposite",
  ShortTermComposite = "ShortTermComposite",
  LongTermComposite = "LongTermComposite",
  Staged = "Staged",
  Other = "Other",
}

export enum eDiaphragmOption {
  Disconnect = "Disconnect",
  FromShellObject = "FromShellObject",
  DefinedDiaphragm = "DefinedDiaphragm",
}

export enum eFileTypeIO {
  TextFile = "TextFile",
  DBTablesExcel = "DBTablesExcel",
  DBTablesAccess = "DBTablesAccess",
  DBTablesText = "DBTablesText",
  DBTablesXML = "DBTablesXML",
}

export enum eForce {
  NotApplicable = "NotApplicable",
  lb = "lb",
  kip = "kip",
  N = "N",
  kN = "kN",
  kgf = "kgf",
  tonf = "tonf",
}

export enum eFrameDesignOrientation {
  Column = "Column",
  Beam = "Beam",
  Brace = "Brace",
  Null_ = "Null",
  Other = "Other",
}

export enum eFramePropType {
  I = "I",
  Channel = "Channel",
  T = "T",
  Angle = "Angle",
  DblAngle = "DblAngle",
  Box = "Box",
  Pipe = "Pipe",
  Rectangular = "Rectangular",
  Circle = "Circle",
  General = "General",
  DbChannel = "DbChannel",
  Auto = "Auto",
  SD = "SD",
  Variable = "Variable",
  Joist = "Joist",
  Bridge = "Bridge",
  Cold_C = "Cold_C",
  Cold_2C = "Cold_2C",
  Cold_Z = "Cold_Z",
  Cold_L = "Cold_L",
  Cold_2L = "Cold_2L",
  Cold_Hat = "Cold_Hat",
  BuiltupICoverplate = "BuiltupICoverplate",
  PCCGirderI = "PCCGirderI",
  PCCGirderU = "PCCGirderU",
  BuiltupIHybrid = "BuiltupIHybrid",
  BuiltupUHybrid = "BuiltupUHybrid",
  Concrete_L = "Concrete_L",
  FilledTube = "FilledTube",
  FilledPipe = "FilledPipe",
  EncasedRectangle = "EncasedRectangle",
  EncasedCircle = "EncasedCircle",
  BucklingRestrainedBrace = "BucklingRestrainedBrace",
  CoreBrace_BRB = "CoreBrace_BRB",
  ConcreteTee = "ConcreteTee",
  ConcreteBox = "ConcreteBox",
  ConcretePipe = "ConcretePipe",
  ConcreteCross = "ConcreteCross",
  SteelPlate = "SteelPlate",
  SteelRod = "SteelRod",
  PCCGirderSuperT = "PCCGirderSuperT",
  Cold_Box = "Cold_Box",
  Cold_I = "Cold_I",
  Cold_Pipe = "Cold_Pipe",
  Cold_T = "Cold_T",
  Trapezoidal = "Trapezoidal",
  PCCGirderBox = "PCCGirderBox",
}

export enum eHingeDistributionType {
  NonlinearBeamColumn = "NonlinearBeamColumn",
  DistributedPlasticity = "DistributedPlasticity",
  EqualSpacing = "EqualSpacing",
  ContinuousSupport = "ContinuousSupport",
  UserDefined = "UserDefined",
}

export enum eHingeLengthOverwriteType {
  None = "None",
  Absolute = "Absolute",
  Relative = "Relative",
}

export enum eHingeLocationType {
  RelativeDistance = "RelativeDistance",
  OffsetFromIEnd = "OffsetFromIEnd",
  OffsetFromJEnd = "OffsetFromJEnd",
}

export enum eItemType {
  Objects = "Objects",
  Group = "Group",
  SelectedObjects = "SelectedObjects",
}

export enum eItemTypeElm {
  ObjectElm = "ObjectElm",
  Element = "Element",
  GroupElm = "GroupElm",
  SelectionElm = "SelectionElm",
}

export enum eLength {
  NotApplicable = "NotApplicable",
  inch = "inch",
  ft = "ft",
  micron = "micron",
  mm = "mm",
  cm = "cm",
  m = "m",
}

export enum eLinkPropType {
  Linear = "Linear",
  Damper = "Damper",
  Gap = "Gap",
  Hook = "Hook",
  PlasticWen = "PlasticWen",
  Isolator1 = "Isolator1",
  Isolator2 = "Isolator2",
  MultilinearElastic = "MultilinearElastic",
  MultilinearPlastic = "MultilinearPlastic",
  Isolator3 = "Isolator3",
}

export enum eLoadCaseType {
  LinearStatic = "LinearStatic",
  NonlinearStatic = "NonlinearStatic",
  Modal = "Modal",
  ResponseSpectrum = "ResponseSpectrum",
  LinearHistory = "LinearHistory",
  NonlinearHistory = "NonlinearHistory",
  LinearDynamic = "LinearDynamic",
  NonlinearDynamic = "NonlinearDynamic",
  MovingLoad = "MovingLoad",
  Buckling = "Buckling",
  SteadyState = "SteadyState",
  PowerSpectralDensity = "PowerSpectralDensity",
  LinearStaticMultiStep = "LinearStaticMultiStep",
  HyperStatic = "HyperStatic",
}

export enum eLoadPatternType {
  Dead = "Dead",
  SuperDead = "SuperDead",
  Live = "Live",
  ReduceLive = "ReduceLive",
  Quake = "Quake",
  Wind = "Wind",
  Snow = "Snow",
  Other = "Other",
  Move = "Move",
  Temperature = "Temperature",
  Rooflive = "Rooflive",
  Notional = "Notional",
  PatternLive = "PatternLive",
  Wave = "Wave",
  Braking = "Braking",
  Centrifugal = "Centrifugal",
  Friction = "Friction",
  Ice = "Ice",
  WindOnLiveLoad = "WindOnLiveLoad",
  HorizontalEarthPressure = "HorizontalEarthPressure",
  VerticalEarthPressure = "VerticalEarthPressure",
  EarthSurcharge = "EarthSurcharge",
  DownDrag = "DownDrag",
  VehicleCollision = "VehicleCollision",
  VesselCollision = "VesselCollision",
  TemperatureGradient = "TemperatureGradient",
  Settlement = "Settlement",
  Shrinkage = "Shrinkage",
  Creep = "Creep",
  WaterloadPressure = "WaterloadPressure",
  LiveLoadSurcharge = "LiveLoadSurcharge",
  LockedInForces = "LockedInForces",
  PedestrianLL = "PedestrianLL",
  Prestress = "Prestress",
  Hyperstatic = "Hyperstatic",
  Bouyancy = "Bouyancy",
  StreamFlow = "StreamFlow",
  Impact = "Impact",
  Construction = "Construction",
  DeadWearing = "DeadWearing",
  DeadWater = "DeadWater",
  DeadManufacture = "DeadManufacture",
  EarthHydrostatic = "EarthHydrostatic",
  PassiveEarthPressure = "PassiveEarthPressure",
  ActiveEarthPressure = "ActiveEarthPressure",
  PedestrianLLReduced = "PedestrianLLReduced",
  SnowHighAltitude = "SnowHighAltitude",
  EuroLm1Char = "EuroLm1Char",
  EuroLm1Freq = "EuroLm1Freq",
  EuroLm2 = "EuroLm2",
  EuroLm3 = "EuroLm3",
  EuroLm4 = "EuroLm4",
  SeaState = "SeaState",
  Permit = "Permit",
  MoveFatigue = "MoveFatigue",
  MoveFatiguePermit = "MoveFatiguePermit",
  MoveDeflection = "MoveDeflection",
  MoveTrain = "MoveTrain",
  PrestressTransfer = "PrestressTransfer",
  PatternAuto = "PatternAuto",
  QuakeDrift = "QuakeDrift",
  QuakeVerticalOnly = "QuakeVerticalOnly",
}

export enum eMatCoupledType {
  None = "None",
  VonMisesPlasticity = "VonMisesPlasticity",
  ModifiedDarwinPecknoldConcrete = "ModifiedDarwinPecknoldConcrete",
}

export enum eMatType {
  Steel = "Steel",
  Concrete = "Concrete",
  NoDesign = "NoDesign",
  Aluminum = "Aluminum",
  ColdFormed = "ColdFormed",
  Rebar = "Rebar",
  Tendon = "Tendon",
  Masonry = "Masonry",
}

export enum eMatTypeAluminum {
  SubType_6061_T6 = "SubType_6061_T6",
  SubType_6063_T6 = "SubType_6063_T6",
  SubType_5052_H34 = "SubType_5052_H34",
}

export enum eMatTypeColdFormed {
  ASTM_A653SQGr33 = "ASTM_A653SQGr33",
  ASTM_A653SQGr50 = "ASTM_A653SQGr50",
}

export enum eMatTypeConcrete {
  FC3000_NormalWeight = "FC3000_NormalWeight",
  FC4000_NormalWeight = "FC4000_NormalWeight",
  FC5000_NormalWeight = "FC5000_NormalWeight",
  FC6000_NormalWeight = "FC6000_NormalWeight",
  FC3000_LightWeight = "FC3000_LightWeight",
  FC4000_LightWeight = "FC4000_LightWeight",
  FC5000_LightWeight = "FC5000_LightWeight",
  FC6000_LightWeight = "FC6000_LightWeight",
  Chinese_C20_NormalWeight = "Chinese_C20_NormalWeight",
  Chinese_C30_NormalWeight = "Chinese_C30_NormalWeight",
  Chinese_C40_NormalWeight = "Chinese_C40_NormalWeight",
  Indian_M15_NormalWeight = "Indian_M15_NormalWeight",
  Indian_M20_NormalWeight = "Indian_M20_NormalWeight",
  Indian_M25_NormalWeight = "Indian_M25_NormalWeight",
  Indian_M30_NormalWeight = "Indian_M30_NormalWeight",
  Indian_M35_NormalWeight = "Indian_M35_NormalWeight",
  Indian_M40_NormalWeight = "Indian_M40_NormalWeight",
  Indian_M45_NormalWeight = "Indian_M45_NormalWeight",
  Indian_M50_NormalWeight = "Indian_M50_NormalWeight",
  Indian_M55_NormalWeight = "Indian_M55_NormalWeight",
  Indian_M60_NormalWeight = "Indian_M60_NormalWeight",
  EN_C12_NormalWeight = "EN_C12_NormalWeight",
  EN_C16_NormalWeight = "EN_C16_NormalWeight",
  EN_C20_NormalWeight = "EN_C20_NormalWeight",
  EN_C25_NormalWeight = "EN_C25_NormalWeight",
  EN_C30_NormalWeight = "EN_C30_NormalWeight",
  EN_C35_NormalWeight = "EN_C35_NormalWeight",
  EN_C40_NormalWeight = "EN_C40_NormalWeight",
  EN_C45_NormalWeight = "EN_C45_NormalWeight",
  EN_C50_NormalWeight = "EN_C50_NormalWeight",
  EN_C55_NormalWeight = "EN_C55_NormalWeight",
  EN_C60_NormalWeight = "EN_C60_NormalWeight",
  EN_C70_NormalWeight = "EN_C70_NormalWeight",
  EN_C80_NormalWeight = "EN_C80_NormalWeight",
  EN_C90_NormalWeight = "EN_C90_NormalWeight",
}

export enum eMatTypeRebar {
  ASTM_A615Gr40 = "ASTM_A615Gr40",
  ASTM_A615Gr60 = "ASTM_A615Gr60",
  ASTM_A615Gr75 = "ASTM_A615Gr75",
  ASTM_A706 = "ASTM_A706",
  Chinese_HPB235 = "Chinese_HPB235",
  Chinese_HRB335 = "Chinese_HRB335",
  Chinese_HRB400 = "Chinese_HRB400",
  Indian_Mild250 = "Indian_Mild250",
  Indian_HYSD415 = "Indian_HYSD415",
  Indian_HYSD500 = "Indian_HYSD500",
  Indian_HYSD550 = "Indian_HYSD550",
}

export enum eMatTypeSteel {
  ASTM_A36 = "ASTM_A36",
  ASTM_A53GrB = "ASTM_A53GrB",
  ASTM_A500GrB_Fy42 = "ASTM_A500GrB_Fy42",
  ASTM_A500GrB_Fy46 = "ASTM_A500GrB_Fy46",
  ASTM_A572Gr50 = "ASTM_A572Gr50",
  ASTM_A913Gr50 = "ASTM_A913Gr50",
  ASTM_A992_Fy50 = "ASTM_A992_Fy50",
  Chinese_Q235 = "Chinese_Q235",
  Chinese_Q345 = "Chinese_Q345",
  Indian_Fe250 = "Indian_Fe250",
  Indian_Fe345 = "Indian_Fe345",
  EN100252_S235 = "EN100252_S235",
  EN100252_S275 = "EN100252_S275",
  EN100252_S355 = "EN100252_S355",
  EN100252_S450 = "EN100252_S450",
  Chinese_Q355 = "Chinese_Q355",
}

export enum eMatTypeTendon {
  ASTM_A416Gr250 = "ASTM_A416Gr250",
  ASTM_A416Gr270 = "ASTM_A416Gr270",
}

export enum eNamedSetType {
  All = "All",
  UpdateBridgeObject = "UpdateBridgeObject",
  RunAnalysis = "RunAnalysis",
  RunBridgeDesignSuperstructure = "RunBridgeDesignSuperstructure",
  RunBridgeDesignSubstructure = "RunBridgeDesignSubstructure",
  RunBridgeDesignSeismic = "RunBridgeDesignSeismic",
  RunBridgeRatingSuperstructure = "RunBridgeRatingSuperstructure",
  RunMemberRating = "RunMemberRating",
  JointTHResponseSpectra = "JointTHResponseSpectra",
  NamedDisplay = "NamedDisplay",
  PlotFunctionTraces = "PlotFunctionTraces",
  PushoverCurve = "PushoverCurve",
  VirtualWork = "VirtualWork",
  TableSet = "TableSet",
  TableGroupSuperset = "TableGroupSuperset",
  BridgeSeismicReport = "BridgeSeismicReport",
  BridgeSuperstructureResponse = "BridgeSuperstructureResponse",
  BridgeCalculationReport = "BridgeCalculationReport",
  BridgeCalculationReportSub = "BridgeCalculationReportSub",
}

export enum eObjType {
  Point = "Point",
  Frame = "Frame",
  Area = "Area",
  Solid = "Solid",
}

export enum eReturnCode {
  NoError = "NoError",
  UnspecifiedError = "UnspecifiedError",
  NotApplicable = "NotApplicable",
  NotImplemented = "NotImplemented",
  Deprecated = "Deprecated",
  TableIsObsolete = "TableIsObsolete",
  TableDoesNotExist = "TableDoesNotExist",
}

export enum eShellType {
  ShellThin = "ShellThin",
  ShellThick = "ShellThick",
  Membrane = "Membrane",
  PlateThin_DO_NOT_USE = "PlateThin_DO_NOT_USE",
  PlateThick_DO_NOT_USE = "PlateThick_DO_NOT_USE",
  Layered = "Layered",
}

export enum eSlabType {
  Slab = "Slab",
  Drop = "Drop",
  Stiff_DO_NOT_USE = "Stiff_DO_NOT_USE",
  Ribbed = "Ribbed",
  Waffle = "Waffle",
  Mat = "Mat",
  Footing = "Footing",
}

export enum eSuperObjectClass {
  None = "None",
  SuperObject = "SuperObject",
  Foundation = "Foundation",
  BridgeFoundation = "BridgeFoundation",
}

export enum eTemperature {
  NotApplicable = "NotApplicable",
  F = "F",
  C = "C",
}

export enum eTemplateType {
  Grid = "Grid",
  Clear = "Clear",
  Beam = "Beam",
  SlopedTruss = "SlopedTruss",
  VerticalTruss = "VerticalTruss",
  SpaceTruss = "SpaceTruss",
  PortalFrame = "PortalFrame",
  BracedFrame = "BracedFrame",
  EccentricFrame = "EccentricFrame",
  PerimeterFrame = "PerimeterFrame",
  SpaceFrame = "SpaceFrame",
  Bridge = "Bridge",
  Barrel = "Barrel",
  Cylinder = "Cylinder",
  Dome = "Dome",
  ShearWall = "ShearWall",
  Floor = "Floor",
  Advanced = "Advanced",
  UndergoundConcrete = "UndergoundConcrete",
  Truss2D = "Truss2D",
  Truss3D = "Truss3D",
  Frame2D = "Frame2D",
  Frame3D = "Frame3D",
  BridgeWizard = "BridgeWizard",
  PipesAndPlates = "PipesAndPlates",
  Shells = "Shells",
  SolidModels = "SolidModels",
  StorageStructures = "StorageStructures",
  Staircases = "Staircases",
  CableBridges = "CableBridges",
}

export enum eUnits {
  lb_in_F = "lb_in_F",
  lb_ft_F = "lb_ft_F",
  kip_in_F = "kip_in_F",
  kip_ft_F = "kip_ft_F",
  kN_mm_C = "kN_mm_C",
  kN_m_C = "kN_m_C",
  kgf_mm_C = "kgf_mm_C",
  kgf_m_C = "kgf_m_C",
  N_mm_C = "N_mm_C",
  N_m_C = "N_m_C",
  Ton_mm_C = "Ton_mm_C",
  Ton_m_C = "Ton_m_C",
  kN_cm_C = "kN_cm_C",
  kgf_cm_C = "kgf_cm_C",
  N_cm_C = "N_cm_C",
  Ton_cm_C = "Ton_cm_C",
}

export enum eWallPierRebarLayerType {
  Vertical_Distributed_MiddleZone_Eachface = "Vertical_Distributed_MiddleZone_Eachface",
  Horizontal_Distributed_MiddleZone_Eachface = "Horizontal_Distributed_MiddleZone_Eachface",
  Vertical_Distributed_EndZoneI_Total = "Vertical_Distributed_EndZoneI_Total",
  Vertical_Distributed_EndZoneJ_Total = "Vertical_Distributed_EndZoneJ_Total",
  Confinement_EndZoneI = "Confinement_EndZoneI",
  Confinement_EndZoneJ = "Confinement_EndZoneJ",
  Diagonal_Each = "Diagonal_Each",
}

export enum eWallPropType {
  Specified = "Specified",
  AutoSelectList = "AutoSelectList",
}

export enum eWallSpandrelRebarLayerType {
  Horizontal_Top_Total = "Horizontal_Top_Total",
  Horizontal_Bottom_Total = "Horizontal_Bottom_Total",
  Horizontal_Distributed_Eachface = "Horizontal_Distributed_Eachface",
  Vertical_Ties_Distributed = "Vertical_Ties_Distributed",
  Diagonal_Each = "Diagonal_Each",
}

export interface cAnalysisResultsAreaForceShellResult {
  numberResults: number;
  obj: string[];
  elm: string[];
  pointElm: string[];
  loadCase: string[];
  stepType: string[];
  stepNum: number[];
  f11: number[];
  f22: number[];
  f12: number[];
  fMax: number[];
  fMin: number[];
  fAngle: number[];
  fVM: number[];
  m11: number[];
  m22: number[];
  m12: number[];
  mMax: number[];
  mMin: number[];
  mAngle: number[];
  v13: number[];
  v23: number[];
  vMax: number[];
  vAngle: number[];
}

export interface cAnalysisResultsAreaJointForceShellResult {
  numberResults: number;
  obj: string[];
  elm: string[];
  pointElm: string[];
  loadCase: string[];
  stepType: string[];
  stepNum: number[];
  f1: number[];
  f2: number[];
  f3: number[];
  m1: number[];
  m2: number[];
  m3: number[];
}

export interface cAnalysisResultsAreaStrainShellResult {
  numberResults: number;
  obj: string[];
  elm: string[];
  pointElm: string[];
  loadCase: string[];
  stepType: string[];
  stepNum: number[];
  e11top: number[];
  e22top: number[];
  g12top: number[];
  emaxtop: number[];
  emintop: number[];
  eangletop: number[];
  evmtop: number[];
  e11bot: number[];
  e22bot: number[];
  g12bot: number[];
  emaxbot: number[];
  eminbot: number[];
  eanglebot: number[];
  evmbot: number[];
  g13avg: number[];
  g23avg: number[];
  gmaxavg: number[];
  gangleavg: number[];
}

export interface cAnalysisResultsAreaStrainShellLayeredResult {
  numberResults: number;
  obj: string[];
  elm: string[];
  layer: string[];
  intPtNum: number[];
  intPtLoc: number[];
  pointElm: string[];
  loadCase: string[];
  stepType: string[];
  stepNum: number[];
  e11: number[];
  e22: number[];
  g12: number[];
  eMax: number[];
  eMin: number[];
  eAngle: number[];
  eVM: number[];
  g13avg: number[];
  g23avg: number[];
  gMaxavg: number[];
  gAngleavg: number[];
}

export interface cAnalysisResultsAreaStressShellResult {
  numberResults: number;
  obj: string[];
  elm: string[];
  pointElm: string[];
  loadCase: string[];
  stepType: string[];
  stepNum: number[];
  s11Top: number[];
  s22Top: number[];
  s12Top: number[];
  sMaxTop: number[];
  sMinTop: number[];
  sAngleTop: number[];
  sVMTop: number[];
  s11Bot: number[];
  s22Bot: number[];
  s12Bot: number[];
  sMaxBot: number[];
  sMinBot: number[];
  sAngleBot: number[];
  sVMBot: number[];
  s13Avg: number[];
  s23Avg: number[];
  sMaxAvg: number[];
  sAngleAvg: number[];
}

export interface cAnalysisResultsAreaStressShellLayeredResult {
  numberResults: number;
  obj: string[];
  elm: string[];
  layer: string[];
  intPtNum: number[];
  intPtLoc: number[];
  pointElm: string[];
  loadCase: string[];
  stepType: string[];
  stepNum: number[];
  s11: number[];
  s22: number[];
  s12: number[];
  sMax: number[];
  sMin: number[];
  sAngle: number[];
  sVM: number[];
  s13Avg: number[];
  s23Avg: number[];
  sMaxAvg: number[];
  sAngleAvg: number[];
}

export interface cAnalysisResultsAssembledJointMassResult {
  numberResults: number;
  pointElm: string[];
  u1: number[];
  u2: number[];
  u3: number[];
  r1: number[];
  r2: number[];
  r3: number[];
}

export interface cAnalysisResultsAssembledJointMass_1Result {
  numberResults: number;
  pointElm: string[];
  massSource: string[];
  u1: number[];
  u2: number[];
  u3: number[];
  r1: number[];
  r2: number[];
  r3: number[];
}

export interface cAnalysisResultsBaseReactResult {
  numberResults: number;
  loadCase: string[];
  stepType: string[];
  stepNum: number[];
  fX: number[];
  fY: number[];
  fZ: number[];
  mX: number[];
  paramMy: number[];
  mZ: number[];
  gX: number;
  gY: number;
  gZ: number;
}

export interface cAnalysisResultsBaseReactWithCentroidResult {
  numberResults: number;
  loadCase: string[];
  stepType: string[];
  stepNum: number[];
  fX: number[];
  fY: number[];
  fZ: number[];
  mX: number[];
  paramMy: number[];
  mZ: number[];
  gX: number;
  gY: number;
  gZ: number;
  xCentroidForFX: number[];
  yCentroidForFX: number[];
  zCentroidForFX: number[];
  xCentroidForFY: number[];
  yCentroidForFY: number[];
  zCentroidForFY: number[];
  xCentroidForFZ: number[];
  yCentroidForFZ: number[];
  zCentroidForFZ: number[];
}

export interface cAnalysisResultsBucklingFactorResult {
  numberResults: number;
  loadCase: string[];
  stepType: string[];
  stepNum: number[];
  factor: number[];
}

export interface cAnalysisResultsFrameForceResult {
  numberResults: number;
  obj: string[];
  objSta: number[];
  elm: string[];
  elmSta: number[];
  loadCase: string[];
  stepType: string[];
  stepNum: number[];
  p: number[];
  v2: number[];
  v3: number[];
  t: number[];
  m2: number[];
  m3: number[];
}

export interface cAnalysisResultsFrameJointForceResult {
  numberResults: number;
  obj: string[];
  elm: string[];
  pointElm: string[];
  loadCase: string[];
  stepType: string[];
  stepNum: number[];
  f1: number[];
  f2: number[];
  f3: number[];
  m1: number[];
  m2: number[];
  m3: number[];
}

export interface cAnalysisResultsGeneralizedDisplResult {
  numberResults: number;
  gD: string[];
  loadCase: string[];
  stepType: string[];
  stepNum: number[];
  dType: string[];
  value: number[];
}

export interface cAnalysisResultsJointAccResult {
  numberResults: number;
  obj: string[];
  elm: string[];
  loadCase: string[];
  stepType: string[];
  stepNum: number[];
  u1: number[];
  u2: number[];
  u3: number[];
  r1: number[];
  r2: number[];
  r3: number[];
}

export interface cAnalysisResultsJointAccAbsResult {
  numberResults: number;
  obj: string[];
  elm: string[];
  loadCase: string[];
  stepType: string[];
  stepNum: number[];
  u1: number[];
  u2: number[];
  u3: number[];
  r1: number[];
  r2: number[];
  r3: number[];
}

export interface cAnalysisResultsJointDisplResult {
  numberResults: number;
  obj: string[];
  elm: string[];
  loadCase: string[];
  stepType: string[];
  stepNum: number[];
  u1: number[];
  u2: number[];
  u3: number[];
  r1: number[];
  r2: number[];
  r3: number[];
}

export interface cAnalysisResultsJointDisplAbsResult {
  numberResults: number;
  obj: string[];
  elm: string[];
  loadCase: string[];
  stepType: string[];
  stepNum: number[];
  u1: number[];
  u2: number[];
  u3: number[];
  r1: number[];
  r2: number[];
  r3: number[];
}

export interface cAnalysisResultsJointDriftsResult {
  numberResults: number;
  story: string[];
  label: string[];
  name: string[];
  loadCase: string[];
  stepType: string[];
  stepNum: number[];
  displacementX: number[];
  displacementY: number[];
  driftX: number[];
  driftY: number[];
}

export interface cAnalysisResultsJointReactResult {
  numberResults: number;
  obj: string[];
  elm: string[];
  loadCase: string[];
  stepType: string[];
  stepNum: number[];
  f1: number[];
  f2: number[];
  f3: number[];
  m1: number[];
  m2: number[];
  m3: number[];
}

export interface cAnalysisResultsJointVelResult {
  numberResults: number;
  obj: string[];
  elm: string[];
  loadCase: string[];
  stepType: string[];
  stepNum: number[];
  u1: number[];
  u2: number[];
  u3: number[];
  r1: number[];
  r2: number[];
  r3: number[];
}

export interface cAnalysisResultsJointVelAbsResult {
  numberResults: number;
  obj: string[];
  elm: string[];
  loadCase: string[];
  stepType: string[];
  stepNum: number[];
  u1: number[];
  u2: number[];
  u3: number[];
  r1: number[];
  r2: number[];
  r3: number[];
}

export interface cAnalysisResultsLinkDeformationResult {
  numberResults: number;
  obj: string[];
  elm: string[];
  loadCase: string[];
  stepType: string[];
  stepNum: number[];
  u1: number[];
  u2: number[];
  u3: number[];
  r1: number[];
  r2: number[];
  r3: number[];
}

export interface cAnalysisResultsLinkForceResult {
  numberResults: number;
  obj: string[];
  elm: string[];
  pointElm: string[];
  loadCase: string[];
  stepType: string[];
  stepNum: number[];
  p: number[];
  v2: number[];
  v3: number[];
  t: number[];
  m2: number[];
  m3: number[];
}

export interface cAnalysisResultsLinkJointForceResult {
  numberResults: number;
  obj: string[];
  elm: string[];
  pointElm: string[];
  loadCase: string[];
  stepType: string[];
  stepNum: number[];
  f1: number[];
  f2: number[];
  f3: number[];
  m1: number[];
  m2: number[];
  m3: number[];
}

export interface cAnalysisResultsModalLoadParticipationRatiosResult {
  numberResults: number;
  loadCase: string[];
  itemType: string[];
  item: string[];
  stat: number[];
  dyn: number[];
}

export interface cAnalysisResultsModalParticipatingMassRatiosResult {
  numberResults: number;
  loadCase: string[];
  stepType: string[];
  stepNum: number[];
  period: number[];
  uX: number[];
  uY: number[];
  uZ: number[];
  sumUX: number[];
  sumUY: number[];
  sumUZ: number[];
  rX: number[];
  rY: number[];
  rZ: number[];
  sumRX: number[];
  sumRY: number[];
  sumRZ: number[];
}

export interface cAnalysisResultsModalParticipationFactorsResult {
  numberResults: number;
  loadCase: string[];
  stepType: string[];
  stepNum: number[];
  period: number[];
  uX: number[];
  uY: number[];
  uZ: number[];
  rX: number[];
  rY: number[];
  rZ: number[];
  modalMass: number[];
  modalStiff: number[];
}

export interface cAnalysisResultsModalPeriodResult {
  numberResults: number;
  loadCase: string[];
  stepType: string[];
  stepNum: number[];
  period: number[];
  frequency: number[];
  circFreq: number[];
  eigenValue: number[];
}

export interface cAnalysisResultsModeShapeResult {
  numberResults: number;
  obj: string[];
  elm: string[];
  loadCase: string[];
  stepType: string[];
  stepNum: number[];
  u1: number[];
  u2: number[];
  u3: number[];
  r1: number[];
  r2: number[];
  r3: number[];
}

export interface cAnalysisResultsPanelZoneDeformationResult {
  numberResults: number;
  elm: string[];
  loadCase: string[];
  stepType: string[];
  stepNum: number[];
  u1: number[];
  u2: number[];
  u3: number[];
  r1: number[];
  r2: number[];
  r3: number[];
}

export interface cAnalysisResultsPanelZoneForceResult {
  numberResults: number;
  elm: string[];
  pointElm: string[];
  loadCase: string[];
  stepType: string[];
  stepNum: number[];
  p: number[];
  v2: number[];
  v3: number[];
  t: number[];
  m2: number[];
  m3: number[];
}

export interface cAnalysisResultsPierForceResult {
  numberResults: number;
  storyName: string[];
  pierName: string[];
  loadCase: string[];
  location: string[];
  p: number[];
  v2: number[];
  v3: number[];
  t: number[];
  m2: number[];
  m3: number[];
}

export interface cAnalysisResultsSectionCutAnalysisResult {
  numberResults: number;
  sCut: string[];
  loadCase: string[];
  stepType: string[];
  stepNum: number[];
  f1: number[];
  f2: number[];
  f3: number[];
  m1: number[];
  m2: number[];
  m3: number[];
}

export interface cAnalysisResultsSectionCutDesignResult {
  numberResults: number;
  sCut: string[];
  loadCase: string[];
  stepType: string[];
  stepNum: number[];
  p: number[];
  v2: number[];
  v3: number[];
  t: number[];
  m2: number[];
  m3: number[];
}

export interface cAnalysisResultsSpandrelForceResult {
  numberResults: number;
  storyName: string[];
  spandrelName: string[];
  loadCase: string[];
  location: string[];
  p: number[];
  v2: number[];
  v3: number[];
  t: number[];
  m2: number[];
  m3: number[];
}

export interface cAnalysisResultsStoryDriftsResult {
  numberResults: number;
  story: string[];
  loadCase: string[];
  stepType: string[];
  stepNum: number[];
  direction: string[];
  drift: number[];
  label: string[];
  x: number[];
  y: number[];
  z: number[];
}

export interface cAnalysisResultsSetupGetCaseSelectedForOutputResult {
  selected: boolean;
}

export interface cAnalysisResultsSetupGetComboSelectedForOutputResult {
  selected: boolean;
}

export interface cAnalysisResultsSetupGetOptionBaseReactLocResult {
  gX: number;
  gY: number;
  gZ: number;
}

export interface cAnalysisResultsSetupGetOptionBucklingModeResult {
  buckModeStart: number;
  buckModeEnd: number;
  buckModeAll: boolean;
}

export interface cAnalysisResultsSetupGetOptionDirectHistResult {
  value: number;
}

export interface cAnalysisResultsSetupGetOptionModalHistResult {
  value: number;
}

export interface cAnalysisResultsSetupGetOptionModeShapeResult {
  modeShapeStart: number;
  modeShapeEnd: number;
  modeShapesAll: boolean;
}

export interface cAnalysisResultsSetupGetOptionMultiStepStaticResult {
  value: number;
}

export interface cAnalysisResultsSetupGetOptionMultiValuedComboResult {
  value: number;
}

export interface cAnalysisResultsSetupGetOptionNLStaticResult {
  value: number;
}

export interface cAnalyzeGetActiveDOFResult {
  dOF: boolean[];
}

export interface cAnalyzeGetCaseStatusResult {
  numberItems: number;
  caseName: string[];
  status: number[];
}

export interface cAnalyzeGetDesignResponseOptionResult {
  numberDesignThreads: number;
  numberResponseRecoveryThreads: number;
  useMemoryMappedFilesForResponseRecovery: number;
  modelDifferencesOKWhenMergingResults: boolean;
}

export interface cAnalyzeGetRunCaseFlagResult {
  numberItems: number;
  caseName: string[];
  run: boolean[];
}

export interface cAnalyzeGetSolverOptionResult {
  solverType: number;
  force32BitSolver: boolean;
  stiffCase: string;
}

export interface cAnalyzeGetSolverOption_1Result {
  solverType: number;
  solverProcessType: number;
  force32BitSolver: boolean;
  stiffCase: string;
}

export interface cAnalyzeGetSolverOption_2Result {
  solverType: number;
  solverProcessType: number;
  numberParallelRuns: number;
  stiffCase: string;
}

export interface cAnalyzeGetSolverOption_3Result {
  solverType: number;
  solverProcessType: number;
  numberParallelRuns: number;
  responseFileSizeMaxMB: number;
  numberAnalysisThreads: number;
  stiffCase: string;
}

export interface cAnalyzeSetActiveDOFResult {
  dOF: boolean[];
}

export interface cAreaElmGetLoadTemperatureResult {
  numberItems: number;
  areaName: string[];
  loadPat: string[];
  myType: number[];
  value: number[];
  patternName: string[];
}

export interface cAreaElmGetLoadUniformResult {
  numberItems: number;
  areaName: string[];
  loadPat: string[];
  cSys: string[];
  dir: number[];
  value: number[];
}

export interface cAreaElmGetLocalAxesResult {
  ang: number;
}

export interface cAreaElmGetMaterialOverwriteResult {
  propName: string;
}

export interface cAreaElmGetModifiersResult {
  value: number[];
}

export interface cAreaElmGetNameListResult {
  numberNames: number;
  myName: string[];
}

export interface cAreaElmGetObjResult {
  obj: string;
}

export interface cAreaElmGetOffsetsResult {
  offsetType: number;
  offsetPattern: string;
  offsetPatternSF: number;
  offset: number[];
}

export interface cAreaElmGetPointsResult {
  numberPoints: number;
  point: string[];
}

export interface cAreaElmGetPropertyResult {
  propName: string;
}

export interface cAreaElmGetThicknessResult {
  thicknessType: number;
  thicknessPattern: string;
  thicknessPatternSF: number;
  thickness: number[];
}

export interface cAreaElmGetTransformationMatrixResult {
  value: number[];
}

export interface cAreaObjAddByCoordResult {
  x: number[];
  y: number[];
  z: number[];
  name: string;
}

export interface cAreaObjAddByPointResult {
  point: string[];
  name: string;
}

export interface cAreaObjGetAllAreasResult {
  numberNames: number;
  myName: string[];
  designOrientation: eAreaDesignOrientation[];
  numberBoundaryPts: number;
  pointDelimiter: number[];
  pointNames: string[];
  pointX: number[];
  pointY: number[];
  pointZ: number[];
}

export interface cAreaObjGetCurvedEdgesResult {
  numEdges: number;
  curveType: number[];
  tension: number[];
  numPoints: number[];
  gx: number[];
  gy: number[];
  gz: number[];
}

export interface cAreaObjGetDesignOrientationResult {
  designOrientation: eAreaDesignOrientation;
}

export interface cAreaObjGetDiaphragmResult {
  diaphragmName: string;
}

export interface cAreaObjGetEdgeConstraintResult {
  constraintExists: boolean;
}

export interface cAreaObjGetElmResult {
  nElm: number;
  elm: string[];
}

export interface cAreaObjGetGroupAssignResult {
  numberGroups: number;
  groups: string[];
}

export interface cAreaObjGetGUIDResult {
  gUID: string;
}

export interface cAreaObjGetLabelFromNameResult {
  label: string;
  story: string;
}

export interface cAreaObjGetLabelNameListResult {
  numberNames: number;
  myName: string[];
  myLabel: string[];
  myStory: string[];
}

export interface cAreaObjGetLoadTemperatureResult {
  numberItems: number;
  areaName: string[];
  loadPat: string[];
  myType: number[];
  value: number[];
  patternName: string[];
}

export interface cAreaObjGetLoadUniformResult {
  numberItems: number;
  areaName: string[];
  loadPat: string[];
  cSys: string[];
  dir: number[];
  value: number[];
}

export interface cAreaObjGetLoadUniformToFrameResult {
  numberItems: number;
  areaName: string[];
  loadPat: string[];
  cSys: string[];
  dir: number[];
  value: number[];
  distType: number[];
}

export interface cAreaObjGetLoadWindPressureResult {
  numberItems: number;
  areaName: string[];
  loadPat: string[];
  myType: number[];
  cp: number[];
}

export interface cAreaObjGetLocalAxesResult {
  ang: number;
  advanced: boolean;
}

export interface cAreaObjGetMassResult {
  massOverL2: number;
}

export interface cAreaObjGetMaterialOverwriteResult {
  propName: string;
}

export interface cAreaObjGetModifiersResult {
  value: number[];
}

export interface cAreaObjGetNameFromLabelResult {
  name: string;
}

export interface cAreaObjGetNameListResult {
  numberNames: number;
  myName: string[];
}

export interface cAreaObjGetNameListOnStoryResult {
  numberNames: number;
  myName: string[];
}

export interface cAreaObjGetOffsets3Result {
  numberPoints: number;
  offsets: number[];
}

export interface cAreaObjGetOpeningResult {
  isOpening: boolean;
}

export interface cAreaObjGetPierResult {
  pierName: string;
}

export interface cAreaObjGetPointsResult {
  numberPoints: number;
  point: string[];
}

export interface cAreaObjGetPropertyResult {
  propName: string;
}

export interface cAreaObjGetRebarDataPierResult {
  numberRebarLayers: number;
  layerID: string[];
  layerType: eWallPierRebarLayerType[];
  clearCover: number[];
  barSizeName: string[];
  barArea: number[];
  barSpacing: number[];
  numberBars: number[];
  confined: boolean[];
  endZoneLength: number[];
  endZoneThickness: number[];
  endZoneOffset: number[];
}

export interface cAreaObjGetRebarDataSpandrelResult {
  numberRebarLayers: number;
  layerID: string[];
  layerType: eWallSpandrelRebarLayerType[];
  clearCover: number[];
  barSizeIndex: number[];
  barArea: number[];
  barSpacing: number[];
  numberBars: number[];
  confined: boolean[];
}

export interface cAreaObjGetSelectedResult {
  selected: boolean;
}

export interface cAreaObjGetSelectedEdgeResult {
  numberEdges: number;
  selected: boolean[];
}

export interface cAreaObjGetSpandrelResult {
  spandrelName: string;
}

export interface cAreaObjGetSpringAssignmentResult {
  springProp: string;
}

export interface cAreaObjGetTransformationMatrixResult {
  value: number[];
}

export interface cAreaObjSetModifiersResult {
  value: number[];
}

export interface cAutoSeismicGetASCE716Result {
  nDir: boolean[];
  eccen: number;
  periodFlag: number;
  ctType: number;
  userT: number;
  userZ: boolean;
  topZ: number;
  bottomZ: number;
  r: number;
  omega: number;
  cd: number;
  i: number;
  ss: number;
  s1: number;
  tL: number;
  siteClass: number;
  fa: number;
  fv: number;
}

export interface cAutoSeismicGetASCE716_1Result {
  nDir: boolean[];
  eccen: number;
  periodFlag: number;
  ctType: number;
  userT: number;
  userZ: boolean;
  topZ: number;
  bottomZ: number;
  r: number;
  omega: number;
  cd: number;
  i: number;
  ss: number;
  s1: number;
  tL: number;
  siteClass: number;
  fa: number;
  fv: number;
}

export interface cAutoSeismicGetIBC2006Result {
  dirFlag: number;
  eccen: number;
  periodFlag: number;
  ctType: number;
  userT: number;
  userZ: boolean;
  topZ: number;
  bottomZ: number;
  r: number;
  omega: number;
  cd: number;
  i: number;
  iBC2006Option: number;
  latitude: number;
  longitude: number;
  zipCode: string;
  ss: number;
  s1: number;
  tl: number;
  siteClass: number;
  fa: number;
  fv: number;
}

export interface cAutoSeismicSetASCE716Result {
  nDir: boolean[];
}

export interface cAutoSeismicSetASCE716_1Result {
  nDir: boolean[];
}

export interface cCaseDirectHistoryLinearGetLoadsResult {
  numberLoads: number;
  loadType: string[];
  loadName: string[];
  func: string[];
  sF: number[];
  tf: number[];
  at: number[];
  cSys: string[];
  ang: number[];
}

export interface cCaseDirectHistoryNonlinearGetLoadsResult {
  numberLoads: number;
  loadType: string[];
  loadName: string[];
  func: string[];
  sF: number[];
  tf: number[];
  at: number[];
  cSys: string[];
  ang: number[];
}

export interface cCaseHyperStaticGetBaseCaseResult {
  hyperStaticCase: string;
}

export interface cCaseModalEigenGetInitialCaseResult {
  initialCase: string;
}

export interface cCaseModalEigenGetLoadsResult {
  numberLoads: number;
  loadType: string[];
  loadName: string[];
  targetPar: number[];
  staticCorrect: boolean[];
}

export interface cCaseModalEigenGetNumberModesResult {
  maxModes: number;
  minModes: number;
}

export interface cCaseModalEigenGetParametersResult {
  eigenShiftFreq: number;
  eigenCutOff: number;
  eigenTol: number;
  allowAutoFreqShift: number;
}

export interface cCaseModalEigenSetLoadsResult {
  loadType: string[];
  loadName: string[];
  targetPar: number[];
  staticCorrect: boolean[];
}

export interface cCaseModalHistoryLinearGetLoadsResult {
  numberLoads: number;
  loadType: string[];
  loadName: string[];
  func: string[];
  sF: number[];
  tf: number[];
  at: number[];
  cSys: string[];
  ang: number[];
}

export interface cCaseModalHistoryLinearSetLoadsResult {
  loadType: string[];
  loadName: string[];
  func: string[];
  sF: number[];
  tf: number[];
  at: number[];
  cSys: string[];
  ang: number[];
}

export interface cCaseModalHistoryNonlinearGetLoadsResult {
  numberLoads: number;
  loadType: string[];
  loadName: string[];
  func: string[];
  sF: number[];
  tf: number[];
  at: number[];
  cSys: string[];
  ang: number[];
}

export interface cCaseModalRitzGetInitialCaseResult {
  initialCase: string;
}

export interface cCaseModalRitzGetLoadsResult {
  numberLoads: number;
  loadType: string[];
  loadName: string[];
  ritzMaxCyc: number[];
  targetPar: number[];
}

export interface cCaseModalRitzGetNumberModesResult {
  maxModes: number;
  minModes: number;
}

export interface cCaseModalRitzSetLoadsResult {
  loadType: string[];
  loadName: string[];
  ritzMaxCyc: number[];
  targetPar: number[];
}

export interface cCaseResponseSpectrumGetDampConstantResult {
  damp: number;
}

export interface cCaseResponseSpectrumGetDampInterpolatedResult {
  dampType: number;
  numberItems: number;
  time: number[];
  damp: number[];
}

export interface cCaseResponseSpectrumGetDampOverridesResult {
  numberItems: number;
  mode: number[];
  damp: number[];
}

export interface cCaseResponseSpectrumGetDampProportionalResult {
  dampType: number;
  dampA: number;
  dampB: number;
  dampF1: number;
  dampF2: number;
  dampD1: number;
  dampD2: number;
}

export interface cCaseResponseSpectrumGetDampTypeResult {
  dampType: number;
}

export interface cCaseResponseSpectrumGetDiaphragmEccentricityOverrideResult {
  num: number;
  diaph: string[];
  eccen: number[];
}

export interface cCaseResponseSpectrumGetDirCombResult {
  myType: number;
  sF: number;
}

export interface cCaseResponseSpectrumGetEccentricityResult {
  eccen: number;
}

export interface cCaseResponseSpectrumGetLoadsResult {
  numberLoads: number;
  loadName: string[];
  func: string[];
  sF: number[];
  cSys: string[];
  ang: number[];
}

export interface cCaseResponseSpectrumGetModalCaseResult {
  modalCase: string;
}

export interface cCaseResponseSpectrumGetModalCombResult {
  myType: number;
  f1: number;
  f2: number;
  td: number;
}

export interface cCaseResponseSpectrumGetModalComb_1Result {
  myType: number;
  f1: number;
  f2: number;
  periodicRigidCombType: number;
  td: number;
}

export interface cCaseResponseSpectrumSetLoadsResult {
  loadName: string[];
  func: string[];
  sF: number[];
  cSys: string[];
  ang: number[];
}

export interface cCaseStaticLinearGetInitialCaseResult {
  initialCase: string;
}

export interface cCaseStaticLinearGetLoadsResult {
  numberLoads: number;
  loadType: string[];
  loadName: string[];
  sF: number[];
}

export interface cCaseStaticLinearSetLoadsResult {
  loadType: string[];
  loadName: string[];
  sF: number[];
}

export interface cCaseStaticNonlinearGetGeometricNonlinearityResult {
  nLGeomType: number;
}

export interface cCaseStaticNonlinearGetHingeUnloadingResult {
  unloadType: number;
}

export interface cCaseStaticNonlinearGetInitialCaseResult {
  initialCase: string;
}

export interface cCaseStaticNonlinearGetLoadApplicationResult {
  loadControl: number;
  dispType: number;
  displ: number;
  monitor: number;
  dOF: number;
  pointName: string;
  gDispl: string;
}

export interface cCaseStaticNonlinearGetLoadsResult {
  numberLoads: number;
  loadType: string[];
  loadName: string[];
  sF: number[];
}

export interface cCaseStaticNonlinearGetMassSourceResult {
  mSource: string;
}

export interface cCaseStaticNonlinearGetModalCaseResult {
  modalCase: string;
}

export interface cCaseStaticNonlinearGetResultsSavedResult {
  saveMultipleSteps: boolean;
  minSavedStates: number;
  maxSavedStates: number;
  positiveOnly: boolean;
}

export interface cCaseStaticNonlinearGetSolControlParametersResult {
  maxTotalSteps: number;
  maxFailedSubSteps: number;
  maxIterCS: number;
  maxIterNR: number;
  tolConvD: number;
  useEventStepping: boolean;
  tolEventD: number;
  maxLineSearchPerIter: number;
  tolLineSearch: number;
  lineSearchStepFact: number;
}

export interface cCaseStaticNonlinearGetTargetForceParametersResult {
  tolConvF: number;
  maxIter: number;
  accelFact: number;
  noStop: boolean;
}

export interface cCaseStaticNonlinearSetLoadsResult {
  loadType: string[];
  loadName: string[];
  sF: number[];
}

export interface cCaseStaticNonlinearStagedGetGeometricNonlinearityResult {
  nLGeomType: number;
}

export interface cCaseStaticNonlinearStagedGetHingeUnloadingResult {
  unloadType: number;
}

export interface cCaseStaticNonlinearStagedGetInitialCaseResult {
  initialCase: string;
}

export interface cCaseStaticNonlinearStagedGetMassSourceResult {
  mSource: string;
}

export interface cCaseStaticNonlinearStagedGetMaterialNonlinearityResult {
  timeDepMatProp: boolean;
}

export interface cCaseStaticNonlinearStagedGetResultsSavedResult {
  stagedSaveOption: number;
  stagedMinSteps: number;
  stagedMinStepsTD: number;
}

export interface cCaseStaticNonlinearStagedGetSolControlParametersResult {
  maxTotalSteps: number;
  maxFailedSubSteps: number;
  maxIterCS: number;
  maxIterNR: number;
  tolConvD: number;
  useEventStepping: boolean;
  tolEventD: number;
  maxLineSearchPerIter: number;
  tolLineSearch: number;
  lineSearchStepFact: number;
}

export interface cCaseStaticNonlinearStagedGetStageDataResult {
  stage: number;
  numberOperations: number;
  operation: number[];
  groupName: string[];
  age: number[];
  loadType: string[];
  loadName: string[];
  sF: number[];
}

export interface cCaseStaticNonlinearStagedGetStageData_1Result {
  stage: number;
  numberOperations: number;
  operation: number[];
  objectType: string[];
  objectName: string[];
  age: number[];
  myType: string[];
  myName: string[];
  sF: number[];
}

export interface cCaseStaticNonlinearStagedGetStageData_2Result {
  stage: number;
  numberOperations: number;
  operation: number[];
  objectType: string[];
  objectName: string[];
  age: number[];
  myType: string[];
  myName: string[];
  sF: number[];
}

export interface cCaseStaticNonlinearStagedGetStageDefinitionsResult {
  numberStages: number;
  duration: number[];
  comment: string[];
}

export interface cCaseStaticNonlinearStagedGetStageDefinitions_1Result {
  numberStages: number;
  duration: number[];
  output: boolean[];
  outputName: string[];
  comment: string[];
}

export interface cCaseStaticNonlinearStagedGetStageDefinitions_2Result {
  numberStages: number;
  duration: number[];
  output: boolean[];
  outputName: string[];
  comment: string[];
}

export interface cCaseStaticNonlinearStagedGetTargetForceParametersResult {
  tolConvF: number;
  maxIter: number;
  accelFact: number;
  noStop: boolean;
}

export interface cCaseStaticNonlinearStagedSetStageDataResult {
  operation: number[];
  groupName: string[];
  age: number[];
  loadType: string[];
  loadName: string[];
  sF: number[];
}

export interface cCaseStaticNonlinearStagedSetStageData_1Result {
  operation: number[];
  objectType: string[];
  objectName: string[];
  age: number[];
  myType: string[];
  myName: string[];
  sF: number[];
}

export interface cCaseStaticNonlinearStagedSetStageData_2Result {
  operation: number[];
  objectType: string[];
  objectName: string[];
  age: number[];
  myType: string[];
  myName: string[];
  sF: number[];
}

export interface cCaseStaticNonlinearStagedSetStageDefinitionsResult {
  duration: number[];
  comment: string[];
}

export interface cCaseStaticNonlinearStagedSetStageDefinitions_1Result {
  duration: number[];
  output: boolean[];
  outputName: string[];
  comment: string[];
}

export interface cCaseStaticNonlinearStagedSetStageDefinitions_2Result {
  duration: number[];
  output: boolean[];
  outputName: string[];
  comment: string[];
}

export interface cComboGetCaseListResult {
  numberItems: number;
  cNameType: eCNameType[];
  cName: string[];
  sF: number[];
}

export interface cComboGetCaseList_1Result {
  numberItems: number;
  cNameType: eCNameType[];
  cName: string[];
  modeNumber: number[];
  sF: number[];
}

export interface cComboGetNameListResult {
  numberNames: number;
  myName: string[];
}

export interface cComboGetTypeComboResult {
  comboType: number;
}

export interface cComboGetTypeOAPIResult {
  comboType: number;
}

export interface cComboSetCaseListResult {
  cNameType: eCNameType;
}

export interface cComboSetCaseList_1Result {
  cNameType: eCNameType;
}

export interface cConstraintGetDiaphragmResult {
  axis: eConstraintAxis;
  cSys: string;
}

export interface cConstraintGetNameListResult {
  numberNames: number;
  myName: string[];
}

export interface cDatabaseTablesApplyEditedTablesResult {
  numFatalErrors: number;
  numErrorMsgs: number;
  numWarnMsgs: number;
  numInfoMsgs: number;
  importLog: string;
}

export interface cDatabaseTablesGetAllFieldsInTableResult {
  tableVersion: number;
  numberFields: number;
  fieldKey: string[];
  fieldName: string[];
  description: string[];
  unitsString: string[];
  isImportable: boolean[];
}

export interface cDatabaseTablesGetAllTablesResult {
  numberTables: number;
  tableKey: string[];
  tableName: string[];
  importType: number[];
  isEmpty: boolean[];
}

export interface cDatabaseTablesGetAvailableTablesResult {
  numberTables: number;
  tableKey: string[];
  tableName: string[];
  importType: number[];
}

export interface cDatabaseTablesGetLoadCasesSelectedForDisplayResult {
  numberSelectedLoadCases: number;
  loadCaseList: string[];
}

export interface cDatabaseTablesGetLoadCombinationsSelectedForDisplayResult {
  numberSelectedLoadCombinations: number;
  loadCombinationList: string[];
}

export interface cDatabaseTablesGetLoadPatternsSelectedForDisplayResult {
  numberSelectedLoadPatterns: number;
  loadPatternList: string[];
}

export interface cDatabaseTablesGetObsoleteTableKeyListResult {
  numberTableKeys: number;
  tableKeyList: string[];
  notesList: string[];
}

export interface cDatabaseTablesGetOutputOptionsForDisplayResult {
  isUserBaseReactionLocation: boolean;
  userBaseReactionX: number;
  userBaseReactionY: number;
  userBaseReactionZ: number;
  isAllModes: boolean;
  startMode: number;
  endMode: number;
  isAllBucklingModes: boolean;
  startBucklingMode: number;
  endBucklingMode: number;
  multistepStatic: number;
  nonlinearStatic: number;
  modalHistory: number;
  directHistory: number;
  combo: number;
}

export interface cDatabaseTablesGetTableForDisplayArrayResult {
  fieldKeyList: string[];
  tableVersion: number;
  fieldsKeysIncluded: string[];
  numberRecords: number;
  tableData: string[];
}

export interface cDatabaseTablesGetTableForDisplayCSVFileResult {
  fieldKeyList: string[];
  tableVersion: number;
}

export interface cDatabaseTablesGetTableForDisplayCSVStringResult {
  fieldKeyList: string[];
  tableVersion: number;
  csvString: string;
}

export interface cDatabaseTablesGetTableForDisplayXMLStringResult {
  fieldKeyList: string[];
  tableVersion: number;
  xMLTableData: string;
}

export interface cDatabaseTablesGetTableForEditingArrayResult {
  tableVersion: number;
  fieldsKeysIncluded: string[];
  numberRecords: number;
  tableData: string[];
}

export interface cDatabaseTablesGetTableForEditingCSVFileResult {
  tableVersion: number;
}

export interface cDatabaseTablesGetTableForEditingCSVStringResult {
  tableVersion: number;
  csvString: string;
}

export interface cDatabaseTablesSetLoadCasesSelectedForDisplayResult {
  loadCaseList: string[];
}

export interface cDatabaseTablesSetLoadCombinationsSelectedForDisplayResult {
  loadCombinationList: string[];
}

export interface cDatabaseTablesSetLoadPatternsSelectedForDisplayResult {
  loadPatternList: string[];
}

export interface cDatabaseTablesSetTableForEditingArrayResult {
  tableVersion: number;
  fieldsKeysIncluded: string[];
  tableData: string[];
}

export interface cDatabaseTablesSetTableForEditingCSVFileResult {
  tableVersion: number;
}

export interface cDatabaseTablesSetTableForEditingCSVStringResult {
  tableVersion: number;
  csvString: string;
}

export interface cDatabaseTablesShowTablesInExcelResult {
  tableKeyList: string[];
}

export interface cDCoACI318_08_IBC2009GetOverwriteResult {
  value: number;
  progDet: boolean;
}

export interface cDCoACI318_08_IBC2009GetPreferenceResult {
  value: number;
}

export interface cDCoACI318_14GetOverwriteResult {
  value: number;
  progDet: boolean;
}

export interface cDCoACI318_14GetPreferenceResult {
  value: number;
}

export interface cDCoACI318_19GetOverwriteResult {
  value: number;
  progDet: boolean;
}

export interface cDCoACI318_19GetPreferenceResult {
  value: number;
}

export interface cDCoAS_3600_09GetOverwriteResult {
  value: number;
  progDet: boolean;
}

export interface cDCoAS_3600_09GetPreferenceResult {
  value: number;
}

export interface cDCoAS_3600_2018GetOverwriteResult {
  value: number;
  progDet: boolean;
}

export interface cDCoAS_3600_2018GetPreferenceResult {
  value: number;
}

export interface cDCoBS8110_97GetOverwriteResult {
  value: number;
  progDet: boolean;
}

export interface cDCoBS8110_97GetPreferenceResult {
  value: number;
}

export interface cDCoChinese_2010GetOverwriteResult {
  value: number;
  progDet: boolean;
}

export interface cDCoChinese_2010GetPreferenceResult {
  value: number;
}

export interface cDCoEurocode_2_2004GetOverwriteResult {
  value: number;
  progDet: boolean;
}

export interface cDCoEurocode_2_2004GetPreferenceResult {
  value: number;
}

export interface cDCoIndian_IS_456_2000GetOverwriteResult {
  value: number;
  progDet: boolean;
}

export interface cDCoIndian_IS_456_2000GetPreferenceResult {
  value: number;
}

export interface cDCoMexican_RCDF_2017GetOverwriteResult {
  value: number;
  progDet: boolean;
}

export interface cDCoMexican_RCDF_2017GetPreferenceResult {
  value: number;
}

export interface cDCompColAISC360_22GetOverwriteResult {
  value: number;
  progDet: boolean;
}

export interface cDCompColAISC360_22GetPreferenceResult {
  value: number;
}

export interface cDCompColCSAS16_19GetOverwriteResult {
  value: number;
  progDet: boolean;
}

export interface cDCompColCSAS16_19GetPreferenceResult {
  value: number;
}

export interface cDCompColCSAS16_24GetOverwriteResult {
  value: number;
  progDet: boolean;
}

export interface cDCompColCSAS16_24GetPreferenceResult {
  value: number;
}

export interface cDCompColEurocode_4_2004GetOverwriteResult {
  value: number;
  progDet: boolean;
}

export interface cDCompColEurocode_4_2004GetPreferenceResult {
  value: number;
}

export interface cDCompColIS11384_2022GetOverwriteResult {
  value: number;
  progDet: boolean;
}

export interface cDCompColIS11384_2022GetPreferenceResult {
  value: number;
}

export interface cDConcSlabACI318_14GetPreferenceResult {
  textValue: string;
  numericValue: number;
}

export interface cDCoSP63133302011GetOverwriteResult {
  value: number;
  progDet: boolean;
}

export interface cDCoSP63133302011GetPreferenceResult {
  value: number;
}

export interface cDCoTS_500_2000_R2018GetOverwriteResult {
  value: number;
  progDet: boolean;
}

export interface cDCoTS_500_2000_R2018GetPreferenceResult {
  value: number;
}

export interface cDesignCompositeBeamGetCodeResult {
  codeName: string;
}

export interface cDesignCompositeBeamGetComboDeflectionResult {
  numberItems: number;
  myName: string[];
}

export interface cDesignCompositeBeamGetComboStrengthResult {
  numberItems: number;
  myName: string[];
}

export interface cDesignCompositeBeamGetDesignSectionResult {
  propName: string;
}

export interface cDesignCompositeBeamGetGroupResult {
  numberItems: number;
  myName: string[];
}

export interface cDesignCompositeBeamGetSummaryResultsResult {
  numberItems: number;
  designSect: string[];
  beamFy: number[];
  studDia: number[];
  studLayout: string[];
  beamShored: boolean[];
  beamCamber: number[];
  passFail: string[];
  reacLeft: number[];
  reacRt: number[];
  mMaxNeg: number[];
  mMaxPos: number[];
  pCC: number[];
  overallRatio: number[];
  studRatio: number[];
  strPMRat: number[];
  constPMRat: number[];
  strShrRat: number[];
  conShrRat: number[];
  pCDLDfRat: number[];
  sDLDfRat: number[];
  lLDfRat: number[];
  totCamDfRat: number[];
  freqRat: number[];
  mDampRat: number[];
}

export interface cDesignCompositeBeamGetTargetDisplResult {
  numberItems: number;
  loadCase: string[];
  point: string[];
  displ: number[];
  active: boolean;
}

export interface cDesignCompositeBeamGetTargetPeriodResult {
  numberItems: number;
  modalCase: string;
  mode: number[];
  period: number[];
  active: boolean;
}

export interface cDesignCompositeBeamSetTargetDisplResult {
  loadCase: string[];
  point: string[];
  displ: number[];
}

export interface cDesignCompositeBeamSetTargetPeriodResult {
  mode: number[];
  period: number[];
}

export interface cDesignCompositeBeamVerifyPassedResult {
  numberItems: number;
  n1: number;
  n2: number;
  myName: string[];
}

export interface cDesignCompositeBeamVerifySectionsResult {
  numberItems: number;
  myName: string[];
}

export interface cDesignCompositeColumnGetCodeResult {
  codeName: string;
}

export interface cDesignCompositeColumnGetComboDeflectionResult {
  numberItems: number;
  myName: string[];
}

export interface cDesignCompositeColumnGetComboStrengthResult {
  numberItems: number;
  myName: string[];
}

export interface cDesignCompositeColumnGetDesignSectionResult {
  propName: string;
}

export interface cDesignCompositeColumnGetGroupResult {
  numberItems: number;
  myName: string[];
}

export interface cDesignCompositeColumnGetSummaryResultsResult {
  numberItems: number;
  frameName: string[];
  frameType: eFrameDesignOrientation[];
  designSect: string[];
  status: string[];
  pMMCombo: string[];
  pMMRatio: number[];
  pRatio: number[];
  mMajRatio: number[];
  mMinRatio: number[];
  vMajCombo: string[];
  vMajRatio: number[];
  vMinCombo: string[];
  vMinRatio: number[];
}

export interface cDesignCompositeColumnGetTargetDisplResult {
  numberItems: number;
  loadCase: string[];
  point: string[];
  displ: number[];
  active: boolean;
}

export interface cDesignCompositeColumnGetTargetPeriodResult {
  numberItems: number;
  modalCase: string;
  mode: number[];
  period: number[];
  active: boolean;
}

export interface cDesignCompositeColumnSetTargetDisplResult {
  loadCase: string[];
  point: string[];
  displ: number[];
}

export interface cDesignCompositeColumnSetTargetPeriodResult {
  mode: number[];
  period: number[];
}

export interface cDesignCompositeColumnVerifyPassedResult {
  numberItems: number;
  n1: number;
  n2: number;
  myName: string[];
}

export interface cDesignCompositeColumnVerifySectionsResult {
  numberItems: number;
  myName: string[];
}

export interface cDesignConcreteGetCodeResult {
  codeName: string;
}

export interface cDesignConcreteGetDesignSectionResult {
  propName: string;
}

export interface cDesignConcreteGetRebarPrefsBeamResult {
  value: string;
}

export interface cDesignConcreteGetRebarPrefsColumnResult {
  value: string;
}

export interface cDesignConcreteGetSeismicFramingTypeResult {
  numberItems: number;
  frameName: string[];
  framingType: number[];
}

export interface cDesignConcreteGetSummaryResultsBeamResult {
  numberItems: number;
  frameName: string[];
  location: number[];
  topCombo: string[];
  topArea: number[];
  botCombo: string[];
  botArea: number[];
  vMajorCombo: string[];
  vMajorArea: number[];
  tLCombo: string[];
  tLArea: number[];
  tTCombo: string[];
  tTArea: number[];
  errorSummary: string[];
  warningSummary: string[];
}

export interface cDesignConcreteGetSummaryResultsBeam_2Result {
  numberItems: number;
  frameName: string[];
  location: number[];
  topCombo: string[];
  topArea: number[];
  topAreaReq: number[];
  topAreaMin: number[];
  topAreaProvided: number[];
  botCombo: string[];
  botArea: number[];
  botAreaReq: number[];
  botAreaMin: number[];
  botAreaProvided: number[];
  vmajorCombo: string[];
  vmajorArea: number[];
  vmajorAreaReq: number[];
  vmajorAreaMin: number[];
  vmajorAreaProvided: number[];
  tLCombo: string[];
  tLArea: number[];
  tTCombo: string[];
  tTArea: number[];
  errorSummary: string[];
  warningSummary: string[];
}

export interface cDesignConcreteGetSummaryResultsColumnResult {
  numberItems: number;
  frameName: string[];
  myOption: number[];
  location: number[];
  pMMCombo: string[];
  pMMArea: number[];
  pMMRatio: number[];
  vMajorCombo: string[];
  aVMajor: number[];
  vMinorCombo: string[];
  aVMinor: number[];
  errorSummary: string[];
  warningSummary: string[];
}

export interface cDesignConcreteGetSummaryResultsJointResult {
  numberItems: number;
  frameName: string[];
  lCJSRatioMajor: string[];
  jSRatioMajor: number[];
  lCJSRatioMinor: string[];
  jSRatioMinor: number[];
  lCBCCRatioMajor: string[];
  bCCRatioMajor: number[];
  lCBCCRatioMinor: string[];
  bCCRatioMinor: number[];
  errorSummary: string[];
  warningSummary: string[];
}

export interface cDesignConcreteSlabGetFlexureAndShearResult {
  storyName: string[];
  designStripName: string[];
  station: number[];
  concWidth: number[];
  fTopCombo: string[];
  fTopMoment: number[];
  fTopArea: number[];
  fTopAMin: number[];
  fBotCombo: string[];
  fBotMoment: number[];
  fBotArea: number[];
  fBotAMin: number[];
  axialForce: number[];
  vCombo: string[];
  vForce: number[];
  vArea: number[];
  status: string[];
  globalX: number[];
  globalY: number[];
  layer: string[];
}

export interface cDesignConcreteSlabGetSummaryResultsFlexureAndShearResult {
  storyName: string[];
  designStripName: string[];
  spanID: string[];
  location: string[];
  fTopCombo: string[];
  fTopMoment: number[];
  fTopArea: number[];
  fBotCombo: string[];
  fBotMoment: number[];
  fBotArea: number[];
  vCombo: string[];
  vForce: number[];
  vArea: number[];
  status: string[];
  layer: string[];
}

export interface cDesignConcreteSlabGetSummaryResultsSpanDefinitionResult {
  storyName: string[];
  designStripName: string[];
  spanID: string[];
  spanLength: number[];
  startDist: number[];
  endDist: number[];
  globalX1: number[];
  globalY1: number[];
  globalX2: number[];
  globalY2: number[];
}

export interface cDesignForcesBeamDesignForcesResult {
  numberResults: number;
  frameName: string[];
  comboName: string[];
  station: number[];
  p: number[];
  v2: number[];
  v3: number[];
  t: number[];
  m2: number[];
  m3: number[];
}

export interface cDesignForcesBraceDesignForcesResult {
  numberResults: number;
  frameName: string[];
  comboName: string[];
  station: number[];
  p: number[];
  v2: number[];
  v3: number[];
  t: number[];
  m2: number[];
  m3: number[];
}

export interface cDesignForcesColumnDesignForcesResult {
  numberResults: number;
  frameName: string[];
  comboName: string[];
  station: number[];
  p: number[];
  v2: number[];
  v3: number[];
  t: number[];
  m2: number[];
  m3: number[];
}

export interface cDesignForcesPierDesignForcesResult {
  numberResults: number;
  story: string[];
  pierLabel: string[];
  comboName: string[];
  location: string[];
  p: number[];
  v2: number[];
  v3: number[];
  t: number[];
  m2: number[];
  m3: number[];
}

export interface cDesignForcesSpandrelDesignForcesResult {
  numberResults: number;
  story: string[];
  spandrelLabel: string[];
  comboName: string[];
  location: string[];
  p: number[];
  v2: number[];
  v3: number[];
  t: number[];
  m2: number[];
  m3: number[];
}

export interface cDesignShearWallGetPierSummaryResultsResult {
  story: string[];
  pierLabel: string[];
  station: string[];
  designType: string[];
  pierSecType: string[];
  edgeBar: string[];
  endBar: string[];
  barSpacing: number[];
  reinfPercent: number[];
  currPercent: number[];
  dCRatio: number[];
  pierLeg: string[];
  legX1: number[];
  legY1: number[];
  legX2: number[];
  legY2: number[];
  edgeLeft: number[];
  edgeRight: number[];
  asLeft: number[];
  asRight: number[];
  shearAv: number[];
  stressCompLeft: number[];
  stressCompRight: number[];
  stressLimitLeft: number[];
  stressLimitRight: number[];
  cDepthLeft: number[];
  cLimitLeft: number[];
  cDepthRight: number[];
  cLimitRight: number[];
  inelasticRotDemand: number[];
  inelasticRotCapacity: number[];
  normCompStress: number[];
  normCompStressLimit: number[];
  cDepth: number[];
  bZoneL: number[];
  bZoneR: number[];
  bZoneLength: number[];
  warnMsg: string[];
  errMsg: string[];
}

export interface cDesignShearWallGetRebarResult {
  areaObjName: string[];
  storyName: string[];
  pierLabel: string[];
  stationLocation: string[];
  legID: string[];
  leftX1: number[];
  leftY1: number[];
  rightX2: number[];
  rightY2: number[];
  length: number[];
  thickness: number[];
  fc: number[];
  fy: number[];
  fys: number[];
  flexural: string[];
  shearAndConfinement: string[];
}

export interface cDesignShearWallGetRebarPrefsPierResult {
  value: string;
}

export interface cDesignShearWallGetRebarPrefsSpandrelResult {
  value: string;
}

export interface cDesignShearWallGetSpandrelSummaryResultsResult {
  story: string[];
  spandrel: string[];
  station: string[];
  topRebar: number[];
  topRebarRatio: number[];
  topRebarCombo: string[];
  muTop: number[];
  botRebar: number[];
  botRebarRatio: number[];
  botRebarCombo: string[];
  muBot: number[];
  aVert: number[];
  aHorz: number[];
  shearCombo: string[];
  vu: number[];
  aDiag: number[];
  shearDiagCombo: string[];
  vuDiag: number[];
  warnMsg: string[];
  errMsg: string[];
}

export interface cDesignSteelGetCodeResult {
  codeName: string;
}

export interface cDesignSteelGetComboDeflectionResult {
  numberItems: number;
  myName: string[];
}

export interface cDesignSteelGetComboStrengthResult {
  numberItems: number;
  myName: string[];
}

export interface cDesignSteelGetDesignSectionResult {
  propName: string;
}

export interface cDesignSteelGetGroupResult {
  numberItems: number;
  myName: string[];
}

export interface cDesignSteelGetSummaryResultsResult {
  numberItems: number;
  frameName: string[];
  ratio: number[];
  ratioType: number[];
  location: number[];
  comboName: string[];
  errorSummary: string[];
  warningSummary: string[];
}

export interface cDesignSteelGetSummaryResults_2Result {
  numberItems: number;
  frameType: string[];
  designSect: string[];
  status: string[];
  pMMCombo: string[];
  pMMRatio: number[];
  pRatio: number[];
  mMajRatio: number[];
  mMinRatio: number[];
  vMajCombo: string[];
  vMajRatio: number[];
  vMinCombo: string[];
  vMinRatio: number[];
}

export interface cDesignSteelGetSummaryResults_3Result {
  numberItems: number;
  frameName: string[];
  frameType: eFrameDesignOrientation[];
  designSect: string[];
  status: string[];
  pMMCombo: string[];
  pMMRatio: number[];
  pRatio: number[];
  mMajRatio: number[];
  mMinRatio: number[];
  vMajCombo: string[];
  vMajRatio: number[];
  vMinCombo: string[];
  vMinRatio: number[];
}

export interface cDesignSteelGetTargetDisplResult {
  numberItems: number;
  loadCase: string[];
  point: string[];
  displ: number[];
  active: boolean;
}

export interface cDesignSteelGetTargetPeriodResult {
  numberItems: number;
  modalCase: string;
  mode: number[];
  period: number[];
  active: boolean;
}

export interface cDesignSteelSetTargetDisplResult {
  loadCase: string[];
  point: string[];
  displ: number[];
}

export interface cDesignSteelSetTargetPeriodResult {
  mode: number[];
  period: number[];
}

export interface cDesignSteelVerifyPassedResult {
  numberItems: number;
  n1: number;
  n2: number;
  myName: string[];
}

export interface cDesignSteelVerifySectionsResult {
  numberItems: number;
  myName: string[];
}

export interface cDesignStripGetDesignStripResult {
  point: string[];
  globalX: number[];
  globalY: number[];
  globalZ: number[];
  wBLeft: number[];
  wBRight: number[];
  wALeft: number[];
  wARight: number[];
  autoWiden: boolean[];
}

export interface cDesignStripGetDesignStrip_1Result {
  designType: number;
  point: string[];
  globalX: number[];
  globalY: number[];
  globalZ: number[];
  wBLeft: number[];
  wBRight: number[];
  wALeft: number[];
  wARight: number[];
  autoWiden: boolean[];
}

export interface cDesignStripGetGUIDResult {
  gUID: string;
}

export interface cDesignStripGetNameListResult {
  numberNames: number;
  myName: string[];
}

export interface cDetailingGetBeamLongRebarDataResult {
  numberRebarSets: number;
  barSizeName: string[];
  barArea: number[];
  numberBars: number[];
  location: string[];
  clearCover: number[];
  startCoord1: number[];
  barLength: number[];
  bendingAngleStart: number[];
  bendingAngleEnd: number[];
  rebarSetGUID: string[];
}

export interface cDetailingGetBeamTieRebarDataResult {
  numberRebarSets: number;
  barSizeName: string[];
  barArea: number[];
  numberLegs: number[];
  location: string[];
  clearCover: number[];
  startCoord1: number[];
  spacing: number[];
  lengths: number[];
  rebarSetGUID: string[];
}

export interface cDetailingGetColumnLongRebarDataResult {
  numberRebarSets: number;
  barSizeName: string[];
  barArea: number[];
  numberCBars: number[];
  numberR3Bars: number[];
  numberR2Bars: number[];
  location: string[];
  clearCover: number[];
  rebarSetGUID: string[];
}

export interface cDetailingGetColumnTieRebarDataResult {
  numberRebarSets: number;
  barSizeName: string[];
  barArea: number[];
  pattern: number[];
  confineType: number[];
  numberLegs2Dir: number[];
  numberLegs3Dir: number[];
  location: string[];
  clearCover: number[];
  startCoord1: number[];
  spacing: number[];
  heights: number[];
  rebarSetGUID: string[];
}

export interface cDetailingGetDetailed_OneWallStackResult {
  gUID: string;
  towerID: number;
  numberPiers: number;
  nUmberSpandrels: number;
}

export interface cDetailingGetDetailedBeamLineDataResult {
  objectUniqueNames: string[];
  numberSpans: number;
  spanLength: number[];
  numLongBars: number[];
  longBarDiameter: number[];
  longBarNotation: string[];
  longBarStartDist: number[];
  longBarStartBend: number[];
  longBarEndBend: number[];
  longBarLength: number[];
  longBarNumLayers: number[];
  numTieBars: number[];
  numTieVertLegs: number[];
  tieBarDiameter: number[];
  tieBarNotation: string[];
  tieBarStartDist: number[];
  tieBarSpacing: number[];
  tieBarType: number[];
}

export interface cDetailingGetDetailedBeamLineData_1Result {
  objectUniqueNames: string[];
  numberSpans: number;
  spanLength: number[];
  numLongBars: number[];
  longBarGUID: string[];
  longBarDiameter: number[];
  longBarNotation: string[];
  longBarStartDist: number[];
  longBarStartBend: number[];
  longBarEndBend: number[];
  longBarLength: number[];
  longBarNumLayers: number[];
  numTieBars: number[];
  numTieVertLegs: number[];
  tieBarGUID: string[];
  tieBarDiameter: number[];
  tieBarNotation: string[];
  tieBarStartDist: number[];
  tieBarSpacing: number[];
  tieBarType: number[];
}

export interface cDetailingGetDetailedBeamLineData_2Result {
  numberOfObjects: number;
  objectUniqueNames: string[];
  numberSpans: number;
  spanLength: number[];
  numLongBars: number[];
  longBarGUID: string[];
  longBarDiameter: number[];
  longBarNotation: string[];
  longBarStartDist: number[];
  longBarStartBend: number[];
  longBarEndBend: number[];
  longBarLength: number[];
  longBarNumLayers: number[];
  numTieBars: number[];
  numTieVertLegs: number[];
  tieBarGUID: string[];
  tieBarDiameter: number[];
  tieBarNotation: string[];
  tieBarStartDist: number[];
  tieBarSpacing: number[];
  tieBarType: number[];
}

export interface cDetailingGetDetailedBeamLineGuidDataResult {
  longitudinalABars: string[];
  longitudinalBBars: string[];
  longitudinalCBars: string[];
  longitudinalDBars: string[];
  longitudinalEBars: string[];
  longitudinalFBars: string[];
  longitudinalGBars: string[];
  longitudinalHBars: string[];
  zoneATies: string[];
  zoneBTies: string[];
  zoneCTies: string[];
}

export interface cDetailingGetDetailedBeamLinesResult {
  numberItems: number;
  beamLineIDs: string[];
}

export interface cDetailingGetDetailedBeamLines_1Result {
  numberItems: number;
  towerNames: string[];
  storyNames: string[];
  beamLineIDs: string[];
}

export interface cDetailingGetDetailedColumnStackDataResult {
  objectUniqueNames: string[];
  numLongBarSets: number;
  numLongBars: number[];
  longBarDiameter: number[];
  longBarNotation: string[];
  longBarStartDist: number[];
  longBarStartBend: number[];
  longBarEndBend: number[];
  longBarLength: number[];
  longBarNumLayers: number[];
  numTieZones: number;
  tieBarZones: string[];
  numTieBars: number[];
  numTieVertLegs: number[];
  tieBarDiameter: number[];
  tieBarNotation: string[];
  tieBarStartDist: number[];
  tieBarSpacing: number[];
  tieBarType: number[];
}

export interface cDetailingGetDetailedColumnStackData_1Result {
  objectUniqueNames: string[];
  numLongBarSets: number;
  numLongBars: number[];
  longBarGUID: string[];
  longBarDiameter: number[];
  longBarNotation: string[];
  longBarStartDist: number[];
  longBarStartBend: number[];
  longBarEndBend: number[];
  longBarLength: number[];
  longBarNumLayers: number[];
  numTieZones: number;
  tieBarZones: string[];
  numTieBars: number[];
  numTieHorLegs: number[];
  numTieVertLegs: number[];
  tieBarGUID: string[];
  tieBarDiameter: number[];
  tieBarNotation: string[];
  tieBarStartDist: number[];
  tieBarSpacing: number[];
  tieBarType: number[];
}

export interface cDetailingGetDetailedColumnStackData_2Result {
  objectUniqueNames: string[];
  numLongBarSets: number;
  numLongBars: number[];
  numLongR2Bars: number[];
  numLongR3Bars: number[];
  longBarGUID: string[];
  longBarDiameter: number[];
  longBarNotation: string[];
  longBarStartDist: number[];
  longBarStartBend: number[];
  longBarEndBend: number[];
  longBarLength: number[];
  longBarNumLayers: number[];
  numTieZones: number;
  tieBarZone: string[];
  numTieBars: number[];
  numTieR2Legs: number[];
  numTieR3Legs: number[];
  tieBarGUID: string[];
  tieBarDiameter: number[];
  tieBarNotation: string[];
  tieBarStartDist: number[];
  tieBarSpacing: number[];
  tieBarType: number[];
}

export interface cDetailingGetDetailedColumnStackGuidDataResult {
  longitudinalBars: string[];
  tiesA: string[];
  tiesB: string[];
  tiesC: string[];
}

export interface cDetailingGetDetailedColumnStacksResult {
  numberItems: number;
  columnStackIDs: string[];
}

export interface cDetailingGetDetailedSlab_OneDetailingOutputInfoResult {
  guid_ETABS: string;
  floor: string;
  storyNameETABS: string;
  levelZ: number;
  numberStrips: number;
}

export interface cDetailingGetDetailedSlabBotBarDataResult {
  numData: number;
  names: string[];
  numBars: number[];
  barDiameter: number[];
  barNotation: string[];
  barMaterial: string[];
  startX: number[];
  startY: number[];
  startZ: number[];
  endX: number[];
  endY: number[];
  endZ: number[];
  widthLeft: number[];
  widthRight: number[];
  offsetFromTop: number[];
  offsetFromBot: number[];
  startBarBend: number[];
  endBarBend: number[];
  gUIDs: string[];
}

export interface cDetailingGetDetailedSlabBotBarData_1Result {
  numData: number;
  names: string[];
  numBars: number[];
  barDiameter: number[];
  barNotation: string[];
  barMaterial: string[];
  startX: number[];
  startY: number[];
  startZ: number[];
  endX: number[];
  endY: number[];
  endZ: number[];
  widthLeft: number[];
  widthRight: number[];
  offsetFromTop: number[];
  offsetFromBot: number[];
  startBarBend: number[];
  endBarBend: number[];
  gUIDs: string[];
  stripNames: string[];
  spanNos: number[];
}

export interface cDetailingGetDetailedSlabsResult {
  numberItems: number;
  names: string[];
  slabElevations: number[];
  gUIDs: string[];
}

export interface cDetailingGetDetailedSlabTopBarDataResult {
  numData: number;
  names: string[];
  numBars: number[];
  barDiameter: number[];
  barNotation: string[];
  barMaterial: string[];
  startX: number[];
  startY: number[];
  startZ: number[];
  endX: number[];
  endY: number[];
  endZ: number[];
  widthLeft: number[];
  widthRight: number[];
  offsetFromTop: number[];
  offsetFromBot: number[];
  startBarBend: number[];
  endBarBend: number[];
  gUIDs: string[];
}

export interface cDetailingGetDetailedSlabTopBarData_1Result {
  numData: number;
  names: string[];
  numBars: number[];
  barDiameter: number[];
  barNotation: string[];
  barMaterial: string[];
  startX: number[];
  startY: number[];
  startZ: number[];
  endX: number[];
  endY: number[];
  endZ: number[];
  widthLeft: number[];
  widthRight: number[];
  offsetFromTop: number[];
  offsetFromBot: number[];
  startBarBend: number[];
  endBarBend: number[];
  gUIDs: string[];
  stripNames: string[];
  spanNos: number[];
}

export interface cDetailingGetDetailedWall_OnePier_OneDesignLeg_OneTieBar_OneTiePline_OnePointResult {
  x: number;
  y: number;
  z: number;
}

export interface cDetailingGetDetailedWall_OneWallStack_OnePier_OneDesignLeg_OneTieBar_OneTiePlineInfoResult {
  dia: number;
  numberPoints: number;
  zoneLength: number;
  locationCode: number;
}

export interface cDetailingGetDetailedWall_OneWallStack_OnePier_OneDesignLeg_OneTieBarInfoResult {
  gUID: string;
  barSize_Dia: number;
  barSize_Area: number;
  barSize_Fy: number;
  barSize_Notation: string;
  spacing: number;
  startZ: number;
  endZ: number;
  tieShape: number;
  numberOfTiePlines: number;
}

export interface cDetailingGetDetailedWall_OneWallStack_OnePier_OneDesignLeg_OneVerticalBarInfoResult {
  gUID: string;
  barSizeFirst_Dia: number;
  barSizeFirst_Area: number;
  barSizeFirst_Fy: number;
  barSizeFirst_Notation: string;
  barSizeLast_Dia: number;
  barSizeLast_Area: number;
  barSizeLast_Fy: number;
  barSizeLast_Notation: string;
  barSizeOthers_Dia: number;
  barSizeOthers_Area: number;
  barSizeOthers_Fy: number;
  barSizeOthers_Notation: string;
  number: number;
  startX: number;
  startY: number;
  endX: number;
  endY: number;
  startBarBend: number;
  endBarBend: number;
  offsetZ: number;
  barLength: number;
  locationCode: number;
}

export interface cDetailingGetDetailedWall_OneWallStack_OnePier_OneDesignLegOutputInfoResult {
  gUID: string;
  pierLabel: string;
  x1: number;
  y1: number;
  z1: number;
  x2: number;
  y2: number;
  z2: number;
  zLevel: number;
  numberVerticalBars: number;
  numberHorizontalBars: number;
  totalAreaObjects: number;
  areaObjectNames: string[];
}

export interface cDetailingGetDetailedWall_OneWallStack_OnePierOutputInfoResult {
  storyID: number;
  eTABSStoryName: string;
  numberDesignLegs: number;
}

export interface cDetailingGetDetailedWall_OneWallStack_OneSpandrel_OneLongBarInfoResult {
  barSize_Dia: number;
  barSize_Area: number;
  barSize_Fy: number;
  barSize_Notation: string;
  numberPoints: number;
  x: number[];
  y: number[];
  z: number[];
  startType: number;
  endType: number;
}

export interface cDetailingGetDetailedWall_OneWallStack_OneSpandrel_OneStirrupsInfoResult {
  barSize_Dia: number;
  barSize_Area: number;
  barSize_Fy: number;
  barSize_Notation: string;
  x1: number;
  x2: number;
  spacing: number;
  numberLegs: number;
}

export interface cDetailingGetDetailedWall_OneWallStack_OneSpandrelOutputInfoResult {
  gUID: string;
  name: string;
  height: number;
  width: number;
  thickness: number;
  coverLongBar: number;
  coverStirrups: number;
  x1: number;
  y1: number;
  z1: number;
  x2: number;
  y2: number;
  z2: number;
  numberLongBars: number;
  numberStirrups: number;
  totalAreaObjects: number;
  areaObjectNames: string[];
}

export interface cDetailingGetNumberDetailedSlabsResult {
  numberDetailingOutput: number;
}

export interface cDetailingGetNumberDetailedWallStacksResult {
  numberWallStacks: number;
}

export interface cDetailingGetOneDetailedSlab_OneDetailingOutput_OneStrip_OneDetailingRegion_OneBottomRebar_Bar1InfoResult {
  gUID: string;
  placeCode: string;
  dia: number;
  size: string;
  number: number;
  startDist: number;
  endDist: number;
  startBend: number;
  endBend: number;
  material: string;
}

export interface cDetailingGetOneDetailedSlab_OneDetailingOutput_OneStrip_OneDetailingRegion_OneBottomRebar_Bar2InfoResult {
  gUID: string;
  placeCode: string;
  dia: number;
  size: string;
  number: number;
  startDist: number;
  endDist: number;
  startBend: number;
  endBend: number;
  material: string;
}

export interface cDetailingGetOneDetailedSlab_OneDetailingOutput_OneStrip_OneDetailingRegion_OneBottomRebarInfoResult {
  x1: number;
  y1: number;
  x2: number;
  y2: number;
  widthRight: number;
  widthLeft: number;
  z: number;
  reqAst: number;
  provAst: number;
}

export interface cDetailingGetOneDetailedSlab_OneDetailingOutput_OneStrip_OneDetailingRegion_OneTopRebar_Bar1InfoResult {
  gUID: string;
  placeCode: string;
  dia: number;
  size: string;
  number: number;
  startDist: number;
  endDist: number;
  startBend: number;
  endBend: number;
  material: string;
}

export interface cDetailingGetOneDetailedSlab_OneDetailingOutput_OneStrip_OneDetailingRegion_OneTopRebar_Bar2InfoResult {
  gUID: string;
  placeCode: string;
  dia: number;
  size: string;
  number: number;
  startDist: number;
  endDist: number;
  startBend: number;
  endBend: number;
  material: string;
}

export interface cDetailingGetOneDetailedSlab_OneDetailingOutput_OneStrip_OneDetailingRegion_OneTopRebarInfoResult {
  x1: number;
  y1: number;
  x2: number;
  y2: number;
  widthRight: number;
  widthLeft: number;
  z: number;
  reqAst: number;
  provAst: number;
}

export interface cDetailingGetOneDetailedSlab_OneDetailingOutput_OneStrip_OneDetailingRegionInfoResult {
  x1: number;
  y1: number;
  x2: number;
  y2: number;
  numberTopBars: number;
  numberBottomBars: number;
}

export interface cDetailingGetOneDetailedSlab_OneDetailingOutput_StripGUIDResult {
  gUID_ETABS: string;
}

export interface cDetailingGetOneDetailedSlab_OneDetailingOutput_StripInfoResult {
  name: string;
  layerName: string;
  stripType: string;
  numberRegions: number;
}

export interface cDetailingGetSimilarBeamLinesResult {
  numberSimilarBeams: number;
  numberUniqueObjects: number[];
  objectUniqueNames: string[];
}

export interface cDetailingGetSimilarBeamLines_1Result {
  numberSimilarBeams: number;
  numberUniqueObjects: number[];
  objectUniqueNames: string[];
}

export interface cDetailingGetSimilarColumnStacksResult {
  numberSimilarColumns: number;
  numberUniqueObjects: number[];
  objectUniqueNames: string[];
}

export interface cDetailingGetSimilarSlabsResult {
  numberSimilarSlabs: number;
  names: string[];
}

export interface cDiaphragmGetDiaphragmResult {
  semiRigid: boolean;
}

export interface cDiaphragmGetNameListResult {
  numberNames: number;
  myName: string[];
}

export interface cDStAISC_LRFD93GetOverwriteResult {
  value: number;
  progDet: boolean;
}

export interface cDStAISC_LRFD93GetPreferenceResult {
  value: number;
}

export interface cDStAISC360_05_IBC2006GetOverwriteResult {
  value: number;
  progDet: boolean;
}

export interface cDStAISC360_05_IBC2006GetPreferenceResult {
  value: number;
}

export interface cDStAISC360_10GetOverwriteResult {
  value: number;
  progDet: boolean;
}

export interface cDStAISC360_10GetPreferenceResult {
  value: number;
}

export interface cDStAISC360_16GetOverwriteResult {
  value: number;
  progDet: boolean;
}

export interface cDStAISC360_16GetPreferenceResult {
  value: number;
}

export interface cDStAISC360_22GetOverwriteResult {
  value: number;
  progDet: boolean;
}

export interface cDStAISC360_22GetPreferenceResult {
  value: number;
}

export interface cDStAustralian_AS4100_2020GetOverwriteResult {
  value: number;
  progDet: boolean;
}

export interface cDStAustralian_AS4100_2020GetPreferenceResult {
  value: number;
}

export interface cDStAustralian_AS4100_98GetOverwriteResult {
  value: number;
  progDet: boolean;
}

export interface cDStAustralian_AS4100_98GetPreferenceResult {
  value: number;
}

export interface cDStBS5950_2000GetOverwriteResult {
  value: number;
  progDet: boolean;
}

export interface cDStBS5950_2000GetPreferenceResult {
  value: number;
}

export interface cDStCanadian_S16_09GetOverwriteResult {
  value: number;
  progDet: boolean;
}

export interface cDStCanadian_S16_09GetPreferenceResult {
  value: number;
}

export interface cDStCanadian_S16_14GetOverwriteResult {
  value: number;
  progDet: boolean;
}

export interface cDStCanadian_S16_14GetPreferenceResult {
  value: number;
}

export interface cDStCanadian_S16_19GetOverwriteResult {
  value: number;
  progDet: boolean;
}

export interface cDStCanadian_S16_19GetPreferenceResult {
  value: number;
}

export interface cDStCanadian_S16_24GetOverwriteResult {
  value: number;
  progDet: boolean;
}

export interface cDStCanadian_S16_24GetPreferenceResult {
  value: number;
}

export interface cDStChinese_2010GetOverwriteResult {
  value: number;
  progDet: boolean;
}

export interface cDStChinese_2010GetPreferenceResult {
  value: number;
}

export interface cDStChinese_2018GetOverwriteResult {
  value: number;
  progDet: boolean;
}

export interface cDStChinese_2018GetPreferenceResult {
  value: number;
}

export interface cDStEN1993_1_1_2005GetOverwriteResult {
  value: number;
  progDet: boolean;
}

export interface cDStEN1993_1_1_2005GetPreferenceResult {
  value: number;
}

export interface cDStEurocode_3_2005GetOverwriteResult {
  value: number;
  progDet: boolean;
}

export interface cDStEurocode_3_2005GetPreferenceResult {
  value: number;
}

export interface cDStIndian_IS_800_2007GetOverwriteResult {
  value: number;
  progDet: boolean;
}

export interface cDStIndian_IS_800_2007GetPreferenceResult {
  value: number;
}

export interface cDStItalianNTC2008SGetOverwriteResult {
  value: number;
  progDet: boolean;
}

export interface cDStItalianNTC2008SGetPreferenceResult {
  value: number;
}

export interface cDStItalianNTC2018SGetOverwriteResult {
  textValue: string;
  numericValue: number;
  progDet: boolean;
}

export interface cDStItalianNTC2018SGetPreferenceResult {
  textValue: string;
  numericValue: number;
}

export interface cDStNewZealand_NZS3404_97GetOverwriteResult {
  value: number;
  progDet: boolean;
}

export interface cDStNewZealand_NZS3404_97GetPreferenceResult {
  value: number;
}

export interface cDStSP16_13330_2011GetOverwriteResult {
  value: number;
  progDet: boolean;
}

export interface cDStSP16_13330_2011GetPreferenceResult {
  value: number;
}

export interface cFileGetFilePathResult {
  filePath: string;
}

export interface cFrameObjAddByCoordResult {
  name: string;
}

export interface cFrameObjAddByPointResult {
  name: string;
}

export interface cFrameObjGetAllFramesResult {
  numberNames: number;
  myName: string[];
  propName: string[];
  storyName: string[];
  pointName1: string[];
  pointName2: string[];
  point1X: number[];
  point1Y: number[];
  point1Z: number[];
  point2X: number[];
  point2Y: number[];
  point2Z: number[];
  angle: number[];
  offset1X: number[];
  offset2X: number[];
  offset1Y: number[];
  offset2Y: number[];
  offset1Z: number[];
  offset2Z: number[];
  cardinalPoint: number[];
}

export interface cFrameObjGetColumnSpliceOverwriteResult {
  spliceOption: number;
  height: number;
}

export interface cFrameObjGetCurved_2Result {
  curveType: number;
  tension: number;
  numPnts: number;
  gx: number[];
  gy: number[];
  gz: number[];
}

export interface cFrameObjGetDesignOrientationResult {
  designOrientation: eFrameDesignOrientation;
}

export interface cFrameObjGetDesignProcedureResult {
  myType: number;
}

export interface cFrameObjGetElmResult {
  nElm: number;
  elm: string[];
  rDI: number[];
  rDJ: number[];
}

export interface cFrameObjGetEndLengthOffsetResult {
  autoOffset: boolean;
  length1: number;
  length2: number;
  rZ: number;
}

export interface cFrameObjGetGroupAssignResult {
  numberGroups: number;
  groups: string[];
}

export interface cFrameObjGetGUIDResult {
  gUID: string;
}

export interface cFrameObjGetHingeAssignsResult {
  numberHinges: number;
  hingeNum: number[];
  prop: string[];
  myType: number[];
  behavior: number[];
  source: string[];
  rD: number[];
}

export interface cFrameObjGetHingeAssigns_1Result {
  numberHinges: number;
  hingeNum: number[];
  prop: string[];
  myType: number[];
  behavior: number[];
  source: string[];
  locType: eHingeLocationType[];
  rD: number[];
  aD: number[];
}

export interface cFrameObjGetInsertionPointResult {
  cardinalPoint: number;
  mirror2: boolean;
  stiffTransform: boolean;
  offset1: number[];
  offset2: number[];
  cSys: string;
}

export interface cFrameObjGetInsertionPoint_1Result {
  cardinalPoint: number;
  mirror2: boolean;
  mirror3: boolean;
  stiffTransform: boolean;
  offset1: number[];
  offset2: number[];
  cSys: string;
}

export interface cFrameObjGetLabelFromNameResult {
  label: string;
  story: string;
}

export interface cFrameObjGetLabelNameListResult {
  numberNames: number;
  myName: string[];
  myLabel: string[];
  myStory: string[];
}

export interface cFrameObjGetLateralBracingResult {
  numberItems: number;
  frameName: string[];
  myType: number[];
  loc: number[];
  rD1: number[];
  rD2: number[];
  dist1: number[];
  dist2: number[];
}

export interface cFrameObjGetLoadDistributedResult {
  numberItems: number;
  frameName: string[];
  loadPat: string[];
  myType: number[];
  cSys: string[];
  dir: number[];
  rD1: number[];
  rD2: number[];
  dist1: number[];
  dist2: number[];
  val1: number[];
  val2: number[];
}

export interface cFrameObjGetLoadPointResult {
  numberItems: number;
  frameName: string[];
  loadPat: string[];
  myType: number[];
  cSys: string[];
  dir: number[];
  relDist: number[];
  dist: number[];
  val: number[];
}

export interface cFrameObjGetLoadTemperatureResult {
  numberItems: number;
  frameName: string[];
  loadPat: string[];
  myType: number[];
  val: number[];
  patternName: string[];
}

export interface cFrameObjGetLocalAxesResult {
  ang: number;
  advanced: boolean;
}

export interface cFrameObjGetMassResult {
  massOverL: number;
}

export interface cFrameObjGetMaterialOverwriteResult {
  propName: string;
}

export interface cFrameObjGetModifiersResult {
  value: number[];
}

export interface cFrameObjGetNameFromLabelResult {
  name: string;
}

export interface cFrameObjGetNameListResult {
  numberNames: number;
  myName: string[];
}

export interface cFrameObjGetNameListOnStoryResult {
  numberNames: number;
  myName: string[];
}

export interface cFrameObjGetOutputStationsResult {
  myType: number;
  maxSegSize: number;
  minSections: number;
  noOutPutAndDesignAtElementEnds: boolean;
  noOutPutAndDesignAtPointLoads: boolean;
}

export interface cFrameObjGetPierResult {
  pierName: string;
}

export interface cFrameObjGetPointsResult {
  point1: string;
  point2: string;
}

export interface cFrameObjGetReleasesResult {
  iI: boolean[];
  jJ: boolean[];
  startValue: number[];
  endValue: number[];
}

export interface cFrameObjGetSectionResult {
  propName: string;
  sAuto: string;
}

export interface cFrameObjGetSectionNonPrismaticResult {
  propName: string;
  sVarTotalLength: number;
  sVarRelStartLoc: number;
}

export interface cFrameObjGetSelectedResult {
  selected: boolean;
}

export interface cFrameObjGetSpandrelResult {
  spandrelName: string;
}

export interface cFrameObjGetSpringAssignmentResult {
  springProp: string;
}

export interface cFrameObjGetSupportsResult {
  supportName1: string;
  supportType1: eObjType;
  supportName2: string;
  supportType2: eObjType;
}

export interface cFrameObjGetTCLimitsResult {
  limitCompressionExists: boolean;
  limitCompression: number;
  limitTensionExists: boolean;
  limitTension: number;
}

export interface cFrameObjGetTransformationMatrixResult {
  value: number[];
}

export interface cFrameObjGetTypeOAPIResult {
  myType: string;
}

export interface cFrameObjSetInsertionPointResult {
  offset1: number[];
  offset2: number[];
}

export interface cFrameObjSetInsertionPoint_1Result {
  offset1: number[];
  offset2: number[];
}

export interface cFrameObjSetModifiersResult {
  value: number[];
}

export interface cFrameObjSetReleasesResult {
  iI: boolean[];
  jJ: boolean[];
  startValue: number[];
  endValue: number[];
}

export interface cFunctionGetNameListResult {
  numberNames: number;
  myName: string[];
}

export interface cFunctionGetTypeOAPIResult {
  funcType: number;
  addType: number;
}

export interface cFunctionGetValuesResult {
  numberItems: number;
  myTime: number[];
  value: number[];
}

export interface cFunctionRSGetNTC2008Result {
  paramsOption: number;
  latitude: number;
  longitude: number;
  island: number;
  limitState: number;
  usageClass: number;
  nomLife: number;
  peakAccel: number;
  f0: number;
  tcs: number;
  specType: number;
  soilType: number;
  topography: number;
  hRatio: number;
  damping: number;
  q: number;
}

export interface cFunctionRSGetNTC2018Result {
  paramsOption: number;
  latitude: number;
  longitude: number;
  island: number;
  limitState: number;
  usageClass: number;
  nomLife: number;
  peakAccel: number;
  f0: number;
  tcs: number;
  specType: number;
  soilType: number;
  topography: number;
  hRatio: number;
  damping: number;
  q: number;
}

export interface cGenDisplCountPointResult {
  count: number;
}

export interface cGenDisplGetNameListResult {
  numberNames: number;
  myName: string[];
}

export interface cGenDisplGetPointResult {
  numberItems: number;
  pointName: string[];
  u1: number[];
  u2: number[];
  u3: number[];
  r1: number[];
  r2: number[];
  r3: number[];
}

export interface cGenDisplGetTypeGenDisplResult {
  myType: number;
}

export interface cGenDisplGetTypeOAPIResult {
  myType: number;
}

export interface cGenDisplSetPointResult {
  sF: number[];
}

export interface cGridSysGetGridSysResult {
  x: number;
  y: number;
  rZ: number;
}

export interface cGridSysGetGridSys_2Result {
  xo: number;
  yo: number;
  rZ: number;
  gridSysType: string;
  numXLines: number;
  numYLines: number;
  gridLineIDX: string[];
  gridLineIDY: string[];
  ordinateX: number[];
  ordinateY: number[];
  visibleX: boolean[];
  visibleY: boolean[];
  bubbleLocX: string[];
  bubbleLocY: string[];
}

export interface cGridSysGetGridSysCartesianResult {
  xo: number;
  yo: number;
  rZ: number;
  storyRangeIsDefault: boolean;
  topStory: string;
  bottomStory: string;
  bubbleSize: number;
  gridColor: number;
  numXLines: number;
  gridLineIDX: string[];
  ordinateX: number[];
  visibleX: boolean[];
  bubbleLocX: string[];
  numYLines: number;
  gridLineIDY: string[];
  ordinateY: number[];
  visibleY: boolean[];
  bubbleLocY: string[];
  numGenLines: number;
  gridLineIDGen: string[];
  genOrdX1: number[];
  genOrdY1: number[];
  genOrdX2: number[];
  genOrdY2: number[];
  visibleGen: boolean[];
  bubbleLocGen: string[];
}

export interface cGridSysGetGridSysCylindricalResult {
  xo: number;
  yo: number;
  rZ: number;
  storyRangeIsDefault: boolean;
  topStory: string;
  bottomStory: string;
  bubbleSize: number;
  gridColor: number;
  numRLines: number;
  gridLineIDR: string[];
  ordinateR: number[];
  visibleR: boolean[];
  bubbleLocR: string[];
  numTLines: number;
  gridLineIDT: string[];
  ordinateT: number[];
  visibleT: boolean[];
  bubbleLocT: string[];
}

export interface cGridSysGetGridSysTypeResult {
  gridSysType: string;
}

export interface cGridSysGetNameListResult {
  numberNames: number;
  myName: string[];
}

export interface cGridSysGetNameTypeListResult {
  numberNames: number;
  gridSysName: string[];
  gridSysType: string[];
}

export interface cGridSysGetTransformationMatrixResult {
  value: number[];
}

export interface cGroupGetAssignmentsResult {
  numberItems: number;
  objectType: number[];
  objectName: string[];
}

export interface cGroupGetGroupResult {
  color: number;
  specifiedForSelection: boolean;
  specifiedForSectionCutDefinition: boolean;
  specifiedForSteelDesign: boolean;
  specifiedForConcreteDesign: boolean;
  specifiedForAluminumDesign: boolean;
  specifiedForColdFormedDesign: boolean;
  specifiedForStaticNLActiveStage: boolean;
  specifiedForBridgeResponseOutput: boolean;
  specifiedForAutoSeismicOutput: boolean;
  specifiedForAutoWindOutput: boolean;
  specifiedForMassAndWeight: boolean;
}

export interface cGroupGetGroup_1Result {
  color: number;
  specifiedForSelection: boolean;
  specifiedForSectionCutDefinition: boolean;
  specifiedForSteelDesign: boolean;
  specifiedForConcreteDesign: boolean;
  specifiedForAluminumDesign: boolean;
  specifiedForStaticNLActiveStage: boolean;
  specifiedForAutoSeismicOutput: boolean;
  specifiedForAutoWindOutput: boolean;
  specifiedForMassAndWeight: boolean;
  specifiedForSteelJoistDesign: boolean;
  specifiedForWallDesign: boolean;
  specifiedForBasePlateDesign: boolean;
  specifiedForConnectionDesign: boolean;
}

export interface cGroupGetNameListResult {
  numberNames: number;
  myName: string[];
}

export interface cLineElmGetEndLengthOffsetResult {
  length1: number;
  length2: number;
  rZ: number;
}

export interface cLineElmGetInsertionPointResult {
  offset1: number[];
  offset2: number[];
}

export interface cLineElmGetLoadDistributedResult {
  numberItems: number;
  lineName: string[];
  loadPat: string[];
  myType: number[];
  cSys: string[];
  dir: number[];
  rD1: number[];
  rD2: number[];
  dist1: number[];
  dist2: number[];
  val1: number[];
  val2: number[];
}

export interface cLineElmGetLoadPointResult {
  numberItems: number;
  lineName: string[];
  loadPat: string[];
  myType: number[];
  cSys: string[];
  dir: number[];
  relDist: number[];
  dist: number[];
  val: number[];
}

export interface cLineElmGetLoadTemperatureResult {
  numberItems: number;
  lineName: string[];
  loadPat: string[];
  myType: number[];
  val: number[];
  patternName: string[];
}

export interface cLineElmGetLocalAxesResult {
  ang: number;
}

export interface cLineElmGetMaterialOverwriteResult {
  propName: string;
}

export interface cLineElmGetModifiersResult {
  value: number[];
}

export interface cLineElmGetNameListResult {
  numberNames: number;
  myName: string[];
}

export interface cLineElmGetObjResult {
  obj: string;
  objType: number;
  rDI: number;
  rDJ: number;
}

export interface cLineElmGetPointsResult {
  point1: string;
  point2: string;
}

export interface cLineElmGetPropertyResult {
  propName: string;
  objType: number;
  var: boolean;
  sVarRelStartLoc: number;
  sVarTotalLength: number;
}

export interface cLineElmGetReleasesResult {
  iI: boolean[];
  jJ: boolean[];
  startValue: number[];
  endValue: number[];
}

export interface cLineElmGetTCLimitsResult {
  limitCompressionExists: boolean;
  limitCompression: number;
  limitTensionExists: boolean;
  limitTension: number;
}

export interface cLineElmGetTransformationMatrixResult {
  value: number[];
}

export interface cLinkObjAddByCoordResult {
  name: string;
}

export interface cLinkObjAddByPointResult {
  name: string;
}

export interface cLinkObjGetElmResult {
  elm: string;
}

export interface cLinkObjGetGroupAssignResult {
  numberGroups: number;
  groups: string[];
}

export interface cLinkObjGetGUIDResult {
  gUID: string;
}

export interface cLinkObjGetLocalAxesResult {
  ang: number;
  advanced: boolean;
}

export interface cLinkObjGetLocalAxesAdvancedResult {
  active: boolean;
  axVectOpt: number;
  axCSys: string;
  axDir: number[];
  axPt: string[];
  axVect: number[];
  plane2: number;
  plVectOpt: number;
  plCSys: string;
  plDir: number[];
  plPt: string[];
  plVect: number[];
}

export interface cLinkObjGetNameListResult {
  numberNames: number;
  myName: string[];
}

export interface cLinkObjGetNameListOnStoryResult {
  numberNames: number;
  myName: string[];
}

export interface cLinkObjGetPointsResult {
  point1: string;
  point2: string;
}

export interface cLinkObjGetPropertyResult {
  propName: string;
}

export interface cLinkObjGetSelectedResult {
  selected: boolean;
}

export interface cLinkObjGetTransformationMatrixResult {
  value: number[];
}

export interface cLinkObjSetLocalAxesAdvancedResult {
  axDir: number[];
  axPt: string[];
  axVect: number[];
  plDir: number[];
  plPt: string[];
  plVect: number[];
}

export interface cLoadCasesGetNameListResult {
  numberNames: number;
  myName: string[];
}

export interface cLoadCasesGetTypeOAPIResult {
  caseType: eLoadCaseType;
  subType: number;
}

export interface cLoadCasesGetTypeOAPI_1Result {
  caseType: eLoadCaseType;
  subType: number;
  designType: eLoadPatternType;
  designTypeOption: number;
  auto: number;
}

export interface cLoadPatternsGetAutoSeismicCodeResult {
  codeName: string;
}

export interface cLoadPatternsGetAutoWindCodeResult {
  codeName: string;
}

export interface cLoadPatternsGetLoadTypeResult {
  myType: eLoadPatternType;
}

export interface cLoadPatternsGetNameListResult {
  numberNames: number;
  myName: string[];
}

export interface cLoadPatternsGetSelfWTMultiplierResult {
  selfWTMultiplier: number;
}

export interface cOptionsGetDefaultFunctionFolderResult {
  path: string;
}

export interface cPierLabelGetNameListResult {
  numberNames: number;
  myName: string[];
}

export interface cPierLabelGetSectionPropertiesResult {
  numberStories: number;
  storyName: string[];
  axisAngle: number[];
  numAreaObjs: number[];
  numLineObjs: number[];
  widthBot: number[];
  thicknessBot: number[];
  widthTop: number[];
  thicknessTop: number[];
  matProp: string[];
  cGBotX: number[];
  cGBotY: number[];
  cGBotZ: number[];
  cGTopX: number[];
  cGTopY: number[];
  cGTopZ: number[];
}

export interface cPointElmCountConstraintResult {
  count: number;
}

export interface cPointElmCountLoadDisplResult {
  count: number;
}

export interface cPointElmCountLoadForceResult {
  count: number;
}

export interface cPointElmGetConnectivityResult {
  numberItems: number;
  objectType: number[];
  objectName: string[];
  pointNumber: number[];
}

export interface cPointElmGetConstraintResult {
  numberItems: number;
  pointName: string[];
  constraintName: string[];
}

export interface cPointElmGetCoordCartesianResult {
  x: number;
  y: number;
  z: number;
}

export interface cPointElmGetLoadDisplResult {
  numberItems: number;
  pointName: string[];
  loadPat: string[];
  lcStep: number[];
  cSys: string[];
  u1: number[];
  u2: number[];
  u3: number[];
  r1: number[];
  r2: number[];
  r3: number[];
}

export interface cPointElmGetLoadForceResult {
  numberItems: number;
  pointName: string[];
  loadPat: string[];
  lcStep: number[];
  cSys: string[];
  f1: number[];
  f2: number[];
  f3: number[];
  m1: number[];
  m2: number[];
  m3: number[];
}

export interface cPointElmGetLocalAxesResult {
  a: number;
  b: number;
  c: number;
}

export interface cPointElmGetNameListResult {
  numberNames: number;
  myName: string[];
}

export interface cPointElmGetObjResult {
  obj: string;
  objType: number;
}

export interface cPointElmGetPatternValueResult {
  value: number;
}

export interface cPointElmGetRestraintResult {
  value: boolean[];
}

export interface cPointElmGetSpringResult {
  k: number[];
}

export interface cPointElmGetSpringCoupledResult {
  k: number[];
}

export interface cPointElmGetTransformationMatrixResult {
  value: number[];
}

export interface cPointElmIsSpringCoupledResult {
  isCoupled: boolean;
}

export interface cPointObjAddCartesianResult {
  name: string;
}

export interface cPointObjCountLoadDisplResult {
  count: number;
}

export interface cPointObjCountLoadForceResult {
  count: number;
}

export interface cPointObjGetAllPointsResult {
  numberNames: number;
  myName: string[];
  x: number[];
  y: number[];
  z: number[];
}

export interface cPointObjGetCommonToResult {
  commonTo: number;
}

export interface cPointObjGetConnectivityResult {
  numberItems: number;
  objectType: number[];
  objectName: string[];
  pointNumber: number[];
}

export interface cPointObjGetCoordCartesianResult {
  x: number;
  y: number;
  z: number;
}

export interface cPointObjGetCoordCylindricalResult {
  r: number;
  theta: number;
  z: number;
}

export interface cPointObjGetCoordSphericalResult {
  r: number;
  a: number;
  b: number;
}

export interface cPointObjGetDiaphragmResult {
  diaphragmOption: eDiaphragmOption;
  diaphragmName: string;
}

export interface cPointObjGetElmResult {
  elm: string;
}

export interface cPointObjGetGroupAssignResult {
  numberGroups: number;
  groups: string[];
}

export interface cPointObjGetGUIDResult {
  gUID: string;
}

export interface cPointObjGetLabelFromNameResult {
  label: string;
  story: string;
}

export interface cPointObjGetLabelNameListResult {
  numberNames: number;
  myName: string[];
  myLabel: string[];
  myStory: string[];
}

export interface cPointObjGetLoadDisplResult {
  numberItems: number;
  pointName: string[];
  loadPat: string[];
  lcStep: number[];
  cSys: string[];
  u1: number[];
  u2: number[];
  u3: number[];
  r1: number[];
  r2: number[];
  r3: number[];
}

export interface cPointObjGetLoadForceResult {
  numberItems: number;
  pointName: string[];
  loadPat: string[];
  lcStep: number[];
  cSys: string[];
  f1: number[];
  f2: number[];
  f3: number[];
  m1: number[];
  m2: number[];
  m3: number[];
}

export interface cPointObjGetLocalAxesResult {
  a: number;
  b: number;
  c: number;
  advanced: boolean;
}

export interface cPointObjGetMassResult {
  m: number[];
}

export interface cPointObjGetNameFromLabelResult {
  name: string;
}

export interface cPointObjGetNameListResult {
  numberNames: number;
  myName: string[];
}

export interface cPointObjGetNameListOnStoryResult {
  numberNames: number;
  myName: string[];
}

export interface cPointObjGetPanelZoneResult {
  propType: number;
  thickness: number;
  k1: number;
  k2: number;
  linkProp: string;
  connectivity: number;
  localAxisFrom: number;
  localAxisAngle: number;
}

export interface cPointObjGetRestraintResult {
  value: boolean[];
}

export interface cPointObjGetSelectedResult {
  selected: boolean;
}

export interface cPointObjGetSpecialPointResult {
  specialPoint: boolean;
}

export interface cPointObjGetSpringResult {
  k: number[];
}

export interface cPointObjGetSpringAssignmentResult {
  springProp: string;
}

export interface cPointObjGetSpringCoupledResult {
  k: number[];
}

export interface cPointObjGetTransformationMatrixResult {
  value: number[];
}

export interface cPointObjIsSpringCoupledResult {
  isCoupled: boolean;
}

export interface cPointObjSetLoadDisplResult {
  value: number[];
}

export interface cPointObjSetLoadForceResult {
  value: number[];
}

export interface cPointObjSetMassResult {
  m: number[];
}

export interface cPointObjSetMassByVolumeResult {
  m: number[];
}

export interface cPointObjSetMassByWeightResult {
  m: number[];
}

export interface cPointObjSetRestraintResult {
  value: boolean[];
}

export interface cPointObjSetSpringResult {
  k: number[];
}

export interface cPointObjSetSpringCoupledResult {
  k: number[];
}

export interface cPropAreaGetDeckResult {
  deckType: eDeckType;
  shellType: eShellType;
  matProp: string;
  thickness: number;
  color: number;
  notes: string;
  gUID: string;
}

export interface cPropAreaGetDeck_1Result {
  deckType: eDeckType;
  slabFillMatProp: string;
  deckMatProp: string;
  slabDepth: number;
  ribDepth: number;
  ribWidthTop: number;
  ribWidthBot: number;
  ribSpacing: number;
  deckShearThickness: number;
  deckUnitWeight: number;
  shearStudDia: number;
  shearStudHs: number;
  shearStudFu: number;
  color: number;
  notes: string;
  gUID: string;
}

export interface cPropAreaGetDeckFilledResult {
  slabDepth: number;
  ribDepth: number;
  ribWidthTop: number;
  ribWidthBot: number;
  ribSpacing: number;
  shearThickness: number;
  unitWeight: number;
  shearStudDia: number;
  shearStudHt: number;
  shearStudFu: number;
}

export interface cPropAreaGetDeckSolidSlabResult {
  slabDepth: number;
  shearStudDia: number;
  shearStudHt: number;
  shearStudFu: number;
}

export interface cPropAreaGetDeckUnfilledResult {
  ribDepth: number;
  ribWidthTop: number;
  ribWidthBot: number;
  ribSpacing: number;
  shearThickness: number;
  unitWeight: number;
}

export interface cPropAreaGetModifiersResult {
  value: number[];
}

export interface cPropAreaGetNameListResult {
  numberNames: number;
  myName: string[];
}

export interface cPropAreaGetShellDesignResult {
  matProp: string;
  steelLayoutOption: number;
  designCoverTopDir1: number;
  designCoverTopDir2: number;
  designCoverBotDir1: number;
  designCoverBotDir2: number;
}

export interface cPropAreaGetShellLayerResult {
  numberLayers: number;
  layerName: string[];
  dist: number[];
  thickness: number[];
  matProp: string[];
  nonlinear: boolean[];
  matAng: number[];
  numIntegrationPts: number[];
}

export interface cPropAreaGetShellLayer_1Result {
  numberLayers: number;
  layerName: string[];
  dist: number[];
  thickness: number[];
  myType: number[];
  numIntegrationPts: number[];
  matProp: string[];
  matAng: number[];
  s11Type: number[];
  s22Type: number[];
  s12Type: number[];
}

export interface cPropAreaGetShellLayer_2Result {
  numberLayers: number;
  layerName: string[];
  dist: number[];
  thickness: number[];
  myType: number[];
  numIntegrationPts: number[];
  matProp: string[];
  matAng: number[];
  matBehavior: number[];
  s11Type: number[];
  s22Type: number[];
  s12Type: number[];
}

export interface cPropAreaGetSlabResult {
  slabType: eSlabType;
  shellType: eShellType;
  matProp: string;
  thickness: number;
  color: number;
  notes: string;
  gUID: string;
}

export interface cPropAreaGetSlabRibbedResult {
  overallDepth: number;
  slabThickness: number;
  stemWidthTop: number;
  stemWidthBot: number;
  ribSpacing: number;
  ribsParallelTo: number;
}

export interface cPropAreaGetSlabWaffleResult {
  overallDepth: number;
  slabThickness: number;
  stemWidthTop: number;
  stemWidthBot: number;
  ribSpacingDir1: number;
  ribSpacingDir2: number;
}

export interface cPropAreaGetTypeOAPIResult {
  propType: number;
}

export interface cPropAreaGetWallResult {
  wallPropType: eWallPropType;
  shellType: eShellType;
  matProp: string;
  thickness: number;
  color: number;
  notes: string;
  gUID: string;
}

export interface cPropAreaGetWallAutoSelectListResult {
  autoSelectList: string[];
  startingProperty: string;
}

export interface cPropAreaSetModifiersResult {
  value: number[];
}

export interface cPropAreaSetShellLayerResult {
  layerName: string[];
  dist: number[];
  thickness: number[];
  matProp: string[];
  nonlinear: boolean[];
  matAng: number[];
  numIntegrationPts: number[];
}

export interface cPropAreaSetShellLayer_1Result {
  numberLayers: number;
  layerName: string[];
  dist: number[];
  thickness: number[];
  myType: number[];
  numIntegrationPts: number[];
  matProp: string[];
  matAng: number[];
  s11Type: number[];
  s22Type: number[];
  s12Type: number[];
}

export interface cPropAreaSetShellLayer_2Result {
  numberLayers: number;
  layerName: string[];
  dist: number[];
  thickness: number[];
  myType: number[];
  numIntegrationPts: number[];
  matProp: string[];
  matAng: number[];
  matBehavior: number[];
  s11Type: number[];
  s22Type: number[];
  s12Type: number[];
}

export interface cPropAreaSpringGetAreaSpringPropResult {
  u1: number;
  u2: number;
  u3: number;
  nonlinearOption3: number;
  springOption: number;
  soilProfile: string;
  endLengthRatio: number;
  period: number;
  color: number;
  notes: string;
  iGUID: string;
}

export interface cPropAreaSpringGetNameListResult {
  numberNames: number;
  myName: string[];
}

export interface cPropFrameGetAllFramePropertiesResult {
  numberNames: number;
  myName: string[];
  propType: eFramePropType[];
  t3: number[];
  t2: number[];
  tf: number[];
  tw: number[];
  t2b: number[];
  tfb: number[];
}

export interface cPropFrameGetAllFrameProperties_2Result {
  numberNames: number;
  myName: string[];
  propType: eFramePropType[];
  t3: number[];
  t2: number[];
  tf: number[];
  tw: number[];
  t2b: number[];
  tfb: number[];
  area: number[];
}

export interface cPropFrameGetAngleResult {
  fileName: string;
  matProp: string;
  t3: number;
  t2: number;
  tf: number;
  tw: number;
  color: number;
  notes: string;
  gUID: string;
}

export interface cPropFrameGetAngle_1Result {
  fileName: string;
  matProp: string;
  t3: number;
  t2: number;
  tf: number;
  tw: number;
  filletRadius: number;
  color: number;
  notes: string;
  gUID: string;
}

export interface cPropFrameGetAutoSelectSteelResult {
  numberItems: number;
  sectName: string[];
  autoStartSection: string;
  notes: string;
  gUID: string;
}

export interface cPropFrameGetChannelResult {
  fileName: string;
  matProp: string;
  t3: number;
  t2: number;
  tf: number;
  tw: number;
  color: number;
  notes: string;
  gUID: string;
}

export interface cPropFrameGetChannel_1Result {
  fileName: string;
  matProp: string;
  t3: number;
  t2: number;
  tf: number;
  tw: number;
  mirrorAbout2: boolean;
  color: number;
  notes: string;
  gUID: string;
}

export interface cPropFrameGetChannel_2Result {
  fileName: string;
  matProp: string;
  t3: number;
  t2: number;
  tf: number;
  tw: number;
  filletRadius: number;
  mirrorAbout2: boolean;
  color: number;
  notes: string;
  gUID: string;
}

export interface cPropFrameGetCircleResult {
  fileName: string;
  matProp: string;
  t3: number;
  color: number;
  notes: string;
  gUID: string;
}

export interface cPropFrameGetColdCResult {
  fileName: string;
  matProp: string;
  t3: number;
  t2: number;
  thickness: number;
  radius: number;
  lipDepth: number;
  color: number;
  notes: string;
  gUID: string;
}

export interface cPropFrameGetColdC_1Result {
  fileName: string;
  matProp: string;
  t3: number;
  t2: number;
  thickness: number;
  radius: number;
  lipDepth: number;
  mirrorAbout2: boolean;
  color: number;
  notes: string;
  gUID: string;
}

export interface cPropFrameGetColdHatResult {
  fileName: string;
  matProp: string;
  t3: number;
  t2: number;
  thickness: number;
  radius: number;
  lipDepth: number;
  color: number;
  notes: string;
  gUID: string;
}

export interface cPropFrameGetColdHat_1Result {
  fileName: string;
  matProp: string;
  t3: number;
  t2: number;
  thickness: number;
  radius: number;
  lipDepth: number;
  mirrorAbout2: boolean;
  color: number;
  notes: string;
  gUID: string;
}

export interface cPropFrameGetColdZResult {
  fileName: string;
  matProp: string;
  t3: number;
  t2: number;
  thickness: number;
  radius: number;
  lipDepth: number;
  lipAngle: number;
  color: number;
  notes: string;
  gUID: string;
}

export interface cPropFrameGetColdZ_1Result {
  fileName: string;
  matProp: string;
  t3: number;
  t2: number;
  thickness: number;
  radius: number;
  lipDepth: number;
  lipAngle: number;
  mirrorAbout2: boolean;
  color: number;
  notes: string;
  gUID: string;
}

export interface cPropFrameGetConcreteBoxResult {
  fileName: string;
  matProp: string;
  t3: number;
  t2: number;
  tf: number;
  tw: number;
  color: number;
  notes: string;
  gUID: string;
}

export interface cPropFrameGetConcreteCrossResult {
  fileName: string;
  matProp: string;
  t3: number;
  t2: number;
  tf: number;
  tw: number;
  color: number;
  notes: string;
  gUID: string;
}

export interface cPropFrameGetConcreteLResult {
  fileName: string;
  matProp: string;
  t3: number;
  t2: number;
  tf: number;
  twC: number;
  twT: number;
  mirrorAbout2: boolean;
  mirrorAbout3: boolean;
  color: number;
  notes: string;
  gUID: string;
}

export interface cPropFrameGetConcretePipeResult {
  fileName: string;
  matProp: string;
  diameter: number;
  tw: number;
  color: number;
  notes: string;
  gUID: string;
}

export interface cPropFrameGetConcreteTeeResult {
  fileName: string;
  matProp: string;
  t3: number;
  t2: number;
  tf: number;
  twF: number;
  twT: number;
  mirrorAbout3: boolean;
  color: number;
  notes: string;
  gUID: string;
}

export interface cPropFrameGetCoverPlatedIResult {
  sectName: string;
  fyTopFlange: number;
  fyWeb: number;
  fyBotFlange: number;
  tc: number;
  bc: number;
  matPropTop: string;
  tcb: number;
  bcb: number;
  matPropBot: string;
  color: number;
  notes: string;
  gUID: string;
}

export interface cPropFrameGetDblAngleResult {
  fileName: string;
  matProp: string;
  t3: number;
  t2: number;
  tf: number;
  tw: number;
  dis: number;
  color: number;
  notes: string;
  gUID: string;
}

export interface cPropFrameGetDblAngle_1Result {
  fileName: string;
  matProp: string;
  t3: number;
  t2: number;
  tf: number;
  tw: number;
  dis: number;
  mirrorAbout3: boolean;
  color: number;
  notes: string;
  gUID: string;
}

export interface cPropFrameGetDblAngle_2Result {
  fileName: string;
  matProp: string;
  t3: number;
  t2: number;
  tf: number;
  tw: number;
  dis: number;
  filletRadius: number;
  mirrorAbout3: boolean;
  color: number;
  notes: string;
  gUID: string;
}

export interface cPropFrameGetDblChannelResult {
  fileName: string;
  matProp: string;
  t3: number;
  t2: number;
  tf: number;
  tw: number;
  dis: number;
  color: number;
  notes: string;
  gUID: string;
}

export interface cPropFrameGetDblChannel_1Result {
  fileName: string;
  matProp: string;
  t3: number;
  t2: number;
  tf: number;
  tw: number;
  dis: number;
  filletRadius: number;
  color: number;
  notes: string;
  gUID: string;
}

export interface cPropFrameGetGeneralResult {
  fileName: string;
  matProp: string;
  t3: number;
  t2: number;
  area: number;
  as2: number;
  as3: number;
  torsion: number;
  i22: number;
  i33: number;
  s22: number;
  s33: number;
  z22: number;
  z33: number;
  r22: number;
  r33: number;
  color: number;
  notes: string;
  gUID: string;
}

export interface cPropFrameGetGeneral_1Result {
  fileName: string;
  matProp: string;
  t3: number;
  t2: number;
  area: number;
  as2: number;
  as3: number;
  torsion: number;
  i22: number;
  i33: number;
  i23: number;
  s22: number;
  s33: number;
  z22: number;
  z33: number;
  r22: number;
  r33: number;
  eccV2: number;
  eccV3: number;
  color: number;
  notes: string;
  gUID: string;
}

export interface cPropFrameGetISectionResult {
  fileName: string;
  matProp: string;
  t3: number;
  t2: number;
  tf: number;
  tw: number;
  t2b: number;
  tfb: number;
  color: number;
  notes: string;
  gUID: string;
}

export interface cPropFrameGetISection_1Result {
  fileName: string;
  matProp: string;
  t3: number;
  t2: number;
  tf: number;
  tw: number;
  t2b: number;
  tfb: number;
  filletRadius: number;
  color: number;
  notes: string;
  gUID: string;
}

export interface cPropFrameGetMaterialResult {
  matProp: string;
}

export interface cPropFrameGetModifiersResult {
  value: number[];
}

export interface cPropFrameGetNameInPropFileResult {
  nameInFile: string;
  fileName: string;
  matProp: string;
  propType: eFramePropType;
}

export interface cPropFrameGetNameListResult {
  numberNames: number;
  myName: string[];
}

export interface cPropFrameGetNonPrismaticResult {
  numberItems: number;
  startSec: string[];
  endSec: string[];
  myLength: number[];
  myType: number[];
  eI33: number[];
  eI22: number[];
  color: number;
  notes: string;
  gUID: string;
}

export interface cPropFrameGetPipeResult {
  fileName: string;
  matProp: string;
  t3: number;
  tW: number;
  color: number;
  notes: string;
  gUID: string;
}

export interface cPropFrameGetPlateResult {
  fileName: string;
  matProp: string;
  t3: number;
  t2: number;
  color: number;
  notes: string;
  gUID: string;
}

export interface cPropFrameGetPrecastIResult {
  fileName: string;
  matProp: string;
  b: number[];
  d: number[];
  color: number;
  notes: string;
  gUID: string;
}

export interface cPropFrameGetPropFileNameListResult {
  numberNames: number;
  myName: string[];
  myPropType: eFramePropType[];
}

export interface cPropFrameGetRebarBeamResult {
  matPropLong: string;
  matPropConfine: string;
  coverTop: number;
  coverBot: number;
  topLeftArea: number;
  topRightArea: number;
  botLeftArea: number;
  botRightArea: number;
}

export interface cPropFrameGetRebarColumnResult {
  matPropLong: string;
  matPropConfine: string;
  pattern: number;
  confineType: number;
  cover: number;
  numberCBars: number;
  numberR3Bars: number;
  numberR2Bars: number;
  rebarSize: string;
  tieSize: string;
  tieSpacingLongit: number;
  number2DirTieBars: number;
  number3DirTieBars: number;
  toBeDesigned: boolean;
}

export interface cPropFrameGetRebarColumn_1Result {
  matPropLong: string;
  matPropConfine: string;
  pattern: number;
  confineType: number;
  cover: number;
  numberCBars: number;
  numberR3Bars: number;
  numberR2Bars: number;
  rebarSize: string;
  tieSize: string;
  tieSpacingLongit: number;
  number2DirTieBars: number;
  number3DirTieBars: number;
  toBeDesigned: boolean;
  longitCornerRebarSize: string;
  longitRebarArea: number;
  longitCornerRebarArea: number;
}

export interface cPropFrameGetRectangleResult {
  fileName: string;
  matProp: string;
  t3: number;
  t2: number;
  color: number;
  notes: string;
  gUID: string;
}

export interface cPropFrameGetRodResult {
  fileName: string;
  matProp: string;
  t3: number;
  color: number;
  notes: string;
  gUID: string;
}

export interface cPropFrameGetSDSectionResult {
  matProp: string;
  numberItems: number;
  shapeName: string[];
  myType: number[];
  designType: number;
  color: number;
  notes: string;
  gUID: string;
}

export interface cPropFrameGetSectPropsResult {
  area: number;
  as2: number;
  as3: number;
  torsion: number;
  i22: number;
  i33: number;
  s22: number;
  s33: number;
  z22: number;
  z33: number;
  r22: number;
  r33: number;
}

export interface cPropFrameGetSteelAngleResult {
  fileName: string;
  matProp: string;
  t3: number;
  t2: number;
  tf: number;
  tw: number;
  r: number;
  mirrorAbout2: boolean;
  mirrorAbout3: boolean;
  color: number;
  notes: string;
  gUID: string;
}

export interface cPropFrameGetSteelTeeResult {
  fileName: string;
  matProp: string;
  t3: number;
  t2: number;
  tf: number;
  tw: number;
  r: number;
  mirrorAbout3: boolean;
  color: number;
  notes: string;
  gUID: string;
}

export interface cPropFrameGetTeeResult {
  fileName: string;
  matProp: string;
  t3: number;
  t2: number;
  tf: number;
  tw: number;
  color: number;
  notes: string;
  gUID: string;
}

export interface cPropFrameGetTee_1Result {
  fileName: string;
  matProp: string;
  t3: number;
  t2: number;
  tf: number;
  tw: number;
  filletRadius: number;
  mirrorAbout3: boolean;
  color: number;
  notes: string;
  gUID: string;
}

export interface cPropFrameGetTrapezoidalResult {
  fileName: string;
  matProp: string;
  t3: number;
  t2: number;
  t2b: number;
  color: number;
  notes: string;
  gUID: string;
}

export interface cPropFrameGetTubeResult {
  fileName: string;
  matProp: string;
  t3: number;
  t2: number;
  tf: number;
  tw: number;
  color: number;
  notes: string;
  gUID: string;
}

export interface cPropFrameGetTube_1Result {
  fileName: string;
  matProp: string;
  t3: number;
  t2: number;
  tf: number;
  tw: number;
  radius: number;
  color: number;
  notes: string;
  gUID: string;
}

export interface cPropFrameGetTypeOAPIResult {
  propType: eFramePropType;
}

export interface cPropFrameGetTypeRebarResult {
  myType: number;
}

export interface cPropFrameSetAutoSelectSteelResult {
  sectName: string[];
}

export interface cPropFrameSetModifiersResult {
  value: number[];
}

export interface cPropFrameSetNonPrismaticResult {
  startSec: string[];
  endSec: string[];
  myLength: number[];
  myType: number[];
  eI33: number[];
  eI22: number[];
}

export interface cPropFrameSetPrecastIResult {
  b: number[];
  d: number[];
}

export interface cPropFrameSDShapeGetAngleResult {
  matProp: string;
  propName: string;
  color: number;
  xCenter: number;
  yCenter: number;
  h: number;
  bf: number;
  tf: number;
  tw: number;
  rotation: number;
}

export interface cPropFrameSDShapeGetConcreteLResult {
  matProp: string;
  propName: string;
  color: number;
  xCenter: number;
  yCenter: number;
  h: number;
  bf: number;
  tf: number;
  tw: number;
  rotation: number;
  mirrorAbout2: boolean;
  mirrorAbout3: boolean;
}

export interface cPropFrameSDShapeGetConcreteTeeResult {
  matProp: string;
  propName: string;
  color: number;
  xCenter: number;
  yCenter: number;
  h: number;
  bf: number;
  tf: number;
  tw: number;
  rotation: number;
  mirrorAbout3: boolean;
}

export interface cPropFrameSDShapeGetISectionResult {
  matProp: string;
  propName: string;
  color: number;
  xCenter: number;
  yCenter: number;
  h: number;
  bf: number;
  tf: number;
  tw: number;
  bfb: number;
  tfb: number;
  rotation: number;
}

export interface cPropFrameSDShapeGetReinfCircleResult {
  xCenter: number;
  yCenter: number;
  diameter: number;
  numBars: number;
  rotation: number;
  rebarSize: string;
  matRebar: string;
}

export interface cPropFrameSDShapeGetReinfCornerResult {
  numberItems: number;
  pointNum: number[];
  rebarSize: string[];
}

export interface cPropFrameSDShapeGetReinfEdgeResult {
  numberItems: number;
  edgeNum: number[];
  rebarSize: string[];
  spacing: number[];
  cover: number[];
}

export interface cPropFrameSDShapeGetReinfLineResult {
  x1: number;
  y1: number;
  x2: number;
  y2: number;
  spacing: number;
  rebarSize: string;
  endBars: boolean;
  matRebar: string;
}

export interface cPropFrameSDShapeGetReinfRectangularResult {
  xCenter: number;
  yCenter: number;
  h: number;
  w: number;
  rotation: number;
  matRebar: string;
}

export interface cPropFrameSDShapeGetReinfSingleResult {
  xCenter: number;
  yCenter: number;
  rebarSize: string;
  matRebar: string;
}

export interface cPropFrameSDShapeGetSolidCircleResult {
  matProp: string;
  sSOverwrite: string;
  color: number;
  xCenter: number;
  yCenter: number;
  diameter: number;
  reinf: boolean;
  numberBars: number;
  rotation: number;
  cover: number;
  rebarSize: string;
  matRebar: string;
}

export interface cPropFrameSDShapeGetSolidRectResult {
  matProp: string;
  sSOverwrite: string;
  color: number;
  xCenter: number;
  yCenter: number;
  h: number;
  w: number;
  rotation: number;
  reinf: boolean;
  matRebar: string;
}

export interface cPropFrameSDShapeGetTeeResult {
  matProp: string;
  propName: string;
  color: number;
  xCenter: number;
  yCenter: number;
  h: number;
  bf: number;
  tf: number;
  tw: number;
  rotation: number;
}

export interface cPropLineSpringGetLineSpringPropResult {
  u1: number;
  u2: number;
  u3: number;
  r1: number;
  nonlinearOption2: number;
  nonlinearOption3: number;
  color: number;
  notes: string;
  iGUID: string;
}

export interface cPropLineSpringGetNameListResult {
  numberNames: number;
  myName: string[];
}

export interface cPropLinkGetAcceptanceCriteriaResult {
  acceptanceType: number;
  symmetric: boolean;
  active: boolean[];
  iOPos: number[];
  lSPos: number[];
  cPPos: number[];
  iONeg: number[];
  lSNeg: number[];
  cPNeg: number[];
}

export interface cPropLinkGetDamperResult {
  dOF: boolean[];
  fixed: boolean[];
  nonlinear: boolean[];
  ke: number[];
  ce: number[];
  k: number[];
  c: number[];
  cExp: number[];
  dJ2: number;
  dJ3: number;
  notes: string;
  gUID: string;
}

export interface cPropLinkGetDamperBilinearResult {
  dof: boolean[];
  fixed: boolean[];
  nonlinear: boolean[];
  ke: number[];
  ce: number[];
  k: number[];
  c: number[];
  cY: number[];
  forceLimit: number[];
  dj2: number;
  dj3: number;
  notes: string;
  gUID: string;
}

export interface cPropLinkGetDamperFrictionSpringResult {
  dof: boolean[];
  fixed: boolean[];
  nonlinear: boolean[];
  ke: number[];
  ce: number[];
  k: number[];
  k1: number[];
  k2: number[];
  u0: number[];
  us: number[];
  direction: number[];
  dj2: number;
  dj3: number;
  notes: string;
  gUID: string;
}

export interface cPropLinkGetFrictionIsolatorResult {
  dOF: boolean[];
  fixed: boolean[];
  nonlinear: boolean[];
  ke: number[];
  ce: number[];
  k: number[];
  slow: number[];
  fast: number[];
  rate: number[];
  radius: number[];
  damping: number;
  dJ2: number;
  dJ3: number;
  notes: string;
  gUID: string;
}

export interface cPropLinkGetGapResult {
  dOF: boolean[];
  fixed: boolean[];
  nonlinear: boolean[];
  ke: number[];
  ce: number[];
  k: number[];
  dis: number[];
  dJ2: number;
  dJ3: number;
  notes: string;
  gUID: string;
}

export interface cPropLinkGetHookResult {
  dOF: boolean[];
  fixed: boolean[];
  nonlinear: boolean[];
  ke: number[];
  ce: number[];
  k: number[];
  dis: number[];
  dJ2: number;
  dJ3: number;
  notes: string;
  gUID: string;
}

export interface cPropLinkGetLinearResult {
  dOF: boolean[];
  fixed: boolean[];
  ke: number[];
  ce: number[];
  dJ2: number;
  dJ3: number;
  keCoupled: boolean;
  ceCoupled: boolean;
  notes: string;
  gUID: string;
}

export interface cPropLinkGetMultiLinearElasticResult {
  dOF: boolean[];
  fixed: boolean[];
  nonlinear: boolean[];
  ke: number[];
  ce: number[];
  dJ2: number;
  dJ3: number;
  notes: string;
  gUID: string;
}

export interface cPropLinkGetMultiLinearPlasticResult {
  dOF: boolean[];
  fixed: boolean[];
  nonlinear: boolean[];
  ke: number[];
  ce: number[];
  dJ2: number;
  dJ3: number;
  notes: string;
  gUID: string;
}

export interface cPropLinkGetMultiLinearPointsResult {
  numberPoints: number;
  f: number[];
  d: number[];
  myType: number;
  a1: number;
  a2: number;
  b1: number;
  b2: number;
  eta: number;
}

export interface cPropLinkGetNameListResult {
  numberNames: number;
  myName: string[];
}

export interface cPropLinkGetPDeltaResult {
  value: number[];
}

export interface cPropLinkGetPlasticWenResult {
  dOF: boolean[];
  fixed: boolean[];
  nonlinear: boolean[];
  ke: number[];
  ce: number[];
  k: number[];
  yield: number[];
  ratio: number[];
  exp: number[];
  dJ2: number;
  dJ3: number;
  notes: string;
  gUID: string;
}

export interface cPropLinkGetRubberIsolatorResult {
  dOF: boolean[];
  fixed: boolean[];
  nonlinear: boolean[];
  ke: number[];
  ce: number[];
  k: number[];
  yield: number[];
  ratio: number[];
  dJ2: number;
  dJ3: number;
  notes: string;
  gUID: string;
}

export interface cPropLinkGetSpringDataResult {
  definedForThisLength: number;
  definedForThisArea: number;
}

export interface cPropLinkGetTCFrictionIsolatorResult {
  dOF: boolean[];
  fixed: boolean[];
  nonlinear: boolean[];
  ke: number[];
  ce: number[];
  k: number[];
  slow: number[];
  fast: number[];
  rate: number[];
  radius: number[];
  slowT: number[];
  fastT: number[];
  rateT: number[];
  kt: number;
  dis: number;
  dist: number;
  damping: number;
  dJ2: number;
  dJ3: number;
  notes: string;
  gUID: string;
}

export interface cPropLinkGetTypeOAPIResult {
  propType: eLinkPropType;
}

export interface cPropLinkGetWeightAndMassResult {
  w: number;
  m: number;
  r1: number;
  r2: number;
  r3: number;
}

export interface cPropLinkSetAcceptanceCriteriaResult {
  active: boolean[];
  iOPos: number[];
  lSPos: number[];
  cPPos: number[];
  iONeg: number[];
  lSNeg: number[];
  cPNeg: number[];
}

export interface cPropLinkSetDamperResult {
  dOF: boolean[];
  fixed: boolean[];
  nonlinear: boolean[];
  ke: number[];
  ce: number[];
  k: number[];
  c: number[];
  cExp: number[];
}

export interface cPropLinkSetDamperBilinearResult {
  dof: boolean[];
  fixed: boolean[];
  nonlinear: boolean[];
  ke: number[];
  ce: number[];
  k: number[];
  c: number[];
  cY: number[];
  forceLimit: number[];
}

export interface cPropLinkSetDamperFrictionSpringResult {
  dof: boolean[];
  fixed: boolean[];
  nonlinear: boolean[];
  ke: number[];
  ce: number[];
  k: number[];
  k1: number[];
  k2: number[];
  u0: number[];
  us: number[];
  direction: number[];
}

export interface cPropLinkSetFrictionIsolatorResult {
  dOF: boolean[];
  fixed: boolean[];
  nonlinear: boolean[];
  ke: number[];
  ce: number[];
  k: number[];
  slow: number[];
  fast: number[];
  rate: number[];
  radius: number[];
}

export interface cPropLinkSetGapResult {
  dOF: boolean[];
  fixed: boolean[];
  nonlinear: boolean[];
  ke: number[];
  ce: number[];
  k: number[];
  dis: number[];
}

export interface cPropLinkSetHookResult {
  dOF: boolean[];
  fixed: boolean[];
  nonlinear: boolean[];
  ke: number[];
  ce: number[];
  k: number[];
  dis: number[];
}

export interface cPropLinkSetLinearResult {
  dOF: boolean[];
  fixed: boolean[];
  ke: number[];
  ce: number[];
}

export interface cPropLinkSetMultiLinearElasticResult {
  dOF: boolean[];
  fixed: boolean[];
  nonlinear: boolean[];
  ke: number[];
  ce: number[];
}

export interface cPropLinkSetMultiLinearPlasticResult {
  dOF: boolean[];
  fixed: boolean[];
  nonlinear: boolean[];
  ke: number[];
  ce: number[];
}

export interface cPropLinkSetMultiLinearPointsResult {
  f: number[];
  d: number[];
}

export interface cPropLinkSetPDeltaResult {
  value: number[];
}

export interface cPropLinkSetPlasticWenResult {
  dOF: boolean[];
  fixed: boolean[];
  nonlinear: boolean[];
  ke: number[];
  ce: number[];
  k: number[];
  yield: number[];
  ratio: number[];
  exp: number[];
}

export interface cPropLinkSetRubberIsolatorResult {
  dOF: boolean[];
  fixed: boolean[];
  nonlinear: boolean[];
  ke: number[];
  ce: number[];
  k: number[];
  yield: number[];
  ratio: number[];
}

export interface cPropLinkSetTCFrictionIsolatorResult {
  dOF: boolean[];
  fixed: boolean[];
  nonlinear: boolean[];
  ke: number[];
  ce: number[];
  k: number[];
  slow: number[];
  fast: number[];
  rate: number[];
  radius: number[];
  slowT: number[];
  fastT: number[];
  rateT: number[];
}

export interface cPropMaterialAddMaterialResult {
  name: string;
}

export interface cPropMaterialGetDampingResult {
  modalRatio: number;
  viscousMassCoeff: number;
  viscousStiffCoeff: number;
  hystereticMassCoeff: number;
  hystereticStiffCoeff: number;
}

export interface cPropMaterialGetMassSourceResult {
  myOption: number;
  numberLoads: number;
  loadPat: string[];
  sF: number[];
}

export interface cPropMaterialGetMassSource_1Result {
  includeElements: boolean;
  includeAddedMass: boolean;
  includeLoads: boolean;
  numberLoads: number;
  loadPat: string[];
  sf: number[];
}

export interface cPropMaterialGetMaterialResult {
  matType: eMatType;
  color: number;
  notes: string;
  gUID: string;
}

export interface cPropMaterialGetMPAnisotropicResult {
  e: number[];
  u: number[];
  a: number[];
  g: number[];
}

export interface cPropMaterialGetMPIsotropicResult {
  e: number;
  u: number;
  a: number;
  g: number;
}

export interface cPropMaterialGetMPOrthotropicResult {
  e: number[];
  u: number[];
  a: number[];
  g: number[];
}

export interface cPropMaterialGetMPUniaxialResult {
  e: number;
  a: number;
}

export interface cPropMaterialGetNameListResult {
  numberNames: number;
  myName: string[];
}

export interface cPropMaterialGetOConcreteResult {
  fc: number;
  isLightweight: boolean;
  fcsFactor: number;
  sSType: number;
  sSHysType: number;
  strainAtFc: number;
  strainUltimate: number;
  frictionAngle: number;
  dilatationalAngle: number;
}

export interface cPropMaterialGetOConcrete_1Result {
  fc: number;
  isLightweight: boolean;
  fcsFactor: number;
  sSType: number;
  sSHysType: number;
  strainAtFc: number;
  strainUltimate: number;
  finalSlope: number;
  frictionAngle: number;
  dilatationalAngle: number;
}

export interface cPropMaterialGetONoDesignResult {
  frictionAngle: number;
  dilatationalAngle: number;
}

export interface cPropMaterialGetORebarResult {
  fy: number;
  fu: number;
  eFy: number;
  eFu: number;
  sSType: number;
  sSHysType: number;
  strainAtHardening: number;
  strainUltimate: number;
  useCaltransSSDefaults: boolean;
}

export interface cPropMaterialGetORebar_1Result {
  fy: number;
  fu: number;
  eFy: number;
  eFu: number;
  sSType: number;
  sSHysType: number;
  strainAtHardening: number;
  strainUltimate: number;
  finalSlope: number;
  useCaltransSSDefaults: boolean;
}

export interface cPropMaterialGetOSteelResult {
  fy: number;
  fu: number;
  eFy: number;
  eFu: number;
  sSType: number;
  sSHysType: number;
  strainAtHardening: number;
  strainAtMaxStress: number;
  strainAtRupture: number;
}

export interface cPropMaterialGetOSteel_1Result {
  fy: number;
  fu: number;
  eFy: number;
  eFu: number;
  sSType: number;
  sSHysType: number;
  strainAtHardening: number;
  strainAtMaxStress: number;
  strainAtRupture: number;
  finalSlope: number;
}

export interface cPropMaterialGetOTendonResult {
  fy: number;
  fu: number;
  sSType: number;
  sSHysType: number;
}

export interface cPropMaterialGetOTendon_1Result {
  fy: number;
  fu: number;
  sSType: number;
  sSHysType: number;
  finalSlope: number;
}

export interface cPropMaterialGetSSCurveResult {
  numberPoints: number;
  pointID: number[];
  strain: number[];
  stress: number[];
}

export interface cPropMaterialGetTempResult {
  numberItems: number;
  temp: number[];
}

export interface cPropMaterialGetTypeOAPIResult {
  matType: eMatType;
  symType: number;
}

export interface cPropMaterialGetWeightAndMassResult {
  w: number;
  m: number;
}

export interface cPropMaterialSetMassSourceResult {
  loadPat: string[];
  sF: number[];
}

export interface cPropMaterialSetMassSource_1Result {
  includeElements: boolean;
  includeAddedMass: boolean;
  includeLoads: boolean;
  loadPat: string[];
  sf: number[];
}

export interface cPropMaterialSetMPAnisotropicResult {
  e: number[];
  u: number[];
  a: number[];
  g: number[];
}

export interface cPropMaterialSetMPOrthotropicResult {
  e: number[];
  u: number[];
  a: number[];
  g: number[];
}

export interface cPropMaterialSetSSCurveResult {
  pointID: number[];
  strain: number[];
  stress: number[];
}

export interface cPropMaterialSetTempResult {
  temp: number[];
}

export interface cPropPointSpringGetLinksResult {
  numberLinks: number;
  linkNames: string[];
  linkAxialDirs: number[];
  linkAngles: number[];
}

export interface cPropPointSpringGetNameListResult {
  numberNames: number;
  myName: string[];
}

export interface cPropPointSpringGetPointSpringPropResult {
  springOption: number;
  k: number[];
  cSys: string;
  soilProfile: string;
  footing: string;
  period: number;
  color: number;
  notes: string;
  iGUID: string;
}

export interface cPropPointSpringSetLinksResult {
  linkNames: string[];
  linkAxialDirs: number[];
  linkAngles: number[];
}

export interface cPropPointSpringSetPointSpringPropResult {
  k: number[];
}

export interface cPropRebarGetNameListResult {
  numberNames: number;
  myName: string[];
}

export interface cPropRebarGetNameListWithDataResult {
  numberNames: number;
  myName: string[];
  areas: number[];
  diameters: number[];
  myGUID: string[];
}

export interface cPropRebarGetRebarPropsResult {
  area: number;
  diameter: number;
}

export interface cPropRebarGetRebarPropsWithGUIDResult {
  area: number;
  diameter: number;
  myGUID: string;
}

export interface cPropTendonGetNameListResult {
  numberNames: number;
  myName: string[];
}

export interface cPropTendonGetPropResult {
  matProp: string;
  modelingOption: number;
  area: number;
  color: number;
  notes: string;
  gUID: string;
}

export interface cSapModelGetDatabaseUnits_2Result {
  forceUnits: eForce;
  lengthUnits: eLength;
  temperatureUnits: eTemperature;
}

export interface cSapModelGetMergeTolResult {
  mergeTol: number;
}

export interface cSapModelGetPresentUnits_2Result {
  forceUnits: eForce;
  lengthUnits: eLength;
  temperatureUnits: eTemperature;
}

export interface cSapModelGetProgramInfoResult {
  programName: string;
  programVersion: string;
  programLevel: string;
}

export interface cSapModelGetProjectInfoResult {
  numberItems: number;
  item: string[];
  data: string[];
}

export interface cSapModelGetVersionResult {
  version: string;
  myVersionNumber: number;
}

export interface cSapModelTreeIsUpdateSuspendedResult {
  isSuspended: boolean;
}

export interface cSelectGetSelectedResult {
  numberItems: number;
  objectType: number[];
  objectName: string[];
}

export interface cSpandrelLabelGetNameListResult {
  numberNames: number;
  myName: string[];
  isMultiStory: boolean[];
}

export interface cSpandrelLabelGetSectionPropertiesResult {
  numberStories: number;
  storyName: string[];
  numAreaObj: number[];
  numLineObj: number[];
  length: number[];
  depthLeft: number[];
  thickLeft: number[];
  depthRight: number[];
  thickRight: number[];
  matProp: string[];
  cGLeftX: number[];
  cGLeftY: number[];
  cGLeftZ: number[];
  cGRightX: number[];
  cGRightY: number[];
  cGRightZ: number[];
}

export interface cSpandrelLabelGetSpandrelResult {
  isMultiStory: boolean;
}

export interface cStoryGetElevationResult {
  elevation: number;
}

export interface cStoryGetGUIDResult {
  gUID: string;
}

export interface cStoryGetHeightResult {
  height: number;
}

export interface cStoryGetMasterStoryResult {
  isMasterStory: boolean;
}

export interface cStoryGetNameListResult {
  numberNames: number;
  myName: string[];
}

export interface cStoryGetSimilarToResult {
  isMasterStory: boolean;
  similarToStory: string;
}

export interface cStoryGetSpliceResult {
  spliceAbove: boolean;
  spliceHeight: number;
}

export interface cStoryGetStoriesResult {
  numberStories: number;
  storyNames: string[];
  storyElevations: number[];
  storyHeights: number[];
  isMasterStory: boolean[];
  similarToStory: string[];
  spliceAbove: boolean[];
  spliceHeight: number[];
}

export interface cStoryGetStories_2Result {
  baseElevation: number;
  numberStories: number;
  storyNames: string[];
  storyElevations: number[];
  storyHeights: number[];
  isMasterStory: boolean[];
  similarToStory: string[];
  spliceAbove: boolean[];
  spliceHeight: number[];
  color: number[];
}

export interface cStorySetStories_2Result {
  storyNames: string[];
  storyHeights: number[];
  isMasterStory: boolean[];
  similarToStory: string[];
  spliceAbove: boolean[];
  spliceHeight: number[];
  color: number[];
}

export interface cTendonObjGetDatumOffsetResult {
  numberItems: number;
  tendonName: string[];
  datumOffset: number[];
}

export interface cTendonObjGetDrawingPointResult {
  numberItems: number;
  tendonName: string[];
  drawingPointID: string[];
  gx: number[];
  gy: number[];
  gz: number[];
}

export interface cTendonObjGetGroupAssignResult {
  numberGroups: number;
  groups: string[];
}

export interface cTendonObjGetLoadForceStress_1Result {
  numberItems: number;
  tendonName: string[];
  loadPatFinal: string[];
  loadPatTransfer: string[];
  jackFrom: number[];
  loadType: number[];
  loadValue: number[];
  lossSpecification: number[];
}

export interface cTendonObjGetLossesDetailedResult {
  numberItems: number;
  tendonName: string[];
  curvatureCoeff: number[];
  wobbleCoeff: number[];
  lossAnchorage: number[];
  lossShortening: number[];
  lossCreep: number[];
  lossShrinkage: number[];
  lossSteelRelax: number[];
}

export interface cTendonObjGetLossesFixedResult {
  numberItems: number;
  tendonName: string[];
  stressingFixed: number[];
  longTermFixed: number[];
}

export interface cTendonObjGetLossesPercentResult {
  numberItems: number;
  tendonName: string[];
  stressingPercent: number[];
  longTermPercent: number[];
}

export interface cTendonObjGetNameListResult {
  numberNames: number;
  myName: string[];
}

export interface cTendonObjGetNameListOnStoryResult {
  numberNames: number;
  myName: string[];
}

export interface cTendonObjGetNumberStrandsResult {
  numberItems: number;
  tendonName: string[];
  numberStrands: number[];
}

export interface cTendonObjGetPropertyResult {
  propName: string;
}

export interface cTendonObjGetSelectedResult {
  selected: boolean;
}

export interface cTendonObjGetTendonGeometryResult {
  numberPoints: number;
  x: number[];
  y: number[];
  z: number[];
}

export interface cTowerGetActiveTowerResult {
  towerName: string;
}

export interface cTowerGetNameListResult {
  numberNames: number;
  myName: string[];
}

export class cAnalysisResultsApi {
  constructor(private readonly transport: EtabsTransport) {}

  get setup(): cAnalysisResultsSetupApi {
    return new cAnalysisResultsSetupApi(this.transport);
  }

  areaForceShell(name: string, itemTypeElm: eItemTypeElm): Promise<cAnalysisResultsAreaForceShellResult> {
    return this.transport.request<cAnalysisResultsAreaForceShellResult>({
      api: "cAnalysisResults",
      method: "AreaForceShell",
      parameters: {
        Name: name,
        ItemTypeElm: itemTypeElm,
      },
    });
  }

  areaJointForceShell(name: string, itemTypeElm: eItemTypeElm): Promise<cAnalysisResultsAreaJointForceShellResult> {
    return this.transport.request<cAnalysisResultsAreaJointForceShellResult>({
      api: "cAnalysisResults",
      method: "AreaJointForceShell",
      parameters: {
        Name: name,
        ItemTypeElm: itemTypeElm,
      },
    });
  }

  areaStrainShell(name: string, itemTypeElm: eItemTypeElm): Promise<cAnalysisResultsAreaStrainShellResult> {
    return this.transport.request<cAnalysisResultsAreaStrainShellResult>({
      api: "cAnalysisResults",
      method: "AreaStrainShell",
      parameters: {
        Name: name,
        ItemTypeElm: itemTypeElm,
      },
    });
  }

  areaStrainShellLayered(name: string, itemTypeElm: eItemTypeElm): Promise<cAnalysisResultsAreaStrainShellLayeredResult> {
    return this.transport.request<cAnalysisResultsAreaStrainShellLayeredResult>({
      api: "cAnalysisResults",
      method: "AreaStrainShellLayered",
      parameters: {
        Name: name,
        ItemTypeElm: itemTypeElm,
      },
    });
  }

  areaStressShell(name: string, itemTypeElm: eItemTypeElm): Promise<cAnalysisResultsAreaStressShellResult> {
    return this.transport.request<cAnalysisResultsAreaStressShellResult>({
      api: "cAnalysisResults",
      method: "AreaStressShell",
      parameters: {
        Name: name,
        ItemTypeElm: itemTypeElm,
      },
    });
  }

  areaStressShellLayered(name: string, itemTypeElm: eItemTypeElm): Promise<cAnalysisResultsAreaStressShellLayeredResult> {
    return this.transport.request<cAnalysisResultsAreaStressShellLayeredResult>({
      api: "cAnalysisResults",
      method: "AreaStressShellLayered",
      parameters: {
        Name: name,
        ItemTypeElm: itemTypeElm,
      },
    });
  }

  assembledJointMass(name: string, itemTypeElm: eItemTypeElm): Promise<cAnalysisResultsAssembledJointMassResult> {
    return this.transport.request<cAnalysisResultsAssembledJointMassResult>({
      api: "cAnalysisResults",
      method: "AssembledJointMass",
      parameters: {
        Name: name,
        ItemTypeElm: itemTypeElm,
      },
    });
  }

  assembledJointMass_1(massSourceName: string, name: string, itemTypeElm: eItemTypeElm): Promise<cAnalysisResultsAssembledJointMass_1Result> {
    return this.transport.request<cAnalysisResultsAssembledJointMass_1Result>({
      api: "cAnalysisResults",
      method: "AssembledJointMass_1",
      parameters: {
        MassSourceName: massSourceName,
        Name: name,
        ItemTypeElm: itemTypeElm,
      },
    });
  }

  baseReact(): Promise<cAnalysisResultsBaseReactResult> {
    return this.transport.request<cAnalysisResultsBaseReactResult>({
      api: "cAnalysisResults",
      method: "BaseReact",
    });
  }

  baseReactWithCentroid(): Promise<cAnalysisResultsBaseReactWithCentroidResult> {
    return this.transport.request<cAnalysisResultsBaseReactWithCentroidResult>({
      api: "cAnalysisResults",
      method: "BaseReactWithCentroid",
    });
  }

  bucklingFactor(): Promise<cAnalysisResultsBucklingFactorResult> {
    return this.transport.request<cAnalysisResultsBucklingFactorResult>({
      api: "cAnalysisResults",
      method: "BucklingFactor",
    });
  }

  frameForce(name: string, itemTypeElm: eItemTypeElm): Promise<cAnalysisResultsFrameForceResult> {
    return this.transport.request<cAnalysisResultsFrameForceResult>({
      api: "cAnalysisResults",
      method: "FrameForce",
      parameters: {
        Name: name,
        ItemTypeElm: itemTypeElm,
      },
    });
  }

  frameJointForce(name: string, itemTypeElm: eItemTypeElm): Promise<cAnalysisResultsFrameJointForceResult> {
    return this.transport.request<cAnalysisResultsFrameJointForceResult>({
      api: "cAnalysisResults",
      method: "FrameJointForce",
      parameters: {
        Name: name,
        ItemTypeElm: itemTypeElm,
      },
    });
  }

  generalizedDispl(name: string): Promise<cAnalysisResultsGeneralizedDisplResult> {
    return this.transport.request<cAnalysisResultsGeneralizedDisplResult>({
      api: "cAnalysisResults",
      method: "GeneralizedDispl",
      parameters: {
        Name: name,
      },
    });
  }

  jointAcc(name: string, itemTypeElm: eItemTypeElm): Promise<cAnalysisResultsJointAccResult> {
    return this.transport.request<cAnalysisResultsJointAccResult>({
      api: "cAnalysisResults",
      method: "JointAcc",
      parameters: {
        Name: name,
        ItemTypeElm: itemTypeElm,
      },
    });
  }

  jointAccAbs(name: string, itemTypeElm: eItemTypeElm): Promise<cAnalysisResultsJointAccAbsResult> {
    return this.transport.request<cAnalysisResultsJointAccAbsResult>({
      api: "cAnalysisResults",
      method: "JointAccAbs",
      parameters: {
        Name: name,
        ItemTypeElm: itemTypeElm,
      },
    });
  }

  jointDispl(name: string, itemTypeElm: eItemTypeElm): Promise<cAnalysisResultsJointDisplResult> {
    return this.transport.request<cAnalysisResultsJointDisplResult>({
      api: "cAnalysisResults",
      method: "JointDispl",
      parameters: {
        Name: name,
        ItemTypeElm: itemTypeElm,
      },
    });
  }

  jointDisplAbs(name: string, itemTypeElm: eItemTypeElm): Promise<cAnalysisResultsJointDisplAbsResult> {
    return this.transport.request<cAnalysisResultsJointDisplAbsResult>({
      api: "cAnalysisResults",
      method: "JointDisplAbs",
      parameters: {
        Name: name,
        ItemTypeElm: itemTypeElm,
      },
    });
  }

  jointDrifts(): Promise<cAnalysisResultsJointDriftsResult> {
    return this.transport.request<cAnalysisResultsJointDriftsResult>({
      api: "cAnalysisResults",
      method: "JointDrifts",
    });
  }

  jointReact(name: string, itemTypeElm: eItemTypeElm): Promise<cAnalysisResultsJointReactResult> {
    return this.transport.request<cAnalysisResultsJointReactResult>({
      api: "cAnalysisResults",
      method: "JointReact",
      parameters: {
        Name: name,
        ItemTypeElm: itemTypeElm,
      },
    });
  }

  jointVel(name: string, itemTypeElm: eItemTypeElm): Promise<cAnalysisResultsJointVelResult> {
    return this.transport.request<cAnalysisResultsJointVelResult>({
      api: "cAnalysisResults",
      method: "JointVel",
      parameters: {
        Name: name,
        ItemTypeElm: itemTypeElm,
      },
    });
  }

  jointVelAbs(name: string, itemTypeElm: eItemTypeElm): Promise<cAnalysisResultsJointVelAbsResult> {
    return this.transport.request<cAnalysisResultsJointVelAbsResult>({
      api: "cAnalysisResults",
      method: "JointVelAbs",
      parameters: {
        Name: name,
        ItemTypeElm: itemTypeElm,
      },
    });
  }

  linkDeformation(name: string, itemTypeElm: eItemTypeElm): Promise<cAnalysisResultsLinkDeformationResult> {
    return this.transport.request<cAnalysisResultsLinkDeformationResult>({
      api: "cAnalysisResults",
      method: "LinkDeformation",
      parameters: {
        Name: name,
        ItemTypeElm: itemTypeElm,
      },
    });
  }

  linkForce(name: string, itemTypeElm: eItemTypeElm): Promise<cAnalysisResultsLinkForceResult> {
    return this.transport.request<cAnalysisResultsLinkForceResult>({
      api: "cAnalysisResults",
      method: "LinkForce",
      parameters: {
        Name: name,
        ItemTypeElm: itemTypeElm,
      },
    });
  }

  linkJointForce(name: string, itemTypeElm: eItemTypeElm): Promise<cAnalysisResultsLinkJointForceResult> {
    return this.transport.request<cAnalysisResultsLinkJointForceResult>({
      api: "cAnalysisResults",
      method: "LinkJointForce",
      parameters: {
        Name: name,
        ItemTypeElm: itemTypeElm,
      },
    });
  }

  modalLoadParticipationRatios(): Promise<cAnalysisResultsModalLoadParticipationRatiosResult> {
    return this.transport.request<cAnalysisResultsModalLoadParticipationRatiosResult>({
      api: "cAnalysisResults",
      method: "ModalLoadParticipationRatios",
    });
  }

  modalParticipatingMassRatios(): Promise<cAnalysisResultsModalParticipatingMassRatiosResult> {
    return this.transport.request<cAnalysisResultsModalParticipatingMassRatiosResult>({
      api: "cAnalysisResults",
      method: "ModalParticipatingMassRatios",
    });
  }

  modalParticipationFactors(): Promise<cAnalysisResultsModalParticipationFactorsResult> {
    return this.transport.request<cAnalysisResultsModalParticipationFactorsResult>({
      api: "cAnalysisResults",
      method: "ModalParticipationFactors",
    });
  }

  modalPeriod(): Promise<cAnalysisResultsModalPeriodResult> {
    return this.transport.request<cAnalysisResultsModalPeriodResult>({
      api: "cAnalysisResults",
      method: "ModalPeriod",
    });
  }

  modeShape(name: string, itemTypeElm: eItemTypeElm): Promise<cAnalysisResultsModeShapeResult> {
    return this.transport.request<cAnalysisResultsModeShapeResult>({
      api: "cAnalysisResults",
      method: "ModeShape",
      parameters: {
        Name: name,
        ItemTypeElm: itemTypeElm,
      },
    });
  }

  panelZoneDeformation(name: string, itemTypeElm: eItemTypeElm): Promise<cAnalysisResultsPanelZoneDeformationResult> {
    return this.transport.request<cAnalysisResultsPanelZoneDeformationResult>({
      api: "cAnalysisResults",
      method: "PanelZoneDeformation",
      parameters: {
        Name: name,
        ItemTypeElm: itemTypeElm,
      },
    });
  }

  panelZoneForce(name: string, itemTypeElm: eItemTypeElm): Promise<cAnalysisResultsPanelZoneForceResult> {
    return this.transport.request<cAnalysisResultsPanelZoneForceResult>({
      api: "cAnalysisResults",
      method: "PanelZoneForce",
      parameters: {
        Name: name,
        ItemTypeElm: itemTypeElm,
      },
    });
  }

  pierForce(): Promise<cAnalysisResultsPierForceResult> {
    return this.transport.request<cAnalysisResultsPierForceResult>({
      api: "cAnalysisResults",
      method: "PierForce",
    });
  }

  sectionCutAnalysis(): Promise<cAnalysisResultsSectionCutAnalysisResult> {
    return this.transport.request<cAnalysisResultsSectionCutAnalysisResult>({
      api: "cAnalysisResults",
      method: "SectionCutAnalysis",
    });
  }

  sectionCutDesign(): Promise<cAnalysisResultsSectionCutDesignResult> {
    return this.transport.request<cAnalysisResultsSectionCutDesignResult>({
      api: "cAnalysisResults",
      method: "SectionCutDesign",
    });
  }

  spandrelForce(): Promise<cAnalysisResultsSpandrelForceResult> {
    return this.transport.request<cAnalysisResultsSpandrelForceResult>({
      api: "cAnalysisResults",
      method: "SpandrelForce",
    });
  }

  storyDrifts(): Promise<cAnalysisResultsStoryDriftsResult> {
    return this.transport.request<cAnalysisResultsStoryDriftsResult>({
      api: "cAnalysisResults",
      method: "StoryDrifts",
    });
  }

}

export class cAnalysisResultsSetupApi {
  constructor(private readonly transport: EtabsTransport) {}

  deselectAllCasesAndCombosForOutput(): Promise<void> {
    return this.transport.request<void>({
      api: "cAnalysisResultsSetup",
      method: "DeselectAllCasesAndCombosForOutput",
    });
  }

  getCaseSelectedForOutput(name: string): Promise<cAnalysisResultsSetupGetCaseSelectedForOutputResult> {
    return this.transport.request<cAnalysisResultsSetupGetCaseSelectedForOutputResult>({
      api: "cAnalysisResultsSetup",
      method: "GetCaseSelectedForOutput",
      parameters: {
        Name: name,
      },
    });
  }

  getComboSelectedForOutput(name: string): Promise<cAnalysisResultsSetupGetComboSelectedForOutputResult> {
    return this.transport.request<cAnalysisResultsSetupGetComboSelectedForOutputResult>({
      api: "cAnalysisResultsSetup",
      method: "GetComboSelectedForOutput",
      parameters: {
        Name: name,
      },
    });
  }

  getOptionBaseReactLoc(): Promise<cAnalysisResultsSetupGetOptionBaseReactLocResult> {
    return this.transport.request<cAnalysisResultsSetupGetOptionBaseReactLocResult>({
      api: "cAnalysisResultsSetup",
      method: "GetOptionBaseReactLoc",
    });
  }

  getOptionBucklingMode(): Promise<cAnalysisResultsSetupGetOptionBucklingModeResult> {
    return this.transport.request<cAnalysisResultsSetupGetOptionBucklingModeResult>({
      api: "cAnalysisResultsSetup",
      method: "GetOptionBucklingMode",
    });
  }

  getOptionDirectHist(): Promise<cAnalysisResultsSetupGetOptionDirectHistResult> {
    return this.transport.request<cAnalysisResultsSetupGetOptionDirectHistResult>({
      api: "cAnalysisResultsSetup",
      method: "GetOptionDirectHist",
    });
  }

  getOptionModalHist(): Promise<cAnalysisResultsSetupGetOptionModalHistResult> {
    return this.transport.request<cAnalysisResultsSetupGetOptionModalHistResult>({
      api: "cAnalysisResultsSetup",
      method: "GetOptionModalHist",
    });
  }

  getOptionModeShape(): Promise<cAnalysisResultsSetupGetOptionModeShapeResult> {
    return this.transport.request<cAnalysisResultsSetupGetOptionModeShapeResult>({
      api: "cAnalysisResultsSetup",
      method: "GetOptionModeShape",
    });
  }

  getOptionMultiStepStatic(): Promise<cAnalysisResultsSetupGetOptionMultiStepStaticResult> {
    return this.transport.request<cAnalysisResultsSetupGetOptionMultiStepStaticResult>({
      api: "cAnalysisResultsSetup",
      method: "GetOptionMultiStepStatic",
    });
  }

  getOptionMultiValuedCombo(): Promise<cAnalysisResultsSetupGetOptionMultiValuedComboResult> {
    return this.transport.request<cAnalysisResultsSetupGetOptionMultiValuedComboResult>({
      api: "cAnalysisResultsSetup",
      method: "GetOptionMultiValuedCombo",
    });
  }

  getOptionNLStatic(): Promise<cAnalysisResultsSetupGetOptionNLStaticResult> {
    return this.transport.request<cAnalysisResultsSetupGetOptionNLStaticResult>({
      api: "cAnalysisResultsSetup",
      method: "GetOptionNLStatic",
    });
  }

  setCaseSelectedForOutput(name: string, selected?: boolean): Promise<void> {
    return this.transport.request<void>({
      api: "cAnalysisResultsSetup",
      method: "SetCaseSelectedForOutput",
      parameters: {
        Name: name,
        Selected: selected,
      },
    });
  }

  setComboSelectedForOutput(name: string, selected?: boolean): Promise<void> {
    return this.transport.request<void>({
      api: "cAnalysisResultsSetup",
      method: "SetComboSelectedForOutput",
      parameters: {
        Name: name,
        Selected: selected,
      },
    });
  }

  setOptionBaseReactLoc(gX: number, gY: number, gZ: number): Promise<void> {
    return this.transport.request<void>({
      api: "cAnalysisResultsSetup",
      method: "SetOptionBaseReactLoc",
      parameters: {
        GX: gX,
        GY: gY,
        GZ: gZ,
      },
    });
  }

  setOptionBucklingMode(buckModeStart: number, buckModeEnd: number, buckModeAll?: boolean): Promise<void> {
    return this.transport.request<void>({
      api: "cAnalysisResultsSetup",
      method: "SetOptionBucklingMode",
      parameters: {
        BuckModeStart: buckModeStart,
        BuckModeEnd: buckModeEnd,
        BuckModeAll: buckModeAll,
      },
    });
  }

  setOptionDirectHist(value: number): Promise<void> {
    return this.transport.request<void>({
      api: "cAnalysisResultsSetup",
      method: "SetOptionDirectHist",
      parameters: {
        Value: value,
      },
    });
  }

  setOptionModalHist(value: number): Promise<void> {
    return this.transport.request<void>({
      api: "cAnalysisResultsSetup",
      method: "SetOptionModalHist",
      parameters: {
        Value: value,
      },
    });
  }

  setOptionModeShape(modeShapeStart: number, modeShapeEnd: number, modeShapesAll?: boolean): Promise<void> {
    return this.transport.request<void>({
      api: "cAnalysisResultsSetup",
      method: "SetOptionModeShape",
      parameters: {
        ModeShapeStart: modeShapeStart,
        ModeShapeEnd: modeShapeEnd,
        ModeShapesAll: modeShapesAll,
      },
    });
  }

  setOptionMultiStepStatic(value: number): Promise<void> {
    return this.transport.request<void>({
      api: "cAnalysisResultsSetup",
      method: "SetOptionMultiStepStatic",
      parameters: {
        Value: value,
      },
    });
  }

  setOptionMultiValuedCombo(value: number): Promise<void> {
    return this.transport.request<void>({
      api: "cAnalysisResultsSetup",
      method: "SetOptionMultiValuedCombo",
      parameters: {
        Value: value,
      },
    });
  }

  setOptionNLStatic(value: number): Promise<void> {
    return this.transport.request<void>({
      api: "cAnalysisResultsSetup",
      method: "SetOptionNLStatic",
      parameters: {
        Value: value,
      },
    });
  }

}

export class cAnalyzeApi {
  constructor(private readonly transport: EtabsTransport) {}

  createAnalysisModel(): Promise<void> {
    return this.transport.request<void>({
      api: "cAnalyze",
      method: "CreateAnalysisModel",
    });
  }

  deleteResults(name: string, all?: boolean): Promise<void> {
    return this.transport.request<void>({
      api: "cAnalyze",
      method: "DeleteResults",
      parameters: {
        Name: name,
        All: all,
      },
    });
  }

  getActiveDOF(): Promise<cAnalyzeGetActiveDOFResult> {
    return this.transport.request<cAnalyzeGetActiveDOFResult>({
      api: "cAnalyze",
      method: "GetActiveDOF",
    });
  }

  getCaseStatus(): Promise<cAnalyzeGetCaseStatusResult> {
    return this.transport.request<cAnalyzeGetCaseStatusResult>({
      api: "cAnalyze",
      method: "GetCaseStatus",
    });
  }

  getDesignResponseOption(): Promise<cAnalyzeGetDesignResponseOptionResult> {
    return this.transport.request<cAnalyzeGetDesignResponseOptionResult>({
      api: "cAnalyze",
      method: "GetDesignResponseOption",
    });
  }

  getRunCaseFlag(): Promise<cAnalyzeGetRunCaseFlagResult> {
    return this.transport.request<cAnalyzeGetRunCaseFlagResult>({
      api: "cAnalyze",
      method: "GetRunCaseFlag",
    });
  }

  getSolverOption(): Promise<cAnalyzeGetSolverOptionResult> {
    return this.transport.request<cAnalyzeGetSolverOptionResult>({
      api: "cAnalyze",
      method: "GetSolverOption",
    });
  }

  getSolverOption_1(): Promise<cAnalyzeGetSolverOption_1Result> {
    return this.transport.request<cAnalyzeGetSolverOption_1Result>({
      api: "cAnalyze",
      method: "GetSolverOption_1",
    });
  }

  getSolverOption_2(): Promise<cAnalyzeGetSolverOption_2Result> {
    return this.transport.request<cAnalyzeGetSolverOption_2Result>({
      api: "cAnalyze",
      method: "GetSolverOption_2",
    });
  }

  getSolverOption_3(): Promise<cAnalyzeGetSolverOption_3Result> {
    return this.transport.request<cAnalyzeGetSolverOption_3Result>({
      api: "cAnalyze",
      method: "GetSolverOption_3",
    });
  }

  mergeAnalysisResults(sourceFileName: string): Promise<void> {
    return this.transport.request<void>({
      api: "cAnalyze",
      method: "MergeAnalysisResults",
      parameters: {
        SourceFileName: sourceFileName,
      },
    });
  }

  modifyUndeformedGeometry(caseName: string, sF: number, stage?: number, original?: boolean): Promise<void> {
    return this.transport.request<void>({
      api: "cAnalyze",
      method: "ModifyUndeformedGeometry",
      parameters: {
        CaseName: caseName,
        SF: sF,
        Stage: stage,
        Original: original,
      },
    });
  }

  modifyUndeformedGeometryModeShape(caseName: string, mode: number, maxDispl: number, direction: number, original?: boolean): Promise<void> {
    return this.transport.request<void>({
      api: "cAnalyze",
      method: "ModifyUndeformedGeometryModeShape",
      parameters: {
        CaseName: caseName,
        Mode: mode,
        MaxDispl: maxDispl,
        Direction: direction,
        Original: original,
      },
    });
  }

  runAnalysis(): Promise<void> {
    return this.transport.request<void>({
      api: "cAnalyze",
      method: "RunAnalysis",
    });
  }

  setActiveDOF(dOF: boolean[]): Promise<cAnalyzeSetActiveDOFResult> {
    return this.transport.request<cAnalyzeSetActiveDOFResult>({
      api: "cAnalyze",
      method: "SetActiveDOF",
      parameters: {
        DOF: dOF,
      },
    });
  }

  setDesignResponseOption(numberDesignThreads: number, numberResponseRecoveryThreads: number, useMemoryMappedFilesForResponseRecovery: number, modelDifferencesOKWhenMergingResults: boolean): Promise<void> {
    return this.transport.request<void>({
      api: "cAnalyze",
      method: "SetDesignResponseOption",
      parameters: {
        NumberDesignThreads: numberDesignThreads,
        NumberResponseRecoveryThreads: numberResponseRecoveryThreads,
        UseMemoryMappedFilesForResponseRecovery: useMemoryMappedFilesForResponseRecovery,
        ModelDifferencesOKWhenMergingResults: modelDifferencesOKWhenMergingResults,
      },
    });
  }

  setRunCaseFlag(name: string, run: boolean, all?: boolean): Promise<void> {
    return this.transport.request<void>({
      api: "cAnalyze",
      method: "SetRunCaseFlag",
      parameters: {
        Name: name,
        Run: run,
        All: all,
      },
    });
  }

  setSolverOption(solverType: number, force32BitSolver: boolean, stiffCase?: string): Promise<void> {
    return this.transport.request<void>({
      api: "cAnalyze",
      method: "SetSolverOption",
      parameters: {
        SolverType: solverType,
        Force32BitSolver: force32BitSolver,
        StiffCase: stiffCase,
      },
    });
  }

  setSolverOption_1(solverType: number, solverProcessType: number, force32BitSolver: boolean, stiffCase?: string): Promise<void> {
    return this.transport.request<void>({
      api: "cAnalyze",
      method: "SetSolverOption_1",
      parameters: {
        SolverType: solverType,
        SolverProcessType: solverProcessType,
        Force32BitSolver: force32BitSolver,
        StiffCase: stiffCase,
      },
    });
  }

  setSolverOption_2(solverType: number, solverProcessType: number, numberParallelRuns: number, stiffCase?: string): Promise<void> {
    return this.transport.request<void>({
      api: "cAnalyze",
      method: "SetSolverOption_2",
      parameters: {
        SolverType: solverType,
        SolverProcessType: solverProcessType,
        NumberParallelRuns: numberParallelRuns,
        StiffCase: stiffCase,
      },
    });
  }

  setSolverOption_3(solverType: number, solverProcessType: number, numberParallelRuns: number, responseFileSizeMaxMB: number, numberAnalysisThreads: number, stiffCase?: string): Promise<void> {
    return this.transport.request<void>({
      api: "cAnalyze",
      method: "SetSolverOption_3",
      parameters: {
        SolverType: solverType,
        SolverProcessType: solverProcessType,
        NumberParallelRuns: numberParallelRuns,
        ResponseFileSizeMaxMB: responseFileSizeMaxMB,
        NumberAnalysisThreads: numberAnalysisThreads,
        StiffCase: stiffCase,
      },
    });
  }

}

export class cAreaElmApi {
  constructor(private readonly transport: EtabsTransport) {}

  count(): Promise<number> {
    return this.transport.request<number>({
      api: "cAreaElm",
      method: "Count",
    });
  }

  getLoadTemperature(name: string, itemTypeElm?: eItemTypeElm): Promise<cAreaElmGetLoadTemperatureResult> {
    return this.transport.request<cAreaElmGetLoadTemperatureResult>({
      api: "cAreaElm",
      method: "GetLoadTemperature",
      parameters: {
        Name: name,
        ItemTypeElm: itemTypeElm,
      },
    });
  }

  getLoadUniform(name: string, itemTypeElm?: eItemTypeElm): Promise<cAreaElmGetLoadUniformResult> {
    return this.transport.request<cAreaElmGetLoadUniformResult>({
      api: "cAreaElm",
      method: "GetLoadUniform",
      parameters: {
        Name: name,
        ItemTypeElm: itemTypeElm,
      },
    });
  }

  getLocalAxes(name: string): Promise<cAreaElmGetLocalAxesResult> {
    return this.transport.request<cAreaElmGetLocalAxesResult>({
      api: "cAreaElm",
      method: "GetLocalAxes",
      parameters: {
        Name: name,
      },
    });
  }

  getMaterialOverwrite(name: string): Promise<cAreaElmGetMaterialOverwriteResult> {
    return this.transport.request<cAreaElmGetMaterialOverwriteResult>({
      api: "cAreaElm",
      method: "GetMaterialOverwrite",
      parameters: {
        Name: name,
      },
    });
  }

  getModifiers(name: string): Promise<cAreaElmGetModifiersResult> {
    return this.transport.request<cAreaElmGetModifiersResult>({
      api: "cAreaElm",
      method: "GetModifiers",
      parameters: {
        Name: name,
      },
    });
  }

  getNameList(): Promise<cAreaElmGetNameListResult> {
    return this.transport.request<cAreaElmGetNameListResult>({
      api: "cAreaElm",
      method: "GetNameList",
    });
  }

  getObj(name: string): Promise<cAreaElmGetObjResult> {
    return this.transport.request<cAreaElmGetObjResult>({
      api: "cAreaElm",
      method: "GetObj",
      parameters: {
        Name: name,
      },
    });
  }

  getOffsets(name: string): Promise<cAreaElmGetOffsetsResult> {
    return this.transport.request<cAreaElmGetOffsetsResult>({
      api: "cAreaElm",
      method: "GetOffsets",
      parameters: {
        Name: name,
      },
    });
  }

  getPoints(name: string): Promise<cAreaElmGetPointsResult> {
    return this.transport.request<cAreaElmGetPointsResult>({
      api: "cAreaElm",
      method: "GetPoints",
      parameters: {
        Name: name,
      },
    });
  }

  getProperty(name: string): Promise<cAreaElmGetPropertyResult> {
    return this.transport.request<cAreaElmGetPropertyResult>({
      api: "cAreaElm",
      method: "GetProperty",
      parameters: {
        Name: name,
      },
    });
  }

  getThickness(name: string): Promise<cAreaElmGetThicknessResult> {
    return this.transport.request<cAreaElmGetThicknessResult>({
      api: "cAreaElm",
      method: "GetThickness",
      parameters: {
        Name: name,
      },
    });
  }

  getTransformationMatrix(name: string): Promise<cAreaElmGetTransformationMatrixResult> {
    return this.transport.request<cAreaElmGetTransformationMatrixResult>({
      api: "cAreaElm",
      method: "GetTransformationMatrix",
      parameters: {
        Name: name,
      },
    });
  }

}

export class cAreaObjApi {
  constructor(private readonly transport: EtabsTransport) {}

  addByCoord(numberPoints: number, x: number[], y: number[], z: number[], propName?: string, userName?: string, cSys?: string): Promise<cAreaObjAddByCoordResult> {
    return this.transport.request<cAreaObjAddByCoordResult>({
      api: "cAreaObj",
      method: "AddByCoord",
      parameters: {
        NumberPoints: numberPoints,
        X: x,
        Y: y,
        Z: z,
        PropName: propName,
        UserName: userName,
        CSys: cSys,
      },
    });
  }

  addByPoint(numberPoints: number, point: string[], propName?: string, userName?: string): Promise<cAreaObjAddByPointResult> {
    return this.transport.request<cAreaObjAddByPointResult>({
      api: "cAreaObj",
      method: "AddByPoint",
      parameters: {
        NumberPoints: numberPoints,
        Point: point,
        PropName: propName,
        UserName: userName,
      },
    });
  }

  changeName(name: string, newName: string): Promise<void> {
    return this.transport.request<void>({
      api: "cAreaObj",
      method: "ChangeName",
      parameters: {
        Name: name,
        NewName: newName,
      },
    });
  }

  count(): Promise<number> {
    return this.transport.request<number>({
      api: "cAreaObj",
      method: "Count",
    });
  }

  delete_(name: string, itemType?: eItemType): Promise<void> {
    return this.transport.request<void>({
      api: "cAreaObj",
      method: "Delete",
      parameters: {
        Name: name,
        ItemType: itemType,
      },
    });
  }

  deleteLoadTemperature(name: string, loadPat: string, itemType?: eItemType): Promise<void> {
    return this.transport.request<void>({
      api: "cAreaObj",
      method: "DeleteLoadTemperature",
      parameters: {
        Name: name,
        LoadPat: loadPat,
        ItemType: itemType,
      },
    });
  }

  deleteLoadUniform(name: string, loadPat: string, itemType?: eItemType): Promise<void> {
    return this.transport.request<void>({
      api: "cAreaObj",
      method: "DeleteLoadUniform",
      parameters: {
        Name: name,
        LoadPat: loadPat,
        ItemType: itemType,
      },
    });
  }

  deleteLoadUniformToFrame(name: string, loadPat: string, itemType?: eItemType): Promise<void> {
    return this.transport.request<void>({
      api: "cAreaObj",
      method: "DeleteLoadUniformToFrame",
      parameters: {
        Name: name,
        LoadPat: loadPat,
        ItemType: itemType,
      },
    });
  }

  deleteLoadWindPressure(name: string, loadPat: string, itemType?: eItemType): Promise<void> {
    return this.transport.request<void>({
      api: "cAreaObj",
      method: "DeleteLoadWindPressure",
      parameters: {
        Name: name,
        LoadPat: loadPat,
        ItemType: itemType,
      },
    });
  }

  deleteMass(name: string, itemType?: eItemType): Promise<void> {
    return this.transport.request<void>({
      api: "cAreaObj",
      method: "DeleteMass",
      parameters: {
        Name: name,
        ItemType: itemType,
      },
    });
  }

  deleteModifiers(name: string, itemType?: eItemType): Promise<void> {
    return this.transport.request<void>({
      api: "cAreaObj",
      method: "DeleteModifiers",
      parameters: {
        Name: name,
        ItemType: itemType,
      },
    });
  }

  deleteSpring(name: string, itemType?: eItemType): Promise<void> {
    return this.transport.request<void>({
      api: "cAreaObj",
      method: "DeleteSpring",
      parameters: {
        Name: name,
        ItemType: itemType,
      },
    });
  }

  getAllAreas(): Promise<cAreaObjGetAllAreasResult> {
    return this.transport.request<cAreaObjGetAllAreasResult>({
      api: "cAreaObj",
      method: "GetAllAreas",
    });
  }

  getCurvedEdges(name: string): Promise<cAreaObjGetCurvedEdgesResult> {
    return this.transport.request<cAreaObjGetCurvedEdgesResult>({
      api: "cAreaObj",
      method: "GetCurvedEdges",
      parameters: {
        Name: name,
      },
    });
  }

  getDesignOrientation(name: string): Promise<cAreaObjGetDesignOrientationResult> {
    return this.transport.request<cAreaObjGetDesignOrientationResult>({
      api: "cAreaObj",
      method: "GetDesignOrientation",
      parameters: {
        Name: name,
      },
    });
  }

  getDiaphragm(name: string): Promise<cAreaObjGetDiaphragmResult> {
    return this.transport.request<cAreaObjGetDiaphragmResult>({
      api: "cAreaObj",
      method: "GetDiaphragm",
      parameters: {
        Name: name,
      },
    });
  }

  getEdgeConstraint(name: string): Promise<cAreaObjGetEdgeConstraintResult> {
    return this.transport.request<cAreaObjGetEdgeConstraintResult>({
      api: "cAreaObj",
      method: "GetEdgeConstraint",
      parameters: {
        Name: name,
      },
    });
  }

  getElm(name: string): Promise<cAreaObjGetElmResult> {
    return this.transport.request<cAreaObjGetElmResult>({
      api: "cAreaObj",
      method: "GetElm",
      parameters: {
        Name: name,
      },
    });
  }

  getGroupAssign(name: string): Promise<cAreaObjGetGroupAssignResult> {
    return this.transport.request<cAreaObjGetGroupAssignResult>({
      api: "cAreaObj",
      method: "GetGroupAssign",
      parameters: {
        Name: name,
      },
    });
  }

  getGUID(name: string): Promise<cAreaObjGetGUIDResult> {
    return this.transport.request<cAreaObjGetGUIDResult>({
      api: "cAreaObj",
      method: "GetGUID",
      parameters: {
        Name: name,
      },
    });
  }

  getLabelFromName(name: string): Promise<cAreaObjGetLabelFromNameResult> {
    return this.transport.request<cAreaObjGetLabelFromNameResult>({
      api: "cAreaObj",
      method: "GetLabelFromName",
      parameters: {
        Name: name,
      },
    });
  }

  getLabelNameList(): Promise<cAreaObjGetLabelNameListResult> {
    return this.transport.request<cAreaObjGetLabelNameListResult>({
      api: "cAreaObj",
      method: "GetLabelNameList",
    });
  }

  getLoadTemperature(name: string, itemType?: eItemType): Promise<cAreaObjGetLoadTemperatureResult> {
    return this.transport.request<cAreaObjGetLoadTemperatureResult>({
      api: "cAreaObj",
      method: "GetLoadTemperature",
      parameters: {
        Name: name,
        ItemType: itemType,
      },
    });
  }

  getLoadUniform(name: string, itemType?: eItemType): Promise<cAreaObjGetLoadUniformResult> {
    return this.transport.request<cAreaObjGetLoadUniformResult>({
      api: "cAreaObj",
      method: "GetLoadUniform",
      parameters: {
        Name: name,
        ItemType: itemType,
      },
    });
  }

  getLoadUniformToFrame(name: string, itemType?: eItemType): Promise<cAreaObjGetLoadUniformToFrameResult> {
    return this.transport.request<cAreaObjGetLoadUniformToFrameResult>({
      api: "cAreaObj",
      method: "GetLoadUniformToFrame",
      parameters: {
        Name: name,
        ItemType: itemType,
      },
    });
  }

  getLoadWindPressure(name: string, itemType?: eItemType): Promise<cAreaObjGetLoadWindPressureResult> {
    return this.transport.request<cAreaObjGetLoadWindPressureResult>({
      api: "cAreaObj",
      method: "GetLoadWindPressure",
      parameters: {
        Name: name,
        ItemType: itemType,
      },
    });
  }

  getLocalAxes(name: string): Promise<cAreaObjGetLocalAxesResult> {
    return this.transport.request<cAreaObjGetLocalAxesResult>({
      api: "cAreaObj",
      method: "GetLocalAxes",
      parameters: {
        Name: name,
      },
    });
  }

  getMass(name: string): Promise<cAreaObjGetMassResult> {
    return this.transport.request<cAreaObjGetMassResult>({
      api: "cAreaObj",
      method: "GetMass",
      parameters: {
        Name: name,
      },
    });
  }

  getMaterialOverwrite(name: string): Promise<cAreaObjGetMaterialOverwriteResult> {
    return this.transport.request<cAreaObjGetMaterialOverwriteResult>({
      api: "cAreaObj",
      method: "GetMaterialOverwrite",
      parameters: {
        Name: name,
      },
    });
  }

  getModifiers(name: string): Promise<cAreaObjGetModifiersResult> {
    return this.transport.request<cAreaObjGetModifiersResult>({
      api: "cAreaObj",
      method: "GetModifiers",
      parameters: {
        Name: name,
      },
    });
  }

  getNameFromLabel(label: string, story: string): Promise<cAreaObjGetNameFromLabelResult> {
    return this.transport.request<cAreaObjGetNameFromLabelResult>({
      api: "cAreaObj",
      method: "GetNameFromLabel",
      parameters: {
        Label: label,
        Story: story,
      },
    });
  }

  getNameList(): Promise<cAreaObjGetNameListResult> {
    return this.transport.request<cAreaObjGetNameListResult>({
      api: "cAreaObj",
      method: "GetNameList",
    });
  }

  getNameListOnStory(storyName: string): Promise<cAreaObjGetNameListOnStoryResult> {
    return this.transport.request<cAreaObjGetNameListOnStoryResult>({
      api: "cAreaObj",
      method: "GetNameListOnStory",
      parameters: {
        StoryName: storyName,
      },
    });
  }

  getOffsets3(name: string): Promise<cAreaObjGetOffsets3Result> {
    return this.transport.request<cAreaObjGetOffsets3Result>({
      api: "cAreaObj",
      method: "GetOffsets3",
      parameters: {
        Name: name,
      },
    });
  }

  getOpening(name: string): Promise<cAreaObjGetOpeningResult> {
    return this.transport.request<cAreaObjGetOpeningResult>({
      api: "cAreaObj",
      method: "GetOpening",
      parameters: {
        Name: name,
      },
    });
  }

  getPier(name: string): Promise<cAreaObjGetPierResult> {
    return this.transport.request<cAreaObjGetPierResult>({
      api: "cAreaObj",
      method: "GetPier",
      parameters: {
        Name: name,
      },
    });
  }

  getPoints(name: string): Promise<cAreaObjGetPointsResult> {
    return this.transport.request<cAreaObjGetPointsResult>({
      api: "cAreaObj",
      method: "GetPoints",
      parameters: {
        Name: name,
      },
    });
  }

  getProperty(name: string): Promise<cAreaObjGetPropertyResult> {
    return this.transport.request<cAreaObjGetPropertyResult>({
      api: "cAreaObj",
      method: "GetProperty",
      parameters: {
        Name: name,
      },
    });
  }

  getRebarDataPier(name: string): Promise<cAreaObjGetRebarDataPierResult> {
    return this.transport.request<cAreaObjGetRebarDataPierResult>({
      api: "cAreaObj",
      method: "GetRebarDataPier",
      parameters: {
        Name: name,
      },
    });
  }

  getRebarDataSpandrel(name: string): Promise<cAreaObjGetRebarDataSpandrelResult> {
    return this.transport.request<cAreaObjGetRebarDataSpandrelResult>({
      api: "cAreaObj",
      method: "GetRebarDataSpandrel",
      parameters: {
        Name: name,
      },
    });
  }

  getSelected(name: string): Promise<cAreaObjGetSelectedResult> {
    return this.transport.request<cAreaObjGetSelectedResult>({
      api: "cAreaObj",
      method: "GetSelected",
      parameters: {
        Name: name,
      },
    });
  }

  getSelectedEdge(name: string): Promise<cAreaObjGetSelectedEdgeResult> {
    return this.transport.request<cAreaObjGetSelectedEdgeResult>({
      api: "cAreaObj",
      method: "GetSelectedEdge",
      parameters: {
        Name: name,
      },
    });
  }

  getSpandrel(name: string): Promise<cAreaObjGetSpandrelResult> {
    return this.transport.request<cAreaObjGetSpandrelResult>({
      api: "cAreaObj",
      method: "GetSpandrel",
      parameters: {
        Name: name,
      },
    });
  }

  getSpringAssignment(name: string): Promise<cAreaObjGetSpringAssignmentResult> {
    return this.transport.request<cAreaObjGetSpringAssignmentResult>({
      api: "cAreaObj",
      method: "GetSpringAssignment",
      parameters: {
        Name: name,
      },
    });
  }

  getTransformationMatrix(name: string, isGlobal?: boolean): Promise<cAreaObjGetTransformationMatrixResult> {
    return this.transport.request<cAreaObjGetTransformationMatrixResult>({
      api: "cAreaObj",
      method: "GetTransformationMatrix",
      parameters: {
        Name: name,
        IsGlobal: isGlobal,
      },
    });
  }

  setDiaphragm(name: string, diaphragmName: string): Promise<void> {
    return this.transport.request<void>({
      api: "cAreaObj",
      method: "SetDiaphragm",
      parameters: {
        Name: name,
        DiaphragmName: diaphragmName,
      },
    });
  }

  setEdgeConstraint(name: string, constraintExists: boolean, itemType?: eItemType): Promise<void> {
    return this.transport.request<void>({
      api: "cAreaObj",
      method: "SetEdgeConstraint",
      parameters: {
        Name: name,
        ConstraintExists: constraintExists,
        ItemType: itemType,
      },
    });
  }

  setGroupAssign(name: string, groupName: string, remove?: boolean, itemType?: eItemType): Promise<void> {
    return this.transport.request<void>({
      api: "cAreaObj",
      method: "SetGroupAssign",
      parameters: {
        Name: name,
        GroupName: groupName,
        Remove: remove,
        ItemType: itemType,
      },
    });
  }

  setGUID(name: string, gUID?: string): Promise<void> {
    return this.transport.request<void>({
      api: "cAreaObj",
      method: "SetGUID",
      parameters: {
        Name: name,
        GUID: gUID,
      },
    });
  }

  setLoadTemperature(name: string, loadPat: string, myType: number, value: number, patternName?: string, replace?: boolean, itemType?: eItemType): Promise<void> {
    return this.transport.request<void>({
      api: "cAreaObj",
      method: "SetLoadTemperature",
      parameters: {
        Name: name,
        LoadPat: loadPat,
        MyType: myType,
        Value: value,
        PatternName: patternName,
        Replace: replace,
        ItemType: itemType,
      },
    });
  }

  setLoadUniform(name: string, loadPat: string, value: number, dir: number, replace?: boolean, cSys?: string, itemType?: eItemType): Promise<void> {
    return this.transport.request<void>({
      api: "cAreaObj",
      method: "SetLoadUniform",
      parameters: {
        Name: name,
        LoadPat: loadPat,
        Value: value,
        Dir: dir,
        Replace: replace,
        CSys: cSys,
        ItemType: itemType,
      },
    });
  }

  setLoadUniformToFrame(name: string, loadPat: string, value: number, dir: number, distType: number, replace?: boolean, cSys?: string, itemType?: eItemType): Promise<void> {
    return this.transport.request<void>({
      api: "cAreaObj",
      method: "SetLoadUniformToFrame",
      parameters: {
        Name: name,
        LoadPat: loadPat,
        Value: value,
        Dir: dir,
        DistType: distType,
        Replace: replace,
        CSys: cSys,
        ItemType: itemType,
      },
    });
  }

  setLoadWindPressure(name: string, loadPat: string, myType: number, cp: number, itemType?: eItemType): Promise<void> {
    return this.transport.request<void>({
      api: "cAreaObj",
      method: "SetLoadWindPressure",
      parameters: {
        Name: name,
        LoadPat: loadPat,
        MyType: myType,
        Cp: cp,
        ItemType: itemType,
      },
    });
  }

  setLocalAxes(name: string, ang: number, itemType?: eItemType): Promise<void> {
    return this.transport.request<void>({
      api: "cAreaObj",
      method: "SetLocalAxes",
      parameters: {
        Name: name,
        Ang: ang,
        ItemType: itemType,
      },
    });
  }

  setMass(name: string, massOverL2: number, replace?: boolean, itemType?: eItemType): Promise<void> {
    return this.transport.request<void>({
      api: "cAreaObj",
      method: "SetMass",
      parameters: {
        Name: name,
        MassOverL2: massOverL2,
        Replace: replace,
        ItemType: itemType,
      },
    });
  }

  setMaterialOverwrite(name: string, propName: string, itemType?: eItemType): Promise<void> {
    return this.transport.request<void>({
      api: "cAreaObj",
      method: "SetMaterialOverwrite",
      parameters: {
        Name: name,
        PropName: propName,
        ItemType: itemType,
      },
    });
  }

  setModifiers(name: string, value: number[], itemType?: eItemType): Promise<cAreaObjSetModifiersResult> {
    return this.transport.request<cAreaObjSetModifiersResult>({
      api: "cAreaObj",
      method: "SetModifiers",
      parameters: {
        Name: name,
        Value: value,
        ItemType: itemType,
      },
    });
  }

  setOpening(name: string, isOpening: boolean, itemType?: eItemType): Promise<void> {
    return this.transport.request<void>({
      api: "cAreaObj",
      method: "SetOpening",
      parameters: {
        Name: name,
        IsOpening: isOpening,
        ItemType: itemType,
      },
    });
  }

  setPier(name: string, pierName: string, itemType?: eItemType): Promise<void> {
    return this.transport.request<void>({
      api: "cAreaObj",
      method: "SetPier",
      parameters: {
        Name: name,
        PierName: pierName,
        ItemType: itemType,
      },
    });
  }

  setProperty(name: string, propName: string, itemType?: eItemType): Promise<void> {
    return this.transport.request<void>({
      api: "cAreaObj",
      method: "SetProperty",
      parameters: {
        Name: name,
        PropName: propName,
        ItemType: itemType,
      },
    });
  }

  setSelected(name: string, selected: boolean, itemType?: eItemType): Promise<void> {
    return this.transport.request<void>({
      api: "cAreaObj",
      method: "SetSelected",
      parameters: {
        Name: name,
        Selected: selected,
        ItemType: itemType,
      },
    });
  }

  setSelectedEdge(name: string, edgeNum: number, selected: boolean): Promise<void> {
    return this.transport.request<void>({
      api: "cAreaObj",
      method: "SetSelectedEdge",
      parameters: {
        Name: name,
        EdgeNum: edgeNum,
        Selected: selected,
      },
    });
  }

  setSpandrel(name: string, spandrelName: string, itemType?: eItemType): Promise<void> {
    return this.transport.request<void>({
      api: "cAreaObj",
      method: "SetSpandrel",
      parameters: {
        Name: name,
        SpandrelName: spandrelName,
        ItemType: itemType,
      },
    });
  }

  setSpringAssignment(name: string, springProp: string, itemType?: eItemType): Promise<void> {
    return this.transport.request<void>({
      api: "cAreaObj",
      method: "SetSpringAssignment",
      parameters: {
        Name: name,
        SpringProp: springProp,
        ItemType: itemType,
      },
    });
  }

}

export class cAutoSeismicApi {
  constructor(private readonly transport: EtabsTransport) {}

  getASCE716(name: string): Promise<cAutoSeismicGetASCE716Result> {
    return this.transport.request<cAutoSeismicGetASCE716Result>({
      api: "cAutoSeismic",
      method: "GetASCE716",
      parameters: {
        Name: name,
      },
    });
  }

  getASCE716_1(name: string): Promise<cAutoSeismicGetASCE716_1Result> {
    return this.transport.request<cAutoSeismicGetASCE716_1Result>({
      api: "cAutoSeismic",
      method: "GetASCE716_1",
      parameters: {
        Name: name,
      },
    });
  }

  getIBC2006(name: string): Promise<cAutoSeismicGetIBC2006Result> {
    return this.transport.request<cAutoSeismicGetIBC2006Result>({
      api: "cAutoSeismic",
      method: "GetIBC2006",
      parameters: {
        Name: name,
      },
    });
  }

  setASCE716(name: string, nDir: boolean[], eccen: number, periodFlag: number, ctType: number, userT: number, userZ: boolean, topZ: number, bottomZ: number, r: number, omega: number, cd: number, i: number, ss: number, s1: number, tL: number, siteClass: number, fa: number, fv: number): Promise<cAutoSeismicSetASCE716Result> {
    return this.transport.request<cAutoSeismicSetASCE716Result>({
      api: "cAutoSeismic",
      method: "SetASCE716",
      parameters: {
        Name: name,
        nDir: nDir,
        Eccen: eccen,
        PeriodFlag: periodFlag,
        CtType: ctType,
        UserT: userT,
        UserZ: userZ,
        TopZ: topZ,
        BottomZ: bottomZ,
        R: r,
        Omega: omega,
        Cd: cd,
        I: i,
        Ss: ss,
        S1: s1,
        TL: tL,
        SiteClass: siteClass,
        Fa: fa,
        Fv: fv,
      },
    });
  }

  setASCE716_1(name: string, nDir: boolean[], eccen: number, periodFlag: number, ctType: number, userT: number, userZ: boolean, topZ: number, bottomZ: number, r: number, omega: number, cd: number, i: number, ss: number, s1: number, tL: number, siteClass: number, fa: number, fv: number): Promise<cAutoSeismicSetASCE716_1Result> {
    return this.transport.request<cAutoSeismicSetASCE716_1Result>({
      api: "cAutoSeismic",
      method: "SetASCE716_1",
      parameters: {
        Name: name,
        nDir: nDir,
        Eccen: eccen,
        PeriodFlag: periodFlag,
        CtType: ctType,
        UserT: userT,
        UserZ: userZ,
        TopZ: topZ,
        BottomZ: bottomZ,
        R: r,
        Omega: omega,
        Cd: cd,
        I: i,
        Ss: ss,
        S1: s1,
        TL: tL,
        SiteClass: siteClass,
        Fa: fa,
        Fv: fv,
      },
    });
  }

  setIBC2006(name: string, dirFlag: number, eccen: number, periodFlag: number, ctType: number, userT: number, userZ: boolean, topZ: number, bottomZ: number, r: number, omega: number, cd: number, i: number, iBC2006Option: number, latitude: number, longitude: number, zipCode: string, ss: number, s1: number, tl: number, siteClass: number, fa: number, fv: number): Promise<void> {
    return this.transport.request<void>({
      api: "cAutoSeismic",
      method: "SetIBC2006",
      parameters: {
        Name: name,
        DirFlag: dirFlag,
        Eccen: eccen,
        PeriodFlag: periodFlag,
        CtType: ctType,
        UserT: userT,
        UserZ: userZ,
        TopZ: topZ,
        BottomZ: bottomZ,
        R: r,
        Omega: omega,
        Cd: cd,
        I: i,
        IBC2006Option: iBC2006Option,
        Latitude: latitude,
        Longitude: longitude,
        ZipCode: zipCode,
        Ss: ss,
        S1: s1,
        Tl: tl,
        SiteClass: siteClass,
        Fa: fa,
        Fv: fv,
      },
    });
  }

}

export class cAutoWindApi {
  constructor(private readonly transport: EtabsTransport) {}

}

export class cCaseBucklingApi {
  constructor(private readonly transport: EtabsTransport) {}

}

export class cCaseDirectHistoryLinearApi {
  constructor(private readonly transport: EtabsTransport) {}

  getLoads(name: string): Promise<cCaseDirectHistoryLinearGetLoadsResult> {
    return this.transport.request<cCaseDirectHistoryLinearGetLoadsResult>({
      api: "cCaseDirectHistoryLinear",
      method: "GetLoads",
      parameters: {
        Name: name,
      },
    });
  }

}

export class cCaseDirectHistoryNonlinearApi {
  constructor(private readonly transport: EtabsTransport) {}

  getLoads(name: string): Promise<cCaseDirectHistoryNonlinearGetLoadsResult> {
    return this.transport.request<cCaseDirectHistoryNonlinearGetLoadsResult>({
      api: "cCaseDirectHistoryNonlinear",
      method: "GetLoads",
      parameters: {
        Name: name,
      },
    });
  }

}

export class cCaseHyperStaticApi {
  constructor(private readonly transport: EtabsTransport) {}

  getBaseCase(name: string): Promise<cCaseHyperStaticGetBaseCaseResult> {
    return this.transport.request<cCaseHyperStaticGetBaseCaseResult>({
      api: "cCaseHyperStatic",
      method: "GetBaseCase",
      parameters: {
        Name: name,
      },
    });
  }

  setBaseCase(name: string, hyperStaticCase: string): Promise<void> {
    return this.transport.request<void>({
      api: "cCaseHyperStatic",
      method: "SetBaseCase",
      parameters: {
        Name: name,
        HyperStaticCase: hyperStaticCase,
      },
    });
  }

  setCase(name: string): Promise<void> {
    return this.transport.request<void>({
      api: "cCaseHyperStatic",
      method: "SetCase",
      parameters: {
        Name: name,
      },
    });
  }

}

export class cCaseModalEigenApi {
  constructor(private readonly transport: EtabsTransport) {}

  getInitialCase(name: string): Promise<cCaseModalEigenGetInitialCaseResult> {
    return this.transport.request<cCaseModalEigenGetInitialCaseResult>({
      api: "cCaseModalEigen",
      method: "GetInitialCase",
      parameters: {
        Name: name,
      },
    });
  }

  getLoads(name: string): Promise<cCaseModalEigenGetLoadsResult> {
    return this.transport.request<cCaseModalEigenGetLoadsResult>({
      api: "cCaseModalEigen",
      method: "GetLoads",
      parameters: {
        Name: name,
      },
    });
  }

  getNumberModes(name: string): Promise<cCaseModalEigenGetNumberModesResult> {
    return this.transport.request<cCaseModalEigenGetNumberModesResult>({
      api: "cCaseModalEigen",
      method: "GetNumberModes",
      parameters: {
        Name: name,
      },
    });
  }

  getParameters(name: string): Promise<cCaseModalEigenGetParametersResult> {
    return this.transport.request<cCaseModalEigenGetParametersResult>({
      api: "cCaseModalEigen",
      method: "GetParameters",
      parameters: {
        Name: name,
      },
    });
  }

  setCase(name: string): Promise<void> {
    return this.transport.request<void>({
      api: "cCaseModalEigen",
      method: "SetCase",
      parameters: {
        Name: name,
      },
    });
  }

  setInitialCase(name: string, initialCase: string): Promise<void> {
    return this.transport.request<void>({
      api: "cCaseModalEigen",
      method: "SetInitialCase",
      parameters: {
        Name: name,
        InitialCase: initialCase,
      },
    });
  }

  setLoads(name: string, numberLoads: number, loadType: string[], loadName: string[], targetPar: number[], staticCorrect: boolean[]): Promise<cCaseModalEigenSetLoadsResult> {
    return this.transport.request<cCaseModalEigenSetLoadsResult>({
      api: "cCaseModalEigen",
      method: "SetLoads",
      parameters: {
        Name: name,
        NumberLoads: numberLoads,
        LoadType: loadType,
        LoadName: loadName,
        TargetPar: targetPar,
        StaticCorrect: staticCorrect,
      },
    });
  }

  setNumberModes(name: string, maxModes: number, minModes: number): Promise<void> {
    return this.transport.request<void>({
      api: "cCaseModalEigen",
      method: "SetNumberModes",
      parameters: {
        Name: name,
        MaxModes: maxModes,
        MinModes: minModes,
      },
    });
  }

  setParameters(name: string, eigenShiftFreq: number, eigenCutOff: number, eigenTol: number, allowAutoFreqShift: number): Promise<void> {
    return this.transport.request<void>({
      api: "cCaseModalEigen",
      method: "SetParameters",
      parameters: {
        Name: name,
        EigenShiftFreq: eigenShiftFreq,
        EigenCutOff: eigenCutOff,
        EigenTol: eigenTol,
        AllowAutoFreqShift: allowAutoFreqShift,
      },
    });
  }

}

export class cCaseModalHistoryLinearApi {
  constructor(private readonly transport: EtabsTransport) {}

  getLoads(name: string): Promise<cCaseModalHistoryLinearGetLoadsResult> {
    return this.transport.request<cCaseModalHistoryLinearGetLoadsResult>({
      api: "cCaseModalHistoryLinear",
      method: "GetLoads",
      parameters: {
        Name: name,
      },
    });
  }

  setCase(name: string): Promise<void> {
    return this.transport.request<void>({
      api: "cCaseModalHistoryLinear",
      method: "SetCase",
      parameters: {
        Name: name,
      },
    });
  }

  setLoads(name: string, numberLoads: number, loadType: string[], loadName: string[], func: string[], sF: number[], tf: number[], at: number[], cSys: string[], ang: number[]): Promise<cCaseModalHistoryLinearSetLoadsResult> {
    return this.transport.request<cCaseModalHistoryLinearSetLoadsResult>({
      api: "cCaseModalHistoryLinear",
      method: "SetLoads",
      parameters: {
        Name: name,
        NumberLoads: numberLoads,
        LoadType: loadType,
        LoadName: loadName,
        Func: func,
        SF: sF,
        Tf: tf,
        At: at,
        CSys: cSys,
        Ang: ang,
      },
    });
  }

}

export class cCaseModalHistoryNonlinearApi {
  constructor(private readonly transport: EtabsTransport) {}

  getLoads(name: string): Promise<cCaseModalHistoryNonlinearGetLoadsResult> {
    return this.transport.request<cCaseModalHistoryNonlinearGetLoadsResult>({
      api: "cCaseModalHistoryNonlinear",
      method: "GetLoads",
      parameters: {
        Name: name,
      },
    });
  }

}

export class cCaseModalRitzApi {
  constructor(private readonly transport: EtabsTransport) {}

  getInitialCase(name: string): Promise<cCaseModalRitzGetInitialCaseResult> {
    return this.transport.request<cCaseModalRitzGetInitialCaseResult>({
      api: "cCaseModalRitz",
      method: "GetInitialCase",
      parameters: {
        Name: name,
      },
    });
  }

  getLoads(name: string): Promise<cCaseModalRitzGetLoadsResult> {
    return this.transport.request<cCaseModalRitzGetLoadsResult>({
      api: "cCaseModalRitz",
      method: "GetLoads",
      parameters: {
        Name: name,
      },
    });
  }

  getNumberModes(name: string): Promise<cCaseModalRitzGetNumberModesResult> {
    return this.transport.request<cCaseModalRitzGetNumberModesResult>({
      api: "cCaseModalRitz",
      method: "GetNumberModes",
      parameters: {
        Name: name,
      },
    });
  }

  setCase(name: string): Promise<void> {
    return this.transport.request<void>({
      api: "cCaseModalRitz",
      method: "SetCase",
      parameters: {
        Name: name,
      },
    });
  }

  setInitialCase(name: string, initialCase: string): Promise<void> {
    return this.transport.request<void>({
      api: "cCaseModalRitz",
      method: "SetInitialCase",
      parameters: {
        Name: name,
        InitialCase: initialCase,
      },
    });
  }

  setLoads(name: string, numberLoads: number, loadType: string[], loadName: string[], ritzMaxCyc: number[], targetPar: number[]): Promise<cCaseModalRitzSetLoadsResult> {
    return this.transport.request<cCaseModalRitzSetLoadsResult>({
      api: "cCaseModalRitz",
      method: "SetLoads",
      parameters: {
        Name: name,
        NumberLoads: numberLoads,
        LoadType: loadType,
        LoadName: loadName,
        RitzMaxCyc: ritzMaxCyc,
        TargetPar: targetPar,
      },
    });
  }

  setNumberModes(name: string, maxModes: number, minModes: number): Promise<void> {
    return this.transport.request<void>({
      api: "cCaseModalRitz",
      method: "SetNumberModes",
      parameters: {
        Name: name,
        MaxModes: maxModes,
        MinModes: minModes,
      },
    });
  }

}

export class cCaseResponseSpectrumApi {
  constructor(private readonly transport: EtabsTransport) {}

  getDampConstant(name: string): Promise<cCaseResponseSpectrumGetDampConstantResult> {
    return this.transport.request<cCaseResponseSpectrumGetDampConstantResult>({
      api: "cCaseResponseSpectrum",
      method: "GetDampConstant",
      parameters: {
        Name: name,
      },
    });
  }

  getDampInterpolated(name: string): Promise<cCaseResponseSpectrumGetDampInterpolatedResult> {
    return this.transport.request<cCaseResponseSpectrumGetDampInterpolatedResult>({
      api: "cCaseResponseSpectrum",
      method: "GetDampInterpolated",
      parameters: {
        Name: name,
      },
    });
  }

  getDampOverrides(name: string): Promise<cCaseResponseSpectrumGetDampOverridesResult> {
    return this.transport.request<cCaseResponseSpectrumGetDampOverridesResult>({
      api: "cCaseResponseSpectrum",
      method: "GetDampOverrides",
      parameters: {
        Name: name,
      },
    });
  }

  getDampProportional(name: string): Promise<cCaseResponseSpectrumGetDampProportionalResult> {
    return this.transport.request<cCaseResponseSpectrumGetDampProportionalResult>({
      api: "cCaseResponseSpectrum",
      method: "GetDampProportional",
      parameters: {
        Name: name,
      },
    });
  }

  getDampType(name: string): Promise<cCaseResponseSpectrumGetDampTypeResult> {
    return this.transport.request<cCaseResponseSpectrumGetDampTypeResult>({
      api: "cCaseResponseSpectrum",
      method: "GetDampType",
      parameters: {
        Name: name,
      },
    });
  }

  getDiaphragmEccentricityOverride(name: string): Promise<cCaseResponseSpectrumGetDiaphragmEccentricityOverrideResult> {
    return this.transport.request<cCaseResponseSpectrumGetDiaphragmEccentricityOverrideResult>({
      api: "cCaseResponseSpectrum",
      method: "GetDiaphragmEccentricityOverride",
      parameters: {
        Name: name,
      },
    });
  }

  getDirComb(name: string): Promise<cCaseResponseSpectrumGetDirCombResult> {
    return this.transport.request<cCaseResponseSpectrumGetDirCombResult>({
      api: "cCaseResponseSpectrum",
      method: "GetDirComb",
      parameters: {
        Name: name,
      },
    });
  }

  getEccentricity(name: string): Promise<cCaseResponseSpectrumGetEccentricityResult> {
    return this.transport.request<cCaseResponseSpectrumGetEccentricityResult>({
      api: "cCaseResponseSpectrum",
      method: "GetEccentricity",
      parameters: {
        Name: name,
      },
    });
  }

  getLoads(name: string): Promise<cCaseResponseSpectrumGetLoadsResult> {
    return this.transport.request<cCaseResponseSpectrumGetLoadsResult>({
      api: "cCaseResponseSpectrum",
      method: "GetLoads",
      parameters: {
        Name: name,
      },
    });
  }

  getModalCase(name: string): Promise<cCaseResponseSpectrumGetModalCaseResult> {
    return this.transport.request<cCaseResponseSpectrumGetModalCaseResult>({
      api: "cCaseResponseSpectrum",
      method: "GetModalCase",
      parameters: {
        Name: name,
      },
    });
  }

  getModalComb(name: string): Promise<cCaseResponseSpectrumGetModalCombResult> {
    return this.transport.request<cCaseResponseSpectrumGetModalCombResult>({
      api: "cCaseResponseSpectrum",
      method: "GetModalComb",
      parameters: {
        Name: name,
      },
    });
  }

  getModalComb_1(name: string): Promise<cCaseResponseSpectrumGetModalComb_1Result> {
    return this.transport.request<cCaseResponseSpectrumGetModalComb_1Result>({
      api: "cCaseResponseSpectrum",
      method: "GetModalComb_1",
      parameters: {
        Name: name,
      },
    });
  }

  setCase(name: string): Promise<void> {
    return this.transport.request<void>({
      api: "cCaseResponseSpectrum",
      method: "SetCase",
      parameters: {
        Name: name,
      },
    });
  }

  setEccentricity(name: string, eccen: number): Promise<void> {
    return this.transport.request<void>({
      api: "cCaseResponseSpectrum",
      method: "SetEccentricity",
      parameters: {
        Name: name,
        Eccen: eccen,
      },
    });
  }

  setLoads(name: string, numberLoads: number, loadName: string[], func: string[], sF: number[], cSys: string[], ang: number[]): Promise<cCaseResponseSpectrumSetLoadsResult> {
    return this.transport.request<cCaseResponseSpectrumSetLoadsResult>({
      api: "cCaseResponseSpectrum",
      method: "SetLoads",
      parameters: {
        Name: name,
        NumberLoads: numberLoads,
        LoadName: loadName,
        Func: func,
        SF: sF,
        CSys: cSys,
        Ang: ang,
      },
    });
  }

  setModalCase(name: string, modalCase: string): Promise<void> {
    return this.transport.request<void>({
      api: "cCaseResponseSpectrum",
      method: "SetModalCase",
      parameters: {
        Name: name,
        ModalCase: modalCase,
      },
    });
  }

}

export class cCaseStaticLinearApi {
  constructor(private readonly transport: EtabsTransport) {}

  getInitialCase(name: string): Promise<cCaseStaticLinearGetInitialCaseResult> {
    return this.transport.request<cCaseStaticLinearGetInitialCaseResult>({
      api: "cCaseStaticLinear",
      method: "GetInitialCase",
      parameters: {
        Name: name,
      },
    });
  }

  getLoads(name: string): Promise<cCaseStaticLinearGetLoadsResult> {
    return this.transport.request<cCaseStaticLinearGetLoadsResult>({
      api: "cCaseStaticLinear",
      method: "GetLoads",
      parameters: {
        Name: name,
      },
    });
  }

  setCase(name: string): Promise<void> {
    return this.transport.request<void>({
      api: "cCaseStaticLinear",
      method: "SetCase",
      parameters: {
        Name: name,
      },
    });
  }

  setInitialCase(name: string, initialCase: string): Promise<void> {
    return this.transport.request<void>({
      api: "cCaseStaticLinear",
      method: "SetInitialCase",
      parameters: {
        Name: name,
        InitialCase: initialCase,
      },
    });
  }

  setLoads(name: string, numberLoads: number, loadType: string[], loadName: string[], sF: number[]): Promise<cCaseStaticLinearSetLoadsResult> {
    return this.transport.request<cCaseStaticLinearSetLoadsResult>({
      api: "cCaseStaticLinear",
      method: "SetLoads",
      parameters: {
        Name: name,
        NumberLoads: numberLoads,
        LoadType: loadType,
        LoadName: loadName,
        SF: sF,
      },
    });
  }

}

export class cCaseStaticNonlinearApi {
  constructor(private readonly transport: EtabsTransport) {}

  getGeometricNonlinearity(name: string): Promise<cCaseStaticNonlinearGetGeometricNonlinearityResult> {
    return this.transport.request<cCaseStaticNonlinearGetGeometricNonlinearityResult>({
      api: "cCaseStaticNonlinear",
      method: "GetGeometricNonlinearity",
      parameters: {
        Name: name,
      },
    });
  }

  getHingeUnloading(name: string): Promise<cCaseStaticNonlinearGetHingeUnloadingResult> {
    return this.transport.request<cCaseStaticNonlinearGetHingeUnloadingResult>({
      api: "cCaseStaticNonlinear",
      method: "GetHingeUnloading",
      parameters: {
        Name: name,
      },
    });
  }

  getInitialCase(name: string): Promise<cCaseStaticNonlinearGetInitialCaseResult> {
    return this.transport.request<cCaseStaticNonlinearGetInitialCaseResult>({
      api: "cCaseStaticNonlinear",
      method: "GetInitialCase",
      parameters: {
        Name: name,
      },
    });
  }

  getLoadApplication(name: string): Promise<cCaseStaticNonlinearGetLoadApplicationResult> {
    return this.transport.request<cCaseStaticNonlinearGetLoadApplicationResult>({
      api: "cCaseStaticNonlinear",
      method: "GetLoadApplication",
      parameters: {
        Name: name,
      },
    });
  }

  getLoads(name: string): Promise<cCaseStaticNonlinearGetLoadsResult> {
    return this.transport.request<cCaseStaticNonlinearGetLoadsResult>({
      api: "cCaseStaticNonlinear",
      method: "GetLoads",
      parameters: {
        Name: name,
      },
    });
  }

  getMassSource(name: string): Promise<cCaseStaticNonlinearGetMassSourceResult> {
    return this.transport.request<cCaseStaticNonlinearGetMassSourceResult>({
      api: "cCaseStaticNonlinear",
      method: "GetMassSource",
      parameters: {
        Name: name,
      },
    });
  }

  getModalCase(name: string): Promise<cCaseStaticNonlinearGetModalCaseResult> {
    return this.transport.request<cCaseStaticNonlinearGetModalCaseResult>({
      api: "cCaseStaticNonlinear",
      method: "GetModalCase",
      parameters: {
        Name: name,
      },
    });
  }

  getResultsSaved(name: string): Promise<cCaseStaticNonlinearGetResultsSavedResult> {
    return this.transport.request<cCaseStaticNonlinearGetResultsSavedResult>({
      api: "cCaseStaticNonlinear",
      method: "GetResultsSaved",
      parameters: {
        Name: name,
      },
    });
  }

  getSolControlParameters(name: string): Promise<cCaseStaticNonlinearGetSolControlParametersResult> {
    return this.transport.request<cCaseStaticNonlinearGetSolControlParametersResult>({
      api: "cCaseStaticNonlinear",
      method: "GetSolControlParameters",
      parameters: {
        Name: name,
      },
    });
  }

  getTargetForceParameters(name: string): Promise<cCaseStaticNonlinearGetTargetForceParametersResult> {
    return this.transport.request<cCaseStaticNonlinearGetTargetForceParametersResult>({
      api: "cCaseStaticNonlinear",
      method: "GetTargetForceParameters",
      parameters: {
        Name: name,
      },
    });
  }

  setCase(name: string): Promise<void> {
    return this.transport.request<void>({
      api: "cCaseStaticNonlinear",
      method: "SetCase",
      parameters: {
        Name: name,
      },
    });
  }

  setGeometricNonlinearity(name: string, nLGeomType: number): Promise<void> {
    return this.transport.request<void>({
      api: "cCaseStaticNonlinear",
      method: "SetGeometricNonlinearity",
      parameters: {
        Name: name,
        NLGeomType: nLGeomType,
      },
    });
  }

  setHingeUnloading(name: string, unloadType: number): Promise<void> {
    return this.transport.request<void>({
      api: "cCaseStaticNonlinear",
      method: "SetHingeUnloading",
      parameters: {
        Name: name,
        UnloadType: unloadType,
      },
    });
  }

  setInitialCase(name: string, initialCase: string): Promise<void> {
    return this.transport.request<void>({
      api: "cCaseStaticNonlinear",
      method: "SetInitialCase",
      parameters: {
        Name: name,
        InitialCase: initialCase,
      },
    });
  }

  setLoadApplication(name: string, loadControl: number, dispType: number, displ: number, monitor: number, dOF: number, pointName: string, gDispl: string): Promise<void> {
    return this.transport.request<void>({
      api: "cCaseStaticNonlinear",
      method: "SetLoadApplication",
      parameters: {
        Name: name,
        LoadControl: loadControl,
        DispType: dispType,
        Displ: displ,
        Monitor: monitor,
        DOF: dOF,
        PointName: pointName,
        GDispl: gDispl,
      },
    });
  }

  setLoads(name: string, numberLoads: number, loadType: string[], loadName: string[], sF: number[]): Promise<cCaseStaticNonlinearSetLoadsResult> {
    return this.transport.request<cCaseStaticNonlinearSetLoadsResult>({
      api: "cCaseStaticNonlinear",
      method: "SetLoads",
      parameters: {
        Name: name,
        NumberLoads: numberLoads,
        LoadType: loadType,
        LoadName: loadName,
        SF: sF,
      },
    });
  }

  setMassSource(name: string, mSource: string): Promise<void> {
    return this.transport.request<void>({
      api: "cCaseStaticNonlinear",
      method: "SetMassSource",
      parameters: {
        Name: name,
        mSource: mSource,
      },
    });
  }

  setModalCase(name: string, modalCase: string): Promise<void> {
    return this.transport.request<void>({
      api: "cCaseStaticNonlinear",
      method: "SetModalCase",
      parameters: {
        Name: name,
        ModalCase: modalCase,
      },
    });
  }

  setResultsSaved(name: string, saveMultipleSteps: boolean, minSavedStates?: number, maxSavedStates?: number, positiveOnly?: boolean): Promise<void> {
    return this.transport.request<void>({
      api: "cCaseStaticNonlinear",
      method: "SetResultsSaved",
      parameters: {
        Name: name,
        SaveMultipleSteps: saveMultipleSteps,
        MinSavedStates: minSavedStates,
        MaxSavedStates: maxSavedStates,
        PositiveOnly: positiveOnly,
      },
    });
  }

  setSolControlParameters(name: string, maxTotalSteps: number, maxFailedSubSteps: number, maxIterCS: number, maxIterNR: number, tolConvD: number, useEventStepping: boolean, tolEventD: number, maxLineSearchPerIter: number, tolLineSearch: number, lineSearchStepFact: number): Promise<void> {
    return this.transport.request<void>({
      api: "cCaseStaticNonlinear",
      method: "SetSolControlParameters",
      parameters: {
        Name: name,
        MaxTotalSteps: maxTotalSteps,
        MaxFailedSubSteps: maxFailedSubSteps,
        MaxIterCS: maxIterCS,
        MaxIterNR: maxIterNR,
        TolConvD: tolConvD,
        UseEventStepping: useEventStepping,
        TolEventD: tolEventD,
        MaxLineSearchPerIter: maxLineSearchPerIter,
        TolLineSearch: tolLineSearch,
        LineSearchStepFact: lineSearchStepFact,
      },
    });
  }

  setTargetForceParameters(name: string, tolConvF: number, maxIter: number, accelFact: number, noStop: boolean): Promise<void> {
    return this.transport.request<void>({
      api: "cCaseStaticNonlinear",
      method: "SetTargetForceParameters",
      parameters: {
        Name: name,
        TolConvF: tolConvF,
        MaxIter: maxIter,
        AccelFact: accelFact,
        NoStop: noStop,
      },
    });
  }

}

export class cCaseStaticNonlinearStagedApi {
  constructor(private readonly transport: EtabsTransport) {}

  getGeometricNonlinearity(name: string): Promise<cCaseStaticNonlinearStagedGetGeometricNonlinearityResult> {
    return this.transport.request<cCaseStaticNonlinearStagedGetGeometricNonlinearityResult>({
      api: "cCaseStaticNonlinearStaged",
      method: "GetGeometricNonlinearity",
      parameters: {
        Name: name,
      },
    });
  }

  getHingeUnloading(name: string): Promise<cCaseStaticNonlinearStagedGetHingeUnloadingResult> {
    return this.transport.request<cCaseStaticNonlinearStagedGetHingeUnloadingResult>({
      api: "cCaseStaticNonlinearStaged",
      method: "GetHingeUnloading",
      parameters: {
        Name: name,
      },
    });
  }

  getInitialCase(name: string): Promise<cCaseStaticNonlinearStagedGetInitialCaseResult> {
    return this.transport.request<cCaseStaticNonlinearStagedGetInitialCaseResult>({
      api: "cCaseStaticNonlinearStaged",
      method: "GetInitialCase",
      parameters: {
        Name: name,
      },
    });
  }

  getMassSource(name: string): Promise<cCaseStaticNonlinearStagedGetMassSourceResult> {
    return this.transport.request<cCaseStaticNonlinearStagedGetMassSourceResult>({
      api: "cCaseStaticNonlinearStaged",
      method: "GetMassSource",
      parameters: {
        Name: name,
      },
    });
  }

  getMaterialNonlinearity(name: string): Promise<cCaseStaticNonlinearStagedGetMaterialNonlinearityResult> {
    return this.transport.request<cCaseStaticNonlinearStagedGetMaterialNonlinearityResult>({
      api: "cCaseStaticNonlinearStaged",
      method: "GetMaterialNonlinearity",
      parameters: {
        Name: name,
      },
    });
  }

  getResultsSaved(name: string): Promise<cCaseStaticNonlinearStagedGetResultsSavedResult> {
    return this.transport.request<cCaseStaticNonlinearStagedGetResultsSavedResult>({
      api: "cCaseStaticNonlinearStaged",
      method: "GetResultsSaved",
      parameters: {
        Name: name,
      },
    });
  }

  getSolControlParameters(name: string): Promise<cCaseStaticNonlinearStagedGetSolControlParametersResult> {
    return this.transport.request<cCaseStaticNonlinearStagedGetSolControlParametersResult>({
      api: "cCaseStaticNonlinearStaged",
      method: "GetSolControlParameters",
      parameters: {
        Name: name,
      },
    });
  }

  getStageData(name: string): Promise<cCaseStaticNonlinearStagedGetStageDataResult> {
    return this.transport.request<cCaseStaticNonlinearStagedGetStageDataResult>({
      api: "cCaseStaticNonlinearStaged",
      method: "GetStageData",
      parameters: {
        Name: name,
      },
    });
  }

  getStageData_1(name: string): Promise<cCaseStaticNonlinearStagedGetStageData_1Result> {
    return this.transport.request<cCaseStaticNonlinearStagedGetStageData_1Result>({
      api: "cCaseStaticNonlinearStaged",
      method: "GetStageData_1",
      parameters: {
        Name: name,
      },
    });
  }

  getStageData_2(name: string): Promise<cCaseStaticNonlinearStagedGetStageData_2Result> {
    return this.transport.request<cCaseStaticNonlinearStagedGetStageData_2Result>({
      api: "cCaseStaticNonlinearStaged",
      method: "GetStageData_2",
      parameters: {
        Name: name,
      },
    });
  }

  getStageDefinitions(name: string): Promise<cCaseStaticNonlinearStagedGetStageDefinitionsResult> {
    return this.transport.request<cCaseStaticNonlinearStagedGetStageDefinitionsResult>({
      api: "cCaseStaticNonlinearStaged",
      method: "GetStageDefinitions",
      parameters: {
        Name: name,
      },
    });
  }

  getStageDefinitions_1(name: string): Promise<cCaseStaticNonlinearStagedGetStageDefinitions_1Result> {
    return this.transport.request<cCaseStaticNonlinearStagedGetStageDefinitions_1Result>({
      api: "cCaseStaticNonlinearStaged",
      method: "GetStageDefinitions_1",
      parameters: {
        Name: name,
      },
    });
  }

  getStageDefinitions_2(name: string): Promise<cCaseStaticNonlinearStagedGetStageDefinitions_2Result> {
    return this.transport.request<cCaseStaticNonlinearStagedGetStageDefinitions_2Result>({
      api: "cCaseStaticNonlinearStaged",
      method: "GetStageDefinitions_2",
      parameters: {
        Name: name,
      },
    });
  }

  getTargetForceParameters(name: string): Promise<cCaseStaticNonlinearStagedGetTargetForceParametersResult> {
    return this.transport.request<cCaseStaticNonlinearStagedGetTargetForceParametersResult>({
      api: "cCaseStaticNonlinearStaged",
      method: "GetTargetForceParameters",
      parameters: {
        Name: name,
      },
    });
  }

  setCase(name: string): Promise<void> {
    return this.transport.request<void>({
      api: "cCaseStaticNonlinearStaged",
      method: "SetCase",
      parameters: {
        Name: name,
      },
    });
  }

  setGeometricNonlinearity(name: string, nLGeomType: number): Promise<void> {
    return this.transport.request<void>({
      api: "cCaseStaticNonlinearStaged",
      method: "SetGeometricNonlinearity",
      parameters: {
        Name: name,
        NLGeomType: nLGeomType,
      },
    });
  }

  setHingeUnloading(name: string, unloadType: number): Promise<void> {
    return this.transport.request<void>({
      api: "cCaseStaticNonlinearStaged",
      method: "SetHingeUnloading",
      parameters: {
        Name: name,
        UnloadType: unloadType,
      },
    });
  }

  setInitialCase(name: string, initialCase: string): Promise<void> {
    return this.transport.request<void>({
      api: "cCaseStaticNonlinearStaged",
      method: "SetInitialCase",
      parameters: {
        Name: name,
        InitialCase: initialCase,
      },
    });
  }

  setMassSource(name: string, mSource: string): Promise<void> {
    return this.transport.request<void>({
      api: "cCaseStaticNonlinearStaged",
      method: "SetMassSource",
      parameters: {
        Name: name,
        mSource: mSource,
      },
    });
  }

  setMaterialNonlinearity(name: string, timeDepMatProp: boolean): Promise<void> {
    return this.transport.request<void>({
      api: "cCaseStaticNonlinearStaged",
      method: "SetMaterialNonlinearity",
      parameters: {
        Name: name,
        TimeDepMatProp: timeDepMatProp,
      },
    });
  }

  setResultsSaved(name: string, stagedSaveOption: number, stagedMinSteps?: number, stagedMinStepsTD?: number): Promise<void> {
    return this.transport.request<void>({
      api: "cCaseStaticNonlinearStaged",
      method: "SetResultsSaved",
      parameters: {
        Name: name,
        StagedSaveOption: stagedSaveOption,
        StagedMinSteps: stagedMinSteps,
        StagedMinStepsTD: stagedMinStepsTD,
      },
    });
  }

  setSolControlParameters(name: string, maxTotalSteps: number, maxFailedSubSteps: number, maxIterCS: number, maxIterNR: number, tolConvD: number, useEventStepping: boolean, tolEventD: number, maxLineSearchPerIter: number, tolLineSearch: number, lineSearchStepFact: number): Promise<void> {
    return this.transport.request<void>({
      api: "cCaseStaticNonlinearStaged",
      method: "SetSolControlParameters",
      parameters: {
        Name: name,
        MaxTotalSteps: maxTotalSteps,
        MaxFailedSubSteps: maxFailedSubSteps,
        MaxIterCS: maxIterCS,
        MaxIterNR: maxIterNR,
        TolConvD: tolConvD,
        UseEventStepping: useEventStepping,
        TolEventD: tolEventD,
        MaxLineSearchPerIter: maxLineSearchPerIter,
        TolLineSearch: tolLineSearch,
        LineSearchStepFact: lineSearchStepFact,
      },
    });
  }

  setStageData(name: string, stage: number, numberOperations: number, operation: number[], groupName: string[], age: number[], loadType: string[], loadName: string[], sF: number[]): Promise<cCaseStaticNonlinearStagedSetStageDataResult> {
    return this.transport.request<cCaseStaticNonlinearStagedSetStageDataResult>({
      api: "cCaseStaticNonlinearStaged",
      method: "SetStageData",
      parameters: {
        Name: name,
        Stage: stage,
        NumberOperations: numberOperations,
        Operation: operation,
        GroupName: groupName,
        Age: age,
        LoadType: loadType,
        LoadName: loadName,
        SF: sF,
      },
    });
  }

  setStageData_1(name: string, stage: number, numberOperations: number, operation: number[], objectType: string[], objectName: string[], age: number[], myType: string[], myName: string[], sF: number[]): Promise<cCaseStaticNonlinearStagedSetStageData_1Result> {
    return this.transport.request<cCaseStaticNonlinearStagedSetStageData_1Result>({
      api: "cCaseStaticNonlinearStaged",
      method: "SetStageData_1",
      parameters: {
        Name: name,
        Stage: stage,
        NumberOperations: numberOperations,
        Operation: operation,
        ObjectType: objectType,
        ObjectName: objectName,
        Age: age,
        MyType: myType,
        MyName: myName,
        SF: sF,
      },
    });
  }

  setStageData_2(name: string, stage: number, numberOperations: number, operation: number[], objectType: string[], objectName: string[], age: number[], myType: string[], myName: string[], sF: number[]): Promise<cCaseStaticNonlinearStagedSetStageData_2Result> {
    return this.transport.request<cCaseStaticNonlinearStagedSetStageData_2Result>({
      api: "cCaseStaticNonlinearStaged",
      method: "SetStageData_2",
      parameters: {
        Name: name,
        Stage: stage,
        NumberOperations: numberOperations,
        Operation: operation,
        ObjectType: objectType,
        ObjectName: objectName,
        Age: age,
        MyType: myType,
        MyName: myName,
        SF: sF,
      },
    });
  }

  setStageDefinitions(name: string, numberStages: number, duration: number[], comment: string[]): Promise<cCaseStaticNonlinearStagedSetStageDefinitionsResult> {
    return this.transport.request<cCaseStaticNonlinearStagedSetStageDefinitionsResult>({
      api: "cCaseStaticNonlinearStaged",
      method: "SetStageDefinitions",
      parameters: {
        Name: name,
        NumberStages: numberStages,
        Duration: duration,
        Comment: comment,
      },
    });
  }

  setStageDefinitions_1(name: string, numberStages: number, duration: number[], output: boolean[], outputName: string[], comment: string[]): Promise<cCaseStaticNonlinearStagedSetStageDefinitions_1Result> {
    return this.transport.request<cCaseStaticNonlinearStagedSetStageDefinitions_1Result>({
      api: "cCaseStaticNonlinearStaged",
      method: "SetStageDefinitions_1",
      parameters: {
        Name: name,
        NumberStages: numberStages,
        Duration: duration,
        Output: output,
        OutputName: outputName,
        Comment: comment,
      },
    });
  }

  setStageDefinitions_2(name: string, numberStages: number, duration: number[], output: boolean[], outputName: string[], comment: string[]): Promise<cCaseStaticNonlinearStagedSetStageDefinitions_2Result> {
    return this.transport.request<cCaseStaticNonlinearStagedSetStageDefinitions_2Result>({
      api: "cCaseStaticNonlinearStaged",
      method: "SetStageDefinitions_2",
      parameters: {
        Name: name,
        NumberStages: numberStages,
        Duration: duration,
        Output: output,
        OutputName: outputName,
        Comment: comment,
      },
    });
  }

  setTargetForceParameters(name: string, tolConvF: number, maxIter: number, accelFact: number, noStop: boolean): Promise<void> {
    return this.transport.request<void>({
      api: "cCaseStaticNonlinearStaged",
      method: "SetTargetForceParameters",
      parameters: {
        Name: name,
        TolConvF: tolConvF,
        MaxIter: maxIter,
        AccelFact: accelFact,
        NoStop: noStop,
      },
    });
  }

}

export class cComboApi {
  constructor(private readonly transport: EtabsTransport) {}

  add(name: string, comboType: number): Promise<void> {
    return this.transport.request<void>({
      api: "cCombo",
      method: "Add",
      parameters: {
        Name: name,
        ComboType: comboType,
      },
    });
  }

  addDesignDefaultCombos(designSteel: boolean, designConcrete: boolean, designAluminum: boolean, designColdFormed: boolean): Promise<void> {
    return this.transport.request<void>({
      api: "cCombo",
      method: "AddDesignDefaultCombos",
      parameters: {
        DesignSteel: designSteel,
        DesignConcrete: designConcrete,
        DesignAluminum: designAluminum,
        DesignColdFormed: designColdFormed,
      },
    });
  }

  delete_(name: string): Promise<void> {
    return this.transport.request<void>({
      api: "cCombo",
      method: "Delete",
      parameters: {
        Name: name,
      },
    });
  }

  deleteCase(name: string, cNameType: eCNameType, cName: string): Promise<void> {
    return this.transport.request<void>({
      api: "cCombo",
      method: "DeleteCase",
      parameters: {
        Name: name,
        CNameType: cNameType,
        CName: cName,
      },
    });
  }

  getCaseList(name: string): Promise<cComboGetCaseListResult> {
    return this.transport.request<cComboGetCaseListResult>({
      api: "cCombo",
      method: "GetCaseList",
      parameters: {
        Name: name,
      },
    });
  }

  getCaseList_1(name: string): Promise<cComboGetCaseList_1Result> {
    return this.transport.request<cComboGetCaseList_1Result>({
      api: "cCombo",
      method: "GetCaseList_1",
      parameters: {
        Name: name,
      },
    });
  }

  getNameList(): Promise<cComboGetNameListResult> {
    return this.transport.request<cComboGetNameListResult>({
      api: "cCombo",
      method: "GetNameList",
    });
  }

  getTypeCombo(name: string): Promise<cComboGetTypeComboResult> {
    return this.transport.request<cComboGetTypeComboResult>({
      api: "cCombo",
      method: "GetTypeCombo",
      parameters: {
        Name: name,
      },
    });
  }

  getTypeOAPI(name: string): Promise<cComboGetTypeOAPIResult> {
    return this.transport.request<cComboGetTypeOAPIResult>({
      api: "cCombo",
      method: "GetTypeOAPI",
      parameters: {
        name: name,
      },
    });
  }

  setCaseList(name: string, cNameType: eCNameType, cName: string, sF: number): Promise<cComboSetCaseListResult> {
    return this.transport.request<cComboSetCaseListResult>({
      api: "cCombo",
      method: "SetCaseList",
      parameters: {
        Name: name,
        CNameType: cNameType,
        CName: cName,
        SF: sF,
      },
    });
  }

  setCaseList_1(name: string, cNameType: eCNameType, cName: string, modeNumber: number, sF: number): Promise<cComboSetCaseList_1Result> {
    return this.transport.request<cComboSetCaseList_1Result>({
      api: "cCombo",
      method: "SetCaseList_1",
      parameters: {
        Name: name,
        CNameType: cNameType,
        CName: cName,
        ModeNumber: modeNumber,
        SF: sF,
      },
    });
  }

}

export class cConstraintApi {
  constructor(private readonly transport: EtabsTransport) {}

  delete_(name: string): Promise<void> {
    return this.transport.request<void>({
      api: "cConstraint",
      method: "Delete",
      parameters: {
        Name: name,
      },
    });
  }

  getDiaphragm(name: string): Promise<cConstraintGetDiaphragmResult> {
    return this.transport.request<cConstraintGetDiaphragmResult>({
      api: "cConstraint",
      method: "GetDiaphragm",
      parameters: {
        Name: name,
      },
    });
  }

  getNameList(): Promise<cConstraintGetNameListResult> {
    return this.transport.request<cConstraintGetNameListResult>({
      api: "cConstraint",
      method: "GetNameList",
    });
  }

  setDiaphragm(name: string, axis?: eConstraintAxis, cSys?: string): Promise<void> {
    return this.transport.request<void>({
      api: "cConstraint",
      method: "SetDiaphragm",
      parameters: {
        Name: name,
        Axis: axis,
        CSys: cSys,
      },
    });
  }

}

export class cDatabaseTablesApi {
  constructor(private readonly transport: EtabsTransport) {}

  applyEditedTables(fillImportLog: boolean): Promise<cDatabaseTablesApplyEditedTablesResult> {
    return this.transport.request<cDatabaseTablesApplyEditedTablesResult>({
      api: "cDatabaseTables",
      method: "ApplyEditedTables",
      parameters: {
        FillImportLog: fillImportLog,
      },
    });
  }

  cancelTableEditing(): Promise<void> {
    return this.transport.request<void>({
      api: "cDatabaseTables",
      method: "CancelTableEditing",
    });
  }

  getAllFieldsInTable(tableKey: string): Promise<cDatabaseTablesGetAllFieldsInTableResult> {
    return this.transport.request<cDatabaseTablesGetAllFieldsInTableResult>({
      api: "cDatabaseTables",
      method: "GetAllFieldsInTable",
      parameters: {
        TableKey: tableKey,
      },
    });
  }

  getAllTables(): Promise<cDatabaseTablesGetAllTablesResult> {
    return this.transport.request<cDatabaseTablesGetAllTablesResult>({
      api: "cDatabaseTables",
      method: "GetAllTables",
    });
  }

  getAvailableTables(): Promise<cDatabaseTablesGetAvailableTablesResult> {
    return this.transport.request<cDatabaseTablesGetAvailableTablesResult>({
      api: "cDatabaseTables",
      method: "GetAvailableTables",
    });
  }

  getLoadCasesSelectedForDisplay(): Promise<cDatabaseTablesGetLoadCasesSelectedForDisplayResult> {
    return this.transport.request<cDatabaseTablesGetLoadCasesSelectedForDisplayResult>({
      api: "cDatabaseTables",
      method: "GetLoadCasesSelectedForDisplay",
    });
  }

  getLoadCombinationsSelectedForDisplay(): Promise<cDatabaseTablesGetLoadCombinationsSelectedForDisplayResult> {
    return this.transport.request<cDatabaseTablesGetLoadCombinationsSelectedForDisplayResult>({
      api: "cDatabaseTables",
      method: "GetLoadCombinationsSelectedForDisplay",
    });
  }

  getLoadPatternsSelectedForDisplay(): Promise<cDatabaseTablesGetLoadPatternsSelectedForDisplayResult> {
    return this.transport.request<cDatabaseTablesGetLoadPatternsSelectedForDisplayResult>({
      api: "cDatabaseTables",
      method: "GetLoadPatternsSelectedForDisplay",
    });
  }

  getObsoleteTableKeyList(): Promise<cDatabaseTablesGetObsoleteTableKeyListResult> {
    return this.transport.request<cDatabaseTablesGetObsoleteTableKeyListResult>({
      api: "cDatabaseTables",
      method: "GetObsoleteTableKeyList",
    });
  }

  getOutputOptionsForDisplay(): Promise<cDatabaseTablesGetOutputOptionsForDisplayResult> {
    return this.transport.request<cDatabaseTablesGetOutputOptionsForDisplayResult>({
      api: "cDatabaseTables",
      method: "GetOutputOptionsForDisplay",
    });
  }

  getTableForDisplayArray(tableKey: string, groupName: string): Promise<cDatabaseTablesGetTableForDisplayArrayResult> {
    return this.transport.request<cDatabaseTablesGetTableForDisplayArrayResult>({
      api: "cDatabaseTables",
      method: "GetTableForDisplayArray",
      parameters: {
        TableKey: tableKey,
        GroupName: groupName,
      },
    });
  }

  getTableForDisplayCSVFile(tableKey: string, groupName: string, csvFilePath: string, sepChar?: string): Promise<cDatabaseTablesGetTableForDisplayCSVFileResult> {
    return this.transport.request<cDatabaseTablesGetTableForDisplayCSVFileResult>({
      api: "cDatabaseTables",
      method: "GetTableForDisplayCSVFile",
      parameters: {
        TableKey: tableKey,
        GroupName: groupName,
        csvFilePath: csvFilePath,
        sepChar: sepChar,
      },
    });
  }

  getTableForDisplayCSVString(tableKey: string, groupName: string, sepChar?: string): Promise<cDatabaseTablesGetTableForDisplayCSVStringResult> {
    return this.transport.request<cDatabaseTablesGetTableForDisplayCSVStringResult>({
      api: "cDatabaseTables",
      method: "GetTableForDisplayCSVString",
      parameters: {
        TableKey: tableKey,
        GroupName: groupName,
        sepChar: sepChar,
      },
    });
  }

  getTableForDisplayXMLString(tableKey: string, groupName: string, includeSchema: boolean): Promise<cDatabaseTablesGetTableForDisplayXMLStringResult> {
    return this.transport.request<cDatabaseTablesGetTableForDisplayXMLStringResult>({
      api: "cDatabaseTables",
      method: "GetTableForDisplayXMLString",
      parameters: {
        TableKey: tableKey,
        GroupName: groupName,
        IncludeSchema: includeSchema,
      },
    });
  }

  getTableForEditingArray(tableKey: string, groupName: string): Promise<cDatabaseTablesGetTableForEditingArrayResult> {
    return this.transport.request<cDatabaseTablesGetTableForEditingArrayResult>({
      api: "cDatabaseTables",
      method: "GetTableForEditingArray",
      parameters: {
        TableKey: tableKey,
        GroupName: groupName,
      },
    });
  }

  getTableForEditingCSVFile(tableKey: string, groupName: string, csvFilePath: string, sepChar?: string): Promise<cDatabaseTablesGetTableForEditingCSVFileResult> {
    return this.transport.request<cDatabaseTablesGetTableForEditingCSVFileResult>({
      api: "cDatabaseTables",
      method: "GetTableForEditingCSVFile",
      parameters: {
        TableKey: tableKey,
        GroupName: groupName,
        csvFilePath: csvFilePath,
        sepChar: sepChar,
      },
    });
  }

  getTableForEditingCSVString(tableKey: string, groupName: string, sepChar?: string): Promise<cDatabaseTablesGetTableForEditingCSVStringResult> {
    return this.transport.request<cDatabaseTablesGetTableForEditingCSVStringResult>({
      api: "cDatabaseTables",
      method: "GetTableForEditingCSVString",
      parameters: {
        TableKey: tableKey,
        GroupName: groupName,
        sepChar: sepChar,
      },
    });
  }

  setLoadCasesSelectedForDisplay(loadCaseList: string[]): Promise<cDatabaseTablesSetLoadCasesSelectedForDisplayResult> {
    return this.transport.request<cDatabaseTablesSetLoadCasesSelectedForDisplayResult>({
      api: "cDatabaseTables",
      method: "SetLoadCasesSelectedForDisplay",
      parameters: {
        LoadCaseList: loadCaseList,
      },
    });
  }

  setLoadCombinationsSelectedForDisplay(loadCombinationList: string[]): Promise<cDatabaseTablesSetLoadCombinationsSelectedForDisplayResult> {
    return this.transport.request<cDatabaseTablesSetLoadCombinationsSelectedForDisplayResult>({
      api: "cDatabaseTables",
      method: "SetLoadCombinationsSelectedForDisplay",
      parameters: {
        LoadCombinationList: loadCombinationList,
      },
    });
  }

  setLoadPatternsSelectedForDisplay(loadPatternList: string[]): Promise<cDatabaseTablesSetLoadPatternsSelectedForDisplayResult> {
    return this.transport.request<cDatabaseTablesSetLoadPatternsSelectedForDisplayResult>({
      api: "cDatabaseTables",
      method: "SetLoadPatternsSelectedForDisplay",
      parameters: {
        LoadPatternList: loadPatternList,
      },
    });
  }

  setOutputOptionsForDisplay(isUserBaseReactionLocation: boolean, userBaseReactionX: number, userBaseReactionY: number, userBaseReactionZ: number, isAllModes: boolean, startMode: number, endMode: number, isAllBucklingModes: boolean, startBucklingMode: number, endBucklingMode: number, multistepStatic: number, nonlinearStatic: number, modalHistory: number, directHistory: number, combo: number): Promise<void> {
    return this.transport.request<void>({
      api: "cDatabaseTables",
      method: "SetOutputOptionsForDisplay",
      parameters: {
        IsUserBaseReactionLocation: isUserBaseReactionLocation,
        UserBaseReactionX: userBaseReactionX,
        UserBaseReactionY: userBaseReactionY,
        UserBaseReactionZ: userBaseReactionZ,
        IsAllModes: isAllModes,
        StartMode: startMode,
        EndMode: endMode,
        IsAllBucklingModes: isAllBucklingModes,
        StartBucklingMode: startBucklingMode,
        EndBucklingMode: endBucklingMode,
        MultistepStatic: multistepStatic,
        NonlinearStatic: nonlinearStatic,
        ModalHistory: modalHistory,
        DirectHistory: directHistory,
        Combo: combo,
      },
    });
  }

  setTableForEditingArray(tableKey: string, tableVersion: number, fieldsKeysIncluded: string[], numberRecords: number, tableData: string[]): Promise<cDatabaseTablesSetTableForEditingArrayResult> {
    return this.transport.request<cDatabaseTablesSetTableForEditingArrayResult>({
      api: "cDatabaseTables",
      method: "SetTableForEditingArray",
      parameters: {
        TableKey: tableKey,
        TableVersion: tableVersion,
        FieldsKeysIncluded: fieldsKeysIncluded,
        NumberRecords: numberRecords,
        TableData: tableData,
      },
    });
  }

  setTableForEditingCSVFile(tableKey: string, tableVersion: number, csvFilePath: string, sepChar?: string): Promise<cDatabaseTablesSetTableForEditingCSVFileResult> {
    return this.transport.request<cDatabaseTablesSetTableForEditingCSVFileResult>({
      api: "cDatabaseTables",
      method: "SetTableForEditingCSVFile",
      parameters: {
        TableKey: tableKey,
        TableVersion: tableVersion,
        csvFilePath: csvFilePath,
        sepChar: sepChar,
      },
    });
  }

  setTableForEditingCSVString(tableKey: string, tableVersion: number, csvString: string, sepChar?: string): Promise<cDatabaseTablesSetTableForEditingCSVStringResult> {
    return this.transport.request<cDatabaseTablesSetTableForEditingCSVStringResult>({
      api: "cDatabaseTables",
      method: "SetTableForEditingCSVString",
      parameters: {
        TableKey: tableKey,
        TableVersion: tableVersion,
        csvString: csvString,
        sepChar: sepChar,
      },
    });
  }

  showTablesInExcel(tableKeyList: string[], windowHandle: number): Promise<cDatabaseTablesShowTablesInExcelResult> {
    return this.transport.request<cDatabaseTablesShowTablesInExcelResult>({
      api: "cDatabaseTables",
      method: "ShowTablesInExcel",
      parameters: {
        TableKeyList: tableKeyList,
        WindowHandle: windowHandle,
      },
    });
  }

}

export class cDCoACI318_08_IBC2009Api {
  constructor(private readonly transport: EtabsTransport) {}

  getOverwrite(name: string, item: number): Promise<cDCoACI318_08_IBC2009GetOverwriteResult> {
    return this.transport.request<cDCoACI318_08_IBC2009GetOverwriteResult>({
      api: "cDCoACI318_08_IBC2009",
      method: "GetOverwrite",
      parameters: {
        Name: name,
        Item: item,
      },
    });
  }

  getPreference(item: number): Promise<cDCoACI318_08_IBC2009GetPreferenceResult> {
    return this.transport.request<cDCoACI318_08_IBC2009GetPreferenceResult>({
      api: "cDCoACI318_08_IBC2009",
      method: "GetPreference",
      parameters: {
        Item: item,
      },
    });
  }

  setOverwrite(name: string, item: number, value: number, itemType?: eItemType): Promise<void> {
    return this.transport.request<void>({
      api: "cDCoACI318_08_IBC2009",
      method: "SetOverwrite",
      parameters: {
        Name: name,
        Item: item,
        Value: value,
        ItemType: itemType,
      },
    });
  }

  setPreference(item: number, value: number): Promise<void> {
    return this.transport.request<void>({
      api: "cDCoACI318_08_IBC2009",
      method: "SetPreference",
      parameters: {
        Item: item,
        Value: value,
      },
    });
  }

}

export class cDCoACI318_14Api {
  constructor(private readonly transport: EtabsTransport) {}

  getOverwrite(name: string, item: number): Promise<cDCoACI318_14GetOverwriteResult> {
    return this.transport.request<cDCoACI318_14GetOverwriteResult>({
      api: "cDCoACI318_14",
      method: "GetOverwrite",
      parameters: {
        Name: name,
        Item: item,
      },
    });
  }

  getPreference(item: number): Promise<cDCoACI318_14GetPreferenceResult> {
    return this.transport.request<cDCoACI318_14GetPreferenceResult>({
      api: "cDCoACI318_14",
      method: "GetPreference",
      parameters: {
        Item: item,
      },
    });
  }

  setOverwrite(name: string, item: number, value: number, itemType?: eItemType): Promise<void> {
    return this.transport.request<void>({
      api: "cDCoACI318_14",
      method: "SetOverwrite",
      parameters: {
        Name: name,
        Item: item,
        Value: value,
        ItemType: itemType,
      },
    });
  }

  setPreference(item: number, value: number): Promise<void> {
    return this.transport.request<void>({
      api: "cDCoACI318_14",
      method: "SetPreference",
      parameters: {
        Item: item,
        Value: value,
      },
    });
  }

}

export class cDCoACI318_19Api {
  constructor(private readonly transport: EtabsTransport) {}

  getOverwrite(name: string, item: number): Promise<cDCoACI318_19GetOverwriteResult> {
    return this.transport.request<cDCoACI318_19GetOverwriteResult>({
      api: "cDCoACI318_19",
      method: "GetOverwrite",
      parameters: {
        Name: name,
        Item: item,
      },
    });
  }

  getPreference(item: number): Promise<cDCoACI318_19GetPreferenceResult> {
    return this.transport.request<cDCoACI318_19GetPreferenceResult>({
      api: "cDCoACI318_19",
      method: "GetPreference",
      parameters: {
        Item: item,
      },
    });
  }

  setOverwrite(name: string, item: number, value: number, itemType?: eItemType): Promise<void> {
    return this.transport.request<void>({
      api: "cDCoACI318_19",
      method: "SetOverwrite",
      parameters: {
        Name: name,
        Item: item,
        Value: value,
        ItemType: itemType,
      },
    });
  }

  setPreference(item: number, value: number): Promise<void> {
    return this.transport.request<void>({
      api: "cDCoACI318_19",
      method: "SetPreference",
      parameters: {
        Item: item,
        Value: value,
      },
    });
  }

}

export class cDCoAS_3600_09Api {
  constructor(private readonly transport: EtabsTransport) {}

  getOverwrite(name: string, item: number): Promise<cDCoAS_3600_09GetOverwriteResult> {
    return this.transport.request<cDCoAS_3600_09GetOverwriteResult>({
      api: "cDCoAS_3600_09",
      method: "GetOverwrite",
      parameters: {
        Name: name,
        Item: item,
      },
    });
  }

  getPreference(item: number): Promise<cDCoAS_3600_09GetPreferenceResult> {
    return this.transport.request<cDCoAS_3600_09GetPreferenceResult>({
      api: "cDCoAS_3600_09",
      method: "GetPreference",
      parameters: {
        Item: item,
      },
    });
  }

  setOverwrite(name: string, item: number, value: number, itemType?: eItemType): Promise<void> {
    return this.transport.request<void>({
      api: "cDCoAS_3600_09",
      method: "SetOverwrite",
      parameters: {
        Name: name,
        Item: item,
        Value: value,
        ItemType: itemType,
      },
    });
  }

  setPreference(item: number, value: number): Promise<void> {
    return this.transport.request<void>({
      api: "cDCoAS_3600_09",
      method: "SetPreference",
      parameters: {
        Item: item,
        Value: value,
      },
    });
  }

}

export class cDCoAS_3600_2018Api {
  constructor(private readonly transport: EtabsTransport) {}

  getOverwrite(name: string, item: number): Promise<cDCoAS_3600_2018GetOverwriteResult> {
    return this.transport.request<cDCoAS_3600_2018GetOverwriteResult>({
      api: "cDCoAS_3600_2018",
      method: "GetOverwrite",
      parameters: {
        Name: name,
        Item: item,
      },
    });
  }

  getPreference(item: number): Promise<cDCoAS_3600_2018GetPreferenceResult> {
    return this.transport.request<cDCoAS_3600_2018GetPreferenceResult>({
      api: "cDCoAS_3600_2018",
      method: "GetPreference",
      parameters: {
        Item: item,
      },
    });
  }

  setOverwrite(name: string, item: number, value: number, itemType?: eItemType): Promise<void> {
    return this.transport.request<void>({
      api: "cDCoAS_3600_2018",
      method: "SetOverwrite",
      parameters: {
        Name: name,
        Item: item,
        Value: value,
        ItemType: itemType,
      },
    });
  }

  setPreference(item: number, value: number): Promise<void> {
    return this.transport.request<void>({
      api: "cDCoAS_3600_2018",
      method: "SetPreference",
      parameters: {
        Item: item,
        Value: value,
      },
    });
  }

}

export class cDCoBS8110_97Api {
  constructor(private readonly transport: EtabsTransport) {}

  getOverwrite(name: string, item: number): Promise<cDCoBS8110_97GetOverwriteResult> {
    return this.transport.request<cDCoBS8110_97GetOverwriteResult>({
      api: "cDCoBS8110_97",
      method: "GetOverwrite",
      parameters: {
        Name: name,
        Item: item,
      },
    });
  }

  getPreference(item: number): Promise<cDCoBS8110_97GetPreferenceResult> {
    return this.transport.request<cDCoBS8110_97GetPreferenceResult>({
      api: "cDCoBS8110_97",
      method: "GetPreference",
      parameters: {
        Item: item,
      },
    });
  }

  setOverwrite(name: string, item: number, value: number, itemType?: eItemType): Promise<void> {
    return this.transport.request<void>({
      api: "cDCoBS8110_97",
      method: "SetOverwrite",
      parameters: {
        Name: name,
        Item: item,
        Value: value,
        ItemType: itemType,
      },
    });
  }

  setPreference(item: number, value: number): Promise<void> {
    return this.transport.request<void>({
      api: "cDCoBS8110_97",
      method: "SetPreference",
      parameters: {
        Item: item,
        Value: value,
      },
    });
  }

}

export class cDCoChinese_2010Api {
  constructor(private readonly transport: EtabsTransport) {}

  getOverwrite(name: string, item: number): Promise<cDCoChinese_2010GetOverwriteResult> {
    return this.transport.request<cDCoChinese_2010GetOverwriteResult>({
      api: "cDCoChinese_2010",
      method: "GetOverwrite",
      parameters: {
        Name: name,
        Item: item,
      },
    });
  }

  getPreference(item: number): Promise<cDCoChinese_2010GetPreferenceResult> {
    return this.transport.request<cDCoChinese_2010GetPreferenceResult>({
      api: "cDCoChinese_2010",
      method: "GetPreference",
      parameters: {
        Item: item,
      },
    });
  }

  setOverwrite(name: string, item: number, value: number, itemType?: eItemType): Promise<void> {
    return this.transport.request<void>({
      api: "cDCoChinese_2010",
      method: "SetOverwrite",
      parameters: {
        Name: name,
        Item: item,
        Value: value,
        ItemType: itemType,
      },
    });
  }

  setPreference(item: number, value: number): Promise<void> {
    return this.transport.request<void>({
      api: "cDCoChinese_2010",
      method: "SetPreference",
      parameters: {
        Item: item,
        Value: value,
      },
    });
  }

}

export class cDCoEurocode_2_2004Api {
  constructor(private readonly transport: EtabsTransport) {}

  getOverwrite(name: string, item: number): Promise<cDCoEurocode_2_2004GetOverwriteResult> {
    return this.transport.request<cDCoEurocode_2_2004GetOverwriteResult>({
      api: "cDCoEurocode_2_2004",
      method: "GetOverwrite",
      parameters: {
        Name: name,
        Item: item,
      },
    });
  }

  getPreference(item: number): Promise<cDCoEurocode_2_2004GetPreferenceResult> {
    return this.transport.request<cDCoEurocode_2_2004GetPreferenceResult>({
      api: "cDCoEurocode_2_2004",
      method: "GetPreference",
      parameters: {
        Item: item,
      },
    });
  }

  setOverwrite(name: string, item: number, value: number, itemType?: eItemType): Promise<void> {
    return this.transport.request<void>({
      api: "cDCoEurocode_2_2004",
      method: "SetOverwrite",
      parameters: {
        Name: name,
        Item: item,
        Value: value,
        ItemType: itemType,
      },
    });
  }

  setPreference(item: number, value: number): Promise<void> {
    return this.transport.request<void>({
      api: "cDCoEurocode_2_2004",
      method: "SetPreference",
      parameters: {
        Item: item,
        Value: value,
      },
    });
  }

}

export class cDCoIndian_IS_456_2000Api {
  constructor(private readonly transport: EtabsTransport) {}

  getOverwrite(name: string, item: number): Promise<cDCoIndian_IS_456_2000GetOverwriteResult> {
    return this.transport.request<cDCoIndian_IS_456_2000GetOverwriteResult>({
      api: "cDCoIndian_IS_456_2000",
      method: "GetOverwrite",
      parameters: {
        Name: name,
        Item: item,
      },
    });
  }

  getPreference(item: number): Promise<cDCoIndian_IS_456_2000GetPreferenceResult> {
    return this.transport.request<cDCoIndian_IS_456_2000GetPreferenceResult>({
      api: "cDCoIndian_IS_456_2000",
      method: "GetPreference",
      parameters: {
        Item: item,
      },
    });
  }

  setOverwrite(name: string, item: number, value: number, itemType?: eItemType): Promise<void> {
    return this.transport.request<void>({
      api: "cDCoIndian_IS_456_2000",
      method: "SetOverwrite",
      parameters: {
        Name: name,
        Item: item,
        Value: value,
        ItemType: itemType,
      },
    });
  }

  setPreference(item: number, value: number): Promise<void> {
    return this.transport.request<void>({
      api: "cDCoIndian_IS_456_2000",
      method: "SetPreference",
      parameters: {
        Item: item,
        Value: value,
      },
    });
  }

}

export class cDCoMexican_RCDF_2017Api {
  constructor(private readonly transport: EtabsTransport) {}

  getOverwrite(name: string, item: number): Promise<cDCoMexican_RCDF_2017GetOverwriteResult> {
    return this.transport.request<cDCoMexican_RCDF_2017GetOverwriteResult>({
      api: "cDCoMexican_RCDF_2017",
      method: "GetOverwrite",
      parameters: {
        Name: name,
        Item: item,
      },
    });
  }

  getPreference(item: number): Promise<cDCoMexican_RCDF_2017GetPreferenceResult> {
    return this.transport.request<cDCoMexican_RCDF_2017GetPreferenceResult>({
      api: "cDCoMexican_RCDF_2017",
      method: "GetPreference",
      parameters: {
        Item: item,
      },
    });
  }

  setOverwrite(name: string, item: number, value: number, itemType?: eItemType): Promise<void> {
    return this.transport.request<void>({
      api: "cDCoMexican_RCDF_2017",
      method: "SetOverwrite",
      parameters: {
        Name: name,
        Item: item,
        Value: value,
        ItemType: itemType,
      },
    });
  }

  setPreference(item: number, value: number): Promise<void> {
    return this.transport.request<void>({
      api: "cDCoMexican_RCDF_2017",
      method: "SetPreference",
      parameters: {
        Item: item,
        Value: value,
      },
    });
  }

}

export class cDCompColAISC360_22Api {
  constructor(private readonly transport: EtabsTransport) {}

  getOverwrite(name: string, item: number): Promise<cDCompColAISC360_22GetOverwriteResult> {
    return this.transport.request<cDCompColAISC360_22GetOverwriteResult>({
      api: "cDCompColAISC360_22",
      method: "GetOverwrite",
      parameters: {
        Name: name,
        Item: item,
      },
    });
  }

  getPreference(item: number): Promise<cDCompColAISC360_22GetPreferenceResult> {
    return this.transport.request<cDCompColAISC360_22GetPreferenceResult>({
      api: "cDCompColAISC360_22",
      method: "GetPreference",
      parameters: {
        Item: item,
      },
    });
  }

  setOverwrite(name: string, item: number, value: number, itemType?: eItemType): Promise<void> {
    return this.transport.request<void>({
      api: "cDCompColAISC360_22",
      method: "SetOverwrite",
      parameters: {
        Name: name,
        Item: item,
        Value: value,
        ItemType: itemType,
      },
    });
  }

  setPreference(item: number, value: number): Promise<void> {
    return this.transport.request<void>({
      api: "cDCompColAISC360_22",
      method: "SetPreference",
      parameters: {
        Item: item,
        Value: value,
      },
    });
  }

}

export class cDCompColCSAS16_19Api {
  constructor(private readonly transport: EtabsTransport) {}

  getOverwrite(name: string, item: number): Promise<cDCompColCSAS16_19GetOverwriteResult> {
    return this.transport.request<cDCompColCSAS16_19GetOverwriteResult>({
      api: "cDCompColCSAS16_19",
      method: "GetOverwrite",
      parameters: {
        Name: name,
        Item: item,
      },
    });
  }

  getPreference(item: number): Promise<cDCompColCSAS16_19GetPreferenceResult> {
    return this.transport.request<cDCompColCSAS16_19GetPreferenceResult>({
      api: "cDCompColCSAS16_19",
      method: "GetPreference",
      parameters: {
        Item: item,
      },
    });
  }

  setOverwrite(name: string, item: number, value: number, itemType?: eItemType): Promise<void> {
    return this.transport.request<void>({
      api: "cDCompColCSAS16_19",
      method: "SetOverwrite",
      parameters: {
        Name: name,
        Item: item,
        Value: value,
        ItemType: itemType,
      },
    });
  }

  setPreference(item: number, value: number): Promise<void> {
    return this.transport.request<void>({
      api: "cDCompColCSAS16_19",
      method: "SetPreference",
      parameters: {
        Item: item,
        Value: value,
      },
    });
  }

}

export class cDCompColCSAS16_24Api {
  constructor(private readonly transport: EtabsTransport) {}

  getOverwrite(name: string, item: number): Promise<cDCompColCSAS16_24GetOverwriteResult> {
    return this.transport.request<cDCompColCSAS16_24GetOverwriteResult>({
      api: "cDCompColCSAS16_24",
      method: "GetOverwrite",
      parameters: {
        Name: name,
        Item: item,
      },
    });
  }

  getPreference(item: number): Promise<cDCompColCSAS16_24GetPreferenceResult> {
    return this.transport.request<cDCompColCSAS16_24GetPreferenceResult>({
      api: "cDCompColCSAS16_24",
      method: "GetPreference",
      parameters: {
        Item: item,
      },
    });
  }

  setOverwrite(name: string, item: number, value: number, itemType?: eItemType): Promise<void> {
    return this.transport.request<void>({
      api: "cDCompColCSAS16_24",
      method: "SetOverwrite",
      parameters: {
        Name: name,
        Item: item,
        Value: value,
        ItemType: itemType,
      },
    });
  }

  setPreference(item: number, value: number): Promise<void> {
    return this.transport.request<void>({
      api: "cDCompColCSAS16_24",
      method: "SetPreference",
      parameters: {
        Item: item,
        Value: value,
      },
    });
  }

}

export class cDCompColEurocode_4_2004Api {
  constructor(private readonly transport: EtabsTransport) {}

  getOverwrite(name: string, item: number): Promise<cDCompColEurocode_4_2004GetOverwriteResult> {
    return this.transport.request<cDCompColEurocode_4_2004GetOverwriteResult>({
      api: "cDCompColEurocode_4_2004",
      method: "GetOverwrite",
      parameters: {
        Name: name,
        Item: item,
      },
    });
  }

  getPreference(item: number): Promise<cDCompColEurocode_4_2004GetPreferenceResult> {
    return this.transport.request<cDCompColEurocode_4_2004GetPreferenceResult>({
      api: "cDCompColEurocode_4_2004",
      method: "GetPreference",
      parameters: {
        Item: item,
      },
    });
  }

  setOverwrite(name: string, item: number, value: number, itemType?: eItemType): Promise<void> {
    return this.transport.request<void>({
      api: "cDCompColEurocode_4_2004",
      method: "SetOverwrite",
      parameters: {
        Name: name,
        Item: item,
        Value: value,
        ItemType: itemType,
      },
    });
  }

  setPreference(item: number, value: number): Promise<void> {
    return this.transport.request<void>({
      api: "cDCompColEurocode_4_2004",
      method: "SetPreference",
      parameters: {
        Item: item,
        Value: value,
      },
    });
  }

}

export class cDCompColIS11384_2022Api {
  constructor(private readonly transport: EtabsTransport) {}

  getOverwrite(name: string, item: number): Promise<cDCompColIS11384_2022GetOverwriteResult> {
    return this.transport.request<cDCompColIS11384_2022GetOverwriteResult>({
      api: "cDCompColIS11384_2022",
      method: "GetOverwrite",
      parameters: {
        Name: name,
        Item: item,
      },
    });
  }

  getPreference(item: number): Promise<cDCompColIS11384_2022GetPreferenceResult> {
    return this.transport.request<cDCompColIS11384_2022GetPreferenceResult>({
      api: "cDCompColIS11384_2022",
      method: "GetPreference",
      parameters: {
        Item: item,
      },
    });
  }

  setOverwrite(name: string, item: number, value: number, itemType?: eItemType): Promise<void> {
    return this.transport.request<void>({
      api: "cDCompColIS11384_2022",
      method: "SetOverwrite",
      parameters: {
        Name: name,
        Item: item,
        Value: value,
        ItemType: itemType,
      },
    });
  }

  setPreference(item: number, value: number): Promise<void> {
    return this.transport.request<void>({
      api: "cDCompColIS11384_2022",
      method: "SetPreference",
      parameters: {
        Item: item,
        Value: value,
      },
    });
  }

}

export class cDConcSlabACI318_14Api {
  constructor(private readonly transport: EtabsTransport) {}

  getPreference(item: number): Promise<cDConcSlabACI318_14GetPreferenceResult> {
    return this.transport.request<cDConcSlabACI318_14GetPreferenceResult>({
      api: "cDConcSlabACI318_14",
      method: "GetPreference",
      parameters: {
        Item: item,
      },
    });
  }

}

export class cDCoSP63133302011Api {
  constructor(private readonly transport: EtabsTransport) {}

  getOverwrite(name: string, item: number): Promise<cDCoSP63133302011GetOverwriteResult> {
    return this.transport.request<cDCoSP63133302011GetOverwriteResult>({
      api: "cDCoSP63133302011",
      method: "GetOverwrite",
      parameters: {
        Name: name,
        Item: item,
      },
    });
  }

  getPreference(item: number): Promise<cDCoSP63133302011GetPreferenceResult> {
    return this.transport.request<cDCoSP63133302011GetPreferenceResult>({
      api: "cDCoSP63133302011",
      method: "GetPreference",
      parameters: {
        Item: item,
      },
    });
  }

  setOverwrite(name: string, item: number, value: number, itemType?: eItemType): Promise<void> {
    return this.transport.request<void>({
      api: "cDCoSP63133302011",
      method: "SetOverwrite",
      parameters: {
        Name: name,
        Item: item,
        Value: value,
        ItemType: itemType,
      },
    });
  }

  setPreference(item: number, value: number): Promise<void> {
    return this.transport.request<void>({
      api: "cDCoSP63133302011",
      method: "SetPreference",
      parameters: {
        Item: item,
        Value: value,
      },
    });
  }

}

export class cDCoTS_500_2000_R2018Api {
  constructor(private readonly transport: EtabsTransport) {}

  getOverwrite(name: string, item: number): Promise<cDCoTS_500_2000_R2018GetOverwriteResult> {
    return this.transport.request<cDCoTS_500_2000_R2018GetOverwriteResult>({
      api: "cDCoTS_500_2000_R2018",
      method: "GetOverwrite",
      parameters: {
        Name: name,
        Item: item,
      },
    });
  }

  getPreference(item: number): Promise<cDCoTS_500_2000_R2018GetPreferenceResult> {
    return this.transport.request<cDCoTS_500_2000_R2018GetPreferenceResult>({
      api: "cDCoTS_500_2000_R2018",
      method: "GetPreference",
      parameters: {
        Item: item,
      },
    });
  }

  setOverwrite(name: string, item: number, value: number, itemType?: eItemType): Promise<void> {
    return this.transport.request<void>({
      api: "cDCoTS_500_2000_R2018",
      method: "SetOverwrite",
      parameters: {
        Name: name,
        Item: item,
        Value: value,
        ItemType: itemType,
      },
    });
  }

  setPreference(item: number, value: number): Promise<void> {
    return this.transport.request<void>({
      api: "cDCoTS_500_2000_R2018",
      method: "SetPreference",
      parameters: {
        Item: item,
        Value: value,
      },
    });
  }

}

export class cDesignCompositeBeamApi {
  constructor(private readonly transport: EtabsTransport) {}

  deleteResults(): Promise<void> {
    return this.transport.request<void>({
      api: "cDesignCompositeBeam",
      method: "DeleteResults",
    });
  }

  getCode(): Promise<cDesignCompositeBeamGetCodeResult> {
    return this.transport.request<cDesignCompositeBeamGetCodeResult>({
      api: "cDesignCompositeBeam",
      method: "GetCode",
    });
  }

  getComboDeflection(): Promise<cDesignCompositeBeamGetComboDeflectionResult> {
    return this.transport.request<cDesignCompositeBeamGetComboDeflectionResult>({
      api: "cDesignCompositeBeam",
      method: "GetComboDeflection",
    });
  }

  getComboStrength(): Promise<cDesignCompositeBeamGetComboStrengthResult> {
    return this.transport.request<cDesignCompositeBeamGetComboStrengthResult>({
      api: "cDesignCompositeBeam",
      method: "GetComboStrength",
    });
  }

  getDesignSection(name: string): Promise<cDesignCompositeBeamGetDesignSectionResult> {
    return this.transport.request<cDesignCompositeBeamGetDesignSectionResult>({
      api: "cDesignCompositeBeam",
      method: "GetDesignSection",
      parameters: {
        Name: name,
      },
    });
  }

  getGroup(): Promise<cDesignCompositeBeamGetGroupResult> {
    return this.transport.request<cDesignCompositeBeamGetGroupResult>({
      api: "cDesignCompositeBeam",
      method: "GetGroup",
    });
  }

  getResultsAvailable(): Promise<boolean> {
    return this.transport.request<boolean>({
      api: "cDesignCompositeBeam",
      method: "GetResultsAvailable",
    });
  }

  getSummaryResults(name: string, itemType?: eItemType): Promise<cDesignCompositeBeamGetSummaryResultsResult> {
    return this.transport.request<cDesignCompositeBeamGetSummaryResultsResult>({
      api: "cDesignCompositeBeam",
      method: "GetSummaryResults",
      parameters: {
        Name: name,
        ItemType: itemType,
      },
    });
  }

  getTargetDispl(): Promise<cDesignCompositeBeamGetTargetDisplResult> {
    return this.transport.request<cDesignCompositeBeamGetTargetDisplResult>({
      api: "cDesignCompositeBeam",
      method: "GetTargetDispl",
    });
  }

  getTargetPeriod(): Promise<cDesignCompositeBeamGetTargetPeriodResult> {
    return this.transport.request<cDesignCompositeBeamGetTargetPeriodResult>({
      api: "cDesignCompositeBeam",
      method: "GetTargetPeriod",
    });
  }

  resetOverwrites(): Promise<void> {
    return this.transport.request<void>({
      api: "cDesignCompositeBeam",
      method: "ResetOverwrites",
    });
  }

  setAutoSelectNull(name: string, itemType?: eItemType): Promise<void> {
    return this.transport.request<void>({
      api: "cDesignCompositeBeam",
      method: "SetAutoSelectNull",
      parameters: {
        Name: name,
        ItemType: itemType,
      },
    });
  }

  setCode(codeName: string): Promise<void> {
    return this.transport.request<void>({
      api: "cDesignCompositeBeam",
      method: "SetCode",
      parameters: {
        CodeName: codeName,
      },
    });
  }

  setComboDeflection(name: string, selected: boolean): Promise<void> {
    return this.transport.request<void>({
      api: "cDesignCompositeBeam",
      method: "SetComboDeflection",
      parameters: {
        Name: name,
        Selected: selected,
      },
    });
  }

  setComboStrength(name: string, selected: boolean): Promise<void> {
    return this.transport.request<void>({
      api: "cDesignCompositeBeam",
      method: "SetComboStrength",
      parameters: {
        Name: name,
        Selected: selected,
      },
    });
  }

  setDesignSection(name: string, propName: string, lastAnalysis: boolean, itemType?: eItemType): Promise<void> {
    return this.transport.request<void>({
      api: "cDesignCompositeBeam",
      method: "SetDesignSection",
      parameters: {
        Name: name,
        PropName: propName,
        LastAnalysis: lastAnalysis,
        ItemType: itemType,
      },
    });
  }

  setGroup(name: string, selected: boolean): Promise<void> {
    return this.transport.request<void>({
      api: "cDesignCompositeBeam",
      method: "SetGroup",
      parameters: {
        Name: name,
        Selected: selected,
      },
    });
  }

  setTargetDispl(numberItems: number, loadCase: string[], point: string[], displ: number[], active?: boolean): Promise<cDesignCompositeBeamSetTargetDisplResult> {
    return this.transport.request<cDesignCompositeBeamSetTargetDisplResult>({
      api: "cDesignCompositeBeam",
      method: "SetTargetDispl",
      parameters: {
        NumberItems: numberItems,
        LoadCase: loadCase,
        Point: point,
        Displ: displ,
        Active: active,
      },
    });
  }

  setTargetPeriod(numberItems: number, modalCase: string, mode: number[], period: number[], active?: boolean): Promise<cDesignCompositeBeamSetTargetPeriodResult> {
    return this.transport.request<cDesignCompositeBeamSetTargetPeriodResult>({
      api: "cDesignCompositeBeam",
      method: "SetTargetPeriod",
      parameters: {
        NumberItems: numberItems,
        ModalCase: modalCase,
        Mode: mode,
        Period: period,
        Active: active,
      },
    });
  }

  startDesign(): Promise<void> {
    return this.transport.request<void>({
      api: "cDesignCompositeBeam",
      method: "StartDesign",
    });
  }

  verifyPassed(): Promise<cDesignCompositeBeamVerifyPassedResult> {
    return this.transport.request<cDesignCompositeBeamVerifyPassedResult>({
      api: "cDesignCompositeBeam",
      method: "VerifyPassed",
    });
  }

  verifySections(): Promise<cDesignCompositeBeamVerifySectionsResult> {
    return this.transport.request<cDesignCompositeBeamVerifySectionsResult>({
      api: "cDesignCompositeBeam",
      method: "VerifySections",
    });
  }

}

export class cDesignCompositeColumnApi {
  constructor(private readonly transport: EtabsTransport) {}

  get aISC360_22(): cDCompColAISC360_22Api {
    return new cDCompColAISC360_22Api(this.transport);
  }

  get cSAS16_19(): cDCompColCSAS16_19Api {
    return new cDCompColCSAS16_19Api(this.transport);
  }

  get cSAS16_24(): cDCompColCSAS16_24Api {
    return new cDCompColCSAS16_24Api(this.transport);
  }

  get eurocode_4_2004(): cDCompColEurocode_4_2004Api {
    return new cDCompColEurocode_4_2004Api(this.transport);
  }

  get iS11384_2022(): cDCompColIS11384_2022Api {
    return new cDCompColIS11384_2022Api(this.transport);
  }

  deleteResults(): Promise<void> {
    return this.transport.request<void>({
      api: "cDesignCompositeColumn",
      method: "DeleteResults",
    });
  }

  getCode(): Promise<cDesignCompositeColumnGetCodeResult> {
    return this.transport.request<cDesignCompositeColumnGetCodeResult>({
      api: "cDesignCompositeColumn",
      method: "GetCode",
    });
  }

  getComboDeflection(): Promise<cDesignCompositeColumnGetComboDeflectionResult> {
    return this.transport.request<cDesignCompositeColumnGetComboDeflectionResult>({
      api: "cDesignCompositeColumn",
      method: "GetComboDeflection",
    });
  }

  getComboStrength(): Promise<cDesignCompositeColumnGetComboStrengthResult> {
    return this.transport.request<cDesignCompositeColumnGetComboStrengthResult>({
      api: "cDesignCompositeColumn",
      method: "GetComboStrength",
    });
  }

  getDesignSection(name: string): Promise<cDesignCompositeColumnGetDesignSectionResult> {
    return this.transport.request<cDesignCompositeColumnGetDesignSectionResult>({
      api: "cDesignCompositeColumn",
      method: "GetDesignSection",
      parameters: {
        Name: name,
      },
    });
  }

  getGroup(): Promise<cDesignCompositeColumnGetGroupResult> {
    return this.transport.request<cDesignCompositeColumnGetGroupResult>({
      api: "cDesignCompositeColumn",
      method: "GetGroup",
    });
  }

  getResultsAvailable(): Promise<boolean> {
    return this.transport.request<boolean>({
      api: "cDesignCompositeColumn",
      method: "GetResultsAvailable",
    });
  }

  getSummaryResults(name: string, itemType?: eItemType): Promise<cDesignCompositeColumnGetSummaryResultsResult> {
    return this.transport.request<cDesignCompositeColumnGetSummaryResultsResult>({
      api: "cDesignCompositeColumn",
      method: "GetSummaryResults",
      parameters: {
        Name: name,
        ItemType: itemType,
      },
    });
  }

  getTargetDispl(): Promise<cDesignCompositeColumnGetTargetDisplResult> {
    return this.transport.request<cDesignCompositeColumnGetTargetDisplResult>({
      api: "cDesignCompositeColumn",
      method: "GetTargetDispl",
    });
  }

  getTargetPeriod(): Promise<cDesignCompositeColumnGetTargetPeriodResult> {
    return this.transport.request<cDesignCompositeColumnGetTargetPeriodResult>({
      api: "cDesignCompositeColumn",
      method: "GetTargetPeriod",
    });
  }

  resetOverwrites(): Promise<void> {
    return this.transport.request<void>({
      api: "cDesignCompositeColumn",
      method: "ResetOverwrites",
    });
  }

  setAutoSelectNull(name: string, itemType?: eItemType): Promise<void> {
    return this.transport.request<void>({
      api: "cDesignCompositeColumn",
      method: "SetAutoSelectNull",
      parameters: {
        Name: name,
        ItemType: itemType,
      },
    });
  }

  setCode(codeName: string): Promise<void> {
    return this.transport.request<void>({
      api: "cDesignCompositeColumn",
      method: "SetCode",
      parameters: {
        CodeName: codeName,
      },
    });
  }

  setComboDeflection(name: string, selected: boolean): Promise<void> {
    return this.transport.request<void>({
      api: "cDesignCompositeColumn",
      method: "SetComboDeflection",
      parameters: {
        Name: name,
        Selected: selected,
      },
    });
  }

  setComboStrength(name: string, selected: boolean): Promise<void> {
    return this.transport.request<void>({
      api: "cDesignCompositeColumn",
      method: "SetComboStrength",
      parameters: {
        Name: name,
        Selected: selected,
      },
    });
  }

  setDesignSection(name: string, propName: string, lastAnalysis: boolean, itemType?: eItemType): Promise<void> {
    return this.transport.request<void>({
      api: "cDesignCompositeColumn",
      method: "SetDesignSection",
      parameters: {
        Name: name,
        PropName: propName,
        LastAnalysis: lastAnalysis,
        ItemType: itemType,
      },
    });
  }

  setGroup(name: string, selected: boolean): Promise<void> {
    return this.transport.request<void>({
      api: "cDesignCompositeColumn",
      method: "SetGroup",
      parameters: {
        Name: name,
        Selected: selected,
      },
    });
  }

  setTargetDispl(numberItems: number, loadCase: string[], point: string[], displ: number[], active?: boolean): Promise<cDesignCompositeColumnSetTargetDisplResult> {
    return this.transport.request<cDesignCompositeColumnSetTargetDisplResult>({
      api: "cDesignCompositeColumn",
      method: "SetTargetDispl",
      parameters: {
        NumberItems: numberItems,
        LoadCase: loadCase,
        Point: point,
        Displ: displ,
        Active: active,
      },
    });
  }

  setTargetPeriod(numberItems: number, modalCase: string, mode: number[], period: number[], active?: boolean): Promise<cDesignCompositeColumnSetTargetPeriodResult> {
    return this.transport.request<cDesignCompositeColumnSetTargetPeriodResult>({
      api: "cDesignCompositeColumn",
      method: "SetTargetPeriod",
      parameters: {
        NumberItems: numberItems,
        ModalCase: modalCase,
        Mode: mode,
        Period: period,
        Active: active,
      },
    });
  }

  startDesign(): Promise<void> {
    return this.transport.request<void>({
      api: "cDesignCompositeColumn",
      method: "StartDesign",
    });
  }

  verifyPassed(): Promise<cDesignCompositeColumnVerifyPassedResult> {
    return this.transport.request<cDesignCompositeColumnVerifyPassedResult>({
      api: "cDesignCompositeColumn",
      method: "VerifyPassed",
    });
  }

  verifySections(): Promise<cDesignCompositeColumnVerifySectionsResult> {
    return this.transport.request<cDesignCompositeColumnVerifySectionsResult>({
      api: "cDesignCompositeColumn",
      method: "VerifySections",
    });
  }

}

export class cDesignConcreteApi {
  constructor(private readonly transport: EtabsTransport) {}

  get aCI318_08_IBC2009(): cDCoACI318_08_IBC2009Api {
    return new cDCoACI318_08_IBC2009Api(this.transport);
  }

  get aCI318_14(): cDCoACI318_14Api {
    return new cDCoACI318_14Api(this.transport);
  }

  get aCI318_19(): cDCoACI318_19Api {
    return new cDCoACI318_19Api(this.transport);
  }

  get aS_3600_09(): cDCoAS_3600_09Api {
    return new cDCoAS_3600_09Api(this.transport);
  }

  get aS_3600_2018(): cDCoAS_3600_2018Api {
    return new cDCoAS_3600_2018Api(this.transport);
  }

  get bS8110_97(): cDCoBS8110_97Api {
    return new cDCoBS8110_97Api(this.transport);
  }

  get chinese_2010(): cDCoChinese_2010Api {
    return new cDCoChinese_2010Api(this.transport);
  }

  get eurocode_2_2004(): cDCoEurocode_2_2004Api {
    return new cDCoEurocode_2_2004Api(this.transport);
  }

  get indian_IS_456_2000(): cDCoIndian_IS_456_2000Api {
    return new cDCoIndian_IS_456_2000Api(this.transport);
  }

  get mexican_RCDF_2017(): cDCoMexican_RCDF_2017Api {
    return new cDCoMexican_RCDF_2017Api(this.transport);
  }

  get sP63_13330_2012(): cDCoSP63133302011Api {
    return new cDCoSP63133302011Api(this.transport);
  }

  get tS_500_2000_R2018(): cDCoTS_500_2000_R2018Api {
    return new cDCoTS_500_2000_R2018Api(this.transport);
  }

  getCode(): Promise<cDesignConcreteGetCodeResult> {
    return this.transport.request<cDesignConcreteGetCodeResult>({
      api: "cDesignConcrete",
      method: "GetCode",
    });
  }

  getDesignSection(name: string): Promise<cDesignConcreteGetDesignSectionResult> {
    return this.transport.request<cDesignConcreteGetDesignSectionResult>({
      api: "cDesignConcrete",
      method: "GetDesignSection",
      parameters: {
        Name: name,
      },
    });
  }

  getRebarPrefsBeam(item: number): Promise<cDesignConcreteGetRebarPrefsBeamResult> {
    return this.transport.request<cDesignConcreteGetRebarPrefsBeamResult>({
      api: "cDesignConcrete",
      method: "GetRebarPrefsBeam",
      parameters: {
        Item: item,
      },
    });
  }

  getRebarPrefsColumn(item: number): Promise<cDesignConcreteGetRebarPrefsColumnResult> {
    return this.transport.request<cDesignConcreteGetRebarPrefsColumnResult>({
      api: "cDesignConcrete",
      method: "GetRebarPrefsColumn",
      parameters: {
        Item: item,
      },
    });
  }

  getResultsAvailable(): Promise<boolean> {
    return this.transport.request<boolean>({
      api: "cDesignConcrete",
      method: "GetResultsAvailable",
    });
  }

  getSeismicFramingType(name: string, itemType?: eItemType): Promise<cDesignConcreteGetSeismicFramingTypeResult> {
    return this.transport.request<cDesignConcreteGetSeismicFramingTypeResult>({
      api: "cDesignConcrete",
      method: "GetSeismicFramingType",
      parameters: {
        Name: name,
        ItemType: itemType,
      },
    });
  }

  getSummaryResultsBeam(name: string, itemType?: eItemType): Promise<cDesignConcreteGetSummaryResultsBeamResult> {
    return this.transport.request<cDesignConcreteGetSummaryResultsBeamResult>({
      api: "cDesignConcrete",
      method: "GetSummaryResultsBeam",
      parameters: {
        Name: name,
        ItemType: itemType,
      },
    });
  }

  getSummaryResultsBeam_2(name: string, itemType?: eItemType): Promise<cDesignConcreteGetSummaryResultsBeam_2Result> {
    return this.transport.request<cDesignConcreteGetSummaryResultsBeam_2Result>({
      api: "cDesignConcrete",
      method: "GetSummaryResultsBeam_2",
      parameters: {
        Name: name,
        ItemType: itemType,
      },
    });
  }

  getSummaryResultsColumn(name: string, itemType?: eItemType): Promise<cDesignConcreteGetSummaryResultsColumnResult> {
    return this.transport.request<cDesignConcreteGetSummaryResultsColumnResult>({
      api: "cDesignConcrete",
      method: "GetSummaryResultsColumn",
      parameters: {
        Name: name,
        ItemType: itemType,
      },
    });
  }

  getSummaryResultsJoint(name: string, itemType?: eItemType): Promise<cDesignConcreteGetSummaryResultsJointResult> {
    return this.transport.request<cDesignConcreteGetSummaryResultsJointResult>({
      api: "cDesignConcrete",
      method: "GetSummaryResultsJoint",
      parameters: {
        Name: name,
        ItemType: itemType,
      },
    });
  }

  setCode(codeName: string): Promise<void> {
    return this.transport.request<void>({
      api: "cDesignConcrete",
      method: "SetCode",
      parameters: {
        CodeName: codeName,
      },
    });
  }

  setComboStrength(name: string, selected: boolean): Promise<void> {
    return this.transport.request<void>({
      api: "cDesignConcrete",
      method: "SetComboStrength",
      parameters: {
        Name: name,
        Selected: selected,
      },
    });
  }

  setDesignSection(name: string, propName: string, lastAnalysis: boolean, itemType?: eItemType): Promise<void> {
    return this.transport.request<void>({
      api: "cDesignConcrete",
      method: "SetDesignSection",
      parameters: {
        Name: name,
        PropName: propName,
        LastAnalysis: lastAnalysis,
        ItemType: itemType,
      },
    });
  }

  startDesign(): Promise<void> {
    return this.transport.request<void>({
      api: "cDesignConcrete",
      method: "StartDesign",
    });
  }

}

export class cDesignConcreteSlabApi {
  constructor(private readonly transport: EtabsTransport) {}

  get aCI318_14(): cDConcSlabACI318_14Api {
    return new cDConcSlabACI318_14Api(this.transport);
  }

  get designStrip(): cDesignStripApi {
    return new cDesignStripApi(this.transport);
  }

  getFlexureAndShear(): Promise<cDesignConcreteSlabGetFlexureAndShearResult> {
    return this.transport.request<cDesignConcreteSlabGetFlexureAndShearResult>({
      api: "cDesignConcreteSlab",
      method: "GetFlexureAndShear",
    });
  }

  getSummaryResultsFlexureAndShear(): Promise<cDesignConcreteSlabGetSummaryResultsFlexureAndShearResult> {
    return this.transport.request<cDesignConcreteSlabGetSummaryResultsFlexureAndShearResult>({
      api: "cDesignConcreteSlab",
      method: "GetSummaryResultsFlexureAndShear",
    });
  }

  getSummaryResultsSpanDefinition(): Promise<cDesignConcreteSlabGetSummaryResultsSpanDefinitionResult> {
    return this.transport.request<cDesignConcreteSlabGetSummaryResultsSpanDefinitionResult>({
      api: "cDesignConcreteSlab",
      method: "GetSummaryResultsSpanDefinition",
    });
  }

  startSlabDesign(): Promise<void> {
    return this.transport.request<void>({
      api: "cDesignConcreteSlab",
      method: "StartSlabDesign",
    });
  }

}

export class cDesignForcesApi {
  constructor(private readonly transport: EtabsTransport) {}

  beamDesignForces(name: string, itemType?: eItemType): Promise<cDesignForcesBeamDesignForcesResult> {
    return this.transport.request<cDesignForcesBeamDesignForcesResult>({
      api: "cDesignForces",
      method: "BeamDesignForces",
      parameters: {
        Name: name,
        ItemType: itemType,
      },
    });
  }

  braceDesignForces(name: string, itemType?: eItemType): Promise<cDesignForcesBraceDesignForcesResult> {
    return this.transport.request<cDesignForcesBraceDesignForcesResult>({
      api: "cDesignForces",
      method: "BraceDesignForces",
      parameters: {
        Name: name,
        ItemType: itemType,
      },
    });
  }

  columnDesignForces(name: string, itemType?: eItemType): Promise<cDesignForcesColumnDesignForcesResult> {
    return this.transport.request<cDesignForcesColumnDesignForcesResult>({
      api: "cDesignForces",
      method: "ColumnDesignForces",
      parameters: {
        Name: name,
        ItemType: itemType,
      },
    });
  }

  pierDesignForces(inputPierLabel: string, inputStoryName: string): Promise<cDesignForcesPierDesignForcesResult> {
    return this.transport.request<cDesignForcesPierDesignForcesResult>({
      api: "cDesignForces",
      method: "PierDesignForces",
      parameters: {
        InputPierLabel: inputPierLabel,
        InputStoryName: inputStoryName,
      },
    });
  }

  spandrelDesignForces(inputSpandrelLabel: string, inputStoryName: string): Promise<cDesignForcesSpandrelDesignForcesResult> {
    return this.transport.request<cDesignForcesSpandrelDesignForcesResult>({
      api: "cDesignForces",
      method: "SpandrelDesignForces",
      parameters: {
        InputSpandrelLabel: inputSpandrelLabel,
        InputStoryName: inputStoryName,
      },
    });
  }

}

export class cDesignResultsApi {
  constructor(private readonly transport: EtabsTransport) {}

  get designForces(): cDesignForcesApi {
    return new cDesignForcesApi(this.transport);
  }

}

export class cDesignShearWallApi {
  constructor(private readonly transport: EtabsTransport) {}

  getPierSummaryResults(): Promise<cDesignShearWallGetPierSummaryResultsResult> {
    return this.transport.request<cDesignShearWallGetPierSummaryResultsResult>({
      api: "cDesignShearWall",
      method: "GetPierSummaryResults",
    });
  }

  getRebar(): Promise<cDesignShearWallGetRebarResult> {
    return this.transport.request<cDesignShearWallGetRebarResult>({
      api: "cDesignShearWall",
      method: "GetRebar",
    });
  }

  getRebarPrefsPier(item: number): Promise<cDesignShearWallGetRebarPrefsPierResult> {
    return this.transport.request<cDesignShearWallGetRebarPrefsPierResult>({
      api: "cDesignShearWall",
      method: "GetRebarPrefsPier",
      parameters: {
        Item: item,
      },
    });
  }

  getRebarPrefsSpandrel(item: number): Promise<cDesignShearWallGetRebarPrefsSpandrelResult> {
    return this.transport.request<cDesignShearWallGetRebarPrefsSpandrelResult>({
      api: "cDesignShearWall",
      method: "GetRebarPrefsSpandrel",
      parameters: {
        Item: item,
      },
    });
  }

  getSpandrelSummaryResults(): Promise<cDesignShearWallGetSpandrelSummaryResultsResult> {
    return this.transport.request<cDesignShearWallGetSpandrelSummaryResultsResult>({
      api: "cDesignShearWall",
      method: "GetSpandrelSummaryResults",
    });
  }

  setComboStrength(name: string, selected: boolean): Promise<void> {
    return this.transport.request<void>({
      api: "cDesignShearWall",
      method: "SetComboStrength",
      parameters: {
        Name: name,
        Selected: selected,
      },
    });
  }

}

export class cDesignSteelApi {
  constructor(private readonly transport: EtabsTransport) {}

  get aISC_LRFD93(): cDStAISC_LRFD93Api {
    return new cDStAISC_LRFD93Api(this.transport);
  }

  get aISC360_05_IBC2006(): cDStAISC360_05_IBC2006Api {
    return new cDStAISC360_05_IBC2006Api(this.transport);
  }

  get aISC360_10(): cDStAISC360_10Api {
    return new cDStAISC360_10Api(this.transport);
  }

  get aISC360_16(): cDStAISC360_16Api {
    return new cDStAISC360_16Api(this.transport);
  }

  get aISC360_22(): cDStAISC360_22Api {
    return new cDStAISC360_22Api(this.transport);
  }

  get australian_AS4100_2020(): cDStAustralian_AS4100_2020Api {
    return new cDStAustralian_AS4100_2020Api(this.transport);
  }

  get australian_AS4100_98(): cDStAustralian_AS4100_98Api {
    return new cDStAustralian_AS4100_98Api(this.transport);
  }

  get bS5950_2000(): cDStBS5950_2000Api {
    return new cDStBS5950_2000Api(this.transport);
  }

  get canadian_S16_09(): cDStCanadian_S16_09Api {
    return new cDStCanadian_S16_09Api(this.transport);
  }

  get canadian_S16_14(): cDStCanadian_S16_14Api {
    return new cDStCanadian_S16_14Api(this.transport);
  }

  get canadian_S16_19(): cDStCanadian_S16_19Api {
    return new cDStCanadian_S16_19Api(this.transport);
  }

  get canadian_S16_24(): cDStCanadian_S16_24Api {
    return new cDStCanadian_S16_24Api(this.transport);
  }

  get chinese_2010(): cDStChinese_2010Api {
    return new cDStChinese_2010Api(this.transport);
  }

  get chinese_2018(): cDStChinese_2018Api {
    return new cDStChinese_2018Api(this.transport);
  }

  get eN1993_1_1_2005(): cDStEN1993_1_1_2005Api {
    return new cDStEN1993_1_1_2005Api(this.transport);
  }

  get eurocode_3_2005(): cDStEurocode_3_2005Api {
    return new cDStEurocode_3_2005Api(this.transport);
  }

  get indian_IS_800_2007(): cDStIndian_IS_800_2007Api {
    return new cDStIndian_IS_800_2007Api(this.transport);
  }

  get italian_NTC_2008(): cDStItalianNTC2008SApi {
    return new cDStItalianNTC2008SApi(this.transport);
  }

  get italian_NTC_2018(): cDStItalianNTC2018SApi {
    return new cDStItalianNTC2018SApi(this.transport);
  }

  get newZealand_NZS3404_97(): cDStNewZealand_NZS3404_97Api {
    return new cDStNewZealand_NZS3404_97Api(this.transport);
  }

  get sP16_13330_2011(): cDStSP16_13330_2011Api {
    return new cDStSP16_13330_2011Api(this.transport);
  }

  deleteResults(): Promise<void> {
    return this.transport.request<void>({
      api: "cDesignSteel",
      method: "DeleteResults",
    });
  }

  getCode(): Promise<cDesignSteelGetCodeResult> {
    return this.transport.request<cDesignSteelGetCodeResult>({
      api: "cDesignSteel",
      method: "GetCode",
    });
  }

  getComboDeflection(): Promise<cDesignSteelGetComboDeflectionResult> {
    return this.transport.request<cDesignSteelGetComboDeflectionResult>({
      api: "cDesignSteel",
      method: "GetComboDeflection",
    });
  }

  getComboStrength(): Promise<cDesignSteelGetComboStrengthResult> {
    return this.transport.request<cDesignSteelGetComboStrengthResult>({
      api: "cDesignSteel",
      method: "GetComboStrength",
    });
  }

  getDesignSection(name: string): Promise<cDesignSteelGetDesignSectionResult> {
    return this.transport.request<cDesignSteelGetDesignSectionResult>({
      api: "cDesignSteel",
      method: "GetDesignSection",
      parameters: {
        Name: name,
      },
    });
  }

  getGroup(): Promise<cDesignSteelGetGroupResult> {
    return this.transport.request<cDesignSteelGetGroupResult>({
      api: "cDesignSteel",
      method: "GetGroup",
    });
  }

  getResultsAvailable(): Promise<boolean> {
    return this.transport.request<boolean>({
      api: "cDesignSteel",
      method: "GetResultsAvailable",
    });
  }

  getSummaryResults(name: string, itemType?: eItemType): Promise<cDesignSteelGetSummaryResultsResult> {
    return this.transport.request<cDesignSteelGetSummaryResultsResult>({
      api: "cDesignSteel",
      method: "GetSummaryResults",
      parameters: {
        Name: name,
        ItemType: itemType,
      },
    });
  }

  getSummaryResults_2(name: string, itemType?: eItemType): Promise<cDesignSteelGetSummaryResults_2Result> {
    return this.transport.request<cDesignSteelGetSummaryResults_2Result>({
      api: "cDesignSteel",
      method: "GetSummaryResults_2",
      parameters: {
        Name: name,
        ItemType: itemType,
      },
    });
  }

  getSummaryResults_3(name: string, itemType?: eItemType): Promise<cDesignSteelGetSummaryResults_3Result> {
    return this.transport.request<cDesignSteelGetSummaryResults_3Result>({
      api: "cDesignSteel",
      method: "GetSummaryResults_3",
      parameters: {
        Name: name,
        ItemType: itemType,
      },
    });
  }

  getTargetDispl(): Promise<cDesignSteelGetTargetDisplResult> {
    return this.transport.request<cDesignSteelGetTargetDisplResult>({
      api: "cDesignSteel",
      method: "GetTargetDispl",
    });
  }

  getTargetPeriod(): Promise<cDesignSteelGetTargetPeriodResult> {
    return this.transport.request<cDesignSteelGetTargetPeriodResult>({
      api: "cDesignSteel",
      method: "GetTargetPeriod",
    });
  }

  resetOverwrites(): Promise<void> {
    return this.transport.request<void>({
      api: "cDesignSteel",
      method: "ResetOverwrites",
    });
  }

  setAutoSelectNull(name: string, itemType?: eItemType): Promise<void> {
    return this.transport.request<void>({
      api: "cDesignSteel",
      method: "SetAutoSelectNull",
      parameters: {
        Name: name,
        ItemType: itemType,
      },
    });
  }

  setCode(codeName: string): Promise<void> {
    return this.transport.request<void>({
      api: "cDesignSteel",
      method: "SetCode",
      parameters: {
        CodeName: codeName,
      },
    });
  }

  setComboDeflection(name: string, selected: boolean): Promise<void> {
    return this.transport.request<void>({
      api: "cDesignSteel",
      method: "SetComboDeflection",
      parameters: {
        Name: name,
        Selected: selected,
      },
    });
  }

  setComboStrength(name: string, selected: boolean): Promise<void> {
    return this.transport.request<void>({
      api: "cDesignSteel",
      method: "SetComboStrength",
      parameters: {
        Name: name,
        Selected: selected,
      },
    });
  }

  setDesignSection(name: string, propName: string, lastAnalysis: boolean, itemType?: eItemType): Promise<void> {
    return this.transport.request<void>({
      api: "cDesignSteel",
      method: "SetDesignSection",
      parameters: {
        Name: name,
        PropName: propName,
        LastAnalysis: lastAnalysis,
        ItemType: itemType,
      },
    });
  }

  setGroup(name: string, selected: boolean): Promise<void> {
    return this.transport.request<void>({
      api: "cDesignSteel",
      method: "SetGroup",
      parameters: {
        Name: name,
        Selected: selected,
      },
    });
  }

  setTargetDispl(numberItems: number, loadCase: string[], point: string[], displ: number[], active?: boolean): Promise<cDesignSteelSetTargetDisplResult> {
    return this.transport.request<cDesignSteelSetTargetDisplResult>({
      api: "cDesignSteel",
      method: "SetTargetDispl",
      parameters: {
        NumberItems: numberItems,
        LoadCase: loadCase,
        Point: point,
        Displ: displ,
        Active: active,
      },
    });
  }

  setTargetPeriod(numberItems: number, modalCase: string, mode: number[], period: number[], active?: boolean): Promise<cDesignSteelSetTargetPeriodResult> {
    return this.transport.request<cDesignSteelSetTargetPeriodResult>({
      api: "cDesignSteel",
      method: "SetTargetPeriod",
      parameters: {
        NumberItems: numberItems,
        ModalCase: modalCase,
        Mode: mode,
        Period: period,
        Active: active,
      },
    });
  }

  startDesign(): Promise<void> {
    return this.transport.request<void>({
      api: "cDesignSteel",
      method: "StartDesign",
    });
  }

  verifyPassed(): Promise<cDesignSteelVerifyPassedResult> {
    return this.transport.request<cDesignSteelVerifyPassedResult>({
      api: "cDesignSteel",
      method: "VerifyPassed",
    });
  }

  verifySections(): Promise<cDesignSteelVerifySectionsResult> {
    return this.transport.request<cDesignSteelVerifySectionsResult>({
      api: "cDesignSteel",
      method: "VerifySections",
    });
  }

}

export class cDesignStripApi {
  constructor(private readonly transport: EtabsTransport) {}

  changeName(name: string, newName: string): Promise<void> {
    return this.transport.request<void>({
      api: "cDesignStrip",
      method: "ChangeName",
      parameters: {
        Name: name,
        NewName: newName,
      },
    });
  }

  delete_(name: string): Promise<void> {
    return this.transport.request<void>({
      api: "cDesignStrip",
      method: "Delete",
      parameters: {
        Name: name,
      },
    });
  }

  getDesignStrip(name: string): Promise<cDesignStripGetDesignStripResult> {
    return this.transport.request<cDesignStripGetDesignStripResult>({
      api: "cDesignStrip",
      method: "GetDesignStrip",
      parameters: {
        Name: name,
      },
    });
  }

  getDesignStrip_1(name: string): Promise<cDesignStripGetDesignStrip_1Result> {
    return this.transport.request<cDesignStripGetDesignStrip_1Result>({
      api: "cDesignStrip",
      method: "GetDesignStrip_1",
      parameters: {
        Name: name,
      },
    });
  }

  getGUID(name: string): Promise<cDesignStripGetGUIDResult> {
    return this.transport.request<cDesignStripGetGUIDResult>({
      api: "cDesignStrip",
      method: "GetGUID",
      parameters: {
        Name: name,
      },
    });
  }

  getNameList(): Promise<cDesignStripGetNameListResult> {
    return this.transport.request<cDesignStripGetNameListResult>({
      api: "cDesignStrip",
      method: "GetNameList",
    });
  }

  setGUID(name: string, gUID?: string): Promise<void> {
    return this.transport.request<void>({
      api: "cDesignStrip",
      method: "SetGUID",
      parameters: {
        Name: name,
        GUID: gUID,
      },
    });
  }

}

export class cDetailingApi {
  constructor(private readonly transport: EtabsTransport) {}

  clearDetailing(): Promise<void> {
    return this.transport.request<void>({
      api: "cDetailing",
      method: "ClearDetailing",
    });
  }

  getBeamLongRebarData(name: string): Promise<cDetailingGetBeamLongRebarDataResult> {
    return this.transport.request<cDetailingGetBeamLongRebarDataResult>({
      api: "cDetailing",
      method: "GetBeamLongRebarData",
      parameters: {
        Name: name,
      },
    });
  }

  getBeamTieRebarData(name: string): Promise<cDetailingGetBeamTieRebarDataResult> {
    return this.transport.request<cDetailingGetBeamTieRebarDataResult>({
      api: "cDetailing",
      method: "GetBeamTieRebarData",
      parameters: {
        Name: name,
      },
    });
  }

  getColumnLongRebarData(name: string): Promise<cDetailingGetColumnLongRebarDataResult> {
    return this.transport.request<cDetailingGetColumnLongRebarDataResult>({
      api: "cDetailing",
      method: "GetColumnLongRebarData",
      parameters: {
        Name: name,
      },
    });
  }

  getColumnTieRebarData(name: string): Promise<cDetailingGetColumnTieRebarDataResult> {
    return this.transport.request<cDetailingGetColumnTieRebarDataResult>({
      api: "cDetailing",
      method: "GetColumnTieRebarData",
      parameters: {
        Name: name,
      },
    });
  }

  getDetailed_OneWallStack(wallStackIndex: number): Promise<cDetailingGetDetailed_OneWallStackResult> {
    return this.transport.request<cDetailingGetDetailed_OneWallStackResult>({
      api: "cDetailing",
      method: "GetDetailed_OneWallStack",
      parameters: {
        WallStackIndex: wallStackIndex,
      },
    });
  }

  getDetailedBeamLineData(beamLineID: string): Promise<cDetailingGetDetailedBeamLineDataResult> {
    return this.transport.request<cDetailingGetDetailedBeamLineDataResult>({
      api: "cDetailing",
      method: "GetDetailedBeamLineData",
      parameters: {
        BeamLineID: beamLineID,
      },
    });
  }

  getDetailedBeamLineData_1(beamLineID: string): Promise<cDetailingGetDetailedBeamLineData_1Result> {
    return this.transport.request<cDetailingGetDetailedBeamLineData_1Result>({
      api: "cDetailing",
      method: "GetDetailedBeamLineData_1",
      parameters: {
        BeamLineID: beamLineID,
      },
    });
  }

  getDetailedBeamLineData_2(towerName: string, storyName: string, beamLineID: string): Promise<cDetailingGetDetailedBeamLineData_2Result> {
    return this.transport.request<cDetailingGetDetailedBeamLineData_2Result>({
      api: "cDetailing",
      method: "GetDetailedBeamLineData_2",
      parameters: {
        TowerName: towerName,
        StoryName: storyName,
        BeamLineID: beamLineID,
      },
    });
  }

  getDetailedBeamLineGuidData(beamLineID: string, similarFirstBeamUniqueID: string): Promise<cDetailingGetDetailedBeamLineGuidDataResult> {
    return this.transport.request<cDetailingGetDetailedBeamLineGuidDataResult>({
      api: "cDetailing",
      method: "GetDetailedBeamLineGuidData",
      parameters: {
        BeamLineID: beamLineID,
        SimilarFirstBeamUniqueID: similarFirstBeamUniqueID,
      },
    });
  }

  getDetailedBeamLines(): Promise<cDetailingGetDetailedBeamLinesResult> {
    return this.transport.request<cDetailingGetDetailedBeamLinesResult>({
      api: "cDetailing",
      method: "GetDetailedBeamLines",
    });
  }

  getDetailedBeamLines_1(): Promise<cDetailingGetDetailedBeamLines_1Result> {
    return this.transport.request<cDetailingGetDetailedBeamLines_1Result>({
      api: "cDetailing",
      method: "GetDetailedBeamLines_1",
    });
  }

  getDetailedColumnStackData(columnStackID: string): Promise<cDetailingGetDetailedColumnStackDataResult> {
    return this.transport.request<cDetailingGetDetailedColumnStackDataResult>({
      api: "cDetailing",
      method: "GetDetailedColumnStackData",
      parameters: {
        ColumnStackID: columnStackID,
      },
    });
  }

  getDetailedColumnStackData_1(columnStackID: string): Promise<cDetailingGetDetailedColumnStackData_1Result> {
    return this.transport.request<cDetailingGetDetailedColumnStackData_1Result>({
      api: "cDetailing",
      method: "GetDetailedColumnStackData_1",
      parameters: {
        ColumnStackID: columnStackID,
      },
    });
  }

  getDetailedColumnStackData_2(columnStackID: string): Promise<cDetailingGetDetailedColumnStackData_2Result> {
    return this.transport.request<cDetailingGetDetailedColumnStackData_2Result>({
      api: "cDetailing",
      method: "GetDetailedColumnStackData_2",
      parameters: {
        ColumnStackID: columnStackID,
      },
    });
  }

  getDetailedColumnStackGuidData(columnStackID: string, similarFirstColumnUniqueID: string): Promise<cDetailingGetDetailedColumnStackGuidDataResult> {
    return this.transport.request<cDetailingGetDetailedColumnStackGuidDataResult>({
      api: "cDetailing",
      method: "GetDetailedColumnStackGuidData",
      parameters: {
        ColumnStackID: columnStackID,
        SimilarFirstColumnUniqueID: similarFirstColumnUniqueID,
      },
    });
  }

  getDetailedColumnStacks(): Promise<cDetailingGetDetailedColumnStacksResult> {
    return this.transport.request<cDetailingGetDetailedColumnStacksResult>({
      api: "cDetailing",
      method: "GetDetailedColumnStacks",
    });
  }

  getDetailedSlab_OneDetailingOutputInfo(detailingOutputIndex: number): Promise<cDetailingGetDetailedSlab_OneDetailingOutputInfoResult> {
    return this.transport.request<cDetailingGetDetailedSlab_OneDetailingOutputInfoResult>({
      api: "cDetailing",
      method: "GetDetailedSlab_OneDetailingOutputInfo",
      parameters: {
        DetailingOutputIndex: detailingOutputIndex,
      },
    });
  }

  getDetailedSlabBotBarData(slabName: string): Promise<cDetailingGetDetailedSlabBotBarDataResult> {
    return this.transport.request<cDetailingGetDetailedSlabBotBarDataResult>({
      api: "cDetailing",
      method: "GetDetailedSlabBotBarData",
      parameters: {
        SlabName: slabName,
      },
    });
  }

  getDetailedSlabBotBarData_1(slabName: string): Promise<cDetailingGetDetailedSlabBotBarData_1Result> {
    return this.transport.request<cDetailingGetDetailedSlabBotBarData_1Result>({
      api: "cDetailing",
      method: "GetDetailedSlabBotBarData_1",
      parameters: {
        SlabName: slabName,
      },
    });
  }

  getDetailedSlabs(): Promise<cDetailingGetDetailedSlabsResult> {
    return this.transport.request<cDetailingGetDetailedSlabsResult>({
      api: "cDetailing",
      method: "GetDetailedSlabs",
    });
  }

  getDetailedSlabTopBarData(slabName: string): Promise<cDetailingGetDetailedSlabTopBarDataResult> {
    return this.transport.request<cDetailingGetDetailedSlabTopBarDataResult>({
      api: "cDetailing",
      method: "GetDetailedSlabTopBarData",
      parameters: {
        SlabName: slabName,
      },
    });
  }

  getDetailedSlabTopBarData_1(slabName: string): Promise<cDetailingGetDetailedSlabTopBarData_1Result> {
    return this.transport.request<cDetailingGetDetailedSlabTopBarData_1Result>({
      api: "cDetailing",
      method: "GetDetailedSlabTopBarData_1",
      parameters: {
        SlabName: slabName,
      },
    });
  }

  getDetailedWall_OnePier_OneDesignLeg_OneTieBar_OneTiePline_OnePoint(wallStackIndex: number, pierIndex: number, designLegIndex: number, tieBarIndex: number, tiePLineIndex: number, tPLinePointIndex: number): Promise<cDetailingGetDetailedWall_OnePier_OneDesignLeg_OneTieBar_OneTiePline_OnePointResult> {
    return this.transport.request<cDetailingGetDetailedWall_OnePier_OneDesignLeg_OneTieBar_OneTiePline_OnePointResult>({
      api: "cDetailing",
      method: "GetDetailedWall_OnePier_OneDesignLeg_OneTieBar_OneTiePline_OnePoint",
      parameters: {
        WallStackIndex: wallStackIndex,
        PierIndex: pierIndex,
        DesignLegIndex: designLegIndex,
        TieBarIndex: tieBarIndex,
        TiePLineIndex: tiePLineIndex,
        TPLinePointIndex: tPLinePointIndex,
      },
    });
  }

  getDetailedWall_OneWallStack_OnePier_OneDesignLeg_OneTieBar_OneTiePlineInfo(wallStackIndex: number, pierIndex: number, designLegIndex: number, tieBarIndex: number, tiePLineIndex: number): Promise<cDetailingGetDetailedWall_OneWallStack_OnePier_OneDesignLeg_OneTieBar_OneTiePlineInfoResult> {
    return this.transport.request<cDetailingGetDetailedWall_OneWallStack_OnePier_OneDesignLeg_OneTieBar_OneTiePlineInfoResult>({
      api: "cDetailing",
      method: "GetDetailedWall_OneWallStack_OnePier_OneDesignLeg_OneTieBar_OneTiePlineInfo",
      parameters: {
        WallStackIndex: wallStackIndex,
        PierIndex: pierIndex,
        DesignLegIndex: designLegIndex,
        TieBarIndex: tieBarIndex,
        TiePLineIndex: tiePLineIndex,
      },
    });
  }

  getDetailedWall_OneWallStack_OnePier_OneDesignLeg_OneTieBarInfo(wallStackIndex: number, pierIndex: number, designLegIndex: number, tieBarIndex: number): Promise<cDetailingGetDetailedWall_OneWallStack_OnePier_OneDesignLeg_OneTieBarInfoResult> {
    return this.transport.request<cDetailingGetDetailedWall_OneWallStack_OnePier_OneDesignLeg_OneTieBarInfoResult>({
      api: "cDetailing",
      method: "GetDetailedWall_OneWallStack_OnePier_OneDesignLeg_OneTieBarInfo",
      parameters: {
        WallStackIndex: wallStackIndex,
        PierIndex: pierIndex,
        DesignLegIndex: designLegIndex,
        TieBarIndex: tieBarIndex,
      },
    });
  }

  getDetailedWall_OneWallStack_OnePier_OneDesignLeg_OneVerticalBarInfo(wallStackIndex: number, pierIndex: number, designLegIndex: number, verticalBarIndex: number): Promise<cDetailingGetDetailedWall_OneWallStack_OnePier_OneDesignLeg_OneVerticalBarInfoResult> {
    return this.transport.request<cDetailingGetDetailedWall_OneWallStack_OnePier_OneDesignLeg_OneVerticalBarInfoResult>({
      api: "cDetailing",
      method: "GetDetailedWall_OneWallStack_OnePier_OneDesignLeg_OneVerticalBarInfo",
      parameters: {
        WallStackIndex: wallStackIndex,
        PierIndex: pierIndex,
        DesignLegIndex: designLegIndex,
        VerticalBarIndex: verticalBarIndex,
      },
    });
  }

  getDetailedWall_OneWallStack_OnePier_OneDesignLegOutputInfo(wallStackIndex: number, pierIndex: number, designLegIndex: number): Promise<cDetailingGetDetailedWall_OneWallStack_OnePier_OneDesignLegOutputInfoResult> {
    return this.transport.request<cDetailingGetDetailedWall_OneWallStack_OnePier_OneDesignLegOutputInfoResult>({
      api: "cDetailing",
      method: "GetDetailedWall_OneWallStack_OnePier_OneDesignLegOutputInfo",
      parameters: {
        WallStackIndex: wallStackIndex,
        PierIndex: pierIndex,
        DesignLegIndex: designLegIndex,
      },
    });
  }

  getDetailedWall_OneWallStack_OnePierOutputInfo(wallStackIndex: number, pierIndex: number): Promise<cDetailingGetDetailedWall_OneWallStack_OnePierOutputInfoResult> {
    return this.transport.request<cDetailingGetDetailedWall_OneWallStack_OnePierOutputInfoResult>({
      api: "cDetailing",
      method: "GetDetailedWall_OneWallStack_OnePierOutputInfo",
      parameters: {
        WallStackIndex: wallStackIndex,
        PierIndex: pierIndex,
      },
    });
  }

  getDetailedWall_OneWallStack_OneSpandrel_OneLongBarInfo(wallStackIndex: number, spandrelIndex: number, longBarIndex: number): Promise<cDetailingGetDetailedWall_OneWallStack_OneSpandrel_OneLongBarInfoResult> {
    return this.transport.request<cDetailingGetDetailedWall_OneWallStack_OneSpandrel_OneLongBarInfoResult>({
      api: "cDetailing",
      method: "GetDetailedWall_OneWallStack_OneSpandrel_OneLongBarInfo",
      parameters: {
        WallStackIndex: wallStackIndex,
        SpandrelIndex: spandrelIndex,
        LongBarIndex: longBarIndex,
      },
    });
  }

  getDetailedWall_OneWallStack_OneSpandrel_OneStirrupsInfo(wallStackIndex: number, spandrelIndex: number, stirrupsIndex: number): Promise<cDetailingGetDetailedWall_OneWallStack_OneSpandrel_OneStirrupsInfoResult> {
    return this.transport.request<cDetailingGetDetailedWall_OneWallStack_OneSpandrel_OneStirrupsInfoResult>({
      api: "cDetailing",
      method: "GetDetailedWall_OneWallStack_OneSpandrel_OneStirrupsInfo",
      parameters: {
        WallStackIndex: wallStackIndex,
        SpandrelIndex: spandrelIndex,
        StirrupsIndex: stirrupsIndex,
      },
    });
  }

  getDetailedWall_OneWallStack_OneSpandrelOutputInfo(wallStackIndex: number, spandrelIndex: number): Promise<cDetailingGetDetailedWall_OneWallStack_OneSpandrelOutputInfoResult> {
    return this.transport.request<cDetailingGetDetailedWall_OneWallStack_OneSpandrelOutputInfoResult>({
      api: "cDetailing",
      method: "GetDetailedWall_OneWallStack_OneSpandrelOutputInfo",
      parameters: {
        WallStackIndex: wallStackIndex,
        SpandrelIndex: spandrelIndex,
      },
    });
  }

  getDetailingAvailable(): Promise<boolean> {
    return this.transport.request<boolean>({
      api: "cDetailing",
      method: "GetDetailingAvailable",
    });
  }

  getNumberDetailedSlabs(): Promise<cDetailingGetNumberDetailedSlabsResult> {
    return this.transport.request<cDetailingGetNumberDetailedSlabsResult>({
      api: "cDetailing",
      method: "GetNumberDetailedSlabs",
    });
  }

  getNumberDetailedWallStacks(): Promise<cDetailingGetNumberDetailedWallStacksResult> {
    return this.transport.request<cDetailingGetNumberDetailedWallStacksResult>({
      api: "cDetailing",
      method: "GetNumberDetailedWallStacks",
    });
  }

  getOneDetailedSlab_OneDetailingOutput_OneStrip_OneDetailingRegion_OneBottomRebar_Bar1Info(detailingOutputIndex: number, stripIndex: number, detailingRegionIndex: number, bottomRebarIndex: number): Promise<cDetailingGetOneDetailedSlab_OneDetailingOutput_OneStrip_OneDetailingRegion_OneBottomRebar_Bar1InfoResult> {
    return this.transport.request<cDetailingGetOneDetailedSlab_OneDetailingOutput_OneStrip_OneDetailingRegion_OneBottomRebar_Bar1InfoResult>({
      api: "cDetailing",
      method: "GetOneDetailedSlab_OneDetailingOutput_OneStrip_OneDetailingRegion_OneBottomRebar_Bar1Info",
      parameters: {
        DetailingOutputIndex: detailingOutputIndex,
        StripIndex: stripIndex,
        DetailingRegionIndex: detailingRegionIndex,
        BottomRebarIndex: bottomRebarIndex,
      },
    });
  }

  getOneDetailedSlab_OneDetailingOutput_OneStrip_OneDetailingRegion_OneBottomRebar_Bar2Info(detailingOutputIndex: number, stripIndex: number, detailingRegionIndex: number, bottomRebarIndex: number): Promise<cDetailingGetOneDetailedSlab_OneDetailingOutput_OneStrip_OneDetailingRegion_OneBottomRebar_Bar2InfoResult> {
    return this.transport.request<cDetailingGetOneDetailedSlab_OneDetailingOutput_OneStrip_OneDetailingRegion_OneBottomRebar_Bar2InfoResult>({
      api: "cDetailing",
      method: "GetOneDetailedSlab_OneDetailingOutput_OneStrip_OneDetailingRegion_OneBottomRebar_Bar2Info",
      parameters: {
        DetailingOutputIndex: detailingOutputIndex,
        StripIndex: stripIndex,
        DetailingRegionIndex: detailingRegionIndex,
        BottomRebarIndex: bottomRebarIndex,
      },
    });
  }

  getOneDetailedSlab_OneDetailingOutput_OneStrip_OneDetailingRegion_OneBottomRebarInfo(detailingOutputIndex: number, stripIndex: number, detailingRegionIndex: number, bottomRebarIndex: number): Promise<cDetailingGetOneDetailedSlab_OneDetailingOutput_OneStrip_OneDetailingRegion_OneBottomRebarInfoResult> {
    return this.transport.request<cDetailingGetOneDetailedSlab_OneDetailingOutput_OneStrip_OneDetailingRegion_OneBottomRebarInfoResult>({
      api: "cDetailing",
      method: "GetOneDetailedSlab_OneDetailingOutput_OneStrip_OneDetailingRegion_OneBottomRebarInfo",
      parameters: {
        DetailingOutputIndex: detailingOutputIndex,
        StripIndex: stripIndex,
        DetailingRegionIndex: detailingRegionIndex,
        BottomRebarIndex: bottomRebarIndex,
      },
    });
  }

  getOneDetailedSlab_OneDetailingOutput_OneStrip_OneDetailingRegion_OneTopRebar_Bar1Info(detailingOutputIndex: number, stripIndex: number, detailingRegionIndex: number, topRebarIndex: number): Promise<cDetailingGetOneDetailedSlab_OneDetailingOutput_OneStrip_OneDetailingRegion_OneTopRebar_Bar1InfoResult> {
    return this.transport.request<cDetailingGetOneDetailedSlab_OneDetailingOutput_OneStrip_OneDetailingRegion_OneTopRebar_Bar1InfoResult>({
      api: "cDetailing",
      method: "GetOneDetailedSlab_OneDetailingOutput_OneStrip_OneDetailingRegion_OneTopRebar_Bar1Info",
      parameters: {
        DetailingOutputIndex: detailingOutputIndex,
        StripIndex: stripIndex,
        DetailingRegionIndex: detailingRegionIndex,
        TopRebarIndex: topRebarIndex,
      },
    });
  }

  getOneDetailedSlab_OneDetailingOutput_OneStrip_OneDetailingRegion_OneTopRebar_Bar2Info(detailingOutputIndex: number, stripIndex: number, detailingRegionIndex: number, topRebarIndex: number): Promise<cDetailingGetOneDetailedSlab_OneDetailingOutput_OneStrip_OneDetailingRegion_OneTopRebar_Bar2InfoResult> {
    return this.transport.request<cDetailingGetOneDetailedSlab_OneDetailingOutput_OneStrip_OneDetailingRegion_OneTopRebar_Bar2InfoResult>({
      api: "cDetailing",
      method: "GetOneDetailedSlab_OneDetailingOutput_OneStrip_OneDetailingRegion_OneTopRebar_Bar2Info",
      parameters: {
        DetailingOutputIndex: detailingOutputIndex,
        StripIndex: stripIndex,
        DetailingRegionIndex: detailingRegionIndex,
        TopRebarIndex: topRebarIndex,
      },
    });
  }

  getOneDetailedSlab_OneDetailingOutput_OneStrip_OneDetailingRegion_OneTopRebarInfo(detailingOutputIndex: number, stripIndex: number, detailingRegionIndex: number, topRebarIndex: number): Promise<cDetailingGetOneDetailedSlab_OneDetailingOutput_OneStrip_OneDetailingRegion_OneTopRebarInfoResult> {
    return this.transport.request<cDetailingGetOneDetailedSlab_OneDetailingOutput_OneStrip_OneDetailingRegion_OneTopRebarInfoResult>({
      api: "cDetailing",
      method: "GetOneDetailedSlab_OneDetailingOutput_OneStrip_OneDetailingRegion_OneTopRebarInfo",
      parameters: {
        DetailingOutputIndex: detailingOutputIndex,
        StripIndex: stripIndex,
        DetailingRegionIndex: detailingRegionIndex,
        TopRebarIndex: topRebarIndex,
      },
    });
  }

  getOneDetailedSlab_OneDetailingOutput_OneStrip_OneDetailingRegionInfo(detailingOutputIndex: number, stripIndex: number, detailingRegionIndex: number): Promise<cDetailingGetOneDetailedSlab_OneDetailingOutput_OneStrip_OneDetailingRegionInfoResult> {
    return this.transport.request<cDetailingGetOneDetailedSlab_OneDetailingOutput_OneStrip_OneDetailingRegionInfoResult>({
      api: "cDetailing",
      method: "GetOneDetailedSlab_OneDetailingOutput_OneStrip_OneDetailingRegionInfo",
      parameters: {
        DetailingOutputIndex: detailingOutputIndex,
        StripIndex: stripIndex,
        DetailingRegionIndex: detailingRegionIndex,
      },
    });
  }

  getOneDetailedSlab_OneDetailingOutput_StripGUID(detailingOutputIndex: number, stripIndex: number): Promise<cDetailingGetOneDetailedSlab_OneDetailingOutput_StripGUIDResult> {
    return this.transport.request<cDetailingGetOneDetailedSlab_OneDetailingOutput_StripGUIDResult>({
      api: "cDetailing",
      method: "GetOneDetailedSlab_OneDetailingOutput_StripGUID",
      parameters: {
        DetailingOutputIndex: detailingOutputIndex,
        StripIndex: stripIndex,
      },
    });
  }

  getOneDetailedSlab_OneDetailingOutput_StripInfo(detailingOutputIndex: number, stripIndex: number): Promise<cDetailingGetOneDetailedSlab_OneDetailingOutput_StripInfoResult> {
    return this.transport.request<cDetailingGetOneDetailedSlab_OneDetailingOutput_StripInfoResult>({
      api: "cDetailing",
      method: "GetOneDetailedSlab_OneDetailingOutput_StripInfo",
      parameters: {
        DetailingOutputIndex: detailingOutputIndex,
        StripIndex: stripIndex,
      },
    });
  }

  getSimilarBeamLines(beamLineID: string): Promise<cDetailingGetSimilarBeamLinesResult> {
    return this.transport.request<cDetailingGetSimilarBeamLinesResult>({
      api: "cDetailing",
      method: "GetSimilarBeamLines",
      parameters: {
        BeamLineID: beamLineID,
      },
    });
  }

  getSimilarBeamLines_1(towerName: string, storyName: string, beamLineID: string): Promise<cDetailingGetSimilarBeamLines_1Result> {
    return this.transport.request<cDetailingGetSimilarBeamLines_1Result>({
      api: "cDetailing",
      method: "GetSimilarBeamLines_1",
      parameters: {
        TowerName: towerName,
        StoryName: storyName,
        BeamLineID: beamLineID,
      },
    });
  }

  getSimilarColumnStacks(columnStackID: string): Promise<cDetailingGetSimilarColumnStacksResult> {
    return this.transport.request<cDetailingGetSimilarColumnStacksResult>({
      api: "cDetailing",
      method: "GetSimilarColumnStacks",
      parameters: {
        ColumnStackID: columnStackID,
      },
    });
  }

  getSimilarSlabs(slabName: string): Promise<cDetailingGetSimilarSlabsResult> {
    return this.transport.request<cDetailingGetSimilarSlabsResult>({
      api: "cDetailing",
      method: "GetSimilarSlabs",
      parameters: {
        SlabName: slabName,
      },
    });
  }

  startDetailing(overwriteExisting: boolean): Promise<void> {
    return this.transport.request<void>({
      api: "cDetailing",
      method: "StartDetailing",
      parameters: {
        OverwriteExisting: overwriteExisting,
      },
    });
  }

}

export class cDiaphragmApi {
  constructor(private readonly transport: EtabsTransport) {}

  changeName(name: string, newName: string): Promise<void> {
    return this.transport.request<void>({
      api: "cDiaphragm",
      method: "ChangeName",
      parameters: {
        Name: name,
        NewName: newName,
      },
    });
  }

  delete_(name: string): Promise<void> {
    return this.transport.request<void>({
      api: "cDiaphragm",
      method: "Delete",
      parameters: {
        Name: name,
      },
    });
  }

  getDiaphragm(name: string): Promise<cDiaphragmGetDiaphragmResult> {
    return this.transport.request<cDiaphragmGetDiaphragmResult>({
      api: "cDiaphragm",
      method: "GetDiaphragm",
      parameters: {
        Name: name,
      },
    });
  }

  getNameList(): Promise<cDiaphragmGetNameListResult> {
    return this.transport.request<cDiaphragmGetNameListResult>({
      api: "cDiaphragm",
      method: "GetNameList",
    });
  }

  setDiaphragm(name: string, semiRigid: boolean): Promise<void> {
    return this.transport.request<void>({
      api: "cDiaphragm",
      method: "SetDiaphragm",
      parameters: {
        Name: name,
        SemiRigid: semiRigid,
      },
    });
  }

}

export class cDStAISC_LRFD93Api {
  constructor(private readonly transport: EtabsTransport) {}

  getOverwrite(name: string, item: number): Promise<cDStAISC_LRFD93GetOverwriteResult> {
    return this.transport.request<cDStAISC_LRFD93GetOverwriteResult>({
      api: "cDStAISC_LRFD93",
      method: "GetOverwrite",
      parameters: {
        Name: name,
        Item: item,
      },
    });
  }

  getPreference(item: number): Promise<cDStAISC_LRFD93GetPreferenceResult> {
    return this.transport.request<cDStAISC_LRFD93GetPreferenceResult>({
      api: "cDStAISC_LRFD93",
      method: "GetPreference",
      parameters: {
        Item: item,
      },
    });
  }

  setOverwrite(name: string, item: number, value: number, itemType?: eItemType): Promise<void> {
    return this.transport.request<void>({
      api: "cDStAISC_LRFD93",
      method: "SetOverwrite",
      parameters: {
        Name: name,
        Item: item,
        Value: value,
        ItemType: itemType,
      },
    });
  }

  setPreference(item: number, value: number): Promise<void> {
    return this.transport.request<void>({
      api: "cDStAISC_LRFD93",
      method: "SetPreference",
      parameters: {
        Item: item,
        Value: value,
      },
    });
  }

}

export class cDStAISC360_05_IBC2006Api {
  constructor(private readonly transport: EtabsTransport) {}

  getOverwrite(name: string, item: number): Promise<cDStAISC360_05_IBC2006GetOverwriteResult> {
    return this.transport.request<cDStAISC360_05_IBC2006GetOverwriteResult>({
      api: "cDStAISC360_05_IBC2006",
      method: "GetOverwrite",
      parameters: {
        Name: name,
        Item: item,
      },
    });
  }

  getPreference(item: number): Promise<cDStAISC360_05_IBC2006GetPreferenceResult> {
    return this.transport.request<cDStAISC360_05_IBC2006GetPreferenceResult>({
      api: "cDStAISC360_05_IBC2006",
      method: "GetPreference",
      parameters: {
        Item: item,
      },
    });
  }

  setOverwrite(name: string, item: number, value: number, itemType?: eItemType): Promise<void> {
    return this.transport.request<void>({
      api: "cDStAISC360_05_IBC2006",
      method: "SetOverwrite",
      parameters: {
        Name: name,
        Item: item,
        Value: value,
        ItemType: itemType,
      },
    });
  }

  setPreference(item: number, value: number): Promise<void> {
    return this.transport.request<void>({
      api: "cDStAISC360_05_IBC2006",
      method: "SetPreference",
      parameters: {
        Item: item,
        Value: value,
      },
    });
  }

}

export class cDStAISC360_10Api {
  constructor(private readonly transport: EtabsTransport) {}

  getOverwrite(name: string, item: number): Promise<cDStAISC360_10GetOverwriteResult> {
    return this.transport.request<cDStAISC360_10GetOverwriteResult>({
      api: "cDStAISC360_10",
      method: "GetOverwrite",
      parameters: {
        Name: name,
        Item: item,
      },
    });
  }

  getPreference(item: number): Promise<cDStAISC360_10GetPreferenceResult> {
    return this.transport.request<cDStAISC360_10GetPreferenceResult>({
      api: "cDStAISC360_10",
      method: "GetPreference",
      parameters: {
        Item: item,
      },
    });
  }

  setOverwrite(name: string, item: number, value: number, itemType?: eItemType): Promise<void> {
    return this.transport.request<void>({
      api: "cDStAISC360_10",
      method: "SetOverwrite",
      parameters: {
        Name: name,
        Item: item,
        Value: value,
        ItemType: itemType,
      },
    });
  }

  setPreference(item: number, value: number): Promise<void> {
    return this.transport.request<void>({
      api: "cDStAISC360_10",
      method: "SetPreference",
      parameters: {
        Item: item,
        Value: value,
      },
    });
  }

}

export class cDStAISC360_16Api {
  constructor(private readonly transport: EtabsTransport) {}

  getOverwrite(name: string, item: number): Promise<cDStAISC360_16GetOverwriteResult> {
    return this.transport.request<cDStAISC360_16GetOverwriteResult>({
      api: "cDStAISC360_16",
      method: "GetOverwrite",
      parameters: {
        Name: name,
        Item: item,
      },
    });
  }

  getPreference(item: number): Promise<cDStAISC360_16GetPreferenceResult> {
    return this.transport.request<cDStAISC360_16GetPreferenceResult>({
      api: "cDStAISC360_16",
      method: "GetPreference",
      parameters: {
        Item: item,
      },
    });
  }

  setOverwrite(name: string, item: number, value: number, itemType?: eItemType): Promise<void> {
    return this.transport.request<void>({
      api: "cDStAISC360_16",
      method: "SetOverwrite",
      parameters: {
        Name: name,
        Item: item,
        Value: value,
        ItemType: itemType,
      },
    });
  }

  setPreference(item: number, value: number): Promise<void> {
    return this.transport.request<void>({
      api: "cDStAISC360_16",
      method: "SetPreference",
      parameters: {
        Item: item,
        Value: value,
      },
    });
  }

}

export class cDStAISC360_22Api {
  constructor(private readonly transport: EtabsTransport) {}

  getOverwrite(name: string, item: number): Promise<cDStAISC360_22GetOverwriteResult> {
    return this.transport.request<cDStAISC360_22GetOverwriteResult>({
      api: "cDStAISC360_22",
      method: "GetOverwrite",
      parameters: {
        Name: name,
        Item: item,
      },
    });
  }

  getPreference(item: number): Promise<cDStAISC360_22GetPreferenceResult> {
    return this.transport.request<cDStAISC360_22GetPreferenceResult>({
      api: "cDStAISC360_22",
      method: "GetPreference",
      parameters: {
        Item: item,
      },
    });
  }

  setOverwrite(name: string, item: number, value: number, itemType?: eItemType): Promise<void> {
    return this.transport.request<void>({
      api: "cDStAISC360_22",
      method: "SetOverwrite",
      parameters: {
        Name: name,
        Item: item,
        Value: value,
        ItemType: itemType,
      },
    });
  }

  setPreference(item: number, value: number): Promise<void> {
    return this.transport.request<void>({
      api: "cDStAISC360_22",
      method: "SetPreference",
      parameters: {
        Item: item,
        Value: value,
      },
    });
  }

}

export class cDStAustralian_AS4100_2020Api {
  constructor(private readonly transport: EtabsTransport) {}

  getOverwrite(name: string, item: number): Promise<cDStAustralian_AS4100_2020GetOverwriteResult> {
    return this.transport.request<cDStAustralian_AS4100_2020GetOverwriteResult>({
      api: "cDStAustralian_AS4100_2020",
      method: "GetOverwrite",
      parameters: {
        Name: name,
        Item: item,
      },
    });
  }

  getPreference(item: number): Promise<cDStAustralian_AS4100_2020GetPreferenceResult> {
    return this.transport.request<cDStAustralian_AS4100_2020GetPreferenceResult>({
      api: "cDStAustralian_AS4100_2020",
      method: "GetPreference",
      parameters: {
        Item: item,
      },
    });
  }

  setOverwrite(name: string, item: number, value: number, itemType?: eItemType): Promise<void> {
    return this.transport.request<void>({
      api: "cDStAustralian_AS4100_2020",
      method: "SetOverwrite",
      parameters: {
        Name: name,
        Item: item,
        Value: value,
        ItemType: itemType,
      },
    });
  }

  setPreference(item: number, value: number): Promise<void> {
    return this.transport.request<void>({
      api: "cDStAustralian_AS4100_2020",
      method: "SetPreference",
      parameters: {
        Item: item,
        Value: value,
      },
    });
  }

}

export class cDStAustralian_AS4100_98Api {
  constructor(private readonly transport: EtabsTransport) {}

  getOverwrite(name: string, item: number): Promise<cDStAustralian_AS4100_98GetOverwriteResult> {
    return this.transport.request<cDStAustralian_AS4100_98GetOverwriteResult>({
      api: "cDStAustralian_AS4100_98",
      method: "GetOverwrite",
      parameters: {
        Name: name,
        Item: item,
      },
    });
  }

  getPreference(item: number): Promise<cDStAustralian_AS4100_98GetPreferenceResult> {
    return this.transport.request<cDStAustralian_AS4100_98GetPreferenceResult>({
      api: "cDStAustralian_AS4100_98",
      method: "GetPreference",
      parameters: {
        Item: item,
      },
    });
  }

  setOverwrite(name: string, item: number, value: number, itemType?: eItemType): Promise<void> {
    return this.transport.request<void>({
      api: "cDStAustralian_AS4100_98",
      method: "SetOverwrite",
      parameters: {
        Name: name,
        Item: item,
        Value: value,
        ItemType: itemType,
      },
    });
  }

  setPreference(item: number, value: number): Promise<void> {
    return this.transport.request<void>({
      api: "cDStAustralian_AS4100_98",
      method: "SetPreference",
      parameters: {
        Item: item,
        Value: value,
      },
    });
  }

}

export class cDStBS5950_2000Api {
  constructor(private readonly transport: EtabsTransport) {}

  getOverwrite(name: string, item: number): Promise<cDStBS5950_2000GetOverwriteResult> {
    return this.transport.request<cDStBS5950_2000GetOverwriteResult>({
      api: "cDStBS5950_2000",
      method: "GetOverwrite",
      parameters: {
        Name: name,
        Item: item,
      },
    });
  }

  getPreference(item: number): Promise<cDStBS5950_2000GetPreferenceResult> {
    return this.transport.request<cDStBS5950_2000GetPreferenceResult>({
      api: "cDStBS5950_2000",
      method: "GetPreference",
      parameters: {
        Item: item,
      },
    });
  }

  setOverwrite(name: string, item: number, value: number, itemType?: eItemType): Promise<void> {
    return this.transport.request<void>({
      api: "cDStBS5950_2000",
      method: "SetOverwrite",
      parameters: {
        Name: name,
        Item: item,
        Value: value,
        ItemType: itemType,
      },
    });
  }

  setPreference(item: number, value: number): Promise<void> {
    return this.transport.request<void>({
      api: "cDStBS5950_2000",
      method: "SetPreference",
      parameters: {
        Item: item,
        Value: value,
      },
    });
  }

}

export class cDStCanadian_S16_09Api {
  constructor(private readonly transport: EtabsTransport) {}

  getOverwrite(name: string, item: number): Promise<cDStCanadian_S16_09GetOverwriteResult> {
    return this.transport.request<cDStCanadian_S16_09GetOverwriteResult>({
      api: "cDStCanadian_S16_09",
      method: "GetOverwrite",
      parameters: {
        Name: name,
        Item: item,
      },
    });
  }

  getPreference(item: number): Promise<cDStCanadian_S16_09GetPreferenceResult> {
    return this.transport.request<cDStCanadian_S16_09GetPreferenceResult>({
      api: "cDStCanadian_S16_09",
      method: "GetPreference",
      parameters: {
        Item: item,
      },
    });
  }

  setOverwrite(name: string, item: number, value: number, itemType?: eItemType): Promise<void> {
    return this.transport.request<void>({
      api: "cDStCanadian_S16_09",
      method: "SetOverwrite",
      parameters: {
        Name: name,
        Item: item,
        Value: value,
        ItemType: itemType,
      },
    });
  }

  setPreference(item: number, value: number): Promise<void> {
    return this.transport.request<void>({
      api: "cDStCanadian_S16_09",
      method: "SetPreference",
      parameters: {
        Item: item,
        Value: value,
      },
    });
  }

}

export class cDStCanadian_S16_14Api {
  constructor(private readonly transport: EtabsTransport) {}

  getOverwrite(name: string, item: number): Promise<cDStCanadian_S16_14GetOverwriteResult> {
    return this.transport.request<cDStCanadian_S16_14GetOverwriteResult>({
      api: "cDStCanadian_S16_14",
      method: "GetOverwrite",
      parameters: {
        Name: name,
        Item: item,
      },
    });
  }

  getPreference(item: number): Promise<cDStCanadian_S16_14GetPreferenceResult> {
    return this.transport.request<cDStCanadian_S16_14GetPreferenceResult>({
      api: "cDStCanadian_S16_14",
      method: "GetPreference",
      parameters: {
        Item: item,
      },
    });
  }

  setOverwrite(name: string, item: number, value: number, itemType?: eItemType): Promise<void> {
    return this.transport.request<void>({
      api: "cDStCanadian_S16_14",
      method: "SetOverwrite",
      parameters: {
        Name: name,
        Item: item,
        Value: value,
        ItemType: itemType,
      },
    });
  }

  setPreference(item: number, value: number): Promise<void> {
    return this.transport.request<void>({
      api: "cDStCanadian_S16_14",
      method: "SetPreference",
      parameters: {
        Item: item,
        Value: value,
      },
    });
  }

}

export class cDStCanadian_S16_19Api {
  constructor(private readonly transport: EtabsTransport) {}

  getOverwrite(name: string, item: number): Promise<cDStCanadian_S16_19GetOverwriteResult> {
    return this.transport.request<cDStCanadian_S16_19GetOverwriteResult>({
      api: "cDStCanadian_S16_19",
      method: "GetOverwrite",
      parameters: {
        Name: name,
        Item: item,
      },
    });
  }

  getPreference(item: number): Promise<cDStCanadian_S16_19GetPreferenceResult> {
    return this.transport.request<cDStCanadian_S16_19GetPreferenceResult>({
      api: "cDStCanadian_S16_19",
      method: "GetPreference",
      parameters: {
        Item: item,
      },
    });
  }

  setOverwrite(name: string, item: number, value: number, itemType?: eItemType): Promise<void> {
    return this.transport.request<void>({
      api: "cDStCanadian_S16_19",
      method: "SetOverwrite",
      parameters: {
        Name: name,
        Item: item,
        Value: value,
        ItemType: itemType,
      },
    });
  }

  setPreference(item: number, value: number): Promise<void> {
    return this.transport.request<void>({
      api: "cDStCanadian_S16_19",
      method: "SetPreference",
      parameters: {
        Item: item,
        Value: value,
      },
    });
  }

}

export class cDStCanadian_S16_24Api {
  constructor(private readonly transport: EtabsTransport) {}

  getOverwrite(name: string, item: number): Promise<cDStCanadian_S16_24GetOverwriteResult> {
    return this.transport.request<cDStCanadian_S16_24GetOverwriteResult>({
      api: "cDStCanadian_S16_24",
      method: "GetOverwrite",
      parameters: {
        Name: name,
        Item: item,
      },
    });
  }

  getPreference(item: number): Promise<cDStCanadian_S16_24GetPreferenceResult> {
    return this.transport.request<cDStCanadian_S16_24GetPreferenceResult>({
      api: "cDStCanadian_S16_24",
      method: "GetPreference",
      parameters: {
        Item: item,
      },
    });
  }

  setOverwrite(name: string, item: number, value: number, itemType?: eItemType): Promise<void> {
    return this.transport.request<void>({
      api: "cDStCanadian_S16_24",
      method: "SetOverwrite",
      parameters: {
        Name: name,
        Item: item,
        Value: value,
        ItemType: itemType,
      },
    });
  }

  setPreference(item: number, value: number): Promise<void> {
    return this.transport.request<void>({
      api: "cDStCanadian_S16_24",
      method: "SetPreference",
      parameters: {
        Item: item,
        Value: value,
      },
    });
  }

}

export class cDStChinese_2010Api {
  constructor(private readonly transport: EtabsTransport) {}

  getOverwrite(name: string, item: number): Promise<cDStChinese_2010GetOverwriteResult> {
    return this.transport.request<cDStChinese_2010GetOverwriteResult>({
      api: "cDStChinese_2010",
      method: "GetOverwrite",
      parameters: {
        Name: name,
        Item: item,
      },
    });
  }

  getPreference(item: number): Promise<cDStChinese_2010GetPreferenceResult> {
    return this.transport.request<cDStChinese_2010GetPreferenceResult>({
      api: "cDStChinese_2010",
      method: "GetPreference",
      parameters: {
        Item: item,
      },
    });
  }

  setOverwrite(name: string, item: number, value: number, itemType?: eItemType): Promise<void> {
    return this.transport.request<void>({
      api: "cDStChinese_2010",
      method: "SetOverwrite",
      parameters: {
        Name: name,
        Item: item,
        Value: value,
        ItemType: itemType,
      },
    });
  }

  setPreference(item: number, value: number): Promise<void> {
    return this.transport.request<void>({
      api: "cDStChinese_2010",
      method: "SetPreference",
      parameters: {
        Item: item,
        Value: value,
      },
    });
  }

}

export class cDStChinese_2018Api {
  constructor(private readonly transport: EtabsTransport) {}

  getOverwrite(name: string, item: number): Promise<cDStChinese_2018GetOverwriteResult> {
    return this.transport.request<cDStChinese_2018GetOverwriteResult>({
      api: "cDStChinese_2018",
      method: "GetOverwrite",
      parameters: {
        Name: name,
        Item: item,
      },
    });
  }

  getPreference(item: number): Promise<cDStChinese_2018GetPreferenceResult> {
    return this.transport.request<cDStChinese_2018GetPreferenceResult>({
      api: "cDStChinese_2018",
      method: "GetPreference",
      parameters: {
        Item: item,
      },
    });
  }

  setOverwrite(name: string, item: number, value: number, itemType?: eItemType): Promise<void> {
    return this.transport.request<void>({
      api: "cDStChinese_2018",
      method: "SetOverwrite",
      parameters: {
        Name: name,
        Item: item,
        Value: value,
        ItemType: itemType,
      },
    });
  }

  setPreference(item: number, value: number): Promise<void> {
    return this.transport.request<void>({
      api: "cDStChinese_2018",
      method: "SetPreference",
      parameters: {
        Item: item,
        Value: value,
      },
    });
  }

}

export class cDStEN1993_1_1_2005Api {
  constructor(private readonly transport: EtabsTransport) {}

  getOverwrite(name: string, item: number): Promise<cDStEN1993_1_1_2005GetOverwriteResult> {
    return this.transport.request<cDStEN1993_1_1_2005GetOverwriteResult>({
      api: "cDStEN1993_1_1_2005",
      method: "GetOverwrite",
      parameters: {
        Name: name,
        Item: item,
      },
    });
  }

  getPreference(item: number): Promise<cDStEN1993_1_1_2005GetPreferenceResult> {
    return this.transport.request<cDStEN1993_1_1_2005GetPreferenceResult>({
      api: "cDStEN1993_1_1_2005",
      method: "GetPreference",
      parameters: {
        Item: item,
      },
    });
  }

  setOverwrite(name: string, item: number, value: number, itemType?: eItemType): Promise<void> {
    return this.transport.request<void>({
      api: "cDStEN1993_1_1_2005",
      method: "SetOverwrite",
      parameters: {
        Name: name,
        Item: item,
        Value: value,
        ItemType: itemType,
      },
    });
  }

  setPreference(item: number, value: number): Promise<void> {
    return this.transport.request<void>({
      api: "cDStEN1993_1_1_2005",
      method: "SetPreference",
      parameters: {
        Item: item,
        Value: value,
      },
    });
  }

}

export class cDStEurocode_3_2005Api {
  constructor(private readonly transport: EtabsTransport) {}

  getOverwrite(name: string, item: number): Promise<cDStEurocode_3_2005GetOverwriteResult> {
    return this.transport.request<cDStEurocode_3_2005GetOverwriteResult>({
      api: "cDStEurocode_3_2005",
      method: "GetOverwrite",
      parameters: {
        Name: name,
        Item: item,
      },
    });
  }

  getPreference(item: number): Promise<cDStEurocode_3_2005GetPreferenceResult> {
    return this.transport.request<cDStEurocode_3_2005GetPreferenceResult>({
      api: "cDStEurocode_3_2005",
      method: "GetPreference",
      parameters: {
        Item: item,
      },
    });
  }

  setOverwrite(name: string, item: number, value: number, itemType?: eItemType): Promise<void> {
    return this.transport.request<void>({
      api: "cDStEurocode_3_2005",
      method: "SetOverwrite",
      parameters: {
        Name: name,
        Item: item,
        Value: value,
        ItemType: itemType,
      },
    });
  }

  setPreference(item: number, value: number): Promise<void> {
    return this.transport.request<void>({
      api: "cDStEurocode_3_2005",
      method: "SetPreference",
      parameters: {
        Item: item,
        Value: value,
      },
    });
  }

}

export class cDStIndian_IS_800_2007Api {
  constructor(private readonly transport: EtabsTransport) {}

  getOverwrite(name: string, item: number): Promise<cDStIndian_IS_800_2007GetOverwriteResult> {
    return this.transport.request<cDStIndian_IS_800_2007GetOverwriteResult>({
      api: "cDStIndian_IS_800_2007",
      method: "GetOverwrite",
      parameters: {
        Name: name,
        Item: item,
      },
    });
  }

  getPreference(item: number): Promise<cDStIndian_IS_800_2007GetPreferenceResult> {
    return this.transport.request<cDStIndian_IS_800_2007GetPreferenceResult>({
      api: "cDStIndian_IS_800_2007",
      method: "GetPreference",
      parameters: {
        Item: item,
      },
    });
  }

  setOverwrite(name: string, item: number, value: number, itemType?: eItemType): Promise<void> {
    return this.transport.request<void>({
      api: "cDStIndian_IS_800_2007",
      method: "SetOverwrite",
      parameters: {
        Name: name,
        Item: item,
        Value: value,
        ItemType: itemType,
      },
    });
  }

  setPreference(item: number, value: number): Promise<void> {
    return this.transport.request<void>({
      api: "cDStIndian_IS_800_2007",
      method: "SetPreference",
      parameters: {
        Item: item,
        Value: value,
      },
    });
  }

}

export class cDStItalianNTC2008SApi {
  constructor(private readonly transport: EtabsTransport) {}

  getOverwrite(name: string, item: number): Promise<cDStItalianNTC2008SGetOverwriteResult> {
    return this.transport.request<cDStItalianNTC2008SGetOverwriteResult>({
      api: "cDStItalianNTC2008S",
      method: "GetOverwrite",
      parameters: {
        Name: name,
        Item: item,
      },
    });
  }

  getPreference(item: number): Promise<cDStItalianNTC2008SGetPreferenceResult> {
    return this.transport.request<cDStItalianNTC2008SGetPreferenceResult>({
      api: "cDStItalianNTC2008S",
      method: "GetPreference",
      parameters: {
        Item: item,
      },
    });
  }

  setOverwrite(name: string, item: number, value: number, itemType?: eItemType): Promise<void> {
    return this.transport.request<void>({
      api: "cDStItalianNTC2008S",
      method: "SetOverwrite",
      parameters: {
        Name: name,
        Item: item,
        Value: value,
        ItemType: itemType,
      },
    });
  }

  setPreference(item: number, value: number): Promise<void> {
    return this.transport.request<void>({
      api: "cDStItalianNTC2008S",
      method: "SetPreference",
      parameters: {
        Item: item,
        Value: value,
      },
    });
  }

}

export class cDStItalianNTC2018SApi {
  constructor(private readonly transport: EtabsTransport) {}

  getOverwrite(name: string, item: number): Promise<cDStItalianNTC2018SGetOverwriteResult> {
    return this.transport.request<cDStItalianNTC2018SGetOverwriteResult>({
      api: "cDStItalianNTC2018S",
      method: "GetOverwrite",
      parameters: {
        Name: name,
        Item: item,
      },
    });
  }

  getPreference(item: number): Promise<cDStItalianNTC2018SGetPreferenceResult> {
    return this.transport.request<cDStItalianNTC2018SGetPreferenceResult>({
      api: "cDStItalianNTC2018S",
      method: "GetPreference",
      parameters: {
        Item: item,
      },
    });
  }

  setOverwrite(name: string, item: number, textValue: string, numericValue: number, itemType?: eItemType): Promise<void> {
    return this.transport.request<void>({
      api: "cDStItalianNTC2018S",
      method: "SetOverwrite",
      parameters: {
        Name: name,
        Item: item,
        textValue: textValue,
        numericValue: numericValue,
        ItemType: itemType,
      },
    });
  }

  setPreference(item: number, textValue: string, numericValue: number): Promise<void> {
    return this.transport.request<void>({
      api: "cDStItalianNTC2018S",
      method: "SetPreference",
      parameters: {
        Item: item,
        textValue: textValue,
        numericValue: numericValue,
      },
    });
  }

}

export class cDStNewZealand_NZS3404_97Api {
  constructor(private readonly transport: EtabsTransport) {}

  getOverwrite(name: string, item: number): Promise<cDStNewZealand_NZS3404_97GetOverwriteResult> {
    return this.transport.request<cDStNewZealand_NZS3404_97GetOverwriteResult>({
      api: "cDStNewZealand_NZS3404_97",
      method: "GetOverwrite",
      parameters: {
        Name: name,
        Item: item,
      },
    });
  }

  getPreference(item: number): Promise<cDStNewZealand_NZS3404_97GetPreferenceResult> {
    return this.transport.request<cDStNewZealand_NZS3404_97GetPreferenceResult>({
      api: "cDStNewZealand_NZS3404_97",
      method: "GetPreference",
      parameters: {
        Item: item,
      },
    });
  }

  setOverwrite(name: string, item: number, value: number, itemType?: eItemType): Promise<void> {
    return this.transport.request<void>({
      api: "cDStNewZealand_NZS3404_97",
      method: "SetOverwrite",
      parameters: {
        Name: name,
        Item: item,
        Value: value,
        ItemType: itemType,
      },
    });
  }

  setPreference(item: number, value: number): Promise<void> {
    return this.transport.request<void>({
      api: "cDStNewZealand_NZS3404_97",
      method: "SetPreference",
      parameters: {
        Item: item,
        Value: value,
      },
    });
  }

}

export class cDStSP16_13330_2011Api {
  constructor(private readonly transport: EtabsTransport) {}

  getOverwrite(name: string, item: number): Promise<cDStSP16_13330_2011GetOverwriteResult> {
    return this.transport.request<cDStSP16_13330_2011GetOverwriteResult>({
      api: "cDStSP16_13330_2011",
      method: "GetOverwrite",
      parameters: {
        Name: name,
        Item: item,
      },
    });
  }

  getPreference(item: number): Promise<cDStSP16_13330_2011GetPreferenceResult> {
    return this.transport.request<cDStSP16_13330_2011GetPreferenceResult>({
      api: "cDStSP16_13330_2011",
      method: "GetPreference",
      parameters: {
        Item: item,
      },
    });
  }

  setOverwrite(name: string, item: number, value: number, itemType?: eItemType): Promise<void> {
    return this.transport.request<void>({
      api: "cDStSP16_13330_2011",
      method: "SetOverwrite",
      parameters: {
        Name: name,
        Item: item,
        Value: value,
        ItemType: itemType,
      },
    });
  }

  setPreference(item: number, value: number): Promise<void> {
    return this.transport.request<void>({
      api: "cDStSP16_13330_2011",
      method: "SetPreference",
      parameters: {
        Item: item,
        Value: value,
      },
    });
  }

}

export class cEditAreaApi {
  constructor(private readonly transport: EtabsTransport) {}

}

export class cEditFrameApi {
  constructor(private readonly transport: EtabsTransport) {}

  changeConnectivity(name: string, point1: string, point2: string): Promise<void> {
    return this.transport.request<void>({
      api: "cEditFrame",
      method: "ChangeConnectivity",
      parameters: {
        Name: name,
        Point1: point1,
        Point2: point2,
      },
    });
  }

}

export class cEditGeneralApi {
  constructor(private readonly transport: EtabsTransport) {}

  move(dX: number, dY: number, dZ: number): Promise<void> {
    return this.transport.request<void>({
      api: "cEditGeneral",
      method: "Move",
      parameters: {
        DX: dX,
        DY: dY,
        DZ: dZ,
      },
    });
  }

}

export class cEditPointApi {
  constructor(private readonly transport: EtabsTransport) {}

}

export class cFileApi {
  constructor(private readonly transport: EtabsTransport) {}

  exportFile(fileName: string, fileType: eFileTypeIO): Promise<void> {
    return this.transport.request<void>({
      api: "cFile",
      method: "ExportFile",
      parameters: {
        FileName: fileName,
        FileType: fileType,
      },
    });
  }

  getFilePath(): Promise<cFileGetFilePathResult> {
    return this.transport.request<cFileGetFilePathResult>({
      api: "cFile",
      method: "GetFilePath",
    });
  }

  importFile(fileName: string, fileType: eFileTypeIO, type: number): Promise<void> {
    return this.transport.request<void>({
      api: "cFile",
      method: "ImportFile",
      parameters: {
        FileName: fileName,
        FileType: fileType,
        Type: type,
      },
    });
  }

  newBlank(): Promise<void> {
    return this.transport.request<void>({
      api: "cFile",
      method: "NewBlank",
    });
  }

  newGridOnly(numberStorys: number, typicalStoryHeight: number, bottomStoryHeight: number, numberLinesX: number, numberLinesY: number, spacingX: number, spacingY: number): Promise<void> {
    return this.transport.request<void>({
      api: "cFile",
      method: "NewGridOnly",
      parameters: {
        NumberStorys: numberStorys,
        TypicalStoryHeight: typicalStoryHeight,
        BottomStoryHeight: bottomStoryHeight,
        NumberLinesX: numberLinesX,
        NumberLinesY: numberLinesY,
        SpacingX: spacingX,
        SpacingY: spacingY,
      },
    });
  }

  newSteelDeck(numberStorys: number, typicalStoryHeight: number, bottomStoryHeight: number, numberLinesX: number, numberLinesY: number, spacingX: number, spacingY: number): Promise<void> {
    return this.transport.request<void>({
      api: "cFile",
      method: "NewSteelDeck",
      parameters: {
        NumberStorys: numberStorys,
        TypicalStoryHeight: typicalStoryHeight,
        BottomStoryHeight: bottomStoryHeight,
        NumberLinesX: numberLinesX,
        NumberLinesY: numberLinesY,
        SpacingX: spacingX,
        SpacingY: spacingY,
      },
    });
  }

  openFile(fileName: string): Promise<void> {
    return this.transport.request<void>({
      api: "cFile",
      method: "OpenFile",
      parameters: {
        FileName: fileName,
      },
    });
  }

  save(fileName?: string): Promise<void> {
    return this.transport.request<void>({
      api: "cFile",
      method: "Save",
      parameters: {
        FileName: fileName,
      },
    });
  }

}

export class cFrameObjApi {
  constructor(private readonly transport: EtabsTransport) {}

  addByCoord(xI: number, yI: number, zI: number, xJ: number, yJ: number, zJ: number, propName?: string, userName?: string, cSys?: string): Promise<cFrameObjAddByCoordResult> {
    return this.transport.request<cFrameObjAddByCoordResult>({
      api: "cFrameObj",
      method: "AddByCoord",
      parameters: {
        XI: xI,
        YI: yI,
        ZI: zI,
        XJ: xJ,
        YJ: yJ,
        ZJ: zJ,
        PropName: propName,
        UserName: userName,
        CSys: cSys,
      },
    });
  }

  addByPoint(point1: string, point2: string, propName?: string, userName?: string): Promise<cFrameObjAddByPointResult> {
    return this.transport.request<cFrameObjAddByPointResult>({
      api: "cFrameObj",
      method: "AddByPoint",
      parameters: {
        Point1: point1,
        Point2: point2,
        PropName: propName,
        UserName: userName,
      },
    });
  }

  changeName(name: string, newName: string): Promise<void> {
    return this.transport.request<void>({
      api: "cFrameObj",
      method: "ChangeName",
      parameters: {
        Name: name,
        NewName: newName,
      },
    });
  }

  count(myType?: string): Promise<number> {
    return this.transport.request<number>({
      api: "cFrameObj",
      method: "Count",
      parameters: {
        MyType: myType,
      },
    });
  }

  delete_(name: string, itemType?: eItemType): Promise<void> {
    return this.transport.request<void>({
      api: "cFrameObj",
      method: "Delete",
      parameters: {
        Name: name,
        ItemType: itemType,
      },
    });
  }

  deleteLateralBracing(name: string, myType?: number, itemType?: eItemType): Promise<void> {
    return this.transport.request<void>({
      api: "cFrameObj",
      method: "DeleteLateralBracing",
      parameters: {
        Name: name,
        MyType: myType,
        ItemType: itemType,
      },
    });
  }

  deleteLoadDistributed(name: string, loadPat: string, itemType?: eItemType): Promise<void> {
    return this.transport.request<void>({
      api: "cFrameObj",
      method: "DeleteLoadDistributed",
      parameters: {
        Name: name,
        LoadPat: loadPat,
        ItemType: itemType,
      },
    });
  }

  deleteLoadPoint(name: string, loadPat: string, itemType?: eItemType): Promise<void> {
    return this.transport.request<void>({
      api: "cFrameObj",
      method: "DeleteLoadPoint",
      parameters: {
        Name: name,
        LoadPat: loadPat,
        ItemType: itemType,
      },
    });
  }

  deleteLoadTemperature(name: string, loadPat: string, itemType?: eItemType): Promise<void> {
    return this.transport.request<void>({
      api: "cFrameObj",
      method: "DeleteLoadTemperature",
      parameters: {
        Name: name,
        LoadPat: loadPat,
        ItemType: itemType,
      },
    });
  }

  deleteMass(name: string, itemType?: eItemType): Promise<void> {
    return this.transport.request<void>({
      api: "cFrameObj",
      method: "DeleteMass",
      parameters: {
        Name: name,
        ItemType: itemType,
      },
    });
  }

  deleteModifiers(name: string, itemType?: eItemType): Promise<void> {
    return this.transport.request<void>({
      api: "cFrameObj",
      method: "DeleteModifiers",
      parameters: {
        Name: name,
        ItemType: itemType,
      },
    });
  }

  deleteSpring(name: string, itemType?: eItemType): Promise<void> {
    return this.transport.request<void>({
      api: "cFrameObj",
      method: "DeleteSpring",
      parameters: {
        Name: name,
        ItemType: itemType,
      },
    });
  }

  getAllFrames(csys?: string): Promise<cFrameObjGetAllFramesResult> {
    return this.transport.request<cFrameObjGetAllFramesResult>({
      api: "cFrameObj",
      method: "GetAllFrames",
      parameters: {
        csys: csys,
      },
    });
  }

  getColumnSpliceOverwrite(name: string): Promise<cFrameObjGetColumnSpliceOverwriteResult> {
    return this.transport.request<cFrameObjGetColumnSpliceOverwriteResult>({
      api: "cFrameObj",
      method: "GetColumnSpliceOverwrite",
      parameters: {
        Name: name,
      },
    });
  }

  getCurved_2(name: string): Promise<cFrameObjGetCurved_2Result> {
    return this.transport.request<cFrameObjGetCurved_2Result>({
      api: "cFrameObj",
      method: "GetCurved_2",
      parameters: {
        Name: name,
      },
    });
  }

  getDesignOrientation(name: string): Promise<cFrameObjGetDesignOrientationResult> {
    return this.transport.request<cFrameObjGetDesignOrientationResult>({
      api: "cFrameObj",
      method: "GetDesignOrientation",
      parameters: {
        Name: name,
      },
    });
  }

  getDesignProcedure(name: string): Promise<cFrameObjGetDesignProcedureResult> {
    return this.transport.request<cFrameObjGetDesignProcedureResult>({
      api: "cFrameObj",
      method: "GetDesignProcedure",
      parameters: {
        Name: name,
      },
    });
  }

  getElm(name: string): Promise<cFrameObjGetElmResult> {
    return this.transport.request<cFrameObjGetElmResult>({
      api: "cFrameObj",
      method: "GetElm",
      parameters: {
        Name: name,
      },
    });
  }

  getEndLengthOffset(name: string): Promise<cFrameObjGetEndLengthOffsetResult> {
    return this.transport.request<cFrameObjGetEndLengthOffsetResult>({
      api: "cFrameObj",
      method: "GetEndLengthOffset",
      parameters: {
        Name: name,
      },
    });
  }

  getGroupAssign(name: string): Promise<cFrameObjGetGroupAssignResult> {
    return this.transport.request<cFrameObjGetGroupAssignResult>({
      api: "cFrameObj",
      method: "GetGroupAssign",
      parameters: {
        Name: name,
      },
    });
  }

  getGUID(name: string): Promise<cFrameObjGetGUIDResult> {
    return this.transport.request<cFrameObjGetGUIDResult>({
      api: "cFrameObj",
      method: "GetGUID",
      parameters: {
        Name: name,
      },
    });
  }

  getHingeAssigns(name: string): Promise<cFrameObjGetHingeAssignsResult> {
    return this.transport.request<cFrameObjGetHingeAssignsResult>({
      api: "cFrameObj",
      method: "GetHingeAssigns",
      parameters: {
        Name: name,
      },
    });
  }

  getHingeAssigns_1(name: string): Promise<cFrameObjGetHingeAssigns_1Result> {
    return this.transport.request<cFrameObjGetHingeAssigns_1Result>({
      api: "cFrameObj",
      method: "GetHingeAssigns_1",
      parameters: {
        Name: name,
      },
    });
  }

  getInsertionPoint(name: string): Promise<cFrameObjGetInsertionPointResult> {
    return this.transport.request<cFrameObjGetInsertionPointResult>({
      api: "cFrameObj",
      method: "GetInsertionPoint",
      parameters: {
        Name: name,
      },
    });
  }

  getInsertionPoint_1(name: string): Promise<cFrameObjGetInsertionPoint_1Result> {
    return this.transport.request<cFrameObjGetInsertionPoint_1Result>({
      api: "cFrameObj",
      method: "GetInsertionPoint_1",
      parameters: {
        Name: name,
      },
    });
  }

  getLabelFromName(name: string): Promise<cFrameObjGetLabelFromNameResult> {
    return this.transport.request<cFrameObjGetLabelFromNameResult>({
      api: "cFrameObj",
      method: "GetLabelFromName",
      parameters: {
        Name: name,
      },
    });
  }

  getLabelNameList(): Promise<cFrameObjGetLabelNameListResult> {
    return this.transport.request<cFrameObjGetLabelNameListResult>({
      api: "cFrameObj",
      method: "GetLabelNameList",
    });
  }

  getLateralBracing(name: string): Promise<cFrameObjGetLateralBracingResult> {
    return this.transport.request<cFrameObjGetLateralBracingResult>({
      api: "cFrameObj",
      method: "GetLateralBracing",
      parameters: {
        Name: name,
      },
    });
  }

  getLoadDistributed(name: string, itemType?: eItemType): Promise<cFrameObjGetLoadDistributedResult> {
    return this.transport.request<cFrameObjGetLoadDistributedResult>({
      api: "cFrameObj",
      method: "GetLoadDistributed",
      parameters: {
        Name: name,
        ItemType: itemType,
      },
    });
  }

  getLoadPoint(name: string, itemType?: eItemType): Promise<cFrameObjGetLoadPointResult> {
    return this.transport.request<cFrameObjGetLoadPointResult>({
      api: "cFrameObj",
      method: "GetLoadPoint",
      parameters: {
        Name: name,
        ItemType: itemType,
      },
    });
  }

  getLoadTemperature(name: string, itemType?: eItemType): Promise<cFrameObjGetLoadTemperatureResult> {
    return this.transport.request<cFrameObjGetLoadTemperatureResult>({
      api: "cFrameObj",
      method: "GetLoadTemperature",
      parameters: {
        Name: name,
        ItemType: itemType,
      },
    });
  }

  getLocalAxes(name: string): Promise<cFrameObjGetLocalAxesResult> {
    return this.transport.request<cFrameObjGetLocalAxesResult>({
      api: "cFrameObj",
      method: "GetLocalAxes",
      parameters: {
        Name: name,
      },
    });
  }

  getMass(name: string): Promise<cFrameObjGetMassResult> {
    return this.transport.request<cFrameObjGetMassResult>({
      api: "cFrameObj",
      method: "GetMass",
      parameters: {
        Name: name,
      },
    });
  }

  getMaterialOverwrite(name: string): Promise<cFrameObjGetMaterialOverwriteResult> {
    return this.transport.request<cFrameObjGetMaterialOverwriteResult>({
      api: "cFrameObj",
      method: "GetMaterialOverwrite",
      parameters: {
        Name: name,
      },
    });
  }

  getModifiers(name: string): Promise<cFrameObjGetModifiersResult> {
    return this.transport.request<cFrameObjGetModifiersResult>({
      api: "cFrameObj",
      method: "GetModifiers",
      parameters: {
        Name: name,
      },
    });
  }

  getNameFromLabel(label: string, story: string): Promise<cFrameObjGetNameFromLabelResult> {
    return this.transport.request<cFrameObjGetNameFromLabelResult>({
      api: "cFrameObj",
      method: "GetNameFromLabel",
      parameters: {
        Label: label,
        Story: story,
      },
    });
  }

  getNameList(): Promise<cFrameObjGetNameListResult> {
    return this.transport.request<cFrameObjGetNameListResult>({
      api: "cFrameObj",
      method: "GetNameList",
    });
  }

  getNameListOnStory(storyName: string): Promise<cFrameObjGetNameListOnStoryResult> {
    return this.transport.request<cFrameObjGetNameListOnStoryResult>({
      api: "cFrameObj",
      method: "GetNameListOnStory",
      parameters: {
        StoryName: storyName,
      },
    });
  }

  getOutputStations(name: string): Promise<cFrameObjGetOutputStationsResult> {
    return this.transport.request<cFrameObjGetOutputStationsResult>({
      api: "cFrameObj",
      method: "GetOutputStations",
      parameters: {
        Name: name,
      },
    });
  }

  getPier(name: string): Promise<cFrameObjGetPierResult> {
    return this.transport.request<cFrameObjGetPierResult>({
      api: "cFrameObj",
      method: "GetPier",
      parameters: {
        Name: name,
      },
    });
  }

  getPoints(name: string): Promise<cFrameObjGetPointsResult> {
    return this.transport.request<cFrameObjGetPointsResult>({
      api: "cFrameObj",
      method: "GetPoints",
      parameters: {
        Name: name,
      },
    });
  }

  getReleases(name: string): Promise<cFrameObjGetReleasesResult> {
    return this.transport.request<cFrameObjGetReleasesResult>({
      api: "cFrameObj",
      method: "GetReleases",
      parameters: {
        Name: name,
      },
    });
  }

  getSection(name: string): Promise<cFrameObjGetSectionResult> {
    return this.transport.request<cFrameObjGetSectionResult>({
      api: "cFrameObj",
      method: "GetSection",
      parameters: {
        Name: name,
      },
    });
  }

  getSectionNonPrismatic(name: string): Promise<cFrameObjGetSectionNonPrismaticResult> {
    return this.transport.request<cFrameObjGetSectionNonPrismaticResult>({
      api: "cFrameObj",
      method: "GetSectionNonPrismatic",
      parameters: {
        Name: name,
      },
    });
  }

  getSelected(name: string): Promise<cFrameObjGetSelectedResult> {
    return this.transport.request<cFrameObjGetSelectedResult>({
      api: "cFrameObj",
      method: "GetSelected",
      parameters: {
        Name: name,
      },
    });
  }

  getSpandrel(name: string): Promise<cFrameObjGetSpandrelResult> {
    return this.transport.request<cFrameObjGetSpandrelResult>({
      api: "cFrameObj",
      method: "GetSpandrel",
      parameters: {
        Name: name,
      },
    });
  }

  getSpringAssignment(name: string): Promise<cFrameObjGetSpringAssignmentResult> {
    return this.transport.request<cFrameObjGetSpringAssignmentResult>({
      api: "cFrameObj",
      method: "GetSpringAssignment",
      parameters: {
        Name: name,
      },
    });
  }

  getSupports(name: string): Promise<cFrameObjGetSupportsResult> {
    return this.transport.request<cFrameObjGetSupportsResult>({
      api: "cFrameObj",
      method: "GetSupports",
      parameters: {
        Name: name,
      },
    });
  }

  getTCLimits(name: string): Promise<cFrameObjGetTCLimitsResult> {
    return this.transport.request<cFrameObjGetTCLimitsResult>({
      api: "cFrameObj",
      method: "GetTCLimits",
      parameters: {
        Name: name,
      },
    });
  }

  getTransformationMatrix(name: string, isGlobal?: boolean): Promise<cFrameObjGetTransformationMatrixResult> {
    return this.transport.request<cFrameObjGetTransformationMatrixResult>({
      api: "cFrameObj",
      method: "GetTransformationMatrix",
      parameters: {
        Name: name,
        IsGlobal: isGlobal,
      },
    });
  }

  getTypeOAPI(name: string): Promise<cFrameObjGetTypeOAPIResult> {
    return this.transport.request<cFrameObjGetTypeOAPIResult>({
      api: "cFrameObj",
      method: "GetTypeOAPI",
      parameters: {
        Name: name,
      },
    });
  }

  setColumnSpliceOverwrite(name: string, spliceOption: number, height: number, itemType?: eItemType): Promise<void> {
    return this.transport.request<void>({
      api: "cFrameObj",
      method: "SetColumnSpliceOverwrite",
      parameters: {
        Name: name,
        SpliceOption: spliceOption,
        Height: height,
        ItemType: itemType,
      },
    });
  }

  setDesignProcedure(name: string, myType: number, itemType?: eItemType): Promise<void> {
    return this.transport.request<void>({
      api: "cFrameObj",
      method: "SetDesignProcedure",
      parameters: {
        Name: name,
        MyType: myType,
        ItemType: itemType,
      },
    });
  }

  setEndLengthOffset(name: string, autoOffset: boolean, length1: number, length2: number, rZ: number, itemType?: eItemType): Promise<void> {
    return this.transport.request<void>({
      api: "cFrameObj",
      method: "SetEndLengthOffset",
      parameters: {
        Name: name,
        AutoOffset: autoOffset,
        Length1: length1,
        Length2: length2,
        RZ: rZ,
        ItemType: itemType,
      },
    });
  }

  setGroupAssign(name: string, groupName: string, remove?: boolean, itemType?: eItemType): Promise<void> {
    return this.transport.request<void>({
      api: "cFrameObj",
      method: "SetGroupAssign",
      parameters: {
        Name: name,
        GroupName: groupName,
        Remove: remove,
        ItemType: itemType,
      },
    });
  }

  setGUID(name: string, gUID?: string): Promise<void> {
    return this.transport.request<void>({
      api: "cFrameObj",
      method: "SetGUID",
      parameters: {
        Name: name,
        GUID: gUID,
      },
    });
  }

  setInsertionPoint(name: string, cardinalPoint: number, mirror2: boolean, stiffTransform: boolean, offset1: number[], offset2: number[], cSys?: string, itemType?: eItemType): Promise<cFrameObjSetInsertionPointResult> {
    return this.transport.request<cFrameObjSetInsertionPointResult>({
      api: "cFrameObj",
      method: "SetInsertionPoint",
      parameters: {
        Name: name,
        CardinalPoint: cardinalPoint,
        Mirror2: mirror2,
        StiffTransform: stiffTransform,
        Offset1: offset1,
        Offset2: offset2,
        CSys: cSys,
        ItemType: itemType,
      },
    });
  }

  setInsertionPoint_1(name: string, cardinalPoint: number, mirror2: boolean, mirror3: boolean, stiffTransform: boolean, offset1: number[], offset2: number[], cSys?: string, itemType?: eItemType): Promise<cFrameObjSetInsertionPoint_1Result> {
    return this.transport.request<cFrameObjSetInsertionPoint_1Result>({
      api: "cFrameObj",
      method: "SetInsertionPoint_1",
      parameters: {
        Name: name,
        CardinalPoint: cardinalPoint,
        Mirror2: mirror2,
        Mirror3: mirror3,
        StiffTransform: stiffTransform,
        Offset1: offset1,
        Offset2: offset2,
        CSys: cSys,
        ItemType: itemType,
      },
    });
  }

  setLateralBracing(name: string, myType: number, loc: number, myDist1: number, myDist2: number, relDist?: boolean, itemType?: eItemType): Promise<void> {
    return this.transport.request<void>({
      api: "cFrameObj",
      method: "SetLateralBracing",
      parameters: {
        Name: name,
        MyType: myType,
        Loc: loc,
        MyDist1: myDist1,
        MyDist2: myDist2,
        RelDist: relDist,
        ItemType: itemType,
      },
    });
  }

  setLoadDistributed(name: string, loadPat: string, myType: number, dir: number, dist1: number, dist2: number, val1: number, val2: number, cSys?: string, relDist?: boolean, replace?: boolean, itemType?: eItemType): Promise<void> {
    return this.transport.request<void>({
      api: "cFrameObj",
      method: "SetLoadDistributed",
      parameters: {
        Name: name,
        LoadPat: loadPat,
        MyType: myType,
        Dir: dir,
        Dist1: dist1,
        Dist2: dist2,
        Val1: val1,
        Val2: val2,
        CSys: cSys,
        RelDist: relDist,
        Replace: replace,
        ItemType: itemType,
      },
    });
  }

  setLoadPoint(name: string, loadPat: string, myType: number, dir: number, dist: number, val: number, cSys?: string, relDist?: boolean, replace?: boolean, itemType?: eItemType): Promise<void> {
    return this.transport.request<void>({
      api: "cFrameObj",
      method: "SetLoadPoint",
      parameters: {
        Name: name,
        LoadPat: loadPat,
        MyType: myType,
        Dir: dir,
        Dist: dist,
        Val: val,
        CSys: cSys,
        RelDist: relDist,
        Replace: replace,
        ItemType: itemType,
      },
    });
  }

  setLoadTemperature(name: string, loadPat: string, myType: number, val: number, patternName?: string, replace?: boolean, itemType?: eItemType): Promise<void> {
    return this.transport.request<void>({
      api: "cFrameObj",
      method: "SetLoadTemperature",
      parameters: {
        Name: name,
        LoadPat: loadPat,
        MyType: myType,
        Val: val,
        PatternName: patternName,
        Replace: replace,
        ItemType: itemType,
      },
    });
  }

  setLocalAxes(name: string, ang: number, itemType?: eItemType): Promise<void> {
    return this.transport.request<void>({
      api: "cFrameObj",
      method: "SetLocalAxes",
      parameters: {
        Name: name,
        Ang: ang,
        ItemType: itemType,
      },
    });
  }

  setMass(name: string, massOverL: number, replace?: boolean, itemType?: eItemType): Promise<void> {
    return this.transport.request<void>({
      api: "cFrameObj",
      method: "SetMass",
      parameters: {
        Name: name,
        MassOverL: massOverL,
        Replace: replace,
        ItemType: itemType,
      },
    });
  }

  setMaterialOverwrite(name: string, propName: string, itemType?: eItemType): Promise<void> {
    return this.transport.request<void>({
      api: "cFrameObj",
      method: "SetMaterialOverwrite",
      parameters: {
        Name: name,
        PropName: propName,
        ItemType: itemType,
      },
    });
  }

  setModifiers(name: string, value: number[], itemType?: eItemType): Promise<cFrameObjSetModifiersResult> {
    return this.transport.request<cFrameObjSetModifiersResult>({
      api: "cFrameObj",
      method: "SetModifiers",
      parameters: {
        Name: name,
        Value: value,
        ItemType: itemType,
      },
    });
  }

  setOutputStations(name: string, myType: number, maxSegSize: number, minSections: number, noOutPutAndDesignAtElementEnds?: boolean, noOutPutAndDesignAtPointLoads?: boolean, itemType?: eItemType): Promise<void> {
    return this.transport.request<void>({
      api: "cFrameObj",
      method: "SetOutputStations",
      parameters: {
        Name: name,
        MyType: myType,
        MaxSegSize: maxSegSize,
        MinSections: minSections,
        NoOutPutAndDesignAtElementEnds: noOutPutAndDesignAtElementEnds,
        NoOutPutAndDesignAtPointLoads: noOutPutAndDesignAtPointLoads,
        ItemType: itemType,
      },
    });
  }

  setPier(name: string, pierName: string, itemType?: eItemType): Promise<void> {
    return this.transport.request<void>({
      api: "cFrameObj",
      method: "SetPier",
      parameters: {
        Name: name,
        PierName: pierName,
        ItemType: itemType,
      },
    });
  }

  setReleases(name: string, iI: boolean[], jJ: boolean[], startValue: number[], endValue: number[], itemType?: eItemType): Promise<cFrameObjSetReleasesResult> {
    return this.transport.request<cFrameObjSetReleasesResult>({
      api: "cFrameObj",
      method: "SetReleases",
      parameters: {
        Name: name,
        II: iI,
        JJ: jJ,
        StartValue: startValue,
        EndValue: endValue,
        ItemType: itemType,
      },
    });
  }

  setSection(name: string, propName: string, itemType?: eItemType, sVarRelStartLoc?: number, sVarTotalLength?: number): Promise<void> {
    return this.transport.request<void>({
      api: "cFrameObj",
      method: "SetSection",
      parameters: {
        Name: name,
        PropName: propName,
        ItemType: itemType,
        SVarRelStartLoc: sVarRelStartLoc,
        SVarTotalLength: sVarTotalLength,
      },
    });
  }

  setSelected(name: string, selected: boolean, itemType?: eItemType): Promise<void> {
    return this.transport.request<void>({
      api: "cFrameObj",
      method: "SetSelected",
      parameters: {
        Name: name,
        Selected: selected,
        ItemType: itemType,
      },
    });
  }

  setSpandrel(name: string, spandrelName: string, itemType?: eItemType): Promise<void> {
    return this.transport.request<void>({
      api: "cFrameObj",
      method: "SetSpandrel",
      parameters: {
        Name: name,
        SpandrelName: spandrelName,
        ItemType: itemType,
      },
    });
  }

  setSpringAssignment(name: string, springProp: string, itemType?: eItemType): Promise<void> {
    return this.transport.request<void>({
      api: "cFrameObj",
      method: "SetSpringAssignment",
      parameters: {
        Name: name,
        SpringProp: springProp,
        ItemType: itemType,
      },
    });
  }

  setTCLimits(name: string, limitCompressionExists: boolean, limitCompression: number, limitTensionExists: boolean, limitTension: number, itemType?: eItemType): Promise<void> {
    return this.transport.request<void>({
      api: "cFrameObj",
      method: "SetTCLimits",
      parameters: {
        Name: name,
        LimitCompressionExists: limitCompressionExists,
        LimitCompression: limitCompression,
        LimitTensionExists: limitTensionExists,
        LimitTension: limitTension,
        ItemType: itemType,
      },
    });
  }

}

export class cFunctionApi {
  constructor(private readonly transport: EtabsTransport) {}

  get funcRS(): cFunctionRSApi {
    return new cFunctionRSApi(this.transport);
  }

  get funcTH(): cFunctionTHApi {
    return new cFunctionTHApi(this.transport);
  }

  changeName(name: string, newName: string): Promise<void> {
    return this.transport.request<void>({
      api: "cFunction",
      method: "ChangeName",
      parameters: {
        Name: name,
        NewName: newName,
      },
    });
  }

  convertToUser(name: string): Promise<void> {
    return this.transport.request<void>({
      api: "cFunction",
      method: "ConvertToUser",
      parameters: {
        Name: name,
      },
    });
  }

  count(funcType?: number): Promise<number> {
    return this.transport.request<number>({
      api: "cFunction",
      method: "Count",
      parameters: {
        FuncType: funcType,
      },
    });
  }

  delete_(name: string): Promise<void> {
    return this.transport.request<void>({
      api: "cFunction",
      method: "Delete",
      parameters: {
        Name: name,
      },
    });
  }

  getNameList(funcType?: number): Promise<cFunctionGetNameListResult> {
    return this.transport.request<cFunctionGetNameListResult>({
      api: "cFunction",
      method: "GetNameList",
      parameters: {
        FuncType: funcType,
      },
    });
  }

  getTypeOAPI(name: string): Promise<cFunctionGetTypeOAPIResult> {
    return this.transport.request<cFunctionGetTypeOAPIResult>({
      api: "cFunction",
      method: "GetTypeOAPI",
      parameters: {
        Name: name,
      },
    });
  }

  getValues(name: string): Promise<cFunctionGetValuesResult> {
    return this.transport.request<cFunctionGetValuesResult>({
      api: "cFunction",
      method: "GetValues",
      parameters: {
        Name: name,
      },
    });
  }

}

export class cFunctionRSApi {
  constructor(private readonly transport: EtabsTransport) {}

  getNTC2008(name: string): Promise<cFunctionRSGetNTC2008Result> {
    return this.transport.request<cFunctionRSGetNTC2008Result>({
      api: "cFunctionRS",
      method: "GetNTC2008",
      parameters: {
        Name: name,
      },
    });
  }

  getNTC2018(name: string): Promise<cFunctionRSGetNTC2018Result> {
    return this.transport.request<cFunctionRSGetNTC2018Result>({
      api: "cFunctionRS",
      method: "GetNTC2018",
      parameters: {
        Name: name,
      },
    });
  }

  setNTC2008(name: string, paramsOption: number, latitude: number, longitude: number, island: number, limitState: number, usageClass: number, nomLife: number, peakAccel: number, f0: number, tcs: number, specType: number, soilType: number, topography: number, hRatio: number, damping: number, q: number): Promise<void> {
    return this.transport.request<void>({
      api: "cFunctionRS",
      method: "SetNTC2008",
      parameters: {
        Name: name,
        ParamsOption: paramsOption,
        Latitude: latitude,
        Longitude: longitude,
        Island: island,
        LimitState: limitState,
        UsageClass: usageClass,
        NomLife: nomLife,
        PeakAccel: peakAccel,
        F0: f0,
        Tcs: tcs,
        SpecType: specType,
        SoilType: soilType,
        Topography: topography,
        hRatio: hRatio,
        Damping: damping,
        q: q,
      },
    });
  }

  setNTC2018(name: string, paramsOption: number, latitude: number, longitude: number, island: number, limitState: number, usageClass: number, nomLife: number, peakAccel: number, f0: number, tcs: number, specType: number, soilType: number, topography: number, hRatio: number, damping: number, q: number): Promise<void> {
    return this.transport.request<void>({
      api: "cFunctionRS",
      method: "SetNTC2018",
      parameters: {
        Name: name,
        ParamsOption: paramsOption,
        Latitude: latitude,
        Longitude: longitude,
        Island: island,
        LimitState: limitState,
        UsageClass: usageClass,
        NomLife: nomLife,
        PeakAccel: peakAccel,
        F0: f0,
        Tcs: tcs,
        SpecType: specType,
        SoilType: soilType,
        Topography: topography,
        hRatio: hRatio,
        Damping: damping,
        q: q,
      },
    });
  }

}

export class cFunctionTHApi {
  constructor(private readonly transport: EtabsTransport) {}

}

export class cGenDisplApi {
  constructor(private readonly transport: EtabsTransport) {}

  add(name: string, myType: number): Promise<void> {
    return this.transport.request<void>({
      api: "cGenDispl",
      method: "Add",
      parameters: {
        Name: name,
        MyType: myType,
      },
    });
  }

  changeName(name: string, newName: string): Promise<void> {
    return this.transport.request<void>({
      api: "cGenDispl",
      method: "ChangeName",
      parameters: {
        Name: name,
        NewName: newName,
      },
    });
  }

  count(): Promise<number> {
    return this.transport.request<number>({
      api: "cGenDispl",
      method: "Count",
    });
  }

  countPoint(name: string): Promise<cGenDisplCountPointResult> {
    return this.transport.request<cGenDisplCountPointResult>({
      api: "cGenDispl",
      method: "CountPoint",
      parameters: {
        Name: name,
      },
    });
  }

  delete_(name: string): Promise<void> {
    return this.transport.request<void>({
      api: "cGenDispl",
      method: "Delete",
      parameters: {
        Name: name,
      },
    });
  }

  deletePoint(name: string, pointName: string): Promise<void> {
    return this.transport.request<void>({
      api: "cGenDispl",
      method: "DeletePoint",
      parameters: {
        Name: name,
        PointName: pointName,
      },
    });
  }

  getNameList(): Promise<cGenDisplGetNameListResult> {
    return this.transport.request<cGenDisplGetNameListResult>({
      api: "cGenDispl",
      method: "GetNameList",
    });
  }

  getPoint(name: string): Promise<cGenDisplGetPointResult> {
    return this.transport.request<cGenDisplGetPointResult>({
      api: "cGenDispl",
      method: "GetPoint",
      parameters: {
        Name: name,
      },
    });
  }

  getTypeGenDispl(name: string): Promise<cGenDisplGetTypeGenDisplResult> {
    return this.transport.request<cGenDisplGetTypeGenDisplResult>({
      api: "cGenDispl",
      method: "GetTypeGenDispl",
      parameters: {
        Name: name,
      },
    });
  }

  getTypeOAPI(name: string): Promise<cGenDisplGetTypeOAPIResult> {
    return this.transport.request<cGenDisplGetTypeOAPIResult>({
      api: "cGenDispl",
      method: "GetTypeOAPI",
      parameters: {
        name: name,
      },
    });
  }

  setPoint(name: string, pointName: string, sF: number[]): Promise<cGenDisplSetPointResult> {
    return this.transport.request<cGenDisplSetPointResult>({
      api: "cGenDispl",
      method: "SetPoint",
      parameters: {
        Name: name,
        PointName: pointName,
        SF: sF,
      },
    });
  }

  setType(name: string, myType: number): Promise<void> {
    return this.transport.request<void>({
      api: "cGenDispl",
      method: "SetType",
      parameters: {
        Name: name,
        MyType: myType,
      },
    });
  }

  setTypeOAPI(name: string, myType: number): Promise<void> {
    return this.transport.request<void>({
      api: "cGenDispl",
      method: "SetTypeOAPI",
      parameters: {
        Name: name,
        MyType: myType,
      },
    });
  }

}

export class cGridSysApi {
  constructor(private readonly transport: EtabsTransport) {}

  changeName(name: string, newName: string): Promise<void> {
    return this.transport.request<void>({
      api: "cGridSys",
      method: "ChangeName",
      parameters: {
        Name: name,
        NewName: newName,
      },
    });
  }

  count(): Promise<number> {
    return this.transport.request<number>({
      api: "cGridSys",
      method: "Count",
    });
  }

  delete_(name: string): Promise<void> {
    return this.transport.request<void>({
      api: "cGridSys",
      method: "Delete",
      parameters: {
        Name: name,
      },
    });
  }

  getGridSys(name: string): Promise<cGridSysGetGridSysResult> {
    return this.transport.request<cGridSysGetGridSysResult>({
      api: "cGridSys",
      method: "GetGridSys",
      parameters: {
        Name: name,
      },
    });
  }

  getGridSys_2(name: string): Promise<cGridSysGetGridSys_2Result> {
    return this.transport.request<cGridSysGetGridSys_2Result>({
      api: "cGridSys",
      method: "GetGridSys_2",
      parameters: {
        Name: name,
      },
    });
  }

  getGridSysCartesian(name: string): Promise<cGridSysGetGridSysCartesianResult> {
    return this.transport.request<cGridSysGetGridSysCartesianResult>({
      api: "cGridSys",
      method: "GetGridSysCartesian",
      parameters: {
        Name: name,
      },
    });
  }

  getGridSysCylindrical(name: string): Promise<cGridSysGetGridSysCylindricalResult> {
    return this.transport.request<cGridSysGetGridSysCylindricalResult>({
      api: "cGridSys",
      method: "GetGridSysCylindrical",
      parameters: {
        Name: name,
      },
    });
  }

  getGridSysType(name: string): Promise<cGridSysGetGridSysTypeResult> {
    return this.transport.request<cGridSysGetGridSysTypeResult>({
      api: "cGridSys",
      method: "GetGridSysType",
      parameters: {
        Name: name,
      },
    });
  }

  getNameList(): Promise<cGridSysGetNameListResult> {
    return this.transport.request<cGridSysGetNameListResult>({
      api: "cGridSys",
      method: "GetNameList",
    });
  }

  getNameTypeList(): Promise<cGridSysGetNameTypeListResult> {
    return this.transport.request<cGridSysGetNameTypeListResult>({
      api: "cGridSys",
      method: "GetNameTypeList",
    });
  }

  getTransformationMatrix(name: string): Promise<cGridSysGetTransformationMatrixResult> {
    return this.transport.request<cGridSysGetTransformationMatrixResult>({
      api: "cGridSys",
      method: "GetTransformationMatrix",
      parameters: {
        Name: name,
      },
    });
  }

  setGridSys(name: string, x: number, y: number, rZ: number): Promise<void> {
    return this.transport.request<void>({
      api: "cGridSys",
      method: "SetGridSys",
      parameters: {
        Name: name,
        x: x,
        y: y,
        RZ: rZ,
      },
    });
  }

}

export class cGroupApi {
  constructor(private readonly transport: EtabsTransport) {}

  count(): Promise<number> {
    return this.transport.request<number>({
      api: "cGroup",
      method: "Count",
    });
  }

  delete_(name: string): Promise<void> {
    return this.transport.request<void>({
      api: "cGroup",
      method: "Delete",
      parameters: {
        Name: name,
      },
    });
  }

  getAssignments(name: string): Promise<cGroupGetAssignmentsResult> {
    return this.transport.request<cGroupGetAssignmentsResult>({
      api: "cGroup",
      method: "GetAssignments",
      parameters: {
        Name: name,
      },
    });
  }

  getGroup(name: string): Promise<cGroupGetGroupResult> {
    return this.transport.request<cGroupGetGroupResult>({
      api: "cGroup",
      method: "GetGroup",
      parameters: {
        Name: name,
      },
    });
  }

  getGroup_1(name: string): Promise<cGroupGetGroup_1Result> {
    return this.transport.request<cGroupGetGroup_1Result>({
      api: "cGroup",
      method: "GetGroup_1",
      parameters: {
        Name: name,
      },
    });
  }

  getNameList(): Promise<cGroupGetNameListResult> {
    return this.transport.request<cGroupGetNameListResult>({
      api: "cGroup",
      method: "GetNameList",
    });
  }

  setGroup(name: string, color?: number, specifiedForSelection?: boolean, specifiedForSectionCutDefinition?: boolean, specifiedForSteelDesign?: boolean, specifiedForConcreteDesign?: boolean, specifiedForAluminumDesign?: boolean, specifiedForColdFormedDesign?: boolean, specifiedForStaticNLActiveStage?: boolean, specifiedForBridgeResponseOutput?: boolean, specifiedForAutoSeismicOutput?: boolean, specifiedForAutoWindOutput?: boolean, specifiedForMassAndWeight?: boolean): Promise<void> {
    return this.transport.request<void>({
      api: "cGroup",
      method: "SetGroup",
      parameters: {
        Name: name,
        Color: color,
        SpecifiedForSelection: specifiedForSelection,
        SpecifiedForSectionCutDefinition: specifiedForSectionCutDefinition,
        SpecifiedForSteelDesign: specifiedForSteelDesign,
        SpecifiedForConcreteDesign: specifiedForConcreteDesign,
        SpecifiedForAluminumDesign: specifiedForAluminumDesign,
        SpecifiedForColdFormedDesign: specifiedForColdFormedDesign,
        SpecifiedForStaticNLActiveStage: specifiedForStaticNLActiveStage,
        SpecifiedForBridgeResponseOutput: specifiedForBridgeResponseOutput,
        SpecifiedForAutoSeismicOutput: specifiedForAutoSeismicOutput,
        SpecifiedForAutoWindOutput: specifiedForAutoWindOutput,
        SpecifiedForMassAndWeight: specifiedForMassAndWeight,
      },
    });
  }

  setGroup_1(name: string, color?: number, specifiedForSelection?: boolean, specifiedForSectionCutDefinition?: boolean, specifiedForSteelDesign?: boolean, specifiedForConcreteDesign?: boolean, specifiedForAluminumDesign?: boolean, specifiedForStaticNLActiveStage?: boolean, specifiedForAutoSeismicOutput?: boolean, specifiedForAutoWindOutput?: boolean, specifiedForMassAndWeight?: boolean, specifiedForSteelJoistDesign?: boolean, specifiedForWallDesign?: boolean, specifiedForBasePlateDesign?: boolean, specifiedForConnectionDesign?: boolean): Promise<void> {
    return this.transport.request<void>({
      api: "cGroup",
      method: "SetGroup_1",
      parameters: {
        Name: name,
        color: color,
        SpecifiedForSelection: specifiedForSelection,
        SpecifiedForSectionCutDefinition: specifiedForSectionCutDefinition,
        SpecifiedForSteelDesign: specifiedForSteelDesign,
        SpecifiedForConcreteDesign: specifiedForConcreteDesign,
        SpecifiedForAluminumDesign: specifiedForAluminumDesign,
        SpecifiedForStaticNLActiveStage: specifiedForStaticNLActiveStage,
        SpecifiedForAutoSeismicOutput: specifiedForAutoSeismicOutput,
        SpecifiedForAutoWindOutput: specifiedForAutoWindOutput,
        SpecifiedForMassAndWeight: specifiedForMassAndWeight,
        SpecifiedForSteelJoistDesign: specifiedForSteelJoistDesign,
        SpecifiedForWallDesign: specifiedForWallDesign,
        SpecifiedForBasePlateDesign: specifiedForBasePlateDesign,
        SpecifiedForConnectionDesign: specifiedForConnectionDesign,
      },
    });
  }

}

export class cLineElmApi {
  constructor(private readonly transport: EtabsTransport) {}

  count(): Promise<number> {
    return this.transport.request<number>({
      api: "cLineElm",
      method: "Count",
    });
  }

  getEndLengthOffset(name: string): Promise<cLineElmGetEndLengthOffsetResult> {
    return this.transport.request<cLineElmGetEndLengthOffsetResult>({
      api: "cLineElm",
      method: "GetEndLengthOffset",
      parameters: {
        Name: name,
      },
    });
  }

  getInsertionPoint(name: string): Promise<cLineElmGetInsertionPointResult> {
    return this.transport.request<cLineElmGetInsertionPointResult>({
      api: "cLineElm",
      method: "GetInsertionPoint",
      parameters: {
        Name: name,
      },
    });
  }

  getLoadDistributed(name: string, itemTypeElm?: eItemTypeElm): Promise<cLineElmGetLoadDistributedResult> {
    return this.transport.request<cLineElmGetLoadDistributedResult>({
      api: "cLineElm",
      method: "GetLoadDistributed",
      parameters: {
        Name: name,
        ItemTypeElm: itemTypeElm,
      },
    });
  }

  getLoadPoint(name: string, itemTypeElm?: eItemTypeElm): Promise<cLineElmGetLoadPointResult> {
    return this.transport.request<cLineElmGetLoadPointResult>({
      api: "cLineElm",
      method: "GetLoadPoint",
      parameters: {
        Name: name,
        ItemTypeElm: itemTypeElm,
      },
    });
  }

  getLoadTemperature(name: string, itemTypeElm?: eItemTypeElm): Promise<cLineElmGetLoadTemperatureResult> {
    return this.transport.request<cLineElmGetLoadTemperatureResult>({
      api: "cLineElm",
      method: "GetLoadTemperature",
      parameters: {
        Name: name,
        ItemTypeElm: itemTypeElm,
      },
    });
  }

  getLocalAxes(name: string): Promise<cLineElmGetLocalAxesResult> {
    return this.transport.request<cLineElmGetLocalAxesResult>({
      api: "cLineElm",
      method: "GetLocalAxes",
      parameters: {
        Name: name,
      },
    });
  }

  getMaterialOverwrite(name: string): Promise<cLineElmGetMaterialOverwriteResult> {
    return this.transport.request<cLineElmGetMaterialOverwriteResult>({
      api: "cLineElm",
      method: "GetMaterialOverwrite",
      parameters: {
        Name: name,
      },
    });
  }

  getModifiers(name: string): Promise<cLineElmGetModifiersResult> {
    return this.transport.request<cLineElmGetModifiersResult>({
      api: "cLineElm",
      method: "GetModifiers",
      parameters: {
        Name: name,
      },
    });
  }

  getNameList(): Promise<cLineElmGetNameListResult> {
    return this.transport.request<cLineElmGetNameListResult>({
      api: "cLineElm",
      method: "GetNameList",
    });
  }

  getObj(name: string): Promise<cLineElmGetObjResult> {
    return this.transport.request<cLineElmGetObjResult>({
      api: "cLineElm",
      method: "GetObj",
      parameters: {
        Name: name,
      },
    });
  }

  getPoints(name: string): Promise<cLineElmGetPointsResult> {
    return this.transport.request<cLineElmGetPointsResult>({
      api: "cLineElm",
      method: "GetPoints",
      parameters: {
        Name: name,
      },
    });
  }

  getProperty(name: string): Promise<cLineElmGetPropertyResult> {
    return this.transport.request<cLineElmGetPropertyResult>({
      api: "cLineElm",
      method: "GetProperty",
      parameters: {
        Name: name,
      },
    });
  }

  getReleases(name: string): Promise<cLineElmGetReleasesResult> {
    return this.transport.request<cLineElmGetReleasesResult>({
      api: "cLineElm",
      method: "GetReleases",
      parameters: {
        Name: name,
      },
    });
  }

  getTCLimits(name: string): Promise<cLineElmGetTCLimitsResult> {
    return this.transport.request<cLineElmGetTCLimitsResult>({
      api: "cLineElm",
      method: "GetTCLimits",
      parameters: {
        Name: name,
      },
    });
  }

  getTransformationMatrix(name: string): Promise<cLineElmGetTransformationMatrixResult> {
    return this.transport.request<cLineElmGetTransformationMatrixResult>({
      api: "cLineElm",
      method: "GetTransformationMatrix",
      parameters: {
        Name: name,
      },
    });
  }

}

export class cLinkElmApi {
  constructor(private readonly transport: EtabsTransport) {}

}

export class cLinkObjApi {
  constructor(private readonly transport: EtabsTransport) {}

  addByCoord(xI: number, yI: number, zI: number, xJ: number, yJ: number, zJ: number, isSingleJoint?: boolean, propName?: string, userName?: string, cSys?: string): Promise<cLinkObjAddByCoordResult> {
    return this.transport.request<cLinkObjAddByCoordResult>({
      api: "cLinkObj",
      method: "AddByCoord",
      parameters: {
        XI: xI,
        YI: yI,
        ZI: zI,
        XJ: xJ,
        YJ: yJ,
        ZJ: zJ,
        IsSingleJoint: isSingleJoint,
        PropName: propName,
        UserName: userName,
        CSys: cSys,
      },
    });
  }

  addByPoint(point1: string, point2: string, isSingleJoint?: boolean, propName?: string, userName?: string): Promise<cLinkObjAddByPointResult> {
    return this.transport.request<cLinkObjAddByPointResult>({
      api: "cLinkObj",
      method: "AddByPoint",
      parameters: {
        Point1: point1,
        Point2: point2,
        IsSingleJoint: isSingleJoint,
        PropName: propName,
        UserName: userName,
      },
    });
  }

  changeName(name: string, newName: string): Promise<void> {
    return this.transport.request<void>({
      api: "cLinkObj",
      method: "ChangeName",
      parameters: {
        Name: name,
        NewName: newName,
      },
    });
  }

  count(): Promise<number> {
    return this.transport.request<number>({
      api: "cLinkObj",
      method: "Count",
    });
  }

  delete_(name: string, itemType?: eItemType): Promise<void> {
    return this.transport.request<void>({
      api: "cLinkObj",
      method: "Delete",
      parameters: {
        Name: name,
        ItemType: itemType,
      },
    });
  }

  getElm(name: string): Promise<cLinkObjGetElmResult> {
    return this.transport.request<cLinkObjGetElmResult>({
      api: "cLinkObj",
      method: "GetElm",
      parameters: {
        Name: name,
      },
    });
  }

  getGroupAssign(name: string): Promise<cLinkObjGetGroupAssignResult> {
    return this.transport.request<cLinkObjGetGroupAssignResult>({
      api: "cLinkObj",
      method: "GetGroupAssign",
      parameters: {
        Name: name,
      },
    });
  }

  getGUID(name: string): Promise<cLinkObjGetGUIDResult> {
    return this.transport.request<cLinkObjGetGUIDResult>({
      api: "cLinkObj",
      method: "GetGUID",
      parameters: {
        Name: name,
      },
    });
  }

  getLocalAxes(name: string): Promise<cLinkObjGetLocalAxesResult> {
    return this.transport.request<cLinkObjGetLocalAxesResult>({
      api: "cLinkObj",
      method: "GetLocalAxes",
      parameters: {
        Name: name,
      },
    });
  }

  getLocalAxesAdvanced(name: string): Promise<cLinkObjGetLocalAxesAdvancedResult> {
    return this.transport.request<cLinkObjGetLocalAxesAdvancedResult>({
      api: "cLinkObj",
      method: "GetLocalAxesAdvanced",
      parameters: {
        Name: name,
      },
    });
  }

  getNameList(): Promise<cLinkObjGetNameListResult> {
    return this.transport.request<cLinkObjGetNameListResult>({
      api: "cLinkObj",
      method: "GetNameList",
    });
  }

  getNameListOnStory(storyName: string): Promise<cLinkObjGetNameListOnStoryResult> {
    return this.transport.request<cLinkObjGetNameListOnStoryResult>({
      api: "cLinkObj",
      method: "GetNameListOnStory",
      parameters: {
        StoryName: storyName,
      },
    });
  }

  getPoints(name: string): Promise<cLinkObjGetPointsResult> {
    return this.transport.request<cLinkObjGetPointsResult>({
      api: "cLinkObj",
      method: "GetPoints",
      parameters: {
        Name: name,
      },
    });
  }

  getProperty(name: string): Promise<cLinkObjGetPropertyResult> {
    return this.transport.request<cLinkObjGetPropertyResult>({
      api: "cLinkObj",
      method: "GetProperty",
      parameters: {
        Name: name,
      },
    });
  }

  getSelected(name: string): Promise<cLinkObjGetSelectedResult> {
    return this.transport.request<cLinkObjGetSelectedResult>({
      api: "cLinkObj",
      method: "GetSelected",
      parameters: {
        Name: name,
      },
    });
  }

  getTransformationMatrix(name: string, isGlobal?: boolean): Promise<cLinkObjGetTransformationMatrixResult> {
    return this.transport.request<cLinkObjGetTransformationMatrixResult>({
      api: "cLinkObj",
      method: "GetTransformationMatrix",
      parameters: {
        Name: name,
        IsGlobal: isGlobal,
      },
    });
  }

  setGroupAssign(name: string, groupName: string, remove?: boolean, itemType?: eItemType): Promise<void> {
    return this.transport.request<void>({
      api: "cLinkObj",
      method: "SetGroupAssign",
      parameters: {
        Name: name,
        GroupName: groupName,
        Remove: remove,
        ItemType: itemType,
      },
    });
  }

  setGUID(name: string, gUID?: string): Promise<void> {
    return this.transport.request<void>({
      api: "cLinkObj",
      method: "SetGUID",
      parameters: {
        Name: name,
        GUID: gUID,
      },
    });
  }

  setLocalAxes(name: string, ang: number, itemType?: eItemType): Promise<void> {
    return this.transport.request<void>({
      api: "cLinkObj",
      method: "SetLocalAxes",
      parameters: {
        Name: name,
        Ang: ang,
        ItemType: itemType,
      },
    });
  }

  setLocalAxesAdvanced(name: string, active: boolean, axVectOpt: number, axCSys: string, axDir: number[], axPt: string[], axVect: number[], plane2: number, plVectOpt: number, plCSys: string, plDir: number[], plPt: string[], plVect: number[], itemType?: eItemType): Promise<cLinkObjSetLocalAxesAdvancedResult> {
    return this.transport.request<cLinkObjSetLocalAxesAdvancedResult>({
      api: "cLinkObj",
      method: "SetLocalAxesAdvanced",
      parameters: {
        Name: name,
        Active: active,
        AxVectOpt: axVectOpt,
        AxCSys: axCSys,
        AxDir: axDir,
        AxPt: axPt,
        AxVect: axVect,
        Plane2: plane2,
        PlVectOpt: plVectOpt,
        PlCSys: plCSys,
        PlDir: plDir,
        PlPt: plPt,
        PlVect: plVect,
        ItemType: itemType,
      },
    });
  }

  setProperty(name: string, propName: string, itemType?: eItemType): Promise<void> {
    return this.transport.request<void>({
      api: "cLinkObj",
      method: "SetProperty",
      parameters: {
        Name: name,
        PropName: propName,
        ItemType: itemType,
      },
    });
  }

  setSelected(name: string, selected: boolean, itemType?: eItemType): Promise<void> {
    return this.transport.request<void>({
      api: "cLinkObj",
      method: "SetSelected",
      parameters: {
        Name: name,
        Selected: selected,
        ItemType: itemType,
      },
    });
  }

}

export class cLoadCasesApi {
  constructor(private readonly transport: EtabsTransport) {}

  get buckling(): cCaseBucklingApi {
    return new cCaseBucklingApi(this.transport);
  }

  get dirHistLinear(): cCaseDirectHistoryLinearApi {
    return new cCaseDirectHistoryLinearApi(this.transport);
  }

  get dirHistNonlinear(): cCaseDirectHistoryNonlinearApi {
    return new cCaseDirectHistoryNonlinearApi(this.transport);
  }

  get hyperStatic(): cCaseHyperStaticApi {
    return new cCaseHyperStaticApi(this.transport);
  }

  get modalEigen(): cCaseModalEigenApi {
    return new cCaseModalEigenApi(this.transport);
  }

  get modalRitz(): cCaseModalRitzApi {
    return new cCaseModalRitzApi(this.transport);
  }

  get modHistLinear(): cCaseModalHistoryLinearApi {
    return new cCaseModalHistoryLinearApi(this.transport);
  }

  get modHistNonlinear(): cCaseModalHistoryNonlinearApi {
    return new cCaseModalHistoryNonlinearApi(this.transport);
  }

  get responseSpectrum(): cCaseResponseSpectrumApi {
    return new cCaseResponseSpectrumApi(this.transport);
  }

  get staticLinear(): cCaseStaticLinearApi {
    return new cCaseStaticLinearApi(this.transport);
  }

  get staticNonlinear(): cCaseStaticNonlinearApi {
    return new cCaseStaticNonlinearApi(this.transport);
  }

  get staticNonlinearStaged(): cCaseStaticNonlinearStagedApi {
    return new cCaseStaticNonlinearStagedApi(this.transport);
  }

  changeName(name: string, newName: string): Promise<void> {
    return this.transport.request<void>({
      api: "cLoadCases",
      method: "ChangeName",
      parameters: {
        Name: name,
        NewName: newName,
      },
    });
  }

  count(caseType?: eLoadCaseType): Promise<number> {
    return this.transport.request<number>({
      api: "cLoadCases",
      method: "Count",
      parameters: {
        CaseType: caseType,
      },
    });
  }

  delete_(name: string): Promise<void> {
    return this.transport.request<void>({
      api: "cLoadCases",
      method: "Delete",
      parameters: {
        Name: name,
      },
    });
  }

  getNameList(caseType?: eLoadCaseType): Promise<cLoadCasesGetNameListResult> {
    return this.transport.request<cLoadCasesGetNameListResult>({
      api: "cLoadCases",
      method: "GetNameList",
      parameters: {
        CaseType: caseType,
      },
    });
  }

  getTypeOAPI(name: string): Promise<cLoadCasesGetTypeOAPIResult> {
    return this.transport.request<cLoadCasesGetTypeOAPIResult>({
      api: "cLoadCases",
      method: "GetTypeOAPI",
      parameters: {
        Name: name,
      },
    });
  }

  getTypeOAPI_1(name: string): Promise<cLoadCasesGetTypeOAPI_1Result> {
    return this.transport.request<cLoadCasesGetTypeOAPI_1Result>({
      api: "cLoadCases",
      method: "GetTypeOAPI_1",
      parameters: {
        Name: name,
      },
    });
  }

  setDesignType(name: string, designTypeOption: number, designType?: eLoadPatternType): Promise<void> {
    return this.transport.request<void>({
      api: "cLoadCases",
      method: "SetDesignType",
      parameters: {
        Name: name,
        DesignTypeOption: designTypeOption,
        DesignType: designType,
      },
    });
  }

}

export class cLoadPatternsApi {
  constructor(private readonly transport: EtabsTransport) {}

  get autoSeismic(): cAutoSeismicApi {
    return new cAutoSeismicApi(this.transport);
  }

  get autoWind(): cAutoWindApi {
    return new cAutoWindApi(this.transport);
  }

  add(name: string, myType: eLoadPatternType, selfWTMultiplier?: number, addAnalysisCase?: boolean): Promise<void> {
    return this.transport.request<void>({
      api: "cLoadPatterns",
      method: "Add",
      parameters: {
        Name: name,
        MyType: myType,
        SelfWTMultiplier: selfWTMultiplier,
        AddAnalysisCase: addAnalysisCase,
      },
    });
  }

  changeName(name: string, newName: string): Promise<void> {
    return this.transport.request<void>({
      api: "cLoadPatterns",
      method: "ChangeName",
      parameters: {
        Name: name,
        NewName: newName,
      },
    });
  }

  count(): Promise<number> {
    return this.transport.request<number>({
      api: "cLoadPatterns",
      method: "Count",
    });
  }

  delete_(name: string): Promise<void> {
    return this.transport.request<void>({
      api: "cLoadPatterns",
      method: "Delete",
      parameters: {
        Name: name,
      },
    });
  }

  getAutoSeismicCode(name: string): Promise<cLoadPatternsGetAutoSeismicCodeResult> {
    return this.transport.request<cLoadPatternsGetAutoSeismicCodeResult>({
      api: "cLoadPatterns",
      method: "GetAutoSeismicCode",
      parameters: {
        Name: name,
      },
    });
  }

  getAutoWindCode(name: string): Promise<cLoadPatternsGetAutoWindCodeResult> {
    return this.transport.request<cLoadPatternsGetAutoWindCodeResult>({
      api: "cLoadPatterns",
      method: "GetAutoWindCode",
      parameters: {
        Name: name,
      },
    });
  }

  getLoadType(name: string): Promise<cLoadPatternsGetLoadTypeResult> {
    return this.transport.request<cLoadPatternsGetLoadTypeResult>({
      api: "cLoadPatterns",
      method: "GetLoadType",
      parameters: {
        Name: name,
      },
    });
  }

  getNameList(): Promise<cLoadPatternsGetNameListResult> {
    return this.transport.request<cLoadPatternsGetNameListResult>({
      api: "cLoadPatterns",
      method: "GetNameList",
    });
  }

  getSelfWTMultiplier(name: string): Promise<cLoadPatternsGetSelfWTMultiplierResult> {
    return this.transport.request<cLoadPatternsGetSelfWTMultiplierResult>({
      api: "cLoadPatterns",
      method: "GetSelfWTMultiplier",
      parameters: {
        Name: name,
      },
    });
  }

  setLoadType(name: string, myType: eLoadPatternType): Promise<void> {
    return this.transport.request<void>({
      api: "cLoadPatterns",
      method: "SetLoadType",
      parameters: {
        Name: name,
        MyType: myType,
      },
    });
  }

  setSelfWTMultiplier(name: string, selfWTMultiplier: number): Promise<void> {
    return this.transport.request<void>({
      api: "cLoadPatterns",
      method: "SetSelfWTMultiplier",
      parameters: {
        Name: name,
        SelfWTMultiplier: selfWTMultiplier,
      },
    });
  }

}

export class cOAPIApi {
  constructor(private readonly transport: EtabsTransport) {}

  get sapModel(): cSapModelApi {
    return new cSapModelApi(this.transport);
  }

  applicationExit(fileSave: boolean): Promise<void> {
    return this.transport.request<void>({
      api: "cOAPI",
      method: "ApplicationExit",
      parameters: {
        FileSave: fileSave,
      },
    });
  }

  applicationStart(): Promise<void> {
    return this.transport.request<void>({
      api: "cOAPI",
      method: "ApplicationStart",
    });
  }

  getOAPIVersionNumber(): Promise<number> {
    return this.transport.request<number>({
      api: "cOAPI",
      method: "GetOAPIVersionNumber",
    });
  }

  hide(): Promise<void> {
    return this.transport.request<void>({
      api: "cOAPI",
      method: "Hide",
    });
  }

  internalExec(operation: number): Promise<void> {
    return this.transport.request<void>({
      api: "cOAPI",
      method: "InternalExec",
      parameters: {
        operation: operation,
      },
    });
  }

  setAsActiveObject(): Promise<void> {
    return this.transport.request<void>({
      api: "cOAPI",
      method: "SetAsActiveObject",
    });
  }

  unhide(): Promise<void> {
    return this.transport.request<void>({
      api: "cOAPI",
      method: "Unhide",
    });
  }

  unsetAsActiveObject(): Promise<void> {
    return this.transport.request<void>({
      api: "cOAPI",
      method: "UnsetAsActiveObject",
    });
  }

  visible(): Promise<boolean> {
    return this.transport.request<boolean>({
      api: "cOAPI",
      method: "Visible",
    });
  }

}

export class cOptionsApi {
  constructor(private readonly transport: EtabsTransport) {}

  getDefaultFunctionFolder(): Promise<cOptionsGetDefaultFunctionFolderResult> {
    return this.transport.request<cOptionsGetDefaultFunctionFolderResult>({
      api: "cOptions",
      method: "GetDefaultFunctionFolder",
    });
  }

  setDefaultFunctionFolder(path: string): Promise<void> {
    return this.transport.request<void>({
      api: "cOptions",
      method: "SetDefaultFunctionFolder",
      parameters: {
        Path: path,
      },
    });
  }

}

export class cPatternApi {
  constructor(private readonly transport: EtabsTransport) {}

}

export class cPierLabelApi {
  constructor(private readonly transport: EtabsTransport) {}

  changeName(name: string, newName: string): Promise<void> {
    return this.transport.request<void>({
      api: "cPierLabel",
      method: "ChangeName",
      parameters: {
        Name: name,
        NewName: newName,
      },
    });
  }

  delete_(name: string): Promise<void> {
    return this.transport.request<void>({
      api: "cPierLabel",
      method: "Delete",
      parameters: {
        Name: name,
      },
    });
  }

  getNameList(): Promise<cPierLabelGetNameListResult> {
    return this.transport.request<cPierLabelGetNameListResult>({
      api: "cPierLabel",
      method: "GetNameList",
    });
  }

  getPier(name: string): Promise<void> {
    return this.transport.request<void>({
      api: "cPierLabel",
      method: "GetPier",
      parameters: {
        Name: name,
      },
    });
  }

  getSectionProperties(name: string): Promise<cPierLabelGetSectionPropertiesResult> {
    return this.transport.request<cPierLabelGetSectionPropertiesResult>({
      api: "cPierLabel",
      method: "GetSectionProperties",
      parameters: {
        Name: name,
      },
    });
  }

  setPier(name: string): Promise<void> {
    return this.transport.request<void>({
      api: "cPierLabel",
      method: "SetPier",
      parameters: {
        Name: name,
      },
    });
  }

}

export class cPointElmApi {
  constructor(private readonly transport: EtabsTransport) {}

  count(): Promise<number> {
    return this.transport.request<number>({
      api: "cPointElm",
      method: "Count",
    });
  }

  countConstraint(name?: string): Promise<cPointElmCountConstraintResult> {
    return this.transport.request<cPointElmCountConstraintResult>({
      api: "cPointElm",
      method: "CountConstraint",
      parameters: {
        Name: name,
      },
    });
  }

  countLoadDispl(name?: string, loadPat?: string): Promise<cPointElmCountLoadDisplResult> {
    return this.transport.request<cPointElmCountLoadDisplResult>({
      api: "cPointElm",
      method: "CountLoadDispl",
      parameters: {
        Name: name,
        LoadPat: loadPat,
      },
    });
  }

  countLoadForce(name?: string, loadPat?: string): Promise<cPointElmCountLoadForceResult> {
    return this.transport.request<cPointElmCountLoadForceResult>({
      api: "cPointElm",
      method: "CountLoadForce",
      parameters: {
        Name: name,
        LoadPat: loadPat,
      },
    });
  }

  countRestraint(): Promise<number> {
    return this.transport.request<number>({
      api: "cPointElm",
      method: "CountRestraint",
    });
  }

  countSpring(): Promise<number> {
    return this.transport.request<number>({
      api: "cPointElm",
      method: "CountSpring",
    });
  }

  getConnectivity(name: string): Promise<cPointElmGetConnectivityResult> {
    return this.transport.request<cPointElmGetConnectivityResult>({
      api: "cPointElm",
      method: "GetConnectivity",
      parameters: {
        Name: name,
      },
    });
  }

  getConstraint(name: string, itemTypeElm?: eItemTypeElm): Promise<cPointElmGetConstraintResult> {
    return this.transport.request<cPointElmGetConstraintResult>({
      api: "cPointElm",
      method: "GetConstraint",
      parameters: {
        Name: name,
        ItemTypeElm: itemTypeElm,
      },
    });
  }

  getCoordCartesian(name: string, cSys?: string): Promise<cPointElmGetCoordCartesianResult> {
    return this.transport.request<cPointElmGetCoordCartesianResult>({
      api: "cPointElm",
      method: "GetCoordCartesian",
      parameters: {
        Name: name,
        CSys: cSys,
      },
    });
  }

  getLoadDispl(name: string, itemTypeElm?: eItemTypeElm): Promise<cPointElmGetLoadDisplResult> {
    return this.transport.request<cPointElmGetLoadDisplResult>({
      api: "cPointElm",
      method: "GetLoadDispl",
      parameters: {
        Name: name,
        ItemTypeElm: itemTypeElm,
      },
    });
  }

  getLoadForce(name: string, itemTypeElm?: eItemTypeElm): Promise<cPointElmGetLoadForceResult> {
    return this.transport.request<cPointElmGetLoadForceResult>({
      api: "cPointElm",
      method: "GetLoadForce",
      parameters: {
        Name: name,
        ItemTypeElm: itemTypeElm,
      },
    });
  }

  getLocalAxes(name: string): Promise<cPointElmGetLocalAxesResult> {
    return this.transport.request<cPointElmGetLocalAxesResult>({
      api: "cPointElm",
      method: "GetLocalAxes",
      parameters: {
        Name: name,
      },
    });
  }

  getNameList(): Promise<cPointElmGetNameListResult> {
    return this.transport.request<cPointElmGetNameListResult>({
      api: "cPointElm",
      method: "GetNameList",
    });
  }

  getObj(name: string): Promise<cPointElmGetObjResult> {
    return this.transport.request<cPointElmGetObjResult>({
      api: "cPointElm",
      method: "GetObj",
      parameters: {
        Name: name,
      },
    });
  }

  getPatternValue(name: string, patternName: string): Promise<cPointElmGetPatternValueResult> {
    return this.transport.request<cPointElmGetPatternValueResult>({
      api: "cPointElm",
      method: "GetPatternValue",
      parameters: {
        Name: name,
        PatternName: patternName,
      },
    });
  }

  getRestraint(name: string): Promise<cPointElmGetRestraintResult> {
    return this.transport.request<cPointElmGetRestraintResult>({
      api: "cPointElm",
      method: "GetRestraint",
      parameters: {
        Name: name,
      },
    });
  }

  getSpring(name: string): Promise<cPointElmGetSpringResult> {
    return this.transport.request<cPointElmGetSpringResult>({
      api: "cPointElm",
      method: "GetSpring",
      parameters: {
        Name: name,
      },
    });
  }

  getSpringCoupled(name: string): Promise<cPointElmGetSpringCoupledResult> {
    return this.transport.request<cPointElmGetSpringCoupledResult>({
      api: "cPointElm",
      method: "GetSpringCoupled",
      parameters: {
        Name: name,
      },
    });
  }

  getTransformationMatrix(name: string): Promise<cPointElmGetTransformationMatrixResult> {
    return this.transport.request<cPointElmGetTransformationMatrixResult>({
      api: "cPointElm",
      method: "GetTransformationMatrix",
      parameters: {
        Name: name,
      },
    });
  }

  isSpringCoupled(name: string): Promise<cPointElmIsSpringCoupledResult> {
    return this.transport.request<cPointElmIsSpringCoupledResult>({
      api: "cPointElm",
      method: "IsSpringCoupled",
      parameters: {
        Name: name,
      },
    });
  }

}

export class cPointObjApi {
  constructor(private readonly transport: EtabsTransport) {}

  addCartesian(x: number, y: number, z: number, userName?: string, cSys?: string, mergeOff?: boolean, mergeNumber?: number): Promise<cPointObjAddCartesianResult> {
    return this.transport.request<cPointObjAddCartesianResult>({
      api: "cPointObj",
      method: "AddCartesian",
      parameters: {
        X: x,
        Y: y,
        Z: z,
        UserName: userName,
        CSys: cSys,
        MergeOff: mergeOff,
        MergeNumber: mergeNumber,
      },
    });
  }

  changeName(name: string, newName: string): Promise<void> {
    return this.transport.request<void>({
      api: "cPointObj",
      method: "ChangeName",
      parameters: {
        Name: name,
        NewName: newName,
      },
    });
  }

  count(): Promise<number> {
    return this.transport.request<number>({
      api: "cPointObj",
      method: "Count",
    });
  }

  countLoadDispl(name?: string, loadPat?: string): Promise<cPointObjCountLoadDisplResult> {
    return this.transport.request<cPointObjCountLoadDisplResult>({
      api: "cPointObj",
      method: "CountLoadDispl",
      parameters: {
        Name: name,
        LoadPat: loadPat,
      },
    });
  }

  countLoadForce(name?: string, loadPat?: string): Promise<cPointObjCountLoadForceResult> {
    return this.transport.request<cPointObjCountLoadForceResult>({
      api: "cPointObj",
      method: "CountLoadForce",
      parameters: {
        Name: name,
        LoadPat: loadPat,
      },
    });
  }

  countPanelZone(): Promise<number> {
    return this.transport.request<number>({
      api: "cPointObj",
      method: "CountPanelZone",
    });
  }

  countRestraint(): Promise<number> {
    return this.transport.request<number>({
      api: "cPointObj",
      method: "CountRestraint",
    });
  }

  countSpring(): Promise<number> {
    return this.transport.request<number>({
      api: "cPointObj",
      method: "CountSpring",
    });
  }

  deleteLoadDispl(name: string, loadPat: string, itemType?: eItemType): Promise<void> {
    return this.transport.request<void>({
      api: "cPointObj",
      method: "DeleteLoadDispl",
      parameters: {
        Name: name,
        LoadPat: loadPat,
        ItemType: itemType,
      },
    });
  }

  deleteLoadForce(name: string, loadPat: string, itemType?: eItemType): Promise<void> {
    return this.transport.request<void>({
      api: "cPointObj",
      method: "DeleteLoadForce",
      parameters: {
        Name: name,
        LoadPat: loadPat,
        ItemType: itemType,
      },
    });
  }

  deleteMass(name: string, itemType?: eItemType): Promise<void> {
    return this.transport.request<void>({
      api: "cPointObj",
      method: "DeleteMass",
      parameters: {
        Name: name,
        ItemType: itemType,
      },
    });
  }

  deletePanelZone(name: string, itemType?: eItemType): Promise<void> {
    return this.transport.request<void>({
      api: "cPointObj",
      method: "DeletePanelZone",
      parameters: {
        Name: name,
        ItemType: itemType,
      },
    });
  }

  deleteRestraint(name: string, itemType?: eItemType): Promise<void> {
    return this.transport.request<void>({
      api: "cPointObj",
      method: "DeleteRestraint",
      parameters: {
        Name: name,
        ItemType: itemType,
      },
    });
  }

  deleteSpecialPoint(name: string, itemType?: eItemType): Promise<void> {
    return this.transport.request<void>({
      api: "cPointObj",
      method: "DeleteSpecialPoint",
      parameters: {
        Name: name,
        ItemType: itemType,
      },
    });
  }

  deleteSpring(name: string, itemType?: eItemType): Promise<void> {
    return this.transport.request<void>({
      api: "cPointObj",
      method: "DeleteSpring",
      parameters: {
        Name: name,
        ItemType: itemType,
      },
    });
  }

  getAllPoints(csys?: string): Promise<cPointObjGetAllPointsResult> {
    return this.transport.request<cPointObjGetAllPointsResult>({
      api: "cPointObj",
      method: "GetAllPoints",
      parameters: {
        csys: csys,
      },
    });
  }

  getCommonTo(name: string): Promise<cPointObjGetCommonToResult> {
    return this.transport.request<cPointObjGetCommonToResult>({
      api: "cPointObj",
      method: "GetCommonTo",
      parameters: {
        Name: name,
      },
    });
  }

  getConnectivity(name: string): Promise<cPointObjGetConnectivityResult> {
    return this.transport.request<cPointObjGetConnectivityResult>({
      api: "cPointObj",
      method: "GetConnectivity",
      parameters: {
        Name: name,
      },
    });
  }

  getCoordCartesian(name: string, cSys?: string): Promise<cPointObjGetCoordCartesianResult> {
    return this.transport.request<cPointObjGetCoordCartesianResult>({
      api: "cPointObj",
      method: "GetCoordCartesian",
      parameters: {
        Name: name,
        CSys: cSys,
      },
    });
  }

  getCoordCylindrical(name: string, cSys?: string): Promise<cPointObjGetCoordCylindricalResult> {
    return this.transport.request<cPointObjGetCoordCylindricalResult>({
      api: "cPointObj",
      method: "GetCoordCylindrical",
      parameters: {
        Name: name,
        CSys: cSys,
      },
    });
  }

  getCoordSpherical(name: string, cSys?: string): Promise<cPointObjGetCoordSphericalResult> {
    return this.transport.request<cPointObjGetCoordSphericalResult>({
      api: "cPointObj",
      method: "GetCoordSpherical",
      parameters: {
        Name: name,
        CSys: cSys,
      },
    });
  }

  getDiaphragm(name: string): Promise<cPointObjGetDiaphragmResult> {
    return this.transport.request<cPointObjGetDiaphragmResult>({
      api: "cPointObj",
      method: "GetDiaphragm",
      parameters: {
        Name: name,
      },
    });
  }

  getElm(name: string): Promise<cPointObjGetElmResult> {
    return this.transport.request<cPointObjGetElmResult>({
      api: "cPointObj",
      method: "GetElm",
      parameters: {
        Name: name,
      },
    });
  }

  getGroupAssign(name: string): Promise<cPointObjGetGroupAssignResult> {
    return this.transport.request<cPointObjGetGroupAssignResult>({
      api: "cPointObj",
      method: "GetGroupAssign",
      parameters: {
        Name: name,
      },
    });
  }

  getGUID(name: string): Promise<cPointObjGetGUIDResult> {
    return this.transport.request<cPointObjGetGUIDResult>({
      api: "cPointObj",
      method: "GetGUID",
      parameters: {
        Name: name,
      },
    });
  }

  getLabelFromName(name: string): Promise<cPointObjGetLabelFromNameResult> {
    return this.transport.request<cPointObjGetLabelFromNameResult>({
      api: "cPointObj",
      method: "GetLabelFromName",
      parameters: {
        Name: name,
      },
    });
  }

  getLabelNameList(): Promise<cPointObjGetLabelNameListResult> {
    return this.transport.request<cPointObjGetLabelNameListResult>({
      api: "cPointObj",
      method: "GetLabelNameList",
    });
  }

  getLoadDispl(name: string, itemType?: eItemType): Promise<cPointObjGetLoadDisplResult> {
    return this.transport.request<cPointObjGetLoadDisplResult>({
      api: "cPointObj",
      method: "GetLoadDispl",
      parameters: {
        Name: name,
        ItemType: itemType,
      },
    });
  }

  getLoadForce(name: string, itemType?: eItemType): Promise<cPointObjGetLoadForceResult> {
    return this.transport.request<cPointObjGetLoadForceResult>({
      api: "cPointObj",
      method: "GetLoadForce",
      parameters: {
        Name: name,
        ItemType: itemType,
      },
    });
  }

  getLocalAxes(name: string): Promise<cPointObjGetLocalAxesResult> {
    return this.transport.request<cPointObjGetLocalAxesResult>({
      api: "cPointObj",
      method: "GetLocalAxes",
      parameters: {
        Name: name,
      },
    });
  }

  getMass(name: string): Promise<cPointObjGetMassResult> {
    return this.transport.request<cPointObjGetMassResult>({
      api: "cPointObj",
      method: "GetMass",
      parameters: {
        Name: name,
      },
    });
  }

  getNameFromLabel(label: string, story: string): Promise<cPointObjGetNameFromLabelResult> {
    return this.transport.request<cPointObjGetNameFromLabelResult>({
      api: "cPointObj",
      method: "GetNameFromLabel",
      parameters: {
        Label: label,
        Story: story,
      },
    });
  }

  getNameList(): Promise<cPointObjGetNameListResult> {
    return this.transport.request<cPointObjGetNameListResult>({
      api: "cPointObj",
      method: "GetNameList",
    });
  }

  getNameListOnStory(storyName: string): Promise<cPointObjGetNameListOnStoryResult> {
    return this.transport.request<cPointObjGetNameListOnStoryResult>({
      api: "cPointObj",
      method: "GetNameListOnStory",
      parameters: {
        StoryName: storyName,
      },
    });
  }

  getPanelZone(name: string): Promise<cPointObjGetPanelZoneResult> {
    return this.transport.request<cPointObjGetPanelZoneResult>({
      api: "cPointObj",
      method: "GetPanelZone",
      parameters: {
        Name: name,
      },
    });
  }

  getRestraint(name: string): Promise<cPointObjGetRestraintResult> {
    return this.transport.request<cPointObjGetRestraintResult>({
      api: "cPointObj",
      method: "GetRestraint",
      parameters: {
        Name: name,
      },
    });
  }

  getSelected(name: string): Promise<cPointObjGetSelectedResult> {
    return this.transport.request<cPointObjGetSelectedResult>({
      api: "cPointObj",
      method: "GetSelected",
      parameters: {
        Name: name,
      },
    });
  }

  getSpecialPoint(name: string): Promise<cPointObjGetSpecialPointResult> {
    return this.transport.request<cPointObjGetSpecialPointResult>({
      api: "cPointObj",
      method: "GetSpecialPoint",
      parameters: {
        Name: name,
      },
    });
  }

  getSpring(name: string): Promise<cPointObjGetSpringResult> {
    return this.transport.request<cPointObjGetSpringResult>({
      api: "cPointObj",
      method: "GetSpring",
      parameters: {
        Name: name,
      },
    });
  }

  getSpringAssignment(name: string): Promise<cPointObjGetSpringAssignmentResult> {
    return this.transport.request<cPointObjGetSpringAssignmentResult>({
      api: "cPointObj",
      method: "GetSpringAssignment",
      parameters: {
        Name: name,
      },
    });
  }

  getSpringCoupled(name: string): Promise<cPointObjGetSpringCoupledResult> {
    return this.transport.request<cPointObjGetSpringCoupledResult>({
      api: "cPointObj",
      method: "GetSpringCoupled",
      parameters: {
        Name: name,
      },
    });
  }

  getTransformationMatrix(name: string, isGlobal?: boolean): Promise<cPointObjGetTransformationMatrixResult> {
    return this.transport.request<cPointObjGetTransformationMatrixResult>({
      api: "cPointObj",
      method: "GetTransformationMatrix",
      parameters: {
        Name: name,
        IsGlobal: isGlobal,
      },
    });
  }

  isSpringCoupled(name: string): Promise<cPointObjIsSpringCoupledResult> {
    return this.transport.request<cPointObjIsSpringCoupledResult>({
      api: "cPointObj",
      method: "IsSpringCoupled",
      parameters: {
        Name: name,
      },
    });
  }

  setDiaphragm(name: string, diaphragmOption: eDiaphragmOption, diaphragmName?: string): Promise<void> {
    return this.transport.request<void>({
      api: "cPointObj",
      method: "SetDiaphragm",
      parameters: {
        Name: name,
        DiaphragmOption: diaphragmOption,
        DiaphragmName: diaphragmName,
      },
    });
  }

  setGroupAssign(name: string, groupName: string, remove?: boolean, itemType?: eItemType): Promise<void> {
    return this.transport.request<void>({
      api: "cPointObj",
      method: "SetGroupAssign",
      parameters: {
        Name: name,
        GroupName: groupName,
        Remove: remove,
        ItemType: itemType,
      },
    });
  }

  setGUID(name: string, gUID?: string): Promise<void> {
    return this.transport.request<void>({
      api: "cPointObj",
      method: "SetGUID",
      parameters: {
        Name: name,
        GUID: gUID,
      },
    });
  }

  setLoadDispl(name: string, loadPat: string, value: number[], replace?: boolean, cSys?: string, itemType?: eItemType): Promise<cPointObjSetLoadDisplResult> {
    return this.transport.request<cPointObjSetLoadDisplResult>({
      api: "cPointObj",
      method: "SetLoadDispl",
      parameters: {
        Name: name,
        LoadPat: loadPat,
        Value: value,
        Replace: replace,
        CSys: cSys,
        ItemType: itemType,
      },
    });
  }

  setLoadForce(name: string, loadPat: string, value: number[], replace?: boolean, cSys?: string, itemType?: eItemType): Promise<cPointObjSetLoadForceResult> {
    return this.transport.request<cPointObjSetLoadForceResult>({
      api: "cPointObj",
      method: "SetLoadForce",
      parameters: {
        Name: name,
        LoadPat: loadPat,
        Value: value,
        Replace: replace,
        CSys: cSys,
        ItemType: itemType,
      },
    });
  }

  setMass(name: string, m: number[], itemType?: eItemType, isLocalCSys?: boolean, replace?: boolean): Promise<cPointObjSetMassResult> {
    return this.transport.request<cPointObjSetMassResult>({
      api: "cPointObj",
      method: "SetMass",
      parameters: {
        Name: name,
        M: m,
        ItemType: itemType,
        IsLocalCSys: isLocalCSys,
        Replace: replace,
      },
    });
  }

  setMassByVolume(name: string, matProp: string, m: number[], itemType?: eItemType, isLocalCSys?: boolean, replace?: boolean): Promise<cPointObjSetMassByVolumeResult> {
    return this.transport.request<cPointObjSetMassByVolumeResult>({
      api: "cPointObj",
      method: "SetMassByVolume",
      parameters: {
        Name: name,
        MatProp: matProp,
        M: m,
        ItemType: itemType,
        IsLocalCSys: isLocalCSys,
        Replace: replace,
      },
    });
  }

  setMassByWeight(name: string, m: number[], itemType?: eItemType, isLocalCSys?: boolean, replace?: boolean): Promise<cPointObjSetMassByWeightResult> {
    return this.transport.request<cPointObjSetMassByWeightResult>({
      api: "cPointObj",
      method: "SetMassByWeight",
      parameters: {
        Name: name,
        M: m,
        ItemType: itemType,
        IsLocalCSys: isLocalCSys,
        Replace: replace,
      },
    });
  }

  setPanelZone(name: string, propType: number, thickness: number, k1: number, k2: number, linkProp: string, connectivity: number, localAxisFrom: number, localAxisAngle: number, itemType?: eItemType): Promise<void> {
    return this.transport.request<void>({
      api: "cPointObj",
      method: "SetPanelZone",
      parameters: {
        Name: name,
        PropType: propType,
        Thickness: thickness,
        K1: k1,
        K2: k2,
        LinkProp: linkProp,
        Connectivity: connectivity,
        LocalAxisFrom: localAxisFrom,
        LocalAxisAngle: localAxisAngle,
        ItemType: itemType,
      },
    });
  }

  setRestraint(name: string, value: boolean[], itemType?: eItemType): Promise<cPointObjSetRestraintResult> {
    return this.transport.request<cPointObjSetRestraintResult>({
      api: "cPointObj",
      method: "SetRestraint",
      parameters: {
        Name: name,
        Value: value,
        ItemType: itemType,
      },
    });
  }

  setSelected(name: string, selected: boolean, itemType?: eItemType): Promise<void> {
    return this.transport.request<void>({
      api: "cPointObj",
      method: "SetSelected",
      parameters: {
        Name: name,
        Selected: selected,
        ItemType: itemType,
      },
    });
  }

  setSpecialPoint(name: string, specialPoint: boolean, itemType?: eItemType): Promise<void> {
    return this.transport.request<void>({
      api: "cPointObj",
      method: "SetSpecialPoint",
      parameters: {
        Name: name,
        SpecialPoint: specialPoint,
        ItemType: itemType,
      },
    });
  }

  setSpring(name: string, k: number[], itemType?: eItemType, isLocalCSys?: boolean, replace?: boolean): Promise<cPointObjSetSpringResult> {
    return this.transport.request<cPointObjSetSpringResult>({
      api: "cPointObj",
      method: "SetSpring",
      parameters: {
        Name: name,
        K: k,
        ItemType: itemType,
        IsLocalCSys: isLocalCSys,
        Replace: replace,
      },
    });
  }

  setSpringAssignment(name: string, springProp: string, itemType?: eItemType): Promise<void> {
    return this.transport.request<void>({
      api: "cPointObj",
      method: "SetSpringAssignment",
      parameters: {
        Name: name,
        SpringProp: springProp,
        ItemType: itemType,
      },
    });
  }

  setSpringCoupled(name: string, k: number[], itemType?: eItemType, isLocalCSys?: boolean, replace?: boolean): Promise<cPointObjSetSpringCoupledResult> {
    return this.transport.request<cPointObjSetSpringCoupledResult>({
      api: "cPointObj",
      method: "SetSpringCoupled",
      parameters: {
        Name: name,
        K: k,
        ItemType: itemType,
        IsLocalCSys: isLocalCSys,
        Replace: replace,
      },
    });
  }

}

export class cPropAreaApi {
  constructor(private readonly transport: EtabsTransport) {}

  changeName(name: string, newName: string): Promise<void> {
    return this.transport.request<void>({
      api: "cPropArea",
      method: "ChangeName",
      parameters: {
        Name: name,
        NewName: newName,
      },
    });
  }

  count(propType?: number): Promise<number> {
    return this.transport.request<number>({
      api: "cPropArea",
      method: "Count",
      parameters: {
        PropType: propType,
      },
    });
  }

  delete_(name: string): Promise<void> {
    return this.transport.request<void>({
      api: "cPropArea",
      method: "Delete",
      parameters: {
        Name: name,
      },
    });
  }

  getDeck(name: string): Promise<cPropAreaGetDeckResult> {
    return this.transport.request<cPropAreaGetDeckResult>({
      api: "cPropArea",
      method: "GetDeck",
      parameters: {
        Name: name,
      },
    });
  }

  getDeck_1(name: string): Promise<cPropAreaGetDeck_1Result> {
    return this.transport.request<cPropAreaGetDeck_1Result>({
      api: "cPropArea",
      method: "GetDeck_1",
      parameters: {
        Name: name,
      },
    });
  }

  getDeckFilled(name: string): Promise<cPropAreaGetDeckFilledResult> {
    return this.transport.request<cPropAreaGetDeckFilledResult>({
      api: "cPropArea",
      method: "GetDeckFilled",
      parameters: {
        Name: name,
      },
    });
  }

  getDeckSolidSlab(name: string): Promise<cPropAreaGetDeckSolidSlabResult> {
    return this.transport.request<cPropAreaGetDeckSolidSlabResult>({
      api: "cPropArea",
      method: "GetDeckSolidSlab",
      parameters: {
        Name: name,
      },
    });
  }

  getDeckUnfilled(name: string): Promise<cPropAreaGetDeckUnfilledResult> {
    return this.transport.request<cPropAreaGetDeckUnfilledResult>({
      api: "cPropArea",
      method: "GetDeckUnfilled",
      parameters: {
        Name: name,
      },
    });
  }

  getModifiers(name: string): Promise<cPropAreaGetModifiersResult> {
    return this.transport.request<cPropAreaGetModifiersResult>({
      api: "cPropArea",
      method: "GetModifiers",
      parameters: {
        Name: name,
      },
    });
  }

  getNameList(propType?: number): Promise<cPropAreaGetNameListResult> {
    return this.transport.request<cPropAreaGetNameListResult>({
      api: "cPropArea",
      method: "GetNameList",
      parameters: {
        PropType: propType,
      },
    });
  }

  getShellDesign(name: string): Promise<cPropAreaGetShellDesignResult> {
    return this.transport.request<cPropAreaGetShellDesignResult>({
      api: "cPropArea",
      method: "GetShellDesign",
      parameters: {
        Name: name,
      },
    });
  }

  getShellLayer(name: string): Promise<cPropAreaGetShellLayerResult> {
    return this.transport.request<cPropAreaGetShellLayerResult>({
      api: "cPropArea",
      method: "GetShellLayer",
      parameters: {
        Name: name,
      },
    });
  }

  getShellLayer_1(name: string): Promise<cPropAreaGetShellLayer_1Result> {
    return this.transport.request<cPropAreaGetShellLayer_1Result>({
      api: "cPropArea",
      method: "GetShellLayer_1",
      parameters: {
        Name: name,
      },
    });
  }

  getShellLayer_2(name: string): Promise<cPropAreaGetShellLayer_2Result> {
    return this.transport.request<cPropAreaGetShellLayer_2Result>({
      api: "cPropArea",
      method: "GetShellLayer_2",
      parameters: {
        Name: name,
      },
    });
  }

  getSlab(name: string): Promise<cPropAreaGetSlabResult> {
    return this.transport.request<cPropAreaGetSlabResult>({
      api: "cPropArea",
      method: "GetSlab",
      parameters: {
        Name: name,
      },
    });
  }

  getSlabRibbed(name: string): Promise<cPropAreaGetSlabRibbedResult> {
    return this.transport.request<cPropAreaGetSlabRibbedResult>({
      api: "cPropArea",
      method: "GetSlabRibbed",
      parameters: {
        Name: name,
      },
    });
  }

  getSlabWaffle(name: string): Promise<cPropAreaGetSlabWaffleResult> {
    return this.transport.request<cPropAreaGetSlabWaffleResult>({
      api: "cPropArea",
      method: "GetSlabWaffle",
      parameters: {
        Name: name,
      },
    });
  }

  getTypeOAPI(name: string): Promise<cPropAreaGetTypeOAPIResult> {
    return this.transport.request<cPropAreaGetTypeOAPIResult>({
      api: "cPropArea",
      method: "GetTypeOAPI",
      parameters: {
        Name: name,
      },
    });
  }

  getWall(name: string): Promise<cPropAreaGetWallResult> {
    return this.transport.request<cPropAreaGetWallResult>({
      api: "cPropArea",
      method: "GetWall",
      parameters: {
        Name: name,
      },
    });
  }

  getWallAutoSelectList(name: string): Promise<cPropAreaGetWallAutoSelectListResult> {
    return this.transport.request<cPropAreaGetWallAutoSelectListResult>({
      api: "cPropArea",
      method: "GetWallAutoSelectList",
      parameters: {
        Name: name,
      },
    });
  }

  setDeck(name: string, deckType: eDeckType, shellType: eShellType, matProp: string, thickness: number, color?: number, notes?: string, gUID?: string): Promise<void> {
    return this.transport.request<void>({
      api: "cPropArea",
      method: "SetDeck",
      parameters: {
        Name: name,
        DeckType: deckType,
        ShellType: shellType,
        MatProp: matProp,
        Thickness: thickness,
        color: color,
        notes: notes,
        GUID: gUID,
      },
    });
  }

  setDeck_1(name: string, deckType: eDeckType, slabFillMatProp: string, deckMatProp: string, slabDepth: number, ribDepth: number, ribWidthTop: number, ribWidthBot: number, ribSpacing: number, deckShearThickness: number, deckUnitWeight: number, shearStudDia: number, shearStudHs: number, shearStudFu: number, color?: number, notes?: string, gUID?: string): Promise<void> {
    return this.transport.request<void>({
      api: "cPropArea",
      method: "SetDeck_1",
      parameters: {
        Name: name,
        DeckType: deckType,
        SlabFillMatProp: slabFillMatProp,
        DeckMatProp: deckMatProp,
        SlabDepth: slabDepth,
        RibDepth: ribDepth,
        RibWidthTop: ribWidthTop,
        RibWidthBot: ribWidthBot,
        RibSpacing: ribSpacing,
        DeckShearThickness: deckShearThickness,
        DeckUnitWeight: deckUnitWeight,
        ShearStudDia: shearStudDia,
        ShearStudHs: shearStudHs,
        ShearStudFu: shearStudFu,
        color: color,
        notes: notes,
        GUID: gUID,
      },
    });
  }

  setDeckFilled(name: string, slabDepth: number, ribDepth: number, ribWidthTop: number, ribWidthBot: number, ribSpacing: number, shearThickness: number, unitWeight: number, shearStudDia: number, shearStudHt: number, shearStudFu: number): Promise<void> {
    return this.transport.request<void>({
      api: "cPropArea",
      method: "SetDeckFilled",
      parameters: {
        Name: name,
        SlabDepth: slabDepth,
        RibDepth: ribDepth,
        RibWidthTop: ribWidthTop,
        RibWidthBot: ribWidthBot,
        RibSpacing: ribSpacing,
        ShearThickness: shearThickness,
        UnitWeight: unitWeight,
        ShearStudDia: shearStudDia,
        ShearStudHt: shearStudHt,
        ShearStudFu: shearStudFu,
      },
    });
  }

  setDeckSolidSlab(name: string, slabDepth: number, shearStudDia: number, shearStudHt: number, shearStudFu: number): Promise<void> {
    return this.transport.request<void>({
      api: "cPropArea",
      method: "SetDeckSolidSlab",
      parameters: {
        Name: name,
        SlabDepth: slabDepth,
        ShearStudDia: shearStudDia,
        ShearStudHt: shearStudHt,
        ShearStudFu: shearStudFu,
      },
    });
  }

  setDeckUnfilled(name: string, ribDepth: number, ribWidthTop: number, ribWidthBot: number, ribSpacing: number, shearThickness: number, unitWeight: number): Promise<void> {
    return this.transport.request<void>({
      api: "cPropArea",
      method: "SetDeckUnfilled",
      parameters: {
        Name: name,
        RibDepth: ribDepth,
        RibWidthTop: ribWidthTop,
        RibWidthBot: ribWidthBot,
        RibSpacing: ribSpacing,
        ShearThickness: shearThickness,
        UnitWeight: unitWeight,
      },
    });
  }

  setModifiers(name: string, value: number[]): Promise<cPropAreaSetModifiersResult> {
    return this.transport.request<cPropAreaSetModifiersResult>({
      api: "cPropArea",
      method: "SetModifiers",
      parameters: {
        Name: name,
        Value: value,
      },
    });
  }

  setShellDesign(name: string, matProp: string, steelLayoutOption: number, designCoverTopDir1: number, designCoverTopDir2: number, designCoverBotDir1: number, designCoverBotDir2: number): Promise<void> {
    return this.transport.request<void>({
      api: "cPropArea",
      method: "SetShellDesign",
      parameters: {
        Name: name,
        MatProp: matProp,
        SteelLayoutOption: steelLayoutOption,
        DesignCoverTopDir1: designCoverTopDir1,
        DesignCoverTopDir2: designCoverTopDir2,
        DesignCoverBotDir1: designCoverBotDir1,
        DesignCoverBotDir2: designCoverBotDir2,
      },
    });
  }

  setShellLayer(name: string, numberLayers: number, layerName: string[], dist: number[], thickness: number[], matProp: string[], nonlinear: boolean[], matAng: number[], numIntegrationPts: number[]): Promise<cPropAreaSetShellLayerResult> {
    return this.transport.request<cPropAreaSetShellLayerResult>({
      api: "cPropArea",
      method: "SetShellLayer",
      parameters: {
        Name: name,
        NumberLayers: numberLayers,
        LayerName: layerName,
        Dist: dist,
        Thickness: thickness,
        MatProp: matProp,
        Nonlinear: nonlinear,
        MatAng: matAng,
        NumIntegrationPts: numIntegrationPts,
      },
    });
  }

  setShellLayer_1(name: string, numberLayers: number, layerName: string[], dist: number[], thickness: number[], myType: number[], numIntegrationPts: number[], matProp: string[], matAng: number[], s11Type: number[], s22Type: number[], s12Type: number[]): Promise<cPropAreaSetShellLayer_1Result> {
    return this.transport.request<cPropAreaSetShellLayer_1Result>({
      api: "cPropArea",
      method: "SetShellLayer_1",
      parameters: {
        Name: name,
        NumberLayers: numberLayers,
        LayerName: layerName,
        Dist: dist,
        Thickness: thickness,
        MyType: myType,
        NumIntegrationPts: numIntegrationPts,
        MatProp: matProp,
        MatAng: matAng,
        S11Type: s11Type,
        S22Type: s22Type,
        S12Type: s12Type,
      },
    });
  }

  setShellLayer_2(name: string, numberLayers: number, layerName: string[], dist: number[], thickness: number[], myType: number[], numIntegrationPts: number[], matProp: string[], matAng: number[], matBehavior: number[], s11Type: number[], s22Type: number[], s12Type: number[]): Promise<cPropAreaSetShellLayer_2Result> {
    return this.transport.request<cPropAreaSetShellLayer_2Result>({
      api: "cPropArea",
      method: "SetShellLayer_2",
      parameters: {
        Name: name,
        NumberLayers: numberLayers,
        LayerName: layerName,
        Dist: dist,
        Thickness: thickness,
        MyType: myType,
        NumIntegrationPts: numIntegrationPts,
        MatProp: matProp,
        MatAng: matAng,
        MatBehavior: matBehavior,
        S11Type: s11Type,
        S22Type: s22Type,
        S12Type: s12Type,
      },
    });
  }

  setSlab(name: string, slabType: eSlabType, shellType: eShellType, matProp: string, thickness: number, color?: number, notes?: string, gUID?: string): Promise<void> {
    return this.transport.request<void>({
      api: "cPropArea",
      method: "SetSlab",
      parameters: {
        Name: name,
        SlabType: slabType,
        ShellType: shellType,
        MatProp: matProp,
        Thickness: thickness,
        color: color,
        notes: notes,
        GUID: gUID,
      },
    });
  }

  setSlabRibbed(name: string, overallDepth: number, slabThickness: number, stemWidthTop: number, stemWidthBot: number, ribSpacing: number, ribsParallelTo: number): Promise<void> {
    return this.transport.request<void>({
      api: "cPropArea",
      method: "SetSlabRibbed",
      parameters: {
        Name: name,
        OverallDepth: overallDepth,
        SlabThickness: slabThickness,
        StemWidthTop: stemWidthTop,
        StemWidthBot: stemWidthBot,
        RibSpacing: ribSpacing,
        RibsParallelTo: ribsParallelTo,
      },
    });
  }

  setSlabWaffle(name: string, overallDepth: number, slabThickness: number, stemWidthTop: number, stemWidthBot: number, ribSpacingDir1: number, ribSpacingDir2: number): Promise<void> {
    return this.transport.request<void>({
      api: "cPropArea",
      method: "SetSlabWaffle",
      parameters: {
        Name: name,
        OverallDepth: overallDepth,
        SlabThickness: slabThickness,
        StemWidthTop: stemWidthTop,
        StemWidthBot: stemWidthBot,
        RibSpacingDir1: ribSpacingDir1,
        RibSpacingDir2: ribSpacingDir2,
      },
    });
  }

  setWall(name: string, wallPropType: eWallPropType, shellType: eShellType, matProp: string, thickness: number, color?: number, notes?: string, gUID?: string): Promise<void> {
    return this.transport.request<void>({
      api: "cPropArea",
      method: "SetWall",
      parameters: {
        Name: name,
        WallPropType: wallPropType,
        ShellType: shellType,
        MatProp: matProp,
        Thickness: thickness,
        color: color,
        notes: notes,
        GUID: gUID,
      },
    });
  }

  setWallAutoSelectList(name: string, autoSelectList: string[], startingProperty?: string): Promise<void> {
    return this.transport.request<void>({
      api: "cPropArea",
      method: "SetWallAutoSelectList",
      parameters: {
        Name: name,
        AutoSelectList: autoSelectList,
        StartingProperty: startingProperty,
      },
    });
  }

}

export class cPropAreaSpringApi {
  constructor(private readonly transport: EtabsTransport) {}

  changeName(name: string, newName: string): Promise<void> {
    return this.transport.request<void>({
      api: "cPropAreaSpring",
      method: "ChangeName",
      parameters: {
        Name: name,
        NewName: newName,
      },
    });
  }

  delete_(name: string): Promise<void> {
    return this.transport.request<void>({
      api: "cPropAreaSpring",
      method: "Delete",
      parameters: {
        Name: name,
      },
    });
  }

  getAreaSpringProp(name: string): Promise<cPropAreaSpringGetAreaSpringPropResult> {
    return this.transport.request<cPropAreaSpringGetAreaSpringPropResult>({
      api: "cPropAreaSpring",
      method: "GetAreaSpringProp",
      parameters: {
        Name: name,
      },
    });
  }

  getNameList(): Promise<cPropAreaSpringGetNameListResult> {
    return this.transport.request<cPropAreaSpringGetNameListResult>({
      api: "cPropAreaSpring",
      method: "GetNameList",
    });
  }

  setAreaSpringProp(name: string, u1: number, u2: number, u3: number, nonlinearOption3: number, springOption?: number, soilProfile?: string, endLengthRatio?: number, period?: number, color?: number, notes?: string, iGUID?: string): Promise<void> {
    return this.transport.request<void>({
      api: "cPropAreaSpring",
      method: "SetAreaSpringProp",
      parameters: {
        Name: name,
        U1: u1,
        U2: u2,
        U3: u3,
        NonlinearOption3: nonlinearOption3,
        SpringOption: springOption,
        SoilProfile: soilProfile,
        EndLengthRatio: endLengthRatio,
        Period: period,
        color: color,
        notes: notes,
        iGUID: iGUID,
      },
    });
  }

}

export class cPropFrameApi {
  constructor(private readonly transport: EtabsTransport) {}

  get sDShape(): cPropFrameSDShapeApi {
    return new cPropFrameSDShapeApi(this.transport);
  }

  changeName(name: string, newName: string): Promise<void> {
    return this.transport.request<void>({
      api: "cPropFrame",
      method: "ChangeName",
      parameters: {
        Name: name,
        NewName: newName,
      },
    });
  }

  count(propType?: eFramePropType): Promise<number> {
    return this.transport.request<number>({
      api: "cPropFrame",
      method: "Count",
      parameters: {
        PropType: propType,
      },
    });
  }

  delete_(name: string): Promise<void> {
    return this.transport.request<void>({
      api: "cPropFrame",
      method: "Delete",
      parameters: {
        Name: name,
      },
    });
  }

  getAllFrameProperties(): Promise<cPropFrameGetAllFramePropertiesResult> {
    return this.transport.request<cPropFrameGetAllFramePropertiesResult>({
      api: "cPropFrame",
      method: "GetAllFrameProperties",
    });
  }

  getAllFrameProperties_2(): Promise<cPropFrameGetAllFrameProperties_2Result> {
    return this.transport.request<cPropFrameGetAllFrameProperties_2Result>({
      api: "cPropFrame",
      method: "GetAllFrameProperties_2",
    });
  }

  getAngle(name: string): Promise<cPropFrameGetAngleResult> {
    return this.transport.request<cPropFrameGetAngleResult>({
      api: "cPropFrame",
      method: "GetAngle",
      parameters: {
        Name: name,
      },
    });
  }

  getAngle_1(name: string): Promise<cPropFrameGetAngle_1Result> {
    return this.transport.request<cPropFrameGetAngle_1Result>({
      api: "cPropFrame",
      method: "GetAngle_1",
      parameters: {
        Name: name,
      },
    });
  }

  getAutoSelectSteel(name: string): Promise<cPropFrameGetAutoSelectSteelResult> {
    return this.transport.request<cPropFrameGetAutoSelectSteelResult>({
      api: "cPropFrame",
      method: "GetAutoSelectSteel",
      parameters: {
        Name: name,
      },
    });
  }

  getChannel(name: string): Promise<cPropFrameGetChannelResult> {
    return this.transport.request<cPropFrameGetChannelResult>({
      api: "cPropFrame",
      method: "GetChannel",
      parameters: {
        Name: name,
      },
    });
  }

  getChannel_1(name: string): Promise<cPropFrameGetChannel_1Result> {
    return this.transport.request<cPropFrameGetChannel_1Result>({
      api: "cPropFrame",
      method: "GetChannel_1",
      parameters: {
        Name: name,
      },
    });
  }

  getChannel_2(name: string): Promise<cPropFrameGetChannel_2Result> {
    return this.transport.request<cPropFrameGetChannel_2Result>({
      api: "cPropFrame",
      method: "GetChannel_2",
      parameters: {
        Name: name,
      },
    });
  }

  getCircle(name: string): Promise<cPropFrameGetCircleResult> {
    return this.transport.request<cPropFrameGetCircleResult>({
      api: "cPropFrame",
      method: "GetCircle",
      parameters: {
        Name: name,
      },
    });
  }

  getColdC(name: string): Promise<cPropFrameGetColdCResult> {
    return this.transport.request<cPropFrameGetColdCResult>({
      api: "cPropFrame",
      method: "GetColdC",
      parameters: {
        Name: name,
      },
    });
  }

  getColdC_1(name: string): Promise<cPropFrameGetColdC_1Result> {
    return this.transport.request<cPropFrameGetColdC_1Result>({
      api: "cPropFrame",
      method: "GetColdC_1",
      parameters: {
        Name: name,
      },
    });
  }

  getColdHat(name: string): Promise<cPropFrameGetColdHatResult> {
    return this.transport.request<cPropFrameGetColdHatResult>({
      api: "cPropFrame",
      method: "GetColdHat",
      parameters: {
        Name: name,
      },
    });
  }

  getColdHat_1(name: string): Promise<cPropFrameGetColdHat_1Result> {
    return this.transport.request<cPropFrameGetColdHat_1Result>({
      api: "cPropFrame",
      method: "GetColdHat_1",
      parameters: {
        Name: name,
      },
    });
  }

  getColdZ(name: string): Promise<cPropFrameGetColdZResult> {
    return this.transport.request<cPropFrameGetColdZResult>({
      api: "cPropFrame",
      method: "GetColdZ",
      parameters: {
        Name: name,
      },
    });
  }

  getColdZ_1(name: string): Promise<cPropFrameGetColdZ_1Result> {
    return this.transport.request<cPropFrameGetColdZ_1Result>({
      api: "cPropFrame",
      method: "GetColdZ_1",
      parameters: {
        Name: name,
      },
    });
  }

  getConcreteBox(name: string): Promise<cPropFrameGetConcreteBoxResult> {
    return this.transport.request<cPropFrameGetConcreteBoxResult>({
      api: "cPropFrame",
      method: "GetConcreteBox",
      parameters: {
        Name: name,
      },
    });
  }

  getConcreteCross(name: string): Promise<cPropFrameGetConcreteCrossResult> {
    return this.transport.request<cPropFrameGetConcreteCrossResult>({
      api: "cPropFrame",
      method: "GetConcreteCross",
      parameters: {
        Name: name,
      },
    });
  }

  getConcreteL(name: string): Promise<cPropFrameGetConcreteLResult> {
    return this.transport.request<cPropFrameGetConcreteLResult>({
      api: "cPropFrame",
      method: "GetConcreteL",
      parameters: {
        Name: name,
      },
    });
  }

  getConcretePipe(name: string): Promise<cPropFrameGetConcretePipeResult> {
    return this.transport.request<cPropFrameGetConcretePipeResult>({
      api: "cPropFrame",
      method: "GetConcretePipe",
      parameters: {
        Name: name,
      },
    });
  }

  getConcreteTee(name: string): Promise<cPropFrameGetConcreteTeeResult> {
    return this.transport.request<cPropFrameGetConcreteTeeResult>({
      api: "cPropFrame",
      method: "GetConcreteTee",
      parameters: {
        Name: name,
      },
    });
  }

  getCoverPlatedI(name: string): Promise<cPropFrameGetCoverPlatedIResult> {
    return this.transport.request<cPropFrameGetCoverPlatedIResult>({
      api: "cPropFrame",
      method: "GetCoverPlatedI",
      parameters: {
        Name: name,
      },
    });
  }

  getDblAngle(name: string): Promise<cPropFrameGetDblAngleResult> {
    return this.transport.request<cPropFrameGetDblAngleResult>({
      api: "cPropFrame",
      method: "GetDblAngle",
      parameters: {
        Name: name,
      },
    });
  }

  getDblAngle_1(name: string): Promise<cPropFrameGetDblAngle_1Result> {
    return this.transport.request<cPropFrameGetDblAngle_1Result>({
      api: "cPropFrame",
      method: "GetDblAngle_1",
      parameters: {
        Name: name,
      },
    });
  }

  getDblAngle_2(name: string): Promise<cPropFrameGetDblAngle_2Result> {
    return this.transport.request<cPropFrameGetDblAngle_2Result>({
      api: "cPropFrame",
      method: "GetDblAngle_2",
      parameters: {
        Name: name,
      },
    });
  }

  getDblChannel(name: string): Promise<cPropFrameGetDblChannelResult> {
    return this.transport.request<cPropFrameGetDblChannelResult>({
      api: "cPropFrame",
      method: "GetDblChannel",
      parameters: {
        Name: name,
      },
    });
  }

  getDblChannel_1(name: string): Promise<cPropFrameGetDblChannel_1Result> {
    return this.transport.request<cPropFrameGetDblChannel_1Result>({
      api: "cPropFrame",
      method: "GetDblChannel_1",
      parameters: {
        Name: name,
      },
    });
  }

  getGeneral(name: string): Promise<cPropFrameGetGeneralResult> {
    return this.transport.request<cPropFrameGetGeneralResult>({
      api: "cPropFrame",
      method: "GetGeneral",
      parameters: {
        Name: name,
      },
    });
  }

  getGeneral_1(name: string): Promise<cPropFrameGetGeneral_1Result> {
    return this.transport.request<cPropFrameGetGeneral_1Result>({
      api: "cPropFrame",
      method: "GetGeneral_1",
      parameters: {
        Name: name,
      },
    });
  }

  getISection(name: string): Promise<cPropFrameGetISectionResult> {
    return this.transport.request<cPropFrameGetISectionResult>({
      api: "cPropFrame",
      method: "GetISection",
      parameters: {
        Name: name,
      },
    });
  }

  getISection_1(name: string): Promise<cPropFrameGetISection_1Result> {
    return this.transport.request<cPropFrameGetISection_1Result>({
      api: "cPropFrame",
      method: "GetISection_1",
      parameters: {
        Name: name,
      },
    });
  }

  getMaterial(name: string): Promise<cPropFrameGetMaterialResult> {
    return this.transport.request<cPropFrameGetMaterialResult>({
      api: "cPropFrame",
      method: "GetMaterial",
      parameters: {
        Name: name,
      },
    });
  }

  getModifiers(name: string): Promise<cPropFrameGetModifiersResult> {
    return this.transport.request<cPropFrameGetModifiersResult>({
      api: "cPropFrame",
      method: "GetModifiers",
      parameters: {
        Name: name,
      },
    });
  }

  getNameInPropFile(name: string): Promise<cPropFrameGetNameInPropFileResult> {
    return this.transport.request<cPropFrameGetNameInPropFileResult>({
      api: "cPropFrame",
      method: "GetNameInPropFile",
      parameters: {
        Name: name,
      },
    });
  }

  getNameList(propType?: eFramePropType): Promise<cPropFrameGetNameListResult> {
    return this.transport.request<cPropFrameGetNameListResult>({
      api: "cPropFrame",
      method: "GetNameList",
      parameters: {
        PropType: propType,
      },
    });
  }

  getNonPrismatic(name: string): Promise<cPropFrameGetNonPrismaticResult> {
    return this.transport.request<cPropFrameGetNonPrismaticResult>({
      api: "cPropFrame",
      method: "GetNonPrismatic",
      parameters: {
        Name: name,
      },
    });
  }

  getPipe(name: string): Promise<cPropFrameGetPipeResult> {
    return this.transport.request<cPropFrameGetPipeResult>({
      api: "cPropFrame",
      method: "GetPipe",
      parameters: {
        Name: name,
      },
    });
  }

  getPlate(name: string): Promise<cPropFrameGetPlateResult> {
    return this.transport.request<cPropFrameGetPlateResult>({
      api: "cPropFrame",
      method: "GetPlate",
      parameters: {
        Name: name,
      },
    });
  }

  getPrecastI(name: string): Promise<cPropFrameGetPrecastIResult> {
    return this.transport.request<cPropFrameGetPrecastIResult>({
      api: "cPropFrame",
      method: "GetPrecastI",
      parameters: {
        Name: name,
      },
    });
  }

  getPropFileNameList(fileName: string, propType?: eFramePropType): Promise<cPropFrameGetPropFileNameListResult> {
    return this.transport.request<cPropFrameGetPropFileNameListResult>({
      api: "cPropFrame",
      method: "GetPropFileNameList",
      parameters: {
        FileName: fileName,
        PropType: propType,
      },
    });
  }

  getRebarBeam(name: string): Promise<cPropFrameGetRebarBeamResult> {
    return this.transport.request<cPropFrameGetRebarBeamResult>({
      api: "cPropFrame",
      method: "GetRebarBeam",
      parameters: {
        Name: name,
      },
    });
  }

  getRebarColumn(name: string): Promise<cPropFrameGetRebarColumnResult> {
    return this.transport.request<cPropFrameGetRebarColumnResult>({
      api: "cPropFrame",
      method: "GetRebarColumn",
      parameters: {
        Name: name,
      },
    });
  }

  getRebarColumn_1(name: string): Promise<cPropFrameGetRebarColumn_1Result> {
    return this.transport.request<cPropFrameGetRebarColumn_1Result>({
      api: "cPropFrame",
      method: "GetRebarColumn_1",
      parameters: {
        Name: name,
      },
    });
  }

  getRectangle(name: string): Promise<cPropFrameGetRectangleResult> {
    return this.transport.request<cPropFrameGetRectangleResult>({
      api: "cPropFrame",
      method: "GetRectangle",
      parameters: {
        Name: name,
      },
    });
  }

  getRod(name: string): Promise<cPropFrameGetRodResult> {
    return this.transport.request<cPropFrameGetRodResult>({
      api: "cPropFrame",
      method: "GetRod",
      parameters: {
        Name: name,
      },
    });
  }

  getSDSection(name: string): Promise<cPropFrameGetSDSectionResult> {
    return this.transport.request<cPropFrameGetSDSectionResult>({
      api: "cPropFrame",
      method: "GetSDSection",
      parameters: {
        Name: name,
      },
    });
  }

  getSectProps(name: string): Promise<cPropFrameGetSectPropsResult> {
    return this.transport.request<cPropFrameGetSectPropsResult>({
      api: "cPropFrame",
      method: "GetSectProps",
      parameters: {
        Name: name,
      },
    });
  }

  getSteelAngle(name: string): Promise<cPropFrameGetSteelAngleResult> {
    return this.transport.request<cPropFrameGetSteelAngleResult>({
      api: "cPropFrame",
      method: "GetSteelAngle",
      parameters: {
        Name: name,
      },
    });
  }

  getSteelTee(name: string): Promise<cPropFrameGetSteelTeeResult> {
    return this.transport.request<cPropFrameGetSteelTeeResult>({
      api: "cPropFrame",
      method: "GetSteelTee",
      parameters: {
        Name: name,
      },
    });
  }

  getTee(name: string): Promise<cPropFrameGetTeeResult> {
    return this.transport.request<cPropFrameGetTeeResult>({
      api: "cPropFrame",
      method: "GetTee",
      parameters: {
        Name: name,
      },
    });
  }

  getTee_1(name: string): Promise<cPropFrameGetTee_1Result> {
    return this.transport.request<cPropFrameGetTee_1Result>({
      api: "cPropFrame",
      method: "GetTee_1",
      parameters: {
        Name: name,
      },
    });
  }

  getTrapezoidal(name: string): Promise<cPropFrameGetTrapezoidalResult> {
    return this.transport.request<cPropFrameGetTrapezoidalResult>({
      api: "cPropFrame",
      method: "GetTrapezoidal",
      parameters: {
        Name: name,
      },
    });
  }

  getTube(name: string): Promise<cPropFrameGetTubeResult> {
    return this.transport.request<cPropFrameGetTubeResult>({
      api: "cPropFrame",
      method: "GetTube",
      parameters: {
        Name: name,
      },
    });
  }

  getTube_1(name: string): Promise<cPropFrameGetTube_1Result> {
    return this.transport.request<cPropFrameGetTube_1Result>({
      api: "cPropFrame",
      method: "GetTube_1",
      parameters: {
        Name: name,
      },
    });
  }

  getTypeOAPI(name: string): Promise<cPropFrameGetTypeOAPIResult> {
    return this.transport.request<cPropFrameGetTypeOAPIResult>({
      api: "cPropFrame",
      method: "GetTypeOAPI",
      parameters: {
        Name: name,
      },
    });
  }

  getTypeRebar(name: string): Promise<cPropFrameGetTypeRebarResult> {
    return this.transport.request<cPropFrameGetTypeRebarResult>({
      api: "cPropFrame",
      method: "GetTypeRebar",
      parameters: {
        Name: name,
      },
    });
  }

  importProp(name: string, matProp: string, fileName: string, propName: string, color?: number, notes?: string, gUID?: string): Promise<void> {
    return this.transport.request<void>({
      api: "cPropFrame",
      method: "ImportProp",
      parameters: {
        Name: name,
        MatProp: matProp,
        FileName: fileName,
        PropName: propName,
        Color: color,
        Notes: notes,
        GUID: gUID,
      },
    });
  }

  setAngle(name: string, matProp: string, t3: number, t2: number, tf: number, tw: number, color?: number, notes?: string, gUID?: string): Promise<void> {
    return this.transport.request<void>({
      api: "cPropFrame",
      method: "SetAngle",
      parameters: {
        Name: name,
        MatProp: matProp,
        T3: t3,
        T2: t2,
        Tf: tf,
        Tw: tw,
        Color: color,
        Notes: notes,
        GUID: gUID,
      },
    });
  }

  setAngle_1(name: string, matProp: string, t3: number, t2: number, tf: number, tw: number, filletRadius: number, color?: number, notes?: string, gUID?: string): Promise<void> {
    return this.transport.request<void>({
      api: "cPropFrame",
      method: "SetAngle_1",
      parameters: {
        Name: name,
        MatProp: matProp,
        T3: t3,
        T2: t2,
        Tf: tf,
        Tw: tw,
        FilletRadius: filletRadius,
        Color: color,
        Notes: notes,
        GUID: gUID,
      },
    });
  }

  setAutoSelectSteel(name: string, numberItems: number, sectName: string[], autoStartSection?: string, notes?: string, gUID?: string): Promise<cPropFrameSetAutoSelectSteelResult> {
    return this.transport.request<cPropFrameSetAutoSelectSteelResult>({
      api: "cPropFrame",
      method: "SetAutoSelectSteel",
      parameters: {
        Name: name,
        NumberItems: numberItems,
        SectName: sectName,
        AutoStartSection: autoStartSection,
        Notes: notes,
        GUID: gUID,
      },
    });
  }

  setChannel(name: string, matProp: string, t3: number, t2: number, tf: number, tw: number, color?: number, notes?: string, gUID?: string): Promise<void> {
    return this.transport.request<void>({
      api: "cPropFrame",
      method: "SetChannel",
      parameters: {
        Name: name,
        MatProp: matProp,
        T3: t3,
        T2: t2,
        Tf: tf,
        Tw: tw,
        Color: color,
        Notes: notes,
        GUID: gUID,
      },
    });
  }

  setChannel_1(name: string, matProp: string, t3: number, t2: number, tf: number, tw: number, mirrorAbout2: boolean, color?: number, notes?: string, gUID?: string): Promise<void> {
    return this.transport.request<void>({
      api: "cPropFrame",
      method: "SetChannel_1",
      parameters: {
        Name: name,
        MatProp: matProp,
        T3: t3,
        T2: t2,
        Tf: tf,
        Tw: tw,
        MirrorAbout2: mirrorAbout2,
        Color: color,
        Notes: notes,
        GUID: gUID,
      },
    });
  }

  setChannel_2(name: string, matProp: string, t3: number, t2: number, tf: number, tw: number, filletRadius: number, mirrorAbout2: boolean, color?: number, notes?: string, gUID?: string): Promise<void> {
    return this.transport.request<void>({
      api: "cPropFrame",
      method: "SetChannel_2",
      parameters: {
        Name: name,
        MatProp: matProp,
        T3: t3,
        T2: t2,
        Tf: tf,
        Tw: tw,
        FilletRadius: filletRadius,
        MirrorAbout2: mirrorAbout2,
        Color: color,
        Notes: notes,
        GUID: gUID,
      },
    });
  }

  setCircle(name: string, matProp: string, t3: number, color?: number, notes?: string, gUID?: string): Promise<void> {
    return this.transport.request<void>({
      api: "cPropFrame",
      method: "SetCircle",
      parameters: {
        Name: name,
        MatProp: matProp,
        T3: t3,
        Color: color,
        Notes: notes,
        GUID: gUID,
      },
    });
  }

  setColdC(name: string, matProp: string, t3: number, t2: number, thickness: number, radius: number, lipDepth: number, color?: number, notes?: string, gUID?: string): Promise<void> {
    return this.transport.request<void>({
      api: "cPropFrame",
      method: "SetColdC",
      parameters: {
        Name: name,
        MatProp: matProp,
        T3: t3,
        T2: t2,
        Thickness: thickness,
        Radius: radius,
        LipDepth: lipDepth,
        Color: color,
        Notes: notes,
        GUID: gUID,
      },
    });
  }

  setColdC_1(name: string, matProp: string, t3: number, t2: number, thickness: number, radius: number, lipDepth: number, mirrorAbout2: boolean, color?: number, notes?: string, gUID?: string): Promise<void> {
    return this.transport.request<void>({
      api: "cPropFrame",
      method: "SetColdC_1",
      parameters: {
        Name: name,
        MatProp: matProp,
        T3: t3,
        T2: t2,
        Thickness: thickness,
        Radius: radius,
        LipDepth: lipDepth,
        MirrorAbout2: mirrorAbout2,
        Color: color,
        Notes: notes,
        GUID: gUID,
      },
    });
  }

  setColdHat(name: string, matProp: string, t3: number, t2: number, thickness: number, radius: number, lipDepth: number, color?: number, notes?: string, gUID?: string): Promise<void> {
    return this.transport.request<void>({
      api: "cPropFrame",
      method: "SetColdHat",
      parameters: {
        Name: name,
        MatProp: matProp,
        T3: t3,
        T2: t2,
        Thickness: thickness,
        Radius: radius,
        LipDepth: lipDepth,
        Color: color,
        Notes: notes,
        GUID: gUID,
      },
    });
  }

  setColdHat_1(name: string, matProp: string, t3: number, t2: number, thickness: number, radius: number, lipDepth: number, mirrorAbout2: boolean, color?: number, notes?: string, gUID?: string): Promise<void> {
    return this.transport.request<void>({
      api: "cPropFrame",
      method: "SetColdHat_1",
      parameters: {
        Name: name,
        MatProp: matProp,
        T3: t3,
        T2: t2,
        Thickness: thickness,
        Radius: radius,
        LipDepth: lipDepth,
        MirrorAbout2: mirrorAbout2,
        Color: color,
        Notes: notes,
        GUID: gUID,
      },
    });
  }

  setColdZ(name: string, matProp: string, t3: number, t2: number, thickness: number, radius: number, lipDepth: number, lipAngle: number, color?: number, notes?: string, gUID?: string): Promise<void> {
    return this.transport.request<void>({
      api: "cPropFrame",
      method: "SetColdZ",
      parameters: {
        Name: name,
        MatProp: matProp,
        T3: t3,
        T2: t2,
        Thickness: thickness,
        Radius: radius,
        LipDepth: lipDepth,
        LipAngle: lipAngle,
        Color: color,
        Notes: notes,
        GUID: gUID,
      },
    });
  }

  setColdZ_1(name: string, matProp: string, t3: number, t2: number, thickness: number, radius: number, lipDepth: number, lipAngle: number, mirrorAbout2: boolean, color?: number, notes?: string, gUID?: string): Promise<void> {
    return this.transport.request<void>({
      api: "cPropFrame",
      method: "SetColdZ_1",
      parameters: {
        Name: name,
        MatProp: matProp,
        T3: t3,
        T2: t2,
        Thickness: thickness,
        Radius: radius,
        LipDepth: lipDepth,
        LipAngle: lipAngle,
        MirrorAbout2: mirrorAbout2,
        Color: color,
        Notes: notes,
        GUID: gUID,
      },
    });
  }

  setConcreteBox(name: string, matProp: string, t3: number, t2: number, tf: number, tw: number, color?: number, notes?: string, gUID?: string): Promise<void> {
    return this.transport.request<void>({
      api: "cPropFrame",
      method: "SetConcreteBox",
      parameters: {
        Name: name,
        MatProp: matProp,
        T3: t3,
        T2: t2,
        Tf: tf,
        Tw: tw,
        Color: color,
        Notes: notes,
        GUID: gUID,
      },
    });
  }

  setConcreteCross(name: string, matProp: string, t3: number, t2: number, tf: number, tw: number, color?: number, notes?: string, gUID?: string): Promise<void> {
    return this.transport.request<void>({
      api: "cPropFrame",
      method: "SetConcreteCross",
      parameters: {
        Name: name,
        MatProp: matProp,
        T3: t3,
        T2: t2,
        Tf: tf,
        Tw: tw,
        Color: color,
        Notes: notes,
        GUID: gUID,
      },
    });
  }

  setConcreteL(name: string, matProp: string, t3: number, t2: number, tf: number, twC: number, twT: number, mirrorAbout2: boolean, mirrorAbout3: boolean, color?: number, notes?: string, gUID?: string): Promise<void> {
    return this.transport.request<void>({
      api: "cPropFrame",
      method: "SetConcreteL",
      parameters: {
        Name: name,
        MatProp: matProp,
        T3: t3,
        T2: t2,
        Tf: tf,
        TwC: twC,
        TwT: twT,
        MirrorAbout2: mirrorAbout2,
        MirrorAbout3: mirrorAbout3,
        Color: color,
        Notes: notes,
        GUID: gUID,
      },
    });
  }

  setConcretePipe(name: string, matProp: string, diameter: number, tw: number, color?: number, notes?: string, gUID?: string): Promise<void> {
    return this.transport.request<void>({
      api: "cPropFrame",
      method: "SetConcretePipe",
      parameters: {
        Name: name,
        MatProp: matProp,
        Diameter: diameter,
        Tw: tw,
        Color: color,
        Notes: notes,
        GUID: gUID,
      },
    });
  }

  setConcreteTee(name: string, matProp: string, t3: number, t2: number, tf: number, twF: number, twT: number, mirrorAbout3: boolean, color?: number, notes?: string, gUID?: string): Promise<void> {
    return this.transport.request<void>({
      api: "cPropFrame",
      method: "SetConcreteTee",
      parameters: {
        Name: name,
        MatProp: matProp,
        T3: t3,
        T2: t2,
        Tf: tf,
        TwF: twF,
        TwT: twT,
        MirrorAbout3: mirrorAbout3,
        Color: color,
        Notes: notes,
        GUID: gUID,
      },
    });
  }

  setCoverPlatedI(name: string, sectName: string, fyTopFlange: number, fyWeb: number, fyBotFlange: number, tc: number, bc: number, matPropTop: string, tcb: number, bcb: number, matPropBot: string, color?: number, notes?: string, gUID?: string): Promise<void> {
    return this.transport.request<void>({
      api: "cPropFrame",
      method: "SetCoverPlatedI",
      parameters: {
        Name: name,
        SectName: sectName,
        FyTopFlange: fyTopFlange,
        FyWeb: fyWeb,
        FyBotFlange: fyBotFlange,
        Tc: tc,
        Bc: bc,
        MatPropTop: matPropTop,
        Tcb: tcb,
        Bcb: bcb,
        MatPropBot: matPropBot,
        Color: color,
        Notes: notes,
        GUID: gUID,
      },
    });
  }

  setDblAngle(name: string, matProp: string, t3: number, t2: number, tf: number, tw: number, dis: number, color?: number, notes?: string, gUID?: string): Promise<void> {
    return this.transport.request<void>({
      api: "cPropFrame",
      method: "SetDblAngle",
      parameters: {
        Name: name,
        MatProp: matProp,
        T3: t3,
        T2: t2,
        Tf: tf,
        Tw: tw,
        Dis: dis,
        Color: color,
        Notes: notes,
        GUID: gUID,
      },
    });
  }

  setDblAngle_1(name: string, matProp: string, t3: number, t2: number, tf: number, tw: number, dis: number, mirrorAbout3: boolean, color?: number, notes?: string, gUID?: string): Promise<void> {
    return this.transport.request<void>({
      api: "cPropFrame",
      method: "SetDblAngle_1",
      parameters: {
        Name: name,
        MatProp: matProp,
        T3: t3,
        T2: t2,
        Tf: tf,
        Tw: tw,
        Dis: dis,
        MirrorAbout3: mirrorAbout3,
        Color: color,
        Notes: notes,
        GUID: gUID,
      },
    });
  }

  setDblAngle_2(name: string, matProp: string, t3: number, t2: number, tf: number, tw: number, dis: number, filletRadius: number, mirrorAbout3: boolean, color?: number, notes?: string, gUID?: string): Promise<void> {
    return this.transport.request<void>({
      api: "cPropFrame",
      method: "SetDblAngle_2",
      parameters: {
        Name: name,
        MatProp: matProp,
        T3: t3,
        T2: t2,
        Tf: tf,
        Tw: tw,
        Dis: dis,
        FilletRadius: filletRadius,
        MirrorAbout3: mirrorAbout3,
        Color: color,
        Notes: notes,
        GUID: gUID,
      },
    });
  }

  setDblChannel(name: string, matProp: string, t3: number, t2: number, tf: number, tw: number, dis: number, color?: number, notes?: string, gUID?: string): Promise<void> {
    return this.transport.request<void>({
      api: "cPropFrame",
      method: "SetDblChannel",
      parameters: {
        Name: name,
        MatProp: matProp,
        T3: t3,
        T2: t2,
        Tf: tf,
        Tw: tw,
        Dis: dis,
        Color: color,
        Notes: notes,
        GUID: gUID,
      },
    });
  }

  setDblChannel_1(name: string, matProp: string, t3: number, t2: number, tf: number, tw: number, dis: number, filletRadius: number, color?: number, notes?: string, gUID?: string): Promise<void> {
    return this.transport.request<void>({
      api: "cPropFrame",
      method: "SetDblChannel_1",
      parameters: {
        Name: name,
        MatProp: matProp,
        T3: t3,
        T2: t2,
        Tf: tf,
        Tw: tw,
        Dis: dis,
        FilletRadius: filletRadius,
        Color: color,
        Notes: notes,
        GUID: gUID,
      },
    });
  }

  setGeneral(name: string, matProp: string, t3: number, t2: number, area: number, as2: number, as3: number, torsion: number, i22: number, i33: number, s22: number, s33: number, z22: number, z33: number, r22: number, r33: number, color?: number, notes?: string, gUID?: string): Promise<void> {
    return this.transport.request<void>({
      api: "cPropFrame",
      method: "SetGeneral",
      parameters: {
        Name: name,
        MatProp: matProp,
        T3: t3,
        T2: t2,
        Area: area,
        As2: as2,
        As3: as3,
        Torsion: torsion,
        I22: i22,
        I33: i33,
        S22: s22,
        S33: s33,
        Z22: z22,
        Z33: z33,
        R22: r22,
        R33: r33,
        Color: color,
        Notes: notes,
        GUID: gUID,
      },
    });
  }

  setGeneral_1(name: string, matProp: string, t3: number, t2: number, area: number, as2: number, as3: number, torsion: number, i22: number, i33: number, i23: number, s22: number, s33: number, z22: number, z33: number, r22: number, r33: number, eccV2: number, eccV3: number, color?: number, notes?: string, gUID?: string): Promise<void> {
    return this.transport.request<void>({
      api: "cPropFrame",
      method: "SetGeneral_1",
      parameters: {
        Name: name,
        MatProp: matProp,
        T3: t3,
        T2: t2,
        Area: area,
        As2: as2,
        As3: as3,
        Torsion: torsion,
        I22: i22,
        I33: i33,
        I23: i23,
        S22: s22,
        S33: s33,
        Z22: z22,
        Z33: z33,
        R22: r22,
        R33: r33,
        EccV2: eccV2,
        EccV3: eccV3,
        Color: color,
        Notes: notes,
        GUID: gUID,
      },
    });
  }

  setISection(name: string, matProp: string, t3: number, t2: number, tf: number, tw: number, t2b: number, tfb: number, color?: number, notes?: string, gUID?: string): Promise<void> {
    return this.transport.request<void>({
      api: "cPropFrame",
      method: "SetISection",
      parameters: {
        Name: name,
        MatProp: matProp,
        T3: t3,
        T2: t2,
        Tf: tf,
        Tw: tw,
        T2b: t2b,
        Tfb: tfb,
        Color: color,
        Notes: notes,
        GUID: gUID,
      },
    });
  }

  setISection_1(name: string, matProp: string, t3: number, t2: number, tf: number, tw: number, t2b: number, tfb: number, filletRadius: number, color?: number, notes?: string, gUID?: string): Promise<void> {
    return this.transport.request<void>({
      api: "cPropFrame",
      method: "SetISection_1",
      parameters: {
        Name: name,
        MatProp: matProp,
        T3: t3,
        T2: t2,
        Tf: tf,
        Tw: tw,
        T2b: t2b,
        Tfb: tfb,
        FilletRadius: filletRadius,
        Color: color,
        Notes: notes,
        GUID: gUID,
      },
    });
  }

  setMaterial(name: string, matProp: string): Promise<void> {
    return this.transport.request<void>({
      api: "cPropFrame",
      method: "SetMaterial",
      parameters: {
        Name: name,
        MatProp: matProp,
      },
    });
  }

  setModifiers(name: string, value: number[]): Promise<cPropFrameSetModifiersResult> {
    return this.transport.request<cPropFrameSetModifiersResult>({
      api: "cPropFrame",
      method: "SetModifiers",
      parameters: {
        Name: name,
        Value: value,
      },
    });
  }

  setNonPrismatic(name: string, numberItems: number, startSec: string[], endSec: string[], myLength: number[], myType: number[], eI33: number[], eI22: number[], color?: number, notes?: string, gUID?: string): Promise<cPropFrameSetNonPrismaticResult> {
    return this.transport.request<cPropFrameSetNonPrismaticResult>({
      api: "cPropFrame",
      method: "SetNonPrismatic",
      parameters: {
        Name: name,
        NumberItems: numberItems,
        StartSec: startSec,
        EndSec: endSec,
        MyLength: myLength,
        MyType: myType,
        EI33: eI33,
        EI22: eI22,
        Color: color,
        Notes: notes,
        GUID: gUID,
      },
    });
  }

  setPipe(name: string, matProp: string, t3: number, tW: number, color?: number, notes?: string, gUID?: string): Promise<void> {
    return this.transport.request<void>({
      api: "cPropFrame",
      method: "SetPipe",
      parameters: {
        Name: name,
        MatProp: matProp,
        T3: t3,
        TW: tW,
        Color: color,
        Notes: notes,
        GUID: gUID,
      },
    });
  }

  setPlate(name: string, matProp: string, t3: number, t2: number, color?: number, notes?: string, gUID?: string): Promise<void> {
    return this.transport.request<void>({
      api: "cPropFrame",
      method: "SetPlate",
      parameters: {
        Name: name,
        MatProp: matProp,
        T3: t3,
        T2: t2,
        Color: color,
        Notes: notes,
        GUID: gUID,
      },
    });
  }

  setPrecastI(name: string, matProp: string, b: number[], d: number[], color?: number, notes?: string, gUID?: string): Promise<cPropFrameSetPrecastIResult> {
    return this.transport.request<cPropFrameSetPrecastIResult>({
      api: "cPropFrame",
      method: "SetPrecastI",
      parameters: {
        Name: name,
        MatProp: matProp,
        b: b,
        d: d,
        Color: color,
        Notes: notes,
        GUID: gUID,
      },
    });
  }

  setRebarBeam(name: string, matPropLong: string, matPropConfine: string, coverTop: number, coverBot: number, topLeftArea: number, topRightArea: number, botLeftArea: number, botRightArea: number): Promise<void> {
    return this.transport.request<void>({
      api: "cPropFrame",
      method: "SetRebarBeam",
      parameters: {
        Name: name,
        MatPropLong: matPropLong,
        MatPropConfine: matPropConfine,
        CoverTop: coverTop,
        CoverBot: coverBot,
        TopLeftArea: topLeftArea,
        TopRightArea: topRightArea,
        BotLeftArea: botLeftArea,
        BotRightArea: botRightArea,
      },
    });
  }

  setRebarColumn(name: string, matPropLong: string, matPropConfine: string, pattern: number, confineType: number, cover: number, numberCBars: number, numberR3Bars: number, numberR2Bars: number, rebarSize: string, tieSize: string, tieSpacingLongit: number, number2DirTieBars: number, number3DirTieBars: number, toBeDesigned: boolean): Promise<void> {
    return this.transport.request<void>({
      api: "cPropFrame",
      method: "SetRebarColumn",
      parameters: {
        Name: name,
        MatPropLong: matPropLong,
        MatPropConfine: matPropConfine,
        Pattern: pattern,
        ConfineType: confineType,
        Cover: cover,
        NumberCBars: numberCBars,
        NumberR3Bars: numberR3Bars,
        NumberR2Bars: numberR2Bars,
        RebarSize: rebarSize,
        TieSize: tieSize,
        TieSpacingLongit: tieSpacingLongit,
        Number2DirTieBars: number2DirTieBars,
        Number3DirTieBars: number3DirTieBars,
        ToBeDesigned: toBeDesigned,
      },
    });
  }

  setRectangle(name: string, matProp: string, t3: number, t2: number, color?: number, notes?: string, gUID?: string): Promise<void> {
    return this.transport.request<void>({
      api: "cPropFrame",
      method: "SetRectangle",
      parameters: {
        Name: name,
        MatProp: matProp,
        T3: t3,
        T2: t2,
        Color: color,
        Notes: notes,
        GUID: gUID,
      },
    });
  }

  setRod(name: string, matProp: string, t3: number, color?: number, notes?: string, gUID?: string): Promise<void> {
    return this.transport.request<void>({
      api: "cPropFrame",
      method: "SetRod",
      parameters: {
        Name: name,
        MatProp: matProp,
        T3: t3,
        Color: color,
        Notes: notes,
        GUID: gUID,
      },
    });
  }

  setSDSection(name: string, matProp: string, designType?: number, color?: number, notes?: string, gUID?: string): Promise<void> {
    return this.transport.request<void>({
      api: "cPropFrame",
      method: "SetSDSection",
      parameters: {
        Name: name,
        MatProp: matProp,
        DesignType: designType,
        Color: color,
        Notes: notes,
        GUID: gUID,
      },
    });
  }

  setSteelAngle(name: string, matProp: string, t3: number, t2: number, tf: number, tw: number, r: number, mirrorAbout2: boolean, mirrorAbout3: boolean, color?: number, notes?: string, gUID?: string): Promise<void> {
    return this.transport.request<void>({
      api: "cPropFrame",
      method: "SetSteelAngle",
      parameters: {
        Name: name,
        MatProp: matProp,
        T3: t3,
        T2: t2,
        Tf: tf,
        Tw: tw,
        r: r,
        MirrorAbout2: mirrorAbout2,
        MirrorAbout3: mirrorAbout3,
        Color: color,
        Notes: notes,
        GUID: gUID,
      },
    });
  }

  setSteelTee(name: string, matProp: string, t3: number, t2: number, tf: number, tw: number, r: number, mirrorAbout3: boolean, color?: number, notes?: string, gUID?: string): Promise<void> {
    return this.transport.request<void>({
      api: "cPropFrame",
      method: "SetSteelTee",
      parameters: {
        Name: name,
        MatProp: matProp,
        T3: t3,
        T2: t2,
        Tf: tf,
        Tw: tw,
        r: r,
        MirrorAbout3: mirrorAbout3,
        Color: color,
        Notes: notes,
        GUID: gUID,
      },
    });
  }

  setTee(name: string, matProp: string, t3: number, t2: number, tf: number, tw: number, color?: number, notes?: string, gUID?: string): Promise<void> {
    return this.transport.request<void>({
      api: "cPropFrame",
      method: "SetTee",
      parameters: {
        Name: name,
        MatProp: matProp,
        T3: t3,
        T2: t2,
        Tf: tf,
        Tw: tw,
        Color: color,
        Notes: notes,
        GUID: gUID,
      },
    });
  }

  setTee_1(name: string, matProp: string, t3: number, t2: number, tf: number, tw: number, filletRadius: number, mirrorAbout3: boolean, color?: number, notes?: string, gUID?: string): Promise<void> {
    return this.transport.request<void>({
      api: "cPropFrame",
      method: "SetTee_1",
      parameters: {
        Name: name,
        MatProp: matProp,
        T3: t3,
        T2: t2,
        Tf: tf,
        Tw: tw,
        FilletRadius: filletRadius,
        MirrorAbout3: mirrorAbout3,
        Color: color,
        Notes: notes,
        GUID: gUID,
      },
    });
  }

  setTrapezoidal(name: string, matProp: string, t3: number, t2: number, t2b: number, color?: number, notes?: string, gUID?: string): Promise<void> {
    return this.transport.request<void>({
      api: "cPropFrame",
      method: "SetTrapezoidal",
      parameters: {
        Name: name,
        MatProp: matProp,
        T3: t3,
        T2: t2,
        T2b: t2b,
        Color: color,
        Notes: notes,
        GUID: gUID,
      },
    });
  }

  setTube(name: string, matProp: string, t3: number, t2: number, tf: number, tw: number, color?: number, notes?: string, gUID?: string): Promise<void> {
    return this.transport.request<void>({
      api: "cPropFrame",
      method: "SetTube",
      parameters: {
        Name: name,
        MatProp: matProp,
        T3: t3,
        T2: t2,
        Tf: tf,
        Tw: tw,
        Color: color,
        Notes: notes,
        GUID: gUID,
      },
    });
  }

  setTube_1(name: string, matProp: string, t3: number, t2: number, tf: number, tw: number, radius: number, color?: number, notes?: string, gUID?: string): Promise<void> {
    return this.transport.request<void>({
      api: "cPropFrame",
      method: "SetTube_1",
      parameters: {
        Name: name,
        MatProp: matProp,
        T3: t3,
        T2: t2,
        Tf: tf,
        Tw: tw,
        Radius: radius,
        Color: color,
        Notes: notes,
        GUID: gUID,
      },
    });
  }

}

export class cPropFrameSDShapeApi {
  constructor(private readonly transport: EtabsTransport) {}

  getAngle(name: string, shapeName: string): Promise<cPropFrameSDShapeGetAngleResult> {
    return this.transport.request<cPropFrameSDShapeGetAngleResult>({
      api: "cPropFrameSDShape",
      method: "GetAngle",
      parameters: {
        Name: name,
        ShapeName: shapeName,
      },
    });
  }

  getConcreteL(name: string, shapeName: string): Promise<cPropFrameSDShapeGetConcreteLResult> {
    return this.transport.request<cPropFrameSDShapeGetConcreteLResult>({
      api: "cPropFrameSDShape",
      method: "GetConcreteL",
      parameters: {
        Name: name,
        ShapeName: shapeName,
      },
    });
  }

  getConcreteTee(name: string, shapeName: string): Promise<cPropFrameSDShapeGetConcreteTeeResult> {
    return this.transport.request<cPropFrameSDShapeGetConcreteTeeResult>({
      api: "cPropFrameSDShape",
      method: "GetConcreteTee",
      parameters: {
        Name: name,
        ShapeName: shapeName,
      },
    });
  }

  getISection(name: string, shapeName: string): Promise<cPropFrameSDShapeGetISectionResult> {
    return this.transport.request<cPropFrameSDShapeGetISectionResult>({
      api: "cPropFrameSDShape",
      method: "GetISection",
      parameters: {
        Name: name,
        ShapeName: shapeName,
      },
    });
  }

  getReinfCircle(name: string, shapeName: string): Promise<cPropFrameSDShapeGetReinfCircleResult> {
    return this.transport.request<cPropFrameSDShapeGetReinfCircleResult>({
      api: "cPropFrameSDShape",
      method: "GetReinfCircle",
      parameters: {
        Name: name,
        ShapeName: shapeName,
      },
    });
  }

  getReinfCorner(name: string, shapeName: string): Promise<cPropFrameSDShapeGetReinfCornerResult> {
    return this.transport.request<cPropFrameSDShapeGetReinfCornerResult>({
      api: "cPropFrameSDShape",
      method: "GetReinfCorner",
      parameters: {
        Name: name,
        ShapeName: shapeName,
      },
    });
  }

  getReinfEdge(name: string, shapeName: string): Promise<cPropFrameSDShapeGetReinfEdgeResult> {
    return this.transport.request<cPropFrameSDShapeGetReinfEdgeResult>({
      api: "cPropFrameSDShape",
      method: "GetReinfEdge",
      parameters: {
        Name: name,
        ShapeName: shapeName,
      },
    });
  }

  getReinfLine(name: string, shapeName: string): Promise<cPropFrameSDShapeGetReinfLineResult> {
    return this.transport.request<cPropFrameSDShapeGetReinfLineResult>({
      api: "cPropFrameSDShape",
      method: "GetReinfLine",
      parameters: {
        Name: name,
        ShapeName: shapeName,
      },
    });
  }

  getReinfRectangular(name: string, shapeName: string): Promise<cPropFrameSDShapeGetReinfRectangularResult> {
    return this.transport.request<cPropFrameSDShapeGetReinfRectangularResult>({
      api: "cPropFrameSDShape",
      method: "GetReinfRectangular",
      parameters: {
        Name: name,
        ShapeName: shapeName,
      },
    });
  }

  getReinfSingle(name: string, shapeName: string): Promise<cPropFrameSDShapeGetReinfSingleResult> {
    return this.transport.request<cPropFrameSDShapeGetReinfSingleResult>({
      api: "cPropFrameSDShape",
      method: "GetReinfSingle",
      parameters: {
        Name: name,
        ShapeName: shapeName,
      },
    });
  }

  getSolidCircle(name: string, shapeName: string): Promise<cPropFrameSDShapeGetSolidCircleResult> {
    return this.transport.request<cPropFrameSDShapeGetSolidCircleResult>({
      api: "cPropFrameSDShape",
      method: "GetSolidCircle",
      parameters: {
        Name: name,
        ShapeName: shapeName,
      },
    });
  }

  getSolidRect(name: string, shapeName: string): Promise<cPropFrameSDShapeGetSolidRectResult> {
    return this.transport.request<cPropFrameSDShapeGetSolidRectResult>({
      api: "cPropFrameSDShape",
      method: "GetSolidRect",
      parameters: {
        Name: name,
        ShapeName: shapeName,
      },
    });
  }

  getTee(name: string, shapeName: string): Promise<cPropFrameSDShapeGetTeeResult> {
    return this.transport.request<cPropFrameSDShapeGetTeeResult>({
      api: "cPropFrameSDShape",
      method: "GetTee",
      parameters: {
        Name: name,
        ShapeName: shapeName,
      },
    });
  }

}

export class cPropLineSpringApi {
  constructor(private readonly transport: EtabsTransport) {}

  changeName(name: string, newName: string): Promise<void> {
    return this.transport.request<void>({
      api: "cPropLineSpring",
      method: "ChangeName",
      parameters: {
        Name: name,
        NewName: newName,
      },
    });
  }

  delete_(name: string): Promise<void> {
    return this.transport.request<void>({
      api: "cPropLineSpring",
      method: "Delete",
      parameters: {
        Name: name,
      },
    });
  }

  getLineSpringProp(name: string): Promise<cPropLineSpringGetLineSpringPropResult> {
    return this.transport.request<cPropLineSpringGetLineSpringPropResult>({
      api: "cPropLineSpring",
      method: "GetLineSpringProp",
      parameters: {
        Name: name,
      },
    });
  }

  getNameList(): Promise<cPropLineSpringGetNameListResult> {
    return this.transport.request<cPropLineSpringGetNameListResult>({
      api: "cPropLineSpring",
      method: "GetNameList",
    });
  }

  setLineSpringProp(name: string, u1: number, u2: number, u3: number, r1: number, nonlinearOption2: number, nonlinearOption3: number, color?: number, notes?: string, iGUID?: string): Promise<void> {
    return this.transport.request<void>({
      api: "cPropLineSpring",
      method: "SetLineSpringProp",
      parameters: {
        Name: name,
        U1: u1,
        U2: u2,
        U3: u3,
        R1: r1,
        NonlinearOption2: nonlinearOption2,
        NonlinearOption3: nonlinearOption3,
        color: color,
        notes: notes,
        iGUID: iGUID,
      },
    });
  }

}

export class cPropLinkApi {
  constructor(private readonly transport: EtabsTransport) {}

  changeName(name: string, newName: string): Promise<void> {
    return this.transport.request<void>({
      api: "cPropLink",
      method: "ChangeName",
      parameters: {
        Name: name,
        NewName: newName,
      },
    });
  }

  count(propType?: eLinkPropType): Promise<number> {
    return this.transport.request<number>({
      api: "cPropLink",
      method: "Count",
      parameters: {
        PropType: propType,
      },
    });
  }

  delete_(name: string): Promise<void> {
    return this.transport.request<void>({
      api: "cPropLink",
      method: "Delete",
      parameters: {
        Name: name,
      },
    });
  }

  getAcceptanceCriteria(name: string): Promise<cPropLinkGetAcceptanceCriteriaResult> {
    return this.transport.request<cPropLinkGetAcceptanceCriteriaResult>({
      api: "cPropLink",
      method: "GetAcceptanceCriteria",
      parameters: {
        Name: name,
      },
    });
  }

  getDamper(name: string): Promise<cPropLinkGetDamperResult> {
    return this.transport.request<cPropLinkGetDamperResult>({
      api: "cPropLink",
      method: "GetDamper",
      parameters: {
        Name: name,
      },
    });
  }

  getDamperBilinear(name: string): Promise<cPropLinkGetDamperBilinearResult> {
    return this.transport.request<cPropLinkGetDamperBilinearResult>({
      api: "cPropLink",
      method: "GetDamperBilinear",
      parameters: {
        Name: name,
      },
    });
  }

  getDamperFrictionSpring(name: string): Promise<cPropLinkGetDamperFrictionSpringResult> {
    return this.transport.request<cPropLinkGetDamperFrictionSpringResult>({
      api: "cPropLink",
      method: "GetDamperFrictionSpring",
      parameters: {
        Name: name,
      },
    });
  }

  getFrictionIsolator(name: string): Promise<cPropLinkGetFrictionIsolatorResult> {
    return this.transport.request<cPropLinkGetFrictionIsolatorResult>({
      api: "cPropLink",
      method: "GetFrictionIsolator",
      parameters: {
        Name: name,
      },
    });
  }

  getGap(name: string): Promise<cPropLinkGetGapResult> {
    return this.transport.request<cPropLinkGetGapResult>({
      api: "cPropLink",
      method: "GetGap",
      parameters: {
        Name: name,
      },
    });
  }

  getHook(name: string): Promise<cPropLinkGetHookResult> {
    return this.transport.request<cPropLinkGetHookResult>({
      api: "cPropLink",
      method: "GetHook",
      parameters: {
        Name: name,
      },
    });
  }

  getLinear(name: string): Promise<cPropLinkGetLinearResult> {
    return this.transport.request<cPropLinkGetLinearResult>({
      api: "cPropLink",
      method: "GetLinear",
      parameters: {
        Name: name,
      },
    });
  }

  getMultiLinearElastic(name: string): Promise<cPropLinkGetMultiLinearElasticResult> {
    return this.transport.request<cPropLinkGetMultiLinearElasticResult>({
      api: "cPropLink",
      method: "GetMultiLinearElastic",
      parameters: {
        Name: name,
      },
    });
  }

  getMultiLinearPlastic(name: string): Promise<cPropLinkGetMultiLinearPlasticResult> {
    return this.transport.request<cPropLinkGetMultiLinearPlasticResult>({
      api: "cPropLink",
      method: "GetMultiLinearPlastic",
      parameters: {
        Name: name,
      },
    });
  }

  getMultiLinearPoints(name: string, dOF: number): Promise<cPropLinkGetMultiLinearPointsResult> {
    return this.transport.request<cPropLinkGetMultiLinearPointsResult>({
      api: "cPropLink",
      method: "GetMultiLinearPoints",
      parameters: {
        Name: name,
        DOF: dOF,
      },
    });
  }

  getNameList(propType?: eLinkPropType): Promise<cPropLinkGetNameListResult> {
    return this.transport.request<cPropLinkGetNameListResult>({
      api: "cPropLink",
      method: "GetNameList",
      parameters: {
        PropType: propType,
      },
    });
  }

  getPDelta(name: string): Promise<cPropLinkGetPDeltaResult> {
    return this.transport.request<cPropLinkGetPDeltaResult>({
      api: "cPropLink",
      method: "GetPDelta",
      parameters: {
        Name: name,
      },
    });
  }

  getPlasticWen(name: string): Promise<cPropLinkGetPlasticWenResult> {
    return this.transport.request<cPropLinkGetPlasticWenResult>({
      api: "cPropLink",
      method: "GetPlasticWen",
      parameters: {
        Name: name,
      },
    });
  }

  getRubberIsolator(name: string): Promise<cPropLinkGetRubberIsolatorResult> {
    return this.transport.request<cPropLinkGetRubberIsolatorResult>({
      api: "cPropLink",
      method: "GetRubberIsolator",
      parameters: {
        Name: name,
      },
    });
  }

  getSpringData(name: string): Promise<cPropLinkGetSpringDataResult> {
    return this.transport.request<cPropLinkGetSpringDataResult>({
      api: "cPropLink",
      method: "GetSpringData",
      parameters: {
        Name: name,
      },
    });
  }

  getTCFrictionIsolator(name: string): Promise<cPropLinkGetTCFrictionIsolatorResult> {
    return this.transport.request<cPropLinkGetTCFrictionIsolatorResult>({
      api: "cPropLink",
      method: "GetTCFrictionIsolator",
      parameters: {
        Name: name,
      },
    });
  }

  getTypeOAPI(name: string): Promise<cPropLinkGetTypeOAPIResult> {
    return this.transport.request<cPropLinkGetTypeOAPIResult>({
      api: "cPropLink",
      method: "GetTypeOAPI",
      parameters: {
        Name: name,
      },
    });
  }

  getWeightAndMass(name: string): Promise<cPropLinkGetWeightAndMassResult> {
    return this.transport.request<cPropLinkGetWeightAndMassResult>({
      api: "cPropLink",
      method: "GetWeightAndMass",
      parameters: {
        Name: name,
      },
    });
  }

  setAcceptanceCriteria(name: string, acceptanceType: number, symmetric: boolean, active: boolean[], iOPos: number[], lSPos: number[], cPPos: number[], iONeg: number[], lSNeg: number[], cPNeg: number[]): Promise<cPropLinkSetAcceptanceCriteriaResult> {
    return this.transport.request<cPropLinkSetAcceptanceCriteriaResult>({
      api: "cPropLink",
      method: "SetAcceptanceCriteria",
      parameters: {
        Name: name,
        AcceptanceType: acceptanceType,
        Symmetric: symmetric,
        Active: active,
        IOPos: iOPos,
        LSPos: lSPos,
        CPPos: cPPos,
        IONeg: iONeg,
        LSNeg: lSNeg,
        CPNeg: cPNeg,
      },
    });
  }

  setDamper(name: string, dOF: boolean[], fixed: boolean[], nonlinear: boolean[], ke: number[], ce: number[], k: number[], c: number[], cExp: number[], dJ2: number, dJ3: number, notes?: string, gUID?: string): Promise<cPropLinkSetDamperResult> {
    return this.transport.request<cPropLinkSetDamperResult>({
      api: "cPropLink",
      method: "SetDamper",
      parameters: {
        Name: name,
        DOF: dOF,
        Fixed: fixed,
        Nonlinear: nonlinear,
        Ke: ke,
        Ce: ce,
        K: k,
        C: c,
        CExp: cExp,
        DJ2: dJ2,
        DJ3: dJ3,
        Notes: notes,
        GUID: gUID,
      },
    });
  }

  setDamperBilinear(name: string, dof: boolean[], fixed: boolean[], nonlinear: boolean[], ke: number[], ce: number[], k: number[], c: number[], cY: number[], forceLimit: number[], dj2: number, dj3: number, notes?: string, gUID?: string): Promise<cPropLinkSetDamperBilinearResult> {
    return this.transport.request<cPropLinkSetDamperBilinearResult>({
      api: "cPropLink",
      method: "SetDamperBilinear",
      parameters: {
        Name: name,
        dof: dof,
        Fixed: fixed,
        Nonlinear: nonlinear,
        ke: ke,
        ce: ce,
        k: k,
        c: c,
        CY: cY,
        ForceLimit: forceLimit,
        dj2: dj2,
        dj3: dj3,
        notes: notes,
        GUID: gUID,
      },
    });
  }

  setDamperFrictionSpring(name: string, dof: boolean[], fixed: boolean[], nonlinear: boolean[], ke: number[], ce: number[], k: number[], k1: number[], k2: number[], u0: number[], us: number[], direction: number[], dj2: number, dj3: number, notes?: string, gUID?: string): Promise<cPropLinkSetDamperFrictionSpringResult> {
    return this.transport.request<cPropLinkSetDamperFrictionSpringResult>({
      api: "cPropLink",
      method: "SetDamperFrictionSpring",
      parameters: {
        Name: name,
        dof: dof,
        Fixed: fixed,
        Nonlinear: nonlinear,
        ke: ke,
        ce: ce,
        k: k,
        K1: k1,
        K2: k2,
        u0: u0,
        us: us,
        direction: direction,
        dj2: dj2,
        dj3: dj3,
        notes: notes,
        GUID: gUID,
      },
    });
  }

  setFrictionIsolator(name: string, dOF: boolean[], fixed: boolean[], nonlinear: boolean[], ke: number[], ce: number[], k: number[], slow: number[], fast: number[], rate: number[], radius: number[], damping: number, dJ2: number, dJ3: number, notes?: string, gUID?: string): Promise<cPropLinkSetFrictionIsolatorResult> {
    return this.transport.request<cPropLinkSetFrictionIsolatorResult>({
      api: "cPropLink",
      method: "SetFrictionIsolator",
      parameters: {
        Name: name,
        DOF: dOF,
        Fixed: fixed,
        Nonlinear: nonlinear,
        Ke: ke,
        Ce: ce,
        K: k,
        Slow: slow,
        Fast: fast,
        Rate: rate,
        Radius: radius,
        Damping: damping,
        DJ2: dJ2,
        DJ3: dJ3,
        Notes: notes,
        GUID: gUID,
      },
    });
  }

  setGap(name: string, dOF: boolean[], fixed: boolean[], nonlinear: boolean[], ke: number[], ce: number[], k: number[], dis: number[], dJ2: number, dJ3: number, notes?: string, gUID?: string): Promise<cPropLinkSetGapResult> {
    return this.transport.request<cPropLinkSetGapResult>({
      api: "cPropLink",
      method: "SetGap",
      parameters: {
        Name: name,
        DOF: dOF,
        Fixed: fixed,
        Nonlinear: nonlinear,
        Ke: ke,
        Ce: ce,
        K: k,
        Dis: dis,
        DJ2: dJ2,
        DJ3: dJ3,
        Notes: notes,
        GUID: gUID,
      },
    });
  }

  setHook(name: string, dOF: boolean[], fixed: boolean[], nonlinear: boolean[], ke: number[], ce: number[], k: number[], dis: number[], dJ2: number, dJ3: number, notes?: string, gUID?: string): Promise<cPropLinkSetHookResult> {
    return this.transport.request<cPropLinkSetHookResult>({
      api: "cPropLink",
      method: "SetHook",
      parameters: {
        Name: name,
        DOF: dOF,
        Fixed: fixed,
        Nonlinear: nonlinear,
        Ke: ke,
        Ce: ce,
        K: k,
        Dis: dis,
        DJ2: dJ2,
        DJ3: dJ3,
        Notes: notes,
        GUID: gUID,
      },
    });
  }

  setLinear(name: string, dOF: boolean[], fixed: boolean[], ke: number[], ce: number[], dJ2: number, dJ3: number, keCoupled?: boolean, ceCoupled?: boolean, notes?: string, gUID?: string): Promise<cPropLinkSetLinearResult> {
    return this.transport.request<cPropLinkSetLinearResult>({
      api: "cPropLink",
      method: "SetLinear",
      parameters: {
        Name: name,
        DOF: dOF,
        Fixed: fixed,
        Ke: ke,
        Ce: ce,
        DJ2: dJ2,
        DJ3: dJ3,
        KeCoupled: keCoupled,
        CeCoupled: ceCoupled,
        Notes: notes,
        GUID: gUID,
      },
    });
  }

  setMultiLinearElastic(name: string, dOF: boolean[], fixed: boolean[], nonlinear: boolean[], ke: number[], ce: number[], dJ2: number, dJ3: number, notes?: string, gUID?: string): Promise<cPropLinkSetMultiLinearElasticResult> {
    return this.transport.request<cPropLinkSetMultiLinearElasticResult>({
      api: "cPropLink",
      method: "SetMultiLinearElastic",
      parameters: {
        Name: name,
        DOF: dOF,
        Fixed: fixed,
        Nonlinear: nonlinear,
        Ke: ke,
        Ce: ce,
        DJ2: dJ2,
        DJ3: dJ3,
        Notes: notes,
        GUID: gUID,
      },
    });
  }

  setMultiLinearPlastic(name: string, dOF: boolean[], fixed: boolean[], nonlinear: boolean[], ke: number[], ce: number[], dJ2: number, dJ3: number, notes?: string, gUID?: string): Promise<cPropLinkSetMultiLinearPlasticResult> {
    return this.transport.request<cPropLinkSetMultiLinearPlasticResult>({
      api: "cPropLink",
      method: "SetMultiLinearPlastic",
      parameters: {
        Name: name,
        DOF: dOF,
        Fixed: fixed,
        Nonlinear: nonlinear,
        Ke: ke,
        Ce: ce,
        DJ2: dJ2,
        DJ3: dJ3,
        Notes: notes,
        GUID: gUID,
      },
    });
  }

  setMultiLinearPoints(name: string, dOF: number, numberPoints: number, f: number[], d: number[], myType?: number, a1?: number, a2?: number, b1?: number, b2?: number, eta?: number): Promise<cPropLinkSetMultiLinearPointsResult> {
    return this.transport.request<cPropLinkSetMultiLinearPointsResult>({
      api: "cPropLink",
      method: "SetMultiLinearPoints",
      parameters: {
        Name: name,
        DOF: dOF,
        NumberPoints: numberPoints,
        F: f,
        D: d,
        MyType: myType,
        A1: a1,
        A2: a2,
        B1: b1,
        B2: b2,
        Eta: eta,
      },
    });
  }

  setPDelta(name: string, value: number[]): Promise<cPropLinkSetPDeltaResult> {
    return this.transport.request<cPropLinkSetPDeltaResult>({
      api: "cPropLink",
      method: "SetPDelta",
      parameters: {
        Name: name,
        Value: value,
      },
    });
  }

  setPlasticWen(name: string, dOF: boolean[], fixed: boolean[], nonlinear: boolean[], ke: number[], ce: number[], k: number[], yield_: number[], ratio: number[], exp: number[], dJ2: number, dJ3: number, notes?: string, gUID?: string): Promise<cPropLinkSetPlasticWenResult> {
    return this.transport.request<cPropLinkSetPlasticWenResult>({
      api: "cPropLink",
      method: "SetPlasticWen",
      parameters: {
        Name: name,
        DOF: dOF,
        Fixed: fixed,
        Nonlinear: nonlinear,
        Ke: ke,
        Ce: ce,
        K: k,
        Yield: yield_,
        Ratio: ratio,
        Exp: exp,
        DJ2: dJ2,
        DJ3: dJ3,
        Notes: notes,
        GUID: gUID,
      },
    });
  }

  setRubberIsolator(name: string, dOF: boolean[], fixed: boolean[], nonlinear: boolean[], ke: number[], ce: number[], k: number[], yield_: number[], ratio: number[], dJ2: number, dJ3: number, notes?: string, gUID?: string): Promise<cPropLinkSetRubberIsolatorResult> {
    return this.transport.request<cPropLinkSetRubberIsolatorResult>({
      api: "cPropLink",
      method: "SetRubberIsolator",
      parameters: {
        Name: name,
        DOF: dOF,
        Fixed: fixed,
        Nonlinear: nonlinear,
        Ke: ke,
        Ce: ce,
        K: k,
        Yield: yield_,
        Ratio: ratio,
        DJ2: dJ2,
        DJ3: dJ3,
        Notes: notes,
        GUID: gUID,
      },
    });
  }

  setSpringData(name: string, definedForThisLength: number, definedForThisArea: number): Promise<void> {
    return this.transport.request<void>({
      api: "cPropLink",
      method: "SetSpringData",
      parameters: {
        Name: name,
        DefinedForThisLength: definedForThisLength,
        DefinedForThisArea: definedForThisArea,
      },
    });
  }

  setTCFrictionIsolator(name: string, dOF: boolean[], fixed: boolean[], nonlinear: boolean[], ke: number[], ce: number[], k: number[], slow: number[], fast: number[], rate: number[], radius: number[], slowT: number[], fastT: number[], rateT: number[], kt: number, dis: number, dist: number, damping: number, dJ2: number, dJ3: number, notes?: string, gUID?: string): Promise<cPropLinkSetTCFrictionIsolatorResult> {
    return this.transport.request<cPropLinkSetTCFrictionIsolatorResult>({
      api: "cPropLink",
      method: "SetTCFrictionIsolator",
      parameters: {
        Name: name,
        DOF: dOF,
        Fixed: fixed,
        Nonlinear: nonlinear,
        Ke: ke,
        Ce: ce,
        K: k,
        Slow: slow,
        Fast: fast,
        Rate: rate,
        Radius: radius,
        SlowT: slowT,
        FastT: fastT,
        RateT: rateT,
        Kt: kt,
        Dis: dis,
        Dist: dist,
        Damping: damping,
        DJ2: dJ2,
        DJ3: dJ3,
        Notes: notes,
        GUID: gUID,
      },
    });
  }

  setWeightAndMass(name: string, w: number, m: number, r1: number, r2: number, r3: number): Promise<void> {
    return this.transport.request<void>({
      api: "cPropLink",
      method: "SetWeightAndMass",
      parameters: {
        Name: name,
        W: w,
        M: m,
        R1: r1,
        R2: r2,
        R3: r3,
      },
    });
  }

}

export class cPropMaterialApi {
  constructor(private readonly transport: EtabsTransport) {}

  get timeDep(): cPropMaterialTDApi {
    return new cPropMaterialTDApi(this.transport);
  }

  addMaterial(matType: eMatType, region: string, standard: string, grade: string, userName?: string): Promise<cPropMaterialAddMaterialResult> {
    return this.transport.request<cPropMaterialAddMaterialResult>({
      api: "cPropMaterial",
      method: "AddMaterial",
      parameters: {
        MatType: matType,
        Region: region,
        Standard: standard,
        Grade: grade,
        UserName: userName,
      },
    });
  }

  changeName(name: string, newName: string): Promise<void> {
    return this.transport.request<void>({
      api: "cPropMaterial",
      method: "ChangeName",
      parameters: {
        Name: name,
        NewName: newName,
      },
    });
  }

  count(matType?: eMatType): Promise<number> {
    return this.transport.request<number>({
      api: "cPropMaterial",
      method: "Count",
      parameters: {
        MatType: matType,
      },
    });
  }

  delete_(name: string): Promise<void> {
    return this.transport.request<void>({
      api: "cPropMaterial",
      method: "Delete",
      parameters: {
        Name: name,
      },
    });
  }

  getDamping(name: string, temp?: number): Promise<cPropMaterialGetDampingResult> {
    return this.transport.request<cPropMaterialGetDampingResult>({
      api: "cPropMaterial",
      method: "GetDamping",
      parameters: {
        Name: name,
        Temp: temp,
      },
    });
  }

  getMassSource(): Promise<cPropMaterialGetMassSourceResult> {
    return this.transport.request<cPropMaterialGetMassSourceResult>({
      api: "cPropMaterial",
      method: "GetMassSource",
    });
  }

  getMassSource_1(): Promise<cPropMaterialGetMassSource_1Result> {
    return this.transport.request<cPropMaterialGetMassSource_1Result>({
      api: "cPropMaterial",
      method: "GetMassSource_1",
    });
  }

  getMaterial(name: string): Promise<cPropMaterialGetMaterialResult> {
    return this.transport.request<cPropMaterialGetMaterialResult>({
      api: "cPropMaterial",
      method: "GetMaterial",
      parameters: {
        Name: name,
      },
    });
  }

  getMPAnisotropic(name: string, temp?: number): Promise<cPropMaterialGetMPAnisotropicResult> {
    return this.transport.request<cPropMaterialGetMPAnisotropicResult>({
      api: "cPropMaterial",
      method: "GetMPAnisotropic",
      parameters: {
        Name: name,
        Temp: temp,
      },
    });
  }

  getMPIsotropic(name: string, temp?: number): Promise<cPropMaterialGetMPIsotropicResult> {
    return this.transport.request<cPropMaterialGetMPIsotropicResult>({
      api: "cPropMaterial",
      method: "GetMPIsotropic",
      parameters: {
        Name: name,
        Temp: temp,
      },
    });
  }

  getMPOrthotropic(name: string, temp?: number): Promise<cPropMaterialGetMPOrthotropicResult> {
    return this.transport.request<cPropMaterialGetMPOrthotropicResult>({
      api: "cPropMaterial",
      method: "GetMPOrthotropic",
      parameters: {
        Name: name,
        Temp: temp,
      },
    });
  }

  getMPUniaxial(name: string, temp?: number): Promise<cPropMaterialGetMPUniaxialResult> {
    return this.transport.request<cPropMaterialGetMPUniaxialResult>({
      api: "cPropMaterial",
      method: "GetMPUniaxial",
      parameters: {
        Name: name,
        Temp: temp,
      },
    });
  }

  getNameList(matType?: eMatType): Promise<cPropMaterialGetNameListResult> {
    return this.transport.request<cPropMaterialGetNameListResult>({
      api: "cPropMaterial",
      method: "GetNameList",
      parameters: {
        MatType: matType,
      },
    });
  }

  getOConcrete(name: string, temp?: number): Promise<cPropMaterialGetOConcreteResult> {
    return this.transport.request<cPropMaterialGetOConcreteResult>({
      api: "cPropMaterial",
      method: "GetOConcrete",
      parameters: {
        Name: name,
        Temp: temp,
      },
    });
  }

  getOConcrete_1(name: string, temp?: number): Promise<cPropMaterialGetOConcrete_1Result> {
    return this.transport.request<cPropMaterialGetOConcrete_1Result>({
      api: "cPropMaterial",
      method: "GetOConcrete_1",
      parameters: {
        Name: name,
        Temp: temp,
      },
    });
  }

  getONoDesign(name: string, temp?: number): Promise<cPropMaterialGetONoDesignResult> {
    return this.transport.request<cPropMaterialGetONoDesignResult>({
      api: "cPropMaterial",
      method: "GetONoDesign",
      parameters: {
        Name: name,
        Temp: temp,
      },
    });
  }

  getORebar(name: string, temp?: number): Promise<cPropMaterialGetORebarResult> {
    return this.transport.request<cPropMaterialGetORebarResult>({
      api: "cPropMaterial",
      method: "GetORebar",
      parameters: {
        Name: name,
        Temp: temp,
      },
    });
  }

  getORebar_1(name: string, temp?: number): Promise<cPropMaterialGetORebar_1Result> {
    return this.transport.request<cPropMaterialGetORebar_1Result>({
      api: "cPropMaterial",
      method: "GetORebar_1",
      parameters: {
        Name: name,
        Temp: temp,
      },
    });
  }

  getOSteel(name: string, temp?: number): Promise<cPropMaterialGetOSteelResult> {
    return this.transport.request<cPropMaterialGetOSteelResult>({
      api: "cPropMaterial",
      method: "GetOSteel",
      parameters: {
        Name: name,
        Temp: temp,
      },
    });
  }

  getOSteel_1(name: string, temp?: number): Promise<cPropMaterialGetOSteel_1Result> {
    return this.transport.request<cPropMaterialGetOSteel_1Result>({
      api: "cPropMaterial",
      method: "GetOSteel_1",
      parameters: {
        Name: name,
        Temp: temp,
      },
    });
  }

  getOTendon(name: string, temp?: number): Promise<cPropMaterialGetOTendonResult> {
    return this.transport.request<cPropMaterialGetOTendonResult>({
      api: "cPropMaterial",
      method: "GetOTendon",
      parameters: {
        Name: name,
        Temp: temp,
      },
    });
  }

  getOTendon_1(name: string, temp?: number): Promise<cPropMaterialGetOTendon_1Result> {
    return this.transport.request<cPropMaterialGetOTendon_1Result>({
      api: "cPropMaterial",
      method: "GetOTendon_1",
      parameters: {
        Name: name,
        Temp: temp,
      },
    });
  }

  getSSCurve(name: string, sectName?: string, rebarArea?: number, temp?: number): Promise<cPropMaterialGetSSCurveResult> {
    return this.transport.request<cPropMaterialGetSSCurveResult>({
      api: "cPropMaterial",
      method: "GetSSCurve",
      parameters: {
        Name: name,
        SectName: sectName,
        RebarArea: rebarArea,
        Temp: temp,
      },
    });
  }

  getTemp(name: string): Promise<cPropMaterialGetTempResult> {
    return this.transport.request<cPropMaterialGetTempResult>({
      api: "cPropMaterial",
      method: "GetTemp",
      parameters: {
        Name: name,
      },
    });
  }

  getTypeOAPI(name: string): Promise<cPropMaterialGetTypeOAPIResult> {
    return this.transport.request<cPropMaterialGetTypeOAPIResult>({
      api: "cPropMaterial",
      method: "GetTypeOAPI",
      parameters: {
        Name: name,
      },
    });
  }

  getWeightAndMass(name: string, temp?: number): Promise<cPropMaterialGetWeightAndMassResult> {
    return this.transport.request<cPropMaterialGetWeightAndMassResult>({
      api: "cPropMaterial",
      method: "GetWeightAndMass",
      parameters: {
        Name: name,
        Temp: temp,
      },
    });
  }

  setDamping(name: string, modalRatio: number, viscousMassCoeff: number, viscousStiffCoeff: number, hystereticMassCoeff: number, hystereticStiffCoeff: number, temp?: number): Promise<void> {
    return this.transport.request<void>({
      api: "cPropMaterial",
      method: "SetDamping",
      parameters: {
        Name: name,
        ModalRatio: modalRatio,
        ViscousMassCoeff: viscousMassCoeff,
        ViscousStiffCoeff: viscousStiffCoeff,
        HystereticMassCoeff: hystereticMassCoeff,
        HystereticStiffCoeff: hystereticStiffCoeff,
        Temp: temp,
      },
    });
  }

  setMassSource(myOption: number, numberLoads: number, loadPat: string[], sF: number[]): Promise<cPropMaterialSetMassSourceResult> {
    return this.transport.request<cPropMaterialSetMassSourceResult>({
      api: "cPropMaterial",
      method: "SetMassSource",
      parameters: {
        MyOption: myOption,
        NumberLoads: numberLoads,
        LoadPat: loadPat,
        SF: sF,
      },
    });
  }

  setMassSource_1(includeElements: boolean, includeAddedMass: boolean, includeLoads: boolean, numberLoads: number, loadPat: string[], sf: number[]): Promise<cPropMaterialSetMassSource_1Result> {
    return this.transport.request<cPropMaterialSetMassSource_1Result>({
      api: "cPropMaterial",
      method: "SetMassSource_1",
      parameters: {
        IncludeElements: includeElements,
        IncludeAddedMass: includeAddedMass,
        IncludeLoads: includeLoads,
        NumberLoads: numberLoads,
        LoadPat: loadPat,
        sf: sf,
      },
    });
  }

  setMaterial(name: string, matType: eMatType, color?: number, notes?: string, gUID?: string): Promise<void> {
    return this.transport.request<void>({
      api: "cPropMaterial",
      method: "SetMaterial",
      parameters: {
        Name: name,
        MatType: matType,
        Color: color,
        Notes: notes,
        GUID: gUID,
      },
    });
  }

  setMPAnisotropic(name: string, e: number[], u: number[], a: number[], g: number[], temp?: number): Promise<cPropMaterialSetMPAnisotropicResult> {
    return this.transport.request<cPropMaterialSetMPAnisotropicResult>({
      api: "cPropMaterial",
      method: "SetMPAnisotropic",
      parameters: {
        Name: name,
        E: e,
        U: u,
        A: a,
        G: g,
        Temp: temp,
      },
    });
  }

  setMPIsotropic(name: string, e: number, u: number, a: number, temp?: number): Promise<void> {
    return this.transport.request<void>({
      api: "cPropMaterial",
      method: "SetMPIsotropic",
      parameters: {
        Name: name,
        E: e,
        U: u,
        A: a,
        Temp: temp,
      },
    });
  }

  setMPOrthotropic(name: string, e: number[], u: number[], a: number[], g: number[], temp?: number): Promise<cPropMaterialSetMPOrthotropicResult> {
    return this.transport.request<cPropMaterialSetMPOrthotropicResult>({
      api: "cPropMaterial",
      method: "SetMPOrthotropic",
      parameters: {
        Name: name,
        E: e,
        U: u,
        A: a,
        G: g,
        Temp: temp,
      },
    });
  }

  setMPUniaxial(name: string, e: number, a: number, temp?: number): Promise<void> {
    return this.transport.request<void>({
      api: "cPropMaterial",
      method: "SetMPUniaxial",
      parameters: {
        Name: name,
        E: e,
        A: a,
        Temp: temp,
      },
    });
  }

  setOConcrete(name: string, fc: number, isLightweight: boolean, fcsFactor: number, sSType: number, sSHysType: number, strainAtFc: number, strainUltimate: number, frictionAngle?: number, dilatationalAngle?: number, temp?: number): Promise<void> {
    return this.transport.request<void>({
      api: "cPropMaterial",
      method: "SetOConcrete",
      parameters: {
        Name: name,
        Fc: fc,
        IsLightweight: isLightweight,
        FcsFactor: fcsFactor,
        SSType: sSType,
        SSHysType: sSHysType,
        StrainAtFc: strainAtFc,
        StrainUltimate: strainUltimate,
        FrictionAngle: frictionAngle,
        DilatationalAngle: dilatationalAngle,
        Temp: temp,
      },
    });
  }

  setOConcrete_1(name: string, fc: number, isLightweight: boolean, fcsFactor: number, sSType: number, sSHysType: number, strainAtFc: number, strainUltimate: number, finalSlope: number, frictionAngle?: number, dilatationalAngle?: number, temp?: number): Promise<void> {
    return this.transport.request<void>({
      api: "cPropMaterial",
      method: "SetOConcrete_1",
      parameters: {
        Name: name,
        Fc: fc,
        IsLightweight: isLightweight,
        FcsFactor: fcsFactor,
        SSType: sSType,
        SSHysType: sSHysType,
        StrainAtFc: strainAtFc,
        StrainUltimate: strainUltimate,
        FinalSlope: finalSlope,
        FrictionAngle: frictionAngle,
        DilatationalAngle: dilatationalAngle,
        Temp: temp,
      },
    });
  }

  setONoDesign(name: string, frictionAngle?: number, dilatationalAngle?: number, temp?: number): Promise<void> {
    return this.transport.request<void>({
      api: "cPropMaterial",
      method: "SetONoDesign",
      parameters: {
        Name: name,
        FrictionAngle: frictionAngle,
        DilatationalAngle: dilatationalAngle,
        Temp: temp,
      },
    });
  }

  setORebar(name: string, fy: number, fu: number, eFy: number, eFu: number, sSType: number, sSHysType: number, strainAtHardening: number, strainUltimate: number, useCaltransSSDefaults: boolean, temp?: number): Promise<void> {
    return this.transport.request<void>({
      api: "cPropMaterial",
      method: "SetORebar",
      parameters: {
        Name: name,
        Fy: fy,
        Fu: fu,
        EFy: eFy,
        EFu: eFu,
        SSType: sSType,
        SSHysType: sSHysType,
        StrainAtHardening: strainAtHardening,
        StrainUltimate: strainUltimate,
        UseCaltransSSDefaults: useCaltransSSDefaults,
        Temp: temp,
      },
    });
  }

  setORebar_1(name: string, fy: number, fu: number, eFy: number, eFu: number, sSType: number, sSHysType: number, strainAtHardening: number, strainUltimate: number, finalSlope: number, useCaltransSSDefaults: boolean, temp?: number): Promise<void> {
    return this.transport.request<void>({
      api: "cPropMaterial",
      method: "SetORebar_1",
      parameters: {
        Name: name,
        Fy: fy,
        Fu: fu,
        EFy: eFy,
        EFu: eFu,
        SSType: sSType,
        SSHysType: sSHysType,
        StrainAtHardening: strainAtHardening,
        StrainUltimate: strainUltimate,
        FinalSlope: finalSlope,
        UseCaltransSSDefaults: useCaltransSSDefaults,
        Temp: temp,
      },
    });
  }

  setOSteel(name: string, fy: number, fu: number, eFy: number, eFu: number, sSType: number, sSHysType: number, strainAtHardening: number, strainAtMaxStress: number, strainAtRupture: number, temp?: number): Promise<void> {
    return this.transport.request<void>({
      api: "cPropMaterial",
      method: "SetOSteel",
      parameters: {
        Name: name,
        Fy: fy,
        Fu: fu,
        EFy: eFy,
        EFu: eFu,
        SSType: sSType,
        SSHysType: sSHysType,
        StrainAtHardening: strainAtHardening,
        StrainAtMaxStress: strainAtMaxStress,
        StrainAtRupture: strainAtRupture,
        Temp: temp,
      },
    });
  }

  setOSteel_1(name: string, fy: number, fu: number, eFy: number, eFu: number, sSType: number, sSHysType: number, strainAtHardening: number, strainAtMaxStress: number, strainAtRupture: number, finalSlope: number, temp?: number): Promise<void> {
    return this.transport.request<void>({
      api: "cPropMaterial",
      method: "SetOSteel_1",
      parameters: {
        Name: name,
        Fy: fy,
        Fu: fu,
        EFy: eFy,
        EFu: eFu,
        SSType: sSType,
        SSHysType: sSHysType,
        StrainAtHardening: strainAtHardening,
        StrainAtMaxStress: strainAtMaxStress,
        StrainAtRupture: strainAtRupture,
        FinalSlope: finalSlope,
        Temp: temp,
      },
    });
  }

  setOTendon(name: string, fy: number, fu: number, sSType: number, sSHysType: number, temp?: number): Promise<void> {
    return this.transport.request<void>({
      api: "cPropMaterial",
      method: "SetOTendon",
      parameters: {
        Name: name,
        Fy: fy,
        Fu: fu,
        SSType: sSType,
        SSHysType: sSHysType,
        Temp: temp,
      },
    });
  }

  setOTendon_1(name: string, fy: number, fu: number, sSType: number, sSHysType: number, finalSlope: number, temp?: number): Promise<void> {
    return this.transport.request<void>({
      api: "cPropMaterial",
      method: "SetOTendon_1",
      parameters: {
        Name: name,
        Fy: fy,
        Fu: fu,
        SSType: sSType,
        SSHysType: sSHysType,
        FinalSlope: finalSlope,
        Temp: temp,
      },
    });
  }

  setSSCurve(name: string, numberPoints: number, pointID: number[], strain: number[], stress: number[], temp?: number): Promise<cPropMaterialSetSSCurveResult> {
    return this.transport.request<cPropMaterialSetSSCurveResult>({
      api: "cPropMaterial",
      method: "SetSSCurve",
      parameters: {
        Name: name,
        NumberPoints: numberPoints,
        PointID: pointID,
        Strain: strain,
        Stress: stress,
        Temp: temp,
      },
    });
  }

  setTemp(name: string, numberItems: number, temp: number[]): Promise<cPropMaterialSetTempResult> {
    return this.transport.request<cPropMaterialSetTempResult>({
      api: "cPropMaterial",
      method: "SetTemp",
      parameters: {
        Name: name,
        NumberItems: numberItems,
        Temp: temp,
      },
    });
  }

  setWeightAndMass(name: string, myOption: number, value: number, temp?: number): Promise<void> {
    return this.transport.request<void>({
      api: "cPropMaterial",
      method: "SetWeightAndMass",
      parameters: {
        Name: name,
        MyOption: myOption,
        Value: value,
        Temp: temp,
      },
    });
  }

}

export class cPropMaterialTDApi {
  constructor(private readonly transport: EtabsTransport) {}

}

export class cPropPointSpringApi {
  constructor(private readonly transport: EtabsTransport) {}

  changeName(name: string, newName: string): Promise<void> {
    return this.transport.request<void>({
      api: "cPropPointSpring",
      method: "ChangeName",
      parameters: {
        Name: name,
        NewName: newName,
      },
    });
  }

  delete_(name: string): Promise<void> {
    return this.transport.request<void>({
      api: "cPropPointSpring",
      method: "Delete",
      parameters: {
        Name: name,
      },
    });
  }

  getLinks(name: string): Promise<cPropPointSpringGetLinksResult> {
    return this.transport.request<cPropPointSpringGetLinksResult>({
      api: "cPropPointSpring",
      method: "GetLinks",
      parameters: {
        Name: name,
      },
    });
  }

  getNameList(): Promise<cPropPointSpringGetNameListResult> {
    return this.transport.request<cPropPointSpringGetNameListResult>({
      api: "cPropPointSpring",
      method: "GetNameList",
    });
  }

  getPointSpringProp(name: string): Promise<cPropPointSpringGetPointSpringPropResult> {
    return this.transport.request<cPropPointSpringGetPointSpringPropResult>({
      api: "cPropPointSpring",
      method: "GetPointSpringProp",
      parameters: {
        Name: name,
      },
    });
  }

  setLinks(name: string, numberLinks: number, linkNames: string[], linkAxialDirs: number[], linkAngles: number[]): Promise<cPropPointSpringSetLinksResult> {
    return this.transport.request<cPropPointSpringSetLinksResult>({
      api: "cPropPointSpring",
      method: "SetLinks",
      parameters: {
        Name: name,
        NumberLinks: numberLinks,
        LinkNames: linkNames,
        LinkAxialDirs: linkAxialDirs,
        LinkAngles: linkAngles,
      },
    });
  }

  setPointSpringProp(name: string, springOption: number, k: number[], cSys?: string, soilProfile?: string, footing?: string, period?: number, color?: number, notes?: string, iGUID?: string): Promise<cPropPointSpringSetPointSpringPropResult> {
    return this.transport.request<cPropPointSpringSetPointSpringPropResult>({
      api: "cPropPointSpring",
      method: "SetPointSpringProp",
      parameters: {
        Name: name,
        SpringOption: springOption,
        k: k,
        CSys: cSys,
        SoilProfile: soilProfile,
        Footing: footing,
        Period: period,
        color: color,
        notes: notes,
        iGUID: iGUID,
      },
    });
  }

}

export class cPropRebarApi {
  constructor(private readonly transport: EtabsTransport) {}

  getNameList(): Promise<cPropRebarGetNameListResult> {
    return this.transport.request<cPropRebarGetNameListResult>({
      api: "cPropRebar",
      method: "GetNameList",
    });
  }

  getNameListWithData(): Promise<cPropRebarGetNameListWithDataResult> {
    return this.transport.request<cPropRebarGetNameListWithDataResult>({
      api: "cPropRebar",
      method: "GetNameListWithData",
    });
  }

  getRebarProps(name: string): Promise<cPropRebarGetRebarPropsResult> {
    return this.transport.request<cPropRebarGetRebarPropsResult>({
      api: "cPropRebar",
      method: "GetRebarProps",
      parameters: {
        Name: name,
      },
    });
  }

  getRebarPropsWithGUID(name: string): Promise<cPropRebarGetRebarPropsWithGUIDResult> {
    return this.transport.request<cPropRebarGetRebarPropsWithGUIDResult>({
      api: "cPropRebar",
      method: "GetRebarPropsWithGUID",
      parameters: {
        Name: name,
      },
    });
  }

}

export class cPropTendonApi {
  constructor(private readonly transport: EtabsTransport) {}

  changeName(name: string, newName: string): Promise<void> {
    return this.transport.request<void>({
      api: "cPropTendon",
      method: "ChangeName",
      parameters: {
        Name: name,
        NewName: newName,
      },
    });
  }

  count(): Promise<number> {
    return this.transport.request<number>({
      api: "cPropTendon",
      method: "Count",
    });
  }

  delete_(name: string): Promise<void> {
    return this.transport.request<void>({
      api: "cPropTendon",
      method: "Delete",
      parameters: {
        Name: name,
      },
    });
  }

  getNameList(): Promise<cPropTendonGetNameListResult> {
    return this.transport.request<cPropTendonGetNameListResult>({
      api: "cPropTendon",
      method: "GetNameList",
    });
  }

  getProp(name: string): Promise<cPropTendonGetPropResult> {
    return this.transport.request<cPropTendonGetPropResult>({
      api: "cPropTendon",
      method: "GetProp",
      parameters: {
        Name: name,
      },
    });
  }

  setProp(name: string, matProp: string, modelingOption: number, area: number, color?: number, notes?: string, gUID?: string): Promise<void> {
    return this.transport.request<void>({
      api: "cPropTendon",
      method: "SetProp",
      parameters: {
        Name: name,
        MatProp: matProp,
        ModelingOption: modelingOption,
        Area: area,
        Color: color,
        Notes: notes,
        GUID: gUID,
      },
    });
  }

}

export class cSapModelApi {
  constructor(private readonly transport: EtabsTransport) {}

  get analyze(): cAnalyzeApi {
    return new cAnalyzeApi(this.transport);
  }

  get areaElm(): cAreaElmApi {
    return new cAreaElmApi(this.transport);
  }

  get areaObj(): cAreaObjApi {
    return new cAreaObjApi(this.transport);
  }

  get constraintDef(): cConstraintApi {
    return new cConstraintApi(this.transport);
  }

  get databaseTables(): cDatabaseTablesApi {
    return new cDatabaseTablesApi(this.transport);
  }

  get designCompositeBeam(): cDesignCompositeBeamApi {
    return new cDesignCompositeBeamApi(this.transport);
  }

  get designCompositeColumn(): cDesignCompositeColumnApi {
    return new cDesignCompositeColumnApi(this.transport);
  }

  get designConcrete(): cDesignConcreteApi {
    return new cDesignConcreteApi(this.transport);
  }

  get designConcreteSlab(): cDesignConcreteSlabApi {
    return new cDesignConcreteSlabApi(this.transport);
  }

  get designResults(): cDesignResultsApi {
    return new cDesignResultsApi(this.transport);
  }

  get designShearWall(): cDesignShearWallApi {
    return new cDesignShearWallApi(this.transport);
  }

  get designSteel(): cDesignSteelApi {
    return new cDesignSteelApi(this.transport);
  }

  get detailing(): cDetailingApi {
    return new cDetailingApi(this.transport);
  }

  get diaphragm(): cDiaphragmApi {
    return new cDiaphragmApi(this.transport);
  }

  get editArea(): cEditAreaApi {
    return new cEditAreaApi(this.transport);
  }

  get editFrame(): cEditFrameApi {
    return new cEditFrameApi(this.transport);
  }

  get editGeneral(): cEditGeneralApi {
    return new cEditGeneralApi(this.transport);
  }

  get editPoint(): cEditPointApi {
    return new cEditPointApi(this.transport);
  }

  get file(): cFileApi {
    return new cFileApi(this.transport);
  }

  get frameObj(): cFrameObjApi {
    return new cFrameObjApi(this.transport);
  }

  get func(): cFunctionApi {
    return new cFunctionApi(this.transport);
  }

  get gDispl(): cGenDisplApi {
    return new cGenDisplApi(this.transport);
  }

  get gridSys(): cGridSysApi {
    return new cGridSysApi(this.transport);
  }

  get groupDef(): cGroupApi {
    return new cGroupApi(this.transport);
  }

  get lineElm(): cLineElmApi {
    return new cLineElmApi(this.transport);
  }

  get linkElm(): cLinkElmApi {
    return new cLinkElmApi(this.transport);
  }

  get linkObj(): cLinkObjApi {
    return new cLinkObjApi(this.transport);
  }

  get loadCases(): cLoadCasesApi {
    return new cLoadCasesApi(this.transport);
  }

  get loadPatterns(): cLoadPatternsApi {
    return new cLoadPatternsApi(this.transport);
  }

  get options(): cOptionsApi {
    return new cOptionsApi(this.transport);
  }

  get patternDef(): cPatternApi {
    return new cPatternApi(this.transport);
  }

  get pierLabel(): cPierLabelApi {
    return new cPierLabelApi(this.transport);
  }

  get pointElm(): cPointElmApi {
    return new cPointElmApi(this.transport);
  }

  get pointObj(): cPointObjApi {
    return new cPointObjApi(this.transport);
  }

  get propArea(): cPropAreaApi {
    return new cPropAreaApi(this.transport);
  }

  get propAreaSpring(): cPropAreaSpringApi {
    return new cPropAreaSpringApi(this.transport);
  }

  get propFrame(): cPropFrameApi {
    return new cPropFrameApi(this.transport);
  }

  get propLineSpring(): cPropLineSpringApi {
    return new cPropLineSpringApi(this.transport);
  }

  get propLink(): cPropLinkApi {
    return new cPropLinkApi(this.transport);
  }

  get propMaterial(): cPropMaterialApi {
    return new cPropMaterialApi(this.transport);
  }

  get propPointSpring(): cPropPointSpringApi {
    return new cPropPointSpringApi(this.transport);
  }

  get propRebar(): cPropRebarApi {
    return new cPropRebarApi(this.transport);
  }

  get propTendon(): cPropTendonApi {
    return new cPropTendonApi(this.transport);
  }

  get respCombo(): cComboApi {
    return new cComboApi(this.transport);
  }

  get results(): cAnalysisResultsApi {
    return new cAnalysisResultsApi(this.transport);
  }

  get selectObj(): cSelectApi {
    return new cSelectApi(this.transport);
  }

  get spandrelLabel(): cSpandrelLabelApi {
    return new cSpandrelLabelApi(this.transport);
  }

  get story(): cStoryApi {
    return new cStoryApi(this.transport);
  }

  get tendonObj(): cTendonObjApi {
    return new cTendonObjApi(this.transport);
  }

  get tower(): cTowerApi {
    return new cTowerApi(this.transport);
  }

  get view(): cViewApi {
    return new cViewApi(this.transport);
  }

  getDatabaseUnits(): Promise<eUnits> {
    return this.transport.request<eUnits>({
      api: "cSapModel",
      method: "GetDatabaseUnits",
    });
  }

  getDatabaseUnits_2(): Promise<cSapModelGetDatabaseUnits_2Result> {
    return this.transport.request<cSapModelGetDatabaseUnits_2Result>({
      api: "cSapModel",
      method: "GetDatabaseUnits_2",
    });
  }

  getMergeTol(): Promise<cSapModelGetMergeTolResult> {
    return this.transport.request<cSapModelGetMergeTolResult>({
      api: "cSapModel",
      method: "GetMergeTol",
    });
  }

  getModelFilename(includePath?: boolean): Promise<string> {
    return this.transport.request<string>({
      api: "cSapModel",
      method: "GetModelFilename",
      parameters: {
        IncludePath: includePath,
      },
    });
  }

  getModelFilepath(): Promise<string> {
    return this.transport.request<string>({
      api: "cSapModel",
      method: "GetModelFilepath",
    });
  }

  getModelIsLocked(): Promise<boolean> {
    return this.transport.request<boolean>({
      api: "cSapModel",
      method: "GetModelIsLocked",
    });
  }

  getPresentCoordSystem(): Promise<string> {
    return this.transport.request<string>({
      api: "cSapModel",
      method: "GetPresentCoordSystem",
    });
  }

  getPresentUnits(): Promise<eUnits> {
    return this.transport.request<eUnits>({
      api: "cSapModel",
      method: "GetPresentUnits",
    });
  }

  getPresentUnits_2(): Promise<cSapModelGetPresentUnits_2Result> {
    return this.transport.request<cSapModelGetPresentUnits_2Result>({
      api: "cSapModel",
      method: "GetPresentUnits_2",
    });
  }

  getProgramInfo(): Promise<cSapModelGetProgramInfoResult> {
    return this.transport.request<cSapModelGetProgramInfoResult>({
      api: "cSapModel",
      method: "GetProgramInfo",
    });
  }

  getProjectInfo(): Promise<cSapModelGetProjectInfoResult> {
    return this.transport.request<cSapModelGetProjectInfoResult>({
      api: "cSapModel",
      method: "GetProjectInfo",
    });
  }

  getVersion(): Promise<cSapModelGetVersionResult> {
    return this.transport.request<cSapModelGetVersionResult>({
      api: "cSapModel",
      method: "GetVersion",
    });
  }

  initializeNewModel(units?: eUnits): Promise<void> {
    return this.transport.request<void>({
      api: "cSapModel",
      method: "InitializeNewModel",
      parameters: {
        Units: units,
      },
    });
  }

  setMergeTol(mergeTol: number): Promise<void> {
    return this.transport.request<void>({
      api: "cSapModel",
      method: "SetMergeTol",
      parameters: {
        MergeTol: mergeTol,
      },
    });
  }

  setModelIsLocked(lockit: boolean): Promise<void> {
    return this.transport.request<void>({
      api: "cSapModel",
      method: "SetModelIsLocked",
      parameters: {
        Lockit: lockit,
      },
    });
  }

  setPresentUnits(units: eUnits): Promise<void> {
    return this.transport.request<void>({
      api: "cSapModel",
      method: "SetPresentUnits",
      parameters: {
        Units: units,
      },
    });
  }

  setPresentUnits_2(forceUnits: eForce, lengthUnits: eLength, temperatureUnits: eTemperature): Promise<void> {
    return this.transport.request<void>({
      api: "cSapModel",
      method: "SetPresentUnits_2",
      parameters: {
        forceUnits: forceUnits,
        lengthUnits: lengthUnits,
        temperatureUnits: temperatureUnits,
      },
    });
  }

  setProjectInfo(item: string, data: string): Promise<void> {
    return this.transport.request<void>({
      api: "cSapModel",
      method: "SetProjectInfo",
      parameters: {
        Item: item,
        Data: data,
      },
    });
  }

  treeIsUpdateSuspended(): Promise<cSapModelTreeIsUpdateSuspendedResult> {
    return this.transport.request<cSapModelTreeIsUpdateSuspendedResult>({
      api: "cSapModel",
      method: "TreeIsUpdateSuspended",
    });
  }

  treeResumeUpdateData(): Promise<void> {
    return this.transport.request<void>({
      api: "cSapModel",
      method: "TreeResumeUpdateData",
    });
  }

  treeSuspendUpdateData(updateAtResume: boolean): Promise<void> {
    return this.transport.request<void>({
      api: "cSapModel",
      method: "TreeSuspendUpdateData",
      parameters: {
        updateAtResume: updateAtResume,
      },
    });
  }

}

export class cSelectApi {
  constructor(private readonly transport: EtabsTransport) {}

  all(deselect?: boolean): Promise<void> {
    return this.transport.request<void>({
      api: "cSelect",
      method: "All",
      parameters: {
        Deselect: deselect,
      },
    });
  }

  clearSelection(): Promise<void> {
    return this.transport.request<void>({
      api: "cSelect",
      method: "ClearSelection",
    });
  }

  getSelected(): Promise<cSelectGetSelectedResult> {
    return this.transport.request<cSelectGetSelectedResult>({
      api: "cSelect",
      method: "GetSelected",
    });
  }

  group(name: string, deselect?: boolean): Promise<void> {
    return this.transport.request<void>({
      api: "cSelect",
      method: "Group",
      parameters: {
        Name: name,
        Deselect: deselect,
      },
    });
  }

  invertSelection(): Promise<void> {
    return this.transport.request<void>({
      api: "cSelect",
      method: "InvertSelection",
    });
  }

  previousSelection(): Promise<void> {
    return this.transport.request<void>({
      api: "cSelect",
      method: "PreviousSelection",
    });
  }

}

export class cSpandrelLabelApi {
  constructor(private readonly transport: EtabsTransport) {}

  changeName(name: string, newName: string): Promise<void> {
    return this.transport.request<void>({
      api: "cSpandrelLabel",
      method: "ChangeName",
      parameters: {
        Name: name,
        NewName: newName,
      },
    });
  }

  delete_(name: string): Promise<void> {
    return this.transport.request<void>({
      api: "cSpandrelLabel",
      method: "Delete",
      parameters: {
        Name: name,
      },
    });
  }

  getNameList(): Promise<cSpandrelLabelGetNameListResult> {
    return this.transport.request<cSpandrelLabelGetNameListResult>({
      api: "cSpandrelLabel",
      method: "GetNameList",
    });
  }

  getSectionProperties(name: string): Promise<cSpandrelLabelGetSectionPropertiesResult> {
    return this.transport.request<cSpandrelLabelGetSectionPropertiesResult>({
      api: "cSpandrelLabel",
      method: "GetSectionProperties",
      parameters: {
        Name: name,
      },
    });
  }

  getSpandrel(name: string): Promise<cSpandrelLabelGetSpandrelResult> {
    return this.transport.request<cSpandrelLabelGetSpandrelResult>({
      api: "cSpandrelLabel",
      method: "GetSpandrel",
      parameters: {
        Name: name,
      },
    });
  }

  setSpandrel(name: string, isMultiStory: boolean): Promise<void> {
    return this.transport.request<void>({
      api: "cSpandrelLabel",
      method: "SetSpandrel",
      parameters: {
        Name: name,
        IsMultiStory: isMultiStory,
      },
    });
  }

}

export class cStoryApi {
  constructor(private readonly transport: EtabsTransport) {}

  getElevation(name: string): Promise<cStoryGetElevationResult> {
    return this.transport.request<cStoryGetElevationResult>({
      api: "cStory",
      method: "GetElevation",
      parameters: {
        Name: name,
      },
    });
  }

  getGUID(name: string): Promise<cStoryGetGUIDResult> {
    return this.transport.request<cStoryGetGUIDResult>({
      api: "cStory",
      method: "GetGUID",
      parameters: {
        Name: name,
      },
    });
  }

  getHeight(name: string): Promise<cStoryGetHeightResult> {
    return this.transport.request<cStoryGetHeightResult>({
      api: "cStory",
      method: "GetHeight",
      parameters: {
        Name: name,
      },
    });
  }

  getMasterStory(name: string): Promise<cStoryGetMasterStoryResult> {
    return this.transport.request<cStoryGetMasterStoryResult>({
      api: "cStory",
      method: "GetMasterStory",
      parameters: {
        Name: name,
      },
    });
  }

  getNameList(): Promise<cStoryGetNameListResult> {
    return this.transport.request<cStoryGetNameListResult>({
      api: "cStory",
      method: "GetNameList",
    });
  }

  getSimilarTo(name: string): Promise<cStoryGetSimilarToResult> {
    return this.transport.request<cStoryGetSimilarToResult>({
      api: "cStory",
      method: "GetSimilarTo",
      parameters: {
        Name: name,
      },
    });
  }

  getSplice(name: string): Promise<cStoryGetSpliceResult> {
    return this.transport.request<cStoryGetSpliceResult>({
      api: "cStory",
      method: "GetSplice",
      parameters: {
        Name: name,
      },
    });
  }

  getStories(): Promise<cStoryGetStoriesResult> {
    return this.transport.request<cStoryGetStoriesResult>({
      api: "cStory",
      method: "GetStories",
    });
  }

  getStories_2(): Promise<cStoryGetStories_2Result> {
    return this.transport.request<cStoryGetStories_2Result>({
      api: "cStory",
      method: "GetStories_2",
    });
  }

  setElevation(name: string, elevation: number): Promise<void> {
    return this.transport.request<void>({
      api: "cStory",
      method: "SetElevation",
      parameters: {
        Name: name,
        Elevation: elevation,
      },
    });
  }

  setGUID(name: string, gUID?: string): Promise<void> {
    return this.transport.request<void>({
      api: "cStory",
      method: "SetGUID",
      parameters: {
        Name: name,
        GUID: gUID,
      },
    });
  }

  setHeight(name: string, height: number): Promise<void> {
    return this.transport.request<void>({
      api: "cStory",
      method: "SetHeight",
      parameters: {
        Name: name,
        Height: height,
      },
    });
  }

  setMasterStory(name: string, isMasterStory: boolean): Promise<void> {
    return this.transport.request<void>({
      api: "cStory",
      method: "SetMasterStory",
      parameters: {
        Name: name,
        IsMasterStory: isMasterStory,
      },
    });
  }

  setSimilarTo(name: string, similarToStory: string): Promise<void> {
    return this.transport.request<void>({
      api: "cStory",
      method: "SetSimilarTo",
      parameters: {
        Name: name,
        SimilarToStory: similarToStory,
      },
    });
  }

  setSplice(name: string, spliceAbove: boolean, spliceHeight: number): Promise<void> {
    return this.transport.request<void>({
      api: "cStory",
      method: "SetSplice",
      parameters: {
        Name: name,
        SpliceAbove: spliceAbove,
        SpliceHeight: spliceHeight,
      },
    });
  }

  setStories(storyNames: string[], storyElevations: number[], storyHeights: number[], isMasterStory: boolean[], similarToStory: string[], spliceAbove: boolean[], spliceHeight: number[]): Promise<void> {
    return this.transport.request<void>({
      api: "cStory",
      method: "SetStories",
      parameters: {
        StoryNames: storyNames,
        StoryElevations: storyElevations,
        StoryHeights: storyHeights,
        IsMasterStory: isMasterStory,
        SimilarToStory: similarToStory,
        SpliceAbove: spliceAbove,
        SpliceHeight: spliceHeight,
      },
    });
  }

  setStories_2(baseElevation: number, numberStories: number, storyNames: string[], storyHeights: number[], isMasterStory: boolean[], similarToStory: string[], spliceAbove: boolean[], spliceHeight: number[], color: number[]): Promise<cStorySetStories_2Result> {
    return this.transport.request<cStorySetStories_2Result>({
      api: "cStory",
      method: "SetStories_2",
      parameters: {
        BaseElevation: baseElevation,
        NumberStories: numberStories,
        StoryNames: storyNames,
        StoryHeights: storyHeights,
        IsMasterStory: isMasterStory,
        SimilarToStory: similarToStory,
        SpliceAbove: spliceAbove,
        SpliceHeight: spliceHeight,
        color: color,
      },
    });
  }

}

export class cTendonObjApi {
  constructor(private readonly transport: EtabsTransport) {}

  changeName(name: string, newName: string): Promise<void> {
    return this.transport.request<void>({
      api: "cTendonObj",
      method: "ChangeName",
      parameters: {
        Name: name,
        NewName: newName,
      },
    });
  }

  count(): Promise<number> {
    return this.transport.request<number>({
      api: "cTendonObj",
      method: "Count",
    });
  }

  getDatumOffset(name: string, itemType?: eItemType): Promise<cTendonObjGetDatumOffsetResult> {
    return this.transport.request<cTendonObjGetDatumOffsetResult>({
      api: "cTendonObj",
      method: "GetDatumOffset",
      parameters: {
        Name: name,
        ItemType: itemType,
      },
    });
  }

  getDrawingPoint(name: string, itemType?: eItemType): Promise<cTendonObjGetDrawingPointResult> {
    return this.transport.request<cTendonObjGetDrawingPointResult>({
      api: "cTendonObj",
      method: "GetDrawingPoint",
      parameters: {
        Name: name,
        ItemType: itemType,
      },
    });
  }

  getGroupAssign(name: string): Promise<cTendonObjGetGroupAssignResult> {
    return this.transport.request<cTendonObjGetGroupAssignResult>({
      api: "cTendonObj",
      method: "GetGroupAssign",
      parameters: {
        Name: name,
      },
    });
  }

  getLoadForceStress_1(name: string, itemType?: eItemType): Promise<cTendonObjGetLoadForceStress_1Result> {
    return this.transport.request<cTendonObjGetLoadForceStress_1Result>({
      api: "cTendonObj",
      method: "GetLoadForceStress_1",
      parameters: {
        Name: name,
        ItemType: itemType,
      },
    });
  }

  getLossesDetailed(name: string, itemType?: eItemType): Promise<cTendonObjGetLossesDetailedResult> {
    return this.transport.request<cTendonObjGetLossesDetailedResult>({
      api: "cTendonObj",
      method: "GetLossesDetailed",
      parameters: {
        Name: name,
        ItemType: itemType,
      },
    });
  }

  getLossesFixed(name: string, itemType?: eItemType): Promise<cTendonObjGetLossesFixedResult> {
    return this.transport.request<cTendonObjGetLossesFixedResult>({
      api: "cTendonObj",
      method: "GetLossesFixed",
      parameters: {
        Name: name,
        ItemType: itemType,
      },
    });
  }

  getLossesPercent(name: string, itemType?: eItemType): Promise<cTendonObjGetLossesPercentResult> {
    return this.transport.request<cTendonObjGetLossesPercentResult>({
      api: "cTendonObj",
      method: "GetLossesPercent",
      parameters: {
        Name: name,
        ItemType: itemType,
      },
    });
  }

  getNameList(): Promise<cTendonObjGetNameListResult> {
    return this.transport.request<cTendonObjGetNameListResult>({
      api: "cTendonObj",
      method: "GetNameList",
    });
  }

  getNameListOnStory(storyName: string): Promise<cTendonObjGetNameListOnStoryResult> {
    return this.transport.request<cTendonObjGetNameListOnStoryResult>({
      api: "cTendonObj",
      method: "GetNameListOnStory",
      parameters: {
        StoryName: storyName,
      },
    });
  }

  getNumberStrands(name: string, itemType?: eItemType): Promise<cTendonObjGetNumberStrandsResult> {
    return this.transport.request<cTendonObjGetNumberStrandsResult>({
      api: "cTendonObj",
      method: "GetNumberStrands",
      parameters: {
        Name: name,
        ItemType: itemType,
      },
    });
  }

  getProperty(name: string): Promise<cTendonObjGetPropertyResult> {
    return this.transport.request<cTendonObjGetPropertyResult>({
      api: "cTendonObj",
      method: "GetProperty",
      parameters: {
        Name: name,
      },
    });
  }

  getSelected(name: string): Promise<cTendonObjGetSelectedResult> {
    return this.transport.request<cTendonObjGetSelectedResult>({
      api: "cTendonObj",
      method: "GetSelected",
      parameters: {
        Name: name,
      },
    });
  }

  getTendonGeometry(name: string, cSys?: string): Promise<cTendonObjGetTendonGeometryResult> {
    return this.transport.request<cTendonObjGetTendonGeometryResult>({
      api: "cTendonObj",
      method: "GetTendonGeometry",
      parameters: {
        Name: name,
        CSys: cSys,
      },
    });
  }

  setGroupAssign(name: string, groupName: string, remove?: boolean, itemType?: eItemType): Promise<void> {
    return this.transport.request<void>({
      api: "cTendonObj",
      method: "SetGroupAssign",
      parameters: {
        Name: name,
        GroupName: groupName,
        Remove: remove,
        ItemType: itemType,
      },
    });
  }

  setSelected(name: string, selected: boolean, itemType?: eItemType): Promise<void> {
    return this.transport.request<void>({
      api: "cTendonObj",
      method: "SetSelected",
      parameters: {
        Name: name,
        Selected: selected,
        ItemType: itemType,
      },
    });
  }

}

export class cTowerApi {
  constructor(private readonly transport: EtabsTransport) {}

  addCopyOfTower(towerName: string, newTowerName: string): Promise<void> {
    return this.transport.request<void>({
      api: "cTower",
      method: "AddCopyOfTower",
      parameters: {
        TowerName: towerName,
        NewTowerName: newTowerName,
      },
    });
  }

  addNewTower(towerName: string, numberStories: number, typicalStoryHeight: number, botttomStoryHeight: number): Promise<void> {
    return this.transport.request<void>({
      api: "cTower",
      method: "AddNewTower",
      parameters: {
        TowerName: towerName,
        NumberStories: numberStories,
        TypicalStoryHeight: typicalStoryHeight,
        BotttomStoryHeight: botttomStoryHeight,
      },
    });
  }

  allowMultipleTowers(allowMultTowers: boolean, retainedTower?: string, combine?: boolean): Promise<void> {
    return this.transport.request<void>({
      api: "cTower",
      method: "AllowMultipleTowers",
      parameters: {
        AllowMultTowers: allowMultTowers,
        RetainedTower: retainedTower,
        Combine: combine,
      },
    });
  }

  deleteTower(towerName: string, associate: boolean, assocWithTower?: string): Promise<void> {
    return this.transport.request<void>({
      api: "cTower",
      method: "DeleteTower",
      parameters: {
        TowerName: towerName,
        Associate: associate,
        AssocWithTower: assocWithTower,
      },
    });
  }

  getActiveTower(): Promise<cTowerGetActiveTowerResult> {
    return this.transport.request<cTowerGetActiveTowerResult>({
      api: "cTower",
      method: "GetActiveTower",
    });
  }

  getNameList(): Promise<cTowerGetNameListResult> {
    return this.transport.request<cTowerGetNameListResult>({
      api: "cTower",
      method: "GetNameList",
    });
  }

  renameTower(towerName: string, newTowerName: string): Promise<void> {
    return this.transport.request<void>({
      api: "cTower",
      method: "RenameTower",
      parameters: {
        TowerName: towerName,
        NewTowerName: newTowerName,
      },
    });
  }

  setActiveTower(towerName: string): Promise<void> {
    return this.transport.request<void>({
      api: "cTower",
      method: "SetActiveTower",
      parameters: {
        TowerName: towerName,
      },
    });
  }

}

export class cViewApi {
  constructor(private readonly transport: EtabsTransport) {}

  refreshView(window?: number, zoom?: boolean): Promise<void> {
    return this.transport.request<void>({
      api: "cView",
      method: "RefreshView",
      parameters: {
        Window: window,
        Zoom: zoom,
      },
    });
  }

  refreshWindow(window?: number): Promise<void> {
    return this.transport.request<void>({
      api: "cView",
      method: "RefreshWindow",
      parameters: {
        Window: window,
      },
    });
  }

}

export class EtabsClient {
  readonly analysisResults: cAnalysisResultsApi;
  readonly analysisResultsSetup: cAnalysisResultsSetupApi;
  readonly analyze: cAnalyzeApi;
  readonly areaElm: cAreaElmApi;
  readonly areaObj: cAreaObjApi;
  readonly autoSeismic: cAutoSeismicApi;
  readonly autoWind: cAutoWindApi;
  readonly caseBuckling: cCaseBucklingApi;
  readonly caseDirectHistoryLinear: cCaseDirectHistoryLinearApi;
  readonly caseDirectHistoryNonlinear: cCaseDirectHistoryNonlinearApi;
  readonly caseHyperStatic: cCaseHyperStaticApi;
  readonly caseModalEigen: cCaseModalEigenApi;
  readonly caseModalHistoryLinear: cCaseModalHistoryLinearApi;
  readonly caseModalHistoryNonlinear: cCaseModalHistoryNonlinearApi;
  readonly caseModalRitz: cCaseModalRitzApi;
  readonly caseResponseSpectrum: cCaseResponseSpectrumApi;
  readonly caseStaticLinear: cCaseStaticLinearApi;
  readonly caseStaticNonlinear: cCaseStaticNonlinearApi;
  readonly caseStaticNonlinearStaged: cCaseStaticNonlinearStagedApi;
  readonly combo: cComboApi;
  readonly constraint: cConstraintApi;
  readonly databaseTables: cDatabaseTablesApi;
  readonly dCoACI318_08_IBC2009: cDCoACI318_08_IBC2009Api;
  readonly dCoACI318_14: cDCoACI318_14Api;
  readonly dCoACI318_19: cDCoACI318_19Api;
  readonly dCoAS_3600_09: cDCoAS_3600_09Api;
  readonly dCoAS_3600_2018: cDCoAS_3600_2018Api;
  readonly dCoBS8110_97: cDCoBS8110_97Api;
  readonly dCoChinese_2010: cDCoChinese_2010Api;
  readonly dCoEurocode_2_2004: cDCoEurocode_2_2004Api;
  readonly dCoIndian_IS_456_2000: cDCoIndian_IS_456_2000Api;
  readonly dCoMexican_RCDF_2017: cDCoMexican_RCDF_2017Api;
  readonly dCompColAISC360_22: cDCompColAISC360_22Api;
  readonly dCompColCSAS16_19: cDCompColCSAS16_19Api;
  readonly dCompColCSAS16_24: cDCompColCSAS16_24Api;
  readonly dCompColEurocode_4_2004: cDCompColEurocode_4_2004Api;
  readonly dCompColIS11384_2022: cDCompColIS11384_2022Api;
  readonly dConcSlabACI318_14: cDConcSlabACI318_14Api;
  readonly dCoSP63133302011: cDCoSP63133302011Api;
  readonly dCoTS_500_2000_R2018: cDCoTS_500_2000_R2018Api;
  readonly designCompositeBeam: cDesignCompositeBeamApi;
  readonly designCompositeColumn: cDesignCompositeColumnApi;
  readonly designConcrete: cDesignConcreteApi;
  readonly designConcreteSlab: cDesignConcreteSlabApi;
  readonly designForces: cDesignForcesApi;
  readonly designResults: cDesignResultsApi;
  readonly designShearWall: cDesignShearWallApi;
  readonly designSteel: cDesignSteelApi;
  readonly designStrip: cDesignStripApi;
  readonly detailing: cDetailingApi;
  readonly diaphragm: cDiaphragmApi;
  readonly dStAISC_LRFD93: cDStAISC_LRFD93Api;
  readonly dStAISC360_05_IBC2006: cDStAISC360_05_IBC2006Api;
  readonly dStAISC360_10: cDStAISC360_10Api;
  readonly dStAISC360_16: cDStAISC360_16Api;
  readonly dStAISC360_22: cDStAISC360_22Api;
  readonly dStAustralian_AS4100_2020: cDStAustralian_AS4100_2020Api;
  readonly dStAustralian_AS4100_98: cDStAustralian_AS4100_98Api;
  readonly dStBS5950_2000: cDStBS5950_2000Api;
  readonly dStCanadian_S16_09: cDStCanadian_S16_09Api;
  readonly dStCanadian_S16_14: cDStCanadian_S16_14Api;
  readonly dStCanadian_S16_19: cDStCanadian_S16_19Api;
  readonly dStCanadian_S16_24: cDStCanadian_S16_24Api;
  readonly dStChinese_2010: cDStChinese_2010Api;
  readonly dStChinese_2018: cDStChinese_2018Api;
  readonly dStEN1993_1_1_2005: cDStEN1993_1_1_2005Api;
  readonly dStEurocode_3_2005: cDStEurocode_3_2005Api;
  readonly dStIndian_IS_800_2007: cDStIndian_IS_800_2007Api;
  readonly dStItalianNTC2008S: cDStItalianNTC2008SApi;
  readonly dStItalianNTC2018S: cDStItalianNTC2018SApi;
  readonly dStNewZealand_NZS3404_97: cDStNewZealand_NZS3404_97Api;
  readonly dStSP16_13330_2011: cDStSP16_13330_2011Api;
  readonly editArea: cEditAreaApi;
  readonly editFrame: cEditFrameApi;
  readonly editGeneral: cEditGeneralApi;
  readonly editPoint: cEditPointApi;
  readonly file: cFileApi;
  readonly frameObj: cFrameObjApi;
  readonly function: cFunctionApi;
  readonly functionRS: cFunctionRSApi;
  readonly functionTH: cFunctionTHApi;
  readonly genDispl: cGenDisplApi;
  readonly gridSys: cGridSysApi;
  readonly group: cGroupApi;
  readonly lineElm: cLineElmApi;
  readonly linkElm: cLinkElmApi;
  readonly linkObj: cLinkObjApi;
  readonly loadCases: cLoadCasesApi;
  readonly loadPatterns: cLoadPatternsApi;
  readonly oAPI: cOAPIApi;
  readonly options: cOptionsApi;
  readonly pattern: cPatternApi;
  readonly pierLabel: cPierLabelApi;
  readonly pointElm: cPointElmApi;
  readonly pointObj: cPointObjApi;
  readonly propArea: cPropAreaApi;
  readonly propAreaSpring: cPropAreaSpringApi;
  readonly propFrame: cPropFrameApi;
  readonly propFrameSDShape: cPropFrameSDShapeApi;
  readonly propLineSpring: cPropLineSpringApi;
  readonly propLink: cPropLinkApi;
  readonly propMaterial: cPropMaterialApi;
  readonly propMaterialTD: cPropMaterialTDApi;
  readonly propPointSpring: cPropPointSpringApi;
  readonly propRebar: cPropRebarApi;
  readonly propTendon: cPropTendonApi;
  readonly sapModel: cSapModelApi;
  readonly select: cSelectApi;
  readonly spandrelLabel: cSpandrelLabelApi;
  readonly story: cStoryApi;
  readonly tendonObj: cTendonObjApi;
  readonly tower: cTowerApi;
  readonly view: cViewApi;

  constructor(transport: EtabsTransport) {
    this.analysisResults = new cAnalysisResultsApi(transport);
    this.analysisResultsSetup = new cAnalysisResultsSetupApi(transport);
    this.analyze = new cAnalyzeApi(transport);
    this.areaElm = new cAreaElmApi(transport);
    this.areaObj = new cAreaObjApi(transport);
    this.autoSeismic = new cAutoSeismicApi(transport);
    this.autoWind = new cAutoWindApi(transport);
    this.caseBuckling = new cCaseBucklingApi(transport);
    this.caseDirectHistoryLinear = new cCaseDirectHistoryLinearApi(transport);
    this.caseDirectHistoryNonlinear = new cCaseDirectHistoryNonlinearApi(transport);
    this.caseHyperStatic = new cCaseHyperStaticApi(transport);
    this.caseModalEigen = new cCaseModalEigenApi(transport);
    this.caseModalHistoryLinear = new cCaseModalHistoryLinearApi(transport);
    this.caseModalHistoryNonlinear = new cCaseModalHistoryNonlinearApi(transport);
    this.caseModalRitz = new cCaseModalRitzApi(transport);
    this.caseResponseSpectrum = new cCaseResponseSpectrumApi(transport);
    this.caseStaticLinear = new cCaseStaticLinearApi(transport);
    this.caseStaticNonlinear = new cCaseStaticNonlinearApi(transport);
    this.caseStaticNonlinearStaged = new cCaseStaticNonlinearStagedApi(transport);
    this.combo = new cComboApi(transport);
    this.constraint = new cConstraintApi(transport);
    this.databaseTables = new cDatabaseTablesApi(transport);
    this.dCoACI318_08_IBC2009 = new cDCoACI318_08_IBC2009Api(transport);
    this.dCoACI318_14 = new cDCoACI318_14Api(transport);
    this.dCoACI318_19 = new cDCoACI318_19Api(transport);
    this.dCoAS_3600_09 = new cDCoAS_3600_09Api(transport);
    this.dCoAS_3600_2018 = new cDCoAS_3600_2018Api(transport);
    this.dCoBS8110_97 = new cDCoBS8110_97Api(transport);
    this.dCoChinese_2010 = new cDCoChinese_2010Api(transport);
    this.dCoEurocode_2_2004 = new cDCoEurocode_2_2004Api(transport);
    this.dCoIndian_IS_456_2000 = new cDCoIndian_IS_456_2000Api(transport);
    this.dCoMexican_RCDF_2017 = new cDCoMexican_RCDF_2017Api(transport);
    this.dCompColAISC360_22 = new cDCompColAISC360_22Api(transport);
    this.dCompColCSAS16_19 = new cDCompColCSAS16_19Api(transport);
    this.dCompColCSAS16_24 = new cDCompColCSAS16_24Api(transport);
    this.dCompColEurocode_4_2004 = new cDCompColEurocode_4_2004Api(transport);
    this.dCompColIS11384_2022 = new cDCompColIS11384_2022Api(transport);
    this.dConcSlabACI318_14 = new cDConcSlabACI318_14Api(transport);
    this.dCoSP63133302011 = new cDCoSP63133302011Api(transport);
    this.dCoTS_500_2000_R2018 = new cDCoTS_500_2000_R2018Api(transport);
    this.designCompositeBeam = new cDesignCompositeBeamApi(transport);
    this.designCompositeColumn = new cDesignCompositeColumnApi(transport);
    this.designConcrete = new cDesignConcreteApi(transport);
    this.designConcreteSlab = new cDesignConcreteSlabApi(transport);
    this.designForces = new cDesignForcesApi(transport);
    this.designResults = new cDesignResultsApi(transport);
    this.designShearWall = new cDesignShearWallApi(transport);
    this.designSteel = new cDesignSteelApi(transport);
    this.designStrip = new cDesignStripApi(transport);
    this.detailing = new cDetailingApi(transport);
    this.diaphragm = new cDiaphragmApi(transport);
    this.dStAISC_LRFD93 = new cDStAISC_LRFD93Api(transport);
    this.dStAISC360_05_IBC2006 = new cDStAISC360_05_IBC2006Api(transport);
    this.dStAISC360_10 = new cDStAISC360_10Api(transport);
    this.dStAISC360_16 = new cDStAISC360_16Api(transport);
    this.dStAISC360_22 = new cDStAISC360_22Api(transport);
    this.dStAustralian_AS4100_2020 = new cDStAustralian_AS4100_2020Api(transport);
    this.dStAustralian_AS4100_98 = new cDStAustralian_AS4100_98Api(transport);
    this.dStBS5950_2000 = new cDStBS5950_2000Api(transport);
    this.dStCanadian_S16_09 = new cDStCanadian_S16_09Api(transport);
    this.dStCanadian_S16_14 = new cDStCanadian_S16_14Api(transport);
    this.dStCanadian_S16_19 = new cDStCanadian_S16_19Api(transport);
    this.dStCanadian_S16_24 = new cDStCanadian_S16_24Api(transport);
    this.dStChinese_2010 = new cDStChinese_2010Api(transport);
    this.dStChinese_2018 = new cDStChinese_2018Api(transport);
    this.dStEN1993_1_1_2005 = new cDStEN1993_1_1_2005Api(transport);
    this.dStEurocode_3_2005 = new cDStEurocode_3_2005Api(transport);
    this.dStIndian_IS_800_2007 = new cDStIndian_IS_800_2007Api(transport);
    this.dStItalianNTC2008S = new cDStItalianNTC2008SApi(transport);
    this.dStItalianNTC2018S = new cDStItalianNTC2018SApi(transport);
    this.dStNewZealand_NZS3404_97 = new cDStNewZealand_NZS3404_97Api(transport);
    this.dStSP16_13330_2011 = new cDStSP16_13330_2011Api(transport);
    this.editArea = new cEditAreaApi(transport);
    this.editFrame = new cEditFrameApi(transport);
    this.editGeneral = new cEditGeneralApi(transport);
    this.editPoint = new cEditPointApi(transport);
    this.file = new cFileApi(transport);
    this.frameObj = new cFrameObjApi(transport);
    this.function = new cFunctionApi(transport);
    this.functionRS = new cFunctionRSApi(transport);
    this.functionTH = new cFunctionTHApi(transport);
    this.genDispl = new cGenDisplApi(transport);
    this.gridSys = new cGridSysApi(transport);
    this.group = new cGroupApi(transport);
    this.lineElm = new cLineElmApi(transport);
    this.linkElm = new cLinkElmApi(transport);
    this.linkObj = new cLinkObjApi(transport);
    this.loadCases = new cLoadCasesApi(transport);
    this.loadPatterns = new cLoadPatternsApi(transport);
    this.oAPI = new cOAPIApi(transport);
    this.options = new cOptionsApi(transport);
    this.pattern = new cPatternApi(transport);
    this.pierLabel = new cPierLabelApi(transport);
    this.pointElm = new cPointElmApi(transport);
    this.pointObj = new cPointObjApi(transport);
    this.propArea = new cPropAreaApi(transport);
    this.propAreaSpring = new cPropAreaSpringApi(transport);
    this.propFrame = new cPropFrameApi(transport);
    this.propFrameSDShape = new cPropFrameSDShapeApi(transport);
    this.propLineSpring = new cPropLineSpringApi(transport);
    this.propLink = new cPropLinkApi(transport);
    this.propMaterial = new cPropMaterialApi(transport);
    this.propMaterialTD = new cPropMaterialTDApi(transport);
    this.propPointSpring = new cPropPointSpringApi(transport);
    this.propRebar = new cPropRebarApi(transport);
    this.propTendon = new cPropTendonApi(transport);
    this.sapModel = new cSapModelApi(transport);
    this.select = new cSelectApi(transport);
    this.spandrelLabel = new cSpandrelLabelApi(transport);
    this.story = new cStoryApi(transport);
    this.tendonObj = new cTendonObjApi(transport);
    this.tower = new cTowerApi(transport);
    this.view = new cViewApi(transport);
  }
}
