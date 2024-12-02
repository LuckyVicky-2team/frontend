import { usePathname, useRouter, useSearchParams } from 'next/navigation';

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
