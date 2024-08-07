'use client';
import React, { useState } from 'react';
import styles from './GenreGather.module.scss';
import Link from 'next/link';
import Image from 'next/image';
interface DateData {
  id: number;
  title: string;
  tag: string[]; // Array of strings
  participantCount: number;
  capacity: number;
  registerDate: string;
  gatheringDate: string;
  location: string;
  content: string;
  image: string;
  master: {
    nickName: string;
  };
  type: string;
}
export default function GenreGather() {
  const [heart, setHeart] = useState<boolean>(false);
  // const scrollContainerRef = useRef<HTMLUListElement>(null);

  const handleHeartChange = () => {
    setHeart(prevHeart => !prevHeart);
  };
  const data: DateData[] = [
    {
      id: 1,
      title: '안녕하세요~ 2명 구합니다',
      tag: ['전략게임', '정정당당'],
      participantCount: 0,
      capacity: 2,
      registerDate: '2024.07.31 17:55',
      gatheringDate: '2024.08.12 19:00',
      location: '서울시 동작구',
      content:
        '같이 다빈치코드 하실분 2분 구합니다. 위치는 을지로 쪽이면 좋겠습니당',
      image: '/assets/mainImages/game.png',
      master: {
        nickName: 'CG보드게임카페',
      },
      type: 'free',
    },
    {
      master: {
        nickName: '레트라',
      },
      id: 2,
      tag: ['컬렉터블 게임', '고수환영', '초보환영'],
      registerDate: '2024.07.30 13:00',
      gatheringDate: '2024.08.07 13:00',
      title: '스플렌더 배우면서 하실분?',
      location: '서울특별시 구로구',
      content: '처음해보는 게임이라 초보,전문가 다 좋습니다. ',
      participantCount: 5,
      capacity: 7,
      image: '/assets/mainImages/game.png',
      type: 'free',
    },
    {
      master: {
        nickName: 'hun Jun',
      },
      id: 3,
      tag: ['파티게임', '딕싯', '한밤의 늑대인간', '뱅', '블리츠'],
      participantCount: 2,
      capacity: 5,
      registerDate: '2024.07.31 20:00',
      gatheringDate: '2024.08.07 20:00',
      title: '파티게임류 좋아하시는분만',
      location: '서울특별시 관악구',
      content: '딕싯,한밤의 늑대인간,뱅,블리츠..등등 할거에요!',
      image: '/assets/mainImages/game.png',
      type: 'free',
    },
    {
      master: {
        nickName: 'Playte',
      },
      id: 4,
      tag: ['가이아 프로젝트', '잃어버린 함대'],
      participantCount: 0,
      capacity: 1,
      registerDate: '2024.08.01 20:00',
      gatheringDate: '2024.08.07 21:00',
      title: '급하게 모아봅니다 9시에 가이아확장 하실분~',
      location: '서울특별시 강서구',
      content: '9시에 까치산에서 가이아확장 2판하려고 하는데 한분 구해요~',
      image: '/assets/mainImages/game.png',
      type: 'free',
    },
    {
      master: {
        nickName: 'Playte',
      },
      id: 4,
      tag: ['가이아 프로젝트', '잃어버린 함대'],
      participantCount: 0,
      capacity: 1,
      registerDate: '2024.08.01 20:00',
      gatheringDate: '2024.08.07 21:00',
      title: '급하게 모아봅니다 9시에 가이아확장 하실분~',
      location: '서울특별시 강서구',
      content: '9시에 까치산에서 가이아확장 2판하려고 하는데 한분 구해요~',
      image: '/assets/mainImages/game.png',
      type: 'free',
    },
    {
      master: {
        nickName: 'Playte',
      },
      id: 4,
      tag: ['가이아 프로젝트', '잃어버린 함대'],
      participantCount: 0,
      capacity: 1,
      registerDate: '2024.08.01 20:00',
      gatheringDate: '2024.08.07 21:00',
      title: '급하게 모아봅니다 9시에 가이아확장 하실분~',
      location: '서울특별시 강서구',
      content: '9시에 까치산에서 가이아확장 2판하려고 하는데 한분 구해요~',
      image: '/assets/mainImages/game.png',
      type: 'free',
    },
    {
      master: {
        nickName: 'Playte',
      },
      id: 4,
      tag: ['가이아 프로젝트', '잃어버린 함대'],
      participantCount: 0,
      capacity: 1,
      registerDate: '2024.08.01 20:00',
      gatheringDate: '2024.08.07 21:00',
      title: '급하게 모아봅니다 9시에 가이아확장 하실분~',
      location: '서울특별시 강서구',
      content: '9시에 까치산에서 가이아확장 2판하려고 하는데 한분 구해요~',
      image: '/assets/mainImages/game.png',
      type: 'free',
    },
  ];

  // const handleMouseDown = (e: React.MouseEvent) => {
  //   const scrollContainer = scrollContainerRef.current;
  //   if (!scrollContainer) return;

  //   let isDragging = true;
  //   let startX = e.pageX - scrollContainer.offsetLeft;
  //   let scrollLeft = scrollContainer.scrollLeft;

  //   const handleMouseMove = (e: MouseEvent) => {
  //     if (!isDragging) return;
  //     const x = e.pageX - scrollContainer.offsetLeft;
  //     const walk = (x - startX) * 2; // Scroll speed
  //     scrollContainer.scrollLeft = scrollLeft - walk;
  //   };

  //   const handleMouseUp = () => {
  //     isDragging = false;
  //   };

  //   document.addEventListener('mousemove', handleMouseMove);
  //   document.addEventListener('mouseup', handleMouseUp);

  //   scrollContainer.addEventListener('mouseleave', handleMouseUp);
  //   scrollContainer.addEventListener('mouseup', handleMouseUp);
  // };
  return (
    <div>
      <h1 className={styles.title1}>장르에 따라 달라지는 인기모임!</h1>
      <b className={styles.title2}>인기장르 모임!</b>
      <div className={styles.lineTitle}>
        <p>추리게임</p>
      </div>
      <ul
        className={styles.genreList}
        // ref={scrollContainerRef}
        // onMouseDown={handleMouseDown}
      >
        {data.map(e => {
          return (
            <li key={e.id}>
              <Link href="/">
                <span className={styles.deadLineIco}>
                  <Image
                    src={'/assets/mainImages/award.svg'}
                    width={32}
                    height={32}
                    alt={'인기 아이콘'}
                  />
                </span>
                <span className={styles.img}>
                  <Image
                    src={e.image}
                    alt="게임이미지"
                    width={224}
                    height={224}
                  />
                </span>
              </Link>
              <span className={styles.mid}>
                <span className={styles.loc}>
                  <Image
                    src={'/assets/mainImages/loc_ico.svg'}
                    width={224}
                    height={224}
                    alt="지도 이미지"
                  />
                  장소
                </span>
                <span className={styles.heart}>
                  <input
                    type="checkbox"
                    id="favorite1"
                    onChange={handleHeartChange}
                    checked={heart}
                  />
                  <label htmlFor="favorite1">
                    <Image
                      src={
                        heart
                          ? '/assets/mainImages/heart_fill_ico.svg'
                          : '/assets/mainImages/heart_ico.svg'
                      }
                      width={224}
                      height={224}
                      alt="찜 하트"
                    />
                  </label>
                </span>
              </span>
              <Link href="/">
                <span className={styles.tag}>
                  모임 제목은 최대 2줄 까지만 보이게 합니다. 모임 제목은 최대
                  2줄 까지만 보이게 합니다.
                </span>
              </Link>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
