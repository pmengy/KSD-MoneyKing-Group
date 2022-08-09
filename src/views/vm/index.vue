<template>
  <div class="dashboard-container">
    <div class="app-container">
      <!-- 搜索 -->
      <el-card
        class="box-search"
        shadow="never"
        :body-style="{ padding: '10px 0px 10px 20px' }"
      >
        <el-form :inline="true" class="demo-form-inline" ref="form">
          <el-form-item label="设备编号:" class="item">
            <el-input v-model="innerCode" placeholder="请输入"></el-input>
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
            @click="addVm"
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
            @click="batchOperation"
            style="margin-left: 8px"
            background="#fbf4f0"
            color="#655b56"
            >批量操作</dkd-button
          >
        </div>
        <el-table
          ref="multipleTable"
          :data="tableData"
          row-key="innerCode"
          tooltip-effect="dark"
          @selection-change="handleSelectionChange"
          :header-cell-style="{
            background: '#f3f6fb',
            color: '#666',
            height: '42px',
            'font-weight': 400,
          }"
          empty-text="暂无数据"
          style="width: 1158px"
        >
          <el-table-column
            reserve-selection
            type="selection"
            width="55"
          ></el-table-column>
          <el-table-column
            type="index"
            :index="indexMethod"
            label="序号"
            width="80"
          >
          </el-table-column>
          <el-table-column prop="innerCode" label="设备编号" width="170">
          </el-table-column>
          <el-table-column prop="type.name" label="设备型号" width="170">
          </el-table-column>
          <el-table-column
            prop="node.name"
            label="详细地址"
            show-overflow-tooltip
          ></el-table-column>
          <el-table-column
            prop="ownerName"
            label="合作商"
            width="170"
          ></el-table-column>
          <el-table-column
            prop="vmStatus"
            label="设备状态"
            width="170"
            :formatter="vmStatus"
          ></el-table-column>
          <el-table-column label="操作" width="150">
            <template slot-scope="scope">
              <el-button type="text" @click="aisle(scope.row)">货道</el-button>
              <el-button type="text" @click="policy(scope.row)">策略</el-button>
              <el-button type="text" @click="editVmNode(scope.row)"
                >修改</el-button
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
      <!-- 修改 -->
      <el-dialog
        v-if="currentData.id"
        title="修改设备"
        :visible.sync="dialogVisible"
        width="40%"
      >
        <el-form
          v-if="currentData.id"
          label-position="right"
          label-width="80px"
          :model="currentData"
          ref="form"
        >
          <el-form-item label="机器编号:">
            {{ currentData.innerCode }}
          </el-form-item>
          <el-form-item label="供货时间:"> {{ supplyTime }} </el-form-item>
          <el-form-item label="设备类型:">
            {{ currentData.type.name }}
          </el-form-item>
          <el-form-item label="设备容量:">
            {{ currentData.type.channelMaxCapacity }}
          </el-form-item>
          <el-form-item label="设备点位:">
            <el-select v-model="currentData.node.id">
              <el-option
                v-for="item in allNode"
                :key="item.id"
                :label="item.name"
                :value="item.id"
              ></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="合作商:">
            {{ currentData.ownerName }}
          </el-form-item>
          <el-form-item label="所属区域:">
            {{ currentData.region.name }}
          </el-form-item>
          <el-form-item label="设备地址:">
            {{ currentData.node.addr }}
          </el-form-item>
        </el-form>
        <span slot="footer" class="dialog-footer">
          <el-button @click="cancel">取 消</el-button>
          <el-button type="primary" @click="confirm">确 定</el-button>
        </span>
      </el-dialog>
      <!-- 策略 -->
      <el-dialog title="策略管理" :visible.sync="policyVisible" width="40%">
        <div v-if="policyData.id">
          <p>机器编号:{{ policyData.innerCode }}</p>
          <p>策略名称:{{ policyData.policyName }}</p>
          <p>策略方案:{{ policyData.discount }}%</p>
          <span slot="footer" class="dialog-footer">
            <el-button @click="cancelCurrentPolicy">取消策略</el-button>
          </span>
        </div>
        <div v-else>
          <el-form>
            <el-form-item label="选择策略:">
              <el-select v-model="policyId" placeholder="请选择">
                <el-option
                  v-for="item in policyList"
                  :label="item.policyName"
                  :value="item.policyId"
                ></el-option>
              </el-select>
            </el-form-item>
          </el-form>
          <span slot="footer" class="dialog-footer">
            <el-button @click="policyVisible = false">取 消</el-button>
            <el-button type="primary" @click="confirmPolicy">确 定</el-button>
          </span>
        </div>
      </el-dialog>
      <!-- 新增 -->
      <el-dialog title="新增设备" :visible.sync="vmVisible" width="40%">
        <el-form ref="addForm">
          <el-form-item label="设备编号:"> 系统自动生成 </el-form-item>
          <el-form-item label="选择型号:">
            <el-select v-model="vmType" placeholder="请选择">
              <el-option
                v-for="item in VmTypeList"
                :key="item.typeId"
                :label="item.name"
                :value="item.typeId"
              ></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="选择点位">
            <el-select v-model="nodeId" placeholder="请选择">
              <el-option
                v-for="item in allNode"
                :key="item.id"
                :label="item.name"
                :value="item.id"
              ></el-option>
            </el-select>
          </el-form-item>
        </el-form>
        <span slot="footer" class="dialog-footer">
          <el-button @click="cancelType">取 消</el-button>
          <el-button type="primary" @click="confirmType">确 定</el-button>
        </span>
      </el-dialog>
      <!-- 货道 -->
      <el-dialog
        title="货道设置"
        :visible.sync="aisleVisible"
        width="940px"
        custom-class="el-dialog1"
      >
        <div v-if="currentData.id" class="dialog-body">
          <div class="db-body">
            <div class="db-body-top">
              <span>货道行数:{{ currentData.type.vmRow }}</span>
              <span>货道列数:{{ currentData.type.vmCol }}</span>
              <span class="ron"
                >货道容量（个）:{{ currentData.type.channelMaxCapacity }}</span
              >
              <el-button type="primary" class="sortBtn" @click="smartSort"
                ><span>智能排序</span></el-button
              >
            </div>
            <div class="db-body-body">
              <el-scrollbar class="scrollbar" ref="elscrollbar">
                <div class="box" :style="{ width: scrollerWidth }">
                  <el-row class="boxflex">
                    <div
                      class="divbox"
                      v-for="(item, index) in channelList"
                      :key="index"
                    >
                      <div class="divbox-container">
                        <div class="container-code">
                          <span>{{ item.channelCode }}</span>
                        </div>
                        <div class="sku">
                          <img
                            v-if="item.sku"
                            :src="
                              item.sku.skuImage ||
                              '../../assets/images/defaultImg.jpg'
                            "
                            alt=""
                          />
                          <img
                            v-else
                            src="../../assets/images/defaultImg.jpg"
                            alt=""
                          />
                          <div class="name" v-if="item.sku">
                            {{ item.sku.skuName }}
                          </div>
                          <div v-else class="name">暂无商品</div>
                        </div>
                        <div class="container-bottom">
                          <el-button
                            @click="addGoods(item, index)"
                            type="primary"
                            size="small"
                            class="left-btn"
                            ><span>添加</span></el-button
                          >
                          <el-button
                            :disabled="!item.sku"
                            type="primary"
                            size="small"
                            class="right-btn"
                            ><span>删除</span></el-button
                          >
                        </div>
                      </div>
                    </div>
                  </el-row>
                </div>
              </el-scrollbar>
            </div>
            <div class="jiantou-left" @click="leftBtn">
              <i class="el-icon-arrow-left"></i>
            </div>
            <div class="jiantou-right" @click="rightBtn">
              <i class="el-icon-arrow-right"></i>
            </div>
          </div>
        </div>
        <span slot="footer" class="dialog-footer-huodao">
          <el-button
            type="primary"
            @click="aisleVisible = false"
            class="primary-huodao"
            ><span>确 定</span></el-button
          >
        </span>
      </el-dialog>
      <!-- 商品添加 -->
      <!-- 修改商品dialog -->
      <el-dialog
        title="选择商品"
        :visible.sync="reviseShow"
        width="860px"
        class="smartSort"
        custom-class="el-dialog1"
      >
        <div class="smartSort-body">
          <el-form class="demo-form-inline" :model="reviseForm">
            <el-form-item label="商品名称: ">
              <el-input
                style="width: 200px"
                v-model="reviseForm.name"
              ></el-input>
              <el-button
                @click="reviseSearchBtn"
                class="searchBtnn"
                icon="el-icon-search"
                >查 询</el-button
              >
            </el-form-item>
          </el-form>
          <div class="container">
            <div
              class="box"
              v-for="(item, index) in reviseList"
              @click="groupClick(item.skuName, item)"
            >
              <div class="box-main">
                <i
                  :class="item.skuName == name ? 'buxianshi' : 'xianshi'"
                  class="el-icon-success"
                  style="
                    position: absolute;
                    top: 0;
                    left: 0;
                    color: blue;
                    font-size: 20px;
                  "
                ></i>
                <img
                  :src="item.skuImage"
                  alt=""
                  style="
                    width: 83px;
                    height: 84px;
                    margin-bottom: 5px;
                    margin-left: 10px;
                  "
                />
                <div>
                  <span>{{ item.skuName }}</span>
                </div>
              </div>
            </div>
          </div>
          <div class="jiantou-left2" @click="reviseLeftBtn">
            <i class="el-icon-arrow-left"></i>
          </div>
          <div class="jiantou-right2" @click="reviseRightBtn">
            <i class="el-icon-arrow-right"></i>
          </div>
        </div>
        <span slot="footer" class="dialog-footer">
          <el-button type="primary" @click="confirmProductImage" class="primary"
            ><span>确定</span></el-button
          >
        </span>
      </el-dialog>
      <!-- 智能排序dialog -->
      <el-dialog
        title="选择商品"
        :visible.sync="smartSortShow"
        width="860px"
        class="resiveSort"
        custom-class="el-dialog1"
      >
        <div class="smartSort-body">
          <div class="ssb">该区域属于学校商圈适合销售一下商品：</div>
          <div class="container">
            <div
              class="box"
              v-for="(item, index) in equipmentTopList"
              :key="index"
            >
              <div class="box-main">
                <img
                  :src="item.image"
                  alt=""
                  style="
                    width: 83px;
                    height: 84px;
                    margin-bottom: 5px;
                    margin-left: 10px;
                  "
                />
                <div>
                  <span>{{ item.skuName }}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
        <span slot="footer" class="dialog-footer">
          <el-button
            type="primary"
            @click="smartSortShow = false"
            class="primary"
            ><span>采纳意见</span></el-button
          >
        </span>
      </el-dialog>
    </div>
  </div>
