import projectType from './project/projectType'

const dictionaries = {
  projectType: projectType
}

export const DictionaryFactory = {
  get (name) {
    return dictionaries[name]
  }
}
