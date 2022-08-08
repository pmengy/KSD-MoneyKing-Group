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
            @click="DkBbut"
            >工单配置</dkd-button
          >
        </div>
        <!-- 表格 -->
        <dkd-table
          :currentList="currentList"
          :tableLabel="tableLabel"
          :currentIndex="pageIndex * 10"
          @compile="showcompile"
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
      ref="Refdept"
      :Visible.sync="dialogVisible"
      :Datastate.sync="Datastate"
      @onClose="dialogVisible = false"
      @Acharm="adddialog"
      @Bcharm="bdddialog"
    ></DataTable>
    <!-- 上传弹层 -->
    <el-dialog title="提示" :visible.sync="dialogVisibleC" width="30%">
      <el-upload
        class="upload-demo"
        action=""
        :limit="1"
        :show-file-list="false"
        :before-upload="beforeAvatarUpload"
        accept=".xls, .xlsx"
        :http-request="handlePictureCardPreview"
      >
        <el-button size="small" type="primary" class="buttclass"
          >点击上传</el-button
        >
        <div slot="tip" class="el-upload__tip">
          只能上传xls/xlsx文件,且不超过1MB
        </div>
      </el-upload>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisibleC = false">取 消</el-button>
        <el-button type="primary" @click="addFileList">确 定</el-button>
      </span>
    </el-dialog>
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
  postStrategyApiSC,
} from "@/api/index";

export default {
  name: "sku",
  data() {
    return {
      formInline: {
        taskCode: "",
        status: "",
      },
      fileList: [],
      file: "",
      currentList: [],
      pageIndex: "",
      totalPage: "",
      totalCount: "",
      dialogVisible: false, //修改添加弹层
      dialogVisibleC: false, //上传弹层
      Datastate: true, //判断修改还是添加
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
      this.currentList = res.data.currentPageRecords;
      this.pageIndex = res.data.pageIndex;
      this.totalPage = res.data.totalPage;
      this.totalCount = res.data.totalCount;
      console.log(this.currentList);
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
    // 新增弹框展示
    Layerthickness() {
      this.dialogVisible = true;
      this.Datastate = true;
    },
    // 修改弹框展示
    showcompile(val) {
      this.dialogVisible = true;
      this.Datastate = false;
      console.log(val);
      this.$refs.Refdept.getDeptByval(val);
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
    // 修改完成
    bdddialog() {
      this.getStrategyApiF();
      this.dialogVisible = false;
      this.$notify({
        title: "成功",
        message: "修改商品成功",
        type: "success",
        position: "bottom-right",
      });
    },
    // 上传文件弹框
    DkBbut() {
      this.dialogVisibleC = true;
    },
    // 确认上传文件
    async addFileList() {
      console.log(this.file);
      try {
        var formData = new FormData();
        formData.append("fileName", this.file.file);
        console.log(formData);
        await postStrategyApiSC(formData);
        this.dialogVisibleC = false;
        this.$message.success("导入成功");
      } catch (err) {
        console.log(err);
      }
    },
    // 限制文件大小
    beforeAvatarUpload(file) {
      console.log(file);
      const isLt2kb = file.size / 1024 / 1024 < 1;
      if (!isLt2kb) {
        this.$message.error("上传文件大小不能超过 1MB!");
      }
      return isLt2kb;
    },
    async handlePictureCardPreview(file) {
      this.file = file;
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
.Pagination {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.buttclass {
  background-color: #5f84ff;
  width: 150px;
  height: 40px;
}
.el-upload__tip {
  font-size: 20px;
}
.upload-demo {
  text-align: center;
  width: 100%;
}
</style>
