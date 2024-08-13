import { ReactNode, TouchEvent, useRef, useState } from 'react';
import styles from './BottomSheet.module.scss';

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
  full?: boolean;
  children: ReactNode | undefined;
}

export default function BottomSheet({
  modalOpen,
  onClose,
  full = false,
  children,
}: IModalProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [startY, setStartY] = useState(0);
  const [currentY, setCurrentY] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const modalRef = useRef<HTMLDivElement | null>(null);

  const handleTouchStart = (e: TouchEvent<HTMLDivElement>) => {
    setStartY(e.touches[0].clientY);
    setIsDragging(true);
  };

  const handleTouchMove = (e: TouchEvent<HTMLDivElement>) => {
    if (!isDragging) return;
    setCurrentY(e.touches[0].clientY);
    const deltaY = currentY - startY;
    if (deltaY > 0 && modalRef.current) {
      modalRef.current.style.transform = `translateY(${deltaY}px)`;
    }
  };

  const handleTouchEnd = () => {
    setIsDragging(false);
    const deltaY = currentY - startY;
    if (deltaY > 100) {
      setIsOpen(false);
    } else {
      if (modalRef.current) {
        modalRef.current.style.transform = 'translateY(0)';
      }
    }
  };
  return (
    <>
      <div
        onClick={onClose}
        className={modalOpen ? styles.modalBackground : ''}>
        <div
          onClick={e => {
            e.stopPropagation();
          }}
          className={`${full ? styles.fullModal : styles.modal} ${modalOpen ? styles.slideUp : styles.slideDown} ${isOpen ? styles.open : ''}`}
          style={{
            height: '100vh',
            width: full ? '' : `100%`,
          }}
          ref={modalRef}
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}>
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
