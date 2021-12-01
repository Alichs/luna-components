import React, { useState, useEffect, useMemo } from 'react';
import cytoscape from 'cytoscape';
import graphStyle from './graphStyle';
import * as d3 from 'd3';
import { data } from './data1';
type TProps = {};

const PageIndex = (props: TProps) => {
  const [graphContainer, setGraphContainer] = useState<any>(null);
  const [cy, setCy] = useState<any>(null);
  let _currentKeyNo = '9cce0780ab7644008b73bc2120479d31';
  const formatGraphStyle = (graphStyle: any) => {
    const finalStyle: any = [];
    Object.keys(graphStyle).forEach((key) => {
      finalStyle.push({ selector: key, style: graphStyle[key] });
    });
    return finalStyle;
  };

  useEffect(() => {}, []);
  const elementsData = useMemo(() => {
    let nodes = data.nodes.map((item) => {
      return { data: item };
    });
    let edges = data.edges.map((item) => {
      return {
        data: {
          source: item.startNode,
          target: item.endNode,
        },
      };
    });
    return { nodes, edges };
  }, [data]);

  // 数据处理：根据nodeId获取node 索引
  const getNodesIndex = (nodeId: any, nodes: any) =>
    nodes.findIndex((node: any) => nodeId == node.nodeId);

  const getNodeCls = (label: any) => {
    if (label.includes('Person')) {
      return 'person';
    }
  };

  // 数据处理：将原始数据转换成graph数据
  function getRootData(list: any) {
    let graph: any = { nodes: [], links: [] };

    let rootNode = null;
    list.nodes.forEach((node: any) => {
      let map: any = {
        nodeId: node.id,
        data: {
          obj: node,
        },
        layout: {
          level: null,
        },
        classes: getNodeCls(node.labels),
      };
      // 设置_rootNode
      if (_currentKeyNo == node.properties.keyNo) {
        rootNode = map;
        map.classes = 'center';
      }
      graph.nodes.push(map);
    });

    list.edges.forEach((edge: any) => {
      let map = {
        data: {
          obj: edge,
        },
        sourceNode: getGraphNode(edge.startNode, graph.nodes),
        targetNode: getGraphNode(edge.endNode, graph.nodes),
        linkId: edge.id,
        source: getNodesIndex(edge.startNode, graph.nodes),
        target: getNodesIndex(edge.endNode, graph.nodes),
      };

      graph.links.push(map);
    });

    setLevel(rootNode, graph.links);
    return graph;
  }
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

  const drawGraph = (elements: any) => {
    debugger;
    let cyInit = cytoscape({
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
      style: formatGraphStyle(graphStyle.groupStyle),
    });
    // cyInit.center()
    setCy(cyInit);

    // 定位
    cyInit.nodes().positions(function (node, i) {
      // 保持居中
      if (node._private.data.keyNo == _currentKeyNo) {
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

    cyInit.ready(function () {
      cyInit.zoom(1);
    });
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
      distance = 130,
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

  const getLinkLabel = (link: any) => {
    var type = link.data.obj.type,
      role = link.data.obj.properties.role;
    if (type == 'INVEST') {
      return '投资';
    } else if (type == 'EMPLOY') {
      return role ? role : '任职';
    } else if (type == 'LEGAL') {
      return '法定代表人';
    }
  };

  //将rootData转换成cy图谱框架所需要的数据结构
  const transformData = (graphData: any) => {
    var els: any = { nodes: [], edges: [] };

    graphData.links.forEach((link: any, i: any) => {
      var label = getLinkLabel(link);

      els.edges.push({
        data: {
          data: link.data,
          id: link.linkId,
          label: label,
          source: link.sourceNode.nodeId,
          target: link.targetNode.nodeId,
        },
        classes: link.classes,
      });
    });

    graphData.nodes.forEach((node: any) => {
      els.nodes.push({
        data: {
          nodeId: node.nodeId,
          type: node.data.obj.labels[0],
          keyNo: node.data.obj.properties.keyNo,
          data: node.data,
          id: node.nodeId,
          name: node.data.obj.properties.name,
          layout: node.layout,
          d3x: node.x,
          d3y: node.y,
        },
        classes: node.classes,
      });
    });

    return els;
  };

  // 图谱、筛选面板更新
  const domUpdate = (graphData: any) => {
    getD3Position(graphData);

    setTimeout(function () {
      drawGraph(transformData(graphData));
    }, 500);
  };

  useEffect(() => {
    if (graphContainer) {
      let res = getRootData(data);
      domUpdate(res);
    }
  }, [graphContainer]);

  return (
    <div ref={setGraphContainer} style={{ height: '100vh', width: '100%' }} />
  );
};

export default PageIndex;
