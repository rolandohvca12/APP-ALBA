import assert from 'node:assert/strict';
import test from 'node:test';
import * as api from '../../dist/native-index.js';

test('public entry point exposes only the native OpenSees API', () => {
  assert.equal(typeof api.OpenSeesNativeSession, 'function');
  assert.equal(typeof api.inspectNativeBackend, 'function');
  assert.equal('OpenSeesScriptBuilder' in api, false);
  assert.equal('OpenSeesExecutor' in api, false);
  assert.equal('OpenSeesViewer' in api, false);
  assert.equal('NativeResponseSpectrumAnalyzer' in api, false);
  assert.equal('combineModalVectors' in api, false);
});
