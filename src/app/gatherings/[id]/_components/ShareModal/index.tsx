import Modal from '@/components/common/Modal';
import KakaoShare from '../KakaoShare';
import { handleCopyClipBoard } from '@/utils/handleCopyClipBoard';

interface IShareModalProps {
  modalOpen: boolean;
  onClose: () => void;
  pathname: string;
}

export default function ShareModal({
  modalOpen,
  onClose,
  pathname,
}: IShareModalProps) {
  return (
    <div>
      <Modal modalOpen={modalOpen} onClose={onClose} maxWidth={400}>
        <div>
          <KakaoShare path={pathname} likeCount={12} sharedCount={30} />
          <button type="button">카카오로 공유하기</button>
          <button
            type="button"
            onClick={() =>
              handleCopyClipBoard(
                `${process.env.NEXT_PUBLIC_DEPLOY_URL}${pathname}`
              )
            }>
            클립보드
            복사하기ㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇ
          </button>
        </div>
      </Modal>
    </div>
  );
}
