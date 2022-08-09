<template>
  <el-table
    :data="currentList"
    style="width: 1258px"
    :header-cell-style="{
      background: '#f3f6fb',
      color: '#666',
      height: '42px',
      'font-weight': 400,
    }"
    :highlight-current-row="true"
    empty-text="暂无数据"
  >
    <!-- 序号 -->
    <el-table-column
      type="index"
      :index="indexMethod"
      label="序号"
      width="100"
    />
    <!-- 数据 -->
    <el-table-column
      v-for="(item, index) in tableLabel"
      :key="index"
      :prop="item.prop"
      :width="item.width"
      :label="item.label"
      :formatter="formatData"
    />
    <!-- 操作 -->
    <el-table-column label="操作" width="260">
      <template slot-scope="scope">
        <!-- <el-button type="text" class="operation" @click="open"
          >重置密码</el-button
        > -->
        <el-button type="text" @click="chongzhi(scope.row)"
          >重置密码</el-button
        >
        <!-- 重置弹出框 -->
        <el-dialog
          title="提示"
          :visible.sync="centerDialogVisible"
          width="30%"
          center
        >
          <span>确定要重置合作密码么?</span>
          <span slot="footer" class="dialog-footer">
            <el-button @click="centerDialogVisible = false">取 消</el-button>
            <el-button type="primary" @click="center"
              >确 定</el-button
            >
          </span>
        </el-dialog>
        <el-button type="text" class="operation" @click="content(scope.row)"
          >查看详情</el-button
        >
        <!-- 弹出框 -->
        <el-dialog
          title="合作商详情"
          :visible.sync="dialogTableVisible"
          width="40%"
        >
          <div class="text">
            <p>合作商名称：{{ contentList.name }}</p>
            <p>联系人：{{ contentList.contact }}</p>
          </div>
          <div class="text">
            <p>联系电话：{{ contentList.mobile }}</p>
            <p>分成比例：{{ contentList.ratio }}%</p>
          </div>
        </el-dialog>
        <el-button type="text" class="operation" @click="change(scope.row)"
          >修改</el-button
        >
        <!-- 修改弹出框 -->
        <el-dialog
          ref="addbox"
          title="修改合作商"
          width="40%"
          :visible.sync="dialogFormVisible"
        >
          <div class="change">
            <el-form :model="contentList">
              <el-form-item label="合作商名称 : ">
                <el-input
                  v-model="contentList.name"
                  show-word-limit
                  maxlength="10"
                  class="inputa"
                />
              </el-form-item>
              <el-form-item label="联系人 : ">
                <el-input
                  v-model="contentList.contact"
                  show-word-limit
                  maxlength="10"
                  class="inputb"
                />
              </el-form-item>
              <el-form-item label="联系电话 : ">
                <el-input
                  v-model="contentList.mobile"
                  show-word-limit
                  maxlength="11"
                  class="inputc"
                />
              </el-form-item>
              <el-form-item label="分成比例 : ">
                <el-input
                  v-model="contentList.ratio"
                  show-word-limit
                  type="Number"
                  class="inputd"
                />
              </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
              <el-button @click="cancel">取 消</el-button>
              <el-button type="primary" @click="confirm">确 定</el-button>
            </div>
          </div>
        </el-dialog>
        <!-- 新建弹出框 -->
        <el-dialog
          title="收货地址"
          :visible="dialogVisible"
          :before-close="handleClose"
        >
          <div class="change">
            <el-form :model="form">
              <el-form-item label="合作商名称" :label-width="formLabelWidth">
                <el-input
                  placeholder="请输入"
                  maxlength="10"
                  show-word-limit
                  v-model="form.name"
                  autocomplete="off"
                ></el-input>
              </el-form-item>
              <el-form-item label="联系人" :label-width="formLabelWidth">
                <el-input
                  placeholder="请输入"
                  maxlength="10"
                  show-word-limit
                  v-model="form.contact"
                  autocomplete="off"
                ></el-input>
              </el-form-item>
              <el-form-item label="联系电话" :label-width="formLabelWidth">
                <el-input
                  placeholder="请输入"
                  maxlength="11"
                  show-word-limit
                  v-model="form.mobile"
                  autocomplete="off"
                ></el-input>
              </el-form-item>
              <el-form-item label="分成比例" :label-width="formLabelWidth">
                <el-input
                  placeholder="请输入"
                  type="number"
                  v-model="form.ratio"
                  autocomplete="off"
                ></el-input>
              </el-form-item>
              <el-form-item label="账号" :label-width="formLabelWidth">
                <el-input
                  placeholder="请输入"
                  maxlength="18"
                  show-word-limit
                  v-model="form.account"
                  autocomplete="off"
                ></el-input>
              </el-form-item>
              <el-form-item label="密码" :label-width="formLabelWidth">
                <el-input
                  placeholder="请输入"
                  maxlength="20"
                  show-word-limit
                  v-model="form.password"
                  autocomplete="off"
                ></el-input>
              </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
              <el-button @click="cancelNew">取 消</el-button>
              <el-button type="primary" @click="confirmNew">确 定</el-button>
            </div>
          </div>
        </el-dialog>
        <el-button
          type="text"
          style="color: red"
          class="operation"
          @click="delPar(scope.row.id)"
          >删除</el-button
        >
                <el-dialog
          title="提示"
          :visible.sync="delDialogVisible"
          width="30%"
          center
        >
          <span>确定要重置合作密码么?</span>
          <span slot="footer" class="dialog-footer">
            <el-button @click="delDialogVisible = false">取 消</el-button>
            <el-button type="primary" @click="del"
              >确 定</el-button
            >
          </span>
        </el-dialog>
      </template>
    </el-table-column>
  </el-table>
