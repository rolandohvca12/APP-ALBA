# openseesjs-vis

Typed 2D/3D visualization and post-processing for openseesjs.

Requires Node.js 22 or newer and `openseesjs` 0.3.0 or newer.

## Installation

    npm install openseesjs openseesjs-vis

## Features

- Reads the active OpenSees domain without duplicating model input.
- Frames, surfaces, tetrahedra, bricks, and extensible element topologies.
- Undeformed and deformed geometry.
- Mode-shape and response-history animation.
- Reactions and N, V2, V3, T, M2, M3 diagrams.
- Node inspector preserving every OpenSees DOF and an element station inspector.
- Displacement contours, selection, labels, standard views, and screenshots.
- WebM animation recording and download from the viewer toolbar.
- Browser/Electron renderer plus Node launcher.
- Headless SVG export for 2D models.

Element station values are exact at ends I/J. Intermediate values are linearly
interpolated when an element exposes only `localForce`; the inspector identifies
this as `I/J` rather than presenting it as an exact section response.

## Node usage

    import { ops } from "openseesjs";
    import { launchOpenSeesViewer } from "openseesjs-vis";

    // Build and analyze the model with ops.
    ops.reactions();

    const viewer = await launchOpenSeesViewer({
      source: ops,
      captureFrame: {
        includeReactions: true,
        diagrams: ["N", "V2", "M3"],
      },
      labels: "elements",
      deformationScale: "auto",
    });

    console.log(viewer.url);

The returned server remains active until calling:

    await viewer.close();

## Electron or browser

    import { OpenSeesViewer } from "openseesjs-vis/viewer";

    const viewer = new OpenSeesViewer(container)
      .setModel(model)
      .setResults(results)
      .setDeformationScale("auto")
      .showDeformed();

## Design

openseesjs-vis depends on the public query surface of openseesjs. The analysis
package has no dependency on this visualizer.
