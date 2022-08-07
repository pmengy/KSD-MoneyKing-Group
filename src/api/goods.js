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
 * 商品类型搜索
 * @returns promise
 */
export function getssStrategyApi(className) {
  return request({
    url: "/vm-service/skuClass/search",
    params:{
      className
    }
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
 * 商品搜索
 * @returns promise
 */
 export function getssStrategyApiF(skuName) {
  return request({
    url: "/vm-service/sku/search",
    params:{
      skuName
    }
  });
}
/**
 * 商品列表不同页
 * @returns promise
 */
 export function getStrategyApiFF(params) {
  return request({
    url: "/vm-service/sku/search",
    params
  });
}