'use client';
import parse from 'html-react-parser';
import ProfileImages from '../ProfileImages';
import useModal from '@/hooks/useModal';
import Modal from '@/components/common/Modal';
import { handleCopyClipBoard } from '@/utils/handleCopyClipBoard';
import KakaoShare from '../KakaoShare';
import Members from '../Members';
import { useGatheringDetails } from '@/api/queryHooks/gathering';
import styles from './GatheringDetails.module.scss';
import { dateTime } from '@/utils/dateTime';
import Tag from '@/components/common/Tag';

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
      <div>
        {/* <div style={{ width: '100%', height: '400px', position: 'relative' }}>
        <Image src={data.image} alt="썸네일 이미지" priority fill />
      </div> */}
        <div className={styles.gatheringInfo}>
          <h1 className={styles.title}>{data.title} 모임원 모집</h1>
          <div>
            <span>{data.city}</span>
            <span>{data.county}</span>
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
          <div></div>
        </div>
      </div>
      <div>{convertedContent}</div>

      {/* <div>{data.place}</div> */}
      {/* <div>{data.addressDetail}</div> */}
      {/* <div>{data.latitude}</div>
      <div>{data.longitude}</div> */}
      <div>찜하기</div>
      <div>{data.userNickName}</div>
      <div>팀원 목록</div>
      <ProfileImages participants={data.userParticipantResponseList} />
      <button type="button" onClick={handleProfileModalOpen}>
        참여 멤버
      </button>
      <Members
        modalOpen={profileModalOpen}
        onClose={handleProfileModalClose}
        data={data.userParticipantResponseList}
      />
      <div>
        {data.boardGameListResponseList.map(game => {
          return <div key={game.boardGameId}>{game.title}</div>;
        })}
      </div>
      <div>
        {data.genres.map((genre, i) => {
          return <div key={i}>{genre}</div>;
        })}
      </div>
      <div>
        <button type="button" onClick={handleShareModalOpen}>
          공유하기
        </button>
        <Modal
          modalOpen={shareModalOpen}
          onClose={handleShareModalClose}
          maxWidth={400}
          full>
          <div>
            <KakaoShare path={pathname} likeCount={12} sharedCount={30} />
            <button type="button">카카오로 공유하기</button>
            <button
              type="button"
              onClick={() =>
                handleCopyClipBoard(
                  `${process.env.NEXT_PUBLIC_DEPLOY_URL}${pathname}`
                )
              }>
              클립보드
              복사하기ㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇ
            </button>
          </div>
        </Modal>
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
