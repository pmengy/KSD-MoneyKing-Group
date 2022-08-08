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
 * 商品类型添加
 * @returns promise
 */
 export function postStrategyApi(className) {
  return request({
    url: "/vm-service/skuClass",
    method:'POST',
    data:{
      className
    }
  });
}
/**
 * 商品类型不同页
 * @returns promise
 */
 export function getYStrategyApi(params) {
  return request({
    url: "/vm-service/skuClass/search",
    params
  });
}
/**
 * 修改商品类型
 * @returns promise
 */
 export function getGStrategyApi(className,id) {
  return request({
    url: "/vm-service/skuClass/"+id,
    method:'PUT',
    data:{
      className
    }
  });
}
/**
 * 删除商品类型
 * @returns promise
 */
 export function movedepartApi(id) {
  return request({
    url: '/vm-service/skuClass/'+id,
    method:'DELETE',
  })
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

/**
 * 商品图片上传
 * @returns promise
 */
 export function getimgApi(fileName) {
  return request({
    url: "/vm-service/sku/fileUpload",
    method: 'POST',
    data:
      fileName
    ,
    headers:{
      'Content-Type': 'multipart/form-data	'
    }
  });
}
/**
 * 商品添加
 * @returns promise
 */
 export function postStrategyApiF(data) {
  return request({
    url: "/vm-service/sku",
    method:'POST',
    data
  });
}