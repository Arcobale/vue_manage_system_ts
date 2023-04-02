const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true,
  lintOnSave: false,
  devServer: {
    // open: true,
    host: 'localhost',
    proxy: {
      '/api': {
        target: 'http://1.116.64.64:5004/api2/',
        changeOrigin: true, // 允许跨域
        pathRewrite: {
          "^/api": ''
        }
      }
    }
  },
  chainWebpack(chainableWebpack) {
    //用做一些高级配置，包括对loader的添加、修改以及插件的配置
    //模块如何被解析
    chainableWebpack.resolve = {
      extensions: ['.js', '.ts', '.json', '.d.ts'], //按顺序解析
    }
  },
})
