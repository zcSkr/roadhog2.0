import request from '../../utils/request';
import qs from 'qs';

export async function exception(params, data) {
  return request(`/mobileapi/sys/log/exception?${qs.stringify(params)}`, { mode: 'cors', method: 'post', body: JSON.stringify(data), });
}
