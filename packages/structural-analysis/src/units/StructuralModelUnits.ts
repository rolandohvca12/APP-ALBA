import { units, type UnitFor } from '@app-alba/engineering-units';

export interface StructuralUnitSelection {
  force: UnitFor<'force'>;
  length: UnitFor<'length'>;
}

/** Converts configured F-L quantities to and from the internal kN-m model. */
export class StructuralModelUnits {
  public readonly forceUnit: UnitFor<'force'>;
  public readonly lengthUnit: UnitFor<'length'>;
  private readonly forceToKN: number;
  private readonly lengthToM: number;

  public constructor(selection: StructuralUnitSelection) {
    this.forceUnit = selection.force;
    this.lengthUnit = selection.length;
    this.forceToKN = units.convert(1, selection.force, 'kN');
    this.lengthToM = units.convert(1, selection.length, 'm');
  }

  public force(value: number): number { return value * this.forceToKN; }
  public length(value: number): number { return value * this.lengthToM; }
  public forcePerArea(value: number): number { return value * this.forceToKN / this.lengthToM ** 2; }
  public forcePerVolume(value: number): number { return value * this.forceToKN / this.lengthToM ** 3; }

  public fromForce(valueKN: number): number { return valueKN / this.forceToKN; }
  public fromLength(valueM: number): number { return valueM / this.lengthToM; }
  public fromMoment(valueKNm: number): number { return valueKNm / (this.forceToKN * this.lengthToM); }

  public get labels(): { force: string; length: string; moment: string; stress: string; specificWeight: string } {
    return {
      force: this.forceUnit,
      length: this.lengthUnit,
      moment: `${this.forceUnit}-${this.lengthUnit}`,
      stress: `${this.forceUnit}/${this.lengthUnit}2`,
      specificWeight: `${this.forceUnit}/${this.lengthUnit}3`,
    };
  }
}
