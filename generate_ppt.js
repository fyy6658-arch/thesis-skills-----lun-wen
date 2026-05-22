const pptxgen = require("pptxgenjs");

// Color palette
const BLUE_PRIMARY = "1B4F72";    // 河北大学蓝
const BLUE_DARK = "0D2B3E";       // 深蓝
const BLUE_LIGHT = "2E86C1";      // 浅蓝
const GREEN_ACCENT = "27AE60";    // 环保绿
const GRAY_TEXT = "2C3E50";       // 正文深灰
const GRAY_LIGHT = "BDC3C7";      // 浅灰
const WHITE = "FFFFFF";
const BG_LIGHT = "F8F9FA";        // 背景浅灰

// Create presentation
let pres = new pptxgen();
pres.layout = "LAYOUT_16x9";
pres.author = "答辩人姓名";
pres.title = "纯电动汽车动力传动系统参数匹配与优化";

// ========================================
// Slide 1: Cover
// ========================================
let slide1 = pres.addSlide();
slide1.background = { color: BLUE_DARK };

// Decorative shapes
slide1.addShape(pres.shapes.RECTANGLE, {
  x: 0, y: 0, w: 10, h: 0.08, fill: { color: GREEN_ACCENT }
});
slide1.addShape(pres.shapes.RECTANGLE, {
  x: 0, y: 5.545, w: 10, h: 0.08, fill: { color: GREEN_ACCENT }
});

// School name
slide1.addText("XX大学XX学院", {
  x: 0.5, y: 0.8, w: 9, h: 0.5,
  fontSize: 16, fontFace: "Arial", color: GRAY_LIGHT,
  align: "center", charSpacing: 4
});

// Title
slide1.addText("纯电动汽车动力传动系统\n参数匹配与优化", {
  x: 0.5, y: 1.5, w: 9, h: 1.8,
  fontSize: 36, fontFace: "Arial Black", color: WHITE,
  align: "center", valign: "middle", lineSpacingMultiple: 1.2
});

// Divider line
slide1.addShape(pres.shapes.RECTANGLE, {
  x: 3.5, y: 3.5, w: 3, h: 0.04, fill: { color: GREEN_ACCENT }
});

// Info
slide1.addText([
  { text: "答辩人：答辩人姓名", options: { breakLine: true } },
  { text: "指导教师：指导教师姓名", options: { breakLine: true } },
  { text: "2026年5月", options: {} }
], {
  x: 2.5, y: 3.8, w: 5, h: 1.2,
  fontSize: 16, fontFace: "Arial", color: GRAY_LIGHT,
  align: "center", lineSpacingMultiple: 1.5
});

// ========================================
// Slide 2: Research Background
// ========================================
let slide2 = pres.addSlide();
slide2.background = { color: WHITE };

// Header bar
slide2.addShape(pres.shapes.RECTANGLE, {
  x: 0, y: 0, w: 10, h: 0.9, fill: { color: BLUE_PRIMARY }
});
slide2.addText("研究背景与意义", {
  x: 0.5, y: 0.15, w: 9, h: 0.6,
  fontSize: 28, fontFace: "Arial Black", color: WHITE, margin: 0
});

// Content cards
const bgCards = [
  { title: "研究背景", content: "全球能源结构转型与'双碳'目标驱动\n传统燃油车面临能源危机与环境制约\n纯电动汽车成为可持续发展必然趋势", icon: "🌍" },
  { title: "研究痛点", content: "动力性与经济性存在物理矛盾\n需精准参数匹配与深度优化\n固定速比方案下平衡问题突出", icon: "⚠️" },
  { title: "研究对象", content: "比亚迪汉EV纯电动轿车\n一体化后置后驱动力总成架构\n永磁同步电机 + 磷酸铁锂电池", icon: "🚗" },
  { title: "研究意义", content: "缩短研发周期、降低试验成本\n提供正向开发理论依据\n为多目标优化提供工程参考", icon: "🎯" }
];

bgCards.forEach((card, i) => {
  let x = 0.3 + (i % 2) * 4.8;
  let y = 1.2 + Math.floor(i / 2) * 2.0;

  slide2.addShape(pres.shapes.RECTANGLE, {
    x: x, y: y, w: 4.5, h: 1.7,
    fill: { color: BG_LIGHT },
    shadow: { type: "outer", blur: 4, offset: 2, color: "000000", opacity: 0.1 }
  });
  slide2.addShape(pres.shapes.RECTANGLE, {
    x: x, y: y, w: 0.08, h: 1.7, fill: { color: GREEN_ACCENT }
  });
  slide2.addText(card.title, {
    x: x + 0.3, y: y + 0.1, w: 4, h: 0.4,
    fontSize: 16, fontFace: "Arial", color: BLUE_PRIMARY, bold: true, margin: 0
  });
  slide2.addText(card.content, {
    x: x + 0.3, y: y + 0.5, w: 4, h: 1.1,
    fontSize: 12, fontFace: "Arial", color: GRAY_TEXT, margin: 0, lineSpacingMultiple: 1.3
  });
});

// ========================================
// Slide 3: Technical Route
// ========================================
let slide3 = pres.addSlide();
slide3.background = { color: WHITE };

slide3.addShape(pres.shapes.RECTANGLE, {
  x: 0, y: 0, w: 10, h: 0.9, fill: { color: BLUE_PRIMARY }
});
slide3.addText("技术路线", {
  x: 0.5, y: 0.15, w: 9, h: 0.6,
  fontSize: 28, fontFace: "Arial Black", color: WHITE, margin: 0
});

// Flow chart - 4 steps
const steps = [
  { num: "01", title: "理论计算", desc: "动力元件选型\n参数匹配计算", color: BLUE_PRIMARY },
  { num: "02", title: "仿真验证", desc: "AVL Cruise\n整车模型搭建", color: BLUE_LIGHT },
  { num: "03", title: "算法优化", desc: "NSGA-II\n多目标寻优", color: GREEN_ACCENT },
  { num: "04", title: "闭环验证", desc: "优化结果\n仿真复验", color: "E74C3C" }
];

steps.forEach((step, i) => {
  let x = 0.5 + i * 2.4;
  let y = 1.5;

  // Circle with number
  slide3.addShape(pres.shapes.OVAL, {
    x: x + 0.7, y: y, w: 0.8, h: 0.8, fill: { color: step.color }
  });
  slide3.addText(step.num, {
    x: x + 0.7, y: y, w: 0.8, h: 0.8,
    fontSize: 18, fontFace: "Arial Black", color: WHITE,
    align: "center", valign: "middle", margin: 0
  });

  // Arrow
  if (i < 3) {
    slide3.addShape(pres.shapes.RECTANGLE, {
      x: x + 1.6, y: y + 0.35, w: 0.7, h: 0.1, fill: { color: GRAY_LIGHT }
    });
  }

  // Title
  slide3.addText(step.title, {
    x: x, y: y + 1.0, w: 2.2, h: 0.4,
    fontSize: 16, fontFace: "Arial", color: GRAY_TEXT, bold: true,
    align: "center", margin: 0
  });

  // Description
  slide3.addText(step.desc, {
    x: x, y: y + 1.4, w: 2.2, h: 0.8,
    fontSize: 11, fontFace: "Arial", color: GRAY_TEXT,
    align: "center", margin: 0, lineSpacingMultiple: 1.2
  });
});

// Three modules at bottom
slide3.addShape(pres.shapes.RECTANGLE, {
  x: 0.5, y: 3.8, w: 9, h: 0.04, fill: { color: GRAY_LIGHT }
});

const modules = [
  { title: "模块一", desc: "动力元件选型与参数匹配" },
  { title: "模块二", desc: "AVL Cruise整车仿真分析" },
  { title: "模块三", desc: "NSGA-II多目标优化验证" }
];

