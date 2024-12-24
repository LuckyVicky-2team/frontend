import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import {
  parseQueryString,
  createQueryString,
} from '@/app/gatherings/utils/queryStringUtils';

export interface IParamProps {
  [key: string]: string | null;
}

export default function useQueryStrings() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();

  const onUpdateParams = (url: string) => {
    router.replace(`${pathname}?${url}`);
  };

  const params = parseQueryString(searchParams.toString());

  const getParams = () => params;

  const setParams = (newParams: IParamProps) => {
    const queryString = createQueryString({ ...params, ...newParams });
    onUpdateParams(queryString);
  };

  const clearParams = () => {
    router.replace(pathname);
  };

  return { getParams, setParams, clearParams };
}
