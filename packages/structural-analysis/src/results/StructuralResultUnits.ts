import type { SpatialStaticAnalysisResult, StructuralEngineComparison } from '../domain/types.js';
import { StructuralModelUnits } from '../units/StructuralModelUnits.js';

/** Converts solver results from internal kN-m to the requested display units. */
export class StructuralResultUnits {
  public constructor(private readonly units: StructuralModelUnits) {}

  public analysis(result: SpatialStaticAnalysisResult | null): SpatialStaticAnalysisResult | null {
    if (!result) return null;
    return {
      ...result,
      cases: result.cases.map((loadCase) => ({
        ...loadCase,
        appliedResultant: this.resultant(loadCase.appliedResultant),
        baseReaction: this.resultant(loadCase.baseReaction),
        levels: loadCase.levels.map((level) => ({
          ...level,
          ux: this.units.fromLength(level.ux),
          uy: this.units.fromLength(level.uy),
        })),
        wallActions: loadCase.wallActions.map((action) => ({
          ...action,
          axial: this.units.fromForce(action.axial),
          shear: this.units.fromForce(action.shear),
          moment: this.units.fromMoment(action.moment),
        })),
      })),
    };
  }

  public comparison(result: StructuralEngineComparison | null): object | null {
    if (!result) return null;
    return {
      ...result,
      absoluteTolerance: {
        force: this.units.fromForce(result.absoluteTolerance),
        moment: this.units.fromMoment(result.absoluteTolerance),
      },
      wallActions: result.wallActions.map((action) => {
        const convert = action.quantity === 'moment'
          ? (value: number) => this.units.fromMoment(value)
          : (value: number) => this.units.fromForce(value);
        return {
          ...action,
          openSees: convert(action.openSees),
          etabs: convert(action.etabs),
          absoluteDifference: convert(action.absoluteDifference),
        };
      }),
    };
  }

  private resultant(value: { fx: number; fy: number; mz: number }): { fx: number; fy: number; mz: number } {
    return {
      fx: this.units.fromForce(value.fx),
      fy: this.units.fromForce(value.fy),
      mz: this.units.fromMoment(value.mz),
    };
  }
}
