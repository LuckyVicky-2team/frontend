import { MetadataRoute } from 'next';

import axios from 'axios';

const axiosInstanceSitemap = axios.create({
  baseURL: `${process.env.NEXT_PUBLIC_API_BASE_URL}`,
  timeout: 1000 * 20,
  headers: {
    'Content-Type': 'application/json',
    'X-API-Version': 1,
  },
  withCredentials: false,
});
async function getAllGatherings() {
  let allGatherings: any = [];
  let currentPage = 0;
  let hasNextPage = true;

  // 반복적으로 API 호출하여 모든 페이지의 데이터를 가져옴
  while (hasNextPage) {
    const { data } = await axiosInstanceSitemap.get('/meeting', {
      params: { size: 10, page: currentPage }, // 현재 페이지와 한 번에 불러올 개수 설정
    });

    const { content, last } = data;

    allGatherings = [...allGatherings, ...content];
    currentPage += 1;
    hasNextPage = !last;
  }

  return allGatherings;
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const gatheringsArray = await getAllGatherings();

  const gatherings: MetadataRoute.Sitemap = gatheringsArray.map(
    (gathering: any) => ({
      url: `https://dev.app.board-go.net/gatherings/${gathering.id}`,
      lastModified: new Date(gathering.meetingDate).toISOString().split('T')[0],
      changeFrequency: 'weekly',
      priority: 0.7,
    })
  );

  return [
    {
      url: 'https://dev.app.board-go.net', // 사용자가 접근할 수 있는 URL
      lastModified: new Date().toISOString().split('T')[0], // 마지막으로 수정된 날짜
      changeFrequency: 'monthly', // 변경 빈도
      priority: 1, // 우선순위
    },
    {
      url: 'https://dev.app.board-go.net/gatherings',
      lastModified: new Date().toISOString().split('T')[0],
      changeFrequency: 'daily',
      priority: 0.8,
    },

    ...gatherings,
  ];
}
