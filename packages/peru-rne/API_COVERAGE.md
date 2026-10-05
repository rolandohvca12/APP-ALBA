# Cobertura RNE E.070:2006

Estados: `Automático`, `Parcial` (parte calculable implementada), `Manual` (inspección o documentación profesional).

| Capítulo | Artículos | Cobertura | API principal |
|---|---:|---|---|
| 1. Aspectos generales | 1-3 | Manual | Metadatos y reporte versionado |
| 2. Definiciones y nomenclatura | 4 | Parcial | Tipos públicos y unidades SI |
| 3. Componentes | 5-9 | Automático | `materials` |
| 4. Procedimiento de construcción | 10-12 | Parcial/Manual | `construction` |
| 5. Resistencia de prismas | 13 | Automático | `qualityControl` |
| 6. Estructuración | 14-18 | Parcial/Manual | `structuring` |
| 7. Requisitos estructurales mínimos | 19-21 | Automático/Parcial | `minimumRequirements` |
| 8. Análisis y diseño | 22-26 | Automático | `analysis` |
| 8. Albañilería confinada | 27 | Parcial | `confinedMasonry` |
| 8. Albañilería armada | 28 | Parcial | `reinforcedMasonry` |
| 9. Cargas perpendiculares | 29-31 | Automático/Parcial | `outOfPlane` |
| 10. Interacción tabique-pórtico | 32-33 | Automático | `infillFrame` |

## Pendientes explícitos

| Método o aspecto | Motivo | Alternativa | Estado |
|---|---|---|---|
| Aprobación de sistemas no convencionales | Requiere evaluación administrativa y expediente técnico | Adjuntar resolución competente | Manual |
| Calidad visual y ejecución en obra | No puede deducirse de la geometría digital | Formulario de inspección firmado | Manual |
| Diseño completo de cimentación | Corresponde además a E.050 y E.060 | Integración normativa posterior | No implementado |
| Parámetros sísmicos vigentes | Corresponden a E.030 y su edición aplicable | Próximo módulo versionado E.030 | Dependencia explícita |
| Detallado completo de nudos y anclajes | Depende de geometría, planos y E.060 | Motor de detallado posterior | Parcial |
| Combinaciones completas de carga | Dependen de E.020/E.030 | Proveer solicitaciones calculadas externamente | Dependencia explícita |
