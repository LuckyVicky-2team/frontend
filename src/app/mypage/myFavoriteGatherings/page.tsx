'use client';

import { useGetWishList } from '@/api/queryHooks/wishList';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import SaveGatheringButton from '@/components/common/SaveGatheringButton';
import { IWishListItemProps } from '@/types/response/WishListRES';
import { dateToISOString, transDate } from '@/utils/common';
import Link from 'next/link';
import styles from './myFavoriteGatherings.module.scss';

export default function MyFavoriteGatherings() {
  const [favoriteGatherings, setFavoriteGatherings] = useState<
    IWishListItemProps[]
  >([]);

  const { data: wishList, isLoading } = useGetWishList();

  useEffect(() => {
    if (wishList) {
      setFavoriteGatherings(wishList);
    } else {
      setFavoriteGatherings([]);
    }
  }, [wishList]);

  return (
    <div className={styles.relative}>
      <div className={styles.title}>찜한 모임</div>
      <div className={styles.myFavoriteGathering}>
        {isLoading ? (
          Array.from({ length: 3 }).map((_, index) => (
            <div className={styles.skeleton} key={index}></div>
          ))
        ) : favoriteGatherings.length === 0 ? (
          <div>찜한 모임이 없습니다.</div>
        ) : (
          favoriteGatherings?.map(e => {
            const processedGatheringDate = transDate(e.meetingDatetime);
            const processedCurrentDate = transDate(
              dateToISOString(new Date())!
            );

            return (
              <div className={styles.myFavoriteGatheringItem} key={e.meetingId}>
                <Link href={`/gatherings/${e.meetingId}`}>
                  <div className={styles.thumbnail}>
                    <Image
                      fill
                      src={
                        e.thumbnail
                          ? `https://${process.env.NEXT_PUBLIC_CLOUDFRONT_DOMAIN}/${e.thumbnail}`
                          : '/assets/mainImages/game.png'
                      }
                      alt="찜목록 리스트"
                      style={{ objectFit: 'cover' }}
                      unoptimized
                      onError={e =>
                        (e.currentTarget.src = '/assets/mainImages/game.png')
                      }
                    />
                    {processedCurrentDate.mondthAndDay ===
                      processedGatheringDate.mondthAndDay && (
                      <div className={styles.deadLine}>
                        <Image
                          src="/assets/icons/clock.svg"
                          alt="dead-line"
                          width={15}
                          height={15}
                        />
                        {`오늘 ${processedGatheringDate.time.split(':')[0]}시 마감`}
                      </div>
                    )}
                    <div
                      className={
                        styles.participant
                      }>{`${e.currentParticipant}/${e.limitParticipant}`}</div>
                  </div>
                </Link>
                <div className={styles.mid}>
                  <Image
                    src="/assets/icons/mapPin.svg"
                    alt="place"
                    width={18}
                    height={18}
                    className={styles.mapPin}
                  />
                  <p>{e.locationName}</p>
                  <SaveGatheringButton
                    id={e.meetingId}
                    size="medium"
                    type="blue"
                    className={styles.heart}
                  />
                </div>
                <div className={styles.title2}>{e.title}</div>
                <div className={styles.date}>
                  <p>{processedGatheringDate.mondthAndDay}</p>
                  <p>{processedGatheringDate.time}</p>
                </div>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
}
