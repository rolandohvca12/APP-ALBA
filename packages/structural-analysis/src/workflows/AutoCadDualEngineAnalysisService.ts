import type { AutoCadQueryClient } from '@app-alba/autocad-client';
import { SpatialWideColumnModelAssembler } from '../assembly/SpatialWideColumnModelAssembler.js';
import { StructuralEngineComparator, type StructuralComparisonOptions } from '../comparison/StructuralEngineComparator.js';
import type {
  SpatialStaticAnalysisResult,
  SpatialStructuralModel,
  StructuralEngineComparison,
} from '../domain/types.js';
import {
  AutoCadSpatialModelSource,
  type AutoCadStructuralCoverage,
  type AutoCadSpatialModelSourceInput,
} from '../sources/AutoCadSpatialModelSource.js';
import type { SpatialStructuralAnalysisStrategy } from '../strategies/SpatialStructuralAnalysisStrategy.js';

export interface DualEngineStructuralAnalysisResult {
  model: SpatialStructuralModel;
  openSees: SpatialStaticAnalysisResult;
  etabs: SpatialStaticAnalysisResult;
  comparison: StructuralEngineComparison;
  warnings: readonly string[];
  coverage: AutoCadStructuralCoverage;
}

/** Orchestrates CAD extraction and identical-model execution in both solvers. */
export class AutoCadDualEngineAnalysisService {
  public constructor(
    private readonly openSees: SpatialStructuralAnalysisStrategy,
    private readonly etabs: SpatialStructuralAnalysisStrategy,
    private readonly assembler = new SpatialWideColumnModelAssembler(),
    private readonly comparator = new StructuralEngineComparator(),
  ) {
    if (openSees.engine !== 'opensees' || etabs.engine !== 'etabs') {
      throw new Error('AutoCadDualEngineAnalysisService requires OpenSees first and ETABS second.');
    }
  }

  public async analyze(
    query: AutoCadQueryClient,
    source: AutoCadSpatialModelSourceInput,
    comparisonOptions: StructuralComparisonOptions = {},
  ): Promise<DualEngineStructuralAnalysisResult> {
    const loaded = await AutoCadSpatialModelSource.load(query, source);
    const model = this.assembler.assemble(loaded.input);
    const [openSees, etabs] = await Promise.all([
      this.openSees.analyze(model),
      this.etabs.analyze(model),
    ]);
    return {
      model,
      openSees,
      etabs,
      comparison: this.comparator.compare(openSees, etabs, comparisonOptions),
      warnings: loaded.warnings,
      coverage: loaded.coverage,
    };
  }
}
