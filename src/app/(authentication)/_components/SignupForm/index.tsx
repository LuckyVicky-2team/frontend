import EmailSignupForm from './EmailSignupForm';
import SocialSignupForm from './SocialSignupForm';

export default function SignupForm({ isSocial }: { isSocial: boolean }) {
  return isSocial ? <SocialSignupForm /> : <EmailSignupForm />;
}
