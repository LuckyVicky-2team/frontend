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

export const handleCopyClipBoard = async (
  text: string,
  addToast: (_message: string, _type: 'success' | 'error') => void
) => {
  try {
    await navigator.clipboard.writeText(text);
    addToast('클립보드에 링크가 복사되었어요.', 'success');
  } catch (err) {
    // console.log(err);
    addToast('복사에 실패했어요', 'error');
  }
};
