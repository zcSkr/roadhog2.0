import { connect } from 'dva';

import React, { PropTypes, Component } from 'react';
import { routerRedux } from 'dva/router';
import { Toast, Modal } from 'antd-mobile';
import styles from './serviceCenter.less';

import TopBar from 'components/servicecenter/TopBar';
import ServiceCenter from 'components/servicecenter/ServiceCenter';

import { baseRoute, homeRoute } from "config/app";


function ServiceCenterPage({
  dispatch,
  location,
  center_servicecenter,
  height,
}) {
  const {
    loading,
    member,
    setting,
    usecases,
  } = center_servicecenter;

  const onButtonClick = (btn, item, callback) => {
    if (btn == 'back') {
      dispatch(routerRedux.goBack());
    }
  };

  const contentProps = {
    loading,
    member,
    setting,
    usecases,
    onButtonClick,
  }
  const topProps = {
    loading,
    usecases,
    onButtonClick,
  };

  let documentHeight = height ? height : document.documentElement.clientHeight;

  return (
    <div className={`${styles.normal} global-am`}>
      <div className={styles.top}>
        <TopBar {...topProps} />
      </div>
      <div className={styles.content}>
        <ServiceCenter {...contentProps} />
      </div> 
    </div>
  );
}

ServiceCenterPage.propTypes = {
  center_servicecenter: PropTypes.object,
  location: PropTypes.object,
  dispatch: PropTypes.func,
};


function mapStateToProps({ center_servicecenter }) {
  return { center_servicecenter };
}
export default connect(mapStateToProps)(ServiceCenterPage);
