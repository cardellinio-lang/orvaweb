#!/usr/bin/env python3
"""Generate mockups for decor frame product — Bref je suis orthophoniste."""
import os
from PIL import Image, ImageDraw, ImageFont, ImageFilter
import arabic_reshaper
from bidi.algorithm import get_display

PUBLIC_DIR = os.path.expanduser("~/Desktop/ibishopweb-2.0/public/products")
FONT_PATH = "/Users/traddax/Library/Fonts/Hacen-Tunisia-Bold.ttf"
os.makedirs(PUBLIC_DIR, exist_ok=True)

def ar(text):
    return get_display(arabic_reshaper.reshape(text))

def drop_shadow(img, offset=(6, 6), blur=12, opacity=50):
    shadow = Image.new("RGBA", img.size, (0,0,0,0))
    draw = ImageDraw.Draw(shadow)
    draw.rectangle((offset[0], offset[1], img.width+offset[0], img.height+offset[1]), fill=(0,0,0,opacity))
    shadow = shadow.filter(ImageFilter.GaussianBlur(blur))
    result = Image.new("RGBA", img.size, (0,0,0,0))
    result.paste(shadow, (0, 0), shadow)
    result.paste(img, (0, 0), img)
    return result

def draw_poster(draw, x, y, w, h):
    """Draw the BREF JE SUIS ORTHOPHONISTE poster design."""
    # Poster background - warm off-white
    draw.rounded_rectangle((x, y, x+w, y+h), radius=8, fill=(253, 248, 240))
    
    # Top decorative bar - coral/pink gradient
    bar_h = int(h * 0.12)
    for i in range(bar_h):
        t = i / bar_h
        r = int(230 + (255 - 230) * t)
        g = int(100 + (150 - 100) * t)
        b = int(90 + (140 - 90) * t)
        draw.line([(x+15, y+15+i), (x+w-15, y+15+i)], fill=(r, g, b))
    
    # Main text "BREF" (large, fancy)
    font_bref = ImageFont.truetype(FONT_PATH, int(w * 0.12))
    bref_text = "BREF"
    bw, _ = draw.textbbox((0, 0), bref_text, font=font_bref)[2:4]
    draw.text((x + (w - bw) // 2, y + bar_h + int(h * 0.04)), bref_text,
              fill=(200, 80, 70), font=font_bref)
    
    # Subtitle "JE SUIS"
    font_je = ImageFont.truetype(FONT_PATH, int(w * 0.06))
    je_text = "JE SUIS"
    jw, _ = draw.textbbox((0, 0), je_text, font=font_je)[2:4]
    draw.text((x + (w - jw) // 2, y + bar_h + int(h * 0.14)), je_text,
              fill=(120, 110, 100), font=font_je)
    
    # Main word "ORTHOPHONISTE" 
    font_ortho = ImageFont.truetype(FONT_PATH, int(w * 0.09))
    ortho_text = "ORTHOPHONISTE"
    ow, _ = draw.textbbox((0, 0), ortho_text, font=font_ortho)[2:4]
    draw.text((x + (w - ow) // 2, y + bar_h + int(h * 0.20)), ortho_text,
              fill=(60, 55, 50), font=font_ortho)
    
    # Decorative line
    line_y = y + bar_h + int(h * 0.32)
    draw.line([(x + int(w * 0.2), line_y), (x + int(w * 0.8), line_y)],
              fill=(200, 180, 160), width=2)
    
    # Arabic translation
    arabic_text = ar("أنا أخصائي تخاطب")
    font_ar = ImageFont.truetype(FONT_PATH, int(w * 0.065))
    aw, _ = draw.textbbox((0, 0), arabic_text, font=font_ar)[2:4]
    draw.text((x + (w - aw) // 2, line_y + int(h * 0.04)), arabic_text,
              fill=(100, 90, 80), font=font_ar)
    
    # Small decorative icons/symbols
    icon_y = line_y + int(h * 0.12)
    symbols = ["✿", "✦", "✿"]
    font_sym = ImageFont.truetype(FONT_PATH, int(w * 0.045))
    for i, sym in enumerate(symbols):
        sw, _ = draw.textbbox((0, 0), sym, font=font_sym)[2:4]
        sx = x + int(w * (0.25 + i * 0.25))
        draw.text((sx - sw//2, icon_y), sym, fill=(200, 150, 130), font=font_sym)
    
    # Bottom text - "Speech Therapy" tag
    tag_y = icon_y + int(h * 0.06)
    tag_text = ar("عيادة التخاطب")
    font_tag = ImageFont.truetype(FONT_PATH, int(w * 0.04))
    tw, _ = draw.textbbox((0, 0), tag_text, font=font_tag)[2:4]
    draw.text((x + (w - tw) // 2, tag_y), tag_text,
              fill=(170, 160, 150), font=font_tag)
    
    # Bottom decorative bar
    bottom_bar_y = y + h - 15 - int(bar_h * 0.6)
    for i in range(int(bar_h * 0.6)):
        t = i / (bar_h * 0.6)
        r = int(200 + (230 - 200) * t)
        g = int(80 + (100 - 80) * t)
        b = int(70 + (90 - 70) * t)
        draw.line([(x+15, bottom_bar_y+i), (x+w-15, bottom_bar_y+i)], fill=(r, g, b))

def generate_mockup():
    """Main product image: framed poster on a wall."""
    W, H = 1200, 1200
    bg = Image.new("RGB", (W, H), (248, 245, 240))
    draw = ImageDraw.Draw(bg)
    
    # Wall-like background with subtle pattern
    for i in range(0, W, 40):
        draw.line([(i, 0), (i, H)], fill=(243, 240, 235), width=1)
    for i in range(0, H, 40):
        draw.line([(0, i), (W, i)], fill=(243, 240, 235), width=1)
    
    # Title
    font_title = ImageFont.truetype(FONT_PATH, 34)
    font_sub = ImageFont.truetype(FONT_PATH, 22)
    font_price = ImageFont.truetype(FONT_PATH, 32)
    
    title = ar("إطار ديكور عيادة التخاطب")
    tw, _ = draw.textbbox((0, 0), title, font=font_title)[2:4]
    draw.text(((W - tw)//2, 30), title, fill=(60, 55, 50), font=font_title)
    
    subtitle = ar("Bref, je suis orthophoniste")
    sw, _ = draw.textbbox((0, 0), subtitle, font=font_sub)[2:4]
    draw.text(((W - sw)//2, 75), subtitle, fill=(150, 140, 130), font=font_sub)
    
    # Frame dimensions
    frame_w = int(W * 0.55)
    frame_h = int(H * 0.65)
    frame_x = (W - frame_w) // 2
    frame_y = 115
    
    # Frame shadow
    shadow = Image.new("RGBA", (frame_w + 60, frame_h + 60), (0,0,0,0))
    sdraw = ImageDraw.Draw(shadow)
    sdraw.rounded_rectangle((10, 10, frame_w+50, frame_h+50), radius=12, fill=(0,0,0,60))
    shadow = shadow.filter(ImageFilter.GaussianBlur(25))
    bg.paste(shadow, (frame_x - 30, frame_y - 30), shadow)
    
    # Frame outer (gold/wooden)
    frame_border = 28
    draw.rounded_rectangle((frame_x, frame_y, frame_x+frame_w, frame_y+frame_h),
                          radius=10, fill=(180, 150, 90))
    
    # Frame middle layer
    mid_gap = 6
    draw.rounded_rectangle((frame_x+mid_gap, frame_y+mid_gap, 
                           frame_x+frame_w-mid_gap, frame_y+frame_h-mid_gap),
                          radius=8, fill=(150, 120, 70))
    
    # Frame inner (mat/mount)
    mat_gap = 4
    mat_x = frame_x + frame_border
    mat_y = frame_y + frame_border
    mat_w = frame_w - 2 * frame_border
    mat_h = frame_h - 2 * frame_border
    draw.rounded_rectangle((mat_x, mat_y, mat_x+mat_w, mat_y+mat_h),
                          radius=6, fill=(255, 252, 245))
    
    # Poster inside the frame
    poster_margin = 15
    px = mat_x + poster_margin
    py = mat_y + poster_margin
    pw = mat_w - 2 * poster_margin
    ph = mat_h - 2 * poster_margin
    
    # Create poster on separate image
    poster = Image.new("RGB", (pw, ph), (253, 248, 240))
    pdraw = ImageDraw.Draw(poster)
    draw_poster(pdraw, 0, 0, pw, ph)
    bg.paste(poster, (px, py))
    
    # Price badge
    badge = ar("6900 د.ج")
    bw, bh = draw.textbbox((0, 0), badge, font=font_price)[2:4]
    badge_x = (W - bw - 50) // 2
    badge_y = frame_y + frame_h + 25
    draw.rounded_rectangle((badge_x, badge_y, badge_x+bw+50, badge_y+bh+25),
                          radius=20, fill=(200, 80, 70))
    draw.text((badge_x+25, badge_y+10), badge, fill=(255,255,255), font=font_price)
    
    # Category
    cat = ar("ديكور عيادات التخاطب")
    font_cat = ImageFont.truetype(FONT_PATH, 20)
    cw, _ = draw.textbbox((0, 0), cat, font=font_cat)[2:4]
    draw.text(((W - cw)//2, badge_y + bh + 20), cat, fill=(140, 135, 130), font=font_cat)
    
    path = os.path.join(PUBLIC_DIR, "mockup_cadre_ortho.jpg")
    bg.save(path, quality=95)
    print(f"Saved: {path}")

def generate_spread():
    """Wall view — multiple frames for context."""
    W, H = 1400, 900
    bg = Image.new("RGB", (W, H), (245, 242, 237))
    draw = ImageDraw.Draw(bg)
    
    # Wall pattern
    for i in range(0, W, 50):
        draw.line([(i, 0), (i, H)], fill=(240, 237, 232), width=1)
    for i in range(0, H, 50):
        draw.line([(0, i), (W, i)], fill=(240, 237, 232), width=1)
    
    # Create the poster frame smaller for context view
    def draw_mini_frame(cx, cy, scale=1.0):
        fw = int(240 * scale)
        fh = int(320 * scale)
        fx = cx - fw//2
        fy = cy - fh//2
        
        # Frame
        draw.rounded_rectangle((fx, fy, fx+fw, fy+fh), radius=6, fill=(180, 150, 90))
        draw.rounded_rectangle((fx+3, fy+3, fx+fw-3, fy+fh-3), radius=5, fill=(150, 120, 70))
        
        # Mat
        border = int(20 * scale)
        mat = Image.new("RGB", (fw-2*border, fh-2*border), (255, 252, 245))
        mdraw = ImageDraw.Draw(mat)
        
        # Mini poster
        pm = int(8 * scale)
        draw_poster(mdraw, pm, pm, mat.width-2*pm, mat.height-2*pm)
        bg.paste(mat, (fx+border, fy+border))
    
    # Main frame center
    draw_mini_frame(W//2, H//2, 1.8)
    
    # Smaller decorative frames around
    draw_mini_frame(W//4 - 30, H//3, 0.8)
    draw_mini_frame(3*W//4 + 30, H//3, 0.8)
    
    path = os.path.join(PUBLIC_DIR, "spread_cadre_ortho.jpg")
    bg.save(path, quality=92)
    print(f"Saved: {path}")

def generate_closeup():
    """Closeup of the frame corner detail."""
    W, H = 800, 1000
    bg = Image.new("RGB", (W, H), (252, 250, 246))
    draw = ImageDraw.Draw(bg)
    
    # Frame corner closeup
    fw = int(W * 0.85)
    fh = int(H * 0.8)
    fx = (W - fw) // 2
    fy = (H - fh) // 2
    
    # Frame
    draw.rounded_rectangle((fx, fy, fx+fw, fy+fh), radius=10, fill=(180, 150, 90))
    draw.rounded_rectangle((fx+4, fy+4, fx+fw-4, fy+fh-4), radius=8, fill=(150, 120, 70))
    
    # Mat
    border = 25
    mat = Image.new("RGB", (fw-2*border, fh-2*border), (255, 252, 245))
    mdraw = ImageDraw.Draw(mat)
    pm = 12
    draw_poster(mdraw, pm, pm, mat.width-2*pm, mat.height-2*pm)
    bg.paste(mat, (fx+border, fy+border))
    
    path = os.path.join(PUBLIC_DIR, "closeup_cadre_ortho.jpg")
    bg.save(path, quality=95)
    print(f"Saved: {path}")

if __name__ == "__main__":
    print("Generating cadre ortho mockup...")
    generate_mockup()
    print("Generating spread...")
    generate_spread()
    print("Generating closeup...")
    generate_closeup()
    print("Done!")
