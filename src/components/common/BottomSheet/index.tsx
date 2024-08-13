import React, { ReactNode } from 'react';
import { motion } from 'framer-motion';
import styles from './BottomSheet.module.scss';

interface BottomSheetProps {
  isOpen: boolean;
  onClose: () => void;
  children: ReactNode;
}

const BottomSheet: React.FC<BottomSheetProps> = ({
  isOpen,
  onClose,
  children,
}) => {
  return (
    <div
      className={isOpen ? styles.backgroundOn : styles.backgroundOff}
      onClick={onClose}>
      <motion.div
        className={styles.bottomSheet}
        initial={{ y: '130%' }} // 초기 위치: 화면 아래
        animate={{ y: isOpen ? '0%' : '130%' }} // 열릴 때와 닫힐 때의 위치
        transition={{ type: 'spring', stiffness: 300, damping: 30 }} // 애니메이션 설정
        drag="y" // 수직 드래그 가능
        dragConstraints={{ top: 0, bottom: 0 }} // 드래그 범위 설정
        onDragEnd={(event, info) => {
          if (info.offset.y > 100) {
            // 드래그가 100px 이상 내려가면 닫기
            onClose();
          }
          void event;
        }}>
        <div>{children}</div>
        <div style={{ height: '600px' }} />
      </motion.div>
    </div>
  );
};

export default BottomSheet;
