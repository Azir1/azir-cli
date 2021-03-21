
// 这里配置的路由需要进行校验

/* 1.因为是动态添加的路由，所以页面刷新时动态添加的路由是会被清空的，最好将动态路由进行本地储存。

2.虽然是动态路由，但是无论何时以何种方式访问Router的路由，比如你想看看添加完动态路由后的所有路由，其实返回的始终是Router的初始路由，原因是Router的路由并不是响应式的，所以只能读取到初始路由。

3.要想获得动态路由，建议使用vuex进行管理。

4.关于添加的规则，会根据路径查找并进行合并。 */

export const DynamicRoutes = [
  {
    path: '/home',
    component: () => import('../views/Home.vue'),
    meta: {
      name: '管理首页'
    }
  },
  {
    path: '/manage',
    name: 'manage',
    component: () => import('../views/manage/Manage.vue'),
    children: [
      {
        path: 'student',
        name: 'student',
        component: () => import('../views/manage/ManageStu'),
        meta: {
          name: '学员项目管理'
        }
      },
      {
        path: '/manage/teacher',
        name: 'Teacher',
        component: () => import('../views/manage/ManageTec.vue'),
        meta: {
          name: '学员资料'
        }
      },
    ],
    meta: {
      name: '学员管理'
    }
  },
  {
    path: '/check',
    name: 'check',
    component: () => import('../views/Check.vue'),
    meta: {
      name: '考勤管理'
    }
  },
  {
    path: '/charts',
    name: 'charts',
    component: () => import('../views/Charts.vue'),
    meta: {
      name: '数据统计'
    }
  },
  {
    path: '/user',
    name: 'user',
    component: () => import('../views/User.vue'),
    meta: {
      name: '我的中心'
    }
  },
]