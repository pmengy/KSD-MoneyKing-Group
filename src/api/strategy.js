import request from "@/utils/request";
/**
 * 策略列表
 * @returns promise
 */
export function getmachineApi() {
  return request({
    url: "/vm-service/policy/search",
  });
}
/**
 * 策略分页
 * @returns promise
 */
 export function getmachineApiF(pageIndex) {
  return request({
    url: "/vm-service/policy/search",
    params:pageIndex

  });
}
/**
 * 策略搜索
 * @returns promise
 */
 export function getSmachineApi(policyName) {
  return request({
    url: "/vm-service/policy/search",
    params:{
      policyName
    }
  });
}
/**
 * 修改策略
 * @returns promise
 */
 export function GgetStrategyApi(data,policyId) {
  return request({
    url: "/vm-service/policy/"+policyId,
    method:'PUT',
    data
  });
}
/**
 * 删除策略
 * @returns promise
 */
 export function moveStrategyApi(policyId) {
  return request({
    url: '/vm-service/policy/'+policyId,
    method:'DELETE',
  })
}
/**
 * 策略添加
 * @returns promise
 */
 export function postStrategyApiF(data) {
  return request({
    url: "/vm-service/policy",
    method:'POST',
    data
  });
}

/**
 * 策略搜索售货机
 * @returns promise
 */
 export function getThemachineApi(policyId) {
  return request({
    url: "/vm-service/policy/vmList/" +policyId,
  });
}
/**
 * 策略搜索售货机分页
 * @returns promise
 */
 export function getThemachineApiF(policyId,pageIndex) {
  return request({
    url: "/vm-service/policy/vmList/"+policyId,
    params: pageIndex
  });
}