modules.forEach((mod, i) => {
  let x = 0.5 + i * 3.1;
  slide3.addShape(pres.shapes.RECTANGLE, {
    x: x, y: 4.1, w: 2.8, h: 1.0,
    fill: { color: BG_LIGHT }
  });
  slide3.addShape(pres.shapes.RECTANGLE, {
    x: x, y: 4.1, w: 2.8, h: 0.06, fill: { color: GREEN_ACCENT }
  });
  slide3.addText(mod.title, {
    x: x, y: 4.2, w: 2.8, h: 0.3,
    fontSize: 12, fontFace: "Arial", color: BLUE_PRIMARY, bold: true,
    align: "center", margin: 0
  });
  slide3.addText(mod.desc, {
    x: x, y: 4.5, w: 2.8, h: 0.5,
    fontSize: 11, fontFace: "Arial", color: GRAY_TEXT,
    align: "center", margin: 0
  });
});

// ========================================
// Slide 4: Vehicle Parameters
// ========================================
let slide4 = pres.addSlide();
slide4.background = { color: WHITE };

slide4.addShape(pres.shapes.RECTANGLE, {
  x: 0, y: 0, w: 10, h: 0.9, fill: { color: BLUE_PRIMARY }
});
slide4.addText("整车参数与设计要求", {
  x: 0.5, y: 0.15, w: 9, h: 0.6,
  fontSize: 28, fontFace: "Arial Black", color: WHITE, margin: 0
});

// Vehicle params table
slide4.addText("整车基本参数", {
  x: 0.5, y: 1.1, w: 4, h: 0.3,
  fontSize: 14, fontFace: "Arial", color: BLUE_PRIMARY, bold: true, margin: 0
});

let vehicleTable = [
  [
    { text: "参数", options: { fill: { color: BLUE_PRIMARY }, color: WHITE, bold: true, fontSize: 11, fontFace: "Arial" } },
    { text: "数值", options: { fill: { color: BLUE_PRIMARY }, color: WHITE, bold: true, fontSize: 11, fontFace: "Arial" } }
  ],
  [
    { text: "整车尺寸（mm）", options: { fontSize: 10, fontFace: "Arial", fill: { color: BG_LIGHT } } },
    { text: "4995×1910×1495", options: { fontSize: 10, fontFace: "Arial", fill: { color: BG_LIGHT } } }
  ],
  [
    { text: "轴距（mm）", options: { fontSize: 10, fontFace: "Arial" } },
    { text: "2920", options: { fontSize: 10, fontFace: "Arial" } }
  ],
  [
    { text: "满载质量（kg）", options: { fontSize: 10, fontFace: "Arial", fill: { color: BG_LIGHT } } },
    { text: "2375", options: { fontSize: 10, fontFace: "Arial", fill: { color: BG_LIGHT } } }
  ],
  [
    { text: "整备质量（kg）", options: { fontSize: 10, fontFace: "Arial" } },
    { text: "1900", options: { fontSize: 10, fontFace: "Arial" } }
  ],
  [
    { text: "空气阻力系数", options: { fontSize: 10, fontFace: "Arial", fill: { color: BG_LIGHT } } },
    { text: "0.233", options: { fontSize: 10, fontFace: "Arial", fill: { color: BG_LIGHT } } }
  ],
  [
    { text: "迎风面积（m²）", options: { fontSize: 10, fontFace: "Arial" } },
    { text: "2.52", options: { fontSize: 10, fontFace: "Arial" } }
  ]
];

slide4.addTable(vehicleTable, {
  x: 0.3, y: 1.5, w: 4.4, colW: [2.4, 2],
  border: { pt: 0.5, color: "DEE2E6" }, rowH: [0.35, 0.3, 0.3, 0.3, 0.3, 0.3, 0.3]
});

// Performance requirements table
slide4.addText("性能设计指标", {
  x: 5.2, y: 1.1, w: 4.5, h: 0.3,
  fontSize: 14, fontFace: "Arial", color: BLUE_PRIMARY, bold: true, margin: 0
});

let perfTable = [
  [
    { text: "性能指标", options: { fill: { color: GREEN_ACCENT }, color: WHITE, bold: true, fontSize: 11, fontFace: "Arial" } },
    { text: "设计要求", options: { fill: { color: GREEN_ACCENT }, color: WHITE, bold: true, fontSize: 11, fontFace: "Arial" } }
  ],
  [
    { text: "最高车速", options: { fontSize: 10, fontFace: "Arial", fill: { color: BG_LIGHT } } },
    { text: "≥160 km/h", options: { fontSize: 10, fontFace: "Arial", fill: { color: BG_LIGHT }, bold: true } }
  ],
  [
    { text: "0-100km/h加速", options: { fontSize: 10, fontFace: "Arial" } },
    { text: "≤8 秒", options: { fontSize: 10, fontFace: "Arial", bold: true } }
  ],
  [
    { text: "最大爬坡度", options: { fontSize: 10, fontFace: "Arial", fill: { color: BG_LIGHT } } },
    { text: "≥30%", options: { fontSize: 10, fontFace: "Arial", fill: { color: BG_LIGHT }, bold: true } }
  ],
  [
    { text: "NEDC续航", options: { fontSize: 10, fontFace: "Arial" } },
    { text: "≥500 km", options: { fontSize: 10, fontFace: "Arial", bold: true } }
  ],
  [
    { text: "80-120km/h加速", options: { fontSize: 10, fontFace: "Arial", fill: { color: BG_LIGHT } } },
    { text: "≤8 秒", options: { fontSize: 10, fontFace: "Arial", fill: { color: BG_LIGHT }, bold: true } }
  ],
  [
    { text: "4%坡道爬坡车速", options: { fontSize: 10, fontFace: "Arial" } },
    { text: "≥60 km/h", options: { fontSize: 10, fontFace: "Arial", bold: true } }
  ]
];

slide4.addTable(perfTable, {
  x: 5.2, y: 1.5, w: 4.5, colW: [2.3, 2.2],
  border: { pt: 0.5, color: "DEE2E6" }, rowH: [0.35, 0.3, 0.3, 0.3, 0.3, 0.3, 0.3]
});

// Bottom note
slide4.addShape(pres.shapes.RECTANGLE, {
  x: 0.5, y: 4.8, w: 9, h: 0.5, fill: { color: BG_LIGHT }
});
slide4.addText("依据国家标准 GB/T 28382-2012《纯电动乘用车 技术条件》确定", {
  x: 0.5, y: 4.8, w: 9, h: 0.5,
  fontSize: 10, fontFace: "Arial", color: GRAY_TEXT, align: "center", valign: "middle"
});

// ========================================
// Slide 5: Component Selection
// ========================================
let slide5 = pres.addSlide();
slide5.background = { color: WHITE };

slide5.addShape(pres.shapes.RECTANGLE, {
  x: 0, y: 0, w: 10, h: 0.9, fill: { color: BLUE_PRIMARY }
});
slide5.addText("动力元件选型", {
  x: 0.5, y: 0.15, w: 9, h: 0.6,
  fontSize: 28, fontFace: "Arial Black", color: WHITE, margin: 0
});

// Motor comparison table
slide5.addText("驱动电机选型对比", {
  x: 0.3, y: 1.1, w: 5, h: 0.3,
  fontSize: 13, fontFace: "Arial", color: BLUE_PRIMARY, bold: true, margin: 0
});

