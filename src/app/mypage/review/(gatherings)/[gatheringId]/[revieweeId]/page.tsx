'use client';
import styles from './WriteReviewPage.module.scss';
import { useForm, Controller } from 'react-hook-form';
import { useToast } from '@/contexts/toastContext';
import Rating from '@/components/common/Rating';
import { useRouter } from 'next/navigation';

const positiveTags = [
  { content: '친절하고 매너가 좋아요', id: 1 },
  { content: '재미있어요', id: 2 },
  { content: '시간 약속을 잘 지켜요', id: 3 },
  { content: '공정해요', id: 4 },
  { content: '보드게임의 신', id: 5 },
  { content: '다시 만나고싶어요!', id: 6 },
];
const negativeTags = [
  { content: '비매너 플레이어', id: 7 },
  { content: '시간을 안지켜요', id: 8 },
  { content: '의도가 부적절해요', id: 9 },
  { content: '공정하지 못해요', id: 10 },
  { content: '다시 만나기 싫어요!', id: 11 },
  { content: '재미가 없어요', id: 12 },
];

export default function WriteReviewPage({ params }: any) {
  const router = useRouter();
  const revieweeName = decodeURIComponent(params.revieweeId.split('-')[1]);
  const { addToast } = useToast();
  const { handleSubmit, control, setValue, getValues, watch } = useForm();
  const watchRating = watch('rating');

  // 태그 버튼 클릭 시 활성 상태를 토글하는 함수
  const handleTagClick = (id: number) => {
    const currentTags = getValues('selectedTags') || [];
    if (currentTags.includes(id)) {
      setValue(
        'selectedTags',
        currentTags.filter((tagId: any) => tagId !== id)
      );
    } else {
      setValue('selectedTags', [...currentTags, id]);
    }
  };

  // 폼 제출 시 처리할 함수
  const onSubmit = (data: any) => {
    addToast('리뷰를 성공적으로 작성하였습니다.', 'success');
    if (!data) {
      addToast('리뷰를 제출하는데 문제가 있습니다', 'error');
      return;
    }
    router.back();
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
        <h3>{watchRating ?? 0}/5</h3>
      </div>

      <Controller
        name="selectedTags"
        control={control}
        defaultValue={[]}
        render={({ field }) => (
          <>
            <div className={styles.evaluationContainer}>
              <div className={styles.sigleEvaluation}>
                <h1>😁</h1>
                <div className={styles.tagBox}>
                  {positiveTags.map(el => {
                    return (
                      <button
                        key={el.id}
                        onClick={() => handleTagClick(el.id)}
                        className={`${styles.button} ${field.value.includes(el.id) ? styles.active : ''}`}>
                        {el.content}
                      </button>
                    );
                  })}
                </div>
              </div>
              <div className={styles.sigleEvaluation}>
                <h1>😢</h1>
                <div className={styles.tagBox}>
                  {negativeTags.map(el => {
                    return (
                      <button
                        key={el.id}
                        onClick={() => handleTagClick(el.id)}
                        className={`${styles.button} ${field.value.includes(el.id) ? styles.active : ''}`}>
                        {el.content}
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>
          </>
        )}
      />

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
