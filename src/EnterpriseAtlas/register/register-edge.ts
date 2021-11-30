/* 注册edge */

export default (G6) => {
  G6.registerEdge('tree-edge', {
    draw(cfg, group) {
      const xOffset = 22;
      const yOffset = 12;
      const { startPoint, endPoint } = cfg;
      const { side } = cfg.targetNode.getModel(); // 节点在左侧还是右侧
      const Ydiff = endPoint.y - startPoint.y;
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
                ['M', startPoint.x + xOffset, startPoint.y],
                ['L', endPoint.x, endPoint.y],
              ]
            : [
                ['M', startPoint.x, startPoint.y],
                ['L', QPoint.x, startPoint.y],
                ['L', QPoint.x, endPoint.y + (Ydiff > 0 ? -yOffset : yOffset)],
                [
                  'Q',
                  startPoint.x - xOffset,
                  QPoint.y,
                  QPoint.x - yOffset,
                  endPoint.y,
                ],
                ['L', endPoint.x, endPoint.y],
              ];

        shape = group.addShape('path', {
          attrs: {
            path,
            stroke: '#C1CFFF',
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
                ['M', startPoint.x + xOffset, startPoint.y],
                ['L', endPoint.x, endPoint.y],
              ]
            : [
                ['M', startPoint.x, startPoint.y],
                ['L', QPoint.x, startPoint.y],
                ['L', QPoint.x, endPoint.y + (Ydiff > 0 ? -yOffset : yOffset)],
                ['Q', QPoint.x, QPoint.y, QPoint.x + yOffset, endPoint.y],
                ['L', endPoint.x, endPoint.y],
              ];

        shape = group.addShape('path', {
          attrs: {
            path,
            stroke: '#C1CFFF',
            ...cfg,
          },
          name: 'right-tree-edge',
        });
      }
      return shape;
    },
  });
};
