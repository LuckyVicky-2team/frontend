'use client';

import { useState } from 'react';
import styles from './Rating.module.scss';
import IconButton from '../IconButton';

interface IRatingProps {
  rating?: number; // 읽기 전용 모드 별점
  readable?: boolean; // 읽기전용 모드
  changeRatingHandler?: (_rating: number) => void;
}
export default function Rating({
  rating = 0,
  readable = false,
  changeRatingHandler,
}: IRatingProps) {
  const [currentRating, setCurrentRating] = useState(rating);

  const handleRatingClick = (newRating: number) => {
    if (readable) return; // 읽기 전용 모드일 때는 클릭 비활성화
    setCurrentRating(newRating);
    if (changeRatingHandler) {
      changeRatingHandler(newRating);
    }
  };

  return (
    <>
      <div className={`${styles.container}`}>
        {[...Array(5)].map((_, i) => (
          <IconButton
            size={'small'}
            key={i}
            imgUrl={
              i < currentRating
                ? '/assets/icons/filledStar.svg'
                : '/assets/icons/emptyStar.svg'
            }
            clickIconButtonHandler={() => handleRatingClick(i + 1)}
            className={`${readable && styles.readable}`}
          />
        ))}
      </div>
    </>
  );
}
