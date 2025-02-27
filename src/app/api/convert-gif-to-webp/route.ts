import { NextResponse } from 'next/server';
import sharp from 'sharp';

export async function POST(req: Request) {
  try {
    const { imageUrl } = await req.json();

    if (!imageUrl) {
      return NextResponse.json(
        { message: 'Image URL is required' },
        { status: 400 }
      );
    }

    const response = await fetch(imageUrl);
    if (!response.ok) {
      throw new Error('Failed to fetch the image');
    }

    const buffer = await response.arrayBuffer();
    const inputBuffer = Buffer.from(buffer);

    //  WebP 변환 (애니메이션 재생)
    const outputBuffer = await sharp(inputBuffer, { animated: true })
      .toFormat('webp', { quality: 80 })
      .toBuffer();

    return new NextResponse(outputBuffer, {
      status: 200,
      headers: { 'Content-Type': 'image/webp' },
    });
  } catch (error) {
    console.error('Error processing image:', error);
    return NextResponse.json(
      { message: 'Error processing image' },
      { status: 500 }
    );
  }
}
