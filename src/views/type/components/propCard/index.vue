<template>
  <el-dialog
    :title="vmInfo.typeId ? '修改设备类型' : '新增设备类型'"
    :visible="visible"
    width="50%"
    :before-close="handleClose"
  >
    <el-form
      ref="form"
      label-width="100px"
      :model="vmInfo"
      :rules="vmInfoRules"
    >
      <el-form-item label="型号名称:" prop="name">
        <el-input
          placeholder="请输入型号名称"
          maxlength="10"
          show-word-limit
          style="width: 96%"
          v-model="vmInfo.name"
        >
        </el-input>
      </el-form-item>
      <el-form-item label="型号编码:" prop="model">
        <el-input
          placeholder="请输入型号编码"
          style="width: 96%"
          maxlength="15"
          show-word-limit
          v-model="vmInfo.model"
        ></el-input>
      </el-form-item>

      <el-form-item label="货道行数:" prop="vmRow">
        <el-input-number
          style="width: 96%"
          controls-position="right"
          v-model="vmInfo.vmRow"
          placeholder="请输入"
          :min="1"
          :max="10"
        ></el-input-number>
      </el-form-item>
      <el-form-item label="货道列数:" prop="vmCol">
        <el-input-number
          style="width: 96%"
          controls-position="right"
          v-model="vmInfo.vmCol"
          placeholder="请输入"
          :min="1"
          :max="10"
        ></el-input-number>
      </el-form-item>
      <el-form-item label="货道容量:" prop="channelMaxCapacity">
        <el-input-number
          style="width: 96%"
          controls-position="right"
          v-model="vmInfo.channelMaxCapacity"
          placeholder="请输入"
          :min="1"
          :max="10"
        ></el-input-number>
      </el-form-item>
      <el-form-item label="设备图片:" prop="image">
        <el-upload
          class="avatar-uploader"
          action="https://jsonplaceholder.typicode.com/posts/"
          :show-file-list="false"
          :on-success="handleAvatarSuccess"
          :before-upload="beforeAvatarUpload"
          accept=".jpg,.png"
        >
          <div class="el-upload__tip" slot="tip">
            支持拓展名：jpg、png，文件不得大于100kb
          </div>
          <img v-if="vmInfo.image" :src="vmInfo.image" class="avatar" />
          <i v-else class="el-icon-plus avatar-uploader-icon"></i>
        </el-upload>
      </el-form-item>
    </el-form>

    <span
      slot="footer"
      style="display: flex; justify-content: center"
      class="dialog-footer"
    >
      <el-button
        style="margin-right: 20px; background-color: #f3e7e1"
        @click="canCel"
        >取 消</el-button
      >
      <el-button
        @click="confirm"
        style="background-color: #ff6d29; border: unset"
        type="primary"
        >确 定</el-button
      >
    </span>
  </el-dialog>
</template>

<script>
import { getImgUrl, addVmType, editVmType, getVmTypeList } from "@/api/type";
export default {
  name: "typePopup",
  data() {
    return {
      vmInfo: {
        name: "",
        vmCol: undefined,
        vmRow: undefined,
        channelMaxCapacity: undefined,
        model: "",
        image: "",
      },
      typeId: "",
      vmInfoRules: {
        name: [{ required: true, message: "请输入型号名称", trigger: "blur" }],
        model: [{ required: true, message: "请输入型号编码", trigger: "blur" }],
        vmRow: [{ required: true, message: "请输入货道行数", trigger: "blur" }],
        vmCol: [{ required: true, message: "请输入货道列数", trigger: "blur" }],
        channelMaxCapacity: [
          { required: true, message: "请输入货道容量", trigger: "blur" },
        ],
        image: [{ required: true, message: "请上传设备图片", trigger: "blur" }],
      },
    };
  },
  props: {
    visible: {
      type: Boolean,
      required: true,
    },
  },

  created() {},

  methods: {
    async handleAvatarSuccess(res, file) {
      const formData = new FormData();
      formData.append("fileName", file.raw);
      const { data } = await getImgUrl(formData);
      this.vmInfo.image = data;
    },
    beforeAvatarUpload(file) {
      const fileSuffix = file.name.substring(file.name.lastIndexOf(".") + 1);

      const whiteList = ["jpg", "png"];

      if (whiteList.indexOf(fileSuffix) === -1) {
        this.$message.error("上传图片只能是jpg和png格式");
        return false;
      }
      const isLt2M = file.size / 1024 < 100;

      if (!isLt2M) {
        this.$message.error("上传设备图片大小不能超过100kb!");
        return false;
      }
    },
    // 右上方关闭按钮
    handleClose() {
      this.$emit("onClose");
    },
    canCel() {
      this.$emit("onClose");
    },
    async confirm() {
      await this.$refs.form.validate();
      try {
        if (this.vmInfo.typeId) {
          // 编辑
          await editVmType(this.vmInfo);
          this.canCel();
          this.$message.success("修改设备成功");
          this.$emit("onConfirm");
        } else {
          await addVmType(this.vmInfo);
          this.canCel();
          this.$message.success("新增设备成功");
          this.$emit("onConfirm");
          this.$refs.form.resetFields();
        }
      } catch (error) {
        this.$message.error(error.response.data);
      }
    },
  },
};
</script>

<style lang="scss" scoped>
::v-deep.el-dialog {
  width: 40% !important;
  border-radius: 20px;
  > .el-dialog__footer {
    display: flex;
    align-items: center;
    justify-content: center;
    margin-top: 10px;
  }
  // ::v-deep(.el-dialog__body) {
  //   padding: 0px 80px;
  // }
  // ::v-deep.el-dialog__title {
  //   font-weight: 700;
  // }
  // ::v-deep.el-dialog__footer {
  //   display: flex;
  //   align-items: center;
  //   justify-content: center;
  //   ::v-deep(.el-button--primary) {
  //     border: unset;
  //     background-color: #ff8437;
  //   }
  //   ::v-deep.el-button--default {
  //     border: unset;
  //     margin-right: 10px;
  //     background-color: #fbf4f0;
  //   }
  // }
}

::v-deep.el-upload {
  border: 2px dashed #d8d9d9;
  width: 100px;
  height: 100px;
  display: flex;
  justify-content: center;
  align-items: center;
}
.avatar-uploader .el-upload {
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
  width: 78px;
  height: 78px;
  line-height: 78px;
  text-align: center;
  border: 1px dashed #ccc;
}
.avatar {
  width: 75px;
  height: 75px;
  display: block;
}
</style>
