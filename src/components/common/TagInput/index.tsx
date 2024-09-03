'use client';

import { InputHTMLAttributes, KeyboardEvent, useState } from 'react';
import Input from '../Input';
import Tag from '../Tag';
import { useFormContext, useWatch } from 'react-hook-form';
import styles from './TagInput.module.scss';

interface ITagInputProps extends InputHTMLAttributes<HTMLInputElement> {
  fieldName: string;
}

export default function TagInput({ fieldName, ...props }: ITagInputProps) {
  const { control, setValue } = useFormContext();

  const tags = useWatch({ name: fieldName, control });

  const [errorMessage, setErrorMessage] = useState('');

  const handleClickTagRemove = (targetValue: string) => {
    const newValues = tags.filter((tag: string) => tag !== targetValue);

    setValue(fieldName, newValues);
  };

  const handleKeyupEnter = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      const targetValue = e.currentTarget.value;
      // 한글과 영어, 숫자, 띄어쓰기만 허용
      const tagPattern = /^(?!.*\s{2})(?!\s)[a-zA-Z0-9가-힣ㄱ-ㅎ\s]+(?<!\s)$/;

      if (!targetValue) {
        return;
      }
      if (tags.includes(targetValue)) {
        setErrorMessage('이미 존재하는 태그입니다');
        e.currentTarget.value = '';
        return;
      }
      if (tags.length >= 10) {
        setErrorMessage('태그는 최대 10개까지만 추가할 수 있습니다');
        e.currentTarget.value = '';
        return;
      }
      if (targetValue.length > 10) {
        setErrorMessage('태그는 최대 10자까지 입력할 수 있습니다');
        e.currentTarget.value = '';
        return;
      }
      if (!tagPattern.test(targetValue)) {
        setErrorMessage('한글과 영어, 숫자, 띄어쓰기만 허용됩니다');
        e.currentTarget.value = '';
        return;
      }

      const newValues = [...tags, targetValue];

      setValue(fieldName, newValues);
      setErrorMessage('');
      e.currentTarget.value = '';
    }
  };

  return (
    <div className={styles.container}>
      <Input
        onKeyUp={handleKeyupEnter}
        onKeyDown={e => {
          if (e.key === 'Enter') {
            e.preventDefault();
          }
        }}
        isError={!!errorMessage}
        onFocus={() => setErrorMessage('')}
        {...props}
      />
      {errorMessage && <p className={styles.errorMessage}>{errorMessage}</p>}
      <div className={styles.values}>
        {tags.map((value: string, idx: number) => {
          return (
            <Tag
              key={idx}
              className={styles.value}
              onClick={() => handleClickTagRemove(value)}
              size="large"
              enableDelete>
              {value}
            </Tag>
          );
        })}
      </div>
    </div>
  );
}
