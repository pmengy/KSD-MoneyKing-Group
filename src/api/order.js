import request from "@/utils/request";

/**
 * 订单搜索状态列表
 */
export function getOrderStatus() {
  return request({
    url: "/order-service/order/search",
  });
}