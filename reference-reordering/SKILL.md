---
name: reference-reordering
description: Use when the user asks to reorder references by first-appearance, update cross-references, or renumber citations in a Chinese thesis .docx file. Triggers on requests like "给参考文献排序", "更新交叉引用", "重排参考文献", "按出现顺序排列参考文献".
---

# Reference Reordering

## Overview

Reorder a thesis .docx reference list by first-appearance order in the body text, update all citation numbers, and set citation font to SimSun. Works directly on the XML inside the docx ZIP archive.

## Core Principle

Citations in the body are superscript runs (`<w:vertAlign w:val="superscript"/>`) with explicit `[N]` text. The reference list at the end uses Word auto-numbering (`<w:numPr>/<w:numId>`), not explicit numbers. Reordering reference paragraphs causes auto-numbering to reassign labels automatically.

## Processing Steps

1. Unzip the docx, parse `word/document.xml` with ElementTree
2. Scan body paragraphs (before "参考文献" heading) for all superscript `<w:r>` with `<w:t>[N]</w:t>`
3. Build first-appearance order: record each unique N in the order it first appears
4. Build old→new mapping from the first-appearance order
5. Find reference paragraphs between "参考文献" and "致谢" (identified by `<w:numId w:val="3"/>`)
6. Remove reference paragraphs from body, reinsert in new order at the original position
7. Update every citation `<w:t>[N]</w:t>` in body to its new number
8. Set `<w:rFonts w:ascii="SimSun" w:hAnsi="SimSun" w:eastAsia="SimSun" w:cs="SimSun"/>` on all citation runs
9. Serialize, repack as docx

## Key XML Patterns

```xml
<!-- Body citation (superscript) -->
<w:r>
  <w:rPr><w:vertAlign w:val="superscript"/><w:rFonts .../></w:rPr>
  <w:t>[3]</w:t>
</w:r>

<!-- Reference paragraph (auto-numbered) -->
<w:p>
  <w:pPr>
    <w:numPr><w:ilvl w:val="0"/><w:numId w:val="3"/></w:numPr>
    ...
  </w:pPr>
  <w:r><w:t>Author. Title[J]. Journal, 2024.</w:t></w:r>
</w:p>
```

## Finding the Boundary

```python
# Reference section: between "参考文献" and "致谢"
ref_heading = None
for i, para in enumerate(paras):
    if '参考文献' in para_text and i > len(paras) * 0.5:
        ref_heading = i
        break

# Reference paragraphs: have numId
for i in range(ref_heading + 1, len(paras)):
    if '致谢' in para_text and len(para_text) < 10:
        break  # Stop before acknowledgments
    if numId is not None and numId.get('val') == '3':
        ref_indices.append(i)
```

## Reordering Pattern

```python
# Remove old paragraphs (reverse order)
for i in sorted(ref_indices, reverse=True):
    body.remove(paras[i])

# Reinsert in new order
for new_pos in range(len(ref_elems)):
    old_pos = reorder.index(new_pos)  # which old goes here
    body.insert(insert_at + new_pos, ref_elems[old_pos])

# MUST re-fetch body paras after structural changes
body = root.find('.//{w}body')
paras = list(body)
```

## Updating Citations + Font

```python
for r in body_runs:
    if vertAlign is None or vertAlign.get('val') != 'superscript':
        continue
    if not re.match(r'^\[\d+\]$', t.text.strip()):
        continue
    # Replace old number with new
    t.text = t.text.replace(f'[{old}]', f'[{new}]')
    # Set SimSun font
    rFonts = rPr.find('{w}rFonts')
    if rFonts is None:
        rFonts = ET.SubElement(rPr, '{w}rFonts')
    rFonts.set('{w}ascii', 'SimSun')
    rFonts.set('{w}hAnsi', 'SimSun')
    rFonts.set('{w}eastAsia', 'SimSun')
    rFonts.set('{w}cs', 'SimSun')
```

## Common Mistakes

| Mistake | Fix |
|---------|-----|
| Re-parsing citations from stale `paras` list after reordering | Re-fetch `body` and `paras` after structural changes |
| Searching for `[N]` in reference section | Stop at "参考文献" or iterate only body paras |
| Trying to find explicit `[N]` text in reference paragraphs | References use auto-numbering (numPr), not text |
| Forgetting namespace registration | Register all namespaces before parsing |
| Print encoding errors on Chinese paths | Write verification output to file instead |

## Verification Checklist

- All citation numbers in body match the new reference order
- Same reference cited multiple times uses the same new number
- Reference list is in correct first-appearance order
- All citation runs have SimSun font
- Body text and reference content unchanged (only `[N]` numbers modified)
- Document opens correctly in Word/WPS
