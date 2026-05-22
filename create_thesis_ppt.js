const pptxgen = require("pptxgenjs");

let pres = new pptxgen();
pres.layout = "LAYOUT_16x9";
pres.author = "答辩人姓名";
pres.title = "纯电动汽车动力传动系统参数匹配与优化";

// Color palette - Academic Blue theme
const C = {
  primary: "1B3A5C",    // Deep navy
  accent: "2E7D9B",     // Teal blue
  light: "4DA8C4",      // Light blue
  bg: "F5F7FA",         // Light gray bg
  white: "FFFFFF",
  dark: "1E1E1E",
  gray: "666666",
  green: "27AE60",      // Success green
  red: "E74C3C",        // Warning red
};

const makeShadow = () => ({ type: "outer", blur: 4, offset: 2, angle: 135, color: "000000", opacity: 0.1 });

// ==========================================
// SLIDE 1: TITLE PAGE
// ==========================================
let s1 = pres.addSlide();
s1.background = { color: C.primary };

// Top decorative bar
s1.addShape(pres.shapes.RECTANGLE, { x: 0, y: 0, w: 10, h: 0.08, fill: { color: C.light } });

// University name
s1.addText("XX大学XX学院", {
  x: 0.5, y: 0.6, w: 9, h: 0.5, fontSize: 14, fontFace: "Microsoft YaHei",
  color: C.light, align: "center", charSpacing: 4
});

// Main title
s1.addText("纯电动汽车动力传动系统\n参数匹配与优化", {
  x: 0.8, y: 1.5, w: 8.4, h: 2.0, fontSize: 36, fontFace: "Microsoft YaHei",
  color: C.white, bold: true, align: "center", valign: "middle", lineSpacing: 48
});

// Decorative line
s1.addShape(pres.shapes.RECTANGLE, { x: 3.5, y: 3.7, w: 3, h: 0.04, fill: { color: C.light } });

// Student info
s1.addText([
  { text: "答辩人：答辩人姓名", options: { breakLine: true, fontSize: 16 } },
  { text: "指导教师：指导教师姓名", options: { fontSize: 16 } }
], {
  x: 2.5, y: 4.0, w: 5, h: 1.2, fontFace: "Microsoft YaHei",
  color: C.white, align: "center", lineSpacing: 28
});

// Bottom bar
s1.addShape(pres.shapes.RECTANGLE, { x: 0, y: 5.45, w: 10, h: 0.18, fill: { color: C.accent } });

// ==========================================
// SLIDE 2: RESEARCH BACKGROUND
// ==========================================
let s2 = pres.addSlide();
s2.background = { color: C.bg };

// Header
s2.addShape(pres.shapes.RECTANGLE, { x: 0, y: 0, w: 10, h: 0.9, fill: { color: C.primary } });
s2.addText("研究背景与意义", {
  x: 0.5, y: 0.15, w: 9, h: 0.6, fontSize: 24, fontFace: "Microsoft YaHei",
  color: C.white, bold: true
});

// Left column - Background
s2.addShape(pres.shapes.RECTANGLE, { x: 0.4, y: 1.2, w: 4.4, h: 3.8, fill: { color: C.white }, shadow: makeShadow() });
s2.addShape(pres.shapes.RECTANGLE, { x: 0.4, y: 1.2, w: 4.4, h: 0.06, fill: { color: C.accent } });
s2.addText("研究背景", {
  x: 0.6, y: 1.4, w: 4, h: 0.45, fontSize: 18, fontFace: "Microsoft YaHei",
  color: C.primary, bold: true
});
s2.addText([
  { text: "全球能源结构转型加速", options: { bullet: true, breakLine: true } },
  { text: '"双碳"目标驱动产业升级', options: { bullet: true, breakLine: true } },
  { text: "传统燃油车面临能源危机", options: { bullet: true, breakLine: true } },
  { text: "动力电池技术快速发展", options: { bullet: true } }
], {
  x: 0.7, y: 1.9, w: 3.9, h: 2.8, fontSize: 13, fontFace: "Microsoft YaHei",
  color: C.dark, lineSpacing: 24
});

