'use client';

import { useEffect, useState } from 'react';
import styles from './MannerBar.module.scss';

interface IMannerBarProps {
  rating: number;
}

export default function MannerBar({ rating }: IMannerBarProps) {
  const [progress, setProgress] = useState(0); // progress-width
  const [position, setPosition] = useState(0); // rating-position
  const [ratingValue, setRatingValue] = useState(0); // rating-text

  useEffect(() => {
    setProgress(rating * 20);
    setPosition(rating * 14);

    let start = 0;
    const end = rating;
    const duration = 1000; // 애니메이션 길이
    const stepTime = 50; // 프레임 간격
    const stepValue = (end - start) / (duration / stepTime);

    const timer = setInterval(() => {
      start += stepValue;
      if (start >= end) {
        start = end;
        clearInterval(timer);
      }
      setRatingValue(parseFloat(start.toFixed(1)));
    }, stepTime);

    return () => clearInterval(timer);
  }, [rating]);

  return (
    <div className={styles.container}>
      <div className={styles.progressBar}>
        <div
          className={styles.progress}
          style={{ width: `${progress}%` }}></div>
      </div>
      <div className={styles.rating} style={{ left: `${position}%` }}>
        {ratingValue}
      </div>
    </div>
  );
}
