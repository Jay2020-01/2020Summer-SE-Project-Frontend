module.exports = {
// 指定`build`时,在静态文件上一层添加static目录
  assetsDir: 'static',
  devServer: {
    open: true,
    host: '127.0.0.1',
    port: 8080,
    https: false,
    hotOnly: false,
    proxy: null
  },
  lintOnSave: false
}
