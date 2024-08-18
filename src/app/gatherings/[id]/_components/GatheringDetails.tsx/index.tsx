'use client';
import parse from 'html-react-parser';
import ProfileImages from '../ProfileImages';
import useModal from '@/hooks/useModal';
import Members from '../Members';
import { useGatheringDetails } from '@/api/queryHooks/gathering';
import styles from './GatheringDetails.module.scss';
import { dateTime } from '@/utils/dateTime';
import Tag from '@/components/common/Tag';
import ShareModal from '../ShareModal';
import Image from 'next/image';

interface IGatheringDetailsProps {
  id: number;
}

export default function GatheringDetails({ id }: IGatheringDetailsProps) {
  const pathname = `/gatherings/${id}`;
  const { data } = useGatheringDetails(Number(id));
  console.log(data);

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

  if (!data) {
    return;
  }

  const convertedContent = parse(data.content);
  console.log(typeof data.meetingDatetime);
  const { formattedDate, formattedTime } = dateTime(data.meetingDatetime);

  return (
    <div>
      <div className={styles.section1}>
        {/* <div style={{ width: '100%', height: '400px', position: 'relative' }}>
        <Image src={data.image} alt="썸네일 이미지" priority fill />
      </div> */}
        <div className={styles.gatheringInfo}>
          <div className={styles.firstGatheringInfo}>
            <div className={styles.firstGatheringInfoContent}>
              <h1 className={styles.title}>{data.title} 모임원 모집</h1>
              <div className={styles.place}>
                <Image
                  src={'/assets/icons/bar-black.svg'}
                  alt={'검은색 선'}
                  width={7}
                  height={28}
                />
                <span>{data.city}</span> <span>{data.county}</span>
              </div>
              <Tag
                borderColor={'none'}
                fontColor={'#ffffff'}
                backgroundColor={'#007AFF'}
                className={`${styles.tag}`}
                closeButton={false}>
                {formattedDate}
              </Tag>
              <Tag
                borderColor={'none'}
                fontColor={'#ffffff'}
                backgroundColor={'#007AFF'}
                className={`${styles.tag}`}
                closeButton={false}>
                {formattedTime}
              </Tag>
              <div>
                <div>모임장</div>
                <div>
                  <Image
                    src={'/assets/icons/person.svg'}
                    alt="사람 이미지"
                    width={16}
                    height={16}
                  />
                  {data.totalParticipantCount}/{data.limitParticipant}
                </div>
              </div>
              <Image
                src={'/assets/icons/ic_check.svg'}
                alt="체크 이미지"
                width={24}
                height={24}
              />
              <div>
                <div>
                  {data.boardGameListResponseList.map(game => {
                    return <div key={game.boardGameId}>{game.title}</div>;
                  })}
                </div>
                <div>
                  {data.genres.map((genre, i) => {
                    return (
                      <Tag key={i} closeButton={false}>
                        {genre}
                      </Tag>
                    );
                  })}
                </div>
              </div>
            </div>
            <div className={styles.firstGatheringInfoIcons}>
              <button className={styles.button} type="button">
                찜하기
              </button>
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
              <ShareModal
                modalOpen={shareModalOpen}
                onClose={handleShareModalClose}
                pathname={pathname}
              />
            </div>
          </div>
          <div className={styles.secondGatheringInfo}>
            <div className={styles.people}>
              <span>모집 정원 {data.totalParticipantCount}명</span>
              <ProfileImages participants={data.userParticipantResponseList} />
            </div>
            <div></div>
            <button type="button" onClick={handleProfileModalOpen}>
              참여자 리스트 보기 ({data.totalParticipantCount}/
              {data.limitParticipant})
            </button>
            <Members
              modalOpen={profileModalOpen}
              onClose={handleProfileModalClose}
              data={data.userParticipantResponseList}
            />
          </div>
        </div>
      </div>
      <div className={styles.section2}>
        <div>{convertedContent}</div>

        {/* <div>{data.place}</div> */}
        {/* <div>{data.addressDetail}</div> */}
        {/* <div>{data.latitude}</div>
      <div>{data.longitude}</div> */}

        <div>{data.userNickName}</div>
      </div>

      <button type="button">(마스터) 내보내기</button>
      <button type="button">(비멤버) 모임 참여하기</button>
      <button type="button">(멤버) 채팅방으로 가기</button>
      <button type="button">
        (마스터) 모임 삭제하기+ 채팅방으로 가기+ 모집 완료
      </button>
    </div>
  );
}
