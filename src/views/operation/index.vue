<template>
  <div class="dashboard-container">
    <div class="app-container">运维工单</div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      formInline: {
        taskCode: "",
        status: "",
      },
      currentList: [],
      taskStatusList: [],
      pageIndex: "",
      totalPage: "",
      totalCount: "",
      tableLabel: [
        { label: "工单编号", width: "118", prop: "taskCode" },
        { label: "设备编号", width: "130", prop: "innerCode" },
        { label: "工单类型", width: "136", prop: "taskType.typeName" },
        { label: "工单方式", width: "130", prop: "createType" },
        {
          label: "工单状态",
          width: "136",
          prop: "taskStatusTypeEntity.statusName",
        },
        { label: "运营人员", width: "136", prop: "userName" },
        { label: "创建日期", width: "160", prop: "createTime" },
      ],
    };
  },
  components: { DkdButton, DkdTable },
  created() {
    this.searchTasks();
    this.getTaskStatus();
  },

  created() {},

  methods: {},
};
</script>

<style scoped lang="scss">
.box-search {
  margin-bottom: 20px;
  border: #fff;
  .list-top-btn {
    margin-bottom: 10px;
  }
}
.el-form {
  .el-form-item {
    margin-bottom: 0;
  }
  .el-button--primary {
    background-color: #5f84ff;
  }
}
.Pagination {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
</style>
<style>
.item .el-form-item__label {
  font-weight: 400;
}
.el-form .el-button--primary {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 80px;
  height: 36px;
}
</style>
