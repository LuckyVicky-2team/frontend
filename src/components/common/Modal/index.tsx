import { ReactNode } from 'react';
import styles from './Modal.module.scss';
import Image from 'next/image';

// 사용 예시
// useModal을 사용하여 생성한 modalOpen과 handleModalClose를 Modal 컴포넌트의 Props로 내려줍니다.
// 화면을 꽉 채우는 모달의 경우 full을 props로 내려줍니다. (full과 xButton은 같이 사용 X)
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
//       <Modal modalOpen={modalOpen} onClose={handleModalClose} maxWidth={300}>모달 내용</Modal>
//     </div>
//   );
// }

interface IModalProps {
  modalOpen: boolean;
  onClose: () => void;
  maxWidth?: number;
  full?: boolean;
  xButton?: boolean;
  children: ReactNode | undefined;
}

export default function Modal({
  modalOpen,
  onClose,
  maxWidth = 300,
  full = false,
  xButton = false,
  children,
}: IModalProps) {
  return (
    <>
      <div
        onMouseDown={onClose}
        className={full ? '' : modalOpen ? styles.modalBackground : ''}>
        <div
          onMouseDown={e => {
            e.stopPropagation();
          }}
          onClick={e => {
            e.stopPropagation();
          }}
          className={
            full
              ? `${styles.fullModal} ${modalOpen ? styles.slideUp : styles.slideDown}`
              : `${styles.modalWithXButton}`
          }
          style={{
            width: full ? 'min(100%, 600px)' : `min(${maxWidth}px, 80%)`,
          }}>
          <div
            className={`${full ? '' : modalOpen ? styles.modal : styles.none}`}
            style={{
              width: '100%',
            }}>
            {full && (
              <button
                onClick={onClose}
                type="button"
                className={styles.fullXButton}>
                <Image
                  src={'/assets/icons/x-button-blue.svg'}
                  alt="닫기 버튼"
                  width={46}
                  height={46}
                />
              </button>
            )}
            {children}
          </div>
          {xButton && modalOpen && (
            <button type="button" onClick={onClose} className={styles.xButton}>
              <Image
                src={'/assets/icons/x-button.svg'}
                alt={'닫기 버튼'}
                width={38}
                height={38}
              />
            </button>
          )}
        </div>
      </div>
    </>
  );
}
