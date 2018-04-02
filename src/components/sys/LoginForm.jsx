import React, { Component, PropTypes } from 'react';
import { WhiteSpace, WingBlank, List, InputItem, Button } from 'antd-mobile';

import { rectangleLogo } from '../../config/app';

class LoginForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userName: '',
      password: '',
    };
  }
  onFieldChange(field, value) {
    if (field == "userName") {
      this.setState({ userName: value })
    } else if (field == "password") {
      this.setState({ password: value })
    }
  }
  onOk = () => {
    if (this.props.onOk) {
      this.props.onOk({ userName: this.state.userName, password: this.state.password });
    }
  }
  btnDisabled = () => {
    return !(this.state.userName && this.state.password);
  }
  render() {
    return (
      <List>
        <WhiteSpace size="md" />
        <WingBlank size='md'>
          <div style={{textAlign:'center'}}>
            <img src={rectangleLogo} />
          </div>
          <InputItem value={this.state.userName} onChange={this.onFieldChange.bind(this, "userName")}
            placeholder="用户名或手机号" clear>用户名</InputItem>
          <InputItem value={this.state.password} onChange={this.onFieldChange.bind(this, "password")}
            type="password" placeholder="密码" clear>密码</InputItem>
          <Button type="primary" loading={this.props.loading} onClick={this.onOk} disabled={this.btnDisabled()}>登录</Button>
        </WingBlank>
        <WhiteSpace size="md" />
      </List>
    );
  }
}

LoginForm.propTypes = {
  onOk: PropTypes.func,
  loading: PropTypes.bool,
};
LoginForm.defaultProps = {
  loading: false,
};

export default LoginForm;
