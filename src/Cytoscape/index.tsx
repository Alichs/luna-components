import React, { useState, useEffect, useMemo } from 'react';
import cytoscape from 'cytoscape';
import popper from 'cytoscape-popper';
import Tippy from 'tippy.js';
import 'tippy.js/dist/tippy.css';
import 'tippy.js/themes/light.css';
import defaultStyle from './graphStyle';
import { IStyles, IData, INodeTooltip } from './types';
import { transformToGraphData, getDataPosition } from './utils';
cytoscape.use(popper);
type TProps = {
  styles?: IStyles;
  data: IData;
  isShowNodeTip?: boolean;
  isShowEdgeTip?: boolean;
  width?: number | string;
  height?: number | string;
  nodeTooltip?: INodeTooltip;
  edgeTooltip?: INodeTooltip;
  clickNodeIsFocus?: boolean;
  onNodeMouseOver?: (e: any) => void;
  onNodeMouseOut?: (e: any) => void;
  onMouseOutLine?: (e: any) => void;
  onMouseOverLine?: (e: any) => void;
  onNodeClick?: (e: any) => void;
};

const PageIndex: React.FC<TProps> = (props) => {
  const [graphContainer, setGraphContainer] = useState<any>(null);
  let popperRef: any = null;
  let popperEdgeRef: any = null;
  let cyInit: any = null;
  const formatGraphStyle = (graphStyle: any) => {
    const finalStyle: any = [];
    let style = {
      ...graphStyle,
      ...props.styles,
      node: { ...graphStyle.node, ...props.styles?.node },
      edge: { ...graphStyle.edge, ...props.styles?.edge },
    };
    Object.keys(style).forEach((key) => {
      finalStyle.push({ selector: key, style: style[key] });
    });
    return finalStyle;
  };
  //将rootData转换成cy图谱框架所需要的数据结构
  const transformData = (graphData: any) => {
    let els: any = { nodes: [], edges: [] };
    graphData.links.forEach((link: any, i: any) => {
      els.edges.push({
        data: link.data,
        classes: link.classes,
      });
    });

    graphData.nodes.forEach((node: any) => {
      els.nodes.push({
        data: {
          ...node.data,
          entId: node.data.entId,
          id: node.id,
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
    //聚焦
    if (type === 'focus') {
      cyInit.collection('node').addClass('blur');
      cyInit.collection('edge').addClass('blur');
    } else {
      cyInit.collection('node').removeClass('blur');
      cyInit.collection('edge').removeClass('blur').removeClass('focus');
    }
  };
  //点击node节点
  const handleNodeClick = (e: any) => {
    let node = e.target;
    if (props.clickNodeIsFocus) {
      toggelBlur('focus');
      node.removeClass('blur');
      node.neighborhood('edge').removeClass('blur');
      node.neighborhood('edge').addClass('focus');
      node.neighborhood('edge').connectedNodes().removeClass('blur');
    }
    props.onNodeClick && props.onNodeClick(node);
  };
  const onMouseNodeOver = (e: any) => {
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
        duration: 2000,
        content:
          '的方式的历史考虑到法拉利可是到了开发打算考虑到加拉加斯的绿卡暑假快乐到家啊阿喀琉斯建档立卡技术的卢卡斯ask了解大世界酒店商',
        ...props.nodeTooltip,
      });
      popperRef.show();
    }
    props.onNodeMouseOver && props.onNodeMouseOver(e.target);
  };
  const onMouseNodeOut = (e: any) => {
    if (props.isShowNodeTip) {
      popperRef && popperRef.destroy();
    }
    props.onNodeMouseOut && props.onNodeMouseOut(e.target);
  };
  const handleClick = (e: any) => {
    if (e.target === cyInit && props.clickNodeIsFocus) {
      toggelBlur('blur');
    }
  };
  const onMouseOverLine = (e: any) => {
    let edge = e.target;
    edge.addClass('hover');
    if (props.isShowEdgeTip) {
      let ref: any = edge.popperRef();
      let percent = edge.data().investRatio;
      if (percent) {
        percent = Number(percent).toFixed(2);
        let dummyDomEle: any = document.createElement('div');

        popperEdgeRef = new (Tippy as any)(dummyDomEle, {
          // tippy props:
          getReferenceClientRect: ref.getBoundingClientRect,
          trigger: 'manual',
          arrow: false,
          offset: [0, 10],
          duration: 2000,
          content: `投资占比${percent}%`,
          ...props.nodeTooltip,
        });
        popperEdgeRef.show();
      }
    }
    props.onMouseOverLine && props.onMouseOverLine(e.target);
  };
  const onMouseOutLine = (e: any) => {
    let edge = e.target;
    edge.removeClass('hover');
    if (props.isShowEdgeTip) {
      popperEdgeRef && popperEdgeRef.destroy();
    }
    props.onMouseOutLine && props.onMouseOutLine(e.target);
  };
  const bindEvent = (cyInit: any) => {
    cyInit
      .on('click', 'node', handleNodeClick)
      .on('mouseover', 'node', onMouseNodeOver)
      .on('mouseout', 'node', onMouseNodeOut)
      .on('click', handleClick)
      .on('mouseover', 'edge', onMouseOverLine)
      .on('mouseout', 'edge', onMouseOutLine)
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
  const domUpdate = async (graphData: any) => {
    let data = await getDataPosition(graphData);
    drawGraph(transformData(data));
    setTimeout(() => {}, 500);
  };

  useEffect(() => {
    if (graphContainer && props?.data?.nodes?.length > 0) {
      let res = transformToGraphData(props.data);

      domUpdate(res);
    }
  }, [graphContainer, props.data]);

  return (
    <>
      <div
        ref={setGraphContainer}
        style={{ height: props.height, width: props.width }}
      />
    </>
  );
};

PageIndex.defaultProps = {
  nodeTooltip: {
    placement: 'bottom',
    duration: 2000,
  },
  isShowNodeTip: true,
  isShowEdgeTip: true,
  clickNodeIsFocus: true,
  width: '100%',
  height: '100vh',
};
export default PageIndex;
