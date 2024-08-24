import RollingDice from '@/components/common/RollingDice';

export default function LoadingPage() {
  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        minHeight: '100vh',
      }}>
      <RollingDice />
    </div>
  );
}
