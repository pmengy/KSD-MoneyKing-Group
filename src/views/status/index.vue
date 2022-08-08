<template>
  <div class="dashboard-container">
    <div class="app-container">
      <!-- 搜索 -->
      <el-card
        class="box-search"
        shadow="never"
        :body-style="{ padding: '10px 0px 10px 20px' }"
      >
        <el-form :inline="true" class="demo-form-inline">
          <el-form-item label="设备编号:" class="item">
            <el-input v-model="innerCode" placeholder="请输入"></el-input>
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

      <!-- 表格 -->
      <el-card class="box-search" shadow="never">
        <el-table
          :data="currentList"
          style="width: 1158px"
          :header-cell-style="{
            background: '#f3f6fb',
            color: '#666',
            height: '42px',
            'font-weight': 400,
          }"
          :highlight-current-row="true"
          empty-text="暂无数据"
        >
          <el-table-column
            type="index"
            :index="indexMethod"
            label="序号"
            width="80"
          ></el-table-column>
          <el-table-column prop="innerCode" label="设备编号" width="170">
          </el-table-column>
          <el-table-column prop="type.name" label="设备型号" width="150">
          </el-table-column>
          <el-table-column prop="node.name" label="详细地址" width="170">
          </el-table-column>
          <el-table-column
            prop="vmStatus"
            label="运营状态"
            width="170"
            :formatter="vmStatus"
          >
          </el-table-column>
          <el-table-column prop="status" label="设备状态" width="290">
            <template slot-scope="scope">
              <el-tag
                v-for="(item, index) in scope.row.status"
                :key="index"
                effect="dark"
                :hit="true"
                size="medium"
                style="margin-right: 10px"
                :type="item ? 'success' : 'warning'"
                ><template v-if="index === '10001'">{{
                  item ? "在线" : "离线"
                }}</template>
                <template v-else-if="index === '10002'">{{
                  item ? "货道" : "货道故障"
                }}</template>
                <template v-else>{{ item ? "传动轴" : "传动轴故障" }}</template>
              </el-tag>
            </template>
          </el-table-column>
          <el-table-column label="操作" width="100">
            <template slot-scope="scope">
              <el-button
                type="text"
                @click="
                  getVmInfo(
                    scope.row.innerCode,
                    scope.row.vmType,
                    scope.row.nodeId,
                    scope.row.createUserId
                  )
                "
                >查看详情</el-button
              >
            </template>
          </el-table-column>
        </el-table>
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
      <el-dialog title="设备详情" :visible.sync="dialogVisible" width="50%">
        <el-row :gutter="20">
          <el-col :span="6"
            ><div class="grid-content bg-purple">销售量:</div></el-col
          >
          <el-col :span="6"
            ><div class="grid-content bg-purple">销售额:</div></el-col
          >
          <el-col :span="6"
            ><div class="grid-content bg-purple">补货次数:</div></el-col
          >
          <el-col :span="6"
            ><div class="grid-content bg-purple">维修次数:</div></el-col
          >
        </el-row>
        <p>商品销量 (月)</p>
        <div class="salesList">
          <span v-for="(item, index) in goodsSaleList" :key="index"
            >{{
              item.skuName.length > 4
                ? item.skuName.substring(0, 4) + "..."
                : item.skuName
            }}
            : {{ item.count }}</span
          >
        </div>
        <div
          style="text-align: center; margin-bottom: 10px"
          v-if="goodsSaleList.length === 0"
        >
          当前设备未销售商品
        </div>
      </el-dialog>
    </div>
  </div>
</template>

<script>
import DkdButton from "@/components/DkdButton";
import { getVmList, getSalesVolume } from "@/api/status";
export default {
  name: "VmStatus",
  components: { DkdButton },
  data() {
    return {
      innerCode: "",
      currentList: [],
      pageIndex: "",
      totalPage: "",
      totalCount: "",
      dialogVisible: false,
      goodsSaleList: [],
    };
  },

  created() {
    this.getVmList();
  },

  methods: {
    async getVmList(params) {
      const res = await getVmList(params);
      this.currentList = res.data.currentPageRecords;
      this.pageIndex = res.data.pageIndex;
      this.totalPage = res.data.totalPage;
      this.totalCount = res.data.totalCount;
    },
    indexMethod(index) {
      return parseInt(this.currentIndex) - 9 + index;
    },
    vmStatus(row, column, cellValue) {
      if (column.property === "vmStatus") {
        switch (cellValue) {
          case 1:
            return "运营";
          case 0:
            return "未投放";
          case 3:
            return "撤机";
          default:
            return "";
        }
      }
    },
    // 获取下一页数据
    async nextPage() {
      await this.getVmList({
        pageIndex: parseInt(this.pageIndex) + 1,
        innerCode: this.innerCode,
      });
    },
    // 获取下一页数据
    async lastPage() {
      await this.getVmList({
        pageIndex: parseInt(this.pageIndex) - 1,
        innerCode: this.innerCode,
      });
    },
    // 搜索工单
    async search() {
      await this.getVmList({ innerCode: this.innerCode });
    },
    // 查看设备详情
    getVmInfo(innerCode, vmType, nodeId, createUserId) {
      this.dialogVisible = true;
      const params = { vmType, nodeId, createUserId };
      this.getSalesVolume(innerCode, "2022-08-01", "2022-08-07", params);
      // this.getOrderCount(
      //   "2022-08-01",
      //   "2022-08-01",
      //   innerCode
      // );
    },
    // 获取当前设备的商品销量
    async getSalesVolume(innerCode, start, end, params) {
      const res = await getSalesVolume(innerCode, start, end, params);
      this.goodsSaleList = res.data;
    },
    // async getOrderCount(start, end, innerCode) {
    //   const res = await getOrderCount(start, end, innerCode);
    //   console.log(res);
    // },
  },
  computed: {
    currentIndex() {
      return this.pageIndex * 10;
    },
  },
};
</script>

<style scoped lang="scss">
.salesList {
  display: flex;
  width: 100%;
  justify-content: flex-start;
  flex-wrap: wrap;
  span {
    height: 60px;
    width: 150px;
    border: 1px solid #eee;
    padding: 20px 20px;
    text-align: start;
  }
}
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
<style lang="scss">
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
.el-dialog {
  border-radius: 10px;
}
.el-row {
  height: 54px;
  background-color: #f4f6fb;
  margin-bottom: 20px;
  padding-left: 10px;
  line-height: 54px;
  &:last-child {
    margin-bottom: 0;
  }
}

.el-col {
  border-radius: 4px;
}
.el-dialog__body {
  padding: 10px 30px;
  .el-dialog__title {
    font-weight: 700;
  }
}
.grid-content {
  border-radius: 4px;
  min-height: 36px;
}
.row-bg {
  padding: 10px 0;
  background-color: #f9fafc;
}
</style>
