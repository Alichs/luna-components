import React, { useState, useEffect, useMemo } from 'react';
import cytoscape from 'cytoscape';
import coseBilkent from 'cytoscape-cose-bilkent'; // 布局
import graphStyle from './graphStyle';
import { data } from './data1';
//import { data } from './data'
import './index.less';
type TProps = {};
coseBilkent(cytoscape);

const PageIndex = (props: TProps) => {
  const [graphContainer, setGraphContainer] = useState<any>(null);
  const [cy, setCy] = useState<any>(null);
  const [isFull, setIsFull] = useState(false);

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
  useEffect(() => {
    if (graphContainer) {
      let cyInit = cytoscape({
        container: graphContainer,
        elements: elementsData,
        style: formatGraphStyle(graphStyle.groupStyle),
        layout: {
          name: 'cose-bilkent',
          idealEdgeLength: 240, //理想的边长度
          componentSpacing: 40,
          nestingFactor: 12,
          // fit: true, 					// Whether to fit the network view after
          // nodeDimensionsIncludeLabels: false,
          // animate: 'end',
          // animationEasing: 'ease-out',
          // animationDuration: 1000,
          // randomize: true,
          // tile: true 				// Whether to tile disconnected nodes
        },
      });
      // cyInit.center()
      setCy(cyInit);
    }
  }, [graphContainer]);
  const onLayoutStop = () => {
    console.log('11');
  };
  const toggle = () => {
    setIsFull(!isFull);
  };

  return (
    <>
      <div className={isFull ? 'fullscreen' : ''}>
        <button onClick={toggle}>全屏</button>
        <div ref={setGraphContainer} />
      </div>
    </>
  );
};

export default PageIndex;
