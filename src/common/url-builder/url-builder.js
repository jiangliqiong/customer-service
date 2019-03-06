
/*
根据环境变量构造各种url，包括cdn url、api url等
*/

// import Env from '../env/env';
import GitUrlParse from 'git-url-parse';
import Path from 'path';

class Env {
  // 运行环境 daily/gray/production

  constructor(env, opt = {}) {
    const { host, repository } = opt;
    this.env = env || this.getCurrentEnv();
  }
  getCurrentEnv() {
    let env = null;
    // 根据当前页面域名判断环境
    if (window && window.location) {
      if (location.host.indexOf('daily.') === 0) {
        env = 'daily';
      } else if (location.host.indexOf('gray.') === 0) {
        env = 'gray';
      } else {
        env = 'production';
      }
    }
    return env;
  }
  getEnv() {
    return this.env;
  }
}

const API_HOSTS = {
  daily: 'daily.manage.51xianqu.com',
  gray: 'gray.manage.51xianqu.com',
  production: 'daily.manage.51xianqu.com',
};
const CDN_HOSTS = {
  daily: 'cdndaily.52shangou.com',
  gray: 'cdndaily.52shangou.com',
  production: 'cdn.52shangou.com',
};
const CRM_HOSTS = {
  daily: 'daily.manage.51xianqu.com',
  gray: 'gray.manage.51xianqu.com',
  production: 'manage.51xianqu.com',
};

// export default class UrlBuilder {
module.exports = class UrlBuilder {
  /* 构造Api请求url*/
  static buildApiUrl(path = '/', env) {
    if (path.startsWith('/')) path = path.substr(1);
    env = env || (new Env()).getEnv();
    return `//${API_HOSTS[env]}/${path}`;
  }
  /* 构造cdn url */
  static buildCdnUrl(path = '/', env) {
    if (path.startsWith('/')) path = path.substr(1);
    env = env || (new Env()).getEnv();
    return `${UrlBuilder.getCdnPrefix(env)}/${path}`;
  }
  /* 构造cdn路径前缀 */
  static buildCdnPrefix(env) {
    const packageObj = require(Path.resolve(process.cwd(), 'package.json'));

    let cdnPrefix = '';
    const repo = GitUrlParse(packageObj.repository.url);
    const version = packageObj.version;

    if(env === 'production') {
      cdnPrefix = `//${CDN_HOSTS[env]}/${repo.owner}/${repo.name}/${version}/build`;
    } else {
      cdnPrefix = `//${CDN_HOSTS[env]}/${repo.owner}/${repo.name}_branch/${env}/build`;
    }
    return cdnPrefix;
  }
  /* 构造CRM页面url*/
  static buildCrmUrl(path = '/', env) {
    if (path.startsWith('/')) path = path.substr(1);
    env = env || (new Env()).getEnv();
    return `//${CRM_HOSTS[env]}/${path}`;
  }

  /*
    构造阿里云cdn图片url

    @param path {String} 必选 图片路径
    @param opt  {Object} 可选 压缩裁剪设置
      阿里云参考文档：https://help.aliyun.com/document_detail/32218.html
      e: 缩放优先边
        0表示按长边优先，默认值
        1表示按短边优先
      w: 宽度
      h: 高度
      c: 是否裁剪
        0不裁剪
        1裁剪
      Q: 压缩质量。把原图质量压到Q%，只能在保存格式为jpg/webp效果上使用，其他格式无效果
  */
  static buildImageUrl(path, opt) {
    if (path.startsWith('/')) path = path.substr(1);

    const { e, w, h, c, Q } = Object.assign({
      e: 1,
      w: 100,
      h: 100,
      c: 1,
      Q: 90,
    }, opt);
    return `//imgsize.52shangou.com/img/${path}@${e}e_${w}w_${h}h_${c}c_0i_1o_${Q}Q_1x.jpg`;
  }
}
