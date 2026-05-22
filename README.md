# Claude Code Skills

中文工科论文排版相关的 Claude Code Skills 集合。

## Skills

| Skill | 功能 | 触发词示例 |
|-------|------|-----------|
| [thesis-formatting-check](./thesis-formatting-check/SKILL.md) | 只读审计论文格式错误（图表编号、空格、句号、公式编号） | "检查论文格式"、"检查图表编号" |
| [thesis-math-formatting](./thesis-math-formatting/SKILL.md) | 数学公式格式化（变量斜体、上下标/单位正体、Times New Roman） | "公式格式"、"变量斜体" |
| [math-comma-fix](./math-comma-fix/SKILL.md) | 修复公式逗号（英文改中文、正体、角标去逗号） | "公式逗号改中文"、"角标去掉逗号" |
| [reference-reordering](./reference-reordering/SKILL.md) | 参考文献按正文首次出现顺序重排，更新引用编号并设置宋体字体 | "给参考文献排序"、"重排参考文献" |

## 使用方式

这些 skill 用于处理中文工科论文 `.docx` 文件。在 Claude Code 中触发对应关键词即可使用。

## 依赖

- `docx` skill（用于解包/打包 .docx 文件）
- Python 3.x（用于 XML 处理）
