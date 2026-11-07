#!/usr/bin/env python3
"""Validate the committed public PDF content and annotations (pypdf required)."""
from pathlib import Path
from pypdf import PdfReader
import json
import re

ROOT = Path(__file__).resolve().parents[1]
reader = PdfReader(ROOT/'public/vidit-pujara-oracle-fusion-technical-consultant-resume.pdf')
assert len(reader.pages) == 2, 'Expected two complete pages'
text = re.sub(r'\s+', ' ', ' '.join(page.extract_text() for page in reader.pages))
for required in ['Consultant I | Mastek','CERTIFICATIONS','Oracle APEX','2 to 3 client environments','Oracle ADF',
                 '20+ inbound and outbound integrations','10+ BI Publisher reports',
                 'Oracle APEX Cloud Certified Developer Professional.','Also: Oracle APEX (certified)',
                 'XSLT/XPath mapping','OIC adapters, connections and lookups','ESS job submission',
                 'OIC Gen 3','OIC connectivity agent','ServiceNow','Studied, no project delivery yet',
                 'US Energy Infrastructure Client | Oracle Fusion HCM Integrations']:
    assert required in text, f'Missing reviewed content: {required}'
assert not re.search(r'\+91|tel:|Oracle ERP Technical Consultant|two additional', text, re.I), 'Stale/private copy present'
allowed = {'mailto:vidit.pujara@zohomail.in','https://viditpujara.me','https://www.linkedin.com/in/viditpujara'}
uris = []
for page in reader.pages:
    for ref in page.get('/Annots', []):
        action = ref.get_object().get('/A')
        if action:
            assert action.get('/S') == '/URI', 'Unexpected PDF action'
            uris.append(str(action.get('/URI')))
assert set(uris) == allowed, 'Unexpected or missing URL annotations'
assert reader.metadata.title == 'Vidit Pujara - Oracle Fusion Technical Consultant (OIC)'
assert 'Oracle Integration Cloud' in (reader.metadata.get('/Keywords') or ''), 'Missing PDF keywords metadata'
assert not reader.is_encrypted
assert not reader.get_fields()
terms = ROOT/'.qa-private.json'
if terms.exists():
    for term in json.loads(terms.read_text()):
        assert not re.search(r'(?<!\w)'+re.escape(term)+r'(?!\w)', text, re.I), 'Private denylist match (redacted)'
print('PASS public PDF: two pages, reviewed facts, intended links, no phone or form fields.')
