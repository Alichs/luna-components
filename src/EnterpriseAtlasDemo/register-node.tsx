/* 注册自定义节点 */

import React from 'react';
import {
  Rect,
  Text,
  Circle,
  Group,
  createNodeFromReact,
} from '@antv/g6-react-node';
import { colors } from './config';

const Card = ({ cfg }) => {
  // console.log(cfg, 'cfg');
  const { label, collapsed, children } = cfg;
  return (
    <Group>
      <Rect
        style={{
          fill: '#fff',
          flexDirection: 'row',
          alignItems: 'center',
        }}
        name="rect-box"
        // onMouseOver={(evt, node, shape, graph) => {
        //   console.log(evt, node, shape, graph);
        //   if (node) {
        //     graph.updateItem(node, {
        //       // 节点的样式
        //       style: {
        //         stroke: 'blue',
        //       },
        //     });
        //   }
        // }}
      >
        <Rect
          style={{
            width: 'auto',
            height: 32,
            fill: '#fff',
            stroke: '#ddd',
            radius: [2],
            justifyContent: 'center',
            padding: [12, 0],
            alignItems: 'center',
            cursor: 'pointer',
          }}
          onClick={(evt, node, shape, graph) => {
            const target = evt.target;
            const item = evt.item;
            const model = item?.getModel();
            console.log(target, item?.hasState('selected'), model);
            if (item) {
              console.log(target.cfg, 'target----');
              graph.updateItem(item, {
                style: {
                  stroke: 'green',
                },
                stateStyles: {
                  hover: {
                    fill: 'yellow',
                    'circle-text': {
                      fill: 'blue',
                    },
                  },
                  selected: {
                    fill: 'red',
                    'circle-text': {
                      fill: 'blue',
                    },
                  },
                },
              });
              // graph.updateItem(item, model);
              // const autoPaint = graph.get('autoPaint');
              // graph.setAutoPaint(false);
              graph.setItemState(model.id, 'selected', true);
              graph.paint();
              item.update(model);
              // graph.setAutoPaint(autoPaint);
            }
          }}
          // onMouseOver={(evt, node, shape, graph) => {
          //   console.log(evt, node, shape, graph);
          //   if (node) {
          //     graph.updateItem(node, {
          //       // 节点的样式
          //       style: {
          //         stroke: 'blue',
          //       },
          //     });
          //   }
          // }}
          // onMouseLeave={(evt, node, shape, graph) => {
          //   // console.log(evt, node, shape, graph)
          // }}
        >
          <Text
            style={{
              fill: colors.labelColor,
              margin: [0, 6, 0, 6],
              fontSize: 12,
              fontWeight: 500,
              cursor: 'pointer',
            }}
          >
            {label}
          </Text>
        </Rect>
        {children ? (
          <Circle
            style={{
              x: 380,
              y: 20,
              r: 6,
              fill: '#fff',
              stroke: '#ddd',
              justifyContent: 'center',
              margin: [0, 4, 0, 6],
            }}
          >
            <Text
              name="circle-text"
              style={{
                fill: colors.circleColor,
                fontSize: 10,
                fontWeight: 500,
                margin: [0, 0, 3, 3],
                cursor: 'pointer',
              }}
              onClick={(evt, node, shape, graph) => {
                const target = evt.target;
                const item = evt.item;
                const model = item?.getModel();
                console.log(evt.target, 'evt.target');
                console.log(evt.item, 'evt.item');
                console.log(evt.item?.getModel(), 'model');
                if (node) {
                  graph.updateItem(node, {
                    collapsed: !collapsed,
                  });
                  // graph.updateItem(item, model);
                  graph.layout();
                }
                evt?.item.toFront();
              }}
            >
              {collapsed ? '+' : '-'}
            </Text>
          </Circle>
        ) : (
          ''
        )}
      </Rect>
    </Group>
  );
};

export default createNodeFromReact(Card);
