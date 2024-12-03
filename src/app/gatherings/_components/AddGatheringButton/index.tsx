import Image from 'next/image';
import styles from './AddGatheringButton.module.scss';

interface IAddGatheringButtonProps {
  handleAddNewMeeting: () => void;
}

export default function AddGatheringButton({
  handleAddNewMeeting,
}: IAddGatheringButtonProps) {
  return (
    <>
      <button onClick={handleAddNewMeeting} className={styles.addGatheringBtn}>
        <Image
          src={'/assets/icons/plusCircle.svg'}
          alt={'addIcon'}
          width={24}
          height={24}
        />
      </button>
    </>
  );
}
