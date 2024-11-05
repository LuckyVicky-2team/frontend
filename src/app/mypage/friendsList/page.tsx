'use client';

import styles from './friendsList.module.scss';
import Image from 'next/image';
import { useState } from 'react';
export default function FriendsList() {
  const [activeItems, setActiveItems] = useState<number[]>([]);

  const toggleActive = (index: number) => {
    setActiveItems(prev =>
      prev.includes(index) ? prev.filter(i => i !== index) : [...prev, index]
    );
  };
  const data = [
    {
      id: '1',
      img: '/assets/myPageImages/profileImgEdit.png',
      name: '럽윈즈올',
    },
    {
      id: '1',
      img: '/assets/myPageImages/profileImgEdit.png',
      name: '럽윈즈올',
    },
    {
      id: '1',
      img: '/assets/myPageImages/profileImgEdit.png',
      name: '럽윈즈올',
    },
    {
      id: '1',
      img: '/assets/myPageImages/profileImgEdit.png',
      name: '럽윈즈올',
    },
    {
      id: '1',
      img: '/assets/myPageImages/profileImgEdit.png',
      name: '럽윈즈올',
    },
  ];
  return (
    <div className={styles.relative}>
      <div className={styles.titleWrap}>
        <h2 className={styles.title}>친구목록</h2>
        <button type="button">
          <Image
            src={'/assets/myPageImages/friendsPlus.svg'}
            alt="친구추가 아이콘"
            width={24}
            height={24}
          />
          <span>친구추가</span>
        </button>
      </div>
      <div className={styles.subTitle}>친구목록</div>
      <div className={styles.friendsListWrap}>
        {data.map((e, i) => {
          return (
            <div
              key={i}
              className={`${styles.friendsList} ${
                activeItems.includes(i) ? styles.on : ''
              }`}>
              <div className={styles.friendsItem}>
                <b>
                  <Image src={e.img} alt="pro" width={40} height={40}></Image>
                </b>
                <p>{e.name}</p>
                <button onClick={() => toggleActive(i)}>친구삭제</button>
              </div>
              <div className={styles.deleteFriends}>
                <h3>
                  친구를 삭제하시겠습니까? <br /> 친구가 슬퍼할수도있어요🥲
                </h3>
                <div className={styles.dfBtnWrap}>
                  <button type={'button'} className={styles.dfYes}>
                    네, 삭제할래요
                  </button>
                  <button type={'button'} className={styles.dfNo}>
                    계속 친구할래요!
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
