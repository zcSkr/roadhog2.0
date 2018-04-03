import { connect } from 'dva';

import React, { Component, PropTypes } from 'react';
import { routerRedux } from 'dva/router';
import { Result } from 'antd-mobile';
import styles from './about.less';

import About from 'components/about/About';
import TopBar from 'components/about/TopBar';

import app from "config/app";

const AboutPage = ({
  dispatch,
  location,
}) => {
  const onButtonClick = (btn, data, callback) => {
    if (btn == 'back') {
      dispatch(routerRedux.goBack());
    } else if (btn == "suggest") {
      dispatch(routerRedux.push(app.baseRoute + "/commentform?type=system"));
    }
  };

  const contentProps = {
    onButtonClick,
  }
  const topProps = {
    onButtonClick,
  };

  return (
    <div className={`${styles.normal} global-am`}>
      <div className={styles.top}>
        <TopBar {...topProps} />
      </div>
      <div className={styles.content}>
        <About {...contentProps} />
      </div> 
    </div>
  );
};

export default connect(() => ({}))(AboutPage);
