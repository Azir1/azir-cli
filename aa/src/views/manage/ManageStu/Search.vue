<template>
  <div class="search">
    <!-- 远程搜索框 -->
    <el-select
      v-model="value1"
      multiple
      filterable
      remote
      reserve-keyword
      placeholder="请输入关键词"
      :remote-method="remoteMethod"
      :loading="loading"
    >
      <el-option v-for="item in options1" :key="item.value" :label="item.label" :value="item.value"></el-option>
    </el-select>
    <!-- 搜索按钮 -->
    <el-button icon="el-icon-search"></el-button>
    <!-- 添加学员信息 -->
    <el-button type="success" @click="changeDialog">添加学员项目</el-button>
    <!-- 选择班级 -->
    <div class="select">
      <span>请选择班级:</span>
      <el-select v-model="value" clearable placeholder="请选择">
        <el-option
          v-for="item in options"
          :key="item.value"
          :label="item.label"
          :value="item.value"
        ></el-option>
      </el-select>
    </div>
  </div>
</template>

<script>
import {mapMutations} from 'vuex'
export default {
  data() {
    return {
      // 远程搜索
      options1: [],
      value1: [],
      list: [],
      loading: false,
      states: [
        "Alabama",
        "Alaska",
        "Arizona",
        "Arkansas",
        "California",
        "Colorado",
        "Connecticut",
        "Delaware",
        "Florida",
        "Georgia",
        "Hawaii",
        "Idaho",
        "Illinois",
        "Indiana",
        "Iowa",
        "Kansas",
        "Kentucky",
        "Louisiana",
        "Maine",
        "Maryland",
        "Massachusetts",
        "Michigan",
        "Minnesota",
        "Mississippi",
        "Missouri",
        "Montana",
        "Nebraska",
        "Nevada",
        "New Hampshire",
        "New Jersey",
        "New Mexico",
        "New York",
        "North Carolina",
        "North Dakota",
        "Ohio",
        "Oklahoma",
        "Oregon",
        "Pennsylvania",
        "Rhode Island",
        "South Carolina",
        "South Dakota",
        "Tennessee",
        "Texas",
        "Utah",
        "Vermont",
        "Virginia",
        "Washington",
        "West Virginia",
        "Wisconsin",
        "Wyoming"
      ],
      // 下拉菜单
      options: [
        {
          value: "选项1",
          label: "黄金糕"
        },
        {
          value: "选项2",
          label: "双皮奶"
        },
        {
          value: "选项3",
          label: "蚵仔煎"
        },
        {
          value: "选项4",
          label: "龙须面"
        },
        {
          value: "选项5",
          label: "北京烤鸭"
        }
      ],
      value: ""
    };
  },
  methods: {
    // 远程搜索
    remoteMethod(query) {
      if (query !== "") {
        this.loading = true;
        setTimeout(() => {
          this.loading = false;
          this.options = this.list.filter(item => {
            return item.label.toLowerCase().indexOf(query.toLowerCase()) > -1;
          });
        }, 200);
      } else {
        this.options = [];
      }
    },
    // 切换模态框
    ...mapMutations(['changeDialog']),
  },
  mounted() {
    // 远程搜索
    this.list = this.states.map(item => {
      return { value: `value:${item}`, label: `label:${item}` };
    });
  }
};
</script>

<style scoped>

.search {
  text-align: left;
  line-height: 80px;
}
.select {
  line-height: 10px;
  margin-bottom: 20px;
}
.select span {
  font-size: 16px;
  color: #666;
  margin-right: 10px;
}
</style>