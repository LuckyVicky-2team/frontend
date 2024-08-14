'use client';

import styles from './info.module.scss';
import { useEffect, useState } from 'react';
import { getPersonalInfo } from '@/api/apis/mypageApis';
// import { axiosInstance } from '@/api/instance';

export default function Info() {
  const [info, setInfo] = useState<any>(null);
  useEffect(() => {
    const fetchPersonalInfo = async () => {
      try {
        const response = await getPersonalInfo();
        setInfo(response.data);
      } catch (error) {
        console.error('Failed to fetch personal info:', error);
      }
    };

    fetchPersonalInfo();
  }, []);

  console.log('info :', info);

  return (
    <div className={styles.relative}>
      <div className={styles.card}>
        <div className={styles.top}>
          <h2>내 프로필</h2>
          <button type="button">편집</button>
        </div>
        <div className={styles.bottom}>
          <div className={styles.profileImg}>
            <button>
              <img src="/assets/myPageImages/profileImgEdit.png" alt="" />
            </button>
          </div>
          <div className={styles.rightInfo}>
            <div className={styles.topInfo}>
              <b>{info?.nickName}</b>
              <button>로그아웃</button>
            </div>
            <ul className={styles.list}>
              <li>
                <b>company.</b>
                <p>코드잇</p>
              </li>
              <li>
                <b>E-mail.</b>
                <p>{info?.email}</p>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
