#!/usr/bin/env python3
"""
Extract cards from A4 planche composites + generate SVG vector cards.

Usage:
  python3 extract_cards.py <planche_image> [--svg] [--montage] [--output DIR]

Examples:
  python3 extract_cards.py planche_01.jpg --svg --montage
  python3 extract_cards.py "english_planches/planche_01.jpg" --svg
  python3 extract_cards.py "compo english/*.jpg" --svg         # batch via shell
"""

import cv2
import numpy as np
import os
import sys
import base64
from pathlib import Path

# ─── CONFIG ───────────────────────────────────────────────────────────────
WHITE_THRESHOLD = 235        # pixel intensity to consider "white" (> this = white)
MIN_BAND_SIZE = 5            # minimum white band size (px) to be a separator
MIN_CARD_SIZE = 100          # minimum card dimension (px) — filters noise
OUTPUT_DIR = "extracted_cards"
SVG_CARD_W = 400
SVG_CARD_H = 560
SVG_RADIUS = 20
SVG_CARD_BG = "#fafafa"
SVG_CARD_BORDER = "#d4d4d4"
SVG_ACCENT = "#e63946"
SVG_ACCENT2 = "#457b9d"
MONTAGE_COLS = 4


# ─── 1. GRID DETECTION ───────────────────────────────────────────────────
def find_grid(img):
    """Detect card grid from white separator lines.

    Strategy:
    1. Find all white bands (separators) between card cells
    2. Use ALL bands to define initial cells
    3. Merge adjacent cells separated by a small band (< 50px) where one cell
       is much smaller than the other (e.g. 173px label + 515px card image)
    Returns (rows, cols) lists of (start, end) tuples.
    """
    h, w = img.shape[:2]
    gray = cv2.cvtColor(img, cv2.COLOR_BGR2GRAY)

    def get_cells(means, length):
        bright = means > WHITE_THRESHOLD

        # Find all continuous bright bands
        bands = []
        i = 0
        while i < len(bright):
            if bright[i]:
                start = i
                while i < len(bright) and bright[i]:
                    i += 1
                if i - start >= MIN_BAND_SIZE:
                    bands.append((start, i))
            else:
                i += 1

        # Remove margin bands (touch top or bottom edge)
        inner_bands = [(s, e) for s, e in bands if s > 0 and e < length]

        # Cells between bands
        cells = []
        prev = 0
        for s, e in inner_bands:
            if s > prev and s - prev >= MIN_CARD_SIZE:
                cells.append((prev, s))
            prev = e
        if prev < length and length - prev >= MIN_CARD_SIZE:
            cells.append((prev, length))

        if not cells:
            return cells

        # Merge adjacent cells that are part of the same logical card:
        # if the band between them is narrow (< 50px) AND one cell is
        # much smaller (< 45%) than the other, they're label+image = one card
        NARROW_BAND_MAX = 70
        MIN_CELL_RATIO = 0.45

        merged = []
        i = 0
        while i < len(cells):
            s_i, e_i = cells[i]
            sz_i = e_i - s_i

            # Check if this cell forms a pair with the next via a narrow gap
            if i + 1 < len(cells):
                s_j, e_j = cells[i + 1]
                # Find the narrow band between cell i and cell i+1
                gap = s_j - e_i
                sz_j = e_j - s_j
                smaller = min(sz_i, sz_j)
                larger = max(sz_i, sz_j)

                if gap < NARROW_BAND_MAX and smaller / larger < MIN_CELL_RATIO:
                    # Merge: (start of smaller, end of larger)
                    merged.append((min(s_i, s_j), max(e_i, e_j)))
                    i += 2
                    continue

            # Check if cell can merge with previously merged cell (narrow gap)
            if merged:
                prev_s, prev_e = merged[-1]
                gap = s_i - prev_e
                sz_prev = prev_e - prev_s
                smaller = min(sz_i, sz_prev)
                larger = max(sz_i, sz_prev)
                if gap < NARROW_BAND_MAX and smaller / larger < MIN_CELL_RATIO:
                    merged[-1] = (min(prev_s, s_i), max(prev_e, e_i))
                    i += 1
                    continue

            merged.append((s_i, e_i))
            i += 1

        return merged

    row_means = np.mean(gray, axis=1)
    col_means = np.mean(gray, axis=0)

    rows = get_cells(row_means, h)
    cols = get_cells(col_means, w)

    return rows, cols


