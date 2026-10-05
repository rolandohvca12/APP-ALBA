import type {
  GeomTransfArguments,
  TimeSeriesArguments,
} from '../../dist/native-index.js';

type AssertTrue<T extends true> = T;
type IsAssignable<From, To> = From extends To ? true : false;

type AcceptGeomTransf2D = AssertTrue<
  IsAssignable<[transfTag: number], GeomTransfArguments['Linear']>
>;
type AcceptGeomTransf2DOffset = AssertTrue<
  IsAssignable<
    [transfTag: number, flag: '-jntOffset', values: readonly [number, number, number, number]],
    GeomTransfArguments['Linear']
  >
>;
type AcceptLinearTimeSeries = AssertTrue<
  IsAssignable<[tag: number], TimeSeriesArguments['Linear']>
>;

// @ts-expect-error a bare -jntOffset must never satisfy the generated tuple.
type RejectBareJointOffset = AssertTrue<IsAssignable<[transfTag: number, flag: '-jntOffset'], GeomTransfArguments['Linear']>>;
// @ts-expect-error a bare -factor must never satisfy the generated tuple.
type RejectBareFactor = AssertTrue<IsAssignable<[tag: number, flag: '-factor'], TimeSeriesArguments['Linear']>>;
