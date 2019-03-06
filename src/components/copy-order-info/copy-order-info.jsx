/*
  复制订单关键信息

  闪电购订单：收货人、收货地址、备注、所在城市、订单ID、店铺ID、店铺地址、付款时间、付款方式、OM、主管
  POS订单：会员、单据号码、店铺ID、店铺名称、付款方式、销售时间

*/
import React from 'react';
import { Button } from 'antd';
import ClipboardButton from 'react-clipboard.js';
import PayTypeEnum from '../enums/pay-type';

export default class CopyOrderInfo extends React.Component {

  constructor(props) {
    super(props);
    this.state = { status: 'idle' };
  }
  getText() {
    const order = this.props.order;

    return `收货人：${order.buyerNick} ${order.mobile}
收货地址：${order.cityName} ${order.addressSnapshot}
备注：${order.comment || '无'}
所在城市：${order.cityName}
订单ID：${order.bizOrderId}
店铺ID：${order.shopId}
店铺地址：${order.shopName}
付款时间：${(new Date(order.buyer2uspayTime)).toLocaleString()}
付款方式：${PayTypeEnum.get(order.payType).description}
OM：${order.xiaoErNick} ${order.xiaoErMobile}
主管：${order.managerNick} ${order.managerMobile}`;

  }
  onSuccess() {
    this.setState({ status: 'check' });
    setTimeout(() => {
      this.setState({ status: 'idle' });
    }, 500);
  }
  getIcon() {
    let icon = null;
    let status = this.state.status;
    if (status === 'check') {
      icon = <i className="anticon anticon-check"></i>;
    }
    return icon;
  }
  render() {
    return (
      <ClipboardButton
        className="ant-btn  ant-btn-ghost ant-btn-sm"
        option-text={() => this.getText()}
        onSuccess={() => this.onSuccess()}
      >
        {this.getIcon()}
        复制信息
      </ClipboardButton>
    );
  }
}

