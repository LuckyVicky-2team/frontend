'use client';

import axios from 'axios';

export default function SomePage() {
  const handleCrawl = async () => {
    try {
      const response = await axios.post('/api/crawl');
      console.log('Crawling successful:', response.data);
    } catch (error) {
      console.error('Crawling failed:', error);
    }
  };

  return (
    <div>
      <button onClick={handleCrawl}>크롤링 실행</button>
    </div>
  );
}
