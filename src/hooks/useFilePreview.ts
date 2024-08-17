import { useState } from 'react';

export default function useFilePreview(
  selectedImageUrl?: string | null //원래 저장되어 있던 이미지
) {
  const [filePreview, setFilePreview] = useState(selectedImageUrl || null);

  //올린 파일을 url로 반환
  const updateFilePreview = (file: FileList) => {
    if (file && file[0]) {
      const newUrl = URL.createObjectURL(file[0]);

      if (newUrl !== filePreview) {
        setFilePreview(newUrl);
      }
    }
  };

  return { filePreview, setFilePreview, updateFilePreview };
}
