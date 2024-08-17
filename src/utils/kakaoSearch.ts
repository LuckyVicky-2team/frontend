import { IPlaceInfoResponse, StatusType } from '@/types/kakao';

const kakaoSearch = async (
  keyword: string,
  size?: number,
  coordinate?: { lat: number; lon: number }
) => {
  return new Promise<IPlaceInfoResponse[]>((resolve, reject) => {
    window.kakao.maps.load(() => {
      const ps = new window.kakao.maps.services.Places();

      ps.keywordSearch(
        keyword,
        (data: IPlaceInfoResponse[], status: StatusType) => {
          if (status === window.kakao.maps.services.Status.OK) {
            resolve(data);
          } else if (status === window.kakao.maps.services.Status.ZERO_RESULT) {
            resolve([]);
          } else if (status === window.kakao.maps.services.Status.ERROR) {
            reject(new Error('리스트를 불러올 수 없습니다.'));
          }
        },
        {
          size,
          location: new window.kakao.maps.LatLng(
            coordinate?.lat,
            coordinate?.lon
          ),
        }
      );
    });
  });
};

export default kakaoSearch;
