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
export const getUserListAPI = (data) =>
  request({
    url: "/api/user-service/user/search",
    // params: queryInfo,
    data,
  });
