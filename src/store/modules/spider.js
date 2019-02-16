import request from '../../api/request'

const state = {
  // SpiderList
  spiderList: [],
  spiderForm: {}
}

const getters = {}

const mutations = {
  SET_SPIDER_FORM (state, value) {
    state.spiderForm = value
  },
  SET_SPIDER_LIST (state, value) {
    state.spiderList = value
  }
}

const actions = {
  getSpiderList ({ state, commit }) {
    request.get('/spiders', {})
      .then(response => {
        commit('SET_SPIDER_LIST', response.data.items)
      })
  },
  addSpider ({ state, dispatch }) {
    request.put('/spiders', {
      name: state.spiderForm.name,
      type: state.spiderForm.type,
      lang: state.spiderForm.lang
    })
      .then(() => {
        dispatch('getSpiderList')
      })
  },
  editSpider ({ state, dispatch }) {
    request.post(`/spiders/${state.spiderForm._id.$oid}`, {
      name: state.spiderForm.name,
      type: state.spiderForm.type,
      lang: state.spiderForm.lang
    })
      .then(() => {
        dispatch('getSpiderList')
      })
  },
  deleteSpider ({ state, dispatch }, id) {
    request.delete(`/spiders/${id}`)
      .then(() => {
        dispatch('getSpiderList')
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
