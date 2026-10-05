# OpenSeesJS API reference

Generated from the OpenSeesPy `3.8.0.0` command inventory.
The TypeScript signatures below are the public command overloads used by `ops`.
Typed variants are also discoverable as `ops.<command>.<type>(...)` methods.
Queries that return values directly are listed first.

## Native queries

`analyze`, `getTime`, `getLoadFactor`, `getNodeTags`, `getEleTags`, `nodeCoord`, 
`nodeDisp`, `nodeVel`, `nodeAccel`, `nodeReaction`, `eleResponse`, `eleForce`, 
`eigen`, `nodeEigenvector`, `modalProperties`, `modalResults`, `version`, 
`nodeDisplacements`, `nodeReactions`, `elementForces`, `elementLocalForces2D`.

## Commands

### `Bcast`

OpenSees: `Bcast(*data)`

```ts
Bcast(data?: readonly string[]): this;
```

### `IGA`

```ts
IGA(args?: readonly OpenSeesPyArgument[]): this;
```

### `InitialStateAnalysis`

OpenSees: `InitialStateAnalysis(flag)`

```ts
InitialStateAnalysis(flag: string): this;
```

### `NDTest`

```ts
NDTest(args?: readonly OpenSeesPyArgument[]): this;
```

### `ShallowFoundationGen`

```ts
ShallowFoundationGen(args?: readonly OpenSeesPyArgument[]): this;
```

### `accelCPU`

```ts
accelCPU(args?: readonly OpenSeesPyArgument[]): this;
```

### `addToParameter`

OpenSees: `addToParameter(tag, <specific parameter args>)`

```ts
addToParameter(tag: number, specific_parameter_args?: number): this;
```

### `algorithm`

OpenSees: `algorithm(algoType, *algoArgs)`; `algorithm('BFGS',secant=False,initial=False,count=10)`; `algorithm('Broyden',secant=False,initial=False,count=10)`; `algorithm('KrylovNewton',iterate='current',increment='current',maxDim=3)`; `algorithm('Linear',secant=False,initial=False,factorOnce=False)`; `algorithm('ModifiedNewton',secant=False,initial=False)`; `algorithm('Newton',secant=False,initial=False,initialThenCurrent=False)`; `algorithm('NewtonLineSearch',Bisection=False,Secant=False,RegulaFalsi=False,InitialInterpolated=False,tol=0.8,maxIter=10,minEta=0.1,maxEta=10.0)`; `algorithm('PeriodicNewton',iterate='current',increment='current',maxDim=3)`; `algorithm('RaphsonNewton',iterate='current',increment='current')`; `algorithm('SecantNewton',iterate='current',increment='current',maxDim=3)`

```ts
algorithm(type: "BFGS", secant?: boolean, initial?: boolean, count?: number): this;
algorithm(type: "Broyden", secant?: boolean, initial?: boolean, count?: number): this;
algorithm(type: "KrylovNewton", iterate?: string, increment?: string, maxDim?: number): this;
algorithm(type: "Linear", secant?: boolean, initial?: boolean, factorOnce?: boolean): this;
algorithm(type: "ModifiedNewton", secant?: boolean, initial?: boolean): this;
algorithm(type: "Newton", secant?: boolean, initial?: boolean, initialThenCurrent?: boolean): this;
algorithm(type: "NewtonLineSearch", Bisection?: boolean, Secant?: boolean, RegulaFalsi?: boolean, InitialInterpolated?: boolean, tol?: number, maxIter?: number, minEta?: number, maxEta?: number): this;
algorithm(type: "PeriodicNewton", iterate?: string, increment?: string, maxDim?: number): this;
algorithm(type: "RaphsonNewton", iterate?: string, increment?: string): this;
algorithm(type: "SecantNewton", iterate?: string, increment?: string, maxDim?: number): this;
```

### `analysis`

OpenSees: `analysis(analysisType)`; `analysis('PFEM',dtmax,dtmin,gravity,ratio=0.5)`

```ts
analysis(analysisType: 'Static'): this;
analysis(analysisType: 'Transient'): this;
analysis(analysisType: 'Transient', numSublevelsFlag: '-numSublevels', numSublevels: number, numSubStepsFlag: '-numSubSteps', numSubSteps: number): this;
analysis(analysisType: 'VariableTransient'): this;
analysis(analysisType: 'PFEM', dtmax: number, dtmin: number, gravity: number, ratio?: number): this;
```

### `analyze`

OpenSees: `analyze(numIncr=1, dt=0.0, dtMin=0.0, dtMax=0.0, Jd=0)`

```ts
analyze(numIncr?: number, dt?: number, dtMin?: number, dtMax?: number, Jd?: number): this;
```

### `barrier`

OpenSees: `barrier()`

```ts
barrier(): this;
```

### `basicDeformation`

OpenSees: `basicDeformation(eleTag)`

```ts
basicDeformation(eleTag: number): this;
```

### `basicForce`

OpenSees: `basicForce(eleTag)`

```ts
basicForce(eleTag: number): this;
```

### `basicStiffness`

OpenSees: `basicStiffness(eleTag)`

```ts
basicStiffness(eleTag: number): this;
```

### `beamIntegration`

OpenSees: `beamIntegration(type, tag, *args)`; `beamIntegration('CompositeSimpson', tag, secTag, N)`; `beamIntegration('ConcentratedCurvature',integrationTag,secTagI,LpI,secTagJ,LpJ,secTagE)`; `beamIntegration('ConcentratedPlasticity',integrationTag,secTagI,secTagJ,secTagE)`; `beamIntegration('FixedLocation',tag,N,*secTags,*locs)`; `beamIntegration('HingeEndpoint',tag,secI,lpI,secJ,lpJ,secE)`; `beamIntegration('HingeMidpoint',tag,secI,lpI,secJ,lpJ,secE)`; `beamIntegration('HingeRadau',tag,secI,lpI,secJ,lpJ,secE)`; `beamIntegration('HingeRadauTwo',tag,secI,lpI,secJ,lpJ,secE)`; `beamIntegration('Legendre', tag, secTag, N)`; `beamIntegration('Lobatto', tag, secTag, N)`; `beamIntegration('LowOrder',tag,N,*secTags,*locs,*wts)`; `beamIntegration('MidDistance',tag,N,*secTags,*locs)`; `beamIntegration('NewtonCotes', tag, secTag, N)`; `beamIntegration('Radau', tag, secTag, N)`; `beamIntegration('Trapezoidal', tag, secTag, N)`; `beamIntegration('UserDefined',tag,N,*secTags,*locs,*wts)`; `beamIntegration('UserHinge',tag,secETag,npL,*secsLTags,*locsL,*wtsL,npR,*secsRTags,*locsR,*wtsR)`

```ts
beamIntegration(type: "CompositeSimpson", tag: number, secTag: number, N: number): this;
beamIntegration(type: "ConcentratedCurvature", integrationTag: number, secTagI: number, LpI: number, secTagJ: number, LpJ: number, secTagE: number): this;
beamIntegration(type: "ConcentratedPlasticity", integrationTag: number, secTagI: number, secTagJ: number, secTagE: number): this;
beamIntegration(type: "FixedLocation", tag: number, N: number, secTags: readonly number[], locs?: readonly number[]): this;
beamIntegration(type: "HingeEndpoint", tag: number, secI: number, lpI: number, secJ: number, lpJ: number, secE: number): this;
beamIntegration(type: "HingeMidpoint", tag: number, secI: number, lpI: number, secJ: number, lpJ: number, secE: number): this;
beamIntegration(type: "HingeRadau", tag: number, secI: number, lpI: number, secJ: number, lpJ: number, secE: number): this;
beamIntegration(type: "HingeRadauTwo", tag: number, secI: number, lpI: number, secJ: number, lpJ: number, secE: number): this;
beamIntegration(type: "Legendre", tag: number, secTag: number, N: number): this;
beamIntegration(type: "Lobatto", tag: number, secTag: number, N: number): this;
beamIntegration(type: "LowOrder", tag: number, N: number, secTags: readonly number[], locs: readonly number[], wts?: readonly number[]): this;
beamIntegration(type: "MidDistance", tag: number, N: number, secTags: readonly number[], locs?: readonly number[]): this;
beamIntegration(type: "NewtonCotes", tag: number, secTag: number, N: number): this;
beamIntegration(type: "Radau", tag: number, secTag: number, N: number): this;
beamIntegration(type: "Trapezoidal", tag: number, secTag: number, N: number): this;
beamIntegration(type: "UserDefined", tag: number, N: number, secTags: readonly number[], locs: readonly number[], wts?: readonly number[]): this;
beamIntegration(type: "UserHinge", tag: number, secETag: number, npL: number, secsLTags: readonly number[], locsL: readonly number[], wtsL: readonly number[], npR: number, secsRTags: readonly number[], locsR: readonly number[], wtsR?: readonly number[]): this;
```

### `block2D`

OpenSees: `block2D(numX, numY, startNode, startEle, eleType, *eleArgs, *crds)`

```ts
block2D(numX: number, numY: number, startNode: number, startEle: number, eleType: string, eleArgs: readonly OpenSeesPyArgument[], crds?: readonly OpenSeesPyArgument[]): this;
```

### `block3D`

OpenSees: `block3D(numX, numY, numZ, startNode, startEle, eleType, *eleArgs, *crds)`

```ts
block3D(numX: number, numY: number, numZ: number, startNode: number, startEle: number, eleType: string, eleArgs: readonly OpenSeesPyArgument[], crds?: readonly OpenSeesPyArgument[]): this;
```

### `build`

```ts
build(): this;
```

### `cbdiDisplacement`

```ts
cbdiDisplacement(args?: readonly OpenSeesPyArgument[]): this;
```

### `classType`

```ts
classType(args?: readonly OpenSeesPyArgument[]): this;
```

### `computeGradients`

OpenSees: `computeGradients()`

```ts
computeGradients(): this;
```

### `constraints`

OpenSees: `constraints(constraintType, *constraintArgs)`; `constraints('Lagrange',alphaS=1.0,alphaM=1.0)`; `constraints('Penalty',alphaS=1.0,alphaM=1.0)`; `constraints('Plain')`; `constraints('Transformation')`

```ts
constraints(type: "Lagrange", alphaS?: number, alphaM?: number): this;
constraints(type: "Penalty", alphaS?: number, alphaM?: number): this;
constraints(type: "Plain"): this;
constraints(type: "Transformation"): this;
```

### `convertBinaryToText`

OpenSees: `convertBinaryToText(inputfile, outputfile)`

```ts
convertBinaryToText(inputfile: string, outputfile: string): this;
```

### `convertTextToBinary`

OpenSees: `convertTextToBinary(inputfile, outputfile)`

```ts
convertTextToBinary(inputfile: string, outputfile: string): this;
```

### `correlate`

```ts
correlate(args?: readonly OpenSeesPyArgument[]): this;
```

### `damping`

```ts
damping(args?: readonly OpenSeesPyArgument[]): this;
```

### `database`

OpenSees: `database(type, dbName)`

```ts
database(type: string, dbName: string): this;
```

### `defaultUnits`

```ts
defaultUnits(args?: readonly OpenSeesPyArgument[]): this;
```

### `domainChange`

OpenSees: `domainChange()`

```ts
domainChange(): this;
```

### `domainCommitTag`

```ts
domainCommitTag(args?: readonly OpenSeesPyArgument[]): this;
```

### `eigen`

OpenSees: `eigen(solver='-genBandArpack', numEigenvalues)`

```ts
eigen(numEigenvalues: number): this;
eigen(solver: string, numEigenvalues: number): this;
```

### `eleDynamicalForce`

OpenSees: `eleDynamicalForce(eleTag, dof=-1)`

```ts
eleDynamicalForce(eleTag: number, dof?: number): this;
```

### `eleForce`

OpenSees: `eleForce(eleTag, dof=-1)`

```ts
eleForce(eleTag: number, dof?: number): this;
```

### `eleLoad`

OpenSees: `eleLoad('-ele', *eleTags, '-range', eleTag1, eleTag2, '-type', '-beamUniform', Wy, <Wz>, Wx=0.0, '-beamPoint',Py,<Pz>,xL,Px=0.0,'-beamThermal',*tempPts)`

```ts
eleLoad(selectionFlag: '-ele', elementTags: readonly number[], typeFlag: '-type', loadType: '-beamUniform', loadValues: BeamUniformLoad): this;
eleLoad(selectionFlag: '-range', elementRange: readonly [firstElement: number, lastElement: number], typeFlag: '-type', loadType: '-beamUniform', loadValues?: BeamUniformLoad): this;
eleLoad(selectionFlag: '-ele', elementTags: readonly number[], typeFlag: '-type', loadType: '-beamPoint', loadValues: BeamPointLoad): this;
eleLoad(selectionFlag: '-range', elementRange: readonly [firstElement: number, lastElement: number], typeFlag: '-type', loadType: '-beamPoint', loadValues?: BeamPointLoad): this;
eleLoad(selectionFlag: '-ele' | '-range', elements: readonly number[], typeFlag: '-type', loadType: '-beamThermal', thermalValues?: readonly number[]): this;
```

### `eleNodes`

OpenSees: `eleNodes(eleTag)`

```ts
eleNodes(eleTag: number): this;
```

### `eleResponse`

OpenSees: `eleResponse(eleTag, *args)`

```ts
eleResponse(eleTag: number, args?: readonly OpenSeesPyArgument[]): this;
```

### `eleType`

```ts
eleType(args?: readonly OpenSeesPyArgument[]): this;
```

### `element`

OpenSees: `element('20NodeBrick', eleTag,*eleNodes,matTag, bf1, bf2, bf3, massDen)`; `element('AC3D8', eleTag, *eleNodes, matTag)`; `element('ASI3D8', eleTag, *eleNodes1, *eleNodes2)`; `element('AV3D4', eleTag, *eleNodes, matTag)`; `element('bbarBrick', eleTag,*eleNodes,matTag,<b1,b2,b3>)`; `element('bbarBrickUP', eleTag,*eleNodes,matTag, bulk, fmass, permX, permY, permZ,<bX=0, bY=0, bZ=0>)`; `element('bbarQuad', eleTag,*eleNodes,thick,matTag)`; `element('bbarQuadUP', eleTag,*eleNodes,thick, matTag, bulk, fmass, hPerm, vPerm,<b1=0, b2=0, t=0>)`; `element('beamColumnJoint', eleTag,*eleNodes,Mat1Tag, Mat2Tag, Mat3Tag, Mat4Tag, Mat5Tag, Mat6Tag, Mat7Tag, Mat8Tag, Mat9Tag, Mat10Tag, Mat11Tag, Mat12Tag, Mat13Tag, <eleHeightFac=1.0, eleWidthFac=1.0>)`; `element('BeamContact2D', eleTag, iNode, jNode, sNode, lNode, matTag, width, gTol, fTol, <cFlag>)`; `element('BeamContact3D', eleTag,iNode, jNode, cNode, lNode, radius, crdTransf, matTag, gTol, fTol, <cFlag>)`; `element('BeamEndContact3D', eleTag,iNode, jNode, cNode, lNode, radius, gTol, fTol, <cFlag>)`; `element('brickUP', eleTag,*eleNodes,matTag, bulk, fmass, permX, permY, permZ,<bX=0, bY=0, bZ=0>)`; `element('CatenaryCable', eleTag,iNode, jNode, weight, E, A, L0, alpha, temperature_change, rho, errorTol, Nsubsteps, massType)`; `element('corotTruss', eleTag,*eleNodes,A, matTag, <'-rho', rho>,<'-cMass', cFlag>,<'-doRayleigh', rFlag>)`; `element('corotTrussSection', eleTag,*eleNodes, secTag, <'-rho', rho>,<'-cMass', cFlag>,<'-doRayleigh', rFlag>)`; `element('CoupledZeroLength', eleTag,*eleNodes, dirn1, dirn2, matTag, <rFlag=1>)`; `element('Pipe', eleTag, *eleNodes, pipeMatTag, pipeSecTag, xC, yC, zC, <'-Ti'>, <'-T0', T0>, <'-p', p>, <'-tolWall'>, <'-noThermalLoad'>, <'-noPressureLoad'>)`; `element('dispBeamColumn',eleTag,*eleNodes,transfTag,integrationTag,'-cMass','-mass',mass=0.0)`; `element('dispBeamColumnInt', eleTag,*eleNodes,numIntgrPts, secTag, transfTag, cRot, <'-mass', massDens>)`; `element('elasticBeamColumn', eleTag, *eleNodes, Area, E_mod, Iz, transfTag, <'-mass', mass>,<'-cMass'>, <'-release', releaseCode>)`; `element('elasticBeamColumn', eleTag, *eleNodes, secTag, transfTag, <'-mass', mass>,<'-cMass'>, <'-release', releaseCode>)`; `element('elasticBeamColumn', eleTag, *eleNodes, Area, E_mod, G_mod, Jxx, Iy, Iz, transfTag, <'-mass', mass>, <'-cMass'>)`; `element('elasticBeamColumn', eleTag, *eleNodes, secTag, transfTag, <'-mass', mass>, <'-cMass'> <'-releasez', releaseCode>, <'-releasey', releaseCode>)`; `element('ElasticTimoshenkoBeam', eleTag,*eleNodes,E_mod, G_mod, Area, Iz, Avy, transfTag,<'-mass', massDens>,<'-cMass'>)`; `element('ElasticTimoshenkoBeam', eleTag, *eleNodes, E_mod, G_mod, Area, Jxx, Iy, Iz, Avy, Avz, transfTag, <'-mass', massDens>, <'-cMass'>)`; `element('ElasticTubularJoint', eleTag,*eleNodes,Brace_Diameter, Brace_Angle, E, Chord_Diameter, Chord_Thickness, Chord_Angle)`; `element('elastomericBearingBoucWen', eleTag,*eleNodes,kInit, qd, alpha1, alpha2, mu, eta, beta, gamma, '-P', PMatTag, '-Mz', MzMatTag, <'-orient', *orientVals>, <'-shearDist', shearDist>, <'-doRayleigh'>, <'-mass', mass>)`; `element('elastomericBearingBoucWen', eleTag,*eleNodes,kInit, qd, alpha1, alpha2, mu, eta, beta, gamma, '-P', PMatTag,'-T', TMatTag,'-My', MyMatTag,'-Mz', MzMatTag, <'-orient' ,*orientVals> ,<'-shearDist', shearDist> ,<'-doRayleigh'> ,<'-mass', mass>)`; `element('elastomericBearingPlasticity', eleTag,*eleNodes,kInit, qd, alpha1, alpha2, mu, '-P', PMatTag, '-Mz', MzMatTag, <'-orient', x1, x2, x3, y1, y2, y3>,<'-shearDist', sDratio>,<'-doRayleigh'>,<'-mass', m>)`; `element('elastomericBearingPlasticity', eleTag,*eleNodes,kInit, qd, alpha1, alpha2, mu, '-P', PMatTag, '-T', TMatTag, '-My', MyMatTag, '-Mz', MzMatTag,<'-orient', <x1, x2, x3>, y1, y2, y3>,<'-shearDist', sDratio>,<'-doRayleigh'>,<'-mass', m>)`; `element('ElastomericX', eleTag,*eleNodes,Fy, alpha, Gr, Kbulk, D1, D2, ts, tr, n, <<x1, x2, x3>, y1, y2, y3>,<kc>,<PhiM>,<ac>,<sDratio>,<m>,<cd>,<tc>,<tag1>,<tag2>,<tag3>,<tag4>)`; `element(eleType, eleTag, *eleNodes, *eleArgs)`; `element('enhancedQuad', eleTag,*eleNodes,thick, type, matTag)`; `element('flatSliderBearing', eleTag,*eleNodes,frnMdlTag, kInit,'-P', PMatTag,'-Mz', MzMatTag,<'-orient', x1, x2, x3, y1, y2, y3>,<'-shearDist', sDratio>,<'-doRayleigh'>,<'-mass', m>,<'-maxIter', iter, tol>)`; `element('flatSliderBearing', eleTag,*eleNodes,frnMdlTag, kInit,'-P', PMatTag,'-T', TMatTag,'-My', MyMatTag,'-Mz', MzMatTag,<'-orient',<x1, x2, x3>, y1, y2, y3>,<'-shearDist', sDratio>,<'-doRayleigh'>,<'-mass', m>,<'-iter', maxIter, tol>)`; `element('forceBeamColumn',eleTag,*eleNodes,transfTag,integrationTag,'-iter',maxIter=10,tol=1e-12,'-mass',mass=0.0)`; `element('FourNodeTetrahedron', eleTag,*eleNodes,matTag, <b1,b2,b3>)`; `element('FPBearingPTV', eleTag,*eleNodes,MuRef, IsPressureDependent, pRef, IsTemperatureDependent, Diffusivity, Conductivity, IsVelocityDependent, rateParameter, ReffectiveFP, Radius_Contact, kInitial, theMaterialA, theMaterialB, theMaterialC, theMaterialD, x1, x2, x3, y1, y2, y3, shearDist, doRayleigh, mass, iter, tol, unit)`; `element('HDR', eleTag,*eleNodes,Gr, Kbulk, D1, D2, ts, tr, n, a1, a2, a3, b1, b2, b3, c1, c2, c3, c4, <<x1, x2, x3>, y1, y2, y3>,<kc>,<PhiM>,<ac>,<sDratio>,<m>,<tc>)`; `element('Joint2D', eleTag,*eleNodes, <Mat1, Mat2, Mat3, Mat4>, MatC, LrgDspTag, <'-damage', DmgTag>, <'-damage', Dmg1 Dmg2 Dmg3 Dmg4 DmgC>)`; `element('KikuchiBearing', eleTag,*eleNodes,'-shape', shape,'-size', size, totalRubber, <'-totalHeight', totalHeight>,'-nMSS', nMSS,'-matMSS', matMSSTag, <'-limDisp', limDisp>,'-nMNS', nMNS,'-matMNS', matMNSTag, <'-lambda', lambda>, <'-orient',<x1, x2, x3>, yp1, yp2, yp3>, <'-mass', m>, <'-noPDInput'>, <'-noTilt'>, <'-adjustPDOutput', ci, cj>, <'-doBalance', limFo, limFi, nIter>)`; `element('LeadRubberX', eleTag,*eleNodes,Fy, alpha, Gr, Kbulk, D1, D2, ts, tr, n, <<x1, x2, x3>, y1, y2, y3>,<kc>,<PhiM>,<ac>,<sDratio>,<m>,<cd>,<tc>,<qL>,<cL>,<kS>,<aS>,<tag1>,<tag2>,<tag3>,<tag4>,<tag5>)`; `element('MasonPan12', eleTag,*eleNodes, mat_1, mat_2, thick, w_tot, w_1)`; `element('ModElasticBeam2d', eleTag,*eleNodes,Area, E_mod, Iz, K11, K33, K44, transfTag,<'-mass',massDens>,<'-cMass'>)`; `element('multipleShearSpring', eleTag,*eleNodes,nSpring,'-mat', matTag,<'-lim', lim>,<'-orient',<x1, x2, x3>, yp1, yp2, yp3>,<'-mass', mass>)`; `element('MVLEM', eleTag,Dens,*eleNodes,m, c, '-thick', *thick,'-width',*widths,'-rho',*rho,'-matConcrete',*matConcreteTags,'-matSteel',*matSteelTags,'-matShear',matShearTag)`; `element('MVLEM_3D', eleTag,*eleNodes,m, '-thick', *thick,'-width',*widths,'-rho',*rho,'-matConcrete',*matConcreteTags,'-matSteel',*matSteelTags,'-matShear',matShearTag,<'-CoR',c>,<'-ThickMod',tMod>,<'-Poisson',Nu>,<'-Density',Dens>)`; `element('9_4_QuadUP', eleTag,*eleNodes,thick, matTag, bulk, fmass, hPerm, vPerm,<b1=0, b2=0>)`; `element('nonlinearBeamColumn',eleTag,*eleNodes,numIntgrPts,secTag,transfTag,'-iter',maxIter=10,tol=1e-12,'-mass',mass=0.0,'-integration',intType)`; `element('PFEMElementBubble',eleTag,*eleNodes, rho,mu,b1,b2,<b3>,<thickness,kappa>)`; `element('PFEMElementCompressible',eleTag,*eleNodes,rho,mu,b1,b2, <thickness,kappa>)`; `element('Pipe', eleTag, *eleNodes, pipeMatTag, pipeSecTag, <'-T0', T0>, <'-p', p>, <'-noThermalLoad'>, <'-noPressureLoad'>)`; `element('quad', eleTag,*eleNodes,thick, type, matTag,<pressure=0.0, rho=0.0, b1=0.0, b2=0.0>)`; `element('quadUP', eleTag,*eleNodes,thick, matTag, bulk, fmass, hPerm, vPerm,<b1=0, b2=0, t=0>)`; `element('RJWatsonEqsBearing', eleTag,*eleNodes,frnMdlTag, kInit,'-P', PMatTag,'-Vy', VyMatTag,'-Mz', MzMatTag, <'-orient', x1, x2, x3, y1, y2, y3>, <'-shearDist', sDratio>, <'-doRayleigh'>, <'-mass', m>, <'-iter', maxIter, tol>)`; `element('RJWatsonEqsBearing', eleTag,*eleNodes,frnMdlTag, kInit,'-P', PMatTag,'-Vy', VyMatTag,'-Vz', VzMatTag,'-T', TMatTag,'-My', MyMatTag,'-Mz', MzMatTag,<'-orient', <x1, x2, x3>, y1, y2, y3>,<'-shearDist', sDratio>,<'-doRayleigh'>,<'-mass', m>,<'-iter', maxIter, tol>)`; `element('SFI_MVLEM', eleTag,*eleNodes,m,c, '-thick',*thick,'-width',*widths,'-mat',*mat_tags)`; `element('SFI_MVLEM_3D', eleTag,*eleNodes,m, '-thick', *thicks,'-width',*widths,'-mat',*matTags,<'-CoR',c>,<'-ThickMod',tMod>,<'-Poisson',Nu>,<'-Density',Dens>)`; `element('ShellDKGQ', eleTag,*eleNodes,secTag)`; `element('ShellDKGT', eleTag,*eleNodes,secTag)`; `element('ShellMITC4', eleTag,*eleNodes,secTag)`; `element('ShellNL', eleTag,*eleNodes,secTag)`; `element('ShellNLDKGQ', eleTag,*eleNodes,secTag)`; `element('ShellNLDKGT', eleTag,*eleNodes,secTag)`; `element('SimpleContact2D', eleTag,iNode, jNode, cNode, lNode, matTag, gTol, fTol)`; `element('SimpleContact3D', eleTag,iNode, jNode, kNode, lNode, cNode, lagr_node, matTag, gTol, fTol)`; `element('singleFPBearing', eleTag,*eleNodes,frnMdlTag, Reff, kInit,'-P', PMatTag,'-Mz', MzMatTag,<'-orient', x1, x2, x3, y1, y2, y3>,<'-shearDist', sDratio>,<'-doRayleigh'>,<'-mass', m>,<'-iter', maxIter, tol>)`; `element('singleFPBearing', eleTag,*eleNodes,frnMdlTag, Reff, kInit,'-P', PMatTag,'-T', TMatTag,'-My', MyMatTag,'-Mz', MzMatTag,<'-orient',<x1, x2, x3>, y1, y2, y3>,<'-shearDist', sDratio>,<'-doRayleigh'>,<'-mass', m>,<'-iter', maxIter, tol>)`; `element('SSPbrick', eleTag,*eleNodes,matTag,<b1, b2, b3>)`; `element('SSPbrickUP', eleTag,*eleNodes,matTag, fBulk, fDen, k1, k2, k3, void, alpha,<b1, b2, b3>)`; `element('SSPquad', eleTag,*eleNodes,matTag, type, thick,<b1, b2>)`; `element('SSPquadUP', eleTag,*eleNodes,matTag, thick, fBulk, fDen, k1, k2, void, alpha,<b1=0.0, b2=0.0>)`; `element('stdBrick', eleTag,*eleNodes,matTag,<b1, b2, b3>)`; `element('SurfaceLoad', eleTag,*eleNodes, p)`; `element('TFP', eleTag,*eleNodes,R1, R2, R3, R4, Db1, Db2, Db3, Db4, d1, d2, d3, d4, mu1, mu2, mu3, mu4, h1, h2, h3, h4, H0, colLoad,<K>)`; `element('Tri31', eleTag,*eleNodes,thick, type, matTag, <pressure, rho, b1, b2>)`; `element('TripleFrictionPendulum', eleTag,*eleNodes,frnTag1, frnTag2, frnTag3, vertMatTag, rotZMatTag, rotXMatTag, rotYMatTag, L1, L2, L3, d1, d2, d3, W, uy, kvt, minFv, tol)`; `element('Truss', eleTag, *eleNodes, A, matTag, <'-rho', rho>, <'-cMass', cFlag>, <'-doRayleigh', rFlag>)`; `element('TrussSection', eleTag, *eleNodes, secTag, <'-rho', rho>, <'-cMass', cFlag>, <'-doRayleigh', rFlag>)`; `element('20_8_BrickUP', eleTag,*eleNodes,matTag, bulk, fmass, permX, permY, permZ,<bX=0, bY=0, bZ=0>)`; `element('twoNodeLink', eleTag,*eleNodes,'-mat', *matTags, '-dir', *dir, <'-orient', *vecx, *vecyp>,<'-pDelta', *pDeltaVals>, <'-shearDist', *shearDist>, <'-doRayleigh'>, <'-mass', m>)`; `element('VS3D4', eleTag,*eleNodes,E, G, rho, R, alphaN, alphaT)`; `element('YamamotoBiaxialHDR', eleTag,*eleNodes,Tp, DDo, DDi, Hr,<'-coRS`, cr, cs>,<'-orient`, *vecx, *vecyp>,<'-mass`, m>)`; `element('zeroLength', eleTag, *eleNodes, '-mat', *matTags, '-dir', *dirs, <'-doRayleigh', rFlag=0>, <'-orient', *vecx, *vecyp>)`; `element('zeroLengthContact2D', eleTag, cNode, rNode, Kn, Kt, mu, '-normal', Nx, Ny)`; `element('zeroLengthContact3D', eleTag, cNode, rNode, Kn, Kt, mu, c, dir)`; `element('zeroLengthContact2D', eleTag,*eleNodes,Kn, Kt, mu, '-normal', Nx, Ny)`; `element('zeroLengthContact3D', eleTag,*eleNodes,Kn, Kt, mu, c, dir)`; `element('zeroLengthContactNTS2D', eleTag,'-sNdNum', sNdNum, '-mNdNum', mNdNum, '-Nodes', *NodesTags, kn, kt, phi)`; `element('zeroLengthImpact3D', eleTag,*eleNodes,direction, initGap, frictionRatio, Kt, Kn, Kn2, Delta_y, cohesion)`; `element('zeroLengthInterface2D', eleTag,'-sNdNum', sNdNum, '-mNdNum', mNdNum, '-dof', sdof, mdof, '-Nodes', *NodesTags, kn, kt, phi)`; `element('zeroLengthND', eleTag,*eleNodes,matTag, <uniTag>, <'-orient', *vecx, vecyp>)`; `element('zeroLengthSection', eleTag,*eleNodes,secTag, <'-orient', *vecx,*vecyp>, <'-doRayleigh', rFlag>)`

