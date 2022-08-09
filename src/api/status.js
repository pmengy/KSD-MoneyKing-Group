import request from "@/utils/request";
/**
 * 搜索售货机(售货机列表)
 * @returns promise
 */
export function getVmList(params) {
  return request({
    url: "/vm-service/vm/search",
    params,
  });
}

/**
 * 修改售货机点位
 * @param {*} id 售货机id
 * @param {*} nodeId 点位id
 * @returns
 */
export function updateVmNode(id, nodeId) {
  return request({
    url: `/vm-service/vm/${id}/${nodeId}`,
    method: "PUT",
  });
}

/**
 * 点位搜索
 * @param {*} params pageSize
 * @returns promise
 */
export function searchNode(params) {
  return request({
    url: "/vm-service/node/search",
    params,
  });
}

/**
 * 获取售货机商品销量
 * @param {Object} params vmType nodeId createUserId
 * @returns promise
 */
export function getSalesVolume(
  innerCode,
  start = "2022-08-01",
  end = "2022-08-07",
  params
) {
  return request({
    url: `/order-service/report/skuCollect/${innerCode}/${start}/${end}`,
    params,
  });
}

/**
 * 获取一定时间范围之内的订单总数
 * @param {*} innerCode 售货机编号
 * @param {*} start 开始日期时间
 * @param {*} end 结束日期时间
 * @returns
 */
export function getOrderCount(
  start = "2022-08-01",
  end = "2022-08-07",
  innerCode
) {
  return request({
    url: "/order-service/report/orderCount",
    params: {
      start,
      end,
      innerCode,
    },
  });
}

/**
 * 获取售货机补货次数
 * @param {*} params start,end,innerCode
 * @returns promise
 */
export function getSupplyCount(innerCode, start, end) {
  return request({
    url: `/task-service/task/supplyCount/${innerCode}/${start}/${end}`,
  });
}

/**
 * 获取售货机维修次数
 * @param {*} params start,end,innerCode
 * @returns promise
 */
export function getRepairCount(innerCode, start, end) {
  return request({
    url: `/task-service/task/repairCount/${innerCode}/${start}/${end}`,
  });
}

/**
 * 应用策略
 * @param {*} data innerCodeList policyId
 * @returns promise
 */
export function applyPolicy(data) {
  return request({
    url: "/vm-service/vm/applyPolicy",
    method: "PUT",
    data,
  });
}

/**
 * 取消策略
 * @param {*} innerCode 售货机编号
 * @param {*} policyId 策略Id
 * @returns
 */
export function cancelPolicy(innerCode, policyId) {
  return request({
    url: `/vm-service/vm/cancelPolicy/${innerCode}/${policyId}`,
    method: "PUT",
  });
}

/**
 * 查询售货机策略
 * @param {*} innerCode 售货机id
 * @returns promise
 */
export function selectPolicy(innerCode) {
  return request({
    url: `/vm-service/policy/vmPolicy/${innerCode}`,
  });
}

/**
 * 策略搜索
 * @param {*} params pageSize
 * @returns promise
 */
export function searchPolicy(params) {
  return request({
    url: "/vm-service/policy/search",
    params,
  });
}

/**
 * 新增售货机
 * @param {*} data vmType nodeId createUserId
 * @returns promise
 */
export function addVmType(data) {
  return request({
    url: "/vm-service/vm",
    method: "POST",
    data,
  });
}