let motorTable = [
  [
    { text: "类型", options: { fill: { color: BLUE_PRIMARY }, color: WHITE, bold: true, fontSize: 9, fontFace: "Arial" } },
    { text: "峰值效率", options: { fill: { color: BLUE_PRIMARY }, color: WHITE, bold: true, fontSize: 9, fontFace: "Arial" } },
    { text: "转速范围", options: { fill: { color: BLUE_PRIMARY }, color: WHITE, bold: true, fontSize: 9, fontFace: "Arial" } },
    { text: "尺寸", options: { fill: { color: BLUE_PRIMARY }, color: WHITE, bold: true, fontSize: 9, fontFace: "Arial" } }
  ],
  [
    { text: "直流电机", options: { fontSize: 9, fontFace: "Arial", fill: { color: BG_LIGHT } } },
    { text: "85~89%", options: { fontSize: 9, fontFace: "Arial", fill: { color: BG_LIGHT } } },
    { text: "4000~6000", options: { fontSize: 9, fontFace: "Arial", fill: { color: BG_LIGHT } } },
    { text: "大", options: { fontSize: 9, fontFace: "Arial", fill: { color: BG_LIGHT } } }
  ],
  [
    { text: "交流感应", options: { fontSize: 9, fontFace: "Arial" } },
    { text: "94~95%", options: { fontSize: 9, fontFace: "Arial" } },
    { text: "9000~15000", options: { fontSize: 9, fontFace: "Arial" } },
    { text: "中", options: { fontSize: 9, fontFace: "Arial" } }
  ],
  [
    { text: "永磁同步", options: { fontSize: 9, fontFace: "Arial", fill: { color: "E8F8E8" }, bold: true, color: GREEN_ACCENT } },
    { text: "95~97%", options: { fontSize: 9, fontFace: "Arial", fill: { color: "E8F8E8" }, bold: true, color: GREEN_ACCENT } },
    { text: "4000~13000", options: { fontSize: 9, fontFace: "Arial", fill: { color: "E8F8E8" }, bold: true, color: GREEN_ACCENT } },
    { text: "小", options: { fontSize: 9, fontFace: "Arial", fill: { color: "E8F8E8" }, bold: true, color: GREEN_ACCENT } }
  ],
  [
    { text: "开关磁阻", options: { fontSize: 9, fontFace: "Arial", fill: { color: BG_LIGHT } } },
    { text: "85~90%", options: { fontSize: 9, fontFace: "Arial", fill: { color: BG_LIGHT } } },
    { text: "可达15000", options: { fontSize: 9, fontFace: "Arial", fill: { color: BG_LIGHT } } },
    { text: "小", options: { fontSize: 9, fontFace: "Arial", fill: { color: BG_LIGHT } } }
  ]
];

slide5.addTable(motorTable, {
  x: 0.3, y: 1.5, w: 4.7, colW: [1.2, 1.1, 1.2, 1.2],
  border: { pt: 0.5, color: "DEE2E6" }
});

// Battery comparison table
slide5.addText("动力电池选型对比", {
  x: 5.2, y: 1.1, w: 4.5, h: 0.3,
  fontSize: 13, fontFace: "Arial", color: BLUE_PRIMARY, bold: true, margin: 0
});

let batteryTable = [
  [
    { text: "类型", options: { fill: { color: BLUE_PRIMARY }, color: WHITE, bold: true, fontSize: 9, fontFace: "Arial" } },
    { text: "优点", options: { fill: { color: BLUE_PRIMARY }, color: WHITE, bold: true, fontSize: 9, fontFace: "Arial" } },
    { text: "缺点", options: { fill: { color: BLUE_PRIMARY }, color: WHITE, bold: true, fontSize: 9, fontFace: "Arial" } }
  ],
  [
    { text: "铅酸电池", options: { fontSize: 8, fontFace: "Arial", fill: { color: BG_LIGHT } } },
    { text: "价格低", options: { fontSize: 8, fontFace: "Arial", fill: { color: BG_LIGHT } } },
    { text: "能量密度低", options: { fontSize: 8, fontFace: "Arial", fill: { color: BG_LIGHT } } }
  ],
  [
    { text: "磷酸铁锂", options: { fontSize: 8, fontFace: "Arial", fill: { color: "E8F8E8" }, bold: true, color: GREEN_ACCENT } },
    { text: "寿命长、安全", options: { fontSize: 8, fontFace: "Arial", fill: { color: "E8F8E8" }, bold: true, color: GREEN_ACCENT } },
    { text: "低温性能差", options: { fontSize: 8, fontFace: "Arial", fill: { color: "E8F8E8" }, bold: true, color: GREEN_ACCENT } }
  ],
  [
    { text: "三元锂电池", options: { fontSize: 8, fontFace: "Arial", fill: { color: BG_LIGHT } } },
    { text: "能量密度高", options: { fontSize: 8, fontFace: "Arial", fill: { color: BG_LIGHT } } },
    { text: "起火点低", options: { fontSize: 8, fontFace: "Arial", fill: { color: BG_LIGHT } } }
  ],
  [
    { text: "镍氢电池", options: { fontSize: 8, fontFace: "Arial" } },
    { text: "耐过充过放", options: { fontSize: 8, fontFace: "Arial" } },
    { text: "有记忆效应", options: { fontSize: 8, fontFace: "Arial" } }
  ]
];

slide5.addTable(batteryTable, {
  x: 5.2, y: 1.5, w: 4.5, colW: [1.2, 1.7, 1.6],
  border: { pt: 0.5, color: "DEE2E6" }
});

// Layout scheme
slide5.addShape(pres.shapes.RECTANGLE, {
  x: 0.5, y: 3.8, w: 9, h: 0.04, fill: { color: GRAY_LIGHT }
});

slide5.addText("选定方案：一体化电桥后置后驱（RR）", {
  x: 0.5, y: 4.0, w: 9, h: 0.4,
  fontSize: 18, fontFace: "Arial", color: BLUE_PRIMARY, bold: true, align: "center", margin: 0
});

slide5.addText("永磁同步电机 + 磷酸铁锂电池 + 单级减速器", {
  x: 0.5, y: 4.5, w: 9, h: 0.4,
  fontSize: 14, fontFace: "Arial", color: GRAY_TEXT, align: "center", margin: 0
});

slide5.addText("结构紧凑 | 传动效率高 | 轻量化设计", {
  x: 0.5, y: 4.9, w: 9, h: 0.4,
  fontSize: 12, fontFace: "Arial", color: GREEN_ACCENT, align: "center", margin: 0
});

// ========================================
// Slide 6: Parameter Matching Results
// ========================================
let slide6 = pres.addSlide();
slide6.background = { color: WHITE };

slide6.addShape(pres.shapes.RECTANGLE, {
  x: 0, y: 0, w: 10, h: 0.9, fill: { color: BLUE_PRIMARY }
});
slide6.addText("参数理论匹配结果", {
  x: 0.5, y: 0.15, w: 9, h: 0.6,
  fontSize: 28, fontFace: "Arial Black", color: WHITE, margin: 0
});

// Motor params - left side
slide6.addShape(pres.shapes.RECTANGLE, {
  x: 0.3, y: 1.2, w: 3, h: 2.8,
  fill: { color: BG_LIGHT },
  shadow: { type: "outer", blur: 4, offset: 2, color: "000000", opacity: 0.1 }
});
slide6.addShape(pres.shapes.RECTANGLE, {
  x: 0.3, y: 1.2, w: 3, h: 0.5, fill: { color: BLUE_PRIMARY }
});
slide6.addText("驱动电机", {
  x: 0.3, y: 1.2, w: 3, h: 0.5,
  fontSize: 16, fontFace: "Arial", color: WHITE, bold: true, align: "center", valign: "middle"
});

