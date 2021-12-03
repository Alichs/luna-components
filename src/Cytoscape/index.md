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
import { data } from './data3';

//export default () => <Foo title="First Demo" />;
export default () => <Cytoscape data={data} entId="eMBp0ahTid3" />;
```

### Api

| 属性   | 类型   | 是否必填 | 默认值 | 说明            |
| ------ | ------ | -------- | ------ | --------------- |
| data   | object |          |        | 画布的数据      |
| styles | object |          |        | 画布的样式      |
| entId  | string |          |        | 中心点的企业 id |

### data 画布中的数据

```
{
  nodes:[
     {
      id: '-1358610521084390847',
      labels: ['Company'],
      properties: {
        keyNo: '8ac8b7d155b9f0884afea48122f48b76',
        name: '启客（北京）科技有限公司',
        hasImage: false,
        status: '存续',
        registCapi: '1000.000',
        econKind: '有限责任公司（自然人投资或控股）',
      },
    },
  ],
   edges: [
    {
      id: 'fceb7a4d4846862fb638effce8840029',
      type: 'EMPLOY',
      startNode: '-3372724639231345895',
      endNode: '-2886766351330904521',
      properties: {
        role: '董事',
      }
    },
    {
      id: 'dee2f865c85b50386f5e4c457878790e',
      type: 'EMPLOY',
      startNode: '4398339438282696539',
      endNode: '-2886766351330904521',
      properties: {
        role: '监事',
      }
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
    'node.center': {
      'background-color': '#FF8F00',
      color: '#fff',
      width: '80px',
      height: '80px',
    },
    'node.focus': {
      'opacity': 1
    },
    'node.blur': {
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
}
```

More skills for writing demo: https://d.umijs.org/guide/basic#write-component-demo
