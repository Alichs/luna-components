/* 自定义企业信息卡片 */
import React from 'react';
import { Image } from 'antd';
import styles from './css/tooltip.less';
import { openParent } from '../utils/index';
// const noData = require('@/assets/nodata.png');

interface PropTypes {
  data: {
    fallbackImg: string;
    pic: string;
    name: string;
    dataId?: string;
    nums?: { label: string; value: string }[];
    infos?: { label: string; value: string }[];
    tags?: [];
  };
}

interface PropTypesLabel {
  key: string;
  label: string;
  value: string;
}

const tagsColor = [
  { bg: '#FEF1DF', color: '#FF8411' },
  { bg: '#DFECFF', color: '#6E8EFC' },
  { bg: '#DFECFF', color: '#4387EA' },
  { bg: '#E8F7E3', color: '#50B72A' },
  { bg: '#FEE9E9', color: '#F62828' },
];

const LabelValue: React.FC<PropTypesLabel> = ({ key, label, value }) => {
  return (
    <div key={key} className={styles['label-value-box']}>
      <span className={styles['tooltip-label']}>{label}</span>
      <span className={styles['tooltip-value']}>{value || '-'}</span>
    </div>
  );
};

const MyTooltip: React.FC<PropTypes> = ({ data }) => {
  const logo = data.pic
    ? data.pic?.slice(0, 4) === 'data'
      ? data.pic
      : `${data.pic}!qikewater`
    : '';

  const goToGraph = (entId: string) => {
    openParent('detail?entId=' + entId);
  };
  return (
    <>
      {JSON.stringify(data) === '{}' ? (
        <div className={styles['tooltip-nodata']}>
          <img src="" />
          暂无数据
        </div>
      ) : (
        <div className={styles['my-tooltip']}>
          <div className={styles['tooltip-top']}>
            <div className={styles['top-left']}>
              <Image
                width={52}
                height={52}
                src={logo}
                preview={false}
                fallback={data.fallbackImg}
                className="img-logo"
              />
            </div>
            <div className={styles['top-right']}>
              <div
                className={styles['person-name']}
                style={{
                  color: data.dataId ? '#4B74FF' : '#363b4d',
                  cursor: data.dataId ? 'pointer' : '',
                }}
                onClick={() => {
                  data.dataId && goToGraph(data.dataId);
                }}
              >
                {data.name || '-'}
              </div>
              {data.tags ? (
                <div className={styles['tags-box']}>
                  {data.tags.map((tag, index) => (
                    <div
                      style={{
                        color: tagsColor[index % 5].color,
                        background: tagsColor[index % 5].bg,
                      }}
                      className={styles['tooltip-tag']}
                      key={tag}
                    >
                      {tag}
                    </div>
                  ))}
                </div>
              ) : (
                ''
              )}
              <div>
                {data.infos &&
                  data.infos.map((info, index) => (
                    <LabelValue
                      key={`${info.value}-${index}`}
                      label={info.label}
                      value={info.value || '-'}
                    />
                  ))}
              </div>
            </div>
          </div>
          {data.nums ? (
            <div className={styles['tooltip-bottom']}>
              {data.nums.map((num, index) => (
                <LabelValue
                  key={`${num.value}-${index}`}
                  label={num.label}
                  value={num.value || '-'}
                />
              ))}
            </div>
          ) : (
            ''
          )}
        </div>
      )}
    </>
  );
};

export default MyTooltip;
