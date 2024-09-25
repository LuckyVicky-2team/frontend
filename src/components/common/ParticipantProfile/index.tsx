import { IParticipant } from '@/types/response/Gathering';
import Modal from '../Modal';
import Image from 'next/image';

interface IParticipantProfileProps {
  participant: IParticipant;
  modalOpen: boolean;
  handleModalClose: () => void;
}

export default function ParticipantProfile({
  participant,
  modalOpen,
  handleModalClose,
}: IParticipantProfileProps) {
  const { userId, profileImage } = participant;
  return (
    <Modal modalOpen={modalOpen} onClose={handleModalClose}>
      {userId}
      <Image alt="프로필 이미지" src={profileImage} priority />
    </Modal>
  );
}
