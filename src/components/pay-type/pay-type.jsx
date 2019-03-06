/*
  属性
  @props orderType
  @props payType
*/

/*
参考：

订单类型orderType
'MULTIPLE': 1,  // 普通订单，包含手淘、饿了么、美团等外部订单
'GROUP': 2,     // 拼团订单
'FENXIAO': 3,   // 分销订单
'PRE_SALE': 4,  // 预售订单
'NEXT_DAY_ARRIVE': 5, // 次日达订单
'POS_ORDER': 6, // 线下pos订单

支付方式payType
'ALIPAY': 2,    // 支付宝支付
'WECHAT': 3,    // 微信支付
'ELEME': 10,    // 饿了么支付
'MEITUAN': 11,  // 美团支付
'TAOBAO': 12,   // 手淘支付
*/

import React from 'react';

export default class PayType extends React.Component {
  static getDisplayName(orderType, payType) {
    if (orderType === 6) {
      return '现金';
    }
    switch (payType) {
      case 2:
        return '支付宝';
      case 3:
        return '微信';
      case 10:
        return '饿了么';
      case 11:
        return '美团';
      case 12:
        return '手淘';
      default:
        return '未知支付方式';
    }
  }
  render() {
    const { orderType, payType } = this.props;
    const name = PayType.getDisplayName(orderType, payType);
    return (<span>{name}</span>);
  }
}