// Right column - Significance
s2.addShape(pres.shapes.RECTANGLE, { x: 5.2, y: 1.2, w: 4.4, h: 3.8, fill: { color: C.white }, shadow: makeShadow() });
s2.addShape(pres.shapes.RECTANGLE, { x: 5.2, y: 1.2, w: 4.4, h: 0.06, fill: { color: C.green } });
s2.addText("研究意义", {
  x: 5.4, y: 1.4, w: 4, h: 0.45, fontSize: 18, fontFace: "Microsoft YaHei",
  color: C.primary, bold: true
});
s2.addText([
  { text: "动力性与经济性存在物理矛盾", options: { bullet: true, breakLine: true } },
  { text: "需精准参数匹配与深度优化", options: { bullet: true, breakLine: true } },
  { text: "缩短研发周期降低试验成本", options: { bullet: true, breakLine: true } },
  { text: "为正向开发提供理论依据", options: { bullet: true } }
], {
  x: 5.5, y: 1.9, w: 3.9, h: 2.8, fontSize: 13, fontFace: "Microsoft YaHei",
  color: C.dark, lineSpacing: 24
});

// Bottom bar
s2.addShape(pres.shapes.RECTANGLE, { x: 0, y: 5.45, w: 10, h: 0.18, fill: { color: C.primary } });

// ==========================================
// SLIDE 3: TECHNICAL ROUTE
// ==========================================
let s3 = pres.addSlide();
s3.background = { color: C.bg };

s3.addShape(pres.shapes.RECTANGLE, { x: 0, y: 0, w: 10, h: 0.9, fill: { color: C.primary } });
s3.addText("技术路线", {
  x: 0.5, y: 0.15, w: 9, h: 0.6, fontSize: 24, fontFace: "Microsoft YaHei",
  color: C.white, bold: true
});

// Three steps
const steps = [
  { title: "01 理论计算", items: "动力元件选型\n参数匹配计算\n确定基础方案", color: C.accent },
  { title: "02 仿真验证", items: "AVL Cruise建模\n整车性能仿真\n验证方案合理性", color: C.primary },
  { title: "03 算法优化", items: "NSGA-II多目标优化\n全局并行寻优\n闭环仿真验证", color: C.green }
];

steps.forEach((step, i) => {
  let xPos = 0.5 + i * 3.2;
  s3.addShape(pres.shapes.RECTANGLE, { x: xPos, y: 1.3, w: 2.8, h: 3.5, fill: { color: C.white }, shadow: makeShadow() });
  s3.addShape(pres.shapes.RECTANGLE, { x: xPos, y: 1.3, w: 2.8, h: 0.7, fill: { color: step.color } });
  s3.addText(step.title, {
    x: xPos, y: 1.35, w: 2.8, h: 0.6, fontSize: 16, fontFace: "Microsoft YaHei",
    color: C.white, bold: true, align: "center", valign: "middle"
  });
  s3.addText(step.items, {
    x: xPos + 0.2, y: 2.2, w: 2.4, h: 2.3, fontSize: 13, fontFace: "Microsoft YaHei",
    color: C.dark, lineSpacing: 24, align: "center"
  });
});

// Arrows between steps
s3.addShape(pres.shapes.LINE, { x: 3.4, y: 3.0, w: 0.3, h: 0, line: { color: C.accent, width: 2 } });
s3.addShape(pres.shapes.LINE, { x: 6.6, y: 3.0, w: 0.3, h: 0, line: { color: C.accent, width: 2 } });

s3.addShape(pres.shapes.RECTANGLE, { x: 0, y: 5.45, w: 10, h: 0.18, fill: { color: C.primary } });

// ==========================================
// SLIDE 4: VEHICLE PARAMETERS
// ==========================================
let s4 = pres.addSlide();
s4.background = { color: C.bg };

