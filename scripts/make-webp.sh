#!/usr/bin/env bash
# Wandelt ein PNG in WebP um, optional auf eine Breite skaliert.
#
#   scripts/make-webp.sh <quelle.png> <ziel.webp> [breite]
#
# Lokal gibt es kein cwebp, deshalb laeuft es in einem Podman-Container.
# Quelle und Ziel muessen im Repo liegen, weil nur das Repo gemountet wird.
set -euo pipefail

IN="${1:?Quelle fehlt}"
OUT="${2:?Zielpfad fehlt}"
WIDTH="${3:-}"

ROOT="$(cd "$(dirname "$0")/.." && pwd)"
PODMAN="$(command -v podman || echo /opt/podman/bin/podman)"
[ -x "$PODMAN" ] || { echo "Podman nicht gefunden" >&2; exit 1; }

# Pfade relativ zum Repo, so wie sie im Container unter /work liegen.
relative() {
  local abs
  abs="$(cd "$(dirname "$1")" && pwd)/$(basename "$1")"
  case "$abs" in
    "$ROOT"/*) echo "${abs#"$ROOT"/}" ;;
    *) echo "Pfad liegt nicht im Repo: $1" >&2; exit 1 ;;
  esac
}

mkdir -p "$(dirname "$OUT")"
IN_REL="$(relative "$IN")"
OUT_REL="$(relative "$OUT")"
RESIZE=""
[ -n "$WIDTH" ] && RESIZE="-resize $WIDTH 0"

"$PODMAN" run --rm -e DEBIAN_FRONTEND=noninteractive \
  -v "$ROOT":/work -w /work docker.io/library/debian:stable-slim \
  sh -c "apt-get update -qq >/dev/null && apt-get install -y -qq webp >/dev/null 2>&1 \
    && cwebp -quiet -q 80 $RESIZE '$IN_REL' -o '$OUT_REL'"

echo "geschrieben: $OUT ($(wc -c < "$OUT" | tr -d ' ') Bytes)"
