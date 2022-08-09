<template>
  <el-table
    :data="currentList"
    style="width: 1258px"
    :header-cell-style="{
      background: '#f3f6fb',
      color: '#666',
      height: '42px',
      'font-weight': 400,
    }"
    :highlight-current-row="true"
    empty-text="暂无数据"
  >
    <!-- 序号 -->
    <el-table-column
      type="index"
      :index="indexMethod"
      label="序号"
      width="80"
    />
    <!-- 数据 -->
    <el-table-column
      v-for="(item, index) in tableLabel"
      :key="index"
      :prop="item.prop"
      :width="item.width"
      :label="item.label"
      :formatter="formatData"
    />
    <!-- 操作 -->
    <el-table-column label="操作" width="200">
      <template slot-scope="scope">
        <el-button type="text" @click="getInfo(scope.row.id)"
          >查看详情</el-button
        >
        <!-- 弹出框 -->
        <el-dialog
          title="点位详情"
          :visible.sync="dialogTableVisible"
          width="35%"
        >
          <el-table
            :data="gridData"
            style="width: 500px"
            :header-cell-style="{
              background: '#f3f6fb',
              color: '#666',
              height: '42px',
              'font-weight': 400,
            }"
          >
            <el-table-column type="index" label="序号" width="80" />
            <el-table-column
              property="innerCode"
              label="机器编号"
              width="110"
            />
            <el-table-column
              :formatter="formatData"
              property="vmStatus"
              label="设备状态"
              width="110"
            />
            <el-table-column
              :formatter="formatData"
              property="lastSupplyTime"
              label="最后一次供货时间"
              width="180"
            />
          </el-table>
        </el-dialog>
        <el-button type="text" @click="change(scope.row)">修改</el-button>
        <!-- 弹出框 -->
        <el-dialog
          :title="newTitle"
          width="35%"
          :visible.sync="dialogFormVisible"
        >
          <div class="change">
            <el-form :model="changeList">
              <el-form-item label="点位名称">
                <el-input
                  class="addressName"
                  v-model="changeList.name"
                  show-word-limit
                  maxlength="15"
                  placeholder="请输入"
                />
              </el-form-item>
              <el-form-item label="所有区域">
                <el-select
                  class="addressName"
                  v-model="changeList.region.name"
                  placeholder="请选择"
                >
                  <el-option
                    v-for="item in addressList"
                    :key="item.id"
                    :label="item.name"
                    :value="item.id"
                  ></el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="所属商圈">
                <el-select
                  class="addressName"
                  v-model="changeList.businessType.name"
                  placeholder="请选择"
                >
                  <el-option
                    v-for="item in businessList"
                    :key="item.id"
                    :label="item.name"
                    :value="item.id"
                  ></el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="归属合作商">
                <el-select
                  class="addressAdd"
                  v-model="changeList.ownerName"
                  placeholder="请选择"
                >
                  <el-option
                    v-for="item in partnerList"
                    :key="item.id"
                    :label="item.name"
                    :value="item.id"
                  ></el-option>
                </el-select>
              </el-form-item>
              <el-cascader
                class="addressCon"
                :placeholder="changeList.citty?changeList.citty:'请选择'"
                v-model="selectedOptions"
                :options="options"
                :props="{ expandTrigger: 'hover' }"
                @change="handleChange"
              ></el-cascader>
              <el-form-item class="addressCon">
                <el-input
                  v-model="changeList.addrr"
                  show-word-limit
                  maxlength="60"
                  placeholder="请输入详细地址"
                />
              </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
              <el-button @click="cancel">取 消</el-button>
              <el-button type="primary" @click="confirm">确 定</el-button>
            </div>
          </div>
        </el-dialog>
        <el-button type="text" style="color: red" @click="del(scope.row.id)"
          >删除</el-button
        >
      </template>
    </el-table-column>
  </el-table>
</template>

