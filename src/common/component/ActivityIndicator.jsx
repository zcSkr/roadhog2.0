import React from 'react';
import { Flex, ActivityIndicator, WhiteSpace } from 'antd-mobile';

export default function MyActivityIndicator({
  style,
  size = 'large',
  text = '加载中',
  color,
}) {
  return (
    <div style={style}>
      <WhiteSpace size='lg' />
      <Flex justify="center">
        <ActivityIndicator color={color} size={size} text={text} />
      </Flex>
      <WhiteSpace size='lg' />
    </div>
  );
}