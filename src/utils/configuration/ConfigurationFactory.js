import project from '@/utils/configuration/project/project'
import account from '@/utils/configuration/account/account'

const configurations = {
  project: project,
  account: account
}

export const ConfigurationFactory = {
  get (name) {
    return configurations[name]
  }
}
