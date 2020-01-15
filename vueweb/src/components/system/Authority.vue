<template>
  <div>
    <el-container>
      <el-header style="padding: 0px;display:flex;justify-content:space-between;align-items: center">
        <div style="display: inline;">
          <el-select v-model="roleId" size="mini" clearable placeholder="请选择角色" style="width: 500px;" @change="handleChange">
            <el-option v-for="role in roles" :key="role.roleId" :label="role.roleAlias" :value="role.roleId">
            </el-option>
          </el-select>
          <el-button type="success" size="mini" style="margin-left: 5px" icon="el-icon-info" @click="saveRoleMenu"
            :disabled="btnDisabled">授权</el-button>
        </div>
      </el-header>
      <el-main style="padding-left: 0px;padding-top: 0px">
        <el-tree :props="props" :key="roleId" :data="menuTree" :default-checked-keys="checkedKeys" node-key="menuId"
          ref="tree" show-checkbox highlight-current style="width: 500px;" v-loading="loading">
        </el-tree>
      </el-main>
    </el-container>

  </div>
</template>
<script>
  export default {
    data() {
      return {
        loading: false,
        btnDisabled: false,
        props: {
          label: "menuName",
          children: "childMenus"
        },
        roles: [],
        roleId: "",
        menuTree: [],
        checkedKeys: []
      }
    },
    mounted: function() {
      this.loadAllRoles();
      this.loadMenuTree();
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
      loadMenuTree() {
        this.loading = true;
        var that = this;
        this.postRequest(this.API.MenuTree, {}).then(resp => {
          that.loading = false;
          var data = resp.data;
          if (data.status == 1) {
            that.menuTree = data.data;
          }
        });
      },
      handleChange() {
        var roleId = this.roleId;
        if (roleId === "") {
          this.checkedKeys = [];
        } else {
          var that = this;
          this.postRequest(this.API.RoleMenus, {
            "roleId": roleId
          }).then(resp => {
            var data = resp.data;
            if (data.status == 1) {
              that.checkedKeys = data.data;
            }
          });
        }
      },
      saveRoleMenu() {
        var roleId = this.roleId;
        if (roleId === "") {
          this.$message({
            type: "warning",
            message: "请选择角色"
          });
          return false;
        }
        this.loading = true;
        this.btnDisabled = true;
        var that = this;
        var checkedKeys = this.$refs["tree"].getCheckedKeys(true);
        this.postRequest(this.API.SaveAuthority, {
          "roleId": roleId,
          "checkedKeys": checkedKeys
        }).then(resp => {
          that.loading = false;
          that.btnDisabled = false;
          var data = resp.data;
          if (data.status == 1) {
            that.emptyData();
            that.$message({
              type: "success",
              message: data.message
            });
          }
        });
      },
      emptyData() {
        this.roleId = "";
        this.checkedKeys = [];
      }
    }
  };
</script>
