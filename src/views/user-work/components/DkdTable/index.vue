<template>
  <el-table
    :data="currentList"
    style="width: 1158px"
    :cell-style="{ height: '42px' }"
    :header-cell-style="{
      background: '#f3f6fb',
      color: '#666',
      height: '42px',
      'font-weight': 400,
    }"
    :highlight-current-row="true"
    empty-text="暂无数据"
    :height="600"
  >
    <el-table-column type="index" :index="indexMethod" label="序号" width="80">
    </el-table-column>
    <el-table-column
      v-for="(item, index) in tableLabel"
      :key="index"
      :prop="item.prop"
      :width="item.width"
      :label="item.label"
      :formatter="formatData"
    >
    </el-table-column>
    <el-table-column label="操作" width="150">
      <template slot-scope="scope">
        <el-button type="text" @click="getTaskInfo(scope.row)"
          >查看详情</el-button
        >
      </template>
    </el-table-column>
  </el-table>
</template>

<script>
import dayjs from "dayjs";
// import { delStaffAPI } from "@/api/user";
export default {
  data() {
    return {};
  },
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
  },
  created() {},

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
    // 删除功能
    // deleteRow(row) {
    //   this.$emit("delStaff", row.id);
    // },
    // // 修改功能
    // updateStaffInfo(row) {
    //   // console.log(row);
    //   this.$emit("updateInfo", row.id);
    // },
    getTaskInfo(rowInfo) {
      this.$emit("updataVisible", rowInfo);
      console.log("查看详情");
      // console.log(rowInfo);
    },
  },
};
</script>

<style lang="less" scoped>
/deep/.el-table__row {
  height: 32px !important;
}
.el-table td,
.el-table th {
  padding: 5px 0;
}

.el-table thead {
  font-weight: 400;
  color: #666;
}
.myButton {
  cursor: pointer;
}
</style>
