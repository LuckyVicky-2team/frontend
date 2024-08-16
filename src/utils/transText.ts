const useTransText = () => {
  const transDate = (date: string) => {
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
  return {
    transDate,
  };
};

export default useTransText;
