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
/**
 * 删除区域
 * @param {区域id} id 
 * @returns 
 */
export const delAddressInfoApi=(id)=>{
  return request({
    url:`/vm-service/region/${id}`,
    method: 'DELETE',
  })
}
/**
 * 新增区域
 * @param {regionName remark} data 
 * @returns 
 */
export const addAddressInfoApi = (data) =>{
  return request({
    url:'/vm-service/region',
    method: 'POST',
    data
  })
}
/**
 * 获取点位详情
 * @param {点位id} id 
 * @returns 
 */
export const getNodeInfoApi = (id) =>{
  return request({
    url:`/vm-service/node/vmList/${id}`,
    method: 'GET',
  })
}
/**
 * 商圈列表
 * @returns 
 */
export const getBusinessType = () =>{
  return request({
    url:'/vm-service/businessType'
  })
}
/**
 * 合作商搜索
 * @param {pageIndex,pageSize,name} params 
 * @returns 
 */
export const getPartnerApi = (params) =>{
  return request({
    url:'/user-service/partner/search',
    params
  })
}
/**
 * 修改点位
 * @param {*} data 
 * @returns 
 */
export const changeNodeAddressApi =(data,id)=>{
  return request({
    url:`/vm-service/node/${id}`,
    method:'PUT',
    data
  })
}
/**
 * 新增点位
 * @param {*} data 
 * @returns 
 */
export const addNodeAddressApi =(data)=>{
  return request({
    url:'/vm-service/node',
    method: 'POST',
    data
  })
}
/**
 * 删除点位
 * @param {点位id} id 
 * @returns 
 */
export const delNodeAddressApi =(id)=>{
  return request({
    url:`vm-service/node/${id}`,
    method: 'DELETE',
  })
}
/**
 * 新增合作商
 * @param {*} data 
 * @returns 
 */
export const addPartnerApi =(data)=>{
  return request({
    url:'/user-service/partner',
    method: 'POST',
    data
  })
}
/**
 * 重置密码
 * @param {*} id 
 * @returns 
 */
export const resetPwdApi=(id)=>{
  return request({
    url:`/user-service/partner/resetPwd/${id}`,
    method: 'PUT',
  })
}
/**
 * 删除
 * @param {*} id 
 * @returns 
 */
export const delPartnerApi=(id)=>{
  return request ({
    url:`/user-service/partner/${id}`,
    method: 'DELETE',
  })
}
/**
 * 修改合作商
 * @param {*} id 
 * @returns 
 */
export const changePartnerApi=(data,id)=>{
  return request({
    url:`/user-service/partner/${id}`,
    method:'PUT',
    data
  })
}