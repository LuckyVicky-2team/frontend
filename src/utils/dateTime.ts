export const dateTime = (dateTimeString: string) => {
  // "2024-08-27T13:40:39";

  // 날짜와 시간을 분리
  const [datePart, timePart] = dateTimeString.split('T');

  // 날짜를 "년-월-일"로 나누고, 시간에서 초 제거
  const [year, month, day] = datePart.split('-');
  const [hours, minutes] = timePart.split(':');
  void year;
  // 최종 문자열 형식으로 변환
  const formattedDate = `${parseInt(month)}월 ${parseInt(day)}일`;
  const formattedTime = `${hours}:${minutes}`;

  return { formattedDate, formattedTime }; // 결과: "8월 27일, 13:40"
};
