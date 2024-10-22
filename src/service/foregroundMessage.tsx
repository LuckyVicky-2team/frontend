'use client';

import { getMessaging, onMessage } from 'firebase/messaging';
import { useRouter } from 'next/navigation';
import { app } from './initFirebase';
import { useEffect } from 'react';

// interface ICustomMessagePayload extends MessagePayload {
//   webpushConfig?: {
//     fcmOptions?: {
//       link?: string;
//     };
//   };
// }

const messaging = getMessaging(app);

//포그라운드 상태일 때 알림 설정
export function ForegroundMessage() {
  const router = useRouter();

  useEffect(() => {
    const foregroundMessage = onMessage(messaging, payload => {
      // console.log("알림 도착 ", payload);
      const notificationTitle = payload.notification?.title;
      const notificationOptions = {
        body: payload.notification?.body,
        data: { url: payload.fcmOptions?.link },
      };

      if (Notification.permission === 'granted' && notificationTitle) {
        const notification = new Notification(
          notificationTitle,
          notificationOptions
        );

        notification.onclick = event => {
          event.preventDefault();
          if (payload.fcmOptions?.link) {
            const url = new URL(payload.fcmOptions?.link);
            router.push(url.pathname + url.search);
          }
        };
      }
    });

    return () => foregroundMessage();
  }, [router]);

  return null;
}
