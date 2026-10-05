import type { Dimension } from '@app-alba/engineering-units';
import { useEngineeringUnits } from '../features/units/EngineeringUnitsContext';
import { NumericField } from './NumericField';

export function QuantityField<D extends Dimension>({ label, value, dimension, min, step, onChange }: { label: string; value: number; dimension: D; min?: number; step?: number; onChange(value: number): void }): React.JSX.Element {
  const display = useEngineeringUnits();
  const displayValue = display.toDisplay(value, dimension);
  const displayStep = step === undefined
    ? Math.max(Math.abs(displayValue) / 100, 1e-8)
    : Math.abs(display.toDisplay(step, dimension) - display.toDisplay(0, dimension));
  return <NumericField label={`${label} (${display.unit(dimension)})`} value={round(displayValue)} {...(min === undefined ? {} : { min: display.toDisplay(min, dimension) })} step={displayStep} onChange={(next) => onChange(display.fromDisplay(next, dimension))} />;
}

function round(value: number): number { return Number(value.toPrecision(8)); }