```ts
element(type: "20NodeBrick", eleTag: number, eleNodes: readonly number[], matTag: number, bf1: number, bf2: number, bf3: number, massDen: number): this;
element(type: "AC3D8", eleTag: number, eleNodes: readonly number[], matTag: number): this;
element(type: "ASI3D8", eleTag: number, eleNodes1: readonly number[], eleNodes2?: readonly number[]): this;
element(type: "AV3D4", eleTag: number, eleNodes: readonly number[], matTag: number): this;
element(type: "bbarBrick", eleTag: number, eleNodes: readonly number[], matTag: number, b1?: number, b2?: number, b3?: number): this;
element(type: "bbarBrickUP", eleTag: number, eleNodes: readonly number[], matTag: number, bulk: number, fmass: number, permX: number, permY: number, permZ: number, bX?: number, bY?: number, bZ?: number): this;
element(type: "bbarQuad", eleTag: number, eleNodes: readonly number[], thick: number, matTag: number): this;
element(type: "bbarQuadUP", eleTag: number, eleNodes: readonly number[], thick: number, matTag: number, bulk: number, fmass: number, hPerm: number, vPerm: number, b1?: number, b2?: number, t?: number): this;
element(type: "beamColumnJoint", eleTag: number, eleNodes: readonly number[], Mat1Tag: number, Mat2Tag: number, Mat3Tag: number, Mat4Tag: number, Mat5Tag: number, Mat6Tag: number, Mat7Tag: number, Mat8Tag: number, Mat9Tag: number, Mat10Tag: number, Mat11Tag: number, Mat12Tag: number, Mat13Tag: number, eleHeightFac?: number, eleWidthFac?: number): this;
element(type: "BeamContact2D", eleTag: number, iNode: number, jNode: number, sNode: number, lNode: number, matTag: number, width: number, gTol: number, fTol: number, cFlag?: number): this;
element(type: "BeamContact3D", eleTag: number, iNode: number, jNode: number, cNode: number, lNode: number, radius: number, crdTransf: number, matTag: number, gTol: number, fTol: number, cFlag?: number): this;
element(type: "BeamEndContact3D", eleTag: number, iNode: number, jNode: number, cNode: number, lNode: number, radius: number, gTol: number, fTol: number, cFlag?: number): this;
element(type: "brickUP", eleTag: number, eleNodes: readonly number[], matTag: number, bulk: number, fmass: number, permX: number, permY: number, permZ: number, bX?: number, bY?: number, bZ?: number): this;
element(type: "CatenaryCable", eleTag: number, iNode: number, jNode: number, weight: number, E: number, A: number, L0: number, alpha: number, temperature_change: number, rho: number, errorTol: number, Nsubsteps: number, massType: number): this;
element(type: "corotTrussSection", eleTag: number, eleNodes: readonly number[], secTag: number, rho?: "-rho", rho2?: number, cMass?: "-cMass", cFlag?: number, doRayleigh?: "-doRayleigh", rFlag?: number): this;
element(type: "CoupledZeroLength", eleTag: number, eleNodes: readonly number[], dirn1: number, dirn2: number, matTag: number, rFlag?: number): this;
element(type: "Pipe", eleTag: number, eleNodes: readonly number[], pipeMatTag: number, pipeSecTag: number, xC: number, yC: number, zC: number, Ti?: "-Ti", T0?: "-T0", T02?: number, p?: "-p", p2?: number, tolWall?: "-tolWall", noThermalLoad?: "-noThermalLoad", noPressureLoad?: "-noPressureLoad"): this;
element(type: "dispBeamColumnInt", eleTag: number, eleNodes: readonly number[], numIntgrPts: number, secTag: number, transfTag: number, cRot: number, mass?: "-mass", massDens?: number): this;
element(type: "ElasticTimoshenkoBeam", eleTag: number, eleNodes: readonly number[], E_mod: number, G_mod: number, Area: number, Iz: number, Avy: number, transfTag: number, mass?: "-mass", massDens?: number, cMass?: "-cMass"): this;
element(type: "ElasticTimoshenkoBeam", eleTag: number, eleNodes: readonly number[], E_mod: number, G_mod: number, Area: number, Jxx: number, Iy: number, Iz: number, Avy: number, Avz: number, transfTag: number, mass?: "-mass", massDens?: number, cMass?: "-cMass"): this;
element(type: "ElasticTubularJoint", eleTag: number, eleNodes: readonly number[], Brace_Diameter: number, Brace_Angle: number, E: number, Chord_Diameter: number, Chord_Thickness: number, Chord_Angle: number): this;
element(type: "elastomericBearingBoucWen", eleTag: number, eleNodes: readonly number[], kInit: number, qd: number, alpha1: number, alpha2: number, mu: number, eta: number, beta: number, gamma: number, P: "-P", PMatTag: number, Mz: "-Mz", MzMatTag: number, orient?: "-orient", orientVals?: readonly number[], shearDist?: "-shearDist", shearDist2?: number, doRayleigh?: "-doRayleigh", mass?: "-mass", mass2?: number): this;
element(type: "elastomericBearingBoucWen", eleTag: number, eleNodes: readonly number[], kInit: number, qd: number, alpha1: number, alpha2: number, mu: number, eta: number, beta: number, gamma: number, P: "-P", PMatTag: number, T: "-T", TMatTag: number, My: "-My", MyMatTag: number, Mz: "-Mz", MzMatTag: number, orient?: "-orient", orientVals?: readonly number[], shearDist?: "-shearDist", shearDist2?: number, doRayleigh?: "-doRayleigh", mass?: "-mass", mass2?: number): this;
element(type: "elastomericBearingPlasticity", eleTag: number, eleNodes: readonly number[], kInit: number, qd: number, alpha1: number, alpha2: number, mu: number, P: "-P", PMatTag: number, Mz: "-Mz", MzMatTag: number, orient?: "-orient", x1?: number, x2?: number, x3?: number, y1?: number, y2?: number, y3?: number, shearDist?: "-shearDist", sDratio?: number, doRayleigh?: "-doRayleigh", mass?: "-mass", m?: number): this;
element(type: "elastomericBearingPlasticity", eleTag: number, eleNodes: readonly number[], kInit: number, qd: number, alpha1: number, alpha2: number, mu: number, P: "-P", PMatTag: number, T: "-T", TMatTag: number, My: "-My", MyMatTag: number, Mz: "-Mz", MzMatTag: number, orient?: "-orient", x1_x2_x3?: number, y1?: number, y2?: number, y3?: number, shearDist?: "-shearDist", sDratio?: number, doRayleigh?: "-doRayleigh", mass?: "-mass", m?: number): this;
element(type: "ElastomericX", eleTag: number, eleNodes: readonly number[], Fy: number, alpha: number, Gr: number, Kbulk: number, D1: number, D2: number, ts: number, tr: number, n: number, x1_x2_x3?: number, y1?: number, y2?: number, y3?: number, kc?: number, PhiM?: number, ac?: number, sDratio?: number, m?: number, cd?: number, tc?: number, tag1?: number, tag2?: number, tag3?: number, tag4?: number): this;
element(type: "enhancedQuad", eleTag: number, eleNodes: readonly number[], thick: number, type2: string, matTag: number): this;
element(type: "flatSliderBearing", eleTag: number, eleNodes: readonly number[], frnMdlTag: number, kInit: number, P: "-P", PMatTag: number, Mz: "-Mz", MzMatTag: number, orient?: "-orient", x1?: number, x2?: number, x3?: number, y1?: number, y2?: number, y3?: number, shearDist?: "-shearDist", sDratio?: number, doRayleigh?: "-doRayleigh", mass?: "-mass", m?: number, maxIter?: "-maxIter", iter?: number, tol?: number): this;
element(type: "flatSliderBearing", eleTag: number, eleNodes: readonly number[], frnMdlTag: number, kInit: number, P: "-P", PMatTag: number, T: "-T", TMatTag: number, My: "-My", MyMatTag: number, Mz: "-Mz", MzMatTag: number, orient?: "-orient", x1_x2_x3?: number, y1?: number, y2?: number, y3?: number, shearDist?: "-shearDist", sDratio?: number, doRayleigh?: "-doRayleigh", mass?: "-mass", m?: number, iter?: "-iter", maxIter?: number, tol?: number): this;
element(type: "FourNodeTetrahedron", eleTag: number, eleNodes: readonly number[], matTag: number, b1?: number, b2?: number, b3?: number): this;
element(type: "FPBearingPTV", eleTag: number, eleNodes: readonly number[], MuRef: number, IsPressureDependent: number, pRef: number, IsTemperatureDependent: number, Diffusivity: number, Conductivity: number, IsVelocityDependent: number, rateParameter: number, ReffectiveFP: number, Radius_Contact: number, kInitial: number, theMaterialA: number, theMaterialB: number, theMaterialC: number, theMaterialD: number, x1: number, x2: number, x3: number, y1: number, y2: number, y3: number, shearDist: number, doRayleigh: number, mass: number, iter: number, tol: number, unit: number): this;
element(type: "HDR", eleTag: number, eleNodes: readonly number[], Gr: number, Kbulk: number, D1: number, D2: number, ts: number, tr: number, n: number, a1: number, a2: number, a3: number, b1: number, b2: number, b3: number, c1: number, c2: number, c3: number, c4: number, x1_x2_x3?: number, y1?: number, y2?: number, y3?: number, kc?: number, PhiM?: number, ac?: number, sDratio?: number, m?: number, tc?: number): this;
element(type: "Joint2D", eleTag: number, eleNodes: readonly number[], Mat1: number | undefined, Mat2: number | undefined, Mat3: number | undefined, Mat4: number | undefined, MatC: number, LrgDspTag: number, damage?: "-damage", DmgTag?: number, damage2?: "-damage", Dmg1_Dmg2_Dmg3_Dmg4_DmgC?: number): this;
element(type: "KikuchiBearing", eleTag: number, eleNodes: readonly number[], shape: "-shape", shape2: number, size: "-size", size2: number, totalRubber: number, totalHeight: "-totalHeight" | undefined, totalHeight2: number | undefined, nMSS: "-nMSS", nMSS2: number, matMSS: "-matMSS", matMSSTag: number, limDisp: "-limDisp" | undefined, limDisp2: number | undefined, nMNS: "-nMNS", nMNS2: number, matMNS: "-matMNS", matMNSTag: number, lambda?: "-lambda", lambda2?: number, orient?: "-orient", x1_x2_x3?: number, yp1?: number, yp2?: number, yp3?: number, mass?: "-mass", m?: number, noPDInput?: "-noPDInput", noTilt?: "-noTilt", adjustPDOutput?: "-adjustPDOutput", ci?: number, cj?: number, doBalance?: "-doBalance", limFo?: number, limFi?: number, nIter?: number): this;
element(type: "LeadRubberX", eleTag: number, eleNodes: readonly number[], Fy: number, alpha: number, Gr: number, Kbulk: number, D1: number, D2: number, ts: number, tr: number, n: number, x1_x2_x3?: number, y1?: number, y2?: number, y3?: number, kc?: number, PhiM?: number, ac?: number, sDratio?: number, m?: number, cd?: number, tc?: number, qL?: number, cL?: number, kS?: number, aS?: number, tag1?: number, tag2?: number, tag3?: number, tag4?: number, tag5?: number): this;
element(type: "MasonPan12", eleTag: number, eleNodes: readonly number[], mat_1: number, mat_2: number, thick: number, w_tot: number, w_1: number): this;
element(type: "ModElasticBeam2d", eleTag: number, eleNodes: readonly number[], Area: number, E_mod: number, Iz: number, K11: number, K33: number, K44: number, transfTag: number, mass?: "-mass", massDens?: number, cMass?: "-cMass"): this;
element(type: "multipleShearSpring", eleTag: number, eleNodes: readonly number[], nSpring: number, mat: "-mat", matTag: number, lim?: "-lim", lim2?: number, orient?: "-orient", x1_x2_x3?: number, yp1?: number, yp2?: number, yp3?: number, mass?: "-mass", mass2?: number): this;
element(type: "MVLEM", eleTag: number, Dens: number, eleNodes: readonly number[], m: number, c: number, thick: "-thick", thick2: readonly number[], width: "-width", widths: readonly number[], rho: "-rho", rho2: readonly number[], matConcrete: "-matConcrete", matConcreteTags: readonly number[], matSteel: "-matSteel", matSteelTags: readonly number[], matShear: "-matShear", matShearTag: number): this;
element(type: "MVLEM_3D", eleTag: number, eleNodes: readonly number[], m: number, thick: "-thick", thick2: readonly number[], width: "-width", widths: readonly number[], rho: "-rho", rho2: readonly number[], matConcrete: "-matConcrete", matConcreteTags: readonly number[], matSteel: "-matSteel", matSteelTags: readonly number[], matShear: "-matShear", matShearTag: number, CoR?: "-CoR", c?: number, ThickMod?: "-ThickMod", tMod?: number, Poisson?: "-Poisson", Nu?: number, Density?: "-Density", Dens?: number): this;
element(type: "9_4_QuadUP", eleTag: number, eleNodes: readonly number[], thick: number, matTag: number, bulk: number, fmass: number, hPerm: number, vPerm: number, b1?: number, b2?: number): this;
element(type: "nonlinearBeamColumn", eleTag: number, eleNodes: readonly number[], numIntgrPts: number, secTag: number, transfTag: number, iter: "-iter", maxIter: number | undefined, tol: number | undefined, mass: "-mass", mass2: number | undefined, integration: "-integration", intType: string): this;
element(type: "PFEMElementBubble", eleTag: number, eleNodes: readonly number[], rho: number, mu: number, b1: number, b2: number, b3?: number, thickness?: number, kappa?: number): this;
element(type: "PFEMElementCompressible", eleTag: number, eleNodes: readonly number[], rho: number, mu: number, b1: number, b2: number, thickness?: number, kappa?: number): this;
element(type: "Pipe", eleTag: number, eleNodes: readonly number[], pipeMatTag: number, pipeSecTag: number, T0?: "-T0", T02?: number, p?: "-p", p2?: number, noThermalLoad?: "-noThermalLoad", noPressureLoad?: "-noPressureLoad"): this;
element(type: "quad", eleTag: number, eleNodes: readonly number[], thick: number, type2: string, matTag: number, pressure?: number, rho?: number, b1?: number, b2?: number): this;
element(type: "quadUP", eleTag: number, eleNodes: readonly number[], thick: number, matTag: number, bulk: number, fmass: number, hPerm: number, vPerm: number, b1?: number, b2?: number, t?: number): this;
element(type: "RJWatsonEqsBearing", eleTag: number, eleNodes: readonly number[], frnMdlTag: number, kInit: number, P: "-P", PMatTag: number, Vy: "-Vy", VyMatTag: number, Mz: "-Mz", MzMatTag: number, orient?: "-orient", x1?: number, x2?: number, x3?: number, y1?: number, y2?: number, y3?: number, shearDist?: "-shearDist", sDratio?: number, doRayleigh?: "-doRayleigh", mass?: "-mass", m?: number, iter?: "-iter", maxIter?: number, tol?: number): this;
element(type: "RJWatsonEqsBearing", eleTag: number, eleNodes: readonly number[], frnMdlTag: number, kInit: number, P: "-P", PMatTag: number, Vy: "-Vy", VyMatTag: number, Vz: "-Vz", VzMatTag: number, T: "-T", TMatTag: number, My: "-My", MyMatTag: number, Mz: "-Mz", MzMatTag: number, orient?: "-orient", x1_x2_x3?: number, y1?: number, y2?: number, y3?: number, shearDist?: "-shearDist", sDratio?: number, doRayleigh?: "-doRayleigh", mass?: "-mass", m?: number, iter?: "-iter", maxIter?: number, tol?: number): this;
element(type: "SFI_MVLEM", eleTag: number, eleNodes: readonly number[], m: number, c: number, thick: "-thick", thick2: readonly number[], width: "-width", widths: readonly number[], mat: "-mat", mat_tags?: readonly number[]): this;
element(type: "SFI_MVLEM_3D", eleTag: number, eleNodes: readonly number[], m: number, thick: "-thick", thicks: readonly number[], width: "-width", widths: readonly number[], mat: "-mat", matTags: readonly number[], CoR?: "-CoR", c?: number, ThickMod?: "-ThickMod", tMod?: number, Poisson?: "-Poisson", Nu?: number, Density?: "-Density", Dens?: number): this;
element(type: "ShellDKGQ", eleTag: number, eleNodes: readonly number[], secTag: number): this;
element(type: "ShellDKGT", eleTag: number, eleNodes: readonly number[], secTag: number): this;
element(type: "ShellMITC4", eleTag: number, eleNodes: readonly number[], secTag: number): this;
element(type: "ShellNL", eleTag: number, eleNodes: readonly number[], secTag: number): this;
element(type: "ShellNLDKGQ", eleTag: number, eleNodes: readonly number[], secTag: number): this;
element(type: "ShellNLDKGT", eleTag: number, eleNodes: readonly number[], secTag: number): this;
element(type: "SimpleContact2D", eleTag: number, iNode: number, jNode: number, cNode: number, lNode: number, matTag: number, gTol: number, fTol: number): this;
element(type: "SimpleContact3D", eleTag: number, iNode: number, jNode: number, kNode: number, lNode: number, cNode: number, lagr_node: number, matTag: number, gTol: number, fTol: number): this;
element(type: "singleFPBearing", eleTag: number, eleNodes: readonly number[], frnMdlTag: number, Reff: number, kInit: number, P: "-P", PMatTag: number, Mz: "-Mz", MzMatTag: number, orient?: "-orient", x1?: number, x2?: number, x3?: number, y1?: number, y2?: number, y3?: number, shearDist?: "-shearDist", sDratio?: number, doRayleigh?: "-doRayleigh", mass?: "-mass", m?: number, iter?: "-iter", maxIter?: number, tol?: number): this;
element(type: "singleFPBearing", eleTag: number, eleNodes: readonly number[], frnMdlTag: number, Reff: number, kInit: number, P: "-P", PMatTag: number, T: "-T", TMatTag: number, My: "-My", MyMatTag: number, Mz: "-Mz", MzMatTag: number, orient?: "-orient", x1_x2_x3?: number, y1?: number, y2?: number, y3?: number, shearDist?: "-shearDist", sDratio?: number, doRayleigh?: "-doRayleigh", mass?: "-mass", m?: number, iter?: "-iter", maxIter?: number, tol?: number): this;
element(type: "SSPbrick", eleTag: number, eleNodes: readonly number[], matTag: number, b1?: number, b2?: number, b3?: number): this;
element(type: "SSPbrickUP", eleTag: number, eleNodes: readonly number[], matTag: number, fBulk: number, fDen: number, k1: number, k2: number, k3: number, _void: number, alpha: number, b1?: number, b2?: number, b3?: number): this;
element(type: "SSPquad", eleTag: number, eleNodes: readonly number[], matTag: number, type2: string, thick: number, b1?: number, b2?: number): this;
element(type: "SSPquadUP", eleTag: number, eleNodes: readonly number[], matTag: number, thick: number, fBulk: number, fDen: number, k1: number, k2: number, _void: number, alpha: number, b1?: number, b2?: number): this;
element(type: "stdBrick", eleTag: number, eleNodes: readonly number[], matTag: number, b1?: number, b2?: number, b3?: number): this;
element(type: "SurfaceLoad", eleTag: number, eleNodes: readonly number[], p: number): this;
element(type: "TFP", eleTag: number, eleNodes: readonly number[], R1: number, R2: number, R3: number, R4: number, Db1: number, Db2: number, Db3: number, Db4: number, d1: number, d2: number, d3: number, d4: number, mu1: number, mu2: number, mu3: number, mu4: number, h1: number, h2: number, h3: number, h4: number, H0: number, colLoad: number, K?: number): this;
element(type: "Tri31", eleTag: number, eleNodes: readonly number[], thick: number, type2: string, matTag: number, pressure?: number, rho?: number, b1?: number, b2?: number): this;
element(type: "TripleFrictionPendulum", eleTag: number, eleNodes: readonly number[], frnTag1: number, frnTag2: number, frnTag3: number, vertMatTag: number, rotZMatTag: number, rotXMatTag: number, rotYMatTag: number, L1: number, L2: number, L3: number, d1: number, d2: number, d3: number, W: number, uy: number, kvt: number, minFv: number, tol: number): this;
element(type: "TrussSection", eleTag: number, eleNodes: readonly number[], secTag: number, rho?: "-rho", rho2?: number, cMass?: "-cMass", cFlag?: number, doRayleigh?: "-doRayleigh", rFlag?: number): this;
element(type: "20_8_BrickUP", eleTag: number, eleNodes: readonly number[], matTag: number, bulk: number, fmass: number, permX: number, permY: number, permZ: number, bX?: number, bY?: number, bZ?: number): this;
element(type: "twoNodeLink", eleTag: number, eleNodes: readonly number[], mat: "-mat", matTags: readonly number[], dir: "-dir", dir2: readonly number[], orient?: "-orient", vecx?: readonly number[], vecyp?: readonly number[], pDelta?: "-pDelta", pDeltaVals?: readonly number[], shearDist?: "-shearDist", shearDist2?: readonly number[], doRayleigh?: "-doRayleigh", mass?: "-mass", m?: number): this;
element(type: "VS3D4", eleTag: number, eleNodes: readonly number[], E: number, G: number, rho: number, R: number, alphaN: number, alphaT: number): this;
element(type: "YamamotoBiaxialHDR", eleTag: number, eleNodes: readonly number[], Tp: number, DDo: number, DDi: number, Hr: number, coRS_cr_cs_orient?: number, vecx?: readonly number[], vecyp?: readonly number[], mass_m?: number): this;
element(type: "zeroLengthContact2D", eleTag: number, cNode: number, rNode: number, Kn: number, Kt: number, mu: number, normal: "-normal", Nx: number, Ny: number): this;
element(type: "zeroLengthContact3D", eleTag: number, cNode: number, rNode: number, Kn: number, Kt: number, mu: number, c: number, dir: number): this;
element(type: "zeroLengthContact2D", eleTag: number, eleNodes: readonly number[], Kn: number, Kt: number, mu: number, normal: "-normal", Nx: number, Ny: number): this;
element(type: "zeroLengthContact3D", eleTag: number, eleNodes: readonly number[], Kn: number, Kt: number, mu: number, c: number, dir: number): this;
element(type: "zeroLengthContactNTS2D", eleTag: number, sNdNum: "-sNdNum", sNdNum2: number, mNdNum: "-mNdNum", mNdNum2: number, Nodes: "-Nodes", NodesTags: readonly number[], kn: number, kt: number, phi: number): this;
element(type: "zeroLengthImpact3D", eleTag: number, eleNodes: readonly number[], direction: number, initGap: number, frictionRatio: number, Kt: number, Kn: number, Kn2: number, Delta_y: number, cohesion: number): this;
element(type: "zeroLengthInterface2D", eleTag: number, sNdNum: "-sNdNum", sNdNum2: number, mNdNum: "-mNdNum", mNdNum2: number, dof: "-dof", sdof: number, mdof: number, Nodes: "-Nodes", NodesTags: readonly number[], kn: number, kt: number, phi: number): this;
element(type: "zeroLengthND", eleTag: number, eleNodes: readonly number[], matTag: number, uniTag?: number, orient?: "-orient", vecx?: readonly number[], vecyp?: readonly number[]): this;
element(type: "zeroLengthSection", eleTag: number, eleNodes: readonly number[], secTag: number, orient?: "-orient", vecx?: readonly number[], vecyp?: readonly number[], doRayleigh?: "-doRayleigh", rFlag?: number): this;
element(type: 'Truss', eleTag: number, iNode: number, jNode: number, area: number, matTag: number, options?: readonly OpenSeesPyArgument[]): this;
element(type: 'truss', eleTag: number, iNode: number, jNode: number, area: number, matTag: number, options?: readonly OpenSeesPyArgument[]): this;
element(type: 'corotTruss', eleTag: number, iNode: number, jNode: number, area: number, matTag: number, options?: readonly OpenSeesPyArgument[]): this;
element(type: 'dispBeamColumn', eleTag: number, iNode: number, jNode: number, transfTag: number, integrationTag: number, options?: readonly OpenSeesPyArgument[]): this;
element(type: 'elasticBeamColumn', eleTag: number, iNode: number, jNode: number, area: number, elasticModulus: number, iz: number, transfTag: number, options?: ElasticBeamColumn2DOptions): this;
element(type: 'elasticBeamColumn', eleTag: number, iNode: number, jNode: number, sectionTag: number, transfTag: number, options?: ElasticBeamColumn2DOptions): this;
element(type: 'elasticBeamColumn', eleTag: number, iNode: number, jNode: number, area: number, elasticModulus: number, shearModulus: number, torsionalConstant: number, iy: number, iz: number, transfTag: number, options?: ElasticBeamColumn3DOptions): this;
element(type: 'elasticBeamColumn', eleTag: number, iNode: number, jNode: number, sectionTag: number, transfTag: number, options?: ElasticBeamColumn3DOptions): this;
element(type: 'forceBeamColumn', eleTag: number, iNode: number, jNode: number, transfTag: number, integrationTag: number, options?: readonly OpenSeesPyArgument[]): this;
element(type: 'zeroLength', eleTag: number, iNode: number, jNode: number, matFlag: '-mat', matTags: readonly number[], dirFlag: '-dir', directions: readonly number[], options?: readonly OpenSeesPyArgument[]): this;
```

