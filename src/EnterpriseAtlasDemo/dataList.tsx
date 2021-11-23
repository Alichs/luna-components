const data = {
  id: '1',
  label: '运营思维导图',
  nodeType: 'node',
  children: [
    {
      id: '1-1',
      label: '运营方案',
      note: '第 1 阶段',
      nodeType: 'node',
      site: 'right',
      children: [
        {
          id: '1-1-1',
          label: '服务内容确定',
          note: '①',
          children: [
            {
              id: '1-1-1-1',
              label: '视频拍摄',
            },
            {
              id: '1-1-1-2',
              label: '直播间',
            },
            {
              id: '1-1-1-3',
              label: '网红代言',
            },
            {
              id: '1-1-1-search',
              label: '搜索',
              child: [
                {
                  id: '1-1-1-4',
                  label: '开屏广告',
                  // collapsed: true,
                  children: [
                    {
                      id: '1-1-1-4-1',
                      label: '轮播',
                    },
                  ],
                },
              ],
            },
          ],
        },
        {
          id: '1-1-2',
          label: '设计方案',
          note: '②',
          children: [
            {
              id: '1-1-2-1',
              label: '产品定位',
            },
            {
              id: '1-1-2-2',
              label: '抖音属性',
            },
            {
              id: '1-1-2-3',
              label: '经营理念',
            },
          ],
        },
        {
          id: '1-1-3',
          label: '视频周期更新',
          note: '③',
          children: [
            {
              id: '1-1-3-1',
              label: '上传视频数量',
            },
            {
              id: '1-1-3-2',
              label: '上传时间',
            },
          ],
        },
      ],
    },
    {
      id: '1-2',
      label: '养号期',
      note: '第 2 阶段',
      nodeType: 'node',
      site: 'right',
      children: [
        {
          id: '1-2-1',
          label: '开通蓝 V 服务',
          note: '④',
          children: [
            {
              id: '1-2-1-1',
              label: '收集资料',
            },
            {
              id: '1-2-1-2',
              label: '蓝V认证',
            },
          ],
        },
        {
          id: '1-2-2',
          label: '剧本',
          note: '⑤',
          children: [
            {
              id: '1-2-2-1',
              label: '热点话题',
            },
            {
              id: '1-2-2-2',
              label: '创意脚本',
            },
            {
              id: '1-2-2-3',
              label: '确认脚本',
            },
            {
              id: '1-2-2-4',
              label: '镜头分表',
            },
            {
              id: '1-2-2-search',
              label: '搜索',
              child: [
                {
                  id: '1-2-2-5',
                  label: '镜头分表1',
                },
                {
                  id: '1-2-2-6',
                  label: '镜头分表2',
                },
              ],
            },
          ],
        },
        {
          id: '1-2-3',
          label: '拍摄',
          note: '⑥',
        },
      ],
    },
    {
      id: '1-3',
      label: '产品营销',
      nodeType: 'node',
      site: 'left',
      collapsed: true,
      children: [
        {
          id: '1-3-1',
          label: '商品输入',
          site: 'left',
        },
        {
          id: '1-3-2',
          label: '活动策划',
          site: 'left',
        },
      ],
    },
  ],
};

export default data;
