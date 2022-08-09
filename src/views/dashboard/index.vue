<template>
  <div id="home">
    <div class="home" style="margin-top: 40px; margin-left: 20px">
      <!-- 头部两个 -->
      <el-row :gutter="20">
        <el-col :span="10">
          <!-- 工单统计盒子 -->
          <div class="grid-content bg-purple headerBox bgc1">
            <div class="title">
              工单统计
              <span>{{ endatd }} ~ {{ statd }}</span>
            </div>
            <el-row :gutter="20">
              <el-col :span="6">
                <div class="home-user-task-stats">
                  <p>{{ ticketStatistics.total }}</p>
                </div>
                <div class="text-color2">
                  <p>工单总数（个）</p>
                </div>
              </el-col>
              <el-col :span="6">
                <div class="home-user-task-stats">
                  <p>{{ ticketStatistics.completedTotal }}</p>
                  <div class="text-color2">
                    <p>完成工单（个）</p>
                  </div>
                </div>
              </el-col>
              <el-col :span="6">
                <div class="home-user-task-stats">
                  <p>{{ ticketStatistics.progressTotal || "0" }}</p>
                  <div class="text-color2">
                    <p>进行工单（个）</p>
                  </div>
                </div>
              </el-col>
              <el-col :span="6">
                <div class="home-user-task-stats">
                  <p>{{ ticketStatistics.cancelTotal }}</p>
                  <div class="text-color2">
                    <p>取消工单（个）</p>
                  </div>
                </div>
              </el-col>
            </el-row>
          </div>
        </el-col>
        <el-col :span="7">
          <div class="grid-content bg-purple headerBox bgc2">
            <div class="title">
              销售统计
              <span>{{ endatd }} ~ {{ statd }}</span>
            </div>
            <el-row :gutter="20">
              <el-col :span="12">
                <div class="home-user-task-stats">
                  <p style="color: red">{{ order }}</p>
                </div>
                <div class="text-color2">
                  <p>订单量（个）</p>
                </div>
              </el-col>
              <el-col :span="12">
                <div class="home-user-task-stats">
                  <p style="color: red">{{ Count }}</p>
                  <div class="text-color2">
                    <p>销售额（万元）</p>
                  </div>
                </div>
              </el-col>
            </el-row>
          </div>
        </el-col>
      </el-row>
      <!-- 中间和右边 -->
      <el-row :gutter="20">
        <el-col :span="17">
          <!-- echars数据可视化 -->
          <div class="grid-content bg-purple" style="min-height: 365px">
            <div class="title">
              工单统计
              <span>{{ endatd }} ~ {{ statd }}</span>
              <el-radio-group
                v-model="radio1"
                size="mini"
                style="margin-left: 390px"
                @change="changes"
              >
                <el-radio-button label="周" @click="dyat = 7"></el-radio-button>
                <el-radio-button
                  label="月"
                  @click="dyat = 30"
                ></el-radio-button>
                <el-radio-button
                  label="年"
                  @click="dyat = 360"
                ></el-radio-button>
              </el-radio-group>
            </div>
            <!-- 中间echars -->
            <div class="boxEchars">
              <div class="echars1" id="echars"></div>
              <div class="echars2" id="echars2"></div>
            </div>
          </div>
        </el-col>
        <!-- 中间和右边 -->
        <el-col :span="6" class="aside">
          <div
            class="grid-content bg-purple"
            style="height: 560px; margin-top: -180px"
          >
            <div class="title">
              商品热榜
              <span>{{ endatd }} ~ {{ statd }}</span>
            </div>
            <el-table style="width: 100%" :data="SkuTop">
              <template v-for="(item, index) in SkuTop"></template>
              <el-table-column
                prop="order"
                width="30"
                style="background: url(~@/assets/order/4.png)"
                type="index"
                :key="index"
              ></el-table-column>
              <el-table-column
                prop="skuName"
                width="124"
                class-name="name"
                :key="index"
              ></el-table-column>
              <el-table-column
                prop="count"
                class-name="count"
                :key="index"
              ></el-table-column>
            </el-table>
          </div>
        </el-col>
      </el-row>
      <!-- 底部一个 -->
      <el-row :gutter="20" style="margin-bottom: 20px">
        <el-col :span="13">
          <div class="grid-content bg-purple" style="min-height: 300px">
            <div class="title">
              合作商点位数Top5
              <span class="el-icon-s-unfold moreIcon"></span>
            </div>
            <div class="cooperate">
              <!-- 合作区域 -->
              <div class="pieChart" id="pieCharts"></div>
              <div class="Points">
                <p>{{ NodeCount }}</p>
                <span>点位数</span>
                <p>{{ PrtnerCount }}</p>
                <span>合作商</span>
              </div>
            </div>
          </div>
        </el-col>
        <el-col :span="10">
          <div class="grid-content bg-purple" style="min-height: 300px">
            <div class="title">
              异常设备监控
              <span class="el-icon-s-unfold moreIcon2"></span>
            </div>
            <div class="empenty"></div>
          </div>
        </el-col>
      </el-row>
    </div>
  </div>
