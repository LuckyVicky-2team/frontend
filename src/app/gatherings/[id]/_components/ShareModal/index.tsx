import Modal from '@/components/common/Modal';
import KakaoShare from '../KakaoShare';
import { handleCopyClipBoard } from '@/utils/handleCopyClipBoard';
import Image from 'next/image';
import styles from './ShareModal.module.scss';
import { useToast } from '@/contexts/toastContext';

interface IShareModalProps {
  modalOpen: boolean;
  onClose: () => void;
  pathname: string;
  shareCount: number;
  isMobile: boolean;
}

export default function ShareModal({
  modalOpen,
  onClose,
  pathname,
  shareCount,
  isMobile,
}: IShareModalProps) {
  const { addToast } = useToast();
  return (
    <div>
      <Modal modalOpen={modalOpen} onClose={onClose} maxWidth={552}>
        <div className={styles.background}>
          {!isMobile ? (
            <p className={styles.title}>내가 좋아하는 모임을 공유해 보세요!</p>
          ) : (
            <p className={styles.title}>
              내가 좋아하는 모임을
              <br /> 공유해 보세요!
            </p>
          )}
          <div className={styles.buttons}>
            <button
              type="button"
              onClick={() =>
                handleCopyClipBoard(
                  `${process.env.NEXT_PUBLIC_DEPLOY_URL}${pathname}`,
                  addToast
                )
              }
              className={styles.button}>
              <div className={styles.copyImage}>
                <Image
                  src={'/assets/icons/copy.svg'}
                  alt="복사 이미지"
                  width={34}
                  height={34}
                />
              </div>
              클립보드
            </button>
            {/* <KakaoShare path={pathname} likeCount={12} sharedCount={shareCount} /> */}
            <KakaoShare path={pathname} sharedCount={shareCount} />
          </div>
        </div>
        <button className={styles.closeButton} type="button" onClick={onClose}>
          닫기
        </button>
      </Modal>
    </div>
  );
}
