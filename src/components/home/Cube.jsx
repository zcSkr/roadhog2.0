import React from 'react';
import { Button } from 'antd-mobile';
import styles from './tabsGrid.less';

export default function Cube({
  p,
  i,
  handleButtonClick,
}) {
  // console.log(p,i)
  return (
    <div className={styles.cube}>
      <div className={styles.picture}><img src="https://fakeimg.pl/250x150/" alt=""/></div>
      <div className={styles.countdown}>00:05:20</div>
      <div className={styles.price}>¥500.00</div>
      <div className={styles.name}>2018费玉清演唱会上海站</div>
      <Button type="warning" className={styles.btn} onClick={() => {if(handleButtonClick) handleButtonClick(i)}}>参与竞拍</Button>
    </div>
  );
};

