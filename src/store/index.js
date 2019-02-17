import Vue from 'vue'
import Vuex from 'vuex'
import app from './modules/app'
import user from './modules/user'
import tagsView from './modules/tagsView'
import node from './modules/node'
import spider from './modules/spider'
import deploy from './modules/deploy'
import task from './modules/task'
import fileList from './modules/fileList'
import getters from './getters'

Vue.use(Vuex)

const store = new Vuex.Store({
  modules: {
    app,
    user,
    tagsView,
    node,
    spider,
    deploy,
    task,
    fileList
  },
  getters
})

export default store
