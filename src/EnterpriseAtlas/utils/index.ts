import { firstNodeColor, rootColor, labelConfig } from '../config/config';

const dataTransform = (data: any) => {
  const changeData = (d: any, level = 0, nodeType?: string) => {
    const data = {
      ...d,
      level,
    };

    switch (level) {
      case 0:
        data.style = {
          fill: rootColor,
          stroke: '',
          radius: [4],
          height: 40,
        };
        data.labelCfg = labelConfig[0];
        break;
      case 1:
        const labelColor = firstNodeColor[nodeType].label;
        const result = { ...labelConfig[1].style, fill: labelColor };
        data.style = {
          fill: firstNodeColor[nodeType].bg,
          stroke: '',
          radius: [4],
          height: 32,
        };
        data.labelCfg = { style: result };
        break;
      case 2:
        data.style = {
          fill: '#fff',
          stroke: firstNodeColor[nodeType].border,
          radius: [4],
          height: 32,
        };
        data.labelCfg = labelConfig[2];
        break;
      default:
        data.style = {
          fill: '#fff',
          stroke: '',
          radius: [4],
          height: 32,
        };
        data.labelCfg = labelConfig[3];
        break;
    }
    // 大于一级的默认收起
    if (level > 1) {
      data.collapsed = true;
    }

    if (nodeType) {
      data.colorCfg = firstNodeColor[nodeType];
    }

    if (data.label === '产品营销') {
      data.side = 'left';
    }

    if (d.children) {
      data.children = d.children.map((child) => {
        child.side = data.side;
        return changeData(child, level + 1, d.nodeType || child.nodeType);
      });
    }

    return data;
  };
  return changeData(data);
};

export default dataTransform;
