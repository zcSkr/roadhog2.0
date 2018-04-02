import React, { Component } from 'react';
import { Tabs, Grid } from 'antd-mobile';
import styles from './tabsGrid.less';

import Cube from "./Cube";
export default class TabsGrid extends Component {
  constructor(props) {
    super(props);
    this.state = {
      page: 0,
    };
  }

  handleTabChange = (tab, index) => {
    // console.log(tab,index)
    this.setState({ page: index });
  }
  render() {
    const tabs = [
      { title: '正在热拍' },
      { title: '我在拍' },
    ];
    const tabsProps = {
      tabs: tabs,
      page: this.state.page,
      onChange: this.handleTabChange,
      swipeable: false,
      tabBarActiveTextColor: '#d10004',
      tabBarUnderlineStyle: {
        borderColor: '#d10004',
      }
    }
    const { handleButtonClick } = this.props;
    const data = Array.from(new Array(9)).map((_val, i) => ({
      icon: 'https://gw.alipayobjects.com/zos/rmsportal/nywPmnTAvTmLusPxHPSu.png',
      text: `name${i}`,
    }));
    return (
      <Tabs {...tabsProps}>
        <div className={styles.tabs_content}>
          {
            Array.from(new Array(9)).map((p,i) => <Cube key={i} i={i} p={p} handleButtonClick={handleButtonClick}/> )
          }
        </div>
        <Grid data={data} square={false} columnNum={2} className="not-square-grid" />
      </Tabs>
    );
  }
}

