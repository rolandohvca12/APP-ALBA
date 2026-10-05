import {
    AutoCadQueryClient,
    AutoCadRealtimeClient,
    SeismicFloorWeightStrategy,
    ByLayer,
    FloorCenterOfMassService,
} from '../../dist/index.js';

const transport = new AutoCadRealtimeClient();
await transport.connect();

try {
    const result = await FloorCenterOfMassService.calculate(
        new AutoCadQueryClient(transport),
        {
            sources: {
                wallsX: new ByLayer('MUROS_X'),
                wallsY: new ByLayer('MUROS_Y'),
                lintels: new ByLayer('DINTELES'),
            },
            strategy: new SeismicFloorWeightStrategy({
                levelBelow: { wallHeight: 2.60, slabThickness: 0.20 },
                levelAbove: { wallHeight: 2.60, slabThickness: 0.20 },
                alpha: 0.25,
            }),
            liveLoadPerArea: 2.0, // kN/m2 antes de aplicar alpha
            lintelHeight: 0.20,
            plasterThickness: 0.015,
            slab: { type: 'bidirectional', thickness: 0.20 },
            specificWeights: {
                masonry: 18, // kN/m3
                concrete: 24, // kN/m3
                plaster: 20, // kN/m3
            },
            closureTolerance: 0.25,
        },
    );

    console.table({
        xCM: result.centerOfMass.x,
        yCM: result.centerOfMass.y,
        totalWeight: result.totalWeight,
    });
    console.table(result.contributions.map((item) => ({
        type: item.kind,
        tag: item.sourceTag ?? `SIN_TAG:${item.sourceHandle}`,
        weight: item.weight,
        x: item.centroid.x,
        y: item.centroid.y,
    })));
    for (const warning of result.warnings) console.warn(warning);
} finally {
    transport.close();
}
