<template>
  <el-table
    :data="currentList"
    style="width: 100%"
    :header-cell-style="{
      background: '#f3f6fb',
      color: '#666',
      height: '42px',
      'font-weight': 400,
    }"
    :highlight-current-row="true"
    empty-text="暂无数据"
  >
    <el-table-column type="index" label="序号" width="80"> </el-table-column>
    <el-table-column prop="skuName" label="商品名称" width="200">
    </el-table-column>
    <el-table-column label="商品图片" width="200">
      <template slot-scope="scope">
        <div slot="reference" class="name-wrapper">
          <el-image :src="scope.row.skuImage"></el-image>
        </div>
      </template>
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
    <el-table-column label="操作" width="100">
      <template slot-scope="scope">
        <el-button type="text" style="color: #4368e1">修改</el-button>
      </template>
    </el-table-column>
  </el-table>
</template>

<script>
import dayjs from "dayjs";
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
.el-image__inner {
  display: block;
  width: 35px;
  height: 35px;
  -o-object-fit: cover;
  object-fit: cover;
  border-radius: 50%;
  background: #f3f6fb;
  border: 1px solid #f3f6fb;
}
</style>
