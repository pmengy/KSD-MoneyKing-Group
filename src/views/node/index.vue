<template>
  <div class="dashboard-container">
    <div class="app-container">
      <el-card class="box-card">
        <div class="box-head">
          <p>点位搜索:</p>
          <el-input v-model="input" class="input" placeholder="请输入内容" />
          <p>区域搜索:</p>
          <el-select
            class="input"
            v-model="select"
            slot="prepend"
            placeholder="请选择"
          >
            <el-option
              v-for="item in addressList"
              :key="item.id"
              :label="item.name"
              :value="item.id"
            ></el-option>
          </el-select>
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
            :businessList="businessList"
            :addressList="addressList"
            :partnerList="partnerList"
            @getInfoo="getInfo"
            @confirmm="confirm"
            @changee="change"
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
import DkdButton from "@/views/node/components/DkdButton";
import DkdTable from "@/views/node/components/DkdTable";
import {
  getNodeInfoApi, //获取点位详情
  getAddressSearchApi,
  changeNodeAddressApi, //修改点位
  getPartnerApi, //合作商列表
  getAddressListApi, //区域列表
  getBusinessType, //商圈列表
  addNodeAddressApi, //新增点位
  delNodeAddressApi, //删除点位
} from "@/api/address";
export default {
  name: "DIANWEI",
  components: {
    DkdButton,
    DkdTable,
  },
  data() {
    return {
      select: "",
      tableLabel: [
        { prop: "name", width: "180", label: "点位名称" },
        { prop: "region.name", width: "180", label: "所在区域" },
        { prop: "businessType.name", width: "180", label: "商圈类型" },
        { prop: "ownerName", width: "180", label: "合作商" },
        { prop: "addr", width: "280", label: "详细地址" },
      ], // 组件样式
      businessList: [], //全部商圈列表
      addressList: [], //全部区域列表
      partnerList: [], //全部合作商列表

      input:'',
      currentList: [], // 区域列表数据
      pageIndex: "", // 页码
      list: {}, // 区域列表数据
      datalist: {
        pageIndex: 1,
        pageSize: 10,
        name: "",
        regionId: "",
      }, // 请求接口data
      datalistTwo: {
        pageIndex: 1,
        pageSize: 50,
        name: "",
        regionId: "",
      }, // 请求接口data
      gridData: [], // 详情框数据
      // changeList: {}, // 修改框数据
      dialogFormVisible: false, //修改框显示隐藏
    };
  },
  created() {
    this.getAddressList();
    this.change();
  },
  computed: {
    // quyuName() {
    //   const item = this.currentList.find(
    //     (item) => item.regionId == this.select
    //   );
    //   return item.region.name;
    // },
  },
  methods: {
    // 获取点位列表数据
    async getAddressList() {
      try {
        const res = await getAddressSearchApi(this.datalist);
        // console.log(res, "区域列表数据");
        this.currentList = res.data.currentPageRecords;
        this.pageIndex = res.data.pageIndex;
        this.list = res.data;
        console.log(this.currentList, "点位列表数据");
      } catch (error) {
        console.log(error);
      }
    },
    //点击详情
    // async getNodeInfo(){
    //   const res = await getNodeInfoApi()
    //   console.log(res);
    // },
    last() {
      this.datalist.pageIndex = this.datalist.pageIndex - 1;
      this.getAddressList();
    },
    next() {
      this.datalist.pageIndex = this.datalist.pageIndex + 1;
      this.getAddressList();
    },
    // 点击详情
    async getInfo(id) {
      console.log(id, "当前点位id(详情)");
      // const data = {
      //   pageIndex: 1,
      //   pageSize: 10,
      //   regionId: val.id,
      // };
      const res = await getNodeInfoApi(id);
      // console.log(res, "点位详情数据");
      this.gridData = res.data;
      console.log(this.gridData, "点位详情数据");
    },
    // 点击修改
    async change() {
      const res = await getBusinessType();
      this.businessList = res.data;
      console.log(this.businessList, "商圈");
      //
      const res1 = await getAddressListApi(this.datalistTwo);
      this.addressList = res1.data.currentPageRecords;
      console.log(this.addressList, "区域");
      //
      const res2 = await getPartnerApi(this.datalistTwo);
      this.partnerList = res2.data.currentPageRecords;
      console.log(this.partnerList, "合作商");
    },
    // 确认修改
    async confirm(data, id) {
      // console.log(id, data, '123123')
      const res = await changeNodeAddressApi(data, id);
      console.log(res, "修改成功");
      this.getAddressList();
    },
    // 删除区域
    async del(id) {
      console.log(id, "删除id");
      const res = await delNodeAddressApi(id);
      console.log(res, "删除成功");
      this.getAddressList();
    },
    async add() {
      this.dialogFormVisible = true;
      this.changeList = {};
      const res = await getBusinessType();
      this.businessList = res.data;
      console.log(this.businessList, "商圈");
      //
      const res1 = await getAddressListApi(this.datalistTwo);
      this.addressList = res1.data.currentPageRecords;
      console.log(this.addressList, "区域");
      //
      const res2 = await getPartnerApi(this.datalistTwo);
      this.partnerList = res2.data.currentPageRecords;
      console.log(this.partnerList, "合作商");
    },
    //新增区域
    async addConfirm(data) {
      const res = await addNodeAddressApi(data);
      console.log(res, "新增点位");
      this.getAddressList();
    },
    // 取消
    onClose(val) {
      this.dialogFormVisible = val;
      console.log(val, "点击取消,同步父组件");
    },
    //区域搜索
    async search() {
      const data ={ name:	this.input,regionId:this.select }
      const res = await getAddressSearchApi(data);
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
