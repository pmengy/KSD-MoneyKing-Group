import request from "@/utils/request";
// 获取一定时间范围之内的收入
export function getOrderAmount(data) {
  return request({
    url: "/order-service/report/orderAmount",
    params: data,
  });
}
// 获取一定时间范围之内的销售总数
export function getCrderCount(data) {
  return request({
    url: "/order-service/report/orderCount",
    params: data,
  });
}
// 获取一定时间范围之内的分成总数
export function getTotalBill(data) {
  return request({
    url: "/order-service/report/totalBill",
    params: data,
  });
}
// 获取一定时间范围之内的数据总数
export function getPartnerCollect(data) {
  return request({
    url: "/order-service/report/partnerCollect",
    params: data,
  });
}
