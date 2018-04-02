import React, { Component } from 'react';
import { Carousel } from 'antd-mobile';
import styles from './noticeCarousel.less';

import SvgIcon from 'common/component/SvgIcon';

export default class NoticeCarousel extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const { list} = this.props;
    // console.log(list.noticeArr)
    return (
      <div className={styles.notice}>
        <SvgIcon type={SvgIcon.glyphs.notice} className={styles.notice_icon}/>
        {
          list && list.noticeArr ?
          <Carousel className={styles.vertical_carousel}
            vertical
            dots={false}
            dragging={false}
            swiping={false}
            autoplay
            infinite
            // speed={200}
            // autoplayInterval={300}
            // resetAutoplay={false}
          >
            {
              list.noticeArr.map(p=>
                <div key={p.id} className="v-item">
                  恭喜
                  <span className={styles.markword}>{p.name}</span>
                  以
                  <span className={styles.markword}>{p.price}</span>
                  拍得
                  <span className={styles.markword}>{p.goodsname}</span>
                  商品
                </div>
              )
            }
          </Carousel> : null
        }
      </div>
    );
  }
}

