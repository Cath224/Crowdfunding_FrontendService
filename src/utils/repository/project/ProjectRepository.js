import CommonRepository from '@/utils/repository/common/CommonRepository'
import clientAxios from '@/plugins/axios'

const PATH = 'core-service/api/v1/projects'

const IMAGE_PATH = `${clientAxios.defaults.baseURL}/content-service/api/v1/projectsResources`

class ProjectRepository extends CommonRepository {
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
}

export default new ProjectRepository()
