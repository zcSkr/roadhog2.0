import { connect } from 'dva';

import React, { PropTypes, Component } from 'react';
import { routerRedux } from 'dva/router';
import { Toast, Modal } from 'antd-mobile';
import styles from './commentForm.less';

import TopBar from 'components/member/commentform/TopBar'; 
import Form from 'components/member/commentform/Form';

import { baseRoute, loginRoute, getCurrentUnionuser } from "config/app";

function CommentForm({
  dispatch,
  location,
  center_commentform,
  height,
}) {
  const {
    loading,
    target,
    entity,
    action,
    usecases,
  } = center_commentform;

  const onButtonClick = (btn, data, callback) => {
    if (btn == "back") {
      dispatch(routerRedux.goBack());
    } else if (btn == "submit") {
      dispatch({
        type: 'center_commentform/' + action,
        payload: data,
        onSuccess() {
          Toast.success("感谢您的宝贵建议", 1); 
          dispatch(routerRedux.goBack());
        },
        onComplete: callback,
      });
    } 
  }

  const formProps = {
    target,
    entity,
    action,
    onButtonClick,
    onAsyncValidate(data, callback) {},
    usecases,
  };
  const topProps = { 
    onButtonClick,
    loading,
    usecases,
  }; 

  let documentHeight = height ? height : document.documentElement.clientHeight;
  return (
    <div className={`${styles.normal} global-am global-picker`}>
      <div className={styles.top}>
        <TopBar {...topProps} />
      </div>
      <div className={styles.content}>
        <Form {...formProps} />
      </div> 
    </div>
  );
}

CommentForm.propTypes = {
  center_commentform: PropTypes.object,
  location: PropTypes.object,
  dispatch: PropTypes.func,
};

function mapStateToProps({ center_commentform }) {
  return { center_commentform };
}
export default connect(mapStateToProps)(CommentForm);
