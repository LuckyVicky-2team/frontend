import React, { useMemo } from 'react';
const useSaveItemState = () => {
  const setSidebarState = (newValue: number) => {
    const rawStoredData = localStorage.getItem('savedGatherings');
    let storedItemArray: number[] = [];
    const now = new Date();
    const setExpirationTime = now.getTime() + 24 * 60 * 60 * 1000;

    if (rawStoredData) {
      const storedData = JSON.parse(rawStoredData);
      let item;

      storedItemArray = storedData.value;
      storedItemArray = storedItemArray.includes(newValue)
        ? storedItemArray.filter(el => el !== newValue)
        : [...storedItemArray, newValue];

      item = {
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
    } else {
      storedItemArray = [newValue];
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
    }
  };
  const getSnapshot = useMemo(() => {
    let cachedValue: number[] = [];
    let cachedString = '';

    const now = new Date();

    return () => {
      const currentString = localStorage.getItem('savedGatherings') ?? '[]';
      const parsedRawData = JSON.parse(currentString);
      if (now.getTime() > parsedRawData.expiration) {
        localStorage.removeItem('savedGatherings');
      } else {
        const parsedString = JSON.parse(currentString);
        if (currentString !== cachedString) {
          cachedString = currentString;
          cachedValue = parsedString.value;
        }
      }
      return cachedValue;
    };
  }, []);

  const subscribe = (listener: () => void) => {
    const handleStorageChagne = (e: StorageEvent) => {
      if (e.key === 'savedGatherings') listener();
    };
    window.addEventListener('storage', handleStorageChagne);
    return () =>
      void window.removeEventListener('storage', handleStorageChagne);
  };
  const getServerSnapshot = (): any => {
    return null; // 서버에서는 localStorage에 접근할 수 없으므로 null 또는 기본값을 반환
  };
  const store = React.useSyncExternalStore(
    subscribe,
    getSnapshot,
    getServerSnapshot
  );
  return [store, setSidebarState] as const;
};
export { useSaveItemState };
