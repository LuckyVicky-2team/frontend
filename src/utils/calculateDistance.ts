/**
 * 도 단위를 라디안 단위로 변환하는 함수
 * @param degrees - 도 단위 값
 * @returns 라디안 단위 값
 */
const toRadians = (degrees: number): number => {
  return degrees * (Math.PI / 180);
};

/**
 * 두 지점 사이의 거리를 계산하는 함수
 * @param lat1 - 첫 번째 지점의 위도 (도 단위)
 * @param lon1 - 첫 번째 지점의 경도 (도 단위)
 * @param lat2 - 두 번째 지점의 위도 (도 단위)
 * @param lon2 - 두 번째 지점의 경도 (도 단위)
 * @returns 두 지점 사이의 거리 (킬로미터 단위)
 */
const calculateDistance = (
  lat1: number,
  lon1: number,
  lat2: number,
  lon2: number
): number => {
  const R = 6371; // 지구의 반지름 (킬로미터)

  // 위도와 경도를 라디안으로 변환
  const lat1Rad = toRadians(lat1);
  const lon1Rad = toRadians(lon1);
  const lat2Rad = toRadians(lat2);
  const lon2Rad = toRadians(lon2);

  // 두 지점 사이의 차이
  const dLat = lat2Rad - lat1Rad;
  const dLon = lon2Rad - lon1Rad;

  // 하버사인 공식을 사용하여 거리 계산
  const a =
    Math.sin(dLat / 2) ** 2 +
    Math.cos(lat1Rad) * Math.cos(lat2Rad) * Math.sin(dLon / 2) ** 2;
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

  return R * c;
};

export default calculateDistance;
