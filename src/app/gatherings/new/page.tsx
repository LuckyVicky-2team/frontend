'use client';
// import Modal from '@/components/common/Modal';
import { FormProvider, useForm } from 'react-hook-form';
import styles from './New.module.scss';
import DatePicker from '@/components/common/DatePicker';
import FileInput from '@/components/common/FileInput';
import TextEditor from '@/components/common/TextEditor';
import { useEffect, useState } from 'react';
import GameDataList from './_components/GameDataList';
import { INewGatheringFormValuesRequest } from '@/types/request/Gatherings';
import NumberInput from './_components/NumberInput';

// 나중에 Input 컴포넌트로 뺄 것들은 빼겠습니다.
// 생성일 추가? (상의)

export default function NewGatheringPage() {
  const methods = useForm<INewGatheringFormValuesRequest>({
    mode: 'all',
    defaultValues: {
      type: 'FREE',
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
  const [gameTitle, setGameTitle] = useState('');

  const gameData = [
    { id: 1, title: '체스', image: '/assets/images/rectangle.png' },
    { id: 2, title: '장기', image: '/assets/images/rectangle.png' },
    { id: 3, title: '바둑', image: '/assets/images/rectangle.png' },
    { id: 4, title: '오목', image: '/assets/images/rectangle.png' },
  ];

  const onSubmit = async (gatheringInfo: INewGatheringFormValuesRequest) => {
    const { contentWithoutHtml, image, ...info } = gatheringInfo;
    void contentWithoutHtml; //contentWithoutHtml 변수를 사용하지 않고 무시
    const formData = new FormData();
    formData.append('file', image);
    formData.append(
      'requestDTO',
      new Blob([JSON.stringify(info)], {
        type: 'application/json',
      })
    );
    console.log(info);
    // try {
    //   const response = await axios.post('/api/upload', formData, {
    //     headers: {
    //       'Content-Type': 'multipart/form-data',
    //     },
    //   });
    //   console.log(response.data);
    // } catch (error) {
    //   console.error('There was an error uploading the file!', error);
    // }
  };

  useEffect(() => {
    setValue('boardGameIdList', boardGameIdList);
  }, [boardGameIdList, setValue]);

  return (
    <div className={styles.body}>
      <h1 className={styles.header}>모임 만들기</h1>
      <p className={styles.headerDescription}>
        나만의 모임을 만들어서 운영을 해보세요!
      </p>
      <FormProvider {...methods}>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className={styles.inputArea}>
            <div className={styles.inputContainer}>
              <label htmlFor="title" className={styles.title}>
                제목
              </label>
              <p className={styles.titleDescription}>
                사람들이 끌릴만한 제목을 지어보세요!
              </p>
              <input
                id="title"
                {...register('title', { required: '제목을 입력해 주세요.' })}
                className={styles.commonInput}
              />
              {errors.title && errors.title.message}
            </div>
            <div className={styles.inputContainer}>
              <label htmlFor="content" className={styles.title}>
                내용 입력
              </label>
              <p className={styles.titleDescription}>
                어떤 모임인지 설명해 주세요!
              </p>
              <TextEditor
                name="content"
                id="content"
                // onChangeWithReactHookForm={register('content').onChange}
                register={register}
              />
              {errors.contentWithoutHtml && errors.contentWithoutHtml.message}
            </div>
            <div className={styles.inputContainer}>
              <label htmlFor="gameTitle" className={styles.title}>
                게임 선택
              </label>
              <p className={styles.titleDescription}>
                어떤 보드게임을 진행하실 건가요?
              </p>
              <input
                id="gameTitle"
                className={styles.commonInput}
                value={gameTitle}
                onChange={e => {
                  if (e.target.value === '') {
                    setShowGameData(false);
                    return;
                  }
                  setGameTitle(e.target.value);
                  setShowGameData(true);
                }}
              />
              <GameDataList
                gameData={gameData}
                showGameData={showGameData}
                setShowGameData={setShowGameData}
                setBoardGameIdList={setBoardGameIdList}
                setGameTitle={setGameTitle}
              />
              {boardGameIdList.map(id => {
                return (
                  <button
                    key={id}
                    type="button"
                    onClick={() => {
                      setBoardGameIdList(prev => {
                        const newPrev = prev.filter(element => element !== id);
                        return newPrev;
                      });
                    }}>
                    {id}
                  </button>
                );
              })}
            </div>
            {/* <div className={styles.inputContainer}>
              <label htmlFor="tags" className={styles.title}>
                태그
              </label>
              <input
                id="tags"
                {...register('tags')}
                className={styles.commonInput}
              />
            </div> */}
            <div className={styles.inputContainer}>
              <label htmlFor="image" className={styles.title} />
              <p className={styles.titleDescription}>
                썸네일로 사용되는 이미지에요!
              </p>
              <p className={styles.titleDescription}>
                직관적이고 잘 알아볼 수 있도록 사진을 넣어주세요!
              </p>
              <FileInput id="image" setValue={setValue} />
            </div>
            <div className={styles.inputContainer}>
              <label htmlFor="location" className={styles.title}>
                장소
              </label>
              <p className={styles.titleDescription}>어디서 만나나요?</p>
              <p className={styles.titleDescription}>
                해당 위치는 목록에서는 전체공개되지 않습니다.
              </p>
            </div>
            <div className={styles.inputContainer}>
              <label htmlFor="meetingDatetime" className={styles.title}>
                날짜
              </label>
              <DatePicker
                control={control}
                name="meetingDatetime"
                id="meetingDatetime"
                placeholder="날짜를 선택해 주세요."
                className={styles.datePicker}
                time
              />
              {errors.meetingDatetime && errors.meetingDatetime.message}
            </div>
            <div className={styles.inputContainer}>
              <label htmlFor="title" className={styles.title}>
                모집 정원
              </label>
              <p className={styles.titleDescription}>
                최소 2명, 최대 30명까지 같이 게임을 할 수 있어요!
              </p>
              <NumberInput setValue={setValue} />
            </div>
            <div className={styles.inputContainer}>
              <div className={styles.title}>모임 유형 선택</div>
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
    </div>
  );
}
