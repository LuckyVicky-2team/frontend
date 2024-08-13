// import { useEffect } from 'react';
// import styles from './ReviewWriteDetail.module.scss';
// import Rating from '@/components/common/Rating';
// import IconButton from '@/components/common/IconButton';
// import { useFormContext, useFieldArray, useWatch } from 'react-hook-form';
// import { GatheringItemProps } from '@/app/mypage/mockDataType';

// //일단 제출하기 눌렀을때 제대로 안담김 다시 한번 코드 짜보기

// interface IReviewWriteDetailProps {
//   participantId: string | number;
//   prevClickHandler: () => void;
//   submitReview: () => void;
//   item: GatheringItemProps['item']; // item 타입 설정
// }
// export default function ReviewWriteDetail({
//   item,
//   submitReview,
//   participantId,
//   prevClickHandler,
// }: IReviewWriteDetailProps) {
//   //errors, status,
//   const { register, setValue, control } = useFormContext();
//   const { fields, append, prepend, remove, swap, move, insert } = useFieldArray(
//     {
//       control,
//       name: `gatheringDrafts.${item.id}`, // id2:[{},{}]
//     }
//   );
//   const { fields: mannerIdsFields } = useFieldArray({
//     control,
//     name: `gatheringDrafts.${item.id}.mannerIds`, // id2:[{},{}]
//   });
//   const getUserNameByUserId = (id: string | number) => {
//     const user = item.participants.find(
//       participant => participant.userId === id
//     );
//     return user ? user.userName : null;
//   };
//   const userIndex = fields.findIndex(
//     field => `field.${participantId}` === participantId
//   );
//   console.log(item, participantId);
//   const handleRatingChange = (newRating: number) => {
//     if (userIndex !== -1) {
//       setValue(`gatheringDrafts[${item.id}][${userIndex}].rating`, newRating);
//     }
//   };
//   const handleMannerSelect = (id: number) => {
//     if (userIndex !== -1) {
//       console.log(id, fields, userIndex, fields[userIndex]);
//       // const userManners = fields[userIndex].mannerIds;
//       //   const updatedManners = userManners.includes(id)
//       //     ? userManners.filter((mannerId: number) => mannerId !== id)
//       //     : [...userManners, id];
//     }
//   };
//   const mannerIds = useWatch({
//     control,
//     name: `gatheringDrafts.${item.id}[${userIndex}].mannerIds`,
//     defaultValue: [],
//   });
//   const isSavedManner = (id: number) => {
//     return mannerIds.includes(id);
//   };
//   // useEffect(() => {
//   //   if (!fields.find(el => el.id === participantId)) {
//   //     append({ participantId, rating: 0, mannerIds: [] });
//   //   } else return;
//   // }),
//   //   [participantId];
//   const goodMannerList = [
//     { content: '친절하고 매너가 좋아요', id: 1 },
//     { content: '재미있어요', id: 2 },
//     { content: '시간 약속을 잘 지켜요', id: 3 },
//     { content: '공정해요', id: 4 },
//     { content: '보드게임의 신', id: 5 },
//     { content: '다시 만나고싶어요!', id: 6 },
//   ];
//   const badMannersList = [
//     { content: '비매너 플레이어', id: 7 },
//     { content: '시간을 안지켜요', id: 8 },
//     { content: '의도가 부적절해요', id: 9 },
//     { content: '공정하지 못해요', id: 10 },
//     { content: '다시 만나기 싫어요!', id: 11 },
//   ];

//   return (
//     <>
//       <div className={styles.container}>
//         <button className={styles.backBtn} onClick={prevClickHandler}>
//           {`<`}
//         </button>
//         <div className={styles.main}>
//           <p className={styles.participantName}>
//             <span>{getUserNameByUserId(participantId) ?? '-'}</span>
//             님과의 모임은 어떠셨나요?
//           </p>
//           <Rating
//             changeRatingHandler={
//               handleRatingChange
//               //   newRating => {
//               //   setRating(newRating);
//               //   setValue(`gatheringDrafts.${item.id}[]`, newRating);
//               // }
//             }
//           />
//           <div>
//             <div>
//               <p>어떤점이 좋았나요?</p>
//               {goodMannerList.map(el => {
//                 return (
//                   <div className={styles.mannerList} key={el.id}>
//                     <IconButton
//                       size={'small'}
//                       imgUrl={
//                         isSavedManner(el.id)
//                           ? '/assets/icons/checkFilledCircle.svg'
//                           : '/assets/icons/checkCircle.svg'
//                       }
//                       clickIconButtonHandler={
//                         () => handleMannerSelect(el.id)
//                         //   {
//                         //   selectManner(el.id);
//                         //   console.log('click 칭찬 매너', el.id);
//                         // }
//                       }
//                     />
//                     <span>{el.content}</span>
//                   </div>
//                 );
//               })}
//             </div>
//             <div>
//               <p>어떤점이 별로였나요?</p>
//               {badMannersList.map(el => {
//                 return (
//                   <div className={styles.MannerList} key={el.id}>
//                     <IconButton
//                       size={'small'}
//                       imgUrl={
//                         isSavedManner(el.id)
//                           ? '/assets/icons/checkFilledCircle.svg'
//                           : '/assets/icons/checkCircle.svg'
//                       }
//                       clickIconButtonHandler={
//                         () => handleMannerSelect(el.id)
//                         //   () => {
//                         //   selectManner(el.id);
//                         //   console.log('click 비매너', el.id);
//                         // }
//                       }
//                     />
//                     <span>{el.content}</span>
//                   </div>
//                 );
//               })}
//             </div>
//           </div>
//         </div>

//         <div className={styles.bottomNav}>
//           <button className={styles.submitBtn} onClick={submitReview}>
//             제출하기
//           </button>
//         </div>
//       </div>
//     </>
//   );
// }
