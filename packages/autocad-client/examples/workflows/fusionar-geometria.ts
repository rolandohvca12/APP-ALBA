import { AutoCadRealtimeClient } from '../../src/cad/AutoCadRealtimeClient.js';
import { AutoCadQueryClient } from '../../src/cad/AutoCadQueryClient.js';
import { AutoCadDrawingClient } from '../../src/cad/AutoCadDrawingClient.js';
import { ByLayer, byLayers, ByTag, byTags } from '../../src/cad/GeometrySelector.js';
import { type WallFusionSources } from '../../src/analysis/WallFusionLayers.js';
import { WallFusionService } from '../../src/analysis/WallFusionService.js';
import { WallFusionDrawer } from '../../src/analysis/WallFusionDrawer.js';
import { Polygon } from '@rolandohvca12/structural-lib';
import { sortRows } from '../../src/utils/sortRows.js';
import { defineLazyProperty } from '../../src/utils/lazyProperty.js';
function lengthLimiter(thickness: number, availableLength: number): number {
    return Math.min(availableLength / 2, Math.max(6 * thickness, availableLength / 4));
}

interface Row {
    tag: string;
    handle: string;
    A: number;
    Cx: number;
    Cy: number;
    Ix: number;
    Iy: number;
    J: number;
    rx: number;
    ry: number;
    xMin?: number;
    xMax?: number;
    yMin?: number;
    yMax?: number;
    p: number;
}

const sources: WallFusionSources = {
    mainWalls: new ByLayer("MUROS_X"),
    transverseWalls: new ByLayer('MUROS_Y'),
    endElements: new ByLayer('COLS'),
    output: 'OUTPUT',
};



const fc = 175;
const transformationFactor = (150e3 * Math.sqrt(fc)) / (500 * 650);

async function main(): Promise<void> {
    const transport = new AutoCadRealtimeClient();
    await transport.connect();

    try {
        const queryClient = new AutoCadQueryClient(transport);
        const drawingClient = new AutoCadDrawingClient(transport);

        const [mainWalls, transverseWalls, endElements] = await Promise.all([
            sources.mainWalls.resolve(queryClient),
            sources.transverseWalls.resolve(queryClient),
            sources.endElements.resolve(queryClient),
        ]);

        const mainWallTags = await queryClient.getTagsByHandles(mainWalls.map((w) => w.handle));

        const eligibleHandles = new Set(endElements.map((e) => e.handle));

        const results = WallFusionService.fuseAllWithEndSections(
            mainWalls,
            transverseWalls,
            endElements,
            eligibleHandles,
            lengthLimiter,
            transformationFactor
        );
        const rows: Row[] = results.map((r) => {
            const poly = new Polygon(r.polygons[0].map((p) => ({ x: p.x, y: p.y })));
            const row = {
                tag: mainWallTags[r.reference.handle] ?? 'unknown',
                handle: r.reference.handle,
                A: poly.A(),
                Cx: poly.Cx() - poly.xMin(),
                Cy: poly.Cy(),
                Ix: poly.Ix(),
                Iy: poly.Iy(),
                J: poly.J(),
                p: poly.p(),
            } as Row;

            // defineLazyProperty(row, "kx", () => poly.rx());
            // defineLazyProperty(row, 'ky', () => poly.ry());

            return row;
        });

        // 2. Elegir el criterio de orden. Cambia key/direction según lo
        //    que necesites en cada corrida:
        //    - por tag alfabético:  sortRows(rows, 'tag')
        //    - por Ix descendente:  sortRows(rows, 'Ix', 'desc')
        //    - por Iy ascendente:   sortRows(rows, 'Iy', 'asc')
        const sortedRows = sortRows(rows, 'tag', 'asc');
        console.log(`\n===== SECCIONES`);
        for (const row of sortedRows) {
            console.log(
                `tag=${row.tag}  ` +
                `ref=${row.handle}  A=${row.A.toFixed(3)}  ` +
                `C=(${row.Cx.toFixed(3)},${row.Cy.toFixed(3)})  ` +
                `Ix=${row.Ix.toFixed(5)}  Iy=${row.Iy.toFixed(5)} `
                // // `rx=${row.rx.toFixed(4)}  ry=${row.ry.toFixed(4)}  `
            );
        }

        await WallFusionDrawer.draw(drawingClient, results, { offsetY: -20, layer: sources.output });

    } finally {
        transport.close();
    }
}

main()
    .then(() => process.exit(0))
    .catch((err) => {
        console.error('Error en el flujo de fusión de muros:', err);
        process.exit(1);
    });
