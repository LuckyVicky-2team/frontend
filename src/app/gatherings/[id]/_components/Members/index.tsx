import Modal from '@/components/common/Modal';
import { IParticipant } from '@/types/response/Gathering';
import Image from 'next/image';

interface IMembersProps {
  modalOpen: boolean;
  onClose: () => void;
  data: IParticipant[];
}

export default function Members({ modalOpen, onClose, data }: IMembersProps) {
  return (
    <Modal modalOpen={modalOpen} onClose={onClose}>
      <ul>
        {data.map(participant => {
          return (
            <button key={participant.userId}>
              <Image
                alt="프로필 이미지"
                src={participant.profileImage}
                width={28}
                height={28}
              />
            </button>
          );
        })}
      </ul>
    </Modal>
  );
}
