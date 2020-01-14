<template>
  <el-form :rules="rules" ref="loginRef" class="login-container" :model="loginForm" v-loading="loading">
    <h3 style=" margin: 0px auto 40px auto; text-align: center; color: #505458;">系统登录</h3>
    <el-form-item prop="username">
      <el-input type="text" v-model="loginForm.username" auto-complete="off" placeholder="账号"></el-input>
    </el-form-item>
    <el-form-item prop="password">
      <el-input type="password" v-model="loginForm.password" auto-complete="off" placeholder="密码"></el-input>
    </el-form-item>
    <el-form-item style="width: 100%">
      <el-button type="primary" style="width: 100%" @click="submitClick">登录</el-button>
    </el-form-item>
  </el-form>
</template>
<script>
  export default {
    data() {
      return {
        rules: {
          username: [{
            required: true,
            message: "请输入用户名",
            trigger: "blur"
          }],
          password: [{
            required: true,
            message: "请输入密码",
            trigger: "blur"
          }]
        },
        loginForm: {
          username: "",
          password: ""
        },
        loading: false
      }
    },
    methods: {
      submitClick: function() {
        var that = this;
        this.$refs["loginRef"].validate((valid) => {
          if (valid) {
            this.loading = true;
            this.postRequest("/login", {
              "username": that.loginForm.username,
              "password": that.loginForm.password
            }).then(resp => {
              that.loading = false;
              var data = resp.data;
              if (data.status == 1) {
                that.$store.commit("login", data.data);
                that.$router.replace({
                  path: "/index"
                });
              }
            });
          } else {
            return false;
          }
        });
      }
    }
  }
</script>
<style>
  .login-container {
    border-radius: 15px;
    background-clip: padding-box;
    margin: 180px auto;
    width: 350px;
    padding: 35px 35px 15px 35px;
    background: #fff;
    border: 1px solid #eaeaea;
    box-shadow: 0 0 25px #cac6c6;
  }
</style>
