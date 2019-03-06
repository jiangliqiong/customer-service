/*
  价格展示模块，自动处理原价和折扣价
*/
import React from 'react';
import Price from '../../common/price/price';

export default class PriceLabel extends React.Component {
  render() {
    const { price, originPrice, isYuan }= this.props;
    return (<span>{Price.format(price, isYuan)} {originPrice ? <s>{Price.format(originPrice, isYuan)}</s> : null}</span>);
  }
}
