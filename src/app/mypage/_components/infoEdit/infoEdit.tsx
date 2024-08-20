'use client';

import { useState } from 'react';
import styles from './infoEdit.module.scss';
import { updatePersonalInfo } from '@/api/apis/mypageApis';

interface infoEdit {
  handleEditOpen: () => void;
  updateInfo: () => void;
}

export default function InfoEdit({ handleEditOpen, updateInfo }: infoEdit) {
  const [newName, setNewName] = useState<string>('');
  const [newPassword, setNewPassword] = useState<string>('');

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

  const isFormValid = newName.trim().length > 0; // 닉네임이 빈 문자열이 아니어야 함

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
        <b>비밀번호 (선택)</b>
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
        className={isFormValid ? styles.editBtn : styles.disabledBtn}
        disabled={!isFormValid} // 닉네임이 비어있으면 비활성화
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

// 'use client';

// import { useState } from 'react';
// import { useForm, Controller } from 'react-hook-form';
// import styles from './infoEdit.module.scss';
// import {
//   checkNicknameDuplication,
//   updatePersonalInfo,
// } from '@/api/apis/mypageApis';

// interface InfoEditProps {
//   handleEditOpen: () => void;
//   updateInfo: () => void;
// }

// interface FormValues {
//   newName: string;
//   newPassword: string;
// }

// export default function InfoEdit({
//   handleEditOpen,
//   updateInfo,
// }: InfoEditProps) {
//   const {
//     control,
//     handleSubmit,
//     formState: { errors, isSubmitting },
//   } = useForm<FormValues>({
//     defaultValues: {
//       newName: '',
//       newPassword: '',
//     },
//   });

//   const [isNicknameAvailable, setIsNicknameAvailable] = useState<
//     boolean | null
//   >(null);

//   const onSubmit = async (data: FormValues) => {
//     try {
//       const { newName, newPassword } = data;
//       if (isNicknameAvailable === false) {
//         alert('닉네임이 이미 사용 중입니다.');
//         return;
//       }
//       const res = await updatePersonalInfo(newName, newPassword);
//       console.log('수정완료 :', res.data);
//       updateInfo(); // 부모 컴포넌트의 정보를 업데이트
//       handleEditOpen(); // 창을 닫음
//     } catch (error) {
//       console.log('error', error);
//       alert('정보 수정 중 오류가 발생했습니다.');
//     }
//   };

//   const checkNickname = async (nickName: string) => {
//     try {
//       const response = await checkNicknameDuplication(nickName);
//       console.log('API Response:', response.data); // 응답 데이터 확인
//       if (response.data.available) {
//         // 응답 데이터 구조에 맞게 수정
//         setIsNicknameAvailable(true);
//         alert('사용 가능한 닉네임입니다.');
//       } else {
//         setIsNicknameAvailable(false);
//         alert('이미 사용 중인 닉네임입니다.');
//       }
//     } catch (error) {
//       console.log('Error:', error);
//       alert('서버와의 통신 중 오류가 발생했습니다.');
//     }
//   };

//   return (
//     <div className={styles.infoEditModal}>
//       <div className={styles.title}>개인정보 수정</div>
//       <form onSubmit={handleSubmit(onSubmit)}>
//         <div className={styles.nameInput}>
//           <b>닉네임</b>
//           <Controller
//             name="newName"
//             control={control}
//             rules={{ required: '닉네임을 입력해주세요.' }}
//             render={({ field }) => (
//               <>
//                 <input
//                   type="text"
//                   placeholder={'변경하고싶은 닉네임을 입력해주세요.'}
//                   {...field}
//                   onBlur={() => checkNickname(field.value)}
//                 />
//                 {errors.newName && (
//                   <span className={styles.error}>{errors.newName.message}</span>
//                 )}
//               </>
//             )}
//           />
//         </div>
//         <div className={styles.passwordInput}>
//           <b>비밀번호 (선택)</b>
//           <Controller
//             name="newPassword"
//             control={control}
//             render={({ field }) => (
//               <input
//                 type="password"
//                 placeholder={'변경하고싶은 비밀번호를 입력해주세요.'}
//                 {...field}
//               />
//             )}
//           />
//         </div>
//         <button
//           type="submit"
//           className={styles.editBtn}
//           disabled={isSubmitting || isNicknameAvailable === false} // 닉네임이 비활성화 상태일 때 비활성화
//         >
//           수정하기
//         </button>
//         <button
//           type="button"
//           className={styles.cancleBtn}
//           onClick={() => handleEditOpen()}>
//           취소하기
//         </button>
//       </form>
//     </div>
//   );
// }
