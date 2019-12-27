<template>
  <div>
    <el-container>
      <el-header style="padding: 0px;display:flex;justify-content:space-between;align-items: center">
        <div style="display: inline;">
          <el-input placeholder="请输入姓名或手机号" clearable style="width: 300px;margin: 0px;padding: 0px;" size="mini"
            prefix-icon="el-icon-search" v-model="keywords">
          </el-input>
          <el-button type="primary" size="mini" style="margin-left: 5px" icon="el-icon-search" @click="loadDate">搜索</el-button>
          <el-button type="success" size="mini" style="margin-left: 5px" icon="el-icon-plus" @click="showAddDialog">创建用户</el-button>
        </div>
      </el-header>
      <el-main style="padding-left: 0px;padding-top: 0px">
        <el-table :data="users" v-loading="loading" border stripe size="mini" style="width: 100%;text-align: center;">
          <el-table-column align="center" header-align="center" prop="userName" label="账号"> </el-table-column>
          <el-table-column align="center" header-align="center" prop="realName" label="姓名"> </el-table-column>
          <el-table-column align="center" header-align="center" prop="userPhone" label="手机号码"> </el-table-column>
          <el-table-column align="center" header-align="center" prop="status" label="状态"> </el-table-column>
          <el-table-column align="center" header-align="center" prop="createDateStr" label="创建时间"> </el-table-column>
          <el-table-column align="center" header-align="center" fixed="right" label="操作" width="200">
            <template slot-scope="scope">
              <el-button type="primary" size="mini" style="padding: 3px 4px;margin: 2px">查看</el-button>
              <el-button type="primary" size="mini" style="padding: 3px 4px;margin: 2px">编辑</el-button>
              <el-button type="danger" size="mini" style="padding: 3px 4px;margin: 2px">删除</el-button>
            </template>
          </el-table-column>
        </el-table>
        <div style="margin: 10px;">
          <el-pagination background :page-sizes="[5, 10, 20]" :page-size="5" :current-page="pageNo" @size-change="handleSizeChange"
            @current-change="handlePageChange" layout="total, sizes, prev, pager, next" :total="totalCount">
          </el-pagination>
        </div>
      </el-main>
    </el-container>

    <el-dialog width="30%" style="text-align: left;" :title="dialogTitle" :close-on-click-modal="false" :visible.sync="dialogVisible">
      <el-form :model="user" ref="userForm" label-width="100px" size="mini">
        <el-form-item label="账号:" prop="userName">
          <el-input v-model="user.userName" size="mini" style="width: 200px;" placeholder="请输入账号"></el-input>
        </el-form-item>
        <el-form-item label="姓名:" prop="realName">
          <el-input v-model="user.realName" size="mini" style="width: 200px;" placeholder="请输入姓名"></el-input>
        </el-form-item>
        <el-form-item label="手机号:" prop="userPhone">
          <el-input v-model="user.userPhone" size="mini" style="width: 200px;" placeholder="请输入手机号"></el-input>
        </el-form-item>
        <el-form-item label="状态:" prop="status">
          <el-radio-group v-model="user.status">
            <el-radio label="1">启用</el-radio>
            <el-radio label="2">禁用</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="创建时间:" prop="status">
        <el-input v-model="user.createtime" size="mini" style="width: 200px;" placeholder="创建时间"></el-input>
        </el-form-item>



      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button size="mini" @click="dialogVisible = false">取 消</el-button>
        <el-button size="mini" type="primary" @click="saveUser('userForm')">确 定</el-button>
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
        users: [],
        totalCount: 0,
        defaultPageNo: 1,
        pageNo: 1,
        pageSize: 5,
        dialogTitle: "",
        dialogVisible: false,
        user: {
          userId: '',
          userName: '',
          userPhone: '',
          realName: '',
          status: '',
          createtime: ''
        }
      };
    },
    mounted: function() {
      this.loadDate();
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
        this.postRequest("/system/user/getUsers", {
          "pageNo": this.pageNo,
          "pageSize": this.pageSize,
          "keywords": this.keywords
        }).then(resp => {
          this.loading = false;
          var data = resp.data;
          if (data.status == 1) {
            that.users = data.data.result;
            that.totalCount = data.data.total;
          }
        });
      },
      showAddDialog() {
        this.dialogTitle = "创建用户";
        this.dialogVisible = true;
      },
      saveUser(formName) {
        var that = this;
        this.$refs[formName].validate((valid) => {
          if (valid) {
            this.loading = true;
            this.postRequest("/system/user/saveUser", {
              "userName": this.user.userName,
              "realName": this.user.realName,
              "userPhone": this.user.userPhone,
              "status": this.user.status
            }).then(resp => {
              this.loading = false;
              var data = resp.data;
              if (data.status == 1) {
                that.dialogVisible = false;
                that.emptyEmpData();
                that.loadEmps();
              }
            });
          } else {
            return false;
          }
        });
      },
    }
  };
</script>
