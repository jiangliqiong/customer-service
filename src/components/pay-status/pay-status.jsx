/*
  属性
  @props payStatus
*/

/*
参考：

支付状态payStatus
TOBEPAID("待支付", 1)
SUCCESS("已支付", 2)
FAILURE("支付失败", 3)
*/
import React from 'react';

export default class PayStatus extends React.Component {
  static getDisplayName(payStatus) {
    switch (payStatus) {
      case 1:
        return '待支付';
      case 2:
        return '已支付';
      case 3:
        return '支付失败';
      default:
        return '未知支付状态';
    }
  }
  render() {
    const { payStatus } = this.props;
    const name = PayStatus.getDisplayName(payStatus);
    return (<span>{name}</span>);
  }
}
