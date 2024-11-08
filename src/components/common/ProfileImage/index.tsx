import React from 'react';
import styles from './ProfileImage.module.scss';
import Image from 'next/image';

interface IProfileImageProps {
  url: string | undefined;
  width: number;
  height: number;
}

export default function ProfileImage({
  url,
  width,
  height,
}: IProfileImageProps) {
  return (
    <div className={styles.profileImg}>
      {url ? (
        <Image
          src={`https://${process.env.NEXT_PUBLIC_CLOUDFRONT_DOMAIN}/${url}`}
          alt="Profile"
          width={width}
          height={height}
        />
      ) : (
        <Image
          src={'/assets/icons/default-profile.svg'}
          alt="Profile"
          width={width}
          height={height}
        />
      )}
    </div>
  );
}
