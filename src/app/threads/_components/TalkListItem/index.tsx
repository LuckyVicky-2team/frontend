import Image from 'next/image';
import styles from './TalkListItem.module.scss';

interface ITalkListProps {
  item: {
    id: number;
    profileImage: string;
    nickname: string;
    contents: string;
    createdAt: string;
  };
}

export default function TalkListItem({ item }: ITalkListProps) {
  return (
    <div className={styles.item}>
      <div className={styles.imageArea}>
        <Image
          src={item.profileImage}
          alt={item.nickname}
          width={36}
          height={36}
          className={styles.profileImage}
        />
      </div>
      <div className={styles.textArea}>
        <div className={styles.nameSection}>
          {item.nickname}
          <div className={styles.createdAt}>{item.createdAt}</div>
        </div>
        <div className={styles.contentSection}>{item.contents}</div>
      </div>
    </div>
  );
}
