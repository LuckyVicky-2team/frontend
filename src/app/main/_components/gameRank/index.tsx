'use client';
import { useEffect, useState } from 'react';
// import styles from './gameRank.module.scss';
import { getGameRank } from '@/api/apis/mypageApis';

export default function GameRank() {
  const [game, setGame] = useState();

  useEffect(() => {
    const fetchGatherings = async () => {
      try {
        const response = await getGameRank();
        setGame(response.data);
      } catch (err) {
        console.log('err :', err);
      } finally {
        console.log('final');
      }
    };

    fetchGatherings();
  }, []);

  console.log('게임랭킹', game);

  return (
    <div>
      <div></div>
    </div>
  );
}
