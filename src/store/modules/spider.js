import dayjs from 'dayjs'
import request from '../../api/request'

const state = {
  // list of spiders
  spiderList: [],

  // active spider data
  spiderForm: {},

  // node to deploy/run
  activeNode: {}
}

const getters = {}

const mutations = {
  SET_SPIDER_FORM (state, value) {
    state.spiderForm = value
  },
  SET_SPIDER_LIST (state, value) {
    state.spiderList = value
  },
  SET_ACTIVE_NODE (state, value) {
    state.activeNode = value
  }
}

const actions = {
  getSpiderList ({ state, commit }) {
    return request.get('/spiders', {})
      .then(response => {
        commit('SET_SPIDER_LIST', response.data.items)
      })
  },
  addSpider ({ state, dispatch }) {
    return request.put('/spiders', {
      name: state.spiderForm.name,
      src: state.spiderForm.src,
      cmd: state.spiderForm.cmd,
      type: state.spiderForm.type,
      lang: state.spiderForm.lang
    })
      .then(() => {
        dispatch('getSpiderList')
      })
  },
  editSpider ({ state, dispatch }) {
    return request.post(`/spiders/${state.spiderForm._id.$oid}`, {
      name: state.spiderForm.name,
      src: state.spiderForm.src,
      cmd: state.spiderForm.cmd,
      type: state.spiderForm.type,
      lang: state.spiderForm.lang
    })
      .then(() => {
        dispatch('getSpiderList')
      })
  },
  deleteSpider ({ state, dispatch }, id) {
    return request.delete(`/spiders/${id}`)
      .then(() => {
        dispatch('getSpiderList')
      })
  },
  getSpiderData ({ state, commit }, id) {
    return request.get(`/spiders/${id}`)
      .then(response => {
        commit('SET_SPIDER_FORM', response.data)
      })
  },
  deploySpider ({ state, dispatch }, { id, nodeId }) {
    return request.post(`/spiders/${id}/deploy`, {
      node_id: nodeId
    })
      .then(response => {
        console.log(response.data)
      })
  },
  crawlSpider ({ state, dispatch }, id) {
    return request.post(`/spiders/${id}/crawl`)
      .then(response => {
        console.log(response.data)
      })
  },
  getDeployList ({ state, commit }, id) {
    return request.get(`/spiders/${id}/get_deploys`)
      .then(response => {
        commit('deploy/SET_DEPLOY_LIST',
          response.data.items.map(d => {
            if (d.finish_ts) d.finish_ts = dayjs(d.finish_ts.$date).format('YYYY-MM-DD HH:mm:ss')
            return d
          }),
          { root: true })
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
