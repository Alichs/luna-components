/*
 * @Description:此分页不展示总页码
 * @Author: jiangfulin
 * @Date: 2021-12-17 14:30:39
 */
import React, { useState, useEffect, useMemo } from 'react';
import { Dropdown, Menu } from 'antd';
import { DownOutlined } from '@ant-design/icons';
import IconFont from '../IconFont';
import styles from './index.less';

export type TProps = {
  total: number;
  pageSize: number;
  current: number;
  hideOnSinglePage?: boolean;
  onChange: (page: any, pageSize: any) => void;
  defaultTotalPage?: number;
  pageSizeOptions?: string[];
  showSizeChange?: boolean;
  showTotal?: (total: any) => void;
  onShowSizeChange?: (current: any, size: any) => void;
};

const PageIndex: React.FC<TProps> = (props) => {
  const { total, pageSize } = props;

  const [ref, setRef] = useState<any>(null);

  //分页最后一个页码
  const [endPage, setEndPage] = useState<number>(props.defaultTotalPage!);
  //总页数
  const totalPage = Math.ceil(total / pageSize);

  useEffect(() => {
    if (totalPage < props.defaultTotalPage!) {
      setEndPage(totalPage);
    }
  }, [props.total]);

  const currentPage = useMemo(() => {
    return props.current;
  }, [props.current]);

  let start = Math.min(Math.max(currentPage - 5, 1), totalPage - pageSize + 1);
  let end = Math.min(Math.max(currentPage + 4, endPage), totalPage);

  const getPage = (page: any) => Math.min(Math.max(page, 1), totalPage);

  const onPageChange = (page: number) => {
    props.onChange && props.onChange(getPage(page), pageSize);
    //setCurrentPage(getPage(page));
  };
  const rendetPagination = () => {
    let tml: any = [];

    for (let i = start; i <= end; i++) {
      tml.push(
        <li
          className={`qk-pagination-item ${
            currentPage === i ? 'qk-pagination-item-active' : ''
          }`}
          onClick={() => {
            onPageChange(i);
          }}
        >
          {i}
        </li>,
      );
    }
    return tml;
  };
  const onPrevClick = () => {
    if (currentPage === 1) return;
    onPageChange(currentPage - 1);
  };
  const onNextClick = () => {
    if (currentPage === totalPage) return;
    onPageChange(currentPage + 1);
  };
  const onPageSizeChange = (size: any) => {
    props.onShowSizeChange && props.onShowSizeChange(currentPage, size);
  };
  const menu = () => (
    <Menu>
      {props.pageSizeOptions!.map((item: any, index) => (
        <Menu.Item
          key={index}
          className={`${item == props.pageSize ? 'active' : ''}`}
        >
          <div
            onClick={() => {
              onPageSizeChange(item);
            }}
          >
            {item}条/页
          </div>
        </Menu.Item>
      ))}
    </Menu>
  );
  return props.total ? (
    <div className={styles.qkPaginationContainer}>
      <span className="qk-total-label">
        {' '}
        {props.showTotal && props.showTotal(props.total)}
      </span>

      <ul>
        <li
          className={`qk-pagination-item qk-pagination-prev ${
            currentPage === 1 ? 'qk-not-allowd' : ''
          }`}
          onClick={onPrevClick}
        >
          <IconFont type="icon_zuo" />
        </li>
        {rendetPagination()}
        <li
          className={`qk-pagination-item qk-pagination-next ${
            currentPage === totalPage ? 'qk-not-allowd' : ''
          }`}
          onClick={onNextClick}
        >
          <IconFont type="icon_you" />
        </li>
      </ul>
      {props.showSizeChange && (
        <Dropdown
          overlay={menu}
          trigger={['click']}
          placement="bottomLeft"
          getPopupContainer={(node) => ref}
          overlayClassName="batch-receive"
        >
          <div className="qk-select-selector" ref={setRef}>
            <span className="qk-page">{props.pageSize}条/页</span>
            <DownOutlined />
          </div>
        </Dropdown>
      )}
    </div>
  ) : null;
};
PageIndex.defaultProps = {
  defaultTotalPage: 10,
  current: 1,
  showSizeChange: true,
  hideOnSinglePage: true,
  pageSizeOptions: ['10', '20', '50', '100'],
};
export default PageIndex;
