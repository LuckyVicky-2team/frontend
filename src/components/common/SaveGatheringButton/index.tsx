import IconButton from '@/components/common/IconButton';
import { useSaveItemState } from '@/hooks/useSavedItemsStatus';

interface ISaveGatheringButtonProps {
  id: number;
  size?: 'xsmall' | 'small' | 'medium' | 'large';
  type?: 'blue' | 'red' | 'default';
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
  className,
}: ISaveGatheringButtonProps) {
  const [savedItem, setSaveItem] = useSaveItemState();

  const handleButton = () => {
    setSaveItem(id);
  };

  const isSaved = savedItem?.includes(id);
  const imgUrl = isSaved
    ? iconPathsObj[type].saved
    : iconPathsObj[type].unsaved;
  return (
    <IconButton
      className={className}
      size={size}
      imgUrl={imgUrl}
      clickIconButtonHandler={handleButton}
    />
  );
}
