import BottomSheet from '@/components/common/BottomSheet';
import ProfileImage from '@/components/common/ProfileImage';
import { IParticipant } from '@/types/response/Gathering';

interface IMembersProps {
  modalOpen: boolean;
  onClose: () => void;
  data: IParticipant[];
}

export default function Members({ modalOpen, onClose, data }: IMembersProps) {
  return (
    <BottomSheet isOpen={modalOpen} onClose={onClose} full>
      <ul>
        {data.map(participant => {
          return (
            <button key={participant.userId}>
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
