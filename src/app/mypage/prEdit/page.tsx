/* eslint-disable */
'use client';
import React from 'react';
import styles from './prEdit.module.scss';
import { useEffect, useState, KeyboardEvent } from 'react';
import { getPersonalInfo, updatePRTags } from '@/api/apis/mypageApis';
import Image from 'next/image';

export default function PrEdit() {
  const [prTags, setPrTags] = useState<string[]>([]);
  const [newTag, setNewTag] = useState<string>('');
  const [error, setError] = useState<string | null>(null);
  const [inputLengthError, setInputLengthError] = useState<string | null>(null); // 태그 길이 에러 상태
  const [loading, setLoading] = useState<boolean>(true);

  const fetchPersonalInfo = async () => {
    try {
      setLoading(true);
      const response = await getPersonalInfo();
      setPrTags(response.data.prTags);
    } catch (err) {
      // console.error('err:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPersonalInfo();
  }, []);

  // 태그 목록을 서버에 업데이트하는 함수
  const updateTagsOnServer = async (newTags: string[]) => {
    try {
      const uniqueTags = Array.from(new Set(newTags)); // 중복 제거
      await updatePRTags(uniqueTags);
      setPrTags(uniqueTags);
    } catch (error) {
      // console.error('PR 태그를 업데이트하는 중 오류가 발생했습니다.', error);
    }
  };

  // 태그 길이 유효성 검사
  const validateTagLength = (tag: string) => {
    if (tag.length > 10) {
      setInputLengthError('태그는 최대 10자까지 입력할 수 있습니다.');
    } else {
      setInputLengthError(null);
    }
  };

  // 태그 입력값 처리 함수
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setNewTag(value);
    validateTagLength(value); // 실시간 길이 검사
    setError(null); // 다른 오류 메시지 초기화
  };

  // 유효성 검사 및 엔터 키를 눌렀을 때 태그 추가하는 함수
  const handleKeyUp = async (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      const trimmedTag = newTag.trim();
      if (!trimmedTag) {
        // 빈 문자열이면 아무 작업도 하지 않음
        return;
      }

      const tagPattern = /^[a-zA-Z0-9가-힣]+$/; // 띄어쓰기 없는 한글, 영어, 숫자만 허용
      let errorMessage = '';

      if (prTags.includes(trimmedTag)) {
        errorMessage = '이미 존재하는 태그입니다.';
      } else if (prTags.length >= 10) {
        errorMessage = '태그는 최대 10개까지만 추가할 수 있습니다.';
      } else if (!tagPattern.test(trimmedTag)) {
        errorMessage = '한글, 영어, 숫자만 허용됩니다.';
      }

      if (errorMessage) {
        setError(errorMessage);
        return;
      }

      setError(null); // 오류 초기화
      const updatedTags = [...prTags, trimmedTag];
      setPrTags(updatedTags); // UI 먼저 업데이트
      setNewTag(''); // 입력 필드 초기화

      try {
        await updateTagsOnServer(updatedTags); // 서버 업데이트
      } catch (error) {
        setPrTags(prTags); // 실패 시 롤백
        setError('태그를 추가하는 데 실패했습니다.');
      }
    }
  };

  // 태그 삭제 함수
  const handleTagRemove = async (tagToRemove: string) => {
    const updatedTags = prTags.filter(tag => tag !== tagToRemove);
    setPrTags(updatedTags); // UI 먼저 업데이트

    try {
      await updateTagsOnServer(updatedTags); // 서버 업데이트
    } catch (error) {
      setPrTags(prTags); // 실패 시 롤백
      setError('태그를 삭제하는 데 실패했습니다.');
    }
  };

  return (
    <div className={styles.prWrap}>
      <h1>PR태그</h1>
      <ul>
        {loading
          ? Array.from({ length: 4 }).map((_, index) => (
              <li key={index} className={styles.skeletonTag}></li>
            ))
          : prTags.map((tag, index) => (
              <li key={index} className={styles.tagItem}>
                <button
                  type="button"
                  onClick={() => handleTagRemove(tag)}
                  className={styles.removeButton}>
                  <span className={styles.tagName}>
                    {tag}
                    <Image
                      width={16}
                      height={16}
                      src={'/assets/icons/x-circle.svg'}
                      alt="pr태그 수정 삭제 아이콘"
                    />
                  </span>
                </button>
              </li>
            ))}
      </ul>
      <span className={styles.mobilePlace}>
        PR태그는 입력해주세요. <br /> 10개 까지 추가 할 수 있습니다!
      </span>
      <input
        type="text"
        value={newTag}
        onChange={handleChange}
        onKeyUp={handleKeyUp}
        placeholder={
          prTags.length >= 10
            ? '최대 10개의 PR 태그를 추가할 수 있습니다. 추가하려면 기존 태그를 삭제해주세요.'
            : 'PR태그를 입력해주세요. 10개 까지 추가 할 수 있습니다!'
        }
        disabled={prTags.length >= 10} // 10개 이상일 때 입력 비활성화
      />
      {inputLengthError && <p className={styles.error}>{inputLengthError}</p>}
      {error && <p className={styles.error}>{error}</p>}
    </div>
  );
}
