import CommonRepository from '@/utils/repository/common/CommonRepository'
import clientAxios from '@/plugins/axios'

const PATH = 'core-service/api/v1/accounts'

const IMAGE_PATH = `${clientAxios.defaults.baseURL}/content-service/api/v1/accountsResources`

class AccountRepository extends CommonRepository {
  constructor () {
    super(PATH)
  }

  getImage (id) {
    return `${IMAGE_PATH}/${id}/resources?time=${new Date().getTime()}`
  }

  uploadImage (image, id) {
    const formData = new FormData()
    formData.append('file', image)
    return clientAxios.post(`${IMAGE_PATH}/${id}/resources`, formData)
  }

  getCurrent () {
    return clientAxios.get(`${this.path}/current`)
  }
}

export default new AccountRepository()
