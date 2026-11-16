"""Renders sample report pages for the waiting-screen carousel.

Usage (with the dev server running on port 3001):
  curl -o /tmp/sample.pdf http://localhost:3001/api/report-preview/normal/pdf
  uv run --no-project --with pymupdf==1.26.4 python scripts/render-report-samples.py /tmp/sample.pdf

Writes public/report-samples/page-1.jpg ... page-N.jpg.
"""
import sys
from pathlib import Path
import fitz  # PyMuPDF

# 0-based page numbers in the "normal" sample PDF, in carousel order.
PAGES = [0, 1, 2, 3, 4, 7, 11, 16]
WIDTH = 600  # px
OUT = Path(__file__).resolve().parent.parent / "public" / "report-samples"

doc = fitz.open(sys.argv[1])
OUT.mkdir(parents=True, exist_ok=True)
for i, p in enumerate(PAGES, start=1):
    page = doc[p]
    zoom = WIDTH / page.rect.width
    pix = page.get_pixmap(matrix=fitz.Matrix(zoom, zoom), alpha=False)
    pix.save(OUT / f"page-{i}.jpg", jpg_quality=82)
print(f"wrote {len(PAGES)} images to {OUT}")
