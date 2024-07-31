import styles from './Modal.module.scss';

interface IModalProps {
  modalOpen: boolean;
  onClose: () => void;
}

function Modal({ modalOpen, onClose }: IModalProps) {
  return (
    <>
      {modalOpen && (
        <div onClick={onClose} className={styles.modalBackground}>
          <div
            onClick={e => {
              e.stopPropagation();
            }}
            className={styles.modal}>
            <button type="button" onClick={onClose}>
              x
            </button>
            Modal Content
            <div style={{ width: '300px' }}></div>
          </div>
        </div>
      )}
    </>
  );
}
export default Modal;
