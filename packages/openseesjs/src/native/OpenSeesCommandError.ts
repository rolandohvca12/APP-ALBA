import type { OpenSeesNativeScalar } from './types.js';

export class OpenSeesCommandError extends Error {
  public override readonly name = 'OpenSeesCommandError';

  public constructor(
    public readonly command: string,
    public readonly arguments_: readonly OpenSeesNativeScalar[],
    message: string,
    options?: { readonly cause?: unknown; readonly rowIndex?: number },
  ) {
    super(message, { cause: options?.cause });
    this.rowIndex = options?.rowIndex;
  }

  public readonly rowIndex: number | undefined;
}

export function invokeNative(
  invoke: () => unknown,
  command: string,
  args: readonly OpenSeesNativeScalar[],
  rowIndex?: number,
): unknown {
  try {
    return invoke();
  } catch (cause) {
    const detail = cause instanceof Error ? cause.message : String(cause);
    const row = rowIndex === undefined ? '' : ` at batch row ${rowIndex}`;
    throw new OpenSeesCommandError(
      command,
      args,
      `OpenSees command "${command}" failed${row}: ${detail}`,
      { cause, ...(rowIndex === undefined ? {} : { rowIndex }) },
    );
  }
}
