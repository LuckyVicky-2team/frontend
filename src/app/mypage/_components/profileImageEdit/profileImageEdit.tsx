'use client';

import React, { useState, useEffect } from 'react';
import { useToast } from '@/contexts/toastContext';
import { updateProfileImage } from '@/api/apis/mypageApis'; // API 함수 import
import styles from './profileImageEdit.module.scss'; // 스타일 import
import Image from 'next/image';

interface IProfilePictureUploadProps {
  onUploadSuccess: () => void; // 업로드 성공 후 호출할 콜백 함수
  initialImage: string; // 초기 프로필 이미지 URL
  handleEditOpen2: () => void; // 프로필 수정 모달을 닫는 함수
}

const ProfileImageEdit: React.FC<IProfilePictureUploadProps> = ({
  onUploadSuccess,
  initialImage,
  handleEditOpen2,
}) => {
  const { addToast } = useToast(); // 토스트 훅 호출
  const [preview, setPreview] = useState<string | ArrayBuffer | null>(
    initialImage
  );
  const [file, setFile] = useState<File | null>(null);

  useEffect(() => {
    setPreview(initialImage);
  }, [initialImage]);

  // 파일 선택 핸들러
  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = event.target.files?.[0];
    if (selectedFile) {
      if (selectedFile.size > 5 * 1024 * 1024) {
        // 5MB 초과 체크
        addToast('파일 크기는 5MB를 초과할 수 없습니다.', 'error');
        return;
      }

      setFile(selectedFile);
      const reader = new FileReader();
      reader.onloadend = () => setPreview(reader.result);
      reader.readAsDataURL(selectedFile);
    }
  };

  // 파일 업로드 핸들러
  const handleUpload = async () => {
    if (!file) return;

    try {
      await updateProfileImage(file);
      addToast('프로필 사진이 성공적으로 업로드되었습니다.', 'success');
      onUploadSuccess(); // 업로드 성공 후 호출할 콜백
    } catch (error) {
      console.error('Upload error:', error);
      addToast('프로필 이미지 업로드 중 오류가 발생했습니다.', 'error');
    }
  };

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>프로필 이미지 수정</h1>
      <div className={styles.preview}>
        <div className={styles.previewImgWrap}>
          {preview ? (
            <img
              src={preview as string}
              alt="Profile Preview"
              className={styles.image}
            />
          ) : (
            <p>이미지가 없습니다.</p>
          )}
        </div>
        <div className={styles.inputWrap}>
          <input
            type="file"
            accept="image/*"
            onChange={handleFileChange}
            id="profileEditBtn"
            className={styles.fileInput} // 클래스 추가
          />
          <label htmlFor="profileEditBtn">
            <Image
              width={32}
              height={32}
              src={'/assets/icons/penIco.svg'}
              alt="편집 아이콘"
            />
          </label>
        </div>
      </div>

      <button
        onClick={handleUpload}
        disabled={!file}
        className={styles.uploadButton}>
        수정하기
      </button>

      <button onClick={handleEditOpen2} className={styles.cancleBtn}>
        취소하기
      </button>
    </div>
  );
};

export default ProfileImageEdit;
