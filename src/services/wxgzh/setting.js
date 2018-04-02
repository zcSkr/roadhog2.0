import request from '../../utils/request';
import qs from 'qs';

export async function get(params) {
  return request(`/mobileapi/wxgzh/setting/get?${qs.stringify(params)}`, { mode: 'cors' });
}
export async function set(params, data) {
  return request(`/mobileapi/wxgzh/setting/set?${qs.stringify(params)}`, { mode: 'cors', method: 'post', body: JSON.stringify(data), });
}