const motorParams = [
  { label: "峰值功率", value: "160 kW" },
  { label: "额定功率", value: "70 kW" },
  { label: "峰值转矩", value: "337 N·m" },
  { label: "额定转速", value: "4800 r/min" },
  { label: "峰值转速", value: "13200 r/min" },
  { label: "额定电压", value: "476 V" }
];

motorParams.forEach((param, i) => {
  let y = 1.9 + i * 0.35;
  slide6.addText(param.label, {
    x: 0.5, y: y, w: 1.4, h: 0.3,
    fontSize: 11, fontFace: "Arial", color: GRAY_TEXT, margin: 0
  });
  slide6.addText(param.value, {
    x: 2.0, y: y, w: 1.2, h: 0.3,
    fontSize: 11, fontFace: "Arial", color: BLUE_PRIMARY, bold: true, margin: 0
  });
});

// Battery params - middle
slide6.addShape(pres.shapes.RECTANGLE, {
  x: 3.5, y: 1.2, w: 3, h: 2.8,
  fill: { color: BG_LIGHT },
  shadow: { type: "outer", blur: 4, offset: 2, color: "000000", opacity: 0.1 }
});
slide6.addShape(pres.shapes.RECTANGLE, {
  x: 3.5, y: 1.2, w: 3, h: 0.5, fill: { color: GREEN_ACCENT }
});
slide6.addText("动力电池", {
  x: 3.5, y: 1.2, w: 3, h: 0.5,
  fontSize: 16, fontFace: "Arial", color: WHITE, bold: true, align: "center", valign: "middle"
});

const batteryParams = [
  { label: "额定电压", value: "476 V" },
  { label: "总容量", value: "220 Ah" },
  { label: "单体电压", value: "3.2 V" },
  { label: "单体容量", value: "55 Ah" },
  { label: "串并结构", value: "4并148串" },
  { label: "SOC范围", value: "95%~5%" }
];

batteryParams.forEach((param, i) => {
  let y = 1.9 + i * 0.35;
  slide6.addText(param.label, {
    x: 3.7, y: y, w: 1.4, h: 0.3,
    fontSize: 11, fontFace: "Arial", color: GRAY_TEXT, margin: 0
  });
  slide6.addText(param.value, {
    x: 5.2, y: y, w: 1.2, h: 0.3,
    fontSize: 11, fontFace: "Arial", color: GREEN_ACCENT, bold: true, margin: 0
  });
});

// Reducer params - right
slide6.addShape(pres.shapes.RECTANGLE, {
  x: 6.7, y: 1.2, w: 3, h: 2.8,
  fill: { color: BG_LIGHT },
  shadow: { type: "outer", blur: 4, offset: 2, color: "000000", opacity: 0.1 }
});
slide6.addShape(pres.shapes.RECTANGLE, {
  x: 6.7, y: 1.2, w: 3, h: 0.5, fill: { color: BLUE_LIGHT }
});
slide6.addText("主减速器", {
  x: 6.7, y: 1.2, w: 3, h: 0.5,
  fontSize: 16, fontFace: "Arial", color: WHITE, bold: true, align: "center", valign: "middle"
});

slide6.addText("传动比", {
  x: 6.9, y: 2.0, w: 1.4, h: 0.3,
  fontSize: 11, fontFace: "Arial", color: GRAY_TEXT, margin: 0
});
slide6.addText("8.0", {
  x: 8.4, y: 2.0, w: 1.2, h: 0.3,
  fontSize: 11, fontFace: "Arial", color: BLUE_LIGHT, bold: true, margin: 0
});

slide6.addText("类型", {
  x: 6.9, y: 2.4, w: 1.4, h: 0.3,
  fontSize: 11, fontFace: "Arial", color: GRAY_TEXT, margin: 0
});
slide6.addText("单级减速", {
  x: 8.4, y: 2.4, w: 1.2, h: 0.3,
  fontSize: 11, fontFace: "Arial", color: BLUE_LIGHT, bold: true, margin: 0
});

// Summary at bottom
slide6.addShape(pres.shapes.RECTANGLE, {
  x: 0.5, y: 4.3, w: 9, h: 0.8, fill: { color: BLUE_DARK }
});
slide6.addText("理论计算完成，下一步：AVL Cruise仿真验证", {
  x: 0.5, y: 4.3, w: 9, h: 0.8,
  fontSize: 16, fontFace: "Arial", color: WHITE, align: "center", valign: "middle"
});

// ========================================
// Slide 7: AVL Cruise Modeling
// ========================================
let slide7 = pres.addSlide();
slide7.background = { color: WHITE };

slide7.addShape(pres.shapes.RECTANGLE, {
  x: 0, y: 0, w: 10, h: 0.9, fill: { color: BLUE_PRIMARY }
});
slide7.addText("AVL Cruise 建模过程", {
  x: 0.5, y: 0.15, w: 9, h: 0.6,
  fontSize: 28, fontFace: "Arial Black", color: WHITE, margin: 0
});

// Four modules
const cruiseModules = [
  { title: "整车模块", desc: "整备质量、迎风面积\n车辆动载荷定义", color: BLUE_PRIMARY },
  { title: "驱动电机模块", desc: "永磁同步电机(PSM)\n转矩特性曲线+效率MAP", color: BLUE_LIGHT },
  { title: "动力电池模块", desc: "运行电池模型\n双RC网络等效电路", color: GREEN_ACCENT },
  { title: "主减速器模块", desc: "传动比：8.0\n传动效率设置", color: "E74C3C" }
];

cruiseModules.forEach((mod, i) => {
  let x = 0.3 + i * 2.45;
  slide7.addShape(pres.shapes.RECTANGLE, {
    x: x, y: 1.2, w: 2.2, h: 1.8,
    fill: { color: BG_LIGHT },
    shadow: { type: "outer", blur: 4, offset: 2, color: "000000", opacity: 0.1 }
  });
  slide7.addShape(pres.shapes.RECTANGLE, {
    x: x, y: 1.2, w: 2.2, h: 0.5, fill: { color: mod.color }
  });
  slide7.addText(mod.title, {
    x: x, y: 1.2, w: 2.2, h: 0.5,
    fontSize: 13, fontFace: "Arial", color: WHITE, bold: true, align: "center", valign: "middle"
  });
  slide7.addText(mod.desc, {
    x: x + 0.15, y: 1.8, w: 1.9, h: 1.0,
    fontSize: 10, fontFace: "Arial", color: GRAY_TEXT, lineSpacingMultiple: 1.3
  });
});

// Connection types
slide7.addShape(pres.shapes.RECTANGLE, {
  x: 0.5, y: 3.3, w: 9, h: 0.04, fill: { color: GRAY_LIGHT }
});

slide7.addText("连接方式", {
  x: 0.5, y: 3.5, w: 9, h: 0.3,
  fontSize: 14, fontFace: "Arial", color: BLUE_PRIMARY, bold: true, margin: 0
});

slide7.addShape(pres.shapes.RECTANGLE, {
  x: 0.5, y: 3.9, w: 4.3, h: 0.7, fill: { color: "EBF5FB" }
});
slide7.addText("机械连接：传动系统各模块之间", {
  x: 0.5, y: 3.9, w: 4.3, h: 0.7,
  fontSize: 12, fontFace: "Arial", color: BLUE_PRIMARY, align: "center", valign: "middle"
});

slide7.addShape(pres.shapes.RECTANGLE, {
  x: 5.2, y: 3.9, w: 4.3, h: 0.7, fill: { color: "E8F8E8" }
});
slide7.addText("电气连接：电池-电机-耗能元件", {
  x: 5.2, y: 3.9, w: 4.3, h: 0.7,
  fontSize: 12, fontFace: "Arial", color: GREEN_ACCENT, align: "center", valign: "middle"
});

