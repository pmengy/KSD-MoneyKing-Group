<template>
  <div class="dashboard-container">
    <div class="app-container">
      <!-- 头部搜索栏 -->
      <header>
        <Search @searchInfo="searchInfo"></Search>
      </header>
      <!-- 主体人员列表展示区域 -->
      <main>
        <!-- 列表栏 -->
        <el-card class="box-search" shadow="never">
          <!-- top按钮 -->
          <div class="addStaff">
            <KsdBtn @click.native="addStaff"
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
            @delStaff="delStaff"
            @updateInfo="updateInfo"
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
        <!-- 新建人员弹出层 -->
        <PropCard :visible="visible" @onClose="onClose" :userInfo="userInfo" />
      </main>
    </div>
  </div>
</template>

<script>
import Search from "./components/FromSingle";
import KsdBtn from "./components/Button";
import DkdTable from "./components/DkdTable";
import DkdButton from "@/components/DkdButton";
import PropCard from "./components/propCard";
import { getUserListAPI, delStaffAPI, getUserInfo } from "@/api/user";
export default {
  name: "userList",
  data() {
    return {
      currentList: [], //需要渲染的数组
      pageIndex: "", //页码
      totalPage: "", //总页数
      totalCount: "", //记录的总条数
      tableLabel: [
        { label: "人员名称", width: "230", prop: "userName" },
        { label: "归属区域", width: "260", prop: "regionName" },
        { label: "角色", width: "280", prop: "role.roleName" },
        { label: "联系电话", width: "200", prop: "mobile" },
      ],
      // 查询参数
      inquire: {
        pageIndex: 1, //页码
        pageSize: 10, //一页获取的数量
      },
      visible: false, //控制弹层的显示
      userInfo: {}, //回显到弹层的对象
    };
  },
  components: { Search, KsdBtn, DkdTable, DkdButton, PropCard },

  created() {
    this.getUserList();
  },
  computed: {
    loginInfo() {
      return this.$store.state.user.loginForm;
    },
  },

  methods: {
    indexMethod(index) {
      return parseInt(this.currentIndex) - 9 + index;
    },
    formatData(row, column, cellValue) {
      if (column.property === "createType") {
        if (cellValue === 1) {
          return "自动";
        }
        return "手动";
      }
      if (column.property === "createTime") {
        return dayjs(cellValue).format("YYYY.MM.DD HH:mm:ss");
      }
      return cellValue;
    },
    async getUserList() {
      const { data } = await getUserListAPI(this.inquire, this.loginInfo);
      // 将数据保存
      this.currentList = data.currentPageRecords;
      // 保存页码
      this.pageIndex = data.pageIndex;
      // 保存总记录条数
      this.totalCount = data.totalCount;
      // 保存总页数
      this.totalPage = data.totalPage;
    },
    //子组件传过来的自定义事件，触发搜索，接收输入框中写入的信息
    searchInfo(userName) {
      // 将从子组件获取到的userName添加到查询对象中
      this.inquire.userName = userName;
      // 重新发起请求获取新数据覆盖当前页面
      this.getUserList();
    },
    //上一页
    lastPage() {
      // 将请求的页码数++，重新按新参数进行请求，覆盖原数据
      this.inquire.pageIndex--;
      this.getUserList();
    },
    // 下一页
    nextPage() {
      // 将请求的页码数++，重新按新参数进行请求，覆盖原数据
      this.inquire.pageIndex++;
      this.getUserList();
    },
    onClose() {
      console.log("关闭");
      this.getUserList();
      console.log("关闭");
      this.visible = false;
      console.log("关闭");
      this.userInfo = {};
      console.log("关闭");
    },
    // 新增人员
    addStaff() {
      // console.log(2222);
      // 展开弹层
      this.visible = true;
    },
    // 子组件触发删除
    async delStaff(id) {
      try {
        await this.$confirm("确定删除, 是否继续?", "提示", {
          confirmButtonText: "删除",
          cancelButtonText: "取消",
          type: "warning",
        });
        const data = await delStaffAPI(id);
        if (data) {
          this.currentList = this.currentList.filter((item) => item.id !== id);
          this.onClose();
          this.$message.success("删除成功！");
        } else {
          this.$message.fail("删除失败！");
        }
      } catch (error) {
        this.$message({
          type: "info",
          message: "已取消删除",
        });
      }
    },
    // 触发更新修改
    async updateInfo(id) {
      const { data } = await getUserInfo(id);
      // 展开弹层
      this.visible = true;
      this.userInfo = data;
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
