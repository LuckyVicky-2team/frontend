import styles from './Spinner.module.scss';

export default function Spinner({
  className,
  style,
}: {
  className?: string;
  style?: { [key: string]: string };
}) {
  return <div style={style} className={`${styles.spinner} ${className}`}></div>;
}
