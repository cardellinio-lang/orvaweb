#!/usr/bin/env python3
"""Generate product mockups for imagier IBI — mother+daughter card theme."""
import os
from PIL import Image, ImageDraw, ImageFont, ImageFilter
import arabic_reshaper
from bidi.algorithm import get_display

OUTPUT_DIR = os.path.expanduser("~/Desktop/cartes_orthophonie/imagier_ibi")
PUBLIC_DIR = os.path.expanduser("~/Desktop/ibishopweb-2.0/public/products")
FONT_PATH = "/Users/traddax/Library/Fonts/Hacen-Tunisia-Bold.ttf"
os.makedirs(OUTPUT_DIR, exist_ok=True)
os.makedirs(PUBLIC_DIR, exist_ok=True)

def ar(text):
    return get_display(arabic_reshaper.reshape(text))

def drop_shadow(img, offset=(8, 8), blur=15, opacity=60):
    shadow = Image.new("RGBA", img.size, (0,0,0,0))
    draw = ImageDraw.Draw(shadow)
    draw.rectangle((offset[0], offset[1], img.width+offset[0], img.height+offset[1]), fill=(0,0,0,opacity))
    shadow = shadow.filter(ImageFilter.GaussianBlur(blur))
    result = Image.new("RGBA", img.size, (0,0,0,0))
    result.paste(shadow, (0, 0), shadow)
    result.paste(img, (0, 0), img)
    return result

