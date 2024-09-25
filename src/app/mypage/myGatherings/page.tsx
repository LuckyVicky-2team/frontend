'use client';
import styles from './myGatherings.module.scss';
import React, { useState } from 'react';
// import Image from 'next/image';
// import Link from 'next/link';

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
      {onTab === 'tab1' ? <div></div> : null}
      {onTab === 'tab2' ? <div></div> : null}
      {onTab === 'tab3' ? <div></div> : null}
    </div>
  );
}
