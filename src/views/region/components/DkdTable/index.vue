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
        <el-button type="text" @click="getInfo(scope.row)" class='operation' >查看详情</el-button>
        <!-- 弹出框 -->
        <el-dialog
          title="区域详情"
          :visible.sync="dialogTableVisible"
          width="35%"
        >
          <div class="text" style="display: flex">
            <p>区域名称：</p>
            <p>{{ form.name }}</p>
          </div>
          <div class="table" style="display: flex">
            <p>包含点位：</p>
            <el-table
              :data="gridData"
              style="width: 400px"
              :header-cell-style="{
                background: '#f3f6fb',
                color: '#666',
                height: '42px',
                'font-weight': 400,
              }"
            >
              <el-table-column type="index" label="序号" width="80" />
              <el-table-column property="name" label="点位名称" width="160" />
              <el-table-column
                property="vmCount"
                label="设备数量"
                width="160"
              />
            </el-table>
          </div>
        </el-dialog>
        <el-button type="text" @click="change(scope.row.id)" class='operation' >修改</el-button>
        <!-- 弹出框 -->
        <el-dialog
          ref="addbox"
          :title="newTitle"
          width="35%"
          :visible.sync="dialogFormVisible"
        >
          <div class="change">
            <el-form :model="changeList">
              <el-form-item label="区域名称">
                <el-input
                  v-model="changeList.name"
                  type="textarea"
                  show-word-limit
                  maxlength="15"
                />
              </el-form-item>
              <el-form-item label="备注说明">
                <el-input
                  v-model="changeList.remark"
                  type="textarea"
                  show-word-limit
                  maxlength="40"
                  rows="2"
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
           class='operation' >删除</el-button
        >
      </template>
    </el-table-column>
  </el-table>
</template>

<script>
import dayjs from "dayjs";
export default {
  name: "Fengzhuang",
  props: {
    currentList: {
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
    changeList: {
      type: Object,
      required: true,
    },
    newDialogFormVisible: {
      type: Boolean,
      required: true,
    },
  },
  data() {
    return {
      dialogTableVisible: false,
      dialogFormVisible: false,
      form: {},
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
        this.$emit("onClose", newVal);
      },
    },
  },
  computed: {
    newTitle() {
      return this.changeList.id ? "修改区域" : "新增区域";
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
      if (column.property === "createTime") {
        return dayjs(cellValue).format("YYYY.MM.DD HH:mm:ss");
      }
      return cellValue;
    },
    getInfo(item) {
      this.dialogTableVisible = true;
      this.$emit("getInfoo", item);
      this.form = item;
      // console.log(item, "当前区域信息(详情)");
    },
    change(id) {
      this.dialogFormVisible = true;
      this.$emit("changee", id);
    },
    // 确认
    confirm() {
      this.dialogFormVisible = false;
      if (this.changeList.id) {
        this.$emit("confirmm", this.changeList);
      }else{
        this.$emit("addConfirm", this.changeList);
      }
    },
    // 取消
    cancel() {
      this.dialogFormVisible = false;
      this.$emit("onClose", this.dialogFormVisible);
    },
    // 删除
    del(id) {
      // console.log(id)
      this.$emit("dell", id);
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
}
.operation{
  margin: 0 5px;
}
</style>
