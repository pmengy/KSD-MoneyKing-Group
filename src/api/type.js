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

/**
 * 售货机类型删除
 * @param {*} id 售货机类型id
 * @returns promise
 */
export function delVmType(id) {
  return request({
    url: `/vm-service/vmType/${id}`,
    method: "DELETE",
  });
}

/**
 * 图片上传
 * @param {*} fileName file
 * @returns promise
 */
export function getImgUrl(fileName) {
  return request({
    url: "/vm-service/sku/fileUpload",
    method: "POST",
    data: fileName,
  });
}

/**
 * 新增售货机类型
 * @param {*} data vmRow vmCol name channelMaxCapacity model image
 * @returns promise
 */
export function addVmType(data) {
  return request({
    url: "/vm-service/vmType",
    method: "POST",
    data,
  });
}

/**
 * 售货机类型修改
 * @param {*} data typeId vmRow vmCol name channelMaxCapacity model image
 * @returns promise
 */
export function editVmType(data) {
  return request({
    url: `/vm-service/vmType/${data.typeId}`,
    method: "PUT",
    data,
  });
}
