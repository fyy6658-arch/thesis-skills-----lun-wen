---
name: thesis-formatting-check
description: Use when checking a Chinese thesis .docx for formatting errors — figure/table numbering continuity, caption spacing, missing periods, figure/table caption positioning, formula numbering continuity. Triggers on requests like "检查论文格式", "论文格式检查", "检查图表编号", "公式编号是否连续".
---

# Thesis Formatting Check

## Overview

Read-only audit of a Chinese thesis .docx file for common formatting errors. Reports errors with page/paragraph context but does NOT modify the document.

## Check Items

### 1. Figure/Table on Same Page
Limited by XML: `lastRenderedPageBreak` may not be saved. Report "请在WPS中人工检查" if page breaks are absent.

### 2. Figure/Table Numbering Continuity
```python
fig_nums = []
for text in all_paragraphs:
    m = re.match(r'^图\s*(\d+)\.(\d+)', text)  # 图2.1
    if m: fig_nums.append((int(m.group(1)), int(m.group(2))))

# Check no gaps within same chapter
prev = (0, 0)
for ch, num in fig_nums:
    if ch == prev[0] and num != prev[1] + 1:
        report(f'图号跳跃: 图{prev[0]}.{prev[1]} -> 图{ch}.{num}')
    prev = (ch, num)
```
Same pattern for tables: `表\s*(\d+)[.\-](\d+)`.

### 3. Space Between Number and Title
```python
# Error: no space after 表2-4
re.match(r'^表\d+\-\d+[^\s]', text)
# Error: no space after 图3.10
re.match(r'^图\s*\d+\.\d+\S', text)
```
Expected: one Chinese character width space (a regular space in XML).

### 4. Missing Periods at Sentence End
Filter: skip headings, captions, short text (<20 chars). Find body paragraphs not ending in `。.!?！？`.
```python
if len(text) > 30 and not re.search(r'[。.!?！？\d%]$', text):
    if not re.match(r'^(第.|图|表|目|摘|关键|Abst|Con|Refer|致|参)', text):
        report(text[-60:])
```
Note: sentences ending in `：` or `:` are listed separately for manual review.

### 5. Figure Caption Below / Table Caption Above
Check adjacency: figure caption should follow image paragraph; table caption should precede table content.
```python
# Figure: previous para should have <w:drawing> or be empty
if re.match(r'^图', text):
    if not has_drawing_in_prev and prev_not_empty:
        report('图题可能不在图下方')
```

### 6. Formula Numbering Continuity
Formula numbers in OMML math use `#N-M` format split across `<m:t>` elements:
```xml
<m:r><m:t>#</m:t></m:r>
<m:r><m:t>2-1</m:t></m:r>
```
Extract by finding `#` in math, then reading the next `<m:t>` text.
```python
for each <m:t>#</m:t> in math:
    next_mt = following sibling or next math run text
    formula_id = f'#{next_mt}'
```

## Verification
- All reported errors include enough context for manual confirmation
- Never auto-fix; only report
- Distinguish between "confirmed error" and "needs manual check"
