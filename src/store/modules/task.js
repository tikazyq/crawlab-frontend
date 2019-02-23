import dayjs from 'dayjs'
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
  getTaskData ({ state, dispatch, commit }, id) {
    return request.get(`/tasks/${id}`)
      .then(response => {
        let data = response.data
        if (data.create_ts) data.create_ts = dayjs(data.create_ts.$date).format('YYYY-MM-DD HH:mm:ss')
        if (data.finish_ts) data.finish_ts = dayjs(data.finish_ts.$date).format('YYYY-MM-DD HH:mm:ss')
        commit('SET_TASK_FORM', data)
        dispatch('spider/getSpiderData', data.spider_id.$oid, { root: true })
        dispatch('node/getNodeData', data.node_id, { root: true })
      })
  },
  getTaskList ({ state, commit }) {
    return request.get('/tasks', {})
      .then(response => {
        commit('SET_TASK_LIST', response.data.items)
      })
  },
  deleteTask ({ state, dispatch }, id) {
    return request.delete(`/tasks/${id}`)
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
