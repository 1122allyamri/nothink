#!/usr/bin/env python3
"""
TEMP ASSET GENERATOR
--------------------
Generates original, abstract SVG placeholder artwork for the homepage.
Every file this script writes is a TEMPORARY stand-in for real project
photography / screenshots. Replace files in assets/img/ one-for-one
(keep the same filenames) and delete this script when real assets exist.

Run:  python3 tools/generate-placeholders.py
"""

import math
import os
import random

OUT = os.path.join(os.path.dirname(__file__), "..", "assets", "img")

SANS = "'Helvetica Neue', Helvetica, Arial, sans-serif"
SERIF = "Georgia, 'Times New Roman', serif"

# ---------------------------------------------------------------- palettes
PAL = {
    "aurel":     {"deep": "#101D45", "mid": "#3B63FF", "hi": "#DCE4FF", "paper": "#EDF0FA"},
    "kilowatt":  {"deep": "#16110C", "mid": "#FF5C1F", "hi": "#FFC24B", "paper": "#F4EEE6"},
    "fieldnote": {"deep": "#16301F", "mid": "#4C9E5B", "hi": "#C8E96A", "paper": "#F1EFDF"},
    "marlow":    {"deep": "#5F2E23", "mid": "#C96F4A", "hi": "#EDD3AC", "paper": "#F5EBDF"},
    "mono":      {"deep": "#111110", "mid": "#57534C", "hi": "#D9D6CF", "paper": "#F2F1EE"},
}


def svg(w, h, body, defs=""):
    # NOTE: no feTurbulence grain and only a modest blur kernel — large filter
    # regions across ~40 images can wedge the browser compositor.
    return (
        f'<svg xmlns="http://www.w3.org/2000/svg" width="{w}" height="{h}" '
        f'viewBox="0 0 {w} {h}"><defs>{defs}'
        f'<filter id="bl" x="-60%" y="-60%" width="220%" height="220%">'
        f'<feGaussianBlur stdDeviation="30"/></filter>'
        f"</defs>{body}</svg>"
    )


def write(name, content):
    path = os.path.join(OUT, name)
    with open(path, "w") as f:
        f.write(content)
    print("wrote", name)


# ---------------------------------------------------------------- templates
def gradient_field(w, h, p, letter=None, caption=None, seed=1):
    rnd = random.Random(seed)
    defs = (
        f'<linearGradient id="g1" x1="0" y1="0" x2="1" y2="1">'
        f'<stop offset="0" stop-color="{p["deep"]}"/>'
        f'<stop offset="1" stop-color="{p["mid"]}"/></linearGradient>'
    )
    blobs = ""
    for i in range(3):
        cx, cy = rnd.uniform(0.15, 0.85) * w, rnd.uniform(0.15, 0.85) * h
        r = rnd.uniform(0.3, 0.55) * max(w, h)
        c = rnd.choice([p["mid"], p["hi"]])
        op = rnd.uniform(0.4, 0.75)
        defs += (
            f'<radialGradient id="rb{i}"><stop offset="0" stop-color="{c}" stop-opacity="{op:.2f}"/>'
            f'<stop offset="1" stop-color="{c}" stop-opacity="0"/></radialGradient>'
        )
        blobs += f'<circle cx="{cx:.0f}" cy="{cy:.0f}" r="{r:.0f}" fill="url(#rb{i})"/>'
    txt = ""
    if letter:
        txt += (
            f'<text x="{w * 0.07:.0f}" y="{h * 0.9:.0f}" font-family="{SANS}" '
            f'font-size="{h * 0.42:.0f}" font-weight="500" letter-spacing="{-h * 0.02:.0f}" '
            f'fill="{p["paper"]}">{letter}</text>'
        )
    if caption:
        txt += (
            f'<text x="{w * 0.07:.0f}" y="{h * 0.12:.0f}" font-family="{SANS}" '
            f'font-size="{h * 0.032:.0f}" letter-spacing="1" fill="{p["paper"]}" '
            f'opacity="0.85">{caption}</text>'
        )
    body = f'<rect width="{w}" height="{h}" fill="url(#g1)"/>{blobs}{txt}'
    return svg(w, h, body, defs)


