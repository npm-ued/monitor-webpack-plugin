/*
 * @Author: vicshang
 * @Date: 2018-11-16 10:09:30
 * @Last Modified by: vicshang
 * @Last Modified time: 2018-11-16 11:17:57
 * monitor webpack plugin 
 */

const path = require('path');
const fs = require('fs');


class MonitorPlugin {
  constructor(options) {
    this.options = Object.assign({
      enable: false,
      paths: [],
      content: ''
    }, options);
  }

  apply(compiler) {
    const pluginFunction = (htmlPluginData, cb) => {
      const { enable, paths, content } = this.options;
      if (enable) {
        if (paths.length) {
          paths.forEach((item) => {
            const tag = {
              tagName: 'script',
              closeTag: true,
              attributes: {
                type: 'text/javascript',
                src: item
              }
            };
            htmlPluginData.head.push(tag);
          });
        }
        if(content) {
          const tag = {
            tagName: 'script',
            closeTag: true,
            attributes: {
              type: 'text/javascript'
            },
            innerHTML: content
          };
          htmlPluginData.head.push(tag);
        }
      }
      cb(null, htmlPluginData);
    }
    // 置回调来访问 compilation 对象：
    if (compiler.hooks) {
      // console.log('it is webpack 4');
      compiler.hooks.compilation.tap('monitorPlugin', (compilation) => {
        compilation.hooks.htmlWebpackPluginAlterAssetTags.tapAsync('monitorPlugin', pluginFunction);
      });
    } else {
      // console.log('it is webpack 3');
      compiler.plugin('compilation', (compilation) => {
        compilation.plugin('html-webpack-plugin-alter-asset-tags',pluginFunction)
      });
    }
  }  
}

module.exports = MonitorPlugin;