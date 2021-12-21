import { edgeStyles } from '../config/index';

export default (G6) => {
  G6.registerEdge('tree-edge', {
    draw(cfg, group) {
      const { startPoint, endPoint } = cfg;

      // const model = cfg.targetNode.getModel();
      // console.log(style, 'style----');

      const sourceModel = cfg.sourceNode.getModel();
      const {
        side,
        edgeRight,
        edgeLeft,
        edgeLeftStyle,
        dataType,
        endArrowStyle,
      } = cfg.targetNode.getModel();
      const { invseRoundName, isScalable } = sourceModel;

      // 开口方向
      const Xdiff = startPoint.x - endPoint.x; // 大于0在左侧取负值
      const yOffset = 16;
      let startPointY = startPoint.y;
      if (isScalable) {
        if (side === 'left') {
          startPointY = startPointY - 20;
        } else {
          startPointY = startPointY + 20;
        }
      }
      if (invseRoundName) {
        if (side === 'left') {
          startPointY = startPointY - 22;
        } else {
          startPointY = startPointY + 22;
        }
      }

      const arrowPaths = {
        bottom: G6.Arrow.triangle(8, -5, 2),
        top: G6.Arrow.triangle(8, 5),
      };

      let shape = null;

      // 在上方
      if (side === 'left') {
        const xOffset = Xdiff > 0 ? -16 : 16;
        shape = group.addShape('path', {
          attrs: {
            stroke: '#C1CFFF',
            [endArrowStyle ? 'endArrow' : '']: endArrowStyle
              ? {
                  fill: endArrowStyle.fill,
                  stroke: endArrowStyle.stroke,
                  path: arrowPaths[endArrowStyle.direction],
                }
              : '',
            path:
              Xdiff === 0
                ? [
                    ['M', startPoint.x, startPointY],
                    ['L', endPoint.x, endPoint.y + 8],
                  ]
                : [
                    ['M', startPoint.x, startPointY],
                    [
                      'Q',
                      startPoint.x,
                      startPointY - yOffset,
                      startPoint.x + xOffset,
                      startPointY - yOffset,
                    ],
                    ['L', endPoint.x - xOffset, startPointY - yOffset],
                    [
                      'Q',
                      endPoint.x,
                      startPointY - yOffset,
                      endPoint.x,
                      startPointY - 2 * yOffset,
                    ],
                    ['L', endPoint.x, endPoint.y + 8],
                  ],
          },
        });
      } else {
        const xOffset = Xdiff > 0 ? 16 : -16;
        shape = group.addShape('path', {
          attrs: {
            stroke: '#C1CFFF',
            [endArrowStyle ? 'endArrow' : '']: endArrowStyle
              ? {
                  fill: endArrowStyle.fill,
                  stroke: endArrowStyle.stroke,
                  path: arrowPaths[endArrowStyle.direction],
                }
              : '',
            path:
              Xdiff === 0
                ? [
                    ['M', startPoint.x, startPointY],
                    ['L', endPoint.x, endPoint.y - 8],
                  ]
                : [
                    ['M', startPoint.x, startPointY],
                    [
                      'Q',
                      startPoint.x,
                      startPointY + yOffset,
                      startPoint.x - xOffset,
                      startPointY + yOffset,
                    ],
                    ['L', endPoint.x + xOffset, startPointY + yOffset],
                    [
                      'Q',
                      endPoint.x,
                      startPointY + yOffset,
                      endPoint.x,
                      startPointY + 2 * yOffset,
                    ],
                    ['L', endPoint.x, endPoint.y - 8],
                  ],
          },
        });
      }

      // 线右边label
      if (edgeRight) {
        group.addShape(
          'text',
          {
            attrs: {
              ...edgeStyles.edgeRight,
              text: edgeRight,
              y: side === 'left' ? endPoint.y + 44 : endPoint.y - 30,
              x: endPoint.x + 6,
            },
          },
          'edge-right-label',
        );
      }

      // 线左边label
      if (edgeLeft) {
        group.addShape(
          'rect',
          {
            attrs: {
              y: side === 'left' ? endPoint.y + 26 : endPoint.y - 47,
              x: endPoint.x - 48,
              width: 40,
              height: 22,
              fill: edgeLeftStyle[dataType].bg,
              radius: 2,
            },
          },
          'edge-left-rect',
        );
        group.addShape(
          'text',
          {
            attrs: {
              ...edgeStyles.edgeRight,
              text: edgeLeft,
              y: side === 'left' ? endPoint.y + 43 : endPoint.y - 30,
              x: endPoint.x - 40,
              fill: edgeLeftStyle[dataType].color,
            },
          },
          'edge-left-label',
        );
      }

      return shape;
    },
  });
};
