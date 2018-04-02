import React, { Component } from 'react';
import { connect } from 'dva';
import styles from './home.less';
import { Button, Modal, Flex, InputItem } from 'antd-mobile';


function closest(el, selector) {
  const matchesSelector = el.matches || el.webkitMatchesSelector || el.mozMatchesSelector || el.msMatchesSelector;
  while (el) {
    if (matchesSelector.call(el, selector)) {
      return el;
    }
    el = el.parentElement;
  }
  return null;
}

@connect(state => ({
  // example: state.example,
}))

export default class HomeChild extends Component {
  constructor(props) {
    super(props);

    this.state = {
      modalVisible: false,
    };
  }


  onClick = () => {

    if (typeof WeixinJSBridge == "object") {
      const WeixinJSBridge = window.WeixinJSBridge
      const pic_list = ['http://www.scscms.com/weixin/images/1.jpg', 'http://www.scscms.com/weixin/images/2.jpg'];//图片列表  
      // 图片预览
      WeixinJSBridge.invoke('imagePreview', {
        'current': pic_list[0],
        'urls': pic_list
      });

      // WeixinJSBridge.call("closeWindow") //关闭窗口
      // WeixinJSBridge.invoke("getNetworkType", {}, (res => console.log(res))) //获取网络状态
    }
    else {
      console.log(123)
    }
  }
  handleModal = (action) => {
    this.setState({ modalVisible: action == "show" })
  }
  onWrapTouchStart = (e) => {
    // fix touch to scroll background page on iOS
    if (!/iPhone|iPod|iPad/i.test(navigator.userAgent)) {
      return;
    }
    const pNode = closest(e.target, '.am-modal-content');
    if (!pNode) {
      e.preventDefault();
    }
  }

  handleChange = (action, data) => {
    // this.setState({})
    console.log(action, data)
  }
  render() {
    const { style } = this.props
    return (
      <div style={style}>
        child
        <img src={require('assets/yay.jpg')} style={{ width: "60%", height: 'auto' }} alt="" />
        <Button onClick={this.onClick}>Button</Button>
        <a href="weixin://viewimage/http://www.scscms.com/weixin/images/1.jpg">Preview</a>

        <Button onClick={() => this.handleModal('show')}>show modal</Button>

        <Modal
          visible={this.state.modalVisible}
          transparent
          maskClosable={false}
          onClose={() => this.handleModal('hidden')}
          title="短信验证"
          footer={[{ text: '确认', onPress: () => this.handleModal('hidden') }]}
          wrapProps={{ onTouchStart: this.onWrapTouchStart }}
        >
          <Flex align='center' className={styles.flexItem}>
            <Flex.Item style={{ flex: 4 }}><input placeholder='验证码' type="number" className={styles.verifyInput} /></Flex.Item>
            <Flex.Item style={{ flex: 3 }}><Button style={{ minWidth: 97 }} inline size='small'>发送验证码</Button></Flex.Item>
          </Flex>
        </Modal>

        <InputItem
          placeholder="请填写您的身份证号码"
          type="text"
          pattern="[8-9]*" 
          maxLength="18"
          disabled={false}
          // value={this.state.value}
          onChange={this.handleChange.bind(this, "idcard")}>
          身份证号码
          </InputItem>
      </div>
    );
  }
}
