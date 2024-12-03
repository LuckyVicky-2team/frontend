'use client';

import { useEffect, useState, useMemo } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { FormProvider, useForm } from 'react-hook-form';
import { INewGatheringFormValuesRequest } from '@/types/request/Gatherings';
import { IGatheringDetailsResponseProps } from '@/types/response/Gathering';
import { useDeleteGathering } from '@/api/queryHooks/gathering';
import { useToast } from '@/contexts/toastContext';
import { dateToString } from '@/utils/dateTostring';
import useModal from '@/hooks/useModal';
import { QueryKey } from '@/utils/QueryKey';
import Modal from '@/components/common/Modal';
import NumberInput from '@/app/gatherings/new/_components/NumberInput';
import FindPlaceModal from '@/components/common/FindPlaceModal';
import DatePicker from '@/components/common/DatePicker';
import FileInput from '@/components/common/FileInput';
import TextEditor from '@/components/common/TextEditor';
import GameDataList from '@/app/gatherings/new/_components/GameDataList';
import styles from './GatheringForm.module.scss';
import {
  useCreateGathering,
  useUpdateGathering,
} from '@/api/queryHooks/gathering';
import { useQueryClient } from '@tanstack/react-query';

interface IGatheringFormProps {
  mode: 'create' | 'edit';
  initialData?: any;
  status?: any;
}
interface IBoardGameIdTitle {
  id: number;
  title: string;
}

