import axios from 'axios';
import Image from 'next/image';

interface IGatheringsInfoResponseProps {
  title: string;
  content: string;
  address: string;
  place: string;
  map: string;
  isZzimed: boolean;
  owner: string;
  member: string;
  game: string;
  genre: string;
}

const getGatheringsInfo = async () => {
  const data = await axios.get<IGatheringsInfoResponseProps>('');
  return data;
};

void getGatheringsInfo;

export default function GatheringsInfo() {
  return (
    <div>
      모임 정보
      <div>제목</div>
      <Image src="/assects/rectangle.png" alt="썸네일 이미지" priority />
      <div>내용</div>
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
