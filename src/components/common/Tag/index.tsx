import { ReactNode } from 'react';
import styles from './Tag.module.scss';

// 사용 예시
//<Tag backgroundColor='#ffffaa' fontColor='#ffff00' size='small'>태그</Tag>

interface ITagProps {
  children: ReactNode | undefined;
  backgroundColor?: string;
  fontColor?: string;
  size?: 'small' | 'medium' | 'large';
  onClick?: () => void;
  className?: string;
}

function Tag({
  children,
  backgroundColor = '#ffffff',
  fontColor = '#000000',
  size = 'medium',
  onClick,
  className,
}: ITagProps) {
  return (
    <div
      className={`${styles.tag} ${className}`}
      data-size={size}
      style={{
        background: `${backgroundColor}`,
        color: `${fontColor}`,
      }}
      onClick={onClick}>
      {children}
    </div>
  );
}
export default Tag;
