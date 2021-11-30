/* 自定义企业信息卡片 */
import React from 'react';
import { Tooltip } from 'antd';
import '../css/enterpriseTooltip.less';

const EnterpriseTooltip = ({ x, y }) => {
  // console.log(x, y, 'x----y')
  return (
    <div className="my-tooltip" style={{ top: `${y}px`, left: `${x}px` }}>
      <div>tooltip</div>
    </div>
  );
};

export default EnterpriseTooltip;
