'use client';

import { useEffect, useState } from 'react';
import { getNotification } from '@/api/apis/mypageApis';
import styles from './settingAlarm.module.scss';

interface INotificationProps {
  additionalContent: 'string';
  content: 'string';
  isAgreed: 'boolean';
  messageType: 'string';
}

export default function SettingAlarm() {
  const [alarmOn, setAlarmOn] = useState<boolean>(true);
  const [alrmList, setAlrmList] = useState<INotificationProps[]>([]);

  const handleAlarm = () => {
    setAlarmOn(!alarmOn);
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

  console.log(alrmList);

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
              <div className={styles.addCon}>{item?.additionalContent}</div>
            </div>
          );
        })}
        {/* <div className={styles.settingItem}>
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
        </div> */}
      </div>
    </div>
  );
}
