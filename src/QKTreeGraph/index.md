---
nav:
  title: 组件
  path: /components
group:
  path: /business
  title: 业务组件
  order: 1
---

## QKTreeGraph

Demo:

```tsx
import React, { useState } from 'react';
import { QKTreeGraph, GraphTooltip } from 'qk-components';
import { dataTransform } from './utils/index';
import { data, getData } from './config/data';
import { tooltipData } from '../GraphTooltip/data';
dataTransform(data);

export default () => {
  const [tooltipShow, setTooltipShow] = useState(false); // 是否显示tooltip
  const [tooltipX, setTooltipX] = useState(0); // tooltip x轴坐标
  const [tooltipY, setTooltipY] = useState(0); // tooltip y轴坐标
  const [timer, setTimer] = useState(null);
  let flag = false;

  let clickCount = 1;

  // 点击获取子树数据添加到图谱
  const handleNodeClick = (e: any, graph: any, G6: any) => {
    clickCount++;
    const model = e.item.getModel();
    const { collapsed, children } = e.item.getModel();
    if (model.children?.length === 0 || !model.children) {
      model.collapsed = !collapsed;
      if (!children) {
        model.children = [];
      }
      const result = getData(clickCount);
      dataTransform(result);
      model.children = result.children;
      graph.updateItem(e.item, model);
      graph.changeData();
      graph.focusItem(e.item, true);
    } else {
      model.collapsed = !collapsed;
      graph.updateItem(e.item, model);
      graph.layout();
      graph.focusItem(e.item, true);
    }
  };

  // 节点滑上事件
  const handleNodeMouseEnter = (e: any, graph: any, G6: any) => {
    flag = true;
    clearTimeout(timer);
    const { x, y, invseRoundName } = e.item.getModel();
    const canvasXY = graph.getCanvasByPoint(x, y);
    // 缩放比例
    const zoom = graph.getZoom();
    const num = invseRoundName ? 100 : 78;
    setTooltipX(canvasXY.x);
    setTooltipY(canvasXY.y + num * zoom);
    setTooltipShow(true);
  };

  // 节点离开事件
  const handleNodeMouseLeave = (e: any, graph: any, G6: any) => {
    flag = false;
    const newTimer = setTimeout(() => {
      !flag && setTooltipShow(false);
    }, 600);
    setTimer(newTimer);
  };

  const mouseEnter = () => {
    clearTimeout(timer);
  };

  const mouseLeave = () => {
    setTooltipShow(false);
  };

  return (
    <>
      <QKTreeGraph
        sourceData={data}
        isHover={true}
        width="100%"
        height="100vh"
        onNodeClick={(e: any, graph: any, G6: any) => {
          handleNodeClick(e, graph, G6);
        }}
        isShowNodeTip={false}
        onNodeMouseEnter={(e: any, graph: any, G6: any) => {
          handleNodeMouseEnter(e, graph, G6);
        }}
        onNodeMouseLeave={(e: any, graph: any, G6: any) => {
          handleNodeMouseLeave(e, graph, G6);
        }}
      />
      {tooltipShow && (
        <div
          onMouseEnter={mouseEnter}
          onMouseLeave={mouseLeave}
          style={{ position: 'absolute', left: tooltipX + 90, top: tooltipY }}
        >
          <GraphTooltip data={tooltipData} />
        </div>
      )}
    </>
  );
};
```

### Api

| 属性              | 类型                 | 是否必填 | 默认值 | 说明                                                                                         |
| ----------------- | -------------------- | -------- | ------ | -------------------------------------------------------------------------------------------- |
| sourceData        | object               | 是       |        | 画布的数据                                                                                   |
| isHover           | boolean              | 否       | false  | 节点是否有 hover 效果，有为 true，没有为 false，需要在数据 stateStyles 中手动添加 hover 样式 |
| width             | number, string       | 否       | 800    | 画布宽度                                                                                     |
| height            | number, string       | 否       | 500    | 画布高度                                                                                     |
| hGap              | number               | 否       | 18     | 每个节点的水平间隙                                                                           |
| vGap              | number               | 否       | 18     | 每个节点的垂直间隙                                                                           |
| onNodeClick       | (e, graph, G6)=>void | 否       |        | 点击节点事件，参数 e:点击事件；graph:图谱实例；G6:G6 实例                                    |
| onCanvasClick     | (e, graph, G6)=>void | 否       |        | canvas 节点事件，参数 e:点击事件；graph:图谱实例；G6:G6 实例                                 |
| onCanvasDBClick   | (e, graph, G6)=>void | 否       |        | canvas 双击节点事件，参数 e:点击事件；graph:图谱实例；G6:G6 实例                             |
| onCanvasDragstart | (e, graph, G6)=>void | 否       |        | canvas 拖拽开始事件，参数 e:点击事件；graph:图谱实例；G6:G6 实例                             |
| onWheelzoom       | (e, graph, G6)=>void | 否       |        | 滚轮事件，参数 e:点击事件；graph:图谱实例；G6:G6 实例                                        |
| onViewportchange  | (e, graph, G6)=>void | 否       |        | viewport 事件，参数 e:点击事件；graph:图谱实例；G6:G6 实例                                   |
| onRootNodeEnter   | (e, graph, G6)=>void | 否       |        | root 节点滑上事件，参数 e:点击事件；graph:图谱实例；G6:G6 实例                               |
| onNodeMouseEnter  | (node)=>void         | 否       |        | 节点 hover 事件                                                                              |
| onNodeMouseLeave  | (node)=>void         | 否       |        | 节点滑过 out 事件                                                                            |

