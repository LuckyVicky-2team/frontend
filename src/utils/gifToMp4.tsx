'use client';

import Image from 'next/image';
import { useEffect, useState } from 'react';
// import styles from './gifToMp4.module.scss';

const GifToMp4 = ({ url }: { url: string }) => {
  // const [mp4Url, setMp4Url] = useState<string | null>(null);
  const [optimizedMediaUrl, setOptimizedMediaUrl] = useState<string | null>(
    null
  );
  const [isVideo, setIsVideo] = useState(false);

  useEffect(() => {
    const convertGifToMp4 = async () => {
      try {
        const response = await fetch('/api/convert-gif-to-mp4', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ url }),
        });
        // const mp4Blob = await response.blob();
        // const mp4Url = URL.createObjectURL(mp4Blob);
        // setMp4Url(mp4Url);
        const blob = await response.blob();
        const mediaUrl = URL.createObjectURL(blob);
        setIsVideo(response.headers.get('Content-Type') === 'video/mp4');
        setOptimizedMediaUrl(mediaUrl);
        // if (!response.ok) {
        //   // 400 에러 확인
        //   if (response.status === 400) {
        //     setMp4Url('notGif');
        //   }
        // }
      } catch (error) {
        alert('파일을 불러오는 중 오류가 발생했습니다.');
      }
    };

    if (url) {
      convertGifToMp4();
    }
  }, [url]);

  if (isVideo === false && optimizedMediaUrl)
    return (
      <Image
        src={optimizedMediaUrl}
        alt="썸네일 이미지"
        priority
        fill
        objectFit="contain"
        quality={50}
        onError={() =>
          setOptimizedMediaUrl('/assets/images/detail-image-default.png')
        }
      />
    );

  // if (!mp4Url) return <p>Converting...</p>;
  if (!optimizedMediaUrl) return;

  return (
    <video
      controls
      autoPlay
      loop
      style={{ width: '100%', height: '100%', objectFit: 'contain' }}>
      <source src={optimizedMediaUrl} type="video/mp4" />
    </video>
  );
};

export default GifToMp4;
