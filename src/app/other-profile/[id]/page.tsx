import {
  getOtherEvaluationTags,
  getOtherProfile,
} from '@/api/apis/otherProfileApis';
import { QueryKey } from '@/utils/QueryKey';
import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from '@tanstack/react-query';
import BackButton from '@/components/common/BackButton';
import Link from 'next/link';
import Image from 'next/image';
import OtherProfile from './_components/OtherProfile';
import OtherEvaluationTags from './_components/OtherEvaluationTags';
import styles from './OtherProfilePage.module.scss';

const prefetchUserData = async (id: number) => {
  const queryClient = new QueryClient();

  await Promise.all([
    queryClient.prefetchQuery({
      queryKey: QueryKey.OTHER_USER.INFO(id),
      queryFn: () => getOtherProfile(id, true),
    }),
    queryClient.prefetchQuery({
      queryKey: QueryKey.OTHER_USER.EVALUATION_TAGS(id),
      queryFn: () => getOtherEvaluationTags(id),
    }),
  ]);

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
        <div className={styles.backButton}>
          {gatheringId && open ? (
            <Link
              href={{
                pathname: `/gatherings/${gatheringId}`,
                query: { open: open },
              }}>
              <Image
                src="/assets/icons/backArrow.svg"
                alt="돌아가기"
                width={24}
                height={24}
              />
            </Link>
          ) : (
            <BackButton />
          )}
          <p className={styles.pageTitle}>닉네임 프로필</p>
        </div>
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
            <OtherProfile userId={+userId} />
            <div className={styles.tags}>
              <OtherEvaluationTags userId={+userId} />
            </div>
          </div>
        </div>
      </HydrationBoundary>
    </main>
  );
}
