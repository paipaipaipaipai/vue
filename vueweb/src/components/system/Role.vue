<template>
  <div>
    <el-container>
      <!-- 创建角色 -->
      <el-header style="padding: 0px;display:flex;justify-content:space-between;align-items: center">
        <div style="display: inline;">
          <el-input placeholder="请输入角色英文名称..." size="mini" style="width: 250px" v-model="roleName">
            <template slot="prepend">ROLE_</template>
          </el-input>
          <el-input placeholder="请输入角色中文名称..." size="mini" style="width: 250px" v-model="roleAlias">
          </el-input>
          <el-button type="success" size="mini" style="margin-left: 5px" icon="el-icon-plus" @click="createRole"
            :disabled="createDisabled">创建角色</el-button>
        </div>
      </el-header>
      <el-main style="padding-left: 0px;padding-top: 0px">
        <el-collapse v-model="activeId" accordion @change="collapseChange">
          <el-collapse-item v-for="(role,index) in roles" :title="role.roleAlias" :name="index" :key="role.roleId">
            <el-card class="box-card">
              <div style="display: inline;">
                <el-input placeholder="请输入角色英文名称..." size="mini" style="width: 250px" :disabled="true" v-model="editForm.roleName">
                </el-input>
                <el-input placeholder="请输入角色中文名称..." size="mini" style="width: 250px" v-model="editForm.roleAlias">
                </el-input>
              </div>
              <div style="display: flex;justify-content: flex-end;margin-right: 10px">
                <el-button type="primary" size="mini" style="float: right;" @click="saveRole" :disabled="saveDisabled">保存修改</el-button>
                <el-button type="danger" size="mini" style="float: right;" @click="deleteRole" :disabled="saveDisabled">删除</el-button>
              </div>
            </el-card>
          </el-collapse-item>
        </el-collapse>
      </el-main>
    </el-container>

  </div>
</template>
<script>
  import {
    isNotNullORBlank
  } from '../../utils/utils'

  export default {
    data() {
      return {
        loading: false,
        createDisabled: false,
        saveDisabled: false,
        roles: [],
        activeId: "",
        roleName: "",
        roleAlias: "",
        editForm: {
          roleId: "",
          roleName: "",
          roleAlias: ""
        }
      };
    },
    watch: {
      roleName: function() {
        this.roleName = this.roleName.replace(/[^A-Za-z]/g, '');
      },
      roleAlias: function() {
        this.roleAlias = this.roleAlias.replace(/[^A-Za-z0-9\u4e00-\u9fa5]/g, '');
      }
    },
    mounted: function() {
      this.loadAllRoles();
    },
    methods: {
      loadAllRoles() {
        var that = this;
        this.postRequest(this.API.Roles, {}).then(resp => {
          var data = resp.data;
          if (data.status == 1) {
            that.roles = data.data;
          }
        });
      },
      collapseChange(activeId) {
        if (activeId === "") {
          return;
        }
        var role = this.roles[activeId];
        this.editForm = {
          roleId: role.roleId,
          roleName: role.roleName,
          roleAlias: role.roleAlias
        }
      },
      emptyData() {
        this.roleName = "";
        this.roleAlias = "";
        this.activeId = "";
        this.editForm = {
          roleId: "",
          roleName: "",
          roleAlias: ""
        }
      },
      createRole() {
        var valid = isNotNullORBlank(this.roleName, this.roleAlias);
        if (valid) {
          var that = this;
          this.createDisabled = true;
          this.postRequest(this.API.CreateRole, {
            "roleName": this.roleName,
            "roleAlias": this.roleAlias
          }).then(resp => {
            that.createDisabled = false;
            var data = resp.data;
            if (data.status == 1) {
              that.loadAllRoles();
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
      },
      saveRole() {
        var valid = isNotNullORBlank(this.editForm.roleId, this.editForm.roleAlias);
        if (valid) {
          var that = this;
          this.saveDisabled = true;
          this.postRequest(this.API.SaveRole, {
            "roleId": this.editForm.roleId,
            "roleAlias": this.editForm.roleAlias
          }).then(resp => {
            that.saveDisabled = false;
            var data = resp.data;
            if (data.status == 1) {
              that.loadAllRoles();
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
      },
      deleteRole() {
        var valid = isNotNullORBlank(this.editForm.roleId);
        if (valid) {
          var that = this;
          this.saveDisabled = true;
          this.postRequest(this.API.DeleteRole, {
            "roleId": this.editForm.roleId
          }).then(resp => {
            that.saveDisabled = false;
            var data = resp.data;
            if (data.status == 1) {
              that.loadAllRoles();
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
      }
    }
  };
</script>
