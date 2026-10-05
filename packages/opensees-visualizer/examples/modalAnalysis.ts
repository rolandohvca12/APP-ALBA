import { ops } from "openseesjs"

const P: number[] = [350, 320, 290];
const K: number[] = [680, 650, 560];
const g = 980.665;
const m = P.map(p => p / g);

try {
    ops.wipe();
    ops.model("basic", "-ndm", 1, "-ndf", 1);
    ops.node(1, 0);
    ops.node(2, 0, "-mass", [m[0]!]);
    ops.node(3, 0, "-mass", [m[1]!]);
    ops.node(4, 0, "-mass", [m[2]!]);

    ops.fix(1, 1);

    K.forEach((k, idx) => {
        ops.uniaxialMaterial("Elastic", idx + 1, k);
    });

    K.forEach((_, idx) => {
        ops.element.zeroLength(idx + 1, idx + 1, idx + 2, "-mat", [idx + 1], "-dir", [1]);
    });

    ops.eigen("-genBandArpack", 3);

    ops.modalProperties("-file", "out.txt");

    ops.wipeAnalysis();
    ops.constraints.Plain();
    ops.numberer.RCM();
    ops.test.NormDispIncr(1e-6, 5);
    ops.system("BandGen")
    ops.algorithm.Newton();
    ops.integrator.LoadControl(1);
    ops.analysis.Static();
    ops.analyze(1.0);

} catch (error) {
    console.log((error as Error).message);
}

