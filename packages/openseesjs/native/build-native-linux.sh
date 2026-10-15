#!/usr/bin/env bash
set -euo pipefail

NATIVE_ROOT="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
PACKAGE_ROOT="$(cd "$NATIVE_ROOT/.." && pwd)"
OPEN_SEES_TAG="${OPEN_SEES_TAG:-v3.8.0}"
OPEN_SEES_SOURCE_DIR="${OPEN_SEES_SOURCE_DIR:-$NATIVE_ROOT/vendor/OpenSees}"
BUILD_DIR="${OPEN_SEES_BUILD_DIR:-$NATIVE_ROOT/build/linux-x64}"
OUTPUT_DIR="${OPENSEES_NATIVE_OUTPUT_DIR:-$NATIVE_ROOT/prebuilds/linux-x64}"
NODE_VERSION="$(node -p 'process.versions.node')"

if [[ ! -f "$OPEN_SEES_SOURCE_DIR/CMakeLists.txt" ]]; then
  mkdir -p "$(dirname "$OPEN_SEES_SOURCE_DIR")"
  git clone --depth 1 --branch "$OPEN_SEES_TAG" https://github.com/OpenSees/OpenSees.git "$OPEN_SEES_SOURCE_DIR"
fi

NODE_INCLUDE_DIR="${NODE_INCLUDE_DIR:-$HOME/.cache/node-gyp/$NODE_VERSION/include/node}"
if [[ ! -f "$NODE_INCLUDE_DIR/node_api.h" ]]; then
  npx --yes node-gyp install --target="$NODE_VERSION"
fi
if [[ ! -f "$NODE_INCLUDE_DIR/node_api.h" ]]; then
  echo "Node headers were not found at $NODE_INCLUDE_DIR" >&2
  exit 1
fi

rm -rf "$BUILD_DIR"
mkdir -p "$BUILD_DIR" "$OUTPUT_DIR"
cmake -S "$NATIVE_ROOT" -B "$BUILD_DIR" -G Ninja \
  -DCMAKE_BUILD_TYPE=Release \
  -DOPEN_SEES_SOURCE_DIR="$OPEN_SEES_SOURCE_DIR" \
  -DNODE_INCLUDE_DIR="$NODE_INCLUDE_DIR" \
  -DCMAKE_LIBRARY_OUTPUT_DIRECTORY="$BUILD_DIR/out"
cmake --build "$BUILD_DIR" --target opensees_node --parallel "${BUILD_JOBS:-2}"

cp "$BUILD_DIR/out/opensees.node" "$OUTPUT_DIR/opensees.node"
node "$NATIVE_ROOT/scripts/stage-linux-runtime.mjs" "$OUTPUT_DIR/opensees.node" "$OUTPUT_DIR"
node "$NATIVE_ROOT/scripts/write-build-info.mjs" "$OUTPUT_DIR/opensees.node" "$OUTPUT_DIR/BUILD_INFO.json" "$OPEN_SEES_SOURCE_DIR"

echo "Built $OUTPUT_DIR/opensees.node"
