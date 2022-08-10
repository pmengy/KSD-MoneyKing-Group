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
    </div>
    </div>
  </el-dialog>
</template>

<script>
import { getThemachineApi ,getThemachineApiF} from "@/api/index";
import DkdButton from "@/components/DkdButton";
export default {
  data() {
    return {
      pageIndex: "",
      totalPage: "",
      totalCount: "",
      Layername: "九折",
      tableLabel: [
        { label: "点位名称", width: "300", prop: "nodeName" },
        { label: "售货机编号", width: "300", prop: "innerCode" },
      ],
      currentList: [],
      LayId:''
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
 components: { DkdButton },
  methods: {
    // 关闭
    handleClose() {
      this.$emit("onClose");
    },
    // 获取列表
    async getThemachineApi(val) {
      this.Layername = val.policyName;
      this.LayId=val.policyId
      const res = await getThemachineApi(val.policyId);
      console.log(res);
      this.pageIndex = res.data.pageIndex;
      this.totalPage = res.data.totalPage;
      this.totalCount = res.data.totalCount;
      this.currentList = res.data.currentPageRecords;
    },
        // 下一页
    async nextPage() {
      const res = await getThemachineApiF(this.LayId,{
        pageIndex: parseInt(this.pageIndex) + 1,
      });
      this.currentList = res.data.currentPageRecords;
      this.pageIndex = parseInt(this.pageIndex) + 1;
    },
    // 获取上一页数据
    async lastPage() {
      if (parseInt(this.pageIndex) === 1) {
        return this.$message({
          showClose: true,
          message: "没有上一页啦！！",
          type: "warning",
        });
      }
      const res = await getThemachineApiF(this.LayId,{
        pageIndex: parseInt(this.pageIndex) - 1,
      });
      this.pageIndex = parseInt(this.pageIndex) - 1;
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
