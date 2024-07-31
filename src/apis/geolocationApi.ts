const getCurrentCoordinate = async () => {
  return new Promise((res, rej) => {
    // HTML5의 geolocaiton으로 사용할 수 있는지 확인
    if (navigator.geolocation) {
      // GeoLocation을 이용해서 접속 위치를 얻어옵니다.
      navigator.geolocation.getCurrentPosition(function (position) {
        const lat = position.coords.latitude; // 위도
        const lon = position.coords.longitude; // 경도

        const coordinate = new window.kakao.maps.LatLng(lat, lon);
        res(coordinate);
      });
    } else {
      rej(new Error('현재 위치를 불러올 수 없습니다.'));
    }
  });
};

export default getCurrentCoordinate;
