import { connect } from 'dva';

import React from 'react';
import { routerRedux } from 'dva/router';
import { Result } from 'antd-mobile';
import styles from './styles.less';

// import 'antd-mobile/dist/antd-mobile.less';
const NotFound = ({
  dispatch,
  location,
}) => {
  const buttonClick = (e) => {
    e.stopPropagation();
    dispatch(routerRedux.goBack());
  }
  
  return (
    <div className={styles.notfound+' routes-notfound'}>
      <Result
        imgUrl="https://os.alipayobjects.com/rmsportal/NRzOqylcxEstLGf.png"
        title="页面未找到"
        message={"地址不存在，或页面正在开发..."}
        buttonText="返回" 
        onButtonClick={buttonClick}
      />
    </div>
  );
};

export default connect(() => ({}))(NotFound);
