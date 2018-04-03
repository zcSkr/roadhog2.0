import { connect } from 'dva';

import React, { Component, PropTypes } from 'react';
import { routerRedux } from 'dva/router';
import qs from 'qs';

import LoginForm from '../../components/sys/LoginForm.jsx';

function LoginPage({
  location,
  dispatch,
  sys_login
}) {
  const { loading } = sys_login;

  const loginProps = {
    loading,
    onOk(data) {
      dispatch({
        type: 'sys_login/login',
        payload: data,
      });
    }
  };

  return (
    <LoginForm {...loginProps} />
  );
}


function mapStateToProps({ sys_login }) {
  return { sys_login };
}
export default connect(mapStateToProps)(LoginPage);
