import app from "../config/app"

import { Toast, Modal } from 'antd-mobile';

let modalVisible = false;

export function handleRequestError(errmsg) {
  Modal.alert('系统错误', errmsg + "，请联系技术人员", [
    { text: '知道了' },
  ]);
}
export function handleErrorCode(response) {
  const { errcode, errmsg, redirect } = response;
  if (typeof(errcode) !== 'undefined' && errcode !== 0) {
    if (errcode == 4) { //静默跳转 
      redirectTo(redirect);
    } else if (errcode == 3) { //先提示后跳转
      if (!modalVisible) {
        if (window.location.href !== redirect) {
          Modal.alert('异常', errmsg, [
            { text: '确定', onPress: () => { redirectTo(redirect); } },
          ]);
        }
        modalVisible = true;
      }
    } else if (errcode == 2) { //提示性异常 
      Toast.info(errmsg, 2);
    } else { //系统异常 
      Modal.alert('服务器内部异常', errmsg + "，请联系管理员", [
        { text: '知道了' },
      ]);
    }
    // return { err: data };
    return null;
  }
  return response;
}

function redirectTo(redirect) {
  modalVisible = false;
  if (redirect.indexOf("http://") >= 0 || redirect.indexOf("https://") >= 0) {
    if (window.location.href !== redirect) {
      window.location.href = redirect;
    }
  } else if (window.location.pathname !== redirect) {
    app.routerHistory.replace(redirect); //当前url不是登录页面则跳转 
  }
}
