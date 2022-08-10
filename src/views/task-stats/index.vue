<template>
  <div id="home">
    <div class="home" style="margin-top: 40px; margin-left: 20px">
      <!-- 头部两个 -->
      <el-row :gutter="20">
        <el-col :span="12">
          <!-- 工单统计盒子 -->
          <div class="grid-content bg-purple headerBox bgc1">
            <div class="title">运营人员（当天）</div>
            <el-row :gutter="20">
              <el-col :span="6">
                <div class="home-user-task-stats">
                  <p>{{ operationInfo.total || 0 }}</p>
                </div>
                <div class="text-color2">
                  <p>工单总数（个）</p>
                </div>
              </el-col>
              <el-col :span="6">
                <div class="home-user-task-stats">
                  <p>{{ operationInfo.completedTotal || 0 }}</p>
                  <div class="text-color2">
                    <p>完成工单（个）</p>
                  </div>
                </div></el-col
              >
              <el-col :span="6">
                <div class="home-user-task-stats">
                  <p>{{ operationInfo.completedTotal || 0 }}</p>
                  <div class="text-color2">
                    <p>拒绝工单（个）</p>
                  </div>
                </div></el-col
              >
              <el-col :span="6">
                <div class="home-user-task-stats">
                  <p>{{ operationInfo.workerCount || 0 }}</p>
                  <div class="text-color2">
                    <p>运营人员数（个）</p>
                  </div>
                </div></el-col
              >
            </el-row>
          </div></el-col
        >
        <el-col :span="12"
          ><div class="grid-content bg-purple headerBox bgc2">
            <div class="title">运维人员（当天）</div>
            <el-row :gutter="20">
              <el-col :span="6">
                <div class="home-user-task-stats">
                  <p>{{ repairInfo.total || 0 }}</p>
                </div>
                <div class="text-color2">
                  <p>工单总数（个）</p>
                </div>
              </el-col>
              <el-col :span="6">
                <div class="home-user-task-stats">
                  <p>{{ repairInfo.completedToral || 0 }}</p>
                  <div class="text-color2">
                    <p>完成工单（个）</p>
                  </div>
                </div></el-col
              >
              <el-col :span="6">
                <div class="home-user-task-stats">
                  <p>{{ repairInfo.cancelTotal || 0 }}</p>
                  <div class="text-color2">
                    <p>拒绝工单（个）</p>
                  </div>
                </div></el-col
              >
              <el-col :span="6">
                <div class="home-user-task-stats">
                  <p>{{ repairInfo.workerCount || 0 }}</p>
                  <div class="text-color2">
                    <p>运营人员数（个）</p>
                  </div>
                </div></el-col
              >
            </el-row>
          </div></el-col
        >
      </el-row>
      <!-- 中间和右边 -->
      <el-row :gutter="20">
        <el-col :span="17">
          <!-- echars数据可视化 -->
          <div class="grid-content bg-purple" style="min-height: 542px">
            <div class="title-container">
              <div class="title">工单状态</div>
              <!--时间选择期 -->
              <div class="title-time">
                <div class="block">
                  <el-date-picker
                    v-model="isSelectTime"
                    value-format="yyyy-MM-dd"
                    type="daterange"
                    range-separator="~"
                    :clearable="false"
                    start-placeholder="开始日期"
                    end-placeholder="结束日期"
                    :unlink-panels="true"
                    @change="change"
                  >
                  </el-date-picker>
                </div>
                <div class="time">
                  <span
                    @click="seclect(1)"
                    :class="{ 'is-checked': liActiveClass == 1 }"
                    >周</span
                  ><span
                    @click="seclect(2)"
                    :class="{ 'is-checked': liActiveClass == 2 }"
                    >月</span
                  ><span
                    @click="seclect(3)"
                    :class="{ 'is-checked': liActiveClass == 3 }"
                    >年</span
                  >
                </div>
              </div>
            </div>
            <div class="chart-workStatus" ref="chartWorkStatus">1231</div>
            <!-- 中间echars -->
            <div class="boxCenter" v-if="workStatusList.length == 0">
              <img src="~@/assets/images/nodata.png" alt="" />
            </div></div
        ></el-col>

        <!-- 中间和右边 -->
        <el-col :span="7">
          <div
            class="grid-content bg-purple"
            style="height: 542px; margin-top: -170px"
          >
            <div class="title">
              <div class="title-text">人效排名（月度）</div>

              <div class="selectArea">
                <el-form
                  ref="form"
                  :model="form"
                  label-width="80px"
                  :inline="true"
                  class="demo-form-inline"
                >
                  <el-form-item>
                    <el-select v-model="form.regionInfo" placeholder="全部">
                      <el-option
                        :label="item.name"
                        :value="item.name"
                        v-for="item in regionList"
                        :key="item.id"
                      ></el-option>
                    </el-select>
                  </el-form-item>
                </el-form>
              </div>
            </div>
            <div class="select-type">
              <span
                @click="seclectT(4)"
                :class="{ 'is-checked': ActiveClass == 4 }"
                >运营人员</span
              ><span
                @click="seclectT(5)"
                :class="{ 'is-checked': ActiveClass == 5 }"
                >运维人员</span
              >
            </div>
            <div class="img">
              <img src="~@/assets/images/nodata.png" alt="" />
            </div>
          </div>
        </el-col>
      </el-row>
    </div>
  </div>
