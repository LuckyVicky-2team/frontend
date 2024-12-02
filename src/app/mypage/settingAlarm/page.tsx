'use client';

import { useEffect, useState } from 'react';
import { getNotification, patchNotification } from '@/api/apis/mypageApis';
import styles from './settingAlarm.module.scss';

interface INotificationProps {
  isAgreed: boolean;
  content: string;
  additionalContent: string;
  messageType: string;
}

export default function SettingAlarm() {
  // const [alarmOn, setAlarmOn] = useState<boolean>(true);
  const [alrmList, setAlrmList] = useState<INotificationProps[]>([]);

  const handleAlarm = async (index: number) => {
    const currentItem = alrmList[index];
    const updatedIsAgreed = !currentItem.isAgreed;

    try {
      await patchNotification(currentItem.messageType, updatedIsAgreed);

      setAlrmList(prev =>
        prev.map((item, i) =>
          i === index ? { ...item, isAgreed: updatedIsAgreed } : item
        )
      );
    } catch (error) {
      console.log('알림설정 실패', error);
    }
  };

  const fetchNotification = async () => {
    try {
      const res = await getNotification();
      setAlrmList(res.data);
    } catch (error) {
      console.error('Failed to fetch notifications:', error);
    }
  };

  useEffect(() => {
    fetchNotification();
  }, []);

  return (
    <div className={styles.relative}>
      <h1 className={styles.title}>알림 설정</h1>
      <div className={styles.setWrap}>
        <h2>기본 알림</h2>
        {alrmList?.map((item, i) => {
          return (
            <div className={styles.settingItem} key={i}>
              <h3>{item?.content}</h3>
              <div className={styles.settingBtn}>
                <div className={styles.btnWrap}>
                  <button
                    type={'button'}
                    onClick={() => {
                      handleAlarm(i);
                    }}
                    className={
                      item?.isAgreed
                        ? `${styles.alarmOn2}`
                        : `${styles.alarmOff2}`
                    }>
                    <p>ON</p>
                    <p>OFF</p>
                    <span
                      className={
                        item?.isAgreed
                          ? `${styles.alarmOn}`
                          : `${styles.alarmOff}`
                      }></span>
                  </button>
                </div>
              </div>
              <div className={styles.addCon}>{item?.additionalContent}</div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
