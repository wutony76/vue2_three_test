const path = require('path')
const resolve = (dir) => path.join(__dirname, '.', dir);

// const { defineConfig } = require('@vue/cli-service')
// module.exports = defineConfig({
//   transpileDependencies: true
// })

module.exports = {
  // transpileDependencies: true,
  // lintOnSave:false,
  productionSourceMap: false,
  // publicPath: './',    << url 會無法顯示 cannot GET
  publicPath: '/',
  outputDir: 'dist',
  assetsDir: 'assets',
  devServer: {
    port: 9000,
    // port: 9999,
    host: '0.0.0.0',
    https: false,
    open: true
  },

  chainWebpack: (config) => {
    config.plugin('html')
      .tap(options => [{
        template: './public/index.html',
        // template: '../../index.html', // 修改源模版文件
        title: 'vue2 space base proj',
      }]);

    config.resolve.alias
      .set('@', resolve('src'))
      .set('views', resolve('src/views'))
      .set('utils', resolve('src/utils'))
      .set('store', resolve('src/store'))
      // .set('api', resolve('src/apis'))
      // .set('common', resolve('src/common'))
  }
}
