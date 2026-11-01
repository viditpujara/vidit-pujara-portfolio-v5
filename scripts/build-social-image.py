#!/usr/bin/env python3
"""Render the site's typographic social card. Requires Pillow."""
from pathlib import Path
from PIL import Image, ImageDraw, ImageFont

ROOT = Path(__file__).resolve().parents[1]
fonts = Path('/usr/share/fonts/truetype/dejavu')
def font(size, bold=False):
    return ImageFont.truetype(str(fonts / ('DejaVuSans-Bold.ttf' if bold else 'DejaVuSans.ttf')), size)
image = Image.new('RGB',(1200,630),'#08111a')
draw = ImageDraw.Draw(image)
for x in range(0,1200,40): draw.line((x,0,x,630), fill='#13232e')
for y in range(0,630,40): draw.line((0,y,1200,y), fill='#13232e')
draw.rectangle((64,65,1136,565),fill='#0c1b25',outline='#36505b',width=2)
draw.text((100,100),'ORACLE INTEGRATION CLOUD (OIC)',font=font(21,True),fill='#e8b85c')
draw.text((100,165),'Vidit Pujara',font=font(64,True),fill='#eef4f3')
draw.text((100,265),'Oracle Fusion',font=font(43,True),fill='#eef4f3')
draw.text((100,322),'Technical Consultant',font=font(43,True),fill='#eef4f3')
draw.line((100,410,1100,410),fill='#36505b',width=2)
draw.text((100,443),'Consultant I at Mastek  |  Since July 2024',font=font(24),fill='#b6c6ca')
draw.text((100,492),'HCM + Financials  /  Validation + Reconciliation',font=font(23),fill='#b6c6ca')
image.save(ROOT/'public/images/vidit-pujara-oracle-fusion-technical-consultant-og.png')
