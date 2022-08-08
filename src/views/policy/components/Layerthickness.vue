<template>
  <el-dialog
    title="策略详情"
    :visible="Visible"
    width="50%"
    :before-close="handleClose"
  >
    <h3>策略名称： {{ Layername }}</h3>
    <div>
      <!-- 左侧 -->
      <div><h3>策略方案：</h3></div>
      <!-- 策略列表 -->
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
          <el-table-column type="index" label="序号" width="130">
          </el-table-column>
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
    </div>
  </el-dialog>
</template>

<script>
import { getThemachineApi } from "@/api/index";
export default {
  data() {
    return {
      Layername: "九折",
      tableLabel: [
        { label: "点位名称", width: "300", prop: "nodeName" },
        { label: "售货机编号", width: "300", prop: "innerCode" },
      ],
      currentList: [],
    };
  },
  props: {
    // 显隐
    Visible: {
      type: Boolean, //
      required: true, //
    },
  },

  created() {},

  methods: {
    handleClose() {
      this.$emit("onClose");
    },
    async getThemachineApi(val) {
      this.Layername = val.policyName;
      const res = await getThemachineApi(val.policyId);
      console.log(res);
      this.currentList = res.data.currentPageRecords;
    },
  },
};
</script>

<style lang="less" scoped>
.el-table__header {
  width: 100% !important;
}
</style>
