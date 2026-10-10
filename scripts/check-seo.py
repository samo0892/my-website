#!/usr/bin/env python3
"""Prueft den statischen Export in out/ auf die Punkte aus dem SEO-Audit.

    python3 scripts/check-seo.py

Laeuft nach `next build`, lokal wie in der CI. Jede Pruefung entspricht
einem "Failed if" aus dem Audit: Schlaegt eine fehl, endet das Skript mit
Exit-Code 1 und der Deploy bricht ab, statt eine Regression auszuliefern.
Nur Standardbibliothek, damit es auch mit dem Python des Macs laeuft.
"""
import json
import os
import re
import sys
import xml.etree.ElementTree as ET
from html.parser import HTMLParser
from urllib.parse import urlparse

OUT = os.path.join(os.path.dirname(os.path.abspath(__file__)), "..", "out")
SITE_URL = "https://www.sam-codes.com"
AUTHOR = "Samed Baldede"
BOOKING_HOST = "calendly.com"


BLOCK_TAGS = {"p", "div", "ul", "ol", "dl", "aside", "section", "table", "pre",
              "h1", "h2", "h3", "h4", "h5", "h6", "figure", "blockquote"}


class Tags(HTMLParser):
    """Sammelt alle Start-Tags als (name, attrs) in Dokumentreihenfolge, den
    sichtbaren Text und den Inhalt der JSON-LD-Bloecke. Sonstiger Text in
    <script> zaehlt nicht: Dort steht die RSC-Payload, die Suchmaschinen
    nicht als Seiteninhalt werten."""

    def __init__(self):
        super().__init__()
        self.tags = []
        self.text = []
        self.jsonld = []
        self._skip = 0
        self._in_jsonld = False
        self._p_depth = 0
        self.nested_in_p = []

    def handle_starttag(self, tag, attrs):
        attrs = dict(attrs)
        self.tags.append((tag, attrs))
        # Ein Block-Element im <p> schliesst der Browser vorher, React sieht
        # dann ein anderes DOM als gerendert und die Hydrierung scheitert.
        if self._p_depth and tag in BLOCK_TAGS:
            self.nested_in_p.append(tag)
        if tag == "p":
            self._p_depth += 1
        if tag in ("script", "style"):
            self._skip += 1
            if attrs.get("type") == "application/ld+json":
                self._in_jsonld = True
                self.jsonld.append("")

    def handle_endtag(self, tag):
        if tag == "p" and self._p_depth:
            self._p_depth -= 1
        if tag in ("script", "style") and self._skip:
            self._skip -= 1
            self._in_jsonld = False

    def handle_data(self, data):
        if self._in_jsonld:
            self.jsonld[-1] += data
        elif not self._skip:
            self.text.append(data)


def parse(path):
    parser = Tags()
    with open(path, encoding="utf-8") as f:
        parser.feed(f.read())
    parser.tags.append(("#text", {"value": " ".join(parser.text)}))
    parser.tags.append(("#jsonld", {"value": parser.jsonld}))
    parser.tags.append(("#nested", {"value": parser.nested_in_p}))
    return parser.tags


def visible_text(tags):
    return next(a["value"] for t, a in tags if t == "#text")


def jsonld_nodes(tags):
    """Alle Knoten aus allen JSON-LD-Bloecken, @graph aufgeloest. Bloecke,
    die nicht parsen, kommen als Fehlertext in die zweite Liste."""
    nodes, errors = [], []
    for block in next(a["value"] for t, a in tags if t == "#jsonld"):
        try:
            data = json.loads(block)
        except ValueError as e:
            errors.append(f"JSON-LD parst nicht: {e}")
            continue
        for item in data if isinstance(data, list) else [data]:
            nodes.extend(item.get("@graph", [item]))
    return nodes, errors


def of_type(nodes, schema_type):
    return [n for n in nodes if n.get("@type") == schema_type]


def check_jsonld(url, tags, required):
    """Seite muss JSON-LD haben, ein Knoten traegt die Canonical-URL als @id
    und die Typen aus required kommen vor. Parse-Fehler meldet main()."""
    nodes, errors = jsonld_nodes(tags)[0], []
    if not nodes:
        return ["JSON-LD fehlt"]
    if not any(n.get("@id") == url for n in nodes):
        errors.append(f"kein JSON-LD-Knoten mit @id {url}")
    for schema_type in required:
        if not of_type(nodes, schema_type):
            errors.append(f"JSON-LD ohne {schema_type}")
    return errors


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

    descriptions = [a.get("content") or "" for t, a in tags if t == "meta" and a.get("name") == "description"]
    if len(descriptions) != 1 or not 50 <= len(descriptions[0]) <= 160:
        errors.append(f"meta description fehlt oder Laenge ausserhalb 50-160: {[len(d) for d in descriptions]}")

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

    # alt="" ist fuer dekorative Bilder richtig, nur ein fehlendes alt nicht.
    for tag, attrs in tags:
        if tag == "img" and "alt" not in attrs:
            errors.append(f"<img src={attrs.get('src')}> ohne alt-Attribut")

    nested = next(a["value"] for t, a in tags if t == "#nested")
    if nested:
        errors.append(f"Block-Element im <p> (Hydrierungsfehler): {sorted(set(nested))}")

    # Entwuerfe markieren fehlenden Inhalt mit <Platzhalter>. Der darf nie
    # live gehen.
    if any("data-platzhalter" in attrs for _, attrs in tags):
        errors.append("Platzhalter im HTML: Entwurf noch nicht fertig")

    for tag, attrs in tags:
        href = attrs.get("href") or ""
        if tag == "a" and BOOKING_HOST in href and "utm_content=" not in href:
            errors.append(f"Buchungslink ohne utm_content: {href}")

    # Sprunglinks innerhalb der Seite (Inhaltsverzeichnis) muessen ein Ziel
    # haben. Weichen Slugger in lib/blog.js und rehypeHeadingIds voneinander
    # ab, fiele das sonst niemandem auf.
    ids = {attrs["id"] for _, attrs in tags if attrs.get("id")}
    for tag, attrs in tags:
        href = attrs.get("href") or ""
        if tag == "a" and href.startswith("#") and len(href) > 1 and href[1:] not in ids:
            errors.append(f"Sprunglink ohne Ziel: {href}")

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

    # Abschluesse standen frueher nur in einem per Klick nachgeladenen Tab.
    if "BHT Berlin" not in visible_text(tags):
        errors.append("Abschluesse (BHT Berlin) nicht im sichtbaren HTML")

    errors += check_jsonld(f"{SITE_URL}/", tags, ["WebSite", "Person"])
    people = of_type(jsonld_nodes(tags)[0], "Person")
    if people and people[0].get("name") != AUTHOR:
        errors.append(f"JSON-LD Person heisst {people[0].get('name')}, erwartet {AUTHOR}")
    return errors


