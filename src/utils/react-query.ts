import {
  HydrationBoundary,
  QueryClient,
  dehydrate,
  QueryState,
  QueryKey,
} from '@tanstack/react-query';
import { cache } from 'react';
import { isEqual } from '@/utils/isEqual';

//사용 예시
// import { Hydrate, getDehydratedQuery } from '@/utils/react-query';

// export default async function Home() {
//   const query = await getDehydratedQuery({ queryKey, queryFn });
//   return (
//     <main>
//       {/* 서버 사이드 렌더링 & 서버 컴포넌트 */}
//       <Hydrate state={{ queries: [query] }}>
//         {/* <PhotoList/> */}
//       </Hydrate>
//     </main>

//   )
// }

export const getQueryClient = cache(() => new QueryClient());

type UnwrapPromise<T> = T extends Promise<infer U> ? U : T;

interface QueryProps<ResponseType = unknown> {
  queryKey: QueryKey;

  queryFn: () => Promise<ResponseType>;
}

interface DehydratedQueryExtended<TData = unknown, TError = unknown> {
  state: QueryState<TData, TError>;
}

export async function getDehydratedQuery<Q extends QueryProps>({
  queryKey,
  queryFn,
}: Q) {
  const queryClient = getQueryClient();

  await queryClient.prefetchQuery({ queryKey, queryFn });

  const { queries } = dehydrate(queryClient);

  const [dehydratedQuery] = queries.filter(query =>
    isEqual(query.queryKey, queryKey)
  );

  return dehydratedQuery as DehydratedQueryExtended<
    UnwrapPromise<ReturnType<Q['queryFn']>>
  >;
}

export const Hydrate = HydrationBoundary;
