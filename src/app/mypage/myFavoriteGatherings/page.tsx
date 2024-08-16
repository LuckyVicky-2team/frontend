'use client';

import styles from './myFavoriteGatherings.module.scss';
import Image from 'next/image';
import { useEffect, useState } from 'react';
interface DateData {
  id: number;
  title: string;
  tag: string[]; // Array of strings
  participantCount: number;
  capacity: number;
  registerDate: string;
  gatheringDate: string;
  location: string;
  content: string;
  image: string;
  master: {
    nickName: string;
  };
  type: string;
}

export default function MyFavoriteGatherings() {
  const [favoriteGatherings, setFavoriteGatherings] = useState<DateData[]>([]);
  const [heart, setHeart] = useState<{ [key: number]: boolean }>({});

  useEffect(() => {
    const savedFavorites = JSON.parse(
      localStorage.getItem('savedItems') || '[]'
    );
    setFavoriteGatherings(savedFavorites);

    const savedHeart = localStorage.getItem('heart');
    if (savedHeart) {
      setHeart(JSON.parse(savedHeart));
    }
  }, []);
  const handleRemoveFavorite = (id: number) => {
    const userConfirmed = confirm(
      '정말로 이 모임을 찜 목록에서 제거하시겠습니까?'
    );
    if (userConfirmed) {
      const updatedFavorites = favoriteGatherings.filter(
        item => item.id !== id
      );
      setFavoriteGatherings(updatedFavorites);
      localStorage.setItem('savedItems', JSON.stringify(updatedFavorites));

      const updatedHeart = { ...heart, [id]: false };
      setHeart(updatedHeart);
      localStorage.setItem('heart', JSON.stringify(updatedHeart));
    }
  };

  return (
    <div className={styles.relative}>
      <div className={styles.title}>나의 찜한 모임</div>
      <div className={styles.myFavoriteGathering}>
        {favoriteGatherings?.map((e, i) => {
          return (
            <div className={styles.myFavoriteGatheringItem} key={i}>
              <div className={styles.img}>
                <Image
                  width={182}
                  height={200}
                  src={'/assets/mainImages/game.png'}
                  alt="찜목록 리스트"
                  style={{ width: '100%', height: 'auto' }}
                />
              </div>
              <div className={styles.mid}>
                <p>{e.location}</p>
                <button
                  type={'button'}
                  onClick={() => handleRemoveFavorite(e.id)}>
                  <Image
                    width={22}
                    height={22}
                    objectFit="cover"
                    src={'/assets/mainImages/heart_fill_ico.svg'}
                    alt="heart"
                  />
                </button>
              </div>
              <div className={styles.title2}>{e.title}</div>
              <div className={styles.date}>{e.gatheringDate}</div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
