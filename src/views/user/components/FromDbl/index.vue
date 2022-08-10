<template>
  <header>
    <el-card class="box-card">
      <div class="search">
        <el-form :inline="true" :model="user" class="demo-form-inline">
          <el-form-item :label="valueFirst">
            <el-input v-model="user.userName" placeholder="请输入"></el-input>
          </el-form-item>
          <el-form-item :label="valueSecond">
            <el-select v-model="user.roleId" placeholder="请选择">
              <el-option
                :label="item.roleName"
                :value="item.roleId"
                v-for="(item, index) in List"
                :key="index"
              ></el-option>
            </el-select>
          </el-form-item>
          <el-form-item>
            <el-button
              type="primary"
              icon="el-icon-search"
              @click.native="search"
              ><span>查询</span></el-button
            >
          </el-form-item>
        </el-form>
      </div>
    </el-card>
  </header>
</template>

<script>
export default {
  name: "userWorkList",
  data() {
    return {
      user: {
        userName: "",
        roleId: "",
      },
    };
  },
  props: {
    List: {
      type: Array,
      required: true,
    },
    valueFirst: {
      type: String,
    },
    valueSecond: {
      type: String,
    },
  },
  name: "search",

  created() {},

  methods: {
    // 将搜索框的值传过去
    search() {
      this.$emit("searchValue", this.user);
    },
  },
};
</script>

<style lang="less" scoped>
// 头部
header {
  margin-bottom: 20px;
  /deep/.el-card.is-always-shadow {
    -webkit-box-shadow: unset;
    box-shadow: 0;
  }
  .el-card {
    border: 0;
  }
  /deep/.el-card__body {
    padding: 0;
  }
  /deep/label {
    font-weight: 400 !important;
  }
  .search {
    display: flex;
    height: 64px;
    align-items: center;
    justify-content: flex-start;
    padding-left: 17px;
    background-color: #fff;
    .el-form-item {
      margin: 0;
    }
    .el-form-item {
      margin-right: 10px;
      font-weight: 400 !important;
    }
    .el-button {
      width: 80px;
      height: 36px;
      padding: 0;
      font-size: 16px;
      background-color: #5f84ff;
      span {
        font-size: 14px;
      }
    }
  }
}
</style>
