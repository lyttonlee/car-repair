import request from './axios'

request.get('/api/monitor/v1.0/realTimeData').then((res) => {
  console.log(res)
})

export const getRealTimeData = () => {
  return request.get('/api/monitor/v1.0/realTimeData').then((res) => {
    return res
  })
}
