<template>
  <div>
    <el-container>
      <!-- 搜索 -->
      <el-header style="padding: 0px;display:flex;justify-content:space-between;align-items: center">
        <div style="display: inline;">
          <el-input placeholder="serialNumber" clearable style="width: 250px;margin: 0px;padding: 0px;" size="mini"
            v-model="serialNumber">
          </el-input>
          <el-input placeholder="caseNo" clearable style="width: 250px;margin: 0px;padding: 0px;" size="mini" v-model="caseNo">
          </el-input>
          <el-button type="primary" size="mini" style="margin-left: 5px" icon="el-icon-search" @click="loadDate">搜索</el-button>
        </div>
      </el-header>

      <!-- 表格 -->
      <el-main style="padding-left: 0px;padding-top: 0px;">
        <el-table :data="routeSteps" :header-cell-style="{'background-color': '#fafafa','fontSize':'12px','fontWeight':'900'}"
          height="500" v-loading="loading" border stripe size="mini" style="width: 100%;text-align: center;">
          <el-table-column align="center" header-align="center" fixed="left" prop="stepName" label="stepName" width="100"
            :show-overflow-tooltip='true'>
          </el-table-column>
          <el-table-column align="center" header-align="center" prop="status" label="status" width="100">
          </el-table-column>
          <el-table-column align="center" header-align="center" prop="stepDesc" label="stepDesc" width="200"
            :show-overflow-tooltip='true'>
          </el-table-column>
          <el-table-column align="center" header-align="center" prop="startTime" label="startTime" width="250">
          </el-table-column>
          <el-table-column align="center" header-align="center" prop="startedBy" label="startedBy" width="200"
            :show-overflow-tooltip='true'>
          </el-table-column>
          <el-table-column align="center" header-align="center" prop="completeTime" label="completeTime" width="250">
          </el-table-column>
          <el-table-column align="center" header-align="center" prop="doneBy" label="doneBy" width="200"
            :show-overflow-tooltip='true'>
          </el-table-column>
          <el-table-column align="center" header-align="center" prop="listOfOpenNCs" label="listOfOpenNCs" width="250">
          </el-table-column>
          <el-table-column align="center" header-align="center" prop="routeStepDownNCAction" label="routeStepDownNCAction"
            width="250"> </el-table-column>
          <el-table-column align="center" header-align="center" prop="reason" label="reason" width="250">
          </el-table-column>
          <el-table-column align="center" header-align="center" prop="comment" label="comment" width="250">
          </el-table-column>
          <el-table-column align="center" header-align="center" prop="checkListChangeNumber" label="最新CheckList版本"
            width="250"> </el-table-column>
          <el-table-column align="center" header-align="center" prop="pastCheckListCN" label="当前CheckList版本" width="200">
          </el-table-column>
          <el-table-column align="center" header-align="center" prop="templateTaskCount" label="templateTaskCount"
            width="200"> </el-table-column>
          <el-table-column align="center" header-align="center" prop="failedTaskCount" label="failedTaskCount" width="200">
          </el-table-column>
          <el-table-column align="center" header-align="center" prop="complTaskCount" label="complTaskCount" width="200">
          </el-table-column>
          <el-table-column align="center" header-align="center" prop="openTotalNC" label="openTotalNC" width="200">
          </el-table-column>
          <el-table-column align="center" header-align="center" prop="linkedOpenTotalNC" label="linkedOpenTotalNC"
            width="200"> </el-table-column>
          <el-table-column align="center" header-align="center" prop="start" label="start" width="200">
          </el-table-column>
          <el-table-column align="center" header-align="center" prop="checkListUsageId" label="checkListUsageId" width="200">
          </el-table-column>
          <el-table-column align="center" header-align="center" prop="checkListMandatory" label="checkListMandatory"
            width="200"> </el-table-column>
          </el-table-column>
          <el-table-column align="center" header-align="center" fixed="right" label="操作" width="250">
            <template slot-scope="scope">
              <el-button type="primary" size="mini" style="padding: 3px 4px;margin: 2px" @click="showTaskDialog(scope.row)">编辑</el-button>
              <el-button type="success" size="mini" style="padding: 3px 4px;margin: 2px" @click="showStartDialog(scope.row)">Start</el-button>
              <el-button type="warning" size="mini" style="padding: 3px 4px;margin: 2px" @click="deleteRow(scope.row)">Complete</el-button>
              <el-button type="danger" size="mini" style="padding: 3px 4px;margin: 2px" @click="deleteRow(scope.row)">删除</el-button>
            </template>
          </el-table-column>
        </el-table>
      </el-main>
    </el-container>

    <!-- TASK弹框 -->
    <el-dialog width="100%" style="text-align: left;" title="Task" :close-on-click-modal="false" :visible.sync="taskDialogVisible"
      @close="closeTaskDialog">
      <el-steps :active="4" simple style="margin-bottom: 10px;">
        <el-step :title="'SerialNumber: ' + serialNumber" icon="el-icon-edit"></el-step>
        <el-step :title="'CaseNo: ' + caseNo" icon="el-icon-edit"></el-step>
        <el-step :title="'Route: ' + routeName" icon="el-icon-edit"></el-step>
        <el-step :title="'Step: ' + routeStepName" icon="el-icon-edit"></el-step>
      </el-steps>
      <!-- <el-steps direction="vertical" :active="4">
        <el-step :title="'SerialNumber: ' + serialNumber" icon="el-icon-edit"></el-step>
        <el-step :title="'CaseNo: ' + caseNo" icon="el-icon-edit"></el-step>
        <el-step :title="'Route: ' + routeName" icon="el-icon-edit"></el-step>
        <el-step :title="'Step: ' + routeStepName" icon="el-icon-edit"></el-step>
      </el-steps> -->
      <el-table :data="checklistTasks" height="500" :header-cell-style="{'background-color': '#fafafa','fontSize':'12px','fontWeight':'900'}"
        border stripe size="mini" style="width: 100%;text-align: center;" @selection-change="handleSelectionChange">
        <el-table-column align="center" header-align="center" fixed="left" type="selection" width="55">
        </el-table-column>
        <el-table-column align="center" header-align="center" fixed="left" prop="seq" label="Sequence" width="100">
        </el-table-column>
        <el-table-column align="center" header-align="center" prop="taskId" label="TaskId" width="100">
        </el-table-column>
        <el-table-column align="center" header-align="center" prop="taskNumber" label="Number" width="100">
        </el-table-column>
        <el-table-column align="center" header-align="center" prop="taskDes" label="TaskDes" width="100"
          :show-overflow-tooltip='true'>
        </el-table-column>
        <el-table-column align="center" header-align="center" prop="varName" label="VarName" width="100"
          :show-overflow-tooltip='true'>
        </el-table-column>
        <el-table-column align="center" header-align="center" prop="attachments.length" label="文件" width="100">
        </el-table-column>
        <el-table-column align="center" header-align="center" prop="target" label="Target" width="100">
          <template slot-scope="scope">
            <el-tag type="success" v-if="scope.row.target !=null && scope.row.target !=''">{{scope.row.target}}</el-tag>
          </template>
        </el-table-column>
        <el-table-column align="center" header-align="center" prop="lowLimmit" label="LowLimmit" width="100">
          <template slot-scope="scope">
            <el-tag type="success" v-if="scope.row.lowLimmit !=null && scope.row.lowLimmit !=''">{{scope.row.lowLimmit}}</el-tag>
          </template>
        </el-table-column>
        <el-table-column align="center" header-align="center" prop="highLimmit" label="HighLimmit" width="100">
          <template slot-scope="scope">
            <el-tag type="success" v-if="scope.row.highLimmit !=null && scope.row.highLimmit !=''">{{scope.row.highLimmit}}</el-tag>
          </template>
        </el-table-column>
        <el-table-column align="center" header-align="center" prop="mathEquation" label="Equation" width="250">
          <template slot-scope="scope">
            <el-tag type="warning" v-if="scope.row.mathEquation !=null && scope.row.mathEquation !=''">{{scope.row.mathEquation}}</el-tag>
          </template>
        </el-table-column>
        <el-table-column align="center" header-align="center" prop="dataType" label="DataType" width="100">
        </el-table-column>
        <el-table-column align="center" header-align="center" label="Data" width="250">
          <template slot-scope="scope">
            <el-input placeholder="data" clearable size="mini" v-model="scope.row.data"> </el-input>
          </template>
        </el-table-column>
        <el-table-column align="center" header-align="center" label="Result" width="200">
          <template slot-scope="scope">
            <el-select v-model="scope.row.result" size="mini" clearable placeholder="result">
              <el-option v-for="r in scope.row.resultFlagOptions" :key="r" :label="r" :value="r">
              </el-option>
            </el-select>
          </template>
        </el-table-column>
        <el-table-column align="center" header-align="center" label="User" width="200">
          <template slot-scope="scope">
            <el-select v-model="scope.row.user" size="mini" clearable placeholder="user">
              <el-option v-for="u in users" :key="u.userId" :label="u.userName" :value="u.userId">
              </el-option>
            </el-select>
          </template>
        </el-table-column>
        <el-table-column align="center" header-align="center" prop="date" label="Date" width="250">
          <template slot-scope="scope">
            <el-date-picker v-model="scope.row.date" type="datetime" format="MM/dd/yyyy HH:mm:ss" value-format="MM/dd/yyyy HH:mm:ss"
              placeholder="选择日期时间" size="mini">
            </el-date-picker>
          </template>
        </el-table-column>
        <el-table-column align="center" header-align="center" label="Comment" width="250">
          <template slot-scope="scope">
            <el-input placeholder="comment" clearable size="mini" v-model="scope.row.comment"> </el-input>
          </template>
        </el-table-column>
      </el-table>
      <span slot="footer" class="dialog-footer">
        <el-button size="mini" @click="taskDialogVisible = false">取 消</el-button>
        <el-button size="mini" type="primary" @click="saveTask" :disabled="saveTaskDisabled">保存</el-button>
      </span>
    </el-dialog>

    <!-- Start弹框 -->
    <el-dialog width="50%" style="text-align: left;" title="Start" :close-on-click-modal="false" :visible.sync="startDialogVisible"
      @close="closeStartDialog">
      <el-form label-width="100px" size="mini" style="margin:10px;">
        <el-form-item label="MinTime:" v-if="this.minStartTime!=null && this.minStartTime !=''">
          <el-input placeholder="MinTime" v-model="minStartTime" :disabled="true"></el-input>
        </el-form-item>
        <el-form-item label="MaxTime:" v-if="this.maxStartTime!=null && this.maxStartTime !=''">
          <el-input placeholder="MaxTime" v-model="maxStartTime" :disabled="true"></el-input>
        </el-form-item>
        <el-form-item label="Start时间:" prop="startTime">
          <el-date-picker v-model="startTime" type="datetime" format="MM/dd/yyyy HH:mm:ss" value-format="MM/dd/yyyy HH:mm:ss"
            placeholder="选择日期时间" size="mini" style="width: 100%;">
          </el-date-picker>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button size="mini" @click="startDialogVisible = false">取 消</el-button>
        <el-button size="mini" type="primary" @click="doStart" :disabled="doStartDisabled">保存</el-button>
      </span>
    </el-dialog>

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
        taskDialogVisible: false,
        saveTaskDisabled: false,
        startDialogVisible: false,
        doStartDisabled: false,
        serialNumber: "1340342",
        caseNo: "0500754111",
        routeName: "",
        partNumber: "",
        partRevision: "",
        unitAlias: "",
        unitDesc: "",
        unitStatus: "",
        unitTrxState: "",
        maxEscalation: "",
        division: "",
        routeSteps: [],
        routeStepName: "",
        checklistChangeNumber: "",
        checklistTasks: [],
        multipleSelection: [],
        users: [],
        startTime: "",
        minStartTime: "",
        maxStartTime: "",
        rules: {
          startTime: [{
            required: true,
            message: "请选择开启时间",
            trigger: "change"
          }],
        }
      };
    },
    mounted: function() {
      this.loadDate();
      this.loadUsers();
    },
    methods: {
      loadDate() {
        var valid = isNotNullORBlank(this.serialNumber, this.caseNo);
        if (valid) {
          var that = this;
          this.loading = true;
          this.getRequestEQ("/Install/CheckList/getRouteSteps", {
            "serialNumber": this.serialNumber,
            "caseNo": this.caseNo
          }).then(resp => {
            that.loading = false;
            var data = resp.data;
            if (data.code == "1") {
              that.routeName = data.data.routeName;
              that.partNumber = data.data.partNumber;
              that.partRevision = data.data.partRevision;
              that.unitAlias = data.data.unitAlias;
              that.unitDesc = data.data.unitDesc;
              that.unitStatus = data.data.unitStatus;
              that.unitTrxState = data.data.unitTrxState;
              that.maxEscalation = data.data.maxEscalation;
              that.division = data.data.division;
              that.routeSteps = data.data.routeStepList;
            }
          });
        }
      },
      loadUsers() {
        this.users.push({
          "userId": "penny_kong",
          "userName": "KONG,PENNY"
        });
        this.users.push({
          "userId": "dylan_xu",
          "userName": "XU,DYLAN"
        });
        this.users.push({
          "userId": "lucy_liu",
          "userName": "LIU,LUCY"
        });
        this.users.push({
          "userId": "alex_zhang",
          "userName": "ZHANG,ALEX"
        });
      },
      showTaskDialog(row) {
        var that = this;
        this.getRequestEQ("/Install/CheckList/getChecklist", {
          "serialNumber": this.serialNumber,
          "caseNo": this.caseNo,
          "routeName": this.routeName,
          "routeStepName": row.stepName
        }).then(resp => {
          var data = resp.data;
          that.loading = false;
          if (data.code == "1") {
            that.taskDialogVisible = true;
            that.routeStepName = data.data.routeStepName;
            that.checklistChangeNumber = data.data.checklistChangeNumber;
            that.checklistTasks = data.data.checklistTasks;
          }
        });
      },
      getChecklist() {
        var that = this;
        this.getRequestEQ("/Install/CheckList/getChecklist", {
          "serialNumber": this.serialNumber,
          "caseNo": this.caseNo,
          "routeName": this.routeName,
          "routeStepName": this.routeStepName
        }).then(resp => {
          var data = resp.data;
          that.loading = false;
          if (data.code == "1") {
            that.routeStepName = data.data.routeStepName;
            that.checklistChangeNumber = data.data.checklistChangeNumber;
            that.checklistTasks = data.data.checklistTasks;
          }
        });
      },
      closeTaskDialog() {
        this.routeStepName = "";
        this.checklistChangeNumber = "";
        this.checklistTasks = [];
      },
      showStartDialog(row) {
        var that = this;
        this.getRequestEQ("/Install/CheckList/getStepStartTimeRange", {
          "serialNumber": this.serialNumber,
          "caseNo": this.caseNo,
          "routeName": this.routeName,
          "routeStepName": row.stepName
        }).then(resp => {
          var data = resp.data;
          if (data.code == "1") {
            that.startDialogVisible = true;
            that.routeStepName = row.stepName;
            var min = data.data.minTime;
            if (min != null && min != "") {
              if (min.indexOf(";") > 0) {
                min = min.substring(0, min.indexOf(";"))
              }
            }
            var max = data.data.maxTime;
            if (max != null && max != "") {
              if (max.indexOf(";") > 0) {
                max = max.substring(0, max.indexOf(";"))
              }
            }
            that.minStartTime = min;
            that.maxStartTime = max;
          }
        });
      },
      closeStartDialog() {
        this.startTime = "";
        this.minStartTime = "";
        this.maxStartTime = "";
      },
      deleteRow(row) {
        this.$message({
          type: "success",
          message: "你在逗我吗？"
        });
      },
      handleSelectionChange(selection) {
        this.multipleSelection = selection;
        this.multipleSelection.forEach(item => {
          item.editFlag = true;
          if (item.date != null && item.date != "") {
            if (item.date.indexOf(";") > 0) {
              item.date = item.date.substring(0, item.date.indexOf(";"))
            }
          }
          if (item.user != null && item.user != "") {
            this.users.forEach(u => {
              if (item.user === u.userName) {
                item.user = u.userId;
              }
            });
          }
        })
      },
      saveTask() {
        var that = this;
        this.saveTaskDisabled = true;
        this.postRequestEQ("/Install/CheckList/saveChecklist", {
          "serialNumber": this.serialNumber,
          "caseNo": this.caseNo,
          "fsrNo": "fsrNo",
          "routeName": this.routeName,
          "routeStepName": this.routeStepName,
          "checklistChangeNumber": this.checklistChangeNumber,
          "checklistTasks": this.multipleSelection
        }).then(resp => {
          setTimeout(() => {
            that.saveTaskDisabled = false;
          }, 1000);
          var data = resp.data;
          if (data.code == "1") {
            that.$message({
              type: "success",
              message: data.message
            });
            // 刷新Task数据
            that.getChecklist();
          }
          if (data.code == "30001") {
            var msg = "";
            var result = data.data;
            result.forEach(item => {
              msg += "<strong> TaskId:" + item.taskId + ",Sequence:" + item.sequence + "</strong><br>";
              item.messages.forEach(m => {
                msg += m + "<br>";
              });
              msg += "<hr><br>";
            });
            that.$message({
              type: "warning",
              showClose: true,
              dangerouslyUseHTMLString: true,
              message: msg
            });
          }
        });
      },
      doStart() {
        var that = this;
        this.doStartDisabled = true;
        this.postRequestEQ("/Install/CheckList/startRouteStep", {
          "serialNumber": this.serialNumber,
          "caseNo": this.caseNo,
          "routeName": this.routeName,
          "routeStepName": this.routeStepName,
          "startTime": this.startTime
        }).then(resp => {
          setTimeout(() => {
            that.doStartDisabled = false;
          }, 1000);
          var data = resp.data;
          if (data.code == "1") {
            that.startDialogVisible = false;
            that.loadDate();
          }
        });
      }
    }
  };
</script>

<style>
  .el-table__header th {
    padding: 0;
    height: 44px;
    line-height: 44px;
  }
</style>
