/* 注册自定义节点 */

export default (G6) => {
  G6.registerNode(
    'tree-node',
    {
      draw(cfg, group) {
        // console.log(G6, 'G6');

        const style = this.getShapeStyle(cfg, group);
        const commonStyle = {
          cursor: 'pointer',
        };
        const width = Math.ceil(G6.Util.getTextSize(cfg.label, 14)[0]);
        let shape = group.addShape('rect', {
          attrs: {
            ...style,
            ...commonStyle,
            // width: width,
          },
          name: 'rect-node',
        });

        // 补充节点到展开按钮的线条
        const lineLength = !cfg.collapsed ? 22 : 11;
        const iconMark = cfg.collapsed ? '+' : '-';
        if (cfg.site === 'left') {
          console.log(1111);

          group.addShape('text', {
            attrs: {
              fontSize: 14,
              fill: '#666',
              text: cfg.label,
              textAlign: 'left',
              textBaseline: 'middle',
              x: -12,
              y: 0,
              ...commonStyle,
            },
            name: 'node-label',
          });

          if (cfg.children) {
            group.addShape('path', {
              attrs: {
                path: [
                  ['M', -style.width / 2, 0],
                  ['L', -style.width / 2 - lineLength, 0],
                ],
                stroke: 'red',
                ...cfg,
                lineWidth: 2,
                x: -style.width - 111,
                y: 6,
              },
              name: 'node-icon-edge',
            });
            group.addShape('circle', {
              attrs: {
                r: 7,
                fill: '#fff',
                stroke: '#ccc',
                x: -style.width / 2 - 11,
                ...commonStyle,
              },
              name: 'node-icon',
            });

            group.addShape('text', {
              attrs: {
                text: iconMark,
                fontSize: 16,
                fill: '#ccc',
                x: -style.width / 2 - 16,
                y: 6,
                ...commonStyle,
              },
              name: 'node-icon-text',
            });
          }
        } else {
          console.log('right');

          group.addShape('text', {
            attrs: {
              fontSize: 14,
              fill: '#666',
              text: cfg.label,
              x: -style.width / 2 + 6,
              y: style.height / 2 - 8,
              ...commonStyle,
            },
            name: 'node-label',
          });

          if (cfg.children) {
            // 补充节点到展开按钮的线条
            group.addShape('path', {
              attrs: {
                path: [
                  ['M', style.width / 2, 0],
                  ['L', style.width / 2 + lineLength, 0],
                ],
                stroke: 'red',
                ...cfg,
                lineWidth: 2,
                x: style.width + 111,
                y: 6,
              },
              name: 'node-icon-edge',
            });
            group.addShape('circle', {
              attrs: {
                r: 7,
                fill: '#fff',
                stroke: '#ccc',
                x: style.width / 2 + 11,
                ...commonStyle,
              },
              name: 'node-icon',
            });

            group.addShape('text', {
              attrs: {
                text: iconMark,
                fontSize: 16,
                fill: '#ccc',
                x: style.width / 2 + 6,
                y: 6,
                ...commonStyle,
              },
              name: 'node-icon-text',
            });
          }
        }

        if (cfg.id.includes('search')) {
          shape = group.addShape('rect', {
            attrs: {
              ...style,
              ...commonStyle,
              width: width,
              height: 30,
            },
            name: 'rect-node',
          });
          group.addShape('rect', {
            attrs: {
              ...style,
              ...commonStyle,
            },
            name: 'rect-node-search',
          });
          const { child } = cfg;
          group.addShape('text', {
            attrs: {
              fontSize: 14,
              fill: '#666',
              text: `${cfg.label}(${child.length})`,
              x: -style.width / 2 + 6,
              y: style.height / 2 - 8,
              ...commonStyle,
            },
            name: 'node-search-label',
          });
        }
        return shape;
      },
      update(cfg, node) {
        const group = node.getContainer();
        const children = group.get('children');
        const icon = children.find(
          (child) => child.cfg.name === 'node-icon-text',
        );
        const path = children.find(
          (child) => child.cfg.name === 'node-icon-edge',
        );

        if (path) {
          const style = this.getShapeStyle(cfg, group);
          const lineLength = !cfg.collapsed ? 22 : 11;
          if (cfg.site === 'left') {
            path.attr({
              path: [
                ['M', -style.width / 2, 0],
                ['L', -style.width / 2 - lineLength, 0],
              ],
            });
          } else {
            path.attr({
              path: [
                ['M', style.width / 2, 0],
                ['L', style.width / 2 + lineLength, 0],
              ],
            });
          }
        }

        if (icon) {
          icon.attr({
            text: cfg.collapsed ? '+' : '-',
          });
        }
      },
    },
    'rect',
  );
};
