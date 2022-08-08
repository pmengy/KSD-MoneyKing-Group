<template>
  <div>
    <el-form :inline="true" :model="formInline" class="demo-form-inline">
      <el-form-item label="商品搜索">
        <el-input v-model="formInline.user" placeholder="请输入名称关键字"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button
          type="primary"
          @click="onSubmit"
          icon="el-icon-search"
          @click.native="$emit('search', formInline.user)"
          >查询</el-button
        >
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
  data() {
    return {
      formInline: {
        user: "",
      },
    };
  },
  methods: {
    onSubmit() {
      console.log("submit!");
    },
  },
};
</script>

<style scoped>
.el-form-item {
  height: 52px;
  margin-bottom: 24px;
  background: #fff;
  border: none;
  border-radius: 4px;
}
:deep(.el-input__inner) {
  padding-right: 30px;
  border: 1px solid #dcdfe6 !important;
}
.el-button--primary {
  background-color: #5f84ff;
  border-color: #5f84ff;
}
.el-form {
  margin-right: 700px;
  height: 50px;
}
</style>
