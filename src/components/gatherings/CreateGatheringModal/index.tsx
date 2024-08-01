import Modal from '@/components/common/Modal';
import { FormProvider, useForm } from 'react-hook-form';
import styles from './CreateGatheringModal.module.scss';
import DatePicker from '@/components/common/DatePicker';

// 나중에 Input 컴포넌트로 뺄 것들은 빼겠습니다.
// 생성일 추가? (상의)

interface CreateGatheringFormValues {
  image: string;
  title: string;
  tags: string;
  content: string;
  location: string;
  gatheringDate: Date; //만나는 날짜 === 마감일
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
  const {
    register,
    handleSubmit,
    control,
    formState: { errors, isValid },
  } = methods;

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
              <input id="image" {...register('image')} />
            </div>
            <div className={styles.inputContainer}>
              <label htmlFor="title">제목</label>
              <input
                id="title"
                {...register('title', { required: '제목을 입력해 주세요.' })}
              />
              {errors.title && errors.title.message}
            </div>
            <div className={styles.inputContainer}>
              <label htmlFor="tags">태그</label>
              <input id="tags" {...register('tags')} />
            </div>
            <div className={styles.inputContainer}>
              <label htmlFor="content">내용</label>
              <textarea id="content" {...register('content')} />
              {errors.content && errors.content.message}
            </div>
            <div className={styles.inputContainer}>
              <label htmlFor="location">위치</label>
              <input id="location" {...register('location')} />
            </div>
            <div className={styles.inputContainer}>
              <label htmlFor="gatheringDate">날짜</label>
              <DatePicker
                control={control}
                name="gatheringDate"
                id="gatheringDate"
                label="날짜"
                hasLabel
                placeholder="날짜를 선택해 주세요."
                className={styles.datePicker}
              />
            </div>
            <div className={styles.inputContainer}>
              <label htmlFor="title">인원</label>
              <input id="title" {...register('participants')} />
            </div>
            <div className={styles.inputContainer}>
              {/* <div>모임 유형 선택</div>
              <label htmlFor="free">자유</label>
              <input
                id="free"
                type="radio"
                value="free"
                {...register('type')}
              />
              <label htmlFor="accept">수락</label>
              <input
                id="accept"
                type="radio"
                value="accept"
                {...register('type')}
              /> */}
              <label htmlFor="type">모임 유형</label>
              <select id="type" {...register('type')}>
                <option value="free">자유</option>
                <option value="accept">수락</option>
              </select>
            </div>
          </div>
          <button type="submit" disabled={!isValid}>
            생성하기
          </button>
        </form>
      </FormProvider>
    </Modal>
  );
}
export default CreateGatheringModal;
