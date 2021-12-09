/* 注册edge */

export default (G6) => {
  G6.registerEdge('tree-edge', {
    draw(cfg, group) {
      const { startPoint, endPoint } = cfg;
      const { side, depth, colorCfg } = cfg.targetNode.getModel(); // 节点在左侧还是右侧
      const Ydiff = endPoint.y - startPoint.y;
      const xOffset = 22;
      // 计算线的曲度
      const yOffset =
        Math.abs(Ydiff) > 24 ? 12 : Math.floor(Math.abs(Ydiff)) / 2;
      // 线末尾三角形
      const arrowPath = depth === 1 ? 'M 0,0 L -5,3 L -5,-3 Z' : '';
      const endArrow = {
        path: arrowPath,
        d: 0,
        fill: colorCfg.label,
        stroke: colorCfg.label,
      };
      let shape = null;
      // 判断节点在左边还是在右边
      if (side === 'left') {
        const QPoint = {
          x: startPoint.x - xOffset,
          y: endPoint.y,
        };
        const path =
          Ydiff === 0
            ? [
                ['M', startPoint.x, startPoint.y],
                ['L', endPoint.x + 8, endPoint.y],
              ]
            : [
                ['M', startPoint.x, startPoint.y],
                [
                  'Q',
                  QPoint.x,
                  startPoint.y,
                  QPoint.x,
                  startPoint.y + (Ydiff > 0 ? yOffset : -yOffset),
                ],
                [
                  'L',
                  startPoint.x - xOffset,
                  endPoint.y + (Ydiff > 0 ? -yOffset : yOffset),
                ],
                ['Q', QPoint.x, QPoint.y, QPoint.x - yOffset, endPoint.y],
                ['L', endPoint.x + 8, endPoint.y],
              ];
        // 三角形
        shape = group.addShape('path', {
          attrs: {
            path,
            stroke: '#C1CFFF',
            endArrow,
            ...cfg,
          },
          name: 'left-tree-edge',
        });
      } else {
        const QPoint = {
          x: startPoint.x + xOffset,
          y: endPoint.y,
        };

        const path =
          Ydiff === 0
            ? [
                ['M', startPoint.x, startPoint.y],
                ['L', endPoint.x - 8, endPoint.y],
              ]
            : [
                ['M', startPoint.x, startPoint.y],
                [
                  'Q',
                  QPoint.x,
                  startPoint.y,
                  QPoint.x,
                  startPoint.y + (Ydiff > 0 ? yOffset : -yOffset),
                ],
                ['L', QPoint.x, endPoint.y + (Ydiff > 0 ? -yOffset : yOffset)],
                ['Q', QPoint.x, QPoint.y, QPoint.x + yOffset, endPoint.y],
                ['L', endPoint.x - 8, endPoint.y],
              ];
        shape = group.addShape('path', {
          attrs: {
            path,
            stroke: '#C1CFFF',
            endArrow,
            ...cfg,
          },
          name: 'right-tree-edge',
        });
      }
      return shape;
    },
  });
};