### `equalDOF`

OpenSees: `equalDOF(rNodeTag, cNodeTag, *dofs)`

```ts
equalDOF(retainedNode: number, constrainedNode: number, dofs: readonly number[]): this;
```

### `equalDOF_Mixed`

OpenSees: `equalDOF_Mixed(rNodeTag, cNodeTag, numDOF, *rcdofs)`

```ts
equalDOF_Mixed(rNodeTag: number, cNodeTag: number, numDOF: number, rcdofs?: readonly number[]): this;
```

### `equationConstraint`

```ts
equationConstraint(args?: readonly OpenSeesPyArgument[]): this;
```

### `fiber`

OpenSees: `fiber(yloc, zloc, A, matTag)`

```ts
fiber(yloc: number, zloc: number, A: number, matTag: number): this;
```

### `filter`

```ts
filter(args?: readonly OpenSeesPyArgument[]): this;
```

### `findCurvatures`

```ts
findCurvatures(args?: readonly OpenSeesPyArgument[]): this;
```

### `findDesignPoint`

```ts
findDesignPoint(args?: readonly OpenSeesPyArgument[]): this;
```

### `fix`

OpenSees: `fix(nodeTag, *constrValues)`

```ts
fix(nodeTag: number, constraint1: 0 | 1): this;
fix(nodeTag: number, constraint1: 0 | 1, constraint2: 0 | 1): this;
fix(nodeTag: number, constraint1: 0 | 1, constraint2: 0 | 1, constraint3: 0 | 1): this;
fix(nodeTag: number, constraint1: 0 | 1, constraint2: 0 | 1, constraint3: 0 | 1, constraint4: 0 | 1): this;
fix(nodeTag: number, constraint1: 0 | 1, constraint2: 0 | 1, constraint3: 0 | 1, constraint4: 0 | 1, constraint5: 0 | 1): this;
fix(nodeTag: number, constraint1: 0 | 1, constraint2: 0 | 1, constraint3: 0 | 1, constraint4: 0 | 1, constraint5: 0 | 1, constraint6: 0 | 1): this;
fix(nodeTag: number, constraints: readonly (0 | 1)[]): this;
```

### `fixX`

OpenSees: `fixX(x, *constrValues, '-tol', tol=1e-10)`

```ts
fixX(x: number, constrValues: readonly number[], tol: "-tol", tol2?: number): this;
```

### `fixY`

OpenSees: `fixY(y, *constrValues, '-tol', tol=1e-10)`

```ts
fixY(y: number, constrValues: readonly number[], tol: "-tol", tol2?: number): this;
```

### `fixZ`

OpenSees: `fixZ(z, *constrValues, '-tol', tol=1e-10)`

```ts
fixZ(z: number, constrValues: readonly number[], tol: "-tol", tol2?: number): this;
```

### `frictionModel`

OpenSees: `frictionModel('Coulomb', frnTag, mu)`; `frictionModel(frnType, frnTag, *frnArgs)`; `frictionModel('VelDependent',frnTag,muSlow,muFast,transRate)`; `frictionModel('VelDepMultiLinear',frnTag,'-vel',*velPoints,'-frn',*frnPoints)`; `frictionModel('VelNormalFrcDep',frnTag,aSlow,nSlow,aFast,nFast,alpha0,alpha1,alpha2,maxMuFact)`; `frictionModel('VelPressureDep',frnTag,muSlow,muFast0,A,deltaMu,alpha,transRate)`

```ts
frictionModel(type: "Coulomb", frnTag: number, mu: number): this;
frictionModel(type: "VelDependent", frnTag: number, muSlow: number, muFast: number, transRate: number): this;
frictionModel(type: "VelDepMultiLinear", frnTag: number, vel: "-vel", velPoints: readonly number[], frn: "-frn", frnPoints?: readonly number[]): this;
frictionModel(type: "VelNormalFrcDep", frnTag: number, aSlow: number, nSlow: number, aFast: number, nFast: number, alpha0: number, alpha1: number, alpha2: number, maxMuFact: number): this;
frictionModel(type: "VelPressureDep", frnTag: number, muSlow: number, muFast0: number, A: number, deltaMu: number, alpha: number, transRate: number): this;
```

### `functionEvaluator`

```ts
functionEvaluator(args?: readonly OpenSeesPyArgument[]): this;
```

### `geomTransf`

OpenSees: `geomTransf('Corotational',transfTag,'-jntOffset',*dI,*dJ)`; `geomTransf('Corotational',transfTag,*vecxz)`; `geomTransf(transfType, transfTag, *transfArgs)`; `geomTransf('Linear', transfTag, '-jntOffset', *dI, *dJ)`; `geomTransf('Linear', transfTag, *vecxz, '-jntOffset', *dI, *dJ)`; `geomTransf('PDelta',transfTag,'-jntOffset',*dI,*dJ)`; `geomTransf('PDelta',transfTag,*vecxz,'-jntOffset',*dI,*dJ)`

```ts
geomTransf(type: 'Linear', transfTag: number): this;
geomTransf(type: 'Linear', transfTag: number, jntOffsetFlag: '-jntOffset', jntOffset: readonly [number, number, number, number]): this;
geomTransf(type: 'Linear', transfTag: number, vecxz: readonly [number, number, number]): this;
geomTransf(type: 'Linear', transfTag: number, vecxz: readonly [number, number, number], jntOffsetFlag: '-jntOffset', jntOffset: readonly [number, number, number, number, number, number]): this;
geomTransf(type: 'PDelta', transfTag: number): this;
geomTransf(type: 'PDelta', transfTag: number, jntOffsetFlag: '-jntOffset', jntOffset: readonly [number, number, number, number]): this;
geomTransf(type: 'PDelta', transfTag: number, vecxz: readonly [number, number, number]): this;
geomTransf(type: 'PDelta', transfTag: number, vecxz: readonly [number, number, number], jntOffsetFlag: '-jntOffset', jntOffset: readonly [number, number, number, number, number, number]): this;
geomTransf(type: 'Corotational', transfTag: number): this;
geomTransf(type: 'Corotational', transfTag: number, jntOffsetFlag: '-jntOffset', jntOffset: readonly [number, number, number, number]): this;
geomTransf(type: 'Corotational', transfTag: number, vecxz: readonly [number, number, number]): this;
geomTransf(type: 'Corotational', transfTag: number, vecxz: readonly [number, number, number], jntOffsetFlag: '-jntOffset', jntOffset: readonly [number, number, number, number, number, number]): this;
```

### `getCDF`

```ts
getCDF(args?: readonly OpenSeesPyArgument[]): this;
```

### `getConstrainedDOFs`

OpenSees: `getConstrainedDOFs(nodeTag)`

```ts
getConstrainedDOFs(nodeTag: number): this;
```

### `getConstrainedNodes`

OpenSees: `getConstrainedNodes()`

```ts
getConstrainedNodes(): this;
```

### `getCrdTransfTags`

```ts
getCrdTransfTags(args?: readonly OpenSeesPyArgument[]): this;
```

### `getDampTangent`

```ts
getDampTangent(args?: readonly OpenSeesPyArgument[]): this;
```

### `getEleClassTags`

```ts
getEleClassTags(args?: readonly OpenSeesPyArgument[]): this;
```

### `getEleLoadClassTags`

```ts
getEleLoadClassTags(args?: readonly OpenSeesPyArgument[]): this;
```

### `getEleLoadData`

```ts
getEleLoadData(args?: readonly OpenSeesPyArgument[]): this;
```

### `getEleLoadTags`

```ts
getEleLoadTags(args?: readonly OpenSeesPyArgument[]): this;
```

### `getEleTags`

OpenSees: `getEleTags('-mesh', mtag)`

```ts
getEleTags(type: "-mesh", mtag: number): this;
```

### `getFixedDOFs`

OpenSees: `getFixedDOFs(nodeTag)`

```ts
getFixedDOFs(nodeTag: number): this;
```

### `getFixedNodes`

OpenSees: `getFixedNodes()`

```ts
getFixedNodes(): this;
```

### `getInverseCDF`

```ts
getInverseCDF(args?: readonly OpenSeesPyArgument[]): this;
```

### `getLSFTags`

```ts
getLSFTags(args?: readonly OpenSeesPyArgument[]): this;
```

### `getLoadFactor`

OpenSees: `getLoadFactor(patternTag)`

```ts
getLoadFactor(patternTag: number): this;
```

### `getMean`

```ts
getMean(args?: readonly OpenSeesPyArgument[]): this;
```

### `getNDF`

```ts
getNDF(args?: readonly OpenSeesPyArgument[]): this;
```

### `getNDM`

```ts
getNDM(args?: readonly OpenSeesPyArgument[]): this;
```

### `getNP`

OpenSees: `getNP()`

```ts
getNP(): this;
```

### `getNodeLoadData`

```ts
getNodeLoadData(args?: readonly OpenSeesPyArgument[]): this;
```

### `getNodeLoadTags`

```ts
getNodeLoadTags(args?: readonly OpenSeesPyArgument[]): this;
```

### `getNodeTags`

OpenSees: `getNodeTags('-mesh', mtag)`

```ts
getNodeTags(type: "-mesh", mtag: number): this;
```

### `getNodeTemperature`

```ts
getNodeTemperature(args?: readonly OpenSeesPyArgument[]): this;
```

### `getNumElements`

```ts
getNumElements(args?: readonly OpenSeesPyArgument[]): this;
```

### `getNumThreads`

OpenSees: `getNumThreads()`

```ts
getNumThreads(): this;
```

### `getPDF`

```ts
getPDF(args?: readonly OpenSeesPyArgument[]): this;
```

### `getPID`

OpenSees: `getPID()`

```ts
getPID(): this;
```

### `getParamTags`

OpenSees: `getParamTags()`

```ts
getParamTags(): this;
```

### `getParamValue`

OpenSees: `getParamValue(tag)`

```ts
getParamValue(tag: number): this;
```

### `getPatterns`

```ts
getPatterns(args?: readonly OpenSeesPyArgument[]): this;
```

### `getRVParamTag`

```ts
getRVParamTag(args?: readonly OpenSeesPyArgument[]): this;
```

### `getRVTags`

```ts
getRVTags(args?: readonly OpenSeesPyArgument[]): this;
```

### `getRVValue`

```ts
getRVValue(args?: readonly OpenSeesPyArgument[]): this;
```

### `getRetainedDOFs`

OpenSees: `getRetainedDOFs(nodeTag)`

```ts
getRetainedDOFs(nodeTag: number): this;
```

### `getRetainedNodes`

OpenSees: `getRetainedNodes(nodeTag=None)`

```ts
getRetainedNodes(nodeTag?: number): this;
```

### `getStdv`

```ts
getStdv(args?: readonly OpenSeesPyArgument[]): this;
```

### `getStrain`

```ts
getStrain(args?: readonly OpenSeesPyArgument[]): this;
```

### `getStress`

```ts
getStress(args?: readonly OpenSeesPyArgument[]): this;
```

### `getTangent`

```ts
getTangent(args?: readonly OpenSeesPyArgument[]): this;
```

### `getTime`

OpenSees: `getTime()`

```ts
getTime(): this;
```

### `gradPerformanceFunction`

```ts
gradPerformanceFunction(args?: readonly OpenSeesPyArgument[]): this;
```

### `gradientEvaluator`

```ts
gradientEvaluator(args?: readonly OpenSeesPyArgument[]): this;
```

### `groundMotion`

OpenSees: `groundMotion(gmTag,'Plain','-disp',dispSeriesTag,'-vel',velSeriesTag,'-accel',accelSeriesTag,'-int',tsInt='Trapezoidal','-fact',factor=1.0)`; `groundMotion(gmTag,'Interpolated',*gmTags,'-fact',facts)`

```ts
groundMotion(gmTag: number, Plain: "Plain", disp: "-disp", dispSeriesTag: number, vel: "-vel", velSeriesTag: number, accel: "-accel", accelSeriesTag: number, int: "-int", tsInt: string | undefined, fact: "-fact", factor?: number): this;
groundMotion(gmTag: number, Interpolated: "Interpolated", gmTags: readonly number[], fact: "-fact", facts: readonly number[]): this;
```

### `hystereticBackbone`

OpenSees: `hystereticBackbone('Arctangent', backboneTag, K1, gamma, alpha)`; `hystereticBackbone('Bilinear', backboneTag, e1, s1, e2, s2)`; `hystereticBackbone('CementedSoil', backboneTag, pM, pU, Kpy, z, b)`; `hystereticBackbone('LiquefiedSand', backboneTag, X, D, kN, m)`; `hystereticBackbone('Mander', backboneTag, fc, epsc, E)`; `hystereticBackbone('Material', backboneTag, matTag, '-compression')`; `hystereticBackbone('Multilinear', backboneTag, e1, s1, e2, s2, ...)`; `hystereticBackbone('ReeseStiffClayAboveWS', backboneTag, pu, y50)`; `hystereticBackbone('ReeseStiffClayBelowWS', backboneTag, Esi, y50, As, Pc)`; `hystereticBackbone('Trilinear', backboneTag, e1, s1, e2, s2, e3, s3)`; `hystereticBackbone('VuggyLimestone', backboneTag, b, su)`; `hystereticBackbone('WeakRock', backboneTag, Kir, pur, yrm)`

```ts
hystereticBackbone(type: "Arctangent", backboneTag: number, K1: number, gamma: number, alpha: number): this;
hystereticBackbone(type: "Bilinear", backboneTag: number, e1: number, s1: number, e2: number, s2: number): this;
hystereticBackbone(type: "CementedSoil", backboneTag: number, pM: number, pU: number, Kpy: number, z: number, b: number): this;
hystereticBackbone(type: "LiquefiedSand", backboneTag: number, X: number, D: number, kN: number, m: number): this;
hystereticBackbone(type: "Mander", backboneTag: number, fc: number, epsc: number, E: number): this;
hystereticBackbone(type: "Material", backboneTag: number, matTag: number, compression: "-compression"): this;
hystereticBackbone(type: "Multilinear", backboneTag: number, e1: number, s1: number, e2: number, s2: number, arg7: number): this;
hystereticBackbone(type: "ReeseStiffClayAboveWS", backboneTag: number, pu: number, y50: number): this;
hystereticBackbone(type: "ReeseStiffClayBelowWS", backboneTag: number, Esi: number, y50: number, As: number, Pc: number): this;
hystereticBackbone(type: "Trilinear", backboneTag: number, e1: number, s1: number, e2: number, s2: number, e3: number, s3: number): this;
hystereticBackbone(type: "VuggyLimestone", backboneTag: number, b: number, su: number): this;
hystereticBackbone(type: "WeakRock", backboneTag: number, Kir: number, pur: number, yrm: number): this;
```

### `imposedMotion`

OpenSees: `imposedMotion(nodeTag, dof, gmTag)`

```ts
imposedMotion(nodeTag: number, dof: number, gmTag: number): this;
```

### `imposedSupportMotion`

```ts
imposedSupportMotion(args?: readonly OpenSeesPyArgument[]): this;
```

### `initialize`

```ts
initialize(args?: readonly OpenSeesPyArgument[]): this;
```

### `integrator`

OpenSees: `integrator('ArcLength',s,alpha)`; `integrator('CentralDifference')`; `integrator('DisplacementControl',nodeTag,dof,incr,numIter=1,dUmin=incr,dUmax=incr)`; `integrator('ExplicitDifference')`; `integrator('GeneralizedAlpha',alphaM,alphaF,gamma=0.5+alphaM-alphaF,beta=(1+alphaM-alphaF)^2/4)`; `integrator('HHT',alpha,gamma=1.5-alpha,beta=(2-alpha)^2/4)`; `integrator(intType, *intArgs)`; `integrator('LoadControl',incr,numIter=1,minIncr=incr,maxIncr=incr)`; `integrator('MinUnbalDispNorm',dlambda1,Jd=1,minLambda=dlambda1,maxLambda=dlambda1,det=False)`; `integrator('Newmark',gamma,beta,'-form', form)`; `integrator('ParallelDisplacementControl',nodeTag,dof,incr,numIter=1,dUmin=incr,dUmax=incr)`; `integrator('PFEM')`; `integrator('TRBDF2')`

```ts
integrator(type: "ArcLength", s: number, alpha: number): this;
integrator(type: "CentralDifference"): this;
integrator(type: "DisplacementControl", nodeTag: number, dof: number, incr: number, numIter?: number, dUmin?: number, dUmax?: number): this;
integrator(type: "ExplicitDifference"): this;
integrator(type: "GeneralizedAlpha", alphaM: number, alphaF: number, gamma?: number, beta?: number): this;
integrator(type: "HHT", alpha: number, gamma?: number, beta?: number): this;
integrator(type: "LoadControl", incr: number, numIter?: number, minIncr?: number, maxIncr?: number): this;
integrator(type: "MinUnbalDispNorm", dlambda1: number, Jd?: number, minLambda?: number, maxLambda?: number, det?: boolean): this;
integrator(type: "Newmark", gamma: number, beta: number, form: "-form", form2: string): this;
integrator(type: "ParallelDisplacementControl", nodeTag: number, dof: number, incr: number, numIter?: number, dUmin?: number, dUmax?: number): this;
integrator(type: "PFEM"): this;
integrator(type: "TRBDF2"): this;
```

### `layer`

