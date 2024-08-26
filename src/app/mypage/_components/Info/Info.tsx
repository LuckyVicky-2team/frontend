'use client';
import { useState, useEffect } from 'react';
import styles from './info.module.scss';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
// import ProfileImageEdit from '../../_components/profileImageEdit/profileImageEdit';

// 환경 변수에서 도메인 가져오기
const cloud = process.env.NEXT_PUBLIC_CLOUDFRONT_DOMAIN;

interface IUserProfile {
  email: string;
  nickName: string;
  profileImage: string;
  averageRating: number;
  prTags: string[];
}

interface IInfoProps {
  mypageInfo: IUserProfile | null;
  handleEditOpen: () => void;
  updateInfo: () => void;
  handleEditOpen2: () => void;
}

export default function Info({
  mypageInfo,
  handleEditOpen,
  // updateInfo,
}: IInfoProps) {
  const [loggedIn, setLoggedIn] = useState<boolean>(false);
  // const [profileHover, setProfileHover] = useState<boolean>(false);
  // const [editOpen2, setEditOpen2] = useState<boolean>(false);

  const router = useRouter();

  // 프로필 이미지 URL
  const profileImageUrl = mypageInfo?.profileImage
    ? `https://${cloud}/${mypageInfo.profileImage}`
    : '/assets/myPageImages/profileImgEdit.png';

  // 핸들러 함수 정의
  // const handleMouseEnter = () => setProfileHover(true);
  // const handleMouseLeave = () => setProfileHover(false);

  useEffect(() => {
    const token = localStorage.getItem('accessToken');
    setLoggedIn(!!token);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('accessToken');
    setLoggedIn(false);
    alert('로그아웃 되었습니다.');
    router.push('/');
  };

  // const handleUploadSuccess = () => {
  //   updateInfo(); // 부모 컴포넌트의 정보를 업데이트
  //   setEditOpen2(false); // 프로필 이미지 수정 모달 닫기
  // };

  // const handleEditOpen2 = () => setEditOpen2(prev => !prev);

  return (
    <div className={styles.relative}>
      <div className={`${styles.editModal2}`}>
        {/* <ProfileImageEdit
          onUploadSuccess={handleUploadSuccess}
          initialImage={profileImageUrl}
          handleEditOpen2={handleEditOpen2}
        /> */}
      </div>
      <div className={styles.card}>
        <div className={styles.top}>
          <h2>내 프로필</h2>
          <button type="button" onClick={handleEditOpen}>
            <Image
              width={32}
              height={32}
              src="/assets/icons/penEditIco.svg"
              alt="프로필 편집 아이콘"
            />
          </button>
        </div>
        <div className={styles.bottom}>
          <div className={styles.profileImg}>
            <div className={styles.proImgSpace}>
              <Image
                width={111}
                height={111}
                src={profileImageUrl}
                alt="프로필사진"
                style={{ width: '100%', height: '100%' }}
                unoptimized
              />
            </div>
          </div>
          <div className={styles.rightInfo}>
            <div className={styles.topInfo}>
              <b>{mypageInfo?.nickName}</b>
              {loggedIn ? (
                <button type="button" onClick={handleLogout}>
                  로그아웃
                </button>
              ) : (
                <Link href="/signin">로그인</Link>
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
