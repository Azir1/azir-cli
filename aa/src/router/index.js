import Vue from 'vue'
import VueRouter from 'vue-router'
import Layout from '../views/Layout.vue'
import Login from '../views/Login.vue'
// import Home from '../views/Home.vue'
// import Manage from '../views/manage/Manage.vue'
// import Check from '../views/Check.vue'
// import Charts from '../views/Charts.vue'
// import User from '../views/User.vue'
// import Student from '../views/manage/ManageStu'
// import Teacher from '../views/manage/ManageTec.vue'
Vue.use(VueRouter)
const routes = [
  {
    path: '/',
    // name: 'Index',
    component: Layout,
    // 子路由
    // 重定向
    // children: [
    //   {
    //     path: '/home',
    //     name: 'home',
    //     component: () => import('../views/Home.vue')
    //   },
    //   {
    //     path: '/manage',
    //     name: 'manage',
    //     component: () => import('../views/manage/Manage.vue'),
    //     children: [
    //       {
    //         path: '/manage/student',
    //         name: 'student',
    //         component: () => import('../views/manage/ManageStu')
    //       },
    //       {
    //         path: '/manage/teacher',
    //         name: 'Teacher',
    //         component: () => import('../views/manage/ManageTec.vue')
    //       },
    //     ]
    //   },
    //   {
    //     path: '/check',
    //     name: 'check',
    //     component: () => import('../views/Check.vue')
    //   },
    //   {
    //     path: '/charts',
    //     name: 'charts',
    //     component: () => import('../views/Charts.vue')
    //   },
    //   {
    //     path: '/user',
    //     name: 'user',
    //     component: () => import('../views/User.vue')
    //   },
    // ]
  },

  {
    path: '/',
    redirect: '/home',
    component: () => import('../views/Home.vue')
  },
  {
    path: '/login',
    name: 'login',
    component: Login
  },
  {
    path: "/404",
    name: "notFound",
    component: () => import('@/components/notFound')
  },
  {
    path: "*", // 此处需特别注意置于最底部
    redirect: "/404" //无匹配到的路径自动重定向到404页面
  }
]

const router = new VueRouter({
  linkExactActiveClass: "active",//设置路由激活的类名
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
