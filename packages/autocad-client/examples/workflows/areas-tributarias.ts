import {
    AutoCadDrawingClient,
    AutoCadQueryClient,
    AutoCadRealtimeClient,
    ByLayer,
    TributaryAreaWorkflow,
} from '../../dist/index.js';

const transport = new AutoCadRealtimeClient();
await transport.connect();

try {
    const query = new AutoCadQueryClient(transport);
    const drawing = new AutoCadDrawingClient(transport);

    const result = await TributaryAreaWorkflow.run(
        query,
        drawing,
        {
            sources: {
                wallsX: new ByLayer('MUROS_X'),
                wallsY: new ByLayer('MUROS_Y'),
                lintels: new ByLayer('DINTELES'),
            },
            slabBehavior: { type: "bidirectional" },
            contactTolerance: 0.02,
            closureTolerance: 0.25,
        },
        {
            layer: 'AREAS_TRIBUTARIAS_REVISION',
            layerColorIndex: 1,
            drawAreaLabels: false,
            labelHeight: 0.15,
            offsetY: -10
        },

    );

    const areaByWallTag = new Map<string, number>();
    for (const slab of result.slabs) {
        for (const cell of slab.cells) {
            const wallTag = cell.supportTag ?? `SIN_TAG:${cell.supportHandle}`;
            areaByWallTag.set(
                wallTag,
                (areaByWallTag.get(wallTag) ?? 0) + cell.area,
            );
        }
    }

    console.table(
        [...areaByWallTag].map(([wallTag, area]) => ({ wallTag, area })),
    );
    for (const warning of result.warnings) console.warn(warning);

} finally {
    transport.close();
}