def ui_mock(w, h, p, title="Overview"):
    pad = w * 0.08
    panel_x, panel_y = pad, h * 0.14
    panel_w, panel_h = w - pad * 2, h - h * 0.14 - pad * 0.6
    rows = ""
    ry = panel_y + panel_h * 0.30
    rnd = random.Random(hash(title) % 9999)
    for i in range(4):
        bw = panel_w * rnd.uniform(0.35, 0.8)
        rows += (
            f'<rect x="{panel_x + panel_w * 0.06:.0f}" y="{ry:.0f}" width="{bw:.0f}" '
            f'height="{h * 0.018:.0f}" rx="{h * 0.009:.0f}" fill="{p["hi"]}" opacity="0.5"/>'
        )
        ry += panel_h * 0.11
    pts = []
    n = 9
    for i in range(n):
        px = panel_x + panel_w * 0.06 + (panel_w * 0.55) * i / (n - 1)
        py = ry + panel_h * 0.18 - math.sin(i * 0.9 + 1) * panel_h * 0.09 - i * panel_h * 0.008
        pts.append(f"{px:.0f},{py:.0f}")
    body = (
        f'<rect width="{w}" height="{h}" fill="{p["deep"]}"/>'
        f'<rect x="{pad:.0f}" y="{h * 0.05:.0f}" width="{w * 0.26:.0f}" height="{h * 0.026:.0f}" '
        f'rx="{h * 0.013:.0f}" fill="{p["hi"]}" opacity="0.7"/>'
        f'<rect x="{w - pad - w * 0.12:.0f}" y="{h * 0.045:.0f}" width="{w * 0.12:.0f}" '
        f'height="{h * 0.034:.0f}" rx="{h * 0.017:.0f}" fill="{p["mid"]}"/>'
        f'<rect x="{panel_x:.0f}" y="{panel_y:.0f}" width="{panel_w:.0f}" height="{panel_h:.0f}" '
        f'rx="{w * 0.012:.0f}" fill="#FFFFFF" opacity="0.06"/>'
        f'<rect x="{panel_x:.0f}" y="{panel_y:.0f}" width="{panel_w:.0f}" height="{panel_h:.0f}" '
        f'rx="{w * 0.012:.0f}" fill="none" stroke="{p["hi"]}" stroke-opacity="0.25"/>'
        f'<text x="{panel_x + panel_w * 0.06:.0f}" y="{panel_y + panel_h * 0.17:.0f}" '
        f'font-family="{SANS}" font-size="{h * 0.05:.0f}" font-weight="500" fill="{p["paper"]}">{title}</text>'
        f"{rows}"
        f'<polyline points="{" ".join(pts)}" fill="none" stroke="{p["mid"]}" '
        f'stroke-width="{h * 0.008:.0f}" stroke-linecap="round" stroke-linejoin="round"/>'
    )
    return svg(w, h, body)


