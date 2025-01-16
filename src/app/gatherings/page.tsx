import GatheringListPage from './_components/GatheringList';
import GatheringsPageClient from './GatheringsPageClient';

export type SearchParams = {
  [key: string]: string | string[] | undefined;
};

export default function GatheringsPage({
  searchParams,
}: {
  searchParams: SearchParams;
}) {
  return (
    <>
      <GatheringsPageClient
        prefetchGatheringPage={
          <GatheringListPage searchParams={searchParams} />
        }
      />
    </>
  );
}
