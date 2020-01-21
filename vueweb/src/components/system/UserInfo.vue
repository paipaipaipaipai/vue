<template>
  <div>

    <el-form :model="user" :rules="rules" ref="userForm" label-width="100px" size="mini" v-loading="loading" style="margin:20px;">
      <el-form-item label="账号:" prop="userName">
        <el-input v-model="user.userName" size="mini" style="width: 100%;" placeholder="请输入账号"></el-input>
      </el-form-item>
      <el-form-item label="姓名:" prop="realName">
        <el-input v-model="user.realName" size="mini" style="width: 100%;" placeholder="请输入姓名"></el-input>
      </el-form-item>
      <el-form-item label="手机号:" prop="userPhone">
        <el-input v-model="user.userPhone" size="mini" style="width: 100%;" placeholder="请输入手机号"></el-input>
      </el-form-item>
      <el-form-item label="状态:" prop="status">
        <el-select v-model="user.status" size="mini" style="width: 100%;" placeholder="请选择活动区域">
          <el-option label="启用" value="1"></el-option>
          <el-option label="禁用" value="2"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="角色:">
        <el-select v-model="user.roles" size="mini" value-key="roleId" multiple placeholder="请选择角色" style="width: 100%;">
          <el-option v-for="role in roles" :key="role.roleId" :label="role.roleAlias" :value="{roleId:role.roleId,roleAlias:role.roleAlias}">
          </el-option>
        </el-select>
      </el-form-item>
    </el-form>
    <el-button size="mini" @click="cancel">取 消</el-button>
    <el-button size="mini" type="primary" @click="saveUser('userForm')" :disabled="btnDisabled">确 定</el-button>
  </div>
</template>
<script>
  export default {
    data() {
      return {
        loading: false,
        btnDisabled: false,
        roles: [],
        selectRoles: [],
        userNameDisabled: false,
        user: {
          userId: "",
          userName: "",
          realName: "",
          userPhone: "",
          status: "",
          roles: []
        },
        rules: {
          userName: [{
            required: true,
            message: "请填写账号",
            trigger: "change"
          }, {
            pattern: /^[A-Za-z0-9]+$/,
            message: "账号格式为字母或数字",
            trigger: "change"
          }],
          realName: [{
            required: true,
            message: "请填写姓名",
            trigger: "change"
          }, {
            pattern: /^[A-Za-z\u4e00-\u9fa5]+$/,
            message: "姓名格式为中文或字母",
            trigger: "change"
          }],
          userPhone: [{
            required: true,
            message: "请填写手机号",
            trigger: "change"
          }, {
            pattern: /^1\d{10}$/,
            message: "手机号格式不正确",
            trigger: "change"
          }],
          status: [{
            required: true,
            message: "请选择状态",
            trigger: "change"
          }]
        }
      };
    },
    mounted: function() {
      this.loadAllRoles();
    },
    methods: {
      loadAllRoles() {
        var that = this;
        this.loading = true;
        this.postRequest(this.API.Roles, {}).then(resp => {
          that.loading = false;
          var data = resp.data;
          if (data.status == 1) {
            that.roles = data.data;
          }
        });
      },
      cancel() {
        this.$router.replace({
          path: "/sys/user"
        });
      },
      saveUser(formName) {
        var that = this;
        this.$refs[formName].validate((valid) => {
          if (valid) {
            this.btnDisabled = true;
            this.postRequest(this.API.SaveUser, {
              "userId": this.user.userId,
              "userName": this.user.userName,
              "realName": this.user.realName,
              "userPhone": this.user.userPhone,
              "status": this.user.status,
              "roles": this.user.roles
            }).then(resp => {
              that.btnDisabled = false;
              var data = resp.data;
              if (data.status == 1) {
                that.dialogVisible = false;
                that.loadDate();
                that.emptyData();
                that.$message({
                  type: "success",
                  message: data.message
                });
              }
            });
          } else {
            return false;
          }
        });
      }
    }
  };
</script>
