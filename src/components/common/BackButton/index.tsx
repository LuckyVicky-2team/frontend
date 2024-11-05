'use client';

import Image from 'next/image';
import { useRouter } from 'next/navigation';

export default function BackButton({ className }: { className?: string }) {
  const router = useRouter();

  return (
    <button
      onClick={() => {
        router.back();
      }}>
      <Image
        src="/assets/icons/backArrow.svg"
        alt="돌아가기"
        width={24}
        height={24}
        className={className}
      />
    </button>
  );
}
