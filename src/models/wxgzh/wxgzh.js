import * as service_wxgzh_wxgzh from '../../services/wxgzh/wxgzh';
import * as utils_weixin from '../../utils/weixin';

export default {
  namespace: 'wxgzh_wxgzh',
  state: {
    loading: false,
    data: {},
  },
  subscriptions: {
    setup({ dispatch, history }) { },
  },
  effects: {
    *wxgzh({ payload, onSuccess, onComplete, onError }, { select, call, put }) {
      if (!utils_weixin.inWeixinBroswer()) {
        if (onError) onError("请在微信中打开"); 
      } else {
        const { service, params, data } = payload;
        const response = yield call(service_wxgzh_wxgzh[service], params, data);
        if (response) {
          if (onSuccess) yield onSuccess(response);
        }
        if (onComplete) yield onComplete();
      }
    },
  },
  reducers: {
    save(state, action) {
      return { ...state, ...action.payload };
    },
  },
};