OpenSees: `layer(type, *args)`; `layer('straight', matTag,numFiber,areaFiber,*start,*end)`; `layer('circ', matTag,numFiber,areaFiber,*center,radius,*ang=[0.0,360.0-360/numFiber])`; `layer('rect', matTag, numFiberY, numFiberZ, areaFiber, *center, distY, distZ)`

```ts
layer(type: "straight", matTag: number, numFiber: number, areaFiber: number, start: readonly number[], end?: readonly number[]): this;
layer(type: "circ", matTag: number, numFiber: number, areaFiber: number, center: readonly number[], radius: number, ang?: readonly number[]): this;
layer(type: "rect", matTag: number, numFiberY: number, numFiberZ: number, areaFiber: number, center: readonly number[], distY: number, distZ: number): this;
layer(type: string, args?: readonly number[]): this;
```

### `limitCurve`

```ts
limitCurve(args?: readonly OpenSeesPyArgument[]): this;
```

### `load`

OpenSees: `load(nodeTag, *loadValues)`

```ts
load(nodeTag: number, loadValue1: number): this;
load(nodeTag: number, loadValue1: number, loadValue2: number): this;
load(nodeTag: number, loadValue1: number, loadValue2: number, loadValue3: number): this;
load(nodeTag: number, loadValue1: number, loadValue2: number, loadValue3: number, loadValue4: number): this;
load(nodeTag: number, loadValue1: number, loadValue2: number, loadValue3: number, loadValue4: number, loadValue5: number): this;
load(nodeTag: number, loadValue1: number, loadValue2: number, loadValue3: number, loadValue4: number, loadValue5: number, loadValue6: number): this;
load(nodeTag: number, loadValues: readonly number[]): this;
```

### `loadConst`

OpenSees: `loadConst('-time', pseudoTime)`

```ts
loadConst(type: "-time", pseudoTime: number): this;
```

### `logFile`

OpenSees: `logFile(filename,'-append','-noEcho')`

```ts
logFile(filename: string, append: "-append", noEcho: "-noEcho"): this;
```

### `mass`

OpenSees: `mass(nodeTag, *massValues)`

```ts
mass(nodeTag: number, massValue1: number): this;
mass(nodeTag: number, massValue1: number, massValue2: number): this;
mass(nodeTag: number, massValue1: number, massValue2: number, massValue3: number): this;
mass(nodeTag: number, massValue1: number, massValue2: number, massValue3: number, massValue4: number): this;
mass(nodeTag: number, massValue1: number, massValue2: number, massValue3: number, massValue4: number, massValue5: number): this;
mass(nodeTag: number, massValue1: number, massValue2: number, massValue3: number, massValue4: number, massValue5: number, massValue6: number): this;
mass(nodeTag: number, massValues: readonly number[]): this;
```

### `meritFunctionCheck`

```ts
meritFunctionCheck(args?: readonly OpenSeesPyArgument[]): this;
```

### `mesh`

OpenSees: `mesh('bg',basicsize,*lower,*upper,'-tol',tol,'-meshtol',meshtol,'-wave',wavefilename,numl,*locations,'-numsub',numsub,'-structure',id,numnodes,*snodes)`; `mesh('line',tag,numnodes,*ndtags,id,ndf,meshsize,eleType='',*eleArgs=[])`; `mesh(type,tag,*args)`; `mesh('part',tag,type,*pArgs,eleType='',*eleArgs=[], '-vel', *vel0, '-pressure', p0)`; `mesh('quad',tag,numlines,*ltags,id,ndf,meshsize,eleType='',*eleArgs=[])`; `mesh('tet',tag,nummesh,*mtags,id,ndf,meshsize,eleType='',*eleArgs=[])`; `mesh('tri',tag,numlines,*ltags,id,ndf,meshsize,eleType='',*eleArgs=[])`

```ts
mesh(type: "bg", basicsize: number, lower: readonly number[], upper: readonly number[], tol: "-tol", tol2: number, meshtol: "-meshtol", meshtol2: number, wave: "-wave", wavefilename: string, numl: number, locations: readonly number[], numsub: "-numsub", numsub2: number, structure: "-structure", id: number, numnodes: number, snodes?: readonly number[]): this;
mesh(type: "line", tag: number, numnodes: number, ndtags: readonly number[], id: number, ndf: number, meshsize: number, eleType?: string, eleArgs?: readonly OpenSeesPyArgument[]): this;
mesh(type: "part", tag: number, type2: string, pArgs: readonly number[], eleType: string | undefined, eleArgs: readonly OpenSeesPyArgument[] | undefined, vel: "-vel", vel0: readonly number[], pressure: "-pressure", p0: number): this;
mesh(type: "quad", tag: number, numlines: number, ltags: readonly number[], id: number, ndf: number, meshsize: number, eleType?: string, eleArgs?: readonly OpenSeesPyArgument[]): this;
mesh(type: "tet", tag: number, nummesh: number, mtags: readonly number[], id: number, ndf: number, meshsize: number, eleType?: string, eleArgs?: readonly OpenSeesPyArgument[]): this;
mesh(type: "tri", tag: number, numlines: number, ltags: readonly number[], id: number, ndf: number, meshsize: number, eleType?: string, eleArgs?: readonly OpenSeesPyArgument[]): this;
mesh(type: string, tag: number, args?: readonly number[]): this;
```

### `metaData`

```ts
metaData(args?: readonly OpenSeesPyArgument[]): this;
```

### `modalDamping`

OpenSees: `modalDamping(factor)`

```ts
modalDamping(factor: number): this;
```

### `modalDampingQ`

```ts
modalDampingQ(args?: readonly OpenSeesPyArgument[]): this;
```

### `modalProperties`

OpenSees: `modalProperties(<'-print'>, <'-file', reportFileName>, <'-unorm'>, <'-return'>)`

```ts
modalProperties(): this;
modalProperties(printFlag: '-print'): this;
modalProperties(fileFlag: '-file', reportFileName: string): this;
modalProperties(unormFlag: '-unorm'): this;
modalProperties(fileFlag: '-file', reportFileName: string, unormFlag: '-unorm'): this;
modalProperties(printFlag: '-print', fileFlag: '-file', reportFileName: string, unormFlag?: '-unorm'): this;
modalProperties(returnFlag: '-return'): this;
```

### `model`

OpenSees: `model('basic', '-ndm', ndm, '-ndf', ndf=ndm*(ndm+1)/2)`

```ts
model(builder: OpenSeesModelBuilderType, ndmFlag: '-ndm', ndm: 1 | 2 | 3): this;
model(builder: OpenSeesModelBuilderType, ndmFlag: '-ndm', ndm: 1 | 2 | 3, ndfFlag: '-ndf', ndf: number): this;
```

### `modulatingFunction`

```ts
modulatingFunction(args?: readonly OpenSeesPyArgument[]): this;
```

### `nDMaterial`

OpenSees: `nDMaterial('AcousticMedium', matTag, K, rho)`; `nDMaterial('BoundingCamClay', matTag, massDensity, C, bulkMod, OCR, mu_o, alpha, lambda, h, m)`; `nDMaterial('ContactMaterial2D', matTag, mu, G, c, t)`; `nDMaterial('ContactMaterial3D', matTag, mu, G, c, t)`; `nDMaterial('CycLiqCP', matTag, G0, kappa, h, Mfc, dre1, Mdc, dre2, rdr, alpha, dir, ein, rho)`; `nDMaterial('CycLiqCPSP', matTag, G0, kappa, h, M, dre1, dre2, rdr, alpha, dir, lambdac, ksi, e0, np, nd, ein, rho)`; `nDMaterial('Damage2p', matTag, fcc, '-fct', fct, '-E', E, '-ni', ni, '-Gt', Gt, '-Gc', Gc, '-rho_bar', rho_bar, '-H', H, '-theta', theta, '-tangent', tangent)`; `nDMaterial('DruckerPrager', matTag, K, G, sigmaY, rho, rhoBar, Kinf, Ko, delta1, delta2, H, theta, density, atmPressure=101e3)`; `nDMaterial('ElasticIsotropic', matTag, E, nu, rho=0.0)`; `nDMaterial('ElasticOrthotropic', matTag, Ex, Ey, Ez, nu_xy, nu_yz, nu_zx, Gxy, Gyz, Gzx, rho=0.0)`; `nDMaterial('FluidSolidPorous', matTag, nd, soilMatTag, combinedBulkModul, pa=101.0)`; `nDMaterial('FSAM', matTag, rho, sXTag, sYTag, concTag, rouX, rouY, nu, alfadow)`; `nDMaterial('InitialStateAnalysisWrapper', matTag, nDMatTag, nDim)`; `nDMaterial('InitStrainNDMaterial', matTag, otherTag, initStrain, nDim)`; `nDMaterial('InitStressNDMaterial', matTag, otherTag, initStress, nDim)`; `nDMaterial('J2Plasticity', matTag, K, G, sig0, sigInf, delta, H)`; `nDMaterial('ManzariDafalias', matTag, G0, nu, e_init, Mc, c, lambda_c, e0, ksi, P_atm, m, h0, ch, nb, A0, nd, z_max, cz, Den)`; `nDMaterial('MultiaxialCyclicPlasticity', matTag, rho, K, G, Su, Ho, h, m, beta, KCoeff)`; `nDMaterial(matType, matTag, *matArgs)`; `nDMaterial('PlaneStrain', matTag, mat3DTag)`; `nDMaterial('PlaneStress', matTag, mat3DTag)`; `nDMaterial('PlaneStressUserMaterial', matTag, nstatevs, nprops, fc, ft, fcu, epsc0, epscu, epstu, stc)`; `nDMaterial('PlasticDamageConcretePlaneStress', matTag, E, nu, ft, fc, <beta, Ap, An, Bn>)`; `nDMaterial('PlateFiber', matTag, threeDTag)`; `nDMaterial('PlateFromPlaneStress', matTag, pre_def_matTag, OutofPlaneModulus)`; `nDMaterial('PlateRebar', matTag, pre_def_matTag, sita)`; `nDMaterial('PM4Sand', matTag, D_r, G_o, h_po, Den, P_atm, h_o, e_max, e_min, n_b, n_d, A_do, z_max, c_z, c_e, phi_cv, nu, g_degr, c_dr, c_kaf, Q_bolt, R_bolt, m_par, F_sed, p_sed)`; `nDMaterial('PM4Silt', matTag, S_u, Su_Rat, G_o, h_po, Den <Su_factor, Patm, nu, nG, h0, eInit, lambda, phicv, nb_wet, nb_dry, nd, Ado, ru_max, zmax, cz, ce, Cgd, ckaf, m_m, CG_consol>)`; `nDMaterial('PressureDependMultiYield', matTag, nd, rho, refShearModul, refBulkModul, frictionAng, peakShearStra, refPress, pressDependCoe, PTAng, contrac, *dilat, *liquefac, noYieldSurf=20.0, *yieldSurf=[], e=0.6, *params=[0.9, 0.02, 0.7, 101.0], c=0.3)`; `nDMaterial('PressureDependMultiYield02', matTag, nd, rho, refShearModul, refBulkModul, frictionAng, peakShearStra, refPress, pressDependCoe, PTAng, contrac[0], contrac[2], dilat[0], dilat[2], noYieldSurf=20.0, *yieldSurf=[], contrac[1]=5.0, dilat[1]=3.0, *liquefac=[1.0,0.0],e=0.6, *params=[0.9, 0.02, 0.7, 101.0], c=0.1)`; `nDMaterial('PressureDependMultiYield03', matTag, nd, rho, refShearModul, refBulkModul, frictionAng, peakShearStra, refPress, pressDependCoe, PTAng, ca, cb, cc, cd, ce, da, db, dc, noYieldSurf=20.0, *yieldSurf=[], liquefac1=1, liquefac2=0., pa=101, s0=1.73)`; `nDMaterial('PressureIndependMultiYield', matTag, nd, rho, refShearModul, refBulkModul, cohesi, peakShearStra, frictionAng, refPress, pressDependCoe, noYieldSurf=20, *yieldSurf)`; `nDMaterial('stressDensity', matTag, mDen, eNot, A, n, nu, a1, b1, a2, b2, a3, b3, fd, muNot, muCyc, sc, M, patm, *ssls, hsl, p1)`

```ts
nDMaterial(type: "AcousticMedium", matTag: number, K: number, rho: number): this;
nDMaterial(type: "BoundingCamClay", matTag: number, massDensity: number, C: number, bulkMod: number, OCR: number, mu_o: number, alpha: number, lambda: number, h: number, m: number): this;
nDMaterial(type: "ContactMaterial2D", matTag: number, mu: number, G: number, c: number, t: number): this;
nDMaterial(type: "ContactMaterial3D", matTag: number, mu: number, G: number, c: number, t: number): this;
nDMaterial(type: "CycLiqCP", matTag: number, G0: number, kappa: number, h: number, Mfc: number, dre1: number, Mdc: number, dre2: number, rdr: number, alpha: number, dir: number, ein: number, rho: number): this;
nDMaterial(type: "CycLiqCPSP", matTag: number, G0: number, kappa: number, h: number, M: number, dre1: number, dre2: number, rdr: number, alpha: number, dir: number, lambdac: number, ksi: number, e0: number, np: number, nd: number, ein: number, rho: number): this;
nDMaterial(type: "Damage2p", matTag: number, fcc: number, fct: "-fct", fct2: number, E: "-E", E2: number, ni: "-ni", ni2: number, Gt: "-Gt", Gt2: number, Gc: "-Gc", Gc2: number, rho_bar: "-rho_bar", rho_bar2: number, H: "-H", H2: number, theta: "-theta", theta2: number, tangent: "-tangent", tangent2: number): this;
nDMaterial(type: "DruckerPrager", matTag: number, K: number, G: number, sigmaY: number, rho: number, rhoBar: number, Kinf: number, Ko: number, delta1: number, delta2: number, H: number, theta: number, density: number, atmPressure?: number): this;
nDMaterial(type: "ElasticIsotropic", matTag: number, E: number, nu: number, rho?: number): this;
nDMaterial(type: "ElasticOrthotropic", matTag: number, Ex: number, Ey: number, Ez: number, nu_xy: number, nu_yz: number, nu_zx: number, Gxy: number, Gyz: number, Gzx: number, rho?: number): this;
nDMaterial(type: "FluidSolidPorous", matTag: number, nd: number, soilMatTag: number, combinedBulkModul: number, pa?: number): this;
nDMaterial(type: "FSAM", matTag: number, rho: number, sXTag: number, sYTag: number, concTag: number, rouX: number, rouY: number, nu: number, alfadow: number): this;
nDMaterial(type: "InitialStateAnalysisWrapper", matTag: number, nDMatTag: number, nDim: number): this;
nDMaterial(type: "InitStrainNDMaterial", matTag: number, otherTag: number, initStrain: number, nDim: number): this;
nDMaterial(type: "InitStressNDMaterial", matTag: number, otherTag: number, initStress: number, nDim: number): this;
nDMaterial(type: "J2Plasticity", matTag: number, K: number, G: number, sig0: number, sigInf: number, delta: number, H: number): this;
nDMaterial(type: "ManzariDafalias", matTag: number, G0: number, nu: number, e_init: number, Mc: number, c: number, lambda_c: number, e0: number, ksi: number, P_atm: number, m: number, h0: number, ch: number, nb: number, A0: number, nd: number, z_max: number, cz: number, Den: number): this;
nDMaterial(type: "MultiaxialCyclicPlasticity", matTag: number, rho: number, K: number, G: number, Su: number, Ho: number, h: number, m: number, beta: number, KCoeff: number): this;
nDMaterial(type: "PlaneStrain", matTag: number, mat3DTag: number): this;
nDMaterial(type: "PlaneStress", matTag: number, mat3DTag: number): this;
nDMaterial(type: "PlaneStressUserMaterial", matTag: number, nstatevs: number, nprops: number, fc: number, ft: number, fcu: number, epsc0: number, epscu: number, epstu: number, stc: number): this;
nDMaterial(type: "PlasticDamageConcretePlaneStress", matTag: number, E: number, nu: number, ft: number, fc: number, beta?: number, Ap?: number, An?: number, Bn?: number): this;
nDMaterial(type: "PlateFiber", matTag: number, threeDTag: number): this;
nDMaterial(type: "PlateFromPlaneStress", matTag: number, pre_def_matTag: number, OutofPlaneModulus: number): this;
nDMaterial(type: "PlateRebar", matTag: number, pre_def_matTag: number, sita: number): this;
nDMaterial(type: "PM4Sand", matTag: number, D_r: number, G_o: number, h_po: number, Den: number, P_atm: number, h_o: number, e_max: number, e_min: number, n_b: number, n_d: number, A_do: number, z_max: number, c_z: number, c_e: number, phi_cv: number, nu: number, g_degr: number, c_dr: number, c_kaf: number, Q_bolt: number, R_bolt: number, m_par: number, F_sed: number, p_sed: number): this;
nDMaterial(type: "PM4Silt", matTag: number, S_u: number, Su_Rat: number, G_o: number, h_po: number, Den_Su_factor_Patm_nu_nG_h0_eInit_lambda_phicv_nb_wet_nb_dry_nd_Ado_ru_max_zmax_cz_ce_Cgd_ckaf_m_m_CG_consol: number): this;
nDMaterial(type: "PressureDependMultiYield", matTag: number, nd: number, rho: number, refShearModul: number, refBulkModul: number, frictionAng: number, peakShearStra: number, refPress: number, pressDependCoe: number, PTAng: number, contrac: number, dilat: readonly number[], liquefac: readonly number[], noYieldSurf?: number, yieldSurf?: readonly number[], e?: number, params?: readonly number[], c?: number): this;
nDMaterial(type: "PressureDependMultiYield02", matTag: number, nd: number, rho: number, refShearModul: number, refBulkModul: number, frictionAng: number, peakShearStra: number, refPress: number, pressDependCoe: number, PTAng: number, contrac_0: number, contrac_2: number, dilat_0: number, dilat_2: number, noYieldSurf?: number, yieldSurf?: readonly number[], contrac_1?: number, dilat_1?: number, liquefac?: readonly number[], e?: number, params?: readonly number[], c?: number): this;
nDMaterial(type: "PressureDependMultiYield03", matTag: number, nd: number, rho: number, refShearModul: number, refBulkModul: number, frictionAng: number, peakShearStra: number, refPress: number, pressDependCoe: number, PTAng: number, ca: number, cb: number, cc: number, cd: number, ce: number, da: number, db: number, dc: number, noYieldSurf?: number, yieldSurf?: readonly number[], liquefac1?: number, liquefac2?: number, pa?: number, s0?: number): this;
nDMaterial(type: "PressureIndependMultiYield", matTag: number, nd: number, rho: number, refShearModul: number, refBulkModul: number, cohesi: number, peakShearStra: number, frictionAng: number, refPress: number, pressDependCoe: number, noYieldSurf?: number, yieldSurf?: readonly number[]): this;
nDMaterial(type: "stressDensity", matTag: number, mDen: number, eNot: number, A: number, n: number, nu: number, a1: number, b1: number, a2: number, b2: number, a3: number, b3: number, fd: number, muNot: number, muCyc: number, sc: number, M: number, patm: number, ssls: readonly number[], hsl: number, p1: number): this;
```

### `node`

OpenSees: `node(nodeTag, *crds, , '-ndf', ndf, '-mass', *mass, '-disp', *disp, '-vel', *vel, '-accel', *accel)`