# ─── 2. EXTRACT CARD IMAGES ──────────────────────────────────────────────
def extract_cards(img, rows, cols):
    """Extract each grid cell as a separate card image. Returns list of (image, row_idx, col_idx)."""
    cards = []
    for ri, (r_start, r_end) in enumerate(rows):
        for ci, (c_start, c_end) in enumerate(cols):
            card_img = img[r_start:r_end, c_start:c_end]
            cards.append({
                "image": card_img,
                "row": ri,
                "col": ci,
                "y": r_start,
                "x": c_start,
                "h": r_end - r_start,
                "w": c_end - c_start,
            })
    return cards


# ─── 3. SAVE CARDS AS PNG ────────────────────────────────────────────────
def save_png(cards, output_dir=OUTPUT_DIR, prefix=""):
    path = Path(output_dir)
    path.mkdir(parents=True, exist_ok=True)
    saved = []
    for i, card in enumerate(cards):
        fname = f"{prefix}card_{i + 1:03d}.png"
        fpath = path / fname
        cv2.imwrite(str(fpath), card["image"])
        saved.append(fpath)
        print(f"  ✓ {fname}  ({card['w']}×{card['h']})")
    return saved


# ─── 4. GENERATE SVG CARD ────────────────────────────────────────────────
def escape_xml(s):
    return s.replace("&", "&amp;").replace("<", "&lt;").replace(">", "&gt;")

def generate_svg(card_png_path, label="", card_num=0, output_path=None):
    """Generate a professional SVG card with embedded image, rounded corners, shadow."""
    if output_path is None:
        output_path = Path(card_png_path).with_suffix(".svg")

    with open(card_png_path, "rb") as f:
        b64 = base64.b64encode(f.read()).decode("ascii")

    tmp = cv2.imread(str(card_png_path))
    if tmp is None:
        print(f"  ⚠ Cannot read {card_png_path}, skipping SVG")
        return None
    img_h, img_w = tmp.shape[:2]
    aspect = img_w / img_h

    W, H = SVG_CARD_W, SVG_CARD_H
    R = SVG_RADIUS
    pad = 16
    label_h = 36
    img_area_top = pad
    img_area_h = H - pad * 2 - label_h
    img_area_w = W - pad * 2

    if aspect > img_area_w / img_area_h:
        disp_w = img_area_w
        disp_h = img_area_w / aspect
    else:
        disp_h = img_area_h
        disp_w = img_area_h * aspect

    img_x = (W - disp_w) / 2
    img_y = img_area_top + (img_area_h - disp_h) / 2

    label_text = escape_xml(label) if label else f"Carte {card_num}"

    svg = f'''<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 {W} {H}" width="{W}" height="{H}">
  <defs>
    <filter id="shadow" x="-8%" y="-8%" width="116%" height="116%">
      <feDropShadow dx="0" dy="3" stdDeviation="5" flood-color="#00000030"/>
    </filter>
    <filter id="inner-shadow">
      <feOffset dx="0" dy="1"/>
      <feGaussianBlur stdDeviation="2"/>
      <feComposite operator="out" in="SourceGraphic"/>
      <feComponentTransfer><feFuncA type="linear" slope="0.15"/></feComponentTransfer>
      <feBlend in="SourceGraphic" mode="normal"/>
    </filter>
    <clipPath id="card-clip">
      <rect x="0" y="0" width="{W}" height="{H}" rx="{R}" ry="{R}"/>
    </clipPath>
  </defs>

  <!-- Shadow -->
  <rect x="0" y="0" width="{W}" height="{H}" rx="{R}" ry="{R}" fill="white" filter="url(#shadow)"/>

  <!-- Card background -->
  <rect x="0" y="0" width="{W}" height="{H}" rx="{R}" ry="{R}" fill="{SVG_CARD_BG}" stroke="{SVG_CARD_BORDER}" stroke-width="1"/>

  <!-- Top accent stripe -->
  <rect x="0" y="0" width="{W}" height="6" rx="{R}" ry="{R}" fill="{SVG_ACCENT}"/>
  <rect x="0" y="3" width="{W}" height="3" fill="{SVG_ACCENT}"/>

  <!-- Card image with rounded sub-clip -->
  <clipPath id="img-clip">
    <rect x="{pad}" y="{pad}" width="{img_area_w}" height="{img_area_h}" rx="12" ry="12"/>
  </clipPath>
  <rect x="{pad}" y="{pad}" width="{img_area_w}" height="{img_area_h}" rx="12" ry="12" fill="white" stroke="#e8e8e8" stroke-width="1"/>
  <image href="data:image/png;base64,{b64}" x="{img_x:.1f}" y="{img_y:.1f}" width="{disp_w:.1f}" height="{disp_h:.1f}" preserveAspectRatio="xMidYMid meet" clip-path="url(#img-clip)"/>

  <!-- Bottom label area -->
  <rect x="0" y="{H - pad - label_h}" width="{W}" height="{label_h}" fill="{SVG_CARD_BG}"/>
  <line x1="{pad * 2}" y1="{H - pad - label_h}" x2="{W - pad * 2}" y2="{H - pad - label_h}" stroke="#e0e0e0" stroke-width="0.5"/>

  <!-- Card number badge -->
  <circle cx="{W - pad - 14}" cy="{H - pad - label_h / 2}" r="14" fill="{SVG_ACCENT2}" opacity="0.9"/>
  <text x="{W - pad - 14}" y="{H - pad - label_h / 2 + 1}" text-anchor="middle" dominant-baseline="central"
        font-family="Arial, sans-serif" font-size="11" font-weight="bold" fill="white">#{card_num}</text>

  <!-- Label text -->
  <text x="{pad + 10}" y="{H - pad - label_h / 2 + 1}" text-anchor="start" dominant-baseline="central"
        font-family="Arial, sans-serif" font-size="15" font-weight="600" fill="#2c3e50">{label_text}</text>
</svg>'''

    with open(output_path, "w", encoding="utf-8") as f:
        f.write(svg)

    print(f"  ✓ SVG: {output_path.name}")
    return output_path


