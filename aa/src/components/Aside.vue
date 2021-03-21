<template>
  <div>
    <el-row class="tac">
      <el-col :span="24">
        <h5>{{$store.state.menu_collapse?'芊芊教育':'芊芊教育管理系统'}}</h5>
        <el-menu
          default-active="2"
          class="el-menu-vertical-demo"
          @open="handleOpen"
          @close="handleClose"
          background-color="#d3dce6"
          text-color="#000"
          active-text-color="#409eff"
          :collapse="$store.state.menu_collapse"
        >
          <router-link to="/home" exact-active-class="active">
            <el-menu-item index="1">
              <i class="el-icon-menu"></i>
              <span slot="title">管理首页</span>
            </el-menu-item>
          </router-link>

          <el-submenu index="2">
            <template slot="title">
              <router-link to="/manage">
                <i class="el-icon-location"></i>
                <span>学员管理</span>
              </router-link>
            </template>

            <el-menu-item-group>
              <span slot="title"></span>
              <router-link to="/manage/student">
                <el-menu-item index="2-1">学生</el-menu-item>
              </router-link>
              <router-link to="/manage/teacher">
                <el-menu-item index="2-2">老师</el-menu-item>
              </router-link>
            </el-menu-item-group>
          </el-submenu>
          <router-link to="/check">
            <el-menu-item index="3">
              <i class="el-icon-setting"></i>
              <span slot="title">考勤管理</span>
            </el-menu-item>
          </router-link>

          <router-link to="/user">
            <el-menu-item index="4">
              <i class="el-icon-setting"></i>
              <span slot="title">我的中心</span>
            </el-menu-item>
          </router-link>
          <router-link to="/charts">
            <el-menu-item index="5">
              <i class="el-icon-setting"></i>
              <span slot="title">数据统计</span>
            </el-menu-item>
          </router-link>
        </el-menu>
      </el-col>
    </el-row>
  </div>
</template>

<script>
export default {
  data() {
    return {};
  },
  methods: {
    handleOpen(key, keyPath) {
      console.log(key, keyPath);
    },
    handleClose(key, keyPath) {
      console.log(key, keyPath);
    }
  }
};
</script>
<style scoped>
/* .active{
  background-color: #409eff!important;
} */
a:hover {
  text-decoration: none;
  /* color: #409eff; */
}
h5 {
  line-height: 60px;
}
.el-menu-vertical-demo:not(.el-menu--collapse) {
  width: 200px;
  min-height: 400px;
}
ul.el-menu-vertical-demo.el-menu--collapse.el-menu {
  width: 100%;
}
</style>