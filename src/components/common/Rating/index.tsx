'use client';

import React, { useState } from 'react';
import styles from './Rating.module.scss';
import IconButton from '../IconButton';
import Image from 'next/image';

/*
  [읽기전용]
  <Rating
    readable
    rating={4.3}
    size='medium' // size is optional prop
  />
혹은
  [별점 매기기]
  <Rating
    changeRatingHandler={(rating:number) => {
      rating 사용~
    }}
    />
 */

interface IRatingProps {
  rating?: number; // 읽기 전용 모드 별점
  readable?: boolean; // 읽기전용 모드
  size?: 'xsmall' | 'small' | 'medium' | 'large';
  changeRatingHandler?: (_rating: number) => void;
}

export default function Rating({
  rating = 0,
  size = 'small',
  readable = false,
  changeRatingHandler,
}: IRatingProps) {
  const [currentRating, setCurrentRating] = useState(rating);

  const handleRatingClick = (newRating: number) => {
    let updatedRating = newRating;

    if (newRating === currentRating) {
      if (newRating === 0) return;
      updatedRating = newRating - 1;
    }

    setCurrentRating(updatedRating);

    if (changeRatingHandler) {
      changeRatingHandler(updatedRating);
    }
  };

  return (
    <>
      <div className={`${styles.container}`}>
        {[...Array(5)].map((_, i) => {
          const fillPercentage = Math.min(1, Math.max(0, currentRating - i));

          return (
            <React.Fragment key={i}>
              {readable ? (
                <div className={styles.heart} data-size={size}>
                  <Image
                    src="/assets/icons/unSave.svg"
                    alt="empty heart"
                    fill
                    sizes={'100%'}
                  />
                  <Image
                    sizes={'100%'}
                    fill
                    src="/assets/icons/blueSave.svg"
                    alt="filled heart"
                    className={styles.filledHeart}
                    style={{
                      clipPath: `inset(0 ${100 - fillPercentage * 100}% 0 0)`,
                    }}
                  />
                </div>
              ) : (
                <IconButton
                  size={size}
                  imgUrl={
                    i < currentRating
                      ? '/assets/icons/blueSave.svg'
                      : '/assets/icons/unSave.svg'
                  }
                  clickIconButtonHandler={() => handleRatingClick(i + 1)}
                />
              )}
            </React.Fragment>
          );
        })}
      </div>
    </>
  );
}
