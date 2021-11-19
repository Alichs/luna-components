const styles = {
  defaultStyle: {
    node: {
      width: '80px',
      height: '40px',
      'border-width': '2px',
      'border-opacity': 0.5,
      'border-color': '#707070',
      'background-color': '#5585C4',
      'background-repeat': 'no-repeat',
      'background-fit': function (ele: any) {
        return ele.data('bgImages') && ele.data('bgImages').fit
          ? ele.data('bgImages').fit
          : 'contain';
      },
      'background-image': function (ele: any) {
        return ele.data('bgImages') ? ele.data('bgImages').image : 'none';
      },
      'background-clip': function (ele: any) {
        return ele.data('bgImages') && ele.data('bgImages').clip
          ? ele.data('bgImages').clip
          : 'none';
      },
      'background-width-relative-to': 'inner',
      'background-height-relative-to': 'inner',
      content: function (ele: any) {
        console.log(ele);
        debugger;
      },
      'font-family': 'Microsoft Yahei',
      'font-size': '12px',
      'text-halign': 'center',
      'text-valign': 'bottom',
      'text-wrap': 'wrap',
      padding: '8px',
      'text-margin-y': '5px',
    },
    'node:selected': {
      'border-color': '#ffd200',
      'text-background-opacity': '0.2',
      'text-background-shape': 'rectangle',
      'text-background-padding': '2px',
    },
    'node.blue': {
      'background-color': '#4887bd',
      'border-color': '#4887bd',
    },
    'node.blue:selected': {
      'border-color': '#fbba0a',
    },
    'node.emphasis': {
      width: '40px',
      height: '40px',
      shape: 'polygon',
      'shape-polygon-points':
        '0 1, 0.8660254037844386 0.5, 0.8660254037844386 -0.5, 0 -1, -0.8660254037844386 -0.5, -0.8660254037844386 0.5',
      'border-color': '#e5425d',
    },
    'node.red': {
      'background-color': '#d47fa9',
      'border-color': '#e5425d',
    },
    'node.red:selected': {
      'border-color': '#fbba0a',
      'background-color': '#e5425d',
    },
    'node.green': {
      'background-color': '#3c763d',
      'border-color': '#3c763d',
    },
    'node.green:selected': {
      'border-color': '#00c76c',
      'background-color': '#00c76c',
    },
    'node.yellow': {
      'background-color': '#f7ecb5',
      'border-color': '#f7ecb5',
    },
    'node.yellow:selected': {
      'border-color': '#fbba0a',
      'background-color': '#fbba0a',
    },
    edge: {
      width: '1px',
      'line-color': '#6990ea',
      label: 'data(text)',
      color: '#333333',
      'font-family': 'Microsoft Yahei',
      'font-size': '12px',
      'min-zoomed-font-size': '12px',
      'edge-text-rotation': 'autorotate',
      'curve-style': 'bezier',
      'target-arrow-color': '#6990ea',
    },
    'edge:selected': {
      'line-color': '#ff0000',
      'target-arrow-color': '#ff0000',
    },
  },
  groupStyle: {
    /* ---------- 实体 ---------- */
    core: {
      'selection-box-color': 'rgba(72, 133, 184, 0.2)',
    },
    node: {
      width: '60px',
      height: '60px',
      shape: 'ellipse',
      'border-opacity': 1,
      opacity: 1,
      'overlay-color': '#fff',
      'background-fit': 'none',
      'background-color': '#4EA2F0',
      'background-opacity': 1,
      'text-halign': 'center',
      'text-valign': 'center',
      'background-repeat': 'no-repeat',
      // 'background-fit': 'contain contain',
      'background-image': 'data(bgImages.image)',
      'background-position-x': 'data(bgImages.positionX)',
      'background-position-y': 'data(bgImages.positionY)',
      label: function (ele: any) {
        let label = ele.data().properties.name;
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
        return;
      },
      color: '#fff',
      'font-family': 'Microsoft Yahei',
      'font-size': '12px',
      'text-wrap': 'wrap',
      padding: '4px',
      'background-image-crossorigin': 'anonymous',
    },
    /* 'node.blur': {
          'opacity': 0.2,
        }, */
    'node.keyPerson': {
      'background-color': '#7f10be',
      'border-color': '#7f10be',
      'border-width': '3px',
    },
    'node.wechat': {
      'background-color': '#21B13F',
      'border-color': '#21B13F',
      'border-width': '3px',
      'background-height': '50%',
      'background-width': '50%',
      width: '40px',
      height: '40px',
    },
    'node.woman': {
      'background-color': '#E772B7',
      'border-color': '#E772B7',
      'border-width': '3px',
      'background-height': '50%',
      'background-width': '50%',
      width: '40px',
      height: '40px',
    },
    'node.man': {
      'background-color': '#3885C0',
      'border-color': '#3885C0',
      'border-width': '3px',
      'background-height': '50%',
      'background-width': '50%',
      width: '40px',
      height: '40px',
    },
    'node.QQ': {
      'background-color': '#EEC900',
      'border-color': '#EEC900',
      'border-width': '3px',
      'background-height': '50%',
      'background-width': '50%',
      width: '40px',
      height: '40px',
    },
    'node.phone': {
      'background-color': '#7F68BD',
      'border-color': '#7F68BD',
      'border-width': '3px',
      'background-height': '50%',
      'background-width': '50%',
      width: '40px',
      height: '40px',
    },
    'node.level1': {
      'background-color': '#ffd200',
      'border-color': '#ffd200',
      'border-width': '3px',
      width: '35px',
      height: '35px',
    },
    'node.level2': {
      'background-color': '#cd0015',
      'border-width': '3px',
      'border-color': '#cd0015',
      width: '30px',
      height: '30px',
    },
    'node.level3': {
      'background-color': '#ff5500',
      'border-color': '#ff5500',
      'border-width': '3px',
      width: '25px',
      height: '25px',
    },
    'node.level4': {
      'background-color': '#2937ff',
      'border-color': '#2937ff',
      'border-width': '3px',
      width: '20px',
      height: '20px',
    },
    'node.level5': {
      'background-color': '#00b81d',
      'border-color': '#00b81d',
      'border-width': '3px',
      width: '15px',
      height: '15px',
    },
    'node:locked': {},
    'node:selected': {
      'border-color': '#FCED63',
      'border-width': '3px',
    },
    'node.shape-hexagon': {
      shape: 'polygon',
      // 'background-color': '#ffd200',
      'shape-polygon-points':
        '0 1, 0.8660254037844386 0.5, 0.8660254037844386 -0.5, 0 -1, -0.8660254037844386 -0.5, -0.8660254037844386 0.5',
    },
    'node.shape-rectangle': {
      shape: 'roundrectangle',
      width: '50px',
      height: '50px',
    },
    'node.shape-rectangle:selected': {
      width: '53px',
      height: '53px',
    },
    /* ---------- 关系 ---------- */
    edge: {
      width: '0.8px',
      'line-color': '#9bb7f0',
      opacity: 1,
      content: 'data(event)',
      color: '#707070',
      'font-family': 'Microsoft Yahei',
      'font-size': '12px',
      'min-zoomed-font-size': '12px',
      'edge-text-rotation': 'autorotate',
      'curve-style': 'straight',
      'text-background-color': '#f6f7f9',
      'text-background-opacity': '1',
      'text-background-shape': 'roundrectangle',
      // 'target-arrow-shape': 'triangle'
    },
    'edge.darken': {
      'text-background-color': '#042544',
    },
    'edge:selected': {
      'line-color': '#fbba0a',
      // 'target-arrow-color': '#fbba0a'
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
  homeGroupStyle: {
    /* ---------- 实体 ---------- */
    core: {
      'selection-box-color': 'rgba(72, 133, 184, 0.2)',
    },
    node: {
      width: '40px',
      height: '40px',
      shape: 'ellipse',
      'border-opacity': 1,
      opacity: 1,
      'background-width': '40%',
      'background-height': '40%',
      'background-fit': 'none',
      'background-color': '#3a9caa',
      'background-opacity': 1,
      'background-repeat': 'no-repeat',
      'background-image': 'data(bgImages.image)',
      'background-position-x': 'data(bgImages.positionX)',
      'background-position-y': 'data(bgImages.positionY)',
      content: 'data(name)',
      color: '#909090',
      'font-family': 'Microsoft Yahei',
      'font-size': '12px',
      'text-halign': 'center',
      'text-valign': 'bottom',
      'text-wrap': 'wrap',
      'padding-bottom': '4px',
      'padding-left': '4px',
      'background-image-crossorigin': 'anonymous',
      'text-margin-y': '8px',
    },
    /* 'node.blur': {
          'opacity': 0.2,
        }, */
    'node.keyPerson': {
      'background-color': '#7f10be',
      'border-color': '#7f10be',
      'border-width': '3px',
    },
    'node.wechat': {
      'background-color': '#21B13F',
      'border-color': '#21B13F',
      'border-width': '3px',
      'background-height': '50%',
      'background-width': '50%',
      width: '40px',
      height: '40px',
    },
    'node.woman': {
      'background-color': '#E772B7',
      'border-color': '#E772B7',
      'border-width': '3px',
      'background-height': '50%',
      'background-width': '50%',
      width: '40px',
      height: '40px',
    },
    'node.man': {
      'background-color': '#3885C0',
      'border-color': '#3885C0',
      'border-width': '3px',
      'background-height': '50%',
      'background-width': '50%',
      width: '40px',
      height: '40px',
    },
    'node.QQ': {
      'background-color': '#EEC900',
      'border-color': '#EEC900',
      'border-width': '3px',
      'background-height': '50%',
      'background-width': '50%',
      width: '40px',
      height: '40px',
    },
    'node.phone': {
      'background-color': '#7F68BD',
      'border-color': '#7F68BD',
      'border-width': '3px',
      'background-height': '50%',
      'background-width': '50%',
      width: '40px',
      height: '40px',
    },
    'node.level0': {
      'background-color': '#7f10be',
      'border-color': '#7f10be',
      'border-width': '3px',
      width: '35px',
      height: '35px',
    },
    'node.level1': {
      'background-color': '#ffd200',
      'border-color': '#ffd200',
      'border-width': '3px',
      width: '35px',
      height: '35px',
    },
    'node.level2': {
      'background-color': '#eb5352',
      'border-width': '3px',
      'border-color': '#eb5352',
      width: '30px',
      height: '30px',
    },
    'node.level3': {
      'background-color': '#ff5500',
      'border-color': '#ff5500',
      'border-width': '3px',
      width: '25px',
      height: '25px',
    },
    'node.level4': {
      'background-color': '#1890ff',
      'border-color': '#1890ff',
      'border-width': '3px',
      width: '20px',
      height: '20px',
    },
    'node.level5': {
      'background-color': '#00c76c',
      'border-color': '#00c76c',
      'border-width': '3px',
      width: '15px',
      height: '15px',
    },
    'node:locked': {},
    'node:selected': {
      'border-color': '#FCED63',
      'border-width': '3px',
    },
    'node.shape-hexagon': {
      shape: 'polygon',
      // 'background-color': '#ffd200',
      'shape-polygon-points':
        '0 1, 0.8660254037844386 0.5, 0.8660254037844386 -0.5, 0 -1, -0.8660254037844386 -0.5, -0.8660254037844386 0.5',
    },
    'node.shape-rectangle': {
      shape: 'roundrectangle',
      width: '50px',
      height: '50px',
    },
    'node.shape-rectangle:selected': {
      width: '53px',
      height: '53px',
    },
    /* ---------- 关系 ---------- */
    edge: {
      width: '1px',
      'line-color': '#9bb7f0',
      opacity: 1,
      content: 'data(event)',
      color: '#707070',
      'font-family': 'Microsoft Yahei',
      'font-size': '12px',
      'min-zoomed-font-size': '12px',
      'edge-text-rotation': 'autorotate',
      'curve-style': 'bezier',
      // 'text-background-color': 'tranparent',
      'text-background-opacity': '0',
      'text-background-shape': 'roundrectangle',
      // 'target-arrow-shape': 'triangle'
    },
    'edge.darken': {
      'text-background-color': '#042544',
    },
    'edge:selected': {
      'line-color': '#fbba0a',
      // 'target-arrow-color': '#fbba0a'
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
