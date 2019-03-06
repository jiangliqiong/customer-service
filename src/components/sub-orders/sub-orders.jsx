/*
  子订单列表
*/
import './sub-orders.less';

import React from 'react';
import Price from '../../common/price/price';
import UrlBuilder from '../../common/url-builder/url-builder';
import PriceLabel from '../price-label/price-label';

export default class OrderInfo extends React.Component {
  render() {
    const { subOrders, buyAmount, totalPrice } = this.props;
    return(<div>
      <div className="order-sub-orders">
        {subOrders.map(subOrder => {
          return (<div key={subOrder.bizOrderId} className="order-sub-order">
            <img
              className="product-img"
              src={ UrlBuilder.buildImageUrl(subOrder.itemPicUrl, { w: 60, h: 60 }) }
            />
            <div className="order-sub-order-name">
              <div>
                {subOrder.itemName}
                <span className="order-product-id">商品ID：{subOrder.itemId}</span>
              </div>
              <div className="order-property">{subOrder.property} / {subOrder.unit}</div>
            </div>
            <div className="order-sub-order-price">
              <span>x{subOrder.buyAmount}</span>
              <span className="color-red"><PriceLabel price={subOrder.itemPrice} originPrice={subOrder.itemOriginPrice} /></span>
            </div>
          </div>)
        })}
      </div>
      <div className="order-total">
        <span>
          共 <o className="color-red">{buyAmount}</o> 件商品，
          合计：<o className="color-red">{Price.format(totalPrice)}</o>
        </span>
      </div>
    </div>);
  }
}
