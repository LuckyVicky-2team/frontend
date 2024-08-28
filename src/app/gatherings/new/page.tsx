'use client';
// import Modal from '@/components/common/Modal';
import { FormProvider, useForm } from 'react-hook-form';
import styles from './New.module.scss';
import DatePicker from '@/components/common/DatePicker';
import FileInput from '@/components/common/FileInput';
import TextEditor from '@/components/common/TextEditor';
import { useEffect, useState, useMemo } from 'react';
import GameDataList from './_components/GameDataList';
import { INewGatheringFormValuesRequest } from '@/types/request/Gatherings';
import NumberInput from './_components/NumberInput';
// import TypeInput from './_components/TypeInput';
import Image from 'next/image';
import { dateToString } from '@/utils/dateTostring';
import FindPlaceModal from '@/components/common/FindPlaceModal';
import useModal from '@/hooks/useModal';
import { axiosInstance } from '@/api/instance';
import { useToast } from '@/contexts/toastContext';
import { useRouter } from 'next/navigation';
// import AuthSubmitButton from '@/app/(authentication)/_components/AuthSubmitButton';

// 나중에 Input 컴포넌트로 뺄 것들은 빼겠습니다.
// 생성일 추가? (상의)

interface IBoardGameIdTitle {
  id: number;
  title: string;
}

