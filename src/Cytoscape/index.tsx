import React, { useState, useEffect, useMemo } from 'react';
import cytoscape from 'cytoscape';
import popper from 'cytoscape-popper';
import Tippy from 'tippy.js';
import 'tippy.js/dist/tippy.css';
import 'tippy.js/themes/light.css';
import defaultStyle from './graphStyle';
import * as d3 from 'd3';
import { IStyles, IData, INodeTooltip } from './types';
cytoscape.use(popper);
type TProps = {
  styles?: IStyles;
  data: IData;
  isShowNodeTip?: boolean;
  nodeTooltip?: INodeTooltip;
  clickNodeIsFocus?: boolean;
  onNodeMouseOver?: (e: any) => void;
  onNodeMouseOut?: (e: any) => void;
  onNodeClick?: (e: any) => void;
};

const PageIndex: React.FC<TProps> = (props) => {
  const [graphContainer, setGraphContainer] = useState<any>(null);
  let popperRef: any = null;
  // const [graphEntId,setGraphEntId] = useState<string>('')
  let cyInit: any = null;
  // let _currentKeyNo = '29453261288626';
  let _currentKeyNo = '9cce0780ab7644008b73bc2120479d31';
  const graphEntId = props.entId;
  const formatGraphStyle = (graphStyle: any) => {
    const finalStyle: any = [];
    Object.keys(graphStyle).forEach((key) => {
      finalStyle.push({ selector: key, style: graphStyle[key] });
    });
    return finalStyle;
  };
  // 数据处理：根据nodeId获取node 索引
  const getNodesIndex = (nodeId: any, nodes: any) =>
    nodes.findIndex((node: any) => nodeId == node.nodeId);

  const getNodeCls = (personId: any) => {
    if (personId !== undefined) {
      return 'person';
    }
    return '';
  };

  // 数据处理：将原始数据转换成graph数据
  const getRootData = (list: any) => {
    let graph: any = { nodes: [], links: [] };

    let rootNode = null;
    list.nodes.forEach((node: any) => {
      let map: any = {
        nodeId: node.id,
        data: node,
        layout: {
          level: null,
        },
        classes: getNodeCls(node.personId),
      };
      // 设置_rootNode
      if (node.id === 0) {
        rootNode = map;
        map.classes = 'center';
      }
      graph.nodes.push(map);
    });

    list.edges.forEach((edge: any, index: number) => {
      let map = {
        data: edge,
        sourceNode: getGraphNode(edge.source, graph.nodes),
        targetNode: getGraphNode(edge.target, graph.nodes),
        linkId: index,
        source: getNodesIndex(edge.source, graph.nodes),
        target: getNodesIndex(edge.target, graph.nodes),
      };

      graph.links.push(map);
    });

    setLevel(rootNode, graph.links);
    return graph;
  };
  //获取相邻的节点

  function getNextNodes(nodeId: any, links: any, parentLevel: any) {
    let nextNodes: any = [];
    links.forEach((link: any) => {
      if (nodeId == link.sourceNode.nodeId && !link.targetNode.layout.level) {
        link.targetNode.layout.level = parentLevel;
        nextNodes.push(link.targetNode);
      } else if (
        nodeId == link.targetNode.nodeId &&
        !link.sourceNode.layout.level
      ) {
        link.sourceNode.layout.level = parentLevel;
        nextNodes.push(link.sourceNode);
      }
    });

    return nextNodes;
  }

  // 数据处理：设置节点层级
  const setLevel = (rootNode: any, links: any) => {
    let level = 1;
    let nodes = [];
    nodes.push(rootNode);
    while (nodes.length) {
      let nextNodes: any = [];
      nodes.forEach((node: any) => {
        node.layout.level = level;
        nextNodes = nextNodes.concat(getNextNodes(node.nodeId, links, level));
      });
      level++;
      nodes = nextNodes;
    }
  };

  // 数据处理：根据nodeId获取node
  const getGraphNode = (nodeId: any, nodes: any) => {
    let nodeIndex = nodes.findIndex((node: any) => {
      return node.nodeId == nodeId;
    });

    return nodeIndex > -1 && nodes[nodeIndex];
  };

  const filterLinks = (graph: any) => {
    // 筛选用于布局的links
    let layoutLinks: any = [];
    graph.links.forEach((link: any) => {
      let sourceLevel = link.sourceNode.layout.level;
      let targetLevel = link.targetNode.layout.level;

      if (
        (sourceLevel == 1 && targetLevel == 2) ||
        (sourceLevel == 2 && targetLevel == 1)
      ) {
        layoutLinks.push(link);
      }
      if (
        (sourceLevel == 2 && targetLevel == 3) ||
        (sourceLevel == 3 && targetLevel == 2)
      ) {
        layoutLinks.push(link);
      }
    });
    layoutLinks.forEach(function (link: any, i: any) {
      if (link.targetNode.layout.level == 3) {
        layoutLinks.forEach(function (alink: any, j: any) {
          if (
            alink.linkId != link.linkId &&
            (alink.targetNode.nodeId == link.targetNode.nodeId ||
              alink.sourceNode.nodeId == link.targetNode.nodeId)
          ) {
            layoutLinks.splice(j, 1);
          }
        });
      }

      if (link.sourceNode.layout.level == 3) {
        layoutLinks.forEach(function (alink: any, j: any) {
          if (
            alink.linkId != link.linkId &&
            (alink.targetNode.nodeId == link.sourceNode.nodeId ||
              alink.sourceNode.nodeId == link.sourceNode.nodeId)
          ) {
            layoutLinks.splice(j, 1);
          }
        });
      }
    });

    return layoutLinks;
  };
  const initD3Data = (graph: any) => {
    //

    /*封装符合d3的数据*/
    graph.nodes = graph.nodes.map((item: any) => ({
      ...item,
      id: item.nodeId,
    }));

    graph.links = graph.links.map((item: any, index: number) => ({
      source: getNodesIndex(item.sourceNode.nodeId, graph.nodes),
      target: getNodesIndex(item.targetNode.nodeId, graph.nodes),
      index,
      ...item,
    }));

    graph.layoutLinks = filterLinks(graph);
    return graph;
  };
  const getD3Position = (graph: any) => {
    graph = initD3Data(graph); //

    var strength = -600,
      distanceMax = 330,
      theta = 0,
      distance = 230,
      colideRadius = 35,
      distanceMin = 400;
    // 根据节点数量调节
    if (graph.nodes.length < 50) {
      strength = -800;
      distanceMax = 400;
    } else if (graph.nodes.length > 50 && graph.nodes.length < 100) {
      strength = -800;
      distanceMax = 350;
      distance = 130;
      colideRadius = 35;
    } else if (graph.nodes.length > 100 && graph.nodes.length < 150) {
      strength = -900;
      distanceMax = 450;
    } else if (graph.nodes.length > 150 && graph.nodes.length < 200) {
      strength = -1000;
      distanceMax = 500;
    } else if (graph.nodes.length > 200) {
      strength = -1600;
      distanceMax = 500;
      (theta = 0.6), (distance = 100), (colideRadius = 35);
    }

    d3.forceSimulation(graph.nodes)
      .force(
        'charge',
        d3
          .forceManyBody()
          .strength(strength)
          .distanceMax(distanceMax)
          .theta(theta),
      )
      .force('link', d3.forceLink(graph.layoutLinks).distance(distance))
      .force('center', d3.forceCenter(900, 500))
      .force(
        'collide',
        d3.forceCollide().radius(function () {
          return colideRadius;
        }),
      );
  };

  //将rootData转换成cy图谱框架所需要的数据结构
  const transformData = (graphData: any) => {
    var els: any = { nodes: [], edges: [] };
    graphData.links.forEach((link: any, i: any) => {
      els.edges.push({
        data: {
          label: link.data.label,
          source: link.sourceNode.nodeId,
          target: link.targetNode.nodeId,
        },
        // classes: link.classes,
      });
    });

    graphData.nodes.forEach((node: any) => {
      els.nodes.push({
        data: {
          nodeId: node.nodeId,
          entId: node.data.entId,
          id: node.nodeId,
          name: node.data.label,
          layout: node.layout,
          d3x: node.x,
          d3y: node.y,
          pic: node.data.pic,
        },
        classes: node.classes,
      });
    });

    return els;
  };
  const toggelBlur = (type: string) => {
    if (type === 'blur') {
      cyInit.collection('node').addClass('blur');
      cyInit.collection('edge').addClass('blur');
    } else {
      cyInit.collection('node').removeClass('blur');
      cyInit.collection('edge').removeClass('blur');
    }
  };
  const handleNodeClick = (e: any) => {
    let node = e.target;
    if (props.clickNodeIsFocus) {
      toggelBlur('blur');
      node.removeClass('blur');
      node.neighborhood('edge').removeClass('blur');
      node.neighborhood('edge').connectedNodes().removeClass('blur');
    }
    props.onNodeClick && props.onNodeClick(node);
  };
  const onMouseOver = (e: any) => {
    if (props.isShowNodeTip) {
      let node = e.target;
      let ref: any = node.popperRef();
      let dummyDomEle: any = document.createElement('div');

      popperRef = new (Tippy as any)(dummyDomEle, {
        // tippy props:
        getReferenceClientRect: ref.getBoundingClientRect,
        trigger: 'manual',
        theme: 'light',
        arrow: false,
        offset: [0, 10],
        ...props.nodeTooltip,
        content:
          '的方式的历史考虑到法拉利可是到了开发打算考虑到加拉加斯的绿卡暑假快乐到家啊阿喀琉斯建档立卡技术的卢卡斯ask了解大世界酒店商',
      });
      popperRef.show();
    }
    props.onNodeMouseOver && props.onNodeMouseOver(e);
  };
  const onMouseOut = (e: any) => {
    if (props.isShowNodeTip) {
      let node = e.target;

      popperRef && popperRef.destroy();
    }
    props.onNodeMouseOut && props.onNodeMouseOut(e);
  };
  const handleClick = (e: any) => {
    if (e.target === cyInit && props.clickNodeIsFocus) {
      toggelBlur('focus');
    }
  };
  const bindEvent = (cyInit: any) => {
    cyInit
      .on('click', 'node', handleNodeClick)
      .on('mouseover', 'node', onMouseOver)
      .on('mouseout', 'node', onMouseOut)
      .on('click', handleClick)
      .ready(() => {
        cyInit.zoom(1);
      });
  };
  const drawGraph = (elements: any) => {
    cyInit = cytoscape({
      container: graphContainer,
      motionBlur: false,
      textureOnViewport: false,
      wheelSensitivity: 0.1,
      elements: elements,
      minZoom: 0.4,
      maxZoom: 2.5,
      layout: {
        name: 'preset',
      },
      style: formatGraphStyle(defaultStyle.defaultStyle),
    });

    // 定位
    cyInit.nodes().positions((node: any, i: any) => {
      // 保持居中
      if (node._private.data.id == 0) {
        var position = cyInit.pan();
        cyInit.pan({
          x: position.x - node._private.data.d3x,
          y: position.y - node._private.data.d3y,
        });
      }

      //
      return {
        x: node._private.data.d3x,
        y: node._private.data.d3y,
      };
    });
    //绑定事件
    bindEvent(cyInit);
  };
  // 图谱、筛选面板更新
  const domUpdate = (graphData: any) => {
    getD3Position(graphData);

    setTimeout(() => {
      drawGraph(transformData(graphData));
    }, 500);
  };

  useEffect(() => {
    if (graphContainer && props?.data?.nodes?.length > 0) {
      let res = getRootData(props.data);
      domUpdate(res);
    }
  }, [graphContainer, props.data]);

  return (
    <>
      <div ref={setGraphContainer} style={{ height: '100vh', width: '100%' }} />
    </>
  );
};

PageIndex.defaultProps = {
  nodeTooltip: {
    placement: 'bottom',
    duration: 1000,
  },
  isShowNodeTip: true,
  clickNodeIsFocus: true,
};
export default PageIndex;
