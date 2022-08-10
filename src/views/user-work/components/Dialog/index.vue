<template>
  <el-dialog
    title="人员详情"
    :visible.sync="Visible"
    width="100%"
    :before-close="handleClose"
  >
    <!-- 人员详情 -->
    <div class="staffInfo">
      <div class="up">
        <p>
          人员名称：<span>{{ staffTaskInfo.userName }}</span>
        </p>
        <p>
          角色：<span>{{ staffTaskInfo.roleName }}</span>
        </p>
        <p>
          联系电话：<span>{{ staffTaskInfo.mobile }}</span>
        </p>
      </div>
      <div class="dwon">
        负责区域： <span>{{ staffTaskInfo.regionName }}</span>
      </div>
    </div>
    <div class="taskLis">
      <el-table
        :data="staffTaskList"
        border
        style="width: 100%"
        :cell-style="{ height: '42px' }"
        center
        :header-cell-style="{
          background: '#f3f6fb',
          color: '#666',
          height: '42px',
          'font-weight': 400,
        }"
      >
        <el-table-column width="100" prop="time"></el-table-column>
        <el-table-column
          property="total"
          label="总工单数"
          width="120"
        ></el-table-column>
        <el-table-column
          property="cancelCount"
          label="拒绝工单"
          width="120"
        ></el-table-column>
        <el-table-column
          property="workCount"
          label="完成工单"
          width="120"
        ></el-table-column>
        <el-table-column
          property="progressTotal"
          label="进行中工单"
          width="120"
        ></el-table-column>
      </el-table>
    </div>
  </el-dialog>
</template>

<script>
import time from "./getTimeFormat.js";
import { getTaskCountAPI } from "@/api/user";
export default {
  name: "userTaskDialog",
  data() {
    return {
      staffTaskList: [],
    };
  },
  props: {
    // 控制弹层是否展示
    Visible: {
      type: Boolean, //
    },
    staffTaskInfo: {
      type: Object, //
      required: true,
    },
  },

  created() {},
  watch: {
    // 监视弹出层是否关闭，如果打开就发ing求获取数据
    Visible: {
      handler(newVal) {
        if (newVal) {
          this.getTaskCount();
        }
      },
      immediate: true,
    },
  },
  computed: {
    yearQuery() {
      return {
        userId: this.staffTaskInfo.userId,
        start: time.yearS,
        end: time.yearE,
      };
    },
    monthQuery() {
      return {
        userId: this.staffTaskInfo.userId,
        start: time.monthS,
        end: time.monthE,
      };
    },
    weekQuery() {
      return {
        userId: this.staffTaskInfo.userId,
        start: time.weekS,
        end: time.weekE,
      };
    },
  },
  methods: {
    handleClose() {
      this.staffTaskList = [];
      this.$emit("onClose");
    },
    async getTaskCount() {
      //   this.yearQuery.userId = this.staffTaskInfo.userId;
      const yearCount = await getTaskCountAPI(this.yearQuery);
      //   console.log(yearCount.data);
      yearCount.data.time = "本年";
      const monthCount = await getTaskCountAPI(this.monthQuery);
      monthCount.data.time = "本月";

      console.log(monthCount.data);
      const weekCount = await getTaskCountAPI(this.weekQuery);
      weekCount.data.time = "本周";

      //   console.log(weekCount.data);
      this.staffTaskList = [weekCount.data, monthCount.data, yearCount.data];
    },
  },
};
</script>

<style lang="less" scoped>
/deep/.el-dialog {
  width: 42% !important;
  padding: 0 !important;
  border-radius: 20px;
  .el-dialog__body {
    padding: 0 !important;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    .taskLis {
      margin-top: 30px;
      width: 90%;
      border-radius: 10px;
      .el-table--scrollable-x .el-table__body-wrapper {
        overflow-x: clip !important;
      }
      .el-table {
        margin-bottom: 40px;
      }
    }
  }
}
.staffInfo {
  width: 90%;
  height: 86px;
  padding: 19px 19px 0;
  background: #f3f6fb;
  padding: 10px;
  padding-right: 50px;
  white-space: nowrap;
  overflow: hidden;
  .up {
    display: flex;
    justify-content: space-between;
    // width: 100%;
  }
}
</style>
