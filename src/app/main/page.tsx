'use client';
import React, { useRef, useEffect } from 'react';
import RecommendCase from './_components/RecommendCase';
import DeadLineGather from './_components/DeadLineGather';
import MainNav from './_components/MainNav/MainNav';
import GameRank from './_components/gameRank';
import styles from './main.module.scss';
import { getMeetingList } from '@/api/apis/mypageApis';
import { usePostWishList } from '@/api/queryHooks/wishList';
import NewGather from './_components/newGather';
import MainSearch from './_components/mainSearch';
import AppInstallPrompt from '@/components/common/AppInstallPrompt';
import { handleAllowNotification } from '@/service/notificationPermission';
import { setUser } from '@sentry/nextjs';
import { getPersonalInfo } from '@/api/apis/mypageApis';
import { app } from '@/service/initFirebase';
import FCMDisabledPrompt from '@/components/common/FCMDisabledPrompt';
import { useInApp } from '@/hooks/useInApp';
import { useQuery } from '@tanstack/react-query';

// Meeting 타입 정의
interface IMeeting {
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

// API 응답 타입
interface IMeetingProps {
  content: IMeeting[];
}

export default function Main() {
  const deadlineRef = useRef<HTMLDivElement>(null);
  const popularRef = useRef<HTMLDivElement>(null);
  const token = localStorage.getItem('accessToken');
  const isVerifiedUser = localStorage.getItem('isVerifiedUser');
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
  const {
    data: meetingListInfo,
    // isLoading,
    refetch,
  } = useQuery<IMeetingProps | null>({
    queryKey: ['meetingList'],
    queryFn: async () => {
      try {
        const response = await getMeetingList();
        // console.log('API 응답:', response); // 응답 로깅
        return response.data;
      } catch (error) {
        return null; // 에러 시 null 반환
      }
    },
    staleTime: 5 * 60 * 1000, // 5분으로 설정 (밀리초 단위)
  });

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
            {meetingListInfo?.content && (
              <NewGather
                meetingList={meetingListInfo.content}
                refetch={refetch}
              />
            )}
          </div>
          <div className={styles.contentContainer} ref={deadlineRef}>
            {meetingListInfo?.content && (
              <DeadLineGather
                meetingList={meetingListInfo.content}
                refetch={refetch}
              />
            )}
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
