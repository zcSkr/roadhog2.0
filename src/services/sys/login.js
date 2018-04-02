import request from '../../utils/request';
import qs from 'qs';

export async function login(params, data) {
  return request(`/adminapi/sys/login?${qs.stringify(params)}`, { mode: 'cors', method: 'post', body: JSON.stringify(data) });
}
export async function logout(params) {
  return request(`/adminapi/sys/logout?${qs.stringify(params)}`, { mode: 'cors', });
}
export async function token(params) {
  return request(`/adminapi/sys/token?${qs.stringify(params)}`, { mode: 'cors', });
}