s4.addShape(pres.shapes.RECTANGLE, { x: 0, y: 0, w: 10, h: 0.9, fill: { color: C.primary } });
s4.addText("整车参数与设计要求", {
  x: 0.5, y: 0.15, w: 9, h: 0.6, fontSize: 24, fontFace: "Microsoft YaHei",
  color: C.white, bold: true
});

// Parameter table
const paramData = [
  [
    { text: "参数名称", options: { fill: { color: C.primary }, color: C.white, bold: true, align: "center" } },
    { text: "参数值", options: { fill: { color: C.primary }, color: C.white, bold: true, align: "center" } },
    { text: "单位", options: { fill: { color: C.primary }, color: C.white, bold: true, align: "center" } }
  ],
  [{ text: "整车整备质量", options: { align: "center" } }, { text: "1500", options: { align: "center" } }, { text: "kg", options: { align: "center" } }],
  [{ text: "迎风面积", options: { align: "center" } }, { text: "2.15", options: { align: "center" } }, { text: "m²", options: { align: "center" } }],
  [{ text: "风阻系数", options: { align: "center" } }, { text: "0.28", options: { align: "center" } }, { text: "-", options: { align: "center" } }],
  [{ text: "滚动阻力系数", options: { align: "center" } }, { text: "0.012", options: { align: "center" } }, { text: "-", options: { align: "center" } }],
  [{ text: "车轮滚动半径", options: { align: "center" } }, { text: "0.325", options: { align: "center" } }, { text: "m", options: { align: "center" } }],
  [{ text: "传动效率", options: { align: "center" } }, { text: "0.96", options: { align: "center" } }, { text: "-", options: { align: "center" } }]
];

s4.addTable(paramData, {
  x: 0.5, y: 1.1, w: 5, h: 3.2, fontSize: 12, fontFace: "Microsoft YaHei",
  border: { pt: 0.5, color: "CCCCCC" }, colW: [2, 1.8, 1.2],
  autoPage: false, rowH: [0.4, 0.38, 0.38, 0.38, 0.38, 0.38, 0.38]
});

// Design requirements (right side)
s4.addShape(pres.shapes.RECTANGLE, { x: 5.8, y: 1.1, w: 3.8, h: 3.2, fill: { color: C.white }, shadow: makeShadow() });
s4.addShape(pres.shapes.RECTANGLE, { x: 5.8, y: 1.1, w: 3.8, h: 0.06, fill: { color: C.accent } });
s4.addText("设计目标", {
  x: 6.0, y: 1.25, w: 3.4, h: 0.4, fontSize: 16, fontFace: "Microsoft YaHei",
  color: C.primary, bold: true
});

const goals = [
  "最高车速 ≥ 160 km/h",
  "0-100km/h ≤ 8 s",
  "最大爬坡度 ≥ 30%",
  "NEDC续航 ≥ 500 km"
];

s4.addText(goals.map((g, i) => ({
  text: g, options: { bullet: true, breakLine: i < goals.length - 1 }
})), {
  x: 6.1, y: 1.8, w: 3.3, h: 2.2, fontSize: 13, fontFace: "Microsoft YaHei",
  color: C.dark, lineSpacing: 26
});

s4.addShape(pres.shapes.RECTANGLE, { x: 0, y: 5.45, w: 10, h: 0.18, fill: { color: C.primary } });

// ==========================================
// SLIDE 5: COMPONENT SELECTION
// ==========================================
let s5 = pres.addSlide();
s5.background = { color: C.bg };

s5.addShape(pres.shapes.RECTANGLE, { x: 0, y: 0, w: 10, h: 0.9, fill: { color: C.primary } });
s5.addText("动力元件选型", {
  x: 0.5, y: 0.15, w: 9, h: 0.6, fontSize: 24, fontFace: "Microsoft YaHei",
  color: C.white, bold: true
});

