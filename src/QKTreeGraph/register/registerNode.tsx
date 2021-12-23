/*
 * @Author: guomeijie
 * @Date: 2021-12-08 17:48:50
 * @Last Modified by: guomeijie
 * @Last Modified time: 2021-12-23 16:09:26
 * @desc 注册自定义节点
 */

import { NodeConfig } from '@antv/g6-core/lib/types/index';
import { IGroup, IShape } from '@antv/g-base/lib/interfaces';
import { INode } from '@antv/g6-core/lib/interface/item';
import { styles, labelStyles, commonStyle, baseColor } from '../config/index';
import { INodeStyle } from '../types/index';
let WIDTH = 0;

export default (G6: any) => {
  G6.registerNode(
    'tree-node',
    {
      draw(cfg: NodeConfig, group: IGroup) {
        const {
          name,
          invseRoundName,
          isScalable,
          isPerson,
          side,
          rectText,
          nodeStyle,
          bottomNodeStyle,
        } = cfg;

        // nodeStyle string 和 object 判断
        let styleObj = null; // 节点样式
        let nodeWidth = 0; // label宽度
        const styleType = Object.prototype.toString.call(nodeStyle);

        if (styleType === '[object Object]') {
          styleObj = nodeStyle as INodeStyle;
          nodeWidth = styleObj.width;
        } else if (styleType === '[object String]') {
          styleObj =
            styles[
              nodeStyle == 'LEFT'
                ? 'LEFT'
                : nodeStyle == 'RIGHT'
                ? 'RIGHT'
                : 'BOTTOM'
            ];
          nodeWidth =
            styles[
              nodeStyle == 'LEFT'
                ? 'LEFT'
                : nodeStyle == 'RIGHT'
                ? 'RIGHT'
                : 'BOTTOM'
            ].width;
        } else {
          // styleObj = styles['RIGHT'];
          // nodeWidth = styles['RIGHT'].width;
          throw new Error('nodeStyle is object or string');
        }

        // 投资轮次节点样式
        let newBottomNodeStyle = null;
        const bottomNodeStyleType =
          Object.prototype.toString.call(bottomNodeStyle);
        if (bottomNodeStyleType === '[object Object]') {
          newBottomNodeStyle = bottomNodeStyle;
        } else if (bottomNodeStyleType === '[object String]') {
          newBottomNodeStyle = styles.BOTTOM;
        } else {
          newBottomNodeStyle = styles.BOTTOM;
        }

        const radius = invseRoundName
          ? !isPerson && side === 'left'
            ? [0, 0, 6, 6]
            : [6, 6, 0, 0]
          : 6;
        let markerOffsetY = 0;
        if (invseRoundName) {
          if (!isPerson && side === 'left') {
            markerOffsetY = -52;
          } else {
            markerOffsetY = 90;
          }
        } else {
          if (!isPerson && side === 'left') {
            markerOffsetY = -30;
          } else {
            markerOffsetY = 68;
          }
        }

        // 上方投资方，可以是人也可以是企业
        // INV && isPerson 采用INV样式
        // INV && !isPerson 采用CON样式
        let shape = group.addShape('rect', {
          attrs: {
            ...commonStyle,
            ...(styleObj as object),
            x: 0,
            y: -20,
            radius,
          },
          name: 'rect-node',
        });

        // name
        group.addShape('text', {
          attrs: {
            ...commonStyle,
            ...labelStyles.name,
            text: name.length > 10 ? name.slice(0, 10) + '...' : name,
            width: nodeWidth,
            x: nodeWidth / 2,
            y: 12,
            textAlign: 'center',
          },
          name: 'rect-node-text',
        });

        // 金额
        group.addShape('text', {
          attrs: {
            ...commonStyle,
            ...labelStyles.conprop,
            text: rectText ? rectText : '',
            width: nodeWidth,
            x: nodeWidth / 2,
            y: 40,
            textAlign: 'center',
          },
          name: 'node-conprop',
        });

        // 融资节点
        if (
          invseRoundName ||
          (!isPerson && side === 'left' && invseRoundName)
        ) {
          group.addShape('rect', {
            attrs: {
              ...commonStyle,
              ...(newBottomNodeStyle as object),
              width: nodeWidth,
              radius:
                !isPerson && side === 'left' ? [6, 6, 0, 0] : [0, 0, 6, 6],
              x: 0,
              y: !isPerson && side === 'left' ? -42 : 58,
            },
            name: 'bottom-node',
          });
          group.addShape('text', {
            attrs: {
              ...commonStyle,
              ...labelStyles.invseRoundName,
              x: nodeWidth / 2,
              y: !isPerson && side === 'left' ? -24 : 75,
              text: invseRoundName || '融资',
              textAlign: 'center',
            },
            name: 'bottom-node-text',
          });
        }

        // 节点是否可以继续发散
        if (isScalable) {
          group.addShape('marker', {
            attrs: {
              x: nodeWidth / 2,
              // y: invseRoundName ? 90 : 68,
              y: markerOffsetY,
              r: 6,
              cursor: 'pointer',
              symbol: cfg.collapsed ? G6.Marker.expand : G6.Marker.collapse,
              stroke: '#D2D5E1',
              lineWidth: 1,
              fill: '',
            },
            name: 'collapse-icon',
          });
        }
        return shape;
      },
      update(cfg: NodeConfig, node: INode) {
        const { collapsed } = cfg;
        const group = node.getContainer();
        const children = group.get('children');
        const icon = children.find(
          (child: IShape) => child.cfg.name === 'collapse-icon',
        );

        if (icon) {
          icon.attr({
            symbol: collapsed ? G6.Marker.expand : G6.Marker.collapse,
          });
        }
      },
    },
    'rect',
  );
};

/* 注册root节点 */
export const registerRoot = (G6: any) => {
  G6.registerNode(
    'root-node',
    {
      draw(cfg: any, group: any) {
        const width = Math.ceil(G6.Util.getTextSize(cfg.name, 16)[0]) + 32;
        WIDTH = width;

        // 普通节点
        const shape = group.addShape('rect', {
          attrs: {
            ...commonStyle,
            width,
            height: 40,
            radius: [4],
            fill: baseColor,
            x: -WIDTH / 2 + 83,
            y: 0,
          },
          name: 'root-node',
        });
        const label = group.addShape('text', {
          attrs: {
            ...commonStyle,
            x: -WIDTH / 2 + 83 + 16,
            y: 28,
            fill: '#fff',
            text: cfg.name,
            fontSize: 16,
            fontWeight: 500,
          },
          name: 'root-node-text',
        });
        return shape;
      },
    },
    'rect',
  );
};
