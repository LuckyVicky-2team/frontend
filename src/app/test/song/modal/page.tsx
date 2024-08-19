'use client';
import Modal from '@/components/common/Modal';
import useModal from '@/hooks/useModal';

export default function ModalPage() {
  const { modalOpen, handleModalOpen, handleModalClose } = useModal();
  return (
    <div
      style={{
        backgroundColor: 'white',
        height: '100vh',
        zIndex: '1',
      }}>
      <button type="button" onClick={handleModalOpen}>
        모달 클릭
      </button>
      <Modal
        modalOpen={modalOpen}
        onClose={handleModalClose}
        maxWidth={300}
        xButton>
        <div>안녕</div>
        <div>안녕</div>
        <div>안녕</div>
        <div>안녕</div>
        <div>안녕</div>
        <div>안녕</div>
        <div>안녕</div>
        <div>안녕</div>
        <div>안녕</div>
        <div>안녕</div>
        <div>안녕</div>
        <div>안녕</div>
        <div>안녕</div>
        <div>안녕</div>
        <div>안녕</div>
        <div>안녕</div>
        <div>안녕</div>
        <div>안녕</div>
        <div>안녕</div>
        <div>안녕</div>
        <div>안녕</div>
        <div>안녕</div>
        <div>안녕</div>
        <div>안녕</div>
        <div>안녕</div>
        <div>안녕</div>
        <div>안녕</div>
        <div>안녕</div>
        <div>안녕</div>
        <div>안녕</div>
        <div>안녕</div>
        <div>안녕</div>
        <div>안녕</div>
        <div>안녕</div>
        <div>안녕</div>
        <div>안녕</div>
      </Modal>
    </div>
  );
}
