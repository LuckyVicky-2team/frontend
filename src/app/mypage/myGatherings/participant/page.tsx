'use client';
import { useState, useEffect } from 'react';
import {
  getPersonalGatherings,
  getPersonalInfoMyGatherings,
} from '@/api/apis/mypageApis';
import styles from '../myGatherings.module.scss';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import OutModal from '../_components/outModal';
import DeleteModal from '../_components/deleteModal';

// 인터페이스 이름을 I로 시작하도록 수정
interface IGathering {
  meetingId: string;
  title: string;
  detailAddress: string;
  meetingDatetime: string;
  currentParticipant: number;
  limitParticipant: number;
  imageUrl: string;
  thumbnail: string;
  writerId: string | number;
}

export default function Finish() {
  const [gatherings, setGatherings] = useState<IGathering[]>([]);
  const [checkMyId, setCheckMyId] = useState<string | number>(0);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [modal, setModal] = useState<boolean>(false);
  const [deleteModal, setDeleteModal] = useState<boolean>(false);
  const [selectedMeetingId, setSelectedMeetingId] = useState<string | null>(
    null
  );
  const [selectedMeetingTitle, setSelectedMeetingTitle] = useState<
    string | null
  >(null);
  const router = useRouter();
  const cloud = process.env.NEXT_PUBLIC_CLOUDFRONT_DOMAIN;

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);

    // 연도, 월, 일, 시, 분 추출
    const year = date.getFullYear();
    const month = date.getMonth() + 1; // 월은 0부터 시작하므로 1을 더해줍니다.
    const day = date.getDate();
    const hours = date.getHours();
    const minutes = date.getMinutes();

    // 포맷된 문자열 반환
    return `${year}년 ${month}월 ${day}일 ${hours}시 ${minutes}분`;
  };
  // 모임 목록에서 특정 모임 제거 함수 추가
  const removeMeetingFromList = (meetingId: string) => {
    setGatherings(prevGatherings =>
      prevGatherings.filter(gathering => gathering.meetingId !== meetingId)
    );
  };

  useEffect(() => {
    const fetchGatherings = async () => {
      try {
        const response = await getPersonalGatherings('PARTICIPANT');
        if (Array.isArray(response.data)) {
          setGatherings(response.data);
        } else {
          setGatherings([]); // 빈 배열로 설정
        }
      } catch (err) {
        setError('모임을 불러오는 중 오류가 발생했습니다.');
        // console.error('Error fetching gatherings:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchGatherings();
  }, []);

  useEffect(() => {
    const fetchPersonalInfoMyGatherings = async () => {
      try {
        const response = await getPersonalInfoMyGatherings();
        setCheckMyId(response.data);
      } catch (err) {
        setError('모임을 불러오는 중 오류가 발생했습니다.');
        // console.error('Error fetching gatherings:', err);
      }
    };

    fetchPersonalInfoMyGatherings();
  }, []);

  const openModal = (id: string, title: string) => {
    setSelectedMeetingId(id);
    setSelectedMeetingTitle(title);
    setModal(true);
  };

  const handleModalClose = () => {
    setModal(false);
    setSelectedMeetingId(null);
    setSelectedMeetingTitle(null);
  };

  const openDeleteModal = (id: string, title: string) => {
    setSelectedMeetingId(id);
    setSelectedMeetingTitle(title);
    setDeleteModal(true);
  };

  const handleDeleteModalClose = () => {
    setDeleteModal(false);
    setSelectedMeetingId(null);
    setSelectedMeetingTitle(null);
  };

  if (loading) return <p>로딩 중...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div className={styles.myGatheringsListWrap}>
      {modal === true && selectedMeetingId && selectedMeetingTitle ? (
        <OutModal
          meetingId={selectedMeetingId}
          meetingTitle={selectedMeetingTitle}
          handleModalClose={handleModalClose}
          removeMeeting={removeMeetingFromList} // 전달
        />
      ) : null}
      {deleteModal === true && selectedMeetingId && selectedMeetingTitle ? (
        <DeleteModal
          meetingId={selectedMeetingId}
          meetingTitle={selectedMeetingTitle}
          handleModalClose={handleDeleteModalClose}
          removeMeeting={removeMeetingFromList} // 전달
        />
      ) : null}

      <div className={styles.tabBtn2}>
        <Link href="participant" className={styles.on}>
          참여중 모임
        </Link>
        <Link href="finish">종료된 모임</Link>
        <Link href="create">내가만든 모임</Link>
      </div>

      {gatherings.length === 0 ? (
        <div className={styles.noMyGatheringsList}>
          <h1>
            <Image
              width={62}
              height={62}
              src={'/assets/myPageImages/logoGray.png'}
              alt="리스트 없을 때 로고"
            />
          </h1>
          <h2>BOGO</h2>
          <p>
            참여중인 모임이 없어요! <br />
            모임을 둘러보면서 <br />
            다양한 게임들을 경험해보세요!
          </p>
          <Link href="/">다양한 모임 둘러보기</Link>
        </div>
      ) : (
        gatherings.map(gathering => (
          <div className={styles.myGathdringsItem} key={gathering.meetingId}>
            <div
              className={styles.img}
              onClick={() => {
                router.push(`/gatherings/${gathering?.meetingId}`);
              }}>
              <Image
                src={
                  `https://${cloud}/${gathering?.thumbnail}` ||
                  '/assets/mainImages/game.png'
                } // Use imageUrl if available
                alt="참여 중 모임 썸네일"
                width={150}
                height={200}
                unoptimized={true}
                onError={e => {
                  e.currentTarget.src = '/assets/images/emptyThumbnail.png';
                }}
              />
            </div>
            <div className={styles.info}>
              <h1
                onClick={() => {
                  router.push(`/gatherings/${gathering?.meetingId}`);
                }}>
                {gathering.title}
              </h1>
              <b>{gathering.detailAddress}</b>
              <p>
                <span className={styles.time}>
                  {formatDate(gathering.meetingDatetime)}
                </span>
                <span className={styles.person}>
                  <Image
                    src="/assets/myPageImages/person.svg"
                    alt="인원 아이콘"
                    width={18}
                    height={18}
                  />
                  {gathering.currentParticipant}/{gathering.limitParticipant}
                </span>
              </p>

              <div className={styles.outBtn}>
                {gathering?.writerId === checkMyId ? (
                  <button
                    onClick={() => {
                      openDeleteModal(gathering?.meetingId, gathering?.title);
                    }}>
                    모임 삭제하기
                  </button>
                ) : (
                  <button
                    onClick={() => {
                      openModal(gathering?.meetingId, gathering?.title);
                    }}>
                    모임 나가기
                  </button>
                )}
              </div>
            </div>
          </div>
        ))
      )}
    </div>
  );
}
