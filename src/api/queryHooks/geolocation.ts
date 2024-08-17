import { useQuery } from '@tanstack/react-query';
import { QueryKey } from '../../utils/QueryKey';

const getCurrentCoordinate = async (): Promise<{ x: number; y: number }> => {
  return new Promise((res, rej) => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        function (position) {
          const lat = position.coords.latitude; // 위도
          const lon = position.coords.longitude; // 경도

          const coordinate = { x: lon, y: lat };
          res(coordinate);
        },
        () => {
          rej(new Error('위치 정보 제공이 거부되었습니다.'));
        }
      );
    } else {
      rej(new Error('현재 위치를 불러올 수 없습니다.'));
    }
  });
};

const useGetCurrentCoordinate = () => {
  return useQuery({
    queryKey: QueryKey.USER.COORDINATE(),
    queryFn: async () => await getCurrentCoordinate(),
    staleTime: 60000,
    retry: false,
  });
};

export default useGetCurrentCoordinate;
