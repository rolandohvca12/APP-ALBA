import type {
  ComparedWallQuantity,
  SpatialStaticAnalysisResult,
  StructuralEngineComparison,
  WallActionComparison,
  WallStoryAction,
} from '../domain/types.js';

export interface StructuralComparisonOptions {
  relativeTolerance?: number;
  absoluteTolerance?: number;
}

export class StructuralEngineComparator {
  public compare(
    first: SpatialStaticAnalysisResult,
    second: SpatialStaticAnalysisResult,
    options: StructuralComparisonOptions = {},
  ): StructuralEngineComparison {
    const openSees = first.engine === 'opensees' ? first : second;
    const etabs = first.engine === 'etabs' ? first : second;
    if (openSees.engine !== 'opensees' || etabs.engine !== 'etabs') throw new Error('Comparison requires one OpenSees result and one ETABS result.');
    if (openSees.modelId !== etabs.modelId) throw new Error(`Cannot compare different models: ${openSees.modelId} and ${etabs.modelId}.`);
    const relativeTolerance = options.relativeTolerance ?? 0.05;
    const absoluteTolerance = options.absoluteTolerance ?? 1e-6;
    if (relativeTolerance < 0 || absoluteTolerance < 0) throw new RangeError('Comparison tolerances must be non-negative.');

    const comparisons: WallActionComparison[] = [];
    for (const openCase of openSees.cases) {
      const etabsCase = etabs.cases.find((item) => item.caseId === openCase.caseId);
      if (!etabsCase) throw new Error(`ETABS result is missing load case ${openCase.caseId}.`);
      const etabsActions = new Map(etabsCase.wallActions.map((action) => [actionKey(action), action]));
      for (const action of openCase.wallActions) {
        const other = etabsActions.get(actionKey(action));
        if (!other) throw new Error(`ETABS result is missing ${action.wallId} at ${action.levelId} in ${openCase.caseId}.`);
        for (const quantity of ['shear', 'moment', 'axial'] as const) {
          comparisons.push(compareQuantity(openCase.caseId, action, other, quantity, relativeTolerance, absoluteTolerance));
        }
      }
    }
    const maximumRelativeDifference = comparisons.reduce((maximum, item) =>
      item.absoluteDifference <= absoluteTolerance ? maximum : Math.max(maximum, item.relativeDifference), 0);
    const failed = comparisons.filter((item) => !item.withinTolerance);
    const invalidCases = [openSees, etabs].flatMap((result) => result.cases
      .filter((item) => !item.converged)
      .map((item) => `${result.engine} ${item.caseId} (equilibrium error ${item.equilibriumError})`));
    return {
      modelId: openSees.modelId,
      relativeTolerance,
      absoluteTolerance,
      wallActions: comparisons,
      maximumRelativeDifference,
      allWithinTolerance: failed.length === 0 && invalidCases.length === 0,
      diagnostics: [
        ...(invalidCases.length ? [`Nonconverged cases: ${invalidCases.join(', ')}.`] : []),
        failed.length === 0
          ? 'All wall actions are within the configured OpenSees/ETABS tolerance.'
          : `${failed.length} of ${comparisons.length} wall-action values exceed the configured tolerance.`,
      ],
    };
  }
}

function compareQuantity(
  caseId: string,
  openSees: WallStoryAction,
  etabs: WallStoryAction,
  quantity: ComparedWallQuantity,
  relativeTolerance: number,
  absoluteTolerance: number,
): WallActionComparison {
  const a = openSees[quantity]; const b = etabs[quantity];
  const absoluteDifference = Math.abs(a - b);
  const relativeDifference = absoluteDifference / Math.max(Math.abs(a), Math.abs(b), absoluteTolerance);
  return {
    caseId,
    wallId: openSees.wallId,
    levelId: openSees.levelId,
    quantity,
    openSees: a,
    etabs: b,
    absoluteDifference,
    relativeDifference,
    withinTolerance: absoluteDifference <= absoluteTolerance || relativeDifference <= relativeTolerance,
  };
}

function actionKey(action: Pick<WallStoryAction, 'wallId' | 'levelId' | 'direction'>): string {
  return `${action.wallId}\u0000${action.levelId}\u0000${action.direction}`;
}
