import { getMessaging, getToken } from 'firebase/messaging';
import { registerServiceWorker } from './registerServiceWorker';
import { app } from './initFirebase';
import { patchPushToken } from '@/api/apis/notification';

export const handleAllowNotification = async () => {
  registerServiceWorker();
  try {
    const permission = await Notification.requestPermission();

    if (permission === 'granted') {
      const messaging = getMessaging(app);
      const token = await getToken(messaging, {
        vapidKey: process.env.NEXT_PUBLIC_VAPID_KEY,
      });
      if (token) {
        //토큰을 서버로 전송
        const response = patchPushToken(token);
        void response;
      } else {
        alert('토큰 등록이 불가능 합니다. 생성하려면 권한을 허용해주세요');
      }
    } else if (permission === 'denied') {
      alert(
        'web push 권한이 차단되었습니다. 알림을 사용하시려면 권한을 허용해주세요'
      );
    }
  } catch (error) {
    console.error('푸시 토큰 가져오는 중에 에러 발생', error);
  }
};
