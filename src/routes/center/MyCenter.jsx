import { connect } from 'dva';

import React, { Component } from 'react';
import { routerRedux } from 'dva/router';
import app from "config/app";

import MyCenter from 'components/mycenter/MyCenter';

import styles from './myCenter.less';

@connect(state=> ({
  // example: state.example
}))

export default class MyCenterPage extends Component {
  constructor(props) {
    super(props);
    this.state = {}
  }

  render() {
    const { dispatch } = this.props;
    const indexProps = {
      // loading: loading || loadingMember,
      // member,
      // orderstatis,
      // usecases,
      onButtonClick(action, data) {
        if (action == "address") {
          dispatch(routerRedux.push(app.baseRoute + '/member/address'));
        } else if (action == "order") {
          window.location.href = app.baseRoute + '/shop/order?status=' + data;
          // dispatch(routerRedux.push(app.baseRoute + '/shop/order?status=' + data));
        } else if (action == "comment") {
          dispatch(routerRedux.push(app.baseRoute + '/shop/comment'));
        } else if (action == "balance") {
          dispatch(routerRedux.push(app.baseRoute + '/member/balance'));
        } else if (action == "points") {
          dispatch(routerRedux.push(app.baseRoute + '/member/points'));
        } else if (action == "service") {
          dispatch(routerRedux.push(app.baseRoute + '/servicecenter'));
        } else if (action == "about") {
          dispatch(routerRedux.push(app.baseRoute + '/about'));
        } else if (action == "storage") {
          window.location.href = "http://mall.conpanda.cn/mingjiu/mstorage";
        } else if (action == "verification") {
          dispatch(routerRedux.push(app.baseRoute + '/member/verification?id=' + data));
        }
      },
    }

    return (
      <div className={`${styles.normal} global-am`}>
        <MyCenter {...indexProps} />
      </div>
    );
  }
}
