<template>
  <div>
    <el-dialog
      title="新增工单"
      :visible="Visible"
      :before-close="handleClose"
      width="60%"
    >
      <el-form
        ref="form"
        label-width="100px"
        :model="staffInfo"
        :rules="staffInfoRules"
      >
        <el-form-item label="设备编号：" prop="innerCode">
          <el-input
            ref="elinpt"
            placeholder="请输入设备编号"
            maxlength="15"
            show-word-limit
            style="width: 96%"
            @blur="getpersonnelfillApi"
            v-model="staffInfo.innerCode"
          >
          </el-input>
        </el-form-item>
        <el-form-item label="工单类型：" prop="createType">
          <el-select
            placeholder="请选择"
            style="width: 96%"
            v-model="staffInfo.createType"
          >
            <el-option
              :value="item.createType"
              :label="item.className"
              v-for="item in workOrderList"
              :key="item.createType"
              >{{ item.className }}</el-option
            >
          </el-select>
        </el-form-item>
        <el-form-item label="补货数量：" prop="expectCapacity">
          <el-link type="primary" icon="el-icon-s-order" @click="replenishment"
            >补货清单</el-link
          >
        </el-form-item>
        <el-form-item label="运营人员：" prop="userId">
          <el-select
            placeholder="请选择"
            style="width: 96%"
            v-model="staffInfo.userId"
          >
            <el-option
              :value="item.userId"
              :label="item.userName"
              v-for="item in personnelList"
              :key="item.userId"
              >{{ item.userName }}</el-option
            >
          </el-select>
        </el-form-item>
        <el-form-item label="备注：" prop="desc">
          <el-input
            placeholder="请输入备注,内容不超过40字"
            type="textarea"
            v-model="staffInfo.desc"
            class="elinpp"
            maxlength="40"
            show-word-limit
          ></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="handleClose">取 消</el-button>
        <el-button @click="onClose" type="primary">确 定</el-button>
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
import { getpersonnelfillApi } from "@/api/index";
import RePlen from "./grandson/replenishment";
export default {
  name: "userPropCard",
  data() {
    return {
      // 表单数据
      staffInfo: {
        innerCode: "", //设备编号
        createType: "", //工单类型id
        userId: "", //运营人员id
        desc: "", //备注
      },
      dataId: "", // id
      RRePlenVisible: false,
      workOrderList: [{ className: "补货信息", createType: 1 }], //工单类型列表
      personnelList: [], //人员类型列表
      // 表单效验
      staffInfoRules: {
        //整个表单的校验规则
        innerCode: [{ required: true, message: "请输入", trigger: "blur" }],
        createType: [{ required: true, message: "请输入", trigger: "blur" }],
        userId: [{ required: true, message: "请输入", trigger: "blur" }],
        desc: [{ required: true, message: "请输入", trigger: "blur" }],
      },
      // 孙子表单
      tableLabel: [
        { label: "货道编号", width: "150", prop: "nodeName" },
        { label: "商品编号", width: "150", prop: "innerCode" },
        { label: "当前数量", width: "150", prop: "nodeName" },
        { label: "还可添加", width: "150", prop: "innerCode" },
        { label: "补满数量", width: "150", prop: "innerCode" },
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
  computed: {},

  watch: {},

  methods: {
    // 新增表单
    async onClose() {
      await this.$refs.form.validate();
      // await postStrategyApiF(this.staffInfo);
      // this.$emit("Acharm");
    },
    // 获取人员数据列表
    async getpersonnelfillApi() {
      try {
        const res = await getpersonnelfillApi(this.staffInfo.innerCode);
        this.personnelList = res.data;
        console.log(res);
      } catch (error) {
        this.$message({
          message: "警告警告，设备编码错误",
          type: "warning",
        });
      }
    },
    // 补货
    async replenishment() {
      this.$refs.form.validateField("innerCode", (errorMessage) => {
        if (!errorMessage) {
          this.RRePlenVisible = true;
        }
      });
      // 给子组件传递编号
      await this.$refs.Newtable.NewtableList(this.staffInfo.innerCode);
    },
    // 关闭补货
    onClosereP() {
      this.RRePlenVisible = false;
    },
    // 右上方关闭按钮/取消按钮
    async handleClose() {
      this.$emit("onClose");
      await this.$refs.form.clearValidate();
      this.staffInfo = {
        innerCode: "", //设备编号
        createType: "", //工单类型id
        userId: "", //运营人员id
        desc: "", //备注
      };
    },
    // // 获取商品类型列表
    // async getRoleId() {
    //   const { data } = await getStrategyApi();
    //   this.roleNameList = data.currentPageRecords;
    //   console.log("商品类型", this.roleNameList);
    // },
  },
};
</script>

<style lang="less" scoped>
/deep/.el-dialog {
  width: 50% !important;
  height: 60%;
  border-radius: 20px;
}
/deep/.el-upload {
  border: 2px dashed #d8d9d9;
  width: 100px;
  height: 100px;
  display: flex;
  justify-content: center;
  align-items: center;
}
.avatar-uploader .el-upload {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}
.avatar-uploader .el-upload:hover {
  border-color: #409eff;
}
.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  line-height: 178px;
  text-align: center;
}
.avatar {
  width: 100px;
  height: 100px;
  display: block;
}
.elinpp {
  width: 96%;
}
.el-textarea__inner {
  min-height: 100px !important;
}
.dialog-footer {
  width: 100%;
  padding: 10px 20px 20px;
  text-align: center !important;
  -webkit-box-sizing: border-box;
  box-sizing: border-box;
}
</style>
