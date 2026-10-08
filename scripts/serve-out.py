#!/usr/bin/env python3
"""Liefert den statischen Export aus out/ so aus wie GitHub Pages.

    python3 scripts/serve-out.py [port]

python3 -m http.server kennt keine URLs ohne .html: /blog zeigt dort ein
Verzeichnislisting, /impressum und die Artikel sind 404. GitHub Pages
haengt .html an, wenn es die Datei gibt, listet keine Verzeichnisse und
liefert bei 404 die 404.html aus. Dieses Skript macht dasselbe, damit
sich die lokale Vorschau genauso durchklicken laesst wie die Live-Seite.
"""
import http.server
import os
import sys

ROOT = os.path.join(os.path.dirname(os.path.abspath(__file__)), "..", "out")


class PagesHandler(http.server.SimpleHTTPRequestHandler):
    def __init__(self, *args, **kwargs):
        super().__init__(*args, directory=ROOT, **kwargs)

    def send_head(self):
        path = self.path.split("?", 1)[0].split("#", 1)[0]
        has_extension = os.path.splitext(path)[1] != ""
        if path != "/" and not path.endswith("/") and not has_extension:
            if os.path.isfile(self.translate_path(path + ".html")):
                self.path = path + ".html"
        return super().send_head()

    def list_directory(self, path):
        self.send_error(404)
        return None

    def send_error(self, code, message=None, explain=None):
        page = os.path.join(ROOT, "404.html")
        if code != 404 or not os.path.isfile(page):
            return super().send_error(code, message, explain)
        with open(page, "rb") as f:
            body = f.read()
        self.send_response(404)
        self.send_header("Content-Type", "text/html; charset=utf-8")
        self.send_header("Content-Length", str(len(body)))
        self.end_headers()
        if self.command != "HEAD":
            self.wfile.write(body)


if __name__ == "__main__":
    port = int(sys.argv[1]) if len(sys.argv) > 1 else 3000
    server = http.server.ThreadingHTTPServer(("127.0.0.1", port), PagesHandler)
    print(f"out/ auf http://localhost:{port}", flush=True)
    server.serve_forever()
