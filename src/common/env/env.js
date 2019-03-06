/*
var isUrl = rquire('is-url');

const HOSTS = {
  daily: {
    cdn: '//cdndaily.52shangou.com',
    api: '//daily.manage.51xianqu.com',
    page: '//daily.h5.m.52shangou.com'
  },
  gray: {
    cdn: '//cdndaily.52shangou.com',
    api: '//gray.manage.51xianqu.com',
    page: '//gray.h5.m.52shangou.com'
  },
  production: {
    cdn: '//cdn.52shangou.com',
    api: '//manage.51xianqu.com',
    page: '//h5.m.52shangou.com'
  },
};
const VALID_DOMAIN = ['52shangou.com', '51xianqu.com'];

*/
export default class Env {
  env = null; // 运行环境 daily/gray/production
  // cdnPrefix = null; // cdn url路径前缀
  // cdnHost = null;
  // pageHost = null;
  // repository = null;

  constructor(env, opt = {}) {
    const { host, repository } = opt;
    this.env = env || this.getCurrentEnv();
    // this.setHosts(host);
    // this.repository = repository;
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
  // set env(value) {
  //   if(value && /(daily|gray|production)/.test(value)) {
  //     // this.env = value;
  //     return value
  //   }
  // }
}
/*
  set repository(repository = {}) {
    if(repository.group || repository.project || repository.version) {
      this.repository = Object.assgin(this.repository || {}, repository);
    }
    this.updateCdnPrefix();
  }
  set cdnHost(value) {
      if(this.validateHost(value)) {
        this.cdnHost = value;
      }
  }
  set pageHost(value) {
    if(this.validateHost(value)) {
      this.pageHost = value;
    }
  }
  validateHost(host) {
    return isUrl(host) && VALID_DOMAIN.find(domain => host.endsWith(domain))
  }
  setHosts(hosts = HOSTS) {
    if(!this.env) return;
    if(hosts[this.env]) {
      this.cdnHost = hosts[this.env].cdn;
      this.pageHost = hosts[this.env].page;
    }
  }
  updateCdnPrefix() {
    if(!this.cdnHost || !this.repository || !this.repository.group
    || !this.repository.project || !this.repository.version) return;

    var {group, project} = this.repository;
    if(this.env == 'production') {
      this.cdnPrefix = `${this.cdnHost}/${group}/${project}/${this.repository.version}/build/`
    } else {
      this.cdnPrefix = `${this.cdnHost}/${group}/${project}_branch/daily/src/`
    }
  }
}
*/
