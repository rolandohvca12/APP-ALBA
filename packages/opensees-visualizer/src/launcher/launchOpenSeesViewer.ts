import { spawn } from "node:child_process";
import { randomUUID } from "node:crypto";
import { createServer, type Server, type ServerResponse } from "node:http";
import { readFile } from "node:fs/promises";
import { createRequire } from "node:module";
import { dirname, extname, normalize, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import { OpenSeesAdapter, type CaptureFrameOptions, type OpenSeesVisualSource } from "../adapter/OpenSeesAdapter.js";
import { serializeModel, serializeResults, validateModel } from "../core/model.js";
import type { VisualModel, VisualResults } from "../core/types.js";

export interface LaunchOpenSeesViewerOptions {
  readonly source?: OpenSeesVisualSource;
  readonly model?: VisualModel;
  readonly results?: VisualResults;
  readonly captureFrame?: boolean | CaptureFrameOptions;
  readonly host?: string;
  readonly port?: number;
  readonly title?: string;
  readonly openBrowser?: boolean;
  readonly labels?: "none" | "nodes" | "elements" | "all";
  readonly deformationScale?: number | "auto";
}

export interface RunningOpenSeesViewer {
  readonly url: string;
  readonly model: VisualModel;
  readonly results?: VisualResults;
  close(): Promise<void>;
}

export async function launchOpenSeesViewer(
  options: LaunchOpenSeesViewerOptions,
): Promise<RunningOpenSeesViewer> {
  const adapter = options.source ? new OpenSeesAdapter(options.source) : undefined;
  const model = options.model ?? adapter?.captureModel();
  if (!model) throw new Error("Provide either an OpenSees source or a visual model.");
  validateModel(model);

  const capturedFrame = adapter && options.captureFrame
    ? adapter.captureFrame(model, options.captureFrame === true ? {} : options.captureFrame)
    : undefined;
  const results = options.results ?? (capturedFrame
    ? adapter!.captureResults(model, "active", [capturedFrame])
    : undefined);
  const host = options.host ?? "127.0.0.1";
  const closeToken = randomUUID();
  const packageRoot = resolve(dirname(fileURLToPath(import.meta.url)), "../..");
  const require = createRequire(import.meta.url);
  const threeRoot = resolve(dirname(require.resolve("three")), "..");
  const payload = JSON.stringify({
    model: serializeModel(model),
    ...(results ? { results: serializeResults(results) } : {}),
    labels: options.labels ?? "none",
    deformationScale: options.deformationScale ?? "auto",
    closeToken,
  });

  const server = createServer(async (request, response) => {
    try {
      const pathname = new URL(request.url ?? "/", `http://${host}`).pathname;
      if (pathname === "/") {
        const html = (await readFile(resolve(packageRoot, "assets/viewer.html"), "utf8"))
          .replaceAll("{{TITLE}}", escapeHtml(options.title ?? "OpenSeesJS Visualizer"));
        return send(response, html, "text/html; charset=utf-8");
      }
      if (pathname === "/viewer-data.json") return send(response, payload, "application/json; charset=utf-8");
      if (pathname === "/close" && request.method === "POST") {
        if (new URL(request.url ?? "/", `http://${host}`).searchParams.get("token") !== closeToken) {
          response.writeHead(403).end("Forbidden");
          return;
        }
        response.writeHead(204).end();
        setTimeout(() => void closeServer(server).catch(() => undefined), 0);
        return;
      }
      if (pathname === "/favicon.ico") {
        response.writeHead(204).end();
        return;
      }
      if (pathname.startsWith("/dist/")) return sendFile(response, resolve(packageRoot, "dist"), pathname.slice(6));
      if (pathname === "/vendor/three.module.js") {
        return sendFile(response, resolve(threeRoot, "build"), "three.module.js");
      }
      if (pathname.startsWith("/vendor/three/")) {
        return sendFile(response, threeRoot, pathname.slice("/vendor/three/".length));
      }
      if (pathname.startsWith("/vendor/")) {
        return sendFile(response, resolve(threeRoot, "build"), pathname.slice("/vendor/".length));
      }
      response.writeHead(404).end("Not found");
    } catch (error) {
      response.writeHead(500).end(error instanceof Error ? error.message : String(error));
    }
  });

  await listen(server, options.port ?? 0, host);
  const address = server.address();
  if (!address || typeof address === "string") throw new Error("Visualizer did not obtain a TCP port.");
  const url = `http://${host}:${address.port}/`;
  if (options.openBrowser ?? true) openExternal(url);
  return {
    url,
    model,
    ...(results ? { results } : {}),
    close: () => closeServer(server),
  };
}

function listen(server: Server, port: number, host: string): Promise<void> {
  return new Promise((resolvePromise, rejectPromise) => {
    server.once("error", rejectPromise);
    server.listen(port, host, resolvePromise);
  });
}

function closeServer(server: Server): Promise<void> {
  return new Promise((resolvePromise, rejectPromise) => {
    if (!server.listening) {
      resolvePromise();
      return;
    }
    server.close(error => error ? rejectPromise(error) : resolvePromise());
    server.closeAllConnections();
  });
}

function send(response: ServerResponse, body: string | Buffer, contentType: string): void {
  response.writeHead(200, {
    "Content-Type": contentType,
    "Cache-Control": "no-store",
    "X-Content-Type-Options": "nosniff",
  });
  response.end(body);
}

async function sendFile(response: ServerResponse, root: string, relativePath: string): Promise<void> {
  const target = resolve(root, normalize(relativePath));
  if (target !== root && !target.startsWith(root + "\\") && !target.startsWith(root + "/")) {
    response.writeHead(403).end("Forbidden");
    return;
  }
  const body = await readFile(target);
  send(response, body, mimeType(target));
}

function mimeType(path: string): string {
  return ({
    ".js": "text/javascript; charset=utf-8",
    ".map": "application/json",
    ".json": "application/json",
    ".css": "text/css; charset=utf-8",
  } satisfies Record<string, string>)[extname(path)] ?? "application/octet-stream";
}

function openExternal(url: string): void {
  const command = process.platform === "win32" ? "cmd.exe" : process.platform === "darwin" ? "open" : "xdg-open";
  const args = process.platform === "win32" ? ["/c", "start", "", url] : [url];
  const child = spawn(command, args, {
    detached: true,
    stdio: "ignore",
    windowsHide: true,
  });
  child.unref();
}

function escapeHtml(value: string): string {
  return value.replace(/[&<>"']/g, character => ({
    "&": "&amp;",
    "<": "&lt;",
    ">": "&gt;",
    '"': "&quot;",
    "'": "&#39;",
  })[character]!);
}
