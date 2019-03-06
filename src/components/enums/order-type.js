/*

订单类型 orderType

'MULTIPLE': 1,  // 普通订单，包含手淘、饿了么、美团等外部订单
'GROUP': 2,     // 拼团订单
'FENXIAO': 3,   // 分销订单
'PRE_SALE': 4,  // 预售订单
'NEXT_DAY_ARRIVE': 5, // 次日达订单
'POS_ORDER': 6, // 线下pos订单
*/

import { Enum } from 'enumify';

export default class OrderType extends Enum {
  static get(value) {
    return OrderType.enumValues.find(item => item.value === value) || OrderType.UNKNOW;
  }
}
OrderType.initEnum({
  MULTIPLE: {
    value: 1,
    description: '普通订单',
  },
  GROUP: {
    value: 2,
    description: '拼团订单',
  },
  FENXIAO: {
    value: 3,
    description: '分销订单',
  },
  PRE_SALE: {
    value: 4,
    description: '预售订单',
  },
  NEXT_DAY_ARRIVE: {
    value: 5,
    description: '次日达订单',
  },
  POS_ORDER: {
    value: 6,
    description: '线下POS订单',
  },
  UNKNOW: {
    value: 0,
    description: '未知订单类型',
  },
});
