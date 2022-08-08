<template>
  <el-dialog
    :title="activeTitle"
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
      <el-form-item label="商品名称" prop="skuName">
        <el-input
          placeholder="请输入商品名称"
          maxlength="15"
          show-word-limit
          style="width: 96%"
          v-model="staffInfo.skuName"
        >
        </el-input>
      </el-form-item>
      <el-form-item label="品牌" prop="brandName">
        <el-input
          placeholder="请输入品牌名称"
          maxlength="10"
          show-word-limit
          style="width: 96%"
          v-model="staffInfo.brandName"
        >
        </el-input>
      </el-form-item>
      <el-form-item label="商品价格" prop="price">
        <el-input
          placeholder="请输入"
          style="width: 96%"
          maxlength="11"
          show-word-limit
          v-model="staffInfo.price"
        ></el-input>
      </el-form-item>

      <el-form-item label="商品类型" prop="regionName">
        <el-select
          placeholder="请选择"
          style="width: 96%"
          v-model="staffInfo.classId"
        >
          <el-option
            :value="item.classId"
            :label="item.className"
            v-for="item in roleNameList"
            :key="item.classId"
            >{{ item.className }}</el-option
          >
        </el-select>
      </el-form-item>
      <el-form-item label="规格" prop="unit">
        <el-input
          placeholder="请输入"
          maxlength="10"
          show-word-limit
          style="width: 96%"
          v-model="staffInfo.unit"
        >
        </el-input>
      </el-form-item>
      <el-form-item label="头像" prop="skuImage">
        <el-upload
          class="avatar-uploader"
          action="https://jsonplaceholder.typicode.com/posts/"
          :show-file-list="false"
          :before-upload="beforeAvatarUpload"
          :on-success="handleAvatarSuccess"
          accept="image.jpg/png"
        >
          <div class="el-upload__tip" slot="tip">
            只能上传jpeg/png文件,且不超过2000kb
          </div>
          <img
            v-if="staffInfo.skuImage"
            :src="staffInfo.skuImage"
            class="avatar"
          />
          <i v-else class="el-icon-plus avatar-uploader-icon"></i>
        </el-upload>
      </el-form-item>
    </el-form>
    <span slot="footer" class="dialog-footer">
      <el-button @click="handleClose">取 消</el-button>
      <el-button @click="onClose" type="primary">确 定</el-button>
    </span>
  </el-dialog>
</template>

<script>
import {
  getStrategyApi,
  getimgApi,
  postStrategyApiF,
  postStrategyApiFF,
} from "@/api/index";
export default {
  name: "userPropCard",
  data() {
    return {
      //   isShow: true, //控制是否展示弹出层
      staffInfo: {
        skuName: "", //商品名称
        brandName: "", //品牌
        price: "", //商品价格
        classId: "", //商品类型
        unit: "", // 规格
        skuImage: "", //头像url
      },
      dataId: "", // 修改id
      roleNameList: [], //商品类型列表
      staffInfoRules: {
        //整个表单的校验规则
        skuName: [{ required: true, message: "请输入", trigger: "blur" }],
        brandName: [{ required: true, message: "请输入", trigger: "blur" }],
        price: [{ required: true, message: "请输入", trigger: "blur" }],
        classId: [{ required: true, message: "请输入", trigger: "blur" }],
        unit: [{ required: true, message: "请输入", trigger: "blur" }],
        skuImage: [{ required: true, message: "请输入", trigger: "blur" }],
      },
    };
  },
  props: {
    Visible: {
      type: Boolean, //
      required: true, //
    },
    // 判断添加还是修改
    Datastate: {
      type: Boolean,
      required: true,
    },
  },

  created() {
    this.getRoleId();
  },
  computed: {
    activeTitle() {
      return this.Datastate ? "添加商品" : "修改商品";
    },
  },

  watch: {},

  methods: {
    // 图片处理
    async handleAvatarSuccess(res, file) {
      console.log(file);
      const formData = new FormData();
      formData.append("fileName", file.raw);
      console.log(formData);
      const { data } = await getimgApi(formData);
      this.staffInfo.skuImage = data;
    },
    // 图片判定
    beforeAvatarUpload(file) {
      const isJPG = file.type === "image/jpeg";
      const isLt2M = file.size / 1024 / 1024 < 2;

      if (!isJPG) {
        this.$message.error("上传头像图片只能是 JPG 格式!");
      }
      if (!isLt2M) {
        this.$message.error("上传头像图片大小不能超过 2MB!");
      }
      return isJPG && isLt2M;
    },

    // 新增上传/修改
    async onClose() {
      // 效验表单
      await this.$refs.form.validate();
      // 新增
      if (this.Datastate) {
        await postStrategyApiF(this.staffInfo);
        this.$emit("Acharm");
      } else {
        await postStrategyApiFF(this.staffInfo, this.dataId);
        this.$emit("Bcharm");
      }
    },
    // 右上方关闭按钮/取消按钮
    handleClose() {
      this.$emit("onClose");
      this.staffInfo = {
        skuName: "", //商品名称
        brandName: "", //品牌
        price: "", //商品价格
        classId: "", //商品类型id
        unit: "", // 规格
        skuImage: "", //头像url
      };
    },
    // 获取商品类型列表
    async getRoleId() {
      const { data } = await getStrategyApi();
      this.roleNameList = data.currentPageRecords;
      console.log("商品类型", this.roleNameList);
    },
    // 编辑回显
    async getDeptByval(val) {
      this.staffInfo = {
        skuName: val.skuName, //商品名称
        brandName: val.brandName, //品牌
        price: val.price, //商品价格
        classId: val.classId, //商品类型
        unit: val.unit, // 规格
        skuImage: val.skuImage, //头像url
      };
      this.dataId = val.skuId;
    },
  },
};
</script>

<style lang="less" scoped>
/deep/.el-dialog {
  width: 40% !important;
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
</style>
