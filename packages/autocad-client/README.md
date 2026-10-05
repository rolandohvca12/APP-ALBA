# @app-alba/autocad-client

Cliente TypeScript del bridge de AutoCAD y operaciones geométricas construidas
sobre entidades obtenidas desde AutoCAD.

```ts
import { AutoCadRealtimeClient, AutoCadQueryClient } from '@app-alba/autocad-client';

const transport = new AutoCadRealtimeClient();
await transport.connect();

try {
  const cad = new AutoCadQueryClient(transport);
  const walls = await cad.getGeometryByLayer('MUROS');
  console.log(walls);
} finally {
  transport.close();
}
```

Los flujos ejecutables están en `examples/workflows/`.

## Areas tributarias

`examples/workflows/areas-tributarias.ts` obtiene muros y dinteles mediante los
selectores existentes por layer/tag, detecta implícitamente los paños cerrados,
calcula las regiones y las dibuja con `AutoCadDrawingClient`. Cambia únicamente
los nombres de layers del ejemplo para que coincidan con el plano.

## Centro de masa en planta

`examples/workflows/centro-masa-planta.ts` calcula el centro de masa usando
muros, dinteles, losas, tarrajeo en ambas caras y vigas soleras. Para una losa
unidireccional se configura `selfWeightPerArea`; para una bidireccional se usa
el espesor y el peso especifico del concreto.

El metrado se selecciona inyectando `SeismicFloorWeightStrategy` o
`AxialFloorWeightStrategy`. La estrategia sismica usa la semisuma de las
alturas de los niveles adyacentes (`altura de muro + espesor de losa`) y aplica
`alpha` a la sobrecarga. La estrategia axial usa la altura total indicada y el
100% de la sobrecarga. En ambos casos la sobrecarga se distribuye mediante las
areas tributarias de los muros.

Para edificios de varios pisos, `BuildingCenterOfMassService` recibe niveles
ordenados de abajo hacia arriba. Cada nivel puede tener un `wallHeight`
distinto y todos comparten `slabThickness`. El resultado contiene el centro de
masa por planta y el centro de masa combinado del edificio.

```powershell
npm run example:center-of-mass
```
