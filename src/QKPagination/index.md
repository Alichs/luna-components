---
nav:
  title: 组件
  path: /components
group:
  path: /form
  title: 表单组件
  order: 2
---

## QKPagination

类似百度的分页，不显示总数，保留当前数值的前 5 个页数和后 4 个页数

```tsx
import React, { useState } from 'react';
import { QKPagination } from 'qk-components';

export default () => {
  const [page, setPage] = useState(1);

  const onPageChange = (p) => {
    setPage(p);
  };

  return (
    <QKPagination
      total={1000}
      current={page}
      pageSize={10}
      onChange={onPageChange}
      showSizeChange={false}
    />
  );
};
```

### Api

| 属性             | 类型                     | 是否必填 | 默认值 | 说明                                                     |
| ---------------- | ------------------------ | -------- | ------ | -------------------------------------------------------- |
| total            | number                   | 是       |        | 数据总数                                                 |
| pageSize         | number                   | 是       |        | 每页条数                                                 |
| current          | number                   | 否       |        | 当前页数                                                 |
| onChange         | function(page, pageSize) | 否       |        | 页码或 pageSize 改变的回调，参数是改变后的页码及每页条数 |
| pageSizeOptions  | string[]                 | 否       |        | [10, 20, 50, 100]                                        |
| showSizeChange   | boolean                  | 否       |        | 是否展示 pageSize 切换器                                 |
| showTotal        | function(total)          | 否       |        | 用于显示数据总量                                         |
| onShowSizeChange | function(current, size)  | 否       |        | pageSize 变化的回调                                      |
