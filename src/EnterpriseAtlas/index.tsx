import React, { useEffect, useRef, useState } from 'react';
import G6 from '@antv/g6';
import { Input, Image } from 'antd';
// import { IconFont } from '@/utils/utils';
// import useRequest from '@qhooksjs/use-request';
// import {
//   queryCompanyMap,
//   humanInfo,
//   queryEnterpriseById,
// } from '@/services/aicustomers/ScrmOpenAPI';
import registerEdge from './register/register-edge';
import registerNode, { registerRoot } from './register/register-node';
import MyTooltip from './component/myTooltip';
import dataTransform from './utils/index';
// import sourceData from './data';
import styles from './css/index.less';

// const enterLogo = require('@/images/nodata.png');

// interface PropsType {
//   sourceData: any;
// }

const EnterpriseAtlas: React.FC = (props) => {
  console.log(props, 'sourceData');

  const [myGraph, setMyGraph] = useState(null);
  const [showDropdown, setShowDropdown] = useState(false); // 搜索下拉菜单是否显示
  const [lists, setLists] = useState({}); // 全部搜索下拉框数据
  const [filterList, setFilterList] = useState([]); // 搜索下拉框数据
  const [searchNodeId, setSearchNodeID] = useState<string>(''); // 点击的搜索节点的id
  const [tooltipShow, setTooltipShow] = useState(false); // 是否显示tooltip
  const [tooltipX, setTooltipX] = useState(0); // tooltip x轴坐标
  const [tooltipY, setTooltipY] = useState(0); // tooltip y轴坐标
  const [tooltipData, setTooltipData] = useState({}); // tooltip数据
  const ref = useRef<HTMLDivElement>(null);
  let timer = null;

  // useEffect(() => {
  //   if (!myGraph) {
  //     createGraphic();
  //   }
  //   return () => {
  //     // 销毁画布
  //     if (myGraph) {
  //       myGraph.destroy();
  //     }
  //   };
  // }, []);

  // useEffect(() => {
  //   if (myGraph) {
  //     // 解除事件绑定
  //     myGraph.off('node:click');
  //     // 事件绑定
  //     bindEvents(myGraph);
  //   }
  // }, [lists]);

  // /* 数据格式化 */
  // const traverseTreeUp = (data) => {
  //   const stashSubtrees: any = {};
  //   G6.Util.traverseTreeUp(data, (subtree) => {
  //     if (
  //       subtree.children &&
  //       subtree.children.length > 10 &&
  //       subtree.level > 0
  //     ) {
  //       // 超出渲染长度的数据
  //       const str1 = JSON.stringify(subtree.children);
  //       const arr1 = JSON.parse(str1).slice(0, 10); // 展示的数据
  //       const arr2 = JSON.parse(str1).slice(10); // 超出长度的数据项
  //       arr1.push({
  //         ...arr1[0],
  //         remark: '',
  //         id: `${subtree.id}-search`,
  //         label: `搜索(${arr2.length})`,
  //       }); // 搜索节点
  //       subtree.children = arr1;
  //       stashSubtrees[`${subtree.id}-search`] = arr2;
  //       setLists({ ...lists, ...stashSubtrees });
  //     }
  //   });
  // };

  // const createGraphic = () => {
  //   registerEdge(G6);
  //   registerNode(G6);
  //   registerRoot(G6);

  //   const newData = dataTransform(sourceData, true);
  //   traverseTreeUp(newData);

  //   const graph = new G6.TreeGraph({
  //     container: ref.current!,
  //     width: ref.current!.scrollWidth,
  //     height: ref.current!.scrollHeight || 0,
  //     defaultNode: {
  //       anchorPoints: [
  //         [0, 0.5],
  //         [1, 0.5],
  //       ],
  //     },
  //     defaultEdge: {
  //       type: 'tree-edge',
  //     },
  //     layout: {
  //       type: 'compactBox',
  //       direction: 'H',
  //       getHGap: () => 80,
  //       getVGap: () => 4,
  //       // getSide: (d) => {
  //       //   // console.log(d, 'd');
  //       //   // if (d.data.label === '对外投资' ||
  //       //   // d.data.label === '控股企业' ||
  //       //   // d.data.label === '供应商' ||
  //       //   // d.data.label === '历史对外投资' ||
  //       //   // d.data.label === '分支机构' ||
  //       //   // d.data.label === '客户') {
  //       //   //   return 'left';
  //       //   // }
  //       //   return 'left';
  //       // },
  //     },
  //     modes: {
  //       default: ['drag-canvas', 'zoom-canvas'],
  //     },
  //     minZoom: 0,
  //     maxZoom: 10,
  //     // fitCenter: true,
  //     // fitView: true,
  //   });
  //   graph.data(newData);
  //   graph.render();
  //   graph.fitView();
  //   // graph.zoomTo(0.7);
  //   setMyGraph(graph);
  // };

  // // 注册事件
  // const bindEvents = (graph) => {
  //   graph.on('node:click', (e) => {
  //     const model = e.item.getModel();
  //     const { name } = e.target.cfg;
  //     if (name === 'circle-node' || name === 'circle-text') {
  //       if (model.children?.length === 0 || !model.children) {
  //         /* 获取企业图谱数据 */
  //         // getCompanyMap.run(model.dataId).then((data) => {
  //         //   const { side } = model;
  //         //   model.collapsed = !model.collapsed;
  //         //   data.data.side = side;
  //         //   const newData = dataTransform(data.data);
  //         //   traverseTreeUp(newData);
  //         //   const parentData = graph.findDataById(model.id);
  //         //   parentData.children = newData.children;
  //         //   graph.updateItem(e.item, model);
  //         //   graph.changeData();
  //         // });
  //       } else {
  //         model.collapsed = !model.collapsed;
  //         graph.updateItem(e.item, model);
  //         graph.layout();
  //       }
  //     }
  //     if (
  //       name === 'search-node' ||
  //       name === 'search-text' ||
  //       name === 'search-icon'
  //     ) {
  //       const { id } = model;
  //       setSearchNodeID(id);
  //       setFilterList(lists[id]);
  //       setShowDropdown(true);
  //     }
  //   });
  //   // 鼠标滑上事件
  //   // isPerson=0为公司，isPerson=1为人
  //   // 人物需要获取器对应的公司的entId，及父节点的父节点dataId
  //   // console.log(e.item._cfg.parent._cfg.parent.getModel(), '------');
  //   // graph.on('node:mouseenter', (e) => {
  //   //   const { name } = e.target.cfg;
  //   //   const { x, y, dataId, isPerson } = e.item.getModel();
  //   //   if (
  //   //     (name === 'rect-node' || name === 'rect-node-text') &&
  //   //     dataId &&
  //   //     isPerson
  //   //   ) {
  //   //     const canvasXY = graph.getCanvasByPoint(x, y);
  //   //     // 缩放比例
  //   //     const zoom = graph.getZoom();
  //   //     setTooltipX(canvasXY.x);
  //   //     setTooltipY(canvasXY.y + 40 * zoom);
  //   //     const parentParentModel = e.item._cfg.parent._cfg.parent.getModel();
  //   //     let newData = {};
  //   //     switch (isPerson) {
  //   //       case '0':
  //   //         timer = setTimeout(() => {
  //   //           getEnterpriseById.run(dataId).then((data) => {
  //   //             if (data[0]) {
  //   //               newData = {
  //   //                 tags: data[0].labels,
  //   //                 pic: data[0].logo,
  //   //                 name: data[0].name,
  //   //                 infos: [
  //   //                   { label: '法定代表人:', value: data[0].legalPerson },
  //   //                   {
  //   //                     label: '注册资本:',
  //   //                     value: `${data[0].registerCapital}万`,
  //   //                   },
  //   //                   { label: '注册日期:', value: data[0].registerTime },
  //   //                 ],
  //   //               };
  //   //               setTooltipData(newData);
  //   //               setTooltipShow(true);
  //   //             }
  //   //           });
  //   //         }, 600);
  //   //         break;
  //   //       default:
  //   //         timer = setTimeout(() => {
  //   //           getHumanInfo
  //   //             .run(parentParentModel.dataId, dataId)
  //   //             .then((data) => {
  //   //               if (data.data) {
  //   //                 newData = {
  //   //                   nums: [
  //   //                     {
  //   //                       label: '担任法人:',
  //   //                       value: `${data.data.legalNum}家`,
  //   //                     },
  //   //                     {
  //   //                       label: '对外投资:',
  //   //                       value: `${data.data.outboundNum}家`,
  //   //                     },
  //   //                     {
  //   //                       label: '在外任职:',
  //   //                       value: `${data.data.managerNum}家`,
  //   //                     },
  //   //                     {
  //   //                       label: '控股企业:',
  //   //                       value: `${data.data.controlNum}家`,
  //   //                     },
  //   //                   ],
  //   //                   pic: data.data.pic,
  //   //                   name: data.data.personName,
  //   //                   infos: [
  //   //                     { label: '企业:', value: data.data.entName },
  //   //                     { label: '职位:', value: data.data.position },
  //   //                   ],
  //   //                 };
  //   //                 setTooltipData(newData);
  //   //                 setTooltipShow(true);
  //   //               }
  //   //             });
  //   //         }, 600);
  //   //         break;
  //   //     }
  //   //   }
  //   // });
  //   // 鼠标离开事件
  //   graph.on('node:mouseleave', (e) => {
  //     clearTimeout(timer);
  //     timer = null;
  //     setTooltipShow(false);
  //   });
  //   // canvas的点击事件，鼠标左键
  //   graph.on('canvas:click', (e) => {
  //     setTooltipShow(false);
  //     setShowDropdown(false);
  //   });
  //   // canvas的点击事件，鼠标右键
  //   graph.on('canvas:dblclick', (e) => {
  //     setTooltipShow(false);
  //     setShowDropdown(false);
  //   });
  //   // canvas的拖拽事件
  //   graph.on('canvas:dragstart', (e) => {
  //     setTooltipShow(false);
  //     setShowDropdown(false);
  //   });
  //   // 滚轮缩放
  //   graph.on('wheelzoom', (e) => {
  //     if (tooltipShow) {
  //       setTooltipShow(false);
  //     }
  //     // setTooltipShow(false);
  //   });
  //   // 调用 graph.moveTo，graph.translate，或 graph.zoom 均会触发该事件
  //   graph.on('viewportchange', (e) => {
  //     if (tooltipShow) {
  //       setTooltipShow(false);
  //     }
  //   });
  // };

  // // /* 点击展开获取数据 */
  // // const getCompanyMap = useRequest<API.ResultDataCompanyMapRetDto>(
  // //   (id) => queryCompanyMap({ id }),
  // //   {
  // //     manual: true,
  // //   },
  // // );

  // // /* 获取个人信息 */
  // // const getHumanInfo = useRequest<API.ResultDataHumanInfoRetDto>(
  // //   (entId, personId) => humanInfo({ entId, personId }),
  // //   {
  // //     manual: true,
  // //   },
  // // );

  // // /* 获取企业信息 */
  // // const getEnterpriseById = useRequest<API.AiCustomerEnterpriseVo[]>(
  // //   (entId) => queryEnterpriseById({ entId }),
  // //   {
  // //     manual: true,
  // //   },
  // // );

  // /* 点击下拉框企业时 */
  // const optionOnClick = (data) => {
  //   // 搜索节点实例
  //   const node = myGraph.findById(searchNodeId);
  //   const nodeModel = node.getModel();
  //   // 搜索节点的父节点信息
  //   const parentModel = node._cfg.parent.getModel();
  //   const { children } = parentModel;
  //   // 下拉框剩余企业
  //   const searchList = filterList.filter((child) => child.id !== data.id);

  //   // 添加到图中的企业
  //   const model = filterList.filter((child) => child.id === data.id);
  //   const str = JSON.stringify(children);
  //   const arr1 = JSON.parse(str);
  //   arr1.splice(arr1.length - 1, 0, model[0]);

  //   // 更新下拉框企业列表
  //   // setLists({ ...lists, [searchNodeId]: searchList });
  //   setFilterList(searchList);
  //   // 更新搜索节点，剩余数量
  //   node.update({ ...nodeModel, label: `搜索${searchList.length}` });
  //   // 父节点更新数据
  //   node._cfg.parent.update({ ...parentModel, children: arr1 });
  //   myGraph.layout();
  //   // 没有剩余企业后，隐藏搜索节点
  //   if (searchList.length === 0) {
  //     myGraph.removeChild(searchNodeId);
  //     setShowDropdown(false);
  //   }
  // };

  // // 输入框变化时
  // const onChange = (e) => {
  //   const { value } = e.target;
  //   const result = lists[searchNodeId].filter((item) =>
  //     item.label.includes(value),
  //   );
  //   setFilterList(result);
  // };

  return (
    <div
      className="enterprise-atlas-box"
      style={{ width: '100%', height: '100%', position: 'relative' }}
    >
      <div
        ref={ref}
        style={{ width: '100%', maxHeight: '100%', height: '100%' }}
      >
        {tooltipShow && (
          <MyTooltip data={tooltipData} x={tooltipX} y={tooltipY} />
        )}
      </div>
      {showDropdown && (
        <div
          className={styles['altas-mark']}
          onClick={() => {
            setShowDropdown(false);
          }}
        >
          <div
            className={styles['my-dropdown-box']}
            onClick={(e) => {
              e.stopPropagation();
            }}
          >
            <div className={styles['dropdown-box-top']}>
              <span>搜索</span>
              <span>当前数据过多，请点击您需要展示的数据进行</span>
              {/* <IconFont
                type="icon_guanbidanchuang"
                style={{
                  color: '#999999',
                  fontSize: '16px',
                  flex: 1,
                  textAlign: 'right',
                  cursor: 'pointer',
                }}
                onClick={() => {
                  setShowDropdown(false);
                }}
              /> */}
            </div>
            <Input
              placeholder="请输入公司名称"
              className={styles['search-input']}
              // suffix={
              //   <IconFont
              //     type="icon-sousuo1"
              //     style={{
              //       color: '#999999',
              //       fontSize: '14px',
              //       cursor: 'pointer',
              //     }}
              //     onClick={() => {
              //       setShowDropdown(false);
              //     }}
              //   />
              // }
              onChange={onChange}
            />
            <div className={styles['dropdown-list-box']}>
              {filterList?.length ? (
                filterList.map((item) => {
                  return (
                    <div
                      key={item.id}
                      className={styles['list-item']}
                      onClick={() => {
                        optionOnClick(item);
                      }}
                    >
                      {/* <Image
                        width={52}
                        preview={false}
                        src={item.pic ? `${item.pic}!qikewater` : enterLogo}
                      /> */}
                      <div className={styles['ente-title']}>{item.label}</div>
                    </div>
                  );
                })
              ) : (
                <span style={{ margin: '172px auto', color: '#999' }}>
                  暂无数据
                </span>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default EnterpriseAtlas;
