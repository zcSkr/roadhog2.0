import React, { Component } from 'react';
import {  ListView, PullToRefresh } from 'antd-mobile';

import ActivityIndicator from "./ActivityIndicator";

export default class MyListView extends Component {
  state = {
    ref: Math.random().toString(36).substr(2),
  };

  componentDidUpdate() {
    if (this.props.useBodyScroll) {
      document.body.style.overflow = 'auto';
    }
  }

  render() {
    const { ref } = this.state;
    const {
      style,
      className,
      loading,
      refreshing,
      list,
      pagination,
      renderBodyComponent,
      renderHeader,
      renderFooter,
      renderSeparator,
      renderRow,
      rowHasChanged,
      useBodyScroll,
      onScroll,
      onEndReached,
      onRefresh,
    } = this.props;
    let dataSource = new ListView.DataSource({ rowHasChanged: (row1, row2) => (row1 !== row2) });
    if (rowHasChanged)
      dataSource = new ListView.DataSource({ rowHasChanged: rowHasChanged });
    dataSource = dataSource.cloneWithRows((list ? list : []))

    const refreshProps = {
      refreshing,
      onRefresh: () => { onRefresh && onRefresh() },
    };

    const _renderFooter = () => {
      if (renderFooter) {
        return renderFooter(loading, list);
      } else {
        if (list == null || loading) {
          return <ActivityIndicator />;
        }
        if (list != null && list.length == 0) {
          return (
            <div style={{ padding: 10, textAlign: 'center', fontSize: '16px', color: '#ccc' }}>
              <span>暂无数据</span>
            </div>
          );
        }
        return null;
      }
    };

    const _onEndReached = (event) => {
      let { total, current, pageSize } = pagination;
      let hasMore = false;
      if (pagination && total && current && pageSize)
        hasMore = total > current * pageSize;

      if (refreshing || loading || !hasMore) {
        return;
      }

      if (onEndReached)
        onEndReached(current + 1);
    }

    return (
      <div className={'global-am-list nbb'} style={{ height: '100%', ...style }}>
        <ListView
          ref={ref}
          style={useBodyScroll ? {} : { height: '100%', ...style }}
          className={className}
          dataSource={dataSource}
          renderBodyComponent={renderBodyComponent}
          renderHeader={renderHeader}
          renderFooter={_renderFooter}
          renderSeparator={renderSeparator}
          renderRow={renderRow}
          useBodyScroll={useBodyScroll} //使用该属性时，下拉刷新会失效 
          onScroll={onScroll}
          scrollRenderAheadDistance={200}
          scrollEventThrottle={20}
          onEndReached={_onEndReached}
          onEndReachedThreshold={10}
          pullToRefresh={<PullToRefresh {...refreshProps} />}
          pageSize={pagination ? pagination.pageSize : undefined}
        />
      </div>
    );
  }
} 
