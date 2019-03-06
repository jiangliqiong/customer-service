/* 价格相关静态方法 */

export default class Price {
  /*
    价格展示

    1. 自动添加 ¥ 符号、
    2. 换算单位“元”和“分”，默认单位为“分”。通过属性isYuan来设置单位。
    3. 自动保留两位小数
  */
  static format(price = 0, isYuan = false) {
    let isNegative = Price.isNegative(price);
    price = Price.getPriceNumber(price);

    if(!isYuan) { // 默认单位为“分”
      price = price / 100;
    }
    price = price.toFixed(2);
    return `${isNegative ? '-' : ''}¥ ${price}`;
  }

  /* 判断是正数还是负数 */
  static isNegative(price = 0) {
    return price.toString().startsWith('-');
  }

  /* 提取价格字符串中的数字 */
  static getPriceNumber(price = 0) {
    const match = price.toString().match(/([\d\.,]+)/);
    if(match && match.length) {
      price = match[0];
    }
    price = parseFloat(price);
    return Number.isNaN(price) ? 0 : price;
  }
}
