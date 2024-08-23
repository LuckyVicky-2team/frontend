declare global {
  interface Window {
    kakao: any;
    Kakao: any;
  }
}

interface IPlaceInfoResponse {
  address_name: string;
  category_group_code: string;
  category_group_name: string;
  category_name: string;
  distance: string;
  id: string;
  phone: string;
  place_name: string;
  place_url: string;
  road_address_name: string;
  x: string;
  y: string;
  index?: number;
}

type StatusType = 'OK' | 'ERROR' | 'ZERO_RESULT';

export { IPlaceInfoResponse, StatusType };
