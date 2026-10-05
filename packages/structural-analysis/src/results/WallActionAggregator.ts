import type { AnalysisDirection, SpatialStaticAnalysisResult } from '../domain/types.js';

export interface LevelDirectionActions {
  caseId: string;
  levelId: string;
  direction: AnalysisDirection;
  wallCount: number;
  sumShear: number;
  sumMoment: number;
  sumAxial: number;
}

/** Produces global story totals while preserving individual wall demands in the source result. */
export class WallActionAggregator {
  public static byLevelAndDirection(result: SpatialStaticAnalysisResult): LevelDirectionActions[] {
    const grouped = new Map<string, LevelDirectionActions>();
    for (const loadCase of result.cases) for (const wall of loadCase.wallActions) {
      const key = `${loadCase.caseId}\u0000${wall.levelId}\u0000${wall.direction}`;
      const row = grouped.get(key) ?? {
        caseId: loadCase.caseId,
        levelId: wall.levelId,
        direction: wall.direction,
        wallCount: 0,
        sumShear: 0,
        sumMoment: 0,
        sumAxial: 0,
      };
      row.wallCount++;
      row.sumShear += wall.shear;
      row.sumMoment += wall.moment;
      row.sumAxial += wall.axial;
      grouped.set(key, row);
    }
    return [...grouped.values()];
  }
}
