/*
  timeline 各个时间节点的枚举
*/

import { Enum } from 'enumify';

export default class TimelineType extends Enum {
  static get(value) {
    return TimelineType.enumValues.find(item => item.value === value) || TimelineType.UNKNOW;
  }
}
TimelineType.initEnum({
  ORDER_CREATED: {
    value: 1,
    description: '下单时间',
  },
  ORDER_PAID: {
    value: 2,
    description: '付款时间',
  },
  ORDER_ACCEPTED: {
    value: 3,
    description: '接单时间',
  },
  GOODS_SENT: {
    value: 4,
    description: '发货时间',
  },
  GOODS_DELIVERED: {
    value: 5,
    description: '送达时间',
  },
  ORDER_SUCCESS: {
    value: 6,
    description: '交易完成',
  },
  ORDER_CANCELLED: {
    value: 7,
    description: '取消订单',
  },
  ORDER_REFUND_REQUESTED: {
    value: 8,
    description: '申请退款',
  },
  ORDER_REFUND_COMPLETED: {
    value: 9,
    description: '退款完成',
  },
  BUYER_REFUND_REQUEST: {
    value: 10,
    description: '申请退款', // 买家申请退款
  },
  SELLER_AGREE_REFUND: {
    value: 11,
    description: '同意退款',
  },
  SELLER_REFUSE_REFUND: {
    value: 12,
    description: '拒绝退款', // 买家申请退款
  },
  UNKNOW: {
    value: null,
    description: '未知节点'
  }
});
