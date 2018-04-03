import { connect } from 'dva';

import React, { PropTypes, Component } from 'react';
import { Icon, Toast } from 'antd-mobile';
import { routerRedux } from 'dva/router';
import qs from 'qs';
import { isEqual, isArray } from 'underscore';

import styles from './areaPicker.less';
import Picker from '../../../components/sys/area/Picker';

function findTree(tree, id) {
  for (var index in tree) {
    let item = tree[index];
    if (item.id == id) {
      return item;
    } else {
      if (item.children && item.children.length > 0) {
        let res = findTree(item.children, id);
        if (res) return res;
      }
    }
  }
  return null;
}

function forEachTree(tree, func) {
  for (var index in tree) {
    let item = tree[index];
    if (func) func(item);
    if (item.children && item.children.length > 0) {
      forEachTree(item.children, func);
    }
  }
}

class AreaPicker extends Component {
  constructor(props) {
    super(props);
    this.state = {}
  }
  componentDidMount() {
    const { dispatch, sys_areaPicker } = this.props;
    console.log('sys_areaPicker',sys_areaPicker)
    const { refreshing, loading, list, queryParams } = sys_areaPicker;

    if (!refreshing && !loading && list == null) {
      dispatch({ type: 'sys_areaPicker/showLoading' });
      dispatch({
        type: 'sys_areaPicker/treeQuery',
        onComplete() {
          dispatch({ type: 'sys_areaPicker/hideLoading' });
        },
        payload: {...queryParams, ...this.props.queryParams },
      });
    }
  }

  render() {
    const {
      dispatch,
      location,
      sys_areaPicker,
      multiple,
      onlySelectLeaf,
      allowClear,
      disabledKeys,
      value,
      onChange,
    } = this.props;
    const {
      refreshing,
      loading,
      list,
      total,
      current,
      pagesize,
      currentItem,
      usecases,
    } = sys_areaPicker;

    forEachTree(list, (item) => { item.disabled = false; });
    if (disabledKeys && disabledKeys.length > 0) {
      forEachTree(tree, (item) => {
        if (disabledKeys.indexOf(item.id) >= 0)
          item.disabled = true;
      });
    }

    const pickerProps = {
      list,
      value,
      onChange,
    };

    return (
      <div className={styles.normal}> 
        <Picker {...pickerProps} />
      </div>
    );
  }
}


function mapStateToProps({ sys_areaPicker }) {
  return { sys_areaPicker };
}
export default connect(mapStateToProps)(AreaPicker);