def check_post(url, tags):
    errors = check_jsonld(url, tags, ["BlogPosting", "BreadcrumbList"])
    # Das Audit wertet es als Fehler, wenn der Autor im Schema nicht dem
    # sichtbaren entspricht; das Datum muss zu article:published_time passen.
    for article in of_type(jsonld_nodes(tags)[0], "BlogPosting"):
        if article.get("author", {}).get("name") != AUTHOR:
            errors.append(f"BlogPosting-Autor {article.get('author')}, erwartet {AUTHOR}")
        if [article.get("datePublished")] != meta(tags, "article:published_time"):
            errors.append("BlogPosting.datePublished passt nicht zu article:published_time")
        image = article.get("image", {}).get("url", "")
        if not image.startswith(SITE_URL):
            errors.append(f"BlogPosting.image nicht absolut: {image}")
    # Jeder Artikel fuehrt auf mindestens eine Leistungsseite (Audit 3.3).
    if not any(t == "a" and (a.get("href") or "").startswith("/leistungen/") for t, a in tags):
        errors.append("kein Link auf eine Leistungsseite")
    # Lange Artikel haben ein Inhaltsverzeichnis (Audit 4.5).
    if len([a for t, a in tags if t == "h2"]) >= 4 and not any(
        t == "nav" and a.get("aria-label") == "Inhaltsverzeichnis" for t, a in tags
    ):
        errors.append("Inhaltsverzeichnis fehlt")
    byline = [a for t, a in tags if t == "a" and a.get("rel") == "author"]
    if not byline:
        errors.append("Byline (Link mit rel=author) fehlt")
    authors = [a.get("content") for t, a in tags if t == "meta" and a.get("name") == "author"]
    if authors != [AUTHOR]:
        errors.append(f"meta author {authors}, erwartet [{AUTHOR}]")
    return errors


def check_services_hub(tags):
    return check_jsonld(f"{SITE_URL}/leistungen", tags, ["CollectionPage", "BreadcrumbList"])


def check_service(url, tags):
    required = ["Service", "BreadcrumbList"]
    # Sichtbare FAQ und FAQPage im Schema gehoeren zusammen.
    if any(t == "dl" for t, _ in tags):
        required.append("FAQPage")
    return check_jsonld(url, tags, required)


def check_blog(tags):
    errors = check_jsonld(f"{SITE_URL}/blog", tags, ["Blog", "BreadcrumbList"])
    card = first_img(tags, "/images/og/")
    if card is not None and card.get("loading") == "lazy":
        errors.append("erstes Kartenbild auf /blog wird lazy geladen")
    return errors


def main():
    if not os.path.isdir(OUT):
        sys.exit("out/ fehlt, zuerst `next build` ausfuehren")

    tree = ET.parse(os.path.join(OUT, "sitemap.xml"))
    ns = {"s": "http://www.sitemaps.org/schemas/sitemap/0.9"}
    entries = tree.findall("s:url", ns)
    urls = [e.find("s:loc", ns).text.strip() for e in entries]

    failures = {}
    sitemap_errors = []
    if f"{SITE_URL}/" not in urls:
        sitemap_errors.append(f"Startseite nicht als {SITE_URL}/ eingetragen")
    for entry in entries:
        loc = entry.find("s:loc", ns).text.strip()
        if "/blog/" in loc and entry.find("s:lastmod", ns) is None:
            sitemap_errors.append(f"lastmod fehlt: {loc}")
    if sitemap_errors:
        failures["sitemap.xml"] = sitemap_errors

    for url in urls:
        path = file_for(url)
        if not os.path.isfile(path):
            failures[url] = [f"Datei fehlt: {os.path.relpath(path, OUT)}"]
            continue
        tags = parse(path)
        errors = check_page(url, tags) + jsonld_nodes(tags)[1]
        if url == f"{SITE_URL}/":
            errors += check_home(tags)
        if url == f"{SITE_URL}/blog":
            errors += check_blog(tags)
        if url.startswith(f"{SITE_URL}/blog/"):
            errors += check_post(url, tags)
        if url == f"{SITE_URL}/leistungen":
            errors += check_services_hub(tags)
        if url.startswith(f"{SITE_URL}/leistungen/"):
            errors += check_service(url, tags)
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
