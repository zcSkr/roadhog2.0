import { routerRedux } from 'dva/router';
import * as service_auth from '../services/auth';
import app from "../config/app";
import { isEmpty } from 'underscore';


export default {
  namespace: 'auth',
  state: {
    query: {},
    logining: false,
    currentUser: {},
  },
  subscriptions: {},
  effects: {
    *login({ payload }, { select, call, put }) {
      let { query } = yield select(state => state.auth);

      yield put({ type: 'save', payload: { logining: true } });
      const response = yield call(service_auth.login, query, payload);
      if (response) {
        app.setToken(response.token);
        app.setUnionuser(response.unionuser);
        yield put({ type: 'save', payload: { logining: false, currentUser: response.unionuser } });

        yield put(routerRedux.push(app.baseRoute + app.homeRoute));
      } else {
        yield put({ type: 'save', payload: { logining: false } });
      }
    },
    *logout({ payload }, { select, call, put }) {
      let currentUser = app.getUnionuser() || {};
      if (currentUser) {
        yield call(service_auth.logout, { userName: currentUser.userName });
        app.setToken(null);
        app.setUnionuser(null);
        yield put(routerRedux.push(app.baseRoute + app.loginRoute));
      } else {
        yield put(routerRedux.push(app.baseRoute + app.loginRoute));
      }
    },
    *getCurrentUser({ payload }, { select, call, put }) {
      let { query } = yield select(state => state.auth);

      let currentUser = app.getUnionuser() || {};
      if (isEmpty(currentUser)) {
        const response = yield call(service_auth.getcurrentuser, query);
        if (response) {
          currentUser = response;
          app.setUnionuser(response);
        }
      }
      yield put({ type: 'save', payload: { currentUser: currentUser } });
    },
  },
  reducers: {
    save(state, action) {
      return { ...state, ...action.payload };
    },
  },
};
