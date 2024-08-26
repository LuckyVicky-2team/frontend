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
  const [totalPages, setTotalPages] = useState(0);
  const [currentPage, setCurrentPage] = useState(0);
  const [gameData, setGameData] = useState<IGame[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const fetchGames = useCallback(async () => {
    console.log(gameTitle);
    console.log(currentPage);
    setIsLoading(true);
    try {
      const data = await getGames(gameTitle, currentPage);
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
    console.log(data.id);
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
                                : 'assets/images/boardgame.png'
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
                              2명
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
                              15분
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
              {isLoading && <p className={styles.loading}>로딩 중...</p>}
              <div className={styles.buttons}>
                {Array.from({ length: totalPages }, (_, i) => i + 1).map(
                  page => (
                    <button
                      key={page}
                      type="button"
                      onClick={() => handlePageChange(page)}
                      disabled={currentPage === page}>
                      {page}
                    </button>
                  )
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </Modal>
  );
}
//
