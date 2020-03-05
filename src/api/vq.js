import request from './axios'

export const getRealTimeData = () => {
  return request.get('/api/monitor/v1.0/realTimeData')
}

export const getStatisticData = () => {
  return request.get('/api/monitor/v1.0/statisticData')
}