```ts
node(nodeTag: number, x: number): this;
node(nodeTag: number, x: number, ndfFlag: '-ndf', ndf: number): this;
node(nodeTag: number, x: number, massFlag: '-mass', mass: readonly number[]): this;
node(nodeTag: number, x: number, ndfFlag: '-ndf', ndf: number, massFlag: '-mass', mass: readonly number[]): this;
node(nodeTag: number, x: number, dispFlag: '-disp', displacement: readonly number[]): this;
node(nodeTag: number, x: number, ndfFlag: '-ndf', ndf: number, dispFlag: '-disp', displacement: readonly number[]): this;
node(nodeTag: number, x: number, massFlag: '-mass', mass: readonly number[], dispFlag: '-disp', displacement: readonly number[]): this;
node(nodeTag: number, x: number, ndfFlag: '-ndf', ndf: number, massFlag: '-mass', mass: readonly number[], dispFlag: '-disp', displacement: readonly number[]): this;
node(nodeTag: number, x: number, velFlag: '-vel', velocity: readonly number[]): this;
node(nodeTag: number, x: number, ndfFlag: '-ndf', ndf: number, velFlag: '-vel', velocity: readonly number[]): this;
node(nodeTag: number, x: number, massFlag: '-mass', mass: readonly number[], velFlag: '-vel', velocity: readonly number[]): this;
node(nodeTag: number, x: number, ndfFlag: '-ndf', ndf: number, massFlag: '-mass', mass: readonly number[], velFlag: '-vel', velocity: readonly number[]): this;
node(nodeTag: number, x: number, dispFlag: '-disp', displacement: readonly number[], velFlag: '-vel', velocity: readonly number[]): this;
node(nodeTag: number, x: number, ndfFlag: '-ndf', ndf: number, dispFlag: '-disp', displacement: readonly number[], velFlag: '-vel', velocity: readonly number[]): this;
node(nodeTag: number, x: number, massFlag: '-mass', mass: readonly number[], dispFlag: '-disp', displacement: readonly number[], velFlag: '-vel', velocity: readonly number[]): this;
node(nodeTag: number, x: number, ndfFlag: '-ndf', ndf: number, massFlag: '-mass', mass: readonly number[], dispFlag: '-disp', displacement: readonly number[], velFlag: '-vel', velocity: readonly number[]): this;
node(nodeTag: number, x: number, accelFlag: '-accel', acceleration: readonly number[]): this;
node(nodeTag: number, x: number, ndfFlag: '-ndf', ndf: number, accelFlag: '-accel', acceleration: readonly number[]): this;
node(nodeTag: number, x: number, massFlag: '-mass', mass: readonly number[], accelFlag: '-accel', acceleration: readonly number[]): this;
node(nodeTag: number, x: number, ndfFlag: '-ndf', ndf: number, massFlag: '-mass', mass: readonly number[], accelFlag: '-accel', acceleration: readonly number[]): this;
node(nodeTag: number, x: number, dispFlag: '-disp', displacement: readonly number[], accelFlag: '-accel', acceleration: readonly number[]): this;
node(nodeTag: number, x: number, ndfFlag: '-ndf', ndf: number, dispFlag: '-disp', displacement: readonly number[], accelFlag: '-accel', acceleration: readonly number[]): this;
node(nodeTag: number, x: number, massFlag: '-mass', mass: readonly number[], dispFlag: '-disp', displacement: readonly number[], accelFlag: '-accel', acceleration: readonly number[]): this;
node(nodeTag: number, x: number, ndfFlag: '-ndf', ndf: number, massFlag: '-mass', mass: readonly number[], dispFlag: '-disp', displacement: readonly number[], accelFlag: '-accel', acceleration: readonly number[]): this;
node(nodeTag: number, x: number, velFlag: '-vel', velocity: readonly number[], accelFlag: '-accel', acceleration: readonly number[]): this;
node(nodeTag: number, x: number, ndfFlag: '-ndf', ndf: number, velFlag: '-vel', velocity: readonly number[], accelFlag: '-accel', acceleration: readonly number[]): this;
node(nodeTag: number, x: number, massFlag: '-mass', mass: readonly number[], velFlag: '-vel', velocity: readonly number[], accelFlag: '-accel', acceleration: readonly number[]): this;
node(nodeTag: number, x: number, ndfFlag: '-ndf', ndf: number, massFlag: '-mass', mass: readonly number[], velFlag: '-vel', velocity: readonly number[], accelFlag: '-accel', acceleration: readonly number[]): this;
node(nodeTag: number, x: number, dispFlag: '-disp', displacement: readonly number[], velFlag: '-vel', velocity: readonly number[], accelFlag: '-accel', acceleration: readonly number[]): this;
node(nodeTag: number, x: number, ndfFlag: '-ndf', ndf: number, dispFlag: '-disp', displacement: readonly number[], velFlag: '-vel', velocity: readonly number[], accelFlag: '-accel', acceleration: readonly number[]): this;
node(nodeTag: number, x: number, massFlag: '-mass', mass: readonly number[], dispFlag: '-disp', displacement: readonly number[], velFlag: '-vel', velocity: readonly number[], accelFlag: '-accel', acceleration: readonly number[]): this;
node(nodeTag: number, x: number, ndfFlag: '-ndf', ndf: number, massFlag: '-mass', mass: readonly number[], dispFlag: '-disp', displacement: readonly number[], velFlag: '-vel', velocity: readonly number[], accelFlag: '-accel', acceleration: readonly number[]): this;
node(nodeTag: number, x: number, y: number): this;
node(nodeTag: number, x: number, y: number, ndfFlag: '-ndf', ndf: number): this;
node(nodeTag: number, x: number, y: number, massFlag: '-mass', mass: readonly number[]): this;
node(nodeTag: number, x: number, y: number, ndfFlag: '-ndf', ndf: number, massFlag: '-mass', mass: readonly number[]): this;
node(nodeTag: number, x: number, y: number, dispFlag: '-disp', displacement: readonly number[]): this;
node(nodeTag: number, x: number, y: number, ndfFlag: '-ndf', ndf: number, dispFlag: '-disp', displacement: readonly number[]): this;
node(nodeTag: number, x: number, y: number, massFlag: '-mass', mass: readonly number[], dispFlag: '-disp', displacement: readonly number[]): this;
node(nodeTag: number, x: number, y: number, ndfFlag: '-ndf', ndf: number, massFlag: '-mass', mass: readonly number[], dispFlag: '-disp', displacement: readonly number[]): this;
node(nodeTag: number, x: number, y: number, velFlag: '-vel', velocity: readonly number[]): this;
node(nodeTag: number, x: number, y: number, ndfFlag: '-ndf', ndf: number, velFlag: '-vel', velocity: readonly number[]): this;
node(nodeTag: number, x: number, y: number, massFlag: '-mass', mass: readonly number[], velFlag: '-vel', velocity: readonly number[]): this;
node(nodeTag: number, x: number, y: number, ndfFlag: '-ndf', ndf: number, massFlag: '-mass', mass: readonly number[], velFlag: '-vel', velocity: readonly number[]): this;
node(nodeTag: number, x: number, y: number, dispFlag: '-disp', displacement: readonly number[], velFlag: '-vel', velocity: readonly number[]): this;
node(nodeTag: number, x: number, y: number, ndfFlag: '-ndf', ndf: number, dispFlag: '-disp', displacement: readonly number[], velFlag: '-vel', velocity: readonly number[]): this;
node(nodeTag: number, x: number, y: number, massFlag: '-mass', mass: readonly number[], dispFlag: '-disp', displacement: readonly number[], velFlag: '-vel', velocity: readonly number[]): this;
node(nodeTag: number, x: number, y: number, ndfFlag: '-ndf', ndf: number, massFlag: '-mass', mass: readonly number[], dispFlag: '-disp', displacement: readonly number[], velFlag: '-vel', velocity: readonly number[]): this;
node(nodeTag: number, x: number, y: number, accelFlag: '-accel', acceleration: readonly number[]): this;
node(nodeTag: number, x: number, y: number, ndfFlag: '-ndf', ndf: number, accelFlag: '-accel', acceleration: readonly number[]): this;
node(nodeTag: number, x: number, y: number, massFlag: '-mass', mass: readonly number[], accelFlag: '-accel', acceleration: readonly number[]): this;
node(nodeTag: number, x: number, y: number, ndfFlag: '-ndf', ndf: number, massFlag: '-mass', mass: readonly number[], accelFlag: '-accel', acceleration: readonly number[]): this;
node(nodeTag: number, x: number, y: number, dispFlag: '-disp', displacement: readonly number[], accelFlag: '-accel', acceleration: readonly number[]): this;
node(nodeTag: number, x: number, y: number, ndfFlag: '-ndf', ndf: number, dispFlag: '-disp', displacement: readonly number[], accelFlag: '-accel', acceleration: readonly number[]): this;
node(nodeTag: number, x: number, y: number, massFlag: '-mass', mass: readonly number[], dispFlag: '-disp', displacement: readonly number[], accelFlag: '-accel', acceleration: readonly number[]): this;
node(nodeTag: number, x: number, y: number, ndfFlag: '-ndf', ndf: number, massFlag: '-mass', mass: readonly number[], dispFlag: '-disp', displacement: readonly number[], accelFlag: '-accel', acceleration: readonly number[]): this;
node(nodeTag: number, x: number, y: number, velFlag: '-vel', velocity: readonly number[], accelFlag: '-accel', acceleration: readonly number[]): this;
node(nodeTag: number, x: number, y: number, ndfFlag: '-ndf', ndf: number, velFlag: '-vel', velocity: readonly number[], accelFlag: '-accel', acceleration: readonly number[]): this;
node(nodeTag: number, x: number, y: number, massFlag: '-mass', mass: readonly number[], velFlag: '-vel', velocity: readonly number[], accelFlag: '-accel', acceleration: readonly number[]): this;
node(nodeTag: number, x: number, y: number, ndfFlag: '-ndf', ndf: number, massFlag: '-mass', mass: readonly number[], velFlag: '-vel', velocity: readonly number[], accelFlag: '-accel', acceleration: readonly number[]): this;
node(nodeTag: number, x: number, y: number, dispFlag: '-disp', displacement: readonly number[], velFlag: '-vel', velocity: readonly number[], accelFlag: '-accel', acceleration: readonly number[]): this;
node(nodeTag: number, x: number, y: number, ndfFlag: '-ndf', ndf: number, dispFlag: '-disp', displacement: readonly number[], velFlag: '-vel', velocity: readonly number[], accelFlag: '-accel', acceleration: readonly number[]): this;
node(nodeTag: number, x: number, y: number, massFlag: '-mass', mass: readonly number[], dispFlag: '-disp', displacement: readonly number[], velFlag: '-vel', velocity: readonly number[], accelFlag: '-accel', acceleration: readonly number[]): this;
node(nodeTag: number, x: number, y: number, ndfFlag: '-ndf', ndf: number, massFlag: '-mass', mass: readonly number[], dispFlag: '-disp', displacement: readonly number[], velFlag: '-vel', velocity: readonly number[], accelFlag: '-accel', acceleration: readonly number[]): this;
node(nodeTag: number, x: number, y: number, z: number): this;
node(nodeTag: number, x: number, y: number, z: number, ndfFlag: '-ndf', ndf: number): this;
node(nodeTag: number, x: number, y: number, z: number, massFlag: '-mass', mass: readonly number[]): this;
node(nodeTag: number, x: number, y: number, z: number, ndfFlag: '-ndf', ndf: number, massFlag: '-mass', mass: readonly number[]): this;
node(nodeTag: number, x: number, y: number, z: number, dispFlag: '-disp', displacement: readonly number[]): this;
node(nodeTag: number, x: number, y: number, z: number, ndfFlag: '-ndf', ndf: number, dispFlag: '-disp', displacement: readonly number[]): this;
node(nodeTag: number, x: number, y: number, z: number, massFlag: '-mass', mass: readonly number[], dispFlag: '-disp', displacement: readonly number[]): this;
node(nodeTag: number, x: number, y: number, z: number, ndfFlag: '-ndf', ndf: number, massFlag: '-mass', mass: readonly number[], dispFlag: '-disp', displacement: readonly number[]): this;
node(nodeTag: number, x: number, y: number, z: number, velFlag: '-vel', velocity: readonly number[]): this;
node(nodeTag: number, x: number, y: number, z: number, ndfFlag: '-ndf', ndf: number, velFlag: '-vel', velocity: readonly number[]): this;
node(nodeTag: number, x: number, y: number, z: number, massFlag: '-mass', mass: readonly number[], velFlag: '-vel', velocity: readonly number[]): this;
node(nodeTag: number, x: number, y: number, z: number, ndfFlag: '-ndf', ndf: number, massFlag: '-mass', mass: readonly number[], velFlag: '-vel', velocity: readonly number[]): this;
node(nodeTag: number, x: number, y: number, z: number, dispFlag: '-disp', displacement: readonly number[], velFlag: '-vel', velocity: readonly number[]): this;
node(nodeTag: number, x: number, y: number, z: number, ndfFlag: '-ndf', ndf: number, dispFlag: '-disp', displacement: readonly number[], velFlag: '-vel', velocity: readonly number[]): this;
node(nodeTag: number, x: number, y: number, z: number, massFlag: '-mass', mass: readonly number[], dispFlag: '-disp', displacement: readonly number[], velFlag: '-vel', velocity: readonly number[]): this;
node(nodeTag: number, x: number, y: number, z: number, ndfFlag: '-ndf', ndf: number, massFlag: '-mass', mass: readonly number[], dispFlag: '-disp', displacement: readonly number[], velFlag: '-vel', velocity: readonly number[]): this;
node(nodeTag: number, x: number, y: number, z: number, accelFlag: '-accel', acceleration: readonly number[]): this;
node(nodeTag: number, x: number, y: number, z: number, ndfFlag: '-ndf', ndf: number, accelFlag: '-accel', acceleration: readonly number[]): this;
node(nodeTag: number, x: number, y: number, z: number, massFlag: '-mass', mass: readonly number[], accelFlag: '-accel', acceleration: readonly number[]): this;
node(nodeTag: number, x: number, y: number, z: number, ndfFlag: '-ndf', ndf: number, massFlag: '-mass', mass: readonly number[], accelFlag: '-accel', acceleration: readonly number[]): this;
node(nodeTag: number, x: number, y: number, z: number, dispFlag: '-disp', displacement: readonly number[], accelFlag: '-accel', acceleration: readonly number[]): this;
node(nodeTag: number, x: number, y: number, z: number, ndfFlag: '-ndf', ndf: number, dispFlag: '-disp', displacement: readonly number[], accelFlag: '-accel', acceleration: readonly number[]): this;
node(nodeTag: number, x: number, y: number, z: number, massFlag: '-mass', mass: readonly number[], dispFlag: '-disp', displacement: readonly number[], accelFlag: '-accel', acceleration: readonly number[]): this;
node(nodeTag: number, x: number, y: number, z: number, ndfFlag: '-ndf', ndf: number, massFlag: '-mass', mass: readonly number[], dispFlag: '-disp', displacement: readonly number[], accelFlag: '-accel', acceleration: readonly number[]): this;
node(nodeTag: number, x: number, y: number, z: number, velFlag: '-vel', velocity: readonly number[], accelFlag: '-accel', acceleration: readonly number[]): this;
node(nodeTag: number, x: number, y: number, z: number, ndfFlag: '-ndf', ndf: number, velFlag: '-vel', velocity: readonly number[], accelFlag: '-accel', acceleration: readonly number[]): this;
node(nodeTag: number, x: number, y: number, z: number, massFlag: '-mass', mass: readonly number[], velFlag: '-vel', velocity: readonly number[], accelFlag: '-accel', acceleration: readonly number[]): this;
node(nodeTag: number, x: number, y: number, z: number, ndfFlag: '-ndf', ndf: number, massFlag: '-mass', mass: readonly number[], velFlag: '-vel', velocity: readonly number[], accelFlag: '-accel', acceleration: readonly number[]): this;
node(nodeTag: number, x: number, y: number, z: number, dispFlag: '-disp', displacement: readonly number[], velFlag: '-vel', velocity: readonly number[], accelFlag: '-accel', acceleration: readonly number[]): this;
node(nodeTag: number, x: number, y: number, z: number, ndfFlag: '-ndf', ndf: number, dispFlag: '-disp', displacement: readonly number[], velFlag: '-vel', velocity: readonly number[], accelFlag: '-accel', acceleration: readonly number[]): this;
node(nodeTag: number, x: number, y: number, z: number, massFlag: '-mass', mass: readonly number[], dispFlag: '-disp', displacement: readonly number[], velFlag: '-vel', velocity: readonly number[], accelFlag: '-accel', acceleration: readonly number[]): this;
node(nodeTag: number, x: number, y: number, z: number, ndfFlag: '-ndf', ndf: number, massFlag: '-mass', mass: readonly number[], dispFlag: '-disp', displacement: readonly number[], velFlag: '-vel', velocity: readonly number[], accelFlag: '-accel', acceleration: readonly number[]): this;
```

### `nodeAccel`

OpenSees: `nodeAccel(nodeTag, dof=-1)`

```ts
nodeAccel(nodeTag: number, dof?: number): this;
```

### `nodeBounds`

OpenSees: `nodeBounds()`

```ts
nodeBounds(): this;
```

### `nodeCoord`

OpenSees: `nodeCoord(nodeTag, dim=-1)`

```ts
nodeCoord(nodeTag: number, dim?: number): this;
```

### `nodeDOFs`

OpenSees: `nodeDOFs(nodeTag)`

```ts
nodeDOFs(nodeTag: number): this;
```

### `nodeDisp`

OpenSees: `nodeDisp(nodeTag, dof=-1)`

```ts
nodeDisp(nodeTag: number, dof?: number): this;
```

### `nodeEigenvector`

OpenSees: `nodeEigenvector(nodeTag, eigenvector, dof=-1)`

```ts
nodeEigenvector(nodeTag: number, eigenvector: number, dof?: number): this;
```

### `nodeMass`

OpenSees: `nodeMass(nodeTag, dof=-1)`

```ts
nodeMass(nodeTag: number, dof?: number): this;
```

### `nodePressure`

OpenSees: `nodePressure(nodeTag)`

```ts
nodePressure(nodeTag: number): this;
```

### `nodeReaction`

OpenSees: `nodeReaction(nodeTag, dof=-1)`

```ts
nodeReaction(nodeTag: number, dof?: number): this;
```

### `nodeResponse`

OpenSees: `nodeResponse(nodeTag, dof, responseID)`

```ts
nodeResponse(nodeTag: number, dof: number, responseID: number): this;
```

### `nodeUnbalance`

OpenSees: `nodeUnbalance(nodeTag, dof=-1)`

```ts
nodeUnbalance(nodeTag: number, dof?: number): this;
```

### `nodeVel`

OpenSees: `nodeVel(nodeTag, dof=-1)`

```ts
nodeVel(nodeTag: number, dof?: number): this;
```

### `numFact`

OpenSees: `numFact()`

```ts
numFact(): this;
```

### `numIter`

OpenSees: `numIter()`

```ts
numIter(): this;
```

### `numberer`

OpenSees: `numberer('AMD')`; `numberer(numbererType, *numbererArgs)`; `numberer('ParallelPlain')`; `numberer('ParallelRCM')`; `numberer('Plain')`; `numberer('RCM')`

```ts
numberer(type: "AMD"): this;
numberer(type: "ParallelPlain"): this;
numberer(type: "ParallelRCM"): this;
numberer(type: "Plain"): this;
numberer(type: "RCM"): this;
```

### `parameter`

OpenSees: `parameter(tag, <specific parameter args>)`

```ts
parameter(tag: number, specific_parameter_args?: number): this;
```

### `partition`

OpenSees: `partition('-ncuts', ncuts, '-niter', niters, '-ufactor', ufactor, '-info')`

```ts
partition(type: "-ncuts", ncuts: number, niter: "-niter", niters: number, ufactor: "-ufactor", ufactor2: number, info: "-info"): this;
```

### `patch`

OpenSees: `patch(type, *args)`; `patch('quad', matTag,numSubdivIJ,numSubdivJK,*crdsI,*crdsJ,*crdsK,*crdsL)`; `patch('rect', matTag,numSubdivY,numSubdivZ,*crdsI,*crdsJ)`; `patch('circ', matTag,numSubdivCirc,numSubdivRad,*center,*rad,*ang)`

```ts
patch(type: "quad", matTag: number, numSubdivIJ: number, numSubdivJK: number, crdsI: readonly number[], crdsJ: readonly number[], crdsK: readonly number[], crdsL?: readonly number[]): this;
patch(type: "rect", matTag: number, numSubdivY: number, numSubdivZ: number, crdsI: readonly number[], crdsJ?: readonly number[]): this;
patch(type: "circ", matTag: number, numSubdivCirc: number, numSubdivRad: number, center: readonly number[], rad: readonly number[], ang?: readonly number[]): this;
patch(type: string, args?: readonly number[]): this;
```

### `pattern`

OpenSees: `pattern('MultipleSupport', patternTag)`; `pattern(patternType, patternTag, *patternArgs)`; `pattern('Plain',patternTag,tsTag,'-fact',fact)`; `pattern('UniformExcitation',patternTag,dir,'-disp',dispSeriesTag,'-vel',velSeriesTag,'-accel',accelSeriesTag,'-vel0',vel0,'-fact',fact)`

```ts
pattern(type: 'Plain', patternTag: number, tsTag: number): this;
pattern(type: 'Plain', patternTag: number, tsTag: number, factFlag: '-fact', fact: number): this;
pattern(type: 'MultipleSupport', patternTag: number): this;
pattern(type: 'UniformExcitation', patternTag: number, direction: number, flags?: readonly OpenSeesPyArgument[]): this;
```

### `performanceFunction`

```ts
performanceFunction(args?: readonly OpenSeesPyArgument[]): this;
```

### `pressureConstraint`

OpenSees: `pressureConstraint(nodeTag, pNodeTag)`

```ts
pressureConstraint(nodeTag: number, pNodeTag: number): this;
```

### `printA`

OpenSees: `printA('-file',filename,'-ret')`

```ts
printA(): this;
printA(fileFlag: '-file', filename: string): this;
printA(retFlag: '-ret'): this;
printA(fileFlag: '-file', filename: string, retFlag: '-ret'): this;
printA(precisionFlag: '-precision', digits: number): this;
printA(sparseFlag: '-sparse', baseIndex?: 0 | 1): this;
```

### `printB`

OpenSees: `printB('-file',filename,'-ret')`

```ts
printB(): this;
printB(fileFlag: '-file', filename: string): this;
printB(retFlag: '-ret'): this;
printB(fileFlag: '-file', filename: string, retFlag: '-ret'): this;
```

### `printGID`

OpenSees: `printGID(filename,'-append','-eleRange',startEle,endEle)`

```ts
printGID(filename: string, append: "-append", eleRange: "-eleRange", startEle: number, endEle: number): this;
```

### `printModel`

OpenSees: `printModel('-JSON','-file',filename,'-node','-flag',flag,*nodes=[],*eles=[])`

```ts
printModel(type: "-JSON", file: "-file", filename: string, node: "-node", flag: "-flag", flag2: number, nodes?: readonly number[], eles?: readonly number[]): this;
```

### `printX`

```ts
printX(args?: readonly OpenSeesPyArgument[]): this;
```

### `probabilityTransformation`

```ts
probabilityTransformation(args?: readonly OpenSeesPyArgument[]): this;
```

### `pyversion`

```ts
pyversion(args?: readonly OpenSeesPyArgument[]): this;
```

### `randomNumberGenerator`

```ts
randomNumberGenerator(args?: readonly OpenSeesPyArgument[]): this;
```

### `randomVariable`

OpenSees: `randomVariable(tag, dist, '-mean', mean, '-stdv', stdv, '-startPoint', startPoint, '-parameters', *params)`

```ts
randomVariable(tag: number, dist: string, mean: "-mean", mean2: number, stdv: "-stdv", stdv2: number, startPoint: "-startPoint", startPoint2: number, parameters: "-parameters", params?: readonly number[]): this;
```

### `rayleigh`

OpenSees: `rayleigh(alphaM, betaK, betaKinit, betaKcomm)`

```ts
rayleigh(alphaM: number, betaK: number, betaKinit: number, betaKcomm: number): this;
```

### `reactions`

OpenSees: `reactions('-dynamic','-rayleigh')`

```ts
reactions(): this;
reactions(dynamicFlag: '-dynamic'): this;
reactions(rayleighFlag: '-rayleigh'): this;
reactions(dynamicFlag: '-dynamic', rayleighFlag: '-rayleigh'): this;
```

### `record`

OpenSees: `record()`

```ts
record(): this;
```

### `recorder`

OpenSees: `recorder('BgPVD',filename,'-precision',precision=10,'-dT',dT=0.0,*res)`; `recorder('Collapse','-node',nodeTag,'-file_infill',fileNameinf,'-checknodes', nTagbotn, nTagmidn, nTagtopn, '-global_gravaxis', globgrav, '-secondary', '-eles', *eleTags, '-eleRage', start, end, '-region', regionTag, '-time', '-dT', dT, '-file', fileName, '-mass', *massValues, '-g', gAcc, gDir, gPat, '-section', *secTags, '-crit', critType, critValue)`; `recorder('EnvelopeElement','-file',filename,'-xml',filename,'-binary',filename,'-precision',nSD=6,'-timeSeries',tsTag,'-time','-dT',deltaT=0.0,'-closeOnWrite','-ele',*eleTags=[],'-eleRange',startEle,endEle,'-region',regionTag,*args)`; `recorder('Element','-file',filename,'-xml',filename,'-binary',filename,'-precision',nSD=6,'-timeSeries',tsTag,'-time','-dT',deltaT=0.0,'-closeOnWrite','-ele',*eleTags=[],'-eleRange',startEle,endEle,'-region',regionTag,*args)`; `recorder('EnvelopeNode','-file',filename,'-xml',filename,'-precision',nSD=6,'-timeSeries',tsTag,'-time','-dT',deltaT=0.0,'-closeOnWrite','-node',*nodeTags=[],'-nodeRange',startNode,endNode,'-region',regionTag,'-dof',*dofs=[],respType)`; `recorder('Node','-file',filename,'-xml',filename,'-binary',filename,'-tcp',inetAddress,port,'-precision',nSD=6,'-timeSeries',tsTag,'-time','-dT',deltaT=0.0,'-closeOnWrite','-node',*nodeTags=[],'-nodeRange',startNode,endNode,'-region',regionTag,'-dof',*dofs=[],respType)`; `recorder('PVD',filename,'-precision',precision=10,'-dT',dT=0.0,*res)`; `recorder(recorderType, *recorderArgs)`

