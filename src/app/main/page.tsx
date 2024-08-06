import RecommendCase from './_components/RecommendCase';
import GenreGather from './_components/GenreGather';
import DeadLineGather from './_components/DaedLineGather';
import MainNav from './_components/MainNav/MainNav';
import Image from 'next/image';
import styles from './main.module.scss';

export default function Main() {
  return (
    <main>
      <div className={styles.container}>
        {/* <Header /> */}
        <div className={styles.banner}>
          <h2>
            BOGO
            <br />
            OPEN !!
          </h2>
          <p>보드게임, 같이 할래요?</p>
          {/* <Image src={Banner} alt="배너이미지" /> */}
        </div>
        <div className={styles.searchBarWrap}>
          <div className={styles.searchBar}>
            <input
              type="text"
              placeholder={'나에게 딱! 맞는 모임을 추천해주세요'}
            />
            <button type="button">
              <Image
                src={'/assets/mainImages/search.png'}
                width={24}
                height={24}
                alt="검색이미지"></Image>
            </button>
          </div>
        </div>
        <div className={styles.contentContainer}>
          <MainNav />
        </div>
        <div className={styles.contentContainerWrap}>
          <div className={styles.contentContainer}>
            <RecommendCase />
          </div>
          <div className={styles.contentContainer}>
            <GenreGather />
          </div>
          <div className={styles.contentContainer}>
            <DeadLineGather />
          </div>
        </div>
        {/* <Footer /> */}
      </div>
    </main>
  );
}
