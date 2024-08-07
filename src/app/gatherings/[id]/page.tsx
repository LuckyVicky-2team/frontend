// import axios from 'axios';
// import { Hydrate, getDehydratedQuery } from '@/utils/react-query';
// import { QueryKey } from '@/utils/QueryKey';
import GatheringDetails from './_components/GatheringDetails.tsx';

// interface IGatheringsInfoResponseProps {
//   title: string;
//   content: string;
//   address: string;
//   place: string;
//   map: string;
//   isZzimed: boolean;
//   owner: string;
//   member: string;
//   game: string;
//   genre: string;
// }

export default function GatheringsInfo() {
  // const query = await getDehydratedQuery({
  //   queryKey: [QueryKey.DETAIL],
  //   queryFn: getGatheringsInfo,
  // });
  return (
    <div>
      {/* <Hydrate state={{ queries: [query] }}> */}
      <GatheringDetails />
      dddd
      {/* </Hydrate> */}
    </div>
  );
}
