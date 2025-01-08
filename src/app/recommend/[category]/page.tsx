'use client';
import React from 'react';
import Image from 'next/image';
import { useParams, useSearchParams } from 'next/navigation';
import { IRecommendInfo } from '../_components/skeleton';
import styles from './RecommendCategory.module.scss';
import Skeleton from '../_components/skeleton';
import { useRecommendGameList } from '@/api/queryHooks/game';

export default function RecommendCategory() {
  const { category } = useParams();
  const params = useSearchParams();
  const searchWord = params.get('searchWord');

  const cloud = process.env.NEXT_PUBLIC_CLOUDFRONT_DOMAIN;

  const typeParams = category.toString().toUpperCase();

  const { data, isPending } = useRecommendGameList(typeParams);

  // 필터링 로직 추가
  const filteredGames =
    searchWord && data
      ? /* eslint-disable indent */
        data.filter(
          (game: IRecommendInfo) =>
            game.title.includes(searchWord) || // 제목에 검색어 포함 여부 확인
            game.genres.some(genre => genre.includes(searchWord)) // 장르에 검색어 포함 여부 확인
        )
      : data;

  return (
    <div className={styles.recoWrap}>
      {isPending ? (
        <Skeleton recommendInfo={filteredGames || []} />
      ) : (
        <div className={styles.recoListWrap}>
          {filteredGames.length > 0 ? (
            filteredGames.map((game: IRecommendInfo, idx: number) => (
              <div key={idx} className={styles.recoItem}>
                <div className={styles.img}>
                  <Image
                    src={`https://${cloud}/${game.thumbnail}`}
                    alt="상황별 추천 게임 이미지"
                    loading={'lazy'}
                    width={157}
                    height={228}
                    quality={75}
                    sizes="(max-width: 430px) 20vw, 120px"
                  />
                </div>
                <h1 className={styles.title}>{game.title}</h1>
                <div className={styles.info}>
                  <span className={styles.person}>
                    <Image
                      width={20}
                      height={20}
                      src={'/assets/icons/user.svg'}
                      alt="user-icon"
                      quality={50}
                    />
                    {game?.minPeople}명 ~ {game?.maxPeople}명
                  </span>
                  <span className={styles.time}>
                    <Image
                      width={12}
                      height={12}
                      src={'/assets/icons/situ_clock.svg'}
                      alt="clock-icon"
                      quality={50}
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
              {`"${searchWord}"`}에 맞는 게임 검색 결과가 없습니다. <br />
              게임 이름을 다시 확인해주세요!
            </p>
          )}
        </div>
      )}
    </div>
  );
}
