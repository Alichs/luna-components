/* 自定义企业信息卡片 */
import React from 'react';
import { Image } from 'antd';
import styles from '../css/tooltip.less';

interface PropTypes {
  data: {
    pic: string;
    name: string;
    nums?: { label: string; value: string }[];
    infos?: { label: string; value: string }[];
    tags?: [];
  };
  x: number;
  y: number;
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
    <div key={key}>
      <span className={styles['tooltip-label']}>{label}</span>
      <span className={styles['tooltip-value']}>{value || '-'}</span>
    </div>
  );
};

const MyTooltip: React.FC<PropTypes> = ({ data, x, y }) => {
  console.log(data.tags, 'data');
  return (
    <div
      className={styles['my-tooltip']}
      style={{ top: `${y}px`, left: `${x}px` }}
    >
      <div className={styles['tooltip-top']}>
        <div className={styles['top-left']}>
          <Image
            width={52}
            height={52}
            src={`${data.pic}!qikewater`}
            preview={false}
            // fallback={require('@/assets/enter.png')}
            className="img-logo"
          />
        </div>
        <div className={styles['top-right']}>
          <div className={styles['person-name']}>{data.name || '-'}</div>
          {data.tags ? (
            <div className={styles['tags-box']}>
              {data.tags.map((tag, index) => (
                <span
                  style={{
                    color: tagsColor[index % 5].color,
                    background: tagsColor[index % 5].bg,
                  }}
                  className={styles['tooltip-tag']}
                  key={tag}
                >
                  {tag}
                </span>
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
  );
};

export default MyTooltip;
