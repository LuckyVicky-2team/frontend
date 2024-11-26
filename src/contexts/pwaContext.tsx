import React, { createContext, useContext, useEffect, useState } from 'react';

const PWAContext = createContext(false);

export const usePWA = () => useContext(PWAContext);

export const PWAProvider = ({ children }: { children: React.ReactNode }) => {
  const [isPWA, setIsPWA] = useState(false);

  useEffect(() => {
    const checkPWA = () => {
      const isStandalone =
        typeof window !== 'undefined' &&
        (window.matchMedia('(display-mode: standalone)').matches || // Android, Windows, macOS
          (navigator.standalone !== undefined && navigator.standalone)); // iOS

      setIsPWA(isStandalone);
    };

    checkPWA();

    // 브라우저 상태 변경 감지
    const listener = () => checkPWA();
    window.addEventListener('resize', listener);
    window.addEventListener('orientationchange', listener);

    return () => {
      window.removeEventListener('resize', listener);
      window.removeEventListener('orientationchange', listener);
    };
  }, []);

  return <PWAContext.Provider value={isPWA}>{children}</PWAContext.Provider>;
};
