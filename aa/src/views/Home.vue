<template>
  <div>
    <h2>欢迎登陆后台管理系统！</h2>

    <el-table :data="tableData" style="width: 100%">
      <el-table-column prop="username" label="登入账户" width="180"></el-table-column>
      <el-table-column prop="ip" label="ip" width="180"></el-table-column>
      <el-table-column prop="nowLogin" label="登入时间"></el-table-column>
      <el-table-column prop="lastLogin" label="上次登入时间"></el-table-column>
    </el-table>
  </div>
</template>

<script>
import { getloginlog } from "@/api";
export default {
  data() {
    return {
      tableData: [
        {
          username: "",
          ip: "",
          nowLogin: "",
          lastLogin: ""
        }
      ]
    };
  },
  mounted() {
    getloginlog().then(res => {
      console.log(res);
      if (res) {
        if (res.data.state) {
          //成功获取数据
          let newArr = res.data.data.map(v => {
            return {
              username: v.username,
              ip: v.nowLogin.ip,
              nowLogin: v.nowLogin.loginTime,
              lastLogin: v.lastLogin.loginTime
            };
          });
          this.tableData = [...newArr];
        }
      }
    });
  }
};
</script> 

<style scoped>
h2 {
  line-height: 20px;
  margin-bottom: 10px;
}
</style>