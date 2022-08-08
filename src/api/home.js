import request from "@/utils/request";

export function getUserWork(data) {
  return request({
    url: "/task-service/task/userWork",
    params: data,
  });
}

export function getregionCollect(start, end) {
  return request({
    url: `/order-service/report/regionCollect/${start}/${end}`,
  });
}
