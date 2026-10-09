#!/usr/bin/env python3
"""Prueft den statischen Export in out/ auf die Punkte aus dem SEO-Audit.

    python3 scripts/check-seo.py

Laeuft nach `next build`, lokal wie in der CI. Jede Pruefung entspricht
einem "Failed if" aus dem Audit: Schlaegt eine fehl, endet das Skript mit
Exit-Code 1 und der Deploy bricht ab, statt eine Regression auszuliefern.
Nur Standardbibliothek, damit es auch mit dem Python des Macs laeuft.
"""
import os
import re
import sys
import xml.etree.ElementTree as ET
from html.parser import HTMLParser
from urllib.parse import urlparse

OUT = os.path.join(os.path.dirname(os.path.abspath(__file__)), "..", "out")
SITE_URL = "https://www.sam-codes.com"
BOOKING_HOST = "calendly.com"


class Tags(HTMLParser):
    """Sammelt alle Start-Tags als (name, attrs) in Dokumentreihenfolge."""

    def __init__(self):
        super().__init__()
        self.tags = []

    def handle_starttag(self, tag, attrs):
        self.tags.append((tag, dict(attrs)))


def parse(path):
    parser = Tags()
    with open(path, encoding="utf-8") as f:
        parser.feed(f.read())
    return parser.tags


def file_for(url):
    path = urlparse(url).path
    return os.path.join(OUT, "index.html" if path == "/" else path.lstrip("/") + ".html")


def meta(tags, prop):
    return [a.get("content") for t, a in tags if t == "meta" and a.get("property") == prop]


def links(tags, rel):
    return [a for t, a in tags if t == "link" and rel in a.get("rel", "").split()]


def check_page(url, tags):
    errors = []

    canonicals = [a.get("href") for a in links(tags, "canonical")]
    if canonicals != [url]:
        errors.append(f"canonical {canonicals}, erwartet [{url}]")

    feeds = [a for a in links(tags, "alternate") if a.get("type") == "application/rss+xml"]
    if not feeds:
        errors.append("RSS-Link (alternate) fehlt")

    if meta(tags, "og:image:width") != ["1200"] or meta(tags, "og:image:height") != ["630"]:
        errors.append(
            f"og:image nicht 1200x630: {meta(tags, 'og:image:width')}x{meta(tags, 'og:image:height')}"
        )

    # framer-motion rendert versteckte Startzustaende als Inline-Style. Inhalt,
    # der erst nach dem Laden von JavaScript sichtbar wird, verzoegert LCP.
    for tag, attrs in tags:
        if re.search(r"opacity:\s*0(?![.\d])", attrs.get("style") or ""):
            errors.append(f"<{tag}> mit opacity:0 im ausgelieferten HTML")
            break

    for tag, attrs in tags:
        if tag == "img" and not attrs.get("alt", "").strip():
            errors.append(f"<img src={attrs.get('src')}> ohne alt-Text")

    for tag, attrs in tags:
        href = attrs.get("href") or ""
        if tag == "a" and BOOKING_HOST in href and "utm_content=" not in href:
            errors.append(f"Buchungslink ohne utm_content: {href}")

    return errors


def first_img(tags, needle):
    return next((a for t, a in tags if t == "img" and needle in (a.get("src") or "")), None)


def check_home(tags):
    errors = []
    hero = first_img(tags, "sam-codes.webp")
    if hero is None:
        errors.append("Hero-Bild sam-codes.webp nicht gefunden")
    elif hero.get("loading") == "lazy":
        errors.append("Hero-Bild wird lazy geladen")

    button = next((a for t, a in tags if t == "button" and "aria-controls" in a), None)
    if button is None or "aria-expanded" not in button or not button.get("aria-label"):
        errors.append("Menue-Button ohne aria-label/aria-expanded/aria-controls")
    return errors


def check_blog(tags):
    card = first_img(tags, "/images/og/")
    if card is not None and card.get("loading") == "lazy":
        return ["erstes Kartenbild auf /blog wird lazy geladen"]
    return []


def main():
    if not os.path.isdir(OUT):
        sys.exit("out/ fehlt, zuerst `next build` ausfuehren")

    tree = ET.parse(os.path.join(OUT, "sitemap.xml"))
    ns = {"s": "http://www.sitemaps.org/schemas/sitemap/0.9"}
    urls = [loc.text.strip() for loc in tree.findall("s:url/s:loc", ns)]

    failures = {}
    if f"{SITE_URL}/" not in urls:
        failures["sitemap.xml"] = [f"Startseite nicht als {SITE_URL}/ eingetragen"]

    for url in urls:
        path = file_for(url)
        if not os.path.isfile(path):
            failures[url] = [f"Datei fehlt: {os.path.relpath(path, OUT)}"]
            continue
        tags = parse(path)
        errors = check_page(url, tags)
        if url == f"{SITE_URL}/":
            errors += check_home(tags)
        if url == f"{SITE_URL}/blog":
            errors += check_blog(tags)
        if errors:
            failures[url] = errors

    for url, errors in failures.items():
        print(f"FEHLER {url}")
        for error in errors:
            print(f"  - {error}")
    if failures:
        sys.exit(1)
    print(f"OK: {len(urls)} Seiten aus der Sitemap geprueft")


if __name__ == "__main__":
    main()
