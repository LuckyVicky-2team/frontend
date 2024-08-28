'use client';
import { useEffect, useState } from 'react';
import styles from './gameRank.module.scss';
import { getGameRank } from '@/api/apis/mypageApis';
import Image from 'next/image';

// GameRankItem 인터페이스 정의
interface IGameRankItem {
  gameId: number;
  title: string;
  thumbnail: string;
  cumulativeCount: number;
}

export default function GameRank() {
  // useState의 타입을 IGameRankItem 배열로 지정
  const [game, setGame] = useState<IGameRankItem[] | undefined>(undefined);
  const cloud = process.env.NEXT_PUBLIC_CLOUDFRONT_DOMAIN;

  useEffect(() => {
    const fetchGatherings = async () => {
      try {
        const response = await getGameRank();
        setGame(response.data);
      } catch (err) {
        void err;
      }
    };

    fetchGatherings();
  }, []);

  return (
    <div>
      <div className={styles.newTitle}>
        <Image
          width={55}
          height={55}
          src={'/assets/icons/goldCrown.svg'}
          alt="타이틀 왼쪽 이미지"
        />
        <div className={styles.titleTxt}>
          <h1 className={styles.title1}>이번 주 핫한 보드게임 랭킹</h1>
          <b className={styles.title2}>보드게임 인기순위</b>
        </div>
      </div>

      <div className={styles.rankWrap}>
        {game?.map((e, i) => {
          let crownSrc = '';
          if (i === 0) crownSrc = '/assets/icons/goldCrown.svg';
          else if (i === 1) crownSrc = '/assets/icons/silverCrown.svg';
          else if (i === 2) crownSrc = '/assets/icons/bronzeCrown.svg';

          return (
            <div className={styles.rankItem} key={e.gameId}>
              <b>{i + 1}</b>
              <div className={styles.img}>
                <Image
                  style={{ width: '100%', height: '100%' }}
                  objectFit="cover"
                  width={125}
                  height={125}
                  src={`https://${cloud}/${e.thumbnail}`}
                  alt="게임랭크 이미지"
                  unoptimized={true}
                />
              </div>
              <div className={styles.info}>
                <span className={styles.crown}>
                  {i < 3 && (
                    <Image
                      src={crownSrc}
                      alt={`${i + 1}위 왕관`}
                      width={25} // 이미지의 적절한 크기 설정
                      height={25}
                    />
                  )}
                </span>
                <span className={styles.name}>{e.title}</span>
                <span className={styles.count}>
                  누적플레이 수 {e.cumulativeCount}회
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
