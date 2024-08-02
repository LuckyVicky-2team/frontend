import React, { ChangeEvent } from 'react';
import styles from './SelectBox.module.scss';

interface ISelectOptionProps {
  optionSet: (number | string)[] | [];
}
interface ISelectBoxProps extends ISelectOptionProps {
  optionTitle?: string;
  className?: string;
  isDisabled?: boolean;
  value?: string;
  clickOptionHandler: (_event: ChangeEvent<HTMLSelectElement>) => void;
  id: string;
}

export default function SelectBox({
  value,
  isDisabled = false,
  className,
  clickOptionHandler,
  optionTitle = '',
  optionSet = [],
  id = '',
}: ISelectBoxProps) {
  return (
    <select
      id={id}
      value={value}
      disabled={isDisabled}
      className={`${styles.select} ${className}`}
      onChange={clickOptionHandler}>
      {optionTitle && <option value={''}>{optionTitle}</option>}
      {optionSet.map((item, idx) => {
        return (
          <option key={idx} value={item}>
            {item}
          </option>
        );
      })}
    </select>
  );
}
