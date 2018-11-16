# monitor-webpack-plugin
webpack plugin for [monitor](https://github.com/npm-ued/monitor-webpack-plugin)

帮助开发者在移动端进行调试，本插件是在 [monitor](https://github.com/npm-ued/monitor-webpack-plugin) 的基础上封装的 `webpack` 插件，通过 `webpack` 配置即可自动添加 `monitor` 调试功能，方便实用。

## 安装

```bash
npm install monitor-webpack-plugin --save-dev
```

## 使用

`webpack.conf.js` 文件配置里增加以下插件配置即可

```js
// 引入插件
var monitorPlugin = require('monitor-webpack-plugin'); 

module.exports = {
    ...

    plugins: [
        new monitorPlugin({
            filter: [],  // 需要过滤的入口文件
            enable: true // 发布代码前记得改回 false
        }),
        ...
    ]
    ...
}
```

`monitor` 作为一个调试模块，注定了需要在不同环境配置不同参数，为了避免人为操作失误而影响线上功能，这里建议配置如下：

`package.json` 文件配置：

```json
scripts: {
    "dev": "webpack -w --debug",
    "prod": "webpack -p"
}
```

`webpack.conf.js` 配置：

```js
// 引入插件
var monitorPlugin = require('monitor-webpack-plugin'); 

// 接收运行参数
module.exports = {
    ...

    plugins: [
      new MonitorPlugin({
        enable: true, // 是否引入monitor
        inject:'head',
        paths:['https://xxx.com/monitor.js'], // monitor的代码地址
        content:'var config = { appid: \'admin\',url: \'https://xxx.com/tr.gif\'};new Monitor(config);' // 初始化参数，appid为项目id，url为提交的服务器域名，详情参考fd monitor文档
      }),
      ...
    ]
    ...
}
```

这样，在开发的时候运行 `npm run dev`，发布的时候运行 `npm run prod` 即可。

`webpack-dev-server` 的配套用法：

用法其实跟上面一样，只是别忘记在启动脚本的时候增加 `--debug` 即可。如下：

```js
  // package.json
  "scripts": {
    ...
    "start:dev": "webpack-dev-server --debug",
    ...
  },
```

## 例子参考: [webpack-demo]()

## 直接使用 monitor

当然，有时候一些页面想临时添加 `monitor` 来调试一下，可以直接使用：

```htmls
<script src="https://xxx.com/monotor/0.1.4/monitor.min.js"></script>
<script>
var config = {
    appid: 'admin'
}
new Monitor(config);
</script>
```
