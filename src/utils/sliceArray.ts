//배열을 size만큼 자르는 함수
export const sliceArray = (arr: string[], size: number) => {
  //원하는 사이즈로 자르고 담을 배열
  const result = [];
  // 자를 시점을 체크하기 위한 변수
  let start = 0;

  // 배열의 사이즈 보다 작을 때만 작동
  while (start < arr.length) {
    // 사이즈 만큼 자르기
    const cut = arr.slice(start, start + size);
    result.push(cut);
    // 자른 사이즈 만큼 start 숫자 더해주기
    start += size;
  }
  return result;
};
