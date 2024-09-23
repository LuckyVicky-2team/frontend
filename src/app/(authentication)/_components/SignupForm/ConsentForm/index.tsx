'use client';

import CheckButton from './CheckButton';
import { ConsentFormType } from '@/types/request/authRequestTypes';
import TermsItem from './TermsItem';
import styles from './ConsentForm.module.scss';

interface ITermsAgreementResponseType {
  type: string;
  title: string;
  content: string;
  required: boolean;
}

interface IConsentFormProps {
  value: ConsentFormType;
  setValue: (_value: ConsentFormType) => void;
  conditions: ITermsAgreementResponseType[];
}

export default function ConsentForm({
  value,
  setValue,
  conditions,
}: IConsentFormProps) {
  return (
    <div className={styles.form}>
      <div className={styles.allConsent}>
        <CheckButton
          isChecked={value.every(item => {
            return item.agreement;
          })}
          onClick={() => {
            if (value.some(item => item.agreement !== true)) {
              setValue(
                value.map(item => ({
                  ...item,
                  agreement: true,
                }))
              );
            } else {
              setValue(
                value.map(item => ({
                  ...item,
                  agreement: false,
                }))
              );
            }
          }}
        />
        전체동의하기
      </div>
      <hr className={styles.divisionLine} />
      {conditions.map((condition: ITermsAgreementResponseType) => {
        return (
          <TermsItem
            value={value}
            setValue={setValue}
            condition={condition}
            key={condition.type}
          />
        );
      })}
    </div>
  );
}