# ─── 5. MONTAGE SVG ──────────────────────────────────────────────────────
def generate_montage_svg(cards_data, cols=MONTAGE_COLS, output_path="montage.svg"):
    """Generate a professional grid montage of all cards as a single SVG."""
    n = len(cards_data)
    if n == 0:
        return

    rows = (n + cols - 1) // cols
    cw, ch = 180, 252
    gap = 14
    pad = 32
    total_w = cols * cw + (cols - 1) * gap + pad * 2
    total_h = rows * ch + (rows - 1) * gap + pad * 2

    lines = [f'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 {total_w} {total_h}" width="{total_w}" height="{total_h}">']
    lines.append(f'<defs><filter id="ms"><feDropShadow dx="0" dy="2" stdDeviation="3" flood-color="#00000025"/></filter></defs>')
    lines.append(f'<rect width="{total_w}" height="{total_h}" fill="#f0f2f5" rx="16"/>')
    lines.append(f'<text x="{pad}" y="{pad-8}" font-family="Arial,sans-serif" font-size="16" font-weight="bold" fill="#1a1a2e">Montage — {n} cartes</text>')

    for i, cd in enumerate(cards_data):
        r, c = i // cols, i % cols
        x = pad + c * (cw + gap)
        y = pad + r * (ch + gap) + 8

        try:
            with open(cd["png_path"], "rb") as f:
                b64 = base64.b64encode(f.read()).decode("ascii")
        except:
            continue

        img_w = cw - 20
        img_h = ch - 50
        ix = x + (cw - img_w) / 2
        iy = y + 10

        lines.append(f'''
  <g transform="translate({x},{y})">
    <rect width="{cw}" height="{ch}" rx="10" fill="white" filter="url(#ms)"/>
    <rect width="{cw}" height="{ch}" rx="10" fill="none" stroke="#e0e0e0" stroke-width="1"/>
    <rect x="5" y="5" width="{cw-10}" height="{ch-50}" rx="8" fill="#fafafa"/>
    <image href="data:image/png;base64,{b64}" x="{ix-x:.1f}" y="10" width="{img_w}" height="{img_h}" preserveAspectRatio="xMidYMid meet"/>
    <text x="{cw/2}" y="{ch-14}" text-anchor="middle" font-family="Arial,sans-serif" font-size="11" fill="#555" font-weight="600">{escape_xml(cd.get("label", f"#{i+1}"))}</text>
  </g>''')

    lines.append('\n</svg>')

    with open(output_path, "w", encoding="utf-8") as f:
        f.write("".join(lines))

    print(f"  ✓ Montage SVG: {output_path} ({n} cards)")

