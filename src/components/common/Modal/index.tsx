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
//       <Modal modalOpen={modalOpen} onClose={handleModalClose} />
//     </div>
//   );
// }

interface IModalProps {
  modalOpen: boolean;
  onClose: () => void;
}

function Modal({ modalOpen, onClose }: IModalProps) {
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
            Modal Content
          </div>
        </div>
      )}
    </>
  );
}
export default Modal;
