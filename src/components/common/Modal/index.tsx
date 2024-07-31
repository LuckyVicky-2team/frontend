import { ReactNode } from 'react';
import styles from './Modal.module.scss';

// 사용 예시
// useModal을 사용하여 생성한 modalOpen과 handleModalClose를 Modal 컴포넌트의 Props로 내려줍니다.
// function Page() {
//   const { modalOpen, handleModalOpen, handleModalClose } = useModal();
//   return (
//     <div
//       style={{
//         backgroundColor: 'white',
//         height: '100vh',
//         zIndex: '1',
//       }}>
//       <button type="button" onClick={handleModalOpen}>
//         모달 클릭
//       </button>
//       <Modal modalOpen={modalOpen} onClose={handleModalClose}>모달 내용</Modal>
//     </div>
//   );
// }

interface IModalProps {
  modalOpen: boolean;
  onClose: () => void;
  children: ReactNode | undefined;
}

function Modal({ modalOpen, onClose, children }: IModalProps) {
  return (
    <>
      {modalOpen && (
        <div onClick={onClose} className={styles.modalBackground}>
          <div
            onClick={e => {
              e.stopPropagation();
            }}
            className={styles.modal}>
            <button type="button" onClick={onClose}>
              x
            </button>
            {children}
          </div>
        </div>
      )}
    </>
  );
}
export default Modal;