```ts
recorder(type: "BgPVD", filename: string, precision: "-precision", precision2: number | undefined, dT: "-dT", dT2?: number, res?: readonly string[]): this;
recorder(type: "Collapse", node: "-node", nodeTag: number, file_infill: "-file_infill", fileNameinf: string, checknodes: "-checknodes", nTagbotn: number, nTagmidn: number, nTagtopn: number, global_gravaxis: "-global_gravaxis", globgrav: number, secondary: "-secondary", eles: "-eles", eleTags: readonly number[], eleRage: "-eleRage", start: number, end: number, region: "-region", regionTag: number, time: "-time", dT: "-dT", dT2: number, file: "-file", fileName: string, mass: "-mass", massValues: readonly number[], g: "-g", gAcc: number, gDir: number, gPat: number, section: "-section", secTags: readonly number[], crit: "-crit", critType: readonly string[], critValue: number): this;
recorder(type: "PVD", filename: string, precision: "-precision", precision2: number | undefined, dT: "-dT", dT2?: number, res?: readonly string[]): this;
recorder(type: 'Node', destinationFlag: '-file' | '-xml' | '-binary', path: string, selectionFlag: '-node', nodeTags: readonly number[], dofFlag: '-dof', dofs: readonly number[], responseType: Exclude<RecorderNodeResponseType, 'eigen'>): this;
recorder(type: 'Node', destinationFlag: '-file' | '-xml' | '-binary', path: string, commonOptions: RecorderCommonArguments, selectionFlag: '-node', nodeTags: readonly number[], dofFlag: '-dof', dofs: readonly number[], responseType: Exclude<RecorderNodeResponseType, 'eigen'>): this;
recorder(type: 'Node', destinationFlag: '-file' | '-xml' | '-binary', path: string, selectionFlag: '-node', nodeTags: readonly number[], dofFlag: '-dof', dofs: readonly number[], responseType: 'eigen', mode: number): this;
recorder(type: 'Node', destinationFlag: '-file' | '-xml' | '-binary', path: string, commonOptions: RecorderCommonArguments, selectionFlag: '-node', nodeTags: readonly number[], dofFlag: '-dof', dofs: readonly number[], responseType: 'eigen', mode: number): this;
recorder(type: 'Node', destinationFlag: '-file' | '-xml' | '-binary', path: string, selectionFlag: '-nodeRange', startNode: number, endNode: number, dofFlag: '-dof', dofs: readonly number[], responseType: Exclude<RecorderNodeResponseType, 'eigen'>): this;
recorder(type: 'Node', destinationFlag: '-file' | '-xml' | '-binary', path: string, commonOptions: RecorderCommonArguments, selectionFlag: '-nodeRange', startNode: number, endNode: number, dofFlag: '-dof', dofs: readonly number[], responseType: Exclude<RecorderNodeResponseType, 'eigen'>): this;
recorder(type: 'Node', destinationFlag: '-file' | '-xml' | '-binary', path: string, selectionFlag: '-nodeRange', startNode: number, endNode: number, dofFlag: '-dof', dofs: readonly number[], responseType: 'eigen', mode: number): this;
recorder(type: 'Node', destinationFlag: '-file' | '-xml' | '-binary', path: string, commonOptions: RecorderCommonArguments, selectionFlag: '-nodeRange', startNode: number, endNode: number, dofFlag: '-dof', dofs: readonly number[], responseType: 'eigen', mode: number): this;
recorder(type: 'Node', destinationFlag: '-file' | '-xml' | '-binary', path: string, selectionFlag: '-region', regionTag: number, dofFlag: '-dof', dofs: readonly number[], responseType: Exclude<RecorderNodeResponseType, 'eigen'>): this;
recorder(type: 'Node', destinationFlag: '-file' | '-xml' | '-binary', path: string, commonOptions: RecorderCommonArguments, selectionFlag: '-region', regionTag: number, dofFlag: '-dof', dofs: readonly number[], responseType: Exclude<RecorderNodeResponseType, 'eigen'>): this;
recorder(type: 'Node', destinationFlag: '-file' | '-xml' | '-binary', path: string, selectionFlag: '-region', regionTag: number, dofFlag: '-dof', dofs: readonly number[], responseType: 'eigen', mode: number): this;
recorder(type: 'Node', destinationFlag: '-file' | '-xml' | '-binary', path: string, commonOptions: RecorderCommonArguments, selectionFlag: '-region', regionTag: number, dofFlag: '-dof', dofs: readonly number[], responseType: 'eigen', mode: number): this;
recorder(type: 'Node', destinationFlag: '-tcp', host: string, port: number, selectionFlag: '-node', nodeTags: readonly number[], dofFlag: '-dof', dofs: readonly number[], responseType: Exclude<RecorderNodeResponseType, 'eigen'>): this;
recorder(type: 'Node', destinationFlag: '-tcp', host: string, port: number, commonOptions: RecorderCommonArguments, selectionFlag: '-node', nodeTags: readonly number[], dofFlag: '-dof', dofs: readonly number[], responseType: Exclude<RecorderNodeResponseType, 'eigen'>): this;
recorder(type: 'Node', destinationFlag: '-tcp', host: string, port: number, selectionFlag: '-node', nodeTags: readonly number[], dofFlag: '-dof', dofs: readonly number[], responseType: 'eigen', mode: number): this;
recorder(type: 'Node', destinationFlag: '-tcp', host: string, port: number, commonOptions: RecorderCommonArguments, selectionFlag: '-node', nodeTags: readonly number[], dofFlag: '-dof', dofs: readonly number[], responseType: 'eigen', mode: number): this;
recorder(type: 'Node', destinationFlag: '-tcp', host: string, port: number, selectionFlag: '-nodeRange', startNode: number, endNode: number, dofFlag: '-dof', dofs: readonly number[], responseType: Exclude<RecorderNodeResponseType, 'eigen'>): this;
recorder(type: 'Node', destinationFlag: '-tcp', host: string, port: number, commonOptions: RecorderCommonArguments, selectionFlag: '-nodeRange', startNode: number, endNode: number, dofFlag: '-dof', dofs: readonly number[], responseType: Exclude<RecorderNodeResponseType, 'eigen'>): this;
recorder(type: 'Node', destinationFlag: '-tcp', host: string, port: number, selectionFlag: '-nodeRange', startNode: number, endNode: number, dofFlag: '-dof', dofs: readonly number[], responseType: 'eigen', mode: number): this;
recorder(type: 'Node', destinationFlag: '-tcp', host: string, port: number, commonOptions: RecorderCommonArguments, selectionFlag: '-nodeRange', startNode: number, endNode: number, dofFlag: '-dof', dofs: readonly number[], responseType: 'eigen', mode: number): this;
recorder(type: 'Node', destinationFlag: '-tcp', host: string, port: number, selectionFlag: '-region', regionTag: number, dofFlag: '-dof', dofs: readonly number[], responseType: Exclude<RecorderNodeResponseType, 'eigen'>): this;
recorder(type: 'Node', destinationFlag: '-tcp', host: string, port: number, commonOptions: RecorderCommonArguments, selectionFlag: '-region', regionTag: number, dofFlag: '-dof', dofs: readonly number[], responseType: Exclude<RecorderNodeResponseType, 'eigen'>): this;
recorder(type: 'Node', destinationFlag: '-tcp', host: string, port: number, selectionFlag: '-region', regionTag: number, dofFlag: '-dof', dofs: readonly number[], responseType: 'eigen', mode: number): this;
recorder(type: 'Node', destinationFlag: '-tcp', host: string, port: number, commonOptions: RecorderCommonArguments, selectionFlag: '-region', regionTag: number, dofFlag: '-dof', dofs: readonly number[], responseType: 'eigen', mode: number): this;
recorder(type: 'EnvelopeNode', destinationFlag: '-file' | '-xml' | '-binary', path: string, selectionFlag: '-node', nodeTags: readonly number[], dofFlag: '-dof', dofs: readonly number[], responseType: Exclude<RecorderNodeResponseType, 'eigen'>): this;
recorder(type: 'EnvelopeNode', destinationFlag: '-file' | '-xml' | '-binary', path: string, commonOptions: RecorderCommonArguments, selectionFlag: '-node', nodeTags: readonly number[], dofFlag: '-dof', dofs: readonly number[], responseType: Exclude<RecorderNodeResponseType, 'eigen'>): this;
recorder(type: 'EnvelopeNode', destinationFlag: '-file' | '-xml' | '-binary', path: string, selectionFlag: '-node', nodeTags: readonly number[], dofFlag: '-dof', dofs: readonly number[], responseType: 'eigen', mode: number): this;
recorder(type: 'EnvelopeNode', destinationFlag: '-file' | '-xml' | '-binary', path: string, commonOptions: RecorderCommonArguments, selectionFlag: '-node', nodeTags: readonly number[], dofFlag: '-dof', dofs: readonly number[], responseType: 'eigen', mode: number): this;
recorder(type: 'EnvelopeNode', destinationFlag: '-file' | '-xml' | '-binary', path: string, selectionFlag: '-nodeRange', startNode: number, endNode: number, dofFlag: '-dof', dofs: readonly number[], responseType: Exclude<RecorderNodeResponseType, 'eigen'>): this;
recorder(type: 'EnvelopeNode', destinationFlag: '-file' | '-xml' | '-binary', path: string, commonOptions: RecorderCommonArguments, selectionFlag: '-nodeRange', startNode: number, endNode: number, dofFlag: '-dof', dofs: readonly number[], responseType: Exclude<RecorderNodeResponseType, 'eigen'>): this;
recorder(type: 'EnvelopeNode', destinationFlag: '-file' | '-xml' | '-binary', path: string, selectionFlag: '-nodeRange', startNode: number, endNode: number, dofFlag: '-dof', dofs: readonly number[], responseType: 'eigen', mode: number): this;
recorder(type: 'EnvelopeNode', destinationFlag: '-file' | '-xml' | '-binary', path: string, commonOptions: RecorderCommonArguments, selectionFlag: '-nodeRange', startNode: number, endNode: number, dofFlag: '-dof', dofs: readonly number[], responseType: 'eigen', mode: number): this;
recorder(type: 'EnvelopeNode', destinationFlag: '-file' | '-xml' | '-binary', path: string, selectionFlag: '-region', regionTag: number, dofFlag: '-dof', dofs: readonly number[], responseType: Exclude<RecorderNodeResponseType, 'eigen'>): this;
recorder(type: 'EnvelopeNode', destinationFlag: '-file' | '-xml' | '-binary', path: string, commonOptions: RecorderCommonArguments, selectionFlag: '-region', regionTag: number, dofFlag: '-dof', dofs: readonly number[], responseType: Exclude<RecorderNodeResponseType, 'eigen'>): this;
recorder(type: 'EnvelopeNode', destinationFlag: '-file' | '-xml' | '-binary', path: string, selectionFlag: '-region', regionTag: number, dofFlag: '-dof', dofs: readonly number[], responseType: 'eigen', mode: number): this;
recorder(type: 'EnvelopeNode', destinationFlag: '-file' | '-xml' | '-binary', path: string, commonOptions: RecorderCommonArguments, selectionFlag: '-region', regionTag: number, dofFlag: '-dof', dofs: readonly number[], responseType: 'eigen', mode: number): this;
recorder(type: 'EnvelopeNode', destinationFlag: '-tcp', host: string, port: number, selectionFlag: '-node', nodeTags: readonly number[], dofFlag: '-dof', dofs: readonly number[], responseType: Exclude<RecorderNodeResponseType, 'eigen'>): this;
recorder(type: 'EnvelopeNode', destinationFlag: '-tcp', host: string, port: number, commonOptions: RecorderCommonArguments, selectionFlag: '-node', nodeTags: readonly number[], dofFlag: '-dof', dofs: readonly number[], responseType: Exclude<RecorderNodeResponseType, 'eigen'>): this;
recorder(type: 'EnvelopeNode', destinationFlag: '-tcp', host: string, port: number, selectionFlag: '-node', nodeTags: readonly number[], dofFlag: '-dof', dofs: readonly number[], responseType: 'eigen', mode: number): this;
recorder(type: 'EnvelopeNode', destinationFlag: '-tcp', host: string, port: number, commonOptions: RecorderCommonArguments, selectionFlag: '-node', nodeTags: readonly number[], dofFlag: '-dof', dofs: readonly number[], responseType: 'eigen', mode: number): this;
recorder(type: 'EnvelopeNode', destinationFlag: '-tcp', host: string, port: number, selectionFlag: '-nodeRange', startNode: number, endNode: number, dofFlag: '-dof', dofs: readonly number[], responseType: Exclude<RecorderNodeResponseType, 'eigen'>): this;
recorder(type: 'EnvelopeNode', destinationFlag: '-tcp', host: string, port: number, commonOptions: RecorderCommonArguments, selectionFlag: '-nodeRange', startNode: number, endNode: number, dofFlag: '-dof', dofs: readonly number[], responseType: Exclude<RecorderNodeResponseType, 'eigen'>): this;
recorder(type: 'EnvelopeNode', destinationFlag: '-tcp', host: string, port: number, selectionFlag: '-nodeRange', startNode: number, endNode: number, dofFlag: '-dof', dofs: readonly number[], responseType: 'eigen', mode: number): this;
recorder(type: 'EnvelopeNode', destinationFlag: '-tcp', host: string, port: number, commonOptions: RecorderCommonArguments, selectionFlag: '-nodeRange', startNode: number, endNode: number, dofFlag: '-dof', dofs: readonly number[], responseType: 'eigen', mode: number): this;
recorder(type: 'EnvelopeNode', destinationFlag: '-tcp', host: string, port: number, selectionFlag: '-region', regionTag: number, dofFlag: '-dof', dofs: readonly number[], responseType: Exclude<RecorderNodeResponseType, 'eigen'>): this;
recorder(type: 'EnvelopeNode', destinationFlag: '-tcp', host: string, port: number, commonOptions: RecorderCommonArguments, selectionFlag: '-region', regionTag: number, dofFlag: '-dof', dofs: readonly number[], responseType: Exclude<RecorderNodeResponseType, 'eigen'>): this;
recorder(type: 'EnvelopeNode', destinationFlag: '-tcp', host: string, port: number, selectionFlag: '-region', regionTag: number, dofFlag: '-dof', dofs: readonly number[], responseType: 'eigen', mode: number): this;
recorder(type: 'EnvelopeNode', destinationFlag: '-tcp', host: string, port: number, commonOptions: RecorderCommonArguments, selectionFlag: '-region', regionTag: number, dofFlag: '-dof', dofs: readonly number[], responseType: 'eigen', mode: number): this;
recorder(type: 'Element', destinationFlag: '-file' | '-xml' | '-binary', path: string, selectionFlag: '-ele', elementTags: readonly number[], response: readonly OpenSeesPyArgument[]): this;
recorder(type: 'Element', destinationFlag: '-file' | '-xml' | '-binary', path: string, commonOptions: RecorderCommonArguments, selectionFlag: '-ele', elementTags: readonly number[], response: readonly OpenSeesPyArgument[]): this;
recorder(type: 'Element', destinationFlag: '-file' | '-xml' | '-binary', path: string, selectionFlag: '-eleRange', startElement: number, endElement: number, response: readonly OpenSeesPyArgument[]): this;
recorder(type: 'Element', destinationFlag: '-file' | '-xml' | '-binary', path: string, commonOptions: RecorderCommonArguments, selectionFlag: '-eleRange', startElement: number, endElement: number, response: readonly OpenSeesPyArgument[]): this;
recorder(type: 'Element', destinationFlag: '-file' | '-xml' | '-binary', path: string, selectionFlag: '-region', regionTag: number, response: readonly OpenSeesPyArgument[]): this;
recorder(type: 'Element', destinationFlag: '-file' | '-xml' | '-binary', path: string, commonOptions: RecorderCommonArguments, selectionFlag: '-region', regionTag: number, response: readonly OpenSeesPyArgument[]): this;
recorder(type: 'Element', destinationFlag: '-tcp', host: string, port: number, selectionFlag: '-ele', elementTags: readonly number[], response: readonly OpenSeesPyArgument[]): this;
recorder(type: 'Element', destinationFlag: '-tcp', host: string, port: number, commonOptions: RecorderCommonArguments, selectionFlag: '-ele', elementTags: readonly number[], response: readonly OpenSeesPyArgument[]): this;
recorder(type: 'Element', destinationFlag: '-tcp', host: string, port: number, selectionFlag: '-eleRange', startElement: number, endElement: number, response: readonly OpenSeesPyArgument[]): this;
recorder(type: 'Element', destinationFlag: '-tcp', host: string, port: number, commonOptions: RecorderCommonArguments, selectionFlag: '-eleRange', startElement: number, endElement: number, response: readonly OpenSeesPyArgument[]): this;
recorder(type: 'Element', destinationFlag: '-tcp', host: string, port: number, selectionFlag: '-region', regionTag: number, response: readonly OpenSeesPyArgument[]): this;
recorder(type: 'Element', destinationFlag: '-tcp', host: string, port: number, commonOptions: RecorderCommonArguments, selectionFlag: '-region', regionTag: number, response: readonly OpenSeesPyArgument[]): this;
recorder(type: 'EnvelopeElement', destinationFlag: '-file' | '-xml' | '-binary', path: string, selectionFlag: '-ele', elementTags: readonly number[], response: readonly OpenSeesPyArgument[]): this;
recorder(type: 'EnvelopeElement', destinationFlag: '-file' | '-xml' | '-binary', path: string, commonOptions: RecorderCommonArguments, selectionFlag: '-ele', elementTags: readonly number[], response: readonly OpenSeesPyArgument[]): this;
recorder(type: 'EnvelopeElement', destinationFlag: '-file' | '-xml' | '-binary', path: string, selectionFlag: '-eleRange', startElement: number, endElement: number, response: readonly OpenSeesPyArgument[]): this;
recorder(type: 'EnvelopeElement', destinationFlag: '-file' | '-xml' | '-binary', path: string, commonOptions: RecorderCommonArguments, selectionFlag: '-eleRange', startElement: number, endElement: number, response: readonly OpenSeesPyArgument[]): this;
recorder(type: 'EnvelopeElement', destinationFlag: '-file' | '-xml' | '-binary', path: string, selectionFlag: '-region', regionTag: number, response: readonly OpenSeesPyArgument[]): this;
recorder(type: 'EnvelopeElement', destinationFlag: '-file' | '-xml' | '-binary', path: string, commonOptions: RecorderCommonArguments, selectionFlag: '-region', regionTag: number, response: readonly OpenSeesPyArgument[]): this;
recorder(type: 'EnvelopeElement', destinationFlag: '-tcp', host: string, port: number, selectionFlag: '-ele', elementTags: readonly number[], response: readonly OpenSeesPyArgument[]): this;
recorder(type: 'EnvelopeElement', destinationFlag: '-tcp', host: string, port: number, commonOptions: RecorderCommonArguments, selectionFlag: '-ele', elementTags: readonly number[], response: readonly OpenSeesPyArgument[]): this;
recorder(type: 'EnvelopeElement', destinationFlag: '-tcp', host: string, port: number, selectionFlag: '-eleRange', startElement: number, endElement: number, response: readonly OpenSeesPyArgument[]): this;
recorder(type: 'EnvelopeElement', destinationFlag: '-tcp', host: string, port: number, commonOptions: RecorderCommonArguments, selectionFlag: '-eleRange', startElement: number, endElement: number, response: readonly OpenSeesPyArgument[]): this;
recorder(type: 'EnvelopeElement', destinationFlag: '-tcp', host: string, port: number, selectionFlag: '-region', regionTag: number, response: readonly OpenSeesPyArgument[]): this;
recorder(type: 'EnvelopeElement', destinationFlag: '-tcp', host: string, port: number, commonOptions: RecorderCommonArguments, selectionFlag: '-region', regionTag: number, response: readonly OpenSeesPyArgument[]): this;
```

### `recv`

OpenSees: `recv('-pid', pid)`

```ts
recv(type: "-pid", pid: string): this;
```

### `region`

OpenSees: `region(regTag, '-ele', *eles, '-eleOnly', *eles, '-eleRange', startEle, endEle, '-eleOnlyRange', startEle, endEle, '-node', *nodes, '-nodeOnly', *nodes, '-nodeRange', startNode, endNode, '-nodeOnlyRange', startNode, endNode, '-rayleigh', alphaM, betaK, betaKinit, betaKcomm)`

```ts
region(regTag: number, ele: "-ele", eles: readonly number[], eleOnly: "-eleOnly", eles2: readonly number[], eleRange: "-eleRange", startEle: number, endEle: number, eleOnlyRange: "-eleOnlyRange", startEle2: number, endEle2: number, node: "-node", nodes: readonly number[], nodeOnly: "-nodeOnly", nodes2: readonly number[], nodeRange: "-nodeRange", startNode: number, endNode: number, nodeOnlyRange: "-nodeOnlyRange", startNode2: number, endNode2: number, rayleigh: "-rayleigh", alphaM: number, betaK: number, betaKinit: number, betaKcomm: number): this;
```

### `reliabilityConvergenceCheck`

```ts
reliabilityConvergenceCheck(args?: readonly OpenSeesPyArgument[]): this;
```

### `remesh`

OpenSees: `remesh(alpha=-1.0)`

```ts
remesh(alpha?: number): this;
```

### `remove`

OpenSees: `remove(type,tag)`; `remove('recorders')`; `remove('sp', nodeTag, dofTag, patternTag)`

```ts
remove(type: "recorders"): this;
remove(type: "sp", nodeTag: number, dofTag: number, patternTag: number): this;
remove(type: string, tag: number): this;
```

### `reset`

OpenSees: `reset()`

```ts
reset(): this;
```

### `responseSpectrumAnalysis`

OpenSees: `responseSpectrumAnalysis(tsTag, direction, <'-scale', scale>, <'-mode', mode>)`; `responseSpectrumAnalysis(direction, '-Tn', Tn, '-Sa', Sa, <'-scale ', scale>, <'-mode', mode>)`

```ts
responseSpectrumAnalysis(timeSeriesTag: number, direction: number): this;
responseSpectrumAnalysis(timeSeriesTag: number, direction: number, scaleFlag: '-scale', scale: number): this;
responseSpectrumAnalysis(timeSeriesTag: number, direction: number, modeFlag: '-mode', mode: number): this;
responseSpectrumAnalysis(timeSeriesTag: number, direction: number, scaleFlag: '-scale', scale: number, modeFlag: '-mode', mode: number): this;
responseSpectrumAnalysis(direction: number, periodsFlag: '-Tn', periods: readonly number[], accelerationsFlag: '-Sa', accelerations: readonly number[], flags?: readonly OpenSeesPyArgument[]): this;
```

### `restore`

OpenSees: `restore(commitTag)`

```ts
restore(commitTag: number): this;
```

### `rigidDiaphragm`

OpenSees: `rigidDiaphragm(perpDirn, rNodeTag, *cNodeTags)`

```ts
rigidDiaphragm(perpDirn: number, retainedNode: number, constrainedNodes: readonly number[]): this;
```

### `rigidLink`

OpenSees: `rigidLink(type, rNodeTag, cNodeTag)`

```ts
rigidLink(type: 'bar' | 'beam', rNodeTag: number, cNodeTag: number): this;
```

### `rootFinding`

```ts
rootFinding(args?: readonly OpenSeesPyArgument[]): this;
```

### `runFORMAnalysis`

```ts
runFORMAnalysis(args?: readonly OpenSeesPyArgument[]): this;
```

### `runFOSMAnalysis`

```ts
runFOSMAnalysis(args?: readonly OpenSeesPyArgument[]): this;
```

### `runImportanceSamplingAnalysis`

```ts
runImportanceSamplingAnalysis(args?: readonly OpenSeesPyArgument[]): this;
```

### `runSORMAnalysis`

```ts
runSORMAnalysis(args?: readonly OpenSeesPyArgument[]): this;
```

### `save`

OpenSees: `save(commitTag)`

```ts
save(commitTag: number): this;
```

### `sdfResponse`

OpenSees: `sdfResponse(m, zeta, k, Fy, alpha, dtF, filename, dt[, uresidual, umaxprev])`

```ts
sdfResponse(m: number, zeta: number, k: number, Fy: number, alpha: number, dtF: number, filename: string, dt_uresidual_umaxprev: number): this;
```

### `searchDirection`

```ts
searchDirection(args?: readonly OpenSeesPyArgument[]): this;
```

### `searchPeerNGA`

```ts
searchPeerNGA(args?: readonly OpenSeesPyArgument[]): this;
```

### `section`

OpenSees: `section('Bidirectional',secTag,E_mod,Fy,Hiso,Hkin,code1='Vy',code2='P')`; `section('ElasticMembranePlateSection',secTag,E_mod,nu,h,rho,<Ep_modifier>)`; `section('Elastic', secTag, E_mod, A, Iz, G_mod=None, alphaY=None)`; `section('Elastic', secTag, E_mod, A, Iz, Iy, G_mod, Jxx, alphaY=None, alphaZ=None)`; `section('Fiber', secTag, '-GJ', GJ)`; `section('Fiber', secTag, '-torsion', torsionMatTag)`; `section('FiberThermal', secTag, '-GJ', GJ=0.0)`; `section('Isolator2spring',matTag,tol,k1,Fyo,k2o,kvo,hb,PE,Po=0.0)`; `section('LayeredShell', sectionTag, nLayers, *mats)`; `section('NDFiber', secTag)`; `section('Parallel',secTag,*SecTags)`; `section('Pipe', secTag, do, t, <'-alphaV', alphaV>, <'-defaultAlphaV'>, <'-rho', rho>)`; `section('PlateFiber',secTag,matTag,h)`; `section('RCCircularSection',secTag,coreMatTag,coverMatTag,steelMatTag,d,cover_depth,Ab,NringsCore,NringsCover,Nwedges,Nsteel,'-GJ',GJ <or '-torsion',matTag>)`; `section('RCSection2d',secTag,coreMatTag,coverMatTag,steelMatTag,d,b,cover_depth,Atop,Abot,Aside,Nfcore,Nfcover,Nfs)`; `section(secType, secTag, *secArgs)`; `section('Aggregator',secTag,*mats,'-section',sectionTag)`; `section('Uniaxial',secTag,matTag,quantity)`; `section('WFSection2d',secTag,matTag,d,tw,bf,tf,Nfw,Nff)`

```ts
section(type: "Bidirectional", secTag: number, E_mod: number, Fy: number, Hiso: number, Hkin: number, code1?: string, code2?: string): this;
section(type: "ElasticMembranePlateSection", secTag: number, E_mod: number, nu: number, h: number, rho: number, Ep_modifier?: number): this;
section(type: "Elastic", secTag: number, E_mod: number, A: number, Iz: number, G_mod?: number, alphaY?: number): this;
section(type: "Elastic", secTag: number, E_mod: number, A: number, Iz: number, Iy: number, G_mod: number, Jxx: number, alphaY?: number, alphaZ?: number): this;
section(type: "Fiber", secTag: number, GJ: "-GJ", GJ2: number): this;
section(type: "Fiber", secTag: number, torsion: "-torsion", torsionMatTag: number): this;
section(type: "FiberThermal", secTag: number, GJ: "-GJ", GJ2?: number): this;
section(type: "Isolator2spring", matTag: number, tol: number, k1: number, Fyo: number, k2o: number, kvo: number, hb: number, PE: number, Po?: number): this;
section(type: "LayeredShell", sectionTag: number, nLayers: number, mats?: readonly OpenSeesPyArgument[]): this;
section(type: "NDFiber", secTag: number): this;
section(type: "Parallel", secTag: number, SecTags?: readonly number[]): this;
section(type: "Pipe", secTag: number, _do: number, t: number, alphaV?: "-alphaV", alphaV2?: number, defaultAlphaV?: "-defaultAlphaV", rho?: "-rho", rho2?: number): this;
section(type: "PlateFiber", secTag: number, matTag: number, h: number): this;
section(type: "RCCircularSection", secTag: number, coreMatTag: number, coverMatTag: number, steelMatTag: number, d: number, cover_depth: number, Ab: number, NringsCore: number, NringsCover: number, Nwedges: number, Nsteel: number, GJ: "-GJ", GJ_or_torsion_matTag: number): this;
section(type: "RCSection2d", secTag: number, coreMatTag: number, coverMatTag: number, steelMatTag: number, d: number, b: number, cover_depth: number, Atop: number, Abot: number, Aside: number, Nfcore: number, Nfcover: number, Nfs: number): this;
section(type: "Aggregator", secTag: number, mats: readonly OpenSeesPyArgument[], section: "-section", sectionTag: number): this;
section(type: "Uniaxial", secTag: number, matTag: number, quantity: string): this;
section(type: "WFSection2d", secTag: number, matTag: number, d: number, tw: number, bf: number, tf: number, Nfw: number, Nff: number): this;
```

