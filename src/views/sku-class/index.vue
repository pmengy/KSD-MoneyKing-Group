<template>
  <div class="dashboard-container">
    <div class="app-container">
      <!-- 搜索栏 -->
      <el-card class="box-card">
        <Toubu />
      </el-card>
      <!-- 列表栏 -->
      <el-card class="box-search" shadow="never">
        <!-- top按钮 -->
        <div class="list-top-btn">
          <dkd-button
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
        </div>
        <!-- 表格 -->
        <dkd-table
          :currentList="currentList"
          :tableLabel="tableLabel"
          :currentIndex="pageIndex * 10"
        />
      </el-card>
    </div>
  </div>
</template>

<script>
import DkdButton from "@/components/DkdButton";
import DkdTable from "./components/body.vue";
import Toubu from "./components/TOUbu.vue";
import { getStrategyApi } from "@/api/index";

export default {
  data() {
    return {
      currentList: [], //列表数据
      pageIndex: "", //实现换页页码不变
      tableLabel: [
        { label: "商品类型名称", width: "1400", prop: "className" },
      ],
    };
  },
  components: { DkdButton, DkdTable, Toubu },
  created() {
    this.getStrategyApi();
  },

  methods: {
    // 获取数据
    async getStrategyApi() {
      const res = await getStrategyApi();
      console.log(res);
      this.currentList = res.data.currentPageRecords;
      // console.log(this.bodyList);
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
