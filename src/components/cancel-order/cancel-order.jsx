import './cancel-order.less';
import React from 'react';
import ReactDOM from 'react-dom';
import { Button, Modal } from 'antd';
import UrlBuilder from '../../common/url-builder/url-builder';
const confirm = Modal.confirm;

export default class CancelOrder extends React.Component {
  showConfirm(orderId) {
    const self = this;
    confirm({
      title: '确认是否取消订单？',
      content: '点【确定】，该笔交易金额将全额退还给用户。',
      onOk() {
        self.cancelOrder(orderId);
      },
      onCancel() {

      },
    });
  }

  cancelOrder(orderId) {
    const self = this;
    const requestUrl = UrlBuilder.buildApiUrl('/trade/crm/order/cancelOrder');
    fetch(requestUrl, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      credentials: 'include', // 要这样设置才能带上cookie
      body: JSON.stringify({ bizOrderId: orderId }),
    }).then((res) => {
      return res.json();
    }).then((json) => {
      if (json.status) {
        self.success('订单取消成功');
      } else {
        self.error('订单取消成功');
      }
    })
  }

  success(msg) {
    const modal = Modal.success({
      title: '温馨提示',
      content: msg,
    });
  }

  error(msg) {
    Modal.error({
      title: '温馨提示',
      content: msg,
    });
  }

  render() {
    return (
      <div className="inlinediv">
        <Button onClick={ () => this.showConfirm(this.props.orderId) }>取消订单</Button>
      </div>
    )
  }
}
