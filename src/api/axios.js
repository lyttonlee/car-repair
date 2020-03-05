import axios from 'axios'

// 创建 axios 实例
const request = axios.create({
  baseURL: '/',
  timeout: 30000
})

const err = (error) => {
  console.log(error)
  return Promise.reject(error)
}
request.interceptors.request.use((config) => {
  return config
}, err)

request.interceptors.response.use((response) => {
  return response.data
}, err)

export default request
