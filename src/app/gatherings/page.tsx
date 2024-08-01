'use client';
// import useModal from '@/hooks/useModal';
import Link from 'next/link';

function GatheringsPage() {
  // const { modalOpen, handleModalOpen, handleModalClose } = useModal();
  return (
    <div>
      {/* <button type="button" onClick={handleModalOpen}>
        CreateGatheringModal
      </button>
      <CreateGatheringModal modalOpen={modalOpen} onClose={handleModalClose} /> */}
      <Link href={'/gatherings/new'}>모임 생성하기</Link>
    </div>
  );
}
export default GatheringsPage;
