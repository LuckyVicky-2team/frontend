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
        position: 'fixed',
        top: '0px',
        left: '50%',
        transform: 'translateX(-50%)',
        background: '#fff',
        width: '100%',
        maxWidth: '600px',
        zIndex: '9999',
        borderRight: '1px solid #ddd',
        borderLeft: '1px solid #ddd',
      }}>
      <RollingDice />
    </div>
  );
}
