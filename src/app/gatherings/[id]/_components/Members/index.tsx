import BottomSheet from '@/components/common/BottomSheet';
import ProfileImage from '@/components/common/ProfileImage';
import { IParticipant } from '@/types/response/Gathering';
import styles from './Members.module.scss';
import Image from 'next/image';
import { useEffect, useRef, useState } from 'react';
import { useToast } from '@/contexts/toastContext';
import { useRouter } from 'next/navigation';
import { useKickParticipant } from '@/api/queryHooks/gathering';

interface IMembersProps {
  modalOpen: boolean;
  onClose: () => void;
  onOpen: () => void;
  data: { userParticipantResponseList: IParticipant[]; meetingState: string };
  isMobile: boolean;
  meetingId: number;
  bottomSheetOpen: string;
  myType: 'LEADER' | 'PARTICIPANT' | 'NONE' | 'QUIT' | undefined;
}

export default function Members({
  modalOpen,
  onClose,
  onOpen,
  data,
  isMobile,
  meetingId,
  bottomSheetOpen,
  myType,
}: IMembersProps) {
  // const buttonRef = useRef<HTMLButtonElement | null>(null);

  const h2Ref = useRef<HTMLUListElement>(null);
  const [isOverflowing, setIsOverflowing] = useState(false);
  const { addToast } = useToast();
  const [kickButtonOn, setKickButtonOn] = useState(false);
  const [isFull, setIsFull] = useState(!!bottomSheetOpen);
  const router = useRouter();
  const kickParticipant = useKickParticipant(meetingId);

  const handleKickButtonClick = (userId: number, userName: string) => {
    kickParticipant.mutate(
      {
        userId,
        meetingId,
        meetingState: data.meetingState,
      },

      {
        onSuccess: () => {
          addToast(`${userName}님을 모임에서 내보냈습니다`, 'success');
        },
        onError: (error: any) => {
          if (error.response.data.errorCode === 400) {
            addToast('내보내기에 실패했습니다', 'error');
          } else {
            addToast(error.response.data.message, 'error');
          }
        },
      }
    );
  };

  const handleGoToOtherProfile = (id: number) => {
    router.push(
      `/other-profile/${id}?id=${meetingId}&open=${isFull ? 'full' : 'half'}`
    );
  };

  useEffect(() => {
    const checkOverflow = () => {
      if (h2Ref.current) {
        const isContentOverflowing =
          h2Ref.current.scrollHeight > h2Ref.current.clientHeight;
        setIsOverflowing(isContentOverflowing);
      }
    };

    checkOverflow();
    window.addEventListener('resize', checkOverflow);

    return () => {
      window.removeEventListener('resize', checkOverflow);
    };
  }, []);

  useEffect(() => {
    setKickButtonOn(myType === 'LEADER');
  }, [myType, setKickButtonOn]);

  return (
    <BottomSheet
      isOpen={modalOpen}
      onOpen={onOpen}
      onClose={onClose}
      full
      setIsFull={setIsFull}
      initialBottomSheetOpen={bottomSheetOpen}>
      <div className={styles.header}>
        <h2 className={styles.title}>
          <Image
            src={'/assets/icons/vector-251.svg'}
            alt="파란색 선"
            width={4}
            height={30}
          />
          참여자
        </h2>
        <button type="button" onClick={onClose}>
          <Image
            src={'/assets/icons/plus-circle.svg'}
            alt="닫기 버튼"
            width={38}
            height={38}
          />
        </button>
      </div>
      <div
        style={{
          height: `calc(100% - 141.14px)`,
          padding: isOverflowing ? '0 33px 0 0' : '',
        }}>
        <ul
          className={styles.profiles}
          style={{
            height: '100%',
            padding: isOverflowing ? '0 33px 0 19px' : '0 19px',
          }}
          ref={h2Ref}>
          {data.userParticipantResponseList.map(participant => {
            return (
              <div key={participant.userId} className={styles.profile}>
                <button
                  className={styles.profilePart1}
                  onClick={() => {
                    handleGoToOtherProfile(participant.userId);
                  }}>
                  <div className={styles.crown}>
                    {participant.type === 'LEADER' && (
                      <Image
                        src={'/assets/icons/crown.svg'}
                        alt="왕관"
                        width={isMobile ? 26 : 34}
                        height={isMobile ? 26 : 32}
                      />
                    )}
                  </div>
                  <div style={{ borderRadius: '50%' }}>
                    <ProfileImage
                      url={participant.profileImage}
                      width={isMobile ? 34 : 56}
                      height={isMobile ? 34 : 56}
                    />
                  </div>
                  <p className={styles.nickname}>{participant.nickname}</p>
                </button>
                {kickButtonOn && participant.type !== 'LEADER' && (
                  <button
                    type="button"
                    className={styles.kick}
                    onClick={() =>
                      handleKickButtonClick(
                        participant.userId,
                        participant.nickname
                      )
                    }>
                    내보내기
                  </button>
                )}
              </div>
            );
          })}
        </ul>
      </div>
    </BottomSheet>
  );
}
