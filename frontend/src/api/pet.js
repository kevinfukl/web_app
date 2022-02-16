import { get,post,put } from '../http/api'

export const register = async (params) => {

  return post('/register',params)
}

export const login = async (params) => {
  
  return post('/login',params)
}





