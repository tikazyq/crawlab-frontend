import request from '../../api/request'

const state = {
  // SpiderList
  spiderList: [],
  spiderForm: {},

  // SpiderDetail
  spiderData: {}
}

const getters = {}

const mutations = {
  SET_SPIDER_FORM (state, value) {
    state.spiderForm = value
  },
  SET_SPIDER_LIST (state, value) {
    state.spiderList = value
  },
  SET_SPIDER_DATA (state, value) {
    state.spiderData = value
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
  getSpiderData ({ commit }, id) {
    return request.get(`/spiders/${id}`)
      .then(response => {
        commit('SET_SPIDER_DATA', response.data)
      })
  },
  deploySpider ({ state, dispatch }, id) {
    return request.post(`/spiders/${id}/deploy`)
      .then(response => {
        console.log(response.data)
      })
  },
  crawlSpider ({ state, dispatch }, id) {
    return request.post(`/spiders/${id}/crawl`)
      .then(response => {
        console.log(response.data)
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
