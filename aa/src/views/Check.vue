<template>
  <div>
    考勤
    <input :value="text" v-on:input="text=$event.target.value" />

    <ChildCheck v-bind:value="propText" @inputs="receive" @click.native="click" />
    {{name}}
  </div>
</template>

<script>
import ChildCheck from "./CheckTest";
export default {
  components: {
    ChildCheck
  },
  data() {
    return {
      text: "123",
      propText: "111",
      obj: {
        age: 1,
        aa: [1, 2, 3]
      }
    };
  },
  methods: {
    receive(val) {
      this.propText = val;
    },
    click() {
      console.log(123);
      this.name = 123;
    }
  },
  computed: {
    name: {
      get() {
        return (
          this.text +
          "我是计算属性，会将计算的结果缓存，当依赖的数据发生改变时，才会触发"
        );
      },
      set(input) {
        console.log("setter触发了" + input);
      }
    }
  },
  watch: {
    obj:{
      deep:true,
      handler(newVal){
        console.log(newVal)
      }
    
    }
  }
};
</script> 

<style scoped>
</style>