import Image from 'next/image';
import parse from 'html-react-parser';
import ProfileImages from '../ProfileImages';
// import { useGatheringDetails } from '@/api/queryHooks/gathering';

export default function GatheringDetails() {
  // const { data } = useGatheringDetails();
  // void data;
  const data = {
    title: '장기두실 분',
    image: '/assets/images/rectangle.png',
    content: '<p>장기 조아조아</p>',
    address: '서울시 종로구 ~~~~',
    place: '동아빌딩',
    map: '',
    isZzimed: false,
    master: '송은',
    participants: [
      { userId: 1, profileImage: '/assets/images/rectangle.png' },
      { userId: 2, profileImage: '/assets/images/rectangle.png' },
      { userId: 3, profileImage: '/assets/images/rectangle.png' },
      { userId: 4, profileImage: '/assets/images/rectangle.png' },
      { userId: 5, profileImage: '/assets/images/rectangle.png' },
      { userId: 6, profileImage: '/assets/images/rectangle.png' },
    ],
    game: '장기',
    genre: '보드게임',
  };
  const convertedContent = parse(data.content);
  return (
    <div>
      모임 정보
      <div>{data.title}</div>
      <Image
        src={data.image}
        alt="썸네일 이미지"
        priority
        width={100}
        height={100}
      />
      <ProfileImages participants={data.participants} />
      <div>{convertedContent}</div>
      <div>주소 (시/군/구)</div>
      <div>장소</div>
      <div>주소</div>
      <div>지도</div>
      <div>찜하기</div>
      <div>팀장</div>
      <div>팀원 목록</div>
      <div>선택된 게임</div>
      <div>게임 장르</div>
      <div>공유하기</div>
      <div>(마스터) 초대하기</div>
      <div>(마스터) 내보내기</div>
      <div>(멤버) 모임 참여하기</div>
      <div>(마스터) 모임 취소하기</div>
    </div>
  );
}
