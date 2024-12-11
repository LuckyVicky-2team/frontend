import { getOtherProfile } from '@/api/apis/otherProfileApis';
import { QueryKey } from '@/utils/QueryKey';
import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from '@tanstack/react-query';
import Image from 'next/image';
import OtherProfileContents from './_components/OtherProfileContents';
import OtherProfileBackButton from './_components/OtherProfileBackButton';
import styles from './OtherProfilePage.module.scss';

const prefetchUserData = async (id: number) => {
  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: QueryKey.OTHER_USER.INFO(id),
    queryFn: () => getOtherProfile(id, true),
  });

  return dehydrate(queryClient);
};

export default async function OtherProfilePage({
  params,
  searchParams,
}: {
  params: { [key: string]: string };
  searchParams: { [key: string]: string };
}) {
  const { id: userId } = params;
  const { id: gatheringId, open } = searchParams;

  const dehydratedState = await prefetchUserData(+userId);

  return (
    <main className={styles.container}>
      <HydrationBoundary state={dehydratedState}>
        <OtherProfileBackButton
          userId={userId}
          gatheringId={gatheringId}
          open={open}
        />
      </HydrationBoundary>
      <div className={styles.profile}>
        <div className={styles.header}>
          <Image
            src="/assets/icons/profileHeader.svg"
            alt="profile"
            width={156.2}
            height={46.6}
            className={styles.headerImage}
          />
        </div>
        <hr className={styles.boundary} />
        <div className={styles.contents}>
          <HydrationBoundary state={dehydratedState}>
            <OtherProfileContents userId={+userId} />
          </HydrationBoundary>
        </div>
      </div>
    </main>
  );
}
