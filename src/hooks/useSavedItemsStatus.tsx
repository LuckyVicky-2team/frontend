import { deepEqual } from 'assert';
import React, { useMemo } from 'react';
const useSaveItemState = () => {
  const setSavedItemsState = (newValue: number) => {
    const rawStoredData = localStorage.getItem('savedGatherings');
    let storedItemArray: number[] = [];
    const now = new Date();

    const setExpirationTime = now.getTime() + 24 * 60 * 60 * 1000;

    if (rawStoredData) {
      const storedData = JSON.parse(rawStoredData);

      storedItemArray = storedData.value;
      storedItemArray = storedItemArray.includes(newValue)
        ? storedItemArray.filter(el => el !== newValue)
        : [...storedItemArray, newValue];
    } else {
      storedItemArray = [newValue];
    }

    const item = {
      value: storedItemArray,
      expiration: setExpirationTime,
    };

    window.localStorage.setItem('savedGatherings', JSON.stringify(item));
    window.dispatchEvent(
      new StorageEvent('storage', {
        key: 'savedGatherings',
        newValue: JSON.stringify(item),
      })
    );
  };

  // js 가 실행할때 실행 함수 만듦. / js file 생성시 global var 처리 , 함수 처리 / 함수 중첩시 외부 함수부터 처리.다음 내부함수 처리
  // 외부함수 : useMemo로 감싸고 있다. useMemo의 첫번째 인자 :callback 함수(상위함수) / 내부함수 : 무명함수 ()=>{}
  // 외부에서는 getSnapshot 안에있는 변수 접근 x (은닉되어있음), closure 함수 안에서만 접근가능함.

  // 왜 사용 했나요 ? 배열끼리 비교를 하게되면 같은 내용이어도 배열끼리 주소값이 다르면 주소값을 비교하기 때문에 다르다고 판단됨. -> 리렌더링 트리거
  // 클로저 함수없이 getSnapshot에서 localStorage.getItem에서 가져온 배열 자체를 넘기게 되면 리렌더링 트리거 -> 무한 루프 발생
  // cachedValue, cachedString 은 렌더링이 될떄 딱한번만 선언됨. 접근은 할수없지만 메모리 상에 올라가 있고 유지가 되고있음
  // 이 코드에서 배열을 비교하는 부분 어디에? 없음 -> getSnapshot

  const getSnapshot = useMemo(() => {
    let cachedValue: number[] = [];
    let cachedString = '';

    const now = new Date();

    //클로저 함수(하위함수)
    return () => {
      const currentString = localStorage.getItem('savedGatherings') ?? '[]';
      deepEqual;
      const parsedRawData = JSON.parse(currentString);
      if (now.getTime() > parsedRawData.expiration) {
        localStorage.removeItem('savedGatherings');
        return null;
      } else {
        const parsedString = JSON.parse(currentString);
        if (currentString !== cachedString) {
          cachedString = currentString;
          cachedValue = parsedString.value;
        }
      }
      //새롭게 받아온 배열 /저장된 cachedValue = 배열
      return cachedValue;
    };
  }, []);

  // 흐름
  // 찜버튼 누름 -> LocalStorage 변화
  // subscribe 감지
  // getSnapshot으로 새 값을 가져옴
  // 화면에 반영됨

  const subscribe = (listener: () => void) => {
    const handleStorageChange = (e: StorageEvent) => {
      if (e.key === 'savedGatherings') listener();
    };
    window.addEventListener('storage', handleStorageChange);
    return () =>
      void window.removeEventListener('storage', handleStorageChange);
  };
  const getServerSnapshot = (): any => {
    return null;
  };

  //hook 자체 getter를 통해서 값의 변경을 내부적으로 검사하는 코드가 있음, 그대로 배열을 return시 얕은비교 하기때문에 무한 루프
  const store = React.useSyncExternalStore(
    subscribe, //setter
    getSnapshot, //getter
    getServerSnapshot
  );
  return [store, setSavedItemsState] as const;
};
export { useSaveItemState };
