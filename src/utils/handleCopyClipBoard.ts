//텍스트를 복사해주는 함수
//링크 복사 예시
// import { usePathname } from 'next/navigation';

//   const pathname = usePathname();

// <div
// 	onClick={() =>
// handleCopyClipBoard(
//   `${process.env.NEXT_PUBLIC_DEPLOY_URL}${pathname}`
// )
// }>
// ></div>

export const handleCopyClipBoard = async (text: string) => {
  try {
    await navigator.clipboard.writeText(text);
    alert('클립보드에 링크가 복사되었어요.');
  } catch (err) {
    console.log(err);
  }
};
