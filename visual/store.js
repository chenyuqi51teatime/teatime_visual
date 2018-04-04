import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)

import Mqtt from '../store/mqtt'
import Token from '../store/token'
import Loading from '../store/loading'

export default new Vuex.Store({
  modules: {
    Mqtt,
    Token,
    Loading
  },
  state: {},
  getters: {},
  mutations: {},
  actions: {}
})
