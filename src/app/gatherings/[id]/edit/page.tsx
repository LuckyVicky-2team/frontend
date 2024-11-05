import EditGatheringPageClient from './EditGatheringPageClient';
import { getDehydratedQuery, Hydrate } from '@/utils/react-query';
import { QueryKey } from '@/utils/QueryKey';
import { gatheringAPI } from '@/api/apis/gatheringsApis';

export default async function EditGathering({
  params,
}: {
  params: { [key: string]: string };
}) {
  const { id } = params;

  const detailQuery = getDehydratedQuery({
    queryKey: [QueryKey.DETAIL],
    queryFn: () => gatheringAPI.getGatheringsInfo(Number(id)),
  });
  return (
    <Hydrate state={detailQuery}>
      <EditGatheringPageClient gatheringId={Number(id)} />
    </Hydrate>
  );
}
