import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from '@tanstack/react-query';
import { QueryKey } from '@/utils/QueryKey';
import EmailSignupForm from './EmailSignupForm';
import SocialSignupForm from './SocialSignupForm';
import { getTermsAgreement } from '@/api/apis/authApis';

const prefetchTermsData = async () => {
  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: [QueryKey.TERMS_CONDITION],
    queryFn: () => getTermsAgreement('all', true),
  });

  return dehydrate(queryClient);
};

export default async function SignupForm({ isSocial }: { isSocial: boolean }) {
  const dehydratedState = await prefetchTermsData();

  return (
    <HydrationBoundary state={dehydratedState}>
      {isSocial ? <SocialSignupForm /> : <EmailSignupForm />}
    </HydrationBoundary>
  );
}
