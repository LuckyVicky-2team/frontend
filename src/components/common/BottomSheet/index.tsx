import React, { ReactNode, useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import styles from './BottomSheet.module.scss';

// 사용 예시
// full은 화면을 꽉 채우는 바텀시트
// 'use client';
// import BottomSheet from '@/components/common/BottomSheet';
// import useModal from '@/hooks/useModal';

// export default function ExamplePage() {
//   const { modalOpen, handleModalOpen, handleModalClose } = useModal();

//   return (
//     <div
//       style={{
//         backgroundColor: 'white',
//         height: '100vh',
//         zIndex: '1',
//       }}>
//       <button onClick={handleModalOpen}>바텀시트 열기</button>
//       <BottomSheet isOpen={modalOpen} onClose={handleModalClose} full>
//         <p>안녕!</p>
//         <p>안녕!</p>
//         <p>안녕!</p>
//         <p>안녕!</p>
//       </BottomSheet>
//     </div>
//   );
// }

interface BottomSheetProps {
  isOpen: boolean;
  onClose: () => void;
  children: ReactNode;
  full?: boolean;
}

const BottomSheet: React.FC<BottomSheetProps> = ({
  isOpen,
  onClose,
  children,
  full = false,
}) => {
  const [isFullScreen, setIsFullScreen] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const backgroundRef = useRef(null);

  const handleBackgroundClick = (e: React.MouseEvent) => {
    console.log(backgroundRef.current);
    console.log(e.target);
    if (backgroundRef.current === e.target && !isDragging) {
      onClose();
    }
  };

  useEffect(() => {
    if (!isOpen) {
      setIsFullScreen(false);
    }
  }, [isOpen]);

  // dragElastic을 0으로 설정하지 않고, spring options로 컨트롤
  //

  return (
    <div
      className={isOpen ? styles.backgroundOn : styles.backgroundOff}
      onClick={handleBackgroundClick}
      ref={backgroundRef}>
      <motion.div
        className={`${styles.bottomSheet} ${isFullScreen ? styles.fullScreen : ''}`}
        initial={{ y: '130%' }} // 초기 위치: 화면 아래
        animate={{
          y: isOpen ? '0%' : '130%',
        }} // 열릴 때와 닫힐 때의 위치
        transition={{
          type: 'spring',
          damping: 30,
          stiffness: 300,
        }} // 애니메이션 설정
        drag="y" // 수직 드래그 가능
        dragConstraints={{ top: 0, bottom: 0 }} // 드래그 범위 설정
        onDragStart={() => {
          setIsDragging(true);
        }}
        onDragEnd={(event, info) => {
          if (info.velocity.y > 100 || info.offset.y > 100) {
            // 드래그가 100px 이상 내려가면 닫기
            //fullScreen일 때는 다시 중간단계로 돌아가기
            if (isFullScreen) {
              setIsFullScreen(false);
              setIsDragging(false);
              return;
            }
            onClose();
            setIsFullScreen(false);
          }
          if (full && !isFullScreen && info.offset.y < -10) {
            setIsFullScreen(true);
          }
          setIsDragging(false);
          void event;
        }}>
        <div
          style={{
            height: '40px',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <div
            style={{ width: '70px', height: '2px', backgroundColor: '#000000' }}
          />
        </div>
        <div style={{ height: isFullScreen ? '100vh' : '' }}>{children}</div>
        <div style={{ height: '600px' }} />
      </motion.div>
    </div>
  );
};

export default BottomSheet;
