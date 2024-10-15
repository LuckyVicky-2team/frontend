import Image from 'next/image';
import BottomSheet from '../../BottomSheet';
import styles from './MobileInstallPrompt.module.scss';
import { useEffect, useState } from 'react';

interface IMobileInstallPromptProps {
  handleInstallClick: () => void;
  handleCancelClick: () => void;
  platform: string;
  isOpen: boolean;
}

export default function MobileInstallPrompt({
  handleInstallClick,
  handleCancelClick,
  platform,
  isOpen,
}: IMobileInstallPromptProps) {
  const [screenWidth, setScreenWidth] = useState(window.innerWidth);

  useEffect(() => {
    const handleResize = () => {
      setScreenWidth(window.innerWidth);
    };

    window.addEventListener('resize', handleResize);
    handleResize(); // 초기 로드 시 체크

    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <BottomSheet
      isOpen={isOpen}
      onClose={handleCancelClick}
      minHeight={screenWidth >= 450 ? '35vh' : '45vh'}>
      <div className={styles.prompt}>
        <button
          type="button"
          onClick={handleCancelClick}
          className={styles.closeButton}>
          <Image
            src={'/assets/icons/plus-circle.svg'}
            alt="닫기 버튼"
            width={38}
            height={38}
          />
        </button>
        {screenWidth >= 450 && (
          <Image
            src={'/assets/icons/logo.svg'}
            alt="로고"
            width={150}
            height={230}
          />
        )}
        <div style={{ padding: '30px 30px', maxWidth: '390px' }}>
          <h1 className={styles.title}>BOGO</h1>
          <p className={styles.description}>
            BOGO는 앱에서 원활히 사용할 수 있습니다. 설치하시겠습니까?
          </p>
          {platform === 'ios' && (
            <p>
              (
              <Image
                src={'/assets/icons/apple_share.png'}
                width={16}
                height={16}
                alt="공유하기 아이콘"
              />{' '}
              버튼을 눌러 홈 화면에 추가하기를 통해 설치를 해주세요.)
            </p>
          )}
          {platform === 'android' && (
            <button
              type="button"
              onClick={handleInstallClick}
              className={styles.button}>
              홈 화면에 추가
            </button>
          )}
        </div>
      </div>
    </BottomSheet>
  );
}
