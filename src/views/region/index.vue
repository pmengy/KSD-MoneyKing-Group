<template>
  <div class="dashboard-container">
    <div class="app-container">
      <el-card class="box-card">
        <div class="box-head">
          <p>区域搜索:</p>
          <el-input v-model="input" class="input" placeholder="请输入内容" />
          <DkdButton @click="search">
            <span>
              <svg-icon
                icon-class="search"
                style="margin-right: 8px; font-size: 15px"
              />查询</span
            >
          </DkdButton>
        </div>
      </el-card>
      <el-card class="box-card">
        <div class="box-foot">
          <DkdButton
            background="linear-gradient(135deg,hsl(27deg 100% 63%),hsl(17deg 100% 56%))!important"
            class="addBtn"
            @click="add"
          >
            <span>
              <svg-icon
                icon-class="add"
                style="margin-right: 8px; font-size: 15px"
              />新建</span
            >
          </DkdButton>
          <DkdTable
            :table-label="tableLabel"
            :current-list="currentList"
            :current-index="pageIndex * 10"
            :grid-data="gridData"
            :change-list="changeList"
            @getInfoo="getInfo"
            @changee="change"
            @confirmm="confirm"
            @dell="del"
            @onClose="onClose"
            @addConfirm="addConfirm"
            :newDialogFormVisible="dialogFormVisible"
          />
          <div class="page">
            <p class="text">
              共{{ list.totalCount }}条记录 第{{ list.pageIndex }}/{{
                list.totalPage
              }}页
            </p>
            <div class="btn">
              <el-button
                :disabled="pageIndex === '1' ? true : false"
                @click.native="last"
                >上一页</el-button
              >
              <el-button
                :disabled="pageIndex === list.totalPage ? true : false"
                @click.native="next"
                >下一页</el-button
              >
            </div>
          </div>
        </div>
      </el-card>
    </div>
  </div>
</template>

<script>
import DkdButton from "@/views/region/components/DkdButton";
import DkdTable from "@/views/region/components/DkdTable";
import {
  getAddressListApi,
  getAddressSearchApi,
  getAddressInfoApi,
  changeAddressInfoApi,
  delAddressInfoApi,
  addAddressInfoApi,
} from "@/api/address";
export default {
  name: "QUYU",
  components: {
    DkdButton,
    DkdTable,
  },
  data() {
    return {
      input: "",
      tableLabel: [
        { prop: "name", width: "325", label: "区域名称" },
        { prop: "nodeCount", width: "325", label: "点位数" },
        { prop: "remark", width: "325", label: "备注说明" },
      ], // 组件样式
      currentList: [], // 区域列表数据
      pageIndex: "", // 页码
      list: {}, // 区域列表数据
      datalist: {
        pageIndex: 1,
        pageSize: 10,
        name: "",
      }, // 请求接口data
      gridData: [], // 详情框数据
      changeList: {}, // 修改框数据
      dialogFormVisible: false, //修改框显示隐藏
    };
  },
  created() {
    this.getAddressList();
  },
  methods: {
    // 获取区域列表数据
    async getAddressList() {
      try {
        const res = await getAddressListApi(this.datalist);
        console.log(res, "区域列表数据");
        this.currentList = res.data.currentPageRecords;
        this.pageIndex = res.data.pageIndex;
        this.list = res.data;
      } catch (error) {
        console.log(error);
      }
    },
    last() {
      this.datalist.pageIndex = this.datalist.pageIndex - 1;
      this.getAddressList();
    },
    next() {
      this.datalist.pageIndex = this.datalist.pageIndex + 1;
      this.getAddressList();
    },
    // 点击详情
    async getInfo(val) {
      console.log(val, "当前区域信息(详情)");
      const data = {
        pageIndex: 1,
        pageSize: 10,
        regionId: val.id,
      };
      const res = await getAddressSearchApi(data);
      console.log(res, "点位搜索数据");
      this.gridData = res.data.currentPageRecords;
      console.log(this.gridData);
    },
    // 点击修改
    async change(id) {
      const res = await getAddressInfoApi(id);
      console.log(res, "当前区域信息(修改)");
      this.changeList = res.data;
    },
    // 确认修改
    async confirm(list) {
      console.log(list, "修改区域的值");
      const id = list.id;
      const data = {
        regionName: list.name,
        remark: list.remark,
      };
      // console.log(id, data, '123123')
      const res = await changeAddressInfoApi(data, id);
      console.log(res, "修改成功");
      this.getAddressList();
    },
    // 删除区域
    async del(id) {
      console.log(id, "删除id");
      const res = await delAddressInfoApi(id);
      console.log(res, 删除成功);
      this.getAddressList();
    },
    add() {
      this.dialogFormVisible = true;
      this.changeList = {};
    },
    //新增区域
    async addConfirm(val) {
      const data = {
        regionName: val.name,
        remark: val.remark,
      };
      const res = await addAddressInfoApi(data);
      // console.log(res, "新增区域");
      this.getAddressList();
    },
    // 取消
    onClose(val) {
      this.dialogFormVisible = val;
      console.log(val, "点击取消,同步父组件");
    },
    async search() {
      this.datalist.name = this.input;
      const res = await getAddressListApi(this.datalist);
      console.log(res, "区域搜索数据");
      this.currentList = res.data.currentPageRecords;
      this.list = res.data;
    },
  },                                                      
};
</script>

<style scoped lang="less">
.el-card.is-always-shadow {
  margin-bottom: 20px;
}
.box-head {
  display: flex;
  align-items: center;
  .input {
    width: 205px;
    margin: 0 10px;
  }
}
.box-foot {
  .addBtn {
    margin-bottom: 20px;
  }
  .page {
    display: flex;
    justify-content: space-between;
    margin-top: 20px;
    .text {
      color: #ccc;
    }
  }
}
//取消table框的拖动条
/deep/.el-table--scrollable-x .el-table__body-wrapper {
  overflow: hidden;
}
</style>
