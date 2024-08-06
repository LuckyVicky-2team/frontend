import Image from 'next/image';

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
      <div>(마스터) 초대하기</div>
      <div>(마스터) 내보내기</div>
      <div>(멤버) 모임 참여하기</div>
      <div>(마스터) 모임 취소하기</div>
    </div>
  );
}
