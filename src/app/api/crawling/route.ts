import { NextResponse } from 'next/server';
import puppeteer from 'puppeteer';

interface IGameInfo {
  image: string;
  title: string;
  people: string;
  age: string;
  time: string;
}

export async function POST() {
  try {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    let data: IGameInfo[] = [];

    const crawling = async (url: string) => {
      await page.goto(`https://boardlife.co.kr/${url}`);
      await page.setViewport({ width: 1080, height: 1024 });

      const image = await page.$eval('a.game-thumb-link', el => el.href);
      const title = await page.$eval('.info h1', el => el.innerText);
      const [_, people, age, time] = await page.$$eval(
        '.game-sub-title .info-row',
        elements => elements.map(el => (el as HTMLElement).innerText)
      );
      void _;
      data.push({
        image,
        title,
        people,
        age,
        time,
      });
    };

    const crawlingList = async () => {
      let hrefList: string[] = [];
      await page.goto('https://boardlife.co.kr/rank.php');
      await page.setViewport({ width: 1080, height: 1024 });
      for (let i = 0; i < 10; i++) {
        const hrefs = await page.$$eval(
          '.game-rank-div .storage-title-div',
          elements => elements.map(el => el.getAttribute('href'))
        );
        hrefs.forEach(href => {
          if (href) {
            // href가 null이 아닌 경우에만 추가
            hrefList.push(href);
          }
        });
        // "다음" 버튼이 존재하는지 확인하고 클릭
        const nextButton = await page.$('.paging-btn .next');
        if (nextButton) {
          await nextButton.click();
          await page.waitForNavigation(); // 페이지가 새로 로드될 때까지 기다림
        } else {
          break; // "다음" 버튼이 없으면 반복 종료
        }
      }
      return hrefList;
    };

    const hrefList = await crawlingList();
    console.log('HREF List:', hrefList);

    // for (let i = 0; i < hrefList.length; i++) {
    for (let i = 0; i < 5; i++) {
      await crawling(hrefList[i]);
    }
    console.log('Crawled Data:', data);

    await browser.close();

    // 크롤링한 데이터를 백엔드 API로 전송
    // const backendResponse = await axios.post(
    //   'https://your-backend-api.com/save',
    //   data
    // );

    return NextResponse.json({
      message: 'Crawling and data transfer successful',
      // backendResponse: backendResponse.data,
      backendResponse: null,
    });
  } catch (error) {
    console.error('Error during crawling or data transfer:', error);
    return NextResponse.json(
      { error: 'Crawling or data transfer failed' },
      { status: 500 }
    );
  }
}
