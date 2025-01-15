'use client';

import React, {
  ChangeEvent,
  useState,
  ReactNode,
  FocusEvent,
  useEffect,
} from 'react';
import styles from './SelectBox.module.scss';

interface ISelectOptionProps {
  optionSet: (number | string)[] | { [key: string]: any }[] | [];
}
interface ISelectBoxProps extends ISelectOptionProps {
  optionTitle?: string;
  className?: string;
  isDisabled?: boolean;
  value?: string;
  leftLabel?: ReactNode;
  rightLabel?: ReactNode;
  clickOptionHandler: (_event: ChangeEvent<HTMLSelectElement>) => void;
  id: string;
}

export default function SelectBox({
  leftLabel,
  rightLabel,
  value,
  isDisabled = false,
  className,
  clickOptionHandler,
  optionTitle = '',
  optionSet = [],
  id = '',
}: ISelectBoxProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedName, setSelectedName] = useState(value);

  const handleToggle = () => {
    if (!isDisabled) {
      setIsOpen(prev => !prev);
    }
  };

  const handleOptionClick = (optionValue: any, optionName: string) => {
    setSelectedName(optionName);
    setIsOpen(false);
    clickOptionHandler({
      target: { value: optionValue },
    } as unknown as ChangeEvent<HTMLSelectElement>);
  };

  const handleBlur = (event: FocusEvent<HTMLDivElement>) => {
    if (!event.currentTarget.contains(event.relatedTarget as Node)) {
      setIsOpen(false);
    }
  };

  useEffect(() => {
    const noOptionTitle =
      !optionTitle &&
      (value === undefined || value === '') &&
      optionSet.length > 0;
    if (noOptionTitle) {
      const firstOption =
        typeof optionSet[0] === 'object' && 'name' in optionSet[0]
          ? optionSet[0].name
          : optionSet[0];
      setSelectedName(firstOption); // 첫 번째 인덱스 값을 자동선택
    } else if (optionTitle && (value === '' || value === undefined)) {
      setSelectedName(optionTitle);
    }
  }, [value]);

  return (
    <div
      className={`${styles.filter} ${className}`}
      id={id}
      tabIndex={0}
      onBlur={handleBlur}>
      <div
        className={`${styles.select} ${isDisabled ? styles.disabled : ''}`}
        onClick={handleToggle}>
        {leftLabel && (
          <span className={`${styles.label} ${styles.left}`}>{leftLabel}</span>
        )}
        {selectedName || optionTitle}
        {rightLabel && (
          <span className={`${styles.label} ${styles.right}`}>
            {rightLabel}
          </span>
        )}
      </div>
      {isOpen && (
        <ul className={styles.options}>
          {optionTitle && (
            <li onClick={() => handleOptionClick('', '')}>{optionTitle}</li>
          )}
          {optionSet.map((item, idx) => {
            const optionValue =
              typeof item === 'object' ? (item?.value ?? item.name) : item;
            const optionName = typeof item === 'object' ? item.name : item;
            return (
              <li
                key={`${optionName}_${idx}`}
                onClick={() => handleOptionClick(optionValue, optionName)}
                className={selectedName === optionName ? styles.selected : ''}>
                {optionName}
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
}
