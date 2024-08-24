import Image from 'next/image';
import { Dispatch, SetStateAction, useState } from 'react';
import styles from './GameDataList.module.scss';
import Modal from '@/components/common/Modal';

interface Game {
  id: number;
  title: string;
  image: string;
}

interface IGameDataListProps {
  modalOpen: boolean;
  onClose: () => void;
  gameData: Game[];
  showGameData: boolean;
  setShowGameData: Dispatch<SetStateAction<boolean>>;
  setBoardGameIdList: Dispatch<SetStateAction<number[]>>;
}

export default function GameDataList({
  modalOpen,
  onClose,
  gameData,
  showGameData,
  setShowGameData,
  setBoardGameIdList,
}: IGameDataListProps) {
  const [gameTitle, setGameTitle] = useState('');
  return (
    <Modal onClose={onClose} modalOpen={modalOpen} full>
      <div>
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
        {showGameData && (
          <div className={styles.gameDataList}>
            {gameData.map((data, i) => {
              return (
                <div key={data.id} className={styles.gameDataWithLine}>
                  {i !== 0 && <div className={styles.line} />}
                  <div className={styles.gameData}>
                    <label htmlFor={`${data.title}`} className={styles.label}>
                      <Image
                        src={data.image}
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
            <div className={styles.buttons}>
              <button type="button">{`<`}</button>
              <button type="button">{`>`}</button>
            </div>
          </div>
        )}
      </div>
    </Modal>
  );
}
//
