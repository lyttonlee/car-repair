import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import 'normalize.css'
import 'animate.css'
import ElementUi from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
// 字体图标
import './assets/css/font.css'
// 图标组件
import Icon from '@/components/Icon'

// socket.io
import VueSocketIo from 'vue-socket.io'

Vue.use(new VueSocketIo({
  debug: false,
  connection: 'http://192.168.1.205:9099'
}))

Vue.config.productionTip = false
Vue.use(ElementUi)
Vue.component('zx-icon', Icon)
console.log(window.location)
console.log(process.env.NODE_ENV)
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