### `sectionDeformation`

OpenSees: `sectionDeformation(eleTag, secNum, dof)`

```ts
sectionDeformation(eleTag: number, secNum: number, dof: number): this;
```

### `sectionDisplacement`

```ts
sectionDisplacement(args?: readonly OpenSeesPyArgument[]): this;
```

### `sectionFlexibility`

OpenSees: `sectionFlexibility(eleTag, secNum)`

```ts
sectionFlexibility(eleTag: number, secNum: number): this;
```

### `sectionForce`

OpenSees: `sectionForce(eleTag, secNum, dof)`

```ts
sectionForce(eleTag: number, secNum: number, dof: number): this;
```

### `sectionLocation`

OpenSees: `sectionLocation(eleTag, secNum)`

```ts
sectionLocation(eleTag: number, secNum: number): this;
```

### `sectionResponseType`

```ts
sectionResponseType(args?: readonly OpenSeesPyArgument[]): this;
```

### `sectionStiffness`

OpenSees: `sectionStiffness(eleTag, secNum)`

```ts
sectionStiffness(eleTag: number, secNum: number): this;
```

### `sectionTag`

```ts
sectionTag(args?: readonly OpenSeesPyArgument[]): this;
```

### `sectionWeight`

OpenSees: `sectionWeight(eleTag, secNum)`

```ts
sectionWeight(eleTag: number, secNum: number): this;
```

### `send`

OpenSees: `send('-pid', pid, *data)`

```ts
send(type: "-pid", pid: number, data?: readonly string[]): this;
```

### `sensLambda`

OpenSees: `sensLambda(patternTag, paramTag)`

```ts
sensLambda(patternTag: number, paramTag: number): this;
```

### `sensNodeAccel`

OpenSees: `sensNodeAccel(nodeTag, dof, paramTag)`

```ts
sensNodeAccel(nodeTag: number, dof: number, paramTag: number): this;
```

### `sensNodeDisp`

OpenSees: `sensNodeDisp(nodeTag, dof, paramTag)`

```ts
sensNodeDisp(nodeTag: number, dof: number, paramTag: number): this;
```

### `sensNodePressure`

OpenSees: `sensNodePressure(nodeTag, paramTag)`

```ts
sensNodePressure(nodeTag: number, paramTag: number): this;
```

### `sensNodeVel`

OpenSees: `sensNodeVel(nodeTag, dof, paramTag)`

```ts
sensNodeVel(nodeTag: number, dof: number, paramTag: number): this;
```

### `sensSectionForce`

OpenSees: `sensSectionForce(eleTag, <secNum>, dof, paramTag)`

```ts
sensSectionForce(eleTag: number, secNum: number | undefined, dof: number, paramTag: number): this;
```

### `sensitivityAlgorithm`

OpenSees: `sensitivityAlgorithm(type)`

```ts
sensitivityAlgorithm(type: string): this;
```

### `setCreep`

```ts
setCreep(args?: readonly OpenSeesPyArgument[]): this;
```

### `setElementRayleighDampingFactors`

OpenSees: `setElementRayleighDampingFactors(eleTag,alphaM,betaK,betaK0,betaKc)`

```ts
setElementRayleighDampingFactors(eleTag: number, alphaM: number, betaK: number, betaK0: number, betaKc: number): this;
```

### `setElementRayleighFactors`

```ts
setElementRayleighFactors(args?: readonly OpenSeesPyArgument[]): this;
```

### `setMaxOpenFiles`

```ts
setMaxOpenFiles(args?: readonly OpenSeesPyArgument[]): this;
```

### `setNodeAccel`

OpenSees: `setNodeAccel(nodeTag, dof, value, '-commit')`

```ts
setNodeAccel(nodeTag: number, dof: number, value: number, commit: "-commit"): this;
```

### `setNodeCoord`

OpenSees: `setNodeCoord(nodeTag, dim, value)`

```ts
setNodeCoord(nodeTag: number, dim: number, value: number): this;
```

### `setNodeDisp`

OpenSees: `setNodeDisp(nodeTag, dof, value, '-commit')`

```ts
setNodeDisp(nodeTag: number, dof: number, value: number, commit: "-commit"): this;
```

### `setNodePressure`

```ts
setNodePressure(args?: readonly OpenSeesPyArgument[]): this;
```

### `setNodeTemperature`

OpenSees: `setNodeTemperature(nodeTag, value)`

```ts
setNodeTemperature(nodeTag: number, value: number): this;
```

### `setNodeVel`

OpenSees: `setNodeVel(nodeTag, dof, value, '-commit')`

```ts
setNodeVel(nodeTag: number, dof: number, value: number, commit: "-commit"): this;
```

### `setNumThreads`

OpenSees: `setNumThreads(num)`

```ts
setNumThreads(num: number): this;
```

### `setParameter`

OpenSees: `setParameter('-val', newValue, <'-ele', *eleTags>, <'-eleRange', start, end>, <*args>)`

```ts
setParameter(type: "-val", newValue: number, ele?: "-ele", eleTags?: readonly number[], eleRange?: "-eleRange", start?: number, end?: number, args?: readonly string[]): this;
```

### `setPrecision`

OpenSees: `setPrecision(precision)`

```ts
setPrecision(precision: number): this;
```

### `setStartNodeTag`

OpenSees: `setStartNodeTag(ndtag)`

```ts
setStartNodeTag(ndtag: number): this;
```

### `setStrain`

```ts
setStrain(args?: readonly OpenSeesPyArgument[]): this;
```

### `setTime`

OpenSees: `setTime(pseudoTime)`

```ts
setTime(pseudoTime: number): this;
```

### `solveCPU`

```ts
solveCPU(args?: readonly OpenSeesPyArgument[]): this;
```

### `sp`

OpenSees: `sp(nodeTag, dof, dofValue)`

```ts
sp(nodeTag: number, dof: number, dofValue: number): this;
```

### `spectrum`

```ts
spectrum(args?: readonly OpenSeesPyArgument[]): this;
```

### `start`

OpenSees: `start()`

```ts
start(): this;
```

### `startPoint`

```ts
startPoint(args?: readonly OpenSeesPyArgument[]): this;
```

### `stepSizeRule`

```ts
stepSizeRule(args?: readonly OpenSeesPyArgument[]): this;
```

### `stiffnessDegradation`

```ts
stiffnessDegradation(args?: readonly OpenSeesPyArgument[]): this;
```

### `stop`

OpenSees: `stop()`

```ts
stop(): this;
```

### `strengthControl`

```ts
strengthControl(args?: readonly OpenSeesPyArgument[]): this;
```

### `strengthDegradation`

```ts
strengthDegradation(args?: readonly OpenSeesPyArgument[]): this;
```

### `stripXML`

OpenSees: `stripXML(inputml, outputdata, outputxml)`

```ts
stripXML(inputml: number, outputdata: string, outputxml: string): this;
```

### `system`

OpenSees: `system('BandGen')`; `system('BandSPD')`; `system ('Diagonal', <-'lumped'>)`; `system('FullGeneral')`; `system('Mumps','-ICNTL14',icntl14=20.0,'-ICNTL7',icntl7=7)`; `system('PFEM','-compressible','-mumps')`; `system('ProfileSPD')`; `system('PythonSparse', config)`; `system('SparseSYM')`; `system('SuperLU')`; `system(systemType, *systemArgs)`; `system('UmfPack')`; `system('UmfPack', '-useLongIndices')`

```ts
system(type: "BandGen"): this;
system(type: "BandSPD"): this;
system(type: "Diagonal", lumped?: number): this;
system(type: "FullGeneral"): this;
system(type: "Mumps", ICNTL14: "-ICNTL14", icntl14: number | undefined, ICNTL7: "-ICNTL7", icntl7?: number): this;
system(type: "PFEM", compressible: "-compressible", mumps: "-mumps"): this;
system(type: "ProfileSPD"): this;
system(type: "PythonSparse", config: number): this;
system(type: "SparseSYM"): this;
system(type: "SuperLU"): this;
system(type: "UmfPack"): this;
system(type: "UmfPack", useLongIndices: "-useLongIndices"): this;
```

### `systemSize`

OpenSees: `systemSize()`

```ts
systemSize(): this;
```

### `test`

OpenSees: `test('EnergyIncr',tol,iter,pFlag=0,nType=2)`; `test('FixedNumIter',iter,pFlag=0,nType=2)`; `test('NormDispAndUnbalance',tolIncr,tolR,iter,pFlag=0,nType=2,maxincr=-1)`; `test('NormDispIncr', tol,iter,pFlag=0,nType=2)`; `test('NormDispOrUnbalance',tolIncr,tolR,iter,pFlag=0,nType=2,maxincr=-1)`; `test('NormUnbalance', tol,iter,pFlag=0,nType=2,maxIncr=maxIncr)`; `test('PFEM',tolv,tolp,tolrv,tolrp,tolrelv,tolrelp,iter,maxincr,pFlag=0,nType=2)`; `test('RelativeEnergyIncr',tol,iter,pFlag=0,nType=2)`; `test('RelativeNormDispIncr',tol,iter,pFlag=0,nType=2)`; `test('RelativeNormUnbalance',tol,iter,pFlag=0,nType=2)`; `test('RelativeTotalNormDispIncr',tol,iter,pFlag=0,nType=2)`; `test(testType, *testArgs)`

```ts
test(type: "EnergyIncr", tol: number, iter: number, pFlag?: number, nType?: number): this;
test(type: "FixedNumIter", iter: number, pFlag?: number, nType?: number): this;
test(type: "NormDispAndUnbalance", tolIncr: number, tolR: number, iter: number, pFlag?: number, nType?: number, maxincr?: number): this;
test(type: "NormDispIncr", tol: number, iter: number, pFlag?: number, nType?: number): this;
test(type: "NormDispOrUnbalance", tolIncr: number, tolR: number, iter: number, pFlag?: number, nType?: number, maxincr?: number): this;
test(type: "NormUnbalance", tol: number, iter: number, pFlag?: number, nType?: number, maxIncr?: number): this;
test(type: "PFEM", tolv: number, tolp: number, tolrv: number, tolrp: number, tolrelv: number, tolrelp: number, iter: number, maxincr: number, pFlag?: number, nType?: number): this;
test(type: "RelativeEnergyIncr", tol: number, iter: number, pFlag?: number, nType?: number): this;
test(type: "RelativeNormDispIncr", tol: number, iter: number, pFlag?: number, nType?: number): this;
test(type: "RelativeNormUnbalance", tol: number, iter: number, pFlag?: number, nType?: number): this;
test(type: "RelativeTotalNormDispIncr", tol: number, iter: number, pFlag?: number, nType?: number): this;
```

### `testIter`

OpenSees: `testIter()`

```ts
testIter(): this;
```

### `testNorm`

OpenSees: `testNorm()`

```ts
testNorm(): this;
```

### `testNorms`

```ts
testNorms(args?: readonly OpenSeesPyArgument[]): this;
```

### `testUniaxialMaterial`

```ts
testUniaxialMaterial(args?: readonly OpenSeesPyArgument[]): this;
```

### `timeSeries`

OpenSees: `timeSeries('Constant', tag, '-factor', factor=1.0)`; `timeSeries('Linear', tag, '-factor', factor=1.0)`; `timeSeries('Path',tag,'-dt',dt=0.0,'-values',*values,'-time',*time,'-filePath',filePath='','-fileTime',fileTime='','-factor',factor=1.0,'-startTime',startTime=0.0,'-useLast','-prependZero')`; `timeSeries('Pulse',tag,tStart,tEnd,period,'-width',width=0.5,'-shift',shift=0.0,'-factor',factor=1.0,'-zeroShift',zeroShift=0.0)`; `timeSeries('Rectangular', tag,tStart,tEnd,'-factor',factor=1.0)`; `timeSeries(tsType, tsTag, *tsArgs)`; `timeSeries('Triangle',tag,tStart,tEnd,period,'-factor',factor=1.0,'-shift',shift=0.0,'-zeroShift',zeroShift=0.0)`; `timeSeries('Trig', tag, tStart,tEnd,period,'-factor',factor=1.0,'-shift',shift=0.0,'-zeroShift',zeroShift=0.0)`

```ts
timeSeries(type: 'Constant', tag: number): this;
timeSeries(type: 'Constant', tag: number, factorFlag: '-factor', factor: number): this;
timeSeries(type: 'Linear', tag: number): this;
timeSeries(type: 'Linear', tag: number, factorFlag: '-factor', factor: number): this;
timeSeries(type: 'Path', tag: number, flags?: readonly OpenSeesPyArgument[]): this;
timeSeries(type: 'Pulse', tag: number, tStart: number, tEnd: number, period: number, flags?: readonly OpenSeesPyArgument[]): this;
timeSeries(type: 'Rectangular', tag: number, tStart: number, tEnd: number, flags?: readonly OpenSeesPyArgument[]): this;
timeSeries(type: 'Triangle', tag: number, tStart: number, tEnd: number, period: number, flags?: readonly OpenSeesPyArgument[]): this;
timeSeries(type: 'Trig', tag: number, tStart: number, tEnd: number, period: number, flags?: readonly OpenSeesPyArgument[]): this;
```

### `totalCPU`

```ts
totalCPU(args?: readonly OpenSeesPyArgument[]): this;
```

### `transformUtoX`

```ts
transformUtoX(args?: readonly OpenSeesPyArgument[]): this;
```

### `uniaxialMaterial`

OpenSees: `uniaxialMaterial('AxialSp', matTag,sce, fty, fcy, <bte, bty, bcy, fcr>)`; `uniaxialMaterial('AxialSpHD', matTag,sce, fty, fcy, <bte, bty, bth, bcy, fcr, ath>)`; `uniaxialMaterial('Backbone', matTag, backboneTag)`; `uniaxialMaterial('BarSlip', matTag, fc, fy, Es, fu, Eh, db, ld, nb, depth, height, ancLratio=1.0, bsFlag, type, damage='Damage', unit='psi')`; `uniaxialMaterial('Bilin', matTag, K0, as_Plus, as_Neg, My_Plus, My_Neg, Lamda_S, Lamda_C, Lamda_A, Lamda_K, c_S, c_C, c_A, c_K, theta_p_Plus, theta_p_Neg, theta_pc_Plus, theta_pc_Neg, Res_Pos, Res_Neg, theta_u_Plus, theta_u_Neg, D_Plus, D_Neg, nFactor=0.0)`; `uniaxialMaterial('BilinearOilDamper', matTag, K_el, Cd, Fr=1.0, p=1.0, LGap=0.0, NM=1, RelTol=1e-6, AbsTol=1e-10, MaxHalf=15)`; `uniaxialMaterial('Bond_SP01', matTag, Fy, Sy, Fu, Su, b, R)`; `uniaxialMaterial('BoucWen', matTag,alpha, ko, n, gamma, beta, Ao, deltaA, deltaNu, deltaEta)`; `uniaxialMaterial('BWBN', matTag,alpha, ko, n, gamma, beta, Ao, q, zetas, p, Shi, deltaShi, lambda, tol, maxIter)`; `uniaxialMaterial('Cast', matTag, n, bo, h, fy, E, L, b, Ro, cR1, cR2, a1=s2*Pp/Kp, a2=1.0, a3=a4*Pp/Kp, a4=1.0)`; `uniaxialMaterial('CFSSSWP', matTag,height, width, fuf, fyf, tf, Af, fus, fys, ts, np, ds, Vs, sc, dt, openingArea, openingLength)`; `uniaxialMaterial('CFSWSWP', matTag,height, width, fut, tf, Ife, Ifi, ts, np, ds, Vs, sc, nc, type, openingArea, openingLength)`; `uniaxialMaterial('Concrete01', matTag, fpc, epsc0, fpcu, epsU)`; `uniaxialMaterial('Concrete01WithSITC', matTag, fpc, epsc0, fpcu, epsU, endStrainSITC=0.01)`; `uniaxialMaterial('Concrete02', matTag, fpc, epsc0, fpcu, epsU, lambda, ft, Ets)`; `uniaxialMaterial('Concrete02IS', matTag, E0, fpc, epsc0, fpcu, epsU, *optional)`; `uniaxialMaterial('Concrete04', matTag, fc, epsc, epscu, Ec, fct, et, beta)`; `uniaxialMaterial('Concrete06', matTag, fc, e0, n, k, alpha1, fcr, ecr, b, alpha2)`; `uniaxialMaterial('Concrete07', matTag, fc, epsc, Ec, ft, et, xp, xn, r)`; `uniaxialMaterial('ConcreteCM', matTag, fpcc, epcc, Ec, rc, xcrn, ft, et, rt, xcrp, mon, '-GapClose', GapClose=0)`; `uniaxialMaterial('ConcreteD', matTag, fc, epsc, ft, epst, Ec, alphac, alphat, cesp=0.25,etap=1.15)`; `uniaxialMaterial('ConfinedConcrete01', matTag, secType, fpc, Ec, epscu_type, epscu_val, nu, L1, L2, L3, phis, S, fyh, Es0, haRatio, mu, phiLon, '-internal', *internalArgs, '-wrap', *wrapArgs, '-gravel', '-silica', '-tol', tol, '-maxNumIter', maxNumIter, '-epscuLimit', epscuLimit, '-stRatio', stRatio)`; `uniaxialMaterial('Damper', matTag, otherTag, *args)`; `uniaxialMaterial('Dodd_Restrepo', matTag, Fy, Fsu, ESH, ESU, Youngs, ESHI, FSHI, OmegaFac=1.0)`; `uniaxialMaterial('ECC01', matTag, sigt0, epst0, sigt1, epst1, epst2, sigc0, epsc0, epsc1, alphaT1, alphaT2, alphaC, alphaCU, betaT, betaC)`; `uniaxialMaterial('ElasticBilin', matTag, EP1, EP2, epsP2, EN1=EP1, EN2=EP2, epsN2=-epsP2)`; `uniaxialMaterial('ElasticMultiLinear', matTag, eta=0.0, '-strain', *strain, '-stress', *stress)`; `uniaxialMaterial('ElasticPP', matTag, E, epsyP, epsyN=epsyP, eps0=0.0)`; `uniaxialMaterial('ElasticPPGap', matTag, E, Fy, gap, eta=0.0, damage='noDamage')`; `uniaxialMaterial('Elastic', matTag, E, eta=0.0, Eneg=E)`; `uniaxialMaterial('ENT', matTag, E)`; `uniaxialMaterial('Fatigue', matTag, otherTag, '-E0', E0=0.191, '-m', m=-0.458, '-min', min=-1e16, '-max', max=1e16)`; `uniaxialMaterial('FRPConfinedConcrete', matTag, fpc1, fpc2, epsc0, D, c, Ej, Sj, tj, eju, S, fyl, fyh, dlong, dtrans, Es, nu0, k, useBuck)`; `uniaxialMaterial('FRPConfinedConcrete02', matTag, fc0, Ec, ec0, <'-JacketC', tfrp, Efrp, erup, R>, <'-Ultimate', fcu, ecu>, ft, Ets, Unit)`; `uniaxialMaterial('Hardening', matTag, E, sigmaY, H_iso, H_kin, eta=0.0)`; `uniaxialMaterial('HyperbolicGapMaterial', matTag, Kmax, Kur, Rf, Fult, gap)`; `uniaxialMaterial('Hysteretic', matTag, *p1, *p2, *p3=p2, *n1, *n2, *n3=n2, pinchX, pinchY, damage1, damage2, beta=0.0)`; `uniaxialMaterial('ImpactMaterial', matTag, K1, K2, sigy, gap)`; `uniaxialMaterial('InitStrainMaterial', matTag, otherTag, initStrain)`; `uniaxialMaterial('InitStressMaterial', matTag, otherTag, initStress)`; `uniaxialMaterial('KikuchiAikenHDR', matTag, tp, ar, hr, <'-coGHU', cg, ch, cu>, <'-coMSS', rs, rf>)`; `uniaxialMaterial('KikuchiAikenLRB', matTag, type, ar, hr, gr, ap, tp, alph, beta, <'-T', temp>, <'-coKQ', rk, rq>, <'-coMSS', rs, rf>)`; `uniaxialMaterial('LimitState', matTag, s1p, e1p, s2p, e2p, s3p, e3p, s1n, e1n, s2n, e2n, s3n, e3n, pinchX, pinchY, damage1, damage2, beta, curveTag, curveType)`; `uniaxialMaterial('Masonry', matTag, Fm, Ft, Um, Uult, Ucl, Emo, L, a1, a2, D1, D2, Ach, Are, Ba, Bch, Gun, Gplu, Gplr, Exp1, Exp2, IENV)`; `uniaxialMaterial('MinMax', matTag, otherTag, '-min', minStrain=1e-16, '-max', maxStrain=1e16)`; `uniaxialMaterial('ModIMKPeakOriented', matTag, K0, as_Plus, as_Neg, My_Plus, My_Neg, Lamda_S, Lamda_C, Lamda_A, Lamda_K, c_S, c_C, c_A, c_K, theta_p_Plus, theta_p_Neg, theta_pc_Plus, theta_pc_Neg, Res_Pos, Res_Neg, theta_u_Plus, theta_u_Neg, D_Plus, D_Neg)`; `uniaxialMaterial('ModIMKPinching', matTag, K0, as_Plus, as_Neg, My_Plus, My_Neg, FprPos, FprNeg, A_pinch, Lamda_S, Lamda_C, Lamda_A, Lamda_K, c_S, c_C, c_A, c_K, theta_p_Plus, theta_p_Neg, theta_pc_Plus, theta_pc_Neg, Res_Pos, Res_Neg, theta_u_Plus, theta_u_Neg, D_Plus, D_Neg)`; `uniaxialMaterial('MultiLinear', matTag, *pts)`; `uniaxialMaterial('Multiplier', matTag, otherTag, multiplier)`; `uniaxialMaterial('Parallel', matTag, *MatTags, '-factors', *factorArgs)`; `uniaxialMaterial('PathIndependent', matTag, OtherTag)`; `uniaxialMaterial('Penalty', matTag, otherTag, penalty, *args)`; `uniaxialMaterial('Pinching4', matTag,ePf1, ePd1, ePf2, ePd2, ePf3, ePd3, ePf4, ePd4, <eNf1, eNd1, eNf2, eNd2, eNf3, eNd3, eNf4, eNd4>, rDispP, rForceP, uForceP, <rDispN, rForceN, uForceN>, gK1, gK2, gK3, gK4, gKLim, gD1, gD2, gD3, gD4, gDLim, gF1, gF2, gF3, gF4, gFLim, gE, dmgType)`; `uniaxialMaterial('PinchingLimitStateMaterial', matTag,nodeT, nodeB, driftAxis, Kelas, crvTyp, crvTag, YpinchUPN, YpinchRPN, XpinchRPN, YpinchUNP, YpinchRNP, XpinchRNP, dmgStrsLimE, dmgDispMax, dmgE1, dmgE2, dmgE3, dmgE4, dmgELim, dmgR1, dmgR2, dmgR3, dmgR4, dmgRLim, dmgRCyc, dmgS1, dmgS2, dmgS3, dmgS4, dmgSLim, dmgSCyc)`; `uniaxialMaterial('PinchingLimitStateMaterial', matTag,dnodeT, nodeB, driftAxis, Kelas, crvTyp, crvTag, eleTag, b, d, h, a, st, As, Acc, ld, db, rhot, fc, fy, fyt)`; `uniaxialMaterial('Pipe', matTag, nt, T1, E1, xnu1, alpT1, <T2, E2, xnu2, alpT2, ... >)`; `uniaxialMaterial('PyLiq1', matTag,soilType, pult, Y50, Cd, c, pRes, ele1, ele2)`; `uniaxialMaterial('PyLiq1', matTag,soilType, pult, Y50, Cd, c, pRes, '-timeSeries', timeSeriesTag)`; `uniaxialMaterial('PySimple1', matTag, soilType, pult, Y50, Cd, c=0.0)`; `uniaxialMaterial('QzLiq1', matTag,soilType, qult, Z50, Cd, c, alpha, ele1, ele2)`; `uniaxialMaterial('QzLiq1', matTag,soilType, qult, Z50, Cd, c, alpha, '-timeSeries', timeSeriesTag)`; `uniaxialMaterial('QzSimple1', matTag,qzType, qult, Z50, suction=0.0, c=0.0)`; `uniaxialMaterial('RambergOsgoodSteel', matTag, fy, E0, a, n)`; `uniaxialMaterial('ReinforcingSteel', matTag, fy, fu, Es, Esh, eps_sh, eps_ult, '-GABuck', lsr, beta, r, gamma, '-DMBuck', lsr, alpha=1.0, '-CMFatigue', Cf, alpha, Cd, '-IsoHard', a1=4.3, limit=1.0, '-MPCurveParams',R1=0.333,R2=18.0,R3=4.0)`; `uniaxialMaterial('SAWS', matTag, F0, FI, DU, S0, R1, R2, R3, R4, alpha, beta)`; `uniaxialMaterial('SelfCentering', matTag, k1, k2, sigAct, beta, epsSlip=0, epsBear=0, rBear=k1)`; `uniaxialMaterial('Series', matTag, *matTags)`; `uniaxialMaterial('SimpleFracture', matTag, otherTag, maxStrain)`; `uniaxialMaterial('Steel01', matTag, Fy, E0, b, a1, a2, a3, a4)`; `uniaxialMaterial('Steel01Thermal', matTag, Fy, E0, b, a1, a2, a3, a4)`; `uniaxialMaterial('Steel02', matTag, Fy, E0, b, *params, a1=a2*Fy/E0, a2=1.0, a3=a4*Fy/E0, a4=1.0, sigInit=0.0)`; `uniaxialMaterial('Steel4', matTag, Fy, E0, '-asym', '-kin', b_k, *params, b_kc, R_0c, r_1c, r_2c, '-iso', b_i, rho_i, b_l, R_i, l_yp, b_ic, rho_ic, b_lc, R_ic, '-ult', f_u, R_u, f_uc, R_uc, '-init', sig_init, '-mem', cycNum)`; `uniaxialMaterial('SteelMPF', matTag, fyp, fyn, E0, bp, bn, *params, a1=0.0, a2=1.0, a3=0.0, a4=1.0)`; `uniaxialMaterial('TDConcrete', matTag, fc, fct, Ec, beta, tD, epsshu, psish, Tcr, phiu, psicr1, psicr2, tcast)`; `uniaxialMaterial('TDConcreteEXP', matTag, fc, fct, Ec, beta, tD, epsshu, psish, Tcr, epscru, sigCr, psicr1, psicr2, tcast)`; `uniaxialMaterial('TDConcreteMC10', matTag, fc, fct, Ec, Ecm, beta, tD, epsba, epsbb, epsda, epsdb, phiba, phibb, phida, phidb, tcast, cem)`; `uniaxialMaterial('TDConcreteMC10NL', matTag, fc, fcu, epscu, fct, Ec, Ecm, beta, tD, epsba, epsbb, epsda, epsdb, phiba, phibb, phida, phidb, tcast, cem)`; `uniaxialMaterial('TensionOnly', matTag, otherTag, *args)`; `uniaxialMaterial('TzLiq1', matTag, tzType, tult, z50, c, ele1, ele2)`; `uniaxialMaterial('TzLiq1', matTag, tzType, tult, z50, c, '-timeSeries', timeSeriesTag)`; `uniaxialMaterial('TzSimple1', matTag, soilType, tult, z50, c=0.0)`; `uniaxialMaterial(matType, matTag, *matArgs)`; `uniaxialMaterial('Viscous', matTag, C, alpha)`; `uniaxialMaterial('ViscousDamper', matTag, K_el, Cd, alpha, LGap=0.0, NM=1, RelTol=1e-6, AbsTol=1e-10, MaxHalf=15)`

