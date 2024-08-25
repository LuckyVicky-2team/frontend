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

interface IGameDataListProps {
  modalOpen: boolean;
  onClose: () => void;
  showGameData: boolean;
  setShowGameData: Dispatch<SetStateAction<boolean>>;
  setBoardGameIdList: Dispatch<SetStateAction<number[]>>;
}

export default function GameDataList({
  modalOpen,
  onClose,
  showGameData,
  setShowGameData,
  setBoardGameIdList,
}: IGameDataListProps) {
  const { addToast } = useToast();
  const [gameTitle, setGameTitle] = useState('');
  const [totalPages, setTotalPages] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [gameData, setGameData] = useState<IGame[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const fetchGames = useCallback(async () => {
    setIsLoading(true);
    try {
      const data = await getGames(gameTitle, currentPage);
      setTotalPages(data.totalPages);
      setGameData(data.content);
    } catch (error) {
      addToast('게임을 불러오는데 실패했습니다.', 'error');
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchGames();
  }, [gameTitle, currentPage]);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
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
                if (e.target.value === '') {
                  setShowGameData(false);
                  return;
                }
                setGameTitle(e.target.value);
                setShowGameData(true);
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
                          width={30}
                          height={30}
                        />
                        <p>{data.title}</p>
                      </label>
                      <input
                        id={`${data.title}`}
                        type="radio"
                        value={data.id}
                        defaultChecked
                        onClick={() => {
                          console.log(data.id);
                          setBoardGameIdList(prev => {
                            return [...new Set([...prev, data.id])];
                          });
                          setShowGameData(false);
                          setGameTitle('');
                          onClose();
                        }}
                      />
                    </div>
                  </div>
                );
              })}
              {isLoading && <p>로딩 중...</p>}
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
