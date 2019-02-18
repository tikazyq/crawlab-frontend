import request from '../../api/request'

const state = {
  // TaskList
  taskList: [],
  taskForm: {}
}

const getters = {}

const mutations = {
  SET_TASK_FORM (state, value) {
    state.taskForm = value
  },
  SET_TASK_LIST (state, value) {
    state.taskList = value
  }
}

const actions = {
  getTaskList ({ state, commit }) {
    request.get('/tasks', {})
      .then(response => {
        commit('SET_TASK_LIST', response.data.items)
      })
  },
  deleteTask ({ state, dispatch }, id) {
    request.delete(`/tasks/${id}`)
      .then(() => {
        dispatch('getTaskList')
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
