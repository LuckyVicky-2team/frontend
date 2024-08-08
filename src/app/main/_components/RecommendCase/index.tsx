'use client';
import React from 'react';
import styles from './RecommendCase.module.scss';
import Link from 'next/link';
import Image from 'next/image';
// interface DateData {
//   id: number;
//   title: string;
//   tag: string[]; // Array of strings
//   participantCount: number;
//   capacity: number;
//   registerDate: string;
//   gatheringDate: string;
//   location: string;
//   content: string;
//   image: string;
//   master: {
//     nickName: string;
//   };
//   type: string;
// }
export default function RecommendCase() {
  // const data: DateData[] = [
  //   {
  //     id: 1,
  //     title: '안녕하세요~ 2명 구합니다',
  //     tag: ['전략게임', '정정당당'],
  //     participantCount: 0,
  //     capacity: 2,
  //     registerDate: '2024.07.31 17:55',
  //     gatheringDate: '2024.08.12 19:00',
  //     location: '서울시 동작구',
  //     content:
  //       '같이 다빈치코드 하실분 2분 구합니다. 위치는 을지로 쪽이면 좋겠습니당',
  //     image: '/assets/mainImages/re1.png',
  //     master: {
  //       nickName: 'CG보드게임카페',
  //     },
  //     type: 'free',
  //   },
  //   {
  //     master: {
  //       nickName: '레트라',
  //     },
  //     id: 2,
  //     tag: ['컬렉터블 게임', '고수환영', '초보환영'],
  //     registerDate: '2024.07.30 13:00',
  //     gatheringDate: '2024.08.07 13:00',
  //     title: '스플렌더 배우면서 하실분?',
  //     location: '서울특별시 구로구',
  //     content: '처음해보는 게임이라 초보,전문가 다 좋습니다. ',
  //     participantCount: 5,
  //     capacity: 7,
  //     image: '/assets/mainImages/re1.png',
  //     type: 'free',
  //   },
  //   {
  //     master: {
  //       nickName: 'hun Jun',
  //     },
  //     id: 3,
  //     tag: ['파티게임', '딕싯', '한밤의 늑대인간', '뱅', '블리츠'],
  //     participantCount: 2,
  //     capacity: 5,
  //     registerDate: '2024.07.31 20:00',
  //     gatheringDate: '2024.08.07 20:00',
  //     title: '파티게임류 좋아하시는분만',
  //     location: '서울특별시 관악구',
  //     content: '딕싯,한밤의 늑대인간,뱅,블리츠..등등 할거에요!',
  //     image: '/assets/mainImages/re1.png',
  //     type: 'free',
  //   },
  //   {
  //     master: {
  //       nickName: 'Playte',
  //     },
  //     id: 4,
  //     tag: ['가이아 프로젝트', '잃어버린 함대'],
  //     participantCount: 0,
  //     capacity: 1,
  //     registerDate: '2024.08.01 20:00',
  //     gatheringDate: '2024.08.07 21:00',
  //     title: '급하게 모아봅니다 9시에 가이아확장 하실분~',
  //     location: '서울특별시 강서구',
  //     content: '9시에 까치산에서 가이아확장 2판하려고 하는데 한분 구해요~',
  //     image: '/assets/mainImages/re1.png',
  //     type: 'free',
  //   },
  // ];

  return (
    <div>
      <h1 className={styles.title}>주어진 환경은 다르니까!</h1>
      <b className={styles.title2}>상황별 추천!</b>
      <ul className={styles.recommendList}>
        <li>
          <Link href="/">
            <span className={styles.img}>
              <Image
                width={222}
                height={222}
                src={'/assets/mainImages/re1_1.png'}
                alt="1"
              />
            </span>
            <span className={styles.tag}>2인 게임</span>
          </Link>
        </li>
        <li>
          <Link href="/">
            <span className={styles.img}>
              <Image
                width={122}
                height={122}
                src={'/assets/mainImages/re2_1.png'}
                alt="1"
              />
            </span>
            <span className={styles.tag}>3인 게임</span>
          </Link>
        </li>
        <li>
          <span className={styles.bubble}>
            <span className={styles.font}>인기</span>
          </span>
          <Link href="/">
            <span className={styles.img}>
              <Image
                width={122}
                height={122}
                src={'/assets/mainImages/re3_1.png'}
                alt="1"
              />
            </span>
            <span className={styles.tag}>다인원</span>
          </Link>
        </li>
        <li>
          <Link href="/">
            <span className={styles.img}>
              <Image
                width={122}
                height={122}
                src={'/assets/mainImages/re4_1.png'}
                alt="1"
              />
            </span>
            <span className={styles.tag}>장르별</span>
          </Link>
        </li>
      </ul>
    </div>
  );
}
