#!/usr/bin/env python3
"""Build the reviewed public résumé from docs/resume.json (reportlab required)."""
import json
import shutil
from pathlib import Path
from xml.sax.saxutils import escape

from reportlab.lib import colors
from reportlab.lib.enums import TA_CENTER
from reportlab.lib.pagesizes import A4
from reportlab.lib.styles import ParagraphStyle
from reportlab.pdfbase import pdfmetrics
from reportlab.pdfbase.ttfonts import TTFont
from reportlab.platypus import SimpleDocTemplate, Paragraph, Spacer, PageBreak, HRFlowable

ROOT = Path(__file__).resolve().parents[1]
data = json.loads((ROOT / "docs/resume.json").read_text())
font_dir = Path("/usr/share/fonts/truetype/dejavu")
for name, file in [("Body", "DejaVuSans.ttf"), ("Bold", "DejaVuSans-Bold.ttf")]:
    pdfmetrics.registerFont(TTFont(name, str(font_dir / file)))
pdfmetrics.registerFontFamily("Body", normal="Body", bold="Bold")
styles = {
    "name": ParagraphStyle("name", fontName="Bold", fontSize=22, leading=28, alignment=TA_CENTER, spaceAfter=5),
    "title": ParagraphStyle("title", fontName="Bold", fontSize=10.2, leading=14, alignment=TA_CENTER, spaceAfter=5),
    "contact": ParagraphStyle("contact", fontName="Body", fontSize=8.4, leading=12, alignment=TA_CENTER, spaceAfter=3),
    "section": ParagraphStyle("section", fontName="Bold", fontSize=10.2, leading=14, spaceBefore=10, spaceAfter=6, keepWithNext=True),
    "heading": ParagraphStyle("heading", fontName="Bold", fontSize=9, leading=13, spaceAfter=3, keepWithNext=True),
    "body": ParagraphStyle("body", fontName="Body", fontSize=8.9, leading=12.6, spaceAfter=5),
    "bullet": ParagraphStyle("bullet", fontName="Body", fontSize=8.9, leading=12.6, leftIndent=10, firstLineIndent=-8, spaceAfter=4),
}

def paragraph(text, kind="body"):
    return Paragraph(escape(text), styles[kind])

def footer(canvas, doc):
    canvas.saveState()
    canvas.setFont("Body", 8)
    canvas.setFillColor(colors.HexColor("#555555"))
    canvas.drawCentredString(A4[0] / 2, 25, str(doc.page))
    canvas.restoreState()

output = ROOT / "output/pdf/Vidit_Pujara_Oracle_Fusion_Technical_Consultant_OIC.pdf"
output.parent.mkdir(parents=True, exist_ok=True)
doc = SimpleDocTemplate(str(output), pagesize=A4, rightMargin=43, leftMargin=43,
                        topMargin=34, bottomMargin=42,
                        title=data["metadataTitle"], author=data["name"])
story = [paragraph(data["name"], "name"), paragraph(data["title"], "title"),
         paragraph(data["tagline"], "contact"), paragraph(data["contact"], "contact"),
         Paragraph('<link href="mailto:vidit.pujara@zohomail.in">vidit.pujara@zohomail.in</link> | '
                   '<link href="https://viditpujara.me">viditpujara.me</link> | '
                   '<link href="https://www.linkedin.com/in/viditpujara">linkedin.com/in/viditpujara</link>', styles["contact"])]
for page_index, sections in enumerate(data["pages"]):
    if page_index:
        story.append(PageBreak())
    for section in sections:
        story.extend([HRFlowable(width="100%", thickness=0.5, color=colors.HexColor("#444444"), spaceBefore=8),
                      paragraph(section["title"], "section")])
        for block in section["blocks"]:
            if block.get("heading"):
                story.append(paragraph(block["heading"], "heading"))
            if block.get("text"):
                story.append(paragraph(block["text"]))
            for bullet in block.get("bullets", []):
                story.append(paragraph("• " + bullet, "bullet"))
doc.build(story, onFirstPage=footer, onLaterPages=footer)
public = ROOT / "public/vidit-pujara-oracle-fusion-technical-consultant-resume.pdf"
shutil.copyfile(output, public)
print(f"Built {public.relative_to(ROOT)}")
