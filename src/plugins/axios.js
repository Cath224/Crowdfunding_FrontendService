import axios from 'axios'
import { TokenFactory } from '@/plugins/token'
import EventBus from '@/plugins/event-bus'

const clientAxios = axios.create()

clientAxios.defaults.baseURL = 'http://localhost:8085'

clientAxios.interceptors.request.use((config) => {
  if (config.url.includes('user-service/api/v1/auth/login') ||
    config.url.includes('user-service/api/v1/auth/registration')) {
    return config
  }
  config.headers.Authorization = TokenFactory.get()
  return config
})

clientAxios.interceptors.response.use(function (response) {
  return response
}, function (error) {
  EventBus.on('error', error.message)
  return Promise.reject(error)
})

export default clientAxios
