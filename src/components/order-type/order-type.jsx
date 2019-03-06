/*
  属性
  @props orderType
  @props payType
*/

/*
参考：java源码路径

订单类型的后端存储结构
'MULTIPLE': 1,  // 普通订单，包含手淘、饿了么、美团等外部订单
'GROUP': 2,     // 拼团订单
'FENXIAO': 3,   // 分销订单
'PRE_SALE': 4,  // 预售订单
'NEXT_DAY_ARRIVE': 5, // 次日达订单
'POS_ORDER': 6, // 线下pos订单

支付方式的后端存储结构
'ALIPAY': 2,    // 支付宝支付
'WECHAT': 3,    // 微信支付
'ELEME': 10,    // 饿了么支付
'MEITUAN': 11,  // 美团支付
'TAOBAO': 12,   // 手淘支付
*/

import React from 'react';

export default class OrderType extends React.Component {
  static getDisplayName(orderType, payType) {
    switch (orderType) {
      case 1: {
        let name = '';
        if (payType === 10) {
          name = '饿了么订单';
        } else if (payType === 11) {
          name = '美团订单';
        } else if (payType === 12) {
          name = '手淘订单';
        } else {
          name = 'APP 订单';
        }
        return name;
      }
      case 2:
        return '拼团订单';
      case 3:
        return '分销订单';
      case 4:
        return '预售订单';
      case 5:
        return '次日达订单';
      case 6:
        return '线下pos订单';
      default:
        return `未知订单类型:${orderType}`;
    }
  }
  render() {
    const { orderType, payType } = this.props;
    const name = OrderType.getDisplayName(orderType, payType);
    return (<span>{name}</span>);
  }
}
