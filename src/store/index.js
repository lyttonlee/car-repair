import Vue from 'vue'
import Vuex from 'vuex'
import {
  LOGOUT,
  LOGIN
} from './types'
import router from '../router'
import {
  login
} from '../api/login'
import {
  Notification
} from 'element-ui'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    token: '' || localStorage.getItem('token'),
    username: '' || localStorage.getItem('username'),
    roles: '' || localStorage.getItem('roles'),
    nickname: '' || localStorage.getItem('nickname'),
  },
  mutations: {
    [LOGOUT]: (state) => {
      localStorage.removeItem('roles')
      localStorage.removeItem('token')
      localStorage.removeItem('username')
      localStorage.removeItem('nickname')
      state.token = ''
    },
    [LOGIN]: (state, user) => {
      localStorage.setItem('username', user.username)
      localStorage.setItem('token', user.token)
      localStorage.setItem('roles', user.roles)
      localStorage.setItem('nickname', user.nickname)
      state.token = user.token
      state.username = user.username
      state.roles = user.roles
      state.nickname = user.nickname
    }
  },
  actions: {
    logout ({ commit }) {
      return new Promise((resolve) => {
        commit(LOGOUT)
        resolve()
      })
    },
    login ({ commit }, payload) {
      return new Promise((resolve, reject) => {
        login(payload).then((res) => {
          console.log(res)
          let { code, result, desc } = res
          if (code === 0) { // 登录成功
            commit(LOGIN, result)
            resolve(result)
            router.push('/vq')
          } else { // 登录失败
            Notification.error({
              message: desc
            })
            reject(desc)
          }
        })
      })
    }
  },
  modules: {
  }
})
