<template>
  <div class="dashboard-container">
    <div class="app-container">
      <!-- 头部搜索区域 -->
      <header>
        <SearchDbl
          @searchValue="searchValue"
          :List="roleList"
          valueFirst="人员搜索"
          valueSecond="角色"
        />
      </header>

      <!-- 表格主体区域 -->
      <main>
        <Tabel
          :currentList="staffTaskList"
          :tableLabel="tableLabel"
          :currentIndex="pageIndex * 10"
          @updataVisible="updataVisible"
        />
        <Pagination
          :totalCount="totalCount"
          :pageIndex="pageIndex"
          :totalPage="totalPage"
          @lastPage="lastPage"
          @nextPage="nextPage"
        />
      </main>
      <Dialog
        :visible="visible"
        :staffTaskInfo="staffTaskInfo"
        @onClose="onClose"
      />
    </div>
  </div>
</template>

<script>
import SearchDbl from "../user/components/FromDbl";
import Tabel from "./components/DkdTable";
import Pagination from "./components/Pagination";
import Dialog from "./components/Dialog";
import { getRoleIdAPI, getStaffTaskListAPI, getUserInfo } from "@/api/user";
export default {
  components: { SearchDbl, Tabel, Pagination, Dialog },
  data() {
    return {
      pageIndex: "", //页码
      totalPage: "", //总页数
      totalCount: "", //记录的总条数
      roleList: [], //存储角色列表
      queryInfo: {
        pageIndex: 1,
        pageSize: 10,
      },
      staffTaskList: [], //人员工作量列表数据
      tableLabel: [
        { label: "人员名称", width: "200", prop: "userName" },
        { label: "角色", width: "200", prop: "roleName" },
        { label: "联系电话", width: "200", prop: "mobile" },
        { label: "完成工单(本月)", width: "200", prop: "workCount" },
        { label: "进行中工单", width: "160", prop: "progressTotal" },
        { label: "拒绝工单", width: "100", prop: "cancelCount" },
      ],
      visible: false, // 控制弹层是否展示
      staffTaskInfo: {}, //存储点击的当前人员信息
    };
  },

  created() {
    this.getRoleId();
    this.getStaffTaskList();
  },

  methods: {
    // 获取角色列表
    async getRoleId() {
      const { data } = await getRoleIdAPI();
      this.roleList = data;
      const res = await getStaffTaskListAPI(this.queryInfo);
    },
    // 获取工作量列表数据
    async getStaffTaskList() {
      const { data } = await getStaffTaskListAPI(this.queryInfo);
      this.pageIndex = data.pageIndex;
      this.pageSize = data.pageSize;
      this.totalCount = data.totalCount;
      this.totalPage = data.totalPage;
      this.staffTaskList = data.currentPageRecords;
    },
    // 搜索框的数据
    searchValue(info) {
      // 将搜索框的值传解构出来放入查询对象中，再进行请求查询
      this.queryInfo = { ...this.queryInfo, ...info };
      this.getStaffTaskList();
    },
    //子组件点击查看详情
    async updataVisible(info) {
      const { data } = await getUserInfo(info.userId);
      this.staffTaskInfo = data;
      this.visible = true;
    },
    // 上一页
    lastPage() {
      this.queryInfo.pageIndex--;
      this.getStaffTaskList();
    },
    // 下一页
    nextPage() {
      this.queryInfo.pageIndex++;
      this.getStaffTaskList();
    },
    // 关闭弹层
    onClose() {
      this.visible = false;
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
