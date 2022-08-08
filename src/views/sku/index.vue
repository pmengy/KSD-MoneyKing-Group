<template>
  <div class="dashboard-container">
    <div class="app-container">
      <!-- 搜索栏 -->
      <el-card class="box-card">
        <Toubu @search="Search" />
      </el-card>
      <!-- 列表栏 -->
      <el-card class="box-search" shadow="never">
        <!-- top按钮 -->
        <div class="list-top-btn">
          <dkd-button
            @click="Layerthickness"
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
    <!-- 弹层 -->
    <DataTable
      :Visible.sync="dialogVisible"
      @onClose="dialogVisible = false"
      @Acharm="adddialog"
    ></DataTable>
  </div>
</template>

<script>
import DkdButton from "@/components/DkdButton";
import DkdTable from "./components/body.vue";
import Toubu from "./components/TOUbu.vue";
import DataTable from "./components/datatoto.vue";
import {
  getStrategyApiF,
  getStrategyApiFF,
  getssStrategyApiF,
} from "@/api/index";

export default {
  name: "sku",
  data() {
    return {
      formInline: {
        taskCode: "",
        status: "",
      },
      currentList: [],
      pageIndex: "",
      totalPage: "",
      totalCount: "",
      dialogVisible: false,
      tableLabel: [
        { label: "品牌", width: "200", prop: "brandName" },
        { label: "规格", width: "200", prop: "unit" },
        {
          label: "商品价格",
          width: "200",
          prop: "price",
        },
        { label: "商品类型", width: "200", prop: "skuClass.className" },
        { label: "创建日期", width: "200", prop: "createTime" },
      ],
    };
  },
  components: { DkdButton, DkdTable, Toubu, DataTable },
  created() {
    this.getStrategyApiF();
  },

  methods: {
    // 获取数据
    async getStrategyApiF() {
      const res = await getStrategyApiF();
      console.log(res);
      this.currentList = res.data.currentPageRecords;
      this.pageIndex = res.data.pageIndex;
      this.totalPage = res.data.totalPage;
      this.totalCount = res.data.totalCount;
    },
    // 下一页
    async nextPage() {
      const res = await getStrategyApiFF({
        pageIndex: parseInt(this.pageIndex) + 1,
        taskCode: this.formInline.taskCode,
        status: this.formInline.status,
      });
      this.currentList = res.data.currentPageRecords;
      this.pageIndex = parseInt(this.pageIndex) + 1;
    },
    // 获取上一页数据
    async lastPage() {
      if (parseInt(this.pageIndex) === 1) {
        return this.$message({
          showClose: true,
          message: "没有上一页啦！！",
          type: "warning",
        });
      }
      const res = await getStrategyApiFF({
        pageIndex: parseInt(this.pageIndex) - 1,
      });
      this.pageIndex = parseInt(this.pageIndex) - 1;
      this.currentList = res.data.currentPageRecords;
    },
    // 搜索
    async Search(val) {
      if (val) {
        const res = await getssStrategyApiF(val);
        console.log(res);
        this.currentList = res.data.currentPageRecords;
      } else {
        this.getStrategyApiF();
      }
    },
    // 新增
    Layerthickness() {
      this.dialogVisible = true;
    },
    // 新建完成
    adddialog() {
      this.getStrategyApiF();
      this.dialogVisible = false;
      this.$notify({
        title: "成功",
        message: "添加商品成功",
        type: "success",
        position: "bottom-right",
      });
    },
  },
};
</script>

<style scoped lang="scss">
.box-search {
  margin-bottom: 20px;
  margin-top: 30px;
  border: #fff;
  .list-top-btn {
    margin-bottom: 10px;
  }
}
.el-form {
  .el-form-item {
    width: 260px;
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
<style scoped>
.item .el-form-item__label {
  font-weight: 400;
}
.el-form {
  margin-right: 700px;
  height: 40px;
}
.el-form .el-button--primary {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 80px;
  height: 36px;
}
.box-card {
  width: 100%;
}
.el-card__body {
  margin: 30px, 0, 30px, 0;
}
</style>
