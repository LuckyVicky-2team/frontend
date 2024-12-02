import React, {
  Dispatch,
  ReactNode,
  SetStateAction,
  useEffect,
  useRef,
  useState,
} from 'react';
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
  onOpen?: () => void;
  children: ReactNode;
  full?: boolean;
  setIsFull?: Dispatch<SetStateAction<boolean>>;
  initialBottomSheetOpen?: string;
  minHeight?: string;
}

const BottomSheet: React.FC<BottomSheetProps> = ({
  isOpen,
  onClose,
  onOpen,
  children,
  full = false,
  setIsFull,
  initialBottomSheetOpen,
  minHeight = '60vh',
}) => {
  const [isFullScreen, setIsFullScreen] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const backgroundRef = useRef(null);
  const [contentHeight, setContentHeight] = useState(60);
  const [offsetY, setOffsetY] = useState(0);
  const [prevOffsetY, setPrevOffsetY] = useState(0);

  const handleBackgroundClick = (e: React.MouseEvent) => {
    if (backgroundRef.current === e.target && !isDragging) {
      onClose();
    }
  };

  useEffect(() => {
    if (!isOpen) {
      setIsFullScreen(false);
    }
  }, [isOpen]);

  useEffect(() => {
    if (initialBottomSheetOpen === 'full' && onOpen) {
      onOpen();
      setIsFullScreen(true);
    }
    if (initialBottomSheetOpen === 'half' && onOpen) {
      onOpen();
      setIsFullScreen(false);
    }
  }, []);

  useEffect(() => {
    if (setIsFull) {
      setIsFull(isFullScreen);
    }
  }, [isFullScreen]);

  // dragElastic을 0으로 설정하지 않고, spring options로 컨트롤
  //

  return (
    <div
      className={isOpen ? styles.backgroundOn : styles.backgroundOff}
      onClick={handleBackgroundClick}
      ref={backgroundRef}>
      <motion.div
        className={`${styles.bottomSheet} ${isFullScreen ? styles.fullScreen : ''}`}
        initial={{ y: '100%' }} // 초기 위치: 화면 아래
        animate={{
          y: isOpen ? '0%' : '100%',
        }} // 열릴 때와 닫힐 때의 위치
        transition={{
          type: 'spring',
          damping: 30,
          stiffness: 300,
        }} // 애니메이션 설정
        drag="y" // 수직 드래그 가능
        dragConstraints={{ top: 0, bottom: 0 }} // 드래그 범위 설정
        //위로 올리는 도중에 content 사이즈도 커지게 설정
        onDrag={(event, info) => {
          setOffsetY(info.offset.y);
          if (offsetY !== prevOffsetY) {
            setContentHeight(
              prev =>
                prev - ((offsetY - prevOffsetY) / window.innerHeight) * 100
            );
            setPrevOffsetY(offsetY);
          }
          void event;
        }}
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
            setPrevOffsetY(0);
            setIsDragging(false);
          }
          //올리기
          if (full && !isFullScreen && info.offset.y < -10) {
            setIsDragging(false);
            setIsFullScreen(true);
          }
          if (!full) {
            setIsDragging(false);
          }
          void event;
        }}>
        {/* 헤더 부분- 필요시 추가하기 */}
        {/* <div
          style={{
            height: '40px',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <div
            style={{ width: '70px', height: '2px', backgroundColor: '#000000' }}
          />
        </div> */}
        <div
          style={{
            height: isFullScreen
              ? '100vh'
              : isDragging
                ? full
                  ? `${contentHeight}vh`
                  : minHeight
                : minHeight,
            minHeight: minHeight,
          }}>
          {children}
        </div>
        <div style={{ height: '600px' }} />
      </motion.div>
    </div>
  );
};

export default BottomSheet;
