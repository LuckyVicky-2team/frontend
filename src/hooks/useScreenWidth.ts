import { useState, useEffect } from 'react';

function useScreenWidth(mobileWidth = 439, defaultWidth = 600) {
  const [screenWidth, setScreenWidth] = useState(
    typeof window !== 'undefined' ? window.innerWidth : defaultWidth
  );
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setScreenWidth(window.innerWidth);
      setIsMobile(window.innerWidth <= mobileWidth);
    };

    window.addEventListener('resize', handleResize);
    handleResize(); // 초기 로드 시 체크

    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return { screenWidth, isMobile };
}

export default useScreenWidth;
