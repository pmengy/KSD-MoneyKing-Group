import dayjs from "dayjs";

export default {
  yearS: dayjs(new Date()).startOf("year").format("YYYY-MM-DD 00:00:00"),
  yearE: dayjs(new Date()).endOf("year").format("YYYY-MM-DD 23:59:59"),
  monthS: dayjs(new Date()).startOf("month").format("YYYY-MM-DD 00:00:00"),
  monthE: dayjs(new Date()).endOf("month").format("YYYY-MM-DD 23:59:59"),
  weekS: dayjs(new Date()).startOf("week").format("YYYY-MM-DD 00:00:00"),
  weekE: dayjs(new Date()).endOf("week").format("YYYY-MM-DD 23:59:59"),
};
