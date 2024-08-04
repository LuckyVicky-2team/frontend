'use client';
// import Modal from '@/components/common/Modal';
import { FormProvider, useForm } from 'react-hook-form';
import styles from './New.module.scss';
import DatePicker from '@/components/common/DatePicker';
import FileInput from '@/components/common/FileInput';
import TextEditor from '@/components/common/TextEditor';
import { useEffect, useState } from 'react';

// 나중에 Input 컴포넌트로 뺄 것들은 빼겠습니다.
// 생성일 추가? (상의)

interface NewGatheringFormValues {
  image: string;
  title: string;
  tags: string;
  content: string;
  contentWithoutHtml: string; //content 유효성 검사를 하기 위한 값
  location: string;
  gatheringDate: Date; //만나는 날짜 === 마감일
  participants: number;
  type: 'free' | 'accept';
}

export default function NewGatheringPage() {
  const methods = useForm<NewGatheringFormValues>({
    mode: 'all',
    defaultValues: {
      type: 'free',
    },
  });
  const {
    register,
    handleSubmit,
    control,
    setValue,
    formState: { errors, isValid },
  } = methods;

  const [editorVisible, setEditorVisible] = useState(false);
  const [freeButtonclick, setFreeButtonClick] = useState(true);

  const onSubmit = (gatheringInfo: NewGatheringFormValues) => {
    console.log({ gatheringInfo });
    const { contentWithoutHtml, ...info } = gatheringInfo;
    void contentWithoutHtml; //contentWithoutHtml 변수를 사용하지 않고 무시
    console.log(info); //최종적으로 제출할 객체
  };

  //화면에서 갑자기 textEditor 요소가 사라지는 현상 수정
  useEffect(() => {
    setEditorVisible(true);
  }, []);

  if (!editorVisible) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <h1 className={styles.header}>모임 개설</h1>
      <FormProvider {...methods}>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className={styles.inputArea}>
            <div className={styles.inputContainer}>
              <FileInput id="image" setValue={setValue} />
            </div>
            <div className={styles.inputContainer}>
              <label htmlFor="title">제목</label>
              {/* input 컴포넌트는 나중에 공통으로 빼겠습니다. */}
              <input
                id="title"
                {...register('title', { required: '제목을 입력해 주세요.' })}
                className={styles.commonInput}
              />
              {errors.title && errors.title.message}
            </div>
            <div className={styles.inputContainer}>
              <label htmlFor="tags">태그</label>
              <input
                id="tags"
                {...register('tags')}
                className={styles.commonInput}
              />
            </div>
            <div className={styles.inputContainer}>
              <label htmlFor="content">내용</label>
              {editorVisible && (
                <TextEditor
                  name="content"
                  id="content"
                  // onChangeWithReactHookForm={register('content').onChange}
                  register={register}
                />
              )}
              {errors.contentWithoutHtml && errors.contentWithoutHtml.message}
            </div>
            <div className={styles.inputContainer}>
              <label htmlFor="location">위치</label>
              <input
                id="location"
                {...register('location')}
                className={styles.commonInput}
              />
            </div>
            <div className={styles.inputContainer}>
              <label htmlFor="gatheringDate">날짜</label>
              <DatePicker
                control={control}
                name="gatheringDate"
                id="gatheringDate"
                placeholder="날짜를 선택해 주세요."
                className={styles.datePicker}
              />
              {errors.gatheringDate && errors.gatheringDate.message}
            </div>
            <div className={styles.inputContainer}>
              <label htmlFor="title">인원</label>
              <select
                id="title"
                {...register('participants')}
                // onChange={e => setValue('participants', Number(e.target.value))}
                style={{ width: 100 }}>
                {Array.from({ length: 30 }, (_, i) => i + 1).map(number => {
                  return (
                    <option key={number} value={number} style={{ height: 10 }}>
                      {number}
                    </option>
                  );
                })}
              </select>
            </div>
            <div className={styles.inputContainer}>
              <div>모임 유형 선택</div>
              <label
                htmlFor="free"
                className={
                  freeButtonclick
                    ? styles.buttonClicked
                    : styles.buttonNotClicked
                }
              />
              <p>자유</p>
              <input
                id="free"
                type="radio"
                value="free"
                defaultChecked
                {...register('type')}
                onClick={() => {
                  !freeButtonclick && setFreeButtonClick(true);
                }}
              />
              <label
                htmlFor="accept"
                className={
                  freeButtonclick
                    ? styles.buttonNotClicked
                    : styles.buttonClicked
                }
              />
              <p>수락</p>
              <input
                id="accept"
                type="radio"
                value="accept"
                {...register('type')}
                onClick={() => {
                  freeButtonclick && setFreeButtonClick(false);
                }}
              />
            </div>
          </div>
          <button type="submit" disabled={!isValid}>
            생성하기
          </button>
        </form>
      </FormProvider>
    </>
  );
}
