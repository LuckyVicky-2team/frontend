'use client';
import useModal from '@/hooks/useModal';

function SongeunPage() {
  const { modalOpen, handleModalOpen, handleModalClose } = useModal();
  return (
    <div
      style={{
        backgroundColor: 'white',
        height: '100vh',
      }}>
      <button type="button" onClick={handleModalOpen}>
        모달 클릭
      </button>
      {modalOpen && (
        <div
          style={{
            backgroundColor: 'rgba(0,0,0,0.3)',
            position: 'fixed',
            top: '0',
            bottom: '0',
            left: '0',
            right: '0',
          }}
          onClick={handleModalClose}>
          <div
            onClick={e => {
              e.stopPropagation();
            }}
            style={{
              backgroundColor: 'white',
              width: '100px',
              height: '100px',
            }}>
            <button type="button" onClick={handleModalClose}>
              x
            </button>
            Modal Content
          </div>
        </div>
      )}
    </div>
  );
}
export default SongeunPage;
