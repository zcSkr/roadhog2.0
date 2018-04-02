import createHashHistory from 'history/createHashHistory';
import qs from 'qs';

function getPlatformNo() {
  let location = window.location;
  let search = {
    ...qs.parse(location.search.split('?')[1]),
    ...qs.parse(location.hash.split('?')[1])
  };
  let platformNo = search._p || 'sys';
  if (!search._p) {
    let paths = location.pathname.split('/');
    if (paths.length > 1 && !!paths[1])
      platformNo = paths[1];
  }
  return platformNo;
}

function config() {
  let platformNo = sessionStorage.platformNo || getPlatformNo();
  let appsettings = sessionStorage.appsettings ? JSON.parse(sessionStorage.appsettings) : {};
  let settings = {
    baseRoute: appsettings.baseRoute || '/mingjiu', //平台基础路由
    rootUrl: appsettings.rootUrl || 'https://easy-mock.com/mock/5a93c40c8be1e80aa1c929f7/mobileapi/daqu',  //mall.conpanda.cn
    logo: appsettings.logo || 'http://via.placeholder.com/256x256',
    name: 'roadhog2.0', //名称
    version: '1.0.0', //版本
    description: '', //说明
    copyright: appsettings.copyright || '成都童伙信息技术有限公司', //版权所有
    uploadRoute: appsettings.uploadRoute || '/upload', //上传路由
    loginRoute: '/login', //登录路由
    homeRoute: '/member/member', //主页路由
  };

  return {
    platformNo,
    ...settings,
    routerHistory: createHashHistory(),
    getToken: function () {
      return sessionStorage.token ? sessionStorage.token : null;
    },
    setToken: function (token) {
      sessionStorage.token = token;
    },
    getUnionuser: function () {
      try {
        return sessionStorage.unionuser ? JSON.parse(sessionStorage.unionuser) : null;
      } catch (ex) {
        return null;
      }
    },
    setUnionuser: function (unionuser) {
      sessionStorage.unionuser = JSON.stringify(unionuser);
    },
    svgicon: {
      home: require("assets/xh/svg/home.svg").default,
      cart: require("assets/xh/svg/cart.svg").default,
      close: require("assets/xh/svg/close.svg").default,
      top: require("assets/xh/svg/top.svg").default,
      zan: require("assets/xh/svg/zan.svg").default,
      delete: require("assets/xh/svg/delete.svg").default,
      selected: require("assets/xh/svg/selected.svg").default,
      unselected: require("assets/xh/svg/unselected.svg").default,
      plus: require("assets/xh/svg/plus.svg").default,
      edit: require("assets/xh/svg/edit.svg").default,
      youhui: require("assets/xh/svg/优惠.svg").default,
      daifukuan: require("assets/xh/svg/待付款.svg").default,
      daishouhuo: require("assets/xh/svg/待收货.svg").default,
      daipingjia: require("assets/xh/svg/待评价.svg").default,
      tuihuanxiu: require("assets/xh/svg/退换修.svg").default,
      yue: require("assets/xh/svg/余额.svg").default,
      jifen: require("assets/xh/svg/积分.svg").default,
      dizhi: require("assets/xh/svg/地址.svg").default,
      fuwu: require("assets/xh/svg/服务.svg").default,
      jianyi: require("assets/xh/svg/建议.svg").default,
      guanyu: require("assets/xh/svg/关于.svg").default,
      gerenzhongxin: require("assets/xh/svg/个人中心.svg").default,
      gerenzhongxinSelected: require("assets/xh/svg/个人中心-选中.svg").default,
      gouwuche: require("assets/xh/svg/购物车.svg").default,
      gouwucheSelected: require("assets/xh/svg/购物车-选中.svg").default,
      fenlei: require("assets/xh/svg/分类.svg").default,
      fenleiSelected: require("assets/xh/svg/分类-选中.svg").default,
      shouye: require("assets/xh/svg/首页.svg").default,
      shouyeSelected: require("assets/xh/svg/首页-选中.svg").default,
      chongzhi: require("assets/xh/svg/充值.svg").default,
      chongzhika: require("assets/xh/svg/充值卡.svg").default,
      mingxi: require("assets/xh/svg/明细.svg").default,
      notice: require("assets/xh/svg/notice.svg").default,
    },
  };
}

export default config();
