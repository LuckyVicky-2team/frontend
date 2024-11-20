import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import {
  parseQueryString,
  createQueryString,
} from '@/app/gatherings/utils/queryStringUtils';

// useSearchQuery.ts
export function useSearchQuery() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();

  const searchKeyword = searchParams.get('searchWord') || '';
  const searchType = searchParams.get('searchType') || '';

  function setSearch({ keyword, type }: { keyword: string; type: string }) {
    const params = new URLSearchParams();

    if (keyword.trim() === '') {
      params.delete('searchWord');
      params.delete('searchType');
    } else {
      params.set('searchWord', keyword);
      params.set('searchType', type);
    }

    router.replace(`${pathname}?${params.toString()}`, {
      scroll: false,
    });
  }
  return { searchKeyword, searchType, setSearch };
}

// useFilterQuery.js
// export function useFilterQuery() {
//   const searchParams = useSearchParams();
//   const router = useRouter();
//   const pathname = usePathname();
//   const params = new URLSearchParams(searchParams.toString());

//   const filters = {
//     tag: searchParams.get('tag') || '',
//     city: searchParams.get('city') || '',
//     county: searchParams.get('county') || '',
//     startDate: searchParams.get('startDate') || '',
//     endDate: searchParams.get('endDate') || '',
//     searchType: searchParams.get('searchType') || 'TITLE',
//     searchWord: searchParams.get('searchWord') || '',
//     sortBy: searchParams.get('sortBy') || 'MEETING_DATE',
//   };

//   function setFilters(newFilters: any) {
//     Object.keys(newFilters).forEach(key => {
//       if (newFilters[key] !== undefined) {
//         params.set(key, newFilters[key]);
//       }
//     });
//     router.replace(`${pathname}?${params.toString()}`, { scroll: false });
//   }

//   return { filters, setFilters };
// }

export default function useQueryStrings() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();

  const onUpdateParams = (url: string) => {
    router.replace(`${pathname}?${url}`);
  };

  const params = parseQueryString(searchParams.toString());

  const getParams = () => params;

  const setParams = newParams => {
    const queryString = createQueryString({ ...params, ...newParams });
    // setSearchParams(queryString, { replace: true });
    onUpdateParams(queryString);
  };

  const clearParams = () => {
    router.replace(pathname);
  };

  return { getParams, setParams, clearParams };
}
