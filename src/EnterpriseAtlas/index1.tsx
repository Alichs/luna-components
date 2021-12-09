import React, { Component } from 'react';
import G6 from '@antv/g6';
import { Input, Image } from 'antd';
import registerEdge from './register/register-edge';
import registerNode from './register/register-node';
import tooltip from './register/tooltip';
import data from './dataList';
// import { firstNodeColor, rootColor, labelConfig } from './config/config';
// import EnterpriseTooltip from './component/enterpriseTooltip.tsx';
import dataTransform from './utils/index';
import styles from './css/index.less';

class EnterpriseAtlas extends Component {
  constructor(props) {
    super(props);
    this.state = {
      myGraph: null,
    };
  }
  componentDidMount() {
    this.createGraphic();
    window.addEventListener('resize', () => {
      console.log(this.state.myGraph);
      console.log('resize');
      const divBox = document.getElementsByClassName('enterprise-atlas-box')[0];
      const width = divBox.offsetWidth;
      const height = divBox.offsetHeight;
      console.log(width, height);
      this.state.myGraph.changeSize(width, height);
      this.state.myGraph.fitView();
    });
  }

  createGraphic = () => {
    registerEdge(G6);
    registerNode(G6);

    const newData = dataTransform(data);
    const stashSubtrees: any = {};
    // 从叶子节点到根节点的由下至上的深度优先遍历树数据。
    G6.Util.traverseTreeUp(newData, (subtree) => {
      if (
        subtree.children &&
        subtree.children.length > 3 &&
        subtree.level > 1
      ) {
        // overflow true 超出渲染长度 false 没有超出渲染长度
        // subtree.overflow = true;
        // 超出渲染长度的数据
        // const oriChildren = subtree.children;
        const str1 = JSON.stringify(subtree.children);
        const arr1 = JSON.parse(str1).slice(0, 2); // 展示的数据
        const arr2 = JSON.parse(str1).slice(2); // 超出长度的数据项
        arr1.push({
          ...arr1[0],
          id: `${subtree.id}-search`,
          label: `搜索(${arr2.length})`,
        }); // 搜索节点
        subtree.children = arr1;
        stashSubtrees[`${subtree.id}-search`] = arr2;
        // setLists(stashSubtrees);
      }
    });

    const divBox = document.getElementsByClassName('enterprise-atlas-box')[0];
    const width = divBox.scrollWidth;
    const height = divBox.scrollHeight;

    const graph = new G6.TreeGraph({
      container: 'container',
      width,
      height,
      // autoPaint: true,
      fitCenter: true,
      defaultNode: {
        type: 'tree-node',
        anchorPoints: [
          [0, 0.5],
          [1, 0.5],
        ],
      },
      defaultEdge: {
        type: 'tree-edge',
      },
      layout: {
        type: 'mindmap',
        direction: 'H',
        getHGap: () => 50,
        getVGap: () => 20,
        getSide: (d) => {
          if (d.data.label === '产品营销') {
            return 'left';
          }
          return 'right';
        },
      },
      modes: {
        default: [
          'drag-canvas',
          'zoom-canvas',
          // {
          //   type: 'click-select',
          //   // 是否允许该 behavior 发生。若返回 false，被操作的 item 不会被选中，也不会触发 'nodeselectchange' 时机事件
          //   shouldBegin: (e) => {
          //     // 当点击的图形名为 'text-shape' 时，不允许该 behavior 发生
          //     if (e.target.get('name') === 'node-icon') return false;
          //     if (e.target.get('name') === 'node-icon-text') return false;
          //     if (e.target.get('name') === 'node-icon-edge') return false;
          //     return true;
          //   },
          // },
        ],
      },
      plugins: [tooltip],
    });
    graph.data(newData);
    graph.render();
    // graph.fitCenter();
    // setMyGraph(graph);
    this.bindEvents(graph);
    this.setState({ myGraph: graph });
  };

  // 注册事件
  bindEvents = (graph) => {
    graph.on('node:click', (e) => {
      const model = e.item.getModel();
      const { name } = e.target.cfg;
      if (name === 'circle-node' || name === 'circle-text') {
        model.collapsed = !model.collapsed;
        graph.updateItem(e.item, model);
        graph.layout();
      }
      // if (
      //   name === 'search-node' ||
      //   name === 'search-text' ||
      //   name === 'marker-icon'
      // ) {
      //   const { id } = model;
      //   setSearchNodeID(id);
      //   setShowDropdown(true);
      // } else {
      //   setShowDropdown(false);
      // }
    });
    // canvas的点击事件，鼠标左键
    // graph.on('canvas:click', (e) => {
    //   setShowDropdown(false);
    // });
    // // canvas的点击事件，鼠标右键
    // graph.on('canvas:dblclick', (e) => {
    //   setShowDropdown(false);
    // });
    // // canvas的拖拽事件
    // graph.on('canvas:dragstart', (e) => {
    //   setShowDropdown(false);
    // });
  };
  render() {
    return (
      <div className="enterprise-atlas-box" id="container">
        <div>
          {/* {
          showNodeTooltip && <EnterpriseTooltip x={nodeTooltipX} y={nodeTooltipY} />
        } */}
          {/* <EnterpriseTooltip x={nodeTooltipX} y={nodeTooltipY} /> */}
        </div>
        {/* <button onClick={handleVisible}>隐藏</button> */}
        {/* {!showDropdown && (
        <div className={styles['my-dropdown-box']}>
          <div className={styles['dropdown-box-top']}>
            <span>搜索</span>
            <span>当前数据过多，请点击您需要展示的数据进行</span>
            <span>X</span>
          </div>
          <Search
            className={styles['search-input']}
            placeholder="请输入公司名称"
          />
          <div className={styles['dropdown-list-box']}>
            {lists[searchNodeId]?.length &&
              lists[searchNodeId].map((item) => {
                return (
                  <div
                    key={item.id}
                    className={styles['list-item']}
                    onClick={() => {
                      optionOnClick(item);
                    }}
                  >
                    <Image
                      width={52}
                      preview={false}
                      src="https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png"
                    />
                    <div className={styles['ente-title']}>{item.label}</div>
                  </div>
                );
              })}
          </div>
        </div>
      )} */}
      </div>
    );
  }
}

export default EnterpriseAtlas;
