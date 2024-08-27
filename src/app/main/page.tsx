'use client';
import React from 'react';
import RecommendCase from './_components/RecommendCase';
import GenreGather from './_components/GenreGather';
import DeadLineGather from './_components/DaedLineGather';
import MainNav from './_components/MainNav/MainNav';
import GameRank from './_components/gameRank';
import styles from './main.module.scss';
import { getMeetingList } from '@/api/apis/mypageApis';
import { useEffect, useRef, useState } from 'react';
import { getTokenFromCookie } from '@/actions/AuthActions';
import { usePostWishList } from '@/api/queryHooks/wishList';

// Meeting 타입 정의
interface IMeetingProps {
  id: number;
  title: string;
  city: string;
  county: string;
  thumbnail: string;
  meetingDate: string;
  participantCount: number;
  limitParticipant: number;
  nickName: string;
  likeStatus: string;
  viewCount: number;
  games: string[];
  tags: string[];
}

export default function Main() {
  const [meetingList, setMeetingList] = useState<IMeetingProps[] | undefined>(
    undefined
  );

  const deadlineRef = useRef<HTMLDivElement>(null);
  const popularRef = useRef<HTMLDivElement>(null);

  const { mutate: likeMutate } = usePostWishList();

  useEffect(() => {
    const transferToken = async () => {
      const token = await getTokenFromCookie();
      if (token) {
        localStorage.setItem('accessToken', `Bearer ${token}`);
      }
    };
    transferToken();
  }, []);

  useEffect(() => {
    if (localStorage.getItem('savedGatherings')) {
      const likeList = JSON.parse(
        localStorage.getItem('savedGatherings')!
      ).value;

      likeMutate([...likeList], {
        onSettled: () => {
          localStorage.removeItem('savedGatherings');
        },
      });
    }
  }, []);

  useEffect(() => {
    const fetchMeetingList = async () => {
      try {
        const res = await getMeetingList();
        setMeetingList(res.data.content);
      } catch (error) {}
    };

    fetchMeetingList();
  }, []);

  const scrollToSection = (
    ref: React.RefObject<HTMLDivElement>,
    offset: number
  ) => {
    if (ref.current) {
      const topPosition = ref.current.offsetTop - offset;
      window.scrollTo({ top: topPosition, behavior: 'smooth' });
    }
  };

  return (
    <main>
      <div className={styles.container}>
        <div className={styles.banner}>
          <h2>
            <span>BOGO</span>
            <span>OPEN !!</span>
          </h2>
          <p>보드게임, 같이 할래요?</p>
        </div>
        <div className={styles.searchBarWrap}>
          <div className={styles.searchBar}>
            <input
              type="text"
              placeholder={'나에게 딱! 맞는 모임을 추천해주세요'}
            />
          </div>
        </div>
        <div className={styles.contentContainer}>
          <MainNav
            scrollToSection={scrollToSection}
            deadlineRef={deadlineRef}
            popularRef={popularRef}
          />
        </div>
        <div className={styles.contentContainerWrap}>
          <div className={styles.contentContainer}>
            <RecommendCase />
          </div>
          <div className={styles.contentContainer} ref={popularRef}>
            <GenreGather meetingList={meetingList} />
          </div>
          <div className={styles.contentContainer} ref={deadlineRef}>
            <DeadLineGather meetingList={meetingList} />
          </div>
          <div className={styles.contentContainer}>
            <GameRank />
          </div>
        </div>
      </div>
    </main>
  );
}
