import BottomSheet from '@/components/common/BottomSheet';
import ProfileImage from '@/components/common/ProfileImage';
import { IParticipant } from '@/types/response/Gathering';
import styles from './Members.module.scss';
import Image from 'next/image';

interface IMembersProps {
  modalOpen: boolean;
  onClose: () => void;
  data: IParticipant[];
}

export default function Members({ modalOpen, onClose, data }: IMembersProps) {
  // const buttonRef = useRef<HTMLButtonElement | null>(null);

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
      <ul
        className={styles.buttons}
        style={{ height: `calc(100% - 111.14px)` }}>
        {data.map(participant => {
          return (
            <button key={participant.userId} className={styles.button}>
              <ProfileImage
                url={participant.profileImage}
                width={28}
                height={28}
              />
              내보내기
            </button>
          );
        })}
      </ul>
    </BottomSheet>
  );
}
