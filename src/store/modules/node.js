import request from '../../api/request'

const state = {
  // NodeList
  nodeList: [],
  nodeForm: {}
}

const getters = {}

const mutations = {
  SET_NODE_FORM (state, value) {
    state.nodeForm = value
  }
}

const actions = {
  addNode ({ state }) {
    request.put('/nodes', {
      node_name: state.nodeForm.name,
      node_ip: state.nodeForm.ip,
      node_description: state.nodeForm.description
    })
  }
}

export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions
}