</template>

<script>
import dayjs from "dayjs";
import "@/assets/images/defaultImg.jpg";
import {
  getVmList,
  updateVmNode,
  searchNode,
  selectPolicy,
  searchPolicy,
  applyPolicy,
  cancelPolicy,
  addVmType,
  getChannelList,
  getEquipmentReviseList,
  getEquipmentTop,
} from "@/api/status";
import { getVmTypeList } from "@/api/type";
import DkdButton from "@/components/DkdButton";
export default {
  data() {
    return {
      tableData: [],
      policyList: [],
      multipleSelection: [],
      selectedRowKeys: [],
      policyData: {},
      pageIndex: "",
      totalPage: "",
      totalCount: "",
      innerCode: "",
      dialogVisible: false,
      policyVisible: false,
      vmVisible: false,
      aisleVisible: false,
      reviseShow: false,
      smartSortShow: false,
      currentData: {},
      currentObj: {},
      policyId: "",
      innerCodeList: [],
      VmTypeList: [],
      vmType: "",
      nodeId: "",
      flag: false,
      channelList: [],
      reviseForm: {
        name: "",
      },
      newImage: "",
      name: "",
      reviseList: [],
      equipmentTopList: [], //售货机top10的商品数组
      reviseIndex: "",
      revisePage: 1,
      oldImage: "",
    };
  },
  components: { DkdButton },
  created() {
    this.getVmList();
    this.searchPolicy();
    this.searchNode();
    this.getVmTypeList();
  },
  computed: {
    currentIndex() {
      return this.pageIndex * 10;
    },
    supplyTime() {
      return dayjs(this.currentData.lastSupplyTime).format(
        "YYYY-MM-DD HH:mm:ss"
      );
    },
    allNode() {
      const res = this.multipleSelection.map((item) => {
        return Object.assign({}, { id: item.id, name: item.name });
      });
      return res;
    },
    scrollerWidth: function () {
      return 166 * this.currentData.type.vmCol + "px";
    },
  },
  methods: {
    async smartSort() {
      try {
        const { data } = await getEquipmentTop(this.currentData.businessId);
        console.log(data);
        this.equipmentTopList = data;
        this.smartSortShow = true;
      } catch (err) {
        console.log(err);
      }
    },
    addGoods(item, index) {
      this.oldImage = item.sku.skuImage;
      this.getEquipmentReviseList();
      this.reviseShow = true;
      this.reviseIndex = index;
    },
    async getEquipmentReviseList() {
      const obj = {
        pageIndex: this.revisePage,
        skuName: this.reviseForm.name,
      };
      const { data } = await getEquipmentReviseList(obj);
      this.reviseList = data.currentPageRecords;
    },
    groupClick(name, item) {
      this.newImage = item.skuImage;
      this.name = name;
    },
    // 确认修改商品图片
    confirmProductImage() {
      this.reviseShow = false;
      let index = this.reviseIndex;
      this.currentData[index].sku.skuImage = this.newImage;
    },
    // 删除图片
    delRevise(item, index) {
      this.currentData[index].sku.skuImage =
        "data:image/png;base64,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";
    },
    // 修改商品左右箭头
    reviseLeftBtn() {
      if (this.revisePage <= 1) {
        return;
      }
      this.revisePage--, this.getEquipmentReviseList();
    },
    reviseRightBtn() {
      this.revisePage++, this.getEquipmentReviseList();
    },
    reviseSearchBtn() {
      this.getEquipmentReviseList();
    },
    indexMethod(index) {
      return parseInt(this.currentIndex) - 9 + index;
    },
    async getVmList(params) {
      const res = await getVmList(params);
      this.tableData = res.data.currentPageRecords;
      this.pageIndex = res.data.pageIndex;
      this.totalPage = res.data.totalPage;
      this.totalCount = res.data.totalCount;
    },
    async getVmTypeList() {
      const res = await getVmTypeList({ pageSize: 40 });
      this.VmTypeList = res.data.currentPageRecords;
    },
    vmStatus(row, column, cellValue) {
      if (column.property === "vmStatus") {
        switch (cellValue) {
          case 1:
            return "运营";
          case 0:
            return "未投放";
          case 3:
            return "撤机";
          default:
            return "";
        }
      }
    },
    // 获取下一页数据
    async nextPage() {
      await this.getVmList({
        pageIndex: parseInt(this.pageIndex) + 1,
        innerCode: this.innerCode,
      });
    },
    // 获取上一页数据
    async lastPage() {
      await this.getVmList({
        pageIndex: parseInt(this.pageIndex) - 1,
        innerCode: this.innerCode,
      });
    },
    // 搜索设备
    async search() {
      await this.getVmList({ innerCode: this.innerCode });
    },
    // 修改设备点位
    editVmNode(obj) {
      this.currentData = obj;

      this.dialogVisible = true;
    },
    async confirm() {
      try {
        await updateVmNode(this.currentData.id, this.currentData.nodeId);
        this.$message.success("修改点位成功");
        this.getVmList();
        this.dialogVisible = false;
      } catch (error) {
        this.$message.error("该设备正在运营");
      }
    },
    async searchNode() {
      const res = await searchNode({ pageSize: 40 });
      this.multipleSelection = res.data.currentPageRecords;
    },
    cancel() {
      this.dialogVisible = false;
    },
    async searchPolicy() {
      const res = await searchPolicy({ pageSize: 40 });
      this.policyList = res.data.currentPageRecords;
    },
    async policy(obj) {
      this.policyVisible = true;
      const res = await selectPolicy(obj.innerCode);
      this.policyData = res.data;
      this.innerCodeList.push(obj.innerCode);
    },
    async confirmPolicy() {
      console.log(1);
      if (!this.flag) {
        try {
          await applyPolicy({
            innerCodeList: this.innerCodeList,
            policyId: this.policyId,
          });
          this.$message.success("策略修改成功");
          this.policyVisible = false;
        } catch (error) {
          this.$message.error("策略修改失败");
        }
      } else {
        console.log(2);
        try {
          await applyPolicy({
            innerCodeList: this.selectedRowKeys,
            policyId: this.policyId,
          });
          this.$message.success("应用策略成功");
        } catch (error) {
          this.$message.error("应用策略失败");
        } finally {
          this.policyVisible = false;
          this.flag = true;
        }
      }
    },
    async cancelCurrentPolicy() {
      try {
        await cancelPolicy(this.innerCodeList[0], this.policyData.policyId);
        this.$message.success("取消策略成功");
      } catch (error) {
        this.$message.error("取消策略失败");
      } finally {
        this.policyVisible = false;
      }
    },
    addVm() {
      this.vmVisible = true;
    },
    async confirmType() {
      try {
        const data = {
          vmType: this.vmType,
          nodeId: this.nodeId,
          createUserId: this.$store.state.user.token.userId,
        };
        await addVmType(data);
        this.$message.success("新增成功");
      } catch (error) {
        this.$message.error("新增失败");
      } finally {
        this.vmVisible = false;
      }
    },
    cancelType() {
      this.vmVisible = false;
      this.$refs.addForm.resetFields();
    },
    handleSelectionChange(val) {
      const arr = [];
      [...new Set(val)].forEach((item) => arr.push(item.innerCode));

      this.selectedRowKeys = arr;
    },
    async batchOperation() {
      if (!this.selectedRowKeys.length) {
        return this.$message.warning("请勾选售货机");
      }
      this.flag = true;
      this.policyVisible = true;
      this.policyData = {};
    },
    async aisle(obj) {
      this.currentData = obj;
      this.aisleVisible = true;
      const res = await getChannelList(this.currentData.innerCode);
      this.channelList = res.data;
    },
    // 左滚动
    rightBtn() {
      var div = this.$refs["elscrollbar"].$refs["wrap"];
      this.$nextTick(() => {
        div.style.transition = "all 1s";
        div.scrollLeft = div.scrollWidth;
      });
    },
    //右滚动
    leftBtn() {
      console.log(2);
      var div = this.$refs["elscrollbar"].$refs["wrap"];
      this.$nextTick(() => {
        div.style.transition = "all 1s";
        div.scrollLeft = 0;
      });
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
::v-deep.dialog-body {
  padding: 20px 20px 30px;
  color: #666;
  height: 500px;
  .db-body {
    position: relative;
    margin: 0 auto;
    .db-body-top {
      display: flex;
      align-items: center;
      height: 56px;
      margin-bottom: 16px;
      background: #f3f6fb;
      span {
        margin-left: 43px;
      }
      .row {
        flex: 1;
        margin-left: 54px;
      }
      .sortBtn {
        position: absolute;
        right: 0px;
        height: 36px;
        width: 80px;
        color: #fff;
        background-color: #5f84ff;
        border: none;
        span {
          position: relative;
          right: 46px;
        }
      }
    }
    .db-body-body {
      width: 835px;
      overflow: hidden;
      height: 365px;
      margin: 0 auto;
    }
    .jiantou-left {
      font-size: 40px;
      left: -30px;
      position: absolute;
      top: 50%;
      width: 50px !important;
      height: 50px !important;
    }
    .jiantou-right {
      font-size: 40px;
      position: absolute;
      top: 50%;
      width: 50px !important;
      height: 50px !important;
      right: -50px;
      color: #000;
      cursor: pointer;
    }
  }
}
.el-scrollbar {
  overflow: hidden;
  position: relative;
  transition: all 1s;
}
.el-scrollbar__wrap {
  scroll-behavior: smooth;
  overflow: scroll;
  height: 100%;
  transition: all 1s;
}
.el-scrollbar__wrap {
  overflow-x: hidden;
}
.scrollbar > div {
  overflow-x: hidden;
}
.scrollbar {
  height: 390px;
  transition: all 1s;
}

.is-horizontal {
  display: block;
}

.wrapper {
  width: 500px;
  border: 1px solid red;
  margin: 20px auto;
  transition: all 1s;
}

/*隐藏浏览器自带的水平滚动条*/
.el-scrollbar__wrap {
  overflow-x: hidden !important;
}
.boxflex {
  display: flex;
  flex-wrap: wrap;
}
.divbox {
  width: 166px !important;
  height: 180px;
  padding-left: 8px;
  padding-right: 8px;
  background-color: #fff;
  .divbox-container {
    position: relative;
    width: 150px;
    height: 180px;
    .container-code {
      position: absolute;
      top: 10px;
      left: 0;
      width: 43px;
      height: 23px;
      line-height: 23px;
      background: #829bed;
      border-radius: 0 10px 10px 0;
      font-size: 12px;
      color: #fff;
      text-align: center;
    }
    .sku {
      height: 135px;
      padding-top: 16px;
      background-color: #f6f7fb;
      border-radius: 4px;
      text-align: center;
      img {
        display: inline-block;
        width: 84px;
        height: 78px;
        margin-bottom: 10px;
        vertical-align: middle;
      }
      .name {
        padding: 0 16px;
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
      }
    }
    .container-bottom {
      width: 150px;
      height: 40px;
      display: flex;
      justify-content: center;
      .left-btn {
        border: none;
        background-color: transparent;
        color: #5f84ff;
        font-size: 14px;
      }
      .right-btn {
        font-size: 14px;
        color: #ff5a5a;
        border: none;
        background-color: transparent;
        &:disabled {
          opacity: 0.5;
        }
      }
    }
  }
}
.primary-huodao {
  text-align: center;
  width: 80px !important;
  height: 36px;
  padding: 0;
  border: none;
  margin-right: 400px;
  background: linear-gradient(135deg, #ff9743, #ff5e20) !important;
}
.smartSort {
  .smartSort-body {
    .container {
      display: flex;
      flex-wrap: wrap;
      justify-content: space-between;
      width: 750px;
      margin: 0 auto;
      .box {
        position: relative;
        width: 134px;
        height: 150px;
        padding-left: 10px;
        padding-right: 10px;
        background-color: #f6f7fb;
        .box-main {
          width: 115px;
          height: 134px;
          padding-top: 16px;
          border-radius: 4px;
          text-align: center;
        }
      }
    }
  }
  .dialog-footer {
    .primary {
      align-items: center;
      width: 80px !important;
      height: 36px;
      padding: 0;
      margin-right: 370px;
      background: linear-gradient(135deg, #ff9743, #ff5e20) !important;
      border: none;
    }
  }
}
// 修改商品 样式
.resiveSort {
  .smartSort-body {
    position: relative;
    width: 750px;
    margin: 0 auto;
    .container {
      display: flex;
      flex-wrap: wrap;
      justify-content: space-between;
      width: 750px;
      margin: 0 auto;
      .box {
        width: 134px;
        height: 150px;
        padding-left: 10px;
        padding-right: 10px;
        background-color: #f6f7fb;
        .box-main {
          width: 115px;
          height: 134px;
          padding-top: 16px;
          border-radius: 4px;
          text-align: center;
        }
      }
    }
  }
  .dialog-footer {
    .primary {
      align-items: center;
      width: 80px !important;
      height: 36px;
      padding: 0;
      margin-right: 370px;
      background: linear-gradient(135deg, #ff9743, #ff5e20) !important;
      border: none;
    }
  }
}
.searchBtnn {
  min-width: 80px;
  height: 36px;
  padding: 0;
  color: #fff;
  text-align: center;
  background-color: #5f84ff;
  border: none;
  margin-left: 10px;
}
.jiantou-left2 {
  font-size: 40px;
  left: 0px;
  position: absolute;
  top: 50%;
  width: 50px !important;
  height: 50px !important;
}
.jiantou-right2 {
  font-size: 40px;
  position: absolute;
  top: 50%;
  right: 0px;
  width: 50px !important;
  height: 50px !important;
  color: #000;
  cursor: pointer;
}
.xianshi {
  display: none;
}
.buxianshi {
  display: block;
}
.quitTactic {
  justify-content: center;
  align-items: center;
  margin-right: 250px;
  width: 80px !important;
  height: 36px;
  padding: 0;
  background-color: #fbf4f0 !important;
  border: none;
  color: #655b56 !important;
}
::v-deep.batch {
  .dialog-footer {
    text-align: center;
    .quit1 {
      justify-content: center;
      align-items: center;
      width: 80px !important;
      height: 36px;
      padding: 0;
      background-color: #fbf4f0 !important;
      border: none;
      color: #655b56 !important;
    }
    .confirem {
      margin-right: 210px;
      justify-content: center;
      align-items: center;
      width: 80px !important;
      height: 36px;
      padding: 0;
      background: linear-gradient(135deg, #ff9743, #ff5e20) !important;
      border: none;
      color: #fff;
    }
  }
}
::v-deep.el-dialog1 {
  border-radius: 10px !important;
}
.primary1 {
  text-align: center;
  width: 80px !important;
  height: 36px;
  padding: 0;
  border: none;
  color: #fff;
  margin-right: 200px;

  background: linear-gradient(135deg, #ff9743, #ff5e20) !important;
}
.secondery1 {
  width: 80px !important;
  height: 36px;
  padding: 0;
  background-color: #fbf4f0 !important;
  border: none;
  color: #655b56 !important;
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
