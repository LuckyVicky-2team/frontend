export const plusNineHours = (timeStamp: string) => {
  const originalDate = new Date(timeStamp);

  const nineHoursInMs = 9 * 60 * 60 * 1000;

  const updatedDate = new Date(originalDate.getTime() + nineHoursInMs);

  const updatedTimeStr = updatedDate.toISOString();

  return updatedTimeStr;
};

export const formatTimeDiff = (timeStamp: string) => {
  const now = new Date();
  const date = new Date(timeStamp);

  const diffInMilliseconds = now.getTime() - date.getTime();
  const diffInDays = Math.floor(diffInMilliseconds / (1000 * 60 * 60 * 24));

  const sameYear = now.getFullYear() === date.getFullYear();

  // 오늘인 경우
  if (diffInDays === 0) {
    return date.toLocaleTimeString('ko-KR', {
      hour: 'numeric',
      minute: 'numeric',
      hour12: true,
    });
  }

  // 어제인 경우
  if (diffInDays === 1) {
    return '어제';
  }

  // 올해인 경우
  if (sameYear) {
    return date.toLocaleDateString('ko-KR', {
      month: 'long',
      day: 'numeric',
    });
  }

  // 올해가 아닌 경우
  return date.toLocaleDateString('ko-KR', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
};
