import { connect } from 'dva';

import React, { Component } from 'react';
import { routerRedux } from 'dva/router';
import { WhiteSpace } from 'antd-mobile';

import CarouselImg from "components/home/CarouselImg";
import NoticeCarousel from "components/home/NoticeCarousel";
import TabsGrid from "components/home/TabsGrid";

@connect(state=> ({
  // example: state.example
}))

export default class HomePage extends Component{
  render (){
    const {
      dispatch,
      style,
    } = this.props;
    const handleButtonClick = (id) => {
      dispatch(routerRedux.push(`/bidbrief?id=${id}`))
    }
    const CarouselImgProps = {
      list: [],
    }
    const NoticeCarouselProps = {
      list: [],
    }
    const tabsGridProps = {
      handleButtonClick,
    }
    return (
      <div style={{style}}>
        <CarouselImg {...CarouselImgProps} />
        <NoticeCarousel {...NoticeCarouselProps} />
        <WhiteSpace size='sm' />
        <TabsGrid {...tabsGridProps} />
      </div>
    );
  };
}
