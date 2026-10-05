import { OpenSees } from "./index.js"
import { Rectangle } from "./packages/autocad-client/node_modules/@rolandohvca12/structural-lib/dist/index.js"

const Econc = (fc: number) => 150 * 1e3 * Math.sqrt(fc);



const fc = 210;
const sec = new Rectangle(0.25, 0.45);
const E = Econc(fc);


const A = sec.A();
const Ix = sec.Ix();


const model = new OpenSees.OpenSeesScriptBuilder();


const ops = model.ops;
ops.wipe();
ops.model("basic", "-ndm", 2, "-ndf", 3)

ops.node(1, 5.0, 0.0);
ops.node(2, 10.0, 0.0);
ops.node(3, 15.0, 0.0);

ops.fix(1, 1, 1, 0)
ops.fix(2, 1, 1, 0)
ops.fix(3, 1, 1, 0)

ops.geomTransf("Linear", 1)




ops.element("elasticBeamColumn", 1, 1, 2, A, E, Ix, 1);
ops.element("elasticBeamColumn", 2, 2, 3, A, E, Ix, 1);

ops.timeSeries("Linear", 1, "-factor")
ops.pattern("Plain", 1, 1, "-fact", 1.0)

ops.eleLoad("-ele", 1, "-type", "-beamUniform", -2.0)
ops.eleLoad("-ele", 2, "-type", "-beamUniform", -2.0);




ops.constraints("Transformation")
ops.numberer("RCM")
ops.system("BandGen")
ops.integrator("LoadControl", 1)
ops.algorithm("Newton")
ops.test("NormDispIncr", 1e-6, 20)
ops.analysis("Static")


ops.recorder("Node",
    "-file", "disp.txt",
    "-time",
    "-node", 1, 2, 3,
    "-dof", 1, 2, 3,
    "disp"
)


ops.analyze(1)


const executor = new OpenSees.OpenSeesExecutor({
    workDir: "./out/"
})

const tcl = model.build();

console.log(tcl);

await executor.run(tcl, "viga.tcl");

