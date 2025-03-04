'use client';

import {
  useDeleteWishList,
  useGetWishList,
  usePostWishList,
} from '@/api/queryHooks/wishList';
import IconButton from '@/components/common/IconButton';
import { useSaveItemState } from '@/hooks/useSavedItemsStatus';
import { IWishListItemProps } from '@/types/response/WishListRES';
import { useEffect, useState } from 'react';
import styles from './SaveGatheringButton.module.scss';

interface ISaveGatheringButtonProps {
  id: number;
  size?: 'xsmall' | 'small' | 'medium' | 'large';
  type?: 'blue' | 'red' | 'default';
  rectangle?: boolean; //네모 테두리
  screenWidth?: number;
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
  screenWidth = 0,
  // isInitialSaved = 'N',
  className,
}: ISaveGatheringButtonProps) {
  // 비회원용 로컬 스토리지 찜 목록 리스트
  const [savedItem, setSaveItem] = useSaveItemState();

  // 회원용 서버 찜 상태
  const [isSaved, setIsSaved] = useState<boolean>(false);

  const { data: wishList } = useGetWishList();

  const postMutate = usePostWishList();
  const deleteMutate = useDeleteWishList();

  const handleButton = () => {
    const hasToken = !!localStorage.getItem('accessToken');

    if (hasToken) {
      if (isSaved) {
        deleteMutate.mutate(id);
      } else {
        postMutate.mutate([id]);
      }
    } else {
      setSaveItem(id);
    }
  };

  useEffect(() => {
    const hasToken = !!localStorage.getItem('accessToken');

    if (hasToken) {
      setIsSaved(
        wishList
          ? wishList.some((item: IWishListItemProps) => item.meetingId === id)
          : false
      );
    } else {
      setIsSaved(savedItem?.includes(id));
    }
  }, [savedItem, wishList]);

  return (
    <div
      className={rectangle ? styles.rectangle : ''}
      style={{
        height: screenWidth ? `${(screenWidth * 70) / 600}px` : '',
        width: screenWidth ? `${(screenWidth * 70) / 600}px` : '',
        maxHeight: screenWidth ? '70px' : '',
        maxWidth: screenWidth ? '70px' : '',
      }}>
      <IconButton
        className={className}
        size={size}
        imgUrl={isSaved ? iconPathsObj[type].saved : iconPathsObj[type].unsaved}
        clickIconButtonHandler={handleButton}
      />
    </div>
  );
}
