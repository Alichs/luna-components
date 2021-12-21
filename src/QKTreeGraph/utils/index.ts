import { baseColor } from '../config/index';
import QKutils from '../../utils';

// 股权穿透图谱数据格式化
export const dataTransform = (data: any) => {
  QKutils.formmatDataUp(data, (subtree: any) => {
    const { dataType, conprop, subconam, isPerson } = subtree;
    const flag = dataType === 'INV' ? true : false;

    if (dataType) {
      subtree.collapsed = true;
    }

    // 树图布局 'INV' left --> top, 'CON' right --> bottom
    subtree.side = flag ? 'left' : 'right';
    subtree.edgeRight = conprop ? `${conprop}%` : '投资';
    subtree.rectText = subconam ? `认缴金额：${subconam}万元` : '';
    // subtree.nodeStyle = isPerson && flag ? 'LEFT' : 'RIGHT';
    subtree.nodeStyle = isPerson && flag ? 'LEFT' : 'RIGHT';
    // subtree.nodeStyle = {
    //   width: 200,
    //   height: 78,
    //   fill: '#F1F5FF',
    //   stroke: '#E0E7FF'
    // };
    subtree.bottomNodeStyle = {
      width: 166,
      height: 22,
      fill: '#E0E7FF',
      stroke: '#E0E7FF',
    };
    subtree.endArrowStyle = {
      fill: flag && isPerson ? '#F62828' : baseColor,
      stroke: flag && isPerson ? '#F62828' : baseColor,
      direction: flag ? 'bottom' : 'top',
    };
    subtree.stateStyles = {
      hover: {
        stroke: flag && isPerson ? '#F62828' : baseColor,
        'bottom-node': {
          stroke: flag && isPerson ? '#F62828' : baseColor,
        },
      },
    };
  });
};

// 企业合作关系谱数据格式化
export const dataTransform1 = (data: any) => {
  QKutils.formmatDataUp(data, (subtree: any) => {
    const { dataType, count, total } = subtree;
    const flag = dataType === 'bidding' ? true : false;

    // 树图布局 'bidding' left --> top, 'win' right --> bottom
    subtree.side = flag ? 'left' : 'right';
    subtree.edgeLeft = flag ? '招标' : '中标';
    subtree.edgeRight = count ? `${count}次` : '0次';
    subtree.rectText = flag
      ? total
        ? `招标金额：${total}万元`
        : '招标金额：--'
      : total
      ? `中标金额：${total}万元`
      : '中标金额：--';
    subtree.isPerson = false;
    subtree.edgeLeftStyle = {
      win: {
        color: '#F62828',
        bg: '#FEE9E9',
      },
      bidding: {
        color: baseColor,
        bg: '#ECF0FF',
      },
    };
    subtree.nodeStyle = !flag ? 'LEFT' : 'RIGHT';
    // subtree.nodeStyle = {
    //   width: 200,
    //   height: 78,
    //   fill: '#F1F5FF',
    //   stroke: '#E0E7FF'
    // };
    subtree.endArrowStyle = {
      fill: flag ? baseColor : '#F62828',
      stroke: flag ? baseColor : '#F62828',
      direction: flag ? 'bottom' : 'bottom',
    };
    subtree.stateStyles = {
      hover: {
        stroke: flag ? baseColor : '#F62828',
        'bottom-node': {
          stroke: flag ? baseColor : '#F62828',
        },
      },
    };
  });
};
