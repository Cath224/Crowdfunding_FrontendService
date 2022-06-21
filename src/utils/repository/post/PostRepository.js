import CommonRepository from '@/utils/repository/common/CommonRepository'
import clientAxios from '@/plugins/axios'

const PATH = 'content-service/api/v1/posts'

class PostRepository extends CommonRepository {
  constructor () {
    super(PATH)
  }

  getByProjectId (projectId) {
    return clientAxios.get(this.path, {
      params: {
        projectId: projectId
      }
    })
  }

  getResource(postId, resourceName) {
    return `${clientAxios.defaults.baseURL}/${PATH}/${postId}/resources/${resourceName}`
  }
}

export default new PostRepository()
