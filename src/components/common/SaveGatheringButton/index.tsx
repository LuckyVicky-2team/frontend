import IconButton from '@/components/common/IconButton';
import { useSaveItemState } from '@/hooks/useSavedItemsStatus';
import styles from './SaveGatheringButton.module.scss';

interface ISaveGatheringButtonProps {
  id: number;
  size?: 'xsmall' | 'small' | 'medium' | 'large';
  type?: 'blue' | 'red' | 'default';
  rectangle?: boolean; //네모 테두리
  isInitialSaved?: 'Y' | 'N';
  className?: string;
}
const path = '/assets/icons';
const iconPathsObj = {
  blue: {
    saved: `${path}/blueSave.svg`,
    unsaved: `${path}/unSave.svg`,
  },
  red: {
    saved: `${path}/redSave.svg`,
    unsaved: `${path}/unSave.svg`,
  },
  default: {
    saved: `${path}/defaultSave.svg`,
    unsaved: `${path}/defaultUnSave.svg`,
  },
};

export default function SaveGatheringButton({
  type = 'default',
  id,
  size,
  rectangle = false,
  isInitialSaved = 'N',
  className,
}: ISaveGatheringButtonProps) {
  const [savedItem, setSaveItem] = useSaveItemState();
  void isInitialSaved;

  const handleButton = () => {
    setSaveItem(id);
  };

  const isSaved = savedItem?.includes(id);
  const imgUrl = isSaved
    ? iconPathsObj[type].saved
    : iconPathsObj[type].unsaved;
  return (
    <div
      className={`${rectangle ? styles.rectangle : styles.notRectangle} ${className}`}
      onClick={handleButton}
      data-size={size}>
      <IconButton className={className} size={size} imgUrl={imgUrl} />
    </div>
  );
}
