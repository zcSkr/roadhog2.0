import React, { Component } from 'react';
import { Route, Switch } from 'dva/router';
import { connect } from 'dva';
import styles from './home.less';
import HomeChild from './HomeChild';
import SvgIcon from 'common/component/SvgIcon';
import { Icon } from 'antd-mobile';

@connect(state => ({
  // example: state.example,
}))

export default class Home extends Component {
  constructor(props) {
    super(props);
    const defaultSearch = {};
    this.state = {
      entity: null,
      defaultSearch,
      search: { ...defaultSearch },
      page: 0,
    }
  }
  componentDidMount() {
    const { dispatch } = this.props;
    dispatch({
      type: 'example/query',
      payload: this.state.search,
    });
  }

  render() {
    // console.log(this.props)
    const { match } = this.props;

    return (
      <div>
        <div>home</div>
        <div className={styles.word}>
          <SvgIcon type={SvgIcon.glyphs.cart} />
          <SvgIcon type={SvgIcon.glyphs.home} />
          <Icon type='search' />
        </div>
        <Switch>
          <Route path={`${match.url}/child`} component={HomeChild} />
        </Switch>
        <img src={require('assets/yay.jpg')} style={{ width: "50%" }} alt="" />
      </div>
    );
  }
}


