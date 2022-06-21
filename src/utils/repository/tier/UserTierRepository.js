import CommonRepository from '@/utils/repository/common/CommonRepository'
import clientAxios from '@/plugins/axios'

const PATH = 'core-service/api/v1/usersTiers'

class UserTierRepository extends CommonRepository {
  constructor () {
    super(PATH)
  }

  getByAccountIdAndProjectId (accountId, projectId) {
    return clientAxios.get(`${this.path}/project`, {
      params: {
        accountId: accountId,
        projectId: projectId
      }
    })
  }

  getByAccountId (accountId) {
    return clientAxios.get(`${this.path}/account`, {
      params: {
        accountId: accountId
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

export default new UserTierRepository()
