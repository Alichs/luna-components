import { firstNodeColor, rootColor, labelConfig } from '../config/config';

const dataTransform = (data: any, isSide?: boolean) => {
  const changeData = (d: any, level = 0, nodeType?: string) => {
    const data = {
      ...d,
      level,
      label: d.name,
      isPerson: d.type,
    };

    delete data.name;

    switch (level) {
      case 0:
        data.type = 'root-node';
        data.style = {
          fill: rootColor,
          stroke: '',
          radius: [4],
          height: 40,
        };
        data.labelCfg = labelConfig[0];
        break;
      case 1:
        data.type = 'tree-node';
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
        data.type = 'tree-node';
        data.style = {
          fill: '#fff',
          stroke: firstNodeColor[nodeType].border,
          radius: [4],
          height: 32,
        };
        data.labelCfg = labelConfig[2];
        break;
      default:
        data.type = 'tree-node';
        data.style = {
          fill: nodeType ? firstNodeColor[nodeType].bg : '#fff',
          stroke: '',
          radius: [4],
          height: 32,
        };
        data.labelCfg = nodeType ? labelConfig[1] : labelConfig[3];
        break;
    }
    // 大于一级的默认收起
    if (level > 1) {
      data.collapsed = true;
    }

    if (nodeType) {
      data.colorCfg = firstNodeColor[nodeType];
    }

    if (
      (data.label === '对外投资' ||
        data.label === '控股企业' ||
        data.label === '历史对外投资' ||
        data.label === '分支机构' ||
        data.label === '客户' ||
        data.label === '供应商') &&
      isSide
    ) {
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
