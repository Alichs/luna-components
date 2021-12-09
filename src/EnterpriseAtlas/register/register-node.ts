/*
 * @Author: guomeijie
 * @Date: 2021-12-08 17:48:50
 * @Last Modified by: guomeijie
 * @Last Modified time: 2021-12-08 17:49:22
 * @desc 注册自定义节点
 */

import {
  circleColor,
  labelConfig,
  commonStyle,
  baseColor,
} from '../config/config';

export default (G6) => {
  G6.registerNode(
    'tree-node',
    {
      draw(cfg, group) {
        const { depth, children, side, id, dataId, remark } = cfg;
        const key = depth < 3 ? depth : 3;
        // label style
        const labelStyle = this.getLabelStyle(cfg, labelConfig[key], group);
        // 节点说明信息宽度
        let remarkWidth = 0;
        const str = remark || '';
        if (str) {
          remarkWidth = Math.ceil(G6.Util.getTextSize(str, 12)[0]);
        }
        // width: 当前label的宽度 + 32
        const width =
          Math.ceil(
            G6.Util.getTextSize(cfg.label, labelConfig[key].style.fontSize)[0],
          ) +
          32 +
          remarkWidth;
        // 收起的时候显示“+”，否则显示“-”
        const icon = cfg.collapsed ? '+' : '-';

        const iconOffsetX = side === 'left' ? -10 + 22 : width + 10;
        const markerOffsetX =
          side === 'left' ? iconOffsetX + 18 : iconOffsetX - 18;

        let shape = group.addShape(
          'rect',
          {
            attrs: {
              ...cfg.style,
              ...commonStyle,
              width: width + 22,
              fill: '',
              stroke: '',
              x: 0,
            },
          },
          'node',
        );

        // 普通节点
        const rect = group.addShape('rect', {
          attrs: {
            ...cfg.style,
            ...commonStyle,
            width,
            x: side === 'left' ? 22 : cfg.style.x,
          },
          name: 'rect-node',
        });
        const label = group.addShape('text', {
          attrs: {
            ...labelStyle,
            ...cfg.labelCfg.style,
            ...commonStyle,
            text: remark ? `${cfg.label}(${remark})` : `${cfg.label}`,
            x: side === 'left' ? width / 2 + 22 : width / 2,
            y: cfg.style.height / 2,
          },
          name: 'rect-node-text',
        });

        // 有children或者有dataId且不是root节点有折叠收起操作
        if (
          (children || dataId) &&
          depth !== 0 &&
          !cfg.label.includes('搜索(')
        ) {
          const circle = group.addShape('circle', {
            attrs: {
              ...commonStyle,
              r: 7,
              fill: '#fff',
              stroke: circleColor,
              x: iconOffsetX,
              y: cfg.style.height / 2,
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
              y: cfg.style.height / 2 + 5,
            },
            name: 'circle-text',
          });
        }

        // 搜索节点
        if (id.includes('search')) {
          group.removeChild(rect);
          group.removeChild(label);
          const searchRect = group.addShape('rect', {
            attrs: {
              ...cfg.style,
              ...commonStyle,
              width,
              x: side === 'left' ? 22 : cfg.style.x,
            },
            name: 'search-node',
          });
          const searchLabel = group.addShape('text', {
            attrs: {
              ...labelStyle,
              ...cfg.labelCfg.style,
              ...commonStyle,
              fill: baseColor,
              x: side === 'left' ? width / 2 + 22 : width / 2,
              y: cfg.style.height / 2,
            },
            name: 'search-text',
          });
          const path =
            side === 'left'
              ? [
                  ['M', markerOffsetX - 2, cfg.style.height / 2 - 4],
                  ['L', markerOffsetX + 2, cfg.style.height / 2],
                  ['L', markerOffsetX + 6, cfg.style.height / 2 - 4],
                  ['M', markerOffsetX - 2, cfg.style.height / 2],
                  ['L', markerOffsetX + 2, cfg.style.height / 2 + 4],
                  ['L', markerOffsetX + 6, cfg.style.height / 2],
                ]
              : [
                  ['M', markerOffsetX + 2, cfg.style.height / 2 - 4],
                  ['L', markerOffsetX - 2, cfg.style.height / 2],
                  ['L', markerOffsetX - 6, cfg.style.height / 2 - 4],
                  ['M', markerOffsetX + 2, cfg.style.height / 2],
                  ['L', markerOffsetX - 2, cfg.style.height / 2 + 4],
                  ['L', markerOffsetX - 6, cfg.style.height / 2],
                ];
          const searchIcon = group.addShape('path', {
            attrs: {
              ...commonStyle,
              path,
              stroke: baseColor,
            },
            name: 'search-icon',
          });
        }
        return shape;
      },
      update(cfg, node) {
        const { collapsed, label } = cfg;
        const group = node.getContainer();
        const children = group.get('children');
        const icon = children.find((child) => child.cfg.name === 'circle-text');
        const searchNode = children.find(
          (child) => child.cfg.name === 'search-text',
        );

        // 更新搜索节点label，剩余数量
        if (searchNode) {
          searchNode.attr({
            text: label,
          });
        }

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

/* 注册root节点 */
export const registerRoot = (G6) => {
  G6.registerNode(
    'root-node',
    {
      draw(cfg, group) {
        const labelStyle = this.getLabelStyle(cfg, labelConfig[0], group);
        const width =
          Math.ceil(
            G6.Util.getTextSize(cfg.label, labelConfig[0].style.fontSize)[0],
          ) + 32;

        let shape = null;
        // 普通节点
        shape = group.addShape('rect', {
          attrs: {
            ...cfg.style,
            ...commonStyle,
            width,
            x: 0,
          },
          name: 'rect-node',
        });
        const label = group.addShape('text', {
          attrs: {
            ...labelStyle,
            ...cfg.labelCfg.style,
            ...commonStyle,
            x: width / 2,
            y: cfg.style.height / 2,
          },
          name: 'rect-node-text',
        });
        return shape;
      },
    },
    'rect',
  );
};
