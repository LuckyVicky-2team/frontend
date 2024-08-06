import React from 'react';
import styles from './profileImages.module.scss';
import ProfileImage from '@/components/common/ProfileImage';

interface IParticipants {
  userId: number;
  profileImage: string;
}

interface IProfileImagesProps {
  participants: IParticipants[];
}

function ProfileImages({ participants }: IProfileImagesProps) {
  return (
    <div className={styles.profileImages}>
      {participants.map((participant, i) => {
        const length = participants.length;
        let distance = 0;
        if (length >= 4) {
          distance = 4 - i;
        } else if (length === 4) {
          distance = 3 - i;
        } else if (length === 3) {
          distance = 2 - i;
        } else if (length === 2) {
          distance = 1 - i;
        }
        return (
          <div
            key={i}
            style={{
              zIndex: i,
              position: 'absolute',
              right: `${distance * 16}px`,
            }}>
            <ProfileImage
              url={participant.profileImage}
              width={28}
              height={28}
            />
          </div>
        );
      })}
      {participants.length >= 5 && (
        <div className={styles.count}>+{participants.length - 4}</div>
      )}
    </div>
  );
}

export default ProfileImages;
