import { pathColors } from './config';

export default (G6) => {
  G6.registerEdge('my-tree-edge', {
    // getPath(points) {
    //   const startPoint = points[0];
    //   const endPoint = points[1];
    //   return [
    //     ['M', startPoint.x, startPoint.y],
    //     ['L', endPoint.x / 3 + (2 / 3) * startPoint.x, startPoint.y],
    //     ['L', endPoint.x / 3 + (2 / 3) * startPoint.x, endPoint.y],
    //     ['L', endPoint.x, endPoint.y],
    //   ];
    // },
    draw(cfg, group) {
      const { startPoint, endPoint } = cfg;
      let shape = group.addShape('path', {
        attrs: {
          path: [
            ['M', startPoint.x - 4, startPoint.y],
            ['L', endPoint.x / 3 + (2 / 3) * startPoint.x - 4, startPoint.y],
            ['L', endPoint.x / 3 + (2 / 3) * startPoint.x - 4, endPoint.y],
            ['L', endPoint.x - 4, endPoint.y],
          ],
          stroke: pathColors.pathColor,
          ...cfg,
        },
        name: 'right-tree-edge',
      });
      return shape;
    },
  });
};
