import * as d3 from 'd3';
//有personId 节点为人，没有为公司
const getNodeCls = (personId: any) => {
  if (personId !== undefined) {
    return 'person';
  }
  return '';
};
// 数据处理：根据id获取node
const getGraphNode = (id: any, nodes: any) => {
  let nodeIndex = nodes.findIndex((node: any) => node.id == id);

  return nodeIndex > -1 && nodes[nodeIndex];
};
// 数据处理：根据node Id获取node 索引
const getNodesIndex = (id: any, nodes: any) =>
  nodes.findIndex((node: any) => id == node.id);

//获取相互连接的节点
const getNeighborNodes = (id: any, links: any, parentLevel: any) => {
  let nextNodes: any = [];
  links.forEach((link: any) => {
    if (id == link.sourceNode.id && !link.targetNode.layout.level) {
      link.targetNode.layout.level = parentLevel;
      nextNodes.push(link.targetNode);
    } else if (id == link.targetNode.id && !link.sourceNode.layout.level) {
      link.sourceNode.layout.level = parentLevel;
      nextNodes.push(link.sourceNode);
    }
  });

  return nextNodes;
};

// 数据处理：设置节点层级
const setLevel = (rootNode: any, links: any) => {
  let level = 1;
  let nodes = [];
  nodes.push(rootNode);
  while (nodes.length) {
    let nextNodes: any = [];
    nodes.forEach((node: any) => {
      node.layout.level = level;
      nextNodes = nextNodes.concat(getNeighborNodes(node.id, links, level));
    });
    level++;
    nodes = nextNodes;
  }
};

// 数据处理：将原始数据转换成graph数据
export const transformToGraphData = (list: any) => {
  let graph: any = { nodes: [], links: [] };

  let rootNode = null;
  list.nodes.forEach((node: any) => {
    let map: any = {
      id: node.id,
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
    let sourceNode = getGraphNode(edge.source, graph.nodes);
    let targetNode = getGraphNode(edge.target, graph.nodes);
    let classes = '';
    // if (sourceNode.data.personId || targetNode.data.personId) {
    //     classes = 'person'
    // }
    let map = {
      data: edge,
      classes,
      sourceNode,
      targetNode,
      linkId: index,
      source: getNodesIndex(edge.source, graph.nodes),
      target: getNodesIndex(edge.target, graph.nodes),
    };

    graph.links.push(map);
  });

  setLevel(rootNode, graph.links);
  return graph;
};
//过滤掉一些相交叉的连线
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
          (alink.targetNode.id == link.targetNode.id ||
            alink.sourceNode.id == link.targetNode.id)
        ) {
          layoutLinks.splice(j, 1);
        }
      });
    }

    if (link.sourceNode.layout.level == 3) {
      layoutLinks.forEach(function (alink: any, j: any) {
        if (
          alink.linkId != link.linkId &&
          (alink.targetNode.id == link.sourceNode.id ||
            alink.sourceNode.id == link.sourceNode.id)
        ) {
          layoutLinks.splice(j, 1);
        }
      });
    }
  });

  return layoutLinks;
};
//将图谱数据转换成d3需要的数据格式
const transformToD3Data = (graph: any) => {
  //

  /*封装符合d3的数据*/
  graph.nodes = graph.nodes.map((item: any) => ({
    ...item,
    id: item.id,
  }));

  graph.links = graph.links.map((item: any, index: number) => ({
    source: getNodesIndex(item.sourceNode.id, graph.nodes),
    target: getNodesIndex(item.targetNode.id, graph.nodes),
    index,
    ...item,
  }));

  graph.layoutLinks = filterLinks(graph);
  return graph;
};

//通过d3布局获取到相关节点的 xy坐标

export const getDataPosition = (graph: any) => {
  graph = transformToD3Data(graph); //
  return new Promise((res) => {
    let strength = -600,
      distanceMax = 330,
      theta = 0,
      distance = 230,
      colideRadius = 35;
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
    setTimeout(() => {
      res(graph);
    }, 500);
  });
};
