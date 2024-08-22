'use client';

import styles from './ReviewWriteDetail.module.scss';
import Rating from '@/components/common/Rating';
import IconButton from '@/components/common/IconButton';
import { useForm } from 'react-hook-form';
import { useToast } from '@/contexts/toastContext';

interface IReviewWriteDetailProps {
  routerBackHandler: () => void;
  gatheringId: number;
  name: string;
  id: number;
}
export default function ReviewWriteDetail({
  name,
  // id,
  // gatheringId,
  routerBackHandler,
}: IReviewWriteDetailProps) {
  const { addToast } = useToast();

  const { register, setValue, handleSubmit, watch } = useForm({
    defaultValues: {
      rating: 1,
      mannerList: Array.from({ length: 10 }, (_, _i) => 0),
    },
  });
  const submitReview = (data: any) => {
    addToast('리뷰를 성공적으로 작성하였습니다.', 'success');
    if (!data) {
      addToast('리뷰를 제출하는데 문제가 있습니다', 'error');
      return;
    }
    routerBackHandler();
  };
  const tempSave = () => {
    addToast('임시저장 되었습니다', 'success');
  };
  const watchMannerState = watch('mannerList');

  const goodMannerList = [
    { content: '친절하고 매너가 좋아요', id: 1 },
    { content: '재미있어요', id: 2 },
    { content: '시간 약속을 잘 지켜요', id: 3 },
    { content: '공정해요', id: 4 },
    { content: '보드게임의 신', id: 5 },
    { content: '다시 만나고싶어요!', id: 6 },
  ];
  const badMannersList = [
    { content: '비매너 플레이어', id: 7 },
    { content: '시간을 안지켜요', id: 8 },
    { content: '의도가 부적절해요', id: 9 },
    { content: '공정하지 못해요', id: 10 },
    { content: '다시 만나기 싫어요!', id: 11 },
  ];

  return (
    <>
      <div className={styles.container}>
        <div className={styles.main}>
          <p className={styles.participantName}>
            <span>{name}</span>
            님과의 모임은 어떠셨나요?
          </p>
          <Rating
            changeRatingHandler={newRating => setValue('rating', newRating)}
          />
          <div>
            <div>
              <p>어떤점이 좋았나요?</p>
              {goodMannerList.map((el, idx: number) => {
                return (
                  <div
                    className={styles.mannerList}
                    key={el.id}
                    {...register(`mannerList.${idx}`)}>
                    <IconButton
                      size={'small'}
                      imgUrl={
                        watchMannerState.includes(el.id)
                          ? '/assets/icons/checkFilledCircle.svg'
                          : '/assets/icons/checkCircle.svg'
                      }
                      clickIconButtonHandler={() => {
                        watchMannerState.includes(el.id)
                          ? setValue(`mannerList.${idx}`, 0)
                          : setValue(`mannerList.${idx}`, el.id);
                      }}
                    />
                    <span>{el.content}</span>
                  </div>
                );
              })}
            </div>
            <div>
              <p>어떤점이 별로였나요?</p>
              {badMannersList.map((el, idx: number) => {
                return (
                  <div
                    className={styles.mannerList}
                    key={el.id}
                    {...register(`mannerList.${idx + 6}`)}>
                    <IconButton
                      size={'small'}
                      imgUrl={
                        watchMannerState.includes(el.id)
                          ? '/assets/icons/checkFilledCircle.svg'
                          : '/assets/icons/checkCircle.svg'
                      }
                      clickIconButtonHandler={() => {
                        watchMannerState.includes(el.id)
                          ? setValue(`mannerList.${idx + 6}`, 0)
                          : setValue(`mannerList.${idx + 6}`, el.id);
                      }}
                    />
                    <span>{el.content}</span>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        <div className={styles.bottomNav}>
          <button className={styles.submitBtn} onClick={tempSave}>
            임시저장
          </button>
          <button
            className={styles.submitBtn}
            onClick={handleSubmit(submitReview)}>
            제출하기
          </button>
        </div>
      </div>
    </>
  );
}
