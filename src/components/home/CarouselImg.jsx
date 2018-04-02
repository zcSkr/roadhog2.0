import React, { Component } from 'react';
import { Carousel } from 'antd-mobile';

export default class CarouselImg extends Component {
  constructor(props) {
    super(props);
    this.state = {
      imgHeight: 176,
      slideIndex: 0,
      data: ['AiyWuByWklrrUDlFignR', 'TekJlZRVCjLFexlOCuWn', 'IJOtIlfsYdTyaDTRVrLI'],
    };
  }


  render() {
    return (
      <div>
          <Carousel
          autoplay={false}
          infinite
          selectedIndex={1}
          // beforeChange={(from, to) => console.log(`slide from ${from} to ${to}`)}
          // afterChange={index => console.log('slide to', index)}
        >
        { 
          this.state.data.map(p => (
            <a
              key={p}
              style={{ display: 'inline-block', width: '100%', height: this.state.imgHeight }}
            >
              <img
                src={`https://zos.alipayobjects.com/rmsportal/${p}.png`}
                alt=""
                style={{ width: '100%', verticalAlign: 'top' }}
                onLoad={() => {
                  // fire window resize event to change height
                  window.dispatchEvent(new Event('resize'));
                  this.setState({ imgHeight: 'auto' });
                }}
              />
            </a>
          )) 
        }
        </Carousel>
      </div>
    );
  }
}