def poster(w, h, p, word, sub=""):
    grid = ""
    for i in range(1, 6):
        grid += f'<line x1="0" y1="{h * i / 6:.0f}" x2="{w}" y2="{h * i / 6:.0f}" stroke="{p["deep"]}" stroke-opacity="0.08"/>'
    body = (
        f'<rect width="{w}" height="{h}" fill="{p["paper"]}"/>{grid}'
        f'<rect x="{w * 0.06:.0f}" y="{h * 0.08:.0f}" width="{w * 0.16:.0f}" height="{h * 0.045:.0f}" fill="{p["mid"]}"/>'
        f'<text x="{w * 0.06:.0f}" y="{h * 0.62:.0f}" font-family="{SANS}" font-weight="600" '
        f'font-size="{min(w * 0.17, h * 0.3):.0f}" letter-spacing="{-w * 0.006:.0f}" fill="{p["deep"]}">{word}</text>'
        f'<text x="{w * 0.06:.0f}" y="{h * 0.72:.0f}" font-family="{SERIF}" font-style="italic" '
        f'font-size="{min(w * 0.055, h * 0.09):.0f}" fill="{p["deep"]}" opacity="0.75">{sub}</text>'
        f'<circle cx="{w * 0.88:.0f}" cy="{h * 0.86:.0f}" r="{min(w, h) * 0.05:.0f}" fill="none" '
        f'stroke="{p["deep"]}" stroke-width="{min(w, h) * 0.008:.0f}"/>'
        f'<circle cx="{w * 0.88:.0f}" cy="{h * 0.86:.0f}" r="{min(w, h) * 0.018:.0f}" fill="{p["deep"]}"/>'
    )
    return svg(w, h, body)


def chart(w, h, p, seed=3):
    rnd = random.Random(seed)
    grid = ""
    for i in range(1, 7):
        grid += f'<line x1="{w * 0.06:.0f}" y1="{h * i / 7:.0f}" x2="{w * 0.94:.0f}" y2="{h * i / 7:.0f}" stroke="{p["hi"]}" stroke-opacity="0.12"/>'
    lines = ""
    for c in [p["mid"], p["hi"], "#FFFFFF"]:
        pts, base = [], rnd.uniform(0.55, 0.8)
        for i in range(12):
            px = w * 0.06 + (w * 0.88) * i / 11
            base += rnd.uniform(-0.09, 0.05)
            base = min(max(base, 0.2), 0.85)
            pts.append(f"{px:.0f},{h * base:.0f}")
        lines += (
            f'<polyline points="{" ".join(pts)}" fill="none" stroke="{c}" '
            f'stroke-width="{h * 0.006:.0f}" stroke-opacity="0.9" stroke-linejoin="round"/>'
        )
    body = (
        f'<rect width="{w}" height="{h}" fill="{p["deep"]}"/>{grid}{lines}'
        f'<text x="{w * 0.06:.0f}" y="{h * 0.1:.0f}" font-family="{SANS}" font-size="{h * 0.04:.0f}" '
        f'fill="{p["paper"]}" opacity="0.8">Signals / 24h</text>'
    )
    return svg(w, h, body)


def pattern(w, h, p, motif="arc"):
    cell = w / 7
    items = ""
    for r in range(int(h / cell) + 1):
        for c in range(8):
            x, y = c * cell, r * cell
            if motif == "arc":
                rot = ((r + c) % 4) * 90
                items += (
                    f'<path d="M {x} {y + cell} A {cell} {cell} 0 0 1 {x + cell} {y}" fill="none" '
                    f'stroke="{p["mid"]}" stroke-width="{cell * 0.16:.0f}" '
                    f'transform="rotate({rot} {x + cell / 2:.0f} {y + cell / 2:.0f})"/>'
                )
            else:
                if (r + c) % 3 == 0:
                    items += f'<circle cx="{x + cell / 2:.0f}" cy="{y + cell / 2:.0f}" r="{cell * 0.3:.0f}" fill="{p["mid"]}"/>'
                elif (r + c) % 3 == 1:
                    items += (
                        f'<rect x="{x + cell * 0.2:.0f}" y="{y + cell * 0.2:.0f}" width="{cell * 0.6:.0f}" '
                        f'height="{cell * 0.6:.0f}" fill="none" stroke="{p["mid"]}" stroke-width="{cell * 0.09:.0f}"/>'
                    )
    body = f'<rect width="{w}" height="{h}" fill="{p["paper"]}"/>{items}'
    return svg(w, h, body)


