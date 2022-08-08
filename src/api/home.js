import request from "@/utils/request";

export function getUserWork(start, end) {
  return request({
    url: `/task-service/task/taskReportInfo/${start}/${end}`,
  });
}

export function getregionCollect(start, end) {
  return request({
    url: `/order-service/report/regionCollect/${start}/${end}`,
  });
}