// Motor card
s5.addShape(pres.shapes.RECTANGLE, { x: 0.4, y: 1.2, w: 4.4, h: 3.8, fill: { color: C.white }, shadow: makeShadow() });
s5.addShape(pres.shapes.RECTANGLE, { x: 0.4, y: 1.2, w: 4.4, h: 0.7, fill: { color: C.accent } });
s5.addText("驱动电机：永磁同步电机", {
  x: 0.5, y: 1.25, w: 4.2, h: 0.6, fontSize: 16, fontFace: "Microsoft YaHei",
  color: C.white, bold: true, align: "center", valign: "middle"
});

const motorData = [
  ["峰值功率", "160 kW"],
  ["额定功率", "70 kW"],
  ["峰值转矩", "337 N·m"],
  ["额定转速", "4800 r/min"],
  ["最高转速", "10000 r/min"]
];

motorData.forEach((item, i) => {
  s5.addText(item[0], { x: 0.7, y: 2.1 + i * 0.5, w: 2, h: 0.4, fontSize: 12, fontFace: "Microsoft YaHei", color: C.gray });
  s5.addText(item[1], { x: 2.7, y: 2.1 + i * 0.5, w: 1.8, h: 0.4, fontSize: 13, fontFace: "Microsoft YaHei", color: C.dark, bold: true });
});

// Battery card
s5.addShape(pres.shapes.RECTANGLE, { x: 5.2, y: 1.2, w: 4.4, h: 3.8, fill: { color: C.white }, shadow: makeShadow() });
s5.addShape(pres.shapes.RECTANGLE, { x: 5.2, y: 1.2, w: 4.4, h: 0.7, fill: { color: C.green } });
s5.addText("动力电池：磷酸铁锂电池", {
  x: 5.3, y: 1.25, w: 4.2, h: 0.6, fontSize: 16, fontFace: "Microsoft YaHei",
  color: C.white, bold: true, align: "center", valign: "middle"
});

const batteryData = [
  ["额定电压", "476 V"],
  ["额定容量", "220 Ah"],
  ["电池结构", "4并148串"],
  ["能量密度", "104.8 Wh/kg"],
  ["布置方案", "后置后驱(RR)"]
];

batteryData.forEach((item, i) => {
  s5.addText(item[0], { x: 5.5, y: 2.1 + i * 0.5, w: 2, h: 0.4, fontSize: 12, fontFace: "Microsoft YaHei", color: C.gray });
  s5.addText(item[1], { x: 7.5, y: 2.1 + i * 0.5, w: 1.8, h: 0.4, fontSize: 13, fontFace: "Microsoft YaHei", color: C.dark, bold: true });
});

s5.addShape(pres.shapes.RECTANGLE, { x: 0, y: 5.45, w: 10, h: 0.18, fill: { color: C.primary } });

// ==========================================
// SLIDE 6: PARAMETER MATCHING RESULTS
// ==========================================
let s6 = pres.addSlide();
s6.background = { color: C.bg };

s6.addShape(pres.shapes.RECTANGLE, { x: 0, y: 0, w: 10, h: 0.9, fill: { color: C.primary } });
s6.addText("参数匹配结果", {
  x: 0.5, y: 0.15, w: 9, h: 0.6, fontSize: 24, fontFace: "Microsoft YaHei",
  color: C.white, bold: true
});

// 2x2 grid
const matchItems = [
  { title: "电机参数", value: "160kW / 337N·m", desc: "满足最高车速与爬坡需求", color: C.accent },
  { title: "电池参数", value: "476V / 220Ah", desc: "满足续航里程要求", color: C.green },
  { title: "传动比", value: "i = 8.0", desc: "平衡加速与最高车速", color: C.primary },
  { title: "整车方案", value: "后置后驱(RR)", desc: "一体化电桥布置", color: "8E44AD" }
];

