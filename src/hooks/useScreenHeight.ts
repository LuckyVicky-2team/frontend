import { useState, useEffect } from 'react';

function useScreenHeight() {
  const [screenHeight, setScreenHeight] = useState(
    typeof window !== 'undefined' ? window.innerHeight : 0
  );

  useEffect(() => {
    const handleResize = () => {
      setScreenHeight(window.innerHeight);
    };

    window.addEventListener('resize', handleResize);
    handleResize(); // 초기 로드 시 체크

    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return screenHeight;
}

export default useScreenHeight;
