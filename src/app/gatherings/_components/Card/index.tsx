'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { transDate } from '@/utils/common';
import styles from './Card.module.scss';
import SaveGatheringButton from '@/components/common/SaveGatheringButton';

interface ICardProps {
  id: number;
  title: string;
  tags: string[];
  games: string[];
  participantCount: number;
  limitParticipant: number;
  meetingDate: string;
  city: string;
  county: string;
  thumbnail: string;
  nickName: string;
  onClick?: (_args: any) => void;
}

export default function Card({
  id,
  title,
  tags,
  games,
  participantCount,
  limitParticipant,
  meetingDate,
  city,
  county,
  thumbnail,
  nickName,
  onClick,
}: ICardProps) {
  const progressValue = (participantCount / limitParticipant) * 100;
  const { mondthAndDay, time } = transDate(meetingDate);
  const isFullParticipant = participantCount === limitParticipant;
  const isDateOver = new Date(meetingDate) < new Date();
  const [isImageError, setIsImageError] = useState(false);
  const fallbackSrc = '/assets/images/emptyThumbnail.png';

  return (
    <>
      <div className={styles.card} onClick={onClick}>
        <Link className={styles.link} href={`/gatherings/${id}`} style={{}}>
          <div className={styles.thumbnail}>
            <Image
              src={
                isImageError
                  ? fallbackSrc
                  : `https://${process.env.NEXT_PUBLIC_CLOUDFRONT_DOMAIN}/${thumbnail}`
              }
              alt="thumbnail"
              fill
              onError={() => {
                setIsImageError(true);
              }}
              sizes="35vw"
              priority
              quality={70}
            />

            {isFullParticipant || isDateOver ? (
              <div className={styles.fullUser}>
                <p>{`마감된 모임이에요, \r\n 다음에 만나요 🙏`}</p>
              </div>
            ) : null}
          </div>
        </Link>
        <div className={styles.content}>
          <div className={styles.header}>
            <div className={styles.topHeader}>
              <h1>{title} </h1>
              <SaveGatheringButton id={id} size={'medium'} />
            </div>
            <div className={styles.info}>
              <h3>
                <span>|</span>&nbsp;
                {city} &nbsp; {county}
              </h3>
              <div className={styles.time}>
                <h3>{mondthAndDay}</h3>
                <h3 className={styles.timeDetail}>{time}</h3>
              </div>
            </div>
          </div>

          <div className={styles.tagContainer}>
            {tags?.map((el, idx) => {
              return (
                <p key={id + idx} className={styles.tags}>
                  {el}
                </p>
              );
            })}
          </div>
          <div className={styles.gameContainer}>
            <Image
              width={24}
              height={24}
              src={'/assets/icons/checkBlue.svg'}
              alt={'gameTag'}
              className={styles.checkIcon}
            />
            {games?.map((el, idx) => {
              return (
                <p key={id + idx} className={styles.games}>
                  {el}
                </p>
              );
            })}
          </div>
          <div className={styles.participants}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
              <Image
                src={'/assets/icons/leader.svg'}
                width={12}
                height={12}
                alt={'leaderName'}
              />
              <p className={styles.leaderName}>{nickName}</p>
              <Image
                src={'/assets/icons/user.svg'}
                alt={'userIcon'}
                width={16}
                height={16}
              />
              <p>
                {participantCount}/{limitParticipant}
              </p>
            </div>
            <progress
              className={styles.progress}
              value={`${progressValue}`}
              max={'100'}></progress>
          </div>
          <Link href={`/gatherings/${id}`}>
            <button className={styles.seeDetail}>모임 자세히보기</button>
          </Link>
        </div>
      </div>
    </>
  );
}
