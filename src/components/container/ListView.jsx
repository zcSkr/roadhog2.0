import React, { PropTypes, Component } from 'react';
import { Icon, ListView, PullToRefresh } from 'antd-mobile';
import { isEqual } from 'underscore';

import styles from './listView.less';

export default class ListViewContainer extends Component {
  constructor(props) {
    super(props);

    this.state = {
      ref: Math.random().toString(36).substr(2),
      refreshing: props.refreshing,
      loading: props.loading,
      list: props.list,
    };
  }
  componentWillReceiveProps(nextProps) {
    if (nextProps.list != this.state.list || nextProps.loading != this.state.loading || nextProps.refreshing != this.state.refreshing) {
      this.setState({
        list: nextProps.list,
        loading: nextProps.loading,
        refreshing: nextProps.refreshing,
      });
    }
  }

  render() {
    const { ref, loading, refreshing, list } = this.state;
    const {
      style,
      className,
      total,
      current,
      pagesize,
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

    let dataSource = new ListView.DataSource({ rowHasChanged: (row1, row2) => { row1 !== row2 } });
    if (rowHasChanged)
      dataSource = new ListView.DataSource({ rowHasChanged: rowHasChanged });
    dataSource = dataSource.cloneWithRows((list ? list : []))

    const refreshProps = {
      refreshing,
      onRefresh,
    };
    const listProps = {
      ref,
      style: { height: '100%', ...style },
      className,
      dataSource,
      pagesize,
      renderBodyComponent,
      renderHeader,
      renderFooter: () => {
        if (renderFooter) {
          return renderFooter(loading, list);
        } else {
          if (list == null || loading) {
            return (
              <div style={{ padding: 10, textAlign: 'center' }}>  
                <Icon type="loading" size="lg" />
              </div>
            );
          }
          if (list != null && list.length == 0) {
            return (
              <div style={{padding:10,textAlign:'center',fontSize:'16px',color:'#ccc'}}> 
                <span>暂无数据</span>
              </div>
            );
          }
          return null;
        }
      },
      renderSeparator,
      renderRow,
      rowHasChanged,
      useBodyScroll, //使用该属性时，下拉刷新会失效
      onScroll,
      onEndReached: (event) => {
        let hasMore = (total > current * pagesize);
        if (refreshing || loading || !hasMore) {
          return;
        }

        // console.log(refreshing, loading, hasMore)
        if (onEndReached)
          onEndReached(current + 1);
      },
      scrollRenderAheadDistance: 200,
      scrollEventThrottle: 20,
      onEndReachedThreshold: 10,
      scrollerOptions: { scrollbars: true },
      pullToRefresh: <PullToRefresh {...refreshProps} />,
    };
    // console.log('listProps',listProps);
    return (
      <div className={`${styles.normal} global-am-list nbb`} style={style}>
        <ListView {...listProps} />  
      </div>
    );
  }
}

ListViewContainer.defaultProps = {
  total: 0,
  current: 1,
  pagesize: 0,
  loading: false,
  list: null,
  onRefresh: () => {},
};

