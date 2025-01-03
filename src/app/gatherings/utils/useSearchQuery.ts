import {
  usePathname,
  useRouter,
  useSearchParams,
  useParams,
} from 'next/navigation';

export function useSearchQuery() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();
  const { category } = useParams();

  const searchKeyword = searchParams.get('searchWord') || '';
  const searchType = searchParams.get('searchType') || '';

  function setSearch({ keyword, type }: { keyword: string; type: string }) {
    const params = new URLSearchParams();
    const trimmedKeyword = keyword.trim();

    if (trimmedKeyword === '') {
      params.delete('searchWord');
      params.delete('searchType');
    } else {
      params.set('searchWord', trimmedKeyword);
      type === ''
        ? params.delete('searchType')
        : params.set('searchType', type);
    }
    if (category) {
      router.replace(`/recommend/${trimmedKeyword}`, {
        scroll: false,
      });
    } else {
      router.replace(`${pathname}?${params.toString()}`, {
        scroll: false,
      });
    }
  }
  return { searchKeyword, searchType, setSearch };
}
