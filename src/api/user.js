import request from './axios'

export const createNormalUser = (user) => {
  return request.post('/api/users/v1.0/new/normalUser', user)
}

export const createPC = (user) => {
  return request.post('/api/user/v1.0/new/pc', user)
}

export const createVQ = (user) => {
  return request.post('/api/user/v1.0/new/vq', user)
}

export const getAllRoles = () => {
  return request.get('/common/v1.0/roles')
}

export const getUserStatus = () => {
  return request.get('/common/v1.0/userStatus')
}
