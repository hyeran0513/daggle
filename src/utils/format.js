import { format } from "date-fns";

// 날짜를 yy.MM.dd 형식으로 포맷
export const formatToYYMMDD = (date) => {
  if (date) {
    return format(new Date(date), "yy.MM.dd");
  }
};

// 날짜를 yyyy.MM.dd 형식으로 포맷
export const formatToYYYYMMDD = (date) => {
  if (date) {
    return format(new Date(date), "yyyy.MM.dd");
  }
};
