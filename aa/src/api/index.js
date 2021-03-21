import axios from 'axios'
import router from '@/router'
import { Message } from 'element-ui'
// 请求接口的axios拦截器
// 添加请求拦截器
// 后台可以设置浏览器cookie，自动携带cookie，后台为每一个用户开辟了一个session，后台会把sessionid设置到cookie中，这样每个用户和自己的session就对应起来了
axios.defaults.withCredentials = true
axios.interceptors.request.use(function (config) {
  // 将token给到一个前后台约定好的key中，作为请求发送
  let token = localStorage.getItem('token')
  if (token) {
    config.headers['authorization'] = token
  }
  return config
}, function (error) {
  // Do something with request error
  return Promise.reject(error)
})
// 数据响应的拦截器
axios.interceptors.response.use(function (response) {
  if (response.data.state) {
    // 验证成功，正常获取数据
    return response
  } else {
    // 否则跳转登录，并提示没有权限
    Message.error('token失效，请重新登录');
    localStorage.removeItem('token')
    localStorage.removeItem('userInfo')
    router.replace({
      path: '/login'
    })
  }
  // 如果返回的数据是登录失效，则重新登录
})

// 定义默认请求地址
// axios.defaults.baseURL = 'http://www.chst.vip:1901'
axios.defaults.baseURL = '/api'
// 登陆
export const login = (data) => axios({
  method: 'post',
  url: '/users/login',
  data,
  timeout: 5000//请求时长为5秒钟,超过之后,进入到reject状态
})
// 获取登录日志
export const getloginlog = () => axios({
  method: 'get',
  url: '/getloginlog',
  // timeout: 5000,
})
// 获取学员列表
export const getStudentList = () => axios({
  method: 'get',
  url: '/students/getstulist'
})
// 添加学员信息
export const addStudent = (data) => axios({
  method: 'post',
  url: '/students/addstu',
  data
})

// 编辑学员信息
export const upDateStudent = (data) => axios({
  method: 'post',
  url: '/students/updatestu',
  data
})

// 获取权限列表
export const getMenuList = () => axios({
  method: 'get',
  url: '/permission/getMenuList'
})


