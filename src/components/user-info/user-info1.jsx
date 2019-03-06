
/*
  用户已经登录，
  根据手机号码查询是否绑定坐席号，分机号
  如果绑定显示1，否则显示2
  绑定的话，拨打电话，通过正在拨打的电话查询此时通话的用户信息
  判断是否在拨打电话
*/

import './user-info.less';
import React from 'react';
import ReactDOM from 'react-dom';
import Ajax from '../../common/ajax/ajax';
import UrlBuilder from '../../common/url-builder/url-builder';
import qs from 'query-string';
import defaultAvatar from '../../images/default-avatar.png';

export default class UserInfo extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      avatar: defaultAvatar,
      niki: null,
      mobile: null,
      userId: null,
      seatNo: null,
      extensionNo: 8001,
      callNo: null,
      regTime: null,
      accoutType: null,
      shopId: null,
      shopName: null,
      isbacklist: null,
      hasbind: false,
      callingNo: qs.parse(location.search).ani,
      shopInfo: null,
    };

    if(this.state.callingNo) {
      this.getUserInfo();
    } else {
      this.checkSeatBind();
    }
  }

  /* 通过CRM查询是否绑定了坐席号 */
  checkSeatBind() {
    var self = this;
    const requestUrl = UrlBuilder.buildApiUrl('/callcenter/api/agent/queryAgentByCondition');
    Ajax.post(requestUrl, {
      body: { userId: this.getCookie('_uk') },
    }).then((json) => {

      json.entry = [{agentNumber: 6001, extensionNumber: 8001}];

      if (json.status && json.entry && json.entry.length) {

        /*绑定了坐席号*/
        const seatNo = json.entry[0].agentNumber;
        const extensionNo = json.entry[0].extensionNumber;
        this.setState({
          seatNo,
          extensionNo,
          hasbind: true,
        })

        try { // 登录坐席号
          window.external.PhoneLogin(seatNo, extensionNo, '', '', '', '', '');
        }catch (e) {
          console.log(e);
        }
      } else {
        /*没有绑定坐席号*/
        this.setState({
          mobile: this.getCookie('_cm'),
        })
      }
    }).catch(error => {
      console.log(error);
    })
  }

  /*拨打电话查询此时拨打电话的用户的信息*/
  getUserInfo() {
    const requestUrl = UrlBuilder.buildApiUrl('/member/getUserbyMobileForCS.do?mobile=' + this.state.callingNo);
    Ajax.get(requestUrl).then((json) => {
      if (json.status) {
        const isbacklist = json.entry.isBlackListUser ? '是' : '否';
        const userInfo = json.entry.userInfo;
        const shopInfo = json.entry.shopList;
        const regTime = new Date(userInfo.gmtCreate).toLocaleString().replace(/\//g, '-').split(' ')[0];
        const userNick = userInfo.userNick;
        let accoutname = null;
        const contstatekey = null;
        if (shopInfo.length > 0) {
          accoutname = '商家';
        } else {
          accoutname = '用户';
        }

        this.setState({
          avatar: 'http://imgsize.52shangou.com/img/' + userInfo.avatar,
          niki: userNick ? userNick : this.state.callingNo,
          isbacklist: isbacklist,
          callNo: 111111,
          mobile: userInfo.mobile,
          userId: userInfo.userId,
          regTime: regTime,
          accoutType: accoutname,
          shopId: shopInfo.length > 0 ? shopInfo[0].id: null,
        }, () => {
          const items = shopInfo.map(function (item) {
          return (
            <dl><dt>店铺ID：</dt><dd>{item.id}</dd><dt>店铺名称：</dt><dd>{item.shopName}</dd></dl>
            );
          })
          this.setState({
            shopInfo: items,
          })
       })
      } else {
        this.setState({
          niki: this.state.callingNo,
        })
      }
    })
  }

  getCookie(name) {
    const reg = new RegExp('(^| )' + name + '=([^;]*)(;|$)');
    const arr = document.cookie.match(reg);
    if (arr) {
      return unescape(arr[2]);
    } else {
      return null;
    }
  }

  // 登出
  doLogout() {
    const requestUrl = UrlBuilder.buildApiUrl('member/logout.do');
    Ajax.post(requestUrl, {
      body: { 'role': 'crm' },
    }).then(function(res) {
      const targetUrl = location.href;
      window.location.href = '/member/login.html?redirectUrl=' + encodeURIComponent(targetUrl);
    });
  }

  // 没有来电的情况下，渲染客服员工信息
  renderStaffInfo() {
    let dom = null;
    if(this.state.hasbind) {
      dom = (<div>
        <span className="user-log"><img src={this.state.avatar} width="100" height="100" /></span>
        <div className="user-nobind">
          <span>坐席：{this.state.seatNo}　　分机：{this.state.extensionNo}</span>
          <a onClick={() => this.doLogout()}>登出</a>
        </div>
      </div>);
    } else {
      dom = (<div>
        <span className="user-log"><img src={this.state.avatar} width="100" height="100" /></span>
        <div className="user-nobind">
          <span>{this.state.mobile}</span>
          <a onClick={() => this.doLogout()}>登出</a>
        </div>
      </div>);
    }
    return dom;
  }

  // 有来电的情况下，渲染来电用户信息
  renderCustomerInfo() {
    return (<div>
      <span className="user-log"><img src={this.state.avatar} width="100" height="100" /></span>
      <div className="user-info">
        <dl>
          <dt>用户昵称：</dt>
          <dd>{this.state.niki}</dd>
          <dt>联系电话：</dt>
          <dd>{this.state.mobile}</dd>
          <dt>用户ID：</dt>
          <dd>{this.state.userId}</dd>
          <dt>注册时间：</dt>
          <dd>{this.state.regTime}</dd>
          <dt>账户类型：</dt>
          <dd>{this.state.accoutType}</dd>
        </dl>
        {this.state.shopInfo}
        <dl>
          <dt>是否为黑名单：</dt>
          <dd>{this.state.isbacklist}</dd>
        </dl>
      </div>
      <div className="user-minfo">
        <span>坐席：{this.state.seatNo}</span>
        <span>分机：{this.state.extensionNo}</span>
        <a onClick={() => this.doLogout()}>登出</a>
      </div>
    </div>)
  }

  render() {
    return (<div>
      {this.state.callingNo ? this.renderCustomerInfo() : this.renderStaffInfo()}
    </div>);
  }
}
