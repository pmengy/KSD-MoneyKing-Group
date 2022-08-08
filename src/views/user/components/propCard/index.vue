<template>
  <el-dialog
    :title="activeTitle"
    :visible="visible"
    width="60%"
    :before-close="handleClose"
  >
    <el-form
      ref="staffForm"
      label-width="100px"
      :model="staffInfo"
      :rules="staffInfoRules"
    >
      <el-form-item label="人员名称" prop="userName">
        <el-input
          placeholder="请输入人员名称"
          maxlength="10"
          show-word-limit
          style="width: 96%"
          v-model="staffInfo.userName"
        >
        </el-input>
      </el-form-item>
      <el-form-item label="角色" prop="regionId">
        <el-select
          placeholder="请选择角色"
          style="width: 96%"
          v-model="roleName"
        >
          <el-option
            :value="item.roleName"
            v-for="item in roleNameList"
            :key="item.roleId"
            >{{ item.roleName }}</el-option
          >
        </el-select>
      </el-form-item>
      <el-form-item label="联系电话" prop="mobile">
        <el-input
          placeholder="请输入联系电话"
          style="width: 96%"
          maxlength="11"
          show-word-limit
          v-model="staffInfo.mobile"
        ></el-input>
      </el-form-item>

      <el-form-item label="负责区域" prop="regionName">
        <el-select
          placeholder="请选择"
          style="width: 96%"
          v-model="staffInfo.regionName"
        >
          <el-option
            :value="item.name"
            v-for="item in regionNameList"
            :key="item.id"
            @click="staffInfo.regionId = item.id"
            >{{ item.name }}</el-option
          >
        </el-select>
      </el-form-item>
      <el-form-item label="头像" prop="image">
        <el-upload
          class="avatar-uploader"
          action="https://jsonplaceholder.typicode.com/posts/"
          :show-file-list="false"
          :on-success="handleAvatarSuccess"
          :before-upload="beforeAvatarUpload"
          accept="image.jpg"
        >
          <div class="el-upload__tip" slot="tip">
            只能上传jpeg文件，且不超过2000kb
          </div>
          <img v-if="staffInfo.image" :src="staffInfo.image" class="avatar" />
          <i v-else class="el-icon-plus avatar-uploader-icon"></i>
        </el-upload>
      </el-form-item>
      <el-form-item label="状态" prop="status">
        <el-checkbox
          v-model="staffInfo.status"
          value="1"
          label="是否启用"
        ></el-checkbox>
      </el-form-item>
    </el-form>

    <span slot="footer" class="dialog-footer">
      <el-button @click="canCel">取 消</el-button>
      <el-button type="primary" @click="confirm">确 定</el-button>
    </span>
  </el-dialog>
</template>

