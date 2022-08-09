<template>
  <div class="dashboard-container">
    <div class="app-container">
      <el-card class="box-card">
        <div class="box-head">
          <p>合作商搜索:</p>
          <el-input @change='search' v-model="input" class="input" placeholder="请输入" />
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
            :current-list="currentList"
            :table-label="tableLabel"
            :current-index="pageIndex * 10"
            :change-list="changeList"
            :dialogVisible='dialogVisible'
            @onClose="onClose"
            @onnClose="onnClose"
            @addNew="addNew"
            @delPar="delPar"
            @reset='reset'
            @changeCom='changeCom'
          />
            <!-- @reset='reset' -->
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
import DkdButton from "@/views/partner/components/DkdButton";
import DkdTable from "@/views/partner/components/DkdTable";
import {
  getPartnerApi,//合作商搜索
  addPartnerApi,//新增合作商
  resetPwdApi,//重置密码
  delPartnerApi,//删除
  changePartnerApi,//修改合作商
  // 
  getAddressListApi,
  getAddressSearchApi,
  getAddressInfoApi,
  changeAddressInfoApi,
  delAddressInfoApi,
  addAddressInfoApi,
} from "@/api/address";
export default {
  name: "PARTNER",
  components: {
    DkdButton,
    DkdTable,
  },
  data() {
    return {
      input: "", //搜索框数据
      dialogVisible:false, //新增弹出框
      tableLabel: [
        { prop: "name", width: "150", label: "合作商名称" },
        { prop: "account", width: "150", label: "账号" },
        { prop: "vmCount", width: "150", label: "设备数量" },
        { prop: "ratio", width: "150", label: "分成比例" },
        { prop: "contact", width: "150", label: "联系人" },
        { prop: "mobile", width: "150", label: "联系电话" },
      ], // 组件样式
      currentList: [], // 合作商列表数据
      pageIndex: "", // 页码
      list: {}, // 区域列表数据
      datalist: {
        pageIndex: 1,
        pageSize: 20,
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
        const res = await getPartnerApi(this.datalist);
        console.log(res, "合作商列表数据");
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
    
    add() {
      this.dialogVisible = true;
      // this.changeList = {};
      // const res = await addPartnerApi(data)
    },
    //新建
    async addNew(data){
      console.log(data);
      const res = await addPartnerApi(data)
      console.log(res,'新建成功');
      this.getAddressList();
    },
    // 取消
    onClose(){
      // console.log(123);
      this.dialogVisible=false
    },
    onnClose(val){
      this.dialogVisible=val
    },
    //合作商搜索
    async search() {
      this.datalist.name = this.input;
      const res = await getPartnerApi(this.datalist);
      console.log(res, "区域搜索数据");
      this.currentList = res.data.currentPageRecords;
      this.list = res.data;
    },
    //重置密码
    async reset(id){
      const res = await resetPwdApi(id)
      console.log(res,'重置密码');
    },
    //删除
    async delPar(id){
      const res = await delPartnerApi(id)
      console.log(res);
      this.getAddressList();
    },
    //修改
    async changeCom(data,id){
      const res = await changePartnerApi(data,id)
      console.log(res);
    }
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
