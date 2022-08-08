import dayjs from "dayjs";
// 格式化时间封装
export function parseDate2Str(date, format) {
  format = format || "YYYY-MM-DD HH:mm:ss";
  return dayjs(date).format(format);
}
