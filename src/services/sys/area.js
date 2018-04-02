import request from '../../utils/request';
import qs from 'qs';

export async function query(params) {
  return request(`/mobileapi/sys/area/query?${qs.stringify(params)}`, { mode: 'cors' });
}
export async function create(params, data) {
  return request(`/mobileapi/sys/area/add?${qs.stringify(params)}`, { mode: 'cors', method: 'post', body: JSON.stringify(data), });
}
export async function update(params, data) {
  return request(`/mobileapi/sys/area/update?${qs.stringify(params)}`, { mode: 'cors', method: 'post', body: JSON.stringify(data), });
}
export async function remove(params) {
  return request(`/mobileapi/sys/area/delete?${qs.stringify(params)}`, { mode: 'cors' });
}
export async function info(params) {
  return request(`/mobileapi/sys/area/info?${qs.stringify(params)}`, { mode: 'cors' });
}

export async function treepage(params) {
  return request(`/mobileapi/sys/area/treepage?${qs.stringify(params)}`, { mode: 'cors' });
}
export async function treelist(params) {
  return request(`/mobileapi/sys/area/treelist?${qs.stringify(params)}`, { mode: 'cors' });
}
export async function treedata(params) {
  return request(`/mobileapi/sys/area/treedata?${qs.stringify(params)}`, { mode: 'cors' });
}