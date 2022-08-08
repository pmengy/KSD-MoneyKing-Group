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
          <dkd-button
            style="margin-left: 8px"
            background="#fbf4f0"
            color="#655b56"
            >批量操作</dkd-button
          >
        </div>
        <el-table
          ref="multipleTable"
          :data="tableData"
          tooltip-effect="dark"
          :header-cell-style="{
            background: '#f3f6fb',
            color: '#666',
            height: '42px',
            'font-weight': 400,
          }"
          empty-text="暂无数据"
          style="width: 1158px"
        >
          <el-table-column type="selection" width="55"></el-table-column>
          <el-table-column
            type="index"
            :index="indexMethod"
            label="序号"
            width="80"
          >
          </el-table-column>
          <el-table-column prop="innerCode" label="设备编号" width="170">
          </el-table-column>
          <el-table-column prop="type.name" label="设备型号" width="170">
          </el-table-column>
          <el-table-column
            prop="node.name"
            label="详细地址"
            show-overflow-tooltip
          ></el-table-column>
          <el-table-column
            prop="ownerName"
            label="合作商"
            width="170"
          ></el-table-column>
          <el-table-column
            prop="vmStatus"
            label="设备状态"
            width="170"
            :formatter="vmStatus"
          ></el-table-column>
          <el-table-column label="操作" width="150">
            <template slot-scope="scope">
              <el-button type="text">货道</el-button>
              <el-button type="text">策略</el-button>
              <el-button
                type="text"
                @click="editVmNode(scope.row.id)"
                >修改</el-button
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
      <el-dialog title="提示" :visible.sync="dialogVisible" width="40%">
        <span>这是一段信息</span>
        <span slot="footer" class="dialog-footer">
          <el-button @click="dialogVisible = false">取 消</el-button>
          <el-button type="primary" @click="dialogVisible = false"
            >确 定</el-button
          >
        </span>
      </el-dialog>
    </div>
  </div>
</template>

<script>
import { getVmList } from "@/api/status";
import DkdButton from "@/components/DkdButton";
export default {
  data() {
    return {
      tableData: [],
      multipleSelection: [],
      pageIndex: "",
      totalPage: "",
      totalCount: "",
      innerCode: "",
      dialogVisible: false,
    };
  },
  components: { DkdButton },
  created() {
    this.getVmList();
  },
  computed: {
    currentIndex() {
      return this.pageIndex * 10;
    },
  },
  methods: {
    indexMethod(index) {
      return parseInt(this.currentIndex) - 9 + index;
    },
    async getVmList(params) {
      const res = await getVmList(params);
      this.tableData = res.data.currentPageRecords;
      this.pageIndex = res.data.pageIndex;
      this.totalPage = res.data.totalPage;
      this.totalCount = res.data.totalCount;
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
    // 获取上一页数据
    async lastPage() {
      await this.getVmList({
        pageIndex: parseInt(this.pageIndex) - 1,
        innerCode: this.innerCode,
      });
    },
    // 搜索设备
    async search() {
      await this.getVmList({ innerCode: this.innerCode });
    },
    editVmNode(id) {
      this.dialogVisible = true;
      console.log(id);
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