export default function GatheringForm({
  mode,
  initialData,
  status,
}: IGatheringFormProps) {
  const editMode = mode === 'edit';
  const { addToast } = useToast();
  const router = useRouter();
  const createGathering = useCreateGathering();
  const updateGathering = useUpdateGathering(initialData?.meetingId);
  const queryClient = useQueryClient();

  const methods = useForm<INewGatheringFormValuesRequest>({
    mode: 'all',
    defaultValues: {
      title: '',
      content: '',
      type: 'FREE',
      boardGameIdList: [],
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

  const [showGameData, setShowGameData] = useState(false);
  const [genreIdList, setGenreIdList] = useState<number[]>([]);
  const [boardGameIdTitleList, setBoardGameIdTitleList] = useState<
    IBoardGameIdTitle[]
  >([]);
  const [isButtonDisabled, setIsButtonDisabled] = useState(false);
  const selectedImageUrl =
    initialData?.thumbnail?.includes('meeting') &&
    `https://d248qe8akqy587.cloudfront.net/${initialData.thumbnail}`;
  const isGameListEmpty = useMemo(() => {
    return boardGameIdTitleList.length === 0;
  }, [boardGameIdTitleList]);

  const [showGameListMessage, setShowGameListMessage] = useState(false);

  const [locationNameClicked, setLocationNameClicked] =
    useState<boolean>(false);
  const [locationNameError, setLocationNameError] = useState<boolean>(false);
  //[성공 메세지 표시 유무, 에러 메세지 표시 유무]
  const [locationNameMessage, setLocationNameMessage] = useState<boolean[]>([
    false,
    false,
  ]);
  const deleteGathering = useDeleteGathering(initialData?.meetingId);
  const handleDeleteGathering = () => {
    deleteGathering.mutate(initialData?.meetingId, {
      onSuccess: () => {
        history.go(-2);
      },
      onError: (error: any) => {
        if (error.response.data.errorCode === 4004) {
          addToast('모임(이)가 존재하지 않습니다.', 'error');
        } else if (error.response.data.errorCode === 400) {
          addToast(error.response.data.message, 'error');
        }
        handleDeleteModalClose();
      },
    });
  };
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
  const {
    modalOpen: deleteModalOpen,
    handleModalOpen: handleDeleteModalOpen,
    handleModalClose: handleDeleteModalClose,
  } = useModal();

  // 'image' 필드의 값 변화를 감지
  const watchedImage = watch('image');

  // 'limitParticipant' 필드의 값 변화를 감지
  const watchedParticipant = watch('limitParticipant');
  const initialBoardGameIdList = initialData?.boardGameListResponseList.map(
    (el: any) => el.boardGameId
  );

  const setItem = async (initData: IGatheringDetailsResponseProps) => {
    if (initData) {
      const transformedGameList = initData.boardGameListResponseList.map(
        game => ({
          id: game.boardGameId,
          title: game.title,
        })
      );

      methods.reset({
        title: initData.title,
        content: initData.content,
        contentWithoutHtml: initData.content.replace(/\n/g, ''),
        type: 'FREE',
        boardGameIdList: initData.boardGameListResponseList.map(
          game => game.boardGameId
        ),
        meetingDatetime: new Date(initData.meetingDatetime),
        limitParticipant: initData.limitParticipant,
        locationName: initData.locationName,
        longitude: initData.longitude.toString(),
        latitude: initData.latitude.toString(),
        city: initData.city,
        county: initData.county,
        detailAddress: initData.detailAddress,
      });
      setValue('content', initData.content);
      setBoardGameIdTitleList(transformedGameList);
      setLocationNameClicked(true);
      setShowGameListMessage(true);
    }
  };

  const onSubmit = async (gatheringInfo: INewGatheringFormValuesRequest) => {
    setIsButtonDisabled(true);
    const {
      contentWithoutHtml,
      image,
      meetingDatetime,
      genreIdList,
      boardGameIdList,
      ...info
    } = gatheringInfo;

    const isDeleteThumbnail = image === '';
    const isBoardGameListSame =
      JSON.stringify(initialBoardGameIdList) ===
      JSON.stringify(boardGameIdList);
    void contentWithoutHtml; //contentWithoutHtml 변수를 사용하지 않고 무시

    const newRequestData = {
      meetingDatetime: dateToString(meetingDatetime),
      genreIdList: genreIdList,
      boardGameIdList: boardGameIdList,
      ...info,
    };
    const editRequestData = {
      isDeleteThumbnail,
      meetingDatetime: dateToString(meetingDatetime),
      // boardGameIdList: isBoardGameListSame ? [] : boardGameIdList,
      boardGameIdList: isBoardGameListSame
        ? initialBoardGameIdList
        : boardGameIdList,
      id: Number(initialData?.meetingId),
      ...info,
    };

    const formData = new FormData();

    if (!editMode || (editMode && image !== undefined)) {
      formData.append('image', image);
    }

    formData.append(
      editMode ? 'meetingUpdateRequest' : 'meetingCreateRequest',
      new Blob([JSON.stringify(editMode ? editRequestData : newRequestData)], {
        type: 'application/json',
      })
    );

    if (mode === 'create') {
      createGathering.mutate(formData, {
        onSuccess: async res => {
          const path = res.headers.location.split('/');
          router.replace(`/gatherings/new/success/${path[2]}`);
          queryClient.invalidateQueries({
            queryKey: QueryKey.GATHERING.LIST({}),
            refetchType: 'all',
          });
        },
        onError: () => {
          addToast(`모임 생성에 실패했어요.`, 'error');
          setIsButtonDisabled(false);
        },
      });
    } else {
      updateGathering.mutate(formData, {
        onSuccess: async () => {
          addToast(`모임이 성공적으로 수정되었습니다.`, 'success');
          router.replace(`/gatherings/${initialData.meetingId}`);
          queryClient.invalidateQueries({
            queryKey: QueryKey.GATHERING.LIST({}),
            refetchType: 'all',
          });
        },
        onError: () => {
          addToast(`모임 수정에 실패했어요.`, 'error');
          setIsButtonDisabled(false);
        },
      });
    }
  };
  const handleGatheringDelete = () => {
    if (initialData?.totalParticipantCount === 1) {
      handleDeleteModalOpen();
    } else {
      addToast('모임 참가자가 있으면 모임 삭제가 불가능합니다.', 'error');
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

  useEffect(() => {
    if (editMode && status === 'success') {
      setItem(initialData);
    }
  }, [status]);

  return (
    <>
      <h1 className={styles.header}>
        {editMode ? '모임 수정하기' : '모임 만들기'}
      </h1>
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
                  editorContent={initialData?.content}
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
                  selectedImageUrl={selectedImageUrl}
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
                <div
                  className={`${styles.successMessage} ${!watchedImage && styles.info}`}>
                  {watchedImage
                    ? '사진이 너무 멋있어요!'
                    : '이미지를 업로드하지 않으시면, 선택하신 게임의 이미지가 보여집니다.'}
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
                  style={{ paddingLeft: '16px' }}
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
                  minDate={new Date()}
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
                {editMode && initialData
                  ? `현재 ${initialData?.totalParticipantCount}명의 인원이 참가중이에요 최대 30명까지 같이 게임을 할 수 있어요!`
                  : '최소 2명, 최대 30명까지 같이 게임을 할 수 있어요!'}
              </p>
              <div className={styles.numberInput}>
                <NumberInput
                  setValue={setValue}
                  currentMaxParticipants={initialData?.limitParticipant}
                  minParticipants={initialData?.totalParticipantCount}
                />
                <div className={styles.successMessage}>
                  {watchedParticipant &&
                    !errors.limitParticipant &&
                    '이 정도 인원이면 보드게임 하기에 충분하죠!'}
                </div>
              </div>
            </div>
          </div>
          <button
            type="submit"
            disabled={
              !isValid ||
              isGameListEmpty ||
              !locationNameClicked ||
              locationNameError ||
              isButtonDisabled
            }
            className={styles.submitButton}>
            {editMode ? '수정하기' : '확인'}
          </button>
          {editMode && (
            <button
              type="button"
              disabled={deleteGathering.isPending}
              className={styles.deleteButton}
              onClick={handleGatheringDelete}>
              모임 삭제
            </button>
          )}
        </form>
      </FormProvider>
      <Modal
        modalOpen={deleteModalOpen}
        onClose={() => {
          handleDeleteModalClose();
        }}
        maxWidth={552}>
        <div className={styles.modalBackground}>
          <div className={styles.description}>
            <p> 모임을 삭제하시겠습니까?</p>
          </div>
        </div>
        <div className={styles.modalButtons}>
          <button
            type="button"
            onClick={handleDeleteGathering}
            disabled={deleteGathering.isPending}
            className={styles.modalFirstButton}>
            네
          </button>
          <button
            type="button"
            onClick={handleDeleteModalClose}
            disabled={deleteGathering.isPending}
            className={styles.modalSecondButton}>
            아니오
          </button>
        </div>
      </Modal>
    </>
  );
}
