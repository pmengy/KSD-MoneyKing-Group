<template>
  <div class="dashboard-container">
    <div class="app-container">
      <!-- 头部搜索栏 -->
      <header>
        <Search></Search>
      </header>
      <!-- 主体人员列表展示区域 -->
      <main>
        <!-- 列表栏 -->
        <el-card class="box-search" shadow="never">
          <!-- top按钮 -->
          <div class="addStaff">
            <KsdBtn
              ><svg-icon
                icon-class="add"
                style="margin-right: 8px; font-size: 16px"
              ></svg-icon
              >新建</KsdBtn
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
      </main>
    </div>
  </div>
</template>

<script>
import Search from "./components/FromSingle";
import KsdBtn from "./components/Button";
import DkdTable from "@/components/DkdTable";
import DkdButton from "@/components/DkdButton";
import { getUserListAPI } from "@/api/user";
export default {
  data() {
    return {
      currentList: [],
      taskStatusList: [],
      pageIndex: "",
      totalPage: "",
      totalCount: "",
      tableLabel: [
        { label: "人员名称", width: "230", prop: "taskCode" },
        { label: "归属区域", width: "260", prop: "innerCode" },
        { label: "角色", width: "280", prop: "taskType.typeName" },
        { label: "联系电话", width: "280", prop: "createType" },
      ],
      inquire: {
        pageIndex: 1, //页码
        pageSize: 10, //一页获取的数量
      },
    };
  },
  components: { Search, KsdBtn, DkdTable, DkdButton },

  created() {
    this.getUserList();
  },
  computed: {
    loginInfo() {
      return this.$store.state.user.loginForm;
    },
  },

  methods: {
    async getUserList() {
      const res = await getUserListAPI(this.inquire, this.loginInfo);
      console.log(res);
    },
  },
};
</script>

<style scoped lang="less">
main {
  .addStaff {
    padding-bottom: 20px;
  }
  /deep/.el-table {
    width: 100% !important;
  }
  /deep/.el-table--scrollable-x .el-table__body-wrapper {
    overflow-x: hidden;
  }
  // 下册分页按钮
  .Pagination {
    display: flex;
    justify-content: space-between;
  }
}
</style>
