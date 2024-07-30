import { useState } from 'react';

function SongeunPage() {
  const [modalOpen, setModalOpen] = useState(false);

  const handleModalOutsideClick = () => {
    setModalOpen(false);
  };

  return (
    <div>
      {modalOpen && (
        <div
          style={{ backgroundColor: 'rgba(0,0,0,0.3)' }}
          onClick={handleModalOutsideClick}>
          <div style={{ backgroundColor: 'white' }}>Modal</div>
        </div>
      )}
    </div>
  );
}
export default SongeunPage;
