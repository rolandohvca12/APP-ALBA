import type { AutoCadQueryClient } from '../../cad/AutoCadQueryClient.js';
import { TributaryAreaService } from '../tributary/TributaryAreaService.js';
import { FloorMassCalculator } from './FloorMassCalculator.js';
import { FloorMassGeometrySource } from './FloorMassGeometrySource.js';
import type { FloorCenterOfMassOptions, FloorCenterOfMassResult } from './types.js';

/** Application facade: loads AutoCAD geometry, then delegates the pure calculation. */
export class FloorCenterOfMassService {
    static async calculate(
        query: AutoCadQueryClient,
        options: FloorCenterOfMassOptions,
    ): Promise<FloorCenterOfMassResult> {
        const loaded = await FloorMassGeometrySource.load(
            query,
            options.sources,
            options.closureTolerance,
        );
        const tributary = TributaryAreaService.analyzeGeometry(loaded.sourceGeometry, {
            slabBehavior: options.slab.type === 'bidirectional'
                ? { type: 'bidirectional' }
                : {
                    type: 'unidirectional',
                    spanDirection: options.slab.spanDirection,
                    thickness: options.slab.thickness,
                },
            ...(options.closureTolerance !== undefined
                ? { closureTolerance: options.closureTolerance }
                : {}),
        });
        const geometry = {
            ...loaded.geometry,
            tributaryAreas: tributary.slabs.flatMap((slab) => slab.cells.map((cell) => ({
                wallHandle: cell.supportHandle,
                wallTag: loaded.geometry.walls.find((wall) =>
                    wall.geometry.handle === cell.supportHandle,
                )?.tag ?? null,
                polygon: cell.polygon,
                area: cell.area,
            }))),
        };
        return FloorMassCalculator.calculate(
            geometry,
            options,
            [...loaded.warnings, ...tributary.warnings],
        );
    }
}
