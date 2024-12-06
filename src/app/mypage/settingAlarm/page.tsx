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
  // const [pushAP, setPushAP] = useState(false);
  // const [pushDP, setPushDP] = useState(false);
  const [popupMessage, setPopupMessage] = useState<string | null>(null);

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

      // 팝업 메시지 설정
      setPopupMessage(
        updatedIsAgreed
          ? `${currentItem.content} 동의 처리 완료`
          : `${currentItem.content} 거부 처리 완료`
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

  const today = new Date();
  const formatter = new Intl.DateTimeFormat('ko-KR', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  const formattedDate = formatter.format(today);

  return (
    <div className={styles.relative}>
      {/* <div>푸쉬 알림 동의 완료</div>
      <div>푸쉬 알림 거부 완료</div> */}
      {/* 팝업 */}
      {popupMessage && (
        <div className={styles.popup}>
          <div className={styles.item}>
            <b>처리날짜 : {formattedDate}</b>
            <p>{popupMessage}</p>
            <div className={styles.btn}>
              <button
                onClick={() => {
                  setPopupMessage(null);
                }}>
                완료
              </button>
            </div>
          </div>
        </div>
      )}
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