def draw_mother_daughter_card(draw, x, y, w, h):
    """Draw a card with mother in Algerian dress + daughter in green dress."""
    # Card background
    draw.rounded_rectangle((x, y, x+w, y+h), radius=20, fill=(255,252,248))
    draw.rounded_rectangle((x, y, x+w, y+h), radius=20, outline=(200,180,160), width=2)

    # Scene background - light warm interior
    scene_x, scene_y = x + 15, y + 15
    scene_w, scene_h = w - 30, h - 90
    draw.rounded_rectangle((scene_x, scene_y, scene_x+scene_w, scene_y+scene_h), radius=12, fill=(255, 248, 235))
    
    # Floor line
    floor_y = scene_y + int(scene_h * 0.72)
    draw.rectangle((scene_x, floor_y, scene_x+scene_w, floor_y+2), fill=(200, 180, 150))
    
    # ---- MOTHER (Algerian dress) ----
    mother_cx = scene_x + int(scene_w * 0.33)
    mother_y_base = floor_y

    # Hair (visible, no hood - dark brown)
    hair_color = (80, 50, 30)
    draw.ellipse((mother_cx-22, mother_y_base-92, mother_cx+22, mother_y_base-55), fill=hair_color)

    # Head/Face
    face_color = (245, 215, 175)
    draw.ellipse((mother_cx-18, mother_y_base-88, mother_cx+18, mother_y_base-58), fill=face_color)

    # Eyes
    draw.ellipse((mother_cx-8, mother_y_base-78, mother_cx-4, mother_y_base-74), fill=(40,30,20))
    draw.ellipse((mother_cx+4, mother_y_base-78, mother_cx+8, mother_y_base-74), fill=(40,30,20))
    
    # Smile
    draw.arc((mother_cx-5, mother_y_base-72, mother_cx+5, mother_y_base-66), 0, 180, fill=(180,100,80), width=2)

    # Traditional Algerian dress (karakou/gandoura style) - red with gold trim
    dress_color = (200, 50, 40)
    gold_color = (212, 175, 55)
    
    # Body (dress)
    dress_top = mother_y_base - 55
    draw.polygon([
        (mother_cx-30, mother_y_base),       # bottom left
        (mother_cx-28, dress_top + 20),       # waist left
        (mother_cx-22, dress_top),            # chest left
        (mother_cx-18, dress_top - 5),        # shoulder left
        (mother_cx-5, dress_top - 5),         # neck left
        (mother_cx+5, dress_top - 5),         # neck right
        (mother_cx+18, dress_top - 5),        # shoulder right
        (mother_cx+22, dress_top),            # chest right
        (mother_cx+28, dress_top + 20),       # waist right
        (mother_cx+30, mother_y_base),        # bottom right
    ], fill=dress_color)
    
    # Gold belt/trim at waist
    draw.line([(mother_cx-27, dress_top+18), (mother_cx+27, dress_top+18)], fill=gold_color, width=3)
    
    # Gold necklace
    draw.arc((mother_cx-12, dress_top-2, mother_cx+12, dress_top+12), 180, 0, fill=gold_color, width=2)
    
    # Arms
    arm_color = face_color
    # Left arm (reaching toward daughter)
    draw.line([(mother_cx-25, dress_top+10), (mother_cx-38, dress_top+30), (mother_cx-40, dress_top+35)], fill=arm_color, width=6, joint="curve")
    # Right arm
    draw.line([(mother_cx+25, dress_top+10), (mother_cx+38, dress_top+25), (mother_cx+40, dress_top+30)], fill=arm_color, width=6, joint="curve")
    
    # ---- DAUGHTER (green dress) ----
    dau_cx = scene_x + int(scene_w * 0.70)
    dau_y_base = floor_y
    dau_scale = 0.75  # smaller than mother

    # Hair (brown, pigtails)
    draw.ellipse((dau_cx-15*dau_scale, dau_y_base-65*dau_scale, dau_cx+15*dau_scale, dau_y_base-40*dau_scale), fill=hair_color)
    # Pigtails
    draw.ellipse((dau_cx-22*dau_scale, dau_y_base-50*dau_scale, dau_cx-12*dau_scale, dau_y_base-35*dau_scale), fill=hair_color)
    draw.ellipse((dau_cx+12*dau_scale, dau_y_base-50*dau_scale, dau_cx+22*dau_scale, dau_y_base-35*dau_scale), fill=hair_color)
    
    # Face
    draw.ellipse((dau_cx-12*dau_scale, dau_y_base-62*dau_scale, dau_cx+12*dau_scale, dau_y_base-42*dau_scale), fill=face_color)
    
    # Eyes
    draw.ellipse((dau_cx-5*dau_scale, dau_y_base-54*dau_scale, dau_cx-2*dau_scale, dau_y_base-51*dau_scale), fill=(40,30,20))
    draw.ellipse((dau_cx+2*dau_scale, dau_y_base-54*dau_scale, dau_cx+5*dau_scale, dau_y_base-51*dau_scale), fill=(40,30,20))
    
    # Smile
    draw.arc((dau_cx-4*dau_scale, dau_y_base-49*dau_scale, dau_cx+4*dau_scale, dau_y_base-44*dau_scale), 0, 180, fill=(180,100,80), width=2)

    # Green dress
    green_dress = (50, 170, 100)
    dress_top_dau = dau_y_base - 40*dau_scale
    draw.polygon([
        (dau_cx-20*dau_scale, dau_y_base),
        (dau_cx-18*dau_scale, dress_top_dau+10),
        (dau_cx-15*dau_scale, dress_top_dau),
        (dau_cx-10*dau_scale, dress_top_dau-3),
        (dau_cx+10*dau_scale, dress_top_dau-3),
        (dau_cx+15*dau_scale, dress_top_dau),
        (dau_cx+18*dau_scale, dress_top_dau+10),
        (dau_cx+20*dau_scale, dau_y_base),
    ], fill=green_dress)
    
    # Dress decoration - small white dots
    for dot_i in range(3):
        dot_y = dress_top_dau + 5 + dot_i * 8
        draw.ellipse((dau_cx-8*dau_scale, dot_y, dau_cx-4*dau_scale, dot_y+3), fill=(200,255,220))
        draw.ellipse((dau_cx+4*dau_scale, dot_y, dau_cx+8*dau_scale, dot_y+3), fill=(200,255,220))
    
    # Arms
    # Left arm (reaching toward mother)
    draw.line([(dau_cx-16*dau_scale, dress_top_dau+5), (dau_cx-25*dau_scale, dress_top_dau+15), (dau_cx-28*dau_scale, dress_top_dau+18)], fill=arm_color, width=int(4*dau_scale), joint="curve")
    # Right arm
    draw.line([(dau_cx+16*dau_scale, dress_top_dau+5), (dau_cx+25*dau_scale, dress_top_dau+12)], fill=arm_color, width=int(4*dau_scale), joint="curve")

    # Label area at bottom of card
    label_y = scene_y + scene_h + 8
    label_h = h - 30 - scene_h - 8
    
    # Decorative line
    draw.line([(x + 25, label_y), (x + w - 25, label_y)], fill=(200, 180, 160), width=1)
    
    # Arabic word label
    font_label = ImageFont.truetype(FONT_PATH, int(label_h * 0.55))
    word = ar("أمي")
    lw, lh = draw.textbbox((0, 0), word, font=font_label)[2:4]
    lx = x + (w - lw) // 2
    ly = label_y + (label_h - lh) // 2
    draw.text((lx, ly), word, fill=(180, 60, 50), font=font_label)

