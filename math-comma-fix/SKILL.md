---
name: math-comma-fix
description: Use when fixing commas in mathematical formulas in Chinese thesis .docx files — replacing English commas with Chinese commas (，), ensuring commas are upright (正体), and removing commas from subscripts/superscripts. Triggers on requests like "公式逗号改中文", "公式中的逗号改为正体", "公式逗号不要斜体", "角标去掉逗号", "上下角标删除逗号".
---

# Math Comma Fix

## Overview

Three comma-related fixes for OMML math in Chinese thesis .docx files:
1. Replace English `,` with Chinese `，` inside math
2. Make all comma runs upright (remove italic)
3. Remove commas from subscripts and superscripts (角标)

## 1. Replace English Comma → Chinese

```python
# Pass 1: ElementTree for m:r runs
for mr in root.iter('{math}r'):
    mt = mr.find('{math}t')
    if mt is None or ',' not in mt.text or '，' not in mt.text:
        continue
    mt.text = mt.text.replace(',', '，')

# Pass 2: Character-level for w:r runs inside math
for i, ch in enumerate(xml):
    if inside m:oMath and ch == ',':
        xml[i] = '，'
```

## 2. Make Commas Upright

For every math run containing `，`:

```python
# Remove italic
rPr = mr.find('{w}rPr')
if rPr is not None:
    i_el = rPr.find('{w}i')
    if i_el is not None:
        rPr.remove(i_el)

# Add explicit upright
m_rPr = mr.find('{math}rPr')
if m_rPr is None:
    m_rPr = ET.SubElement(mr, '{math}rPr')
sty = m_rPr.find('{math}sty')
if sty is None:
    sty = ET.SubElement(m_rPr, '{math}sty')
sty.set('{math}val', 'p')
```

## 3. Remove Commas from Subscripts/Superscripts

Only target `<m:sub>` and `<m:sup>` elements — commas in base `<m:e>` (e.g. vector separators in `[x1, x2, x3]^T`) must stay.

```python
for tag in ('{math}sub', '{math}sup'):
    for elem in root.iter(tag):
        for mt in elem.iter('{math}t'):
            if mt.text and ('，' in mt.text or ',' in mt.text):
                mt.text = mt.text.replace('，', '').replace(',', '')
        for wt in elem.iter('{w}t'):  # Also check w:t in sub/sup
            if wt.text and ('，' in wt.text or ',' in wt.text):
                wt.text = wt.text.replace('，', '').replace(',', '')
```

## Processing Order

1. **Remove commas from sub/sup first** (so they don't get processed as "comma formatting")
2. Replace English `,` → `，` in math
3. Make all comma runs upright

## Common Mistakes

| Mistake | Fix |
|---------|-----|
| Removing commas from `<m:e>` bases | Only iterate `<m:sub>` and `<m:sup>`, not the whole sSub/sSup |
| Replacing commas outside math | Check `<m:oMath>` boundaries |
| Forgetting `<w:t>` inside sub/sup elements | Also check `{w}t` in sub/sup |
| Processing comma removal AFTER comma formatting | Do removal first to avoid formatting already-deleted commas |

## Verification

- No `,` or `，` inside `<m:sub>` or `<m:sup>` elements
- English `,` inside `<m:oMath>` = 0
- All comma runs have `<m:sty m:val="p"/>`
- English abstract commas unchanged
- Vector commas in formula bases (e.g. `[x1, x2]^T`) unchanged
