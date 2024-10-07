import sitemap from '@/app/sitemap';
import { useEffect } from 'react';
export default function TestPage() {
  useEffect(() => {
    sitemap();
  }, []);
  return <></>;
}
