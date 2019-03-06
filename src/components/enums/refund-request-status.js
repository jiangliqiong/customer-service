import { Enum } from 'enumify';

export default class RefundRequestStatusEnum extends Enum {
  static get(value) {
    return RefundRequestStatusEnum.enumValues.find(item => item.value === value) || RefundRequestStatusEnum.UNKNOW;
  }
}
RefundRequestStatusEnum.initEnum({
  APPLY: {
    value: 1,
    description: '申请退款，待商家处理',
  },
  CANCELLED_BEFORE_HANDLE: {
    value: 5,
    description: '退款申请被处理前订单被取消',
  },
  AGREE: {
    value: 6,
    description: '商家同意退款',
  },
  REJECT: {
    value: 7,
    description: '商家拒绝退款',
  },
  TIMEOUT: {
    value: 8,
    description: '超时未处理，自动退款',
  },
  UNKNOW: {
    value: null,
    description: '未知退款申请状态'
  }
});
