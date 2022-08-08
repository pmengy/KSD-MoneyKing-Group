import request from "@/utils/request";

/**
 * 订单搜索状态列表
 */
export function getOrderStatus(pageIndex) {
  return request({
    url: "/order-service/order/search",
    params: {
      pageIndex,
    },
  });
}