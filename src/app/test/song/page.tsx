'use client';
import Modal from '@/components/common/Modal';
import Spinner from '@/components/common/Spinner';
import useModal from '@/hooks/useModal';

export default function SongeunPage() {
  const { modalOpen, handleModalOpen, handleModalClose } = useModal();
  return (
    <div
      style={{
        backgroundColor: 'white',
        height: '100vh',
        zIndex: '100',
      }}>
      <div
        style={{
          backgroundColor: 'yellow',
          height: '100px',
          width: '300px',
          zIndex: '50',
        }}>
        <button type="button" onClick={handleModalOpen}>
          모달 클릭
        </button>
        <Modal modalOpen={modalOpen} onClose={handleModalClose}>
          Modal Content
        </Modal>
      </div>
      <div
        style={{
          height: '100px',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <Spinner />
      </div>
    </div>
  );
}
