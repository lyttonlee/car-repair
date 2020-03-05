module.exports = {
  lintOnSave: true,
  devServer: {
    overlay: {
      error: false,
      warnings: true
    },
    proxy: {
      '/api': {
        target: 'http://192.168.1.205:8089',
        changeOrigin: true
      },
      '/auth': {
        target: 'http://192.168.1.205:8089',
        changeOrigin: true
      }
    }
  },
}
