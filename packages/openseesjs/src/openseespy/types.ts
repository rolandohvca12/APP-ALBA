export type OpenSeesScalar = string | number | boolean;

export type OpenSeesPyArgument =
  | OpenSeesScalar
  | undefined
  | OpenSeesPyExpression
  | OpenSeesPyFlagOptions
  | readonly OpenSeesPyArgument[];

export type OpenSeesPyFlagValue = OpenSeesPyArgument | true;
export interface OpenSeesPyFlagOptions {
  readonly [flag: string]: OpenSeesPyFlagValue;
}

export interface OpenSeesPyExpression {
  readonly tcl: string;
}

/** Nombres aceptados históricamente por Tcl para el Basic Model Builder. */
export type OpenSeesModelBuilderType = 'basic' | 'Basic' | 'BasicBuilder';
