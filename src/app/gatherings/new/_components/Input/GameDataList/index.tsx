import Image from 'next/image';
import { Dispatch, SetStateAction } from 'react';
import styles from './GameDataList.module.scss';

interface Game {
  id: number;
  title: string;
  image: string;
}

interface IGameDataListProps {
  gameData: Game[];
  showGameData: boolean;
  setShowGameData: Dispatch<SetStateAction<boolean>>;
  setBoardGameIdList: Dispatch<SetStateAction<number[]>>;
  setGameTitle: Dispatch<SetStateAction<string>>;
}

export default function GameDataList({
  gameData,
  showGameData,
  setShowGameData,
  setBoardGameIdList,
  setGameTitle,
}: IGameDataListProps) {
  return (
    <div>
      {showGameData && (
        <div className={styles.gameDataList}>
          {gameData.map(data => {
            return (
              <div key={data.id}>
                <label htmlFor={`${data.title}`}>
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
                  }}
                />
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
//