def figure(w, h, p, seed=5):
    """Abstract duotone figure — stands in for portrait photography."""
    defs = (
        f'<linearGradient id="g1" x1="0" y1="0" x2="0" y2="1">'
        f'<stop offset="0" stop-color="{p["hi"]}"/>'
        f'<stop offset="1" stop-color="{p["mid"]}"/></linearGradient>'
        f'<radialGradient id="glow"><stop offset="0" stop-color="{p["hi"]}" stop-opacity="0.9"/>'
        f'<stop offset="1" stop-color="{p["hi"]}" stop-opacity="0"/></radialGradient>'
    )
    cx = w / 2
    head_r = w * 0.16
    head_cy = h * 0.42
    body = (
        f'<rect width="{w}" height="{h}" fill="url(#g1)"/>'
        f'<circle cx="{w * 0.78:.0f}" cy="{h * 0.2:.0f}" r="{w * 0.42:.0f}" fill="url(#glow)"/>'
        f'<circle cx="{cx:.0f}" cy="{head_cy:.0f}" r="{head_r:.0f}" fill="{p["deep"]}"/>'
        f'<path d="M {cx - w * 0.3:.0f} {h:.0f} C {cx - w * 0.3:.0f} {h * 0.66:.0f} '
        f'{cx + w * 0.3:.0f} {h * 0.66:.0f} {cx + w * 0.3:.0f} {h:.0f} Z" fill="{p["deep"]}"/>'
    )
    return svg(w, h, body, defs)


def interior(w, h, p):
    """Abstract studio interior — soft light, window grid, plant silhouette."""
    defs = (
        f'<linearGradient id="g1" x1="0" y1="0" x2="1" y2="1">'
        f'<stop offset="0" stop-color="{p["paper"]}"/>'
        f'<stop offset="1" stop-color="{p["hi"]}"/></linearGradient>'
        f'<radialGradient id="winglow"><stop offset="0" stop-color="#FFFFFF" stop-opacity="0.9"/>'
        f'<stop offset="1" stop-color="#FFFFFF" stop-opacity="0"/></radialGradient>'
    )
    win_x, win_y, win_w, win_h = w * 0.55, h * 0.1, w * 0.36, h * 0.62
    bars = ""
    for i in range(1, 3):
        bars += f'<line x1="{win_x + win_w * i / 3:.0f}" y1="{win_y:.0f}" x2="{win_x + win_w * i / 3:.0f}" y2="{win_y + win_h:.0f}" stroke="{p["deep"]}" stroke-width="{w * 0.006:.0f}"/>'
    bars += f'<line x1="{win_x:.0f}" y1="{win_y + win_h / 2:.0f}" x2="{win_x + win_w:.0f}" y2="{win_y + win_h / 2:.0f}" stroke="{p["deep"]}" stroke-width="{w * 0.006:.0f}"/>'
    leaves = ""
    rnd = random.Random(7)
    for i in range(7):
        ang = -80 + i * 26 + rnd.uniform(-6, 6)
        ln = h * rnd.uniform(0.16, 0.3)
        x2 = w * 0.16 + ln * math.cos(math.radians(ang))
        y2 = h * 0.86 - ln * math.sin(math.radians(90 - ang * 0.4))
        leaves += (
            f'<path d="M {w * 0.16:.0f} {h * 0.88:.0f} Q {(w * 0.16 + x2) / 2 + 20:.0f} '
            f'{(h * 0.88 + y2) / 2 - 40:.0f} {x2:.0f} {y2:.0f}" fill="none" '
            f'stroke="{p["deep"]}" stroke-width="{w * 0.008:.0f}" stroke-linecap="round"/>'
        )
    body = (
        f'<rect width="{w}" height="{h}" fill="url(#g1)"/>'
        f'<rect x="{win_x:.0f}" y="{win_y:.0f}" width="{win_w:.0f}" height="{win_h:.0f}" '
        f'fill="{p["hi"]}" stroke="{p["deep"]}" stroke-width="{w * 0.008:.0f}"/>'
        f'<circle cx="{win_x + win_w * 0.3:.0f}" cy="{win_y + win_h * 0.35:.0f}" r="{w * 0.12:.0f}" fill="url(#winglow)"/>'
        f"{bars}"
        f'<rect x="{w * 0.08:.0f}" y="{h * 0.68:.0f}" width="{w * 0.38:.0f}" height="{h * 0.025:.0f}" fill="{p["deep"]}"/>'
        f'<rect x="{w * 0.11:.0f}" y="{h * 0.705:.0f}" width="{w * 0.02:.0f}" height="{h * 0.2:.0f}" fill="{p["deep"]}"/>'
        f'<rect x="{w * 0.41:.0f}" y="{h * 0.705:.0f}" width="{w * 0.02:.0f}" height="{h * 0.2:.0f}" fill="{p["deep"]}"/>'
        f"{leaves}"
        f'<rect x="0" y="{h * 0.92:.0f}" width="{w}" height="{h * 0.08:.0f}" fill="{p["deep"]}" opacity="0.08"/>'
    )
    return svg(w, h, body, defs)


