'use client';

import { useState } from 'react';
import Modal from '../Modal';
import { IPlaceInfoResponse } from '@/types/kakao';
import { useFunnel } from '@/hooks/useFunnel';
import KakaoList from './KakaoList';
import KakaoMap from './KakaoMap';
import styles from './FindPlaceModal.module.scss';

interface IFindPlaceModalProps {
  modalOpen: boolean;
  onClose: () => void;
}

export default function FindPlaceModal({
  modalOpen,
  onClose,
}: IFindPlaceModalProps) {
  const { Funnel, Step, setStep } = useFunnel('list');
  const [selectedItem, setSelectedItem] = useState<IPlaceInfoResponse>();

  return (
    <Modal modalOpen={modalOpen} onClose={onClose}>
      <div className={styles.container}>
        <Funnel>
          <Step name="list">
            <KakaoList setItem={setSelectedItem} setStep={setStep} />
          </Step>

          <Step name="map">
            <button onClick={() => setStep('list')}>돌아가기</button>
            <KakaoMap
              index={selectedItem?.index}
              coordinate={
                selectedItem && { lat: selectedItem.y, lon: selectedItem.x }
              }
              placeName={selectedItem?.place_name}
            />
          </Step>
        </Funnel>
      </div>
    </Modal>
  );
}
