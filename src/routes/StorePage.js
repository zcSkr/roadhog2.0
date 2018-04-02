import { connect } from 'dva';

import React, { Component } from 'react';
import { routerRedux } from 'dva/router';

import queryString from 'query-string';
import { isEqual } from 'underscore';

import TabBar from 'components/container/TabBar';
import SvgIcon from 'common/component/SvgIcon';
//首页
import HomePage from 'routes/home/HomePage';
//个人中心
import MyCenter from 'routes/center/MyCenter';
//分类
import HomeChild from 'routes/HomeChild';

@connect(state => ({

}))

export default class StorePage extends Component {
  render() {
    const { location, dispatch } = this.props
    let selectedTabKey = "home";
    if (location.search) {
      const parsed = queryString.parse(location.search);
      selectedTabKey = parsed.key;
    }

    //内容属性
    let contentProps = {
      location,
      // baseOnHash: true,
      style: { height: document.documentElement.clientHeight - 50, },
    };

    //底部栏
    let tabs = [{
      key: "home",
      title: "首页",
      icon: <SvgIcon type={SvgIcon.glyphs.shouye} className='shouye' />,
      selectedIcon: <SvgIcon type={SvgIcon.glyphs.shouyeSelected} className='shouyeSelected' />,
      children: <HomePage {...contentProps} />,
    }, {
      key: "fenlei",
      title: "分类",
      icon: <SvgIcon type={SvgIcon.glyphs.fenlei} />,
      selectedIcon: <SvgIcon type={SvgIcon.glyphs.fenleiSelected} />,
      children: <HomeChild {...contentProps} />,
    }, {
      key: "mycenter",
      title: "我的",
      icon: <SvgIcon type={SvgIcon.glyphs.gerenzhongxin} />,
      selectedIcon: <SvgIcon type={SvgIcon.glyphs.gerenzhongxinSelected} />,
      children: <MyCenter {...contentProps} />,
    }];

    const tabbarProps = {
      tabs,
      selectedTabKey,
      onTabPress: (tab) => {
        let router = location.pathname + '?key=' + tab.key;
        if (isEqual(location.pathname + location.search, router)) return;
        dispatch(routerRedux.push(router));
        // dispatch(routerRedux.push(location.pathname + '#/' + tab.key));
      },
    }

    return (
      <TabBar {...tabbarProps} />
    );
  }
}
// <div style={{ position: 'fixed', height: '100%', width: '100%', bottom: 0 }}>
        
//       </div>