### Data

| 属性            | 类型           | 是否必填                 | 默认值 | 说明                                                                                                                                                  |
| --------------- | -------------- | ------------------------ | ------ | ----------------------------------------------------------------------------------------------------------------------------------------------------- |
| side            | string         | 否                       | right  | 节点位置 left-root 节点上方 right-root 节点下方                                                                                                       |
| edgeLeft        | string         | 否                       |        | 线左边 label                                                                                                                                          |
| edgeRight       | string         | 否                       |        | 线右边 label                                                                                                                                          |
| rectText        | string         | 否                       |        | 节点额外显示信息，认缴金额                                                                                                                            |
| isPerson        | boolean        | 否                       | 否     | 是否是人物节点，true 是，false 否                                                                                                                     |
| stateStyles     | object         | isHover 为 true 时，必须 | null   | { hover: { ..., 'bottom-node': { ... } } }，'bottom-node'为投资轮次样式                                                                               |
| bottomNodeStyle | object, string | 否                       |        | 节点补充节点样式，即企业投资轮次，obj={width: 166, height: 78, fill: '#FFF2F2', stroke: '#FFDDDD'}， 'BOTTOM'                                         |
| edgeLeftStyle   | object         | 是                       |        | { win: { ... }, bidding: { ... } } 线 label 样式，win 招标，bidding 中标                                                                              |
| styleObj        | string,object  | 是                       |        | 节点样式，string-'LEFT'-root 节点上方节点样式，string-'RIGH'T-root 节点下方节点样式，obj={width: 166, height: 78, fill: '#FFF2F2', stroke: '#FFDDDD'} |
| endArrowStyle   | object         | 否                       |        | 线末尾三角样式，fill-填充色，stroke-边颜色，deriction-方向，bottom 朝下，top 朝上                                                                     |
| invseRoundName  | string         | 否                       |        | 企业投资轮次，有则显示，无不显示                                                                                                                      |

### data 画布中的数据

```
{
  "id": "5ab69b8a-5f03-11ec-94c1-0242c0a80101",
  "entId": "eMBp0ahTid3",
  "name": "小米科技有限责任公司",
  "children": [
    {
      "id": "5ab6e162-5f03-11ec-94c1-0242c0a80101",
      "isPerson": true,
      "isScalable": false,
      "personId": "30096528",
      "name": "雷军",
      "subconam": "143934.0478",
      "conprop": "77.8022",
      "dataType": "INV",
      "side":'left',
      "edgeRight": '10.00%',
      "edgeLeft": '招标',
      "rectText": '认缴金额：120000.00万元',
      "styleKey": 'LEFT',
      "endArrowStyle": {
        fill: flag && isPerson ? '#F62828' : baseColor,
        stroke: flag && isPerson ? '#F62828' : baseColor,
        direction: flag ? 'bottom' : 'top',
      },
      "stateStyles": {
        hover: {
          stroke: '#F62828',
          'bottom-node': {
            stroke: '#F62828',
          },
        },
      }
    },
    {
      "id": "5ab6e248-5f03-11ec-94c1-0242c0a80101",
      "isPerson": true,
      "isScalable": false,
      "personId": "30845616",
      "name": "黎万强",
      "subconam": "18724.3569",
      "conprop": "10.1213",
      "dataType": "INV",
      "side":'right',
      "edgeRight": '10.00%',
      "edgeLeft": '招标',
      "rectText": '认缴金额：120000.00万元',
      "styleKey": 'LEFT',
      "endArrowStyle": {
        fill: '#F62828',
        stroke: '#F62828',
        direction: 'bottom',
      },
      "stateStyles": {
        hover: {
          stroke: '#F62828',
          'bottom-node': {
            stroke: '#F62828',
          },
        },
      }
    }
  ]
}
```

More skills for writing demo: https://d.umijs.org/guide/basic#write-component-demo
