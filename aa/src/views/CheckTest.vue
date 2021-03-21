<template>
  <div>
    我是check的子组件
    <button v-on:click="getData">点击获取value</button>
    <input type="text" v-bind:value="value" v-on:input="send" />
    {{value}}
  </div>
</template>

<script>
export default {
  mounted() {},
  props: ["value"],
  methods: {
    getData() {
      console.log(this.value, "--------");
    },
    send(e) {
      this.$emit("inputs", e.target.value);
      console.log(e.target.value);
    }
  }
};
</script>

<style scoped>
</style>