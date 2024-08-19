'use client';
import React, { useEffect } from 'react';
import { useState } from 'react';
import styles from './info.module.scss';
import Image from 'next/image';
import { updateProfileImage } from '@/api/apis/mypageApis';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

interface UserProfile {
  email: string; // 회원 고유 ID
  nickName: string; // 닉네임
  profileImage: string; // 프로필 이미지
  averageGrade: number; // 평균 별점
  prTags: string[]; // PR 태그 (없을 경우 빈 배열 반환)
}

interface InfoProps {
  mypageInfo: UserProfile | null; // 전달받은 props 타입 정의
  handleEditOpen: () => void;
  updateInfo: () => void;
}

export default function Info({
  mypageInfo,
  handleEditOpen,
  updateInfo,
}: InfoProps) {
  const [profileImage, setProfileImage] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | ArrayBuffer | null>(null);
  const [loggedIn, setLoggedIn] = useState(false);
  const router = useRouter();

  // 프로필 이미지 파일 선택 처리
  const handleProfileImageChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    if (event.target.files && event.target.files[0]) {
      const file = event.target.files[0];
      setProfileImage(file);

      // 이미지 미리보기 생성
      const objectURL = URL.createObjectURL(file);
      setPreview(objectURL);
    }
  };

  // 프로필 이미지 업로드 처리
  const handleProfileImageUpload = async () => {
    if (profileImage) {
      try {
        await updateProfileImage(profileImage);
        console.log('프로필 이미지 수정 완료');
        updateInfo();
      } catch (error) {
        console.error('프로필 이미지 수정 실패:', error);
      }
    }
  };

  useEffect(() => {
    const getLocal = localStorage.getItem('accessToken');
    if (getLocal === null) {
      setLoggedIn(false);
    } else {
      setLoggedIn(true);
    }
  }, [loggedIn]);

  const handleLogout = () => {
    localStorage.removeItem('accessToken');
    setLoggedIn(false);
    alert('로그아웃 되었습니다.');
    router.push('/');
  };
  return (
    <div className={styles.relative}>
      <div className={styles.editProfileImgModal}>
        <h1>프로필사진 수정</h1>
        <div className={styles.profileImgInput}>
          <input
            type="file"
            id="profileImageInput"
            accept="image/*"
            onChange={handleProfileImageChange}
            style={{ display: 'none' }} // 기본 input 숨기기
          />
          <label htmlFor="profileImageInput" className={styles.imageLabel}>
            {preview ? (
              <img
                src={preview as string}
                alt="Preview"
                className={styles.previewImage}
              />
            ) : (
              <Image
                width={111}
                height={111}
                src={`/${mypageInfo?.profileImage || 'assets/myPageImages/profileImgEdit.png'}`}
                alt="프로필 사진"
                style={{ width: '100%', height: '100%' }}
              />
            )}
          </label>
        </div>
        {preview ? (
          <button
            type={'button'}
            className={styles.profileImgEditBtn}
            disabled={false}
            onClick={() => {
              handleProfileImageUpload();
            }}>
            수정하기
          </button>
        ) : (
          <button
            type={'button'}
            className={styles.disabledBtn}
            disabled={true}>
            수정하기
          </button>
        )}
        <button
          type={'button'}
          className={styles.cancleBtn}
          onClick={() => {
            handleEditOpen();
          }}>
          취소하기
        </button>
      </div>
      <div className={styles.card}>
        <div className={styles.top}>
          <h2>내 프로필</h2>
          <button
            type="button"
            onClick={() => {
              handleEditOpen();
            }}>
            편집
          </button>
        </div>
        <div className={styles.bottom}>
          <div className={styles.profileImg}>
            <div className={styles.proImgSpace}>
              <input type="file" id="proimg" />
              {/* <label htmlFor="proimg">
                {mypageInfo?.profileImage === null ? (
                  <Image
                    width={111}
                    height={111}
                    src={'/assets/myPageImages/profileImgEdit.png'}
                    alt="프로필사진 기본 이미지"
                    style={{ width: '100%', height: '100%' }}
                  />
                ) : (
                  <Image
                    width={111}
                    height={111}
                    src={`/${mypageInfo?.profileImage}`}
                    alt="프로필 이미지"
                    style={{ width: '100%', height: '100%' }}
                  />
                )}
              </label> */}
              <label htmlFor="proimg">
                <Image
                  width={111}
                  height={111}
                  src={'/assets/myPageImages/profileImgEdit.png'}
                  alt="프로필사진 기본 이미지"
                  style={{ width: '100%', height: '100%' }}
                />
              </label>
            </div>
          </div>
          <div className={styles.rightInfo}>
            <div className={styles.topInfo}>
              <b>{mypageInfo?.nickName}</b>
              {loggedIn === false ? (
                <Link href="signin">로그인</Link>
              ) : (
                <button
                  type={'button'}
                  onClick={() => {
                    handleLogout();
                  }}>
                  로그아웃
                </button>
              )}
            </div>
            <ul className={styles.list}>
              <li>
                <b>company.</b>
                <p>코드잇</p>
              </li>
              <li>
                <b>E-mail.</b>
                <p>{mypageInfo?.email}</p>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
