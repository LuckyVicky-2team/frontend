'use client';

import Image from 'next/image';
import { useState } from 'react';
import styles from './TasteButtons.module.scss';

const TasteExamples = [
  { image: '/assets/authImages/01.png', text: '추리' },
  { image: '/assets/authImages/02.png', text: '엉뚱한' },
  { image: '/assets/authImages/03.png', text: '탐험' },
  { image: '/assets/authImages/04.png', text: '쉬운' },
  { image: '/assets/authImages/05.png', text: '보통' },
  { image: '/assets/authImages/06.png', text: '어려운' },
  { image: '/assets/authImages/07.png', text: '개인전' },
  { image: '/assets/authImages/08.png', text: '팀전' },
  { image: '/assets/authImages/09.png', text: '단체' },
  { image: '/assets/authImages/10.png', text: '스피드' },
  { image: '/assets/authImages/11.png', text: 'RPG' },
  { image: '/assets/authImages/12.png', text: '전략' },
];

function TasteButton({ item }: { item: (typeof TasteExamples)[number] }) {
  const [selected, setSelected] = useState(false);

  return (
    <button
      type="button"
      onClick={() => setSelected(prev => !prev)}
      className={`${styles.button} ${selected && styles.selected}`}>
      <Image src={item.image} alt={item.text} width={72} height={72} />
      <p className={`${styles.text} ${selected && styles.selected}`}>
        {item.text}
      </p>
    </button>
  );
}

export default function TasteButtons() {
  return (
    <div className={styles.grid}>
      {TasteExamples.map((item, idx) => {
        return <TasteButton item={item} key={idx} />;
      })}
    </div>
  );
}
