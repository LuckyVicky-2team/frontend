import RollingDice from '@/components/common/RollingDice';

export default function LoadingPage() {
  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        height: '80vh',
      }}>
      <RollingDice />
    </div>
  );
}
