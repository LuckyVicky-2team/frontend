const getFormattedDate = () => {
  const today = new Date();

  const year = today.getFullYear();
  const month = String(today.getMonth() + 1).padStart(2, '0'); // 월은 0부터 시작하므로 1을 더함
  const day = String(today.getDate()).padStart(2, '0'); // 일자도 2자리로 맞춤

  return `${year}/${month}/${day}`;
};

export default getFormattedDate;
