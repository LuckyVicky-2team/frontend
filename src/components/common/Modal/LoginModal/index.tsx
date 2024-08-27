import { usePathname, useRouter } from 'next/navigation';
import Modal from '..';
import styles from './LoginModal.module.scss';

interface ILoginModal {
  modalOpen: boolean;
  onClose: () => void;
}

export default function LoginModal({ modalOpen, onClose }: ILoginModal) {
  const router = useRouter();
  const pathname = usePathname();
  const currentURL = `${window.location.origin}${pathname}`;

  const handleGoToLoginPage = () => {
    document.cookie = `referer=${currentURL}; path=/`;
    router.push('/signin');
  };

  return (
    <Modal modalOpen={modalOpen} onClose={onClose} maxWidth={552}>
      <div className={styles.modalBackground}>
        <p className={styles.title}>로그인이 필요합니다.</p>
        로그인 하시겠습니까?
      </div>
      <button
        type="button"
        onClick={handleGoToLoginPage}
        className={styles.modalFullButton}>
        로그인하러 가기
      </button>
    </Modal>
  );
}
