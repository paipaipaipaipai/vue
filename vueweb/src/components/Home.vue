<template>
  <div>
    <el-container class="home-container">
      <el-header class="home-header">
        <span style="color: #fff; font-size: 22px; display: inline; margin-left: 20px;">这是个标题</span>
        <div style="display: flex;align-items: center;margin-right: 20px">
          <el-dropdown @command="handleCommand">
            <span class="el-dropdown-link" style="color: #fff;">
              <strong>Hello&nbsp;{{user.realName}}&nbsp;</strong>
            </span>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item>个人中心</el-dropdown-item>
              <el-dropdown-item>设置</el-dropdown-item>
              <el-dropdown-item command="logout" divided>注销</el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
        </div>
      </el-header>
      <el-container>
        <el-aside style="background-color: #ECECEC;width: 201px;">
          <el-menu style="background: #ececec;width: 200px;text-align: left;" :default-active="$route.path"
            unique-opened router>
            <template v-for="(item,index) in this.routes">
              <el-submenu :key="index" :index="index+''">
                <template slot="title">
                  <i class="el-icon-d-arrow-right" style="color: #20a0ff;width: 15px;"></i>
                  <span slot="title">{{item.name}}</span>
                </template>
                <el-menu-item style="padding-left: 30px;padding-right:0px;margin-left: 0px;width: 200px;" v-for="child in item.children"
                  :index="child.path" :key="child.menuId">{{child.name}}
                </el-menu-item>
              </el-submenu>
            </template>
          </el-menu>
        </el-aside>
        <el-main>
          <span style="color: #20a0ff;float: left; margin-right: 5px;">
            <i class="el-icon-location"></i>
          </span>
          <el-breadcrumb separator-class="el-icon-arrow-right">
            <el-breadcrumb-item v-for='(item,index) in breadcrumbItem' :key='index' v-if='item.name'>
              {{item.name}}
            </el-breadcrumb-item>
          </el-breadcrumb>
          <router-view></router-view>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>
<script>
  export default {
    data() {
      return {
        breadcrumbItem: []
      }
    },
    mounted: function() {
      this.getBreadcrumb();
    },
    methods: {
      getBreadcrumb() {
        var matched = this.$route.matched.filter(item => item.name);
        this.breadcrumbItem = matched;
      },
      handleCommand(command) {
        var that = this;
        if (command == "logout") {
          this.$confirm("注销登录, 是否继续？", "提示", {
            confirmButtonText: "确定",
            cancelButtonText: "取消",
            type: "warning"
          }).then(() => {
            that.postRequest("/logout");
            that.$store.commit("logout");
            that.$router.replace({
              path: "/"
            });
          }).catch(() => {
            that.$message({
              type: "info",
              message: "取消"
            });
          });
        }
      }
    },
    computed: {
      user() {
        return this.$store.state.user;
      },
      routes() {
        return this.$store.state.routes
      }
    },
    watch: {
      $route: function() {
        this.getBreadcrumb();
      }
    }
  }
</script>

<style>
  .home-container {
    height: 100%;
    position: absolute;
    top: 0px;
    left: 0px;
    width: 100%;
  }

  .home-header {
    background-color: #20a0ff;
    color: #333;
    text-align: center;
    display: flex;
    align-items: center;
    justify-content: space-between;
    box-sizing: content-box;
    padding: 0px;
  }

  .home-main {
    background-color: #fff;
    color: #000;
    text-align: center;
    margin: 0px;
    padding: 0px;
    ;
  }
</style>
