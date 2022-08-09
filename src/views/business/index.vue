<template>
  <div class="dashboard-container">
    <div class="app-container">
      <!-- 搜索栏 -->
      <el-card
        class="box-search"
        shadow="never"
        :body-style="{ padding: '10px 0px 10px 20px' }"
      >
        <el-form :inline="true" :model="formInline" class="demo-form-inline">
          <el-form-item label="工单编号:" class="item">
            <el-input
              v-model="formInline.taskCode"
              placeholder="请输入"
            ></el-input>
          </el-form-item>
          <el-form-item label="工单状态:" class="item">
            <el-select v-model="formInline.status" placeholder="请选择">
              <el-option
                v-for="item in taskStatusList"
                :key="item.statusId"
                :label="item.statusName"
                :value="item.statusId"
              ></el-option>
            </el-select>
          </el-form-item>
          <el-form-item>
            <dkd-button @click="search">
              <span>
                <svg-icon
                  icon-class="search"
                  style="margin-right: 8px; font-size: 15px"
                ></svg-icon
                >查询</span
              >
            </dkd-button>
          </el-form-item>
        </el-form>
      </el-card>
      <!-- 列表栏 -->
      <el-card class="box-search" shadow="never">
        <!-- top按钮 -->
        <div class="list-top-btn">
          <dkd-button
            @click="Newtableckness"
            background="linear-gradient(135deg,hsl(27deg 100% 63%),hsl(17deg 100% 56%))!important"
          >
            <span>
              <svg-icon
                icon-class="add"
                style="margin-right: 8px; font-size: 15px"
              ></svg-icon
              >新建</span
            >
          </dkd-button>
          <dkd-button
            style="margin-left: 8px"
            background="#fbf4f0"
            color="#655b56"
            @click="DkBbut"
            >工单配置</dkd-button
          >
        </div>
        <!-- 表格 -->
        <dkd-table
          @details="details"
          :currentList="currentList"
          :tableLabel="tableLabel"
          :currentIndex="pageIndex * 10"
        />
        <!-- 分页 -->
        <div class="Pagination">
          <p>共{{ totalCount }}条记录 第{{ pageIndex }}/{{ totalPage }}页</p>
          <p>
            <DkdButton
              background="#d5ddf8"
              :disabled="pageIndex === '1'"
              color="#606266"
              style="margin-right: 20px"
              @click="lastPage"
              >上一页</DkdButton
            >
            <DkdButton
              :disabled="pageIndex === totalPage"
              color="#606266"
              background="#d5ddf8"
              @click="nextPage"
              >下一页</DkdButton
            >
          </p>
        </div>
      </el-card>
    </div>
    <!-- 状态弹窗 -->
    <State
      ref="State"
      :Visible.sync="StateVisible"
      @gameclock="gameclock"
      @onClose="onCloseState"
    ></State>
    <!-- 新增弹窗 -->
    <Newtable
      ref="Newtable"
      :Visible.sync="NewtableVisible"
      @onClose="NewtableVisible = false"
    ></Newtable>
    <!-- 配置弹窗 -->
    <el-dialog title="工单配置" :visible.sync="dialogFormVisible">
      <el-form :model="configurationFrom" :rules="staffInfoRules">
        <el-form-item
          label="补货警戒线"
          label-width="150px"
          class="formm"
          prop="alertValue"
        >
          <el-input
            size="large"
            type="text"
            placeholder="请输入内容"
            v-model="configurationFrom.alertValue"
            autocomplete="off"
          ></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="FormVisible">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { searchTasks, getTaskStatus, getthresholdworkApi } from "@/api/index";
import DkdButton from "@/components/DkdButton";
import DkdTable from "./components/Theform.vue";
import State from "./components/state.vue";
import Newtable from "./components/Newtable.vue";

export default {
  name: "BBusin",
  data() {
    return {
      // 搜索表单数据
      formInline: {
        taskCode: "",
        status: "",
      },
      // 配置表数据
      configurationFrom: {
        alertValue: "10",
      },
      StateVisible: false, // 控制状态弹窗
      NewtableVisible: false, //控制新建表单
      dialogFormVisible: false, //控制配置弹窗
      currentList: [],
      taskStatusList: [],
      pageIndex: "",
      totalPage: "",
      totalCount: "",
      tableLabel: [
        { label: "工单编号", width: "118", prop: "taskCode" },
        { label: "设备编号", width: "130", prop: "innerCode" },
        { label: "工单类型", width: "136", prop: "taskType.typeName" },
        { label: "工单方式", width: "130", prop: "createType" },
        {
          label: "工单状态",
          width: "136",
          prop: "taskStatusTypeEntity.statusName",
        },
        { label: "运营人员", width: "136", prop: "userName" },
        { label: "创建日期", width: "160", prop: "createTime" },
      ],
      staffInfoRules: {
        //整个表单的校验规则
        alertValue: [{ required: true, message: "请输入", trigger: "blur" }],
      },
    };
  },
  components: { DkdButton, DkdTable, Newtable, State },
  created() {
    this.searchTasks();
    this.getTaskStatus();
  },

  methods: {
    // 获取全部工单列表
    async searchTasks(params) {
      const res = await searchTasks(params);
      this.currentList = res.data.currentPageRecords;
      this.pageIndex = res.data.pageIndex;
      this.totalPage = res.data.totalPage;
      this.totalCount = res.data.totalCount;
    },
    // 获取工单状态
    async getTaskStatus() {
      const res = await getTaskStatus();
      this.taskStatusList = res.data;
    },
    // 获取下一页数据
    async nextPage() {
      await this.searchTasks({
        pageIndex: parseInt(this.pageIndex) + 1,
        taskCode: this.formInline.taskCode,
        status: this.formInline.status,
      });
    },
    // 获取下一页数据
    async lastPage() {
      await this.searchTasks({
        pageIndex: parseInt(this.pageIndex) - 1,
        taskCode: this.formInline.taskCode,
        status: this.formInline.status,
      });
    },
    // 搜索工单
    async search() {
      await this.searchTasks(this.formInline);
    },
    // 新建弹窗展示
    Newtableckness() {
      this.NewtableVisible = true;
    },
    // 配置显示
    DkBbut() {
      this.dialogFormVisible = true;
    },
    // 设置阈值
    async FormVisible() {
      await getthresholdworkApi(this.configurationFrom);
      this.$notify({
        title: "成功",
        message: "修改阈值成功",
        type: "success",
      });
      this.dialogFormVisible = false;
    },
    // 显示详情
    details(val) {
      this.StateVisible = true;
      console.log(val);
    },
    // 关闭详情
    onCloseState() {
      this.StateVisible = false;
    },
    // 修改详情中表单
    gameclock() {
      this.NewtableVisible = true;
    },
  },
};
</script>

<style scoped lang="scss">
.box-search {
  margin-bottom: 20px;
  border: #fff;
  .list-top-btn {
    margin-bottom: 10px;
  }
}
.el-form {
  .el-form-item {
    margin-bottom: 0;
  }
  .el-button--primary {
    background-color: #5f84ff;
  }
}
.Pagination {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
</style>
<style>
.item .el-form-item__label {
  font-weight: 400;
}
.el-form .el-button--primary {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 80px;
  height: 36px;
}
.formm {
  width: 600px !important;
}
</style>
