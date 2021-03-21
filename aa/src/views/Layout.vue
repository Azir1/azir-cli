<template>
  <div class="home">
    <el-container>
      <el-aside width="200">
        <!-- 侧边栏-->
        <Aside />
      </el-aside>
      <el-container>
        <!-- 顶部导航栏-->
        <el-header>
          <Header />
        </el-header>
        <el-main>
          <!--二级路由出口放到main里面 -->
          <router-view />
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script>
import Aside from "@/components/Aside.vue";
import Header from "@/components/Header.vue";
export default {
  name: "Home",
  components: {
    Aside,
    Header
  }
};
</script>

<style scoped>
.home {
  height: 100%;
}
section.el-container {
  height: 100%;
}
.el-header,
.el-footer {
  background-color: #3481c5;
  color: #333;
  text-align: center;
  line-height: 60px;
  border-left: 1px solid #fff;
}

.el-aside {
  background-color: #d3dce6;
  color: #333;
  text-align: center;
  line-height: 200px;
}

.el-main {
  background-color: #e9eef3;
  color: #333;
  text-align: center;
  line-height: 160px;
}

body > .el-container {
  margin-bottom: 40px;
}

.el-container:nth-child(5) .el-aside,
.el-container:nth-child(6) .el-aside {
  line-height: 260px;
}

.el-container:nth-child(7) .el-aside {
  line-height: 320px;
}
</style>
