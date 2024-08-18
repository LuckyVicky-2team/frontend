export const transDate = (date: string) => {
  // 날짜와 시간을 분리
  const [datePart, timePart] = date.split('T');

  // 년, 월, 일을 분리
  let [year, month, day] = datePart.split('-');
  month = parseInt(month, 10).toString();
  day = parseInt(day, 10).toString();

  const [hour, minute] = timePart.split(':');
  // 필요한 형식으로 변환
  const mondthAndDay = `${month}월 ${day}일`;
  const time = `${hour}:${minute}`;

  return { year, mondthAndDay, time };
};

//AS-IS : "Tue Aug 06 2024 00:00:00 GMT+0900 (한국 표준시)") -> 기본 new Date()
//TO-BE : "2024-08-06T00:00:00" -> api request 형태. 00:00:00:000 시각이됨
export const dateToISOString = (date: Date | null) => {
  if (!date) return;
  const pad = (number: number) => String(number).padStart(2, '0');

  const year = date.getFullYear();
  const month = pad(date.getMonth() + 1); // 월은 0부터 시작하므로 1을 더해줍니다.
  const day = pad(date.getDate());

  const hours = pad(date.getHours());
  const minutes = pad(date.getMinutes());
  const seconds = pad(date.getSeconds());
  const milliseconds = String(date.getMilliseconds()).padStart(3, '0');

  return `${year}-${month}-${day}T${hours}:${minutes}:${seconds}.${milliseconds}`;
};
