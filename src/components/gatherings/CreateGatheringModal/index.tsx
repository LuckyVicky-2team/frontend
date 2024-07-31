import Modal from '@/components/common/Modal';
import { FormProvider, useForm } from 'react-hook-form';
import styles from './CreateGatheringModal.module.scss';

interface CreateGatheringFormValues {
  image: string;
  tags: string;
  title: string;
  content: string;
  location: string;
  date: Date;
  participants: number;
  type: 'free' | 'accept';
}

interface ICreateGatheringModalProps {
  modalOpen: boolean;
  onClose: () => void;
}

function CreateGatheringModal({
  modalOpen,
  onClose,
}: ICreateGatheringModalProps) {
  const methods = useForm<CreateGatheringFormValues>({
    mode: 'all',
  });
  const { register, handleSubmit } = methods;

  const onSubmit = (gatheringInfo: CreateGatheringFormValues) => {
    console.log({ gatheringInfo });
  };

  return (
    <Modal modalOpen={modalOpen} onClose={onClose}>
      <FormProvider {...methods}>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className={styles.inputArea}>
            <div className={styles.inputContainer}>
              <textarea id="content" {...register('content')} />
            </div>
          </div>
        </form>
      </FormProvider>
    </Modal>
  );
}
export default CreateGatheringModal;
