import request from '../../utils/request';
import qs from 'qs';

export async function query(params) {
  return request(`/adminapi/sys/user/query?${qs.stringify(params)}`, { mode: 'cors' });
}
export async function create(params, data) {
  return request(`/adminapi/sys/user/add?${qs.stringify(params)}`, { mode: 'cors', method: 'post', body: JSON.stringify(data), });
}
export async function update(params, data) {
  return request(`/adminapi/sys/user/update?${qs.stringify(params)}`, { mode: 'cors', method: 'post', body: JSON.stringify(data), });
}
export async function remove(params) {
  return request(`/adminapi/sys/user/delete?${qs.stringify(params)}`, { mode: 'cors' });
}
export async function info(params) {
  return request(`/adminapi/sys/user/info?${qs.stringify(params)}`, { mode: 'cors' });
}
export async function exists(params) {
  return request(`/adminapi/sys/user/exists?${qs.stringify(params)}`, { mode: 'cors' });
}
