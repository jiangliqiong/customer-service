/*
  用于展示订单摘要信息和关键信息的卡片

  注意：不同于order-detail组件。本组件用于展示订单信息中最重要的一些字段，而order-detail组件用于展示完整的订单信息。
*/

import './order-card.less';

import React from 'react';
import { Button } from 'antd';
import OrderType from '../order-type/order-type';
import OrderStatus from '../order-status/order-status';
import DeliveryType from '../delivery-type/delivery-type';
import PayType from '../pay-type/pay-type';
import PayStatus from '../pay-status/pay-status';
import UrlBuilder from '../../common/url-builder/url-builder';
import RefundRequestStatusEnum from '../enums/refund-request-status';
import Coupon from '../coupon/coupon';
import CancelOrder from '../cancel-order/cancel-order';
import SubOrders from '../sub-orders/sub-orders';
import OrderDetail from '../order-detail/order-detail';
import CopyOrderInfo from '../copy-order-info/copy-order-info';
import PayTypeEnum from '../enums/pay-type';
import OrderTypeEnum from '../enums/order-type';

export default class OrderCard extends React.Component {

  handleMoreInfoShow(event) {
    this.props.expand(this.props.order.bizOrderId);
  }
  handleSummaryInfoClick(event) {
    event.stopPropagation();
  }

  static canBeCancelled(order) {
    let can = true;
    const { payType, orderType, isAccept, status } = order;
    if (payType === PayTypeEnum.TAOBAO.value) {
      // 手淘订单不能取消订单
      can = false;
    } else if (orderType === OrderTypeEnum.POS_ORDER.value) {
      // POS订单不能取消
      can = false;
    } else if (payType === PayTypeEnum.MEITUAN.value && isAccept) {
      // 美团订单，已接单的情况下不能取消订单
      can = false;
    }

    return can;
  }

  render() {
    const order = this.props.order;
    const abnormalClass = OrderStatus.isAbnormal(order.status) ? 'abnormal' : '';
    return (
    <div className={`order-card ${abnormalClass}`}>
      <div className="order-summary" onClick={event => this.handleMoreInfoShow(event)}>
        <div className="order-summary-item">
          <div className="daily-sequence"># {order.dailySequence}</div>
          <div className="order-type">
            <OrderType orderType={order.orderType} payType={order.payType} />
          </div>
        </div>
        <div
          className="order-summary-item order-summary-info"
          onClick={(event) => this.handleSummaryInfoClick(event)}
        >
          <div>
            <span className="order-shop">店铺：【{order.shopId}】{order.shopName.substr(0, 10)}</span>
            <span className="order-time">下单时间：{new Date(order.gmtCreate).toLocaleString()}</span>
          </div>
          <div>
            买家昵称：{order.buyerNick}
            <span className="order-id-span">订单ID：{order.bizOrderId}</span>
            <CopyOrderInfo order={order} />
          </div>
        </div>
        <div className="order-summary-item order-summary-status">
          <DeliveryType deliveryType={order.deliveryType} platformName={order.platformName} />
          <span className="order-status">
            订单状态：
            <OrderStatus order={order} />
          </span>
          <span className="order-pay-type">
            支付状态：<PayStatus payStatus={order.payStatus} />
            {order.payStatus === 2 ? [' ( ',
            <PayType
              key="1"
              orderType={order.orderType}
              payType={order.payType}
            />, ' )'] : ''}
          </span>
        </div>
      </div>
      <div className={`order-more-info${this.props.isExpand ? ' show' : ''}`}>
        <div className="order-shipping">
          收货信息：{order.buyerNick} {order.mobile}
          <span className="order-user">下单人 {order.orderNick} {order.orderMobile}</span><br />
          <span className="order-address">{order.cityName} {order.addressSnapshot}</span>
        </div>
        <div className="order-abnormal-message">
          {(() => {
            if (order.refundRequestStatus) { // 有退款
              const info = order.refundRequestInfo || {};
              const refundRequestStatus = RefundRequestStatusEnum.get(order.refundRequestStatus);
              return (<div>
                <span>退款时间：{(new Date(info.refundRequestOccurTimeMillis)).toLocaleString()}</span>
                <span>退款状态：<o className="color-red">{refundRequestStatus.description}</o></span><br />
                <span>退款原因：{info.refundReason}</span>
                <span>退款方式：<PayType orderType={order.orderType} payType={order.payType} /></span>
              </div>);
            } else if (order.status === 5 && order.cancelledBy === 103) { // 风控
              return '取消原因：刷单，可享优惠超限';
            } else if (order.status === 5 && order.cancelledBy === 14) { // 用户拒收 14958075570
              let rejectReason = '无';
              if(order.attribute) {
                rejectReason = JSON.parse(order.attribute).olErrMsg || '无';
              }
              return `拒收原因：${rejectReason}`;
            } else if (order.status === 6) { // 商家拒单
              return `拒单原因：${order.rejectReason}`;
            }
          })()}
        </div>
        <SubOrders subOrders={order.subOrders} totalPrice={order.totalPrice} buyAmount={order.buyAmount} />
        <div className="order-key-info">
          <div>
            {order.acceptTime ? <span>接单时间：{(new Date(order.acceptTime)).toLocaleString()}</span> : ''}
            {order.sendTime ? <span>发货时间：{(new Date(order.sendTime)).toLocaleString()}</span> : ''}
            {order.confirmDeliveryTime ? <span>送达时间：{(new Date(order.confirmDeliveryTime)).toLocaleString()}</span> : ''}
          </div>
          <div>
            {order.sellerNick ? <span>商家：{order.sellerNick} {order.sellerMobile}</span> : ''}
            {order.acceptUserNick ? <span>接单员：{order.acceptUserNick} {order.acceptUserMobile}</span> : ''}
            {order.deliveryerName ? <span>配送员：{order.deliveryerName} {order.deliveryerMobile}</span> : ''}
            {order.managerMobile ? <span>小二：{order.xiaoErNick} {order.xiaoErMobile}</span> : ''}
          </div>
          <div>
            {/*<span>平台满减优惠：</span>
            <span>商家满减优惠：</span>*/}
          </div>
        </div>
        <div className="order-button-bar">
          <div className="float-left">
            <a target="_blank" className="fake-btn" href={UrlBuilder.buildCrmUrl(`/buyer/crm/php/o2o/seller/admin/order_remark.php?biz_order_id=${order.bizOrderId}`)}>创建工单</a>
            <OrderDetail bizOrderId={order.bizOrderId} />
          </div>
          <div className="float-right">
            <Coupon orderMobile={order.orderMobile} recieverMobile={order.mobile} orderId={order.bizOrderId} />
            {OrderCard.canBeCancelled(order) && <CancelOrder orderId={order.bizOrderId} />}
          </div>
        </div>

      </div>
    </div>);
  }
}
