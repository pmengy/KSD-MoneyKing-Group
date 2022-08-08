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
            background="linear-gradient(135deg,hsl(27deg 100% 63%),hsl(17deg 100% 56%))!important"
          >
            <span @click="openMask">
              <svg-icon
                icon-class="add"
                style="margin-right: 8px; font-size: 15px"
              ></svg-icon
              >新建</span
            >
            <!-- 弹窗 -->
            <!-- 新建工单的弹层 -->
            <el-dialog
              title="新增工单"
              :visible.sync="dialogFormVisible"
              :dialogFormVisible="dialogFormVisible"
              width="40%"
            >
              <el-form ref="form" label-width="100px">
                <!-- 设备编号 -->
                <el-form-item label="设备编号:">
                  <el-input placeholder="请输入"></el-input>
                </el-form-item>
                <!-- 工单类型 -->
                <el-form-item label="工单类型:">
                  <el-select style="width: 100%" placeholder="请选择活动区域">
                    <el-option label="区域一" value="shanghai"></el-option>
                  </el-select>
                </el-form-item>
                <!-- 补货数量 -->
                <el-row :gutter="20" type="flex" justify="space-around">
                  <el-col :span="9">
                    <div class="elclo">
                      补货数量：
                      <span
                        class="el-icon-document"
                        @click="innerVisible = true"
                        >补货清单</span
                      >
                    </div>
                  </el-col>
                  <el-col :span="10"></el-col>
                </el-row>
                <el-form-item label="运营人员：">
                  <el-select style="width: 100%" placeholder="请选择活动区域">
                    <el-option label="区域一" value="shanghai"></el-option>
                  </el-select>
                </el-form-item>
                <el-form-item label="备注：">
                  <el-input
                    style="width: 100%"
                    placeholder="1-300个字符"
                    type="textarea"
                    :rows="3"
                  />
                </el-form-item>
              </el-form>
              <el-dialog
                width="40%"
                title="补货清单"
                :visible.sync="innerVisible"
                append-to-body
              >
                <el-table :data="gridData">
                  <el-table-column
                    property="date"
                    label="日期"
                    width="150"
                  ></el-table-column>
                  <el-table-column
                    property="name"
                    label="姓名"
                    width="200"
                  ></el-table-column>
                  <el-table-column
                    property="address"
                    label="地址"
                  ></el-table-column>
                </el-table>
              </el-dialog>
              <span slot="footer" class="dialog-footer">
                <el-button @click="onclose">取 消</el-button>
                <el-button type="primary">确 定</el-button>
              </span>
            </el-dialog>
          </dkd-button>
          <dkd-button
            style="margin-left: 8px"
            background="#fbf4f0"
            color="#655b56"
            >工单配置</dkd-button
          >
        </div>
        <!-- 表格 -->
        <dkd-table
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
  </div>
</template>

<script>
import { searchTasks, getTaskStatus } from "@/api/task";
import DkdButton from "@/components/DkdButton";
import DkdTable from "@/components/DkdTable";

export default {
  name: "ABC",
  data() {
    return {
      formLabelWidth: "120px",
      formInline: {
        taskCode: "",
        status: "",
      },
      dialogFormVisible: false,
      innerVisible: false,
      form: {
        name: "",
        region: "",
        date1: "",
        date2: "",
        delivery: false,
        type: [],
        resource: "",
      },
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
    };
  },
  components: { DkdButton, DkdTable },
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
    openMask() {
      this.dialogFormVisible = true;
      console.log(111);
    },
    confirm() {
      console.log(2222);
      this.dialogFormVisible = false;
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
  .elclo {
    font-weight: 700;
    margin-bottom: 10px;
  }
  .elclo span {
    font-weight: 400;
    color: #7d9bff;
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
  text-align: right;
  vertical-align: middle;
  float: left;
  font-size: 14px;
  color: #606266;
  line-height: 40px;
  padding: 0 12px 0 0;
  -webkit-box-sizing: border-box;
  box-sizing: border-box;
}
.el-form .el-button--primary {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 80px;
  height: 36px;
}

.el-dialog .el-dialog__body {
  padding: 20px 20px 30px;
  color: #666;
}
</style>