</template>

<script>
import {
  getUserWork,
  getregionCollect,
  getregionOrderCount,
  getregionAmountCollect,
  getNodeCount,
  getPrtnerCount,
  getnodeCollect,
  getSkuTop,
  getOrderAmount,
} from "@/api/home";
import dayjs from "dayjs";

export default {
  name: "home",
  data() {
    return {
      NodeCount: "",
      PrtnerCount: "",
      NodeCount: "",
      radio1: "周",
      ticketStatistics: {},
      order: "",
      Count: "",
      datatni: [],
      series: [],
      tableData: [],
      nodeCollect: [],
      SkuTop: [],
      cylinderSeries: [],
      cylinderXAxis: [],
      dyat: 30,
    };
  },

  computed: {
    // 时间区域
    td() {
      return dayjs().format("YYYY-MM-DD HH:mm:ss");
    },
    atd() {
      return dayjs().subtract(this.dyat, "day").format("YYYY-MM-DD HH:mm:ss");
    },
    statd() {
      return dayjs().format("YYYY-MM-DD");
    },
    endatd() {
      return dayjs().subtract(this.dyat, "day").format("YYYY-MM-DD");
    },
  },
  created() {
    this.getregionAmountCollect();
    this.getUserWorks();
    this.getregionCollect();
    this.getregionOrderCount();
    this.getNodeCount();
    this.getPrtnerCount();
    this.getnodeCollect();
    this.getSkuTop();
    this.getOrderAmount();
  },
  mounted() {},
  methods: {
    // 改变时间事件
    changes() {
      if (this.radio1 == "周") {
        this.dyat = 7;
      } else if (this.radio1 == "月") {
        this.dyat = 30;
      } else {
        this.dyat = 360;
      }
      this.getregionAmountCollect();
      this.getUserWorks();
      this.getregionCollect();
      this.getregionOrderCount();
      this.getNodeCount();
      this.getPrtnerCount();
      this.getnodeCollect();
      this.getSkuTop();
      this.getOrderAmount();
    },
    // 柱状图
    async getOrderAmount() {
      const res = await getOrderAmount(this.endatd, this.statd);
      this.cylinderXAxis = res.data.xAxis;
      this.cylinderSeries = res.data.series;
      this.myEcharts();
    },
    // 获取点位总数
    async getNodeCount() {
      const res = await getNodeCount();
      this.NodeCount = res.data;
    },
    // 获取合作商总数
    async getPrtnerCount() {
      const res = await getPrtnerCount();
      this.PrtnerCount = res.data;
    },
    // 合作商点位汇总统计饼状图
    async getnodeCollect() {
      const res = await getnodeCollect();
      this.nodeCollect = res.data;
      console.log(res.data);
      this.myPieChart();
    },
    // top排行
    async getSkuTop() {
      const res = await getSkuTop(10, this.endatd, this.statd);
      this.SkuTop = res.data;
    },
    // 获取工单数量
    async getUserWorks() {
      const res = await getUserWork(this.atd, this.td);

      this.ticketStatistics = res.data[0];
    },
    // 获取销售数量
    async getregionOrderCount() {
      const res = await getregionOrderCount({
        start: this.atd,
        end: this.td,
      });

      this.order = res.data;
    },
    // 获取总量数量
    async getregionCollect() {
      const res = await getregionCollect({
        start: this.atd,
        end: this.td,
      });
      this.Count = (res.data / 1000000).toFixed(2);
    },

    // 柱状图
    myEcharts() {
      // 基于准备好的dom，初始化echarts实例
      var echarts = require("echarts");
      var myChart = echarts.init(document.getElementById("echars2"));

      // 指定图表的配置项和数据
      var option = {
        title: {
          text: "销售额分布",
          left: "center",
        },
        grid: { top: "18%", left: "19%", right: "0%", bottom: "24%" },
        xAxis: {
          type: "category",
          data: this.cylinderXAxis,
        },
        yAxis: {
          type: "value",
          name: "单位/元",
        },
        series: [
          {
            data: this.cylinderSeries,
            barWidth: "5%",
            type: "bar",
          },
        ],
      };

      // 使用刚指定的配置项和数据显示图表。
      myChart.setOption(option);
    },
    // 获取线状图时间
    async getregionAmountCollect() {
      const res = await getregionAmountCollect(1, this.endatd, this.statd);
      this.xAxis = res.data.xAxis;
      this.series = res.data.series;
      this.myEcharts2();
    },
    // 线性图
    myEcharts2() {
      var echarts = require("echarts");
      var myChart2 = echarts.init(document.getElementById("echars"));
      var option2 = {
        color: ["red"],
        title: {
          text: "销售额趋势图",
          left: "center",
        },
        grid: { top: "18%", left: "17%", right: "0%", bottom: "24%" },
        xAxis: {
          type: "category",
          data: this.xAxis,
          boundaryGap: true,
        },
        yAxis: {
          name: "单位/元",
          type: "value",
        },
        series: [
          {
            data: this.series,
            type: "line",
          },
        ],
      };
      myChart2.setOption(option2);
    },
    // 饼状图
    myPieChart() {
      // 基于准备好的dom，初始化echarts实例
      var echarts = require("echarts");
      var mypPieCharts = echarts.init(document.getElementById("pieCharts"));

      // 指定图表的配置项和数据
      var optionPie = {
        title: {
          left: "left",
        },

        tooltip: {
          trigger: "item",
          formatter: "{b}<br/>总占比 : {d}% ",
        },
        toolbox: {
          show: true,
          feature: {
            mark: { show: true },
          },
        },
        series: [
          {
            name: "合作商点位数Top5",
            type: "pie",
            radius: ["10%", "70%"],
            center: ["50%", "50%"],
            roseType: "radius",
            data: this.nodeCollect,
          },
        ],
      };

      // 使用刚指定的配置项和数据显示图表。
      mypPieCharts.setOption(optionPie);
    },
  },
};
</script>

