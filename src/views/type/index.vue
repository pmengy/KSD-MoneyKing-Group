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
            <el-input v-model.trim="name" placeholder="请输入"></el-input>
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
            @click="addType"
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
        <el-table :data="currentList" style="width: 100%" empty-text="暂无数据">
          <el-table-column
            type="index"
            :index="indexMethod"
            label="序号"
            width="80"
          >
          </el-table-column>
          <el-table-column prop="name" label="型号名称" width="180">
          </el-table-column>
          <el-table-column prop="model" label="型号编码"> </el-table-column>
          <el-table-column prop="image" label="设备图片">
            <template slot-scope="scope"
              ><img
                style="width: 24px; height: 24px; border-radius: 24px"
                :src="scope.row.image || '@/assets/images/defaultImg.jpg'"
                alt=""
            /></template> </el-table-column
          ><el-table-column prop="vmRow" label="货道行"> </el-table-column
          ><el-table-column prop="vmCol" label="货道列"> </el-table-column>
          ><el-table-column prop="channelMaxCapacity" label="设备容量">
          </el-table-column>
          ><el-table-column label="操作"
            ><template slot-scope="scope">
              <el-button type="text" @click="editType(scope.row)"
                >修改</el-button
              >
              <el-button
                type="text"
                @click="delType(scope.row.typeId)"
                style="color: #ff5a5a"
                >删除</el-button
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
      <prop-card
        :visible.sync="visible"
        ref="propCard"
        @onClose="visible = false"
        @onConfirm="confirm"
      />
    </div>
  </div>
</template>

<script>
import DkdButton from "@/components/DkdButton";
import "@/assets/images/defaultImg.jpg";
import { getVmTypeList, delVmType } from "@/api/type";
import propCard from "./components/propCard/index.vue";
export default {
  data() {
    return {
      currentList: [],
      pageIndex: "",
      totalPage: "",
      totalCount: "",
      name: "",
      visible: false,
    };
  },
  components: { DkdButton, propCard },

  created() {
    this.getVmTypeList();
  },

  methods: {
    indexMethod(index) {
      return parseInt(this.currentIndex) - 9 + index;
    },
    // 获取设备类型列表
    async getVmTypeList(params) {
      const res = await getVmTypeList(params);
      this.currentList = res.data.currentPageRecords;
      this.pageIndex = res.data.pageIndex;
      this.totalPage = res.data.totalPage;
      this.totalCount = res.data.totalCount;
    },
    search() {
      this.getVmTypeList({ name: this.name });
    },
    editType(obj) {
      this.visible = true;
      this.$refs.propCard.vmInfo = obj;
    },
    addType() {
      this.visible = true;
      this.$refs.propCard.vmInfo = {
        name: "",
        vmCol: undefined,
        vmRow: undefined,
        channelMaxCapacity: undefined,
        model: "",
        image: "",
      };
    },
    async delType(id) {
      try {
        await delVmType(id);
        this.getVmTypeList();
        this.$message.success("删除设备成功");
      } catch (error) {
        this.$message.error("删除失败");
      }
    },
    // 获取下一页数据
    async nextPage() {
      await this.getVmTypeList({
        pageIndex: parseInt(this.pageIndex) + 1,
        name: this.name,
      });
    },
    // 获取上一页数据
    async lastPage() {
      await this.getVmTypeList({
        pageIndex: parseInt(this.pageIndex) - 1,
        name: this.name,
      });
    },
    confirm() {
      this.getVmTypeList();
    },
  },
  computed: {
    currentIndex() {
      return this.pageIndex * 10;
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
