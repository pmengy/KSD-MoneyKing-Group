<template>
  <div>
    <el-dialog
      title="策略详情"
      :visible="Visible"
      width="40%"
      :before-close="handleClose"
    >
      <div>
        <!-- 头部 -->
        <div class="task-status">
          <!-- 失败头部 -->
          <el-row v-if="true" style="width: 100%">
            <el-col :span="4" class="colimg"
              ><img
                class="icon"
                src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABoAAAAaCAYAAACpSkzOAAABqUlEQVRIS72WvUrDUBTH/6cGMjq4qO0DOFgQSocbcBFUnDWvURQER+0oCEpfI+5ii12E3KEEBB18gEZdHNwMxBy5tQ39sr1JaDLmnv/93Xu+7iHM+SzL2gRwxMzbADYArPQlnwBeiegRwK3rui+ztqL/Fi3L2mLmSwB78w7TX28S0Znruk/T7CdAtm0vdbvdK2auEVFBE9IzY+aIiBqlUunUcZyfYe0IqFKpLJum6TDzbhLAuC0RtYIgsD3P+xqsxSB1E9/377JC4o2JWsVi8WBwsxgkhLgGcJzlJlO0N1LKE/W/B1KBj6LI04iJE4ZhTWkMw2gAsGcdTMWsUChUVIL0QEKIe53sCsNwrdPpfChNtVpdNQzjXcMDTSnlPqk6YeZnDQFSgkBEZQW6YOZzHRCARK4bSow6CSEeAOxogtKatRXIB7Cus4OUcqTuhBCsowPwpkDfAEwdQQZQkCsoN9dpJ0MG17UTpXdaEBHVExVsBlA5UQtKCfprQQmbqk4VxDYTTbXfWBf/TChQbg+fguXylA8cm8twMhzphY9b42klhCgT0WHWAfIXFPYBcBvJ9uQAAAAASUVORK5CYII="
              />
            </el-col>
            <el-col :span="12" class="col22"
              ><span class="status">取消</span>
            </el-col>
            <el-col :span="8"
              ><img
                class="pic"
                src="http://likede2-admin.itheima.net/img/pic_3.e8208e34.png"
              />
            </el-col>
          </el-row>
          <!-- 成功头部 -->
          <el-row v-else style="width: 100%">
            <el-col :span="4" class="colimg"
              ><img
                class="icon"
                src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABoAAAAaCAYAAACpSkzOAAABqUlEQVRIS72WvUrDUBTH/6cGMjq4qO0DOFgQSocbcBFUnDWvURQER+0oCEpfI+5ii12E3KEEBB18gEZdHNwMxBy5tQ39sr1JaDLmnv/93Xu+7iHM+SzL2gRwxMzbADYArPQlnwBeiegRwK3rui+ztqL/Fi3L2mLmSwB78w7TX28S0Znruk/T7CdAtm0vdbvdK2auEVFBE9IzY+aIiBqlUunUcZyfYe0IqFKpLJum6TDzbhLAuC0RtYIgsD3P+xqsxSB1E9/377JC4o2JWsVi8WBwsxgkhLgGcJzlJlO0N1LKE/W/B1KBj6LI04iJE4ZhTWkMw2gAsGcdTMWsUChUVIL0QEKIe53sCsNwrdPpfChNtVpdNQzjXcMDTSnlPqk6YeZnDQFSgkBEZQW6YOZzHRCARK4bSow6CSEeAOxogtKatRXIB7Cus4OUcqTuhBCsowPwpkDfAEwdQQZQkCsoN9dpJ0MG17UTpXdaEBHVExVsBlA5UQtKCfprQQmbqk4VxDYTTbXfWBf/TChQbg+fguXylA8cm8twMhzphY9b42klhCgT0WHWAfIXFPYBcBvJ9uQAAAAASUVORK5CYII="
              />
            </el-col>
            <el-col :span="12" class="col22"
              ><span class="status">取消</span>
            </el-col>
            <el-col :span="8"
              ><img
                class="pic"
                src="http://likede2-admin.itheima.net/img/pic_3.e8208e34.png"
              />
            </el-col>
          </el-row>
        </div>
      </div>
      <el-row class="rowrez">
        <el-col :span="12"
          ><div>设备编号： <span>{{}}</span></div></el-col
        >
        <el-col :span="12"
          ><div>创建日期： <span>{{}}</span></div></el-col
        >
      </el-row>
      <el-row class="rowrez">
        <el-col :span="12"
          ><div>取消日期： <span>{{}}</span></div></el-col
        >
        <el-col :span="12"
          ><div>运营人员： <span>{{}}</span></div></el-col
        >
      </el-row>
      <el-row class="rowrez">
        <el-col :span="12"
          ><div>工单类型： <span>{{}}</span></div></el-col
        >
        <el-col :span="12"
          ><div>
            补货数量：
            <el-link
              type="primary"
              style="font-size: 18px"
              @click="replenishment"
              >补货详情</el-link
            >
          </div></el-col
        >
      </el-row>
      <el-row class="rowrez">
        <el-col :span="12"
          ><div>工单方式： <span>{{}}</span></div></el-col
        >
        <el-col :span="12"
          ><div>取消原因： <span>{{}}</span></div></el-col
        >
      </el-row>

      <div class="dialog-footer">
        <el-button @click="handleClosee" class="buttonnn">重新创建</el-button>
      </div>
    </el-dialog>
    <RePlen
      ref="Newtable"
      :Visible.sync="RRePlenVisible"
      :tableLabel="tableLabel"
      @onClose="onClosereP"
    ></RePlen>
  </div>
