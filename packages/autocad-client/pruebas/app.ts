import { AutoCadDrawingClient, AutoCadRealtimeClient, AutoCadDocumentClient } from "../dist/index.js"
import { offset } from "./offset.js"

interface IPoint2 {
    x: number
    y: number
}
class Point2 implements IPoint2 {
    constructor(readonly x: number, readonly y: number) { }
    move(dx: number, dy: number): IPoint2 {
        return { x: this.x + dx, y: this.y + dy };
    }
}


function scale_points(points: IPoint2[], factor: number): IPoint2[] {
    return points.map(point => {
        return { x: point.x * factor, y: point.y * factor };
    })

}

type LayerColor = "red" | "yellow" | "green" | "cyan" | "blue" | "magenta" | "gray"

const ColorMap: Record<LayerColor, number> = {
    red: 1,
    yellow: 2,
    blue: 5,
    green: 3,
    magenta: 6,
    cyan: 4,
    gray: 8
}
function getIndexColor(color: LayerColor) {
    return ColorMap[color];
}


interface IPoint2 {
    x: number;
    y: number;
}

interface IShape {
    refPoint: IPoint2
    getPoints(): IPoint2[]
}
interface IRectangle extends IShape {
    width: number
    height: number
}

interface IRebar {
    label: rebarLabel
    position?: IPoint2
}


interface IReforcedSection {
    geometry: IRectangle
    rec: number
    transversal_reinforcement: IRebar
    layer_sep: number
    longitudinal_reinforcement: ILayerRebar[]
}

interface LayerSetting {
    name: string
    color: LayerColor
}

interface ReforcedSectionLayerConfig {
    section: LayerSetting
    longitudinal_rebar: LayerSetting
    transversal_rebar: LayerSetting
}
interface ILayerRebar {
    rebar: IRebar
    n: number
}
type rebarLabel = "1/8in" | "1/2in" | "3/4in" | "1in" | "3/8in";

const rebars: Record<rebarLabel, number> = {
    "1/2in": in_to_m(1 / 2),
    "1/8in": in_to_m(1 / 8),
    "3/4in": in_to_m(3 / 4),
    "3/8in": in_to_m(3 / 8),
    "1in": in_to_m(1),
}
function in_to_m(value: number) { return value * 0.0254 }



function getDiameterByLabel(label: rebarLabel) {
    return rebars[label];
}

function distanceBetween(effective_width: number, layer: ILayerRebar) {
    const n = layer.n;
    const total_rebar_width = rebars[layer.rebar.label] * n;
    return (effective_width - total_rebar_width) / (n - 1);
}

async function drawReforcedBeam(
    cad: AutoCadDrawingClient,
    props: IReforcedSection,
    layerConfig: ReforcedSectionLayerConfig
) {

    await cad.createLayer(layerConfig.section.name, getIndexColor(layerConfig.section.color));
    await cad.createLayer(layerConfig.longitudinal_rebar.name, getIndexColor(layerConfig.longitudinal_rebar.color));
    await cad.createLayer(layerConfig.transversal_rebar.name, getIndexColor(layerConfig.transversal_rebar.color));

    const points = props.geometry.getPoints();

    await cad.polyline(points, true, { layer: layerConfig.section.name });

    const inner = await offset(points, props.rec, "inside");

    await cad.polyline(inner, true, { layer: layerConfig.transversal_rebar.name });

    const transversal_diameter = rebars[props.transversal_reinforcement.label]

    const inner2 = await offset(inner, transversal_diameter, "inside");

    await cad.polyline(inner2, true, { layer: layerConfig.transversal_rebar.name });
    const first_layer = props.longitudinal_reinforcement[0]!;

    const { x: x0, y: y0 } = props.geometry.refPoint;
    let y = props.rec + transversal_diameter + getDiameterByLabel(first_layer.rebar.label) / 2.0 + y0;

    await cad.defineDimStyle("COTAS", { decimalPlaces: 3, scale: 1, textHeight: 0.15 });

    const p1 = points[0]!;
    const p4 = points[4]!

    await cad.dimensionLinear(p1, p4, p1);

    for (let i = 0; i < props.longitudinal_reinforcement.length; i++) {
        const current_layer: ILayerRebar = props.longitudinal_reinforcement[i]!;
        const next_layer = props.longitudinal_reinforcement[i + 1];
        const current_layer_diameter = getDiameterByLabel(current_layer.rebar.label);
        const current_layer_radius = current_layer_diameter / 2.0;

        const distance = distanceBetween(props.geometry.width - (props.rec + transversal_diameter) * 2, current_layer);
        let x = props.rec + transversal_diameter + current_layer_radius + x0;
        for (let i = 0; i < current_layer.n; i++) {
            await cad.circle({ x: x, y: y }, current_layer_radius, { layer: layerConfig.longitudinal_rebar.name });
            x += (distance + current_layer_diameter);
        }
        let sep = next_layer ? current_layer_radius + getDiameterByLabel(next_layer.rebar.label) / 2.0 + props.layer_sep : 0;
        y += sep;
    }
}


const transport = new AutoCadRealtimeClient();
const cad = new AutoCadDrawingClient(transport);

await cad.connect();


class Rectangle implements IRectangle {
    constructor(readonly width: number, readonly height: number, readonly refPoint: IPoint2 = { x: 0, y: 0 }) { }
    getPoints(): IPoint2[] {
        const origin = this.refPoint
        const x0 = origin.x;
        const y0 = origin.y;
        const b = this.width;
        const h = this.height;
        return [
            { x: x0, y: y0 },
            { x: x0 + b, y: y0 },
            { x: x0 + b, y: y0 + h },
            { x: x0, y: y0 + h }
        ];
    }
}



await cad.clearModel();

let init_pos = [0, 1, 2, 3, 4, 5];


for (const v of init_pos) {
    const r = new Rectangle(0.50, 1.20, { x: v, y: 0 });
    await drawReforcedBeam(cad, {
        geometry: r,
        layer_sep: 0.04,
        rec: 0.06,
        transversal_reinforcement: { label: "3/8in" },
        longitudinal_reinforcement: [
            { rebar: { label: "1in" }, n: 4 },
            { rebar: { label: "1in" }, n: 4 },
            { rebar: { label: "1in" }, n: 4 },
            { rebar: { label: "1in" }, n: 2 }
        ]
    }, {
        section: { name: "SECCION", color: "blue" },
        longitudinal_rebar: { name: "REFUERZO_LONGITUDINAL", color: "gray" },
        transversal_rebar: { name: "REFUERZO_TRANSVERSAL", color: "green" }
    })
}




cad.close();