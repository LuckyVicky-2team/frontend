'use client';
// import { useEffect } from 'react';
import styles from './Card.module.scss';
import IconButton from '@/components/common/IconButton';
import Tag from '@/components/common/Tag';
import Image from 'next/image';
import { useSaveItemState } from '@/hooks/useSavedItemsStatus';
import useTransText from '../../../../utils/transText';

interface ICardProps {
  id: number;
  title: string;
  tag: string[];
  participantCount: number;
  capacity: number;
  gatheringDate: string;
  location: string;
  content: string;
  image: string;
  master: { nickName: string };
  onClick?: (_args: any) => void;
}

export default function Card({
  id,
  title,
  tag,
  participantCount,
  capacity,
  gatheringDate,
  master,
  location,
  content,
  image,
  onClick,
}: ICardProps) {
  const progressValue = (participantCount / capacity) * 100;
  const { transDate } = useTransText();
  const { mondthAndDay, time } = transDate(gatheringDate);
  const [savedItem, setSaveItem] = useSaveItemState();

  const handleButton = () => {
    setSaveItem(id);
  };

  const isSaved = savedItem?.includes(id);

  // @haewon
  // 만료기간 설정때문에 남겨둠
  // useEffect(() => {}, [savedItem]);

  return (
    <>
      <div className={styles.card} onClick={onClick}>
        <div className={styles.thumbnail}>
          <Image src={image} alt="thumbnail" fill sizes="100%" priority />
        </div>
        <div className={styles.content}>
          <div className={styles.header}>
            <h1>{title} </h1>
            <h3>&nbsp;{location}</h3>
            <IconButton
              size="small"
              imgUrl={
                isSaved ? '/assets/icons/save.svg' : '/assets/icons/unSave.svg'
              }
              clickIconButtonHandler={handleButton}
            />
          </div>

          <div className={styles.time}>
            <h3>{mondthAndDay}</h3>
            <h3 className={styles.timeDetail}>{time}</h3>
          </div>
          <div className={styles.tag}>
            {tag.map((el, idx) => {
              return (
                <Tag key={id + idx} backgroundColor="#815489" fontColor="white">
                  {el}
                </Tag>
              );
            })}
          </div>
          <div className={styles.participants}>
            <progress value={`${progressValue}`} max={'100'}></progress>
            <span className={styles.count}>
              {participantCount}/{capacity}
            </span>
          </div>

          <p className={styles.description}>{content}</p>
          <div className={styles.footer}>{master.nickName}</div>
        </div>
      </div>
    </>
  );
}
