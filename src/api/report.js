import request from "@/utils/request";

/**
 * 获取一定时间范围之内的订单总数
 * @param {*} params start end innerCode
 * @returns promise
 */
export function getOrderCount(params) {
  return request({
    url: "/order-service/report/orderCount",
    params,
  });
}

/**
 * 获取一定时间范围之内的收入
 * @param {*} params start end innerCode
 * @returns promise
 */
export function getOrderAmount(params) {
  return request({
    url: "/order-service/report/orderAmount",
    params,
  });
}