<script>
// import options from "../../area.json"; //引入地区文件
import { regionData, CodeToText } from "element-china-area-data";
import dayjs from "dayjs";
export default {
  name: "Feng",
  props: {
    currentList: {
      type: Array,
      required: true,
    },
    businessList: {
      type: Array,
      required: true,
    },
    addressList: {
      type: Array,
      required: true,
    },
    partnerList: {
      type: Array,
      required: true,
    },
    tableLabel: {
      type: Array,
      default: () => [],
    },
    currentIndex: {
      type: Number,
      required: true,
    },
    gridData: {
      type: Array,
      required: true,
    },
    // newChangeList: {
    //   type: Object,
    //   required: true,
    // },
    newDialogFormVisible: {
      type: Boolean,
      required: true,
    },
  },
  data() {
    return {
      dialogTableVisible: false,
      dialogFormVisible: false,
      // form: {},
      options: regionData,
      selectedOptions: [],
      addtions: {},
      changeList: {
        name: "",
        region: { name: "" },
        businessType: { name: "" },
        ownerName: "",
        addr: "",
        citty: "",
        addrr: "",
      },
      changeListt: {},
      addtions: [],
    };
  },
  created() {},

  watch: {
    newDialogFormVisible: {
      handler(newVal) {
        this.dialogFormVisible = newVal;
      },
    },
    dialogFormVisible: {
      handler(newVal) {
        // if (newVal === "true") {
        //   return console.log('123');
        // } else {
        //   this.$emit("onClose", newVal);
        // }
        if (newVal === false) {
          this.changeList = {
            name: "",
            region: { name: "" },
            businessType: { name: "" },
            ownerName: "",
            addr: "",
            citty: "",
            addrr: "",
          };
        }
        this.addtions = [];
        this.$emit("onClose", newVal);
      },
    },
  },
  computed: {
    newTitle() {
      return this.changeList.id ? "修改区域" : "新增区域";
    },
    addOwnerName() {
      const item = this.partnerList.find(
        (item) => item.id == this.changeList.ownerName
      );
      return item?.name;
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
      if (column.property === "vmStatus") {
        if (cellValue === 0) {
          return "未投放";
        } else if (cellValue === 1) {
          return "运营";
        } else {
          return "撤机";
        }
      }
      if (column.property === "createTime") {
        return dayjs(cellValue).format("YYYY.MM.DD HH:mm:ss");
      }
      if (column.property === "lastSupplyTime") {
        return dayjs(cellValue).format("YYYY.MM.DD HH:mm:ss");
      }
      if (column.property === "addr") {
        const arr = cellValue.split("-");
        return arr[arr.length - 1];
      }
      return cellValue;
    },
    getInfo(id) {
      this.dialogTableVisible = true;
      this.$emit("getInfoo", id);
      // this.form = item;
      // console.log(item, "当前区域信息(详情)");
    },
    change(val) {
      this.dialogFormVisible = true;
      console.log(val);
      this.changeList = val;
      const arr = val.addr.split("-"); //转换数组
      const addrrs = arr[arr.length - 1]; //取最后一个
      arr.splice(arr.length - 1, 1); //删除最后一个
      this.changeList.citty = arr.join("/"); //转字符串
      // this.value = arr.join("/");
      this.changeList.addrr = addrrs;
      console.log(this.changeList, "11111");
      this.$emit("changee");
    },
    // 确认
    confirm() {
      this.dialogFormVisible = false;
      this.changeListt = {
        addr: this.addtions[0] + "-" + this.changeList.addrr,
        areaCode: this.changeList.areaCode,
        businessId: this.changeList.businessId,
        createUserId: this.changeList.createUserId,
        name: this.changeList.name,
        ownerId: this.changeList.ownerId,
        ownerName: this.changeList.ownerName,
        regionId: this.changeList.region.name,
      };
      if (this.changeList.id) {
        this.$emit("confirmm", this.changeListt, this.changeList.id);
      } else {
        this.changeListt = {
          addr: this.addtions[0] + "-" + this.changeList.addrr,
          areaCode: this.addtions[1],
          businessId: 2,
          createUserId: 1,
          name: this.changeList.name,
          ownerId: this.changeList.ownerName,
          ownerName: this.addOwnerName,
          regionId: this.changeList.region.name,
        };

        this.$emit("addConfirm", this.changeListt);
      }
    },
    // 取消
    cancel() {
      this.dialogFormVisible = false;
      this.changeList = {
        name: "",
        region: { name: "" },
        businessType: { name: "" },
        ownerName: "",
        addr: "",
        citty: "",
        addrr: "",
      };
      this.$emit("onClose", this.dialogFormVisible);
    },
    // 删除
    del(id) {
      console.log(id)
      this.$emit("dell", id);
    },
    //修改获取的地区格式
    handleChange(value) {
      this.addtions.selectedOptions = value;
      var name = "";
      this.selectedOptions.map((item) => (name += CodeToText[item] + "/"));
      this.addtions = [name, value[value.length - 1]];
      // this.addtions.names = name;
      // console.log(this.addtions.names);
      console.log(this.addtions, "地区");
    },
  },
};
</script>

<style lang="scss">
.el-table td,
.el-table th.is-leaf {
  border-bottom: unset;
}
.el-table td,
.el-table th {
  padding: 5px 0;
}
.el-table thead {
  font-weight: 400;
  color: #666;
}
.el-dialog__body {
  .text .table {
    display: flex;
    align-items: center;
  }
}
.change {
  .el-form-item__content {
    display: flex;
  }
  .dialog-footer {
    text-align: center;
    .el-button--default {
      background-color: #f3e7e1;
      border: none;
    }
    .el-button--primary {
      background-color: #ff6d29;
      border: none;
    }
  }
  .addressCon {
    width: 400px;
    margin: 0 0 20px 80px;
  }
  .addressName {
    width: 400px;
    margin-left: 10px;
  }
  .addressAdd {
    width: 400px;
  }
}
</style>
