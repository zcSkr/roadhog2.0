import * as service_sys_log from 'services/sys/log';

export default {
  namespace: 'sys_log',
  state: {
    loading: false,
  },
  subscriptions: {},
  effects: {
    *exception({ payload, onComplete, onSuccess }, { select, call, put }) {
      const { data } = yield call(service_sys_log.exception, {}, payload);
      if (onComplete) onComplete();
      if (data) {
        if (onSuccess)
          yield onSuccess(data);
      }
    },
  },
  reducers: {}
}
