<template>
  <el-form :rules="rules" class="login-container" label-position="left" :model="loginForm" label-width="0px" v-loading="loading">
    <h3 class="login_title">系统登录</h3>
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
        var _this = this;
        _this.loading = true;
        _this.postFormRequest("/login", {
          username: _this.loginForm.username,
          password: _this.loginForm.password
        }).then(resp => {
          _this.loading = false;
          var data = resp.data;
          if (data.status == 1) {
            _this.message.success({
              message: data.message
            });
            _this.$store.commit("login", data.data);
            _this.$router.replace({
              path: "/home"
            });
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

  .login_title {
    margin: 0px auto 40px auto;
    text-align: center;
    color: #505458;
  }

  .login_remember {
    margin: 0px 0px 35px 0px;
    text-align: left;
  }
</style>
