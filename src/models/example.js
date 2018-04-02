import * as service_example from 'services/example';

export default {
  namespace: 'example',
  state: {
    loading: false,
    data: {
      list: [],
      pagination: {
        current: 1,
        pageSize: 10,
      },
    },
  },
  subscriptions: {
    setup({ dispatch, history }) { },
  },
  effects: {
    *query({ payload, onSuccess, onComplete }, { select, call, put }) {
      let { data } = yield select(state => state.example);
      let { current, pageSize } = data.pagination;

      yield put({ type: 'save', payload: { loading: true } });
      const response = yield call(service_example.query, { current, pageSize, ...payload });
      if (response) {
        yield put({
          type: 'save',
          payload: {
            loading: false,
            data: {
              list: response.list,
              pagination: {
                current: response.current,
                pageSize: response.pageSize,
                total: response.total,
              },
            },
          },
        });
      } else {
        yield put({ type: 'save', payload: { loading: false } });
      }
    },
    *activity({ payload, onSuccess, onComplete }, { select, call, put }) {
      const { service, params, data } = payload;
      const response = yield call(service_example[service], params, data);
      if (response) {
        if (onSuccess) yield onSuccess(response);
      }
      if (onComplete) yield onComplete();
    },
  },
  reducers: {
    save(state, action) {
      return { ...state, ...action.payload };
    },
  },
};
