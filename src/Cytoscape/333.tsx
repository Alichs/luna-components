import React from 'react';
import d3 from 'd3';
import cytoscape from 'cytoscape';

const PageIndex = () => {
  // 数据处理：根据nodeId获取node 索引
  function getNodesIndex(nodeId, nodes) {
    var index = 0;
    for (var i = 0; i < nodes.length; i++) {
      var node = nodes[i];
      if (nodeId == node.nodeId) {
        index = i;
        break;
      }
    }
    return index;
  }
  // 数据处理：将原始数据转换成graph数据
  function getRootData(list) {
    var graph = {};
    graph.nodes = [];
    graph.links = [];

    //graph.nodes
    for (var i = 0; i < list.length; i++) {
      var nodes = list[i].graph.nodes;
      for (var j = 0; j < nodes.length; j++) {
        var node = nodes[j];
        var o = {};
        o.nodeId = node.id;
        o.data = {};
        o.data.obj = node;
        //o.data.showStatus = 'NORMAL'; // NORMAL HIGHLIGHT DULL
        o.data.showStatus = null; // NORMAL HIGHLIGHT DULL
        o.layout = {};
        o.layout.level = null; // 1 当前查询节点
        o.layout.singleLinkChildren = []; // 只连接自己的node
        graph.nodes.push(o);

        // 设置_rootNode
        if (_currentKeyNo == o.data.obj.properties.keyNo) {
          _rootNode = o;
        }
      }
    }

    //graph.links
    for (var i = 0; i < list.length; i++) {
      var relationships = list[i].graph.relationships;

      for (var k = 0; k < relationships.length; k++) {
        var relationship = relationships[k];
        var o = {};
        o.data = {};
        o.data.obj = relationship;
        //o.data.showStatus = 'NORMAL'; // NORMAL HIGHLIGHT DULL
        o.data.showStatus = null; // NORMAL HIGHLIGHT DULL
        o.sourceNode = getGraphNode(relationship.startNode, graph.nodes);
        o.targetNode = getGraphNode(relationship.endNode, graph.nodes);
        o.linkId = relationship.id;
        o.source = getNodesIndex(relationship.startNode, graph.nodes);
        o.target = getNodesIndex(relationship.endNode, graph.nodes);
        graph.links.push(o);
      }
    }

    setLevel(graph.nodes, graph.links);
    setCategoryColor(graph.nodes, graph.links);
    return graph;
  }

  // 数据处理：设置节点层级
  function setLevel(svg_nodes, svg_links) {
    function getNextNodes(nodeId, links, parentLevel) {
      var nextNodes = [];
      for (var i = 0; i < links.length; i++) {
        var link = links[i];
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
      }

      return nextNodes;
    }

    var level = 1;
    var nodes = [];
    nodes.push(_rootNode);
    while (nodes.length) {
      var nextNodes = [];
      for (var i = 0; i < nodes.length; i++) {
        var node = nodes[i];
        node.layout.level = level;
        nextNodes = nextNodes.concat(
          getNextNodes(node.nodeId, svg_links, level),
        );
      }
      level++;
      nodes = nextNodes;
    }
  }

  // 数据处理：设置节点角色
  function setCategoryColor(nodes, links) {
    for (var i = 0; i < links.length; i++) {
      var sameLink = {}; // 两点间连线信息
      sameLink.length = 0; // 两点间连线数量
      sameLink.currentIndex = 0; // 当前线索引
      sameLink.isSetedSameLink = false;
      links[i].sameLink = sameLink;
    }

    /*链接相同两点的线*/
    for (var i = 0; i < links.length; i++) {
      var baseLink = links[i];

      if (baseLink.sameLink.isSetedSameLink == false) {
        baseLink.sameLink.isSetedSameLink = true;
        var nodeId1 = baseLink.sourceNode.nodeId;
        var nodeId2 = baseLink.targetNode.nodeId;

        var sameLinks = [];
        sameLinks.push(baseLink);
        for (var j = 0; j < links.length; j++) {
          var otherLink = links[j];
          if (
            baseLink.linkId != otherLink.linkId &&
            !otherLink.sameLink.isSetedSameLink
          ) {
            if (
              (otherLink.sourceNode.nodeId == nodeId1 &&
                otherLink.targetNode.nodeId == nodeId2) ||
              (otherLink.sourceNode.nodeId == nodeId2 &&
                otherLink.targetNode.nodeId == nodeId1)
            ) {
              sameLinks.push(otherLink);
              otherLink.sameLink.isSetedSameLink = true;
            }
          }
        }

        for (var k = 0; k < sameLinks.length; k++) {
          var oneLink = sameLinks[k];
          oneLink.sameLink.length = sameLinks.length; // 两点间连线数量
          oneLink.sameLink.currentIndex = k; // 当前线索引
        }
      }
    }

    for (var i = 0; i < nodes.length; i++) {
      var node = nodes[i];
      if (_currentKeyNo == node.data.obj.properties.keyNo) {
        // 当前节点
        node.data.color = _COLOR.node.current;
        node.data.strokeColor = _COLOR.border.current;
      } else if (node.data.obj.labels[0] == 'Company') {
        node.data.color = _COLOR.node.company;
        node.data.strokeColor = _COLOR.border.company;
      } else {
        node.data.color = _COLOR.node.person;
        node.data.strokeColor = _COLOR.border.person;
      }
    }
  }

  // 数据处理：根据nodeId获取node
  function getGraphNode(nodeId, nodes) {
    var node = null;
    for (var i = 0; i < nodes.length; i++) {
      if (nodes[i].nodeId == nodeId) {
        node = nodes[i];
        break;
      }
    }
    return node;
  }

  function drawGraph(elements) {
    _currentKeyNo,
      (_companyRadius = 35),
      (_personRadius = 15),
      (_circleMargin = 10),
      (_circleBorder = 3);
    let cy = cytoscape({
      container: document.getElementById('MainCy'),
      motionBlur: false,
      textureOnViewport: false,
      wheelSensitivity: 0.1,
      elements: elements,
      minZoom: 0.4,
      maxZoom: 2.5,
      layout: {
        name: 'preset',
        // componentSpacing: 40,
        // nestingFactor: 12,
        // padding: 10,
        // edgeElasticity: 800,
        stop: function (e) {},
      },
    });

    // 定位
    cy.nodes().positions(function (node, i) {
      // 保持居中
      if (node._private.data.keyNo == _currentKeyNo) {
        var position = cy.pan();
        cy.pan({
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

    cy.ready(function () {
      cy.zoom({
        level: 1.0000095043745896, // the zoom level
      });
    });
  }

  /**其他*/

  function getD3Position(graph) {
    //getLayoutNode(graph);

    function filterLinks1(graph) {
      // 筛选用于布局的links
      var layoutLinks = [];
      for (var i = 0; i < graph.links.length; i++) {
        var link = graph.links[i];
        var sourceLevel = link.sourceNode.layout.level;
        var targetLevel = link.targetNode.layout.level;
        var sourceNode = link.sourceNode;
        var targetNode = link.targetNode;
        //            sourceNode.layout.isSetLink = false;
        //            targetNode.layout.isSetLink = false;

        //            if(!sourceNode.layout.isSetLink && !targetNode.layout.isSetLink){
        if (
          (sourceLevel == 1 && targetLevel == 2) ||
          (sourceLevel == 2 && targetLevel == 1)
        ) {
          //                    sourceNode.layout.isSetLink = true;
          //                    targetNode.layout.isSetLink = true;
          layoutLinks.push(link);
        }
        if (
          (sourceLevel == 2 && targetLevel == 3) ||
          (sourceLevel == 3 && targetLevel == 2)
        ) {
          //                    sourceNode.layout.isSetLink = true;
          //                    targetNode.layout.isSetLink = true;
          layoutLinks.push(link);
        }
        //            }
      }

      layoutLinks.forEach(function (link, i) {
        if (link.targetNode.layout.level == 3) {
          layoutLinks.forEach(function (alink, j) {
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
          layoutLinks.forEach(function (alink, j) {
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
    }

    function initD3Data(graph) {
      //
      function getIndex(val, arr) {
        var index = 0;
        for (var i = 0; i < arr.length; i++) {
          var obj = arr[i];
          if (val == obj.nodeId) {
            index = i;
            break;
          }
        }
        return index;
      }

      /*封装符合d3的数据*/
      for (var i = 0; i < graph.nodes.length; i++) {
        var node = graph.nodes[i];
        node.id = node.nodeId;
      }

      for (var i = 0; i < graph.links.length; i++) {
        var link = graph.links[i];
        link.source = getIndex(link.sourceNode.nodeId, graph.nodes);
        link.target = getIndex(link.targetNode.nodeId, graph.nodes);
        link.index = i; //
      }

      graph.layoutLinks = filterLinks1(graph);

      // // 围绕节点最大数值
      // setSingleLinkNodes(graph.layoutLinks);
      // graph.nodes.forEach(function (node, i) {
      //     if (node.layout.singleLinkChildren.length && _maxChildrenLength < node.layout.singleLinkChildren.length) {
      //         _maxChildrenLength = node.layout.singleLinkChildren.length
      //     }
      // })
      //console.log('围绕节点最大数值:' + _maxChildrenLength);
    }

    initD3Data(graph); //

    var width = $('#MainD3 svg').width();
    var height = $('#MainD3 svg').height();

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
    // 根据围绕数量调节
    if (_maxChildrenLength > 50 && _maxChildrenLength < 100) {
      strength = -2000;
      distanceMax = 500;
    } else if (_maxChildrenLength > 1000 && _maxChildrenLength < 2000) {
      strength = -4000;
      distanceMax = 1500;
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
      .force('center', d3.forceCenter(width / 2, height / 2))
      .force(
        'collide',
        d3.forceCollide().radius(function () {
          return colideRadius;
        }),
      );
  }

  //将rootData转换成cy图谱框架所需要的数据结构
  function transformData(graphData) {
    function getLinkColor(type) {
      if (type == 'INVEST') {
        return _COLOR.line.invest;
      } else if (type == 'EMPLOY') {
        return _COLOR.line.employ;
      } else if (type == 'LEGAL') {
        return _COLOR.line.legal;
      }
    }

    function getLinkLabel(link) {
      var type = link.data.obj.type,
        role = link.data.obj.properties.role;
      if (type == 'INVEST') {
        return '投资';
      } else if (type == 'EMPLOY') {
        return role ? role : '任职';
      } else if (type == 'LEGAL') {
        return '法定代表人';
      }
    }

    //getLayoutNode(graphData);

    //
    id = graphData.nodes[0].nodeId;
    var els = {};
    els.nodes = [];
    els.edges = [];

    graphData.links.forEach(function (link, i) {
      var color = getLinkColor(link.data.obj.type);
      var label = getLinkLabel(link);

      els.edges.push({
        data: {
          data: link.data,
          color: color,
          id: link.linkId,
          label: label,
          source: link.sourceNode.nodeId,
          target: link.targetNode.nodeId,
        },
        classes: 'autorotate',
      });
    });

    graphData.nodes.forEach(function (node) {
      els.nodes.push({
        data: {
          nodeId: node.nodeId,
          type: node.data.obj.labels[0],
          keyNo: node.data.obj.properties.keyNo,
          data: node.data,
          id: node.nodeId,
          name: node.data.obj.properties.name,
          category: node.data.category,
          color: node.data.color,
          borderColor: node.data.strokeColor,
          layout: node.layout,
          d3x: node.x,
          d3y: node.y,
          hasImage: node.data.obj.properties.hasImage,
          //labelLine:1 // 解决文字行距问题，第1行
        },
      });
    });

    return els;
  }

  // 图谱、筛选面板更新
  function domUpdate(graphData) {
    getD3Position(graphData);

    setTimeout(function () {
      drawGraph(transformData(graphData));
    }, 500);
  }

  function getData(keyNo, param) {
    _rootData = getRootData(data);
    domUpdate(_rootData);
  }
};
export default PageIndex;