</template>

<script>
import dayjs from "dayjs";
export default {
  name: "Fengz",
  props: {
    currentList: {
      type: Array,
      required: true,
    },
    tableLabel: {
      type: Array,
      default: () => [],
    },
    currentIndex: {
      type: Number,
      required: true,
    },
    changeList: {
      type: Object,
      required: true,
    },
    dialogVisible: {
      type: Boolean,
      required: true,
    },
  },
  data() {
    return {
      dialogTableVisible: false,
      dialogFormVisible: false,
      centerDialogVisible: false,
      delDialogVisible:false,
      form: {
        account: "",
        contact: "",
        mobile: "",
        name: "",
        password: "",
        ratio: "",
      },
      formLabelWidth: "100px",
      gridData: [],
      contentList: {
        name: "",
        contact: "",
        mobile: "",
        ratio: "",
      },
      id:''
    };
  },
  created() {},
  watch: {},
  computed: {},
  methods: {
    indexMethod(index) {
      return parseInt(this.currentIndex) - 9 + index;
    },
    formatData(row, column, cellValue) {
      if (column.property === "createType") {
        if (cellValue === 1) {
          return "自动";
        }
        return "手动";
      }
      if (column.property === "createTime") {
        return dayjs(cellValue).format("YYYY.MM.DD HH:mm:ss");
      }
      return cellValue;
    },
    content(val) {
      this.dialogTableVisible = true;
      console.log(val);
      this.contentList = val;
    },
    change(val) {
      this.dialogFormVisible = true;
      console.log(val);
      this.contentList = val;
      this.id=val.id
    },
    cancel() {
      this.dialogFormVisible = false;
    },
    confirm() {
      this.dialogFormVisible = false;
      this.$emit('changeCom',this.contentList,this.id)
    },
    cancelNew() {
      this.$emit("onClose", false);
    },
    confirmNew() {
      this.$emit("onClose", false);
      this.form.ratio = Number(this.form.ratio);
      this.$emit("addNew", this.form);
    },
    //解决弹框取消报红
    handleClose(done) {
      this.$emit("onClose", false);
    },
    //重置密码按钮
    chongzhi(val){
      this.centerDialogVisible = true
      this.id=val.id
      // console.log(val);
    },
    //重置密码确认按钮
    center(){
      this.centerDialogVisible = false
      console.log(this.id,'ididid');
      this.$emit('reset',this.id)
    },
    // open() {
    //   this.$confirm("确定要重置合作密码么?", "提示", {
    //     confirmButtonText: "确定",
    //     cancelButtonText: "取消",
    //     type: "warning",
    //     center: true,
    //     showClose: false,
    //     roundButton: true,
    //   })
    //     .then(() => {
    //       this.$message({
    //         type: "success",
    //         message: "删除成功!",
    //       });
    //     })
    //     .catch(() => {
    //       this.$message({
    //         type: "info",
    //         message: "已取消删除",
    //       });
    //     });
    // },

    //删除
    delPar(id) {
      this.delDialogVisible = true
      console.log(id);
      this.id=id
    },
    //删除确认
    del(){
      this.delDialogVisible = false
      this.$emit("delPar", this.id);
    }
  },
};
</script>

<style lang="scss">
.el-table td,
.el-table th.is-leaf {
  border-bottom: unset;
}
.el-table td,
.el-table th {
  padding: 5px 0;
}
.el-table thead {
  font-weight: 400;
  color: #666;
}
.el-dialog__body {
  .text .table {
    display: flex;
    align-items: center;
  }
}
.change {
  .el-input {
    width: 460px;
  }
  .inputa {
    margin-left: 20px;
  }
  .inputb {
    margin-left: 49px;
  }
  .inputc {
    margin-left: 35px;
  }
  .inputd {
    margin-left: 35px;
    .el-input__inner {
      text-align: center;
    }
  }

  .el-form-item__content {
    display: flex;
  }
  .dialog-footer {
    text-align: center;
    .el-button--default {
      background-color: #f3e7e1;
      border: none;
    }
    .el-button--primary {
      background-color: #ff6d29;
      border: none;
    }
  }
}
.el-input {
  width: 88%;
}
.operation {
  margin: 0 5px;
}
.text {
  display: flex;
  margin: 0 30px;
  p:nth-child(2) {
    position: absolute;
    left: 330px;
  }
}
</style>
