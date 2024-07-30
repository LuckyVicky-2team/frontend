import { useState } from 'react';

function SongeunPage() {
  const [modalOpen, setModalOpen] = useState(false);

  const handleModalClose = () => {
    setModalOpen(false);
  };

  const handleModalOpen = () => {
    setModalOpen(true);
  };

  return (
    <div>
      <button type="button" onClick={handleModalOpen}>
        모달 클릭
      </button>
      {modalOpen && (
        <div
          style={{ backgroundColor: 'rgba(0,0,0,0.3)' }}
          onClick={handleModalClose}>
          <div
            style={{
              backgroundColor: 'white',
              width: '100px',
              height: '100px',
            }}>
            Modal
          </div>
        </div>
      )}
    </div>
  );
}
export default SongeunPage;
