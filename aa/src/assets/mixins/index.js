/* 
步骤
1. 定义一个mixins对象
2. 

*/

export const Mixins = {
  data() {
    return {
      Mixins_num: 1,
      Mixins_obj: {
        name: 'Tom',
        age: [1, 2, 3]
      }
    }
  },
  methods: {
    Mix_add(){
      console.log('我是mixins的方法')
    }
  },
}