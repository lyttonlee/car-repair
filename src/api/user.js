import request from './axios'

export const createUser = (user) => {
  return request.post('/api/users/v1.0/new', user)
}

export const getAllRoles = () => {
  return request.get('/common/v1.0/roles')
}

export const getUserStatus = () => {
  return request.get('/common/v1.0/userStatus')
}
