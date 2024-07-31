'use client';

import CreateGatheringModal from '@/components/gatherings/CreateGatheringModal';
import useModal from '@/hooks/useModal';

function GatheringsPage() {
  const { modalOpen, handleModalOpen, handleModalClose } = useModal();
  return (
    <div>
      <button type="button" onClick={handleModalOpen}>
        CreateGatheringModal
      </button>
      <CreateGatheringModal modalOpen={modalOpen} onClose={handleModalClose} />
    </div>
  );
}
export default GatheringsPage;
