import assert from "node:assert/strict";
import test from "node:test";
import {
  BridgeWebSocketTransport,
  ETABS_BRIDGE_PROTOCOL_VERSION,
  ETABS_BRIDGE_WEBSOCKET_PROTOCOL,
} from "../dist/bridge-websocket-transport.js";

class FakeWebSocket {
  static OPEN = 1;
  static instances = [];

  readyState = 0;
  protocol = "";
  sent = [];

  constructor(url, protocols) {
    this.url = url;
    this.protocols = protocols;
    FakeWebSocket.instances.push(this);
  }

  open() {
    this.readyState = FakeWebSocket.OPEN;
    this.protocol = ETABS_BRIDGE_WEBSOCKET_PROTOCOL;
    this.onopen?.();
  }

  send(value) {
    this.sent.push(value);
  }

  respond(value) {
    this.onmessage?.({ data: JSON.stringify(value) });
  }

  close() {
    this.readyState = 3;
    this.onclose?.();
  }
}

test("concurrent requests share one authenticated connection and route responses", async () => {
  const original = globalThis.WebSocket;
  globalThis.WebSocket = FakeWebSocket;
  FakeWebSocket.instances.length = 0;

  try {
    const transport = new BridgeWebSocketTransport("ws://test", 1_000, "secret");
    const first = transport.request({ api: "cFrameObj", method: "Count" });
    const second = transport.request({ api: "cAreaObj", method: "Count" });

    assert.equal(FakeWebSocket.instances.length, 1);
    const socket = FakeWebSocket.instances[0];
    assert.deepEqual(socket.protocols, [ETABS_BRIDGE_WEBSOCKET_PROTOCOL, "auth.secret"]);
    socket.open();
    await new Promise(resolve => setTimeout(resolve, 0));

    const requests = socket.sent.map(JSON.parse);
    assert.equal(requests.length, 2);
    assert.equal(requests[0].protocolVersion, ETABS_BRIDGE_PROTOCOL_VERSION);
    socket.respond({ id: requests[1].id, ok: true, data: 7 });
    socket.respond({ id: requests[0].id, ok: true, data: 5 });

    assert.deepEqual(await Promise.all([first, second]), [5, 7]);
    transport.close();
  } finally {
    globalThis.WebSocket = original;
  }
});

test("a malformed response rejects pending work", async () => {
  const original = globalThis.WebSocket;
  globalThis.WebSocket = FakeWebSocket;
  FakeWebSocket.instances.length = 0;

  try {
    const transport = new BridgeWebSocketTransport("ws://test", 1_000, "secret");
    const request = transport.request({ api: "cFrameObj", method: "Count" });
    const socket = FakeWebSocket.instances[0];
    socket.open();
    await new Promise(resolve => setTimeout(resolve, 0));
    socket.onmessage?.({ data: "not-json" });

    await assert.rejects(request, /Unexpected token|JSON/);
  } finally {
    globalThis.WebSocket = original;
  }
});
