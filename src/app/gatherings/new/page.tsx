'use client';
// import Modal from '@/components/common/Modal';
import { FormProvider, useForm } from 'react-hook-form';
import styles from './New.module.scss';
import DatePicker from '@/components/common/DatePicker';
import FileInput from '@/components/common/FileInput';
import TextEditor from '@/components/common/TextEditor';
import { useEffect, useState } from 'react';
import SelectBox from '@/components/common/SelectBox';
import Image from 'next/image';

// 나중에 Input 컴포넌트로 뺄 것들은 빼겠습니다.
// 생성일 추가? (상의)

interface INewGatheringFormValuesRequest {
  image: string;
  title: string;
  tags: string;
  content: string;
  contentWithoutHtml: string; //content 유효성 검사를 하기 위한 값
  city: string; //시
  country: string; //구
  location: { lat: number; lon: number }; //위도 경도
  gatheringDate: Date; //만나는 날짜 === 마감일
  boardGameIdList: number[];
  participants: number;
  type: 'free' | 'accept';
}

export default function NewGatheringPage() {
  const methods = useForm<INewGatheringFormValuesRequest>({
    mode: 'all',
    defaultValues: {
      type: 'free',
      boardGameIdList: [],
    },
  });
  const {
    register,
    handleSubmit,
    control,
    setValue,
    formState: { errors, isValid },
  } = methods;
  const [freeButtonClick, setFreeButtonClick] = useState(true);
  const [showGameData, setShowGameData] = useState(false);
  const [boardGameIdList, setBoardGameIdList] = useState<number[]>([]);

  const gameData = [
    { id: 1, title: '체스', image: '/assets/images/rectangle.png' },
    { id: 2, title: '장기', image: '/assets/images/rectangle.png' },
    { id: 3, title: '바둑', image: '/assets/images/rectangle.png' },
    { id: 4, title: '오목', image: '/assets/images/rectangle.png' },
  ];

  const onSubmit = (gatheringInfo: INewGatheringFormValuesRequest) => {
    console.log({ gatheringInfo });
    const { contentWithoutHtml, ...info } = gatheringInfo;
    void contentWithoutHtml; //contentWithoutHtml 변수를 사용하지 않고 무시
    console.log(info); //최종적으로 제출할 객체
  };

  useEffect(() => {
    console.log(boardGameIdList);
    const array = [...new Set(boardGameIdList)];
    setValue('boardGameIdList', array);
  }, [boardGameIdList]);

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
              <label htmlFor="boardGameIdList">게임 종류</label>
              <input
                id="boardGameIdList"
                // {...register('boardGameIdList', {
                //   required: '게임 종류를 선택해 주세요.',
                // })}
                className={styles.commonInput}
                onChange={e => {
                  if (e.target.value === '') {
                    setShowGameData(false);
                    return;
                  }
                  setShowGameData(true);
                }}
              />
              {showGameData && (
                <div>
                  {gameData.map(data => {
                    return (
                      <div key={data.id}>
                        <label htmlFor={`${data.title}`}>
                          <Image
                            src={data.image}
                            alt={data.title}
                            width={30}
                            height={30}
                          />
                          <p>{data.title}</p>
                        </label>
                        <input
                          id={`${data.title}`}
                          type="radio"
                          value={data.id}
                          defaultChecked
                          {...register('type')}
                          onClick={() => {
                            console.log(data.id);
                            setBoardGameIdList(prev => {
                              return [...prev, data.id];
                            });

                            setShowGameData(false);
                          }}
                        />
                      </div>
                    );
                  })}
                </div>
              )}
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
              <TextEditor
                name="content"
                id="content"
                // onChangeWithReactHookForm={register('content').onChange}
                register={register}
              />
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
              <SelectBox
                className={styles.selectBox}
                id="title"
                clickOptionHandler={e =>
                  setValue('participants', Number(e.target.value))
                }
                optionSet={Array.from({ length: 30 }, (_, i) => i + 1)}
              />
            </div>
            <div className={styles.inputContainer}>
              <div>모임 유형 선택</div>
              <label
                htmlFor="free"
                className={
                  freeButtonClick
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
                  !freeButtonClick && setFreeButtonClick(true);
                }}
              />
              <label
                htmlFor="accept"
                className={
                  freeButtonClick
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
                  freeButtonClick && setFreeButtonClick(false);
                }}
              />
            </div>
          </div>
          <button
            type="submit"
            disabled={!isValid}
            className={styles.submitButton}>
            생성하기
          </button>
        </form>
      </FormProvider>
    </>
  );
}
