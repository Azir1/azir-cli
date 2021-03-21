const HtmlWebpackPlugin = require('html-webpack-plugin')
module.exports = {
  lintOnSave: false,
  devServer: {
    port: 3334,
    open: true,
    proxy: {
      '/api': { //正则匹配到以这个开头的时候 就用代理
        target: "http://www.chst.vip:1901", //指向的是目标服务器
        pathRewrite: {
          '^/api': ""
        }
      }
    }
  },
  // 修改网页标题
  configureWebpack: config => {
    config.plugins.forEach((val) => {
      if (val instanceof HtmlWebpackPlugin) {
        val.options.title = '学员信息管理'
      }
    })
  }

}
