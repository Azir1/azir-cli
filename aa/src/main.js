import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
// 全局引入Element-Ui
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
// 引入全局css
import './assets/css/global.css'
import './assets/css/el-reset.css'
import Layout from './views/Layout.vue'
// 获取动态路由utils
import userRoutes from './utils/recursionRoutes'
router.addRoutes(
  [
    {
      path: '/',
      // name: 'Index',
      component: Layout,
      children: userRoutes 
    }
  ]
)
// // 引入axios
// import axios from 'axios'
// Vue.prototype.axios = axios
//全局守卫写在实例化路由后
//router对象调用  
//.beforeEach((进入到哪一个路由,从哪一个路由离开,对应的函数)=>{}) 
router.beforeEach((to, form, next) => {
  let token = localStorage.getItem('token')
  if (token) {
    if (to.path == "/login") {
      next("/home")
    } else {
      next()
    }
  } else {
    if (to.path == '/login' || to.path == '/register') {
      next();//跳转登录
    } else {
      next("/login")
    }
  }
})

Vue.config.productionTip = false
Vue.use(ElementUI);
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')

