<template>
  <el-form-item :label="name" :label-width="formLabelWidth" prop='selectRule'>
    <el-select v-model="val" placeholder="请选择学历" @change="selectOpt">
      <el-option v-for="(v,i) in select" :key="i" :label="v.label" :value="v.label"></el-option>
    </el-select>
  </el-form-item>
</template>
<script>
export default {
  data() {
    return {
      val: "",
      reles: {
      
      }
    };
  },
  props: ["name", "formLabelWidth", "select",'selectRule'],
  methods: {
    selectOpt() {
      // console.log(this.val)
      this.$emit("send", this.val);
    }
  }
};
</script>
<style scoped>
</style>