import React, { useEffect, useRef, useState } from 'react';
import G6 from '@antv/g6';
import registerEdge from './register/registerEdge';
import registerNode, { registerRoot } from './register/registerNode';

interface PropsType {
  sourceData: any;
  width?: number | string;
  height?: number | string;
  isHover: boolean; // 是否需要鼠标滑上效果，效果配置在数据中stateStyles
  hGap: number;
  vGap: number;
  onNodeClick?: (e: any, graph: any, G6: any) => void; // 节点点击事件
  onNodeMouseEnter: (e: any, graph: any, G6: any) => void;
  onNodeMouseLeave: (e: any, graph: any, G6: any) => void;
}

const QKTreeGraphV: React.FC<PropsType> = (props) => {
  const [myGraph, setMyGraph] = useState(null);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!myGraph) {
      createGraphic();
    }
    return () => {
      // 销毁画布
      if (myGraph) {
        myGraph.destroy();
      }
    };
  }, []);

  const createGraphic = () => {
    registerEdge(G6);
    registerNode(G6);
    registerRoot(G6);

    const graph = new G6.TreeGraph({
      container: ref.current!,
      width: ref.current!.clientWidth,
      height: ref.current!.scrollHeight,
      defaultNode: {
        anchorPoints: [
          [0.5, 0],
          [0.5, 1],
        ],
      },
      defaultEdge: {
        type: 'tree-edge',
      },
      layout: {
        type: 'compactBox',
        direction: 'V',
        getHGap: () => props.hGap,
        getVGap: () => props.vGap,
        getSide: (d) => {
          if (d.data.side == 'left') {
            return 'left';
          }
          return 'right';
        },
      },
      modes: {
        default: ['drag-canvas', 'zoom-canvas'],
      },
      minZoom: 0,
      maxZoom: 10,
      // linkCenter: true
    });

    graph.node((node) => {
      const { depth } = node;
      if (depth === 0) {
        return {
          id: node.id,
          type: 'root-node',
        };
      }
      return {
        id: node.id,
        type: 'tree-node',
      };
    });

    graph.data(props.sourceData);
    graph.render();
    graph.fitView();
    bindEvents(graph);
    setMyGraph(graph);
  };

  const handleNodeClick = (e: any, graph: any, G6: any) => {
    const model = e.item.getModel();
    const { name } = e.target.cfg;
    const { isScalable } = model;
    if (
      (name === 'collapse-icon' ||
        name === 'rect-node' ||
        name === 'rect-node-text' ||
        name === 'node-conprop' ||
        name === 'bottom-node' ||
        name === 'bottom-node-text') &&
      isScalable
    ) {
      if (props.onNodeClick) {
        props.onNodeClick(e, graph, G6);
      }
    }
  };

  // 注册事件
  const bindEvents = (graph) => {
    graph.on('node:click', (e) => {
      handleNodeClick(e, graph, G6);
    });
    // 鼠标滑上事件
    // isPerson=0为公司，isPerson=1为人
    // 人物需要获取器对应的公司的entId，及父节点的父节点dataId
    // console.log(e.item._cfg.parent._cfg.parent.getModel(), '------');
    graph.on('node:mouseenter', (e) => {
      const { name } = e.target.cfg;
      if (
        name === 'rect-node' ||
        name === 'rect-node-text' ||
        name === 'node-conprop' ||
        name === 'bottom-node' ||
        name === 'bottom-node-text'
      ) {
        // 设置hover效果
        if (props.isHover) {
          e.item.setState('hover', true);
        }
        props.onNodeMouseEnter && props.onNodeMouseEnter(e, graph, G6);
      }
    });
    // 鼠标离开效果
    graph.on('node:mouseleave', (e) => {
      // 取消hover效果
      if (props.isHover) {
        e.item.setState('hover', false);
      }
      props.onNodeMouseLeave && props.onNodeMouseLeave(e, graph, G6);
    });
    // canvas的点击事件，鼠标左键
    graph.on('canvas:click', (e) => {});
    // canvas的点击事件，鼠标右键
    graph.on('canvas:dblclick', (e) => {});
    // canvas的拖拽事件
    graph.on('canvas:dragstart', (e) => {});
    // 滚轮缩放
    graph.on('wheelzoom', (e) => {});
    // 调用 graph.moveTo，graph.translate，或 graph.zoom 均会触发该事件
    graph.on('viewportchange', (e) => {});
  };

  return (
    <div
      ref={ref}
      style={{
        width: props.width,
        maxHeight: props.height,
        height: props.height,
      }}
    ></div>
  );
};

QKTreeGraphV.defaultProps = {
  isHover: false,
  width: 800,
  height: 500,
  hGap: 80,
  vGap: 78,
};

export default QKTreeGraphV;
