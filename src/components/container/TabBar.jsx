import React, { Component } from 'react';
import { TabBar } from 'antd-mobile';
import styles from './tabBar.less';

export default class TabBarContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedTabKey: props.selectedTabKey,
    };
  }
  componentWillReceiveProps(nextProps) {
    if (nextProps.selectedTabKey !== this.state.selectedTabKey) {
      this.setState({ selectedTabKey: nextProps.selectedTabKey })
    }
  }

  render() {
    const { barHidden, barColor, barSelectedColor, barBackgroundColor, tabs, onTabPress } = this.props;
    const { selectedTabKey } = this.state;

    const tabbarProps = {
      hidden: barHidden,
      unselectedTintColor: barColor,
      tintColor: barSelectedColor,
      barTintColor: barBackgroundColor,
    };
    const tabbarChildren = tabs.map(item => {
      const itemProps = {
        badge: item.badge,
        dot: item.dot,
        title: item.title,
        key: item.key,
        icon: item.icon,
        selectedIcon: item.selectedIcon,
        selected: item.key == selectedTabKey,
        onPress: () => {
          this.setState({ selectedTabKey: item.key });
          if (onTabPress)
            onTabPress(item);
        },
      };

      return <TabBar.Item {...itemProps}>
        <div className={styles.tabContent}>
          {item.children}
        </div>
      </TabBar.Item>
    });
    let customCls = barHidden ? '' : 'zhy-tabbar';
    return (
      <div className={`${styles.normal} ${customCls}`} >  
        <TabBar {...tabbarProps} >
          {tabbarChildren}
        </TabBar>   
      </div>
    );
  }
}

TabBarContainer.defaultProps = {
  barHidden: false,
  barUnselectedColor: "#888",
  barSelectedColor: "#d10004",
  barBackgroundColor: "white",
  tabs: [],
}

