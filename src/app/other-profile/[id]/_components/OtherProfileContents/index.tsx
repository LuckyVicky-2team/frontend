'use client';

import Image from 'next/image';
import OtherEvaluationTags from './OtherEvaluationTags';
import MannerBar from '../MannerBar';
import HeartRating from '../HeartRating';
import { useGetOtherProfile } from '@/api/queryHooks/otherProfile';
import { notFound } from 'next/navigation';
import Tag from '@/components/common/Tag';
import styles from './OtherProfileContents.module.scss';

export default function OtherProfileContents({ userId }: { userId: number }) {
  const { data } = useGetOtherProfile(userId);

  if (!data || 'errorCode' in data) {
    return notFound();
  }

  return (
    <div className={styles.contents}>
      <div className={styles.profile}>
        <div className={styles.profileImage}>
          <Image
            src={
              data.profileImage
                ? `https://${process.env.NEXT_PUBLIC_CLOUDFRONT_DOMAIN}/${data.profileImage}`
                : '/assets/images/defaultProfile.png'
            }
            alt="profile-image"
            fill
            style={{ objectFit: 'cover', borderRadius: '100%' }}
            unoptimized
            onError={e =>
              (e.currentTarget.src = '/assets/images/defaultProfile.png')
            }
          />
        </div>
        <div className={styles.textArea}>
          <div className={styles.nickName}>{data.nickName}</div>
          <div className={styles.subText}>
            <span className={styles.manner}>매너능력치</span>
            <MannerBar rating={data.averageRating} />
          </div>
        </div>
      </div>

      <div className={styles.subContents}>
        <HeartRating
          rating={data.averageRating}
          className={styles.heartRating}
        />
        <OtherEvaluationTags
          positiveTags={data.positiveTags}
          negativeTags={data.negativeTags}
        />
        {!!data.prTags?.length && (
          <div className={styles.prTags}>
            <div className={styles.prTag}>PR태그</div>
            <div className={styles.tags}>
              {data.prTags.map((tag, index) => {
                return (
                  <Tag key={index} className={styles.tag}>
                    {tag}
                  </Tag>
                );
              })}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
