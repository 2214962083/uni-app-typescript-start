const path = require('path')

const resolve = dir => path.join(__dirname, dir)

module.exports = {
  chainWebpack: config => {
    config.resolve.alias.set('@app', resolve('src'))
    // 全局添加 scss
    const oneOfsMap = config.module.rule('scss').oneOfs.store
    oneOfsMap.forEach(item => {
      item
        .use('sass-resources-loader')
        .loader('sass-resources-loader')
        .options({
          resources: ['./src/styles/themes.scss']
        })
        .end()
    })
  }
  // css: {
  //   loaderOptions: {
  //     sass: {
  //       prependData: `@import "@app/styles/themes.scss";`
  //     }
  //   }
  // }
}
