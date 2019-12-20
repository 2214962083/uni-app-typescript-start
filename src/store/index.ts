import Vue from 'vue'
import Vuex from 'vuex'
import Global from './module/global'

Vue.use(Vuex)
export default new Vuex.Store({
  state: {},
  modules: {
    Global
  }
})
