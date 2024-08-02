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

const IconButton = ({
  clickIconButtonHandler,
  className,
  imgUrl,
  size,
}: IIconButtonProps) => {
  return (
    <>
      <div
        data-size={size}
        className={`${styles.icon} ${className}`}
        onClick={clickIconButtonHandler}>
        <Image alt="icon" src={imgUrl} width={0} height={0} sizes="100vw" />
      </div>
    </>
  );
};

export default IconButton;
