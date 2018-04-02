import { login, logout } from 'services/sys/login'; 

import { routerRedux } from 'dva/router';
import app from "config/app";

export default {
  namespace: 'sys_login',
  state: {
    loading: false,
  },
  subscriptions: {},
  effects: {
    *login({ payload }, { select, call, put }) {
      yield put({ type: 'showLoading' });
      const { data } = yield call(login, {}, payload);

      if (data) {
        yield put({ type: 'loginSuccess', payload: data, });
        yield put(routerRedux.push(app.baseRoute + app.homeRoute));
      } else {
        yield put({ type: 'hideLoading', });
      }
    },
    *logout({ payload, onSuccess }, { select, call, put }) {
      let currentUser = app.getCurrentUnionuser();
      if (currentUser) {
        const { data } = yield call(logout, { userName: currentUser.userName });
        if (data) {
          if (onSuccess)
            yield onSuccess();
          yield put(routerRedux.push(app.baseRoute + app.loginRoute));
        }
      } else {
        yield put(routerRedux.push(app.baseRoute + app.loginRoute));
      }
    },
  },
  reducers: {
    showLoading(state) {
      sessionStorage.clear(); //登录前清除，避免换取token判断失误
      return {...state, loading: true };
    },
    hideLoading(state) {
      return {...state, loading: false };
    },
    loginSuccess(state, action) {
      var { token, unionuser } = action.payload;
      //cookie.set("token", token);
      sessionStorage.token = token; 
      sessionStorage.unionuser = JSON.stringify(unionuser);

      return {...state, loading: false };
    },
  }
}
