'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import styles from './gifTransform.module.scss';

interface OptimizedImageProps {
  thumbnail: string;
}
const DEFAULT_IMAGES = [
  '/assets/images/emptyGameThumbnail.png',
  '/assets/images/emptyThumbnail.png',
];

//gif 용량 최적화를 위해 webp로 포맷 변경(애니메이션 가능)
export default function OptimizedImage({ thumbnail }: OptimizedImageProps) {
  const src = `https://${process.env.NEXT_PUBLIC_CLOUDFRONT_DOMAIN}/${thumbnail}`;
  const [optimizedSrc, setOptimizedSrc] = useState(src);
  const [loading, setLoading] = useState(true);

  const handleImageError = () => {
    const randomIndex = Math.floor(Math.random() * DEFAULT_IMAGES.length);
    setOptimizedSrc(DEFAULT_IMAGES[randomIndex]);
  };
  const gifExtension = thumbnail.toLowerCase().endsWith('.gif');
  useEffect(() => {
    if (!thumbnail) return;

    // GIF가 아니면 변환할 필요 없음
    if (!gifExtension) {
      setOptimizedSrc(src);
      setLoading(false);
      return;
    }

    // GIF → WebP 변환 API 호출
    const optimizeGif = async () => {
      try {
        setLoading(true);

        const res = await fetch('/api/convert-gif-to-webp', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ imageUrl: src }),
        });

        if (!res.ok) throw new Error('Failed to fetch optimized image');

        const imageBlob = await res.blob();
        setOptimizedSrc(URL.createObjectURL(imageBlob));
      } catch (err) {
        console.error('Error loading optimized image:', err);
        setOptimizedSrc(src);
      } finally {
        setLoading(false);
      }
    };

    optimizeGif();
  }, [thumbnail]);

  if (loading && gifExtension) {
    return (
      <div className={styles.loadingSkeleton}>
        <div className={styles.box} />
      </div>
    );
  }

  return (
    <Image
      src={optimizedSrc}
      alt="thumbnail"
      fill
      priority
      quality={80}
      sizes="(max-width: 430px) 30vw, 130px, (max-width: 600px) 183px"
      onError={handleImageError}
    />
  );
}
