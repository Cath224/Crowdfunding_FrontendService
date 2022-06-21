import CommonRepository from '@/utils/repository/common/CommonRepository'
import clientAxios from '@/plugins/axios'

const PATH = 'core-service/api/v1/goals'
const PROJECT_PATH = 'core-service/api/v1/projects'

class GoalRepository extends CommonRepository {
  constructor () {
    super(PATH)
  }

  getByProjectId (projectId) {
    return clientAxios.get(`${PROJECT_PATH}/${projectId}/goals`)
  }
}

export default new GoalRepository()