<script>
import {
  getRoleIdAPI,
  getRegionListAPI,
  getImageUrlAPI,
  upLoadAddStaffInfoAPI,
  updateStaffInfoAPI,
} from "@/api/user";
export default {
  name: "userPropCard",
  data() {
    return {
      //   isShow: true, //控制是否展示弹出层`
      staffInfo: {
        //新增人员信息存储对象
        userName: "", //用户名
        roleId: "", //角色id
        mobile: "", //手机号
        regionId: "", //所属区域id
        regionName: "", //所属区域名称
        status: false, //是否启用状态
        image: "", //头像url
      },
      roleName: "", //选择的角色名
      regionUserName: "", //角色名称
      roleNameList: [], //存储查询返回的角色名称
      regionNameList: [], //存储查询返回的区域名称
      staffInfoRules: {
        //整个表单的校验规则
        userName: [
          { required: true, message: "请输入人员名称", trigger: "blur" },
        ],
        roleId: [
          { required: true, message: "请输入角色名称", trigger: "blur" },
        ],
        mobile: [
          { required: true, message: "请输入手机号", trigger: "blur" },
          {
            pattern: /^(?:(?:\+|00)86)?1[3-9]\d{9}$/,
            message: "请输入正确手机号",
            trigger: "blur",
          },
        ],
        regionName: [
          { required: true, message: "请输入区域名称", trigger: "blur" },
        ],

        image: [{ required: true, message: "请上传头像文件", trigger: "blur" }],
        status: [
          { required: true, message: "请输入角色名称", trigger: "blur" },
        ],
      },
      // regionId:''
    };
  },
  props: {
    visible: {
      type: Boolean, //
      required: true, //
    },
    userInfo: {
      type: Object,
      required: true,
    },
  },

  created() {
    this.getRoleId();
    this.getRegionList();
  },
  computed: {
    regionId() {
      let arr = [];
      arr = this.regionNameList.filter(
        (item) => item.name === this.staffInfo.regionName
      );
      return arr;
    },
    isEdit() {
      if (this.userInfo.userId) {
        return true;
      }
      return false;
    },
    activeTitle() {
      //根据传过来的对象是否有值判断是否显示编辑还是修改
      if (this.userInfo.userId) {
        return "编辑人员信息";
      }
      return "新增人员";
    },
  },

  watch: {
    // 监视选择的角色名，将角色id分别赋值
    roleName(newVal, oldVal) {
      if (newVal == "运营员") {
        this.staffInfo.roleId = 2;
      } else {
        this.staffInfo.roleId = 3;
      }
    },
    isEdit(newVal) {
      if (newVal) {
        if (this.userInfo.roleId === 3) {
          this.roleName = "维修员";
        } else if (this.userInfo.roleId == 2) {
          this.roleName = "运营员";
        }
        this.staffInfo = this.userInfo;
      }
    },
  },

  methods: {
    async handleAvatarSuccess(res, file) {
      const formData = new FormData();
      formData.append("fileName", file.raw);
      console.log(formData);

      const { data } = await getImageUrlAPI(formData);

      this.staffInfo.image = data;
    },
    beforeAvatarUpload(file) {
      const isJPEG = file.type === "image/jpeg";
      // const isJPG = file.type === "image/jpg";
      // const isPNG = file.type === "image/png";
      const isLt2M = file.size / 1024 / 1024 < 2;

      if (!isJPEG) {
        // this.$message.error("上传头像图片只能是 jpeg/JPG/png 格式!");
        this.$message.error("上传头像图片只能是 jpeg 格式!");
      }
      if (!isLt2M) {
        this.$message.error("上传头像图片大小不能超过 2MB!");
      }
      return isJPEG && isLt2M;
    },
    // 右上方关闭按钮
    handleClose(done) {
      this.$emit("onClose");
      this.staffInfo = {};
      this.roleName = "";
    },
    // 获取角色列表
    async getRoleId() {
      const { data } = await getRoleIdAPI();
      this.roleNameList = data;
    },
    // 获取区域列表
    async getRegionList() {
      const { data } = await getRegionListAPI({ pageSize: 20 });
      this.regionNameList = data.currentPageRecords;
    },
    // 取消
    canCel() {
      this.$emit("onClose");
      this.staffInfo = {};
      this.roleName = "";
    },
    // 确定
    async confirm() {
      // 将区域id保存到对象中
      await this.$refs.staffForm.validate();
      // 编辑状态
      if (this.isEdit) {
        await updateStaffInfoAPI(this.userInfo.userId, this.staffInfo);
        this.$emit("onClose");
        this.$message.success("更新用户信息成功！");
      } else {
        // 添加状态
        this.staffInfo.regionId = this.regionId[0].id;
        try {
          const { data } = await upLoadAddStaffInfoAPI(this.staffInfo);
          if (data) {
            // 关闭弹层
            this.$emit("onClose");
            // 移除所有内容
            this.$refs.staffForm.resetFields();
            this.$message.success("添加人员成功！");
          }
        } catch (error) {
          this.$message.fail("已有重复对象！");

          this.$message.fail("请填写合法完整信息后再进行添加！");
        }
      }
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
