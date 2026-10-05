export function wallActionsCsv(result, levelIds, labels = { force: 'kN', moment: 'kN-m' }) {
  const rows = [];
  for (const analysis of [result.openSees, result.etabs].filter(Boolean)) {
    appendWallTable(rows, analysis, 'x', 'SX', levelIds, labels);
    rows.push([]);
    appendWallTable(rows, analysis, 'y', 'SY', levelIds, labels);
    rows.push([]);
  }
  return `${rows.map((row) => row.map(csvCell).join(',')).join('\n')}\n`;
}

function appendWallTable(rows, analysis, direction, caseId, levelIds, labels) {
  const actions = analysis.cases
    .find((loadCase) => loadCase.caseId === caseId)
    ?.wallActions.filter((action) => action.direction === direction) ?? [];
  const wallIds = [...new Set(actions.map((action) => action.wallId))]
    .sort((left, right) => left.localeCompare(right, undefined, { numeric: true }));
  const byWallAndLevel = new Map(actions.map((action) => [`${action.wallId}\0${action.levelId}`, action]));

  rows.push([`${analysis.engine.toUpperCase()} - MUROS ${direction.toUpperCase()} (V22: ${labels.force}, M33: ${labels.moment})`]);
  rows.push(['Muro', ...levelIds.flatMap((levelId) => [levelId, ''])]);
  rows.push(['', ...levelIds.flatMap(() => ['V22', 'M33'])]);
  for (const wallId of wallIds) {
    rows.push([
      wallId,
      ...levelIds.flatMap((levelId) => {
        const action = byWallAndLevel.get(`${wallId}\0${levelId}`);
        return action ? [formatResult(action.shear), formatResult(action.moment)] : ['', ''];
      }),
    ]);
  }
}

function formatResult(value) {
  return Number.isFinite(value) ? value.toFixed(3) : '';
}

function csvCell(value) {
  const text = String(value ?? '');
  return /[",\r\n]/.test(text) ? `"${text.replaceAll('"', '""')}"` : text;
}
