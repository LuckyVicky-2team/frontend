'use client';
import { getRecommendInfo } from '@/api/apis/mypageApis';
import { useEffect, useState } from 'react';
export default function Recommend() {
  const [recommendInfo, setRecommendInfo] = useState();

  useEffect(() => {
    const fetchRecommendInfo = async () => {
      try {
        const res = await getRecommendInfo();
        setRecommendInfo(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    fetchRecommendInfo();
  }, []);
  //   useEffect(() => {
  //     const fetchGatherings = async () => {
  //       try {
  //         const apiUrl = process.env.NEXT_PUBLIC_DEPLOY_URL;

  //         if (!apiUrl) {
  //           throw new Error('API URL is not defined');
  //         }

  //         // 액세스 토큰 가져오기
  //         const accessToken =
  //           typeof window !== 'undefined'
  //             ? localStorage.getItem('accessToken')
  //             : null;

  //         // axios를 사용하여 API 요청 보내기
  //         const response = await axios.get(`${apiUrl}/home/situation`, {
  //           headers: {
  //             'Content-Type': 'application/json',
  //             'X-API-Version': '1',
  //             Authorization: accessToken,
  //           },
  //         });

  //         setGatherings(response.data);
  //       } catch (error) {
  //         setError('모임을 불러오는 중 오류가 발생했습니다.');
  //       } finally {
  //         setLoading(false);
  //       }
  //     };

  //     fetchGatherings();
  //   }, []);

  console.log(recommendInfo);

  return (
    <div>
      <div>asd</div>
    </div>
  );
}
