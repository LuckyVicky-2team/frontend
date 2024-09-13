'use client';

import { useGetTermsAgreement } from '@/api/queryHooks/auth';
import CheckButton from './CheckButton';
import Image from 'next/image';
import { ConsentFormType } from '@/types/request/authRequestTypes';
import { Dispatch, SetStateAction } from 'react';
import Button from '@/components/common/Button';
import Spinner from '@/components/common/Spinner';
import styles from './ConsentForm.module.scss';

interface ITermsAgreementResponseType {
  type: string;
  title: string;
  content: string;
  required: boolean;
}

interface IConsentFormProps {
  value: ConsentFormType;
  setValue: Dispatch<SetStateAction<ConsentFormType>>;
  setStep: Dispatch<SetStateAction<string>>;
}

export default function ConsentForm({
  value,
  setValue,
  setStep,
}: IConsentFormProps) {
  const { data, isLoading, isError } = useGetTermsAgreement('all');

  return (
    <>
      {isLoading ? (
        <div className={styles.except}>
          <Spinner />
        </div>
      ) : isError ? (
        <div className={styles.except}>약관 내용을 불러올 수 없습니다.</div>
      ) : (
        data?.data.map((condition: ITermsAgreementResponseType) => {
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
              <button type="button" className={styles.detail}>
                <Image
                  src="/assets/icons/chevron-right.svg"
                  alt="내용 보기"
                  width={32}
                  height={32}
                />
              </button>
            </div>
          );
        })
      )}
      <Button
        onClick={() => {
          setStep('second');
        }}
        disabled={
          !data?.data.every((item: ITermsAgreementResponseType) => {
            if (item.required) {
              return (
                value.find(term => item.type === term.termsConditionsType)
                  ?.agreement === true
              );
            }
            return true;
          })
        }
        className={styles.button}>
        확인
      </Button>
    </>
  );
}
