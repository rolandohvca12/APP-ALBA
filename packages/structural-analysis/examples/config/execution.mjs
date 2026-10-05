export const execution = {
  modelId: 'ALBA',
  units: { force: "tf", length: 'm' }, // Input values and reported results.
  engines: { runOpenSees: true, runEtabs: false },
  outputDirectory: 'C:\\Temp',
  openSeesBinary: process.env.OPENSEES_BIN ?? 'C:\\Program Files\\OpenSees 3.7.1\\bin\\OpenSees.exe',
};
