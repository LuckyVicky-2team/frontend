'use client';

import axios from 'axios';

export default function CrawlingPage() {
  const handleCrawl = async () => {
    try {
      const response = await axios.post('/api/crawling');
      console.log('Crawling successful:', response.data);
    } catch (error) {
      console.error('Crawling failed:', error);
    }
  };

  return (
    <div style={{ margin: '150px' }}>
      <button onClick={handleCrawl}>크롤링 실행</button>
    </div>
  );
}
