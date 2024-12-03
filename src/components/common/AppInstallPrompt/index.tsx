import { Fragment, useEffect, useState } from 'react';

import { BeforeInstallPromptEvent } from '@/types/window';
import MobileInstallPrompt from './MobileInstallPrompt';
import useModal from '@/hooks/useModal';
import { usePWA } from '@/contexts/pwaContext';

const defaultBeforeInstallPromptEvent: BeforeInstallPromptEvent = {
  platforms: [],
  userChoice: Promise.resolve({ outcome: 'dismissed', platform: '' }),
  prompt: () => Promise.resolve(),
  preventDefault: () => {},
};

const isIOSPromptActive = () => {
  const isActive = JSON.parse(localStorage.getItem('iosInstalled') || 'true');

  if (isActive) {
    return defaultBeforeInstallPromptEvent;
  }

  return null;
};

export default function AppInstallPrompt() {
  const { modalOpen, handleModalOpen, handleModalClose } = useModal();
  const isDeviceIOS = /iPad|iPhone|iPod/.test(window.navigator.userAgent);
  const [deferredPrompt, setDeferredPrompt] =
    useState<BeforeInstallPromptEvent | null>(
      isDeviceIOS ? isIOSPromptActive() : null
    );
  const isPWA = usePWA();

  const handleInstallClick = () => {
    if (deferredPrompt) {
      deferredPrompt.prompt();

      deferredPrompt.userChoice.then(() => {
        setDeferredPrompt(null);
      });
    }
    handleModalClose();
  };

  const handleCancelClick = () => {
    localStorage.setItem('iosInstalled', 'false');
    setDeferredPrompt(null);
    handleModalClose();
  };

  const handleBeforeInstallPrompt = (event: BeforeInstallPromptEvent) => {
    event.preventDefault();
    setDeferredPrompt(event);

    // // `deferredPrompt` 상태를 로컬 스토리지에 저장 => 불가능함. prompt 메서드는 직렬화가 안 됨
    // localStorage.setItem('deferredPrompt', JSON.stringify(event));
  };

  useEffect(() => {
    window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt);

    return () => {
      window.removeEventListener(
        'beforeinstallprompt',
        handleBeforeInstallPrompt
      );
    };
  }, []);

  useEffect(() => {
    if (deferredPrompt && !isPWA) handleModalOpen();
    //아래는 불가능한 방법. 수동으로 앱 설치 여부를 판단하더라도 deferredPrompt를 가져올 수가 없음. (로컬 저장도 못 함)
    // 결국엔 beforeinstallprompt를 다시 트리거 하는 방법 밖에는 없는데, 앱 설치 후에 삭제하면 트리거가 안 되어서 문제임
    // (캐시 삭제해도, 브라우저 재시작해도 안 됨)
    //다만 트리거 조건이 https 에서 실행되는 거라서 dev에 머지되고 잘 동작하는지 확인할 필요가 있음

    // //getInstalledRelatedApps을 지원하지 않는 브라우저일 경우 ex)firefox
    // //(앱을 설치했다가 삭제해도 앱 설치 상태를 체크할 수 없음)
    // //크롬의 경우 앱을 설치했다가 삭제하면 deferredPrompt가 자동으로 복원이 안 됨. 따라서
    // //else if 안의 조건문으로 앱 설치 여부를 수동으로 체크해 줘야함
    // if (deferredPrompt && !isPWA) {
    //   console.log(deferredPrompt);
    //   handleModalOpen();
    //   //getInstalledRelatedApps을 지원하는 브라우저일 경우 ex)크롬
    //   //앱을 설치했다가 삭제했을 때 앱 설치 상태를 가져올 수 있음
    // } else if (
    //   'getInstalledRelatedApps' in navigator &&
    //   navigator.getInstalledRelatedApps
    // ) {
    //   navigator.getInstalledRelatedApps().then(apps => {
    //     if (apps.length === 0 && !isPWA) {
    //       const storedPrompt = localStorage.getItem('deferredPrompt');
    //       if (storedPrompt) {
    //         const parsedPrompt: BeforeInstallPromptEvent =
    //           JSON.parse(storedPrompt);
    //         setDeferredPrompt(parsedPrompt);
    //       }
    //       handleModalOpen();
    //     }
    //   });
    // }
  }, [deferredPrompt, isPWA]);

  // 임시
  // useEffect(() => {
  //   handleModalOpen();
  // });

  return (
    <Fragment>
      {modalOpen && (
        <MobileInstallPrompt
          isOpen={modalOpen}
          handleInstallClick={handleInstallClick}
          handleCancelClick={handleCancelClick}
          platform={isDeviceIOS ? 'ios' : 'android'}
        />
      )}
    </Fragment>
  );
}
