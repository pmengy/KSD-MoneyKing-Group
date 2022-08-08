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
            <el-date-picker
              type="daterange"
              range-separator="~"
              start-placeholder="开始日期"
              end-placeholder="结束日期"
            >
            </el-date-picker>
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
import { getOrderStatus } from "@/api/order";
import { getTaskStatus } from "@/api/task";
import DkdButton from "@/components/DkdButton";
import DkdTable from "@/components/DkdTable";

export default {
  data() {
    return {
      formInline: {
        innerCode: "",
        status: "",
      },
      currentList: [],
      taskStatusList: [],
      pageIndex: "",
      totalPage: "",
      totalCount: "",
      tableLabel: [
        { label: "订单编号", width: "118", prop: "innerCode" },
        { label: "商品名称", width: "150", prop: "skuName" },
        { label: "订单金额 (元)", width: "150", prop: "amount" },
        { label: "设备编号", width: "150", prop: "createType" },
        { label: "订单状态", width: "150", prop: "status" },
        { label: "创建日期", width: "160", prop: "createTime" },
      ],
    };
  },
  components: { DkdButton, DkdTable },
  created() {
    this.getTaskStatus();
    this.getOrderStatus();
  },

  methods: {
    // 获取全部工单列表
    async getOrderStatus(params) {
      const res = await getOrderStatus(params);
      console.log(res.currentPageRecords);
      console.log(res);
      res.data.currentPageRecords.forEach((item) => {
        if (item.status === 0) {
          item.status = "创建";
        }
        if (item.status === 1) {
          item.status = "支付成功";
        }
        if (item.status === 2) {
          item.status = "出货成功";
        } 
         if (item.status === 3){
          item.status = "出货失败";
        }
      });

      // console.log(res);
      this.currentList = res.data.currentPageRecords;
      this.pageIndex = res.data.pageIndex;
      this.totalPage = res.data.totalPage;
      this.totalCount = res.data.totalCount;
    },
    // 获取工单状态
    async getTaskStatus() {
      const res = await getTaskStatus();
      console.log(res);
      this.taskStatusList = res.data;
    },
    // 获取下一页数据
    async nextPage() {
      await this.getOrderStatus(parseInt(this.pageIndex) + 1);
    },
    // searchTasks
    async lastPage() {
      await this.getOrderStatus(parseInt(this.pageIndex) - 1);
    },
    // 搜索工单
    async search() {
      await getOrderStatus(this.formInline);
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
</style>
