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
            background="linear-gradient(135deg,hsl(27deg 100% 63%),hsl(17deg 100% 56%))!important"
          >
            <span @click="addx">
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
          @compile="showcompile"
          @Dev="onRemove"
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
    <!-- 新建弹窗 -->
    <el-dialog :title="Textted" :visible.sync="dialogFormVisible">
      <el-form :model="form">
        <el-form-item label="活动名称" label-width="150px" class="formm">
          <el-input
            size="large"
            type="text"
            placeholder="请输入内容"
            maxlength="10"
            show-word-limit
            v-model="form.name"
            autocomplete="off"
          ></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="FormVisible">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import DkdButton from "@/components/DkdButton";
import DkdTable from "./components/body.vue";
import Toubu from "./components/TOUbu.vue";
import {
  getStrategyApi,
  getssStrategyApi,
  postStrategyApi,
  getYStrategyApi,
  getGStrategyApi,
  movedepartApi,
} from "@/api/index";

export default {
  data() {
    return {
      currentList: [], //列表数据
      add_X: true, // 决定添加还是修改
      Xg: "", //当前id
      pageIndex: "",
      totalPage: "",
      totalCount: "",
      dialogTableVisible: false, //修改弹窗
      dialogFormVisible: false, // 新增弹窗
      form: {
        name: "",
      },
      tableLabel: [{ label: "商品类型名称", width: "1400", prop: "className" }],
    };
  },
  components: { DkdButton, DkdTable, Toubu },
  created() {
    this.getStrategyApi();
  },
  computed: {
    Textted() {
      return this.add_X ? "添加部门" : "编辑部门";
    },
  },
  methods: {
    // 获取数据
    async getStrategyApi() {
      const res = await getStrategyApi();
      console.log(res);
      this.pageIndex = res.data.pageIndex;
      this.totalPage = res.data.totalPage;
      this.totalCount = res.data.totalCount;
      this.currentList = res.data.currentPageRecords;
    },
    // 搜索
    async Search(val) {
      if (val) {
        const res = await getssStrategyApi(val);
        console.log(res);
        this.currentList = res.data.currentPageRecords;
      } else {
        this.getStrategyApi();
      }
    },
    // 添加/删除
    async FormVisible() {
      // 添加状态
      if (this.add_X) {
        await postStrategyApi(this.form.name);
        this.getStrategyApi();
        this.dialogFormVisible = false;
        this.form.name = "";
      } else {
        await getGStrategyApi(this.form.name, this.Xg);
        this.getStrategyApi();
        this.dialogFormVisible = false;
        this.form.name = "";
        this.add_X = true;
      }
    },
    // 修改时弹框
    async showcompile(id) {
      console.log(id);
      this.add_X = false;
      this.Xg = id;
      this.dialogFormVisible = true;
    },
    // 下一页
    async nextPage() {
      const res = await getYStrategyApi({
        pageIndex: parseInt(this.pageIndex) + 1,
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
      const res = await getYStrategyApi({
        pageIndex: parseInt(this.pageIndex) - 1,
      });
      this.pageIndex = parseInt(this.pageIndex) - 1;
      this.currentList = res.data.currentPageRecords;
    },
    // 删除
    async onRemove(id) {
      try {
        this.$confirm("此操作将永久删除该类型, 是否继续?", "提示", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning",
        }).then(() => {
          movedepartApi(id);
          this.getStrategyApi();
          this.$message({
            type: "success",
            message: "删除成功!",
          });
        });
      } catch (e) {}
    },
    addx() {
      this.dialogFormVisible = true;
      this.add_X = true;
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
.formm {
  width: 600px !important;
}
</style>