</template>

<script>
import {
  getStaffCountAPI,
  getRegionListAPI,
  getWorkStatusCountAPI,
} from "@/api/user";
import timeFormat from "../user-work/components/Dialog/getTimeFormat";
import dayjs from "dayjs";

export default {
  name: "userTaskStats",
  data() {
    return {
      formInline: {
        user: "",
        region: "",
      },
      liActiveClass: 1,
      ActiveClass: 4,
      isSelectTime: [
        //存储选择的时间
        dayjs(new Date()).format("YYYY-MM-DD"),
        dayjs(new Date()).format("YYYY-MM-DD"),
      ],
      regionList: [], //区域列表
      staffCountList: [], //人员工单汇总信息
      regionQuery: {
        pageIndex: 1, //
        pageSize: 30,
      },
      repairInfo: {}, //运维
      operationInfo: {}, //运营
      form: {
        regionInfo: "",
      },
      option: {
        legend: {},
        tooltip: {},
        toolbox: {
          show: true,
          feature: {
            dataView: { show: true, readOnly: false },
            magicType: { show: true, type: ["line", "bar"] },
            restore: { show: true },
            saveAsImage: { show: true },
          },
        },
        dataset: {
          dimensions: ["collectDate", "cancelCount", "finishCount"],
          source: [],
        },
        xAxis: { type: "category" },

        yAxis: {
          type: "value",
          name: "工单量：个",
        },
        // Declare several bar series, each will be mapped
        // to a column of dataset.source by default.
        series: [
          { type: "bar", color: "red", name: "取消工单" },
          { type: "bar", color: "skyblue", name: "完成工单" },
        ],
      },
      workStatusList: [], //工单状态
      dataList: [],
    };
  },
  created() {
    this.init();
  },
  mounted() {
    this.$nextTick(() => {
      this.getEchartData();
    });
  },
  computed: {
    yearCurrent() {
      return dayjs(new Date()).startOf("year").$d;
    },

    monthCurrent() {
      return dayjs(new Date()).startOf("month").$d;
    },

    weekCurrent() {
      return dayjs(new Date()).startOf("week").$d;
    },

    dateNow() {
      return dayjs(new Date()).$d;
    },
  },
  // watch: {
  //   //监听选择时间的变化，只要变化了就发送请求获取图标数据
  //   isSelectTime: {
  //     handler(newVal) {
  //       this.getWorkStatusCount(newVal);
  //     },
  //     immediate: true,
  //     deep: true,
  //   },
  // },
  methods: {
    getEchartData() {
      // 指定图表的配置项和数据
      // 引入echarts
      const echarts = require("echarts");
      // 抓取到要放置的盒子，确定好放置方位
      const chart = this.$refs.chartWorkStatus;
      // 初始化一个画布，将盒子作为形参放入
      const myChart = echarts.init(chart);
      // 获取数据
      // const option = this.option;
      //将数据传入到画布中
      myChart.setOption(this.option);
    },

    seclect(i) {
      this.liActiveClass = i;
      if (i == 1) {
        this.isSelectTime = [this.weekCurrent, new Date()];

        this.getWorkStatusCount([
          dayjs(new Date()).startOf("week").format("YYYY-MM-DD"),
          dayjs().format("YYYY-MM-DD"),
        ]);
      } else if (i == 2) {
        this.isSelectTime = [this.monthCurrent, new Date()];
        this.getWorkStatusCount([
          dayjs(new Date()).startOf("month").format("YYYY-MM-DD"),
          dayjs().format("YYYY-MM-DD"),
        ]);
      } else {
        this.isSelectTime = [this.yearCurrent, new Date()];
        this.getWorkStatusCount([
          dayjs(new Date()).startOf("year").format("YYYY-MM-DD"),
          dayjs(new Date()).startOf("date").format("YYYY-MM-DD"),
        ]);
      }
    },
    seclectT(i) {
      this.ActiveClass = i;
    },
    async init() {
      const StaffCount = await getStaffCountAPI(
        timeFormat.dayS,
        timeFormat.dayE
      );
      this.staffCountList = StaffCount.data;
      this.operationInfo = this.staffCountList.find(
        (item) => item.repair === false
      );
      this.repairInfo = this.staffCountList.find(
        (item) => item.repair !== false
      );

      const RegionList = await getRegionListAPI(this.regionQuery);
      this.regionList = RegionList.data.currentPageRecords;
      this.regionList.push({ name: "全部" });
    },
    async getWorkStatusCount(timeInFo) {
      console.log(timeInFo);
      const { data } = await getWorkStatusCountAPI(timeInFo[0], timeInFo[1]);
      console.log(data);
      this.dataList = data;
      data.forEach((item) => {
        this.workStatusList.push({
          collectDate: item.collectDate,
          cancelCount: item.cancelCount,
          finishCount: item.finishCount,
        });
      });
      this.option.dataset.source = this.workStatusList;
      this.getEchartData();
      // console.log(this.workStatusList);
      // const arr = data.forEach((item) => item.collectDate.replace("-", "周"));
      // console.log(arr);
    },
    change(time) {
      this.getWorkStatusCount(time);
    },
  },
};
</script>

