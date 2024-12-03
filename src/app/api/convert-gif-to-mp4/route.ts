import ffmpeg from 'fluent-ffmpeg';
// import ffmpegStatic from 'ffmpeg-static';
import fs from 'fs';
import fs2 from 'fs/promises';
import path from 'path';
import { NextResponse } from 'next/server';
// import sharp from 'sharp';

// 환경 변수로부터 FFmpeg 경로 가져오기
const ffmpegPath = process.env.FFMPEG_PATH
  ? path.resolve(process.cwd(), process.env.FFMPEG_PATH)
  : null;

if (ffmpegPath) {
  ffmpeg.setFfmpegPath(ffmpegPath);
} else {
  throw new Error(
    'FFmpeg path is not available. Ensure ffmpeg-static is properly installed.'
  );
}

// 커스텀 오류 타입 정의
interface CustomError extends Error {
  code?: string;
}

// 안전한 파일 삭제 함수
async function safeUnlink(filePath: string) {
  try {
    await fs2.unlink(filePath);
  } catch (error) {
    const err = error as CustomError; // 커스텀 오류 타입으로 단언
    if (err.code !== 'ENOENT' && err.code !== 'EBUSY') {
      console.error(`Failed to delete file: ${filePath}`, error);
    }
  }
}

export async function POST(request: any) {
  try {
    const { url } = await request.json();

    // 파일 확장자 확인
    // const extension = url.split('.').pop().toLowerCase();

    // 경로 설정 (프로젝트 디렉토리 내에 tmp 폴더 사용)
    // const tempDir = path.resolve(process.cwd(), 'tmp')
    // await fs2.mkdir(tempDir, { recursive: true });
    const tempDir = process.env.TEMP || process.env.TMP || '/tmp';
    const gifPath = path.join(tempDir, 'input.gif');
    const mp4Path = path.join(tempDir, 'output.mp4');

    // 파일을 로컬로 다운로드
    const gifResponse = await fetch(url);
    const gifBuffer = await gifResponse.arrayBuffer();
    // const mediaBuffer = Buffer.from(gifBuffer);
    fs.writeFileSync(gifPath, Buffer.from(gifBuffer));

    let optimizedBuffer;

    // // GIF 파일이 아닌 경우 400 응답 반환
    // if (extension !== 'gif') {
    //   // return new NextResponse('Only GIF files can be converted to MP4', {
    //   //   status: 400,
    //   // });
    //   // 이미지 압축
    //   optimizedBuffer = await sharp(mediaBuffer)
    //     .resize({ width: 400 })
    //     .avif({ quality: 50 }) // JPEG 포맷, 품질 30%
    //     .toBuffer();
    // }
    // if (extension === 'gif') {
    // GIF를 MP4로 변환
    await new Promise((resolve, reject) => {
      ffmpeg(gifPath)
        .output(mp4Path)
        .on('end', resolve)
        .on('error', reject)
        .run();
    });

    // MP4 파일을 읽고 반환
    optimizedBuffer = fs.readFileSync(mp4Path);

    // 임시 파일 삭제
    await safeUnlink(gifPath);
    await safeUnlink(mp4Path);
    // }
    // return new NextResponse(optimizedBuffer, {
    //   headers: {
    //     'Content-Type': 'video/mp4',
    //   },
    // });
    return new NextResponse(optimizedBuffer, {
      headers: {
        'Content-Type': 'video/mp4',
      },
    });
  } catch (error) {
    console.error('Error in converting GIF to MP4:', error);
    return NextResponse.json({ error: error }, { status: 500 });
  }
}
