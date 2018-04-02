import fetch from 'dva/fetch';
// import cookie from 'js-cookie';
// import qs from 'qs';
// import moment from 'moment';
import { handleErrorCode, handleRequestError } from "./error.js";
const { rootUrl, platformNo, getToken } = require("config/app").default;

function checkStatus(response) {
  if (response.status >= 200 && response.status < 300) {
    return response;
  }

  const error = new Error(response.statusText);
  error.response = response;
  throw error;
}

function handleUrl(url) {
  //传入_p 
  // url += "&" + qs.stringify(params); 
  if (url.substr(0, 4) !== 'http')
    url = rootUrl + url;
  return url;
}

// function afterRequest(res) {
//   console.log(res.data)
//   const { token, exp } = sessionStorage;
//   if (!token || !exp) {
//     return res;
//   }
//   let expTime = moment(exp, "YYYY-MM-DD HH:mm:ss");
//   if (moment().isBefore(expTime) && moment().add(10, 'minutes').isAfter(expTime)) {
//     fetch(handleUrl(`/mobileapi/token/exchange?token=${token}`), { mode: 'cors', })
//       .then(checkStatus)
//       .then(parseJSON)
//       .then((data) => {
//         if (data) {
//           console.log("newToken:", data)
//           const { token } = data;
//           sessionStorage.token = token; 
//         }
//         return data;
//       });
//   }
//   return res;
// }
/**
 * Requests a URL, returning a promise.
 *
 * @param  {string} url       The URL we want to request
 * @param  {object} [options] The options we want to pass to "fetch"
 * @return {object}           An object containing either "data" or "err"
 */
export default function request(url, options) {
  var token = getToken();
  // var auth = (!!authentication);
  let finalUrl = handleUrl(url);
  const opts = { ...options };
  opts.headers = {
    ...opts.headers,
    _p: platformNo,
    // _a: auth,
    _t: token || '', //cookie.get('token')
    // _r: location.pathname + location.search + location.hash, //微信验证通过跳转
  };
  console.log(finalUrl, opts)
  return fetch(finalUrl, opts)
    .then(checkStatus)
    .then(response => response.json())
    .then(handleErrorCode)
    // .then(afterRequest)
    .catch(handleRequestError);
}
