import React, { EventHandler, MouseEvent } from 'react';
import styles from './IconButton.module.scss';
import Image from 'next/image';

type MouseEventHandler<T = Element> = EventHandler<MouseEvent<T>>;
interface IIconButtonProps {
  imgUrl: string;
  size?: 'xsmall' | 'small' | 'medium' | 'large';
  clickIconButtonHandler: MouseEventHandler<HTMLDivElement>;
  className?: string;
}

export default function IconButton({
  clickIconButtonHandler,
  className,
  imgUrl,
  size,
}: IIconButtonProps) {
  return (
    <div data-size={size} className={styles.iconContainer}>
      <div
        className={`${styles.icon} ${className}`}
        onClick={clickIconButtonHandler}>
        <Image alt="icon" src={imgUrl} fill />
      </div>
    </div>
  );
}
