import { useEffect, useState } from 'react';

//올린 파일을 url로 반환해주는 훅
export default function useFilePreview(
  file: FileList | null | undefined,
  selectedImageUrl?: string | null //원래 저장되어 있던 이미지
) {
  const [filePreview, setFilePreview] = useState(selectedImageUrl || '');

  useEffect(() => {
    if (file && file[0]) {
      const newUrl = URL.createObjectURL(file[0]);

      if (newUrl !== filePreview) {
        setFilePreview(newUrl);
      }
    }
    //imgSrc를 dependency list에 넣으면 무한루프가 생김
  }, [file]);

  return { filePreview, setFilePreview };
}