// Battery circuit note
slide7.addShape(pres.shapes.RECTANGLE, {
  x: 0.5, y: 4.9, w: 9, h: 0.5, fill: { color: BG_LIGHT }
});
slide7.addText("电池等效电路：运行电池模型 + 双RC网络，模拟SOC与温度动态响应", {
  x: 0.5, y: 4.9, w: 9, h: 0.5,
  fontSize: 10, fontFace: "Arial", color: GRAY_TEXT, align: "center", valign: "middle"
});

// ========================================
// Slide 8: Simulation Tasks
// ========================================
let slide8 = pres.addSlide();
slide8.background = { color: WHITE };

slide8.addShape(pres.shapes.RECTANGLE, {
  x: 0, y: 0, w: 10, h: 0.9, fill: { color: BLUE_PRIMARY }
});
slide8.addText("仿真任务设定", {
  x: 0.5, y: 0.15, w: 9, h: 0.6,
  fontSize: 28, fontFace: "Arial Black", color: WHITE, margin: 0
});

// Five tasks
const simTasks = [
  { num: "01", title: "NEDC循环工况", desc: "评估经济性（百公里电耗）及续驶里程\n初始SOC设为95%", color: BLUE_PRIMARY },
  { num: "02", title: "最高车速", desc: "Full Load Acceleration任务\n验证瞬时最高车速≥160km/h", color: BLUE_LIGHT },
  { num: "03", title: "爬坡性能", desc: "ClimbingPerformance任务\n30km/h时最大爬坡度≥30%", color: GREEN_ACCENT },
  { num: "04", title: "0-100km/h加速", desc: "Full Load Acceleration任务\n加速时间≤8秒", color: "E74C3C" },
  { num: "05", title: "80-120km/h加速", desc: "Elasticity任务\n加速时间≤8秒", color: "8E44AD" }
];

simTasks.forEach((task, i) => {
  let x = 0.3 + i * 1.9;
  slide8.addShape(pres.shapes.RECTANGLE, {
    x: x, y: 1.2, w: 1.7, h: 2.5,
    fill: { color: BG_LIGHT },
    shadow: { type: "outer", blur: 4, offset: 2, color: "000000", opacity: 0.1 }
  });
  slide8.addShape(pres.shapes.RECTANGLE, {
    x: x, y: 1.2, w: 1.7, h: 0.06, fill: { color: task.color }
  });

  // Number circle
  slide8.addShape(pres.shapes.OVAL, {
    x: x + 0.55, y: 1.4, w: 0.6, h: 0.6, fill: { color: task.color }
  });
  slide8.addText(task.num, {
    x: x + 0.55, y: 1.4, w: 0.6, h: 0.6,
    fontSize: 16, fontFace: "Arial Black", color: WHITE,
    align: "center", valign: "middle", margin: 0
  });

  slide8.addText(task.title, {
    x: x + 0.1, y: 2.2, w: 1.5, h: 0.4,
    fontSize: 11, fontFace: "Arial", color: GRAY_TEXT, bold: true, align: "center", margin: 0
  });

  slide8.addText(task.desc, {
    x: x + 0.1, y: 2.6, w: 1.5, h: 0.9,
    fontSize: 8, fontFace: "Arial", color: GRAY_TEXT, align: "center", lineSpacingMultiple: 1.2
  });
});

// Bottom note
slide8.addShape(pres.shapes.RECTANGLE, {
  x: 0.5, y: 4.0, w: 9, h: 1.2, fill: { color: BG_LIGHT }
});
slide8.addText("仿真环境设置", {
  x: 0.5, y: 4.1, w: 9, h: 0.3,
  fontSize: 12, fontFace: "Arial", color: BLUE_PRIMARY, bold: true, align: "center", margin: 0
});
slide8.addText([
  { text: "测试质量：整备质量1900kg  |  ", options: { breakLine: false } },
  { text: "驱动方式：固定传动比单速减速器  |  ", options: { breakLine: false } },
  { text: "求解器：Simulation2 VSS Implicit Euler+", options: {} }
], {
  x: 0.5, y: 4.5, w: 9, h: 0.5,
  fontSize: 10, fontFace: "Arial", color: GRAY_TEXT, align: "center"
});

// ========================================
// Slide 9: Initial Simulation Results
// ========================================
let slide9 = pres.addSlide();
slide9.background = { color: WHITE };

slide9.addShape(pres.shapes.RECTANGLE, {
  x: 0, y: 0, w: 10, h: 0.9, fill: { color: BLUE_PRIMARY }
});
slide9.addText("初始仿真结果分析", {
  x: 0.5, y: 0.15, w: 9, h: 0.6,
  fontSize: 28, fontFace: "Arial Black", color: WHITE, margin: 0
});

// Results table
slide9.addText("动力性仿真结果", {
  x: 0.3, y: 1.1, w: 9, h: 0.3,
  fontSize: 14, fontFace: "Arial", color: BLUE_PRIMARY, bold: true, margin: 0
});

let simResultTable = [
  [
    { text: "性能指标", options: { fill: { color: BLUE_PRIMARY }, color: WHITE, bold: true, fontSize: 11, fontFace: "Arial" } },
    { text: "设计要求", options: { fill: { color: BLUE_PRIMARY }, color: WHITE, bold: true, fontSize: 11, fontFace: "Arial" } },
    { text: "仿真值", options: { fill: { color: BLUE_PRIMARY }, color: WHITE, bold: true, fontSize: 11, fontFace: "Arial" } },
    { text: "裕量", options: { fill: { color: BLUE_PRIMARY }, color: WHITE, bold: true, fontSize: 11, fontFace: "Arial" } },
    { text: "结论", options: { fill: { color: BLUE_PRIMARY }, color: WHITE, bold: true, fontSize: 11, fontFace: "Arial" } }
  ],
  [
    { text: "最高车速", options: { fontSize: 11, fontFace: "Arial", fill: { color: BG_LIGHT } } },
    { text: "≥160 km/h", options: { fontSize: 11, fontFace: "Arial", fill: { color: BG_LIGHT } } },
    { text: "187.57 km/h", options: { fontSize: 11, fontFace: "Arial", fill: { color: BG_LIGHT }, bold: true } },
    { text: "17.2%", options: { fontSize: 11, fontFace: "Arial", fill: { color: BG_LIGHT }, color: GREEN_ACCENT } },
    { text: "✓ 满足", options: { fontSize: 11, fontFace: "Arial", fill: { color: BG_LIGHT }, color: GREEN_ACCENT, bold: true } }
  ],
  [
    { text: "0-100km/h加速", options: { fontSize: 11, fontFace: "Arial" } },
    { text: "≤8 s", options: { fontSize: 11, fontFace: "Arial" } },
    { text: "7.76 s", options: { fontSize: 11, fontFace: "Arial", bold: true } },
    { text: "3%", options: { fontSize: 11, fontFace: "Arial", color: GREEN_ACCENT } },
    { text: "✓ 满足", options: { fontSize: 11, fontFace: "Arial", color: GREEN_ACCENT, bold: true } }
  ],
  [
    { text: "最大爬坡度", options: { fontSize: 11, fontFace: "Arial", fill: { color: BG_LIGHT } } },
    { text: "≥30%", options: { fontSize: 11, fontFace: "Arial", fill: { color: BG_LIGHT } } },
    { text: "31.76%", options: { fontSize: 11, fontFace: "Arial", fill: { color: BG_LIGHT }, bold: true } },
    { text: "5.9%", options: { fontSize: 11, fontFace: "Arial", fill: { color: BG_LIGHT }, color: GREEN_ACCENT } },
    { text: "✓ 满足", options: { fontSize: 11, fontFace: "Arial", fill: { color: BG_LIGHT }, color: GREEN_ACCENT, bold: true } }
  ],
  [
    { text: "80-120km/h加速", options: { fontSize: 11, fontFace: "Arial" } },
    { text: "≤8 s", options: { fontSize: 11, fontFace: "Arial" } },
    { text: "4.58 s", options: { fontSize: 11, fontFace: "Arial", bold: true } },
    { text: "42.8%", options: { fontSize: 11, fontFace: "Arial", color: GREEN_ACCENT } },
    { text: "✓ 满足", options: { fontSize: 11, fontFace: "Arial", color: GREEN_ACCENT, bold: true } }
  ]
];

