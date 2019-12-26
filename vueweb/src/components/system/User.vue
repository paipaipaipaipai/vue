<template>
  <div>
    <el-container>
      <el-header style="padding: 0px;display:flex;justify-content:space-between;align-items: center">
        <div style="display: inline;">
          <el-input placeholder="通过员工名搜索员工,记得回车哦..." clearable style="width: 300px;margin: 0px;padding: 0px;" size="mini"
            prefix-icon="el-icon-search" v-model="keywords">
          </el-input>
          <el-button type="primary" size="mini" style="margin-left: 5px" icon="el-icon-search">搜索</el-button>
          <el-button type="primary" size="mini" style="margin-left: 5px" icon="el-icon-plus">添加员工</el-button>
        </div>
      </el-header>
      <el-main style="padding-left: 0px;padding-top: 0px">
        <el-table border stripe size="mini" style="width: 100%;text-align: center;">
          <el-table-column type="selection">
          </el-table-column>
          <el-table-column label="姓名">
          </el-table-column>
          <el-table-column label="工号">
          </el-table-column>
          <el-table-column label="性别">
          </el-table-column>
          <el-table-column label="出生日期">
          </el-table-column>
        </el-table>
      </el-main>
    </el-container>
  </div>
</template>
<script>
  export default {
    data() {
      return {
        keywords: '',
        emp: {
          keywords: '',
          name: '',
          gender: ''
        }
      };
    }
  };
</script>
