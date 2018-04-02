import request from '../../utils/request';
import qs from 'qs';

export async function jssdk_parameters(params) {
  return request(`/wxgzh/jssdk/parameters?${qs.stringify(params)}`, { mode: 'cors' });
}

export async function tenpayv3_jsapiorder(params, data) {
  return request(`/wxgzh/tenpayv3/jsapiorder?${qs.stringify(params)}`, { mode: 'cors', method: 'post', body: JSON.stringify(data), });
}
export async function tenpayv3_complete(params, data) {
  return request(`/wxgzh/tenpayv3/complete?${qs.stringify(params)}`, { mode: 'cors', method: 'post', body: JSON.stringify(data), });
}
