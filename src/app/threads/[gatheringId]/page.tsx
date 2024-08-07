const getTalks = async (id: string) => {
  const talks = [
    {
      id: 0,
      nickname: '김수환',
      contents: '언제 오는거임 대체?',
      createdAt: '2024-08-05T12:27:15',
      profileImage: '/assets/images/default_profile.png',
    },
    {
      id: 1,
      nickname: '이해원',
      contents: '너무 늦긴 한다 좀',
      createdAt: '2024-08-05T12:29:49',
      profileImage: '/assets/images/default_profile.png',
    },
    {
      id: 2,
      nickname: '기송은',
      contents: '찬용아 개념좀 챙기자 제발',
      createdAt: '2024-08-05T12:34:10',
      profileImage: '/assets/images/default_profile.png',
    },
    {
      id: 3,
      nickname: '진찬용',
      contents: '배고파.. 오늘 점심 뭐 먹을래?',
      createdAt: '2024-08-05T12:38:42',
      profileImage: '/assets/images/default_profile.png',
    },
  ];
  console.log(id);

  return talks;
};

export default async function ThreadDetailPage({
  params,
}: {
  params: { gatheringId: string };
}) {
  const talks = await getTalks(params.gatheringId);

  console.log(talks);
  return (
    <div>
      <h1></h1>
    </div>
  );
}
