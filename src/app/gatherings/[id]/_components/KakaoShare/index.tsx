import { useEffect, useMemo } from 'react';

interface IKakaoShareProps {
  path: string;
  likeCount: number;
  sharedCount: number;
}

export default function KakaoShare({
  path,
  likeCount,
  sharedCount,
}: IKakaoShareProps) {
  const realUrl = `${process.env.NEXT_PUBLIC_DEPLOY_URL}${path}`;

  const Kakao = useMemo(() => window?.Kakao, []);

  useEffect(() => {
    // init 해주기 전에 clean up 을 해준다.
    if (window.Kakao) {
      Kakao?.cleanup();
      console.log('app key', process.env.NEXT_PUBLIC_KAKAO_APP_KEY);
      Kakao.init(process.env.NEXT_PUBLIC_KAKAO_APP_KEY);
      // 잘 적용되면 true 를 뱉는다.
      console.log(Kakao.isInitialized());
    }
  }, [Kakao]);

  if (!Kakao) return <>test</>;

  const shareKakao = () => {
    Kakao.Share.sendDefault({
      objectType: 'feed',
      content: {
        title: 'BOGO',
        description: '보드게임 하러 오세요! BOGO',
        imageUrl: 'https://i.ibb.co/7rMNL32/logo.png', // 큰 이미지
        link: {
          mobileWebUrl: realUrl,
          webUrl: realUrl,
        },
      },
      social: {
        likeCount: likeCount,
        sharedCount: sharedCount,
      },
      buttons: [
        {
          title: '웹으로 이동',
          link: {
            webUrl: `${realUrl}`,
            mobileWebUrl: `${realUrl}`,
          },
        },
        {
          title: '앱으로 이동',
          link: {
            webUrl: `${realUrl}`,
            mobileWebUrl: `${realUrl}`,
          },
        },
      ],
    });
  };
  return (
    <button
      onClick={() => {
        shareKakao();
      }}>
      카카오톡 공유하기
    </button>
  );
}