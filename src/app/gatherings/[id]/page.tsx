import { getDehydratedQuery, Hydrate } from '@/utils/react-query';
import { QueryKey } from '@/utils/QueryKey';
import GatheringDetails from './_components/GatheringDetails.tsx';
import { getGatheringsInfo } from '@/api/apis/gatheringsApis';

// [key: string]: string
export default async function GatheringsInfo({ params }: { params: any }) {
  const { id } = params;

  const query = getDehydratedQuery({
    queryKey: [QueryKey.DETAIL],
    queryFn: () => getGatheringsInfo(Number(id)),
  });

  return (
    <div>
      <Hydrate state={query}>
        <GatheringDetails id={Number(id)} />
      </Hydrate>
    </div>
  );
}
