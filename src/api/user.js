import request from "@/utils/request";

/**
 * 用户登录接口
 * @param {Object} data loginName password
 * @returns promise
 */
export function login(data) {
  return request({
    url: "/user-service/user/login",
    method: "post",
    data,
  });
}

/**
 * 获取用户基本信息
 * @param {String} id 用户id
 * @returns promise
 */
export function getUserInfo(id) {
  return request({
    url: "/user-service/user/" + id,
  });
}

/**
 *人员搜索(列表页)
 *data:对象  包含以下信息 皆非必填
  pageIndex	否		页码
  pageSize	否		一页获取的数量
  userName	否		人员名称
  roleId	否		角色Id
  isRepair	否	true/false	是否是运维人员
 * @returns promise
 */
export const getUserListAPI = (query, data) =>
  request({
    url: "/user-service/user/search",
    params: query,
    data,
  });

/**
 *获取角色列表
 * @returns promise
 */
export const getRoleIdAPI = () =>
  request({
    url: "/user-service/role",
  });

/**
 * 获取区域列表
 * @param {Object} params   获取区域列表 pageIndex	否		当前页码
  pageSize	否		每页数据个数
  name	否		区域名称
 * @returns promise
 */
export const getRegionListAPI = (params) =>
  request({
    url: "/vm-service/region/search",
    params,
  });

/**
 *图片上传获取图片上传后返回在线url地址
 * @param {String} fileName 图片file
 * @returns promise
 */
export const getImageUrlAPI = (fileName) =>
  request({
    url: "/vm-service/sku/fileUpload",
    method: "POST",
    data: fileName,
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });

/**
   * 新增人员
   * @param {Object} data  userName	string	必须		用户名	
      roleId	integer	必须		角色Id	
      mobile	string	必须		手机号	
      regionId	string	必须		所属区域Id	
      regionName	string	必须		所属区域名称	
      status	boolean	必须		启用状态	
      image	string	必须		头像Url 
   * @returns promise
   */
export const upLoadAddStaffInfoAPI = (data) =>
  request({
    url: "/user-service/user",
    method: "POST",
    data,
  });

/**
 *删除人员
 * @param {String} id
 * @returns  promise
 */
export const delStaffAPI = (id) =>
  request({
    url: `/user-service/user/${id}`,
    method: "DELETE",
  });

/**
 * 编辑修改用户资料
 * id  用户id
 * @returns promise
 */
export const updateStaffInfoAPI = (id, data) =>
  request({
    url: `/user-service/user/${id}`,
    method: "PUT",
    data,
  });

/**
 *获取人员工作量列表
 * @param {Object} queryInfo pageIndex	是		
    pageSize	是		
    userName	否		用户名
    roleId	否		角色Id
    isRepair	否		是否是运维人员
 * @returns promise
 */
export const getStaffTaskListAPI = (queryInfo) =>
  request({
    url: "/user-service/user/searchUserWork",
    params: queryInfo,
  });

/**
 *获取用户工作量(工单统计)
 * @param {Object} queryInfo userId	否		
      start	是	2020-10-01 00:00:00	
      end	是	2020-10-31 00:00:00	
 * @returns promise
 */
export const getTaskCountAPI = (queryInfo) =>
  request({
    url: "/task-service/task/userWork",
    params: queryInfo,
  });
