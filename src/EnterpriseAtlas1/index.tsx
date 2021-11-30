import React, { useEffect, useRef, useState } from 'react';
import G6 from '@antv/g6';
import registerEdge from './register-edge';
import registerNode from './register-node';
import data from './dataList';
import './css/index.less';

const EnterpriseAtlas: React.FC = () => {
  const [currentNode, setCurrentNode] = useState({ id: null });
  const [showInput, setShowInput] = useState(false);
  const [inputValue, setInputValue] = useState(false);
  const [myGraph, setMyGraph] = useState(null);
  const [elem, setElem] = useState(null); // 当前点击的搜索节点信息
  const [input, setInput] = useState({ x: 0, y: 0 });
  const [list, setList] = useState<{ id: string; label: string }[]>([]); // 超过十条未展开的数据
  const ref = useRef(null);
  useEffect(() => {
    if (!myGraph) {
      createGraphic();
    }
  }, []);

  // useEffect(() => {
  //   if (typeof window !== 'undefined') {
  //     window.onresize = () => {
  //       if (!graph || graph.get('destroyed')) return;
  //       if (!ref.current || !ref.current.scrollWidth || !ref.current.scrollHeight) return;
  //       graph.changeSize(ref.current.scrollWidth, ref.current.scrollHeight);
  //     };
  //   }
  // }, []);

  const createGraphic = () => {
    registerEdge(G6);
    registerNode(G6);

    // 点击显示信息tooltip
    const tooltip = new G6.Tooltip({
      offsetY: -20,
      trigger: 'click',
      itemTypes: ['node'],
      shouldBegin(e) {
        console.log(e.target.cfg, 12);
        const { cfg } = e.target;
        if (
          cfg.name === 'node-icon-text' ||
          cfg.name === 'node-icon-edge' ||
          cfg.name === 'rect-node-search' ||
          cfg.name === 'node-search-label'
        ) {
          return false;
        }
        return true;
      },
      getContent(e) {
        // console.log(e.item.getModel(), 'e---')
        return `
          <p class="menu-item" command="edit-node">${
            e.item.getModel().label
          }</p>
        `;
      },
      // handleMenuClick(target, item) {
      //   console.log(item, 'item');
      //   const command = target.getAttribute('command');

      //   switch (command) {
      //     case 'edit-node':
      //       editNode(item);
      //       break;
      //     case 'delete-node':
      //       deleteNode(item);
      //       break;
      //   }
      // },
    });
    const _graph = new G6.TreeGraph({
      container: ref.current,
      width: 1000,
      height: 1000,
      nodeStateStyles: {
        hover: {
          fill: 'red',
        },
        selected: {
          fill: '#fff',
        },
      },
      defaultNode: {
        type: 'tree-node',
        style: {
          width: 100,
          height: 30,
          radius: 4,
          fill: '#fff',
          stroke: '#999',
        },
        labelCfg: {
          style: {
            fontSize: 14,
          },
        },
      },
      defaultEdge: {
        type: 'my-tree',
      },
      layout: {
        type: 'mindmap',
        direction: 'H',
        getHGap: () => 50,
        getVGap: () => 20,
        getSide: (d) => {
          if (d.data.site === 'left') {
            return 'left';
          }
          return 'right';
        },
      },
      modes: {
        default: [
          'drag-canvas',
          'zoom-canvas',
          'drag-node',
          {
            type: 'click-select',
            // 是否允许该 behavior 发生。若返回 false，被操作的 item 不会被选中，也不会触发 'nodeselectchange' 时机事件
            shouldBegin: (e) => {
              // 当点击的图形名为 'text-shape' 时，不允许该 behavior 发生
              if (e.target.get('name') === 'node-icon') return false;
              if (e.target.get('name') === 'node-icon-text') return false;
              if (e.target.get('name') === 'node-icon-edge') return false;
              return true;
            },
          },
        ],
      },
      plugins: [tooltip],
      fitView: true,
      minZoom: 0.7,
      maxZoom: 1,
    });

    _graph.read({ ...data });
    setMyGraph(_graph);
    bindEvents(_graph);
  };

  const bindEvents = (graph) => {
    graph.on('node:click', (e) => {
      const model = e.item.getModel();
      if (e.target.cfg.name === 'node-icon-text') {
        /* 展开按钮的事件 */
        model.collapsed = !model.collapsed;
        graph.updateItem(e.item, model);
        graph.layout();
        setShowInput(false);
      } else if (
        e.target.cfg.name === 'rect-node-search' ||
        e.target.cfg.name === 'rect-node-label'
      ) {
        onSearchClick(e, model, graph);
      } else {
        setShowInput(false);
        /* 节点点击事件 */
        // 记录当前节点 id
        setCurrentNode({ id: model.id });
        graph.setItemState(model.id, 'selected', true);
      }
      e.item.toFront();
    });
    graph.on('node:mouseenter', (e) => {
      if (e.target.cfg.name === 'rect-node') {
        const node = e.item;
        // 激活该节点的 hover 状态
        graph.setItemState(node, 'hover', true);
      }
    });
    // 监听鼠标离开节点事件
    graph.on('node:mouseleave', (e) => {
      const node = e.item;
      // 关闭该节点的 hover 状态
      graph.setItemState(node, 'hover', false);
    });
    // canvas的点击事件，鼠标左键
    graph.on('canvas:click', (e) => {
      console.log('canvas');
      setShowInput(false);
    });
    // canvas的点击事件，鼠标右键
    graph.on('canvas:dblclick', (e) => {
      setShowInput(false);
    });
    // canvas的拖拽事件
    graph.on('canvas:dragstart', (e) => {
      setShowInput(false);
    });
  };

  // 编辑节点
  // const editNode = (item) => {
  //   const model = item.getModel();
  //   const { cacheCanvasBBox } = item.get('group').cfg;

  //   setShowInput(true);
  //   setInputValue(model.label);
  //   currentNode.id = model.id;
  //   input.x = cacheCanvasBBox.x + 40;
  //   input.y = cacheCanvasBBox.y + 40;
  //   // $nextTick(() => {
  //   //   $refs.inputController.focus();
  //   // });
  // }

  // const deleteNode = (item) => {
  //   const id = item.get('id');

  //   if(id.length > 1) {
  //     const parentId = id.substring(0, id.length - 2);
  //     const parent = graph.findById(parentId);

  //     parent.toFront();
  //   }
  //   graph.removeChild(id);

  //   if(id.length > 1) {
  //     const parentId = id.substring(0, id.length - 2);
  //     const parent = graph.findById(parentId);
  //     const model = parent.get('model');

  //     if(model.children.length === 0) {
  //       const group = parent.get('group');
  //       const { children } = group.cfg;

  //       const icon = children.find(child => child.name === 'node-icon');
  //       const iconText = children.find(child => child.name === 'node-icon-text');

  //       if(icon) {
  //         icon.remove();
  //         iconText.remove();
  //       }
  //     }
  //   }
  // }

  const onSearchClick = (e, model, graph) => {
    setElem(e);
    const { x, y } = model;
    const clientXY = graph.getClientByPoint(x, y);
    setInput({ x: clientXY.x, y: clientXY.y });
    setShowInput(true);
    setList(model.child);
  };

  const onOptionClick = (data: { id: string; label: string }) => {
    // 点击的搜索节点
    const item = elem.item;
    console.log(elem.currentTarget, 'currentTarget');
    const model = item.getModel();
    const arr = [];
    const parentId = data.id.slice(0, data.id.length - 2);
    const parentParentId = data.id.slice(0, data.id.length - 4);
    const dataSource = myGraph.findDataById(parentId); // 父节点数据源
    const listData = dataSource.children; // 子节点数据源 children
    listData.splice(listData.length - 1, 0, data); // 在子节点数据中加入选择的企业
    for (let i = 0; i < list.length; i++) {
      if (data.id !== list[i].id) {
        arr.push(list[i]);
      }
    }
    setList(arr);
    myGraph.updateChild(dataSource, parentParentId);
    myGraph.layout();
    if (arr.length > 0) {
      // 更新剩余数量
      item.update({ ...model, child: arr, label: `搜索${arr.length}` });
      elem.currentTarget.layout(false);
    } else {
      item.update({ ...model, child: arr });
      // 全部添加到树中，删除该搜索节点
      myGraph.removeChild(model.id);
    }
  };

  return (
    <div style={{ width: '100%', height: '100%' }}>
      <div ref={ref}></div>
      {showInput && list.length ? (
        <div
          className="input-select-box"
          style={{ top: input.y, left: input.x }}
        >
          <input className="input-controller" type="text"></input>
          {list.map((item) => {
            return (
              <div
                onClick={() => {
                  onOptionClick(item);
                }}
                className="option-item"
                key={item.id}
              >
                {item.label}
              </div>
            );
          })}
        </div>
      ) : (
        ''
      )}
    </div>
  );
};

export default EnterpriseAtlas;
