import styles from './Modal.module.scss';

interface IModalProps {
  modalOpen: boolean;
  onClose: () => void;
}

function Modal({ modalOpen, onClose }: IModalProps) {
  return (
    <>
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
          onClick={onClose}
          className={styles.modalBackground}>
          <div
            onClick={e => {
              e.stopPropagation();
            }}
            style={{
              backgroundColor: 'white',
              width: '100px',
              height: '100px',
            }}>
            <button type="button" onClick={onClose}>
              x
            </button>
            Modal Content
          </div>
        </div>
      )}
    </>
  );
}
export default Modal;
