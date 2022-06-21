import CommonRepository from '@/utils/repository/common/CommonRepository'
import clientAxios from '@/plugins/axios'

const PATH = 'content-service/api/v1/files'

class FileRepository extends CommonRepository {
  constructor () {
    super(PATH)
  }

  getByPostId (postId) {
    return clientAxios.get(this.path, {
      params: {
        postId: postId
      }
    })
  }
}

export default new FileRepository()
