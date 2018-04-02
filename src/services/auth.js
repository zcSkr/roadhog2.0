import request from '../utils/request';
import qs from 'qs';


export async function login(params, data) {
  return request(`/mobileapi/auth/login?${qs.stringify(params)}`, { mode: 'cors', method: 'post', body: JSON.stringify(data) });
}
export async function logout(params) {
  return request(`/mobileapi/auth/logout?${qs.stringify(params)}`, { mode: 'cors' });
}
export async function changepwd(params, data) {
  return request(`/mobileapi/auth/changepwd?${qs.stringify(params)}`, { mode: 'cors', method: 'post', body: JSON.stringify(data) });
}

export async function auth(params) {
  return request(`/mobileapi/auth/auth?${qs.stringify(params)}`, { mode: 'cors' });
}
export async function getcurrentuser(params) {
  return request(`/mobileapi/auth/getcurrentuser?${qs.stringify(params)}`, { mode: 'cors' });
}
