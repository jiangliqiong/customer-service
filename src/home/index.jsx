import './index.less';
import '../common/skin/skin.less';

import 'babel-polyfill';
import React from 'react';
import ReactDOM from 'react-dom';
import { Button, Modal, Tabs } from 'antd';
import qs from 'query-string';

import UrlBuilder from '../common/url-builder/url-builder';
import OrderList from '../components/order-list/order-list';
import UserInfo from '../components/user-info/user-info';

const TabPane = Tabs.TabPane;
const confirm = Modal.confirm;


class Home extends React.Component {
  constructor(props) {
    super(props);

    const callingNo = qs.parse(location.search).ani || '';
    this.state = {
      callingNo, // 来电号码
      seatNo: 6001, // 坐席号
      extensionNo: 8001, // 分机号
    }
    // document.getElementsByTagName('title')[0].innerHTML = `来电-${callingNo}`;
  }

  render() {
    return (
      <div>
        <header>
          <span>快速链接</span>
          <a target="_blank" className="fake-btn" href={UrlBuilder.buildCrmUrl('/crm/www/shop/shopConfig.html')}>店铺查询</a>
          <a target="_blank" className="fake-btn" href={UrlBuilder.buildCrmUrl('/crm/www/user/genCode.html')}>验证码查询</a>
          <a target="_blank" className="fake-btn" href={UrlBuilder.buildCrmUrl('/crm/www/user/userHongbao.html')}>红包查询</a>
          <a target="_blank" className="fake-btn" href={UrlBuilder.buildCrmUrl('/buyer/crm/php/o2o/admin/order/refund_query.php')}>退款查询</a>
          <a target="_blank" className="fake-btn" href={UrlBuilder.buildCrmUrl('/crm/www/msgcenter/sms.html')}>短信发送</a>
          <a target="_blank" className="fake-btn" href={UrlBuilder.buildCrmUrl('/buyer/crm/php/o2o/seller/admin/search_remark.php')}>客诉追踪</a>
        </header>
        <section className="mainner">
          <div className="mainner_l">
            <UserInfo />
          </div>
          <div className="mainner_r">
            <a target="_blank" className="non-order-job-btn fake-btn"
              href={UrlBuilder.buildCrmUrl('/buyer/crm/php/o2o/seller/admin/order_remark.php?biz_order_id=1')}
            >
                创建非订单工单
            </a>
            <Tabs defaultActiveKey="1">
              <TabPane tab="订单信息" key="1">
                <OrderList callingNo={this.state.callingNo} />
              </TabPane>
              <TabPane tab="知识库" key="2" disabled>知识库</TabPane>
            </Tabs>
          </div>
        </section>
      </div>
    );
  }
}

ReactDOM.render(
  <Home />,
  document.getElementById('root')
);