</template>

<script>
import RePlen from "./grandson/replenishment";
export default {
  data() {
    return {
      // 详情数据
      stateInfo: {},
      stateId: "", // 当前id
      RRePlenVisible: false,
      personnelList: [],
      // 孙子表单
      tableLabel: [
        { label: "货道编号", width: "250", prop: "nodeName" },
        { label: "商品", width: "250", prop: "innerCode" },
        { label: "补货数量", width: "250", prop: "innerCode" },
      ],
    };
  },
  components: { RePlen },
  props: {
    Visible: {
      type: Boolean, //
      required: true, //
    },
  },
  created() {},

  methods: {
    // 关闭
    handleClose() {
      this.$emit("onClose");
    },
    // 跳转表单
    handleClosee() {
      this.$emit("onClose");
      this.$emit("gameclock");
    },
    // 关闭补货
    onClosereP() {
      this.RRePlenVisible = false;
    },
    // 展示补货详情
    async replenishment() {
      this.RRePlenVisible = true;
    },
  },
};
</script>

<style lang="less" scoped>
.task-status {
  display: -webkit-box;
  display: -ms-flexbox;
  // display: flex;
  -webkit-box-align: center;
  -ms-flex-align: center;
  align-items: center;
  height: 54px;
  margin-bottom: 25px;
  background-color: hsla(0, 0%, 92.5%, 0.39);
}
.col22 {
  height: 54px;
  line-height: 54px;
  align-items: center;
}
.colimg {
  height: 54px;
  line-height: 54px;
  align-items: center;
}
.icon {
  margin-left: 22px;
}
.status {
  -webkit-box-flex: 1;
  -ms-flex: 1;
  flex: 1;
  height: 100%;
  font-size: 20px;
  line-height: 100%;
  margin-left: 16px;
  color: rgba(0, 0, 0, 0.85);
}
.pic {
  margin-right: 76px;
  margin-bottom: 7px;
}
.dialog-footer {
  width: 100%;
  padding: 10px 20px 20px;
  text-align: center !important;
  -webkit-box-sizing: border-box;
  box-sizing: border-box;
}
.buttonnn {
  background-color: #f3e7e1 !important;
}
.rowrez {
  padding-bottom: 20px;
  padding-left: 30px;
  font-size: 20px;
}
</style>
