'use client';

import { useRouter } from 'next/navigation';

export default function BackButton({ className }: { className?: string }) {
  const router = useRouter();

  return (
    <button
      onClick={() => {
        router.back();
      }}>
      <svg
        className={className}
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none">
        <path
          d="M15 18L9 12L15 6"
          stroke="black"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </button>
  );
}
