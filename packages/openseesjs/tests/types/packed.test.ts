import { OpenSeesNativeSession, ops, type OpenSeesPackedWidth } from '../../dist/native-index.js';

declare const session: OpenSeesNativeSession;
const dimensions: OpenSeesPackedWidth = 3;

session.ops.nodesPacked(new Int32Array([1, 2]), new Float64Array([0, 0, 0, 1, 0, 0]), dimensions);
session.ops.massesPacked(new Int32Array([1]), new Float64Array([1, 1, 1]), 3);
session.ops.fixesPacked(new Int32Array([1]), new Int32Array([1, 1, 1]), 3);
session.ops.loadsPacked(new Int32Array([2]), new Float64Array([10, 0, 0]), 3);
session.query.nodeDisplacementsPacked(new Int32Array([1, 2]), 3);
session.query.nodeReactionsPacked(new Int32Array([1, 2]), 3);
session.query.elementForcesPacked(new Int32Array([1]), 6);
session.query.elementResponsesPacked(new Int32Array([1]), 6, ['localForce']);

ops.nodesPacked(new Int32Array([1]), new Float64Array([0, 0]), 2);
ops.nodeReactionsPacked(new Int32Array([1]), 2);

// @ts-expect-error packed tags are intentionally fixed-width integers.
session.ops.nodesPacked([1, 2], new Float64Array([0, 0, 1, 0]), 2);
// @ts-expect-error coordinates use Float64Array to preserve numeric precision.
session.ops.nodesPacked(new Int32Array([1]), new Int32Array([0, 0]), 2);
// @ts-expect-error OpenSees nodal packed widths are limited to six components.
session.ops.loadsPacked(new Int32Array([1]), new Float64Array(7), 7);
