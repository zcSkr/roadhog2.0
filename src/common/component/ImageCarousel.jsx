import React, { Component } from 'react';
import { Carousel } from 'antd-mobile';

export default class ImageCarousel extends Component {
  state = {
    imgHeight: 200,
  }

  render() {
    const { imgHeight } = this.state;
    const { data, ...restProps } = this.props;  

    return (
      <Carousel
        autoplay={false}
        infinite
        selectedIndex={0}
        {...restProps}
      >
        {
          data.map(item => (
            <a
              key={item}
              style={{ display: 'inline-block', width: '100%', height: imgHeight }}
            >
              <img
                src={item}
                alt=""
                style={{ width: '100%', verticalAlign: 'top' }}
                onLoad={() => {
                  // 窗体自适应
                  window.dispatchEvent(new Event('resize'));
                  this.setState({ imgHeight: 'auto' }); 
                }}
              />
            </a>
          ))
        }
      </Carousel>
    );
  }
} 