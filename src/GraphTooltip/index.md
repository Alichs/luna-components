---
nav:
  title: 组件
  path: /components
group:
  path: /business
  title: 业务组件
  order: 1
---

## GraphTooltip

Demo:

```tsx
import React from 'react';
import { GraphTooltip } from 'qk-components';
import { tooltipData } from './data';

export default () => {
  return <GraphTooltip data={tooltipData} />;
};
```

### Api

| 属性 | 类型   | 是否必填 | 默认值 | 说明         |
| ---- | ------ | -------- | ------ | ------------ |
| data | object | 是       |        | Tooltip 数据 |

### data 画布中的数据

```
{
  "dataId": "AgdcAuGo1dx",
  "fallbackImg": "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAGgAAABoCAYAAAAdHLWhAAAABGdBTUEAALGPC/xhBQAAADhlWElmTU0AKgAAAAgAAYdpAAQAAAABAAAAGgAAAAAAAqACAAQAAAABAAAAaKADAAQAAAABAAAAaAAAAABcm3krAAAFsUlEQVR4Ae2c3YsbVRjGnzM21qalahS2YotfSC2t9sL6VbxYtKhFKVTxQvHjSr0VCv4D3gkFr71UoeiFojdFsVClICr9RKt1BSldbAttui27qUl2M553k2nOZjObiUnmPGf7vku67555O+eZ5zfnJPORMbBRqcTr6w18YAzG4xh3SJuGHwcsg7OWwcFChPeKRTNpWnCOWzklP5K01xQHyhbS1khGjsJJschvc2l+VrsyE/+j05pfEmm9y3RnLk9bPBq0DkS0ylTYvAMKiHxHUEAKiNwBcnk6ghQQuQPk8nQEKSByB8jl6QhSQOQOkMvTEaSAyB0gl6cjSAGRO0AuT0eQAiJ3gFyejiAFRO4AuTwdQQqI3AFyeTqCFBC5A+TydASRA1pBrq+nvEYD+O1v4KeTwEn7W2LT3cBjm4Et9wBR4LtgkDcuulB+/h2YrsxzWfTPmiLwyANhwwoGUFYoiyi1GgTWto3A41vCGlnUgAaFshxgUQISMF98D3z7S/r0lWZ+v+0ysnZsA14aB24gfL+iBPTZd8BXh/q1erD6F7YDrz4z2DpG8b8J9xng2MQoNnXpdR77a+nlvpZSAqrO5m9HrZ5/n1l6pASURfj1UqOAyEkrIAVE7gC5vODPxYm/b++2Zwfuj68dx8zZ46hfJww++pLc/Qzygp7iNowBH+6J8dDGhj0pGiP5kVzaZJnUhBxBA9rzWowVhfQvqcsyqQk5aABd+heYvAycngJm7RTVK2RaS+AY+0CB0uoIG0rNl+TSJiE1UtsrpE/pWzSIFpbw/h40VbXXc87HuFpvGirG1OZ62yPvOUncWjRYe1PyF1q5QXmmWdOsba+/XdnO6rbPiYvtv1dZsJvHDG5Z2W7zkXkdQbK3Hp5cCCerCe6JzdVdTHTb3Nqs65cdRrSJRp/hDVDFnlqZKMvb+tJ7tk9zRJtoFK2+whugPy/GmGv8fzjyUTqJGTtNdobb5tZ21vX6WzSKVl/hDdDU1cE2WY5zkrhUiXHFvrHPWR/lJbm0JeHWJm39/B5Uaz99ddZ6ASQmzg4wemQj5CB0tvXBIrbPgyrPNHCm3HxJLm0SUjPoAatoFc0+wgugYT1fa++n5hqkbuYJHKkZRgxLc79avADqV2Ra/ZnzwLt7DU6citCwe3nyI7m0yTKpCTm8HwcNw7zmFDackTIMPcNcR9AjaJhGsK5LAbGSaelSQAqI3AFyeTqCFBC5A+TylsXH7HW3AU8/DNy1run26XPAgcPAOefyATmHVHlBA5JrcrueBN7YCawstLdx+4PAi+PAx/uBrw/BnvZpLwstCxrQy09ZOM91t1yAvbXLgrsR+PxA95oQWoP9kCDT2Ss7elssNcnU17uaryJYQPJthELH+J+2lzDk5YbUPG9rQ41gAd1750LLL9hL02++33xJ7sZ9HbXuMvY8WEBrVi20Vr5IXLWXpuUluRudte4y9jxYQIuMdT+pufmiwrAalg+gsHzPrFYBZbbKT6EC8uN75l4VUGar/BR2HEnkI+LIKftF4T/Sb1qsdrnPbdTKqjXg6InuvRh7e+XamsGjm7ovH2Vr7oA++QbY/6NsEtc9BDUBdDzNaoMjdtnOJ4DXn02rGU177lPcD0dHsyF5rNWH9twB3X5zHlaOpg8f2nMH9M5ue/JyTAwM6Wgyntcs2vMOykfB5G0Cc3+5jyBmMxi1KSBGKo4mBeSYwZgqIEYqjiYF5JjBmCogRiqOJgXkmMGYKiBGKo4mBeSYwZgqIEYqjiYF5JjBmCogRiqOJgXkmMGYKiBGKo4mBeSYwZgqIEYqjiYF5JjBmCogRiqOJgXkmMGYKiBGKo4mBeSYwZgqIEYqjiYF5JjBmEb2WQNnGYWpJnv3umUT2Yc8HFQzOB0QNqZSidfXG5D7+kucMq9bVeVChK1RsWgmJbE27NPpzv/O0GKwT5gIm/8ADhKEzmjXbc0AAAAASUVORK5CYII=",
  "tags": [
    "注销",
    "纳税A级企业",
    "科技型中小企业",
    "小型"
  ],
  "pic": "https://feifeidata.oss-cn-beijing.aliyuncs.com/jobui/logo/0/Z0PkZqGs5Y.png",
  "name": "深圳英鹏互娱科技有限公司",
  "infos": [
    {
        "label": "法定代表人:",
        "value": "林军"
    },
    {
        "label": "注册资本:",
        "value": "222.2万"
    },
    {
        "label": "注册日期:",
        "value": "2013-12-19"
    }
  ]
}
```

More skills for writing demo: https://d.umijs.org/guide/basic#write-component-demo
