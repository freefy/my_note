<template>
  <div class="register" >
    <el-form :model="checkRules" status-icon :rules="rules2" ref="checkRules" label-width="100px" class="demo-ruleForm">
      <el-form-item label="用户名" prop="username">
        <el-input v-model.number="checkRules.username"></el-input>
      </el-form-item>
      <el-form-item label="密码" prop="pass">
        <el-input type="password" v-model="checkRules.pass" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="确认密码" prop="checkPass">
        <el-input type="password" v-model="checkRules.checkPass" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="昵称" prop="name">
        <el-input v-model.number="checkRules.name"></el-input>
      </el-form-item>
      <el-row class="error" :class="{'active':registerFlag}">该用户已存在</el-row>
      <el-form-item style="margin-left:0px">
        <el-button type="primary"><router-link :to="{name:'login'}">返回登录</router-link> </el-button>
        <el-button type="primary" @click="submitForm('checkRules')">立即注册</el-button>
        <el-button @click="resetForm('checkRules')">重置</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import api from "@/api/index.js";
export default {
    data() {
      var checkUsername = (rule, value, callback) => {
        if (!value) {
          return callback(new Error('用户名不能为空'));
        }else{
          callback();
        }
      };
      var checkName = (rule, value, callback) => {
        if (!value) {
          return callback(new Error('昵称不能为空'));
        }else{
          callback();
        }
      };
      var validatePass = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请输入密码'));
        } else {
          if (this.checkRules.checkPass !== '') {
            this.$refs.checkRules.validateField('checkPass');
          }
          callback();
        }
      };
      var validatePass2 = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请再次输入密码'));
        } else if (value !== this.checkRules.pass) {
          callback(new Error('两次输入密码不一致!'));
        } else {
          callback();
        }
      };
      return {
        registerFlag: false,
        checkRules: {
          pass: '',
          checkPass: '',
          username: '',
          name:''
        },
        rules2: {
          pass: [
            { validator: validatePass, trigger: 'blur' }
          ],
          checkPass: [
            { validator: validatePass2, trigger: 'blur' }
          ],
          username: [
            { validator: checkUsername, trigger: 'blur' }
          ],
          name: [
            { validator: checkName, trigger: 'blur' }
          ]
        }
      };
    },
    methods: {
      submitForm(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            // alert('submit!');
            api
          .register({
            userName: this.checkRules.username,
            password: this.checkRules.pass,
            name:this.checkRules.name
          })
          .then(res => {
            console.log(res);
            if (res.data.status == "success") {
              this.$message({
                showClose: true,
                message: "恭喜你，你已经成功注册,正在跳转到登录页面",
                type: "success"
              });
              let t;
              let that = this;
              clearTimeout(t);
              t = setTimeout(function() {
                console.log(that.$router);
                that.$router.push({ name: "login" }); //跳转哪一个路由
              }, 2000);
            }
            if (res.data.status == "fail") {
              this.registerFlag = true;
            }
          });
          } else {
            console.log('error submit!!');
            return false;
          }
        });
      },
      resetForm(formName) {
        this.$refs[formName].resetFields();
      }
    }
  }
</script>


