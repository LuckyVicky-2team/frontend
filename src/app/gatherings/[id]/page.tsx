'use client';

// import { getDehydratedQuery } from '@/utils/react-query';
// import { QueryKey } from '@/utils/QueryKey';
import GatheringDetails from './_components/GatheringDetails.tsx';
// import { getGatheringsInfo } from '@/api/apis/gatheringsApis';
// import { useRouter } from 'next/router';
// import { useEffect, useState } from 'react';
// import { useParams } from 'next/navigation.js';
// [key: string]: string
export default function GatheringsInfo({ params }: { params: any }) {
  // const router = useRouter();
  // const { id } = router.query;
  // const { id } = useParams();
  const { id } = params;
  // const router = useRouter();
  // const [id, setId] = useState<number | null>(null);

  // useEffect(() => {
  //   if (router.isReady) {
  //     setId(Number(router.query.id));
  //   }
  // }, [router.isReady, router.query.id]);

  // if (!id) {
  //   return <div>Loading...</div>;
  // }

  // const query = getDehydratedQuery({
  //   queryKey: [QueryKey.DETAIL],
  //   queryFn: () => getGatheringsInfo(Number(id)),
  // });
  return (
    <div>
      {/* <Hydrate state={{ queries: [query] }}> */}
      <GatheringDetails id={Number(id)} />
      {/* </Hydrate> */}
      ss
    </div>
  );
}
