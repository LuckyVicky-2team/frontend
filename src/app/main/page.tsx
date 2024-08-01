import DeadLineGather from './_components/DaedLineGather/DeadLineGather';
import Image from 'next/image';
import styles from './main.module.scss';
import Banner from './img/banner.png';
import SearchBtn from './img/search.png';

export default function Main() {
  return (
    <main>
      <div className={styles.container}>
        <div className={styles.banner}>
          <Image src={Banner} alt="배너이미지" />
        </div>
        <div>
          <input type="text" />
          <button type="button">
            <Image src={SearchBtn} alt="검색이미지"></Image>
          </button>
        </div>
        <DeadLineGather />
      </div>
    </main>
  );
}
