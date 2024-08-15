'use client';
import styles from './myGatherings.module.scss';
import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';

export default function MyGatherings() {
  const [onTab, setOnTab] = useState<string>('tab1');

  return (
    <div className={styles.relative}>
      <h2 className={styles.title}>내 모임</h2>
      <div className={styles.tabBtnWrap}>
        <button
          type={'button'}
          className={onTab === 'tab1' ? styles.onTab : ''}
          onClick={() => {
            setOnTab('tab1');
          }}>
          참여 중 모임
        </button>
        <button
          type={'button'}
          className={onTab === 'tab2' ? styles.onTab : ''}
          onClick={() => {
            setOnTab('tab2');
          }}>
          종료된 모임
        </button>
        <button
          type={'button'}
          className={onTab === 'tab3' ? styles.onTab : ''}
          onClick={() => {
            setOnTab('tab3');
          }}>
          내가 만든 모임
        </button>
      </div>
      {onTab === 'tab1' ? (
        <div className={styles.myGatheringsListWrap}>
          <div className={styles.myGathdringsItem}>
            <div className={styles.img}>
              <Image
                src={'/assets/mainImages/game.png'}
                alt="참여 중 모임 썸네일"
                width={150}
                height={200}
              />
            </div>
            <div className={styles.info}>
              <h1>
                참여중 모임참여중 모임참여중 모임참여중 모임참여중 모임참여중
                모임참여중 모임참여중 모임참여중 모임참여중 모임참여중
                모임참여중 모임
              </h1>
              <b>을지로 3가</b>
              <p>
                <span className={styles.time}>1월 7일 ∙ 17:30</span>
                <span className={styles.person}>
                  <Image
                    src={'/assets/myPageImages/person.svg'}
                    alt={'인원 아이콘'}
                    width={18}
                    height={18}
                  />
                  20/20
                </span>
              </p>

              <div className={styles.outBtn}>
                <button>모임 나가기</button>
              </div>
            </div>
          </div>
        </div>
      ) : null}
      {onTab === 'tab2' ? (
        <div className={styles.myGatheringsListWrap}>
          <div className={styles.myGathdringsItem}>
            <div className={styles.img}>
              <Image
                src={'/assets/mainImages/game.png'}
                alt="참여 중 모임 썸네일"
                width={150}
                height={200}
              />
            </div>
            <div className={styles.info}>
              <h1>
                종료된 모임종료된 모임종료된 모임종료된 모임종료된 모임종료된
                모임종료된 모임종료된 모임종료된 모임종료된 모임종료된 모임
              </h1>
              <b>을지로 3가</b>
              <p>
                <span className={styles.time}>1월 7일 ∙ 17:30</span>
                <span className={styles.person}>
                  <Image
                    src={'/assets/myPageImages/person.svg'}
                    alt={'인원 아이콘'}
                    width={18}
                    height={18}
                  />
                  20/20
                </span>
              </p>

              <div className={styles.outBtn}>
                <button>모임 나가기</button>
              </div>
            </div>
          </div>
        </div>
      ) : null}
      {onTab === 'tab3' ? (
        <div className={styles.noMyGatheringsList}>
          <h1>
            <Image
              width={62}
              height={62}
              objectFit="cover"
              src={'/assets/myPageImages/logoGray.png'}
              alt="리스트 없을때 로고"
            />
          </h1>
          <h2>BOGO</h2>
          <p>
            참여중인 모임이 없어요! <br />
            모임을 둘러보면서 <br />
            다양한 게임들을 경험해보세요!
          </p>
          <Link href="/">다양한 모임 둘러보기</Link>
        </div>
      ) : null}
    </div>
  );
}
