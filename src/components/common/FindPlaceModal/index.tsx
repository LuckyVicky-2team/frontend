'use client';

import { KeyboardEvent, useEffect, useState } from 'react';
import Image from 'next/image';
import Modal from '../Modal';
import { IPlaceInfoResponse } from '@/types/kakao';
import { useFunnel } from '@/hooks/useFunnel';
import KakaoList from './KakaoList';
import KakaoMap from './KakaoMap';
import PlaceListItem from './KakaoList/PlaceListItem';
import useGetCurrentCoordinate from '@/api/queryHooks/geolocation';
import kakaoSearch from '@/utils/kakaoSearch';
import PlaceSearchBar from './PlaceSearchBar';
import styles from './FindPlaceModal.module.scss';

interface IFindPlaceModalProps {
  modalOpen: boolean;
  onClose: () => void;
  setLatitude: (_y: string) => void;
  setLongitude: (_x: string) => void;
}

export default function FindPlaceModal({
  modalOpen,
  onClose,
  setLatitude,
  setLongitude,
}: IFindPlaceModalProps) {
  const { Funnel, Step, setStep } = useFunnel('list');
  const [list, setList] = useState<IPlaceInfoResponse[]>([]);
  const [selectedItem, setSelectedItem] = useState<IPlaceInfoResponse>();
  const [searchLoading, setSearchLoading] = useState(false);

  const { data: myPosition, isLoading } = useGetCurrentCoordinate();

  const setPlaceList = async (
    keyword: string,
    size?: number,
    coordinate?: { lat: number; lon: number }
  ) => {
    try {
      setSearchLoading(true);
      const newList = await kakaoSearch(keyword, size, coordinate);
      setList(newList);
    } catch (error) {
      console.log(error);
    } finally {
      setSearchLoading(false);
    }
  };

  const handlePressEnter = async (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      const targetValue = e.currentTarget.value;

      if (!targetValue) {
        setList([]);
        return;
      }

      const keyword = `${targetValue}`;

      setPlaceList(keyword);
    }
  };

  useEffect(() => {
    if (!myPosition || isLoading) return;

    const keyword = '보드카페';

    setPlaceList(keyword, 15, {
      lat: myPosition.y,
      lon: myPosition.x,
    });
  }, [myPosition, isLoading]);

  return (
    <Modal modalOpen={modalOpen} onClose={onClose}>
      <div className={styles.container}>
        <Funnel>
          <Step name="list">
            <div className={styles.list}>
              <PlaceSearchBar
                onKeyUp={handlePressEnter}
                disabled={isLoading || searchLoading}
              />
              {isLoading || searchLoading ? (
                <div className={styles.exception}>로딩중입니다</div>
              ) : list.length ? (
                <KakaoList
                  list={list}
                  setItem={setSelectedItem}
                  setStep={setStep}
                  myPosition={myPosition}
                />
              ) : (
                <div className={styles.exception}>검색 결과가 없습니다</div>
              )}
            </div>
          </Step>

          <Step name="map">
            <button
              onClick={() => setStep('list')}
              className={styles.backButton}>
              <Image
                src="/assets/icons/backArrow.svg"
                alt="돌아가기"
                width={32}
                height={32}
              />
              돌아가기
            </button>
            {selectedItem && (
              <div className={styles.map}>
                <KakaoMap
                  index={selectedItem.index}
                  coordinate={{ lat: selectedItem.y, lon: selectedItem.x }}
                  placeName={selectedItem.place_name}
                />
                <PlaceListItem
                  item={selectedItem}
                  index={selectedItem.index}
                  className={styles.selectedItem}
                />
                <button
                  className={styles.selectButton}
                  onClick={() => {
                    setLatitude(selectedItem.y);
                    setLongitude(selectedItem.x);
                    onClose();
                    setStep('list');
                  }}>
                  장소 선택하기
                </button>
              </div>
            )}
          </Step>
        </Funnel>
      </div>
    </Modal>
  );
}