<template>
  <div class="dashboard-container">
    <div class="app-container">
      <!-- 头部两个盒子 -->
      <el-row :gutter="20">
        <el-col :span="12">
          <!-- 工单统计盒子 -->
          <div class="grid-content bg-purple headerBox bgc1">
            <div class="title">日销售统计</div>
            <el-row :gutter="20">
              <el-col :span="8">
                <div class="home-user-task-stats">
                  <p>{{ dayCount }}</p>
                </div>
                <div class="text-color2">
                  <p>当日销售量（个）</p>
                </div>
              </el-col>
              <el-col :span="8">
                <div class="home-user-task-stats">
                  <p>{{ daySale }}</p>
                  <div class="text-color2">
                    <p>当日销售额（元）</p>
                  </div>
                </div></el-col
              >
              <el-col :span="8">
                <div class="home-user-task-stats">
                  <p>{{ dayBill }}</p>
                  <div class="text-color2">
                    <p>当日分成（元）</p>
                  </div>
                </div></el-col
              >
            </el-row>
          </div></el-col
        >
        <el-col :span="11"
          ><div class="grid-content bg-purple headerBox bgc2">
            <div class="title">月销售统计</div>
            <el-row :gutter="20">
              <el-col :span="8">
                <div class="home-user-task-stats">
                  <p style="color: red">{{ monCount }}</p>
                </div>
                <div class="text-color2">
                  <p>当月销售量（个）</p>
                </div>
              </el-col>
              <el-col :span="8">
                <div class="home-user-task-stats">
                  <p style="color: red">{{ monSale }}</p>
                  <div class="text-color2">
                    <p>当月销售额（千万元）</p>
                  </div>
                </div></el-col
              >
              <el-col :span="8">
                <div class="home-user-task-stats">
                  <p style="color: red">{{ monBill }}</p>
                  <div class="text-color2">
                    <p>当月分成（千万元）</p>
                  </div>
                </div></el-col
              >
            </el-row>
          </div></el-col
        >
      </el-row>
      <el-row :gutter="24">
        <el-col :span="22" style="margin-left: 30px"
          ><el-card class="box-card">
            <div style="min-height: 300px">
              <!-- 事件表头 -->
              <el-row :gutter="24">
                <el-form ref="form" label-width="80px">
                  <el-col :span="8">
                    <el-form-item label="活动区域">
                      <el-select
                        v-model="optionTable"
                        clearable
                        placeholder="请选择活动区域"
                      >
                        <el-option
                          v-for="(item, index) in labelKf"
                          :key="index"
                          :label="item.name"
                          :value="item.name"
                        ></el-option>
                      </el-select>
                    </el-form-item>
                  </el-col>
                  <el-col :span="8">
                    <el-form-item label="活动时间">
                      <el-date-picker
                        v-model="value1"
                        type="daterange"
                        range-separator="~"
                        start-placeholder="开始日期"
                        end-placeholder="结束日期"
                        :picker-options="pickerOptions0"
                      >
                      </el-date-picker>
                    </el-form-item>
                  </el-col>
                </el-form>
                <el-col style="margin-left: 100px" :span="2">
                  <el-button
                    type="primary"
                    style="
                      min-width: 80px;
                      height: 36px;
                      padding: 0;
                      background-color: #5f84ff;
                    "
                    @click="fromChange"
                    ><i class="el-icon-thumb"></i> 查询</el-button
                  ></el-col
                >
              </el-row>
              <!-- 中间表单详情 -->
              <el-row :gutter="24">
                <el-col :span="5"
                  ><p>
                    笔数统计： <span class="textcol">{{ weekCount }}</span> 个
                  </p></el-col
                >
                <el-col :span="7"
                  ><p>
                    收入统计： <span class="textcol">{{ weekSale }}</span> 元
                  </p></el-col
                >
                <el-col :span="5"
                  ><p>
                    分成统计： <span class="textcol">{{ weekBill }}</span> 元
                  </p></el-col
                >
              </el-row>
              <!-- 底部表栏 -->
              <formData
                :tableLabel="tableLabel"
                :currentList="currentList"
                :loading="loading"
              ></formData>
            </div> </el-card
        ></el-col>
      </el-row>
    </div>
  </div>
</template>

