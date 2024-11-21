import { IParamProps } from '@/hooks/useQueryStrings';

type SearchType = '' | 'TITLE' | 'CONTENT' | 'ALL';
type SortBy = 'MEETING_DATE' | 'PARTICIPANT_COUNT';

export function parseQueryString(queryString: string) {
  const searchParams = new URLSearchParams(queryString);
  const params = {
    tag: searchParams.get('tag') || '',
    city: searchParams.get('city') || '',
    county: searchParams.get('county') || '',
    startDate: searchParams.get('startDate') || '',
    endDate: searchParams.get('endDate') || '',
    searchType: (searchParams.get('searchType') || '') as SearchType,
    searchWord: searchParams.get('searchWord') || '',
    sortBy: (searchParams.get('sortBy') || 'MEETING_DATE') as SortBy,
  };
  return Object.fromEntries(
    Object.entries(params).filter(([_, value]) => {
      return value !== null && value !== undefined && value !== '';
    })
  );
}

export function createQueryString(params: IParamProps) {
  const searchParams = new URLSearchParams();
  Object.entries(params).forEach(([key, value]) => {
    if (value !== undefined && value !== '' && value !== null) {
      searchParams.set(key, value.toString());
    }
  });
  return searchParams.toString();
}
