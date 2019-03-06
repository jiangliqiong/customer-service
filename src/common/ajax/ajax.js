/*
  异步请求，使用fetch API.

  IE下使用polyfill
*/
import 'whatwg-fetch';

export default class Ajax {
  static get(url, options = {}) {
    options.method = 'GET';
    return Ajax.request(url, options);
  }

  /*
    注意：参数通过options.body传递，例如Ajax.post(url, {body: {id:9527}})
  */
  static post(url, options = {}) {
    options.method = 'POST';
    return Ajax.request(url, options);
  }

  static request(url, options) {
    if(options.method == 'POST') {
      options.body = JSON.stringify(options.body);
    }

    options = Object.assign({
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      credentials: 'include', // 要这样设置才能带上cookie
    }, options);

    return fetch(url, options).then(res => {
      return res.json();
    }).then(json => {
      if (json.status === true) {
        return json;
      } else if (json.responseCode === 10212 && json.status === false) {
        const returnUrl = location.href;
        location.href = `/member/login.html?redirectUrl=${returnUrl}`;
      } else {
        // return Promise.reject();
      }
    });
  }

}