<style lang="less" scoped>
* {
  padding: 0;
  margin: 0;
}
.grid-content {
  margin-right: 10px;
  margin-top: 0 !important;
  position: relative;
  .title-container {
    display: flex;
  }
  .chart-workStatus {
    position: absolute;
    left: 17px;
    top: 130px;
    width: 96%;
    height: 468px;
    user-select: none;
    -webkit-tap-highlight-color: rgba(0, 0, 0, 0);
    padding: 0px;
    padding-bottom: 30px;
    margin: 0px;
    // background-color: red;
    border-width: 0px;
  }
}
// 设置下拉框的字体属性及背景颜色；
// .el-select-dropdown__item {
//   font-size: 7px;
//   line-height: 19px;
//   color: #333;
//   font-weight: 200;
//   background-color: #fff;
// }

// 设置下拉框列表的 padding 值为：0；(即：样式调整)
/deep/.el-select-dropdown__list {
  padding: 0;
}

// 设置输入框与下拉框的距离为：0; (即：样式调整)
/deep/.el-popper[x-placement^="bottom"] {
  margin-top: 0px;
}

// 将下拉框上的小箭头取消；(看着像一个箭头，其实是两个重叠在一起的箭头)
// /deep/.el-popper .popper__arrow,
// /deep/.el-popper .popper__arrow::after {
//   display: none;
// }

