import React, { MouseEventHandler } from 'react';
import styles from './IconButton.module.scss';
import Image from 'next/image';

/*
  1. size prop 선택 : 'xsmall' | 'small' | 'medium' | 'large'
  2. size 선택안할시 : 반드시 className prop 으로 width,height 전달해주세요

  사용예시
  1.  <IconButton size="medium"/>
  2.
  Example.tsx
    import styles from "Example.module.scss"
    export default function Example(){ return ( <IconButton className={styles.example}/> ) }

  Example.module.scss
    .example {
     width:40px;
     height:40px;
    }
*/

// type MouseEventHandler<T = Element> = EventHandler<MouseEvent<T>>;
interface IIconButtonProps {
  imgUrl: string;
  size?: 'xsmall' | 'small' | 'medium' | 'mediumLarge' | 'large';
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
    <div
      data-size={size}
      className={`${styles.icon} ${className}`}
      onClick={clickIconButtonHandler}>
      <Image alt="icon" src={imgUrl} fill />
    </div>
  );
}
