'use client';

import { useState } from 'react';
import styles from './infoEdit.module.scss';
import { updatePersonalInfo } from '@/api/apis/mypageApis';

interface infoEdit {
  handleEditOpen: () => void;
  updateInfo: () => void;
}

export default function InfoEdit({ handleEditOpen, updateInfo }: infoEdit) {
  const [newName, setNewName] = useState<any>();
  const [newPassword, setNewPassword] = useState<any>();

  const fetchPersonalInfo = async () => {
    try {
      const res = await updatePersonalInfo(newName, newPassword);
      console.log('수정완료 :', res.data);
      updateInfo(); // 부모 컴포넌트의 정보를 업데이트
      handleEditOpen(); // 창을 닫음
    } catch (error) {
      console.log('error', error);
    }
  };
  return (
    <div className={styles.infoEditModal}>
      <div className={styles.title}>개인정보 수정</div>
      <div className={styles.nameInput}>
        <b>닉네임</b>
        <input
          type="text"
          placeholder={'변경하고싶은 닉네임을 입력해주세요.'}
          onChange={e => {
            setNewName(e.currentTarget.value);
          }}
          value={newName}
        />
      </div>
      <div className={styles.passwordInput}>
        <b>비밀번호</b>
        <input
          type="password"
          placeholder={'변경하고싶은 비밀번호를 입력해주세요.'}
          onChange={e => {
            setNewPassword(e.currentTarget.value);
          }}
          value={newPassword}
        />
      </div>
      <button
        type="button"
        className={newName && newPassword ? styles.editBtn : styles.disabledBtn}
        disabled={!(newName && newPassword)} // 조건에 따라 비활성화 상태를 설정
        onClick={() => {
          fetchPersonalInfo();
        }}>
        수정하기
      </button>
      <button
        type={'button'}
        className={styles.cancleBtn}
        onClick={() => {
          handleEditOpen();
        }}>
        취소하기
      </button>
    </div>
  );
}
