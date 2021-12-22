/* 自定义企业信息卡片 */
import React from 'react';
import { Image } from 'antd';
import './css/tooltip.less';
import { openParent } from '../utils/index';
// import noData from '../assets/nodata.png';
// import noData from '@/assets/nodata.png';

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
  imptyImg?: string;
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
    <div key={key} className="label-value-box">
      <span className="tooltip-label">{label}</span>
      <span className="tooltip-value">{value || '-'}</span>
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
        <div className="tooltip-nodata">
          <img src="data:image/png;base64,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" />
          暂无数据
        </div>
      ) : (
        <div className="my-tooltip">
          <div className="tooltip-top">
            <div className="top-left">
              <Image
                width={52}
                height={52}
                src={logo}
                preview={false}
                fallback={data.fallbackImg}
                className="img-logo"
              />
            </div>
            <div className="top-right">
              <div
                className="person-name"
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
                <div className="tags-box">
                  {data.tags.map((tag, index) => (
                    <div
                      style={{
                        color: tagsColor[index % 5].color,
                        background: tagsColor[index % 5].bg,
                      }}
                      className="tooltip-tag"
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
            <div className="tooltip-bottom">
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
