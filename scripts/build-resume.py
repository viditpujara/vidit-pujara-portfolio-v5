#!/usr/bin/env python3
"""Build the reviewed public résumé PDF from docs/resume.json.

Layout follows the owner's LaTeX résumé (Latin Modern type, justified text, rules
above each section, square bullets, blue links). Needs reportlab and fonttools.
The Latin Modern OpenType files in scripts/fonts/latin-modern are used unmodified;
reportlab only reads TrueType outlines, so they are converted at build time into
the ignored output/ folder.
"""
import json
import shutil
from pathlib import Path
from xml.sax.saxutils import escape

from fontTools.pens.cu2quPen import Cu2QuPen
from fontTools.pens.ttGlyphPen import TTGlyphPen
from fontTools.ttLib import TTFont as FontFile, newTable
from reportlab import rl_config
from reportlab.lib import colors
from reportlab.lib.enums import TA_CENTER, TA_JUSTIFY, TA_LEFT
from reportlab.lib.pagesizes import A4
from reportlab.lib.styles import ParagraphStyle
from reportlab.pdfbase import pdfmetrics
from reportlab.pdfbase.ttfonts import TTFont
from reportlab.platypus import (BaseDocTemplate, Frame, HRFlowable, NextPageTemplate,
                                PageBreak, PageTemplate, Paragraph, Spacer)

ROOT = Path(__file__).resolve().parents[1]
data = json.loads((ROOT / "docs/resume.json").read_text())
FONT_SOURCE = ROOT / "scripts/fonts/latin-modern"
FONT_BUILD = ROOT / "output/fonts"

# Measured from the owner's LaTeX PDF (A4, points).
MARGIN = 45.4
TEXT_WIDTH = A4[0] - 2 * MARGIN
LINK_BLUE = colors.HexColor("#0000ff")
RULE = 0.498
BULLET_INDENT = 12.9
BULLET_SIDE = 3.3


def otf_to_ttf(source: Path, target: Path) -> None:
    """Convert CFF outlines to quadratic TrueType outlines (a faithful redraw)."""
    font = FontFile(str(source))
    order = font.getGlyphOrder()
    glyph_set = font.getGlyphSet()
    glyphs = {}
    for name in order:
        pen = TTGlyphPen(glyph_set)
        glyph_set[name].draw(Cu2QuPen(pen, 1.0, reverse_direction=True))
        glyphs[name] = pen.glyph()
    font["loca"] = newTable("loca")
    font["glyf"] = glyf = newTable("glyf")
    glyf.glyphOrder = order
    glyf.glyphs = glyphs
    del font["CFF "]
    if "VORG" in font:
        del font["VORG"]
    glyf.compile(font)
    for name, glyph in glyf.glyphs.items():
        if hasattr(glyph, "xMin"):
            font["hmtx"][name] = (font["hmtx"][name][0], glyph.xMin)
    font["maxp"] = maxp = newTable("maxp")
    maxp.tableVersion = 0x00010000
    maxp.maxZones = 1
    maxp.maxTwilightPoints = maxp.maxStorage = maxp.maxFunctionDefs = 0
    maxp.maxInstructionDefs = maxp.maxStackElements = maxp.maxSizeOfInstructions = 0
    maxp.maxComponentElements = max(
        (len(getattr(g, "components", [])) for g in glyf.glyphs.values()), default=0)
    maxp.compile(font)
    post = font["post"]
    post.formatType = 2.0
    post.extraNames = []
    post.mapping = {}
    post.glyphOrder = order
    font.sfntVersion = "\x00\x01\x00\x00"
    font.save(str(target))


FONT_BUILD.mkdir(parents=True, exist_ok=True)
for name, source in [("LMSans", "lmsans10-regular"), ("LMSans-Bold", "lmsans10-bold"),
                     ("LMSans9", "lmsans9-regular"), ("LMRoman-Bold", "lmroman12-bold"),
                     ("LMRoman", "lmroman10-regular")]:
    target = FONT_BUILD / f"{source}.ttf"
    if not target.exists():
        otf_to_ttf(FONT_SOURCE / f"{source}.otf", target)
    pdfmetrics.registerFont(TTFont(name, str(target)))
pdfmetrics.registerFontFamily("LMSans", normal="LMSans", bold="LMSans-Bold",
                              italic="LMSans", boldItalic="LMSans-Bold")

styles = {
    "name": ParagraphStyle("name", fontName="LMRoman-Bold", fontSize=23.91, leading=28.7,
                           alignment=TA_CENTER, spaceAfter=4.6),
    "title": ParagraphStyle("title", fontName="LMSans-Bold", fontSize=11.46, leading=13.8,
                            alignment=TA_CENTER, spaceAfter=6.2),
    "small": ParagraphStyle("small", fontName="LMSans9", fontSize=9.46, leading=11.4,
                            alignment=TA_CENTER, spaceAfter=3.5),
    "small_gap": ParagraphStyle("small_gap", fontName="LMSans9", fontSize=9.46, leading=11.4,
                                alignment=TA_CENTER, spaceAfter=5.6),
    "section": ParagraphStyle("section", fontName="LMSans-Bold", fontSize=11.96, leading=14.4,
                              spaceBefore=5.9, spaceAfter=5.7, keepWithNext=True),
    "body": ParagraphStyle("body", fontName="LMSans", fontSize=10.76, leading=13.95,
                           alignment=TA_JUSTIFY, spaceAfter=3.0),
    "left": ParagraphStyle("left", fontName="LMSans", fontSize=10.76, leading=13.95,
                           alignment=TA_LEFT, spaceAfter=3.0),
    "heading": ParagraphStyle("heading", fontName="LMSans-Bold", fontSize=10.76, leading=13.95,
                              alignment=TA_LEFT, spaceAfter=3.0, keepWithNext=True),
    "bullet": ParagraphStyle("bullet", fontName="LMSans", fontSize=10.76, leading=13.95,
                             alignment=TA_JUSTIFY, leftIndent=BULLET_INDENT,
                             bulletIndent=-0.9, spaceAfter=5.0),
}
styles["bullet_first"] = ParagraphStyle("bullet_first", parent=styles["bullet"], spaceBefore=6.95)


