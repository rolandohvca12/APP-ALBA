import { OpenSees3DStaticStrategy } from '@app-alba/structural-analysis';
import type { SpatialStructuralModel } from '@app-alba/structural-analysis';

const RESULT_MARKER = '__APP_ALBA_OPENSEES_RESULT__';

interface WorkerRequest {
  model: SpatialStructuralModel;
  bindingPath?: string;
}

void readInput().then(async (request) => {
  try {
    const result = await new OpenSees3DStaticStrategy(
      request.bindingPath ? { bindingPath: request.bindingPath } : {},
    ).analyze(request.model);
    process.stdout.write(`${RESULT_MARKER}${JSON.stringify({ ok: true, result })}\n`);
  } catch (error) {
    process.stdout.write(`${RESULT_MARKER}${JSON.stringify({
      ok: false,
      message: error instanceof Error ? error.message : String(error),
    })}\n`);
    process.exitCode = 1;
  }
}).catch((error) => {
  process.stdout.write(`${RESULT_MARKER}${JSON.stringify({
    ok: false,
    message: error instanceof Error ? error.message : String(error),
  })}\n`);
  process.exitCode = 1;
});

async function readInput(): Promise<WorkerRequest> {
  const chunks: Buffer[] = [];
  for await (const chunk of process.stdin) chunks.push(Buffer.from(chunk));
  return JSON.parse(Buffer.concat(chunks).toString('utf8')) as WorkerRequest;
}
