'use client';
import React from 'react';
import Image from 'next/image';
import { useParams } from 'next/navigation';
import { useFilteredRecommendGames } from '@/hooks/usefilterRecommendedGames';
import { IRecommendInfo } from '@/hooks/usefilterRecommendedGames';
import styles from './RecommendCategory.module.scss';
import Skeleton from '../_components/skeleton';

export default function RecommendCategory() {
  const { category } = useParams();

  const cloud = process.env.NEXT_PUBLIC_CLOUDFRONT_DOMAIN;
  const { filteredGames, isPending } = useFilteredRecommendGames(
    category as string
  );

  return (
    <div className={styles.recoWrap}>
      {isPending ? (
        <Skeleton recommendInfo={filteredGames} />
      ) : (
        <div className={styles.recoListWrap}>
          {filteredGames.length > 0 ? (
            filteredGames.map((game: IRecommendInfo, idx: number) => (
              <div key={idx} className={styles.recoItem}>
                <div className={styles.img}>
                  <Image
                    width={555}
                    height={555}
                    src={`https://${cloud}/${game.thumbnail}`}
                    alt="상황별 추천 게임 이미지"
                    unoptimized={true}
                  />
                </div>
                <h1 className={styles.title}>{game.title}</h1>
                <div className={styles.info}>
                  <span className={styles.person}>
                    <Image
                      width={20}
                      height={20}
                      src={'/assets/icons/user.svg'}
                      alt=""
                    />
                    {game?.minPeople}명 ~ {game?.maxPeople}명
                  </span>
                  <span className={styles.time}>
                    <Image
                      width={12}
                      height={12}
                      src={'/assets/icons/situ_clock.svg'}
                      alt=""
                    />
                    {game.minPlaytime}분~{game.maxPlaytime}분
                  </span>
                </div>
                <div className={styles.category}>
                  {game.genres.map((genre, idx) => (
                    <span key={idx}>{genre}</span>
                  ))}
                </div>
              </div>
            ))
          ) : (
            <p className={styles.noResults}>
              {`"${decodeURIComponent(category as string)}"`}에 맞는 게임 검색
              결과가 없습니다. <br />
              게임 이름을 다시 확인해주세요!
            </p>
          )}
        </div>
      )}
    </div>
  );
}
