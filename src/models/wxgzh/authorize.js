import * as service_wxgzh_wxgzh from 'services/wxgzh/wxgzh';
import * as service_auth from 'services/auth';
import * as utils_weixin from 'utils/weixin';
import { isEmpty } from 'underscore';

import app from "config/app";

export default {
  namespace: 'wxgzh_authorize',
  state: {
    authorized: false,
  },
  subscriptions: {
    setup({ dispatch, history }) {
      history.listen(location => {
        dispatch({ type: "authorize", payload: { location } });
      });
    },
  },
  effects: {
    *authorize({ payload }, { select, call, put }) {
      
      if (utils_weixin.inWeixinBroswer()) {
        //登录会员信息
        var unionuser = app.getUnionuser();
        let memberId = unionuser ? (unionuser.member_member ? unionuser.member_member.id : null) : null;
        if (isEmpty(memberId)) {
          yield call(service_auth.auth, { _r: window.location.href });
          return;
        } else {
          yield put({ type: "save", payload: { authorized: true } });
        }

        //jssdk参数
        const { data } = yield call(service_wxgzh_wxgzh.jssdk_parameters, { url: window.location.href });
        if (data) {
          utils_weixin.config({
            appId: data.appId,
            timestamp: data.timestamp,
            nonceStr: data.nonceStr,
            signature: data.signature,
          });
          utils_weixin.ready();
        }
      } else {
        yield put({ type: "save", payload: { authorized: true } });
      }
    },
  },
  reducers: {
    save(state, action) {
      return { ...state, ...action.payload };
    },
  }
}
