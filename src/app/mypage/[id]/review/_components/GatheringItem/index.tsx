// import { useState } from 'react';
// import styles from './GatheringItem.module.scss';
// import Modal from '@/components/common/Modal';
// import useModal from '@/hooks/useModal';
// import { GatheringItemProps } from '@/app/mypage/mockDataType';
// import ReviewWriteDetail from './ReviewWriteDetail';
// import ReviewFormProvider from './ReviewWriteDetail/ReviewFormProvider';

// interface gatheringIds {}
// export interface IWriteGatheringReviewData {
//   gatheringIds: string[];
//   gatheringDrafts: {
//     [key: string]: {
//       participantId: string;
//       rating: number;
//       mannerIds: number[];
//     }[];
//   };
// }
// export default function GatheringItem({ item }: GatheringItemProps) {
//   const { modalOpen, handleModalOpen, handleModalClose } = useModal();
//   const [step, setStep] = useState('');
//   const [participantId, setParticipantId] = useState('');
//   const [rating, setRating] = useState(1);
//   const [gatheringData, setGatheringData] = useState<IWriteGatheringReviewData>(
//     {
//       gatheringIds: [],
//       gatheringDrafts: {},
//     }
//   );

//   const clickWriteReview = () => {
//     handleModalOpen();
//     if (gatheringData.gatheringIds) {
//       if (!gatheringData.gatheringIds.includes(item.id.toString())) {
//         setGatheringData((prev: any) => ({
//           ...prev,
//           gatheringIds: [...prev.gatheringIds, item.id],
//           gatheringDrafts: { ...prev.gatheringDrafts, [item.id]: [] },
//         }));
//       }
//     }
//   };

//   const selectManner = (mannerId: number) => {
//     if (!participantId || !item.id) return;

//     setGatheringData(prev => {
//       const gatheringId = item.id;

//       // 현재 모임에서 해당 사용자 찾기
//       const userIndex = prev.gatheringDrafts[gatheringId]?.findIndex(
//         user => user.participantId === participantId
//       );

//       let updatedUsers;
//       if (userIndex !== -1 && userIndex !== undefined) {
//         // 기존 유저가 존재할 경우
//         const user = prev.gatheringDrafts[gatheringId][userIndex];
//         const mannerIds = user.mannerIds.includes(mannerId)
//           ? user.mannerIds.filter(id => id !== mannerId)
//           : [...user.mannerIds, mannerId];

//         updatedUsers = [
//           ...prev.gatheringDrafts[gatheringId].slice(0, userIndex),
//           { ...user, mannerIds },
//           ...prev.gatheringDrafts[gatheringId].slice(userIndex + 1),
//         ];
//       } else {
//         // 새로운 유저인 경우
//         updatedUsers = [
//           ...(prev.gatheringDrafts[gatheringId] || []),
//           { participantId, rating, mannerIds: [mannerId] },
//         ];
//       }

//       return {
//         ...prev,
//         gatheringDrafts: {
//           ...prev.gatheringDrafts,
//           [gatheringId]: updatedUsers,
//         },
//       };
//     });
//   };

//   const isSavedManner = (mannerId: number): boolean => {
//     if (!item.id) return false;
//     const gatheringId = item.id;
//     const foundUser = gatheringData.gatheringDrafts[gatheringId]?.find(
//       user => user.participantId === participantId
//     );
//     return foundUser ? foundUser.mannerIds.includes(mannerId) : false;
//   };
//   const submitReview = (data: any) => {
//     console.log(data);
//   };

//   return (
//     <div className={styles.gatheringItem}>
//       <h3>{item.title}</h3>
//       <p>{item.location}</p>
//       <p>{item.gatheringDate}</p>
//       <p>
//         {item.participantCount}/{item.capacity}
//       </p>
//       <button className={styles.writeBtn} onClick={clickWriteReview}>
//         리뷰 작성하기
//       </button>
//       //useFieldArray
//       <Modal modalOpen={modalOpen} onClose={handleModalClose}>
//         <div className={styles.detailModal}>
//           {step === 'reviewDetail' ? (
//             <ReviewFormProvider<IWriteGatheringReviewData>
//               formOptions={{ mode: 'onChange' }}
//               onSubmit={submitReview}>
//               <ReviewWriteDetail
//                 item={item}
//                 submitReview={() => submitReview}
//                 participantId={participantId}
//                 prevClickHandler={() => setStep('')}
//               />
//             </ReviewFormProvider>
//           ) : (
//             <>
//               <div className={styles.modalHeader}>
//                 <div
//                   className={styles.titleAndDate}
//                   style={{ display: 'flex' }}>
//                   <h2>{item.title}</h2>
//                   <span>{item.gatheringDate}</span>
//                 </div>
//                 <p>{item.content}</p>
//               </div>
//               <div className={styles.listContainer}>
//                 <div className={styles.participantslist}>
//                   {item.participants.map(user => (
//                     <div key={user.userId} className={styles.user}>
//                       <h4>{user.userName}</h4>
//                       <button
//                         onClick={() => {
//                           setStep('reviewDetail');
//                           setParticipantId(user.userId);
//                         }}>
//                         리뷰하기
//                       </button>
//                     </div>
//                   ))}
//                 </div>
//               </div>
//             </>
//           )}
//         </div>
//       </Modal>
//     </div>
//   );
// }
