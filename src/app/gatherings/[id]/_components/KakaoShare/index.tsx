import { useEffect, useMemo } from 'react';

// kakao 기능 동작을 위해 넣어준다.

export default function KakaoShare() {
  // const realUrl = process.env.NEXT_PUBLIC_DEPLOY_URL;
  // const resultUrl = process.env.NEXT_PUBLIC_BASE_URL;

  const Kakao = useMemo(() => window?.Kakao, []);

  // 재랜더링시에 실행되게 해준다.
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
        title: '오늘의 디저트',
        description: '아메리카노, 빵, 케익',
        imageUrl:
          'https://mud-kage.kakao.com/dn/NTmhS/btqfEUdFAUf/FjKzkZsnoeE4o19klTOVI1/openlink_640x640s.jpg',
        link: {
          mobileWebUrl: 'https://developers.kakao.com',
          webUrl: 'https://developers.kakao.com',
        },
      },
      itemContent: {
        profileText: 'Kakao',
        profileImageUrl:
          'https://mud-kage.kakao.com/dn/Q2iNx/btqgeRgV54P/VLdBs9cvyn8BJXB3o7N8UK/kakaolink40_original.png',
        titleImageUrl:
          'https://mud-kage.kakao.com/dn/Q2iNx/btqgeRgV54P/VLdBs9cvyn8BJXB3o7N8UK/kakaolink40_original.png',
        titleImageText: 'Cheese cake',
        titleImageCategory: 'Cake',
      },
      social: {
        likeCount: 10,
        sharedCount: 30,
      },
      buttons: [
        {
          title: '웹으로 이동',
          link: {
            mobileWebUrl: 'https://developers.kakao.com',
            webUrl: 'https://developers.kakao.com',
          },
        },
        {
          title: '앱으로 이동',
          link: {
            mobileWebUrl: 'https://developers.kakao.com',
            webUrl: 'https://developers.kakao.com',
          },
        },
      ],
    });
  };
  return (
    <button
      className="grey-btn"
      onClick={() => {
        shareKakao();
      }}>
      카카오톡 공유하기
    </button>
  );
}
