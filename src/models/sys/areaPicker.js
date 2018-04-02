import { create, remove, update, query, treedata } from 'services/sys/area';
import { parse } from 'qs';

export default {
  namespace: 'sys_areaPicker',
  state: {
    refreshing: false,
    loading: false,
    queryParams: {},
    list: null,
    total: 0,
    current: 1,
    pagesize: 6,
    currentItem: {},
    modalType: 'create',
    modalVisible: false,
    usecases: ['create', 'update', 'delete'],
  },
  subscriptions: {
    // setup({ dispatch, history }) {
    //   history.listen(location => {});
    // },
  },
  effects: {
    *treeQuery({ payload, onComplete }, { select, call, put }) {
      const { queryParams } = yield select(state => state.sys_areaPicker);
      let params = {...queryParams, ...payload.queryParams };
      const res = yield call(treedata, parse(params));
      if (res) {
        yield put({
          type: 'querySuccess',
          payload: {
            queryParams: {...queryParams, ...payload.queryParams },
            list: res.list,
          },
        });
      }
      if (onComplete) onComplete();
    },
    *query({ payload, onComplete }, { select, call, put }) {
      const { current, pagesize, queryParams } = yield select(state => state.sys_areaPicker);
      let params = { current: (payload.current || current), pagesize: (payload.pagesize || pagesize), ...queryParams, ...payload.queryParams };
      const { data } = yield call(query, parse(params));
      let oldList = payload.list ? payload.list : [];
      if (data) {
        yield put({
          type: 'querySuccess',
          payload: {
            queryParams: {...queryParams, ...payload.queryParams },
            current: data.current,
            pagesize: payload.pagesize || pagesize,
            list: [].concat(oldList, data.list),
            total: data.total,
          },
        });
      }
      if (onComplete) onComplete();
    },
    *delete({ payload, onSuccess }, { select, call, put }) {
      const { data } = yield call(remove, { id: payload });
      if (data) {
        if (onSuccess) {
          yield onSuccess();
        }
      }
    },
    *create({ payload, onComplete, onSuccess }, { select, call, put }) {
      const { data } = yield call(create, {}, payload);
      if (onComplete) onComplete();
      if (data) {
        if (onSuccess)
          yield onSuccess();
      }
    },
    *update({ payload, onComplete, onSuccess }, { select, call, put }) {
      const { data } = yield call(update, {}, payload);
      if (onComplete) onComplete();
      if (data) {
        if (onSuccess)
          yield onSuccess();
      }
    },
  },
  reducers: {
    setState(state, action) {
      return {...state, ...action.payload };
    },
    showRefreshing(state) {
      return {...state, refreshing: true };
    },
    hideRefreshing(state) {
      return {...state, refreshing: false };
    },
    showLoading(state) {
      return {...state, loading: true };
    },
    hideLoading(state) {
      return {...state, loading: false };
    },
    querySuccess(state, action) {
      return {...state, ...action.payload };
    },
    clear(state, action) {
      return {...state, list: null, currentItem: {} };
    },
    showModal(state, action) {
      return {...state, ...action.payload, modalVisible: true };
    },
    hideModal(state) {
      return {...state, modalVisible: false };
    },
  },
};
