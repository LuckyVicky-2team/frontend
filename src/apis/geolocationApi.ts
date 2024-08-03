const getCurrentCoordinate = async (): Promise<{ x: number; y: number }> => {
  return new Promise((res, rej) => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(function (position) {
        const lat = position.coords.latitude; // 위도
        const lon = position.coords.longitude; // 경도

        const coordinate = { x: lon, y: lat };
        res(coordinate);
      });
    } else {
      rej(new Error('현재 위치를 불러올 수 없습니다.'));
    }
  });
};

export default getCurrentCoordinate;