// 设置鼠标悬停在下拉框列表的悬停色；
// .el-select-dropdown__item:hover {
//   background-color: #f8fafd;
//   color: #5f84ff;
//   font-weight: 700;
// }
// .el-select-dropdown__item {
//   font-size: 14px;
//   padding: 0 20px;
//   position: relative;
//   white-space: nowrap;
//   overflow: hidden;
//   text-overflow: ellipsis;
//   color: #606266;
//   height: 34px;
//   line-height: 34px;
//   -webkit-box-sizing: border-box;
//   box-sizing: border-box;
//   cursor: pointer;
// }
/deep/.el-input__inner {
  width: 140px;
  height: 32px;
}
:deep(.el-scrollbar) {
  width: 140px !important;
  .el-select-dropdown__item {
    height: 40px;
  }
}
.is-checked,
.is-checkedType {
  background: #fff;
  border-radius: 7px;
  font-weight: 700 !important;
  color: #333 !important;
  box-shadow: 0 0 4px 1px;
}
.el-date-editor {
  width: 250px;
  height: 32px;
}
.boxCenter {
  // height: calc(100vh-60px);
  height: 500px;
  display: flex;
  justify-content: center;
  align-items: center;
}
.img {
  height: 474px;
  display: flex;
  justify-content: center;
  align-items: center;
}
.select-type {
  width: 200px;
  height: 34px;
  background: rgba(233, 243, 255, 0.37);
  margin-top: 20px;
  margin-left: 60px;
  border-radius: 10px;
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  -webkit-box-pack: center;
  -ms-flex-pack: center;
  justify-content: space-around;
  -webkit-box-align: center;
  -ms-flex-align: center;
  align-items: center;
  white-space: nowrap;
  span {
    display: inline-block;
    width: 70px;
    height: 25px;
    border-radius: 6px;
    line-height: 25px;
    font-size: 14px;
    color: #9ca3b4;
    cursor: pointer;
    text-align: center;
    box-shadow: 0 0 4px 1px;
  }
}
.title-time {
  width: 600px;
  display: flex;
  justify-content: flex-end;
  cursor: pointer;
  .time {
    width: 129px;
    height: 34px;
    background: rgba(233, 243, 255, 0.37);
    margin-left: 20px;
    border-radius: 10px;
    display: -webkit-box;
    display: -ms-flexbox;
    display: flex;
    -webkit-box-pack: center;
    -ms-flex-pack: center;
    justify-content: center;
    -webkit-box-align: center;
    -ms-flex-align: center;
    align-items: center;
  }
  .block {
    width: 230px;
    margin-right: 21px;
  }
  span {
    display: inline-block;
    width: 37px;
    height: 25px;
    line-height: 25px;
    font-size: 14px;
    color: #9ca3b4;
    cursor: pointer;
    text-align: center;
  }
}
.title {
  display: flex;
  justify-content: space-between;
  .el-dropdown {
    width: 88px;
    height: 32px px;
    border: 1px solid #818693;
    /* border-color: #818693; */
    border-radius: 6px;
    text-align: center;
    line-height: 32px;
    .el-dropdown-link {
      cursor: pointer;
      color: #606266;
    }
    .el-icon-arrow-down {
      font-size: 12px;
    }
  }
}

