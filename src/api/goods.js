import request from "@/utils/request";
/**
 * 商品类型列表
 * @returns promise
 */
export function getStrategyApi() {
  return request({
    url: "/vm-service/skuClass/search",
  });
}
/**
 * 商品列表
 * @returns promise
 */
 export function getStrategyApiF() {
  return request({
    url: "/vm-service/sku/search",
  });
}
/**
 * 商品列表
 * @returns promise
 */
 export function getStrategyApiFF(params) {
  return request({
    url: "/vm-service/sku/search",
    params
  });
}