// src/app/recommendSearch/page.tsx

import dynamic from 'next/dynamic';
import { Suspense } from 'react';

// 클라이언트 사이드에서만 렌더링될 컴포넌트
const RecommendSearchClient = dynamic(
  () => import('./_components/RecommendSearch'),
  { ssr: false }
);

export default function RecommendSearchPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <RecommendSearchClient />
    </Suspense>
  );
}