.boxEchars {
  width: 100%;
  height: 280px;
  margin-top: 45px;
  display: flex;
}
.moreIcon {
  font-size: 22px !important;
  margin-left: 400px !important;
  color: #5f84ff !important;
  cursor: pointer;
}
.moreIcon2 {
  font-size: 22px !important;
  margin-left: 250px !important;
  color: #5f84ff !important;
  cursor: pointer;
}
.empenty {
  width: 100%;
  height: 280px;
  // background-color: red;
}
.cooperate {
  width: 100%;
  height: 280px;

  margin-top: 25px;
  // background-color: red;
  display: flex;
  .pieChart {
    flex: 3;
  }
  .Points {
    width: 154px;
    height: 230px;
    padding-top: 47px;
    padding-left: 38px;
    background: linear-gradient(135deg, transparent, #f8f8f9 0) 0 0,
      linear-gradient(-135deg, transparent 12px, #f8f8f9 0) 100% 0,
      linear-gradient(-45deg, transparent, #f8f8f9 0) 100% 100%,
      linear-gradient(45deg, transparent 12px, #f8f8f9 0) 0 100%;
    background-size: 50% 50%;
    background-repeat: no-repeat;
    p {
      height: 33px;
      margin-bottom: 10px;
      font-size: 24px;
      font-family: PingFangSC-Semibold, PingFang SC;
      font-weight: 600;
      color: #072074;
      line-height: 33px;
    }
    span {
      height: 17px;
      margin-top: 6px;
      font-size: 12px;
      font-family: PingFangSC-Regular, PingFang SC;
      font-weight: 400;
      color: #000412;
      line-height: 17px;
    }
  }
}
.title {
  -webkit-box-align: center;
  -ms-flex-align: center;
  align-items: center;
  -webkit-box-flex: 1;
  -ms-flex: 1;
  flex: 1;
  font-size: 16px;
  font-family: PingFangSC-Semibold, PingFang SC;
  font-weight: 600;
  color: #333;
  span {
    margin-left: 10px;
    font-size: 12px;
    font-family: PingFangSC-Regular, PingFang SC;
    font-weight: 400;
    color: #999;
  }
}
.bgc2 {
  background: #fbefe8 url(~@/assets/images/operation.4120cc58.png) no-repeat
    calc(100% - 12px) 100% !important;

  .home-user-task-stats {
    margin-top: 10px;
    height: 50px;
    font-size: 36px;
    font-family: PingFangSC-Semibold, PingFang SC;
    font-weight: 600;
    line-height: 50px;
    text-shadow: 2px 4px 7px rgb(255 99 85 / 50%);
  }
  .text-color2 {
    height: 17px;
    margin-top: 3px;
    font-size: 12px;
    font-family: PingFangSC-Regular, PingFang SC;
    font-weight: 400;
    color: #ff5757;
    line-height: 17px;
  }
}
.bgc1 {
  background: #e9f3ff !important;
  background-image: url(~@/assets/images/bg1.png), url(~@/assets/images/bg2.png) !important;
  background-repeat: no-repeat, no-repeat !important;
  background-position: 0 0, calc(100% - 12px) 100% !important;
  .title {
    -webkit-box-align: center;
    -ms-flex-align: center;
    align-items: center;
    -webkit-box-flex: 1;
    -ms-flex: 1;
    flex: 1;
    font-size: 16px;
    font-family: PingFangSC-Semibold, PingFang SC;
    font-weight: 600;
    color: #333;
    span {
      margin-left: 10px;
      font-size: 12px;
      font-family: PingFangSC-Regular, PingFang SC;
      font-weight: 400;
      color: #999;
    }
  }
  .home-user-task-stats {
    margin-top: 10px;
    height: 50px;
    font-size: 36px;
    font-family: PingFangSC-Semibold, PingFang SC;
    font-weight: 600;
    line-height: 50px;
    text-shadow: 2px 4px 7px rgb(85 132 255 / 50%);
  }
  .text-color2 {
    height: 17px;
    margin-top: 3px;
    font-size: 12px;
    font-family: PingFangSC-Regular, PingFang SC;
    font-weight: 400;
    color: #91a7dc;
    line-height: 17px;
  }
}
.headerBox {
  height: 150px;
  padding: 25px;
}
.el-row {
  margin-bottom: 20px;
  &:last-child {
    margin-bottom: 0;
  }
}
.el-col {
  border-radius: 4px;
}
.bg-purple-dark {
  background: #99a9bf;
}
.bg-purple {
  background: #fff;
}
.bg-purple-light {
  background: #e5e9f2;
}
.grid-content {
  min-height: 36px;
  border-radius: 20px;
  padding: 20px;
}
.row-bg {
  padding: 10px 0;
  background-color: #f9fafc;
}
</style>
