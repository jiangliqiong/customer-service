/*
author: meiqingguang
create date: 2016.08.31

说明: 详情请参考交易线的java代码逻辑，此处只做视图展示层封装，不处理业务逻辑

订单状态(orderStatus)
1 待支付
2 待发货
3 待确认
4 交易成功
5 订单取消
6 商家拒单
7 待提货(已废弃)

订单取消(cancelledBy)
0   买家主动取消
1   买家付款 超时取消
2   客服取消
10  卖家接单超时
11  卖家发货超时
12  卖家拒单(已废弃)
13  拼团失败
14  用户拒收
101 部分退款
102 拼团中只剩一人取消
103 可享优惠超限
104 商家同意退款
105 退款申请处理超时退款

订单物流状态(logisticsStatus)
1 待配送
2 在途中
3 已确认
4 退单
5 待抢单

卖家接单状态(isAccept)
0 未接单
1 接单

退款申请状态(refundRequestStatus)
1 申请
5 退款申请被处理前订单被取消
6 同意
7 拒绝
8 超时未处理自动退款

退款状态(refundReceived)
true  退款成功，用户实际收到
false 退款还未成功
*/
import './order-status.less';

import React from 'react';

export default class OrderStatus extends React.Component {

  // 非正常订单
  static isAbnormal(orderStatus) {
    if (orderStatus !== 4) return true;
    return false;
  }
  // 订单状态的前台展示名称
  static getDisplayName(
    orderStatus,
    cancelledBy,
    logisticsStatus,
    isAccept,
    refundReceived,
    refundRequestStatus) {

    if (orderStatus === 1) {
      return '待支付';
    } else if (orderStatus === 2 && isAccept === 0) {
      return '待接单';
    } else if (orderStatus === 2 && refundRequestStatus === 1) { // 测试订单id:
      return '待发货-申请退款';
    } else if (orderStatus === 2 && logisticsStatus === 1) { // 测试订单id:
      return '待发货-待配送';
    } else if (orderStatus === 2 && logisticsStatus === 5) { // 测试订单id:
      return '待发货-待抢单';
    } else if (orderStatus === 2 && logisticsStatus === 4) { // 测试订单id:
      return '待发货-退单';
    } else if (orderStatus === 2 && refundRequestStatus === 7) {
      return '待发货-拒绝退款';
    } else if (orderStatus === 2) {
      return '待发货';
    } else if (orderStatus === 3 && logisticsStatus === 2) { // 测试订单id:
      return '待确认-在途中';
    } else if (orderStatus === 3 && logisticsStatus === 3) { // 测试订单id:
      return '确认送达';
    } else if (orderStatus === 3 && refundRequestStatus === 1) { // 测试订单id:
      return '待确认-申请退款';
    } else if (orderStatus === 3 && refundRequestStatus === 7) {
      return '待确认-拒绝退款';
    } else if (orderStatus === 3) {
      return '待确认';
    } else if (orderStatus === 4) {
      return '交易成功';
    } else if (orderStatus === 5 && cancelledBy === 0) { // 测试订单id:
      return '交易取消-买家取消';
    } else if (orderStatus === 5 && cancelledBy === 1) { // 测试订单id: 15222225570
      return '交易取消-付款超时';
    } else if (orderStatus === 5 && cancelledBy === 2) { // 测试订单id:
      return '交易取消-售后取消';
    } else if (orderStatus === 5 && cancelledBy === 10) { // 测试订单id:
      return '交易取消-接单超时';
    } else if (orderStatus === 5 && cancelledBy === 11) { // 测试订单id:
      return '交易取消-发货超时';
    } else if (orderStatus === 5 && cancelledBy === 13) { // 测试订单id:
      return '交易取消-拼团失败';
    } else if (orderStatus === 5 && cancelledBy === 14) { // 测试订单id: 14958075570
      return '交易取消-用户拒收';
    } else if (orderStatus === 5 && cancelledBy === 101) { // 测试订单id:
      return '交易取消-部分退款';
    } else if (orderStatus === 5 && cancelledBy === 103) { // 测试订单id:
      return '交易取消-系统取消';
    } else if (orderStatus === 5 && cancelledBy === 104) { // 测试订单id:
      return '交易取消-商家同意退款';
    } else if (orderStatus === 5 && cancelledBy === 105) { // 测试订单id:
      return '交易取消-超时自动退款';
    } else if (orderStatus === 5 && refundRequestStatus === 6 && !refundReceived) { // 测试订单id:
      return '交易取消-退款中';
    } else if (orderStatus === 5 && refundRequestStatus === 6 && refundReceived) { // 测试订单id:
      return '交易取消-退款完成';
    } else if (orderStatus === 5 && refundRequestStatus === 8 && !refundReceived) { // 测试订单id:
      return '交易取消-超时自动退款中';
    } else if (orderStatus === 5 && refundRequestStatus === 8 && refundReceived) { // 测试订单id:
      return '交易取消-超时自动退款完成';
    } else if (orderStatus === 5) {
      return '交易取消';
    } else if (orderStatus === 6) { // 测试订单id: 15212355570
      return '商家拒单';
    }
  }
  render() {
    const {
      status,
      cancelledBy,
      logisticsStatus,
      isAccept,
      refundReceived,
      refundRequestStatus,
    } = this.props.order;
    const name = OrderStatus.getDisplayName(
      status,
      cancelledBy,
      logisticsStatus,
      isAccept,
      refundReceived,
      refundRequestStatus
    );
    const abnormalClass = OrderStatus.isAbnormal(status) ? 'order-status-abnormal' : '';
    return (<span className={abnormalClass}>{name}</span>);
  }
}
