import Modal from '@/components/common/Modal';
import { FormProvider, useForm } from 'react-hook-form';
import styles from './CreateGatheringModal.module.scss';
import DatePicker from '@/components/common/DatePicker';

interface CreateGatheringFormValues {
  image: string;
  title: string;
  tags: string;
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
  const { register, handleSubmit, control } = methods;

  const onSubmit = (gatheringInfo: CreateGatheringFormValues) => {
    console.log({ gatheringInfo });
  };

  return (
    <Modal modalOpen={modalOpen} onClose={onClose}>
      <FormProvider {...methods}>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className={styles.inputArea}>
            <div className={styles.inputContainer}>
              <label htmlFor="image">이미지</label>
              <input id="image" {...register} />
            </div>
            <div className={styles.inputContainer}>
              <label htmlFor="title">제목</label>
              <input id="title" {...register} />
            </div>
            <div className={styles.inputContainer}>
              <label htmlFor="tags">태그</label>
              <input id="tags" {...register} />
            </div>
            <div className={styles.inputContainer}>
              <label htmlFor="content">내용</label>
              <textarea id="content" {...register('content')} />
            </div>
            <div className={styles.inputContainer}>
              <label htmlFor="location">위치</label>
              <input id="location" {...register} />
            </div>
            <div className={styles.inputContainer}>
              <label htmlFor="date">날짜</label>
              <input id="date" {...register} />
              <DatePicker
                control={control}
                name="date"
                id="date"
                label="날짜"
                hasLabel
                placeholder="날짜를 선택해 주세요."
                className={styles.datePicker}
              />
            </div>
            <div className={styles.inputContainer}>
              <label htmlFor="title">인원</label>
              <input id="title" {...register} />
            </div>
            <div className={styles.inputContainer}>
              <label htmlFor="type">모임 유형</label>
              <input id="type" {...register} />
            </div>
          </div>
        </form>
      </FormProvider>
    </Modal>
  );
}
export default CreateGatheringModal;
