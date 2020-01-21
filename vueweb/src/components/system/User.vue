<template>
  <div>
    <el-container>
      <!-- 搜索 -->
      <el-header style="padding: 0px;display:flex;justify-content:space-between;align-items: center">
        <div style="display: inline;">
          <el-input placeholder="请输入姓名或手机号" clearable style="width: 250px;margin: 0px;padding: 0px;" size="mini"
            prefix-icon="el-icon-search" v-model="keywords">
          </el-input>
          <el-button type="primary" size="mini" style="margin-left: 5px" icon="el-icon-search" @click="loadDate">搜索</el-button>
          <el-button type="success" size="mini" style="margin-left: 5px" icon="el-icon-plus" @click="showAddDialog">创建用户</el-button>
        </div>
      </el-header>
      
      <!-- 表格 -->
      <el-main style="padding-left: 0px;padding-top: 0px">
        <el-table :data="users" v-loading="loading" border stripe size="mini" style="width: 100%;text-align: center;">
          <el-table-column align="center" header-align="center" type="index" label="序号"></el-table-column>
          <el-table-column align="center" header-align="center" prop="userName" label="账号"> </el-table-column>
          <el-table-column align="center" header-align="center" prop="realName" label="姓名"> </el-table-column>
          <el-table-column align="center" header-align="center" prop="userPhone" label="手机号码"> </el-table-column>
          <el-table-column align="center" header-align="center" prop="status" label="状态"> </el-table-column>
          <el-table-column align="center" header-align="center" prop="createDateStr" label="创建时间"> </el-table-column>
          <el-table-column align="center" header-align="center" fixed="right" label="操作" width="200">
            <template slot-scope="scope">
              <el-button type="primary" size="mini" style="padding: 3px 4px;margin: 2px" @click="showEditDialog(scope.row)">编辑</el-button>
              <el-button type="primary" size="mini" style="padding: 3px 4px;margin: 2px" @click="resetPassword(scope.row)">重置密码</el-button>
              <el-button type="danger" size="mini" style="padding: 3px 4px;margin: 2px" @click="deleteUser(scope.row)">删除</el-button>
              <router-link to="/sys/user/userInfo">
                <el-button type="danger" size="mini" style="padding: 3px 4px;margin: 2px">跳板</el-button>
              </router-link>
            </template>
          </el-table-column>
        </el-table>
        <div style="margin: 10px;">
          <el-pagination background :page-sizes="[10, 20]" :page-size="10" :current-page="pageNo" @size-change="handleSizeChange"
            @current-change="handlePageChange" layout="total, sizes, prev, pager, next" :total="totalCount">
          </el-pagination>
        </div>
      </el-main>
    </el-container>

    <!-- 弹框 -->
    <el-dialog width="50%" style="text-align: left;" title="用户管理" :close-on-click-modal="false" :visible.sync="dialogVisible"
      @close="closeDialog('userForm')">
      <el-form :model="user" :rules="rules" ref="userForm" label-width="100px" size="mini" v-loading="dialogLoading" style="margin:10px;">
        <el-form-item label="账号:" prop="userName">
          <el-input v-model="user.userName" size="mini" style="width: 100%;" placeholder="请输入账号" :disabled="userNameDisabled"></el-input>
        </el-form-item>
        <el-form-item label="姓名:" prop="realName">
          <el-input v-model="user.realName" size="mini" style="width: 100%;" placeholder="请输入姓名"></el-input>
        </el-form-item>
        <el-form-item label="手机号:" prop="userPhone">
          <el-input v-model="user.userPhone" size="mini" style="width: 100%;" placeholder="请输入手机号"></el-input>
        </el-form-item>
        <el-form-item label="状态:" prop="status">
          <el-radio-group v-model="user.status" style="width: 100%;">
            <el-radio label="1">启用</el-radio>
            <el-radio label="2">禁用</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="角色:">
          <el-select v-model="user.roles" size="mini" value-key="roleId" multiple placeholder="请选择角色" style="width: 100%;">
            <el-option v-for="role in roles" :key="role.roleId" :label="role.roleAlias" :value="{roleId:role.roleId,roleAlias:role.roleAlias}">
            </el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button size="mini" @click="dialogVisible = false">取 消</el-button>
        <el-button size="mini" type="primary" @click="saveUser('userForm')" :disabled="btnDisabled">确 定</el-button>
      </span>
    </el-dialog>

  </div>
</template>
<script>
  export default {
    data() {
      return {
        keywords: '',
        loading: false,
        dialogLoading: false,
        btnDisabled: false,
        users: [],
        roles: [],
        selectRoles: [],
        totalCount: 0,
        defaultPageNo: 1,
        pageNo: 1,
        pageSize: 5,
        dialogVisible: false,
        userNameDisabled: false,
        user: {
          userId: "",
          userName: "",
          realName: "",
          userPhone: "",
          status: "2",
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
      this.loadDate();
      this.loadAllRoles();
    },
    methods: {
      handleSizeChange(pageSize) {
        this.pageSize = pageSize;
        this.pageNo = this.defaultPageNo;
        this.loadDate();
      },
      handlePageChange(pageNo) {
        this.pageNo = pageNo;
        this.loadDate();
      },
      loadDate() {
        var that = this;
        this.loading = true;
        this.postRequest(this.API.AllUsers, {
          "pageNo": this.pageNo,
          "pageSize": this.pageSize,
          "keywords": this.keywords
        }).then(resp => {
          that.loading = false;
          var data = resp.data;
          if (data.status == 1) {
            that.users = data.data.result;
            that.totalCount = data.data.total;
          }
        });
      },
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
      showAddDialog() {
        this.dialogVisible = true;
      },
      showEditDialog(row) {
        this.dialogVisible = true;
        this.userNameDisabled = true;
        this.dialogLoading = true;
        var that = this;
        this.postRequest(this.API.GetUser, {
          "userId": row.userId
        }).then(resp => {
          that.dialogLoading = false;
          var data = resp.data;
          if (data.status == 1) {
            that.user.userId = data.data.userId;
            that.user.userName = data.data.userName;
            that.user.realName = data.data.realName;
            that.user.userPhone = data.data.userPhone;
            that.user.status = data.data.status;
            that.user.roles = data.data.roles;
          }
        });
      },
      closeDialog(formName) {
        // 重置表单内容
        this.$refs[formName].resetFields();
        this.emptyData();
      },
      emptyData() {
        this.userNameDisabled = false;
        this.user = {
          userId: "",
          userName: "",
          realName: "",
          userPhone: "",
          status: "",
          roles: []
        }
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
      },
      resetPassword(row) {
        this.loading = true;
        var that = this;
        this.postRequest(this.API.ResetPassword, {
          "userId": row.userId
        }).then(resp => {
          that.loading = false;
          var data = resp.data;
          if (data.status == 1) {
            that.loadDate();
            that.$message({
              type: "success",
              message: data.message
            });
          }
        });
      },
      deleteUser(row) {
        this.$confirm("此操作将永久删除[" + row.userName + "], 是否继续？", "提示", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning"
        }).then(() => {
          this.loading = true;
          var that = this;
          this.postRequest(this.API.DeleteUser, {
            "userId": row.userId
          }).then(resp => {
            that.loading = false;
            var data = resp.data;
            if (data.status == 1) {
              that.loadDate();
              that.$message({
                type: "success",
                message: data.message
              });
            }
          });
        }).catch(() => {});
      },
    }
  };
</script>
