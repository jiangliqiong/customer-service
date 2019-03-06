import './order-detail.less';

import React from 'react';
import { Button, Modal, Spin } from 'antd';
import Ajax from '../../common/ajax/ajax';
import Price from '../../common/price/price';
import UrlBuilder from '../../common/url-builder/url-builder';
import SubOrders from '../sub-orders/sub-orders';
import OrderType from '../order-type/order-type';
import OrderStatus from '../order-status/order-status';
import DeliveryType from '../delivery-type/delivery-type';
import PayType from '../pay-type/pay-type';
import PayStatus from '../pay-status/pay-status';
import CopyOrderInfo from '../copy-order-info/copy-order-info';
import TimelineEnum from '../enums/timeline-type';

export default class OrderInfo extends React.Component {
  orderData = {};
  constructor(props) {
    super(props);
    this.state = {
      dataInited: false,
      modalVisible: false,
    };
  }
  handleModalShow() {
    this.initData();
    this.setState({ modalVisible: true });
  }
  handleModalHide() {
    this.setState({ modalVisible: false });
  }
  initData() {
    if(this.state.dataInited) return;
    const apiUrl = UrlBuilder.buildApiUrl('/trade/crm/order/queryOrder');
    Ajax.post(apiUrl, {
      body: { bizOrderId: this.props.bizOrderId },
      // body: { bizOrderId: 15310095570 },
    }).then(json => {
      // json = {"entry":[{"acceptTime":1470717005000,"addressSnapshot":"蒋村街道紫霞街 蒋村商务中心 B1栋5楼","area":null,"attributes":"{\"platformCode\":1,\"xiaoErMobile\":13764807121,\"outWayViewId\":\"2157855312633565\",\"cityName\":\"杭州\",\"deliveryName\":\"周青松\",\"xiaoErId\":1787127,\"deductFreightCharge\":0,\"confirmTime\":\"2016-08-10 00:49:45\",\"outWayShopId\":\"128612333\",\"deliveryMobile\":\"13461043194\",\"scFreightCharge\":300,\"confirmDeliveryUser\":\"126429685\",\"platformName\":\"生活半径\",\"managerMobile\":18768186553,\"sendUser\":\"126429685\",\"shopCity\":\"杭州\",\"freightCharge\":300,\"outDeliveryPrice\":\"0\",\"confirmDeliveryTime\":\"2016-08-09 12:49:33\",\"userPayFreightCharge\":300,\"deliveryType\":3,\"outOriginPrice\":\"7140\",\"outWayId\":\"2157855312633565\",\"outTotalPrice\":\"2280\",\"sendTime\":\"2016-08-09 12:35:33\",\"isPreSale\":false,\"acceptUser\":2113754,\"orderMobile\":15397092749,\"shopType\":1,\"xiaoErNick\":\"江羊羊\",\"deliveryId\":126429685,\"acceptTime\":\"2016-08-09 12:30:05\",\"shopName\":\"华丽超市\",\"managerId\":1929980,\"outWay\":\"10\",\"confirmUser\":-1,\"managerNick\":\"黄润烽\",\"itemKinds\":2,\"sellerMobile\":18957154818}","bizOrderId":42145428785,"buyAmount":2,"buyer2uspayId":17329124,"buyer2uspayTime":1470716960000,"buyerCity":null,"buyerId":126748785,"buyerNick":"梅晴光","buyerOrderFunds":[{"name":"商品总价","price":"￥22.80","remark":null},{"name":"配送费","price":"￥3.00","remark":null}],"cancelTime":null,"cancelUser":null,"cancelledBy":null,"cardList":null,"cityCode":330100,"cityName":"杭州","comment":null,"commissionFee":0,"community":"","communityId":null,"confirmDeliveryTime":1470718173000,"confirmedBySystem":null,"customerReminderMark":[],"dailySequence":169,"deductFreightCharge":0,"deliveryCode":8155,"deliveryDeduct":300,"deliveryLogisticsnos":null,"deliveryType":3,"deliveryerMobile":13461043194,"deliveryerName":"周青松","evalCount":null,"evalExpire":null,"ext":{},"feature":null,"freightCharge":300,"freightChargeFakeReduce":null,"gmtCreate":1470716960000,"groupCurCount":null,"groupDetailUrl":null,"groupFullTime":null,"groupGmtCreate":null,"groupId":null,"groupMin":null,"groupPeopleCount":null,"groupPlanOverTime":null,"groupShareAbstract":null,"groupShareTitle":null,"groupStatus":null,"isAccept":1,"isCanCancelOrder":false,"isCanRefundRequest":false,"isDeleted":0,"isDownloadOrderForLogistics":false,"isOfficialPreSale":false,"isPreSale":false,"isResendOrder":false,"isTryCity":null,"itemId":101107259,"itemName":"【买一赠一】吉禄芒果,【买一赠一】清风 原木纯品2层150抽*4包软包抽取面纸巾","itemSumPrice":3570,"landmarkId":0,"lastOpUserId":-1,"lastOpUserName":null,"logisticsCompanyCodeMap":{},"logisticsCompanyName":null,"logisticsDOList":[],"logisticsNo":null,"logisticsStatus":3,"managerMobile":18768186553,"managerNick":"黄润烽","marketActivityId":null,"mobile":15397092749,"notArriveOnTime":0,"notCountSmallCharge":0,"notSendGoodOnTime":0,"notSendOrderReason":null,"onlinePayType":12,"openid":null,"orderEval":null,"orderFunds":[{"bizOrderId":42145428785,"city":"杭州","fund":2580,"fundType":1,"gmtCreate":1470716960000,"platformSubsidy":2580,"sellerSubsidy":0,"shopId":9972},{"bizOrderId":42145428785,"city":"杭州","fund":1290,"fundType":3,"gmtCreate":1470716960000,"platformSubsidy":0,"sellerSubsidy":0,"shopId":9972},{"bizOrderId":42145428785,"city":"杭州","fund":300,"fundType":9,"gmtCreate":1470716960000,"platformSubsidy":-300,"sellerSubsidy":0,"shopId":9972}],"orderMobile":null,"orderNick":null,"orderType":1,"originalPrice":3870,"outOrderId":"201608091229201267487859972","payDeadline":null,"payStatus":2,"payTime":null,"payType":2,"platformCode":1,"platformName":"生活半径","preSalePullBackTime":null,"preSaleSendEndTime":null,"preSaleSendStartTime":null,"promotionPrice":2580,"property":null,"psf":300,"reduce":0,"reduceId":0,"refundCount":0,"refundInfo":null,"refundReceived":false,"refundRequestInfo":null,"refundRequestStatus":null,"refundStatus":null,"refundStatusStr":null,"refundSuccessDatetime":null,"rejectReason":null,"rejectValue":null,"reminderMarkCount":0,"scFreightCharge":300,"sellerBenefit":2280,"sellerCouponSubsidy":0,"sellerFullReduceSubsidy":0,"sellerMobile":null,"sellerNick":null,"sellerOrderFunds":[{"name":"商品总价","price":"￥22.80","remark":null},{"name":"配送费","price":"￥3.00","remark":null},{"name":"配送员服务费","price":"-￥3.00","remark":null},{"name":"技术服务费","price":"-￥0.00","remark":null}],"sellerPackageSubsidy":0,"sellerPsfSubsidy":0,"sellerSpecialSubsidy":1290,"sendLogisticsnos":null,"sendTime":1470717333000,"shopCouponId":0,"shopCouponPrice":0,"shopId":9972,"shopName":"华丽超市","shopType":1,"status":4,"subOrders":[{"bizOrderId":69066688785,"buyAmount":1,"combinationItemInfo":[],"communityId":null,"gmtCreate":1470716960000,"isCombinationItem":null,"isDeleted":0,"itemId":101123402,"itemName":"[清风]【买一赠一】清风 原木纯品2层150抽*4包软包抽取面纸巾","itemOriginPrice":2580,"itemPicUrl":"n/01/22/1453462103551_7665.jpg","itemPrice":1290,"mobile":"15397092749","parentOrderId":42145428785,"property":"2层150抽*4包","shopId":9972,"skuId":null,"totalPrice":1290,"type":1,"unit":"提"},{"bizOrderId":69075688785,"buyAmount":1,"combinationItemInfo":[],"communityId":null,"gmtCreate":1470716960000,"isCombinationItem":null,"isDeleted":0,"itemId":101107259,"itemName":"【买一赠一】吉禄芒果","itemOriginPrice":990,"itemPicUrl":"n/08/05/1470385635617_5173.jpg","itemPrice":990,"mobile":"15397092749","parentOrderId":42145428785,"property":"约250-300g；买一个送一个","shopId":9972,"skuId":null,"totalPrice":990,"type":1,"unit":"份"}],"sysDate":1473241254705,"timeline":[],"totalPrice":2580,"tradeSuccessDatetime":1470761385000,"unit":null,"us2SellerPayBlockedType":null,"us2sellerpayId":null,"us2sellerpayStatus":0,"us2sellerpayTime":null,"validTime":1470716960000,"xiaoErId":1787127,"xiaoErMobile":13764807121,"xiaoErNick":"江羊羊"}],"message":"处理成功！","responseCode":1,"status":true,"timestamp":1473241254704};
      this.orderData = json.entry[0];
      this.setState({ dataInited: true });
    });
  }
  render() {
    const order = this.orderData;
    return (<div className="inline-block">
      <Button type="ghost" onClick={() => this.handleModalShow()}>查看详情</Button>

      {/* 订单详情弹框 */}
      <Modal
        title="订单详情"
        visible={this.state.modalVisible}
        width={710}
        onCancel={() => this.handleModalHide()}
        footer={[
          <Button key="back" type="primary" onClick={() => this.handleModalHide()}>关 闭</Button>,
        ]}
      >
        <div className="order-detail">

        {
          this.state.dataInited
          ? <div>
            <div className="address">
              <span className="inline-block half-width">收货人：{order.buyerNick} {order.mobile}</span>
              <span className="inline-block half-width">下单人：{order.orderNick} {order.orderMobile}</span>
              <span className="block">收货地址：{order.cityName} {order.addressSnapshot}</span>
              <span className="block">备注：{order.comment || '无'}</span>
              <span className="inline-block half-width">所在城市：{order.cityName}</span>
              <span className="inline-block half-width">地标信息：{order.landmarkName || '无'}</span>
            </div>
            <div className="more-detail">
              <div className="inline-block half-width">
                <div>订单ID：{order.bizOrderId} <CopyOrderInfo order={order} /></div>
                <div>店铺ID：{order.shopId}</div>
                <div>店铺名称：{order.shopName}</div>
                <div>支付方式：<PayType orderType={order.orderType} payType={order.payType}/></div>
                <div>支付状态：<PayStatus payStatus={order.payStatus} /></div>
                <div>订单状态：<OrderStatus order={order} /></div>
                <div>
                  配送方式：
                  <DeliveryType deliveryType={order.deliveryType} platformName={order.platformName} />
                  <span className="delivery-name">{order.deliveryerName} {order.deliveryerMobile}</span>
                </div>
                <div>订单编号：{order.outOrderId}</div>
              </div>
              <div className="inline-block half-width">
                {order.timeline.map(time => {
                  return (<div key={time.id}>{TimelineEnum.get(time.id).description}: {new Date(time.realDate).toLocaleString()}</div>);
                })}
              </div>
              <br />
              <br />
              <div className="inline-block half-width">
                {order.buyerOrderFunds.map((fund, i) => {
                  return (<div key={i}>
                    <div className="price-label">{fund.name}</div>
                    <span className="color-red">{Price.format(fund.price, true)}</span>
                  </div>);
                })}
                <div className="price-label">买家实付</div>
                <span className="color-red">{Price.format(order.totalPrice)}</span>
              </div>
              <div className="inline-block half-width">
                {order.sellerOrderFunds.map((fund, i) => {
                  // if(i === 0) fund = { name: '商品总价', price: (order.itemSumPrice / 100)}
                  return (<div key={i}>
                    <div className="price-label">{fund.name}</div>
                    <span className="color-red">{Price.format(fund.price, true)}</span>
                  </div>);
                })}
                <div className="price-label">商家实收</div>
                <span className="color-red">{Price.format(order.sellerBenefit)}</span>
              </div>
            </div>
            <div className="suborders">
              <SubOrders subOrders={order.subOrders} totalPrice={order.totalPrice} buyAmount={order.buyAmount} />
            </div>
            <div className="people">
              <div className="inline-block half-width">接单员：{order.acceptUserNick ? `${order.acceptUserNick} ${order.acceptUserMobile}` : '无'}</div>
              <div className="inline-block half-width">商家：{order.sellerNick ? `${order.sellerNick} ${order.sellerMobile}` : '无'}</div>
              <div className="inline-block half-width">配送员：{order.deliveryerName ? `${order.deliveryerName} ${order.deliveryerMobile}` : '无'}</div>
              <div className="inline-block half-width">小二：{order.xiaoErNick ? `${order.xiaoErNick} ${order.xiaoErMobile}` : '无'}</div>
              <div className="inline-block half-width">主管：{order.managerNick ? `${order.managerNick} ${order.managerMobile}` : '无'}</div>
            </div>
          </div>
          : <div className='spin'><Spin /></div>
        }
        </div>
      </Modal>
    </div>)
  }
}
