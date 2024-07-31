import Modal from '@/components/common/Modal';

interface ICreateGatheringModalProps {
  modalOpen: boolean;
  onClose: () => void;
}

function CreateGatheringModal({
  modalOpen,
  onClose,
}: ICreateGatheringModalProps) {
  return (
    <Modal modalOpen={modalOpen} onClose={onClose}>
      ss
    </Modal>
  );
}
export default CreateGatheringModal;
