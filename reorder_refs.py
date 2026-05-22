import zipfile
import shutil
import re
import os
import xml.etree.ElementTree as ET

# Paths
input_docx = '毕设论文1/参考文献修改_重排_格式修改.docx'
output_docx = '毕设论文1/参考文献修改_重排_格式修改_reordered.docx'
temp_dir = '毕设论文1/_temp_docx'

W = '{http://schemas.openxmlformats.org/wordprocessingml/2006/main}'
ET.register_namespace('w', 'http://schemas.openxmlformats.org/wordprocessingml/2006/main')

def get_para_text(para):
    return ''.join(t.text or '' for t in para.iter(f'{W}t'))

def get_citation_number(run):
    vertAlign = run.find(f'{W}rPr/{W}vertAlign')
    if vertAlign is None or vertAlign.get(f'{W}val') != 'superscript':
        return None
    for t in run.iter(f'{W}t'):
        if t.text:
            m = re.match(r'^\[(\d+)\]$', t.text.strip())
            if m:
                return int(m.group(1))
    return None

# Step 1: Unzip
if os.path.exists(temp_dir):
    shutil.rmtree(temp_dir)
os.makedirs(temp_dir)

with zipfile.ZipFile(input_docx, 'r') as z:
    z.extractall(temp_dir)

# Step 2: Parse document.xml
doc_path = os.path.join(temp_dir, 'word', 'document.xml')
tree = ET.parse(doc_path)
root = tree.getroot()
body = root.find(f'{W}body')
paras = list(body)

# Step 3: Find boundaries
ref_heading = None
for i, para in enumerate(paras):
    text = get_para_text(para)
    if '参考文献' in text and i > len(paras) * 0.5:
        ref_heading = i
        break

zhixie_idx = None
for i in range(ref_heading + 1, len(paras)):
    text = get_para_text(paras[i])
    if '致谢' in text and len(text.strip()) < 10:
        zhixie_idx = i
        break

print(f'ref_heading: {ref_heading}, zhixie: {zhixie_idx}')

# Step 4: Scan body citations (first-appearance order)
first_appearance = []
seen = set()
for i in range(ref_heading):
    for run in paras[i].iter(f'{W}r'):
        num = get_citation_number(run)
        if num is not None and num not in seen:
            first_appearance.append(num)
            seen.add(num)

total_refs = zhixie_idx - ref_heading - 1
all_ref_nums = set(range(1, total_refs + 1))
uncited = all_ref_nums - set(first_appearance)
# Append uncited refs at the end
full_order = first_appearance + sorted(uncited)

print(f'Citations in body: {first_appearance}')
print(f'Total refs: {total_refs}, uncited: {sorted(uncited)}')
print(f'Full order: {full_order}')

# Step 5: Build old->new mapping
old_to_new = {}
for new_idx, old_num in enumerate(full_order):
    old_to_new[old_num] = new_idx + 1

# Step 6: Collect reference paragraphs
ref_indices = list(range(ref_heading + 1, zhixie_idx))
ref_elems = [paras[i] for i in ref_indices]

# Step 7: Reorder - remove old, insert new
for i in sorted(ref_indices, reverse=True):
    body.remove(paras[i])

insert_at = ref_heading + 1
for new_pos in range(len(ref_elems)):
    old_pos = full_order[new_pos] - 1  # 0-based index into ref_elems
    body.insert(insert_at + new_pos, ref_elems[old_pos])

# Step 8: Re-fetch and update citations
body = root.find(f'{W}body')
paras = list(body)

updated_count = 0
for i in range(ref_heading):
    para = paras[i]
    for run in para.iter(f'{W}r'):
        num = get_citation_number(run)
        if num is not None and num in old_to_new:
            new_num = old_to_new[num]
            for t in run.iter(f'{W}t'):
                if t.text:
                    t.text = t.text.replace(f'[{num}]', f'[{new_num}]')
                    updated_count += 1
            # Set SimSun font
            rPr = run.find(f'{W}rPr')
            if rPr is None:
                rPr = ET.SubElement(run, f'{W}rPr')
            rFonts = rPr.find(f'{W}rFonts')
            if rFonts is None:
                rFonts = ET.SubElement(rPr, f'{W}rFonts')
            rFonts.set(f'{W}ascii', 'SimSun')
            rFonts.set(f'{W}hAnsi', 'SimSun')
            rFonts.set(f'{W}eastAsia', 'SimSun')
            rFonts.set(f'{W}cs', 'SimSun')

print(f'Updated {updated_count} citation runs')

# Step 9: Serialize and repack
tree.write(doc_path, xml_declaration=True, encoding='UTF-8')

with zipfile.ZipFile(output_docx, 'w', zipfile.ZIP_DEFLATED) as zout:
    for dirpath, dirnames, filenames in os.walk(temp_dir):
        for f in filenames:
            full_path = os.path.join(dirpath, f)
            arcname = os.path.relpath(full_path, temp_dir)
            zout.write(full_path, arcname)

shutil.rmtree(temp_dir)

print(f'\nDone! Output: {output_docx}')
print('Mapping (old -> new):')
for old, new in sorted(old_to_new.items()):
    print(f'  [{old}] -> [{new}]')
