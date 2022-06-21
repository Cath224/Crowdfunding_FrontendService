import clientAxios from '@/plugins/axios'

const PATH = 'user-service/api/v1/auth'

class AuthRepository {
  constructor () {
    this.path = PATH
  }

  login (user) {
    return clientAxios.post(`${PATH}/login`, user)
  }

  register (user) {
    return clientAxios.post(`${PATH}/registration`, user)
  }
}

export default new AuthRepository()