slide9.addTable(simResultTable, {
  x: 0.3, y: 1.5, w: 9.4, colW: [1.8, 1.6, 1.6, 1.2, 1.2],
  border: { pt: 0.5, color: "DEE2E6" }
});

// Economy result
slide9.addShape(pres.shapes.RECTANGLE, {
  x: 0.5, y: 3.6, w: 9, h: 1.0, fill: { color: BG_LIGHT }
});
slide9.addText("经济性仿真结果", {
  x: 0.5, y: 3.7, w: 9, h: 0.3,
  fontSize: 14, fontFace: "Arial", color: BLUE_PRIMARY, bold: true, align: "center", margin: 0
});
slide9.addText("NEDC循环工况下续驶里程：534.8 km  ≥  500 km（设计要求）", {
  x: 0.5, y: 4.1, w: 9, h: 0.3,
  fontSize: 14, fontFace: "Arial", color: GRAY_TEXT, align: "center", margin: 0
});

// Conclusion
slide9.addShape(pres.shapes.RECTANGLE, {
  x: 2.5, y: 4.8, w: 5, h: 0.5, fill: { color: GREEN_ACCENT }
});
slide9.addText("初始匹配方案满足全部设计指标", {
  x: 2.5, y: 4.8, w: 5, h: 0.5,
  fontSize: 14, fontFace: "Arial", color: WHITE, bold: true, align: "center", valign: "middle"
});

// ========================================
// Slide 10: Genetic Algorithm Optimization
// ========================================
let slide10 = pres.addSlide();
slide10.background = { color: WHITE };

slide10.addShape(pres.shapes.RECTANGLE, {
  x: 0, y: 0, w: 10, h: 0.9, fill: { color: BLUE_PRIMARY }
});
slide10.addText("遗传算法优化策略", {
  x: 0.5, y: 0.15, w: 9, h: 0.6,
  fontSize: 28, fontFace: "Arial Black", color: WHITE, margin: 0
});

// Optimization variables
slide10.addShape(pres.shapes.RECTANGLE, {
  x: 0.3, y: 1.1, w: 4.5, h: 0.4, fill: { color: BLUE_PRIMARY }
});
slide10.addText("优化变量", {
  x: 0.3, y: 1.1, w: 4.5, h: 0.4,
  fontSize: 14, fontFace: "Arial", color: WHITE, bold: true, align: "center", valign: "middle"
});

const optVars = [
  { name: "电机峰值功率 Pmax", range: "[100, 220] kW" },
  { name: "电机额定转速 n₀", range: "[3000, 7000] r/min" },
  { name: "电机峰值转矩 Tmax", range: "[200, 450] N·m" },
  { name: "主减速器传动比 i₀", range: "[6.6, 9.26]" }
];

optVars.forEach((v, i) => {
  slide10.addText(v.name, {
    x: 0.5, y: 1.6 + i * 0.35, w: 2.5, h: 0.3,
    fontSize: 10, fontFace: "Arial", color: GRAY_TEXT, margin: 0
  });
  slide10.addText(v.range, {
    x: 3.0, y: 1.6 + i * 0.35, w: 1.6, h: 0.3,
    fontSize: 10, fontFace: "Arial", color: BLUE_PRIMARY, bold: true, margin: 0
  });
});

// Objective functions
slide10.addShape(pres.shapes.RECTANGLE, {
  x: 5.2, y: 1.1, w: 4.5, h: 0.4, fill: { color: GREEN_ACCENT }
});
slide10.addText("目标函数", {
  x: 5.2, y: 1.1, w: 4.5, h: 0.4,
  fontSize: 14, fontFace: "Arial", color: WHITE, bold: true, align: "center", valign: "middle"
});

const objFuncs = [
  { num: "f₁", desc: "0-100km/h加速时间", dir: "极小化" },
  { num: "f₂", desc: "NEDC百公里电耗", dir: "极小化" },
  { num: "f₃", desc: "电机峰值功率", dir: "极小化" }
];

objFuncs.forEach((f, i) => {
  slide10.addText(f.num, {
    x: 5.4, y: 1.6 + i * 0.4, w: 0.4, h: 0.3,
    fontSize: 12, fontFace: "Arial", color: GREEN_ACCENT, bold: true, margin: 0
  });
  slide10.addText(f.desc, {
    x: 5.8, y: 1.6 + i * 0.4, w: 2.5, h: 0.3,
    fontSize: 10, fontFace: "Arial", color: GRAY_TEXT, margin: 0
  });
  slide10.addText(f.dir, {
    x: 8.3, y: 1.6 + i * 0.4, w: 1.2, h: 0.3,
    fontSize: 10, fontFace: "Arial", color: GREEN_ACCENT, margin: 0
  });
});

// Constraints
slide10.addShape(pres.shapes.RECTANGLE, {
  x: 0.3, y: 3.2, w: 4.5, h: 0.4, fill: { color: "E74C3C" }
});
slide10.addText("约束条件", {
  x: 0.3, y: 3.2, w: 4.5, h: 0.4,
  fontSize: 14, fontFace: "Arial", color: WHITE, bold: true, align: "center", valign: "middle"
});

slide10.addText([
  { text: "爬坡约束：30km/h时最大爬坡度 ≥ 30%", options: { bullet: true, breakLine: true, fontSize: 10 } },
  { text: "车速约束：瞬时最高车速 ≥ 160km/h", options: { bullet: true, fontSize: 10 } }
], {
  x: 0.5, y: 3.7, w: 4.2, h: 0.8,
  fontFace: "Arial", color: GRAY_TEXT
});

// Algorithm params
slide10.addShape(pres.shapes.RECTANGLE, {
  x: 5.2, y: 3.2, w: 4.5, h: 0.4, fill: { color: "8E44AD" }
});
slide10.addText("算法参数", {
  x: 5.2, y: 3.2, w: 4.5, h: 0.4,
  fontSize: 14, fontFace: "Arial", color: WHITE, bold: true, align: "center", valign: "middle"
});

const algoParams = [
  { name: "种群规模", value: "200" },
  { name: "最大迭代代数", value: "200代" },
  { name: "交叉概率", value: "0.80" },
  { name: "变异概率", value: "0.05" }
];

algoParams.forEach((p, i) => {
  slide10.addText(p.name, {
    x: 5.4, y: 3.7 + i * 0.3, w: 2.5, h: 0.25,
    fontSize: 10, fontFace: "Arial", color: GRAY_TEXT, margin: 0
  });
  slide10.addText(p.value, {
    x: 7.9, y: 3.7 + i * 0.3, w: 1.6, h: 0.25,
    fontSize: 10, fontFace: "Arial", color: "8E44AD", bold: true, margin: 0
  });
});

// Bottom note
slide10.addShape(pres.shapes.RECTANGLE, {
  x: 0.5, y: 4.8, w: 9, h: 0.5, fill: { color: BG_LIGHT }
});
slide10.addText("采用NSGA-II多目标遗传算法，在MATLAB平台进行全局并行寻优", {
  x: 0.5, y: 4.8, w: 9, h: 0.5,
  fontSize: 11, fontFace: "Arial", color: GRAY_TEXT, align: "center", valign: "middle"
});

