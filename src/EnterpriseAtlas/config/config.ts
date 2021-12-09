export const baseColor = '#4B74FF';

export const circleColor = '#D2D5E1';

export const labelColor = '#363B4D';

export const colors = {
  circleColor: '#D2D5E1',
  labelColor: '#363B4D',
  borderColor: '#BBD0F0',
};

export const pathColors = {
  pathColor: '#C1CFFF',
};

// root企业节点颜色
export const rootColor = '#4B74FF';
export const rootLabelColor = '#FFFFFF';

// 一级发散节点背景颜色
export const nodeBgColorList = [
  '#DFECFF',
  '#FEF1DF',
  '#E8F7E3',
  '#FFEBE5',
  '#FDE7F2',
  '#EBE4FD',
  '#E5E8F9',
  '#DFECFF',
];

// 一级节点文本颜色
export const nodeLabelColorList = [
  '#6E8EFC',
  '#FF8411',
  '#50B72A',
  '#FE774C',
  '#F3499D',
  '#7D4AF6',
  '#4D5999',
  '#DFECFF',
];

// 其余节点边框颜色
export const nodeBorderColorList = [
  '#BBD0F0',
  '#F6D4A5',
  '#C3E6B8',
  '#F6D0C5',
  '#F5C9DF',
  '#D7CCF3',
  '#C9CEEB',
  '#DFECFF',
];

export const firstNodeColor = {
  '001': {
    label: '#6E8EFC',
    bg: '#DFECFF',
    border: '#BBD0F0',
  },
  '002': {
    label: '#FF8411',
    bg: '#FEF1DF',
    border: '#F6D4A5',
  },
  '003': {
    label: '#50B72A',
    bg: '#E8F7E3',
    border: '#C3E6B8',
  },
  '004': {
    label: '#FE774C',
    bg: '#FFEBE5',
    border: '#F6D0C5',
  },
  '005': {
    label: '#F3499D',
    bg: '#FDE7F2',
    border: '#F5C9DF',
  },
  '006': {
    label: '#7D4AF6',
    bg: '#EBE4FD',
    border: '#D7CCF3',
  },
  '007': {
    label: '#4D5999',
    bg: '#E5E8F9',
    border: '#C9CEEB',
  },
  '008': {
    label: '#FE774C',
    bg: '#FFEBE5',
    border: '#F6D0C5',
  },
};

export const commonStyle = {
  cursor: 'pointer',
};

// 通用节点label style
export const commonLabel = {
  fill: labelColor,
  fontSize: 12,
  fontWeight: 500,
};

// 一级节点label style
export const firstLabel = {
  fontSize: 14,
  fontWeight: 500,
};

// root节点label style
export const rootLabel = {
  fill: rootLabelColor,
  fontSize: 16,
  fontWeight: 500,
};

/* label配置项 */
export const labelConfig = {
  0: {
    style: rootLabel,
  },
  1: {
    style: firstLabel,
  },
  2: {
    style: commonLabel,
  },
  3: {
    style: commonLabel,
  },
  4: {
    style: commonLabel,
  },
};