def generate_card_image():
    """Generate a standalone card image with mother+daughter."""
    W, H = 600, 800
    card = Image.new("RGB", (W, H), (255, 252, 248))
    draw = ImageDraw.Draw(card)
    
    padding = 20
    draw_mother_daughter_card(draw, padding, padding, W-2*padding, H-2*padding)
    
    output_path = os.path.join(OUTPUT_DIR, "carte_mere_fille.jpg")
    card.save(output_path, quality=95)
    
    # Also save a copy with rounded corners
    mask = Image.new("L", (W, H), 0)
    mask_draw = ImageDraw.Draw(mask)
    mask_draw.rounded_rectangle((0, 0, W, H), radius=30, fill=255)
    card_rgba = card.convert("RGBA")
    card_rgba.putalpha(mask)
    card_rgba.save(os.path.join(OUTPUT_DIR, "carte_mere_fille_rond.png"))
    
    return output_path

def generate_product_mockup():
    """Main product mockup — centered card with elegant background."""
    W, H = 1200, 1200
    bg = Image.new("RGB", (W, H), (255, 250, 245))
    draw = ImageDraw.Draw(bg)
    
    # Top color strip - warm coral/pink
    draw.rectangle((0, 0, W, 170), fill=(200, 80, 70))
    draw.ellipse((W-160, -80, W+60, 180), fill=(220, 110, 90))
    
    # Title
    font_title = ImageFont.truetype(FONT_PATH, 44)
    font_sub = ImageFont.truetype(FONT_PATH, 26)
    font_price = ImageFont.truetype(FONT_PATH, 34)
    font_cat = ImageFont.truetype(FONT_PATH, 22)
    
    title = ar("إيماجيـــر IBI")
    draw.text(((W - draw.textbbox((0,0), title, font=font_title)[2]) // 2, 35), title, fill=(255,255,255), font=font_title)
    
    subtitle = ar("218 بطاقة مصورة — تعلم المفردات")
    sw, sh = draw.textbbox((0,0), subtitle, font=font_sub)[2:4]
    draw.text(((W - sw)//2, 100), subtitle, fill=(255, 230, 220), font=font_sub)
    
    # Card image
    card_path = os.path.join(OUTPUT_DIR, "carte_mere_fille.jpg")
    if os.path.exists(card_path):
        card_img = Image.open(card_path).convert("RGBA")
        target_w = 550
        scale = target_w / card_img.width
        card_img = card_img.resize((target_w, int(card_img.height * scale)), Image.LANCZOS)
        card_img = drop_shadow(card_img, offset=(6, 8), blur=15, opacity=55)
        cx = (W - card_img.width) // 2
        cy = 200
        bg.paste(card_img, (cx, cy), card_img)
    
    # Small floating word labels around the card
    words = [ar("أمي"), ar("بابا"), ar("طفل"), ar("بيت"), ar("قطة"), ar("كلب")]
    font_small_words = ImageFont.truetype(FONT_PATH, 22)
    positions = [
        (80, 250), (W-130, 250),
        (50, 400), (W-100, 400),
        (70, 550), (W-110, 550),
    ]
    for i, (wx, wy) in enumerate(positions):
        draw.text((wx, wy), words[i], fill=(160, 150, 140), font=font_small_words)
    
    # Price badge
    badge_text = ar("2500 د.ج")
    bw, bh = draw.textbbox((0,0), badge_text, font=font_price)[2:4]
    badge_w = bw + 60
    badge_h = bh + 30
    bx = (W - badge_w) // 2
    draw.rounded_rectangle((bx, 920, bx+badge_w, 920+badge_h), radius=25, fill=(200, 80, 70))
    draw.text((bx+30, 920+12), badge_text, fill=(255,255,255), font=font_price)
    
    # Category
    cat_text = ar("بطاقات علاج النطق")
    cw, ch = draw.textbbox((0,0), cat_text, font=font_cat)[2:4]
    draw.text(((W - cw)//2, 990), cat_text, fill=(140, 135, 130), font=font_cat)
    
    output_path = os.path.join(PUBLIC_DIR, "mockup_imagier_ibi.jpg")
    bg.save(output_path, quality=95)
    print(f"Saved: {output_path}")
    return output_path

def generate_spread_image():
    """Cards spread out — showing multiple cards."""
    W, H = 1400, 1000
    bg = Image.new("RGB", (W, H), (250, 245, 240))
    draw = ImageDraw.Draw(bg)
    
    # Color strip
    draw.rectangle((0, 0, W, 10), fill=(200, 80, 70))
    
    # Use the single card but create variations by recoloring
    card_path = os.path.join(OUTPUT_DIR, "carte_mere_fille.jpg")
    if not os.path.exists(card_path):
        return
    
    base_card = Image.open(card_path).convert("RGBA")
    
    # Create different color variants
    variants = []
    color_overlays = [
        None,  # original
        (50, 150, 200, 30),   # blueish
        (50, 180, 100, 30),   # greenish
        (200, 150, 50, 30),   # yellowish
        (180, 80, 150, 30),   # purplish
    ]
    
    for overlay in color_overlays:
        if overlay:
            overlay_img = Image.new("RGBA", base_card.size, overlay)
            variant = Image.alpha_composite(base_card, overlay_img)
        else:
            variant = base_card.copy()
        
        scale = 0.35
        v = variant.resize((int(variant.width*scale), int(variant.height*scale)), Image.LANCZOS)
        v = drop_shadow(v, offset=(4, 6), blur=10, opacity=40)
        variants.append(v)
    
    # Arrange in a fan
    cx, cy = W//2, H//2 + 30
    for i, v in enumerate(variants):
        angle = -25 + i * 12
        rot = v.rotate(angle, expand=True, fillcolor=(250,245,240))
        rx = cx - rot.width//2 + int((i - len(variants)/2) * 30)
        ry = cy - rot.height//2 + int(abs(i - len(variants)/2) * 6)
        bg.paste(rot, (rx, ry), rot)
    
    output_path = os.path.join(PUBLIC_DIR, "spread_imagier_ibi.jpg")
    bg.save(output_path, quality=92)
    print(f"Saved: {output_path}")
    return output_path

def generate_closeup_image():
    """Close-up card image."""
    W, H = 800, 1000
    bg = Image.new("RGB", (W, H), (252, 250, 246))
    
    card_path = os.path.join(OUTPUT_DIR, "carte_mere_fille.jpg")
    if os.path.exists(card_path):
        card = Image.open(card_path).convert("RGBA")
        scale = min(W*0.9/card.width, H*0.9/card.height)
        card = card.resize((int(card.width*scale), int(card.height*scale)), Image.LANCZOS)
        card = drop_shadow(card, offset=(6, 8), blur=15, opacity=55)
        bg.paste(card, ((W-card.width)//2, (H-card.height)//2), card)
    else:
        draw = ImageDraw.Draw(bg)
        draw.text((W//2, H//2), "No card", fill=(150,150,150))
    
    output_path = os.path.join(PUBLIC_DIR, "card_closeup_imagier_ibi.jpg")
    bg.save(output_path, quality=95)
    print(f"Saved: {output_path}")
    return output_path

if __name__ == "__main__":
    print("Generating imagier IBI card...")
    generate_card_image()
    
    print("Generating product mockup...")
    generate_product_mockup()
    
    print("Generating spread image...")
    generate_spread_image()
    
    print("Generating closeup image...")
    generate_closeup_image()
    
    print("Done! All images generated.")