// ========================================
// Slide 11: Pareto Optimal Solution
// ========================================
let slide11 = pres.addSlide();
slide11.background = { color: WHITE };

slide11.addShape(pres.shapes.RECTANGLE, {
  x: 0, y: 0, w: 10, h: 0.9, fill: { color: BLUE_PRIMARY }
});
slide11.addText("Pareto 最优解展示", {
  x: 0.5, y: 0.15, w: 9, h: 0.6,
  fontSize: 28, fontFace: "Arial Black", color: WHITE, margin: 0
});

// Recommended solution
slide11.addText("第35号推荐折中解", {
  x: 0.3, y: 1.1, w: 9, h: 0.3,
  fontSize: 14, fontFace: "Arial", color: BLUE_PRIMARY, bold: true, margin: 0
});

let paretoTable = [
  [
    { text: "优化参数", options: { fill: { color: BLUE_PRIMARY }, color: WHITE, bold: true, fontSize: 11, fontFace: "Arial" } },
    { text: "优化前", options: { fill: { color: BLUE_PRIMARY }, color: WHITE, bold: true, fontSize: 11, fontFace: "Arial" } },
    { text: "优化后", options: { fill: { color: GREEN_ACCENT }, color: WHITE, bold: true, fontSize: 11, fontFace: "Arial" } },
    { text: "变化", options: { fill: { color: BLUE_PRIMARY }, color: WHITE, bold: true, fontSize: 11, fontFace: "Arial" } }
  ],
  [
    { text: "电机峰值功率", options: { fontSize: 11, fontFace: "Arial", fill: { color: BG_LIGHT } } },
    { text: "160 kW", options: { fontSize: 11, fontFace: "Arial", fill: { color: BG_LIGHT } } },
    { text: "145.52 kW", options: { fontSize: 11, fontFace: "Arial", fill: { color: "E8F8E8" }, bold: true, color: GREEN_ACCENT } },
    { text: "↓ 9.1%", options: { fontSize: 11, fontFace: "Arial", fill: { color: BG_LIGHT }, color: GREEN_ACCENT, bold: true } }
  ],
  [
    { text: "电机额定转速", options: { fontSize: 11, fontFace: "Arial" } },
    { text: "4800 r/min", options: { fontSize: 11, fontFace: "Arial" } },
    { text: "4614.4 r/min", options: { fontSize: 11, fontFace: "Arial", fill: { color: "E8F8E8" }, bold: true, color: GREEN_ACCENT } },
    { text: "↓ 3.9%", options: { fontSize: 11, fontFace: "Arial", color: GREEN_ACCENT, bold: true } }
  ],
  [
    { text: "电机峰值转矩", options: { fontSize: 11, fontFace: "Arial", fill: { color: BG_LIGHT } } },
    { text: "337 N·m", options: { fontSize: 11, fontFace: "Arial", fill: { color: BG_LIGHT } } },
    { text: "386.67 N·m", options: { fontSize: 11, fontFace: "Arial", fill: { color: "E8F8E8" }, bold: true, color: GREEN_ACCENT } },
    { text: "↑ 14.7%", options: { fontSize: 11, fontFace: "Arial", fill: { color: BG_LIGHT }, color: BLUE_PRIMARY, bold: true } }
  ],
  [
    { text: "主减速器传动比", options: { fontSize: 11, fontFace: "Arial" } },
    { text: "8.0", options: { fontSize: 11, fontFace: "Arial" } },
    { text: "8.5862", options: { fontSize: 11, fontFace: "Arial", fill: { color: "E8F8E8" }, bold: true, color: GREEN_ACCENT } },
    { text: "↑ 7.3%", options: { fontSize: 11, fontFace: "Arial", color: BLUE_PRIMARY, bold: true } }
  ]
];

slide11.addTable(paretoTable, {
  x: 0.3, y: 1.5, w: 9.4, colW: [2.2, 2.2, 2.2, 2.8],
  border: { pt: 0.5, color: "DEE2E6" }
});

// Pareto front placeholder
slide11.addShape(pres.shapes.RECTANGLE, {
  x: 0.5, y: 3.5, w: 9, h: 1.8, fill: { color: BG_LIGHT },
  line: { color: GRAY_LIGHT, width: 1, dashType: "dash" }
});
slide11.addText("[此处插入 Pareto 前沿图]", {
  x: 0.5, y: 3.5, w: 9, h: 1.8,
  fontSize: 16, fontFace: "Arial", color: GRAY_LIGHT, align: "center", valign: "middle"
});

// Constraint verification
slide11.addShape(pres.shapes.RECTANGLE, {
  x: 0.5, y: 5.1, w: 9, h: 0.35, fill: { color: BG_LIGHT }
});
slide11.addText("约束校验：爬坡约束度 -0.166 < 0，最高车速约束度 -1994.37 < 0 ✓", {
  x: 0.5, y: 5.1, w: 9, h: 0.35,
  fontSize: 10, fontFace: "Arial", color: GREEN_ACCENT, align: "center", valign: "middle"
});

// ========================================
// Slide 12: Optimized Performance Comparison
// ========================================
let slide12 = pres.addSlide();
slide12.background = { color: WHITE };

slide12.addShape(pres.shapes.RECTANGLE, {
  x: 0, y: 0, w: 10, h: 0.9, fill: { color: BLUE_PRIMARY }
});
slide12.addText("优化后性能对比", {
  x: 0.5, y: 0.15, w: 9, h: 0.6,
  fontSize: 28, fontFace: "Arial Black", color: WHITE, margin: 0
});

// Comparison table
slide12.addText("关键性能指标对比", {
  x: 0.3, y: 1.1, w: 9, h: 0.3,
  fontSize: 14, fontFace: "Arial", color: BLUE_PRIMARY, bold: true, margin: 0
});

let compTable = [
  [
    { text: "性能指标", options: { fill: { color: BLUE_PRIMARY }, color: WHITE, bold: true, fontSize: 12, fontFace: "Arial" } },
    { text: "优化前", options: { fill: { color: BLUE_PRIMARY }, color: WHITE, bold: true, fontSize: 12, fontFace: "Arial" } },
    { text: "优化后", options: { fill: { color: GREEN_ACCENT }, color: WHITE, bold: true, fontSize: 12, fontFace: "Arial" } },
    { text: "变化趋势", options: { fill: { color: BLUE_PRIMARY }, color: WHITE, bold: true, fontSize: 12, fontFace: "Arial" } }
  ],
  [
    { text: "0-100km/h加速", options: { fontSize: 12, fontFace: "Arial", fill: { color: BG_LIGHT } } },
    { text: "7.76 s", options: { fontSize: 12, fontFace: "Arial", fill: { color: BG_LIGHT } } },
    { text: "7.61 s", options: { fontSize: 12, fontFace: "Arial", fill: { color: "E8F8E8" }, bold: true } },
    { text: "↓ 缩短1.9%", options: { fontSize: 12, fontFace: "Arial", fill: { color: BG_LIGHT }, color: GREEN_ACCENT, bold: true } }
  ],
  [
    { text: "最大爬坡度", options: { fontSize: 12, fontFace: "Arial" } },
    { text: "31.7%", options: { fontSize: 12, fontFace: "Arial" } },
    { text: "38.6%", options: { fontSize: 12, fontFace: "Arial", fill: { color: "E8F8E8" }, bold: true } },
    { text: "↑ 提升21.8%", options: { fontSize: 12, fontFace: "Arial", color: GREEN_ACCENT, bold: true } }
  ],
  [
    { text: "电机峰值功率", options: { fontSize: 12, fontFace: "Arial", fill: { color: BG_LIGHT } } },
    { text: "160 kW", options: { fontSize: 12, fontFace: "Arial", fill: { color: BG_LIGHT } } },
    { text: "145.52 kW", options: { fontSize: 12, fontFace: "Arial", fill: { color: "E8F8E8" }, bold: true } },
    { text: "↓ 降低9.1%", options: { fontSize: 12, fontFace: "Arial", fill: { color: BG_LIGHT }, color: GREEN_ACCENT, bold: true } }
  ],
  [
    { text: "NEDC续航", options: { fontSize: 12, fontFace: "Arial" } },
    { text: "534.8 km", options: { fontSize: 12, fontFace: "Arial" } },
    { text: "未衰减", options: { fontSize: 12, fontFace: "Arial", fill: { color: "E8F8E8" }, bold: true } },
    { text: "持平", options: { fontSize: 12, fontFace: "Arial", color: BLUE_PRIMARY, bold: true } }
  ]
];