matchItems.forEach((item, i) => {
  let xPos = 0.5 + (i % 2) * 4.8;
  let yPos = 1.2 + Math.floor(i / 2) * 2.1;
  s6.addShape(pres.shapes.RECTANGLE, { x: xPos, y: yPos, w: 4.4, h: 1.8, fill: { color: C.white }, shadow: makeShadow() });
  s6.addShape(pres.shapes.RECTANGLE, { x: xPos, y: yPos, w: 0.08, h: 1.8, fill: { color: item.color } });
  s6.addText(item.title, { x: xPos + 0.2, y: yPos + 0.15, w: 4, h: 0.35, fontSize: 14, fontFace: "Microsoft YaHei", color: C.gray });
  s6.addText(item.value, { x: xPos + 0.2, y: yPos + 0.5, w: 4, h: 0.6, fontSize: 22, fontFace: "Microsoft YaHei", color: C.dark, bold: true });
  s6.addText(item.desc, { x: xPos + 0.2, y: yPos + 1.15, w: 4, h: 0.4, fontSize: 11, fontFace: "Microsoft YaHei", color: C.gray });
});

s6.addShape(pres.shapes.RECTANGLE, { x: 0, y: 5.45, w: 10, h: 0.18, fill: { color: C.primary } });

// ==========================================
// SLIDE 7: AVL CRUISE MODELING
// ==========================================
let s7 = pres.addSlide();
s7.background = { color: C.bg };

s7.addShape(pres.shapes.RECTANGLE, { x: 0, y: 0, w: 10, h: 0.9, fill: { color: C.primary } });
s7.addText("AVL Cruise整车建模", {
  x: 0.5, y: 0.15, w: 9, h: 0.6, fontSize: 24, fontFace: "Microsoft YaHei",
  color: C.white, bold: true
});

// Modeling modules
const modules = [
  { name: "整车模块", desc: "质量、迎风面积\n风阻系数、滚动阻力" },
  { name: "驱动电机模块", desc: "PSM特性曲线\n效率MAP图" },
  { name: "动力电池模块", desc: "运行电池模型\n双RC网络等效电路" },
  { name: "主减速器模块", desc: "传动比 i=8.0\n传动效率 0.96" }
];

modules.forEach((mod, i) => {
  let xPos = 0.4 + i * 2.4;
  s7.addShape(pres.shapes.RECTANGLE, { x: xPos, y: 1.2, w: 2.1, h: 2.0, fill: { color: C.white }, shadow: makeShadow() });
  s7.addShape(pres.shapes.RECTANGLE, { x: xPos, y: 1.2, w: 2.1, h: 0.5, fill: { color: C.accent } });
  s7.addText(mod.name, { x: xPos, y: 1.25, w: 2.1, h: 0.4, fontSize: 12, fontFace: "Microsoft YaHei", color: C.white, bold: true, align: "center", valign: "middle" });
  s7.addText(mod.desc, { x: xPos + 0.15, y: 1.85, w: 1.8, h: 1.2, fontSize: 11, fontFace: "Microsoft YaHei", color: C.dark, lineSpacing: 18, align: "center" });
});

// Simulation tasks
s7.addShape(pres.shapes.RECTANGLE, { x: 0.4, y: 3.5, w: 9.2, h: 1.6, fill: { color: C.white }, shadow: makeShadow() });
s7.addText("仿真任务", { x: 0.6, y: 3.6, w: 2, h: 0.4, fontSize: 14, fontFace: "Microsoft YaHei", color: C.primary, bold: true });

const simTasks = ["最高车速", "0-100km/h加速", "最大爬坡度", "NEDC续航"];
simTasks.forEach((task, i) => {
  let xPos = 0.6 + i * 2.3;
  s7.addShape(pres.shapes.RECTANGLE, { x: xPos, y: 4.1, w: 2.0, h: 0.7, fill: { color: C.bg } });
  s7.addText(task, { x: xPos, y: 4.15, w: 2.0, h: 0.6, fontSize: 12, fontFace: "Microsoft YaHei", color: C.dark, align: "center", valign: "middle" });
});

s7.addShape(pres.shapes.RECTANGLE, { x: 0, y: 5.45, w: 10, h: 0.18, fill: { color: C.primary } });

