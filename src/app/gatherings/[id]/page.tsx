import { getDehydratedQuery, Hydrate } from '@/utils/react-query';
import { QueryKey } from '@/utils/QueryKey';
import GatheringDetails from './_components/GatheringDetails.tsx';
import { gatheringAPI } from '@/api/apis/gatheringsApis';
import { getMe } from '@/api/apis/meApi';

// [key: string]: string
export default async function GatheringsInfo({ params }: { params: any }) {
  const { id } = params;

  const detailQuery = getDehydratedQuery({
    queryKey: [QueryKey.DETAIL],
    queryFn: () => gatheringAPI.getGatheringsInfo(Number(id)),
  });

  const meQuery = getDehydratedQuery({
    queryKey: [QueryKey.USER.ME],
    queryFn: getMe,
  });

  return (
    <div>
      <Hydrate state={detailQuery}>
        <Hydrate state={meQuery}>
          <GatheringDetails id={Number(id)} />
        </Hydrate>
      </Hydrate>
    </div>
  );
}