<script>
import {
  getOrderAmount,
  getCrderCount,
  getTotalBill,
  getPartnerCollect,
  getPartnerSearch,
} from "@/api/report";
import formData from "./compents/DkdTable";
import dayjs from "dayjs";
export default {
  data() {
    return {
      dyat: 0,
      region: "",
      optionTable: "",
      value1: [
        dayjs().subtract(7, "day").format("YYYY-MM-DD HH:mm:ss"),
        dayjs().format("YYYY-MM-DD HH:mm:ss"),
      ],
      pickerOptions0: {
        disabledDate(time) {
          return time.getTime() > Date.now() - 8.64e6; //如果没有后面的-8.64e6就是不可以选择今天的
        },
      },
      daySale: "",
      loading: false,
      monSale: "",
      dayCount: "",
      monCount: "",
      dayBill: "",
      monBill: "",
      weekBill: "",
      weekCount: "",
      weekSale: "",
      tableLabel: [
        { label: "订单日期", width: "180", prop: "date" },
        { label: "合作商", width: "170", prop: "ownerName" },
        { label: "分成比例", width: "170", prop: "ratio" },
        { label: "收入元", width: "170", prop: "orderTotalMoney" },
        {
          label: "笔数",
          width: "170",
          prop: "orderCount",
        },
        { label: "分成金额", width: "170", prop: "totalBill" },
      ],
      labelKf: [],

      currentList: [],
    };
  },
  components: {
    formData,
  },
  created() {
    this.getOrderAmount();
    this.getMonAmount();
    this.getMonCount();
    this.getDayCount();
    this.getMonBill();
    this.getDayBill();
    this.getPartnerCollect();
    this.getWeekBill();
    this.getWeekAmount();
    this.getWeekCount();
    this.getPartnerSearch();
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
    // 当天的整点
    dayNow() {
      return dayjs(new Date(new Date().toLocaleDateString()).getTime()).format(
        "YYYY-MM-DD HH:mm:ss"
      );
    },
    // 开始时间
    startTime() {
      return dayjs(this.value1[0]).format("YYYY-MM-DD HH:mm:ss");
    },
     endTime () {
      return dayjs(this.value1[1]).format("YYYY-MM-DD HH:mm:ss");}
  },
  methods: {
    // 获取搜索列表
    async getPartnerSearch() {
      const res = await getPartnerSearch();
      this.labelKf = res.data.currentPageRecords;
    },
    // 表单数据
    async fromChange() {
      const startTime = dayjs(this.value1[0]).format("YYYY-MM-DD");
      const endTime = dayjs(this.value1[1]).format("YYYY-MM-DD");
      this.loading = true;
      const res = await getPartnerCollect({
        pageIndex: 1,
        pageSize: 10,
        partnerName: this.optionTable,
        start: startTime,
        end: endTime,
      });
      this.currentList = res.data.currentPageRecords;
      this.getWeekAmount();
      this.getWeekBill();
      this.getWeekCount();
      this.loading = false;
    },
    // 获取表格数据
    async getPartnerCollect() {
      this.loading = true;
      const res = await getPartnerCollect({
        start: this.endatd,
        end: this.statd,
        pageIndex: 1,
        pageSize: 10,
      });
      this.currentList = res.data.currentPageRecords;
      this.loading = false;
    },
    // 获取日收入
    async getOrderAmount() {
      console.log(this.startTime);
      const res = await getOrderAmount({
        start: this.dayNow,
        end: this.td,
      });
      this.daySale = res.data;
    },
    // 获取周收入
    async getWeekAmount() {

      this.dyat = 7;
      const res = await getOrderAmount({
        start: this.startTime,
        end: this.endTime,
      });
      this.weekSale = (res.data / 100).toFixed(2);
    },
    // 获取月收入
    async getMonAmount() {
      this.dyat = 30;
      const res = await getOrderAmount({
        start: this.atd,
        end: this.td,
      });
      this.monSale = (res.data / 100000000).toFixed(2);
    },
    // 获取日销量
    async getDayCount() {
      const res = await getCrderCount({
        start: this.dayNow,
        end: this.td,
      });
      this.dayCount = res.data;
    },
    // 获取周销量
    async getWeekCount() {

      const res = await getCrderCount({
        start: this.startTime,
        end: this.endTime,
      });
      this.weekCount = res.data;
    },
    // 获取月销量
    async getMonCount() {
      const res = await getCrderCount({
        start: this.atd,
        end: this.td,
      });
      this.monCount = res.data;
    },
    // 获取日分成
    async getDayBill() {
      const res = await getTotalBill({
        start: this.dayNow,
        end: this.td,
      });
      this.dayBill = res.data;
    },
    // 获取周分成
    async getWeekBill() {
      const res = await getTotalBill({
        start: this.startTime,
        end: this.endTime,
      });
      this.weekBill = (res.data / 100).toFixed(2);
    },
    // 获取月分成
    async getMonBill() {
      this.dyat = 30;
      const res = await getTotalBill({
        start: this.atd,
        end: this.td,
      });
      this.monBill = (res.data / 10000000).toFixed(2);
    },
  },
};
</script>

<style scoped lang="scss">
* {
  padding: 0;
  margin: 0;
}
.grid-content {
  margin-left: 20px !important;
  margin-top: 35px;
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

.textcol {
  font-size: 20px;
  color: #ff5757;
  font-weight: 500;
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
  padding: 20px;
}
.row-bg {
  padding: 10px 0;
  background-color: #f9fafc;
}
</style>