```ts
uniaxialMaterial(type: "AxialSp", matTag: number, sce: number, fty: number, fcy: number, bte?: number, bty?: number, bcy?: number, fcr?: number): this;
uniaxialMaterial(type: "AxialSpHD", matTag: number, sce: number, fty: number, fcy: number, bte?: number, bty?: number, bth?: number, bcy?: number, fcr?: number, ath?: number): this;
uniaxialMaterial(type: "Backbone", matTag: number, backboneTag: number): this;
uniaxialMaterial(type: "BarSlip", matTag: number, fc: number, fy: number, Es: number, fu: number, Eh: number, db: number, ld: number, nb: number, depth: number, height: number, ancLratio: number | undefined, bsFlag: string, type2: string, damage?: string, unit?: string): this;
uniaxialMaterial(type: "Bilin", matTag: number, K0: number, as_Plus: number, as_Neg: number, My_Plus: number, My_Neg: number, Lamda_S: number, Lamda_C: number, Lamda_A: number, Lamda_K: number, c_S: number, c_C: number, c_A: number, c_K: number, theta_p_Plus: number, theta_p_Neg: number, theta_pc_Plus: number, theta_pc_Neg: number, Res_Pos: number, Res_Neg: number, theta_u_Plus: number, theta_u_Neg: number, D_Plus: number, D_Neg: number, nFactor?: number): this;
uniaxialMaterial(type: "BilinearOilDamper", matTag: number, K_el: number, Cd: number, Fr?: number, p?: number, LGap?: number, NM?: number, RelTol?: number, AbsTol?: number, MaxHalf?: number): this;
uniaxialMaterial(type: "Bond_SP01", matTag: number, Fy: number, Sy: number, Fu: number, Su: number, b: number, R: number): this;
uniaxialMaterial(type: "BoucWen", matTag: number, alpha: number, ko: number, n: number, gamma: number, beta: number, Ao: number, deltaA: number, deltaNu: number, deltaEta: number): this;
uniaxialMaterial(type: "BWBN", matTag: number, alpha: number, ko: number, n: number, gamma: number, beta: number, Ao: number, q: number, zetas: number, p: number, Shi: number, deltaShi: number, lambda: number, tol: number, maxIter: number): this;
uniaxialMaterial(type: "Cast", matTag: number, n: number, bo: number, h: number, fy: number, E: number, L: number, b: number, Ro: number, cR1: number, cR2: number, a1?: number, a2?: number, a3?: number, a4?: number): this;
uniaxialMaterial(type: "CFSSSWP", matTag: number, height: number, width: number, fuf: number, fyf: number, tf: number, Af: number, fus: number, fys: number, ts: number, np: number, ds: number, Vs: number, sc: number, dt: number, openingArea: number, openingLength: number): this;
uniaxialMaterial(type: "CFSWSWP", matTag: number, height: number, width: number, fut: number, tf: number, Ife: number, Ifi: number, ts: number, np: number, ds: number, Vs: number, sc: number, nc: number, type2: number, openingArea: number, openingLength: number): this;
uniaxialMaterial(type: "Concrete01", matTag: number, fpc: number, epsc0: number, fpcu: number, epsU: number): this;
uniaxialMaterial(type: "Concrete01WithSITC", matTag: number, fpc: number, epsc0: number, fpcu: number, epsU: number, endStrainSITC?: number): this;
uniaxialMaterial(type: "Concrete02", matTag: number, fpc: number, epsc0: number, fpcu: number, epsU: number, lambda: number, ft: number, Ets: number): this;
uniaxialMaterial(type: "Concrete02IS", matTag: number, E0: number, fpc: number, epsc0: number, fpcu: number, epsU: number, optional?: readonly number[]): this;
uniaxialMaterial(type: "Concrete04", matTag: number, fc: number, epsc: number, epscu: number, Ec: number, fct: number, et: number, beta: number): this;
uniaxialMaterial(type: "Concrete06", matTag: number, fc: number, e0: number, n: number, k: number, alpha1: number, fcr: number, ecr: number, b: number, alpha2: number): this;
uniaxialMaterial(type: "Concrete07", matTag: number, fc: number, epsc: number, Ec: number, ft: number, et: number, xp: number, xn: number, r: number): this;
uniaxialMaterial(type: "ConcreteCM", matTag: number, fpcc: number, epcc: number, Ec: number, rc: number, xcrn: number, ft: number, et: number, rt: number, xcrp: number, mon: number, GapClose: "-GapClose", GapClose2?: number): this;
uniaxialMaterial(type: "ConcreteD", matTag: number, fc: number, epsc: number, ft: number, epst: number, Ec: number, alphac: number, alphat: number, cesp?: number, etap?: number): this;
uniaxialMaterial(type: "ConfinedConcrete01", matTag: number, secType: string, fpc: number, Ec: number, epscu_type: string, epscu_val: number, nu: string, L1: number, L2: number, L3: number, phis: number, S: number, fyh: number, Es0: number, haRatio: number, mu: number, phiLon: number, internal: "-internal", internalArgs: readonly number[], wrap: "-wrap", wrapArgs: readonly number[], gravel: "-gravel", silica: "-silica", tol: "-tol", tol2: number, maxNumIter: "-maxNumIter", maxNumIter2: number, epscuLimit: "-epscuLimit", epscuLimit2: number, stRatio: "-stRatio", stRatio2: number): this;
uniaxialMaterial(type: "Damper", matTag: number, otherTag: number, args?: readonly number[]): this;
uniaxialMaterial(type: "Dodd_Restrepo", matTag: number, Fy: number, Fsu: number, ESH: number, ESU: number, Youngs: number, ESHI: number, FSHI: number, OmegaFac?: number): this;
uniaxialMaterial(type: "ECC01", matTag: number, sigt0: number, epst0: number, sigt1: number, epst1: number, epst2: number, sigc0: number, epsc0: number, epsc1: number, alphaT1: number, alphaT2: number, alphaC: number, alphaCU: number, betaT: number, betaC: number): this;
uniaxialMaterial(type: "ElasticBilin", matTag: number, EP1: number, EP2: number, epsP2: number, EN1?: number, EN2?: number, epsN2?: number): this;
uniaxialMaterial(type: "ElasticMultiLinear", matTag: number, eta: number | undefined, strain: "-strain", strain2: readonly number[], stress: "-stress", stress2?: readonly number[]): this;
uniaxialMaterial(type: "ElasticPP", matTag: number, E: number, epsyP: number, epsyN?: number, eps0?: number): this;
uniaxialMaterial(type: "ElasticPPGap", matTag: number, E: number, Fy: number, gap: number, eta?: number, damage?: string): this;
uniaxialMaterial(type: "Elastic", matTag: number, E: number, eta?: number, Eneg?: number): this;
uniaxialMaterial(type: "ENT", matTag: number, E: number): this;
uniaxialMaterial(type: "Fatigue", matTag: number, otherTag: number, E0: "-E0", E02: number | undefined, m: "-m", m2: number | undefined, min: "-min", min2: number | undefined, max: "-max", max2?: number): this;
uniaxialMaterial(type: "FRPConfinedConcrete", matTag: number, fpc1: number, fpc2: number, epsc0: number, D: number, c: number, Ej: number, Sj: number, tj: number, eju: number, S: number, fyl: number, fyh: number, dlong: number, dtrans: number, Es: number, nu0: number, k: number, useBuck: number): this;
uniaxialMaterial(type: "FRPConfinedConcrete02", matTag: number, fc0: number, Ec: number, ec0: number, JacketC: "-JacketC" | undefined, tfrp: number | undefined, Efrp: number | undefined, erup: number | undefined, R: number | undefined, Ultimate: "-Ultimate" | undefined, fcu: number | undefined, ecu: number | undefined, ft: number, Ets: number, Unit: number): this;
uniaxialMaterial(type: "Hardening", matTag: number, E: number, sigmaY: number, H_iso: number, H_kin: number, eta?: number): this;
uniaxialMaterial(type: "HyperbolicGapMaterial", matTag: number, Kmax: number, Kur: number, Rf: number, Fult: number, gap: number): this;
uniaxialMaterial(type: "Hysteretic", matTag: number, p1: readonly number[], p2: readonly number[], p3: readonly number[] | undefined, n1: readonly number[], n2: readonly number[], n3: readonly number[] | undefined, pinchX: number, pinchY: number, damage1: number, damage2: number, beta?: number): this;
uniaxialMaterial(type: "ImpactMaterial", matTag: number, K1: number, K2: number, sigy: number, gap: number): this;
uniaxialMaterial(type: "InitStrainMaterial", matTag: number, otherTag: number, initStrain: number): this;
uniaxialMaterial(type: "InitStressMaterial", matTag: number, otherTag: number, initStress: number): this;
uniaxialMaterial(type: "KikuchiAikenHDR", matTag: number, tp: string, ar: number, hr: number, coGHU?: "-coGHU", cg?: number, ch?: number, cu?: number, coMSS?: "-coMSS", rs?: number, rf?: number): this;
uniaxialMaterial(type: "KikuchiAikenLRB", matTag: number, type2: number, ar: number, hr: number, gr: number, ap: number, tp: number, alph: number, beta: number, T?: "-T", temp?: number, coKQ?: "-coKQ", rk?: number, rq?: number, coMSS?: "-coMSS", rs?: number, rf?: number): this;
uniaxialMaterial(type: "LimitState", matTag: number, s1p: number, e1p: number, s2p: number, e2p: number, s3p: number, e3p: number, s1n: number, e1n: number, s2n: number, e2n: number, s3n: number, e3n: number, pinchX: number, pinchY: number, damage1: number, damage2: number, beta: number, curveTag: number, curveType: number): this;
uniaxialMaterial(type: "Masonry", matTag: number, Fm: number, Ft: number, Um: number, Uult: number, Ucl: number, Emo: number, L: number, a1: number, a2: number, D1: number, D2: number, Ach: number, Are: number, Ba: number, Bch: number, Gun: number, Gplu: number, Gplr: number, Exp1: number, Exp2: number, IENV: number): this;
uniaxialMaterial(type: "MinMax", matTag: number, otherTag: number, min: "-min", minStrain: number | undefined, max: "-max", maxStrain?: number): this;
uniaxialMaterial(type: "ModIMKPeakOriented", matTag: number, K0: number, as_Plus: number, as_Neg: number, My_Plus: number, My_Neg: number, Lamda_S: number, Lamda_C: number, Lamda_A: number, Lamda_K: number, c_S: number, c_C: number, c_A: number, c_K: number, theta_p_Plus: number, theta_p_Neg: number, theta_pc_Plus: number, theta_pc_Neg: number, Res_Pos: number, Res_Neg: number, theta_u_Plus: number, theta_u_Neg: number, D_Plus: number, D_Neg: number): this;
uniaxialMaterial(type: "ModIMKPinching", matTag: number, K0: number, as_Plus: number, as_Neg: number, My_Plus: number, My_Neg: number, FprPos: number, FprNeg: number, A_pinch: number, Lamda_S: number, Lamda_C: number, Lamda_A: number, Lamda_K: number, c_S: number, c_C: number, c_A: number, c_K: number, theta_p_Plus: number, theta_p_Neg: number, theta_pc_Plus: number, theta_pc_Neg: number, Res_Pos: number, Res_Neg: number, theta_u_Plus: number, theta_u_Neg: number, D_Plus: number, D_Neg: number): this;
uniaxialMaterial(type: "MultiLinear", matTag: number, pts?: readonly number[]): this;
uniaxialMaterial(type: "Multiplier", matTag: number, otherTag: number, multiplier: number): this;
uniaxialMaterial(type: "Parallel", matTag: number, MatTags: readonly number[], factors: "-factors", factorArgs?: readonly number[]): this;
uniaxialMaterial(type: "PathIndependent", matTag: number, OtherTag: number): this;
uniaxialMaterial(type: "Penalty", matTag: number, otherTag: number, penalty: number, args?: readonly number[]): this;
uniaxialMaterial(type: "Pinching4", matTag: number, ePf1: number, ePd1: number, ePf2: number, ePd2: number, ePf3: number, ePd3: number, ePf4: number, ePd4: number, eNf1: number | undefined, eNd1: number | undefined, eNf2: number | undefined, eNd2: number | undefined, eNf3: number | undefined, eNd3: number | undefined, eNf4: number | undefined, eNd4: number | undefined, rDispP: number, rForceP: number, uForceP: number, rDispN: number | undefined, rForceN: number | undefined, uForceN: number | undefined, gK1: number, gK2: number, gK3: number, gK4: number, gKLim: number, gD1: number, gD2: number, gD3: number, gD4: number, gDLim: number, gF1: number, gF2: number, gF3: number, gF4: number, gFLim: number, gE: number, dmgType: string): this;
uniaxialMaterial(type: "PinchingLimitStateMaterial", matTag: number, nodeT: number, nodeB: number, driftAxis: number, Kelas: number, crvTyp: number, crvTag: number, YpinchUPN: number, YpinchRPN: number, XpinchRPN: number, YpinchUNP: number, YpinchRNP: number, XpinchRNP: number, dmgStrsLimE: number, dmgDispMax: number, dmgE1: number, dmgE2: number, dmgE3: number, dmgE4: number, dmgELim: number, dmgR1: number, dmgR2: number, dmgR3: number, dmgR4: number, dmgRLim: number, dmgRCyc: number, dmgS1: number, dmgS2: number, dmgS3: number, dmgS4: number, dmgSLim: number, dmgSCyc: number): this;
uniaxialMaterial(type: "PinchingLimitStateMaterial", matTag: number, dnodeT: number, nodeB: number, driftAxis: number, Kelas: number, crvTyp: number, crvTag: number, eleTag: number, b: number, d: number, h: number, a: number, st: number, As: number, Acc: number, ld: number, db: number, rhot: number, fc: number, fy: number, fyt: number): this;
uniaxialMaterial(type: "Pipe", matTag: number, nt: number, T1: number, E1: number, xnu1: number, alpT1: number, T2?: number, E2?: number, xnu2?: number, alpT2?: number, arg12?: number): this;
uniaxialMaterial(type: "PyLiq1", matTag: number, soilType: number, pult: number, Y50: number, Cd: number, c: number, pRes: number, ele1: number, ele2: number): this;
uniaxialMaterial(type: "PyLiq1", matTag: number, soilType: number, pult: number, Y50: number, Cd: number, c: number, pRes: number, timeSeries: "-timeSeries", timeSeriesTag: number): this;
uniaxialMaterial(type: "PySimple1", matTag: number, soilType: number, pult: number, Y50: number, Cd: number, c?: number): this;
uniaxialMaterial(type: "QzLiq1", matTag: number, soilType: number, qult: number, Z50: number, Cd: number, c: number, alpha: number, ele1: number, ele2: number): this;
uniaxialMaterial(type: "QzLiq1", matTag: number, soilType: number, qult: number, Z50: number, Cd: number, c: number, alpha: number, timeSeries: "-timeSeries", timeSeriesTag: number): this;
uniaxialMaterial(type: "QzSimple1", matTag: number, qzType: number, qult: number, Z50: number, suction?: number, c?: number): this;
uniaxialMaterial(type: "RambergOsgoodSteel", matTag: number, fy: number, E0: number, a: number, n: number): this;
uniaxialMaterial(type: "ReinforcingSteel", matTag: number, fy: number, fu: number, Es: number, Esh: number, eps_sh: number, eps_ult: number, GABuck: "-GABuck", lsr: number, beta: number, r: number, gamma: number, DMBuck: "-DMBuck", lsr2: number, alpha: number | undefined, CMFatigue: "-CMFatigue", Cf: number, alpha2: number, Cd: number, IsoHard: "-IsoHard", a1: number | undefined, limit: number | undefined, MPCurveParams: "-MPCurveParams", R1?: number, R2?: number, R3?: number): this;
uniaxialMaterial(type: "SAWS", matTag: number, F0: number, FI: number, DU: number, S0: number, R1: number, R2: number, R3: number, R4: number, alpha: number, beta: number): this;
uniaxialMaterial(type: "SelfCentering", matTag: number, k1: number, k2: number, sigAct: number, beta: number, epsSlip?: number, epsBear?: number, rBear?: number): this;
uniaxialMaterial(type: "Series", matTag: number, matTags?: readonly number[]): this;
uniaxialMaterial(type: "SimpleFracture", matTag: number, otherTag: number, maxStrain: number): this;
uniaxialMaterial(type: "Steel4", matTag: number, Fy: number, E0: number, asym: "-asym", kin: "-kin", b_k: number, params: readonly number[], b_kc: number, R_0c: number, r_1c: number, r_2c: number, iso: "-iso", b_i: number, rho_i: number, b_l: number, R_i: number, l_yp: number, b_ic: number, rho_ic: number, b_lc: number, R_ic: number, ult: "-ult", f_u: number, R_u: number, f_uc: number, R_uc: number, init: "-init", sig_init: number, mem: "-mem", cycNum: number): this;
uniaxialMaterial(type: "SteelMPF", matTag: number, fyp: number, fyn: number, E0: number, bp: number, bn: number, params: readonly number[], a1?: number, a2?: number, a3?: number, a4?: number): this;
uniaxialMaterial(type: "TDConcrete", matTag: number, fc: number, fct: number, Ec: number, beta: number, tD: number, epsshu: number, psish: number, Tcr: number, phiu: number, psicr1: number, psicr2: number, tcast: number): this;
uniaxialMaterial(type: "TDConcreteEXP", matTag: number, fc: number, fct: number, Ec: number, beta: number, tD: number, epsshu: number, psish: number, Tcr: number, epscru: number, sigCr: number, psicr1: number, psicr2: number, tcast: number): this;
uniaxialMaterial(type: "TDConcreteMC10", matTag: number, fc: number, fct: number, Ec: number, Ecm: number, beta: number, tD: number, epsba: number, epsbb: number, epsda: number, epsdb: number, phiba: number, phibb: number, phida: number, phidb: number, tcast: number, cem: number): this;
uniaxialMaterial(type: "TDConcreteMC10NL", matTag: number, fc: number, fcu: number, epscu: number, fct: number, Ec: number, Ecm: number, beta: number, tD: number, epsba: number, epsbb: number, epsda: number, epsdb: number, phiba: number, phibb: number, phida: number, phidb: number, tcast: number, cem: number): this;
uniaxialMaterial(type: "TensionOnly", matTag: number, otherTag: number, args?: readonly number[]): this;
uniaxialMaterial(type: "TzLiq1", matTag: number, tzType: number, tult: number, z50: number, c: number, ele1: number, ele2: number): this;
uniaxialMaterial(type: "TzLiq1", matTag: number, tzType: number, tult: number, z50: number, c: number, timeSeries: "-timeSeries", timeSeriesTag: number): this;
uniaxialMaterial(type: "TzSimple1", matTag: number, soilType: number, tult: number, z50: number, c?: number): this;
uniaxialMaterial(type: "Viscous", matTag: number, C: number, alpha: number): this;
uniaxialMaterial(type: "ViscousDamper", matTag: number, K_el: number, Cd: number, alpha: number, LGap?: number, NM?: number, RelTol?: number, AbsTol?: number, MaxHalf?: number): this;
uniaxialMaterial(type: 'Steel01', matTag: number, Fy: number, E0: number, b: number): this;
uniaxialMaterial(type: 'Steel01', matTag: number, Fy: number, E0: number, b: number, a1: number, a2: number, a3: number, a4: number): this;
uniaxialMaterial(type: 'Steel01Thermal', matTag: number, Fy: number, E0: number, b: number): this;
uniaxialMaterial(type: 'Steel01Thermal', matTag: number, Fy: number, E0: number, b: number, a1: number, a2: number, a3: number, a4: number): this;
uniaxialMaterial(type: 'Steel02', matTag: number, Fy: number, E0: number, b: number, R0: number, cR1: number, cR2: number, a1?: number, a2?: number, a3?: number, a4?: number, sigInit?: number): this;
```

### `unloadingRule`

```ts
unloadingRule(args?: readonly OpenSeesPyArgument[]): this;
```

### `updateElementDomain`

OpenSees: `updateElementDomain()`

```ts
updateElementDomain(): this;
```

### `updateMaterialStage`

OpenSees: `updateMaterialStage('-material',matTag,'-stage',value,'-parameter',paramTag)`

```ts
updateMaterialStage(type: "-material", matTag: number, stage: "-stage", value: number, parameter: "-parameter", paramTag: number): this;
```

### `updateParameter`

OpenSees: `updateParameter(tag, newValue)`

```ts
updateParameter(tag: number, newValue: number): this;
```

### `version`

OpenSees: `version()`

```ts
version(): this;
```

### `wipe`

OpenSees: `wipe()`

```ts
wipe(): this;
```

### `wipeAnalysis`

OpenSees: `wipeAnalysis()`

```ts
wipeAnalysis(): this;
```

### `wipeReliability`

```ts
wipeReliability(args?: readonly OpenSeesPyArgument[]): this;
```
