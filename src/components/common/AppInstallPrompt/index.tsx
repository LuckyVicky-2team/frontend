import { Fragment, useEffect, useState } from 'react';

import { BeforeInstallPromptEvent } from '@/types/window';
import MobileInstallPrompt from './MobileInstallPrompt';
import useModal from '@/hooks/useModal';

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
  const [isStandalone, setIsStandalone] = useState(false);

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
    // iOS에서 앱으로 실행 여부 확인
    const standalone =
      'standalone' in window.navigator && window.navigator.standalone;
    setIsStandalone(standalone as boolean);
    if (deferredPrompt || !isStandalone) handleModalOpen();
  }, []);

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
