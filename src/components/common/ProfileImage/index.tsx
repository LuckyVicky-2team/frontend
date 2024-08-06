import React from 'react';
import styles from './index.module.scss';
import Image from 'next/image';

interface IProfileImageProps {
  url: string;
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
      <Image src={url} alt="Profile" width={width} height={height} />
    </div>
  );
}
