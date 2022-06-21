import CommonRepository from '@/utils/repository/common/CommonRepository'
import clientAxios from '@/plugins/axios'

const PATH = 'core-service/api/v1/usersGoals'

class UserGoalRepository extends CommonRepository {
  constructor () {
    super(PATH)
  }

  getByAccountId (accountId, projectId) {
    return clientAxios.get(`${this.path}/project`, {
      params: {
        accountId: accountId,
        projectId: projectId
      }
    })
  }

  deleteByAccountIdAndProjectId (accountId, projectId) {
    return clientAxios.delete(`${this.path}/project`, {
      params: {
        accountId: accountId,
        projectId: projectId
      }
    })
  }
}

export default new UserGoalRepository()
