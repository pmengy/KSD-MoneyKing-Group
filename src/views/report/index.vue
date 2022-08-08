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
    </div>
  </div>
</template>

<script>
import { getOrderAmount, getCrderCount, getTotalBill } from "@/api/report";
import dayjs from "dayjs";
export default {
  data() {
    return {
      dyat: 0,
      daySale: "",
      monSale: "",
      dayCount: "",
      monCount: "",
      dayBill: "",
      monBill: "",
    };
  },
  created() {
    this.getOrderAmount();
    this.getMonAmount();
    this.getMonCount();
    this.getDayCount();
    this.getMonBill();
    this.getDayBill();
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
  },
  methods: {
    // 获取日收入
    async getOrderAmount() {
      const res = await getOrderAmount({
        start: this.dayNow,
        end: this.td,
      });
      this.daySale = res.data;
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
      console.log(this.dayBill);
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
