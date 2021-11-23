import React, { useEffect, useRef, useState } from 'react';
import G6 from '@antv/g6';
import { appenAutoShapeListener } from '@antv/g6-react-node';
import registerEdge from './register-edge';
import myTreeNode from './register-node.tsx';
import data from './dataList';
import './css/index.less';

const EnterpriseAtlas: React.FC = () => {
  const ref = useRef(null);
  let graph = null;
  useEffect(() => {
    if (!graph) {
      createGraphic();
    }
    return () => {
      graph.destroy();
    };
  }, []);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      window.onresize = () => {
        if (!graph || graph.get('destroyed')) return;
        if (
          !ref.current ||
          !ref.current.scrollWidth ||
          !ref.current.scrollHeight
        )
          return;
        graph.changeSize(ref.current.scrollWidth, ref.current.scrollHeight);
      };
    }
  }, []);

  const createGraphic = () => {
    registerEdge(G6);
    G6.registerNode('tree-node', {
      ...myTreeNode,
      getAnchorPoints() {
        return [
          [0, 0.5],
          [1, 0.5],
        ];
      },
    });

    graph = new G6.TreeGraph({
      container: ref.current,
      width: 800,
      height: 500,
      defaultNode: {
        type: 'tree-node',
      },
      // nodeStateStyles: {
      //   hover: {
      //     fill: 'red'
      //   },
      //   selected: {
      //     fill: '#fff'
      //   }
      // },
      defaultEdge: {
        type: 'my-tree-edge',
      },
      layout: {
        type: 'mindmap',
        direction: 'H',
        getHGap: () => 50,
        getVGap: () => 20,
        getSide: (d) => {
          if (d.data.site === 'left') {
            return 'left';
          }
          return 'right';
        },
      },
      modes: {
        default: ['drag-canvas', 'zoom-canvas', 'click-select'],
      },
      fitView: true,
    });
    appenAutoShapeListener(graph);
    graph.read({ ...data });
    // setgraph(_graph);
    bindEvents();
  };

  const bindEvents = () => {
    graph.on('node:click', (e) => {
      const model = e.item.getModel();

      e.item.toFront();
    });
  };

  return (
    <div style={{ width: '100%', height: '80%' }}>
      <div ref={ref}></div>
    </div>
  );
};

export default EnterpriseAtlas;
