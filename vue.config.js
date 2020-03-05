module.exports = {
  lintOnSave: true,
  devServer: {
    overlay: {
      error: false,
      warnings: true
    },
    proxy: {
      '/api': {
        target: 'http://cdzyyc.xicp.io:7578',
        changeOrigin: true
      },
      '/auth': {
        target: 'http://cdzyyc.xicp.io:7578',
        changeOrigin: true
      }
    }
  },
}
