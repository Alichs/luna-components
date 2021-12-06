---
nav:
  title: Components
  path: /components
---

## Cytoscape

Demo:

```tsx
import React from 'react';
import { Cytoscape } from 'qk-components';
//import { data } from './data1';
import { data } from './data';

//export default () => <Foo title="First Demo" />;
export default () => <Cytoscape data={data} />;
```

### Api

| 属性             | 类型         | 是否必填 | 默认值 | 说明                                      |
| ---------------- | ------------ | -------- | ------ | ----------------------------------------- |
| data             | object       | 是       |        | 画布的数据                                |
| styles           | object       | 否       |        | 画布的样式                                |
| isShowNodeTip    | object       | 否       | true   | 是否展示节点 hover tip                    |
| isShowEdgeTip    | object       | 否       | true   | 是否展示 edge tip                         |
| nodeTooltip      | object       | 否       |        | 参考： https://atomiks.github.io/tippyjs/ |
| edgeTooltip      | object       | 否       |        | 参考： https://atomiks.github.io/tippyjs/ |
| clickNodeIsFocus | object       | 否       | true   | 点击节点是否聚焦                          |
| onNodeClick      | (node)=>void | 否       |        | 点击节点事件                              |
| onNodeMouseOver  | (node)=>void | 否       |        | 节点 hover 事件                           |
| onNodeMouseOut   | (node)=>void | 否       |        | 节点滑过 out 事件                         |
| onMouseOutLine   | (edge)=>void | 否       |        | 边滑过 out 事件                           |
| onMouseOverLine  | (edge)=>void | 否       |        | 边滑过 out 事件                           |

### data 画布中的数据

```
{
  nodes:[
     {
      id: 1,
      entId: 'eMBp0ahTid3',
      personId: '31034675',
      label: '刘芹',
      pic: 'https://co-image.qichacha.com/PersonImage/p4c25ab66114eb92232de453dfcc05c1.jpg',
    },
  ],
   edges: [
    {
     source: 1,
      target: 0,
      label: '董事',
    },
    {
      source: 6,
      target: 0,
      label: '投资',
      investRatio: '10.06654', //若想边有Hover效果则investRatio不能为空
    }
    ]
}
```

### styles 格式

```
styles={
  node: {
      width: '70px',
      height: '70px',
      shape: 'ellipse',
      'border-opacity': 1,
       opacity: 1,
      'overlay-color': '#fff',
      'background-fit': 'none',
      'background-color': '#ECF0FF',
      'background-opacity': 1,
      'text-halign': 'center',
      'text-valign': 'center',
      'background-repeat': 'no-repeat',
      'background-image': 'data(bgImages.image)',
      'background-position-x': 'data(bgImages.positionX)',
      'background-position-y': 'data(bgImages.positionY)',
      label: function (ele: any) {

      },
      color: '#4B74FF',
      'font-size': '12px',
      'text-wrap': 'wrap',
      padding: '4px',
      'background-image-crossorigin': 'anonymous',
    },
    'node.center': { //中心点样式
      'background-color': '#FF8F00',
      color: '#fff',
      width: '80px',
      height: '80px',
    },
    'node.focus': { //聚焦样式
      'opacity': 1
    },
    'node.blur': {//失焦样式
      'opacity': 0.2,
      'label': ''
    },
    /* ---------- 关系 ---------- */
    edge: {
      width: '0.5px',
      'line-color': '#9bb7f0',
      //opacity: 0.5,
      content: 'data(event)',
      // color: '#D4DEFF',
      'font-family': 'Microsoft Yahei',
      'font-size': '12px',
      'min-zoomed-font-size': '12px',
      'line-style': 'dashed',
      'edge-text-rotation': 'autorotate',
      'curve-style': 'straight',
       color: '#A8ADBE',
      'text-background-color': '#f6f7f9',
      'text-background-opacity': '1',
      'text-background-shape': 'roundrectangle',
      'target-arrow-shape': 'triangle',
      'target-arrow-color': '#D4DEFF',
      label: function (ele: any) {
        return ele.data().label;
      },
    },
    'edge:selected': { //点击选中边的样式
      'color': '#F62828',
      'line-color': '#F62828',
      'target-arrow-color': '#F62828',
    },
    'edge.hover': {//鼠标滑过edge的样式
      'opacity': 1,
      'color': '#F62828',
      'line-color': '#F62828',
      'target-arrow-color': '#F62828',
    },
    'edge.focus': {//聚焦的样式
      'opacity': 1,
      'color': '#F62828',
      'line-color': '#F62828',
      'target-arrow-color': '#F62828',
    },
    'edge.blur': {
      opacity: 0.2,
      content: '',
    }
}
```

More skills for writing demo: https://d.umijs.org/guide/basic#write-component-demo
