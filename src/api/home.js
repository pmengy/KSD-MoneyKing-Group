import request from "@/utils/request";
// 获取工单数
export function getUserWork(start, end) {
  return request({
    url: `/task-service/task/taskReportInfo/${start}/${end}`,
  });
}
// 获取销售数
export function getregionCollect(data) {
  return request({
    url: "/order-service/report/orderAmount",
    params: data,
  });
}
// 销售额
export function getregionOrderCount(data) {
  return request({
    url: "/order-service/report/orderCount",
    params: data,
  });
}

// 线型图
export function getregionAmountCollect(collectType, start, end) {
  return request({
    url: `/order-service/report/amountCollect/${collectType}/${start}/${end}`,
  });
}

// 获取点位总数

export function getNodeCount() {
  return request({
    url: "/vm-service/node/count",
  });
}
// 获取合作商总数

export function getPrtnerCount() {
  return request({
    url: "/user-service/partner/count",
  });
}

// 合作商点位汇总统计饼状图
export function getnodeCollect() {
  return request({
    url: "/vm-service/node/nodeCollect",
  });
}

// top排行

export function getSkuTop(topValue, start, end) {
  return request({
    url: `/order-service/report/skuTop/${topValue}/${start}/${end}`,
  });
}
// 柱状图
export function getOrderAmount(start, end) {
  return request({
    url: `/order-service/report/regionCollect/${start}/${end}`,
  });
}