<style lang="scss" scoped>
* {
  padding: 0;
  margin: 0;
}
.boxEchars {
  width: 100%;
  height: 280px;
  margin-top: 45px;
  display: flex;
  .echars1 {
    flex: 1;
  }
  .echars2 {
    flex: 1;
  }
}
::v-deep .el-table {
  td:first-child {
    .cell {
      display: inline-block;
      text-align: center;
      width: 22px;
      height: 20px;
      margin-left: 2px;
      padding-left: 6px;
      text-align: center;
      white-space: nowrap;
      font-size: 12px;
      font-family: zihun143-zhengkuchaojihei, zihun143;
      font-weight: 400;
      line-height: 14px;
      background: url(~@/assets/order/4.png) no-repeat;
      color: #e9b499;
    }
  }
  td:nth-child(2) {
    .cell {
      height: 20px;
      font-size: 14px;
      font-family: PingFangSC-Medium, PingFang SC;
      font-weight: 500;
      color: #333;
      line-height: 20px;
      overflow: hidden;
      white-space: nowrap;
      text-overflow: ellipsis;
    }
  }
  td:last-child {
    height: 20px;
    font-size: 14px;
    font-family: PingFangSC-Regular, PingFang SC;
    font-weight: 400;
    color: #737589;
    line-height: 20px;
    text-align: right;
  }
}
::v-deep .el-table {
  tr:nth-child(1) {
    td:nth-child(1) {
      .cell {
        background: url(~@/assets/order/1.png);
        color: #8e5900;
      }
    }
  }
  tr:nth-child(2) {
    td:nth-child(1) {
      .cell {
        background: url(~@/assets/order/2.png);
        color: #494949;
      }
    }
  }
  tr:nth-child(3) {
    td:nth-child(1) {
      .cell {
        background: url(~@/assets/order/3.png);
        color: #cf6d3d;
      }
    }
  }
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
}
.cooperate {
  width: 100%;
  height: 280px;
  margin-top: 25px;
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
  padding-top: 17px;
  padding-bottom: -4px;

  span {
    margin-left: 10px;
    font-size: 12px;
    font-family: PingFangSC-Regular, PingFang SC;
    font-weight: 400;
    color: #999;
  }
}
.bgc2 {
  background: #fbefe8 url(~@/assets/dashboard/bg33.png) no-repeat
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
  background-image: url(~@/assets/dashboard/bg11.png),
    url(~@/assets/dashboard/bg22.png) !important;
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
  padding: 0 20px;
}
.row-bg {
  padding: 10px 0;
  background-color: #f9fafc;
}
</style>
