'use client';

import { getRecommendInfo } from '@/api/apis/mypageApis';
import { useEffect, useState, ChangeEvent } from 'react';
import styles from './recommendThree.module.scss';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

// IRecommendInfo 타입 정의
interface IRecommendInfo {
  id: number;
  title: string;
  thumbnail: string;
  minPlaytime: number;
  maxPlaytime: number;
  genres: string[];
}

export default function Recommend() {
  const [recommendInfo, setRecommendInfo] = useState<IRecommendInfo[]>([]);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const cloud = process.env.NEXT_PUBLIC_CLOUDFRONT_DOMAIN;
  const router = useRouter();

  useEffect(() => {
    const fetchRecommendInfo = async () => {
      try {
        const res = await getRecommendInfo('THREE');
        setRecommendInfo(res.data);
      } catch (err) {
        // console.log(err);
      }
    };
    fetchRecommendInfo();
  }, []);

  const handleSearch = () => {
    if (searchQuery.trim()) {
      router.push(`/recommendSearch?query=${encodeURIComponent(searchQuery)}`);
    }
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  return (
    <div className={styles.recoWrap}>
      <div className={styles.searchBar}>
        <input
          type="text"
          placeholder={'보드게임 이름으로 전체검색 해보세요!'}
          value={searchQuery}
          onChange={handleChange}
          onKeyPress={e => {
            if (e.key === 'Enter') {
              handleSearch();
            }
          }}
        />
        <button onClick={handleSearch}>
          <Image
            width={24}
            height={24}
            src={'/assets/icons/search.svg'}
            alt=""
          />
        </button>
      </div>
      <div className={styles.recoTabWrap}>
        <Link href="/recommend">2인 게임</Link>
        <Link href="/recommendThree" className={styles.on}>
          3인 게임
        </Link>
        <Link href="/recommendMany">다인용 게임</Link>
        <Link href="/recommendAll">전체</Link>
      </div>
      <div className={styles.recoListWrap}>
        {recommendInfo.map((e, i) => (
          <div className={styles.recoItem} key={i}>
            <div className={styles.img}>
              <Image
                width={555}
                height={555}
                src={`https://${cloud}/${e.thumbnail}`}
                alt="상황별 추천 게임 이미지"
                unoptimized={true}
              />
            </div>
            <h1 className={styles.title}>{e.title}</h1>
            <div className={styles.info}>
              <span className={styles.person}>
                <Image
                  width={20}
                  height={20}
                  src={'/assets/icons/user.svg'}
                  alt=""
                />
                2명
              </span>
              <span className={styles.time}>
                <Image
                  width={12}
                  height={12}
                  src={'/assets/icons/situ_clock.svg'}
                  alt=""
                />
                {e.minPlaytime}분~{e.maxPlaytime}분
              </span>
            </div>
            <div className={styles.category}>
              {e.genres.map((genre, genreI) => (
                <span key={genreI}>{genre}</span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
