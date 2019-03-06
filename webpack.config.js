// Learn more on how to config.
// - https://github.com/ant-tool/atool-build#配置扩展

const webpack = require('atool-build/lib/webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const GitUrlParse = require('git-url-parse');

const fs = require('fs');
const path = require('path');
const glob = require('glob');

const CDN_HOSTS = {
  daily: 'cdndaily.52shangou.com',
  gray: 'cdndaily.52shangou.com',
  production: 'cdn.52shangou.com',
};

class MyPlugin extends HtmlWebpackPlugin {
  constructor(name, env) {
    super({
      template: `./src/${name}.ejs`,
      filename: `./${name}-${env}.html`,
      chunks: ['common', name],
      env,
    });
  }
  /* 构造cdn路径前缀 */
  static buildCdnPrefix(env) {
    const packageObj = require('./package.json');

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
  htmlWebpackPluginAssets(compilation, chunks) {
    const originalPublicPath = compilation.options.output.publicPath;

    // 根据环境变量动态修改publicPath，将cdn路径的前缀作为publicPath
    compilation.options.output.publicPath = MyPlugin.buildCdnPrefix(this.options.env);
    const newChunks = super.htmlWebpackPluginAssets(compilation, chunks);

    compilation.options.output.publicPath = originalPublicPath; // 完成后需要将publicPath还原，避免影响其他插件
    return newChunks;
  }
}

module.exports = function (webpackConfig) {
  webpackConfig.output.path = path.resolve(__dirname, './build');

  console.log( webpackConfig.output.path )
  // webpackConfig.output.path = './build';
  webpackConfig.devtool = 'cheap-source-map';
  webpackConfig.babel.plugins.push('transform-runtime');
  webpackConfig.babel.plugins.push(['antd', {
    style: 'css',  // if true, use less
  }]);

  // 清除build目录
  // webpackConfig.plugins.push(new CleanWebpackPlugin([webpackConfig.output.path]));

  // 编译html，三个环境分别编译
  Object.keys(webpackConfig.entry).forEach(name => {
    webpackConfig.plugins.push(new MyPlugin(name, 'daily'));
    webpackConfig.plugins.push(new MyPlugin(name, 'gray'));
    webpackConfig.plugins.push(new MyPlugin(name, 'production'));
  });

  return webpackConfig;
};
