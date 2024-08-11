'use client';

import { InputHTMLAttributes, KeyboardEvent, useEffect, useState } from 'react';
import Input from '../Input';
import Tag from '../Tag';
import styles from './TagInput.module.scss';

interface ITagInputProps extends InputHTMLAttributes<HTMLInputElement> {
  defaultValues?: string[];
  setItems: (_tags: string[]) => void;
}

export default function TagInput({
  defaultValues,
  setItems,
  ...props
}: ITagInputProps) {
  const [values, setValues] = useState<string[]>([]);

  const handleClickTagRemove = (targetValue: string) => {
    const newValues = values.filter(value => value !== targetValue);

    setValues(newValues);
    setItems(newValues);
  };

  const handleKeyupEnter = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      const targetValue = e.currentTarget.value;
      // 한글과 영어, 숫자만 허용(띄어쓰기 금지)
      const tagPattern = /^[a-zA-Z0-9가-힣]+$/;

      if (
        !targetValue ||
        values.includes(targetValue) ||
        values.length >= 10 ||
        targetValue.length > 30
      ) {
        e.currentTarget.value = '';
        return;
      }

      if (!tagPattern.test(targetValue)) {
        e.currentTarget.value = '';
        return;
      }

      const newValues = [...values, targetValue];

      setValues(newValues);
      setItems(newValues);
      e.currentTarget.value = '';
    }
  };

  useEffect(() => {
    if (!defaultValues) return;
    setValues(defaultValues);
    setItems(defaultValues);
  }, [defaultValues, setItems]);

  return (
    <div>
      <Input
        onKeyUp={handleKeyupEnter}
        onKeyDown={e => {
          if (e.key === 'Enter') {
            e.preventDefault();
          }
        }}
        {...props}
      />
      <div className={styles.values}>
        {values.map((value, idx) => {
          return (
            <Tag
              key={idx}
              className={styles.value}
              onClick={() => handleClickTagRemove(value)}
              size="large">
              {value}
            </Tag>
          );
        })}
      </div>
    </div>
  );
}
