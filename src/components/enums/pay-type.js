/*

支付方式payType
'ALIPAY': 2,    // 支付宝支付
'WECHAT': 3,    // 微信支付
'ELEME': 10,    // 饿了么支付
'MEITUAN': 11,  // 美团支付
'TAOBAO': 12,   // 手淘支付
*/

import { Enum } from 'enumify';

export default class PayType extends Enum {
  static get(value) {
    return PayType.enumValues.find(item => item.value === value) || PayType.UNKNOW;
  }
}
PayType.initEnum({
  ALIPAY: {
    value: 2,
    description: '支付宝',
  },
  WECHAT: {
    value: 3,
    description: '微信',
  },
  ELEME: {
    value: 10,
    description: '饿了么',
  },
  MEITUAN: {
    value: 11,
    description: '美团',
  },
  TAOBAO: {
    value: 12,
    description: '手淘',
  },
  UNKNOW: {
    value: 0,
    description: '未知支付方式',
  },
});
