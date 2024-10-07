import { MetadataRoute } from 'next';

// import { useGatheringList } from '@/api/queryHooks/gathering';
import { gatheringAPI } from '@/api/apis/gatheringsApis';

//@haewon 지금 10개씩 자동으로 나눠서 가지고 오고 있는데 어떻게 하면 전체를 다 가져올지 생각중~ hook 을 써서 전체를 불러오게 해야하나?

export default function sitemap(): MetadataRoute.Sitemap {
  const req = {
    count: 100,
  };
  const meetingss = gatheringAPI.gatheringList(req);
  console.log('::::sitemap::::', meetingss);
  // const meetings: MetadataRoute.Sitemap = getAllPosts.map(meeting => ({
  //   url: `https://board-go.net/gatherings/${meeting.slug}`,
  //   lastModified: new Date(meeting.date).toISOString().split('T')[0],
  //   changeFrequency: 'weekly',
  // }));

  return [
    {
      url: 'https://board-go.net', // 사용자가 접근할 수 있는 URL
      lastModified: new Date().toISOString().split('T')[0], // 마지막으로 수정된 날짜
      changeFrequency: 'yearly', // 변경 빈도
      priority: 1, // 우선순위
    },
    {
      url: 'https://board-go.net/gatherings',
      lastModified: new Date().toISOString().split('T')[0],
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    // ...meetings,
  ];
}
