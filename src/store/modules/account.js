import { RepositoryFactory } from '@/utils/repository/RepositoryFactory'

const state = {
  account: null
}

const getters = {
  getAccount: (state) => {
    return state.account
  }
}

const actions = {
  loadAccount: ({ commit }) => {
    RepositoryFactory.get('account').getCurrent()
      .then((response) => {
        commit('setAccount', response.data)
      })
  },
  unloadAccount: ({ commit }) => {
    commit('setAccount', null)
  }
}

const mutations = {
  setAccount: (state, value) => {
    state.account = value
  }
}

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}
