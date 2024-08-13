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
      <button type="button" onClick={handleModalOpen}>
        바텀시트 클릭
      </button>
      <BottomSheet modalOpen={modalOpen} onClose={handleModalClose}>
        바텀시트 내용
      </BottomSheet>
    </div>
  );
}