def specimen(w, h, p):
    rows = ""
    y = h * 0.62
    for size, txt in [(0.05, "ABCDEFGHIJKLMNOPQRSTUVWXYZ"), (0.05, "abcdefghijklmnopqrstuvwxyz"), (0.05, "0123456789 — &amp; ? ! ( )")]:
        rows += (
            f'<text x="{w * 0.08:.0f}" y="{y:.0f}" font-family="{SANS}" '
            f'font-size="{h * size:.0f}" fill="{p["deep"]}" opacity="0.75">{txt}</text>'
        )
        y += h * 0.1
    body = (
        f'<rect width="{w}" height="{h}" fill="{p["paper"]}"/>'
        f'<text x="{w * 0.06:.0f}" y="{h * 0.44:.0f}" font-family="{SANS}" font-weight="500" '
        f'font-size="{h * 0.34:.0f}" letter-spacing="{-h * 0.012:.0f}" fill="{p["deep"]}">Aa</text>'
        f'<text x="{w * 0.4:.0f}" y="{h * 0.44:.0f}" font-family="{SERIF}" font-style="italic" '
        f'font-size="{h * 0.3:.0f}" fill="{p["mid"]}">Aa</text>{rows}'
    )
    return svg(w, h, body)


def arch(w, h, p):
    rnd = random.Random(11)
    s = w * 0.055
    iso = ""
    for i in range(9):
        bx = w * 0.16 + i * s * 1.35
        bh = s * rnd.uniform(1.2, 4.2)
        by = h * 0.72
        iso += (
            f'<g stroke="{p["deep"]}" stroke-width="{w * 0.0035:.1f}" fill="#FFFFFF">'
            f'<rect x="{bx:.0f}" y="{by - bh:.0f}" width="{s:.0f}" height="{bh:.0f}"/>'
            f'<path d="M {bx:.0f} {by - bh:.0f} l {s * 0.42:.0f} {-s * 0.42:.0f} h {s:.0f} '
            f'l {-s * 0.42:.0f} {s * 0.42:.0f} Z"/>'
            f'<path d="M {bx + s:.0f} {by - bh:.0f} l {s * 0.42:.0f} {-s * 0.42:.0f} v {bh:.0f} '
            f'l {-s * 0.42:.0f} {s * 0.42:.0f} Z"/></g>'
        )
    body = (
        f'<rect width="{w}" height="{h}" fill="#FFFFFF"/>'
        f'<line x1="0" y1="{h * 0.72:.0f}" x2="{w}" y2="{h * 0.72:.0f}" stroke="{p["deep"]}" stroke-width="{w * 0.0035:.1f}"/>'
        f"{iso}"
        f'<text x="{w * 0.06:.0f}" y="{h * 0.9:.0f}" font-family="{SANS}" font-size="{h * 0.035:.0f}" '
        f'fill="{p["deep"]}" opacity="0.6">ELEVATION — STUDY 04</text>'
    )
    return svg(w, h, body)


