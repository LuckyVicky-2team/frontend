'use client';
import BottomSheet from '@/components/common/BottomSheet';
import useModal from '@/hooks/useModal';

export default function BottomSheetPage() {
  const { modalOpen, handleModalOpen, handleModalClose } = useModal();

  return (
    <div
      style={{
        backgroundColor: 'white',
        height: '100vh',
        zIndex: '1',
      }}>
      <button onClick={handleModalOpen}>바텀시트 열기</button>
      <BottomSheet isOpen={modalOpen} onClose={handleModalClose} full>
        <p>안녕!</p>
        <p>안녕!</p>
        <p>안녕!</p>
        <p>안녕!</p>
        <p>안녕!</p>
        <p>안녕!</p>
        <p>안녕!</p>
        <p>안녕!</p>
        <p>안녕!</p>
        <p>안녕!</p>
        <p>안녕!</p>
        <p>안녕!</p>
        <p>안녕!</p>
        <p>안녕!</p>
        <p>안녕!</p>
        <p>안녕!</p>
        <p>안녕!</p>
        <p>안녕!</p>
      </BottomSheet>
    </div>
  );
}
