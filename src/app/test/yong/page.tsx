'use client';

import FindPlaceModal from '@/components/common/FindPlaceModal';
import useModal from '@/hooks/useModal';

export default function YongTest() {
  const { modalOpen, handleModalOpen, handleModalClose } = useModal();

  return (
    <>
      <button onClick={() => handleModalOpen()}>모달 열기</button>
      <FindPlaceModal modalOpen={modalOpen} onClose={handleModalClose} />
    </>
  );
}