export default function NewGatheringPage() {
  const methods = useForm<INewGatheringFormValuesRequest>({
    mode: 'all',
    defaultValues: {
      type: 'FREE',
      boardGameIdList: [],
      image: '',
      meetingDatetime: undefined,
      genreIdList: [],
      limitParticipant: 2,
    },
  });
  const {
    register,
    handleSubmit,
    control,
    setValue,
    getValues,
    watch,
    formState: { errors, dirtyFields, isValid },
  } = methods;
  //free/accept
  // const [freeButtonClick, setFreeButtonClick] = useState(true);
  const [showGameData, setShowGameData] = useState(false);
  const [genreIdList, setGenreIdList] = useState<number[]>([]);
  const [boardGameIdTitleList, setBoardGameIdTitleList] = useState<
    IBoardGameIdTitle[]
  >([]);

  const isGameListEmpty = useMemo(() => {
    return boardGameIdTitleList.length === 0;
  }, [boardGameIdTitleList]);

  const [showGameListMessage, setShowGameListMessage] = useState(false);

  // const [gameSelectInputTouched, setGameSelectInputTouched] =
  //   useState<boolean>(false);
  // const [boardGameIdListError, setBoardGameIdListError] =
  //   useState<boolean>(false);
  const [locationNameClicked, setLocationNameClicked] =
    useState<boolean>(false);
  const [locationNameError, setLocationNameError] = useState<boolean>(false);
  //[성공 메세지 표시 유무, 에러 메세지 표시 유무]
  const [locationNameMessage, setLocationNameMessage] = useState<boolean[]>([
    false,
    false,
  ]);
  // const [chooseGameMessage, setChooseGameMessage] = useState<boolean[]>([
  //   false,
  //   false,
  // ]);

  const {
    modalOpen: findPlaceModalOpen,
    handleModalClose: handleFindPlaceModalClose,
    handleModalOpen: handleFindPlaceModalOpen,
  } = useModal();

  const {
    modalOpen: chooseGameModalOpen,
    handleModalClose: handleChooseGameModalClose,
    handleModalOpen: handleChooseGameModalOpen,
  } = useModal();

  const { addToast } = useToast();
  const router = useRouter();

  // 'image' 필드의 값 변화를 감지
  const watchedImage = watch('image');

  // 'limitParticipant' 필드의 값 변화를 감지
  const watchedParticipant = watch('limitParticipant');

  // const gameData = [
  //   { id: 1, title: '체스', image: '/assets/images/rectangle.png' },
  //   { id: 2, title: '장기', image: '/assets/images/rectangle.png' },
  //   { id: 3, title: '바둑', image: '/assets/images/rectangle.png' },
  //   { id: 4, title: '오목', image: '/assets/images/rectangle.png' },
  // ];

  const onSubmit = async (gatheringInfo: INewGatheringFormValuesRequest) => {
    const { contentWithoutHtml, image, meetingDatetime, ...info } =
      gatheringInfo;
    void contentWithoutHtml; //contentWithoutHtml 변수를 사용하지 않고 무시
    const formData = new FormData();
    formData.append('image', image);

    //임시 코드
    const { genreIdList, ...info2 } = info;
    void genreIdList;
    // void latitude;
    // void longitude;
    // console.log(dateToString(meetingDatetime));
    console.log(info2);
    formData.append(
      'meetingCreateRequest',
      new Blob(
        [
          JSON.stringify({
            genreIdList: [1, 2, 3],
            meetingDatetime: dateToString(meetingDatetime),
            ...info2,
          }),
        ],
        {
          type: 'application/json',
        }
      )
    );
    console.log(
      JSON.stringify({
        genreIdList: [1, 2, 3],
        meetingDatetime: dateToString(meetingDatetime),
        ...info2,
      })
    );

    for (const x of formData) {
      console.log(x);
    }
    try {
      const response = await axiosInstance.post('/meeting', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      console.log(response.data);
      router.push('/gatherings/new/success');
    } catch (error) {
      void error;
      addToast('모임 생성에 실패했어요.', 'error');
    }
  };

  useEffect(() => {
    const boardGameIdList = boardGameIdTitleList.map(idTitle => {
      return idTitle.id;
    });
    setValue('boardGameIdList', boardGameIdList);
  }, [boardGameIdTitleList, setValue]);

  useEffect(() => {
    setValue('genreIdList', genreIdList);
  }, [genreIdList, setValue]);

  useEffect(() => {
    if (
      (!getValues('locationName') || getValues('locationName').length === 0) &&
      locationNameError === true
    ) {
      setLocationNameError(true);
      return;
    }
    setLocationNameError(false);
  }, [getValues('locationName'), locationNameError]);

  useEffect(() => {
    if (!findPlaceModalOpen) {
      if (locationNameError) {
        setLocationNameMessage([false, true]);
        return;
      }
      if (locationNameClicked && !locationNameError) {
        setLocationNameMessage([true, false]);
        return;
      }
      return;
    }
  }, [findPlaceModalOpen, locationNameError, locationNameClicked]);

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
              <div style={{ margin: '0 0 28px' }}>
                <input
                  id="title"
                  {...register('title', { required: '제목을 입력해 주세요.' })}
                  className={`${styles.commonInput} ${errors.title && styles.error}`}
                  placeholder={'모임 이름을 입력해 주세요.'}
                />
                <div className={styles.errorMessage}>
                  {errors.title && errors.title.message}
                </div>
                <div className={styles.successMessage}>
                  {dirtyFields.title &&
                    !errors.title &&
                    '정말 멋진 모임 이름이네요!'}
                </div>
              </div>
            </div>
            <div className={styles.inputContainer}>
              <label htmlFor="content" className={styles.title}>
                내용 입력
              </label>
              <p className={styles.titleDescription}>
                어떤 모임인지 설명해 주세요!
              </p>
              <div className={styles.textEditor}>
                <TextEditor
                  name="content"
                  id="content"
                  // onChangeWithReactHookForm={register('content').onChange}
                  register={register}
                />
                <div className={styles.errorMessage}>
                  {errors.contentWithoutHtml &&
                    errors.contentWithoutHtml.message}
                </div>
                <div className={styles.successMessage}>
                  {dirtyFields.content &&
                    !errors.contentWithoutHtml &&
                    '이해가 쏙쏙 되네요!'}
                </div>
              </div>
            </div>
            <div className={styles.inputContainer}>
              <label htmlFor="boardGameIdList" className={styles.title}>
                게임 선택
              </label>
              <p className={styles.titleDescription}>
                어떤 보드게임을 진행하실 건가요?
              </p>
              <div style={{ margin: '0 0 28px' }}>
                <input
                  id="boardGameIdList"
                  readOnly
                  // className={`${styles.commonInput} ${chooseGameMessage[1] === true && styles.error}`}
                  className={`${styles.commonInput} ${
                    showGameListMessage && isGameListEmpty && styles.error
                  }`}
                  placeholder={'게임을 선택해 주세요.'}
                  onClick={() => {
                    handleChooseGameModalOpen();
                    // setGameSelectInputTouched(true);
                  }}
                  onBlur={() => {
                    setShowGameListMessage(true);
                  }}
                />
                <div
                  className={
                    showGameListMessage && !isGameListEmpty
                      ? styles.boardGameTitles
                      : styles.none
                  }>
                  {boardGameIdTitleList.map(idTitle => {
                    return (
                      <div key={idTitle.id} className={styles.boardGameTitle}>
                        {idTitle.title}
                        <button
                          type="button"
                          onClick={() => {
                            setBoardGameIdTitleList(prev => {
                              const newPrev = prev.filter(
                                element => element.title !== idTitle.title
                              );
                              return newPrev;
                            });
                          }}>
                          <Image
                            src={'/assets/icons/x-button-blue.svg'}
                            alt="없애기 버튼"
                            width={24}
                            height={24}
                          />
                        </button>
                      </div>
                    );
                  })}
                </div>
                <div className={styles.errorMessage}>
                  {showGameListMessage &&
                    isGameListEmpty &&
                    '게임을 선택해 주세요.'}
                </div>
                <div className={styles.successMessage}>
                  {showGameListMessage &&
                    !isGameListEmpty &&
                    '이 게임도 너무 재밌죠!'}
                </div>
              </div>
              <GameDataList
                modalOpen={chooseGameModalOpen}
                onClose={handleChooseGameModalClose}
                showGameData={showGameData}
                setShowGameData={setShowGameData}
                setBoardGameIdTitleList={setBoardGameIdTitleList}
                setGenreIdList={setGenreIdList}
              />
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
              <label htmlFor="image" className={styles.title}>
                이미지
              </label>
              <p className={styles.titleDescription}>
                썸네일로 사용되는 이미지에요!
                <br />
                직관적이고 잘 알아볼 수 있도록 사진을 넣어주세요!
              </p>
              <div className={styles.fileInput}>
                <FileInput
                  id="image"
                  setValue={setValue}
                  height={'264px'}
                  width={'100%'}>
                  <Image
                    className={styles.downloadIcon}
                    src={'/assets/icons/download.svg'}
                    alt="다운로드 아이콘"
                    width={20}
                    height={20}
                    priority
                  />
                  <p className={styles.fileInputTitle}>이미지 업로드</p>
                  <p className={styles.fileInputDescription}>
                    파일 형식: jpg 또는 png
                  </p>
                  <p className={styles.fileInputDescription}>
                    권장 사이즈: 가로 204px, 세로 247px
                  </p>
                  <p className={styles.fileInputDescription}>
                    상세 페이지에서 제일 먼저 보이는 이미지 입니다.
                  </p>
                </FileInput>
                <div className={styles.successMessage}>
                  {watchedImage !== '' && '사진이 너무 멋있어요!'}
                </div>
              </div>
            </div>
            <div className={styles.inputContainer}>
              <label htmlFor="location" className={styles.title}>
                장소
              </label>
              <p className={styles.titleDescription}>
                어디서 만나나요? <br />
                해당 위치는 목록에서는 전체공개되지 않습니다.
              </p>
              <div style={{ margin: '0 0 28px' }}>
                <input
                  readOnly
                  placeholder={'장소를 입력해 주세요.'}
                  value={getValues('locationName')}
                  onClick={() => {
                    handleFindPlaceModalOpen();
                    setLocationNameClicked(true);
                  }}
                  className={`${styles.placeInput} ${locationNameMessage[1] === true && styles.error}`}
                  onBlur={() => {
                    if (
                      !getValues('locationName') ||
                      getValues('locationName')?.length === 0
                    ) {
                      setLocationNameError(true);
                    }
                  }}
                />
                <div className={styles.errorMessage}>
                  {/* {locationNameError &&  */}
                  {locationNameMessage[1] === true && '장소를 선택해 주세요'}
                </div>
                <div className={styles.successMessage}>
                  {/* {locationNameClicked &&
                    !locationNameError && */}
                  {locationNameMessage[0] === true &&
                    '여기도 정말 보드게임하기 좋은 곳이죠!'}
                </div>
              </div>
              <FindPlaceModal
                modalOpen={findPlaceModalOpen}
                onClose={handleFindPlaceModalClose}
                setLatitude={x => setValue('latitude', x)}
                setLongitude={x => setValue('longitude', x)}
                setValue={setValue}
              />
            </div>
            <div className={styles.inputContainer}>
              <label htmlFor="meetingDatetime" className={styles.title}>
                날짜
              </label>
              <div style={{ margin: '0 0 28px' }}>
                <DatePicker
                  control={control}
                  name="meetingDatetime"
                  id="meetingDatetime"
                  placeholder="날짜를 선택해 주세요."
                  className={`${styles.datePicker} ${errors.meetingDatetime && styles.error}`}
                  time
                />
                <div className={styles.errorMessage}>
                  {errors.meetingDatetime && errors.meetingDatetime.message}
                </div>
                <div className={styles.successMessage}>
                  {dirtyFields.meetingDatetime &&
                    !errors.meetingDatetime &&
                    '날과 시간이 모두 완벽해요!'}
                </div>
              </div>
            </div>
            <div className={styles.inputContainer}>
              <label htmlFor="title" className={styles.title}>
                모집 정원
              </label>
              <p className={styles.titleDescription}>
                최소 2명, 최대 30명까지 같이 게임을 할 수 있어요!
              </p>
              <div className={styles.numberInput}>
                <NumberInput setValue={setValue} />
                <div className={styles.successMessage}>
                  {watchedParticipant &&
                    !errors.limitParticipant &&
                    '이 정도 인원이면 보드게임 하기에 충분하죠!'}
                </div>
              </div>
            </div>
            {/* <div className={styles.inputContainer}>
              <div className={styles.title}>참여 유형</div>
              <TypeInput
                register={register('type')}
                freeButtonClick={freeButtonClick}
                setFreeButtonClick={setFreeButtonClick}
              />
            </div> */}
          </div>
          <button
            type="submit"
            disabled={
              !isValid ||
              isGameListEmpty ||
              !locationNameClicked ||
              locationNameError
            }
            className={styles.submitButton}>
            확인
          </button>
        </form>
      </FormProvider>
    </div>
  );
}
