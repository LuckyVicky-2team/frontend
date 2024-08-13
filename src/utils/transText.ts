const useTransText = () => {
  const transDate = (date: string) => {
    // 날짜와 시간을 분리
    const [datePart, timePart] = date.split(' ');

    // 년, 월, 일을 분리
    let [year, month, day] = datePart.split('.');
    month = parseInt(month, 10).toString();
    day = parseInt(day, 10).toString();

    // 필요한 형식으로 변환
    const mondthAndDay = `${month}월 ${day}일`;
    const time = timePart;

    return { year, mondthAndDay, time };
  };
  return {
    transDate,
  };
};

export default useTransText;
