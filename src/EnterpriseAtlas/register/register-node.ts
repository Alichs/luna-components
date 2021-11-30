/* 注册自定义节点 */

import { circleColor, labelConfig, commonStyle } from '../config/config';

export default (G6) => {
  G6.registerNode(
    'tree-node',
    {
      draw(cfg, group) {
        console.log(cfg, 'cfg');
        const { depth, children, side, id } = cfg;
        const key = depth < 3 ? depth : 3;
        // rect style
        const style = this.getShapeStyle(cfg, group);
        // label style
        const labelStyle = this.getLabelStyle(cfg, labelConfig[key], group);
        // width: 当前label的宽度 + 32
        const width =
          Math.ceil(
            G6.Util.getTextSize(cfg.label, labelConfig[key].style.fontSize)[0],
          ) + 32;
        // 收起的时候显示“+”，否则显示“-”
        const icon = cfg.collapsed ? '+' : '-';

        const iconOffsetX =
          side === 'left' ? width / 2 - 10 : width + width / 2 + 10;

        // let shape = group.addShape('rect', {
        //   attrs: {
        //     ...style,
        //     ...commonStyle,
        //     width: width + 22,
        //     x: width
        //   },
        // }, 'node');

        // console.log(style, 'style');
        let shape = null;
        // 普通节点
        shape = group.addShape('rect', {
          attrs: {
            ...cfg.style,
            ...style,
            ...commonStyle,
            width,
            x: width / 2,
          },
          name: 'rect-node',
        });
        const label = group.addShape('text', {
          attrs: {
            ...labelStyle,
            ...cfg.labelCfg.style,
            ...commonStyle,
            x: width,
          },
          name: 'rect-node-text',
        });

        // 有children且不是root节点有折叠收起操作
        if (children && cfg.depth !== 0) {
          const circle = group.addShape('circle', {
            attrs: {
              ...commonStyle,
              r: 7,
              fill: '#fff',
              stroke: circleColor,
              x: iconOffsetX,
            },
            name: 'circle-node',
          });
          const text = group.addShape('text', {
            attrs: {
              ...commonStyle,
              text: icon,
              fontSize: 12,
              fill: circleColor,
              x: iconOffsetX - 3.5,
              y: 5,
            },
            name: 'circle-text',
          });
        }

        // 搜索节点
        if (id.includes('search')) {
          let shape = group.addShape('rect', {
            attrs: {
              ...cfg.style,
              ...style,
              ...commonStyle,
              width,
              x: width / 2,
            },
            name: 'search-node',
          });
          const searchLabel = group.addShape('text', {
            attrs: {
              ...labelStyle,
              ...cfg.labelCfg.style,
              ...commonStyle,
              x: width,
            },
            name: 'search-text',
          });
          const marker = group.addShape('marker', {
            attrs: {
              ...commonStyle,
              x: iconOffsetX - 18,
              y: 0,
              r: 4,
              symbol: 'triangle-down',
              fill: '#4B74FF',
            },
            name: 'marker-icon',
          });
        }
        return shape;
      },
      update(cfg, node) {
        const { collapsed } = cfg;
        const group = node.getContainer();
        const children = group.get('children');
        const icon = children.find((child) => child.cfg.name === 'circle-text');

        if (icon) {
          icon.attr({
            text: collapsed ? '+' : '-',
          });
        }
      },
    },
    'rect',
  );
};