slide12.addTable(compTable, {
  x: 0.3, y: 1.5, w: 9.4, colW: [2.5, 2.0, 2.0, 2.9],
  border: { pt: 0.5, color: "DEE2E6" }
});

// Key findings
slide12.addShape(pres.shapes.RECTANGLE, {
  x: 0.5, y: 3.8, w: 9, h: 0.04, fill: { color: GRAY_LIGHT }
});

slide12.addText("核心结论", {
  x: 0.5, y: 3.9, w: 9, h: 0.3,
  fontSize: 14, fontFace: "Arial", color: BLUE_PRIMARY, bold: true, margin: 0
});

const findings = [
  { icon: "✓", text: "加速性能提升：电机峰值转矩增大 + 传动比优化" },
  { icon: "✓", text: "爬坡能力增强：减速增扭杠杆效应显著" },
  { icon: "✓", text: "轻量化实现：峰值功率降低9.1%，降低制造成本" },
  { icon: "✓", text: "经济性保持：NEDC续航无衰减，电机工作点高效覆盖" }
];

findings.forEach((f, i) => {
  slide12.addShape(pres.shapes.OVAL, {
    x: 0.7, y: 4.3 + i * 0.35, w: 0.25, h: 0.25, fill: { color: GREEN_ACCENT }
  });
  slide12.addText(f.icon, {
    x: 0.7, y: 4.3 + i * 0.35, w: 0.25, h: 0.25,
    fontSize: 10, fontFace: "Arial", color: WHITE, align: "center", valign: "middle", margin: 0
  });
  slide12.addText(f.text, {
    x: 1.1, y: 4.3 + i * 0.35, w: 8.5, h: 0.25,
    fontSize: 11, fontFace: "Arial", color: GRAY_TEXT, margin: 0
  });
});

// ========================================
// Slide 13: Conclusion
// ========================================
let slide13 = pres.addSlide();
slide13.background = { color: WHITE };

slide13.addShape(pres.shapes.RECTANGLE, {
  x: 0, y: 0, w: 10, h: 0.9, fill: { color: BLUE_PRIMARY }
});
slide13.addText("结论与展望", {
  x: 0.5, y: 0.15, w: 9, h: 0.6,
  fontSize: 28, fontFace: "Arial Black", color: WHITE, margin: 0
});

// Main achievements
slide13.addText("主要研究成果", {
  x: 0.3, y: 1.1, w: 9, h: 0.3,
  fontSize: 16, fontFace: "Arial", color: BLUE_PRIMARY, bold: true, margin: 0
});

const achievements = [
  { num: "01", title: "动力系统方案设计", desc: "确立一体化电桥后置后驱方案，完成永磁同步电机、磷酸铁锂电池及单级减速器参数匹配" },
  { num: "02", title: "整车仿真验证", desc: "在AVL Cruise中构建整车模型，通过NEDC、最高车速、爬坡及加速工况验证方案合理性" },
  { num: "03", title: "多目标优化求解", desc: "构建NSGA-II优化模型，以加速时间、百公里电耗、峰值功率为目标进行全局寻优" },
  { num: "04", title: "优化结果闭环验证", desc: "将优化参数代入AVL Cruise复验，实现动力性提升与轻量化降本的双重目标" }
];

achievements.forEach((a, i) => {
  let y = 1.6 + i * 0.85;
  slide13.addShape(pres.shapes.OVAL, {
    x: 0.5, y: y, w: 0.5, h: 0.5, fill: { color: BLUE_PRIMARY }
  });
  slide13.addText(a.num, {
    x: 0.5, y: y, w: 0.5, h: 0.5,
    fontSize: 14, fontFace: "Arial Black", color: WHITE, align: "center", valign: "middle", margin: 0
  });
  slide13.addText(a.title, {
    x: 1.2, y: y, w: 8.5, h: 0.3,
    fontSize: 14, fontFace: "Arial", color: GRAY_TEXT, bold: true, margin: 0
  });
  slide13.addText(a.desc, {
    x: 1.2, y: y + 0.3, w: 8.5, h: 0.4,
    fontSize: 10, fontFace: "Arial", color: GRAY_TEXT, margin: 0
  });
});

// Innovation point
slide13.addShape(pres.shapes.RECTANGLE, {
  x: 0.5, y: 5.0, w: 9, h: 0.4, fill: { color: GREEN_ACCENT }
});
slide13.addText("创新点：将电机关键参数与主减速比联合优化，实现动力性、经济性与成本的综合平衡", {
  x: 0.5, y: 5.0, w: 9, h: 0.4,
  fontSize: 12, fontFace: "Arial", color: WHITE, bold: true, align: "center", valign: "middle"
});

// ========================================
// Slide 14: Acknowledgment
// ========================================
let slide14 = pres.addSlide();
slide14.background = { color: BLUE_DARK };

// Decorative shapes
slide14.addShape(pres.shapes.RECTANGLE, {
  x: 0, y: 0, w: 10, h: 0.08, fill: { color: GREEN_ACCENT }
});
slide14.addShape(pres.shapes.RECTANGLE, {
  x: 0, y: 5.545, w: 10, h: 0.08, fill: { color: GREEN_ACCENT }
});

slide14.addText("致    谢", {
  x: 0.5, y: 1.0, w: 9, h: 0.8,
  fontSize: 40, fontFace: "Arial Black", color: WHITE, align: "center", valign: "middle"
});

// Divider
slide14.addShape(pres.shapes.RECTANGLE, {
  x: 3.5, y: 2.0, w: 3, h: 0.04, fill: { color: GREEN_ACCENT }
});

slide14.addText([
  { text: "感谢指导教师指导教师姓名老师的悉心指导", options: { breakLine: true } },
  { text: "感谢机械设计制造及其自动化专业全体老师", options: { breakLine: true } },
  { text: "感谢各位审稿老师的专业点评与宝贵建议", options: {} }
], {
  x: 1.5, y: 2.4, w: 7, h: 1.5,
  fontSize: 16, fontFace: "Arial", color: GRAY_LIGHT,
  align: "center", lineSpacingMultiple: 1.8
});

slide14.addText("敬请各位老师批评指正", {
  x: 0.5, y: 4.2, w: 9, h: 0.5,
  fontSize: 18, fontFace: "Arial", color: WHITE, align: "center"
});

slide14.addText("答辩人：答辩人姓名  |  XX大学XX学院  |  2026年5月", {
  x: 0.5, y: 4.9, w: 9, h: 0.4,
  fontSize: 12, fontFace: "Arial", color: GRAY_LIGHT, align: "center"
});

// Save file
pres.writeFile({ fileName: "c:/Users/Asus/Desktop/claude code整理/纯电动汽车动力传动系统参数匹配与优化_答辩PPT.pptx" })
  .then(() => console.log("PPT文件生成成功！"))
  .catch(err => console.error("生成失败:", err));
