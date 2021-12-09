import React, { useState, useEffect } from 'react';
import G6 from '@antv/g6';
// import { Avatar } from 'antd';

interface PropTyps {
  data: any;
}

const useTooltip: React.FC<PropTyps> = ({ data }) => {
  const tooltip = new G6.Tooltip({
    offsetX: 10,
    offsetY: 20,
    fixToNode: [1, 0.5],
    shouldBegin(e) {
      const { name } = e.target.cfg;
      if (name === 'rect-node' || name === 'rect-node-text') {
        return true;
      } else {
        return false;
      }
    },
    getContent(e) {
      const outDiv = document.createElement('div');
      outDiv.style.width = '180px';
      outDiv.innerHTML = `
        <div>
          <div>tootip</div>
          <div>tootip</div>
        </div>  
      `;
      return outDiv;
    },
    itemTypes: ['node'],
  });
  return tooltip;
};

// const tooltip = new G6.Tooltip({
//   offsetX: 10,
//   offsetY: 20,
//   fixToNode: [1, 0.5],
//   shouldBegin(e) {
//     const { name } = e.target.cfg;
//     if (name === 'rect-node' || name === 'rect-node-text') {
//       return true;
//     } else {
//       return false;
//     }
//   },
//   getContent(e) {
//     const { name } = e.target.cfg;
//     if(name === 'rect-node' || name === 'rect-node-text') {
//       // console.log(e.item._cfg.parent._cfg.parent.getModel(), '------');
//       const model = e.item.getModel();
//       // type=0为公司，type=1为人
//       switch (model.type) {
//         case 0:
//           // getEnterpriseById.run(model.dataId).then((data) => {
//           //   console.log(data, 'data------')
//           // });
//           break;
//         default:
//           const parentParentModel = e.item._cfg.parent._cfg.parent.getModel();
//           // getHumanInfo.run(parentParentModel.dataId, model.dataId).then((data) => {
//           //   console.log(data, 'data------')
//           // });
//           break;
//       }
//     }
//     const outDiv = document.createElement('div');
//     outDiv.style.width = '180px';
//     outDiv.innerHTML = `
//       <div>
//         <div>tootip</div>
//         <div>tootip</div>
//       </div>
//     `;
//     return outDiv;
//   },
//   itemTypes: ['node'],
// });

export default useTooltip;

// /* 获取个人信息 */
// const getHumanInfo = useRequest<API.ResultDataHumanInfoRetDto>(
//   (entId, personId) => humanInfo({ entId, personId }),
//   {
//     manual: true
//   }
// );

// /* 获取企业信息 */
// const getEnterpriseById = useRequest<API.AiCustomerEnterpriseVo>(
//   (entId) => queryEnterpriseById({ entId }),
//   {
//     manual: true
//   }
// );
