/*
  属性
  @props deliveryType 配送方式
  @props platformName 平台名称，当配送方式为众包配送时，需要显示众包平台的名称
*/

/*
TODO: deliveryType=null

配送方式:
SELLER_SEND(0, "商家配送")
SDX_SEND(1, "闪电侠配送")
EXPRESS_SEND(2, "快递配送")
CROWDSOURCING_SEND(3, "众包配送")
*/

import React from 'react';


export default class DeliveryType extends React.Component {
  SELLER_SEND = 0;
  static getDisplayName(deliveryType, platformName) {
    switch (deliveryType) {
      case 0:
        return '商家配送';
      case 1:
        return '闪电侠配送';
      case 2:
        return '快递配送';
      case 3:
        return `${platformName}配送`;
      default:
        return '未知配送方式';
    }
  }
  render() {
    const { deliveryType, platformName } = this.props;
    const name = DeliveryType.getDisplayName(deliveryType, platformName);
    return (<span>{name}</span>);
  }
}
