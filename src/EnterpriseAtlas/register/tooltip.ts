import G6 from '@antv/g6';
// import { Avatar } from 'antd';

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

export default tooltip;
