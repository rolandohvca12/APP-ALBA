import { ops } from "openseesjs";

ops.wipe();
ops.model("basic", "-ndm", 3, "-ndf", 6);

ops.node(1, 0, 0, 0); //i
ops.node(2, 0, 0, 5); //j

//xL -> i - j
//

