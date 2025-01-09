import { useEffect } from 'react';
import useModal from '@/hooks/useModal';
import BottomSheet from '../BottomSheet';
import Image from 'next/image';
import styles from './FCMDisabledPrompt.module.scss';
import useScreenWidth from '@/hooks/useScreenWidth';

export default function FCMDisabledPrompt() {
  const { modalOpen, handleModalOpen, handleModalClose } = useModal();
  const { screenWidth } = useScreenWidth();
  useEffect(() => {
    handleModalOpen();
  }, []);

  return (
    <>
      {modalOpen && (
        <BottomSheet
          isOpen={modalOpen}
          onClose={handleModalClose}
          minHeight={screenWidth >= 450 ? '335px' : '345px'}>
          <div className={styles.prompt}>
            <button
              type="button"
              onClick={handleModalClose}
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
              <div style={{ display: 'flex', gap: '8px' }}>
                {screenWidth >= 450 || (
                  <Image
                    src={'/assets/icons/logo.svg'}
                    alt="로고"
                    width={30}
                    height={30}
                  />
                )}
                <h1 className={styles.title}>BOGO</h1>
              </div>
              <p className={styles.description}>
                알림을 지원하지 않는 브라우저일 경우 알림을 받지 못할 수 있어요.
                ( Naver, Kakaotalk, Google App, Samsung browser,...)
              </p>
              <button
                type="button"
                onClick={handleModalClose}
                className={styles.button}>
                닫기
              </button>
            </div>
          </div>
        </BottomSheet>
      )}
    </>
  );
}