// ==========================================
// SLIDE 8: INITIAL SIMULATION RESULTS
// ==========================================
let s8 = pres.addSlide();
s8.background = { color: C.bg };

s8.addShape(pres.shapes.RECTANGLE, { x: 0, y: 0, w: 10, h: 0.9, fill: { color: C.primary } });
s8.addText("初始仿真结果", {
  x: 0.5, y: 0.15, w: 9, h: 0.6, fontSize: 24, fontFace: "Microsoft YaHei",
  color: C.white, bold: true
});

// Big stat cards
const stats = [
  { value: "187.57", unit: "km/h", label: "最高车速", pass: true },
  { value: "7.76", unit: "s", label: "0-100km/h", pass: true },
  { value: "31.76", unit: "%", label: "最大爬坡度", pass: true },
  { value: "534.8", unit: "km", label: "NEDC续航", pass: true }
];

stats.forEach((stat, i) => {
  let xPos = 0.4 + i * 2.4;
  s8.addShape(pres.shapes.RECTANGLE, { x: xPos, y: 1.3, w: 2.1, h: 2.5, fill: { color: C.white }, shadow: makeShadow() });
  s8.addText(stat.value, { x: xPos, y: 1.5, w: 2.1, h: 1.0, fontSize: 32, fontFace: "Microsoft YaHei", color: C.accent, bold: true, align: "center", valign: "middle" });
  s8.addText(stat.unit, { x: xPos, y: 2.5, w: 2.1, h: 0.4, fontSize: 14, fontFace: "Microsoft YaHei", color: C.gray, align: "center" });
  s8.addText(stat.label, { x: xPos, y: 2.9, w: 2.1, h: 0.5, fontSize: 13, fontFace: "Microsoft YaHei", color: C.dark, align: "center", bold: true });
});

// Check mark
s8.addText("全部达标", { x: 3.5, y: 4.1, w: 3, h: 0.5, fontSize: 16, fontFace: "Microsoft YaHei", color: C.green, bold: true, align: "center" });

s8.addShape(pres.shapes.RECTANGLE, { x: 0, y: 5.45, w: 10, h: 0.18, fill: { color: C.primary } });

// ==========================================
// SLIDE 9: OPTIMIZATION & RESULTS
// ==========================================
let s9 = pres.addSlide();
s9.background = { color: C.bg };

s9.addShape(pres.shapes.RECTANGLE, { x: 0, y: 0, w: 10, h: 0.9, fill: { color: C.primary } });
s9.addText("遗传算法优化与结果对比", {
  x: 0.5, y: 0.15, w: 9, h: 0.6, fontSize: 24, fontFace: "Microsoft YaHei",
  color: C.white, bold: true
});

// Optimization method
s9.addShape(pres.shapes.RECTANGLE, { x: 0.4, y: 1.1, w: 9.2, h: 1.2, fill: { color: C.white }, shadow: makeShadow() });
s9.addText("NSGA-II多目标遗传算法", { x: 0.6, y: 1.2, w: 3, h: 0.35, fontSize: 14, fontFace: "Microsoft YaHei", color: C.primary, bold: true });
s9.addText("优化变量：电机峰值功率、额定转速、峰值转矩、主减速器传动比", { x: 0.6, y: 1.6, w: 8.8, h: 0.35, fontSize: 12, fontFace: "Microsoft YaHei", color: C.dark });
s9.addText("目标函数：最小化加速时间、最小化百公里电耗、最小化电机峰值功率", { x: 0.6, y: 1.95, w: 8.8, h: 0.3, fontSize: 12, fontFace: "Microsoft YaHei", color: C.gray });

