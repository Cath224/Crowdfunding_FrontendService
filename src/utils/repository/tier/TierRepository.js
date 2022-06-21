import CommonRepository from '@/utils/repository/common/CommonRepository'
import clientAxios from '@/plugins/axios'

const PATH = 'core-service/api/v1/tiers'
const PROJECT_PATH = 'core-service/api/v1/projects'

class TierRepository extends CommonRepository {
  constructor () {
    super(PATH)
  }

  getByProjectId (projectId) {
    return clientAxios.get(`${PROJECT_PATH}/${projectId}/tiers`)
  }
}

export default new TierRepository()
