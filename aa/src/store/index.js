import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    menu_collapse: false,//侧边导航栏显示切换
    dialogFormVisible: false,//编辑学员输入框的 显示隐藏
    form: {},
 
  },
  mutations: {
    changeMenuStatus(state) {
      state.menu_collapse = !state.menu_collapse
    },
    changeDialog(state) {
      state.dialogFormVisible = !state.dialogFormVisible
    },
    sendFrom(state, payload) {
      state.form = { ...payload }
      // state.form={}
      // console.log(state.form)
    }
  },
  actions: {
  },
  modules: {
  }
})

