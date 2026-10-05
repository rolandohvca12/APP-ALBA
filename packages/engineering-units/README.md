# @app-alba/engineering-units

Conversión dimensional compartida para AutoCAD, ETABS, OpenSees y módulos normativos.

```ts
import { units, UnitSystems } from '@app-alba/engineering-units';

units.convert(13, 'cm', 'm');            // 0.13
units.convert(25, 'MPa', 'kgf/cm2');     // 254.929...

const system = UnitSystems.tf_m;
system.read(2.4, 'length');               // 2.4 m en SI interno
system.read(units.quantity(240, 'cm'), 'length');
```

Las fórmulas usan SI internamente. Las unidades de entrada y presentación son decisiones de frontera y no alteran la física del cálculo.
