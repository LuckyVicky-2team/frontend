import BottomSheet from '@/components/common/BottomSheet';
import ProfileImage from '@/components/common/ProfileImage';
import { IParticipant } from '@/types/response/Gathering';
import styles from './Members.module.scss';
import Image from 'next/image';
import { useEffect, useRef, useState } from 'react';

interface IMembersProps {
  modalOpen: boolean;
  onClose: () => void;
  data: IParticipant[];
  isMobile: boolean;
}

export default function Members({
  modalOpen,
  onClose,
  data,
  isMobile,
}: IMembersProps) {
  // const buttonRef = useRef<HTMLButtonElement | null>(null);
  const h2Ref = useRef<HTMLUListElement>(null);
  const [isOverflowing, setIsOverflowing] = useState(false);

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

  return (
    <BottomSheet isOpen={modalOpen} onClose={onClose} full>
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
          {data.map(participant => {
            return (
              <div key={participant.userId} className={styles.profile}>
                <button className={styles.profilePart1}>
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
                <button type="button" className={styles.kick}>
                  내보내기
                </button>
              </div>
            );
          })}
        </ul>
      </div>
    </BottomSheet>
  );
}
