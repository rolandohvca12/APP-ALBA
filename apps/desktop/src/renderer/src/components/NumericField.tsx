export function NumericField({ label, value, min, max, step = 0.01, onChange }: {
  label: string; value: number; min?: number; max?: number; step?: number; onChange(value: number): void;
}): React.JSX.Element {
  return <label className="field"><span>{label}</span><input type="number" value={value} min={min} max={max} step={step} onChange={(event) => onChange(Number(event.target.value))} /></label>;
}
