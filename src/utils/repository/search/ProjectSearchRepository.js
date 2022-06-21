import clientAxios from '@/plugins/axios'

const PATH = 'core-service/api/v1/search'

class ProjectSearchRepository {
  constructor () {
    this.path = PATH
  }

  searchForProject (request) {
    return clientAxios.get(`${this.path}/${request}`)
  }
}

export default new ProjectSearchRepository()
