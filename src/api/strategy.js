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
