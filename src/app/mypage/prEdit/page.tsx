'use client';

import styles from './prEdit.module.scss';
import { useEffect, useState, KeyboardEvent } from 'react';
import { getPersonalInfo, updatePRTags } from '@/api/apis/mypageApis';

interface UserProfile {
  email: string; // 회원 고유 ID
  nickName: string; // 닉네임
  profileImage: string; // 프로필 이미지
  averageGrade: number; // 평균 별점
  prTags: string[]; // PR 태그 (없을 경우 빈 배열 반환)
}

export default function PrEdit() {
  const [info, setInfo] = useState<UserProfile | null>(null); // UserProfile 타입 사용
  const [prTags, setPrTags] = useState<string[]>([]);
  const [newTag, setNewTag] = useState<string>(''); // 새로 추가될 태그의 상태
  const [error, setError] = useState<string | null>(null); // 오류 메시지 상태 추가

  const fetchPersonalInfo = async () => {
    try {
      const response = await getPersonalInfo();
      setInfo(response.data);
      setPrTags(response.data.prTags); // 기존 PR 태그 설정
    } catch (err) {
      console.error('err:', err);
    }
  };

  useEffect(() => {
    fetchPersonalInfo();
  }, []);

  // 태그 목록을 서버에 업데이트하는 함수
  const updateTagsOnServer = async (newTags: string[]) => {
    try {
      await updatePRTags(newTags); // 새로운 API 호출
      setPrTags(newTags); // 성공적으로 업데이트되면 로컬 상태도 업데이트
    } catch (error) {
      console.error('PR 태그를 업데이트하는 중 오류가 발생했습니다.', error);
    }
  };

  // 유효성 검사 및 엔터 키를 눌렀을 때 태그 추가하는 함수
  const handleKeyUp = async (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      const trimmedTag = newTag.trim();

      // 유효성 검사
      const tagPattern = /^(?!.*\s{2})(?!\s)[a-zA-Z0-9가-힣\s]+(?<!\s)$/; // 한글과 영어, 숫자, 띄어쓰기만 허용

      if (
        !trimmedTag || // 빈 값 검사
        prTags.includes(trimmedTag) || // 중복 검사
        prTags.length >= 10 || // 최대 태그 수 검사
        trimmedTag.length > 30 || // 태그 길이 검사
        !tagPattern.test(trimmedTag) // 문자 패턴 검사
      ) {
        let errorMessage = '';

        if (!trimmedTag) {
          errorMessage = '태그를 입력해주세요.';
        } else if (prTags.includes(trimmedTag)) {
          errorMessage = '이미 존재하는 태그입니다.';
        } else if (prTags.length >= 10) {
          errorMessage = '태그는 최대 10개까지만 추가할 수 있습니다.';
        } else if (trimmedTag.length > 30) {
          errorMessage = '태그는 최대 30자까지 입력할 수 있습니다.';
        } else if (!tagPattern.test(trimmedTag)) {
          errorMessage = '한글, 영어, 숫자, 띄어쓰기만 허용됩니다.';
        }

        setError(errorMessage); // 오류 메시지 설정
        setNewTag(''); // 입력 필드 초기화
        return;
      }

      setError(null); // 유효성 검사 통과 시 오류 메시지 초기화
      const updatedTags = [...prTags, trimmedTag];
      await updateTagsOnServer(updatedTags);
      setNewTag(''); // 입력 필드 초기화
    }
  };

  // 태그 삭제 함수
  const handleTagRemove = async (tagToRemove: string) => {
    const updatedTags = prTags.filter(tag => tag !== tagToRemove);
    await updateTagsOnServer(updatedTags);
  };

  return (
    <div className={styles.prWrap}>
      <h1>PR태그 수정</h1>
      <ul>
        {info?.prTags.map((tag, index) => (
          <li key={index} className={styles.tagItem}>
            <button
              type="button"
              onClick={() => handleTagRemove(tag)}
              className={styles.removeButton}>
              <span> {tag}</span>
            </button>
          </li>
        ))}
      </ul>
      <input
        type="text"
        value={newTag}
        onChange={e => setNewTag(e.target.value)} // 입력값이 변경될 때 newTag 상태 업데이트
        onKeyUp={handleKeyUp} // 엔터 키 눌렀을 때 처리
        placeholder="PR태그를 입력해주세요"
      />
      {error && <p className={styles.error}>{error}</p>}{' '}
    </div>
  );
}
