import ChattingRoom from '../_components/ChattingRoom';
import styles from './ThreadDetailPage.module.scss';

interface IThreadDetailPageProps {
  params: { [key: string]: string };
  searchParams: { [key: string]: string };
}

export default function ThreadDetailPage({
  params,
  searchParams,
}: IThreadDetailPageProps) {
  console.log(searchParams);

  return (
    <main className={styles.container}>
      {/* <GatheringInfoOfThread
        thumbnail={gatheringInfo.thumbnail}
        title={gatheringInfo.title}
        description={gatheringInfo.content}
        place={`${gatheringInfo.city} ${gatheringInfo.county}`}
        meetingId={gatheringInfo.meetingId}
        participants={gatheringInfo.userParticipantResponseList}
        className={styles.gatheringInfo}
      /> */}
      <ChattingRoom chatRoomId={+params.chatRoomId} />
    </main>
  );
}
