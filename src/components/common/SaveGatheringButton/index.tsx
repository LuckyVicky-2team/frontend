import IconButton from '@/components/common/IconButton';
import { useSaveItemState } from '@/hooks/useSavedItemsStatus';

interface ISaveGatheringButtonProps {
  id: number;
  size?: 'xsmall' | 'small' | 'medium' | 'large';
  className?: string;
}

export default function SaveGatheringButton({
  id,
  size,
  className,
}: ISaveGatheringButtonProps) {
  const [savedItem, setSaveItem] = useSaveItemState();

  const handleButton = () => {
    setSaveItem(id);
  };

  const isSaved = savedItem?.includes(id);

  return (
    <IconButton
      className={className}
      size={size}
      imgUrl={isSaved ? '/assets/icons/save.svg' : '/assets/icons/unSave.svg'}
      clickIconButtonHandler={handleButton}
    />
  );
}
