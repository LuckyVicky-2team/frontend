import { cookies } from 'next/headers';
import Main from './main/page';
import { redirect } from 'next/navigation';

export default function Home() {
  const refererCookie = cookies().get('referer')?.value;
  console.log(refererCookie);
  if (refererCookie) {
    // referer 쿠키가 있으면 해당 경로로 리다이렉트
    cookies().delete('referer');
    redirect(refererCookie);
    return null;
  }
  return (
    <>
      <Main />
    </>
  );
}
