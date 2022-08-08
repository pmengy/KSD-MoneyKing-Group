import request from '@/utils/request'
/**
 * 获取区域列表数据
 * @param {当前页码,每页数据数量，区域名称} data
 * @returns Object
 */
export const getAddressListApi = (data) => {
  return request({
    url: '/vm-service/region/search',
    params: data
  })
}
/**
 * 获取区域详情
 * @param {区域id} regionId
 * @returns
 */
export const getAddressInfoApi = (regionId) => {
  return request({
    url: `/vm-service/region/${regionId}`,
    method: 'GET'
  })
}
/**
 * 点位搜索
 * @returns
 */
export const getAddressSearchApi = (data) => {
  return request({
    url: '/vm-service/node/search',
    method: 'GET',
    params: data
  })
}
/**
 * 修改区域信息
 * @param {id regionName remark} data
 * @returns
 */
export const changeAddressInfoApi = (data, id) => {
  return request({
    url: `/vm-service/region/${id}`,
    method: 'PUT',
    data
  })
}
