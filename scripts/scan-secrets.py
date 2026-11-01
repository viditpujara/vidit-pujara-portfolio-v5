#!/usr/bin/env python3
"""Redacted credential-pattern scan. Use --history to include reachable Git objects.

This small offline guard complements the full-history Gitleaks CI scan.
"""
import argparse
import re
import subprocess
import sys
from pathlib import Path

PATTERNS = {
    'Google API key': r'AIza[0-9A-Za-z_-]{30,}',
    'Supabase elevated key': r'sb_secret_[A-Za-z0-9_-]{20,}',
    'GitHub token': r'(?:ghp_|github_pat_)[A-Za-z0-9_]{20,}',
    'private key': r'-----BEGIN (?:RSA |EC |OPENSSH )?PRIVATE KEY-----',
    'JWT literal': r'eyJ[A-Za-z0-9_-]{15,}\.[A-Za-z0-9_-]{10,}\.[A-Za-z0-9_-]{10,}',
}

def matches(data):
    if b'\0' in data[:8192]: return []
    text = data.decode('utf-8', 'ignore')
    return [name for name, pattern in PATTERNS.items() if re.search(pattern, text)]

def main():
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument('--history', action='store_true')
    args = parser.parse_args()
    hits = []
    paths = subprocess.check_output(['git','ls-files','--cached','--others','--exclude-standard','-z']).decode().split('\0')
    for path in set(paths):
        if path and Path(path).is_file():
            for kind in matches(Path(path).read_bytes()): hits.append((path, kind))
    objects = set()
    if args.history:
        for commit in subprocess.check_output(['git','rev-list','--all'], text=True).splitlines():
            for row in subprocess.check_output(['git','ls-tree','-r',commit], text=True).splitlines():
                meta, path = row.split('\t',1)
                _, kind, oid = meta.split()
                if kind != 'blob' or oid in objects: continue
                objects.add(oid)
                for kind in matches(subprocess.check_output(['git','cat-file','blob',oid])):
                    hits.append((f'{commit[:8]}:{path}',kind))
    for path, kind in hits: print(f'FAIL {path}: {kind} (value redacted)')
    if hits: return 1
    print(f'PASS credential-pattern scan; history blobs: {len(objects)}. Not a complete secret audit.')
    return 0

if __name__ == '__main__': sys.exit(main())
