import request from "@/utils/request";
/**
 * 售货机类型列表(搜索)
 * @param {*} params pageIndex pageSize name
 * @returns promise
 */
export function getVmTypeList(params) {
  return request({
    url: "/vm-service/vmType/search",
    params,
  });
}
