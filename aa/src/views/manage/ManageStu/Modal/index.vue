// 添加信息组件
<template>
  <div>
    <el-dialog :title="dialogTitle" :visible.sync="$store.state.dialogFormVisible">
      <el-form :model="form" :rules="rules" ref="ruleForm">
        <!-- 上传头像 -->
        <Upload name="上传头像" :formLabelWidth="formLabelWidth" />
        <el-form-item label="姓名 " :label-width="formLabelWidth" prop="name">
          <el-input v-model="form.name" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="班级 " :label-width="formLabelWidth" prop="class">
          <el-input v-model="form.class" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="年纪 " :label-width="formLabelWidth" prop="age">
          <el-input v-model.number="form.age" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="城市 " :label-width="formLabelWidth" prop="city">
          <el-input v-model="form.city" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="项目地址 " :label-width="formLabelWidth" prop="productUrl">
          <el-input v-model="form.productUrl" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="项目描述" :label-width="formLabelWidth" prop="description">
          <el-input v-model="form.description" autocomplete="off"></el-input>
        </el-form-item>

        <el-form-item label="学历" :label-width="formLabelWidth" prop="degree">
          <!-- 选择器 -->
          <Select :select="select" @send="receive" />
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="changeDialog">取 消</el-button>
        <el-button type="primary" @click="submitForm('ruleForm')">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import Upload from "./Upload";
import Select from "./Select";
import { mapMutations, mapState } from "vuex";
import { addStudent, getStudentList } from "@/api";
export default {
  components: {
    Upload,
    Select
  },
  beforeUpdate() {
    // this.form = { ...this.$store.state.form };
  },
  methods: {
    ...mapMutations(["changeDialog"]),
    receive(val) {
      //选择框取值
      this.form.degree = val;
      // console.log(this.degree);
    },
    edit(){

    },
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          let data = {
            class: this.form.class,
            name: this.form.name,
            age: this.form.age,
            city: this.form.city,
            degree: this.form.degree,
            productUrl: this.form.productUrl,
            description: this.form.description,
            avatar: this.form.avatar
          };
          addStudent(data).then(res => {
            console.log(res);
            if (res.state) {
              this.$message({
                message: "添加成功",
                type: "success"
              });
            }
            this.changeDialog();
          });
        } else {
          console.log("error submit!!");
          return false;
        }
      });
      this.form = {};
      // 提交成功，刷新列表
      // getStudentList();
    }
  },
  data() {
    return {
      dialogTitle: "学员信息",
      select: [
        { label: "本科", value: "benke" },
        { label: "大专", value: "dazhuan" },
        { label: "硕士", value: "shuoshi" }
      ],
      // 显示隐藏,放到vuex中
      // dialogFormVisible: true,
      form: {
        name: "",
        class: "",
        age: "",
        city: "",
        degree: "",
        productUrl: "",
        description: "",
        avatar: ""
      },
      rules: {
        name: [
          { required: true, message: "请输入姓名", trigger: "blur" },
          { min: 2, max: 5, message: "长度在 3 到 5 个字符", trigger: "blur" }
        ],
        class: [{ required: true, message: "请输入班级", trigger: "blur" }],
        age: [
          { required: true, message: "年龄不能为空" },
          { type: "number", message: "年龄必须为数字值" }
        ],
        city: [{ required: true, message: "请输入城市", trigger: "blur" }],
        degree: [{ required: true, message: "请选择学历", trigger: "change" }],
        productUrl: [
          { required: true, message: "请输入项目地址", trigger: "blur" }
        ],
        description: [
          { required: true, message: "请添加项目描述", trigger: "blur" }
        ]
      },
      formLabelWidth: "120px"
    };
  }
};
</script>


<style scoped>
</style>