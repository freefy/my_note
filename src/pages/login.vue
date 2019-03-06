<template>
  <div class="wrapper">
    <!-- <div style="width：100%;text-align:center;padding:10px 0;">在线笔记系统</div> -->
    <el-form
      :model="ruleForm2"
      status-icon
      :rules="rules2"
      ref="ruleForm2"
      label-width="60px"
      class="demo-ruleForm"
    >
      <el-form-item
        label="用户名"
        prop="username"
      >
        <el-input v-model.number="ruleForm2.username"></el-input>
      </el-form-item>
      <el-form-item
        label="密码"
        prop="pass"
      >
        <el-input
          type="password"
          v-model="ruleForm2.pass"
          autocomplete="off"
        ></el-input>
      </el-form-item>
      <el-row class="error" :class="{'active':loginFlag}">账号密码不对应或者不存在该账号</el-row>
      <el-form-item class="commitLogin">
        <el-button
          type="primary"
          @click="submitForm('ruleForm2')"
        >登录</el-button>
      </el-form-item>
    </el-form>

    <div class="login-footer">
      <router-link
        tag="li"
        to="/forgetCode"
      >
        <a>忘记密码</a>
        <span>|</span>
      </router-link>

      <router-link
        tag="li"
        :to="{'name':'register'}"
      >
        <a>注册新账号</a>
        <span>|</span>
      </router-link>

      <router-link
        tag="li"
        to="/suggest"
      >
        <a>意见反馈</a>
      </router-link>

    </div>
  </div>
</template>

<script>
import api from '@/api/index.js';
import store from "@/store/store.js";
export default {
  data() {
    
    var checkName = (rule, value, callback) => {
      if (!value) {
        return callback(new Error("用户名不能为空"));
      } else {
        callback();
      }
    };
    var validatePass = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请输入密码"));
      } else {
        callback();
      }
    };
    return {
      loginFlag:false,
      ruleForm2: {
        pass: "",
        checkPass: "",
        username: "",
        
      },
      rules2: {
        pass: [{ validator: validatePass, trigger: "blur" }],
        username: [{ validator: checkName, trigger: "blur" }]
      }
    };
  },
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
           api.login({
                userName: this.ruleForm2.username,
                password: this.ruleForm2.pass
            }).then(res => {
                console.log(res);
                if (res.data.status == 'success') {
                  console.log("success");
                  //将用户名传入store中的username;
                  store.commit('getUserName',this.ruleForm2.username);
                  console.log(store.state.username);
                //  api.getName({userName:this.ruleForm2.username}).then(res2=>{
                //     if (res2.data.status == 'success'){
                //       store.commit('getName',res2.data.name);
                //     }
                  
                //  })
                    // this.$store.dispatch('setUser', this.username);
                    this.$router.push({name:"notes"});//跳转哪一个路由
                    
                }
                if(res.data.status == 'fail'){
                  this.loginFlag = true;
                }
            })
          const h = this.$createElement;
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
</style>
