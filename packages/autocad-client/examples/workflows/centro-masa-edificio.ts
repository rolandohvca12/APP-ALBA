import {
    AutoCadQueryClient,
    AutoCadRealtimeClient,
    BuildingCenterOfMassService,
    ByLayer,
    type BuildingMassLevel,
} from '../../dist/index.js';

const transport = new AutoCadRealtimeClient();
await transport.connect();

const level = (id: string, wallHeight: number): BuildingMassLevel => ({
    id,
    wallHeight,
    sources: {
        // La misma planta se reutiliza en todos los niveles. Si cada nivel
        // tiene otra geometría, reemplaza estos nombres por layers por nivel.
        wallsX: new ByLayer('MUROS_X'),
        wallsY: new ByLayer('MUROS_Y'),
        lintels: new ByLayer('DINTELES'),
    },
    liveLoadPerArea: 2.0,
    lintelHeight: 0.20,
    plasterThickness: 0.015,
    slab: { type: 'bidirectional' },
    closureTolerance: 0.25,
});

try {
    const result = await BuildingCenterOfMassService.calculate(
        new AutoCadQueryClient(transport),
        {
            levels: [
                level('N1', 2.60),
                level('N2', 3.00),
                level('N3', 2.40),
            ],
            slabThickness: 0.20,
            metering: { type: 'axial' },
            // Para carga axial: metering: { type: 'axial' }
            specificWeights: {
                masonry: 18,
                concrete: 24,
                plaster: 20,
            },
        },
    );

    console.table(result.levels.map((item) => ({
        level: item.id,
        effectiveHeight: item.effectiveVerticalHeight,
        xCM: item.result.centerOfMass.x,
        yCM: item.result.centerOfMass.y,
        weight: item.result.totalWeight,
    })));
    console.table({
        buildingXCM: result.centerOfMass.x,
        buildingYCM: result.centerOfMass.y,
        totalWeight: result.totalWeight,
    });
} finally {
    transport.close();
}
