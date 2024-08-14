import { NextResponse } from 'next/server';
import puppeteer from 'puppeteer';
import FormData from 'form-data';
import axios from 'axios';
import sharp from 'sharp';

//장르 추가, 최소, 최대 인원, 최소, 최대 시간, age 빼기

interface IGameInfo {
  image: string;
  title: string;
  people: string;
  time: string;
}

const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

//배열을 size만큼 자르는 함수
const sliceArray = (arr: string[], size: number) => {
  //원하는 사이즈로 자르고 담을 배열
  const result = [];
  // 자를 시점을 체크하기 위한 변수
  let start = 0;

  // 배열의 사이즈 보다 작을 때만 작동
  while (start < arr.length) {
    // 사이즈 만큼 자르기
    const cut = arr.slice(start, start + size);
    result.push(cut);
    // 자른 사이즈 만큼 start 숫자 더해주기
    start += size;
  }
  return result;
};

//크롤링한 정보를 형식에 맞게 가공해 주는 함수
async function convertAndCreateFormData(query: IGameInfo[]) {
  const results = [];
  const baseUrl = 'https://boardlife.co.kr/';

  for (const item of query) {
    const formData = new FormData();
    const { image, title, people, time } = item;
    try {
      // Puppeteer를 사용하여 페이지 열기
      const browser = await puppeteer.launch();
      const page = await browser.newPage();
      await page.goto(image);

      // 이미지 src 추출
      const imagePath = await page.$eval('img.dragme', img =>
        img.getAttribute('src')
      );
      const imageUrl = imagePath && new URL(imagePath, baseUrl).href;

      await browser.close();

      // 이미지 다운로드
      if (imageUrl) {
        const response = await axios.get(imageUrl, {
          responseType: 'arraybuffer',
          maxRedirects: 5,
        });
        // console.log(response.data);
        const imageBuffer = Buffer.from(response.data, 'binary');

        const jpgBuffer = await sharp(imageBuffer).jpeg().toBuffer();

        // jpg 이미지를 FormData에 추가
        formData.append('file', jpgBuffer, {
          filename: `${title}.jpg`,
          contentType: 'image/jpeg',
        });

        // 나머지 데이터를 FormData에 추가
        formData.append(
          'requestDTO',
          Buffer.from(JSON.stringify({ title, people, time }), 'utf-8'),
          { filename: 'request.json', contentType: 'application/json' }
        );

        // 결과 배열에 추가
        results.push(formData);
      }
    } catch (error) {
      console.error(`Error processing item: ${item.title}`, error);
    }
  }

  return results;
}

export async function POST() {
  try {
    const browser = await puppeteer.launch();
    let data: IGameInfo[] = [];

    const crawling = async (url: string) => {
      const page = await browser.newPage();
      try {
        await page.goto(`https://boardlife.co.kr/${url}`, {
          waitUntil: 'networkidle2', // 네트워크 요청이 거의 없는 상태까지 대기
          timeout: 60000, // 타임아웃 설정 (60초)
        });
        await page.setViewport({ width: 1080, height: 1024 });

        const image = await page.$eval('a.game-thumb-link', el => el.href);
        const title = await page.$eval('.info h1', el => el.innerText);
        const [_, people, time] = await page.$$eval(
          '.game-sub-title .info-row',
          elements => elements.map(el => (el as HTMLElement).innerText)
        );
        void _;
        data.push({
          image,
          title,
          people,
          time,
        });
      } finally {
        await page.close();
      }
    };

    const crawlingList = async () => {
      const page = await browser.newPage();
      let hrefList: string[] = [];
      try {
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
      } finally {
        await page.close();
      }
      return hrefList;
    };

    const hrefList = (await crawlingList()).slice(0, 4);
    console.log('HREF List:', hrefList.length);

    // let failed: string[] = [];
    //href들을 4개씩 묶기. (병렬 처리를 위함)
    const cutting = sliceArray(hrefList, 4);

    // cutting 배열 만큼 반복문 돌리기
    for (const hrefs of cutting) {
      try {
        // 사이즈 만큼 나눠진 url 페이지 열어서 작동
        const test = hrefs.map(async href => {
          await delay(1000);
          return await crawling(href);
        });
        await Promise.all(test);
      } catch (error) {
        // failed = [...failed, ...hrefs];
        console.log(error);
        continue;
      }
      await delay(1000);
    }

    await browser.close();

    // console.log('==> failed: ', failed.length);
    // console.log('==> data length:', data.length);
    // 크롤링한 정보를 형식에 맞게 가공
    const results = await convertAndCreateFormData(data);
    void results;
    // console.log('FormData results:', results);

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
