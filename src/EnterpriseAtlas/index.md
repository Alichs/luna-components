---
nav:
  title: 组件
  path: /components
group:
  path: /business
  title: 业务组件
  order: 1
---

## demo1

Demo:

```tsx
import React from 'react';
import { EnterpriseAtlas } from 'qk-components';
import { data } from './data';

console.log(data, 123);

export default () => <EnterpriseAtlas sourceData={data} />;
```

More skills for writing demo: https://d.umijs.org/guide/basic#write-component-demo
