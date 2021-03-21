<template>
  <div>
    <!-- 模态框 -->
    <Modal />
    <!--  面包屑-->
    <Header />
    <!-- 远程搜索框 -->
    <Search />
    <!-- 表格 ,获取到数据再加载子组件，子组件才能获得数据-->
    <Table :table='tableData' v-if="tableData.length>0"/>
    <!-- 分页器 -->
    <Page />
  </div>
</template>
<script>
import Header from "./Header";
import Table from "./Table";
import Search from "./Search";
import Page from "./Page";
import Modal from "./Modal/index";
import { getStudentList } from "@/api";
export default {
  data() {
    return {
      tableData:[]
    }
  },
  components: {
    Header,
    Table,
    Search,
    Page,
    Modal
  },
  mounted() {
    getStudentList().then(res => {
      if(res){
        if(res.data.status===1){
            this.tableData = [...res.data.data]
        }
      }
      // console.log(res.data.data);
    
    });
  }
};
</script>

<style scoped>
</style>