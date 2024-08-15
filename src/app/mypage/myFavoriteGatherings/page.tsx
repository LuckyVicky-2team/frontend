'use client';

import styles from './myFavoriteGatherings.module.scss';
import Image from 'next/image';

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
  const getMyFavoriteGatheringsList: DateData[] | null = JSON.parse(
    localStorage.getItem('savedItems') || 'null'
  );

  console.log(getMyFavoriteGatheringsList);

  return (
    <div className={styles.relative}>
      <div className={styles.title}>나의 찜한 모임</div>
      <div className={styles.myFavoriteGathering}>
        {getMyFavoriteGatheringsList?.map((e, i) => {
          return (
            <div className={styles.myFavoriteGatheringItem} key={i}>
              <div className={styles.img}>
                <Image
                  width={182}
                  height={200}
                  src={'/assets/mainImages/game.png'}
                  alt="찜목록 리스트"
                />
              </div>
              <div className={styles.mid}>
                <p>{e.location}</p>
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
