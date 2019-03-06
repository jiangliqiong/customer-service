/*
登录组件
- 检查CRM登录态(通过cookie判断)
  - 如果没有登录则跳转到CRM登录页
  - 如果已登录
    - 记录已登录的账号
    - 根据登录的CRM账号查询坐席号和分机号，并登录坐席
- 登录、登出CRM账号
*/
import React from 'react';
import ReactDOM from 'react-dom';
import { Button } from 'antd';
import UrlBuilder from '../../common/url-builder/url-builder';



export default class Login extends React.Component {
  constructor(props) {
    super(props);
    const isLogged = this.checkLogin();
    this.state = { loading: false, isLogged: isLogged };
  }
  checkLogin() {
    if(!this.getCookie("_uk")) {
      const targetUrl=location.href;
      window.location.href="http://daily.manage.51xianqu.com/member/login.html?redirectUrl="+encodeURIComponent(targetUrl);
      return false;
    }
    return true;
  }

  getCookie(name) {
    var arr,reg=new RegExp("(^| )"+name+"=([^;]*)(;|$)");
    if(arr=document.cookie.match(reg)){
      return unescape(arr[2]);
    }else{
      return null;
    }
  }

  doLogin() {
    this.loading();
    setTimeout(() => {
      this.loading();
      this.setState(Object.assign({}, this.state, { isLogged: !this.state.isLogged }));
    }, 1000);
  }

  loading(isLoading) {
    this.setState({ loading: isLoading || !this.state.loading });
  }

  render() {
    let dom = null;
    if (!this.props.hasUI) {
      dom = (<Button type="primary" loading={this.state.loading}>
        {this.state.isLogged ? '登出' : '登录'}
      </Button>);
    }
    return dom;
  }
}