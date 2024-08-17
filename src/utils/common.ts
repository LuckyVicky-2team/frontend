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
//TO-BE : "2024-08-06T00:00:00" -> api request 형태. 00:00:00 시각이됨
export const dateToISOString = (date: Date | null) => {
  if (!date) return;
  const dateOptions: Intl.DateTimeFormatOptions = {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
  };

  const timeOptions: Intl.DateTimeFormatOptions = {
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    hour12: false,
  };

  // 날짜와 시간을 각각 구해서 형식을 변경
  const datePart = date
    .toLocaleDateString('ko-KR', dateOptions)
    .replace(/\./g, '-')
    .replace(/-\s?/g, '-'); // '-' 뒤의 공백 제거

  const timePart = date
    .toLocaleTimeString('ko-KR', timeOptions)
    .replace(/ /g, ''); // 공백 제거

  // const milliseconds = String(date.getMilliseconds()).padStart(3, '0');

  return `${datePart}T${timePart}`;
};
