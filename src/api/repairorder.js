import request from "@/utils/request";
/**
 * 设置工单补货阈值
 * @returns promise
 * 一个对象
 */
export function getthresholdworkApi(val) {
  return request({
    url: "/task-service/task/autoSupplyConfig",
    method:'POST',
    data:val
  });
}
/**
 * 创建工单
 * @returns promise
 * 一个对象
 */
 export function getbuildworkApi(val) {
    return request({
      url: "/task-service/task/create",
      method:'POST',
      data:val
    });
  }
  /**
 * 取消工单
 * @returns promise
 * 一个对象一个ID
 */
 export function getcancelworkApi(val,taskId) {
    return request({
      url: "/api/task-service/task/cancel/ "+taskId,
      method:'POST',
      data:val
    });
  }
  /**
 * 获取工单详情
 * @returns promise
 * 一个对象一个当前列ID
 */
   export function gettakeworkApi(val,taskId) {
    return request({
      url: "/api/task-service/task/cancel/ "+taskId,
      data:val
    });
  }
    /**
 * 获取补货详情
 * @returns promise
 * 一个对象一个当前列ID
 */
     export function gettakefillApi(val,taskId) {
        return request({
          url: "/task-service/taskDetails/"+taskId,
          data:val
        });
      }
          /**
 * 获取人员列表
 * @returns promise
 * 当前机器编号
 */
     export function getpersonnelfillApi(innerCode) {
      return request({
        url: "/user-service/user/repairerList/"+innerCode,
      });
    }