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
              <el-button type="text">货道</el-button>
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
    </div>
  </div>
</template>

<script>
import dayjs from "dayjs";
import {
  getVmList,
  updateVmNode,
  searchNode,
  selectPolicy,
  searchPolicy,
  applyPolicy,
  cancelPolicy,
  addVmType,
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
      currentData: {},
      currentObj: {},
      policyId: "",
      innerCodeList: [],
      VmTypeList: [],
      vmType: "",
      nodeId: "",
      flag: false,
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
  },
  methods: {
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
