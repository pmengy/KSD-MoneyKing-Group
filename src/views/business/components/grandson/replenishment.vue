<template>
  <el-dialog
    title="补货详情"
    :visible="Visible"
    width="50%"
    :before-close="handleClose"
  >
    <div>
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
        <el-table-column
          v-for="(item, index) in tableLabel"
          :key="index"
          :prop="item.prop"
          :width="item.width"
          :label="item.label"
        >
        </el-table-column>
      </el-table>
    </div>
    <div class="dialog-footer">
      <el-button @click="handleClose">取 消</el-button>
      <el-button @click="handleClose" type="primary">确 定</el-button>
    </div>
  </el-dialog>
</template>

<script>
import {} from "@/api/index";
import DkdButton from "@/components/DkdButton";
export default {
  data() {
    return {
      currentList: [],
      LayId: "",
    };
  },
  props: {
    // 显隐
    Visible: {
      type: Boolean, //
      required: true, //
    },
    tableLabel: {
      type: Array,
      required: true,
    },
  },

  created() {},
  components: { DkdButton },
  methods: {
    // 关闭
    handleClose() {
      this.$emit("onClose");
    },
    // 获取列表
    async NewtableList(id) {
      //   const res = await getThemachineApi(id);
      console.log(id);
      //   this.currentList = res.data.currentPageRecords;
    },
  },
};
</script>

<style lang="less" scoped>
.el-table__header {
  width: 100% !important;
}
.dialog-footer {
  width: 100%;
  padding: 10px 20px 20px;
  text-align: center !important;
  -webkit-box-sizing: border-box;
  box-sizing: border-box;
}
</style>
