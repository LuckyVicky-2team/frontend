// Import the functions you need from the SDKs you need
import { detectInAppBrowser } from '@/utils/detectInAppBrowser';
import { FirebaseApp, getApps, initializeApp } from 'firebase/app';
// import { getAnalytics } from 'firebase/analytics';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_MESSAGING_ID,
  appId: process.env.NEXT_PUBLIC_APP_ID,
  measurementId: process.env.NEXT_PUBLIC_MEASUREMENT_ID,
};

// Initialize Firebase
let app: FirebaseApp | undefined;

//테스트 환경이 아니고, 인앱 브라우저가 아닐 때만 실행
if (typeof window !== 'undefined') {
  const isInapp = detectInAppBrowser(window.navigator.userAgent);
  if (process.env.NODE_ENV !== 'test' && !isInapp) {
    //이미 초기화된 앱이 있는지 확인
    if (!getApps().length) {
      app = initializeApp(firebaseConfig);
    } else {
      app = getApps()[0];
    }
  }
}

export { app };
// const analytics = getAnalytics(app);
