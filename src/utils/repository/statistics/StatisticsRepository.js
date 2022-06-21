import clientAxios from '@/plugins/axios'

const PATH = 'core-service/api/v1/statistics'

class StatisticsRepository {
  constructor () {
    this.path = PATH
  }

  getTopAmountProject () {
    return clientAxios.get('core-service/api/v1/projects/statistics/amount')
  }

  getTopNewProject () {
    return clientAxios.get('core-service/api/v1/projects/statistics/new')
  }

  getForProject (projectId) {
    return clientAxios.get(`${PATH}/projects/${projectId}`)
  }

  getTopTags (limit) {
    return clientAxios.get(`${PATH}/tags/top`, {
      params: {
        limit: limit
      }
    })
  }

  getTotalAmountPayment () {
    return clientAxios.get(`${PATH}/projects/amount`)
  }
}

export default new StatisticsRepository()
