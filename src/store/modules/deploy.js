const state = {
  deployList: []
}

const getters = {}

const mutations = {
  SET_DEPLOY_LIST (state, value) {
    state.deployList = value
  }
}

const actions = {}

export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions
}
