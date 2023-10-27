export const formatTimestamp = (x: Date = new Date()) => {
  const date = x.getDate(),
    month = x.getMonth(),
    year = x.getFullYear(),
    hours = x.getHours(),
    minutes = x.getMinutes(),
    seconds = x.getSeconds();

  return `${date > 9 ? date : "0" + date}/${
    month > 9 ? month : "0" + month
  }/${year}-${hours > 9 ? hours : "0" + hours}:${
    minutes > 9 ? minutes : "0" + minutes
  }:${seconds > 9 ? seconds : "0" + seconds}`;
};
