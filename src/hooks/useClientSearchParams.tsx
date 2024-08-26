/* eslint-disable no-unused-vars */
/* eslint-disable no-redeclare */

import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { UrlObject } from 'url';
type ParameterJsonType = Record<string, string>;
type ParameterOptionType = 'PUSH' | 'REPLACE';
type AppendFunction = (
  option: ParameterOptionType,
  json: ParameterJsonType
) => void;
type RemoveFunction = (
  option: ParameterOptionType,
  keys: string | string[]
) => void;
type ClearFunction = (option: ParameterOptionType) => void;
type PreserveFunction = (
  option: ParameterOptionType,
  pathname: string | UrlObject
) => void;

export const useClientSearchParams = () => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  /**
   * 내부에서만 사용
   * 현재 URL의 searchParams 객체를 반환합니다.
   */
  const getCurrentSearchParams = () => {
    return new URLSearchParams(searchParams);
  };
  /**
   * 내부에서만 사용
   * 옵션에 따라 router.push, router.replace를 수행합니다.
   */
  const routerAction = (
    searchParams: URLSearchParams,
    option: ParameterOptionType
  ) => {
    if (option === 'PUSH') {
      router.push(`${pathname}?${searchParams.toString()}`);
    }
    if (option === 'REPLACE') {
      router.replace(`${pathname}?${searchParams.toString()}`);
    }
  };
  const getAll = () => {
    const params = getCurrentSearchParams();
    let result: Record<string, string> = {};
    if (params.size === 0) return {};
    params.forEach((value, key) => {
      result[key] = value;
    });
    return result;
  };
  /**
   * @param args - string | string[]
   *
   * Argument로 넘긴 key에 해당하는 쿼리스트링 value를 반환합니다.
   * 넘긴게 없다면 `getAll()`을 실행합니다.
   *
   */

  function get(args: string): string; //함수선언 : 단일 문자열 인자를 받아 문자열을 반환하는 형태
  function get(...args: string[]): Record<string, string>; //함수선언 : 여러 문자열 인자를 받아, 각 키와 값을 가진 객체를 반환하는 형태
  function get(...args: string[]) {
    //함수구현 : 나머지 매개변수(...args)를 사용하여 입력된 모든 인자를 배열로 처리, 조건부 로직을 사용하여 args의 길이나 타입에 따라 다르게 처리하는 형태
    const params = getCurrentSearchParams();
    if (args.length === 0) return getAll();
    if (args.length === 1) return params.get(args[0]) as string;
    let result: Record<string, string> = {};
    params.forEach((value, key) => {
      args.forEach(arg => {
        if (arg === key) {
          result[key] = value;
        }
      });
    });
    return result;
  }
  /**
   * @param1 option - "PUSH" | "REPLACE"
   * @param2 json - { key: value }
   *
   * 두번째 인자의 객체 형태로 쿼리스트링을 추가합니다.
   */
  const append: AppendFunction = (option, json) => {
    const params = getCurrentSearchParams();
    Object.entries(json).forEach(([key, value]) => {
      if (value != null) params.set(key, value);
    });
    routerAction(params, option);
  };
  /**
   * @param1 option - "PUSH" | "REPLACE"
   * @param2 string | string[]
   *
   * 두번째 인자의 키의 쿼리스트링을 제거합니다.
   * 만약 여러개를 지워야한다면 string[]로 넘깁니다.
   */
  const remove: RemoveFunction = (option, removeKeys) => {
    const params = getCurrentSearchParams();
    if (typeof removeKeys === 'string') {
      params.delete(removeKeys);
    }
    if (removeKeys instanceof Array) {
      removeKeys.forEach(key => {
        params.delete(key);
      });
    }
    routerAction(params, option);
  };
  /**
   * 현재 쿼리스트링을 모두 제거합니다.
   */
  const clear: ClearFunction = option => {
    if (option === 'PUSH') {
      router.push(pathname);
    }
    if (option === 'REPLACE') {
      router.replace(pathname);
    }
  };
  /**
   * @param1 option - "PUSH" | "REPLACE"
   * @param2 pathname - string | URL
   *
   * 현재 쿼리스트링을 유지하여 페이지를 이동합니다.
   */
  const preserve: PreserveFunction = (option, pathname) => {
    const params = getCurrentSearchParams();
    if (option === 'PUSH') {
      router.push(`/${pathname}?${params.toString()}`);
    }
    if (option === 'REPLACE') {
      router.replace(`/${pathname}?${params.toString()}`);
    }
  };
  return { get, append, remove, clear, preserve };
};
