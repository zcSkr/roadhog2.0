import request from 'utils/request';
import qs from "qs";

export async function query(params) {
  return request(`/auction/list?${qs.stringify(params)}`, { mode: 'cors' });
}
