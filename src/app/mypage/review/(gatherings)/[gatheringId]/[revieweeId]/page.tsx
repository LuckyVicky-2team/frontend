'use client';
import styles from './WriteReviewPage.module.scss';
import { useForm, Controller } from 'react-hook-form';
import { useToast } from '@/contexts/toastContext';
import Rating from '@/components/common/Rating';
import { useRouter } from 'next/navigation';
import { useEvaluationTagList, useReviewCreate } from '@/api/queryHooks/review';
type FormValues = {
  rating: number;
  evaluationTagList: number[]; // 이 배열이 숫자의 배열임을 명시적으로 지정
};

export default function WriteReviewPage({ params, searchParams }: any) {
  const router = useRouter();
  const revieweeName = searchParams?.revieweeName;
  const revieweeId = params?.revieweeId;
  const { addToast } = useToast();
  const { handleSubmit, control, setValue, getValues, watch } =
    useForm<FormValues>({
      defaultValues: {
        rating: 1,
        evaluationTagList: [],
      },
    });
  const watchRating = watch('rating');
  const { data } = useEvaluationTagList();
  const { mutate } = useReviewCreate();
  const handleTagClick = (id: number) => {
    const currentTags = getValues('evaluationTagList') || [];
    if (currentTags.includes(id)) {
      setValue(
        'evaluationTagList',
        currentTags.filter((tagId: any) => tagId !== id)
      );
    } else {
      setValue('evaluationTagList', [...currentTags, id]);
    }
  };

  const onSubmit = (data: any) => {
    if (!data) {
      addToast('리뷰를 제출하는데 문제가 있습니다', 'error');
      return;
    }
    const { evaluationTagList, rating } = data;
    const requestParams = {
      evaluationTagList,
      rating,
      meetingId: Number(params.gatheringId),
      revieweeId: Number(revieweeId),
    };

    mutate(requestParams, {
      onSuccess: () => {
        addToast('리뷰를 성공적으로 작성하였습니다.', 'success');
        router.back();
      },
      onError: (error: any) => {
        const errorCode = error.response.data.errorCode;
        const errorMsg = error.response.data.messages;
        if (errorCode <= 404 || errorCode === 4041 || errorCode === 4040)
          addToast(`${errorMsg}`, 'error');
      },
    });
  };

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <p className={styles.line1}>이번 모임에 {revieweeName}님</p>
        <p className={styles.line2}>어떠셨나요?</p>
        <p className={styles.line3}>태그로 설명해주세요!</p>
      </div>
      <div className={styles.rating}>
        <Rating
          size={'medium'}
          changeRatingHandler={rating => {
            setValue('rating', rating);
          }}
        />
        <h3>{watchRating ?? 1}/5</h3>
      </div>
      <div className={styles.evaluationContainer}>
        <Controller
          name="evaluationTagList"
          control={control}
          defaultValue={[]}
          render={({ field }) => (
            <>
              <div className={styles.sigleEvaluation}>
                <h1>😁</h1>
                <div className={styles.tagBox}>
                  {data?.positiveTags.map(el => {
                    return (
                      <button
                        key={el.evaluationTagId}
                        onClick={() => handleTagClick(el.evaluationTagId)}
                        className={`${styles.button} ${field.value.includes(el.evaluationTagId) ? styles.active : ''}`}>
                        {el.tagPhrase}
                      </button>
                    );
                  })}
                </div>
              </div>
              <div className={styles.sigleEvaluation}>
                <h1>😢</h1>
                <div className={styles.tagBox}>
                  {data?.negativeTags.map(el => {
                    return (
                      <button
                        key={el.evaluationTagId}
                        onClick={() => handleTagClick(el.evaluationTagId)}
                        className={`${styles.button} ${field.value.includes(el.evaluationTagId) ? styles.active : ''}`}>
                        {el.tagPhrase}
                      </button>
                    );
                  })}
                </div>
              </div>
            </>
          )}
        />
      </div>

      <div className={styles.buttons}>
        <button
          className={`${styles.button} ${styles.submit}`}
          onClick={handleSubmit(onSubmit)}>
          리뷰 등록하기
        </button>
        <button
          className={`${styles.button} ${styles.skip}`}
          onClick={() => {
            router.back();
          }}>
          건너뛰기
        </button>
      </div>
    </div>
  );
}
