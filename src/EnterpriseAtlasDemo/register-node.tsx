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
        onMouseOver={(evt, node, shape, graph) => {
          console.log(evt, node, shape, graph);
          if (node) {
            graph.updateItem(node, {
              // 节点的样式
              style: {
                stroke: 'blue',
              },
            });
          }
        }}
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
          onMouseOver={(evt, node, shape, graph) => {
            console.log(evt, node, shape, graph);
            if (node) {
              graph.updateItem(node, {
                // 节点的样式
                style: {
                  stroke: 'blue',
                },
              });
            }
          }}
          onMouseLeave={(evt, node, shape, graph) => {
            // console.log(evt, node, shape, graph)
          }}
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
              style={{
                fill: colors.circleColor,
                fontSize: 10,
                fontWeight: 500,
                margin: [0, 0, 3, 3],
                cursor: 'pointer',
              }}
              onClick={(evt, node, shape, graph) => {
                if (node) {
                  graph.updateItem(node, {
                    collapsed: !collapsed,
                  });
                  graph.layout();
                }
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
