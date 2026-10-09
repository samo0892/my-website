#!/usr/bin/env bash
# Erzeugt eine 1200x630 Titelkarte im Seitenstil, dazu ein 640 px breites
# WebP-Vorschaubild fuer die Artikelkarten (scripts/make-webp.sh).
#
#   scripts/make-og-card.sh "Artikeltitel" public/images/og/<slug>.png ["Kicker"]
#
# Rendert scripts/og-card.html mit headless Chrome. Chrome schreibt die
# Datei immer nach --screenshot, deshalb wird anschliessend verschoben.
set -euo pipefail

TITLE="${1:?Titel fehlt}"
OUT="${2:?Zielpfad fehlt}"
KICKER="${3:-}"

CHROME="/Applications/Google Chrome.app/Contents/MacOS/Google Chrome"
[ -x "$CHROME" ] || { echo "Chrome nicht gefunden: $CHROME" >&2; exit 1; }

ROOT="$(cd "$(dirname "$0")/.." && pwd)"
TEMPLATE="$ROOT/scripts/og-card.html"

urlencode() {
  python3 -c 'import sys,urllib.parse; print(urllib.parse.quote(sys.argv[1], safe=""))' "$1"
}

URL="file://$TEMPLATE?title=$(urlencode "$TITLE")"
[ -n "$KICKER" ] && URL="$URL&kicker=$(urlencode "$KICKER")"

TMP="$(mktemp -d)"
"$CHROME" \
  --headless \
  --disable-gpu \
  --hide-scrollbars \
  --force-device-scale-factor=1 \
  --window-size=1200,630 \
  --screenshot="$TMP/card.png" \
  --virtual-time-budget=2000 \
  "$URL" >/dev/null 2>&1

mkdir -p "$(dirname "$OUT")"
mv "$TMP/card.png" "$OUT"
rmdir "$TMP" 2>/dev/null || true
echo "geschrieben: $OUT"

# Vorschaubild fuer die Artikelkarten: Die Karten sind hoechstens ~600 px
# breit, die 1200er-PNG waere dort unnoetig schwer. lib/blog.js nimmt die
# WebP-Datei, sobald es sie gibt, sonst die PNG.
"$ROOT/scripts/make-webp.sh" "$OUT" "${OUT%.png}-640.webp" 640 \
  || echo "Hinweis: Vorschaubild nicht erzeugt, die Karten nutzen die PNG." >&2