def monogram(name, p):
    letter = name[0].upper()
    return svg(
        96, 96,
        f'<rect width="96" height="96" rx="20" fill="{p["deep"]}"/>'
        f'<text x="48" y="66" text-anchor="middle" font-family="{SANS}" font-weight="600" '
        f'font-size="52" fill="{p["paper"]}">{letter}</text>',
    )


# ---------------------------------------------------------------- build all
def main():
    os.makedirs(OUT, exist_ok=True)
    A, K, F, M, MO = PAL["aurel"], PAL["kilowatt"], PAL["fieldnote"], PAL["marlow"], PAL["mono"]

    # hero (near-square ratio to match the hero media containers)
    write("hero-a.svg", poster(1100, 1200, K, "Kilowatt", "Energy, made legible."))
    write("hero-b.svg", figure(1100, 1200, M, seed=2))
    # 16:9 poster shown until the real showreel lands at assets/media/hero.mp4
    write("hero-poster.svg", gradient_field(1920, 1080, K, seed=9))

    # post rail thumbnails
    write("post-1.svg", gradient_field(800, 500, A, caption="INSIGHT", seed=21))
    write("post-2.svg", chart(800, 500, K, seed=22))
    write("post-3.svg", pattern(800, 500, F, motif="dot"))
    write("post-4.svg", gradient_field(800, 500, M, caption="NOTES", seed=24))

    # projects: icon + three media each
    for key, pal, word, ui in [
        ("aurel", A, "Aurel", "Portfolio"),
        ("kilowatt", K, "Kilowatt", "Grid live"),
        ("fieldnote", F, "Fieldnote", "Fields"),
        ("marlow", M, "Marlow", "Bookings"),
    ]:
        write(f"{key}-icon.svg", monogram(word, pal))
        write(f"{key}-1.svg", gradient_field(1200, 900, pal, letter=word[0], seed=hash(key) % 100))
        write(f"{key}-2.svg", ui_mock(1200, 900, pal, title=ui))
        write(f"{key}-3.svg", poster(1200, 900, pal, word, "Identity in use."))

    # testimonials
    write("voice-1.svg", figure(1600, 900, A, seed=31))
    write("voice-2.svg", figure(1600, 900, F, seed=32))

    # lab / experiments
    write("lab-01.svg", specimen(900, 1100, A))
    write("lab-02.svg", pattern(800, 800, K, motif="arc"))
    write("lab-03.svg", chart(1200, 800, MO, seed=41))
    write("lab-04.svg", gradient_field(700, 1200, F, seed=42))
    write("lab-05.svg", arch(1200, 800, MO))
    write("lab-06.svg", ui_mock(800, 800, A, title="Ask"))
    write("lab-07.svg", poster(800, 1000, M, "M&#233;l.", "Poster study"))
    write("lab-08.svg", pattern(1600, 700, F, motif="dot"))
    write("lab-09.svg", gradient_field(800, 800, K, letter="k", seed=43))
    write("lab-10.svg", specimen(1200, 800, M))
    write("lab-11.svg", figure(700, 1200, MO, seed=44))
    write("lab-12.svg", chart(800, 1000, A, seed=45))
    write("lab-13.svg", poster(1200, 800, MO, "Index", "Archive, 2019 &#8594; now"))
    write("lab-14.svg", pattern(800, 1000, M, motif="arc"))

    # about
    write("studio.svg", interior(1400, 900, MO))
    write("portrait-ally.svg", figure(900, 1100, MO, seed=51))
    write("portrait-temp.svg", figure(900, 1100, A, seed=52))


if __name__ == "__main__":
    main()
