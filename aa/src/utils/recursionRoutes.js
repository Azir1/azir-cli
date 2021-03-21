// 递归获取到的权限列表，和当前的dynamicRoutes进行对比，返回正确的菜单和路由
// 获取权限接口

const menu = {
  "status": 200,
  "state": true,
  "msg": "success",
  "code": "10086",
  "roleName": "总监",
  "menuList": [
    {
      "name": "管理首页"
    },
    {
      "name": "学员管理",
      "children": [
        {
          "name": "学员项目管理"
        },
        {
          "name": "学员资料"
        }
      ]
    },
    {
      "name": "考勤管理"
    },
    {
      "name": "数据统计"
    },
    {
      "name": "我的中心"
    }
  ]
}

import { DynamicRoutes } from '../router/DynamicRoutes'

// 所有dynamicRoutes和用户权限进行对比
// 获取权限菜单




const recursionRoutes = (allRoutes = [], permission = []) => {
  const userRoutes = [] //储存用户数组
  allRoutes.forEach(item => {
    permission.forEach(v => {
      if (item.meta.name === v.name) {
        if (v.children && v.children.length > 0) {
          item.children = recursionRoutes(item.children, v.children)
        }
        userRoutes.push(item)
      }
    })
  })
  console.log(userRoutes)
  return userRoutes
}

export default recursionRoutes(DynamicRoutes, menu.menuList)


