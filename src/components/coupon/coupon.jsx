import './coupon.less'
import React from 'react';
import ReactDOM from 'react-dom';
import { Button, Form, Input, Modal, Select, Radio, DatePicker, TimePicker, Col } from 'antd';
const createForm = Form.create;
const FormItem = Form.Item;
const RadioGroup = Radio.Group;
const Option = Select.Option;
import UrlBuilder from '../../common/url-builder/url-builder';

class Coupon extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      visible: false,
      expirationTime: this.GetDateStr(3),
      reason: '虚假送达',
      startTime: null,
      vality_time: 3,
      selfdecision: 'selfdecisionhide',
      automatic: null,
      validateStatus1: null,
      help1: null,
      validateStatus2: null,
      help2: null,
    };
  }

  sendHongbao(data) {
    const requestUrl = UrlBuilder.buildApiUrl('/crm/crm/market/sendHongbao');
    fetch(requestUrl, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      credentials: 'include', // 要这样设置才能带上cookie
      body: JSON.stringify(data),
    }).then((res) => {
      return res.json();
    }).then((json) => {
      if (json.status) {
        this.success();
      } else {
        this.warning(json.message)
      }
    })
  }

  warning(message) {
    Modal.warning({
      title: '温馨提示',
      content: message,
    });
  }
  success() {
    Modal.success({
      title: '温馨提示',
      content: '红包发送成功！',
    });
  }
  selectData(value) {
    this.setState({
      vality_time: `${value}`,
      expirationTime: this.GetDateStr(parseInt(`${value}`)),
      expirationTime_view: this.GetDateStr(parseInt(`${value}`)),
      startTime: this.GetDateStr(0),
      startTime_view: this.GetDateStr(0)
    })
  }

  GetDateStr(AddDayCount) {
    const date = new Date();
    date.setDate(date.getDate() + AddDayCount);//获取AddDayCount天后的日期
    if (date) {
      return this.formatTime(date);
    }
  }
  disabledStartDate(startValue) {
    if (!startValue || !this.state.endValue) {
      return false;
    }
    return startValue.getTime() >= this.state.endValue.getTime();
  }
  disabledEndDate(endValue) {
    if (!endValue || !this.state.startValue) {
      return false;
    }
    return endValue.getTime() <= this.state.startValue.getTime();
  }
  onChange(field, value) {
    if (field === 'startValue') {
      if (value) {
        this.setState({
          [field]: value,
          startTime: this.formatTime(value),
          validateStatus1: 'success',
          help1: '',
        });
      } else {
        this.setState({
          [field]: value,
          startTime: this.formatTime(value),
          validateStatus1: 'error',
          help1: '开始时间不能为空',
        });
     }
    } else {
      if (value) {
        this.setState({
          [field]: value,
          expirationTime: this.formatTime(value),
          validateStatus2: 'success',
          help2: '',
        }); 
      } else {
        this.setState({
          [field]: value,
          expirationTime: this.formatTime(value),
          validateStatus2: 'error',
          help2: '结束时间不能为空',
        });
     }
    } 
  }
  onStartChange(value) {
    this.onChange('startValue', value);
  }
  onEndChange(value) {
    this.onChange('endValue', value);
  }

  handleStartToggle({ open }) {
    if (!open) {
      this.setState({ endOpen: true });
    }
  }
  handleEndToggle({ open }) {
    this.setState({ endOpen: open });
  }
  /*时间格式化*/
  formatTime(date) {
    const y = date.getFullYear();
    const m = date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1;//获取当前月份的日期
    const d = date.getDate() < 10 ? '0' + date.getDate() : date.getDate();
    const h = date.getHours() < 10 ? '0' + date.getHours() : date.getHours();
    const min = date.getMinutes() < 10 ? '0' + date.getMinutes() : date.getMinutes();
    const s = date.getSeconds() < 10 ? '0' + date.getSeconds() : date.getSeconds();
    return y + '-' + m + '-' + d + '' + h + ':' + min + ':' + s;
  }
  onChangeValue(e) {
    this.setState({ selectTime: e.target.value }, () => {
      if (e.target.value === '动态生成') {
        this.setState({
          automatic: null,
          selfdecision: 'selfdecisionhide',
        })
      } else {
        this.setState({
          automatic: 'automatichide',
          selfdecision: null,
        })
      }
    })
  }

  handleSubmit() {
    this.props.form.validateFields((errors, values) => {
      if (!!errors) {
        console.log('Errors in form!!!');
      }
      if (!values.startTime) {
        this.setState({
          validateStatus1: 'error',
          help1: '开始时间不能为空',
        })
      } else {
        this.setState({
          validateStatus1: 'success',
          help1: '',
        })
      }

      if (!values.expirationTime) {
        this.setState({
          validateStatus2: 'error',
          help2: '结束时间不能为空',
        })
      } else {
        this.setState({
          validateStatus2: 'success',
          help2: '',
        })
      }
      if (values['select-time'] === '动态生成') {
        values.startTime = this.GetDateStr(0);
        values.expirationTime = this.state.expirationTime;
        values.startTime_view = this.GetDateStr(0);
        values.expirationTime_view = this.state.expirationTime;
      } else {
        if (values.startTime && values.expirationTime){
          values.startTime = this.formatTime(values.startTime);
          values.expirationTime = this.formatTime(values.expirationTime);
          values.startTime_view = values.startTime;
          values.expirationTime_view = values.expirationTime;
        }
      }
      values.reason = this.state.reason;
      values.price = values.price * 100;
      values.mobile = values.mobile.substring(3);

      if (values.price && values.couponName && values.startTime && values.expirationTime) {
        this.sendHongbao(values);
      }
    });
  }

  showModal() {
    this.setState({ visible: true });
  }
  hideModal() {
    this.setState({ visible: false });
  }

  priceCheck(rule, value, callback) {
    const { validateFields } = this.props.form;
    const strP = /^\d+(\.\d+)?$/;
    if (strP.test(value)) {
      if (value >= 0 && value <= 10) {
        callback();
      } else {
        callback(new Error('请输入0-10之间的数字'));
      }
    } else {
      callback(new Error('请输入0-10之间的数字'));
    }
  }

  handleChangeReason(value) {
    this.setState({
      reason: `${value}`,
    })
  }

  handleInputChange(e) {
    this.setState({
      reason: e.target.value,
    });
  }

  render() {
    const { getFieldProps, getFieldError, isFieldValidating } = this.props.form;
    const couponNameProps = getFieldProps('couponName', {
      rules: [
        { required: true, min: 1, message: '红包名称不能为空' },
      ],
    });
    const priceProps = getFieldProps('price', {
      rules: [
        { required: true, message: '请输入0-10内的金额' },
        { validator: this.priceCheck.bind(this) },
      ],
    });

    const formItemLayout = {
      labelCol: { span: 4 },
      wrapperCol: { span: 20 },
    };
    return (
      <div className="inlinediv">
        <Button onClick={this.showModal.bind(this)}>发红包</Button>
        <Modal title="发送红包" wrapClassName="vertical-center-modal" visible={this.state.visible} onOk={() => this.handleSubmit()} onCancel={() => this.hideModal()} width="690px">
          <Form horizontal ref="jj" form={this.props.form} >
            <FormItem id="select1" label="手机号码" {...formItemLayout} >
              <Select size="large" {...getFieldProps('mobile', { initialValue: '下单人' + this.props.orderMobile })}>
                <Option value={'下单人' + this.props.orderMobile}>下单人：{this.props.orderMobile}</Option>
                <Option value={'收货人' + this.props.recieverMobile}>收货人：{this.props.recieverMobile}</Option>
              </Select>
            </FormItem>

            <FormItem id="select2" label="红包适应类型" {...formItemLayout}>
              <Select {...getFieldProps('sourcePageEnum', { initialValue: '普通红包' })} id="select2" size="large">
                <Option value="NOLIMIT">普通红包</Option>
                <Option value="GROUP">拼团红包</Option>
              </Select>
            </FormItem>
            <FormItem {...formItemLayout} label="订单ID">
              <Input {...getFieldProps('orderId', { initialValue: this.props.orderId })} type="text" readOnly="true" autoComplete="off" />
            </FormItem>

            <FormItem {...formItemLayout} label="红包名称">
              <Input {...couponNameProps} type="text" placeholder="红包名称" autoComplete="off" />
            </FormItem>

            <FormItem {...formItemLayout} label="红包类型">
              <Select {...getFieldProps('unlimited', { initialValue: '受限制红包' })} size="large">
                <Option value="false">受限制红包</Option>
                <Option value="true">不受限制红包</Option>
              </Select>
            </FormItem>

            <FormItem {...formItemLayout} label="红包金额（元）">
              <Input {...priceProps} type="text" placeholder="请输入0-10元内的金额" autoComplete="off" />
            </FormItem>

            <FormItem {...formItemLayout} label="是否动态生成">
              <RadioGroup {...getFieldProps('select-time', { initialValue: '动态生成', onChange: this.onChangeValue.bind(this) })} ref="timeType">
                <Radio value="动态生成">动态生成</Radio>
                <Radio value="自定义时间">自定义时间</Radio>
            </RadioGroup>
            </FormItem>
            <FormItem {...formItemLayout} label="有效期" className={this.state.selfdecision} >
              <Col span="8">
                <FormItem validateStatus={this.state.validateStatus1} help={this.state.help1}>
                  <DatePicker {...getFieldProps('startTime', { onChange: this.onStartChange.bind(this), toggleOpen: this.handleStartToggle.bind(this) })} showTime format="yyyy-MM-dd HH:mm:ss" placeholder="开始日期" disabledDate={this.disabledStartDate.bind(this)} />
                </FormItem>
              </Col>
              <Col span="1">
                <p className="ant-form-split">至</p>
              </Col>
              <Col span="8">
                <FormItem validateStatus={this.state.validateStatus2} help={this.state.help2}>
                  <DatePicker {...getFieldProps('expirationTime', { onChange: this.onEndChange.bind(this), toggleOpen: this.handleEndToggle.bind(this) })} showTime format="yyyy-MM-dd HH:mm:ss" placeholder="结束日期" open={this.state.endOpen} disabledDate={this.disabledEndDate.bind(this)} />
                </FormItem>
              </Col>
            </FormItem>
            <FormItem {...formItemLayout} label="有效期" className={this.state.automatic}>
              <Select id="select3" size="large" defaultValue="3天" onChange={this.selectData.bind(this)}>
                <Option value="3">3天</Option>
                <Option value="5">5天</Option>
                <Option value="7">7天</Option>
              </Select>
            </FormItem>

            <FormItem {...formItemLayout} label="发起原因">
              <Select id="select4" size="large" {...getFieldProps('reason_select', { initialValue: '虚假送达', onChange: this.handleChangeReason.bind(this) })} >
                <Option value="虚假送达">虚假送达</Option>
                <Option value="商家无故拒单">商家无故拒单</Option>
                <Option value="商家接单后拒单">商家接单后拒单</Option>
                <Option value="未经用户同意，商品到后要求补差价">未经用户同意，商品到后要求补差价</Option>
                <Option value="未经用户同意，私自更换商品">未经用户同意，私自更换商品</Option>
                <Option value="商家要求用户自提">商家要求用户自提</Option>
                <Option value="商品数量少于用户下单数">商品数量少于用户下单数</Option>
                <Option value="商品有质量问题">商品有质量问题</Option>
                <Option value="过期食品或者临保期食品问题">过期食品或者临保期食品问题</Option>
                <Option value="超1小时或在约定时间内未收到货">超1小时或在约定时间内未收到货</Option>
                <Option value="服务不到位，使用不文明语言辱骂用户">服务不到位，使用不文明语言辱骂用户</Option>
                <Option value="缺货但未下架">缺货但未下架</Option>
                <Option value="拼团商品质量问题">拼团商品质量问题</Option>
                <Option value="拼团商品超时未收到货">拼团商品超时未收到货</Option>
                <Option value="拼团商品未及时发货">拼团商品未及时发货</Option>
                <Option value="拼团商品口感不好">拼团商品口感不好</Option>
                <Option value="拼团商品错发漏发">拼团商品错发漏发</Option>
                <Option value="其它">其它</Option>
              </Select>
              <div className="reasonText">
                <Input type="textarea" value={this.state.reason} onChange={this.handleInputChange.bind(this)} placeholder="随便写" />
              </div>
            </FormItem>
          </Form>
        </Modal>
      </div>
    );
  }
}
Coupon = Form.create({})(Coupon);
export default Coupon;