class Bullet(Paragraph):
    """Paragraph with the small square bullet the LaTeX layout uses."""

    def draw(self):
        super().draw()
        canvas = self.canv
        first_baseline = self.height - self.style.fontSize * 0.86
        canvas.saveState()
        canvas.setFillColor(colors.black)
        canvas.rect(0.2, first_baseline + 2.1, BULLET_SIDE, BULLET_SIDE, stroke=0, fill=1)
        canvas.restoreState()


def link(href, label, color="#0000ff"):
    return f'<a href="{escape(href)}" color="{color}">{escape(label)}</a>'


def bold_label(text):
    """Bold the 'Label:' that starts a skills line or an additional-work bullet."""
    head, sep, tail = text.partition(": ")
    if not sep or len(head) > 40:
        return escape(text)
    return f"<b>{escape(head)}:</b> {escape(tail)}"


def heading_markup(text):
    """Bold heading with the pipe separators in regular weight, as in the LaTeX source."""
    return ' | '.join(f"<b>{escape(part)}</b>" for part in text.split(" | ")).replace(
        " | ", " | ")


def footer(canvas, doc):
    canvas.saveState()
    canvas.setFont("LMRoman", 10.91)
    canvas.drawCentredString(A4[0] / 2, 15.9, str(doc.page))
    canvas.restoreState()


output = ROOT / "output/pdf/Vidit_Pujara_Oracle_Fusion_Technical_Consultant_OIC.pdf"
output.parent.mkdir(parents=True, exist_ok=True)
rl_config.canvas_basefontname = "LMSans"  # no unembedded Helvetica reference in the PDF
doc = BaseDocTemplate(str(output), pagesize=A4, title=data["metadataTitle"],
                      author=data["name"], keywords=data.get("keywords", ""),
                      leftMargin=MARGIN, rightMargin=MARGIN, topMargin=29.6, bottomMargin=42)
first = Frame(MARGIN, 42, TEXT_WIDTH, A4[1] - 29.6 - 42, leftPadding=0, rightPadding=0,
              topPadding=0, bottomPadding=0, id="first")
later = Frame(MARGIN, 42, TEXT_WIDTH, A4[1] - 47.1 - 42, leftPadding=0, rightPadding=0,
              topPadding=0, bottomPadding=0, id="later")
doc.addPageTemplates([PageTemplate(id="First", frames=[first], onPage=footer),
                      PageTemplate(id="Later", frames=[later], onPage=footer)])

phone_line = (escape(data["contact"]) + " | " + link(data["phoneHref"], data["phone"]) + " | "
              + link("mailto:vidit.pujara@zohomail.in", "vidit.pujara@zohomail.in"))
web_line = (link("https://viditpujara.me", "viditpujara.me") + '<font color="#0000ff"> | </font>'
            + link("https://www.linkedin.com/in/viditpujara", "linkedin.com/in/viditpujara"))
story = [Paragraph(escape(data["name"]), styles["name"]),
         Paragraph(escape(data["title"]), styles["title"]),
         Paragraph(escape(data["tagline"]), styles["small"]),
         Paragraph(phone_line, styles["small_gap"]),
         Paragraph(web_line, styles["small"]),
         Spacer(1, 11.4)]

LABELLED = {"SKILLS", "ADDITIONAL INTEGRATION DELIVERY (MASTEK)"}
for page_index, sections in enumerate(data["pages"]):
    if page_index:
        story.extend([NextPageTemplate("Later"), PageBreak()])
    for position, section in enumerate(sections):
        story.append(HRFlowable(width="100%", thickness=RULE, color=colors.black,
                                spaceBefore=0 if (page_index and not position) else 0,
                                spaceAfter=0))
        story.append(Paragraph(escape(section["title"]), styles["section"]))
        labelled = section["title"] in LABELLED
        last_was_bullet = False
        for block in section["blocks"]:
            if block.get("heading"):
                last_was_bullet = False
                story.append(Paragraph(heading_markup(block["heading"]), styles["heading"]))
            if block.get("text"):
                markup = bold_label(block["text"]) if labelled else escape(block["text"])
                single_line = section["title"] in {"PROFESSIONAL EXPERIENCE", "EDUCATION", "CERTIFICATIONS"}
                last_was_bullet = False
                story.append(Paragraph(markup, styles["left" if single_line else "body"]))
            for bullet in block.get("bullets", []):
                markup = bold_label(bullet) if labelled else escape(bullet)
                story.append(Bullet(markup, styles["bullet" if last_was_bullet else "bullet_first"]))
                last_was_bullet = True
        story.append(Spacer(1, 1.7 if last_was_bullet else 3.8))
doc.build(story)
public = ROOT / "public/vidit-pujara-oracle-fusion-technical-consultant-resume.pdf"
shutil.copyfile(output, public)
print(f"Built {public.relative_to(ROOT)}")
