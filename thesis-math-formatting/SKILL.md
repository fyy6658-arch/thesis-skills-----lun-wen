---
name: thesis-math-formatting
description: Use when modifying mathematical formula formatting in Chinese thesis .docx files — making OMML math variables italic, subscripts/superscripts upright, and units upright with Times New Roman font. Triggers on requests involving formula formatting, variable italicization, or unit font changes in academic papers.
---

# Thesis Math Formatting

## Overview

Chinese engineering theses require: variables in Times New Roman italic, subscripts/superscripts upright (正体), units/numbers/operators upright in Times New Roman. Cambria Math is replaced entirely with Times New Roman.

## Core Principle

**All math text → Times New Roman. Only single Latin/Greek letters get italic.** Everything else (numbers, units, operators, multi-letter words, subscripts, superscripts) gets explicit upright via `<m:sty m:val="p"/>` or `<m:nor/>`.

## Variable Detection Rule

| Text | `is_variable()` | Result |
|------|-----------------|--------|
| `P`, `v`, `η`, `α` | True (single letter) | TNR **italic** |
| `max`, `min`, `cos` | False | TNR upright |
| `160kW`, `30km`, `2100kg` | False | TNR upright |
| `=`, `≥`, `+`, `/` | False | TNR upright |
| `3600`, `21.15`, `2` | False | TNR upright |

## Processing Order

Apply in this exact order. Order matters — italic first, then upright fallback.

```
for each <m:oMath>:
    1. ALL <m:r> → set font to Times New Roman
    2. ALL <m:ctrlPr>/<w:rPr> → set font to Times New Roman
    3. Pre-compute: mark runs inside unit fractions (<m:f> where denominator is a known unit word)
    4. <m:sub> and <m:sup> elements → upright (m:sty="p", remove w:i)
    5. <m:e> bases:
         - sSub: single letter → italic (add w:i, remove m:sty)
         - sSup: single letter + NUMBER superscript → upright (unit like m^2)
                 single letter + TEXT superscript → italic
    6. Standalone single-letter <m:r> (not in sub/sup) → italic (if not marked as unit fraction)
    7. All remaining <m:r> without w:i or m:sty → upright

After ElementTree: global str.replace('Cambria Math', 'Times New Roman')
to catch remnants in non-math <w:r> and <w:pPr> runs.
```

## Unit Fraction Detection

Some formulas use flat `<m:r>` runs with `/` instead of `<m:f>` fraction elements (e.g. `<m:r>m</m:r><m:r>/</m:r><m:sSup>s^2</m:sSup>`). For these, mark runs inside actual `<m:f>` elements whose denominator contains known unit words (`s`, `h`, `min`):

```python
def mark_unit_fraction_runs(oMath):
    for mf in oMath.iter('{math}f'):
        den = mf.find('{math}den')
        if den is None: continue
        den_texts = [mt.text.strip() for mt in den.iter('{math}t') if mt.text]
        if any(w in UNIT_WORDS for w in den_texts):
            for mr in mf.iter('{math}r'):
                mr.set('_unit', '1')  # Temp mark, clean up before serialize
```

## Number Superscript Detection

Single-letter base + NUMBER superscript → unit (upright). Single-letter base + TEXT superscript → variable (italic).

```python
for sSup in oMath.iter('{math}sSup'):
    sup_elem = sSup.find('{math}sup')
    sup_texts = [mt.text for mt in sup_elem.iter('{math}t')]
    sup_is_number = all(re.match(r'^\d+$', t) for t in sup_texts)
    if sup_is_number:
        make_upright(base_run)   # m^2, s^2 → unit
    else:
        make_italic(base_run)    # x^n → variable
```

## Plain Text Handling

Text runs outside OMML math also need TNR:

```python
UNIT_PATTERN = re.compile(r'\d+(?:\.\d+)?\s*(?:km/h|r/min|kW|...|m/s)')
NUM_PATTERN = re.compile(r'[=＝]\s*\d+(?:\.\d+)?')

for <w:r> in document:
    if UNIT_PATTERN.search(text) or NUM_PATTERN.match(text):
        rPr → w:rFonts w:ascii="Times New Roman"
```

## OMML Math Structure

```xml
<m:oMath>
  <m:sSub>
    <m:e>                           <!-- base: TNR ITALIC -->
      <m:r><w:rPr><w:i/></w:rPr><m:t>P</m:t></m:r>
      <m:ctrlPr><w:rPr><w:i/></w:rPr></m:ctrlPr>
    </m:e>
    <m:sub>                          <!-- subscript: TNR UPRIGHT -->
      <m:r><m:rPr><m:sty m:val="p"/></m:rPr><m:t>v</m:t></m:r>
      <m:ctrlPr><w:rPr/></m:ctrlPr>
    </m:sub>
  </m:sSub>
</m:oMath>
```

Key locations for italic/upright: `<m:r>/<w:rPr>`, `<m:r>/<m:rPr>`, and `<m:ctrlPr>/<w:rPr>`. All three must be checked.

## Quick Reference

| Goal | Action |
|------|--------|
| Variable → TNR italic | Remove `m:sty`, add `<w:i/>` to `<w:rPr>` |
| Subscript → upright | Add `<m:sty m:val="p"/>`, remove `<w:i/>` |
| Superscript → upright | Add `<m:sty m:val="p"/>`, remove `<w:i/>` |
| Unit in math → upright + TNR | `<m:sty m:val="p"/>` + `w:ascii="Times New Roman"` |
| Plain text number/unit → TNR | Set `w:rFonts w:ascii="Times New Roman"` on `<w:rPr>` |
| Cleanup remnant Cambria | `str.replace('Cambria Math', 'Times New Roman')` |

## Common Mistakes

| Mistake | Fix |
|---------|-----|
| Only removing `<w:i/>` for subs | ADD `<m:sty m:val="p"/>` — TNR needs explicit upright |
| Processing upright BEFORE variable italic | Variables first, then upright fallback |
| `m` in `m/s^2` treated as variable | Detect unit fractions via denominator check |
| `m` in `m^2` (square meters) italic | Number superscript → unit, upright |
| `=0.98` in plain text not TNR | Match `[=＝]` + number pattern |
| `<w:i w:val="0"/>` treated as italic | `w:val="0"` means italic OFF, not on |

## Verification Checklist

After processing, verify:
- `Cambria Math` count = 0 in output
- Variables (single letters in formula bases or standalone) have `<w:i/>` without `w:val="0"`
- Subscripts/superscripts have `<m:sty m:val="p"/>` or `<m:nor/>`
- Units (`kW`, `km/h`, `m/s²`) are upright, TNR
- Plain text numbers have TNR font
- No `<w:i/>` and `<m:sty>` co-existing on same run (conflict)

## Red Flags

- "I removed `<w:i/>` and it should be upright" — need `<m:sty m:val="p"/>` for explicit upright
- "The subscript still looks italic" — check `<m:ctrlPr>/<w:rPr>` for remaining `<w:i/>`
- "Single letter variables not italic" — processing order wrong: italic must come BEFORE upright fallback
- "m in m/s^2 is italic" — fraction detection failed; check denominator for unit words
- "Still see Cambria Math somewhere" — run global string replace as final cleanup step
