const styles = {
  defaultStyle: {
    /* ---------- 实体 ---------- */
    node: {
      width: '50px',
      height: '50px',
      shape: 'ellipse',
      'border-opacity': 1,
      opacity: 1,
      'overlay-color': '#fff',
      color: '#fff',
      'background-color': '#4B74FF',
      'text-halign': 'center',
      'text-valign': 'center',
      'background-repeat': 'no-repeat',
      'background-fit': 'cover',
      //  'background-image-crossorigin': 'anonymous',
      'background-image': function (ele: any) {
        var picture = ele.data('pic');
        if (picture) {
          //  return picture
        } else {
          return 'none';
        }
      },
      label: function (ele: any) {
        let label = ele.data().name;
        var length = label.length;

        if (length <= 5) {
          // 4 5 4排列
          return label;
        } else if (length >= 5 && length <= 9) {
          return (
            label.substring(0, length - 5) +
            '\n' +
            label.substring(length - 5, length)
          );
        } else if (length >= 9 && length <= 13) {
          return (
            label.substring(0, 4) +
            '\n' +
            label.substring(4, 9) +
            '\n' +
            label.substring(9, 13)
          );
        } else {
          return (
            label.substring(0, 4) +
            '\n' +
            label.substring(4, 9) +
            '\n' +
            label.substring(9, 12) +
            '..'
          );
        }
      },

      'font-family': 'Microsoft Yahei',
      'font-size': '11px',
      'text-wrap': 'wrap',

      padding: 6,
      'text-margin-y': function (e: any) {
        //当前节点有图片
        if (e.data('pic')) {
          return 18;
        }

        return 0;
      },
    },
    'node.center': {
      'background-color': '#FF8F00',
      color: '#fff',
      width: '60px',
      height: '60px',
    },
    'node.person': {
      'background-color': '#F62828',
      color: '#fff',
      width: '40px',
      height: '40px',
    },
    'node.focus': {
      opacity: 1,
    },
    'node.blur': {
      opacity: 0.2,
      label: '',
    },
    /* ---------- 关系 ---------- */
    edge: {
      width: '0.4px',
      'line-color': '#999',
      //opacity: 0.5,
      content: 'data(event)',
      // color: '#D4DEFF',
      'font-family': 'Microsoft Yahei',
      'font-size': '12px',
      'min-zoomed-font-size': '12px',
      // 'line-style': 'dashed',
      'edge-text-rotation': 'autorotate',
      'curve-style': 'bezier',
      color: '#F62828',
      'text-background-color': 'none',
      'text-background-opacity': '0',
      'text-background-shape': 'roundrectangle',
      'target-arrow-shape': 'triangle',
      'target-arrow-color': '#F62828',
      label: function (ele: any) {
        return ele.data().label;
      },
    },
    'edge.darken': {
      'text-background-color': '#042544',
    },
    'edge:selected': {
      'line-color': '#fbba0a',
      // 'target-arrow-color': '#fbba0a'
    },
    'edge.focus': {
      opacity: 1,
    },
    'edge.blur': {
      opacity: 0.2,
      content: '',
    },
    // 有向边
    /* 'edge.blureed': {
           'opacity': 0.2,
         }, */
    '.hidenodes': {
      'background-color': '#333',
      'line-color': '#333',
    },
    /* ---------- zoom变化 ---------- */
    '.hidtxt': {
      content: '',
    },

    '.showname': {
      content(ele) {
        return ele.data('name');
      },
    },
    /* {
            selector: '.event.hidicon',
            css: {
                'display': 'none'
            }
        }, */
    '.showbigger': {
      content(ele) {
        return ele.data('detail');
      },
    },
    '.showsmall': {
      content: '',
    },
    'node.showtiny:selected': {
      'border-width': '10px',
    },
    // 有向边
    'edge.directed': {
      'line-color': '#9bb7f0',
      'target-arrow-shape': 'triangle',
      'target-arrow-color': '#9bb7f0',
    },
    'edge.directed:selected': {
      'line-color': '#fbba0a',
      'target-arrow-shape': 'triangle',
      'target-arrow-color': '#fbba0a',
    },
    '.hide': {
      opacity: 0,
    },
    '.blur': {
      opacity: 0.2,
    },
  },
};
export default styles;
