import Skeleton from './_components/Skeleton';

export default function Loading() {
  return (
    <div
      style={{
        width: '80%',
        padding: '40px 0 30px 0',
        margin: 'auto',
      }}>
      <Skeleton />
    </div>
  );
}
