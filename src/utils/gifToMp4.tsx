'use client';

import Image from 'next/image';
import { useEffect, useState } from 'react';
import styles from './gifToMp4.module.scss';

const GifToMp4 = ({ url }: { url: string }) => {
  const [mp4Url, setMp4Url] = useState<string | null>(null);

  useEffect(() => {
    const convertGifToMp4 = async () => {
      try {
        const response = await fetch('/api/convert-gif-to-mp4', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ url }),
        });
        const mp4Blob = await response.blob();
        const mp4Url = URL.createObjectURL(mp4Blob);
        setMp4Url(mp4Url);

        if (!response.ok) {
          // 400 에러 확인
          if (response.status === 400) {
            setMp4Url('notGif');
          }
        }
      } catch (error) {
        alert('파일을 불러오는 중 오류가 발생했습니다.');
      }
    };

    if (url) {
      convertGifToMp4();
    }
  }, [url]);

  if (mp4Url === 'notGif')
    return (
      <Image
        src={url}
        alt="썸네일 이미지"
        priority
        fill
        objectFit="contain"
        quality={50}
        loading="eager"
        onError={() => setMp4Url('/assets/images/detail-image-default.png')}
      />
    );

  // if (!mp4Url) return <p>Converting...</p>;
  if (!mp4Url) return;

  return (
    <video controls autoPlay loop className={styles.video}>
      <source src={mp4Url} type="video/mp4" />
    </video>
  );
};

export default GifToMp4;
