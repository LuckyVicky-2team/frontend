'use client';
import React, { useState, useRef, useEffect } from 'react';
import RecommendCase from './_components/RecommendCase';
import DeadLineGather from './_components/DaedLineGather';
import MainNav from './_components/MainNav/MainNav';
import GameRank from './_components/gameRank';
import { getMeetingList } from '@/api/apis/mypageApis';
import { usePostWishList } from '@/api/queryHooks/wishList';
import NewGather from './_components/newGather/page';
import MainSearch from './_components/mainSearch';
import AppInstallPrompt from '@/components/common/AppInstallPrompt';
import { handleAllowNotification } from '@/service/notificationPermission';
import { setUser } from '@sentry/nextjs';
import { getPersonalInfo } from '@/api/apis/mypageApis';
import { app } from '@/service/initFirebase';
import FCMDisabledPrompt from '@/components/common/FCMDisabledPrompt';
import { useInApp } from '@/hooks/useInApp';
import styles from './main.module.scss';

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
  const isClient = typeof window !== 'undefined';

  const token = isClient && localStorage.getItem('accessToken');
  const isVerifiedUser = isClient && localStorage.getItem('isVerifiedUser');
  const isInApp = useInApp();

  const { mutate: likeMutate } = usePostWishList();

  const SentrySetUserInfo = async () => {
    try {
      const personalInfo = await getPersonalInfo();
      const { email, nickName } = personalInfo.data;
      setUser({
        email,
        username: nickName,
      });

      localStorage.setItem('isVerifiedUser', 'true');
    } catch (error) {
      console.error('Sentry Can"t set user info :', error);
    }
  };

  useEffect(() => {
    if (!token) return;
    if (token && !isVerifiedUser) {
      SentrySetUserInfo();
    }
  }, [token, isVerifiedUser]);

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

  useEffect(() => {
    const token = localStorage.getItem('accessToken');
    const notification = localStorage.getItem('notification');
    if (token && !notification && app) {
      handleAllowNotification();
      localStorage.setItem('notification', 'true');
    }
  }, []);

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
          <MainSearch />
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
            {/* <GenreGather meetingList={meetingList} /> */}
            <NewGather meetingList={meetingList} />
          </div>
          <div className={styles.contentContainer} ref={deadlineRef}>
            <DeadLineGather meetingList={meetingList} />
          </div>
          <div className={styles.contentContainer}>
            <GameRank />
          </div>
        </div>
      </div>
      {isInApp ? <FCMDisabledPrompt /> : <AppInstallPrompt />}
    </main>
  );
}
