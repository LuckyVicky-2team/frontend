'use client';

import React, { useState, useEffect } from 'react';
import { useToast } from '@/contexts/toastContext';
import { updateProfileImage } from '@/api/apis/mypageApis';
import styles from './profileImageEdit.module.scss';
import Image from 'next/image';

interface IProfileImageEditProps {
  onUploadSuccess: () => void;
  initialImage: string | null;
  mypageInfo: { profileImage: string | null };
}

const ProfileImageEdit: React.FC<IProfileImageEditProps> = ({
  onUploadSuccess,
  initialImage,
  mypageInfo,
}) => {
  const { addToast } = useToast();
  const [preview, setPreview] = useState<string | ArrayBuffer | null>(null);
  const [file, setFile] = useState<File | null>(null);

  const cloudFrontDomain = process.env.NEXT_PUBLIC_CLOUDFRONT_DOMAIN || '';

  useEffect(() => {
    const defaultImage = '/assets/myPageImages/defaultProfile.png'; // 기본 이미지 경로

    const getImageUrl = (url: string | null) => {
      if (!url || url === 'default') return defaultImage;
      return url.startsWith('http://') || url.startsWith('https://')
        ? url
        : `https://${cloudFrontDomain}/${url}`;
    };

    setPreview(
      getImageUrl(mypageInfo?.profileImage) || getImageUrl(initialImage)
    );
  }, [initialImage, mypageInfo?.profileImage, cloudFrontDomain]);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = event.target.files?.[0];
    if (selectedFile) {
      if (selectedFile.size > 5 * 1024 * 1024) {
        addToast('파일 크기는 5MB를 초과할 수 없습니다.', 'error');
        return;
      }

      setFile(selectedFile);
      const reader = new FileReader();
      reader.onloadend = () => setPreview(reader.result);
      reader.readAsDataURL(selectedFile);
    }
  };

  const handleUpload = async () => {
    if (!file) {
      addToast('프로필 사진을 추가해주세요!', 'error'); // 파일이 없을 때 경고 메시지
      return;
    }

    try {
      await updateProfileImage(file);
      addToast('프로필 이미지가 수정되었습니다.', 'success');
      onUploadSuccess();
    } catch (error) {
      addToast('프로필 이미지 업로드 중 오류가 발생했습니다.', 'error');
    }
  };

  const handleResetToDefault = async () => {
    try {
      // 기본 이미지를 설정하기 위해 빈 FormData 객체를 사용
      const formData = new FormData();
      formData.append('profileImage', '');

      await updateProfileImage(formData as unknown as File); // FormData를 File로 변환하여 전달
      addToast('프로필 이미지가 기본 이미지로 변경되었습니다.', 'success');
      onUploadSuccess();
    } catch (error) {
      addToast('기본 이미지로 변경 중 오류가 발생했습니다.', 'error');
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.preview}>
        <div className={styles.previewImgWrap}>
          <img
            src={
              typeof preview === 'string'
                ? preview
                : '/assets/myPageImages/defaultProfile.png'
            }
            alt="Profile Preview"
            className={styles.image}
          />
        </div>
        <div className={styles.inputWrap}>
          <input
            type="file"
            accept="image/*"
            onChange={handleFileChange}
            id="profileEditBtn"
            className={styles.fileInput}
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

      <div className={styles.proBtnWrap}>
        <button onClick={handleUpload} className={styles.uploadButton}>
          프로필 이미지 적용하기
        </button>

        <button onClick={handleResetToDefault} className={styles.resetButton}>
          기본 이미지로 변경하기
        </button>
      </div>
    </div>
  );
};

export default ProfileImageEdit;
