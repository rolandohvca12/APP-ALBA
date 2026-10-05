import { readFileSync, writeFileSync } from 'node:fs';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const packageJson = JSON.parse(readFileSync(resolve(root, 'package.json'), 'utf8'));
const apiReference = readFileSync(resolve(root, 'API_REFERENCE.md'), 'utf8');
const apiCoverage = readFileSync(resolve(root, 'API_COVERAGE.md'), 'utf8');
const outputPath = resolve(root, 'OPENSEESJS_API_MANUAL.tex');

function escapeLatex(value) {
  return value
    .replaceAll('\\', '\\textbackslash{}')
    .replaceAll('&', '\\&')
    .replaceAll('%', '\\%')
    .replaceAll('$', '\\$')
    .replaceAll('#', '\\#')
    .replaceAll('_', '\\_')
    .replaceAll('{', '\\{')
    .replaceAll('}', '\\}')
    .replaceAll('~', '\\textasciitilde{}')
    .replaceAll('^', '\\textasciicircum{}');
}

function inlineMarkdown(value) {
  const pieces = value.split(/(`[^`]*`)/g);
  return pieces.map(piece => {
    if (piece.startsWith('`') && piece.endsWith('`')) {
      return `\\code{${escapeLatex(piece.slice(1, -1))}}`;
    }
    return escapeLatex(piece);
  }).join('');
}

function safeListing(value) {
  return value
    .replaceAll('```', '')
    .replaceAll('\u0000', '')
    .trim();
}

function parseCommands(markdown) {
  const commands = [];
  const headings = [...markdown.matchAll(/^### `([^`]+)`\s*$/gm)];
  for (let index = 0; index < headings.length; index++) {
    const match = headings[index];
    const next = headings[index + 1];
    const bodyStart = match.index + match[0].length;
    const body = markdown.slice(bodyStart, next?.index ?? markdown.length).trim();
    const codeMatch = body.match(/```ts\s*([\s\S]*?)```/);
    const description = body.replace(/```ts[\s\S]*?```/, '').trim();
    commands.push({
      name: match[1],
      description,
      signatures: codeMatch?.[1]?.trim() ?? '',
    });
  }
  return commands;
}

function parseCoverage(markdown) {
  return markdown.split(/\r?\n/).flatMap(line => {
    const match = line.match(/^\| `([^`]+)` \| ([^|]+) \| ([^|]+) \| ([^|]+) \|$/);
    if (!match) return [];
    return [{ api: match[1], inference: match[2].trim(), transport: match[3].trim(), test: match[4].trim() }];
  });
}

const commands = parseCommands(apiReference);
const coverage = parseCoverage(apiCoverage);
if (commands.length !== 233) throw new Error(`Expected 233 API commands, found ${commands.length}.`);
if (coverage.length !== 233) throw new Error(`Expected 233 coverage rows, found ${coverage.length}.`);

const commandCatalog = commands.map(command => {
  const description = command.description
    ? `\\paragraph{Forma de OpenSees.}\n\\begin{lstlisting}[style=syntax]\n${safeListing(command.description.replace(/^OpenSees:\s*/, '').replaceAll('`', ''))}\n\\end{lstlisting}\n`
    : String.raw`\paragraph{Forma de OpenSees.} Consulte la documentaci\'on oficial de la versi\'on 3.8 para la sem\'antica del comando.` + '\n';
  const signatures = command.signatures
    ? `\\paragraph{Firmas TypeScript.}\n\\begin{lstlisting}[style=typescript]\n${safeListing(command.signatures)}\n\\end{lstlisting}`
    : String.raw`\paragraph{Firmas TypeScript.} No se encontr\'o una firma p\'ublica en el inventario generado.`;
  return `\\subsection{${escapeLatex(command.name)}}
\\label{cmd:${command.name.replace(/[^A-Za-z0-9]+/g, '-')}}
${description}${signatures}
`;
}).join('\n');

const coverageRows = coverage.map(row =>
  `${escapeLatex(row.api)} & ${escapeLatex(row.inference)} & ${escapeLatex(row.transport)} & ${escapeLatex(row.test)} \\\\ \\hline`,
).join('\n');

const manual = String.raw`\documentclass[11pt,oneside]{book}
\usepackage[utf8]{inputenc}
\usepackage[T1]{fontenc}
\usepackage[spanish,es-nodecimaldot]{babel}
\usepackage[a4paper,margin=24mm,headheight=15pt]{geometry}
\usepackage{lmodern}
\usepackage{microtype}
\usepackage{xcolor}
\usepackage{booktabs}
\usepackage{longtable}
\usepackage{tabularx}
\usepackage{array}
\usepackage{enumitem}
\usepackage{listings}
\usepackage{fancyhdr}
\usepackage{hyperref}
\usepackage{bookmark}
\usepackage{titlesec}

\definecolor{ManualNavy}{HTML}{17324D}
\definecolor{ManualTeal}{HTML}{087E8B}
\definecolor{ManualBlue}{HTML}{1769AA}
\definecolor{ManualGray}{HTML}{5B6573}
\definecolor{ManualLight}{HTML}{F4F7F9}
\definecolor{ManualRule}{HTML}{CAD4DC}
\definecolor{CodeKeyword}{HTML}{7A3E9D}
\definecolor{CodeString}{HTML}{176B3A}
\definecolor{CodeComment}{HTML}{69737D}

\hypersetup{
  colorlinks=true,
  linkcolor=ManualBlue,
  urlcolor=ManualTeal,
  citecolor=ManualBlue,
  pdftitle={Manual de la API openseesjs ${packageJson.version}},
  pdfauthor={APP-ALBA contributors},
  pdfsubject={API TypeScript para OpenSees 3.8},
  pdfkeywords={OpenSees, TypeScript, JavaScript, analisis estructural, elementos finitos}
}

\setcounter{secnumdepth}{2}
\setcounter{tocdepth}{1}
\setlist{nosep,leftmargin=6mm}
\renewcommand{\arraystretch}{1.18}
\newcommand{\code}[1]{\texttt{\detokenize{#1}}}
\newcommand{\pkg}{\texttt{openseesjs}}
\newcommand{\versionactual}{${packageJson.version}}

\titleformat{\chapter}[display]
  {\normalfont\bfseries\color{ManualNavy}}
  {\filleft\Large\chaptertitlename\ \thechapter}
  {1ex}
  {\titlerule\vspace{1ex}\Huge}
\titleformat{\section}{\Large\bfseries\color{ManualNavy}}{\thesection}{0.75em}{}
\titleformat{\subsection}{\large\bfseries\color{ManualTeal}}{\thesubsection}{0.75em}{}

\pagestyle{fancy}
\fancyhf{}
\fancyhead[L]{\textcolor{ManualGray}{\pkg\ API Manual}}
\fancyhead[R]{\textcolor{ManualGray}{v\versionactual}}
\fancyfoot[C]{\thepage}
\renewcommand{\headrulewidth}{0.4pt}

\lstdefinelanguage{TypeScript}{
  keywords={abstract,any,as,async,await,boolean,break,case,class,const,constructor,continue,declare,default,do,else,enum,export,extends,false,finally,for,from,function,get,if,implements,import,in,instanceof,interface,keyof,let,module,namespace,never,new,null,number,object,of,private,protected,public,readonly,return,set,static,string,super,switch,symbol,this,throw,true,try,type,typeof,undefined,unknown,var,void,while,yield},
  sensitive=true,
  morecomment=[l]{//},
  morecomment=[s]{/*}{*/},
  morestring=[b]',
  morestring=[b]"
}
\lstdefinestyle{base}{
  basicstyle=\ttfamily\footnotesize,
  backgroundcolor=\color{ManualLight},
  frame=single,
  rulecolor=\color{ManualRule},
  framerule=0.4pt,
  framesep=5pt,
  breaklines=true,
  breakatwhitespace=false,
  columns=fullflexible,
  keepspaces=true,
  showstringspaces=false,
  upquote=true,
  aboveskip=7pt,
  belowskip=7pt
}
\lstdefinestyle{typescript}{
  style=base,
  language=TypeScript,
  keywordstyle=\color{CodeKeyword}\bfseries,
  stringstyle=\color{CodeString},
  commentstyle=\color{CodeComment}\itshape
}
\lstdefinestyle{syntax}{style=base,basicstyle=\ttfamily\scriptsize}

\begin{document}

\begin{titlepage}
  \pagecolor{ManualNavy}
  \color{white}
  \vspace*{22mm}
  {\Huge\bfseries openseesjs\par}
  \vspace{5mm}
  {\LARGE Manual completo de la API\par}
  \vspace{4mm}
  {\large OpenSees 3.8 para TypeScript y JavaScript\par}
  \vfill
  \begin{tabular}{@{}ll@{}}
    Versi\'on documentada: & \textbf{${packageJson.version}} \\
    Runtime Windows: & \textbf{@openseesjs/native-win32-x64 0.2.2} \\
    Plataforma de referencia: & Node.js 22+, Windows x64 \\
    Fecha: & 27 de septiembre de 2026
  \end{tabular}
  \vspace{18mm}

  {\large APP-ALBA contributors\par}
  \vspace{4mm}
  {\small Documento generado desde las firmas p\'ublicas y la matriz de cobertura del paquete.\par}
\end{titlepage}
\nopagecolor

\frontmatter
\chapter*{Alcance y advertencia}
\addcontentsline{toc}{chapter}{Alcance y advertencia}
Este manual documenta exclusivamente la API p\'ublica de \pkg\ versi\'on
\versionactual. La biblioteca ejecuta OpenSees dentro del proceso de Node.js
mediante un addon nativo y devuelve los resultados directamente a TypeScript.
No define criterios de dise\~no, unidades obligatorias ni procedimientos de
verificaci\'on normativa.

El usuario es responsable de la idealizaci\'on estructural, la coherencia de
unidades, la selecci\'on de algoritmos y la validaci\'on independiente de los
resultados. \pkg\ es un proyecto independiente y no est\'a afiliado con los
desarrolladores de OpenSees.

\tableofcontents

\mainmatter
\chapter{Introducci\'on}

\section{Objetivo}
\pkg\ ofrece una interfaz fuertemente tipada para construir, ejecutar y
consultar modelos OpenSees desde TypeScript o JavaScript. Conserva la forma de
los comandos Tcl mediante argumentos posicionales y banderas expl\'icitas, pero
el an\'alisis se ejecuta en memoria y no requiere archivos Tcl intermedios.

\section{Instalaci\'on}
\begin{lstlisting}[style=syntax]
npm install openseesjs@${packageJson.version}
\end{lstlisting}
El paquete principal instala autom\'aticamente el runtime compatible con la
plataforma. Esta versi\'on distribuye
\code{@openseesjs/native-win32-x64@0.2.2} para Windows x64 y requiere Node.js
22 o posterior.

\section{Importaci\'on m\'inima}
\begin{lstlisting}[style=typescript]
import { ops } from "openseesjs";

ops.wipe();
ops.model("basic", "-ndm", 2, "-ndf", 3);
\end{lstlisting}
La fachada global es perezosa: crea la sesi\'on nativa en el primer comando y
la libera al terminar el proceso. OpenSees mantiene estado global, por lo que
solo puede existir una sesi\'on nativa activa por proceso.

\chapter{Modelo de programaci\'on}

\section{Comandos y consultas}
La API separa dos responsabilidades:
\begin{itemize}
  \item \textbf{Comandos}: modifican el dominio o configuran el an\'alisis y
  retornan la misma fachada para permitir encadenamiento.
  \item \textbf{Consultas}: devuelven valores JavaScript tipados de manera
  inmediata, sin recorder ni archivo auxiliar.
\end{itemize}

\begin{lstlisting}[style=typescript]
ops.node(1, 0, 0);
ops.fix(1, 1, 1, 1);

const status: number = ops.analyze(1);
const displacement: number[] = ops.nodeDisp(1);
\end{lstlisting}

\section{Sesi\'on expl\'icita}
La sesi\'on expl\'icita es apropiada cuando se necesita controlar el ciclo de
vida o separar claramente comandos y consultas.

\begin{lstlisting}[style=typescript]
import {
  OpenSeesNativeSession,
  inspectNativeBackend,
} from "openseesjs";

const availability = inspectNativeBackend();
if (!availability.available) throw new Error(availability.reason);

const model = new OpenSeesNativeSession();
try {
  model.ops.wipe();
  model.ops.model("basic", "-ndm", 2, "-ndf", 3);
  const version = model.query.version();
  console.log(version);
} finally {
  model.close();
}
\end{lstlisting}

\section{Convenciones de argumentos}
\begin{itemize}
  \item Los tags de nodos, elementos, materiales, secciones, patrones y series
  son enteros definidos por el usuario.
  \item Las banderas Tcl se escriben literalmente, por ejemplo
  \code{"-ndm"}, \code{"-mass"} o \code{"-file"}.
  \item Las listas variables se entregan como arreglos y se expanden antes de
  invocar OpenSees.
  \item Los grados de libertad empleados por las consultas siguen la
  numeraci\'on de OpenSees y comienzan en 1.
  \item Los m\'etodos de variantes, por ejemplo
  \code{ops.element.elasticBeamColumn(...)}, son equivalentes a anteponer el
  nombre del tipo en el comando Tcl.
\end{itemize}

\begin{lstlisting}[style=typescript]
ops.node(2, 1, 2, "-mass", [10, 10, 0]);
ops.element.elasticBeamColumn(1, 1, 2, A, E, Iz, transfTag);
ops.element("elasticBeamColumn", 1, 1, 2, A, E, Iz, transfTag);
\end{lstlisting}

\section{Sistema de unidades}
OpenSees no impone un sistema de unidades. Todas las magnitudes de entrada,
incluyendo geometr\'ia, masa, fuerza, rigidez, tiempo y aceleraci\'on, deben
pertenecer a un sistema coherente. \pkg\ no transforma unidades de forma
impl\'icita.

\chapter{Flujo completo de an\'alisis}

\section{Modelo est\'atico m\'inimo}
\begin{lstlisting}[style=typescript]
import { ops } from "openseesjs";

ops.wipe();
ops.model("basic", "-ndm", 2, "-ndf", 2);
ops.node(1, 0, 0);
ops.node(2, 1, 0);
ops.fix(1, 1, 1);
ops.fix(2, 0, 1);
ops.uniaxialMaterial("Elastic", 1, 1000);
ops.element("truss", 1, 1, 2, 1, 1);

ops.timeSeries("Linear", 1);
ops.pattern("Plain", 1, 1);
ops.load(2, 10, 0);

ops.system("BandGeneral");
ops.numberer("RCM");
ops.constraints("Plain");
ops.integrator("LoadControl", 1);
ops.algorithm("Linear");
ops.analysis("Static");

const status = ops.analyze(1);
if (status !== 0) throw new Error("Analysis failed: " + status);

ops.reactions();
console.log(ops.nodeDisp(2));
console.log(ops.nodeReaction(1));
console.log(ops.eleForce(1));
\end{lstlisting}

\section{Orden recomendado}
\begin{enumerate}
  \item Limpiar el dominio con \code{wipe()}.
  \item Definir dimensiones y grados de libertad con \code{model()}.
  \item Crear nodos, restricciones, masas, materiales, secciones y elementos.
  \item Definir series temporales, patrones y cargas.
  \item Configurar constraints, numberer, system, test, algorithm, integrator y
  analysis.
  \item Ejecutar \code{analyze()} y verificar su c\'odigo de retorno.
  \item Activar \code{reactions()} antes de consultar reacciones nodales.
  \item Extraer y validar respuestas.
\end{enumerate}

\chapter{Consultas nativas}

\section{Consultas escalares y vectoriales}
\begin{longtable}{>{\ttfamily}p{0.28\textwidth}p{0.22\textwidth}p{0.42\textwidth}}
\toprule
\normalfont\textbf{M\'etodo} & \textbf{Retorno} & \textbf{Finalidad} \\
\midrule
\endhead
analyze & number & Ejecuta incrementos y devuelve el estado de OpenSees. \\
getTime & number & Tiempo actual del dominio. \\
getLoadFactor & number & Factor de un patr\'on de carga. \\
getNodeTags & number[] & Tags de nodos existentes. \\
getEleTags & number[] & Tags de elementos existentes. \\
nodeCoord & number o number[] & Coordenada individual o vector nodal. \\
nodeDisp & number o number[] & Desplazamiento nodal. \\
nodeVel & number o number[] & Velocidad nodal. \\
nodeAccel & number o number[] & Aceleraci\'on nodal. \\
nodeReaction & number o number[] & Reacci\'on nodal despu\'es de \code{reactions()}. \\
eleResponse & number[] & Respuesta de elemento indicada por el usuario. \\
eleForce & number o number[] & Fuerzas globales del elemento. \\
elementLocalForces2D & objeto tipado & Fuerzas locales en extremos i y j. \\
eigen & number[] & Valores propios solicitados. \\
nodeEigenvector & number o number[] & Componente o vector modal de un nodo. \\
modalProperties & objeto & Propiedades modales retornadas por OpenSees. \\
modalResults & objeto[] & Frecuencia, periodo y pulsaci\'on por modo. \\
printA & number o number[] & Matriz del sistema o escritura a archivo. \\
printB & number o number[] & Vector del sistema o escritura a archivo. \\
version & string & Versi\'on del motor OpenSees. \\
\bottomrule
\end{longtable}

\section{Consultas agrupadas}
\code{nodeDisplacements()}, \code{nodeReactions()} y
\code{elementForces()} aceptan listas de tags y devuelven registros indexados
por tag. Reducen cruces JavaScript--C++ y son convenientes para conjuntos
moderados de resultados.

\chapter{API packed de alto rendimiento}

\section{Prop\'osito}
Las variantes packed transfieren etiquetas y valores en buffers contiguos. Son
adecuadas para decenas de miles de entidades y evitan crear un arreglo
JavaScript por nodo o resultado. Si el addon instalado no implementa esta
ruta, la API usa autom\'aticamente operaciones por filas compatibles.

\begin{longtable}{>{\ttfamily}p{0.33\textwidth}p{0.57\textwidth}}
\toprule
\normalfont\textbf{M\'etodo} & \textbf{Contrato} \\
\midrule
\endhead
nodesPacked & Tags Int32Array, coordenadas Float64Array, ndm 1--3. \\
massesPacked & Tags, masas por nodo y ndf 1--6. \\
fixesPacked & Tags, restricciones Int32Array y ndf 1--6. \\
loadsPacked & Tags, cargas nodales y ndf 1--6. \\
nodeDisplacementsPacked & Desplazamientos Float64Array por nodo y grado de libertad. \\
nodeVelocitiesPacked & Velocidades Float64Array por nodo y grado de libertad. \\
nodeAccelerationsPacked & Aceleraciones Float64Array por nodo y grado de libertad. \\
nodeReactionsPacked & Reacciones Float64Array por nodo y grado de libertad. \\
elementForcesPacked & Fuerzas contiguas con n\'umero de componentes declarado. \\
elementResponsesPacked & Respuesta indicada y n\'umero de componentes declarado. \\
\bottomrule
\end{longtable}

\section{Orden de almacenamiento}
Los datos son row-major. Para tres nodos con dos componentes, el resultado es
\code{[n1d1,n1d2,n2d1,n2d2,n3d1,n3d2]}.

\begin{lstlisting}[style=typescript]
const tags = new Int32Array([1, 2, 3]);
const coordinates = new Float64Array([
  0, 0,
  1, 0,
  2, 0,
]);

ops.nodesPacked(tags, coordinates, 2);
const displacements = ops.nodeDisplacementsPacked(tags, 2);
\end{lstlisting}

El tama\~no del vector de valores debe ser exactamente
\code{tags.length * width}. Las etiquetas siempre usan \code{Int32Array}; los
valores continuos usan \code{Float64Array}; las restricciones usan
\code{Int32Array}.

\chapter{Errores, ciclo de vida y diagn\'ostico}

\section{OpenSeesCommandError}
Los fallos del motor se convierten en \code{OpenSeesCommandError}. La instancia
incluye el nombre del comando, los argumentos normalizados, la causa nativa y,
cuando corresponde, el \code{rowIndex} que fall\'o en una operaci\'on masiva.

\begin{lstlisting}[style=typescript]
import { OpenSeesCommandError, ops } from "openseesjs";

try {
  ops.analyze(1);
} catch (error) {
  if (error instanceof OpenSeesCommandError) {
    console.error(error.command, error.arguments_, error.rowIndex);
  }
  throw error;
}
\end{lstlisting}

\section{Inspecci\'on del backend}
\begin{itemize}
  \item \code{inspectNativeBackend(path?)} informa disponibilidad, plataforma,
  arquitectura, distribuci\'on, versi\'on OpenSees y revisi\'on del runtime.
  \item \code{defaultNativeBindingPath()} devuelve la ruta seleccionada.
  \item \code{loadNativeBinding(path?)} carga y valida el addon.
  \item La variable \code{OPEN_SEES_NODE_BINDING} permite indicar una ruta
  alternativa para diagn\'ostico o desarrollo.
\end{itemize}

\section{Liberaci\'on de recursos}
La fachada global se libera al salir del proceso. Una sesi\'on expl\'icita debe
cerrarse con \code{close()}, preferiblemente dentro de \code{finally}. Tambi\'en
implementa \code{Symbol.dispose} para entornos que soporten gesti\'on expl\'icita
de recursos.

\chapter{Rendimiento y buenas pr\'acticas}
\begin{itemize}
  \item Use comandos normales para modelos peque\~nos y claridad de c\'odigo.
  \item Use \code{nodes()}, \code{elements()} y \code{loads()} para lotes por
  filas.
  \item Use la API packed cuando el volumen justifique preparar TypedArrays.
  \item Evite consultar una respuesta escalar miles de veces si existe una
  consulta agrupada o packed.
  \item Seleccione el sistema lineal de acuerdo con la estructura de la matriz;
  el solver suele dominar el tiempo en modelos grandes.
  \item Para an\'alisis concurrentes use procesos Node.js independientes, dado
  que OpenSees conserva un dominio global por proceso.
\end{itemize}

\chapter{Compatibilidad y limitaciones}
\begin{itemize}
  \item Inventario de comandos basado en OpenSeesPy 3.8.0.0 y motor OpenSees
  3.8.0.
  \item Runtime precompilado publicado para Windows x64.
  \item Solo una sesi\'on nativa activa por proceso.
  \item Las familias Dodd--Restrepo, StressDensity y PML no est\'an disponibles
  en el backend port\'atil actual.
  \item Los comandos con firma gen\'erica permanecen disponibles, pero ofrecen
  menor inferencia de argumentos que los comandos con overloads exactos.
\end{itemize}

\appendix
\chapter{Cat\'alogo completo de comandos}
Este anexo contiene los ${commands.length} comandos del inventario p\'ublico.
Las firmas mostradas son las firmas TypeScript publicadas. Los argumentos
opcionales se indican con \code{?}; las listas variables se representan como
arreglos tipados.

${commandCatalog}

\chapter{Matriz completa de cobertura}
\small
\begin{longtable}{>{\ttfamily}p{0.25\textwidth}p{0.32\textwidth}p{0.16\textwidth}p{0.12\textwidth}}
\toprule
\normalfont\textbf{API} & \textbf{Inferencia} & \textbf{Transporte} & \textbf{Test} \\
\midrule
\endfirsthead
\toprule
\normalfont\textbf{API} & \textbf{Inferencia} & \textbf{Transporte} & \textbf{Test} \\
\midrule
\endhead
${coverageRows}
\bottomrule
\end{longtable}
\normalsize

\backmatter
\chapter*{Referencia de versi\'on}
\addcontentsline{toc}{chapter}{Referencia de versi\'on}
\begin{tabularx}{\textwidth}{>{\bfseries}lX}
Paquete & openseesjs ${packageJson.version} \\
Motor & OpenSees 3.8.0 \\
Inventario & OpenSeesPy 3.8.0.0 \\
Runtime & @openseesjs/native-win32-x64 0.2.2 \\
Node-API & N-API 8 \\
Fuente & API\_REFERENCE.md, API\_COVERAGE.md y declaraciones TypeScript publicadas \\
\end{tabularx}

\end{document}
`;

writeFileSync(outputPath, manual, 'utf8');
console.log(`Generated ${outputPath} with ${commands.length} commands and ${coverage.length} coverage rows.`);
