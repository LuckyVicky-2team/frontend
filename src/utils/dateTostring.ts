export const dateToString = (date: Date) => {
  // 연도, 월, 일, 시간, 분, 초 추출
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0'); // getMonth()는 0부터 시작하므로 +1
  const day = String(date.getDate()).padStart(2, '0');

  const hours = String(date.getHours()).padStart(2, '0');
  const minutes = String(date.getMinutes()).padStart(2, '0');
  const seconds = String(date.getSeconds()).padStart(2, '0');

  // 포맷팅
  const formattedDate = `${year}-${month}-${day}T${hours}:${minutes}:${seconds}`;

  return formattedDate;
};
