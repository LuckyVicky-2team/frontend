import { ReactNode } from 'react';
import styles from './Tag.module.scss';

// 사용 예시
//<Tag backgroundColor='#ffffaa' fontColor='#ffff00' size='small'>태그</Tag>

interface ITagProps {
  children: ReactNode | undefined;
  backgroundColor?: string;
  fontColor?: string;
  borderColor?: string;
  size?: 'small' | 'medium' | 'large';
  onClick?: () => void;
  className?: string;
}

function Tag({
  children,
  backgroundColor = '#ffffff',
  fontColor = '#007AFF',
  borderColor = '#007AFF',
  size = 'large',
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
        borderColor: `${borderColor}`,
      }}>
      {children}
      <button className={styles.removeButton} onClick={onClick}>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="16"
          height="16"
          viewBox="0 0 24 24"
          fill="none">
          <path
            d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z"
            stroke={borderColor}
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
          <path
            d="M15 9L9 15"
            stroke={borderColor}
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
          <path
            d="M9 9L15 15"
            stroke={borderColor}
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
        </svg>
      </button>
    </div>
  );
}
export default Tag;
