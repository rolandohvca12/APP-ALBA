import type { AutoCadDrawingClient } from '../../cad/AutoCadDrawingClient.js';
import type { AutoCadQueryClient } from '../../cad/AutoCadQueryClient.js';
import { TributaryAreaDrawer, type DrawTributaryOptions } from './TributaryAreaDrawer.js';
import { TributaryAreaService } from './TributaryAreaService.js';
import type { TributaryAnalysisOptions, TributaryAnalysisResult } from './types.js';

/** Convenience facade; calculation and drawing remain independently usable. */
export class TributaryAreaWorkflow {
    static async run(
        query: AutoCadQueryClient,
        drawing: AutoCadDrawingClient,
        analysis: TributaryAnalysisOptions,
        draw: DrawTributaryOptions,
    ): Promise<TributaryAnalysisResult> {
        const result = await TributaryAreaService.analyze(query, analysis);
        await TributaryAreaDrawer.draw(drawing, result, draw);
        return result;
    }
}
