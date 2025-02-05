import { getDehydratedQuery, Hydrate } from '@/utils/react-query';
import { QueryKey } from '@/utils/QueryKey';
import GatheringDetails from './_components/GatheringDetails/index';
import { gatheringAPI } from '@/api/apis/gatheringsApis';
// import { getMe } from '@/api/apis/meApi';

// [key: string]: string
export default async function GatheringsInfo({
  params,
  searchParams,
}: {
  params: { [key: string]: string };
  searchParams: { [key: string]: string };
}) {
  const { id } = params;
  const { open } = searchParams;

  const detailQuery = getDehydratedQuery({
    queryKey: QueryKey.GATHERING.DETAIL(Number(id)),
    queryFn: () => gatheringAPI.getGatheringsInfo(Number(id)),
  });

  // const meQuery = getDehydratedQuery({
  //   queryKey: [QueryKey.USER.ME],
  //   queryFn: getMe,
  // });

  return (
    <div>
      <Hydrate state={detailQuery}>
        {/* <Hydrate state={meQuery}> */}
        <GatheringDetails id={Number(id)} open={open} />
        {/* </Hydrate> */}
      </Hydrate>
    </div>
  );
}
