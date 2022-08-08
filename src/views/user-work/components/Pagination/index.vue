<template>
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
</template>

<script>
import DkdButton from "@/components/DkdButton";
export default {
  components: { DkdButton },
  data() {
    return {};
  },
  props: ["totalCount", "pageIndex", "totalPage"],

  created() {},

  methods: {
    // 上一页
    lastPage() {},
    // 下一页
    nextPage() {},
  },
};
</script>

<style lang="less" scoped>
.addStaff {
  padding-bottom: 20px;
}
/deep/.el-table {
  width: 100% !important;
}
/deep/.el-table--scrollable-x .el-table__body-wrapper {
  overflow-x: hidden;
}
// 下册分页按钮
.Pagination {
  display: flex;
  justify-content: space-between;
}
</style>
