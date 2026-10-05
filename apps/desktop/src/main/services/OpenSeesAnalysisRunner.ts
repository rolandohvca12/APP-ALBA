import { spawn } from 'node:child_process';
import { join, resolve } from 'node:path';
import { app } from 'electron';
import type {
  SpatialStaticAnalysisResult,
  SpatialStructuralModel,
} from '@app-alba/structural-analysis';

const RESULT_MARKER = '__APP_ALBA_OPENSEES_RESULT__';

interface WorkerResponse {
  ok: boolean;
  result?: SpatialStaticAnalysisResult;
  message?: string;
}

export class OpenSeesAnalysisRunner {
  public analyze(model: SpatialStructuralModel): Promise<SpatialStaticAnalysisResult> {
    return new Promise((resolveResult, rejectResult) => {
      const workerPath = join(__dirname, 'opensees-analysis-worker.js');
      const bindingPath = app.isPackaged
        ? resolve(process.resourcesPath, 'backends', 'opensees', 'opensees.node')
        : undefined;
      const nodeExecutable = process.env.APP_ALBA_NODE_EXECUTABLE?.trim() || 'node';
      const child = spawn(nodeExecutable, [workerPath], {
        cwd: app.getAppPath(),
        env: process.env,
        stdio: ['pipe', 'pipe', 'pipe'],
        windowsHide: true,
      });
      let stdout = '';
      let stderr = '';
      let settled = false;
      const timeout = setTimeout(() => {
        if (settled) return;
        settled = true;
        child.kill();
        rejectResult(new Error('OpenSees excedió el tiempo máximo de análisis de 120 s.'));
      }, 120_000);

      child.stdout.on('data', (chunk) => { stdout += String(chunk); });
      child.stderr.on('data', (chunk) => { stderr += String(chunk); });
      child.stdin.on('error', (error) => finish(() => rejectResult(new Error(
        `No se pudo enviar el modelo a OpenSees: ${error.message}`,
      ))));
      child.once('error', (error) => finish(() => rejectResult(new Error(
        `No se pudo iniciar el proceso Node de OpenSees (${nodeExecutable}): ${error.message}`,
      ))));
      child.once('exit', (code) => finish(() => {
        try {
          const markerIndex = stdout.lastIndexOf(RESULT_MARKER);
          if (markerIndex < 0) {
            rejectResult(new Error(`El proceso aislado de OpenSees terminó con código ${code ?? 'desconocido'}.${stderr.trim() ? ` ${stderr.trim()}` : ''}`));
            return;
          }
          const line = stdout.slice(markerIndex + RESULT_MARKER.length).trim().split(/\r?\n/, 1)[0]!;
          const response = JSON.parse(line) as WorkerResponse;
          if (!response.ok || !response.result) {
            rejectResult(new Error(response.message ?? 'OpenSees no devolvió resultados.'));
            return;
          }
          resolveResult(response.result);
        } catch (error) {
          rejectResult(new Error(`Respuesta inválida del proceso OpenSees: ${error instanceof Error ? error.message : String(error)}`));
        }
      }));

      child.stdin.end(JSON.stringify({ model, ...(bindingPath ? { bindingPath } : {}) }));

      function finish(action: () => void): void {
        if (settled) return;
        settled = true;
        clearTimeout(timeout);
        action();
      }
    });
  }
}
