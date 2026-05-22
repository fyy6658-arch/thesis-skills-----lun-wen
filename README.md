# Claude Code Skills

中文工科论文排版相关的 Claude Code Skills 集合，以及毕业答辩 PPT 自动生成脚本。

## Skills

| Skill | 功能 | 触发词示例 |
|-------|------|-----------|
| [thesis-formatting-check](./thesis-formatting-check/SKILL.md) | 只读审计论文格式错误（图表编号、空格、句号、公式编号） | "检查论文格式"、"检查图表编号" |
| [thesis-math-formatting](./thesis-math-formatting/SKILL.md) | 数学公式格式化（变量斜体、上下标/单位正体、Times New Roman） | "公式格式"、"变量斜体" |
| [math-comma-fix](./math-comma-fix/SKILL.md) | 修复公式逗号（英文改中文、正体、角标去逗号） | "公式逗号改中文"、"角标去掉逗号" |
| [reference-reordering](./reference-reordering/SKILL.md) | 参考文献按正文首次出现顺序重排，更新引用编号并设置宋体字体 | "给参考文献排序"、"重排参考文献" |

## Python 脚本

| 脚本 | 功能 |
|------|------|
| [reorder_refs.py](./reorder_refs.py) | 参考文献重排脚本：扫描正文引用顺序，重排参考文献段落，更新所有 `[N]` 引用编号，设置宋体字体 |

### 使用方式

```bash
# 修改脚本中的输入输出路径
input_docx = '你的论文.docx'
output_docx = '你的论文_reordered.docx'

# 运行
python reorder_refs.py
```

## PPT 生成脚本

使用 [pptxgenjs](https://github.com/nicehash/pptxgenjs) 自动生成毕业答辩 PPT。

| 脚本 | 说明 |
|------|------|
| [create_thesis_ppt.js](./create_thesis_ppt.js) | 10 页学术蓝主题答辩 PPT，含封面、目录、内容页 |
| [generate_ppt.js](./generate_ppt.js) | 14 页深蓝主题答辩 PPT，含完整论文结构 |

### 使用方式

```bash
npm install pptxgenjs
node create_thesis_ppt.js  # 生成 create_thesis_ppt.pptx
node generate_ppt.js       # 生成答辩PPT.pptx
```

修改脚本中的标题、内容、配色即可生成自己的答辩 PPT。

## 依赖

- Python 3.x（论文格式化 skill + 脚本使用）
- Node.js + pptxgenjs（PPT 生成脚本使用）
