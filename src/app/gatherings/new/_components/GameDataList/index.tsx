import Image from 'next/image';
import {
  Dispatch,
  SetStateAction,
  useCallback,
  useEffect,
  useState,
} from 'react';
import styles from './GameDataList.module.scss';
import Modal from '@/components/common/Modal';
import { getGames } from '@/api/apis/gameApi';
import { useToast } from '@/contexts/toastContext';

interface IGenre {
  id: number;
  title: string;
}

interface IGame {
  id: number;
  title: string;
  thumbnail: string;
  genres: IGenre[];
  minPeople: number;
  maxPeople: number;
  minPlaytime: number;
  maxPlaytime: number;
}

interface IBoardGameIdTitle {
  id: number;
  title: string;
}

interface IGameDataListProps {
  modalOpen: boolean;
  onClose: () => void;
  showGameData: boolean;
  setShowGameData: Dispatch<SetStateAction<boolean>>;
  setBoardGameIdTitleList: Dispatch<SetStateAction<IBoardGameIdTitle[]>>;
  setGenreIdList: Dispatch<SetStateAction<number[]>>;
}

export default function GameDataList({
  modalOpen,
  onClose,
  showGameData,
  setShowGameData,
  setBoardGameIdTitleList,
  setGenreIdList,
}: IGameDataListProps) {
  const { addToast } = useToast();
  const [gameTitle, setGameTitle] = useState('');
  const [totalPages, setTotalPages] = useState(24);
  const [currentPage, setCurrentPage] = useState(1);
  const [gameData, setGameData] = useState<IGame[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  // const gameDataMock = Array.from({ length: 5 }, (_, i) => i + 1).map(i => {
  //   return {
  //     id: i,
  //     title: `title${i}`,
  //     thumbnail: '/',
  //     genres: { title: 'genre', id: 1 },
  //   };
  // });

  const fetchGames = useCallback(async () => {
    // console.log(gameTitle);
    // console.log(currentPage);
    setIsLoading(true);
    try {
      const data = await getGames(gameTitle, currentPage - 1);
      console.log(data);
      setTotalPages(data.totalPages);
      setGameData(data.content);
    } catch (error) {
      addToast('게임을 불러오는데 실패했습니다.', 'error');
    } finally {
      setIsLoading(false);
    }
  }, [gameTitle, currentPage]);

  useEffect(() => {
    fetchGames();
  }, [gameTitle, currentPage]);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const handleGameClick = (data: IGame) => {
    // console.log(data.id);
    setBoardGameIdTitleList(prev => {
      for (let game of prev) {
        if (game.id === data.id) return prev;
      }
      return [...new Set([...prev, { title: data.title, id: data.id }])];
    });
    setGenreIdList(prev => {
      if (data.genres) {
        let genreIds = [];
        for (const genre of data.genres) {
          genreIds.push(genre.id);
        }
        return [...new Set([...prev, ...genreIds])];
      }
      return prev;
    });
    setShowGameData(false);
    setGameTitle('');
    onClose();
  };

  return (
    <Modal onClose={onClose} modalOpen={modalOpen} full>
      <div className={styles.body}>
        <h1 className={styles.title}>보드게임 검색</h1>
        <p className={styles.description}>보드게임을 골라보세요!</p>
        <div>
          <div className={styles.inputContainer}>
            <input
              id="gameTitle"
              className={styles.gameInput}
              placeholder={'보드게임'}
              value={gameTitle}
              onChange={e => {
                const isEmpty = e.target.value === '';
                setGameTitle(e.target.value);
                setShowGameData(!isEmpty);
              }}
            />
            <Image
              src={'/assets/icons/search.svg'}
              alt="돋보기 이미지"
              width={24}
              height={24}
            />
          </div>
          {isLoading && !showGameData && (
            <p className={styles.loading}>로딩 중...</p>
          )}
          {showGameData && (
            <div className={styles.gameDataList}>
              {gameData.map((data, i) => {
                return (
                  <div key={data.id} className={styles.gameDataWithLine}>
                    {i !== 0 && <div className={styles.line} />}
                    <div className={styles.gameData}>
                      <label htmlFor={`${data.title}`} className={styles.label}>
                        <div className={styles.thumbnail}>
                          <Image
                            src={
                              data.thumbnail
                                ? /* eslint-disable indent */
                                  `https://${
                                    process.env.NEXT_PUBLIC_CLOUDFRONT_DOMAIN
                                  }/${data.thumbnail}`
                                : '/assets/images/boardgame.png'
                            }
                            alt={data.title}
                            width={40}
                            height={47}
                          />
                        </div>
                        <div>
                          <p className={styles.gameTitle}>{data.title}</p>
                          <div className={styles.gameInfo}>
                            <div
                              style={{
                                display: 'flex',
                                alignItems: 'center',
                                gap: '6px',
                              }}>
                              <Image
                                src={'/assets/icons/person-icon.svg'}
                                alt="사람"
                                width={16}
                                height={16}
                              />
                              {data.minPeople === data.maxPeople
                                ? data.minPeople
                                : `${data.minPeople}-${data.maxPeople}`}
                              명
                            </div>
                            <Image
                              src={'/assets/icons/vector-vertical-gray.svg'}
                              alt="구분선"
                              width={1}
                              height={20}
                            />
                            <div
                              style={{
                                display: 'flex',
                                alignItems: 'center',
                                gap: '6px',
                              }}>
                              <Image
                                src={'/assets/icons/clock.svg'}
                                alt="시계"
                                width={16}
                                height={16}
                              />
                              {data.minPlaytime === data.maxPlaytime
                                ? data.minPlaytime
                                : `${data.minPlaytime}-${data.maxPlaytime}`}
                              분
                            </div>
                          </div>
                        </div>
                      </label>
                      <input
                        id={`${data.title}`}
                        type="radio"
                        value={data.id}
                        defaultChecked
                        onClick={() => handleGameClick(data)}
                      />
                    </div>
                  </div>
                );
              })}

              <div className={styles.buttons}>
                {/* {Array.from({ length: totalPages }, (_, i) => i + 1).map(
                  page => (
                    <button
                      key={page}
                      type="button"
                      onClick={() => handlePageChange(page)}
                      disabled={currentPage === page}>
                      {page}
                    </button>
                  )
                )} */}
                <button type="button" onClick={() => handlePageChange(1)}>
                  <Image
                    src={'/assets/icons/chevron-double-left.svg'}
                    alt="맨 이전 번호로 가기"
                    width={36}
                    height={36}
                  />
                </button>
                <button
                  type="button"
                  onClick={() =>
                    setCurrentPage(prev => {
                      if (prev !== 1) {
                        return prev - 1;
                      }
                      return prev;
                    })
                  }>
                  <Image
                    src={'/assets/icons/chevron-left.svg'}
                    alt="이전 번호로 가기"
                    width={36}
                    height={36}
                  />
                </button>
                {/* 1,2,3,4,5             {length: 5, start: 1}
                    6,7,8,9,10           {length: 5, start: 6}
                    11,12,13,14,15    {length: 5, start: 11}
                    16, 17                 {length: 2, start: 16}

                    17 나누기 5 = 몫:3, 나머지: 2 */}
                {Array.from(
                  //페이지 숫자의 개수를 설정하는 부분 (화살표 사이에 들어가는 숫자의 개수)
                  {
                    length:
                      totalPages - currentPage <
                      totalPages - Math.floor(totalPages / 5) * 5
                        ? totalPages - Math.floor((currentPage - 1) / 5) * 5
                        : 5,
                  },
                  (_, i) => Math.floor((currentPage - 1) / 5) * 5 + i + 1
                ).map(page => (
                  <button
                    key={page}
                    type="button"
                    onClick={() => handlePageChange(page)}
                    disabled={currentPage === page}
                    className={`${styles.numberButton} ${currentPage === page ? styles.blue : ''}`}>
                    {page}
                  </button>
                ))}
                <button
                  type="button"
                  onClick={() =>
                    setCurrentPage(prev => {
                      if (prev !== totalPages) {
                        return prev + 1;
                      }
                      return prev;
                    })
                  }>
                  <Image
                    src={'/assets/icons/chevron-right.svg'}
                    alt="이후 번호로 가기"
                    width={36}
                    height={36}
                  />
                </button>
                <button
                  type="button"
                  onClick={() => handlePageChange(totalPages)}>
                  <Image
                    src={'/assets/icons/chevron-double-right.svg'}
                    alt="맨 이후 번호로 가기"
                    width={36}
                    height={36}
                  />
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </Modal>
  );
}
//
