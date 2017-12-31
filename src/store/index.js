import Vue from 'vue'
import Vuex from 'vuex'
import * as actions from './actions'
import * as getters from './getters'
import state from './state'
import mutations from './mutations'
// 控制台可以看到状态
import createLogger from 'vuex/dist/logger'
Vue.use(Vuex)
// 防止报错加上这个--上线的时候关闭，有性能耗损
const debug = process.env.NODE_ENV !== 'PRODUCTION'
export default new Vuex.Store({
  actions,
  getters,
  state,
  mutations,
  strict: debug,
  plugins: debug ? [createLogger()] : []
})