// Comparison table
const compData = [
  [
    { text: "指标", options: { fill: { color: C.primary }, color: C.white, bold: true, align: "center" } },
    { text: "优化前", options: { fill: { color: C.primary }, color: C.white, bold: true, align: "center" } },
    { text: "优化后", options: { fill: { color: C.primary }, color: C.white, bold: true, align: "center" } },
    { text: "变化", options: { fill: { color: C.primary }, color: C.white, bold: true, align: "center" } }
  ],
  [{ text: "0-100km/h加速", options: { align: "center" } }, { text: "7.76 s", options: { align: "center" } }, { text: "7.61 s", options: { align: "center", color: C.green } }, { text: "↓1.9%", options: { align: "center", color: C.green } }],
  [{ text: "最大爬坡度", options: { align: "center" } }, { text: "31.7%", options: { align: "center" } }, { text: "38.6%", options: { align: "center", color: C.green } }, { text: "↑21.8%", options: { align: "center", color: C.green } }],
  [{ text: "电机峰值功率", options: { align: "center" } }, { text: "160 kW", options: { align: "center" } }, { text: "145.52 kW", options: { align: "center", color: C.green } }, { text: "↓9.1%", options: { align: "center", color: C.green } }],
  [{ text: "NEDC续航", options: { align: "center" } }, { text: "534.8 km", options: { align: "center" } }, { text: "未衰减", options: { align: "center", color: C.green } }, { text: "持平", options: { align: "center" } }]
];

s9.addTable(compData, {
  x: 0.8, y: 2.6, w: 8.4, h: 2.5, fontSize: 13, fontFace: "Microsoft YaHei",
  border: { pt: 0.5, color: "CCCCCC" }, colW: [2.5, 2, 2, 1.9],
  autoPage: false, rowH: [0.42, 0.42, 0.42, 0.42, 0.42]
});

s9.addShape(pres.shapes.RECTANGLE, { x: 0, y: 5.45, w: 10, h: 0.18, fill: { color: C.primary } });

// ==========================================
// SLIDE 10: CONCLUSION & THANKS
// ==========================================
let s10 = pres.addSlide();
s10.background = { color: C.primary };

s10.addShape(pres.shapes.RECTANGLE, { x: 0, y: 0, w: 10, h: 0.08, fill: { color: C.light } });

s10.addText("结论与致谢", {
  x: 0.5, y: 0.5, w: 9, h: 0.7, fontSize: 28, fontFace: "Microsoft YaHei",
  color: C.white, bold: true, align: "center"
});

// Conclusion items
s10.addShape(pres.shapes.RECTANGLE, { x: 1, y: 1.4, w: 8, h: 2.5, fill: { color: C.white }, transparency: 10 });

const conclusions = [
  "完成纯电动汽车动力传动系统参数匹配",
  "建立AVL Cruise整车仿真模型并验证",
  "采用NSGA-II算法实现多目标优化",
  "优化后爬坡度提升21.8%，电机功率降低9.1%"
];

conclusions.forEach((c, i) => {
  s10.addText([{ text: c, options: { bullet: true } }], {
    x: 1.3, y: 1.6 + i * 0.5, w: 7.4, h: 0.45, fontSize: 14, fontFace: "Microsoft YaHei",
    color: C.white
  });
});

// Thanks
s10.addShape(pres.shapes.RECTANGLE, { x: 3, y: 4.2, w: 4, h: 0.04, fill: { color: C.light } });
s10.addText("感谢各位老师批评指正", {
  x: 1, y: 4.4, w: 8, h: 0.6, fontSize: 18, fontFace: "Microsoft YaHei",
  color: C.white, align: "center"
});
s10.addText("答辩人：答辩人姓名  |  指导教师：指导教师姓名", {
  x: 1, y: 4.9, w: 8, h: 0.4, fontSize: 12, fontFace: "Microsoft YaHei",
  color: C.light, align: "center"
});

s10.addShape(pres.shapes.RECTANGLE, { x: 0, y: 5.45, w: 10, h: 0.18, fill: { color: C.accent } });

// Save
pres.writeFile({ fileName: "c:/Users/Asus/Desktop/claude code整理/毕业答辩PPT_10页版.pptx" })
  .then(() => console.log("PPT created successfully!"))
  .catch(err => console.error("Error:", err));
