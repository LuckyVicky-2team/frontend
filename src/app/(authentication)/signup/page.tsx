import SignupForm from '../_components/SignupForm';

export default function Signup({
  searchParams,
}: {
  searchParams: { type: string };
}) {
  return (
    <main>
      <SignupForm isSocial={searchParams.type === 'social'} />
    </main>
  );
}
