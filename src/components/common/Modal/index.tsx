import { ReactNode } from 'react';
import styles from './Modal.module.scss';

// 사용 예시
// useModal을 사용하여 생성한 modalOpen과 handleModalClose를 Modal 컴포넌트의 Props로 내려줍니다.
// 화면을 꽉 채우는 모달의 경우 full을 props로 내려줍니다.
// function Page() {
//   const { modalOpen, handleModalOpen, handleModalClose } = useModal();
//   return (
//     <div
//       style={{
//         backgroundColor: 'white',
//         height: '100vh',
//         zIndex: '1',
//       }}>
//       <button type="button" onClick={handleModalOpen} maxWidth={300}>
//         모달 클릭
//       </button>
//       <Modal modalOpen={modalOpen} onClose={handleModalClose}>모달 내용</Modal>
//     </div>
//   );
// }

interface IModalProps {
  modalOpen: boolean;
  onClose: () => void;
  maxWidth?: number;
  full?: boolean;
  children: ReactNode | undefined;
}

function Modal({
  modalOpen,
  onClose,
  maxWidth = 300,
  full = false,
  children,
}: IModalProps) {
  return (
    <>
      <div
        onClick={onClose}
        className={modalOpen ? styles.modalBackground : ''}>
        <div
          onClick={e => {
            e.stopPropagation();
          }}
          className={`${full ? styles.fullModal : styles.modal} ${modalOpen ? styles.slideUp : styles.slideDown}`}
          style={{
            width: full ? '' : `min(${maxWidth}px, 80%)`,
            height: '100vh',
          }}>
          {full && (
            <button type="button" onClick={onClose}>
              x
            </button>
          )}
          {children}
        </div>
      </div>
    </>
  );
}
export default Modal;
