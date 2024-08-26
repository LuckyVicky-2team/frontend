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
  genres: string[];
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
async function convertAndCreateFormData(data: IGameInfo[]) {
  const results = [];
  const baseUrl = 'https://boardlife.co.kr/';

  for (const item of data) {
    const formData = new FormData();
    const { image, title, people, time, genres } = item;

    //people을 minPeople과 maxPeople로 분리
    let minPeople, maxPeople;

    // 숫자와 '-'를 기준으로 문자열을 분리
    const parts = people.split('-');

    if (parts.length === 2) {
      // '1-4명'과 같은 경우
      minPeople = parseInt(parts[0].trim(), 10);
      maxPeople = parseInt(parts[1].trim().replace('명', ''), 10);
    } else {
      // '2명'과 같은 경우
      minPeople = maxPeople = parseInt(parts[0].trim().replace('명', ''), 10);
    }

    //time을 minTime과 maxTime으로 분리
    let minPlayTime, maxPlayTime;

    // 숫자와 '-'를 기준으로 문자열을 분리
    const timeParts = time.split('-');

    if (timeParts.length === 2) {
      // '60-120분'과 같은 경우
      minPlayTime = parseInt(timeParts[0].trim(), 10);
      maxPlayTime = parseInt(timeParts[1].trim().replace('분', ''), 10);
    } else {
      // '60분'과 같은 경우
      minPlayTime = maxPlayTime = parseInt(
        timeParts[0].trim().replace('분', ''),
        10
      );
    }

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
        formData.append('imageFile', jpgBuffer, {
          filename: `${title}.jpg`,
          contentType: 'image/jpeg',
        });

        // 나머지 데이터를 FormData에 추가
        formData.append('title', title, { contentType: 'text/plain' });
        formData.append('minPeople', minPeople, { contentType: 'text/plain' });
        formData.append('maxPeople', maxPeople, { contentType: 'text/plain' });
        formData.append('minPlaytime', minPlayTime, {
          contentType: 'text/plain',
        });
        formData.append('maxPlaytime', maxPlayTime, {
          contentType: 'text/plain',
        });

        formData.append(
          `genres`,
          Buffer.from(JSON.stringify(genres), 'utf-8'),
          { contentType: 'application/json' }
        );

        console.log({
          title,
          minPeople,
          maxPeople,
          minPlayTime,
          maxPlayTime,
          genres,
        });
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
    let backendResponses: any = [];

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
        const [_, people, age, time] = await page.$$eval(
          '.game-sub-title .info-row',
          elements => elements.map(el => (el as HTMLElement).innerText)
        );
        void _;
        void age;

        await page.goto(`https://boardlife.co.kr/${url}&page=credits`, {
          waitUntil: 'networkidle2', // 네트워크 요청이 거의 없는 상태까지 대기
          timeout: 60000, // 타임아웃 설정 (60초)
        });
        await page.setViewport({ width: 1080, height: 1024 });

        // const creditsButton = await page.$('#game-top-btn-credits');
        // if (creditsButton) {
        //   await creditsButton.click();
        // }

        // await page.waitForSelector('.title-wrapper.credit');
        // await page.waitForSelector('.title-wrapper', { timeout: 5000 });
        // // 클릭 후 필요한 작업 수행
        // await page.waitForSelector('.credits-row .title', { timeout: 5000 });
        // const genres = await page.$$eval('.credits-row .title', elements =>
        //   elements.map(el => (el as HTMLElement).innerText)
        // );
        // console.log(genres);
        // const [response] = await Promise.all([
        //   page.waitForNavigation(), // The promise resolves after navigation has finished
        //   page.click('#game-top-btn-credits'), // Clicking the link will indirectly cause a navigation
        // ]);
        // console.log('response==>>>>>', response);

        const genres = await page.evaluate(() => {
          // const creditButton = document
          //   .getElementById('game-top-btn-credits')
          //   ?.click();
          // return [document.getElementById('game-top-btn-credits')?.outerHTML];
          const wrapper = document.querySelectorAll('.title-wrapper') ?? [];
          // '카테고리'라는 텍스트를 포함하는 요소를 찾기

          // return Array.from(wrapper).map(w => w.innerHTML);

          const wrapperElements = Array.from(wrapper).find(el =>
            el.textContent?.includes('카테고리')
          );

          if (!wrapperElements) return ['']; // '카테고리' 텍스트를 포함하는 요소가 없으면 null 반환

          const childrenElements =
            wrapperElements && Array.from(wrapperElements.children);

          const targets = childrenElements?.filter(element =>
            element.querySelector('.credits-row')
          )[0].children;

          if (!targets) {
            return [''];
          }

          return Array.from(targets).map(
            target => (target.children[0] as HTMLElement).innerText
          );
        });

        data.push({
          image,
          title,
          people,
          time,
          genres,
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
          await page.waitForSelector('.paging-btn .next');
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

    // TODO: hrefList api에서 가져오게 되돌리기
    // const hrefList = sliceArray(await crawlingList(), 20).slice(0, 2);
    // console.log('href:', hrefList);
    // const hrefList = ['bbs_detail.php?bbs_num=5625&tb=boardgame_strategy'];
    // let failed: string[] = [];
    //href들을 4개씩 묶기. (병렬 처리를 위함)
    // console.log(hrefList);

    // for (const hrefList20 of hrefList) {
    //   const cutting = sliceArray(hrefList20, 4);

    //   // cutting 배열 만큼 반복문 돌리기
    //   for (const hrefs of cutting) {
    //     try {
    //       // 사이즈 만큼 나눠진 url 페이지 열어서 작동
    //       const test = hrefs.map(async href => {
    //         await delay(1000);
    //         return await crawling(href);
    //       });
    //       await Promise.all(test);
    //     } catch (error) {
    //       // failed = [...failed, ...hrefs];
    //       console.log(error);
    //       continue;
    //     }
    //     await delay(1000);
    //   }
    const hrefList = (await crawlingList()).slice(582, 600);
    const cutting = sliceArray(hrefList, 4);
    // cutting 배열 만큼 반복문 돌리기
    let count = 0;
    for (const hrefs of cutting) {
      console.log(count);
      try {
        // 사이즈 만큼 나눠진 url 페이지 열어서 작동
        const test = hrefs.map(async href => {
          await delay(500);
          return await crawling(href);
        });
        await Promise.all(test);
      } catch (error) {
        // failed = [...failed, ...hrefs];
        console.log(error);
        continue;
      }
      // 크롤링한 정보를 형식에 맞게 가공
      const results = await convertAndCreateFormData(data);
      for (const result of results) {
        try {
          const backendResponse = await axios.post(
            `${process.env.NEXT_PUBLIC_API_BASE_DEV_URL}/boardgame`,
            result,
            {
              headers: {
                'Content-Type': 'multipart/form-data',
                // 'Content-Type': 'application/json',
                'X-API-Version': 1,
              },
            }
          );
          backendResponses.push(backendResponse.data);
          console.log(backendResponse.data);
          count++;
        } catch (error) {
          console.log('보내기 실패: ', error);
          return;
        }
      }
      data = [];
      await delay(1000);
    }
    // console.log('==> data :');
    // console.log(data);

    await browser.close();

    // console.log('==> failed: ', failed.length);

    return NextResponse.json({
      message: 'Crawling and data transfer successful',
      // backendResponse: backendResponse.data,
      backendResponse: backendResponses,
    });
  } catch (error) {
    console.error('Error during crawling or data transfer:', error);
    return NextResponse.json(
      { error: 'Crawling or data transfer failed' },
      { status: 500 }
    );
  }
}
