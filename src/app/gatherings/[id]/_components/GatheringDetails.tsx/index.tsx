'use client';
import Image from 'next/image';
import parse from 'html-react-parser';
import ProfileImages from '../ProfileImages';
import useModal from '@/hooks/useModal';
import Modal from '@/components/common/Modal';
import { handleCopyClipBoard } from '@/utils/handleCopyClipBoard';
import { usePathname } from 'next/navigation';
// import { useGatheringDetails } from '@/api/queryHooks/gathering';

export default function GatheringDetails() {
  const pathname = usePathname();
  // const { data } = useGatheringDetails();
  // void data;
  const { modalOpen, handleModalOpen, handleModalClose } = useModal();
  const data = {
    title: '장기두실 분',
    image: '/assets/images/rectangle.png',
    content:
      '<p>ddd<span style="color: rgb(230, 0, 0);">장기</span><span style="color: rgb(230, 0, 0); background-color: rgb(255, 194, 102);">dddddd</span><span style="color: rgb(255, 255, 0); background-color: rgb(255, 194, 102);">dddd</span><strong style="color: rgb(255, 255, 0); background-color: rgb(255, 194, 102);">dddd<u>dddd</u></strong></p>',
    address: '서울시 종로구',
    addressDetail: '서울시 종로구 3가길 76-4',
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
  const handleProfileImagesClick = () => {};
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
      <div>{convertedContent}</div>
      <div>{data.address}</div>
      <div>{data.place}</div>
      <div>{data.addressDetail}</div>
      <div>{data.map}</div>
      <div>찜하기</div>
      <div>{data.master}</div>
      <div>팀원 목록</div>
      <ProfileImages
        participants={data.participants}
        onClick={handleProfileImagesClick}
      />
      <div>{data.game}</div>
      <div>{data.genre}</div>
      <div>
        <button type="button" onClick={handleModalOpen}>
          공유하기
        </button>
        <Modal modalOpen={modalOpen} onClose={handleModalClose}>
          <button type="button">카카오로 공유하기</button>
          <button
            type="button"
            onClick={() =>
              handleCopyClipBoard(
                `${process.env.NEXT_PUBLIC_BASE_URL}${pathname}`
              )
            }>
            클립보드 복사하기
          </button>
        </Modal>
      </div>
      <button type="button">(마스터) 내보내기</button>
      <button type="button">(멤버) 모임 참여하기</button>
      <button type="button">(마스터) 모임 삭제하기</button>
    </div>
  );
}
