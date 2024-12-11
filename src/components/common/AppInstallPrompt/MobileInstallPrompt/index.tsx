import Image from 'next/image';
import BottomSheet from '../../BottomSheet';
import styles from './MobileInstallPrompt.module.scss';
import useScreenWidth from '@/hooks/useScreenWidth';

interface IMobileInstallPromptProps {
  handleInstallClick: () => void;
  handleCancelClick: () => void;
  handle30ButtonClick: () => void;
  platform: string;
  isOpen: boolean;
}

export default function MobileInstallPrompt({
  handleInstallClick,
  handleCancelClick,
  handle30ButtonClick,
  platform,
  isOpen,
}: IMobileInstallPromptProps) {
  const { screenWidth } = useScreenWidth();
  return (
    <BottomSheet
      isOpen={isOpen}
      onClose={handleCancelClick}
      minHeight={screenWidth >= 450 ? '335px' : '345px'}>
      <div className={styles.prompt}>
        <div className={styles.closeButtons}>
          {/* <Image
            src={'/assets/icons/plus-circle.svg'}
            alt="닫기 버튼"
            width={38}
            height={38}
          /> */}
          <button type="button" onClick={handle30ButtonClick}>
            30일간 안 보기
          </button>
          <span>|</span>
          <button type="button" onClick={handleCancelClick}>
            닫기
          </button>
        </div>
        {screenWidth >= 450 && (
          <Image
            src={'/assets/icons/logo.svg'}
            alt="로고"
            width={150}
            height={230}
          />
        )}
        <div style={{ padding: '30px 30px', maxWidth: '390px' }}>
          <div style={{ display: 'flex', gap: '8px' }}>
            {screenWidth >= 450 || (
              <Image
                src={'/assets/icons/logo.svg'}
                alt="로고"
                width={28}
                height={28}
              />
            )}
            <h1 className={styles.title}>BOGO</h1>
          </div>
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
          {platform === 'firefox' && (
            <p>
              (Firefox에서는 홈 화면에 추가를 통해 앱을 설치할 수 있습니다.)
            </p>
          )}
        </div>
      </div>
    </BottomSheet>
  );
}
