import clientAxios from '@/plugins/axios'

export default class CommonRepository {
  constructor (path) {
    this.path = path
  }

  create (entity) {
    return clientAxios.post(this.path, entity)
  }

  update (entity, id) {
    return clientAxios.put(this.path + '/' + id, entity)
  }

  deleteById (id) {
    return clientAxios.delete(this.path + '/' + id)
  }

  get (ids) {
    return clientAxios.get(this.path, {
      params: {
        ids: ids.join(',')
      }
    })
  }

  getById (id) {
    return clientAxios.get(this.path + '/' + id)
  }
}
