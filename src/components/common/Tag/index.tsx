import { ReactNode } from 'react';
import styles from './Tag.module.scss';

// 사용 예시
//<Tag backgroundColor='#ffffaa' fontColor='#ffff00' size='small'>태그</Tag>

interface ITagProps {
  children: ReactNode | undefined;
  backgroundColor?: string;
  fontColor?: string;
  size?: 'small' | 'medium' | 'large';
}

function Tag({
  children,
  backgroundColor = '#ffffff',
  fontColor = '#000000',
  size = 'medium',
}: ITagProps) {
  return (
    <div
      className={styles.tag}
      data-size={size}
      style={{
        background: `${backgroundColor}`,
        color: `${fontColor}`,
      }}>
      {children}
    </div>
  );
}
export default Tag;
