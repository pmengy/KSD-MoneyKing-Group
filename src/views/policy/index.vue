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
          @fine="GAGAfine"
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
    <!-- 添加删除弹层 -->
    <el-dialog :title="Textted" :visible.sync="dialogFormVisible">
      <el-form :model="form">
        <el-form-item label="策略名称" label-width="150px" class="formm">
          <el-input
            size="large"
            type="text"
            placeholder="请输入内容"
            maxlength="10"
            show-word-limit
            v-model="form.policyName"
            autocomplete="off"
          ></el-input>
        </el-form-item>
        <el-form-item label="策略方案" label-width="150px" class="formm">
          <el-input
            size="large"
            type="text"
            placeholder="请输入内容"
            maxlength="10"
            show-word-limit
            v-model="form.discount"
            autocomplete="off"
          ></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="cancel">取 消</el-button>
        <el-button type="primary" @click="FormVisible">确 定</el-button>
      </div>
    </el-dialog>
    <!-- 详情弹出层 -->
    <Layerthickness
      ref="Layerth"
      :Visible.sync="dialogVisible"
      @onClose="onClose"
    ></Layerthickness>
  </div>
</template>

<script>
import DkdButton from "@/components/DkdButton";
import DkdTable from "./components/body.vue";
import Toubu from "./components/TOUbu.vue";
import Layerthickness from "./components/Layerthickness.vue";
import {
  getmachineApi,
  getSmachineApi,
  postStrategyApiF,
  GgetStrategyApi,
  moveStrategyApi,
  getmachineApiF,
} from "@/api/index";

export default {
  data() {
    return {
      Xg: "", //当前id
      add_X: true, // 决定添加还是修改
      currentList: [], //列表数据
      fineList: [], //详情表数据
      pageIndex: "", //实现换页页码不变
      dialogFormVisible: false, // 控制弹窗
      dialogVisible: false, //控制详情页
      totalPage: "",
      totalCount: "",
      pageIndex: "",
      form: {
        policyName: "",
        discount: "",
      },
      tableLabel: [
        { label: "策略名称", width: "450", prop: "policyName" },
        { label: "策略方案", width: "450", prop: "discount" },
        { label: "创建日期", width: "250", prop: "updateTime" },
      ],
    };
  },
  components: { DkdButton, DkdTable, Toubu, Layerthickness },
  created() {
    this.getmachineApi();
  },
  computed: {
    Textted() {
      return this.add_X ? "添加部门" : "修改政策";
    },
  },
  methods: {
    // 获取数据
    async getmachineApi() {
      const res = await getmachineApi();
      console.log(res);
      this.pageIndex = res.data.pageIndex;
      this.totalPage = res.data.totalPage;
      this.totalCount = res.data.totalCount;
      this.currentList = res.data.currentPageRecords;
      // console.log(this.bodyList);
    },
    // 搜索
    async Search(val) {
      if (val) {
        const res = await getSmachineApi(val);
        console.log(res);
        this.currentList = res.data.currentPageRecords;
      } else {
        this.getmachineApi();
      }
    },
    // 新建弹出
    addx() {
      this.dialogFormVisible = true;
      this.add_X = true;
    },
    // 取消
    cancel() {
      this.dialogFormVisible = false;
      this.form = {
        policyName: "",
        discount: "",
      };
    },
    // 修改弹出
    async showcompile(val) {
      console.log(val);
      this.add_X = false;
      this.Xg = val.policyId;
      this.dialogFormVisible = true;
      this.form = {
        policyName: val.policyName,
        discount: val.discount,
      };
    },
    // 添加/修改
    async FormVisible() {
      // 添加状态
      if (this.add_X) {
        await postStrategyApiF(this.form);
        this.getmachineApi();
        this.dialogFormVisible = false;
        this.form = {
          policyName: "",
          discount: "",
        };
      } else {
        await GgetStrategyApi(this.form, this.Xg);
        this.getmachineApi();
        this.dialogFormVisible = false;
        this.form = {
          policyName: "",
          discount: "",
        };
        this.add_X = true;
      }
    },
    // 删除
    async onRemove(id) {
      try {
        this.$confirm("此操作将永久删除该政策, 是否继续?", "提示", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning",
        }).then(() => {
          console.log(id);
          moveStrategyApi(id);
          this.getmachineApi();
          this.$message({
            type: "success",
            message: "删除成功!",
          });
        });
      } catch (e) {}
    },
    // 下一页
    async nextPage() {
      const res = await getmachineApiF({
        pageIndex: parseInt(this.pageIndex) + 1,
      });
      this.currentList = res.data.currentPageRecords;
      this.pageIndex = parseInt(this.pageIndex) + 1;
      console.log(this.currentList);
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
      const res = await getmachineApiF({
        pageIndex: parseInt(this.pageIndex) - 1,
      });
      this.pageIndex = parseInt(this.pageIndex) - 1;
      this.currentList = res.data.currentPageRecords;
      console.log(this.currentList);
    },
    // 展开详情
    GAGAfine(val) {
      this.dialogVisible = true;
      this.$refs.Layerth.getThemachineApi(val)
    },
    // 关闭详情
    onClose() {
      this.dialogVisible = false;
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
.el-form-item__content {
  line-height: 40px;
  position: relative;
  margin-bottom: 20px;
  font-size: 14px;
}
</style>
