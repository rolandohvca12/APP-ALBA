import type { ModalCombinationOptions } from './types.js';

export function combineModalVectors(
  modalVectors: readonly (readonly number[])[],
  angularFrequencies: readonly number[],
  options: ModalCombinationOptions,
): number[] {
  if (modalVectors.length === 0) return [];
  if (modalVectors.length !== angularFrequencies.length) {
    throw new Error('Each modal vector requires one angular frequency.');
  }
  const size = modalVectors[0]!.length;
  if (modalVectors.some(vector => vector.length !== size)) {
    throw new Error('Modal response vectors must have equal dimensions.');
  }
  return Array.from({ length: size }, (_, component) => {
    if (options.method === 'SRSS') {
      return Math.sqrt(modalVectors.reduce((sum, vector) => sum + vector[component]! ** 2, 0));
    }
    return combineCqcComponent(
      modalVectors.map(vector => vector[component]!),
      angularFrequencies,
      options.dampingRatio,
    );
  });
}

function combineCqcComponent(
  responses: readonly number[],
  angularFrequencies: readonly number[],
  dampingRatio: number,
): number {
  if (!(dampingRatio > 0 && dampingRatio < 1)) {
    throw new Error('CQC dampingRatio must be between 0 and 1.');
  }
  let quadraticSum = 0;
  for (let i = 0; i < responses.length; i++) {
    for (let j = 0; j < responses.length; j++) {
      quadraticSum += cqcCorrelation(
        angularFrequencies[i]!,
        angularFrequencies[j]!,
        dampingRatio,
      ) * responses[i]! * responses[j]!;
    }
  }
  return Math.sqrt(Math.max(0, quadraticSum));
}

function cqcCorrelation(omegaI: number, omegaJ: number, dampingRatio: number): number {
  if (!(omegaI > 0) || !(omegaJ > 0)) {
    throw new Error('CQC angular frequencies must be greater than zero.');
  }
  const ratio = omegaJ / omegaI;
  const dampingSquared = dampingRatio ** 2;
  const numerator = 8 * dampingSquared * (1 + ratio) * ratio ** 1.5;
  const denominator = (1 - ratio ** 2) ** 2
    + 4 * dampingSquared * ratio * (1 + ratio) ** 2;
  return numerator / denominator;
}
