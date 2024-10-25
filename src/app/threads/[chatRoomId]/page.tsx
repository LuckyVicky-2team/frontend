import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from '@tanstack/react-query';
import ChattingRoom from '../_components/ChattingRoom';
import { QueryKey } from '@/utils/QueryKey';
import { getGatheringInfo } from '@/api/apis/threadApis';
import styles from './ThreadDetailPage.module.scss';

interface IThreadDetailPageProps {
  params: { [key: string]: string };
  searchParams: { [key: string]: string };
}

const prefetchGatheringData = async (gatheringId: number) => {
  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: [QueryKey.GATHERING.DETAIL(gatheringId)],
    queryFn: () => getGatheringInfo(gatheringId, true),
  });

  return dehydrate(queryClient);
};

export default async function ThreadDetailPage({
  params,
  searchParams,
}: IThreadDetailPageProps) {
  const dehydratedState = await prefetchGatheringData(+searchParams.meeting);

  return (
    <main className={styles.container}>
      <HydrationBoundary state={dehydratedState}>
        <ChattingRoom
          chatRoomId={+params.chatRoomId}
          gatheringId={+searchParams.meeting}
        />
      </HydrationBoundary>
    </main>
  );
}
