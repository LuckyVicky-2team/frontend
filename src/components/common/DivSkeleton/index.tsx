import styles from './DivSkeleton.module.scss';

export default function SkeletonDiv({ className }: { className?: string }) {
  return <div className={`${styles.skeleton} ${className}`}></div>;
}
