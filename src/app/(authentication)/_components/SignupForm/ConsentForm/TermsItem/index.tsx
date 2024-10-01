'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import { ConsentFormType } from '@/types/request/authRequestTypes';
import CheckButton from '../CheckButton';
import Modal from '@/components/common/Modal';
import useModal from '@/hooks/useModal';
import { useToast } from '@/contexts/toastContext';
import getFormattedDate from '@/utils/getFormattedDate';
import styles from './TermsItem.module.scss';

interface ITermsAgreementResponseType {
  type: string;
  title: string;
  content: string;
  required: boolean;
}

interface ITermsItemProps {
  value: ConsentFormType;
  setValue: (_value: ConsentFormType) => void;
  condition: ITermsAgreementResponseType;
}

export default function TermsItem({
  value,
  setValue,
  condition,
}: ITermsItemProps) {
  const { modalOpen, handleModalOpen, handleModalClose } = useModal();
  const { addToast } = useToast();
  const [isFirstRender, setIsFirstRender] = useState(true);

  useEffect(() => {
    if (isFirstRender) {
      setIsFirstRender(false);
    }
  }, [value]);

  useEffect(() => {
    if (!isFirstRender && condition.type === 'PUSH') {
      addToast(
        value.some(item => {
          if (item.termsConditionsType === 'PUSH') {
            return item.agreement;
          }
        })
          ? `${getFormattedDate()} 에 푸시 알림 수신 동의했습니다. (전송자: 보드고)`
          : `${getFormattedDate()} 에 푸시 알림 수신 동의를 철회했습니다. (전송자: 보드고)`,
        'success'
      );
    }
  }, [
    value.some(item => {
      if (item.termsConditionsType === condition.type) {
        return item.agreement;
      }
    }),
  ]);

  return (
    <div className={styles.terms} key={condition.type}>
      <CheckButton
        isChecked={value.some(item => {
          if (item.termsConditionsType === condition.type) {
            return item.agreement;
          }
        })}
        onClick={() => {
          setValue(
            value.map(item =>
              item.termsConditionsType !== condition.type
                ? item
                : item.agreement
                  ? { ...item, agreement: false }
                  : { ...item, agreement: true }
            )
          );
        }}
      />
      <p className={styles.title}>{condition.title}</p>
      <Modal modalOpen={modalOpen} onClose={handleModalClose} maxWidth={552}>
        <div className={styles.modal}>
          <div className={styles.modalContents}>
            <h1 className={styles.modalTitle}>{condition.title}</h1>
            <div className={styles.modalDescription}>
              <p className={styles.modalText}>{condition.content}</p>
            </div>
          </div>
          <button
            type="button"
            className={styles.closeModalButton}
            onClick={handleModalClose}>
            닫기
          </button>
        </div>
      </Modal>
      <button
        type="button"
        className={styles.detailModalButton}
        onClick={handleModalOpen}>
        자세히보기
        <Image
          src="/assets/icons/chevron-right.svg"
          alt="내용 보기"
          width={20}
          height={20}
        />
      </button>
    </div>
  );
}
