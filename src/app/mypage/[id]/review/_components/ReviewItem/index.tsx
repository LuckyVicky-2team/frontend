import styles from './ReviewItem.module.scss';

interface ReviewItemProps {
  item: {
    id: number;
    title: string;
    content: string;
    rating: number;
    date: string;
  };
}

export default function ReviewItem({ item }: ReviewItemProps) {
  return (
    <div key={item.id} className={styles.reviewItem}>
      <h3>{item.title}</h3>
      <p>{item.content}</p>
      <p>평점: {item.rating}/5</p>
      <p>작성일: {item.date}</p>
    </div>
  );
}
