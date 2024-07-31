'use client';
import Modal from '@/components/common/Modal';
import useModal from '@/hooks/useModal';

function SongeunPage() {
  const { modalOpen, handleModalOpen, handleModalClose } = useModal();
  return (
    <div
      style={{
        backgroundColor: 'white',
        height: '100vh',
        zIndex: '1',
      }}>
      <div style={{ zIndex: '10', backgroundColor: 'yellow' }}>zindex: 10</div>
      <button type="button" onClick={handleModalOpen} style={{ zIndex: '2' }}>
        모달 클릭
      </button>
      <Modal modalOpen={modalOpen} onClose={handleModalClose} />
    </div>
  );
}
export default SongeunPage;
