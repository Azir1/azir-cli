<template>
  <div class="table">
    <el-table :data="tableData" border style="width: 100%">
      <el-table-column prop="avatarUrl" label="头像" width="100"></el-table-column>
      <el-table-column prop="name" label="姓名" width="100"></el-table-column>
      <el-table-column prop="class" label="班级"></el-table-column>
      <el-table-column prop="degree" label="学历"></el-table-column>
      <el-table-column prop="productUrl" label="项目地址"></el-table-column>
      <el-table-column prop label="操作" width="150">
        <template slot-scope="scope">
          <el-button size="mini" @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
          <el-button size="mini" type="danger" @click="handleDelete(scope.$index, scope.row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import { upDateStudent } from "@/api";
import { mapMutations } from "vuex";
export default {
  methods: {
    ...mapMutations(["changeDialog",'sendFrom']),
    handleEdit(index, row) {
      this.changeDialog();
      // console.log(index, row);
      this.sendFrom(row)
    }
  },
  props: ["table"],
  created() {
    // console.log(this.table);
    this.tableData = [...this.table];
    // this.tableData=tableData
  },
  mounted() {
    console.log(this.tableData);
  },
  data() {
    return {
      // 表格数据
      tableData: []
    };
  }
};
</script>

<style scoped>
</style>