# ─── 6. VISUALIZE DETECTION ──────────────────────────────────────────────
def draw_grid(img, rows, cols, output_path="detection_grid.png"):
    debug = img.copy()
    for r_start, r_end in rows:
        for c_start, c_end in cols:
            cv2.rectangle(debug, (c_start, r_start), (c_end, r_end), (0, 200, 0), 3)
            cv2.putText(debug, f"{(c_end-c_start)}x{(r_end-r_start)}",
                        (c_start + 5, r_start + 30),
                        cv2.FONT_HERSHEY_SIMPLEX, 0.5, (0, 200, 0), 2)
    cv2.imwrite(output_path, debug)
    print(f"  ✓ Grid detection: {output_path}")


# ─── 7. MAIN ─────────────────────────────────────────────────────────────
def process_planche(image_path, do_svg=False, do_montage=False, output_dir=OUTPUT_DIR):
    img = cv2.imread(str(image_path))
    if img is None:
        print(f"❌ Cannot read: {image_path}")
        return []

    h, w = img.shape[:2]
    name = Path(image_path).stem
    print(f"\n📷 {name}: {w}×{h}")

    rows, cols = find_grid(img)
    print(f"   Grid: {len(cols)}×{len(rows)} = {len(rows) * len(cols)} cards")
    print(f"   Rows: {[(e-s) for s,e in rows]}")
    print(f"   Cols: {[(e-s) for s,e in cols]}")

    if not rows or not cols:
        print("   ⚠ No grid detected")
        return []

    cards = extract_cards(img, rows, cols)

    # Draw debug grid
    grid_path = f"{name}_grid.png"
    draw_grid(img, rows, cols, grid_path)

    # Save PNG cards
    png_dir = Path(output_dir) / name
    png_files = save_png(cards, output_dir=png_dir, prefix="")

    # Generate individual SVG cards
    svg_files = []
    if do_svg:
        print("   ── SVG cards ──")
        for i, (card, png_path) in enumerate(zip(cards, png_files)):
            label = f"{name} #{i+1}"
            svg_path = png_path.with_suffix(".svg")
            result = generate_svg(png_path, label=label, card_num=i+1, output_path=svg_path)
            if result:
                svg_files.append(result)

    # Generate montage SVG
    if do_montage and png_files:
        cards_data = [
            {"png_path": str(p), "label": f"{name} #{i+1}"}
            for i, p in enumerate(png_files)
        ]
        generate_montage_svg(cards_data, output_path=f"{name}_montage.svg")

    return png_files  # Return png file list for chaining


if __name__ == "__main__":
    import glob

    if len(sys.argv) < 2:
        print(__doc__)
        sys.exit(1)

    args = sys.argv[1:]
    do_svg = "--svg" in args
    do_montage = "--montage" in args
    output_dir = OUTPUT_DIR

    # Extract paths (non-flag args)
    paths = [a for a in args if not a.startswith("--")]

    # Expand globs
    expanded = []
    for p in paths:
        expanded.extend(glob.glob(p))
    paths = sorted(set(expanded))

    if not paths:
        print("❌ No files matched.")
        sys.exit(1)

    print(f"Processing {len(paths)} planche(s)")
    for p in paths:
        process_planche(p, do_svg=do_svg, do_montage=do_montage, output_dir=output_dir)

    print("\n✅ Done.")
