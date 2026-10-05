# openseesjs

API de OpenSees 3.8 para Node.js y TypeScript mediante un addon nativo. Los
modelos se ejecutan dentro del proceso y los resultados regresan directamente
a JavaScript, sin generar ni ejecutar archivos Tcl intermedios.

## Instalacion

```bash
npm install openseesjs
```

Requiere Node.js 22 o posterior. El runtime opcional actual incluye un binario
precompilado para Windows x64.

## Uso minimo

La sesión se crea al usar el primer comando y se libera automáticamente al
terminar el proceso:

```ts
import { ops } from 'openseesjs';

ops.wipe();
ops.model('basic', '-ndm', 2, '-ndf', 2);
ops.node(1, 0, 0);
ops.node(2, 1, 0);
ops.fix(1, 1, 1);
ops.fix(2, 0, 1);
ops.uniaxialMaterial('Elastic', 1, 1000);
ops.element('truss', 1, 1, 2, 1, 1);
ops.timeSeries('Linear', 1);
ops.pattern('Plain', 1, 1);
ops.load(2, 10, 0);
ops.system('BandGeneral');
ops.numberer('RCM');
ops.constraints('Plain');
ops.integrator('LoadControl', 1);
ops.algorithm('Linear');
ops.analysis('Static');

if (ops.analyze(1) !== 0) throw new Error('Analysis failed.');
ops.reactions();
console.log(ops.nodeDisp(2));
console.log(ops.nodeReaction(1));
```

Los comandos conservan la forma de Tcl mediante banderas explícitas. Cuando
una lista aparece antes de otra bandera se entrega como arreglo y el puente la
expande antes de invocar OpenSees:

```ts
ops.geomTransf('Linear', 1, '-jntOffset', [0, 0, 0, 0]);
ops.node(2, 1, 2, '-mass', [10, 10, 0], '-disp', [0, 0, 0]);
ops.timeSeries('Linear', 1, '-factor', 2);
ops.pattern('Plain', 1, 1, '-fact', 1);
ops.eleLoad('-ele', [1, 2], '-type', '-beamUniform', [-10, 0, 0]);
ops.recorder(
  'Node', '-file', 'disp.out',
  '-node', [2, 3], '-dof', [1, 2], 'disp',
);
```

La API publica no usa parametros `...rest`. Los comandos con una cantidad
finita de argumentos tienen overloads completos; las colecciones de longitud
realmente variable se reciben como arreglos con nombre y tipos de elementos
concretos.

Los elementos también están disponibles como métodos descubribles. Esta forma
muestra en IntelliSense únicamente las firmas del elemento seleccionado:

```ts
ops.element.elasticBeamColumn(1, 1, 2, A, E, Iz, transfTag);
ops.element.Truss(2, 2, 3, A, matTag);
```

La forma compatible con Tcl continúa disponible sin cambios:

```ts
ops.element('elasticBeamColumn', 1, 1, 2, A, E, Iz, transfTag);
```

## Organizacion recomendada

Mantenga un único `ops`, porque OpenSees utiliza un dominio global, y separe el
modelo en módulos ES: `geometry`, `materials`, `loads`, `analysis` y `results`.
Los módulos son preferibles a `namespace`: conservan imports explícitos,
aislamiento de responsabilidades y mejor compatibilidad con herramientas ESM.

## Sesion explicita

```ts
import { OpenSeesNativeSession, inspectNativeBackend } from 'openseesjs';

const availability = inspectNativeBackend();
if (!availability.available) throw new Error(availability.reason);

const model = new OpenSeesNativeSession();

try {
  const ops = model.ops;

  ops.wipe();
  ops.model('basic', '-ndm', 2, '-ndf', 2);
  ops.node(1, 0, 0);
  ops.node(2, 1, 0);
  ops.fix(1, 1, 1);
  ops.fix(2, 0, 1);
  ops.uniaxialMaterial('Elastic', 1, 1000);
  ops.element('truss', 1, 1, 2, 1, 1);
  ops.timeSeries('Linear', 1);
  ops.pattern('Plain', 1, 1);
  ops.load(2, 10, 0);
  ops.system('BandGeneral');
  ops.numberer('RCM');
  ops.constraints('Plain');
  ops.integrator('LoadControl', 1);
  ops.algorithm('Linear');
  ops.analysis('Static');

  if (model.query.analyze(1) !== 0) throw new Error('Analysis failed.');
  ops.reactions();

  console.log(model.query.nodeDisp(2));
  console.log(model.query.nodeReaction(1));
} finally {
  model.close();
}
```

Las consultas por lote reducen los cruces entre JavaScript y C++:

```ts
const displacements = model.query.nodeDisplacements(nodeTags);
const reactions = model.query.nodeReactions(supportTags);
const forces = model.query.elementForces(elementTags);
```

Para crear modelos grandes con una sola llamada nativa:

```ts
ops.nodes([[1, 0, 0], [2, 1, 0], [3, 2, 0]]);
ops.loads([[2, 10, 0], [3, 20, 0]]);
```

Para volúmenes grandes, las variantes packed evitan arreglos intermedios. Los
valores se organizan por filas y se transfieren como memoria contigua:

```ts
const tags = new Int32Array([1, 2, 3]);

ops.nodesPacked(tags, new Float64Array([
  0, 0,
  1, 0,
  2, 0,
]), 2);

ops.massesPacked(tags, new Float64Array([
  10, 10,
  10, 10,
  10, 10,
]), 2);

const displacements = ops.nodeDisplacementsPacked(tags, 2);
const reactions = ops.nodeReactionsPacked(tags, 2);
```

Los resultados packed son `Float64Array` en orden fila. Para tres nodos con
dos grados de libertad, el vector contiene
`[n1d1, n1d2, n2d1, n2d2, n3d1, n3d2]`.

La referencia generada de todos los comandos, firmas y opciones está en
[API_REFERENCE.md](API_REFERENCE.md). La cobertura está en
[API_COVERAGE.md](API_COVERAGE.md).

## Alcance

- API tipada basada en los comandos de OpenSeesPy 3.8.0.0.
- Resultados nodales, fuerzas de elementos, valores propios y propiedades
  modales disponibles directamente en TypeScript.
- Una sesion nativa activa por proceso, debido al estado global de OpenSees.
- Para paralelismo deben utilizarse procesos Node.js independientes.
- Los binarios se distribuyen en paquetes opcionales con scope por plataforma; npm solo
  instala el correspondiente al sistema actual.
- Las familias `Dodd-Restrepo`, `StressDensity` y `PML` no estan incluidas en
  el binario portatil actual.

Este proyecto es independiente y no esta afiliado con los desarrolladores de
OpenSees. Consulte [LICENSE](LICENSE) y
[THIRD_PARTY_NOTICES.md](THIRD_PARTY_NOTICES.md) antes de redistribuirlo.
