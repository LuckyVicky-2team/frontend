'use client';
import parse from 'html-react-parser';
import ProfileImages from '../ProfileImages';
import useModal from '@/hooks/useModal';
import Members from '../Members';
import {
  useGatheringDetails,
  useGetIsUserTypeQuit,
} from '@/api/queryHooks/gathering';
import styles from './GatheringDetails.module.scss';
import { dateTime } from '@/utils/dateTime';
import Tag from '@/components/common/Tag';
import ShareModal from '../ShareModal';
import Image from 'next/image';
import ProfileImage from '@/components/common/ProfileImage';
import GatheringFooter from '../Footer';
import { useToast } from '@/contexts/toastContext';
import { useEffect, useState } from 'react';
import { useMe } from '@/api/queryHooks/me';
import SaveGatheringButton from '@/components/common/SaveGatheringButton';
import KakaoMap from '@/components/common/FindPlaceModal/KakaoMap';
import Link from 'next/link';
import GifToMp4 from '@/utils/gifToMp4';
import useScreenWidth from '@/hooks/useScreenWidth';
// import { IParticipant } from '@/types/response/Gathering';

interface IGatheringDetailsProps {
  id: number;
  open: string;
}

export default function GatheringDetails({ id, open }: IGatheringDetailsProps) {
  const { addToast } = useToast();
  // const [savedItem, setSaveItem] = useSaveItemState();
  // const isSaved = savedItem?.includes(id);
  const pathname = `/gatherings/${id}`;
  const { data, isError, refetch } = useGatheringDetails(Number(id));
  const { data: isUserTypeQuitData } = useGetIsUserTypeQuit(
    data?.meetingId || 0
  );
  const { data: dataMe, isError: isErrorMe, isPending: isPendingMe } = useMe();
  const [participantCount, setParticipantCount] = useState<number>(
    data?.totalParticipantCount || 0
  );
  const { screenWidth, isMobile } = useScreenWidth(480);
  const {
    modalOpen: shareModalOpen,
    handleModalOpen: handleShareModalOpen,
    handleModalClose: handleShareModalClose,
  } = useModal();
  const {
    modalOpen: profileModalOpen,
    handleModalOpen: handleProfileModalOpen,
    handleModalClose: handleProfileModalClose,
  } = useModal();

  useEffect(() => {
    if (isError || isErrorMe) {
      addToast('에러가 발생했습니다.', 'error');
    }
  }, [isError]);

  useEffect(() => {
    if (data) {
      setParticipantCount(data.totalParticipantCount);
    }
  }, [data, setParticipantCount]);

  if (!data) return;

  const convertedContent = parse(data.content);
  const { formattedDate, formattedTime } = dateTime(data.meetingDatetime);

  let myType = data.userParticipantResponseList.find(participant => {
    return participant.userId === dataMe;
  })?.type;

  if (!dataMe) {
    myType = 'NONE';
  }

  if (dataMe && isUserTypeQuitData?.data.outState === 'OUT') {
    myType = 'QUIT';
  }

  //참여자 mockdata
  // const participants: IParticipant[] = Array.from(
  //   { length: 12 },
  //   (_, i) => i + 1
  // ).map(i => {
  //   if (i === 1) {
  //     return {
  //       userId: i,
  //       profileImage: '',
  //       nickname: '알러뷰',
  //       type: 'LEADER',
  //     };
  //   }
  //   return {
  //     userId: i,
  //     profileImage: '',
  //     nickname: '알러뷰ㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇ',
  //     type: 'PARTICIPANT',
  //   };
  // });

  const LeaderID = data.userParticipantResponseList.find(p => {
    return p.type === 'LEADER';
  })?.userId;

  return (
    <div style={{ margin: '60px 0 120px' }}>
      <div className={styles.section1}>
        <div className={styles.thumbnailBackground}>
          {data.thumbnail ? (
            <GifToMp4
              url={`https://${
                process.env.NEXT_PUBLIC_CLOUDFRONT_DOMAIN
              }/${data.thumbnail}`}
            />
          ) : (
            <Image
              src={'/assets/images/detail-image-default.png'}
              alt="썸네일 이미지"
              priority
              fill
              objectFit="contain"
              quality={50}
              loading="eager"
            />
          )}
        </div>
        <div className={styles.gatheringInfo}>
          <div className={styles.firstGatheringInfo}>
            <div className={styles.firstGatheringInfoContent}>
              <h1 className={styles.title}>{data.title} 모임원 모집</h1>
              {isMobile && (
                <div style={{ display: 'flex', margin: '10px 0 0' }}>
                  <SaveGatheringButton
                    id={id}
                    type="default"
                    size={'medium'}
                    isInitialSaved={data.likeStatus}
                  />
                  <button
                    className={styles.shareButton}
                    type="button"
                    onClick={handleShareModalOpen}
                    style={{
                      width: '32px',
                      height: '32px',
                      marginLeft: '4px',
                    }}>
                    <Image
                      src={'/assets/icons/share-2.svg'}
                      alt="공유하기 버튼"
                      priority
                      width={16}
                      height={16}
                    />
                  </button>
                </div>
              )}
              <div className={styles.place}>
                <Image
                  src={'/assets/icons/bar-black.svg'}
                  alt={'검은색 선'}
                  width={isMobile ? 5 : 7}
                  height={isMobile ? 20 : 28}
                />
                <span style={{ fontSize: isMobile ? '12px' : '16px' }}>
                  {data.city}
                </span>{' '}
                <span style={{ fontSize: isMobile ? '12px' : '16px' }}>
                  {data.county}
                </span>
              </div>
              <div className={styles.dateAndTime}>
                <Tag
                  borderColor={'none'}
                  fontColor={'#ffffff'}
                  backgroundColor={'#007AFF'}
                  className={`${styles.tag}`}
                  enableDelete={false}
                  size={isMobile ? 'small' : 'large'}>
                  {formattedDate}
                </Tag>
                <Tag
                  borderColor={'none'}
                  fontColor={'#ffffff'}
                  backgroundColor={'#007AFF'}
                  className={`${styles.tag}`}
                  enableDelete={false}
                  size={isMobile ? 'small' : 'large'}>
                  {formattedTime}
                </Tag>
              </div>
              <div className={styles.badge}>
                <div style={{ display: 'flex', alignItems: 'center' }}>
                  <Image
                    src={'/assets/icons/award.svg'}
                    alt="뱃지 이미지"
                    width={16}
                    height={16}
                  />
                  {data.userNickName}
                </div>
                <div style={{ display: 'flex', alignItems: 'center' }}>
                  <Image
                    src={'/assets/icons/person.svg'}
                    alt="사람 이미지"
                    width={16}
                    height={16}
                  />
                  {data.totalParticipantCount}/{data.limitParticipant}
                </div>
                조회수 {data.viewCount}
              </div>
              <div className={styles.games}>
                <Image
                  src={'/assets/icons/ic_check.svg'}
                  alt="체크 이미지"
                  width={24}
                  height={24}
                />
                <div
                  style={{
                    display: 'flex',
                    columnGap: '11px',
                    flexWrap: 'wrap',
                  }}>
                  {data.boardGameListResponseList.map(game => {
                    return <div key={game.boardGameId}>{game.title}</div>;
                  })}
                </div>
              </div>
              <div className={styles.genres}>
                {data.genres.map((genre, i) => {
                  if (genre === '' || genre === '정보없음') return;
                  return (
                    <Tag
                      key={i}
                      enableDelete={false}
                      size={isMobile ? 'small' : 'large'}>
                      {genre}
                    </Tag>
                  );
                })}
              </div>
            </div>
            {isMobile || (
              <div className={styles.firstGatheringInfoIcons}>
                <SaveGatheringButton id={id} type="default" size={'large'} />
                <button
                  className={styles.shareButton}
                  type="button"
                  onClick={handleShareModalOpen}>
                  <Image
                    src={'/assets/icons/share-2.svg'}
                    alt="공유하기 버튼"
                    priority
                    width={24}
                    height={24}
                  />
                </button>
              </div>
            )}
          </div>
          <ShareModal
            modalOpen={shareModalOpen}
            onClose={handleShareModalClose}
            pathname={pathname}
            shareCount={data.shareCount}
            isMobile={isMobile}
            meetingId={data.meetingId}
          />
          <div className={styles.stroke}>
            <Image alt="점선" src={'/assets/icons/stroke.svg'} fill />
          </div>
          <div className={styles.secondGatheringInfo}>
            <div className={styles.people}>
              <span className={styles.totalParticipantCount}>
                모집 정원 {data.totalParticipantCount}명
              </span>
              <ProfileImages participants={data.userParticipantResponseList} />
            </div>
            <div className={styles.progressBarBackground}>
              <div
                className={styles.progressBar}
                style={{
                  width: `${(participantCount * 100) / data.limitParticipant}%`,
                }}
              />
            </div>
            <div className={styles.progressBarDescription}>
              <p>최소 인원 2명</p>
              <p>최대 인원 {data.limitParticipant}명</p>
            </div>
            <button
              type="button"
              onClick={handleProfileModalOpen}
              className={styles.memberListButton}>
              참여자 리스트 보기 ({participantCount}/{data.limitParticipant})
            </button>
            <Members
              meetingId={data.meetingId}
              modalOpen={profileModalOpen}
              onClose={handleProfileModalClose}
              onOpen={handleProfileModalOpen}
              data={{
                userParticipantResponseList: data.userParticipantResponseList,
                meetingState: data.state,
              }}
              isMobile={isMobile}
              myType={myType}
              bottomSheetOpen={open}
            />
          </div>
        </div>
      </div>
      <div className={styles.section2}>
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: isMobile ? '20px' : '35px',
          }}>
          <Image
            src={'/assets/icons/vector-252.svg'}
            alt="세로줄"
            width={4}
            height={isMobile ? 36 : 60}
          />
          <h1 className={styles.title2}>{data.title} 모임원 모집</h1>
        </div>
        <div className={styles.convertedContent}>{convertedContent}</div>
      </div>
      {(myType === 'LEADER' || myType === 'PARTICIPANT') && (
        <div className={styles.section3}>
          <h2 className={styles.h2}>위치 정보</h2>
          <p className={styles.h2Description}>이쪽에서 모임이 진행됩니다.</p>
          <div className={styles.kakaoMap}>
            <KakaoMap
              coordinate={{
                lat: String(data?.latitude),
                lon: String(data?.longitude),
              }}
              placeName={data.locationName}
              address={data.detailAddress}
              mapLatio={`${screenWidth / 320}`}
              isMobile={isMobile}
              page="detail"
            />
          </div>
        </div>
      )}
      <div className={styles.section4}>
        <h2 className={styles.h2}>모임장 정보</h2>
        <p className={styles.h2Description}>모임장님은 이런 분이세요!</p>
        <Link
          href={`/other-profile/${LeaderID}?id=${data.meetingId}&open=zero`}
          className={styles.leaderProfile}
          style={{
            height: `max(80px,${(screenWidth * 130) / 600}px)`,
            marginTop: `clamp(8px, ${(screenWidth * 19) / 600}px, 20px)`,
          }}>
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              height: '90px',
            }}>
            <ProfileImage
              url={
                data.userParticipantResponseList.find(
                  participant => participant.type === 'LEADER'
                )?.profileImage
              }
              width={screenWidth > 600 ? 56 : (screenWidth * 56) / 600}
              height={screenWidth > 600 ? 56 : (screenWidth * 56) / 600}
            />
          </div>
          <div
            className={styles.leaderDescription}
            style={{ gap: screenWidth > 500 ? '8px' : '' }}>
            <div
              className={styles.userNickname}
              style={{
                fontSize: `clamp(16px, ${(screenWidth * 24) / 600}px, 24px)`,
              }}>
              {data.userNickName}
            </div>
            <div
              className={styles.rating}
              style={{
                fontSize: `clamp(12px, ${(screenWidth * 16) / 600}px, 16px)`,
              }}>
              평점 {data.rating}점
            </div>
            <div
              className={styles.gatheringCount}
              style={{
                fontSize: `clamp(12px, ${(screenWidth * 16) / 600}px, 16px)`,
              }}>
              운영 모임 {data.userWritingCount}회
            </div>
          </div>
          <Image
            src={'/assets/icons/chevron-right-blue.svg'}
            alt="오른쪽 화살표"
            width={36}
            height={90}
          />
        </Link>
      </div>
      <GatheringFooter
        id={id}
        title={data.title}
        type={myType}
        meetingDatetime={data.meetingDatetime}
        // FREE or ACCEPT
        // gatheringType={data.type}
        participantCount={data.totalParticipantCount}
        setParticipantCount={setParticipantCount}
        limitParticipant={data.limitParticipant}
        isInitialSaved={data.likeStatus}
        state={data.state}
        refetch={refetch}
        isPendingMe={isPendingMe}
      />
    </div>
  );
}
