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
  },
  SET_NODE_LIST (state, value) {
    state.nodeList = value
  }
}

const actions = {
  getNodeList ({ state, commit }) {
    request.get('/nodes', {})
      .then(response => {
        commit('SET_NODE_LIST', response.data.items)
      })
  },
  addNode ({ state, dispatch }) {
    request.put('/nodes', {
      name: state.nodeForm.name,
      ip: state.nodeForm.ip,
      port: state.nodeForm.port,
      description: state.nodeForm.description
    })
      .then(() => {
        dispatch('getNodeList')
      })
  },
  editNode ({ state, dispatch }) {
    request.post(`/nodes/${state.nodeForm._id}`, {
      name: state.nodeForm.name,
      // ip: state.nodeForm.ip,
      // port: state.nodeForm.port,
      description: state.nodeForm.description
    })
      .then(() => {
        dispatch('getNodeList')
      })
  },
  deleteNode ({ state, dispatch }, id) {
    request.delete(`/nodes/${id}`)
      .then(() => {
        dispatch('getNodeList')
      })
  },
  getNodeData ({ state, commit }, id) {
    request.get(`/nodes/${id}`)
      .then(response => {
        commit('SET_NODE_FORM', response.data)
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
