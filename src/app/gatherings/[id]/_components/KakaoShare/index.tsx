import { useEffect, useMemo } from 'react';
import styles from './KakaoShare.module.scss';
import Image from 'next/image';
import { usePatchShareGathering } from '@/api/queryHooks/gathering';
import { useToast } from '@/contexts/toastContext';

interface IKakaoShareProps {
  path: string;
  meetingId: number;
  // likeCount: number;
  sharedCount: number;
}

export default function KakaoShare({
  path,
  meetingId,
  // likeCount,
  sharedCount,
}: IKakaoShareProps) {
  const { mutate: shareMutate } = usePatchShareGathering();
  const { addToast } = useToast();

  const realUrl = `${process.env.NEXT_PUBLIC_DEPLOY_URL}${path}`;

  const Kakao = useMemo(() => window?.Kakao, []);

  useEffect(() => {
    // init 해주기 전에 clean up 을 해준다.
    if (window.Kakao) {
      Kakao?.cleanup();
      // console.log('app key', process.env.NEXT_PUBLIC_KAKAO_APP_KEY);
      Kakao.init(process.env.NEXT_PUBLIC_KAKAO_APP_KEY);
      // 잘 적용되면 true 를 뱉는다.
      // console.log(Kakao.isInitialized());
    }
  }, [Kakao]);

  if (!Kakao) return;

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
        // likeCount: likeCount,
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

  const handleShareButtonClick = () => {
    shareMutate(meetingId, {
      onError: error => {
        // console.log(error);
        void error;
        addToast('모임 공유하기에 실패했습니다.', 'error');
      },
    });
  };

  return (
    <button
      onClick={() => {
        shareKakao();
        handleShareButtonClick();
      }}
      className={styles.kakaoButton}>
      <div className={styles.kakaoLogo}>
        <Image
          src={'/assets/icons/kakao_logo_deepyellow.svg'}
          alt="카카오 이미지"
          width={64}
          height={64}
        />
      </div>
      카카오톡
    </button>
  );
}
