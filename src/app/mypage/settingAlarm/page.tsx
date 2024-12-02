'use client';

import { useState } from 'react';
import styles from './settingAlarm.module.scss';
import FCMDisabledPrompt from '@/components/common/FCMDisabledPrompt';
import { useInApp } from '@/hooks/useInApp';

export default function SettingAlarm() {
  const [alarmOn, setAlarmOn] = useState<boolean>(true);
  const isInApp = useInApp();

  const handleAlarm = () => {
    setAlarmOn(!alarmOn);
  };

  return (
    <>
      <div className={styles.relative}>
        <h1 className={styles.title}>알림 설정</h1>
        <div className={styles.setWrap}>
          <h2>기본 알림</h2>
          <div className={styles.settingItem}>
            <h3>알람이 올 상황</h3>
            <div className={styles.settingBtn}>
              <div className={styles.btnWrap}>
                <button
                  type={'button'}
                  onClick={() => {
                    handleAlarm();
                  }}>
                  <p>ON</p>
                  <p>OFF</p>
                  <span
                    className={
                      alarmOn === false ? `${styles.alarmOff}` : ''
                    }></span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      {isInApp && <FCMDisabledPrompt />}
    </>
  );
}
