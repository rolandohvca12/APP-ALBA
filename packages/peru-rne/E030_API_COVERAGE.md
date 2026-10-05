# Cobertura RNE E.030:2026

Fuente oficial: RM 183-2026-VIVIENDA. La RM 217-2026-VIVIENDA modifica únicamente la disposición transitoria para proyectos en curso.

| Artículos | Materia | Cobertura | API |
|---:|---|---|---|
| 1-9 | Disposiciones, criterios y expediente | Manual | `generalChecks.manualReview` |
| 10-11 | Zona y factor Z | Automático | `zoning`, `hazard.zoneFactor` |
| 12-13 | Microzonificación y estudio de sitio | Manual | `generalChecks.manualReview` |
| 14-16 | Perfil de suelo y promedios ponderados | Automático/Parcial | `hazard.classifySoil`, `harmonicAverage` |
| 17-18 | S, TP, TL y factor C | Automático | `hazard.siteParameters`, `amplificationFactor` |
| 19-22 | Categoría, sistema, U y R0 | Automático | `buildings` |
| 23-26 | Regularidad, restricciones y R | Automático/Parcial | `buildings` |
| 27 | Aislamiento y disipación | Dependencia | E.031 / revisión profesional |
| 28-30 | Hipótesis y modelo | Parcial/Manual | `generalChecks` |
| 31 | Peso sísmico | Automático | `seismicWeight` |
| 32-38 | Análisis estático | Automático | `staticAnalysis` |
| 39-45 | Análisis modal espectral | Automático | `modalSpectral` |
| 46-49 | Tiempo-historia | Parcial | `timeHistory` |
| 50-54 | Desplazamientos, juntas y redundancia | Automático | `driftAndSeparation` |
| 55-61 | Elementos no estructurales | Automático/Manual | `nonStructural` |
| 62-65 | Cimentaciones | Automático/Parcial | `foundations` |
| 66-68 | Evaluación y reforzamiento | Manual | `generalChecks.manualReview` |
| 69-74 | Instrumentación | Automático/Manual | `instrumentation` |
| Anexo I | Flujo de determinación de acciones | Cubierto por composición | Fachada `E030_2026` |
| Anexo II | Zonificación por distrito | Automático, 1892 entradas | `zoning` |
| Anexo III | Estudio de microzonificación | Manual | Expediente geotécnico |
| Anexo IV | Disposición de acelerómetros | Manual | Planos y protocolo IGP |

## Pendientes explícitos

| Aspecto | Motivo | Estado |
|---|---|---|
| Respuesta específica de sitio S4-Z4 y S5 | Requiere estudio geotécnico especializado | No se infiere |
| Aislamiento sísmico | Regulado por E.031 | Dependencia externa |
| Diseño material de elementos | Corresponde a E.060, E.070, E.090, etc. | Dependencia externa |
| Validación de modelo no lineal | Requiere ensayos, criterio y revisión profesional | Manual |
| Microzonificación | Requiere trabajo de campo conforme al Anexo III | Manual |
