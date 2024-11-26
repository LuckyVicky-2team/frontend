import { detectInAppBrowser } from '@/utils/detectInAppBrowser';
import { useEffect, useState } from 'react';

export const useInApp = () => {
  const [isInApp, setIsInApp] = useState(false);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const isInAppBrowser = detectInAppBrowser(window.navigator.userAgent);
      setIsInApp(isInAppBrowser);
    }
  }, []);

  return isInApp;
};
