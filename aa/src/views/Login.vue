<template>
  <div>
    <div class="con"></div>
    <el-card class="box-card">
      <div class="text">
        <el-form
          :model="ruleForm"
          status-icon
          :rules="rules"
          ref="ruleForm"
          label-width="100px"
          class="demo-ruleForm"
        >
          <el-form-item label="用户名" prop="username">
            <el-input
              type="text"
              v-model="ruleForm.username"
              autocomplete="off"
              placeholder="请输入用户名"
            ></el-input>
          </el-form-item>
          <el-form-item label="密码" prop="password">
            <el-input
              placeholder="请输入密码"
              type="password"
              v-model="ruleForm.password"
              autocomplete="off"
              @keydown.native.enter="submitForm('ruleForm')"
            ></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="submitForm('ruleForm')">登陆</el-button>
            <el-button @click="resetForm('ruleForm')">重置</el-button>
          </el-form-item>
        </el-form>
      </div>
    </el-card>
  </div>
</template>
<script>
import { login } from "@/api";
export default {
  data() {
    // 用户名校验，     当前的规则对象，输入的值，回调函数（传参就报错）
    var validateUser = (rule, value, callback) => {
      // var uPattern = /^[a-zA-Z0-9_-]{4,16}$/;
      // let res = uPattern.test(value);
      let res = true;
      if (value === "") {
        callback(new Error("请输入用户名"));
      } else {
        if (res) {
          callback();
        } else {
          callback(
            new Error(
              "用户名格式不对，必须是4到16位（字母，数字，下划线，减号）"
            )
          );
        }
      }
    };
    // 密码校验
    var validatePass = (rule, value, callback) => {
      // var pPattern = /^.*(?=.{6,})(?=.*\d)(?=.*[A-Z])||(?=.*[a-z])*$/;
      // let res = pPattern.test(value);
      let res = true;
      if (value === "") {
        callback(new Error("请输入密码"));
      } else {
        if (res) {
          callback();
        } else {
          callback(
            new Error(
              "密码格式不对，最少6位，包括至少1个大写字母，1个小写字母，1个数字，1个特殊字符"
            )
          );
        }
      }
    };

    return {
      ruleForm: {
        username: "",
        password: ""
      },
      rules: {
        username: [{ validator: validateUser, trigger: "blur" }],
        password: [{ validator: validatePass, trigger: "blur" }]
      }
    };
  },
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        // 本地rules校验成功就是true，否则false
        if (valid) {
          let data = {
            username: this.ruleForm.username,
            password: this.ruleForm.password
          };
          login(data).then(ok => {
            // console.log(ok);
            if (ok) {
              if (ok.data.state) {
                this.$message({
                  message: ok.data.msg,
                  type: "success"
                });
                // 把token存到localstorage
                localStorage.setItem("token", ok.data.token);
                // 把用户信息存到localstorage
                localStorage.setItem(
                  "userInfo",
                  JSON.stringify(ok.data.userInfo)
                );
                this.$router.push("/");
              } else {
                //登陆出错
                this.$message.error(ok.data.msg);
              }
            }else{
               //登陆出错
                this.$message.error('用户名或密码错误')
            }
          });
          // 直接提交
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    }
  }
};
</script>

<style scoped>
.con {
  background-image: url("../assets/img/bg.jpg");
  height: 100%;
  width: 100%;
  background-size: 100% 100%;
  position: absolute;
}
.text {
  width: 400px;
}
.text {
  padding-top: 250px;
  margin: 0 auto;
}
</style>
